"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/learn/AuthGuard";
import ModuleCard from "@/components/learn/ModuleCard";
import ProgressBar from "@/components/learn/ProgressBar";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { getAllModules } from "@/lib/learn/courseData";
import { loadAllProgress, loadStudentStatuses, StudentMonitoringRow } from "@/lib/learn/db";

const modules = getAllModules();
const totalQ = modules.reduce((s, m) => s + m.questions.length, 0);
const moduleBySlug = Object.fromEntries(modules.map((module) => [module.slug, module]));

interface ModuleProgress {
  score: number;
  answeredCount: number;
}

export default function LearnDashboard() {
  const { user, studentId, logout } = useLearnAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({});
  const [studentStatuses, setStudentStatuses] = useState<StudentMonitoringRow[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadDashboardData() {
      setLoadingProgress(true);

      if (user?.role === "admin") {
        const [statuses, ownProgress] = await Promise.all([
          loadStudentStatuses(),
          studentId ? loadAllProgress(studentId) : Promise.resolve({}),
        ]);
        if (!active) return;
        setStudentStatuses(statuses);
        setProgress(ownProgress);
        setLoadingProgress(false);
        return;
      }

      if (!studentId) {
        if (!active) return;
        setProgress({});
        setLoadingProgress(false);
        return;
      }

      const data = await loadAllProgress(studentId);
      if (!active) return;
      setProgress(data);
      setLoadingProgress(false);
    }

    loadDashboardData();

    return () => {
      active = false;
    };
  }, [studentId, user?.role]);

  function handleLogout() {
    logout();
    router.push("/learn");
  }

  const totalCorrect = Object.values(progress).reduce((s, m) => s + m.score, 0);
  const completedStudents = studentStatuses.filter((student) =>
    modules.every(
      (module) => (student.progress[module.slug]?.answeredCount ?? 0) >= module.questions.length
    )
  ).length;

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[var(--page-bg)] px-6 py-16 text-[var(--page-text)]">
        <div className="mx-auto w-full max-w-6xl flex flex-col gap-12">

          {/* Hero */}
          <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                Python 101 · CodeType Learn
              </p>
              <h1 className="text-4xl font-semibold text-white">
                Welcome back, {user?.displayName}
              </h1>
              <p className="text-slate-400 max-w-lg">
                {user?.role === "admin"
                  ? "Monitor student progress, and work through the same lessons and quizzes students see."
                  : "Work through the modules below. Complete lessons, run code, and take quizzes to lock in your knowledge."}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-1">
                  {user?.role === "admin" ? "Students Completed" : "Overall"}
                </p>
                <p className="text-2xl font-semibold text-white">
                  {loadingProgress ? "—" : user?.role === "admin" ? completedStudents : totalCorrect}{" "}
                  <span className="text-slate-500 text-base font-normal">
                    / {user?.role === "admin" ? studentStatuses.length : totalQ}
                  </span>
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

          {user?.role === "admin" && (
            <section className="space-y-6">
              <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 px-8 py-5 backdrop-blur shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">
                      Student Progress
                    </p>
                    <p className="text-sm text-slate-400">
                      Live course status pulled from quiz attempts stored in Supabase.
                    </p>
                  </div>
                  <div className="text-right text-sm text-slate-400">
                    <p>{studentStatuses.length} students</p>
                    <p>{completedStudents} finished the course</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                {studentStatuses.map((studentStatus) => {
                  const completedModuleCount = modules.filter(
                    (module) =>
                      (studentStatus.progress[module.slug]?.answeredCount ?? 0) >=
                      module.questions.length
                  ).length;
                  const statusLabel =
                    studentStatus.answeredCount === 0
                      ? "Not started"
                      : completedModuleCount === modules.length
                        ? "Completed"
                        : "In progress";
                  const lastModule = studentStatus.lastActiveModuleSlug
                    ? moduleBySlug[studentStatus.lastActiveModuleSlug]
                    : null;

                  return (
                    <article
                      key={studentStatus.student.id}
                      className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6 shadow-sm backdrop-blur"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                            {studentStatus.student.username}
                          </p>
                          <h2 className="mt-2 text-2xl font-semibold text-white">
                            {studentStatus.student.display_name}
                          </h2>
                        </div>
                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                          {statusLabel}
                        </span>
                      </div>

                      <div className="mt-6">
                        <ProgressBar
                          current={studentStatus.totalScore}
                          total={totalQ}
                          showLabel
                          size="md"
                        />
                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Answered
                          </p>
                          <p className="mt-2 text-lg font-semibold text-white">
                            {studentStatus.answeredCount} / {totalQ}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Modules Done
                          </p>
                          <p className="mt-2 text-lg font-semibold text-white">
                            {completedModuleCount} / {modules.length}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Last Activity
                          </p>
                          <p className="mt-2 text-sm font-medium text-slate-200">
                            {studentStatus.lastAnsweredAt
                              ? new Date(studentStatus.lastAnsweredAt).toLocaleString()
                              : "No quiz attempts yet"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          Focus Area
                        </p>
                        <p className="mt-2 text-sm text-slate-300">
                          {lastModule
                            ? `Most recent module: ${lastModule.title}`
                            : "This student has not started a quiz yet."}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 px-8 py-5 backdrop-blur shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">
              {user?.role === "admin" ? "Your Course Progress" : "Course Progress"}
            </p>
            <ProgressBar
              current={totalCorrect}
              total={totalQ}
              showLabel
              size="md"
            />
          </div>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              {user?.role === "admin" ? "Course Modules" : "Course Modules"}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {modules.map((mod) => {
                const p = progress[mod.slug];
                const totalModQ = mod.questions.length;
                return (
                  <ModuleCard
                    key={mod.id}
                    module={mod}
                    score={p?.score ?? 0}
                    completed={!mod.locked && (p?.answeredCount ?? 0) >= totalModQ}
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
