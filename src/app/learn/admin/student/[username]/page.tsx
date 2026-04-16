"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import { useRouter, useParams } from "next/navigation";
import AuthGuard from "@/components/learn/AuthGuard";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { getStudentByUsername, loadStudentDetail, StudentAttemptDetail } from "@/lib/learn/db";
import { ADMIN_ONLY_COURSES, STUDENT_VISIBLE_COURSES } from "@/lib/learn/registry";
import resitTest1 from "@/lib/learn/courses/python101/tests/resit-test-1";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/learn/courses/python101/types";

const FONT = "var(--font-mono), monospace";
const CodeMirrorEditor = dynamic(() => import("@/components/learn/CodeMirrorEditor"), { ssr: false });
const ADMIN_ONLY_PREFIXES = ADMIN_ONLY_COURSES.map((course) => `${course.slug}/`);

function isStudentVisibleAttempt(moduleSlug: string) {
  return !ADMIN_ONLY_PREFIXES.some((prefix) => moduleSlug.startsWith(prefix));
}

// Build a flat lookup: questionId → { question, courseSlug, courseTitle, moduleTitle }
interface QuestionMeta {
  question: Question;
  courseSlug: string;
  courseTitle: string;
  moduleTitle: string;
  moduleSlug: string;
}

const QUESTION_MAP = new Map<string, QuestionMeta>();
for (const course of STUDENT_VISIBLE_COURSES) {
  for (const mod of course.modules) {
    for (const q of mod.questions) {
      QUESTION_MAP.set(q.id, {
        question: q,
        courseSlug: course.slug,
        courseTitle: course.title,
        moduleTitle: mod.title,
        moduleSlug: mod.slug,
      });
    }
  }
}

for (const q of resitTest1.questions) {
  QUESTION_MAP.set(q.id, {
    question: q,
    courseSlug: "python101",
    courseTitle: "Python 101",
    moduleTitle: resitTest1.title,
    moduleSlug: resitTest1.slug,
  });
}

// Group attempts by module_slug, preserving order
function groupByModule(attempts: StudentAttemptDetail[]) {
  const map = new Map<string, StudentAttemptDetail[]>();
  for (const a of attempts) {
    if (!map.has(a.module_slug)) map.set(a.module_slug, []);
    map.get(a.module_slug)!.push(a);
  }
  return map;
}

function resolveAnswerText(question: Question | undefined, answer: string) {
  if (!question) return answer;
  if (question.type === "multiple-choice" && question.choices) {
    return question.choices.find((choice) => choice.id === answer)?.text ?? answer;
  }
  return answer;
}

function PromptMarkdown({ prompt }: { prompt: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="text-slate-200 leading-relaxed">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="text-white font-semibold">{children}</strong>
        ),
        code: ({ children, className }) => {
          const isBlock = !!className;
          return isBlock ? (
            <code className="block text-cyan-300 text-sm" style={{ fontFamily: FONT }}>{children}</code>
          ) : (
            <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded text-sm" style={{ fontFamily: FONT }}>{children}</code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-cyan-300 overflow-x-auto my-2" style={{ fontFamily: FONT }}>{children}</pre>
        ),
        ul: ({ children }) => <ul className="list-disc pl-6 space-y-1 text-slate-300">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-6 space-y-1 text-slate-300">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
      }}
    >
      {prompt}
    </ReactMarkdown>
  );
}

