const rateLimit = require("express-rate-limit");

// General Auth Limiter (Login, Register) - 10 attempts per 15 mins
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
  message: {
    success: false,
    message: "Too many authentication attempts from this IP, please try again after 15 minutes."
  },
  standardHeaders: true, 
  legacyHeaders: false,
});

// OTP Limiter (Resend, Verify) - stricter to prevent SMS/Email spam - 5 attempts per 15 mins
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many OTP requests. Please wait 15 minutes before trying again."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  authLimiter,
  otpLimiter
};
