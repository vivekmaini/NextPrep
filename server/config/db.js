const { Pool } = require("pg");
require("dotenv").config();

const baseConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DB_SSL === "false" ? false : { rejectUnauthorized: false },
    }
  : {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
    };

const poolConfig = {
  ...baseConfig,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
};

const pool = new Pool(poolConfig);

// Safety net: Prevent unexpected idle connection resets from crashing the Node.js server
pool.on("error", (err) => {
  console.warn("[PostgreSQL] Idle client warning (auto-reconnecting):", err?.message || err);
});

pool
  .connect()
  .then((client) => {
    console.log("PostgreSQL Connected");
    client.release();
  })
  .catch((err) => {
    console.error("Database Connection Error:", err.message);
  });

module.exports = pool;