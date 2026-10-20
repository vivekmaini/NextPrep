const { generateJson, generateChatText } = require("../ai/llm/localLLMService");
const { buildRagContext } = require("../ai/rag/retrievalService");

const feedbackSchema = {
  type: "object",
  properties: {
    score: { type: "integer", description: "Interview-answer score from 0 to 100 based on strict technical competence and depth." },
    feedback: { type: "string", description: "A candid, realistic, and honest assessment of the answer. Point out what was correct and what was missing or incorrect." },
    strengths: { type: "array", items: { type: "string" }, description: "Specific demonstrated strengths if any (can be empty if answer was poor)." },
    nextSteps: { type: "array", items: { type: "string" }, description: "Concrete, actionable improvements needed for this answer." },
  },
  required: ["score", "feedback", "strengths", "nextSteps"],
};

const sessionSchema = {
  type: "object",
  properties: {
    overallScore: { type: "integer", description: "Strict overall mock interview score from 0 to 100." },
    summary: { type: "string", description: "A brutally honest and constructive recruiter/interviewer summary of the entire session." },
    strengths: { type: "array", items: { type: "string" }, description: "Demonstrated strengths (leave empty or minimal if answers were poor/skipped)." },
    improvements: { type: "array", items: { type: "string" }, description: "Key actionable improvements across the session." },
  },
  required: ["overallScore", "summary", "strengths", "improvements"],
};

const questionSchema = {
  type: "object",
  properties: { questions: { type: "array", items: { type: "string" }, description: "Concise, role-specific interview questions." } },
  required: ["questions"],
};

const generateQuestions = async ({ mode, difficulty, targetRole, experienceLevel, skills, count = 5, existingQuestions = [] }) => {
  const avoidContext = existingQuestions.length > 0 ? "\nCRITICAL RULE: DO NOT REPEAT OR REPHRASE THESE QUESTIONS: " + existingQuestions.join(" | ") : "";
  const prompt = `You are a senior technical interviewer. Create exactly ${count} progressive ${mode} interview questions for a ${experienceLevel} candidate targeting ${targetRole}. Stated skills: ${skills || "not provided"}. Difficulty: ${difficulty}.
Make questions realistic, practical, and focused on real-world problem-solving. Avoid generic filler questions.${avoidContext}`;

  const result = await generateJson({ systemPrompt: "You design realistic, challenging mock interviews for competitive placements.", prompt, schema: questionSchema, temperature: 0.7 });
  const questions = Array.isArray(result.questions) ? result.questions.map(String).map((item) => item.trim()).filter(Boolean).slice(0, count) : [];
  if (questions.length < Math.min(count, 2)) throw new Error("Could not create interview questions. Please try again.");
  return questions;
};

const evaluateAnswer = async ({ mode, difficulty, question, answer }) => {
  const cleanAnswer = (answer || "").trim();
  const words = cleanAnswer ? cleanAnswer.split(/\s+/).length : 0;
  const isTrivial = words < 6 || ["idk", "i don't know", "skip", "no idea", "pass", "nothing", "na", "n/a"].includes(cleanAnswer.toLowerCase());

  if (isTrivial) {
    return {
      score: cleanAnswer ? 5 : 0,
      feedback: "No substantive answer was provided. In a real technical interview, skipping or giving one-word responses results in an immediate fail for this question.",
      strengths: [],
      nextSteps: [
        "Explain the fundamental concepts even if you are not 100% sure.",
        "Structure your thoughts using technical terminology and real-world examples.",
        "Never leave a question blank or simply say 'I don't know' without offering your reasoning."
      ]
    };
  }

  const ragContext = await buildRagContext(`${mode} interview answer feedback ${question}`);
  const prompt = `You are a strict, senior interviewer conducting a ${difficulty} difficulty ${mode} interview.
Evaluate the candidate's answer with absolute objectivity and realism.

Question: ${question}
Candidate answer: ${cleanAnswer}

STRICT EVALUATION RUBRIC:
1. Technical Depth & Correctness: Are the core concepts accurate and properly explained?
2. Completeness & Structure: Did the candidate directly answer what was asked with sufficient detail?
3. Length/Effort Penalties:
   - If the answer is superficial, generic, or under 20 words: Score CANNOT exceed 40.
   - If the answer contains factual errors or misconceptions: Score between 15 and 45.
   - If the answer is clear, accurate, and provides practical examples: Score between 70 and 95.
   - Reserve 90+ only for exceptional, production-grade responses.
4. HONESTY: Do NOT invent false praise. If the answer is weak, explicitly state why it would fail a technical screening.

REFERENCE CONTEXT:
${ragContext}`;

  const result = await generateJson({ systemPrompt: "You are an honest, strict technical interviewer who gives candid, realistic evaluations.", prompt, schema: feedbackSchema, temperature: 0.2 });
  const score = Number(result.score);
  const strengths = Array.isArray(result.strengths) ? result.strengths.map(String).map((item) => item.trim()).filter(Boolean).slice(0, 3) : [];
  const nextSteps = Array.isArray(result.nextSteps) ? result.nextSteps.map(String).map((item) => item.trim()).filter(Boolean).slice(0, 3) : [];
  const feedback = String(result.feedback || "").trim();
  if (!Number.isInteger(score) || score < 0 || score > 100 || !feedback) throw new Error("Incomplete interview feedback received.");
  return { score, feedback, strengths, nextSteps };
};

