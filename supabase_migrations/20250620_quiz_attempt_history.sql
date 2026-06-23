-- Quiz attempt history: multiple attempts per student per module.
-- Run in Supabase SQL Editor after backing up.

-- 1. Add attempt_number to quiz_attempts (existing rows become attempt 1)
ALTER TABLE quiz_attempts
  ADD COLUMN IF NOT EXISTS attempt_number int NOT NULL DEFAULT 1;

-- 2. Replace unique constraint (one row per student + module + attempt + question)
ALTER TABLE quiz_attempts
  DROP CONSTRAINT IF EXISTS quiz_attempts_student_id_module_slug_question_id_key;

ALTER TABLE quiz_attempts
  DROP CONSTRAINT IF EXISTS quiz_attempts_student_module_attempt_question_key;

ALTER TABLE quiz_attempts
  ADD CONSTRAINT quiz_attempts_student_module_attempt_question_key
  UNIQUE (student_id, module_slug, attempt_number, question_id);

-- 3. Session metadata (score, completion time) per attempt
CREATE TABLE IF NOT EXISTS module_quiz_sessions (
  student_id      uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  module_slug     text NOT NULL,
  attempt_number  int NOT NULL,
  started_at      timestamptz NOT NULL DEFAULT now(),
  completed_at    timestamptz,
  score           int NOT NULL DEFAULT 0,
  question_count  int NOT NULL DEFAULT 0,
  PRIMARY KEY (student_id, module_slug, attempt_number)
);

CREATE INDEX IF NOT EXISTS module_quiz_sessions_student_module_idx
  ON module_quiz_sessions (student_id, module_slug, attempt_number DESC);

-- 4. Backfill sessions from existing attempt-1 answers
INSERT INTO module_quiz_sessions (student_id, module_slug, attempt_number, score, question_count, completed_at)
SELECT
  student_id,
  module_slug,
  1,
  COUNT(*) FILTER (WHERE is_correct),
  COUNT(*),
  MAX(answered_at)
FROM quiz_attempts
WHERE attempt_number = 1
GROUP BY student_id, module_slug
ON CONFLICT (student_id, module_slug, attempt_number) DO NOTHING;
