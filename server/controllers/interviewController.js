
const interviewService = require("../services/interviewService");
const InterviewModel = require("../models/interviewModel");
const { getSafeErrorMessage } = require("../middlewares/errorHandler");
const resumeModel = require("../models/resumeModel");
const pool = require("../config/db");

const startInterview = async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId;
    const { mode, difficulty, targetRole, experienceLevel, skills, role, type } = req.body;

    // Optional: Personalize with resume if user uploaded one
    const latestResume = await resumeModel.getLatestResumeForUser(userId);
    const resumeRole = latestResume?.file_name ? latestResume.file_name.replace(/\.[^/.]+$/, "") : "";
    const effectiveRole = targetRole || role || resumeRole || "Software Engineer";
    const effectiveSkills = skills || (latestResume?.feedback?.missingKeywords ? latestResume.feedback.missingKeywords.join(", ") : "");

    // 1. Generate questions via AI (For Practice Mode)
    let questions = [];
    if (effectiveRole || mode) {
       questions = await interviewService.generateQuestions({
         mode: mode || type || "Technical",
         difficulty,
         targetRole: effectiveRole,
         experienceLevel,
         skills: effectiveSkills,
       });
    }

    // 2. Save to DB (For tracking)
    const dbRole = effectiveRole;
    const dbType = mode || type || "Technical";
    const interview = await InterviewModel.createInterview(userId, dbRole, difficulty || "Balanced", dbType);

    res.status(201).json({ success: true, interview, questions });
  } catch (error) {
    const safeMsg = getSafeErrorMessage(error, "Failed to start interview. Please try again later.");
    res.status(500).json({ success: false, message: safeMsg });
  }
};

const chatInterview = async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId;
    const { messages, role, difficulty, interviewType, resume } = req.body;

    const latestResume = await resumeModel.getLatestResumeForUser(userId);
    const resumeText = resume || (latestResume ? `Resume: ${latestResume.file_name}\nATS Score: ${latestResume.ats_score}\nSkills/Feedback: ${JSON.stringify(latestResume.feedback)}` : "");

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        noResume: true,
        message: "Please upload your resume before starting a mock interview.",
      });
    }

    const reply = await interviewService.chatLiveMock({
      messages: messages || [],
      role: role || "Software Engineer",
      difficulty: difficulty || "Medium",
      interviewType: interviewType || "Technical",
      resumeText,
    });

    res.status(200).json({ success: true, reply });
  } catch (error) {
    const safeMsg = getSafeErrorMessage(error, "Failed to get AI interviewer reply.");
    res.status(500).json({ success: false, message: safeMsg });
  }
};

const saveQA = async (req, res) => {
  try {
    const { interviewId, question, answer, feedback, score } = req.body;
    const qaPair = await InterviewModel.addQnA(interviewId, question, answer, feedback, score);
    res.status(201).json({ success: true, qaPair });
  } catch (error) {
    const safeMsg = getSafeErrorMessage(error, "Failed to save your answer. Please try again later.");
    res.status(500).json({ success: false, message: safeMsg });
  }
};

const completeInterview = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    let feedback = null;
    if (req.body.responses) {
      feedback = await interviewService.evaluateSession(req.body);
    }

    let { interviewId, overallScore, finalAnalysis } = req.body;
    let interview = null;
    const scoreToSave = overallScore || (feedback ? feedback.overallScore : 75);
    const analysisToSave = finalAnalysis || (feedback ? feedback.summary : "Interview completed successfully.");

    if (!interviewId && userId) {
      const ongoing = await pool.query(
        "SELECT id FROM interviews WHERE user_id = $1 AND status = 'ongoing' ORDER BY created_at DESC LIMIT 1",
        [userId]
      );
      if (ongoing.rows.length > 0) {
        interviewId = ongoing.rows[0].id;
      }
    }

    if (interviewId) {
      interview = await InterviewModel.finishInterview(interviewId, scoreToSave, analysisToSave);
    }

    res.status(200).json({ success: true, interview, feedback });
  } catch (error) {
    const safeMsg = getSafeErrorMessage(error, "Failed to complete interview. Please try again later.");
    res.status(500).json({ success: false, message: safeMsg });
  }
};

const evaluateAnswer = async (req, res) => {
   try {
      const feedback = await interviewService.evaluateAnswer(req.body);
      res.status(200).json({ success: true, feedback });
   } catch (error) {
      const safeMsg = getSafeErrorMessage(error, "Failed to evaluate answer. Please try again later.");
      res.status(500).json({ success: false, message: safeMsg });
   }
};

const getHistory = async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId;
    const history = await InterviewModel.getUserInterviews(userId);
    res.status(200).json({ success: true, history });
  } catch (error) {
    const safeMsg = getSafeErrorMessage(error, "Failed to fetch interview history. Please try again later.");
    res.status(500).json({ success: false, message: safeMsg });
  }
};

const getSessionDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const details = await InterviewModel.getInterviewDetails(id);
    if (!details) return res.status(404).json({ success: false, message: "Interview not found" });
    res.status(200).json({ success: true, details });
  } catch (error) {
    const safeMsg = getSafeErrorMessage(error, "Failed to fetch interview details. Please try again later.");
    res.status(500).json({ success: false, message: safeMsg });
  }
};

const generateMore = async (req, res) => {
  try {
    const { mode, difficulty, targetRole, experienceLevel, skills, existingQuestions, count } = req.body;
    const questions = await interviewService.generateQuestions({ mode, difficulty, targetRole, experienceLevel, skills, count, existingQuestions });
    res.status(200).json({ success: true, questions });
  } catch (error) {
    const safeMsg = getSafeErrorMessage(error, "Failed to generate questions. Please try again later.");
    res.status(500).json({ success: false, message: safeMsg });
  }
};

module.exports = { startInterview, chatInterview, saveQA, completeInterview, evaluateAnswer, getHistory, getSessionDetails, generateMore };
