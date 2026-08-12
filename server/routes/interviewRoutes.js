const express = require("express");
const verifyToken = require("../middleware/authmiddleware");
const { evaluate, complete, start } = require("../controllers/interviewController");

const router = express.Router();
router.post("/evaluate", verifyToken, evaluate);
router.post("/start", verifyToken, start);
router.post("/complete", verifyToken, complete);
module.exports = router;
