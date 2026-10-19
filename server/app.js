const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/interviews", interviewRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NextPrep Backend is Running",
  });
});

// Global Error Handler - catches ANY unhandled error across ALL routes
// This is the LAST safety net: no raw error will EVER reach the frontend
app.use((err, req, res, next) => {
  console.error("─── UNHANDLED SERVER ERROR ─────────────────────");
  console.error("Route:", req.method, req.originalUrl);
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  console.error("────────────────────────────────────────────────");
  
  res.status(err.status || 500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
});

module.exports = app;
