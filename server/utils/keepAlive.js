const https = require("https");
const http = require("http");

/**
 * Keeps the Render backend alive by sending a heartbeat self-ping
 * every 10 minutes (Render free tier sleeps after 15 min of inactivity).
 */
const startKeepAlive = () => {
  const backendUrl =
    process.env.RENDER_EXTERNAL_URL ||
    process.env.BACKEND_URL ||
    "https://nextprep.onrender.com";

  // Interval: 10 minutes (600,000 ms) - safely within Render's 15 min idle limit
  const PING_INTERVAL_MS = 10 * 60 * 1000;

  const pingServer = () => {
    try {
      const url = new URL("/api/health", backendUrl);
      const client = url.protocol === "http:" ? http : https;

      client
        .get(url.toString(), (res) => {
          if (res.statusCode === 200) {
            console.log(`[KeepAlive] Heartbeat ping successful (${url.toString()}) - Status: 200 OK`);
          } else {
            console.log(`[KeepAlive] Heartbeat ping returned status: ${res.statusCode}`);
          }
        })
        .on("error", (err) => {
          console.warn(`[KeepAlive] Ping warning (will retry in 10m): ${err.message}`);
        });
    } catch (err) {
      console.warn(`[KeepAlive] Could not parse backend URL: ${err.message}`);
    }
  };

  // Initial delay of 2 minutes after startup before first ping
  setTimeout(() => {
    pingServer();
    setInterval(pingServer, PING_INTERVAL_MS);
  }, 2 * 60 * 1000);

  console.log(`[KeepAlive] Background self-ping activated for: ${backendUrl} (heartbeat every 10 min)`);
};

module.exports = { startKeepAlive };
