import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Single shared client instance
export const supabase = createClient(url, anonKey);

// ── DB row types ─────────────────────────────────────────────

export interface StudentRow {
  id: string;
  username: string;
  display_name: string;
  role: "student" | "admin";
  created_at: string;
}

export interface QuizAttemptRow {
  id: string;
  student_id: string;
  module_slug: string;
  attempt_number: number;
  question_id: string;
  selected_answer: string;
  is_correct: boolean;
  answered_at: string;
}

export interface ModuleQuizSessionRow {
  student_id: string;
  module_slug: string;
  attempt_number: number;
  started_at: string;
  completed_at: string | null;
  score: number;
  question_count: number;
}

export interface QuizAttemptSummary {
  attemptNumber: number;
  score: number;
  questionCount: number;
  startedAt: string;
  completedAt: string | null;
  inProgress: boolean;
}