const evaluateSession = async ({ mode, difficulty, responses }) => {
  let answeredCount = 0;
  let totalWords = 0;

  const transcript = responses.map((item, index) => {
    const rawAnswer = (item.answer || "").trim();
    const isSkipped = !rawAnswer || rawAnswer.toLowerCase() === "skipped" || rawAnswer.length < 5;
    if (!isSkipped) {
      answeredCount++;
      totalWords += rawAnswer.split(/\s+/).length;
    }
    return `Question ${index + 1}: ${item.question}\nAnswer ${index + 1}: ${isSkipped ? "[CANDIDATE SKIPPED / DID NOT ANSWER]" : rawAnswer}`;
  }).join("\n\n");

  const totalQuestions = responses.length || 15;
  const maxCap = Math.round((answeredCount / totalQuestions) * 100);

  // If candidate skipped all or almost all questions
  if (answeredCount === 0) {
    return {
      overallScore: 0,
      summary: "You did not attempt the questions in this session. All 15 questions were skipped or left empty, resulting in an overall score of 0/100.",
      strengths: [],
      improvements: [
        "Attempt to answer all questions to receive a meaningful score.",
        "Prepare core concepts in advance and take time to articulate your thoughts.",
        "Aim for at least 60-100 words per technical explanation."
      ]
    };
  }

  const prompt = `You are the lead technical hiring manager. Evaluate this complete ${mode} mock interview at ${difficulty} difficulty.
The candidate attempted ${answeredCount} out of ${totalQuestions} questions (${totalQuestions - answeredCount} questions were skipped).
Total word count across answered questions: ${totalWords}.

CRITICAL SCORING RULES:
1. STRICT CEILING: The overallScore CANNOT exceed ${maxCap} because ${totalQuestions - answeredCount} questions were skipped.
2. If the answered questions are also shallow, one-line, or low-quality, deduct heavily below ${maxCap}.
3. Maximum score possible for an outstanding candidate who answered all questions with deep technical knowledge is 96.
4. REALISTIC CANDID FEEDBACK: Give a realistic hiring decision summary (e.g. "Strong Hire", "Lean Hire", "No Hire", or "Strong No Hire") and explain specifically what was lacking in their answers.
5. If answers were poor, do NOT give fake strengths. State clearly what foundational gaps were observed.

INTERVIEW TRANSCRIPT:
${transcript}`;

  const result = await generateJson({
    systemPrompt: "You are a senior hiring committee member. You calculate strict, realistic interview scores (0-100) with zero tolerance for generic fluff.",
    prompt,
    schema: sessionSchema,
    temperature: 0.2
  });

  let overallScore = Number(result.overallScore);
  if (!Number.isInteger(overallScore) || overallScore < 0 || overallScore > 100) {
    overallScore = Math.min(maxCap, 30);
  }
  // Enforce mathematical ceiling for skipped questions
  if (overallScore > maxCap) {
    overallScore = maxCap;
  }

  const summary = String(result.summary || "").trim();
  const strengths = Array.isArray(result.strengths) ? result.strengths.map(String).map((item) => item.trim()).filter(Boolean).slice(0, 4) : [];
  const improvements = Array.isArray(result.improvements) ? result.improvements.map(String).map((item) => item.trim()).filter(Boolean).slice(0, 3) : [];

  return { overallScore, summary, strengths, improvements };
};

/**
 * Interactive LiveMock Chat: Evaluates candidate's latest response and asks the next question.
 */
const chatLiveMock = async ({ messages, role, difficulty, interviewType, resumeText }) => {
  const systemPrompt = `You are a BRUTALLY REALISTIC, senior technical interviewer conducting a ${difficulty} level ${interviewType} interview for a ${role} position.
Candidate Resume Details:
${resumeText || "No resume provided."}

YOUR MANDATORY RULES:
1. REAL EVALUATION: Always start your reply by evaluating the candidate's last answer.
   - If they gave an accurate and deep answer, acknowledge the exact points they got right (1-2 sentences).
   - If they gave an incorrect, vague, superficial, or 'I don't know' answer, STRICTLY point it out (e.g. "That is technically incorrect because...", "Your answer lacks depth on how X actually works in production.").
2. NEXT QUESTION: Immediately follow your evaluation by asking exactly ONE focused, realistic follow-up question based on their resume projects, tools, or target role.
3. CONCISE & PROFESSIONAL: Keep your entire response under 4 sentences. Speak like a real interviewer, not a chatbot. Never dump multiple questions.`;

  return await generateChatText({ systemPrompt, messages, temperature: 0.4 });
};

module.exports = { evaluateAnswer, evaluateSession, generateQuestions, chatLiveMock };
