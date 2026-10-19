// List of messages that are safe for the user to see
const SAFE_MESSAGES = [
  "Email already registered",
  "User not found",
  "Invalid Password",
  "Please verify your email before logging in",
  "This code has expired. Request a new one and try again.",
  "Too many incorrect attempts. Request a new code and try again.",
  "That code is incorrect. Please try again.",
  "No account found for this email",
  "No account found for this email address.",
  "Unable to reset this password.",
  "Google sign-in is not configured on the server.",
  "Google did not provide a verified email address.",
  "Enter a valid 6-digit code.",
  "Email is required.",
  "Enter a valid email address.",
  "Password must be at least 6 characters.",
  "Google credential is required.",
  "Email required",
  "Choose a PDF, DOCX, or TXT résumé to upload.",
  "Too many authentication attempts from this IP, please try again after 15 minutes.",
  "Too many OTP requests. Please wait 15 minutes before trying again.",
];

// Keywords that indicate a raw system/database error (NEVER send to frontend)
const SYSTEM_ERROR_KEYWORDS = [
  "relation",
  "column",
  "syntax error",
  "violates",
  "duplicate key",
  "ECONNREFUSED",
  "ENOTFOUND",
  "timeout",
  "connect ETIMEDOUT",
  "getaddrinfo",
  "FATAL",
  "password authentication failed",
  "pg_hba.conf",
  "SSL",
  "certificate",
  "ENOMEM",
  "spawn",
  "EACCES",
  "MODULE_NOT_FOUND",
];

function isSafeMessage(msg) {
  if (!msg) return false;
  // Check exact match first
  if (SAFE_MESSAGES.includes(msg)) return true;
  // Check if it starts with a known safe prefix (for Joi validation messages etc)
  if (msg.startsWith('"') && msg.includes("is required")) return true;
  if (msg.startsWith('"') && msg.includes("must be")) return true;
  if (msg.startsWith('"') && msg.includes("is not allowed")) return true;
  return false;
}

function isSystemError(msg) {
  if (!msg) return false;
  const lower = msg.toLowerCase();
  return SYSTEM_ERROR_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

/**
 * Takes an error and returns the message that should go to the frontend.
 * Always logs the REAL error to the terminal.
 */
function getSafeErrorMessage(err, fallback = "Something went wrong. Please try again later.") {
  const rawMessage = err?.message || "";

  // Always log the real error in the backend terminal
  console.error("─── SERVER ERROR ───────────────────────────────");
  console.error("Message:", rawMessage);
  if (err?.stack) console.error("Stack:", err.stack);
  console.error("────────────────────────────────────────────────");

  // If it's a known safe/user-facing message, forward it
  if (isSafeMessage(rawMessage)) return rawMessage;

  // If it contains system keywords, block it
  if (isSystemError(rawMessage)) return fallback;

  // For any other unknown error, also block it to be safe
  return fallback;
}

module.exports = { getSafeErrorMessage, isSafeMessage, isSystemError };
