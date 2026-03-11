"use client";

import { useRouter } from "next/navigation";
import AuthGuard from "@/components/learn/AuthGuard";
import CodeBlock from "@/components/learn/CodeBlock";
import CodeEditor from "@/components/learn/CodeEditor";
import { getModule } from "@/lib/learn/courseData";
import { cn } from "@/lib/utils";

export default function LessonView({ moduleId }: { moduleId: string }) {
  const router = useRouter();
  const mod = getModule(moduleId);

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
              onClick={() => router.push("/learn/dashboard")}
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
              onClick={() => router.push("/learn/dashboard")}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-300 transition"
            >
              ← Dashboard
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
                  Python 101
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

                {lesson.codeExamples.map((ex, ci) =>
                  ex.editable ? (
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
              onClick={() => router.push(`/learn/${moduleId}/quiz`)}
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
