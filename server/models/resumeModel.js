const pool = require("../config/db");

const ensureResumeTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS resumes (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      file_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      ats_score INTEGER NOT NULL,
      suggestions JSONB NOT NULL DEFAULT '[]'::jsonb,
      feedback JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await pool.query("ALTER TABLE resumes ADD COLUMN IF NOT EXISTS feedback JSONB NOT NULL DEFAULT '{}'::jsonb;");
};

const createResume = async ({ userId, fileName, mimeType, atsScore, suggestions, feedback }) => {
  await ensureResumeTable();
  const result = await pool.query(
    `INSERT INTO resumes (user_id, file_name, mime_type, ats_score, suggestions, feedback)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, file_name, mime_type, ats_score, suggestions, feedback, created_at;`,
    [userId, fileName, mimeType, atsScore, JSON.stringify(suggestions), JSON.stringify(feedback)]
  );
  return result.rows[0];
};

const getLatestResumeForUser = async (userId) => {
  await ensureResumeTable();
  const result = await pool.query(
    `SELECT id, file_name, mime_type, ats_score, suggestions, feedback, created_at
     FROM resumes WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1;`,
    [userId]
  );
  return result.rows[0];
};

module.exports = { createResume, getLatestResumeForUser };
