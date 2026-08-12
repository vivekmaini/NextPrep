const express = require("express");
const multer = require("multer");
const verifyToken = require("../middleware/authmiddleware");
const resumeController = require("../controllers/resumeController");

const router = express.Router();
const acceptedMimeTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => callback(null, acceptedMimeTypes.includes(file.mimetype)),
});

router.get("/latest", verifyToken, resumeController.getLatestResume);
router.post("/upload", verifyToken, upload.single("resume"), resumeController.uploadResume);

module.exports = router;
