import { supabase, StudentRow, QuizAttemptRow } from "./supabase";
import { QuestionAnswer } from "./progress";

export interface ModuleProgressSummary {
  score: number;
  answeredCount: number;
}

export interface StudentMonitoringRow {
  student: StudentRow;
  totalScore: number;
  answeredCount: number;
  lastAnsweredAt: string | null;
  lastActiveModuleSlug: string | null;
  progress: Record<string, ModuleProgressSummary>;
}

// ── Students ──────────────────────────────────────────────────

/** Look up a student row by username. Returns null if not found. */
export async function getStudentByUsername(
  username: string
): Promise<StudentRow | null> {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("username", username.toLowerCase())
    .single();

  if (error || !data) return null;
  return data as StudentRow;
}

// ── Quiz attempts ─────────────────────────────────────────────

/**
 * Save (upsert) a single question answer.
 * If the student has already answered this question, it is overwritten.
 */
export async function saveAnswer(
  studentId: string,
  moduleSlug: string,
  questionId: string,
  answer: QuestionAnswer
): Promise<void> {
  await supabase.from("quiz_attempts").upsert(
    {
      student_id: studentId,
      module_slug: moduleSlug,
      question_id: questionId,
      selected_answer: answer.selectedAnswer,
      is_correct: answer.isCorrect,
      answered_at: new Date().toISOString(),
    },
    { onConflict: "student_id,module_slug,question_id" }
  );
}

/**
 * Load all saved answers for one student + module.
 * Returns a map of questionId → QuestionAnswer.
 */
export async function loadModuleAnswers(
  studentId: string,
  moduleSlug: string
): Promise<Record<string, QuestionAnswer>> {
  const { data, error } = await supabase
    .from("quiz_attempts")
    .select("question_id, selected_answer, is_correct")
    .eq("student_id", studentId)
    .eq("module_slug", moduleSlug);

  if (error || !data) return {};

  const result: Record<string, QuestionAnswer> = {};
  for (const row of data as Pick<
    QuizAttemptRow,
    "question_id" | "selected_answer" | "is_correct"
  >[]) {
    result[row.question_id] = {
      selectedAnswer: row.selected_answer,
      isCorrect: row.is_correct,
    };
  }
  return result;
}

/**
 * Load scores for all modules for one student.
 * Returns a map of moduleSlug → { score, total } where total
 * is the number of answered questions (not total questions in module).
 */
export async function loadAllProgress(
  studentId: string
): Promise<Record<string, ModuleProgressSummary>> {
  const { data, error } = await supabase
    .from("quiz_attempts")
    .select("module_slug, is_correct")
    .eq("student_id", studentId);

  if (error || !data) return {};

  const result: Record<string, { score: number; answeredCount: number }> = {};
  for (const row of data as Pick<QuizAttemptRow, "module_slug" | "is_correct">[]) {
    if (!result[row.module_slug]) {
      result[row.module_slug] = { score: 0, answeredCount: 0 };
    }
    result[row.module_slug].answeredCount += 1;
    if (row.is_correct) result[row.module_slug].score += 1;
  }
  return result;
}

export async function loadStudentStatuses(): Promise<StudentMonitoringRow[]> {
  const [{ data: students, error: studentsError }, { data: attempts, error: attemptsError }] =
    await Promise.all([
      supabase.from("students").select("*").order("display_name", { ascending: true }),
      supabase
        .from("quiz_attempts")
        .select("student_id, module_slug, is_correct, answered_at")
        .order("answered_at", { ascending: false }),
    ]);

  if (studentsError || !students) return [];

  const monitorRows = new Map<string, StudentMonitoringRow>();

  for (const student of students as StudentRow[]) {
    if (student.role !== "student") continue;
    monitorRows.set(student.id, {
      student,
      totalScore: 0,
      answeredCount: 0,
      lastAnsweredAt: null,
      lastActiveModuleSlug: null,
      progress: {},
    });
  }

  if (attemptsError || !attempts) {
    return Array.from(monitorRows.values());
  }

  for (const attempt of attempts as Pick<
    QuizAttemptRow,
    "student_id" | "module_slug" | "is_correct" | "answered_at"
  >[]) {
    const row = monitorRows.get(attempt.student_id);
    if (!row) continue;

    if (!row.progress[attempt.module_slug]) {
      row.progress[attempt.module_slug] = { score: 0, answeredCount: 0 };
    }

    row.progress[attempt.module_slug].answeredCount += 1;
    row.answeredCount += 1;

    if (attempt.is_correct) {
      row.progress[attempt.module_slug].score += 1;
      row.totalScore += 1;
    }

    if (!row.lastAnsweredAt) {
      row.lastAnsweredAt = attempt.answered_at;
      row.lastActiveModuleSlug = attempt.module_slug;
    }
  }

  return Array.from(monitorRows.values());
}

export interface StudentAttemptDetail {
  module_slug: string;
  question_id: string;
  selected_answer: string;
  is_correct: boolean;
  answered_at: string;
}

/** Load every attempt (with selected_answer) for one student — used by admin detail view. */
export async function loadStudentDetail(studentId: string): Promise<StudentAttemptDetail[]> {
  const { data, error } = await supabase
    .from("quiz_attempts")
    .select("module_slug, question_id, selected_answer, is_correct, answered_at")
    .eq("student_id", studentId)
    .order("answered_at", { ascending: true });

  if (error || !data) return [];
  return data as StudentAttemptDetail[];
}

/**
 * Delete all answers for a student + module (used by Retake Quiz).
 */
export async function clearModuleAnswers(
  studentId: string,
  moduleSlug: string
): Promise<void> {
  await supabase
    .from("quiz_attempts")
    .delete()
    .eq("student_id", studentId)
    .eq("module_slug", moduleSlug);
}
