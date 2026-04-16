"use client";

import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import AuthGuard from "@/components/learn/AuthGuard";
import CodeBlock from "@/components/learn/CodeBlock";
import CodeEditor from "@/components/learn/CodeEditor";
import ComplexityGraph from "@/components/learn/ComplexityGraph";
import JavaEditor from "@/components/learn/JavaEditor";
import TypeScriptEditor from "@/components/learn/TypeScriptEditor";

const AlgorithmVisualizer = dynamic(
  () => import("@/components/learn/AlgorithmVisualizer"),
  { ssr: false }
);
import { getModule } from "@/lib/learn/courseData";
import { getCourse, getModuleFromCourse } from "@/lib/learn/registry";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { cn } from "@/lib/utils";

interface LessonViewProps {
  moduleId: string;
  courseSlug?: string;
}

const FONT = "var(--font-mono), monospace";

const lessonMarkdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-sm leading-relaxed text-slate-300">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-300">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-slate-100">{children}</strong>
  ),
  code: ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => {
    const isBlock = !!className;
    return isBlock ? (
      <code className="block text-sm text-cyan-300" style={{ fontFamily: FONT }}>
        {children}
      </code>
    ) : (
      <code
        className="rounded-lg bg-slate-800 px-1.5 py-0.5 text-xs text-cyan-300"
        style={{ fontFamily: FONT }}
      >
        {children}
      </code>
    );
  },
};

const inlineMarkdownComponents = {
  p: Fragment,
  strong: lessonMarkdownComponents.strong,
  code: lessonMarkdownComponents.code,
};

