"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AuthGuard from "@/components/learn/AuthGuard";
import ProgressBar from "@/components/learn/ProgressBar";
import QuestionCard from "@/components/learn/QuestionCard";
import { QuestionAnswer, calculateScore } from "@/lib/learn/progress";
import { saveAnswer, loadModuleAnswers, clearModuleAnswers } from "@/lib/learn/db";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { cn } from "@/lib/utils";
import type { CourseTest } from "@/lib/learn/courses/python101/tests/resit-test-1";

// Pass threshold: student must score ≥ this fraction to pass
const PASS_THRESHOLD = 0.6;

interface TestViewProps {
  test: CourseTest;
  courseSlug: string;
  backPath: string;
}

export default function TestView({ test, courseSlug, backPath }: TestViewProps) {
  const router = useRouter();
  const { studentId } = useLearnAuth();
  const storageSlug = `${courseSlug}/test/${test.slug}`;

  const [answers, setAnswers] = useState<Record<string, QuestionAnswer>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loadingAnswers, setLoadingAnswers] = useState(true);

  useEffect(() => {
    if (!studentId) { setLoadingAnswers(false); return; }
    loadModuleAnswers(studentId, storageSlug).then((saved) => {
      setAnswers(saved);
      const firstUnanswered = test.questions.findIndex((q) => !saved[q.id]);
      if (firstUnanswered !== -1) setCurrentIdx(firstUnanswered);
      setLoadingAnswers(false);
    });
  }, [studentId, storageSlug]); // eslint-disable-line react-hooks/exhaustive-deps

  const questions = test.questions;
  const totalQ = questions.length;
  const answeredCount = Object.keys(answers).length;
  const allDone = answeredCount === totalQ;
  const score = calculateScore(answers);
  const passed = score / totalQ >= PASS_THRESHOLD;
  const currentQuestion = questions[Math.min(currentIdx, totalQ - 1)];

  async function handleAnswerSubmit(questionId: string, answer: QuestionAnswer) {
    const updated = { ...answers, [questionId]: answer };
    setAnswers(updated);
    if (studentId) {
      await saveAnswer(studentId, storageSlug, questionId, answer);
    }
  }

  async function handleRetake() {
    if (studentId) {
      await clearModuleAnswers(studentId, storageSlug);
    }
    setAnswers({});
    setCurrentIdx(0);
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[var(--page-bg)] px-6 py-16 text-[var(--page-text)]">
        <div className="mx-auto w-full max-w-2xl flex flex-col gap-8">

          {/* Header */}
          <div>
            <button
              onClick={() => router.push(backPath)}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-300 transition mb-4"
            >
              ← Back to Course
            </button>
            <div className="flex items-center gap-4">
              <span className="text-4xl">📝</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400 mb-0.5">
                  Test · {totalQ} Questions · Pass: {Math.round(PASS_THRESHOLD * 100)}%
                </p>
                <h1 className="text-2xl font-semibold text-white">{test.title}</h1>
                <p className="text-sm text-slate-400 mt-1">{test.description}</p>
              </div>
            </div>
          </div>

          {/* Body */}
          {loadingAnswers ? (
            <div className="flex justify-center py-16">
              <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            </div>
          ) : !allDone ? (
            <>
              {/* Progress nav */}
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
                        answers[q.id]
                          ? answers[q.id].isCorrect
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
                previousAnswer={answers[currentQuestion.id]}
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
                passed
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-red-500/30 bg-red-500/5"
              )}>
                <p className="text-6xl mb-4">{passed ? "🎉" : "📚"}</p>
                <p className="text-3xl font-semibold text-white mb-1">{score} / {totalQ}</p>
                <p className={cn(
                  "text-sm font-semibold uppercase tracking-[0.3em] mb-5",
                  passed ? "text-emerald-400" : "text-red-400"
                )}>
                  {passed ? "Passed" : "Not yet passed"}
                </p>
                <ProgressBar
                  current={score}
                  total={totalQ}
                  showLabel
                  size="md"
                  colorClass={passed ? "bg-emerald-400" : "bg-red-400"}
                />
                {!passed && (
                  <p className="text-slate-400 text-sm mt-4">
                    You need {Math.ceil(PASS_THRESHOLD * totalQ)} / {totalQ} to pass. Review the explanations below and try again.
                  </p>
                )}
              </div>

              {/* Per-question review */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Question Review
                </p>
                {questions.map((q, i) => {
                  const ans = answers[q.id];
                  return (
                    <div key={q.id} className={cn(
                      "rounded-2xl border px-5 py-4 text-sm",
                      ans?.isCorrect
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : "border-red-500/20 bg-red-500/5"
                    )}>
                      <div className="flex items-start gap-3">
                        <span className={cn(
                          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5",
                          ans?.isCorrect ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                        )}>
                          {ans?.isCorrect ? "✓" : "✗"}
                        </span>
                        <div className="min-w-0">
                          <p className="text-slate-300 font-semibold">
                            Q{i + 1}: {q.prompt.replace(/\*\*/g, '').split('\n')[0]}
                          </p>
                          {!ans?.isCorrect && (
                            <p className="text-slate-500 text-xs mt-1">{q.explanation}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push(backPath)}
                  className="flex-1 rounded-full border border-slate-700 py-3 text-sm font-semibold text-slate-300 hover:border-slate-500 hover:text-white transition uppercase tracking-[0.2em]"
                >
                  Back to Course
                </button>
                <button
                  onClick={handleRetake}
                  className="flex-1 rounded-full bg-cyan-400 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300 transition uppercase tracking-[0.2em]"
                >
                  Retake Test
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </AuthGuard>
  );
}
