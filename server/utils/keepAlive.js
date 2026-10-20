const https = require("https");
const http = require("http");

/**
 * Keeps the backend alive:
 * 1. On Render/Cloud: Sends a heartbeat self-ping every 8 min
 *    so free-tier hosts don't sleep after 15 min idle.
 * 2. On Local: Pings local /api/health every 8 min to keep DB
 *    connections and timers alive.
 */
const startKeepAlive = () => {
  const backendUrl =
    process.env.RENDER_EXTERNAL_URL ||
    process.env.BACKEND_URL ||
    `http://localhost:${process.env.PORT || 3001}`;

  // Interval: 8 minutes (480,000 ms) - safely under Render's 15 min sleep limit
  const PING_INTERVAL_MS = 8 * 60 * 1000;

  const pingServer = () => {
    try {
      const url = new URL("/api/health", backendUrl);
      const client = url.protocol === "http:" ? http : https;

      client
        .get(url.toString(), (res) => {
          if (res.statusCode === 200) {
            console.log(`[KeepAlive] Heartbeat ping OK (${url.toString()}) - Status: 200`);
          } else {
            console.log(`[KeepAlive] Heartbeat ping returned status: ${res.statusCode}`);
          }
        })
        .on("error", (err) => {
          console.warn(`[KeepAlive] Ping notice: ${err.message}`);
        });
    } catch (err) {
      console.warn(`[KeepAlive] Could not parse backend URL: ${err.message}`);
    }
  };

  // Initial delay of 30 seconds after startup before first ping
  setTimeout(() => {
    pingServer();
    setInterval(pingServer, PING_INTERVAL_MS);
  }, 30 * 1000);

  console.log(`[KeepAlive] Background self-ping activated for: ${backendUrl} (heartbeat every 8 min)`);
};

module.exports = { startKeepAlive };
