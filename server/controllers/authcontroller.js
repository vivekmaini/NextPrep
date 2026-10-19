const { registerSchema } = require("../validators/authValidator");
const authService = require("../services/authservice");
const { getSafeErrorMessage } = require("../middlewares/errorHandler");

const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const { fullName, email, password } = req.body;
    const user = await authService.register(fullName, email, password);
    res.status(201).json({ success: true, message: "User Registered Successfully", user });
  } catch (err) {
    const safeMsg = getSafeErrorMessage(err);
    res.status(500).json({ success: false, message: safeMsg });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.status(200).json({ success: true, message: "Login Successful", ...data });
  } catch (err) {
    const safeMsg = getSafeErrorMessage(err);
    res.status(401).json({ success: false, message: safeMsg });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !/^\d{6}$/.test(otp || "")) {
      return res.status(400).json({ success: false, message: "Enter a valid 6-digit code." });
    }
    const data = await authService.verifyOtp(email, otp);
    return res.status(200).json({ success: true, message: "Email verified successfully", ...data });
  } catch (err) {
    const safeMsg = getSafeErrorMessage(err);
    return res.status(400).json({ success: false, message: safeMsg });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required." });
    await authService.resendOtp(email);
    return res.status(200).json({ success: true, message: "A new verification code has been sent." });
  } catch (err) {
    const safeMsg = getSafeErrorMessage(err);
    return res.status(400).json({ success: false, message: safeMsg });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email address." });
    }
    await authService.requestPasswordReset(email);
    return res.status(200).json({ success: true, message: "A password reset code has been sent." });
  } catch (err) {
    const safeMsg = getSafeErrorMessage(err);
    return res.status(400).json({ success: false, message: safeMsg });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email address." });
    }
    if (!/^\d{6}$/.test(otp || "")) {
      return res.status(400).json({ success: false, message: "Enter a valid 6-digit code." });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
    }
    await authService.resetPassword(email, otp, password);
    return res.status(200).json({ success: true, message: "Password reset successfully. You can now log in." });
  } catch (err) {
    const safeMsg = getSafeErrorMessage(err);
    return res.status(400).json({ success: false, message: safeMsg });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ success: false, message: "Google credential is required." });
    }
    const data = await authService.googleAuth(credential);
    return res.status(200).json({ success: true, message: "Google sign-in successful", ...data });
  } catch (err) {
    const safeMsg = getSafeErrorMessage(err);
    return res.status(401).json({ success: false, message: safeMsg });
  }
};

const saveConsent = async (req, res) => {
  try {
    const { email, consent } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email required" });
    const pool = require("../config/db");
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS cookie_consent TEXT DEFAULT 'pending'`);
    await pool.query(`UPDATE users SET cookie_consent = $1 WHERE email = $2`, [consent, email]);
    return res.status(200).json({ success: true, message: "Consent saved to database" });
  } catch (err) {
    const safeMsg = getSafeErrorMessage(err);
    return res.status(500).json({ success: false, message: safeMsg });
  }
};

module.exports = {
  register,
  login,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  googleAuth,
  saveConsent,
};
