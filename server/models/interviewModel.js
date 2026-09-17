const pool = require("../config/db");

const ensureInterviewTables = async () => {
  try {
    // 1. Interviews Table (Tracks the overall session and final analysis)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS interviews (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        role TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        interview_type TEXT NOT NULL,
        overall_score INTEGER,
        final_analysis TEXT,
        status TEXT DEFAULT 'ongoing',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        finished_at TIMESTAMPTZ
      );
    `);

    // 2. Interview Q&A Table (Tracks every live question, answer, and AI feedback)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS interview_qna (
        id SERIAL PRIMARY KEY,
        interview_id INTEGER REFERENCES interviews(id) ON DELETE CASCADE,
        question_text TEXT NOT NULL,
        user_answer TEXT,
        ai_feedback TEXT,
        score INTEGER,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log(" Interview & QnA tables ensured");
  } catch (err) {
    console.error(" Error creating Interview tables:", err);
  }
};

// Create a new interview session
const createInterview = async (userId, role, difficulty, interviewType) => {
  const result = await pool.query(
    `INSERT INTO interviews (user_id, role, difficulty, interview_type)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [userId, role, difficulty, interviewType]
  );
  return result.rows[0];
};

// Add a live question/answer along with AI analysis to the session
const addQnA = async (interviewId, question, answer, feedback, score) => {
  const result = await pool.query(
    `INSERT INTO interview_qna (interview_id, question_text, user_answer, ai_feedback, score)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [interviewId, question, answer, feedback, score]
  );
  return result.rows[0];
};

// Finish interview and save final live analysis report
const finishInterview = async (interviewId, overallScore, finalAnalysis) => {
  const result = await pool.query(
    `UPDATE interviews 
     SET status = 'completed', overall_score = $1, final_analysis = $2, finished_at = NOW()
     WHERE id = $3 RETURNING *`,
    [overallScore, finalAnalysis, interviewId]
  );
  return result.rows[0];
};

// Get all interviews and their live analysis for a specific user
const getUserInterviews = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM interviews WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

// Get complete live details (All QnAs) of a specific interview session
const getInterviewDetails = async (interviewId) => {
  const interview = await pool.query(`SELECT * FROM interviews WHERE id = $1`, [interviewId]);
  const qna = await pool.query(`SELECT * FROM interview_qna WHERE interview_id = $1 ORDER BY created_at ASC`, [interviewId]);
  
  if (interview.rows.length === 0) return null;
  return {
    ...interview.rows[0],
    qna: qna.rows
  };
};

module.exports = {
  ensureInterviewTables,
  createInterview,
  addQnA,
  finishInterview,
  getUserInterviews,
  getInterviewDetails
};
