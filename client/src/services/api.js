import axios from "axios";

// Central Axios instance used by every service module.
// Base URL comes from Vite env so it can differ between local dev and Render/Vercel deployments.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error responses so callers always get { success, message }.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message ||
      (error?.request
        ? "Can't reach the server. Start the NextPrep backend and try again."
        : "Something went wrong. Please try again.");
    return Promise.reject({ success: false, message, status: error?.response?.status });
  }
);

export default api;
