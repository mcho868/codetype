"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/learn/AuthGuard";
import ProgressBar from "@/components/learn/ProgressBar";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { loadStudentStatuses, StudentMonitoringRow } from "@/lib/learn/db";
import { COURSES } from "@/lib/learn/registry";
import { cn } from "@/lib/utils";

// Pre-compute total questions per course using the slug prefix stored in DB
const COURSE_META = COURSES.map((course) => ({
  slug: course.slug,
  title: course.title,
  totalQ: course.modules.reduce((s, m) => s + m.questions.length, 0),
  moduleCount: course.modules.length,
}));

function getCourseProgress(
  row: StudentMonitoringRow,
  courseSlug: string,
  totalQ: number
) {
  // python101 stores slugs as plain "0","1"… others as "courseSlug/0"
  const prefix = courseSlug === "python101" ? null : `${courseSlug}/`;
  let score = 0;
  let answered = 0;
  for (const [slug, p] of Object.entries(row.progress)) {
    const belongs = prefix ? slug.startsWith(prefix) : !slug.includes("/");
    if (belongs) {
      score += p.score;
      answered += p.answeredCount;
    }
  }
  return { score, answered, pct: totalQ > 0 ? Math.round((score / totalQ) * 100) : 0 };
}

export default function AdminPage() {
  const { user, logout } = useLearnAuth();
  const router = useRouter();
  const [rows, setRows] = useState<StudentMonitoringRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState<string>("all");

  useEffect(() => {
    if (user?.role !== "admin") return;
    loadStudentStatuses().then((data) => {
      setRows(data);
      setLoading(false);
    });
  }, [user]);

  // Redirect non-admins
  if (user && user.role !== "admin") {
    router.replace("/learn/dashboard");
    return null;
  }

  function handleLogout() {
    logout();
    router.push("/learn/auth");
  }

  const filteredCourses =
    activeCourse === "all" ? COURSE_META : COURSE_META.filter((c) => c.slug === activeCourse);

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[var(--page-bg)] px-6 py-16 text-[var(--page-text)]">
        <div className="mx-auto w-full max-w-7xl flex flex-col gap-10">

          {/* Header */}
          <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-3">
              <button
                onClick={() => router.push("/learn/dashboard")}
                className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-300 transition"
              >
                ← Dashboard
              </button>
              <div className="flex items-center gap-3">
                <span className="text-4xl">🛡️</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                    Admin
                  </p>
                  <h1 className="text-3xl font-semibold text-white">Student Monitor</h1>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-1">Students</p>
                <p className="text-2xl font-semibold text-white">{rows.length}</p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 hover:text-slate-200 hover:border-slate-500 transition"
              >
                Sign Out
              </button>
            </div>
          </section>

          {/* Course filter tabs */}
          <div className="flex gap-1 bg-slate-900/70 border border-slate-800/70 rounded-2xl p-1 w-fit flex-wrap">
            <button
              onClick={() => setActiveCourse("all")}
              className={cn(
                "px-5 py-2 rounded-xl text-sm font-semibold uppercase tracking-[0.2em] transition",
                activeCourse === "all" ? "bg-slate-700 text-white shadow" : "text-slate-500 hover:text-slate-300"
              )}
            >
              All Courses
            </button>
            {COURSE_META.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveCourse(c.slug)}
                className={cn(
                  "px-5 py-2 rounded-xl text-sm font-semibold uppercase tracking-[0.2em] transition",
                  activeCourse === c.slug ? "bg-slate-700 text-white shadow" : "text-slate-500 hover:text-slate-300"
                )}
              >
                {c.title}
              </button>
            ))}
          </div>

          {/* Student cards */}
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            </div>
          ) : rows.length === 0 ? (
            <p className="text-slate-500 text-sm">No students found.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {rows.map((row) => {
                const lastAt = row.lastAnsweredAt
                  ? new Date(row.lastAnsweredAt).toLocaleString()
                  : "No activity";

                return (
                  <article
                    key={row.student.id}
                    className="rounded-3xl border border-slate-800/70 bg-slate-900/70 shadow-sm backdrop-blur overflow-hidden"
                  >
                    {/* Student header — click to drill down */}
                    <button
                      onClick={() => router.push(`/learn/admin/student/${row.student.username}`)}
                      className="w-full text-left p-7 flex items-start justify-between gap-4 hover:bg-slate-800/30 transition"
                    >
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                          @{row.student.username}
                        </p>
                        <h2 className="text-2xl font-semibold text-white mt-1">
                          {row.student.display_name}
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">Last active: {lastAt}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
                          row.answeredCount === 0
                            ? "border-slate-700 text-slate-500"
                            : "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                        )}>
                          {row.answeredCount === 0 ? "Not started" : "Active"}
                        </span>
                        <span className="text-slate-600 text-lg">→</span>
                      </div>
                    </button>
                    <div className="px-7 pb-7">

                    {/* Per-course breakdown */}
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {filteredCourses.map((course) => {
                        const { score, answered, pct } = getCourseProgress(row, course.slug, course.totalQ);
                        const statusColor =
                          answered === 0 ? "text-slate-600"
                          : pct >= 80 ? "text-emerald-400"
                          : pct >= 40 ? "text-yellow-400"
                          : "text-red-400";

                        return (
                          <div
                            key={course.slug}
                            className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                                {course.title}
                              </p>
                              <span className={cn("text-xs font-semibold", statusColor)}>
                                {answered === 0 ? "—" : `${pct}%`}
                              </span>
                            </div>
                            <ProgressBar
                              current={score}
                              total={course.totalQ}
                              size="sm"
                              colorClass={
                                answered === 0 ? "bg-slate-700"
                                : pct >= 80 ? "bg-emerald-400"
                                : pct >= 40 ? "bg-yellow-400"
                                : "bg-red-400"
                              }
                            />
                            <p className="text-xs text-slate-500 mt-2">
                              {score} / {course.totalQ} correct · {course.moduleCount} modules
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

        </div>
      </main>
    </AuthGuard>
  );
}
