"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/learn/AuthGuard";
import ModuleCard from "@/components/learn/ModuleCard";
import ProgressBar from "@/components/learn/ProgressBar";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { getAllModules } from "@/lib/learn/courses/java-oop/index";
import { loadAllProgress } from "@/lib/learn/db";

const modules = getAllModules();
const totalQ = modules.reduce((s, m) => s + m.questions.length, 0);

interface ModuleProgress {
  score: number;
  answeredCount: number;
}

export default function JavaOopPage() {
  const { user, studentId, logout } = useLearnAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({});
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoadingProgress(true);
      if (studentId) {
        const data = await loadAllProgress(studentId);
        if (!active) return;
        setProgress(data);
      }
      if (active) setLoadingProgress(false);
    }
    load();
    return () => { active = false; };
  }, [studentId]);

  function handleLogout() {
    logout();
    router.push("/learn/auth");
  }

  const totalCorrect = Object.entries(progress)
    .filter(([key]) => key.startsWith('java-oop/'))
    .reduce((s, [, m]) => s + m.score, 0);

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[var(--page-bg)] px-6 py-16 text-[var(--page-text)]">
        <div className="mx-auto w-full max-w-6xl flex flex-col gap-10">

          {/* Header */}
          <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-3">
              <button
                onClick={() => router.push("/learn/dashboard")}
                className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-300 transition"
              >
                ← Courses
              </button>
              <div className="flex items-center gap-3">
                <span className="text-4xl">☕</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                    Intermediate · 18 Modules
                  </p>
                  <h1 className="text-3xl font-semibold text-white">OOP in Java</h1>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-1">
                  Overall
                </p>
                <p className="text-2xl font-semibold text-white">
                  {loadingProgress ? "—" : totalCorrect}{" "}
                  <span className="text-slate-500 text-base font-normal">/ {totalQ}</span>
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 hover:text-slate-200 hover:border-slate-500 transition"
              >
                Sign Out
              </button>
            </div>
          </section>

          {/* Progress bar */}
          <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 px-8 py-5 backdrop-blur shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">
              Course Progress
            </p>
            <ProgressBar current={totalCorrect} total={totalQ} showLabel size="md" />
          </div>

          {/* Module grid */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Course Modules</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {modules.map((mod) => {
                const p = progress[`java-oop/${mod.slug}`];
                return (
                  <ModuleCard
                    key={mod.id}
                    module={mod}
                    score={p?.score ?? 0}
                    completed={!mod.locked && (p?.answeredCount ?? 0) >= mod.questions.length}
                    courseSlug="java-oop"
                    courseTitle="OOP in Java"
                  />
                );
              })}
            </div>
          </section>

        </div>
      </main>
    </AuthGuard>
  );
}
