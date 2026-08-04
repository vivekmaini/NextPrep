import api from "./api";

// POST /api/auth/register
// Backend creates an unverified user and emails an OTP.
export const registerUser = async ({ name, email, password }) => {
  const { data } = await api.post("/auth/register", { fullName: name, email, password });
  return data;
};

// POST /api/auth/login
export const loginUser = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

// POST /api/auth/verify-otp
export const verifyOtp = async ({ email, otp }) => {
  const { data } = await api.post("/auth/verify-otp", { email, otp });
  return data;
};

// POST /api/auth/resend-otp
export const resendOtp = async ({ email }) => {
  const { data } = await api.post("/auth/resend-otp", { email });
  return data;
};

// POST /api/auth/google
// credential is the Google ID token from Google Identity Services.
export const googleAuth = async ({ credential }) => {
  const { data } = await api.post("/auth/google", { credential });
  return data;
};
