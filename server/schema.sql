-- ========================================================
-- NextPrep Database Schema for PostgreSQL / Supabase
-- ========================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  cookie_consent TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Email Verification OTPs
CREATE TABLE IF NOT EXISTS email_verifications (
  email TEXT PRIMARY KEY,
  otp_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Password Reset OTPs
CREATE TABLE IF NOT EXISTS password_resets (
  email TEXT PRIMARY KEY,
  otp_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Resumes & ATS Evaluations
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

-- 5. Mock Interview Sessions
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

-- 6. Interview Question & Answer Logs
CREATE TABLE IF NOT EXISTS interview_qna (
  id SERIAL PRIMARY KEY,
  interview_id INTEGER REFERENCES interviews(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  user_answer TEXT,
  ai_feedback TEXT,
  score INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Helpful Indexes for Fast Query Performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_interviews_user_id ON interviews(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_qna_interview_id ON interview_qna(interview_id);