export default function StudentDetailPage() {
  const { user } = useLearnAuth();
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;

  const [attempts, setAttempts] = useState<StudentAttemptDetail[]>([]);
  const [displayName, setDisplayName] = useState(username);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user?.role !== "admin") return;
    async function load() {
      const student = await getStudentByUsername(username);
      if (!student) { setLoading(false); return; }
      setDisplayName(student.display_name);
      const data = await loadStudentDetail(student.id);
      setAttempts(data.filter((attempt) => isStudentVisibleAttempt(attempt.module_slug)));
      setLoading(false);
    }
    load();
  }, [user, username]);

  if (user && user.role !== "admin") {
    router.replace("/learn/dashboard");
    return null;
  }

  function toggleModule(slug: string) {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  const grouped = groupByModule(attempts);
  const totalCorrect = attempts.filter((a) => a.is_correct).length;
  const totalAnswered = attempts.length;

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[var(--page-bg)] px-6 py-16 text-[var(--page-text)]">
        <div className="mx-auto w-full max-w-4xl flex flex-col gap-8">

          {/* Header */}
          <div className="space-y-3">
            <button
              onClick={() => router.push("/learn/admin")}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-300 transition"
            >
              ← Student Monitor
            </button>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">@{username}</p>
                <h1 className="text-3xl font-semibold text-white mt-1">{displayName}</h1>
              </div>
              {!loading && (
                <div className="text-right">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-1">Score</p>
                  <p className="text-2xl font-semibold text-white">
                    {totalCorrect} <span className="text-slate-500 text-base font-normal">/ {totalAnswered}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            </div>
          ) : attempts.length === 0 ? (
            <p className="text-slate-500 text-sm">No quiz attempts yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {Array.from(grouped.entries()).map(([moduleSlug, moduleAttempts]) => {
                // Resolve course + module title from first question in this module
                const firstMeta = QUESTION_MAP.get(moduleAttempts[0].question_id);
                const courseTitle = firstMeta?.courseTitle ?? moduleSlug;
                const moduleTitle = firstMeta?.moduleTitle ?? moduleSlug;
                const correct = moduleAttempts.filter((a) => a.is_correct).length;
                const expanded = expandedModules.has(moduleSlug);

                return (
                  <div
                    key={moduleSlug}
                    className="rounded-3xl border border-slate-800/70 bg-slate-900/70 overflow-hidden shadow-sm backdrop-blur"
                  >
                    {/* Module header — clickable to expand */}
                    <button
                      onClick={() => toggleModule(moduleSlug)}
                      className="w-full flex items-center justify-between px-6 py-5 hover:bg-slate-800/30 transition text-left"
                    >
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-0.5">
                          {courseTitle}
                        </p>
                        <p className="text-white font-semibold">{moduleTitle}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={cn(
                            "text-sm font-semibold",
                            correct === moduleAttempts.length ? "text-emerald-400"
                            : correct >= moduleAttempts.length / 2 ? "text-yellow-400"
                            : "text-red-400"
                          )}>
                            {correct} / {moduleAttempts.length}
                          </p>
                          <p className="text-xs text-slate-500">{moduleAttempts.length} answered</p>
                        </div>
                        <span className={cn(
                          "text-slate-500 text-lg transition-transform duration-200",
                          expanded && "rotate-90"
                        )}>→</span>
                      </div>
                    </button>

                    {/* Expanded: question-by-question breakdown */}
                    {expanded && (
                      <div className="border-t border-slate-800/70 divide-y divide-slate-800/50">
                        {moduleAttempts.map((attempt) => {
                          const meta = QUESTION_MAP.get(attempt.question_id);
                          const q = meta?.question;
                          const isCode = q?.type === "code-challenge";
                          const submittedAnswer = resolveAnswerText(q, attempt.selected_answer);
                          const correctAnswer = q ? resolveAnswerText(q, q.correctAnswer) : "";
                          const hasCodeAnswer = isCode && attempt.selected_answer !== "__code__" && attempt.selected_answer.length > 0;
                          const lang = q?.language === "java" ? "java" : "python";
                          const looksLikeCode = !q && /(?:\n|^\s*def\s+|^\s*class\s+|^\s*for\s+|^\s*while\s+)/m.test(attempt.selected_answer);

                          return (
                            <div key={attempt.question_id} className="px-6 py-4">
                              <div className="flex items-start gap-3">
                                <span className={cn(
                                  "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5",
                                  attempt.is_correct ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                                )}>
                                  {attempt.is_correct ? "✓" : "✗"}
                                </span>
                                <div className="flex-1 min-w-0 space-y-2">
                                  {/* Question type badge */}
                                  <span className={cn(
                                    "inline-block text-xs font-semibold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full",
                                    isCode
                                      ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                                      : "bg-slate-800 text-slate-400"
                                  )}>
                                    {q?.type ?? "unknown"}
                                  </span>

                                  {/* Question prompt */}
                                  {q ? (
                                    <div className="rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-4">
                                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 mb-3">
                                        Question
                                      </p>
                                      <PromptMarkdown prompt={q.prompt} />
                                    </div>
                                  ) : (
                                    <p className="text-slate-300 text-sm">{attempt.question_id}</p>
                                  )}

                                  {/* Non-code answers */}
                                  {!isCode && !looksLikeCode && attempt.selected_answer && (
                                    <div className="rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-4 space-y-3">
                                      <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 mb-1">
                                          Student Answer
                                        </p>
                                        <p className={cn(
                                          "text-sm font-medium",
                                          attempt.is_correct ? "text-emerald-400" : "text-red-400"
                                        )}>
                                          {submittedAnswer}
                                        </p>
                                      </div>
                                      {!attempt.is_correct && q?.correctAnswer && (
                                        <div>
                                          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 mb-1">
                                            Correct Answer
                                          </p>
                                          <p className="text-sm text-slate-300">{correctAnswer}</p>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Code question details */}
                                  {(isCode || looksLikeCode) && (
                                    <div className="space-y-3">
                                      {q?.starterCode && (
                                        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/40 overflow-hidden">
                                          <div className="px-4 py-2 border-b border-slate-800/70 bg-slate-900/50">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                                              Starter Code
                                            </p>
                                          </div>
                                          <CodeMirrorEditor
                                            initialCode={q.starterCode}
                                            language={lang}
                                            onChange={() => {}}
                                            readOnly
                                          />
                                        </div>
                                      )}

                                      {hasCodeAnswer && (
                                        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/40 overflow-hidden">
                                          <div className="px-4 py-2 border-b border-slate-800/70 bg-slate-900/50">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                                              Student Submission
                                            </p>
                                          </div>
                                          <CodeMirrorEditor
                                            initialCode={attempt.selected_answer}
                                            language={lang}
                                            onChange={() => {}}
                                            readOnly
                                          />
                                        </div>
                                      )}

                                      {!hasCodeAnswer && looksLikeCode && (
                                        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/40 overflow-hidden">
                                          <div className="px-4 py-2 border-b border-slate-800/70 bg-slate-900/50">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                                              Student Submission
                                            </p>
                                          </div>
                                          <CodeMirrorEditor
                                            initialCode={attempt.selected_answer}
                                            language="python"
                                            onChange={() => {}}
                                            readOnly
                                          />
                                        </div>
                                      )}

                                      {q?.expectedOutput && (
                                        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-4">
                                          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 mb-2">
                                            Expected Output
                                          </p>
                                          <pre className="text-sm text-slate-300 whitespace-pre-wrap" style={{ fontFamily: FONT }}>
                                            {q.expectedOutput}
                                          </pre>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>
    </AuthGuard>
  );
}
