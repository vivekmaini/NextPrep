const { Pool } = require("pg");
require("dotenv").config();

const poolConfig = process.env.DATABASE_URL
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

const pool = new Pool(poolConfig);

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