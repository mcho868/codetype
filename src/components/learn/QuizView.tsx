"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/learn/AuthGuard";
import QuestionCard from "@/components/learn/QuestionCard";
import ProgressBar from "@/components/learn/ProgressBar";
import { getModule } from "@/lib/learn/courseData";
import { getCourse, getModuleFromCourse } from "@/lib/learn/registry";
import { QuestionAnswer, calculateScore } from "@/lib/learn/progress";
import { saveAnswer, loadModuleAnswers, clearModuleAnswers } from "@/lib/learn/db";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { cn } from "@/lib/utils";

interface QuizViewProps {
  moduleId: string;
  courseSlug?: string;
}

export default function QuizView({ moduleId, courseSlug }: QuizViewProps) {
  const router = useRouter();
  const { studentId, user } = useLearnAuth();
  const course = courseSlug ? getCourse(courseSlug) : undefined;
  const mod = courseSlug
    ? getModuleFromCourse(courseSlug, moduleId)
    : getModule(moduleId);
  const isCourseRestricted = Boolean(course?.adminOnly && user?.role !== "admin");

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
  const [currentIdx, setCurrentIdx] = useState(0);
  const [reviewing, setReviewing] = useState(false);

  // Load saved answers from Supabase on mount
  useEffect(() => {
    let active = true;
    if (!studentId || !mod) {
      return;
    }
    loadModuleAnswers(studentId, storageSlug).then((saved) => {
      if (!active) return;
      setAnswers(saved);
      // Jump to first unanswered question
      const firstUnanswered = mod.questions.findIndex((q) => !saved[q.id]);
      if (firstUnanswered !== -1) setCurrentIdx(firstUnanswered);
    });
    return () => {
      active = false;
    };
  }, [mod, storageSlug, studentId]);

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
  const loadingAnswers = shouldLoadAnswers && answers === null;
  const questions = mod.questions;
  const totalQ = questions.length;
  const answeredCount = Object.keys(resolvedAnswers).length;
  const allDone = answeredCount === totalQ;
  const score = calculateScore(resolvedAnswers);
  const currentQuestion = questions[Math.min(currentIdx, totalQ - 1)];

  async function handleAnswerSubmit(questionId: string, answer: QuestionAnswer) {
    const updated = { ...resolvedAnswers, [questionId]: answer };
    setAnswers(updated);

    // Persist to Supabase
    if (studentId && mod) {
      await saveAnswer(studentId, storageSlug, questionId, answer);
    }

    // No auto-advance — user presses Next manually
  }

  async function handleRetake() {
    if (studentId && mod) {
      await clearModuleAnswers(studentId, storageSlug);
    }
    setAnswers({});
    setCurrentIdx(0);
    setReviewing(false);
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
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Quiz</p>
                <h1 className="text-2xl font-semibold text-white">{mod.title}</h1>
              </div>
            </div>
          </div>

          {/* Loading answers spinner */}
          {loadingAnswers ? (
            <div className="flex justify-center py-16">
              <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            </div>
          ) : !allDone || reviewing ? (
            <>
              {/* Reviewing banner */}
              {reviewing && (
                <div className="flex items-center justify-between rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">Reviewing your answers</p>
                  <button
                    onClick={() => setReviewing(false)}
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
                        resolvedAnswers[q.id]
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
              />

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
                    <div key={q.id} className={cn(
                      "rounded-2xl border px-5 py-4 text-sm",
                      ans?.isCorrect ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"
                    )}>
                      <div className="flex items-start gap-3">
                        <span className={cn(
                          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",
                          ans?.isCorrect ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                        )}>
                          {ans?.isCorrect ? "✓" : "✗"}
                        </span>
                        <div>
                          <p className="text-slate-300 font-semibold">Q{i + 1}: {q.prompt.split("\n")[0]}</p>
                          {!ans?.isCorrect && (
                            <p className="text-slate-500 text-xs mt-1">{q.explanation}</p>
                          )}
                        </div>
                      </div>
                    </div>
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
                  onClick={() => { setCurrentIdx(0); setReviewing(true); }}
                  className="flex-1 rounded-full border border-slate-700 py-3 text-sm font-semibold text-slate-300 hover:border-slate-500 hover:text-white transition uppercase tracking-[0.2em]"
                >
                  Review Answers
                </button>
                <button
                  onClick={handleRetake}
                  className="flex-1 rounded-full bg-cyan-400 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300 transition uppercase tracking-[0.2em]"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
