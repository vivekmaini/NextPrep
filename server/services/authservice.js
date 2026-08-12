const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");

const {
  createUser,
  getUserByEmail,
  saveEmailVerification,
  getEmailVerification,
  incrementVerificationAttempts,
  removeEmailVerification,
  savePasswordReset,
  getPasswordReset,
  incrementPasswordResetAttempts,
  removePasswordReset,
  updateUserPassword,
} = require("../models/userModel");
const { sendVerificationEmail, sendPasswordResetEmail } = require("./emailService");

const OTP_LENGTH = 6;
const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_OTP_ATTEMPTS = 5;
const googleClient = new OAuth2Client();

const normalizeEmail = (email) => email.trim().toLowerCase();
const createOtp = () => crypto.randomInt(0, 10 ** OTP_LENGTH).toString().padStart(OTP_LENGTH, "0");
const publicUser = ({ password, ...user }) => user;
const createSession = (user) => ({
  token: jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  ),
  user: publicUser(user),
});

const sendOtp = async (email) => {
  const otp = createOtp();
  const otpHash = await bcrypt.hash(otp, 10);
  await saveEmailVerification(email, otpHash, new Date(Date.now() + OTP_TTL_MS));
  await sendVerificationEmail({ email, otp });
};

// Register
const register = async (fullName, email, password) => {
  const normalizedEmail = normalizeEmail(email);
  const existingUser = await getUserByEmail(normalizedEmail);

  if (existingUser) {
    const pendingVerification = await getEmailVerification(normalizedEmail);
    if (pendingVerification) {
      await sendOtp(normalizedEmail);
      return publicUser(existingUser);
    }
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser(
    fullName,
    normalizedEmail,
    hashedPassword
  );

  await sendOtp(normalizedEmail);

  return publicUser(user);
};

// Login
const login = async (email, password) => {
  const normalizedEmail = normalizeEmail(email);
  const user = await getUserByEmail(normalizedEmail);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid Password");
  }

  const pendingVerification = await getEmailVerification(normalizedEmail);
  if (pendingVerification) {
    throw new Error("Please verify your email before logging in");
  }

  return createSession(user);
};

const verifyOtp = async (email, otp) => {
  const normalizedEmail = normalizeEmail(email);
  const verification = await getEmailVerification(normalizedEmail);

  if (!verification || new Date(verification.expires_at) < new Date()) {
    if (verification) await removeEmailVerification(normalizedEmail);
    throw new Error("This code has expired. Request a new one and try again.");
  }
  if (verification.attempts >= MAX_OTP_ATTEMPTS) {
    throw new Error("Too many incorrect attempts. Request a new code and try again.");
  }

  const isValid = await bcrypt.compare(otp, verification.otp_hash);
  if (!isValid) {
    await incrementVerificationAttempts(normalizedEmail);
    throw new Error("That code is incorrect. Please try again.");
  }

  await removeEmailVerification(normalizedEmail);
  const user = await getUserByEmail(normalizedEmail);
  if (!user) throw new Error("User not found");

  return createSession(user);
};

const resendOtp = async (email) => {
  const normalizedEmail = normalizeEmail(email);
  const user = await getUserByEmail(normalizedEmail);
  if (!user) throw new Error("No account found for this email");

  await sendOtp(normalizedEmail);
};

const requestPasswordReset = async (email) => {
  const normalizedEmail = normalizeEmail(email);
  const user = await getUserByEmail(normalizedEmail);

  if (!user) throw new Error("No account found for this email address.");

  const otp = createOtp();
  const otpHash = await bcrypt.hash(otp, 10);
  await savePasswordReset(normalizedEmail, otpHash, new Date(Date.now() + OTP_TTL_MS));
  await sendPasswordResetEmail({ email: normalizedEmail, otp });
};

const resetPassword = async (email, otp, password) => {
  const normalizedEmail = normalizeEmail(email);
  const reset = await getPasswordReset(normalizedEmail);

  if (!reset || new Date(reset.expires_at) < new Date()) {
    if (reset) await removePasswordReset(normalizedEmail);
    throw new Error("This code has expired. Request a new one and try again.");
  }
  if (reset.attempts >= MAX_OTP_ATTEMPTS) {
    throw new Error("Too many incorrect attempts. Request a new code and try again.");
  }

  const isValid = await bcrypt.compare(otp, reset.otp_hash);
  if (!isValid) {
    await incrementPasswordResetAttempts(normalizedEmail);
    throw new Error("That code is incorrect. Please try again.");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await updateUserPassword(normalizedEmail, passwordHash);
  if (!user) throw new Error("Unable to reset this password.");
  await removePasswordReset(normalizedEmail);
};

const googleAuth = async (credential) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("Google sign-in is not configured on the server.");
  }

  const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: clientId });
  const profile = ticket.getPayload();
  if (!profile?.email || !profile.email_verified) {
    throw new Error("Google did not provide a verified email address.");
  }

  const email = normalizeEmail(profile.email);
  let user = await getUserByEmail(email);
  if (!user) {
    const generatedPassword = await bcrypt.hash(crypto.randomBytes(32).toString("hex"), 10);
    user = await createUser(profile.name || email.split("@")[0], email, generatedPassword);
  }

  // A Google-verified email does not need a separate OTP verification.
  await removeEmailVerification(email);
  return createSession(user);
};

module.exports = {
  register,
  login,
  verifyOtp,
  resendOtp,
  requestPasswordReset,
  resetPassword,
  googleAuth,
};
