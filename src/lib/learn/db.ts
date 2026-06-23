import {
  supabase,
  StudentRow,
  QuizAttemptRow,
  ModuleQuizSessionRow,
  QuizAttemptSummary,
} from "./supabase";
import { QuestionAnswer } from "./progress";

export type { QuizAttemptSummary };

export interface ModuleProgressSummary {
  score: number;
  answeredCount: number;
  bestScore?: number;
  latestAttempt?: number;
}

export interface StudentMonitoringRow {
  student: StudentRow;
  totalScore: number;
  answeredCount: number;
  lastAnsweredAt: string | null;
  lastActiveModuleSlug: string | null;
  progress: Record<string, ModuleProgressSummary>;
}

function attemptProgressKey(
  studentId: string,
  moduleSlug: string,
  attemptNumber: number
): string {
  return `${studentId}:${moduleSlug}:${attemptNumber}`;
}

function countAnsweredAttempts(
  attempts: Pick<
    QuizAttemptRow,
    "student_id" | "module_slug" | "attempt_number" | "question_id"
  >[]
): Map<string, number> {
  const answered = new Map<string, Set<string>>();

  for (const attempt of attempts) {
    const key = attemptProgressKey(
      attempt.student_id,
      attempt.module_slug,
      attempt.attempt_number
    );
    const questions = answered.get(key) ?? new Set<string>();
    questions.add(attempt.question_id);
    answered.set(key, questions);
  }

  return new Map(
    Array.from(answered.entries()).map(([key, questions]) => [key, questions.size])
  );
}

// ── Students ──────────────────────────────────────────────────

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

// ── Quiz sessions & attempts ──────────────────────────────────

async function ensureQuizSession(
  studentId: string,
  moduleSlug: string,
  attemptNumber: number,
  questionCount: number
): Promise<void> {
  await supabase.from("module_quiz_sessions").upsert(
    {
      student_id: studentId,
      module_slug: moduleSlug,
      attempt_number: attemptNumber,
      question_count: questionCount,
    },
    { onConflict: "student_id,module_slug,attempt_number", ignoreDuplicates: true }
  );
}

async function refreshSessionScore(
  studentId: string,
  moduleSlug: string,
  attemptNumber: number
): Promise<void> {
  const answers = await loadModuleAnswers(studentId, moduleSlug, attemptNumber);
  const score = Object.values(answers).filter((a) => a.isCorrect).length;
  const answeredCount = Object.keys(answers).length;

  await supabase
    .from("module_quiz_sessions")
    .update({ score })
    .eq("student_id", studentId)
    .eq("module_slug", moduleSlug)
    .eq("attempt_number", attemptNumber);

  // Keep question_count at least as large as answered count
  if (answeredCount > 0) {
    const { data } = await supabase
      .from("module_quiz_sessions")
      .select("question_count")
      .eq("student_id", studentId)
      .eq("module_slug", moduleSlug)
      .eq("attempt_number", attemptNumber)
      .single();

    const row = data as Pick<ModuleQuizSessionRow, "question_count"> | null;
    if (row && row.question_count < answeredCount) {
      await supabase
        .from("module_quiz_sessions")
        .update({ question_count: answeredCount })
        .eq("student_id", studentId)
        .eq("module_slug", moduleSlug)
        .eq("attempt_number", attemptNumber);
    }
  }
}

/**
 * Load session metadata for a specific attempt.
 */
export async function getQuizSession(
  studentId: string,
  moduleSlug: string,
  attemptNumber: number
): Promise<ModuleQuizSessionRow | null> {
  const { data, error } = await supabase
    .from("module_quiz_sessions")
    .select("*")
    .eq("student_id", studentId)
    .eq("module_slug", moduleSlug)
    .eq("attempt_number", attemptNumber)
    .maybeSingle();

  if (error || !data) return null;
  return data as ModuleQuizSessionRow;
}

/**
 * Load the latest session for a module, or null if none.
 */
