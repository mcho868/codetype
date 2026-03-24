"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AuthGuard from "@/components/learn/AuthGuard";
import CodeBlock from "@/components/learn/CodeBlock";
import CodeEditor from "@/components/learn/CodeEditor";
import ComplexityGraph from "@/components/learn/ComplexityGraph";
import JavaEditor from "@/components/learn/JavaEditor";

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

export default function LessonView({ moduleId, courseSlug }: LessonViewProps) {
  const router = useRouter();
  const { user } = useLearnAuth();

  const course = courseSlug ? getCourse(courseSlug) : undefined;
  const mod = courseSlug
    ? getModuleFromCourse(courseSlug, moduleId)
    : getModule(moduleId);

  useEffect(() => {
    if (mod?.locked && user?.role !== 'admin') {
      router.replace(courseSlug ? `/learn/courses/${courseSlug}` : '/learn/dashboard');
    }
  }, [mod, user, router, courseSlug]);
  const courseTitle = course?.title ?? 'Python 101';
  const quizPath = courseSlug
    ? `/learn/courses/${courseSlug}/${moduleId}/quiz`
    : `/learn/${moduleId}/quiz`;
  const backPath = courseSlug
    ? `/learn/courses/${courseSlug}`
    : '/learn/dashboard';

  if (!mod || mod.locked) {
    return (
      <AuthGuard>
        <main className="min-h-screen bg-[var(--page-bg)] flex items-center justify-center px-6">
          <div className="text-center space-y-4">
            <p className="text-4xl">🔒</p>
            <p className="text-xl font-semibold text-white">
              {mod ? mod.title : "Module Not Found"}
            </p>
            <p className="text-slate-400 text-sm">
              {mod ? "This module is not available yet." : "Module not found."}
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
                <div className="space-y-3 mb-2">
                  {lesson.content.split("\n\n").map((block, i) => (
                    <p
                      key={i}
                      className="text-sm text-slate-300 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: block
                          .replace(
                            /\*\*([^*]+)\*\*/g,
                            '<strong class="text-slate-100 font-semibold">$1</strong>'
                          )
                          .replace(
                            /'([^']+)'/g,
                            '<code class="bg-slate-800 px-1.5 py-0.5 rounded-lg text-cyan-300 text-xs" style="font-family:var(--font-mono),monospace">$1</code>'
                          )
                          .split("\n")
                          .join("<br/>"),
                      }}
                    />
                  ))}
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
