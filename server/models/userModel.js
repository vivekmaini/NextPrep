const pool = require("../config/db");

const ensureVerificationTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS email_verifications (
      email TEXT PRIMARY KEY,
      otp_hash TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
};

const ensurePasswordResetTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS password_resets (
      email TEXT PRIMARY KEY,
      otp_hash TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
};

// Create User
const createUser = async (fullName, email, password) => {
  const query = `
    INSERT INTO users (full_name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [fullName, email, password];

  const result = await pool.query(query, values);

  return result.rows[0];
};

// Get User By Email
const getUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1;
  `;

  const result = await pool.query(query, [email]);

  return result.rows[0];
};

const saveEmailVerification = async (email, otpHash, expiresAt) => {
  await ensureVerificationTable();
  await pool.query(
    `INSERT INTO email_verifications (email, otp_hash, expires_at, attempts)
     VALUES ($1, $2, $3, 0)
     ON CONFLICT (email) DO UPDATE
       SET otp_hash = EXCLUDED.otp_hash,
           expires_at = EXCLUDED.expires_at,
           attempts = 0,
           created_at = NOW();`,
    [email, otpHash, expiresAt]
  );
};

const getEmailVerification = async (email) => {
  await ensureVerificationTable();
  const result = await pool.query(
    "SELECT * FROM email_verifications WHERE email = $1;",
    [email]
  );
  return result.rows[0];
};

const incrementVerificationAttempts = async (email) => {
  await pool.query(
    "UPDATE email_verifications SET attempts = attempts + 1 WHERE email = $1;",
    [email]
  );
};

const removeEmailVerification = async (email) => {
  await ensureVerificationTable();
  await pool.query("DELETE FROM email_verifications WHERE email = $1;", [email]);
};

const savePasswordReset = async (email, otpHash, expiresAt) => {
  await ensurePasswordResetTable();
  await pool.query(
    `INSERT INTO password_resets (email, otp_hash, expires_at, attempts)
     VALUES ($1, $2, $3, 0)
     ON CONFLICT (email) DO UPDATE
       SET otp_hash = EXCLUDED.otp_hash,
           expires_at = EXCLUDED.expires_at,
           attempts = 0,
           created_at = NOW();`,
    [email, otpHash, expiresAt]
  );
};

const getPasswordReset = async (email) => {
  await ensurePasswordResetTable();
  const result = await pool.query("SELECT * FROM password_resets WHERE email = $1;", [email]);
  return result.rows[0];
};

const incrementPasswordResetAttempts = async (email) => {
  await pool.query("UPDATE password_resets SET attempts = attempts + 1 WHERE email = $1;", [email]);
};

const removePasswordReset = async (email) => {
  await ensurePasswordResetTable();
  await pool.query("DELETE FROM password_resets WHERE email = $1;", [email]);
};

const updateUserPassword = async (email, password) => {
  const result = await pool.query(
    "UPDATE users SET password = $2 WHERE email = $1 RETURNING *;",
    [email, password]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
  saveEmailVerification,
  getEmailVerification,
  incrementVerificationAttempts,
  removeEmailVerification,
  savePasswordReset,
  getPasswordReset,
  incrementPasswordResetAttempts,
  removePasswordReset,
  updateUserPassword,
};
