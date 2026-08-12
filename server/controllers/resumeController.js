const resumeService = require("../services/resumeService");
const { validateResumeUpload } = require("../validators/resumeValidator");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "Choose a PDF, DOCX, or TXT résumé to upload." });
    const { error, value } = validateResumeUpload(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    const resume = await resumeService.uploadAndAnalyse({ userId: req.user.id, file: req.file, targetRole: value.targetRole, jobDescription: value.jobDescription });
    return res.status(201).json({ success: true, message: "Résumé analysed successfully.", resume });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ success: false, message: error.message || "We couldn't analyse this résumé." });
  }
};

const getLatestResume = async (req, res) => {
  try {
    const resume = await resumeService.getLatestResumeForUser(req.user.id);
    return res.status(200).json({ success: true, resume: resume || null });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to load your résumé analysis." });
  }
};

module.exports = { uploadResume, getLatestResume };
