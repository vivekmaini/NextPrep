const { generateJson } = require("../ai/llm/localLLMService");
const { buildRagContext } = require("../ai/rag/retrievalService");

const feedbackSchema = {
  type: "object",
  properties: {
    score: { type: "integer", description: "Interview-answer score from 0 to 100." },
    feedback: { type: "string", description: "A candid, concise assessment of the answer." },
    strengths: { type: "array", items: { type: "string" }, description: "Up to three specific strengths." },
    nextSteps: { type: "array", items: { type: "string" }, description: "Two or three concrete improvements." },
  },
  required: ["score", "feedback", "strengths", "nextSteps"],
};

const sessionSchema = {
  type: "object",
  properties: {
    overallScore: { type: "integer", description: "Overall mock interview score from 0 to 100." },
    summary: { type: "string", description: "A concise interviewer-style summary." },
    strengths: { type: "array", items: { type: "string" }, description: "Two to four demonstrated strengths." },
    improvements: { type: "array", items: { type: "string" }, description: "Three actionable improvements across the session." },
  },
  required: ["overallScore", "summary", "strengths", "improvements"],
};

const questionSchema = {
  type: "object",
  properties: { questions: { type: "array", items: { type: "string" }, description: "Exactly five concise, role-specific interview questions." } },
  required: ["questions"],
};

const generateQuestions = async ({ mode, difficulty, targetRole, experienceLevel, skills }) => {
  const ragContext = await buildRagContext(`${mode} interview preparation for ${targetRole} ${skills}`);
  const prompt = `You are an expert interview designer. Create exactly five progressive ${mode} interview questions for a ${experienceLevel} candidate targeting ${targetRole}. Their stated skills are: ${skills || "not provided"}. Difficulty: ${difficulty}. Make questions relevant to their profile; avoid questions requiring undisclosed experience. Use the trusted preparation context below to keep the interview realistic. Return questions only.\n\nTRUSTED PREPARATION CONTEXT:\n${ragContext}`;
  const result = await generateJson({ systemPrompt: "You design realistic, fair mock interviews for placement preparation.", prompt, schema: questionSchema });
  const questions = Array.isArray(result.questions) ? result.questions.map(String).map((item) => item.trim()).filter(Boolean).slice(0, 5) : [];
  if (questions.length !== 5) throw new Error("Gemini could not create a complete interview. Please try again.");
  return questions;
};

const evaluateAnswer = async ({ mode, difficulty, question, answer }) => {
  const ragContext = await buildRagContext(`${mode} interview answer feedback ${question}`);
  const prompt = `You are a supportive but candid interview coach. Evaluate the candidate's answer to the interview question. Do not invent facts. Score clarity, relevance, structure, evidence, and communication. For behavioral answers, encourage STAR only where relevant. Do not use markdown. Use the trusted preparation context only as coaching guidance.\n\nInterview type: ${mode}\nDifficulty: ${difficulty}\nQuestion: ${question}\nCandidate answer: ${answer}\n\nTRUSTED PREPARATION CONTEXT:\n${ragContext}`;
  const result = await generateJson({ systemPrompt: "You are a supportive but candid interview coach. Do not invent facts or make personally sensitive inferences.", prompt, schema: feedbackSchema });
  const score = Number(result.score);
  const strengths = Array.isArray(result.strengths) ? result.strengths.map(String).map((item) => item.trim()).filter(Boolean).slice(0, 3) : [];
  const nextSteps = Array.isArray(result.nextSteps) ? result.nextSteps.map(String).map((item) => item.trim()).filter(Boolean).slice(0, 3) : [];
  const feedback = String(result.feedback || "").trim();
  if (!Number.isInteger(score) || score < 0 || score > 100 || !feedback) throw new Error("Gemini returned incomplete interview feedback. Please try again.");
  return { score, feedback, strengths, nextSteps };
};

const evaluateSession = async ({ mode, difficulty, responses }) => {
  const transcript = responses.map((item, index) => `Question ${index + 1}: ${item.question}\nAnswer ${index + 1}: ${item.answer}`).join("\n\n");
  const ragContext = await buildRagContext(`${mode} interview evaluation`);
  const prompt = `You are an experienced interviewer. Evaluate this complete ${mode} mock interview at ${difficulty} difficulty. Be candid, specific, and constructive. Judge relevance, clarity, structure, evidence, and communication across all answers. Do not invent facts or use markdown. Use the trusted preparation context only as coaching guidance.\n\n${transcript}\n\nTRUSTED PREPARATION CONTEXT:\n${ragContext}`;
  const result = await generateJson({ systemPrompt: "You are an experienced interviewer who gives concise, evidence-based, constructive feedback.", prompt, schema: sessionSchema });
  const overallScore = Number(result.overallScore);
  const summary = String(result.summary || "").trim();
  const strengths = Array.isArray(result.strengths) ? result.strengths.map(String).map((item) => item.trim()).filter(Boolean).slice(0, 4) : [];
  const improvements = Array.isArray(result.improvements) ? result.improvements.map(String).map((item) => item.trim()).filter(Boolean).slice(0, 3) : [];
  if (!Number.isInteger(overallScore) || overallScore < 0 || overallScore > 100 || !summary) throw new Error("Gemini returned incomplete interview feedback. Please try again.");
  return { overallScore, summary, strengths, improvements };
};

module.exports = { evaluateAnswer, evaluateSession, generateQuestions };
