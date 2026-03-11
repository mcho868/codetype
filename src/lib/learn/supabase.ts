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
  question_id: string;
  selected_answer: string;
  is_correct: boolean;
  answered_at: string;
}
