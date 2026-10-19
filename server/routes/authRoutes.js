const express = require("express");

const router = express.Router();

const authController = require("../controllers/authcontroller");
const { authLimiter, otpLimiter } = require("../middlewares/rateLimiter");

router.post("/register", authLimiter, authController.register);
router.post("/login", authLimiter, authController.login);
router.post("/verify-otp", otpLimiter, authController.verifyOtp);
router.post("/resend-otp", otpLimiter, authController.resendOtp);
router.post("/forgot-password", authLimiter, authController.forgotPassword);
router.post("/reset-password", authLimiter, authController.resetPassword);
router.post("/google", authLimiter, authController.googleAuth);

router.post("/consent", authController.saveConsent);

module.exports = router;