export async function getLatestSession(
  studentId: string,
  moduleSlug: string
): Promise<ModuleQuizSessionRow | null> {
  const { data, error } = await supabase
    .from("module_quiz_sessions")
    .select("*")
    .eq("student_id", studentId)
    .eq("module_slug", moduleSlug)
    .order("attempt_number", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return data as ModuleQuizSessionRow;
}

/**
 * Open the quiz: continue an in-progress attempt, or start a new one if the last is complete.
 */
export async function getOrCreateActiveAttempt(
  studentId: string,
  moduleSlug: string,
  questionCount: number
): Promise<number> {
  const latest = await getLatestSession(studentId, moduleSlug);

  if (latest && !latest.completed_at) {
    return latest.attempt_number;
  }

  const nextAttempt = (latest?.attempt_number ?? 0) + 1;
  await ensureQuizSession(studentId, moduleSlug, nextAttempt, questionCount);
  return nextAttempt;
}

/**
 * Start a fresh attempt without deleting previous ones.
 */
export async function startNewAttempt(
  studentId: string,
  moduleSlug: string,
  questionCount: number
): Promise<number> {
  const latest = await getLatestSession(studentId, moduleSlug);
  const nextAttempt = (latest?.attempt_number ?? 0) + 1;
  await ensureQuizSession(studentId, moduleSlug, nextAttempt, questionCount);
  return nextAttempt;
}

/** Mark an attempt complete when the student views results. */
export async function completeQuizSession(
  studentId: string,
  moduleSlug: string,
  attemptNumber: number,
  score: number,
  questionCount: number
): Promise<void> {
  await supabase.from("module_quiz_sessions").upsert(
    {
      student_id: studentId,
      module_slug: moduleSlug,
      attempt_number: attemptNumber,
      score,
      question_count: questionCount,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "student_id,module_slug,attempt_number" }
  );
}

/** Recent attempts for a module (newest first). */
export async function loadAttemptHistory(
  studentId: string,
  moduleSlug: string,
  limit = 5
): Promise<QuizAttemptSummary[]> {
  const { data, error } = await supabase
    .from("module_quiz_sessions")
    .select("attempt_number, score, question_count, started_at, completed_at")
    .eq("student_id", studentId)
    .eq("module_slug", moduleSlug)
    .order("attempt_number", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return (data as ModuleQuizSessionRow[]).map((row) => ({
    attemptNumber: row.attempt_number,
    score: row.score,
    questionCount: row.question_count,
    startedAt: row.started_at,
    completedAt: row.completed_at,
    inProgress: !row.completed_at,
  }));
}

export async function saveAnswer(
  studentId: string,
  moduleSlug: string,
  questionId: string,
  answer: QuestionAnswer,
  attemptNumber: number
): Promise<void> {
  await supabase.from("quiz_attempts").upsert(
    {
      student_id: studentId,
      module_slug: moduleSlug,
      attempt_number: attemptNumber,
      question_id: questionId,
      selected_answer: answer.selectedAnswer,
      is_correct: answer.isCorrect,
      answered_at: new Date().toISOString(),
    },
    { onConflict: "student_id,module_slug,attempt_number,question_id" }
  );

  await refreshSessionScore(studentId, moduleSlug, attemptNumber);
}

export async function loadModuleAnswers(
  studentId: string,
  moduleSlug: string,
  attemptNumber = 1
): Promise<Record<string, QuestionAnswer>> {
  const { data, error } = await supabase
    .from("quiz_attempts")
    .select("question_id, selected_answer, is_correct")
    .eq("student_id", studentId)
    .eq("module_slug", moduleSlug)
    .eq("attempt_number", attemptNumber);

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
 * Best score per module (from session history) plus latest attempt progress.
 */
export async function loadAllProgress(
  studentId: string
): Promise<Record<string, ModuleProgressSummary>> {
  const [
    { data: sessions, error },
    { data: attempts, error: attemptsError },
  ] = await Promise.all([
    supabase
      .from("module_quiz_sessions")
      .select("module_slug, attempt_number, score, question_count, completed_at")
      .eq("student_id", studentId)
      .order("attempt_number", { ascending: false }),
    supabase
      .from("quiz_attempts")
      .select("student_id, module_slug, attempt_number, question_id")
      .eq("student_id", studentId),
  ]);

  if (error || !sessions) {
    return loadAllProgressLegacy(studentId);
  }

  if (attemptsError || !attempts) return {};

  const answeredByAttempt = countAnsweredAttempts(
    attempts as Pick<
      QuizAttemptRow,
      "student_id" | "module_slug" | "attempt_number" | "question_id"
    >[]
  );

  const result: Record<string, ModuleProgressSummary> = {};

  for (const row of sessions as ModuleQuizSessionRow[]) {
    const slug = row.module_slug;
    const answeredCount =
      answeredByAttempt.get(attemptProgressKey(studentId, slug, row.attempt_number)) ?? 0;

    if (!result[slug]) {
      result[slug] = {
        score: row.score,
        answeredCount,
        bestScore: row.score,
        latestAttempt: row.attempt_number,
      };
    } else {
      result[slug].bestScore = Math.max(result[slug].bestScore ?? 0, row.score);
      if (row.attempt_number > (result[slug].latestAttempt ?? 0)) {
        result[slug].latestAttempt = row.attempt_number;
        result[slug].score = row.score;
        result[slug].answeredCount = answeredCount;
      }
    }
  }

  // Use best score for module card display
  for (const slug of Object.keys(result)) {
    result[slug].score = result[slug].bestScore ?? result[slug].score;
  }

  return result;
}

/** Fallback when module_quiz_sessions is not migrated yet. */
async function loadAllProgressLegacy(
  studentId: string
): Promise<Record<string, ModuleProgressSummary>> {
  const { data, error } = await supabase
    .from("quiz_attempts")
    .select("module_slug, is_correct")
    .eq("student_id", studentId)
    .eq("attempt_number", 1);

  if (error || !data) return {};

  const result: Record<string, ModuleProgressSummary> = {};
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
  const [
    { data: students, error: studentsError },
    { data: sessions, error: sessionsError },
    { data: progressAttempts, error: progressAttemptsError },
  ] =
    await Promise.all([
      supabase.from("students").select("*").order("display_name", { ascending: true }),
      supabase
        .from("module_quiz_sessions")
        .select("student_id, module_slug, score, question_count, started_at")
        .order("started_at", { ascending: false }),
      supabase
        .from("quiz_attempts")
        .select("student_id, module_slug, attempt_number, question_id"),
    ]);

  if (studentsError || !students) return [];

  const answeredByAttempt =
    !progressAttemptsError && progressAttempts
      ? countAnsweredAttempts(
          progressAttempts as Pick<
            QuizAttemptRow,
            "student_id" | "module_slug" | "attempt_number" | "question_id"
          >[]
        )
      : new Map<string, number>();

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

  if (!sessionsError && sessions) {
    for (const session of sessions as ModuleQuizSessionRow[]) {
      const row = monitorRows.get(session.student_id);
      if (!row) continue;
      const answeredCount =
        answeredByAttempt.get(
          attemptProgressKey(
            session.student_id,
            session.module_slug,
            session.attempt_number
          )
        ) ?? 0;

      const existing = row.progress[session.module_slug];
      if (!existing) {
        row.progress[session.module_slug] = {
          score: session.score,
          answeredCount,
          bestScore: session.score,
        };
        row.answeredCount += answeredCount;
        row.totalScore += session.score;
      } else {
        existing.bestScore = Math.max(existing.bestScore ?? existing.score, session.score);
        existing.score = existing.bestScore;
      }

      if (!row.lastAnsweredAt) {
        row.lastAnsweredAt = session.started_at;
        row.lastActiveModuleSlug = session.module_slug;
      }
    }
    return Array.from(monitorRows.values());
  }

  // Legacy fallback
  const { data: attempts } = await supabase
    .from("quiz_attempts")
    .select("student_id, module_slug, is_correct, answered_at")
    .order("answered_at", { ascending: false });

  for (const attempt of (attempts ?? []) as Pick<
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
  attempt_number: number;
  question_id: string;
  selected_answer: string;
  is_correct: boolean;
  answered_at: string;
}

export async function loadStudentDetail(studentId: string): Promise<StudentAttemptDetail[]> {
  const { data, error } = await supabase
    .from("quiz_attempts")
    .select("module_slug, attempt_number, question_id, selected_answer, is_correct, answered_at")
    .eq("student_id", studentId)
    .order("answered_at", { ascending: true });

  if (error || !data) return [];
  return data as StudentAttemptDetail[];
}

/** @deprecated Use startNewAttempt — kept for resit tests that still wipe answers. */
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
