require("dotenv").config();

// Safety handlers: Prevent unexpected runtime exceptions or rejections from shutting down the server
process.on("uncaughtException", (err) => {
  console.error("Critical uncaughtException prevented from crashing backend:", err?.message || err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Critical unhandledRejection prevented from crashing backend:", reason?.message || reason);
});

require("./config/db");

const app = require("./app");
const { warmup } = require("./ai/warmup");
const { startKeepAlive } = require("./utils/keepAlive");

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  warmup().catch(() => {});
  startKeepAlive();
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use by another process.`);
    console.error(`👉 Run 'npm run kill-port' to free port ${PORT}, then restart.`);
    process.exit(1);
  } else {
    console.error("❌ Unexpected server error:", err);
  }
});

const handleExit = (signal) => {
  console.log(`\n[Server] Received ${signal}. Closing gracefully...`);
  server.close(() => {
    console.log("[Server] Closed HTTP listener.");
    process.exit(0);
  });
};

process.on("SIGINT", () => handleExit("SIGINT"));
process.on("SIGTERM", () => handleExit("SIGTERM"));