function isTableSeparator(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableBlock(block: string) {
  const lines = block
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length >= 2 && lines[0].includes("|") && isTableSeparator(lines[1]);
}

function renderLessonBlock(block: string, key: number) {
  if (isTableBlock(block)) {
    const lines = block
      .trim()
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const headers = parseTableRow(lines[0]);
    const rows = lines.slice(2).map(parseTableRow);

    return (
      <div
        key={key}
        className="overflow-x-auto rounded-2xl border border-slate-800/70 bg-slate-950/40"
      >
        <table className="min-w-full border-collapse text-left text-sm text-slate-300">
          <thead className="bg-slate-900/80">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={`${key}-head-${index}`}
                  className="border-b border-slate-800 px-4 py-3 font-semibold text-slate-100"
                >
                  <ReactMarkdown components={inlineMarkdownComponents}>
                    {header}
                  </ReactMarkdown>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${key}-row-${rowIndex}`} className="border-t border-slate-800/70">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${key}-cell-${rowIndex}-${cellIndex}`}
                    className="px-4 py-3 align-top"
                  >
                    <ReactMarkdown components={inlineMarkdownComponents}>
                      {cell}
                    </ReactMarkdown>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div key={key}>
      <ReactMarkdown components={lessonMarkdownComponents}>{block}</ReactMarkdown>
    </div>
  );
}

export default function LessonView({ moduleId, courseSlug }: LessonViewProps) {
  const router = useRouter();
  const { user } = useLearnAuth();

  const course = courseSlug ? getCourse(courseSlug) : undefined;
  const mod = courseSlug
    ? getModuleFromCourse(courseSlug, moduleId)
    : getModule(moduleId);
  const isCourseRestricted = Boolean(course?.adminOnly && user?.role !== "admin");

  useEffect(() => {
    if (isCourseRestricted || (mod?.locked && user?.role !== 'admin')) {
      router.replace(courseSlug ? `/learn/courses/${courseSlug}` : '/learn/dashboard');
    }
  }, [courseSlug, isCourseRestricted, mod, router, user]);
  const courseTitle = course?.title ?? 'Python 101';
  const quizPath = courseSlug
    ? `/learn/courses/${courseSlug}/${moduleId}/quiz`
    : `/learn/${moduleId}/quiz`;
  const backPath = courseSlug
    ? `/learn/courses/${courseSlug}`
    : '/learn/dashboard';

  if (!mod || isCourseRestricted || (mod.locked && user?.role !== 'admin')) {
    return (
      <AuthGuard>
        <main className="min-h-screen bg-[var(--page-bg)] flex items-center justify-center px-6">
          <div className="text-center space-y-4">
            <p className="text-4xl">🔒</p>
            <p className="text-xl font-semibold text-white">
              {!mod ? "Module Not Found" : isCourseRestricted ? "Course Restricted" : mod.title}
            </p>
            <p className="text-slate-400 text-sm">
              {!mod
                ? "Module not found."
                : isCourseRestricted
                  ? "This course is only available to admins."
                  : "This module is not available yet."}
            </p>
            <button
              onClick={() => router.push(backPath)}
              className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </main>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[var(--page-bg)] px-6 py-16 text-[var(--page-text)]">
        <div className="mx-auto w-full max-w-3xl flex flex-col gap-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(backPath)}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-300 transition"
            >
              ← {courseSlug ? 'Course' : 'Dashboard'}
            </button>
            <span className="text-slate-700">/</span>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              {mod.title}
            </span>
          </div>

          {/* Module header */}
          <section className="rounded-3xl border border-slate-800/70 bg-slate-900/70 overflow-hidden shadow-sm backdrop-blur">
            <div className={cn("h-1.5 bg-gradient-to-r", mod.color)} />
            <div className="px-8 py-7 flex items-center gap-5">
              <span className="text-5xl">{mod.icon}</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-1">
                  {courseTitle}
                </p>
                <h1 className="text-2xl font-semibold text-white">{mod.title}</h1>
                <p className="text-sm text-slate-400 mt-1">{mod.description}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600 mt-3">
                  {mod.lessons.length} lessons · {mod.questions.length} questions
                </p>
              </div>
            </div>
          </section>

          {/* Lessons */}
          {mod.lessons.map((lesson, idx) => (
            <section
              key={lesson.id}
              className="rounded-3xl border border-slate-800/70 bg-slate-900/70 overflow-hidden shadow-sm backdrop-blur"
            >
              <div className="px-8 py-5 border-b border-slate-800/70 flex items-center gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-800 text-slate-400 text-xs font-semibold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h2 className="font-semibold text-white">{lesson.title}</h2>
              </div>

              <div className="px-8 py-6">
                <div className="mb-2 space-y-4">
                  {lesson.content
                    .split("\n\n")
                    .filter((block) => block.trim().length > 0)
                    .map((block, i) => renderLessonBlock(block, i))}
                </div>

                {courseSlug === "python130" && mod.title === "Algorithm Complexity" && lesson.id === "lesson-1-1" && (
                  <ComplexityGraph />
                )}

                {lesson.visualizer && (
                  Array.isArray(lesson.visualizer)
                    ? lesson.visualizer.map((v) => <AlgorithmVisualizer key={v} kind={v} />)
                    : <AlgorithmVisualizer kind={lesson.visualizer} />
                )}

                {lesson.codeExamples.map((ex, ci) =>
                  ex.editable && ex.language === 'java' ? (
                    <JavaEditor
                      key={ci}
                      initialCode={ex.code}
                      caption={ex.caption}
                    />
                  ) : ex.editable && ex.language === 'typescript' ? (
                    <TypeScriptEditor
                      key={ci}
                      initialCode={ex.code}
                      caption={ex.caption}
                    />
                  ) : ex.editable ? (
                    <CodeEditor
                      key={ci}
                      initialCode={ex.code}
                      caption={ex.caption}
                    />
                  ) : (
                    <CodeBlock
                      key={ci}
                      code={ex.code}
                      language={ex.language}
                      caption={ex.caption}
                    />
                  )
                )}
              </div>
            </section>
          ))}

          {/* Quiz CTA */}
          <section className="rounded-3xl border border-slate-800/70 bg-slate-900/70 px-8 py-6 flex items-center justify-between shadow-sm backdrop-blur">
            <div>
              <p className="font-semibold text-white mb-1">Ready to test your knowledge?</p>
              <p className="text-sm text-slate-400">
                {mod.questions.length} questions — takes about 5 minutes
              </p>
            </div>
            <button
              onClick={() => router.push(quizPath)}
              className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300 transition whitespace-nowrap"
            >
              Take the Quiz →
            </button>
          </section>
        </div>
      </main>
    </AuthGuard>
  );
}
