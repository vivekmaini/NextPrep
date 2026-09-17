
const interviewService = require("../services/interviewService");
const InterviewModel = require("../models/interviewModel");

const startInterview = async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId;
    const { mode, difficulty, targetRole, experienceLevel, skills, role, type } = req.body;

    // 1. Generate questions via AI (For Practice Mode)
    let questions = [];
    if (targetRole || mode) {
       questions = await interviewService.generateQuestions({ mode: mode || type || "Technical", difficulty, targetRole: targetRole || role, experienceLevel, skills });
    }

    // 2. Save to DB (For tracking)
    const dbRole = targetRole || role || mode || "General";
    const dbType = mode || type || "Technical";
    const interview = await InterviewModel.createInterview(userId, dbRole, difficulty || "Balanced", dbType);

    res.status(201).json({ success: true, interview, questions });
  } catch (error) {
    console.error("Start interview error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to start interview session" });
  }
};

const saveQA = async (req, res) => {
  try {
    const { interviewId, question, answer, feedback, score } = req.body;
    const qaPair = await InterviewModel.addQnA(interviewId, question, answer, feedback, score);
    res.status(201).json({ success: true, qaPair });
  } catch (error) {
    console.error("Save QA error:", error);
    res.status(500).json({ success: false, message: "Failed to save Q&A" });
  }
};

const completeInterview = async (req, res) => {
  try {
    // 1. AI Evaluation (For Practice Mode)
    let feedback = null;
    if (req.body.responses) {
        feedback = await interviewService.evaluateSession(req.body);
    }

    // 2. Save to DB
    const { interviewId, overallScore, finalAnalysis } = req.body;
    let interview = null;
    // We might not have interviewId if it was purely old practice mode, but if we do, update DB.
    if (interviewId || feedback) {
        const scoreToSave = overallScore || (feedback ? feedback.overallScore : 0);
        const analysisToSave = finalAnalysis || (feedback ? feedback.summary : "");
        // If interviewId is missing, we skip updating DB for now to avoid crashing practice mode
        if (interviewId) {
            interview = await InterviewModel.finishInterview(interviewId, scoreToSave, analysisToSave);
        }
    }

    res.status(200).json({ success: true, interview, feedback });
  } catch (error) {
    console.error("Finish interview error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to finish interview session" });
  }
};

const evaluateAnswer = async (req, res) => {
   try {
      const feedback = await interviewService.evaluateAnswer(req.body);
      res.status(200).json({ success: true, feedback });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
};

const getHistory = async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId;
    const history = await InterviewModel.getUserInterviews(userId);
    res.status(200).json({ success: true, history });
  } catch (error) {
    console.error("Get history error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch interview history" });
  }
};

const getSessionDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const details = await InterviewModel.getInterviewDetails(id);
    if (!details) return res.status(404).json({ success: false, message: "Interview not found" });
    
    res.status(200).json({ success: true, details });
  } catch (error) {
    console.error("Get details error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch interview details" });
  }
};

module.exports = { startInterview, saveQA, completeInterview, evaluateAnswer, getHistory, getSessionDetails };
