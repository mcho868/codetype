"use client";

import { useRouter } from "next/navigation";
import AuthGuard from "@/components/learn/AuthGuard";
import ModuleCard from "@/components/learn/ModuleCard";
import ProgressBar from "@/components/learn/ProgressBar";
import { Module } from "@/lib/learn/courseData";
import { cn } from "@/lib/utils";

export type CourseTab = { id: string; label: string };

interface CoursePageLayoutProps {
  /** Course identity */
  courseSlug: string;
  courseTitle: string;
  courseIcon: string;
  courseLevel: string;
  moduleCount: number;

  /** Progress */
  totalCorrect: number;
  totalQ: number;
  loadingProgress: boolean;

  /** Modules for the Learn tab */
  modules: (Module & { isMidterm?: boolean })[];
  /** Progress map keyed by module slug (prefixed with courseSlug, e.g. "python130/2") */
  progress: Record<string, { score: number; answeredCount: number }>;

  /** Tab config */
  tabs: CourseTab[];
  activeTab: string;
  onTabChange: (id: string) => void;

  /** Tab content for non-learn tabs (keyed by tab id) */
  tabContent?: Record<string, React.ReactNode>;

  /** Auth */
  isAdmin: boolean;
  onLogout: () => void;
}

export default function CoursePageLayout({
  courseSlug,
  courseTitle,
  courseIcon,
  courseLevel,
  moduleCount,
  totalCorrect,
  totalQ,
  loadingProgress,
  modules,
  progress,
  tabs,
  activeTab,
  onTabChange,
  tabContent,
  isAdmin,
  onLogout,
}: CoursePageLayoutProps) {
  const router = useRouter();

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
                <span className="text-4xl">{courseIcon}</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                    {courseLevel} · {moduleCount} Modules
                  </p>
                  <h1 className="text-3xl font-semibold text-white">{courseTitle}</h1>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-1">Overall</p>
                <p className="text-2xl font-semibold text-white">
                  {loadingProgress ? "—" : totalCorrect}{" "}
                  <span className="text-slate-500 text-base font-normal">/ {totalQ}</span>
                </p>
              </div>
              <button
                onClick={onLogout}
                className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 hover:text-slate-200 hover:border-slate-500 transition"
              >
                Sign Out
              </button>
            </div>
          </section>

          {/* Tabs */}
          {tabs.length > 1 && (
            <div className="flex gap-1 bg-slate-900/70 border border-slate-800/70 rounded-2xl p-1 w-fit">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onTabChange(t.id)}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-[0.25em] transition",
                    activeTab === t.id
                      ? "bg-slate-700 text-white shadow"
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {/* Learn tab */}
          {activeTab === "learn" && (
            <>
              <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 px-8 py-5 backdrop-blur shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">
                  Course Progress
                </p>
                <ProgressBar current={totalCorrect} total={totalQ} showLabel size="md" />
              </div>

              <section className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Course Modules</h2>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {modules.map((mod) => {
                    const key = courseSlug ? `${courseSlug}/${mod.slug}` : mod.slug;
                    const p = progress[key];
                    const isLocked = isAdmin ? false : mod.locked;
                    return (
                      <ModuleCard
                        key={mod.id}
                        module={{ ...mod, locked: isLocked }}
                        score={p?.score ?? 0}
                        completed={!isLocked && (p?.answeredCount ?? 0) >= mod.questions.length}
                        courseSlug={courseSlug}
                        courseTitle={courseTitle}
                      />
                    );
                  })}
                </div>
              </section>
            </>
          )}

          {/* Other tabs */}
          {activeTab !== "learn" && tabContent?.[activeTab]}

        </div>
      </main>
    </AuthGuard>
  );
}
