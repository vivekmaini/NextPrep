
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { startInterview, saveQA, completeInterview, evaluateAnswer, getHistory, getSessionDetails } = require("../controllers/interviewController");

// Use token verification for all interview routes
router.use(verifyToken);

router.post("/start", startInterview);
router.post("/qa", saveQA);
router.post("/complete", completeInterview);
router.post("/evaluate", evaluateAnswer);
router.get("/history", getHistory);
router.get("/:id", getSessionDetails);

module.exports = router;
