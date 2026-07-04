"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthGuard from "@/components/learn/AuthGuard";
import QuestionCard from "@/components/learn/QuestionCard";
import ProgressBar from "@/components/learn/ProgressBar";
import { getModule } from "@/lib/learn/courseData";
import { getCourse, getModuleFromCourse, isCourseHiddenForUsername } from "@/lib/learn/registry";
import { QuestionAnswer, calculateScore } from "@/lib/learn/progress";
import {
  saveAnswer,
  loadModuleAnswers,
  getOrCreateActiveAttempt,
  startNewAttempt,
  completeQuizSession,
  getQuizSession,
} from "@/lib/learn/db";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { cn } from "@/lib/utils";
import { gradeCodeRunnerQuestion } from "@/components/learn/CodeRunnerCard";
import LearnMarkdown from "@/components/learn/LearnMarkdown";

const EXAM_DURATION_MS = 60 * 60 * 1000; // ~1 hour

interface QuizViewProps {
  moduleId: string;
  courseSlug?: string;
}

function examTimerKey(storageSlug: string) {
  return `exam-timer:${storageSlug}`;
}

function formatCountdown(ms: number): string {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function QuizView({ moduleId, courseSlug }: QuizViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const attemptParam = searchParams.get("attempt");
  const { studentId, user } = useLearnAuth();
  const course = courseSlug ? getCourse(courseSlug) : undefined;
  const mod = courseSlug
    ? getModuleFromCourse(courseSlug, moduleId)
    : getModule(moduleId);
  const isCourseRestricted = Boolean(
    (course?.adminOnly && user?.role !== "admin") ||
    (user?.role !== "admin" && isCourseHiddenForUsername(course, user?.username))
  );

  useEffect(() => {
    if (isCourseRestricted || (mod?.locked && user?.role !== 'admin')) {
      router.replace("/learn/dashboard");
    }
  }, [courseSlug, isCourseRestricted, mod, router, user]);
  // Storage slug is prefixed with courseSlug to avoid collisions between courses with the same module slug numbers
  const storageSlug = courseSlug ? `${courseSlug}/${mod?.slug ?? moduleId}` : (mod?.slug ?? moduleId);
  const lessonPath = courseSlug
    ? `/learn/courses/${courseSlug}/${moduleId}`
    : `/learn/${moduleId}`;

  const shouldLoadAnswers = Boolean(studentId && mod);
  const [answers, setAnswers] = useState<Record<string, QuestionAnswer> | null>(
    shouldLoadAnswers ? null : {}
  );
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [reviewing, setReviewing] = useState(false);
  const [showResultsScreen, setShowResultsScreen] = useState(false);
  const [attemptNumber, setAttemptNumber] = useState<number | null>(null);
  const [attemptReadOnly, setAttemptReadOnly] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [examFinishing, setExamFinishing] = useState(false);
  const [remainingMs, setRemainingMs] = useState(EXAM_DURATION_MS);

  const isExam = Boolean(mod?.isMidterm);

  // Exam timer — persisted in localStorage so navigation within quiz preserves it
  useEffect(() => {
    if (!isExam || !mod) return;
    const key = examTimerKey(storageSlug);
    let startAt = Number(localStorage.getItem(key));
    if (!startAt || Number.isNaN(startAt)) {
      startAt = Date.now();
      localStorage.setItem(key, String(startAt));
    }
    const tick = () => {
      const left = EXAM_DURATION_MS - (Date.now() - startAt);
      setRemainingMs(left);
      if (left <= 0) {
        setExamFinished(true);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isExam, mod, storageSlug]);

  const finishExam = useCallback(async () => {
    if (!mod || examFinishing) return;
    setExamFinishing(true);

    let updated = { ...(answersRef.current ?? {}) };

    for (const q of mod.questions) {
      if (q.type !== "code-runner") continue;
      const ans = updated[q.id];
      if (!ans?.selectedAnswer || ans.selectedAnswer === "__code__") continue;
      try {
        const { allPassed } = await gradeCodeRunnerQuestion(q, ans.selectedAnswer);
        const graded = { selectedAnswer: ans.selectedAnswer, isCorrect: allPassed };
        updated = { ...updated, [q.id]: graded };
        if (studentId && attemptNumber) {
          await saveAnswer(studentId, storageSlug, q.id, graded, attemptNumber);
        }
      } catch {
        // keep existing answer on grading failure
      }
    }

    setAnswers(updated);
    setExamFinished(true);
    setExamFinishing(false);
  }, [mod, examFinishing, studentId, storageSlug, attemptNumber]);

  // Auto-finish when timer hits zero
  useEffect(() => {
    if (isExam && remainingMs <= 0 && !examFinished) {
      finishExam();
    }
  }, [isExam, remainingMs, examFinished, finishExam]);

  // Resolve attempt number and load answers
  useEffect(() => {
    let active = true;
    if (!studentId || !mod) {
      if (!studentId) {
        setAttemptNumber(1);
        setAnswers({});
      }
      return;
    }

    async function init() {
      const totalQ = mod!.questions.length;
      let attempt: number;

      if (attemptParam) {
        const parsed = parseInt(attemptParam, 10);
        attempt = Number.isNaN(parsed) ? await getOrCreateActiveAttempt(studentId!, storageSlug, totalQ) : parsed;
      } else {
        attempt = await getOrCreateActiveAttempt(studentId!, storageSlug, totalQ);
      }

      const session = await getQuizSession(studentId!, storageSlug, attempt);

      const saved = await loadModuleAnswers(studentId!, storageSlug, attempt);
      if (!active) return;

      setAttemptNumber(attempt);
      setAttemptReadOnly(Boolean(session?.completed_at));
      setAnswers(saved);

      const firstUnanswered = mod!.questions.findIndex((q) => !saved[q.id]);
      if (firstUnanswered !== -1) setCurrentIdx(firstUnanswered);

      if (session?.completed_at && Object.keys(saved).length === totalQ) {
        setShowResultsScreen(true);
      }
    }

    init();
    return () => {
      active = false;
    };
  }, [mod, storageSlug, studentId, attemptParam]);

  if (!mod || isCourseRestricted || (mod.locked && user?.role !== "admin")) {
    return (
      <AuthGuard>
        <main className="min-h-screen bg-[var(--page-bg)] flex items-center justify-center">
          <p className="text-slate-400">
            {!mod ? "Module not found." : isCourseRestricted ? "This course is only available to admins." : "This module is not available yet."}
          </p>
        </main>
      </AuthGuard>
    );
  }

  const resolvedAnswers = answers ?? {};
  const loadingAnswers = shouldLoadAnswers && (answers === null || attemptNumber === null);
  const questions = mod.questions;
  const totalQ = questions.length;
  const answeredCount = Object.keys(resolvedAnswers).length;
  const allDone = answeredCount === totalQ;
  const showResults = isExam ? examFinished : showResultsScreen;
  const inQuiz = !showResults || reviewing;
  const score = calculateScore(resolvedAnswers);
  const currentQuestion = questions[Math.min(currentIdx, totalQ - 1)];

  async function handleAnswerSubmit(questionId: string, answer: QuestionAnswer) {
    if (attemptReadOnly) return;
    const updated = { ...resolvedAnswers, [questionId]: answer };
    setAnswers(updated);

    // Persist to Supabase
    if (studentId && mod && attemptNumber) {
      await saveAnswer(studentId, storageSlug, questionId, answer, attemptNumber);
    }

    // No auto-advance — user presses Next manually
  }

  async function handleStartOver() {
    const confirmed = window.confirm(
      "Start a new attempt? Your previous attempts will be saved in history."
    );
    if (!confirmed || !studentId || !mod || !attemptNumber) return;

    const newAttempt = await startNewAttempt(studentId, storageSlug, totalQ);
    setAttemptNumber(newAttempt);
    setAttemptReadOnly(false);
    setAnswers({});
    setCurrentIdx(0);
    setReviewing(false);
    setShowResultsScreen(false);
    setExamFinished(false);
    if (mod) {
      for (const q of mod.questions) {
        localStorage.removeItem(`code-draft:${q.id}`);
      }
    }
    router.replace(
      courseSlug
        ? `/learn/courses/${courseSlug}/${moduleId}/quiz`
        : `/learn/${moduleId}/quiz`
    );
  }

  async function handleViewResults() {
    const currentScore = calculateScore(resolvedAnswers);
    setShowResultsScreen(true);
    if (studentId && attemptNumber && !isExam) {
      await completeQuizSession(studentId, storageSlug, attemptNumber, currentScore, totalQ);
      setAttemptReadOnly(true);
    }
  }

  function promptPreview(prompt: string): string {
    const paragraph = prompt.split("\n\n")[0]?.trim();
    if (paragraph) return paragraph;
    return prompt.split("\n")[0]?.trim() ?? prompt;
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[var(--page-bg)] px-6 py-16 text-[var(--page-text)]">
        <div className="mx-auto w-full max-w-2xl flex flex-col gap-8">

          {/* Header */}
          <div>
            <button
              onClick={() => router.push(lessonPath)}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-300 transition mb-4 flex items-center gap-2"
            >
              ← Back to Lessons
            </button>
            <div className="flex items-center gap-4">
              <span className="text-4xl">{mod.icon}</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {isExam ? "Timed Exam" : "Quiz"}
                  {attemptNumber ? ` · Attempt ${attemptNumber}` : ""}
                </p>
                <h1 className="text-2xl font-semibold text-white">{mod.title}</h1>
              </div>
              {isExam && !examFinished && (
                <div className={cn(
                  "ml-auto text-right rounded-2xl border px-4 py-2",
                  remainingMs < 5 * 60 * 1000
                    ? "border-red-500/40 bg-red-500/10"
                    : "border-slate-700 bg-slate-900/60"
                )}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Time left</p>
                  <p className="text-xl font-mono font-semibold text-white">{formatCountdown(remainingMs)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Loading answers spinner */}
          {loadingAnswers ? (
            <div className="flex justify-center py-16">
              <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            </div>
          ) : inQuiz ? (
            <>
              {/* All answered — stay in quiz so students can fix mistakes */}
              {allDone && !reviewing && !isExam && !attemptReadOnly && (
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                    All questions answered — fix any mistakes or view results
                  </p>
                  <button
                    onClick={handleViewResults}
                    className="shrink-0 rounded-full bg-cyan-400 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-300 transition uppercase tracking-[0.15em]"
                  >
                    View Results
                  </button>
                </div>
              )}

              {/* Reviewing banner */}
              {reviewing && (
                <div className="flex items-center justify-between rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">Reviewing your answers</p>
                  <button
                    onClick={() => {
                      setReviewing(false);
                      if (allDone) {
                        if (attemptReadOnly) {
                          setShowResultsScreen(true);
                        } else {
                          void handleViewResults();
                        }
                      }
                    }}
                    className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 hover:text-slate-200 transition"
                  >
                    Back to Results →
                  </button>
                </div>
              )}

              {/* Progress */}
              <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 px-6 py-4 backdrop-blur shadow-sm">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-3">
                  <span>Question {currentIdx + 1} of {totalQ}</span>
                  <span>{answeredCount} answered</span>
                </div>
                <ProgressBar current={answeredCount} total={totalQ} size="sm" />
                <div className="flex gap-2 flex-wrap mt-4">
                {questions.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(i)}
                    className={cn(
                      "w-7 h-7 rounded-full text-xs font-semibold transition",
                        isExam && !examFinished
                          ? resolvedAnswers[q.id]
                            ? "bg-cyan-600 text-white"
                            : i === currentIdx
                            ? "bg-cyan-400 text-slate-950"
                            : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                          : resolvedAnswers[q.id]
                          ? resolvedAnswers[q.id].isCorrect
                            ? "bg-emerald-500 text-white"
                            : "bg-red-500 text-white"
                          : i === currentIdx
                          ? "bg-cyan-400 text-slate-950"
                          : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              <QuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                onAnswerSubmit={(ans) => handleAnswerSubmit(currentQuestion.id, ans)}
                previousAnswer={resolvedAnswers[currentQuestion.id]}
                examMode={isExam && !examFinished}
                examFinished={examFinished || attemptReadOnly}
                attemptNumber={attemptNumber}
              />

              {isExam && !examFinished && (
                <button
                  onClick={finishExam}
                  disabled={examFinishing}
                  className="w-full rounded-full bg-amber-400 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300 transition uppercase tracking-[0.2em] disabled:opacity-50"
                >
                  {examFinishing ? "Grading…" : "Submit Exam"}
                </button>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                  disabled={currentIdx === 0}
                  className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 hover:text-slate-200 hover:border-slate-500 transition disabled:opacity-30"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setCurrentIdx((i) => Math.min(totalQ - 1, i + 1))}
                  disabled={currentIdx === totalQ - 1}
                  className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 hover:text-slate-200 hover:border-slate-500 transition disabled:opacity-30"
                >
                  Next →
                </button>
              </div>
            </>
          ) : (
            /* Results */
            <div className="space-y-6">
              <div className={cn(
                "rounded-3xl border p-8 text-center backdrop-blur shadow-sm",
                score === totalQ ? "border-emerald-500/30 bg-emerald-500/5"
                  : score >= totalQ / 2 ? "border-yellow-500/30 bg-yellow-500/5"
                  : "border-red-500/30 bg-red-500/5"
              )}>
                <p className="text-5xl mb-4">
                  {score === totalQ ? "🎉" : score >= totalQ / 2 ? "👍" : "📚"}
                </p>
                <p className="text-3xl font-semibold text-white mb-1">{score} / {totalQ}</p>
                <p className={cn(
                  "text-xs font-semibold uppercase tracking-[0.3em] mb-5",
                  score === totalQ ? "text-emerald-400"
                    : score >= totalQ / 2 ? "text-yellow-400"
                    : "text-red-400"
                )}>
                  {score === totalQ ? "Perfect score"
                    : score >= totalQ / 2 ? "Good job — review the ones you missed"
                    : "Keep studying and try again"}
                </p>
                <ProgressBar
                  current={score} total={totalQ} showLabel size="md"
                  colorClass={score === totalQ ? "bg-emerald-400" : score >= totalQ / 2 ? "bg-yellow-400" : "bg-red-400"}
                />
              </div>

              {/* Per-question review */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Question Review
                </p>
                {questions.map((q, i) => {
                  const ans = resolvedAnswers[q.id];
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        setCurrentIdx(i);
                        setReviewing(true);
                        setShowResultsScreen(false);
                      }}
                      className={cn(
                        "w-full text-left rounded-2xl border px-5 py-4 text-sm transition hover:border-slate-600",
                        ans?.isCorrect ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className={cn(
                          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",
                          ans?.isCorrect ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                        )}>
                          {ans?.isCorrect ? "✓" : "✗"}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                            Q{i + 1}
                          </p>
                          <LearnMarkdown className="[&_p]:text-slate-300 [&_p]:text-sm [&_p]:font-medium [&_p]:mb-0 [&_code]:text-xs">
                            {promptPreview(q.prompt)}
                          </LearnMarkdown>
                          {!ans?.isCorrect && (
                            <div className="mt-1">
                              <LearnMarkdown className="text-xs [&_p]:text-slate-500 [&_p]:text-xs">
                                {q.explanation}
                              </LearnMarkdown>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => router.push("/learn/dashboard")}
                  className="flex-1 rounded-full border border-slate-700 py-3 text-sm font-semibold text-slate-300 hover:border-slate-500 hover:text-white transition uppercase tracking-[0.2em]"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { setCurrentIdx(0); setReviewing(true); setShowResultsScreen(false); }}
                  className="flex-1 rounded-full border border-slate-700 py-3 text-sm font-semibold text-slate-300 hover:border-slate-500 hover:text-white transition uppercase tracking-[0.2em]"
                >
                  Review Answers
                </button>
                <button
                  onClick={handleStartOver}
                  className="flex-1 rounded-full border border-slate-600 py-3 text-sm font-semibold text-slate-300 hover:border-slate-400 hover:text-white transition uppercase tracking-[0.2em]"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
