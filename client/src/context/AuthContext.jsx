import { createContext, useContext, useState } from "react";
import api from "../services/api";
import {
  loginUser,
  registerUser,
  verifyOtp as verifyOtpRequest,
  resendOtp as resendOtpRequest,
  googleAuth,
} from "../services/authService";

const AuthContext = createContext(null);

const STORAGE_TOKEN_KEY = "token";
const STORAGE_USER_KEY = "user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_TOKEN_KEY));
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem(STORAGE_TOKEN_KEY);
      localStorage.removeItem(STORAGE_USER_KEY);
      return null;
    }
  });
  const [initializing] = useState(false);

  const persistSession = (nextToken, nextUser) => {
    localStorage.setItem(STORAGE_TOKEN_KEY, nextToken);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const login = async ({ email, password }) => {
    const data = await loginUser({ email, password });
    persistSession(data.token, data.user);
    return data;
  };

  const register = async ({ name, email, password }) => {
    const data = await registerUser({ name, email, password });
    // Account is unverified until the OTP is confirmed, so we deliberately
    // do NOT persist a session here even if the backend returns one.
    return data;
  };

  const verifyOtp = async ({ email, otp }) => {
    const data = await verifyOtpRequest({ email, otp });
    persistSession(data.token, data.user);
    return data;
  };

  const resendOtp = async ({ email }) => {
    return resendOtpRequest({ email });
  };

  const loginWithGoogle = async (credential) => {
    const data = await googleAuth({ credential });
    persistSession(data.token, data.user);
    return data;
  };

  const updateUser = (updatedUser) => {
    persistSession(token, updatedUser);
  };

  const logout = () => {
    try {
      api.delete("/resumes/clear").catch(() => {});
    } catch {
      // Ignore network errors on logout
    }
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem("nextprep_user_resume");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    initializing,
    login,
    register,
    verifyOtp,
    resendOtp,
    loginWithGoogle,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}