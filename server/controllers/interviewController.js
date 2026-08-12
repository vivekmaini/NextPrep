const { evaluateAnswer } = require("../services/interviewService");
const { evaluateSession } = require("../services/interviewService");
const { generateQuestions } = require("../services/interviewService");
const { validateInterviewAnswer, validateInterviewSession, validateInterviewProfile } = require("../validators/interviewValidator");

const evaluate = async (req, res) => {
  try {
    const { error, value } = validateInterviewAnswer(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    const feedback = await evaluateAnswer(value);
    return res.json({ success: true, feedback });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ success: false, message: error.message || "Unable to evaluate this answer." });
  }
};
const start = async (req, res) => {
  try { const { error, value } = validateInterviewProfile(req.body); if (error) return res.status(400).json({ success: false, message: error.details[0].message }); return res.json({ success: true, questions: await generateQuestions(value) }); }
  catch (error) { return res.status(error.statusCode || 400).json({ success: false, message: error.message || "Unable to create this interview." }); }
};

const complete = async (req, res) => {
  try {
    const { error, value } = validateInterviewSession(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    return res.json({ success: true, feedback: await evaluateSession(value) });
  } catch (error) { return res.status(error.statusCode || 400).json({ success: false, message: error.message || "Unable to evaluate this interview." }); }
};

module.exports = { evaluate, complete, start };
