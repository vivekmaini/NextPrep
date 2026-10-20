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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  warmup().catch(() => {});
  startKeepAlive();
});
