"use client";

import { useRouter } from "next/navigation";
import AuthGuard from "@/components/learn/AuthGuard";
import { useLearnAuth } from "@/lib/learn/AuthContext";

export default function LearnDashboard() {
  const { user, logout } = useLearnAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/learn/auth");
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[var(--page-bg)] px-6 py-16 text-[var(--page-text)]">
        <div className="mx-auto w-full max-w-5xl flex flex-col gap-12">

          {/* Header */}
          <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                CodeType Learn
              </p>
              <h1 className="text-4xl font-semibold text-white">
                Welcome back, {user?.displayName}
              </h1>
              <p className="text-slate-400 max-w-lg">
                Choose a course to continue learning.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="self-start sm:self-auto rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 hover:text-slate-200 hover:border-slate-500 transition"
            >
              Sign Out
            </button>
          </section>

          {/* Admin shortcut */}
          {user?.role === "admin" && (
            <div
              onClick={() => router.push("/learn/admin")}
              className="rounded-3xl border border-violet-500/30 bg-violet-500/5 px-8 py-5 flex items-center gap-4 cursor-pointer hover:border-violet-400/50 hover:bg-violet-500/10 transition"
            >
              <span className="text-2xl">🛡️</span>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">Admin</p>
                <p className="text-white font-semibold">Student Monitor</p>
                <p className="text-xs text-slate-400 mt-0.5">View all students' progress across every course.</p>
              </div>
              <span className="text-slate-600 text-xl">→</span>
            </div>
          )}

          {/* Course list */}
          <section className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Available Courses
            </h2>

            {/* Python 101 card */}
            <div
              onClick={() => router.push("/learn/courses/python101")}
              className="rounded-3xl border border-slate-800/70 bg-slate-900/70 shadow-sm backdrop-blur overflow-hidden cursor-pointer hover:-translate-y-1 hover:border-slate-600/60 hover:shadow-lg transition"
            >
              <div className="bg-gradient-to-r from-sky-500 to-blue-400 h-1.5" />
              <div className="p-8 flex items-center gap-6">
                <span className="text-5xl">🐍</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-1">
                    Beginner · 7 Modules
                  </p>
                  <h3 className="text-2xl font-semibold text-white mb-1">Python 101</h3>
                  <p className="text-sm text-slate-400">
                    Learn Python from scratch — variables, control flow, strings, lists, tuples, and dictionaries.
                  </p>
                </div>
                <span className="text-slate-600 text-xl shrink-0">→</span>
              </div>
            </div>

            {/* Java OOP card — admin only */}
            {user?.role === "admin" && (
              <div
                onClick={() => router.push("/learn/courses/java-oop")}
                className="rounded-3xl border border-slate-800/70 bg-slate-900/70 shadow-sm backdrop-blur overflow-hidden cursor-pointer hover:-translate-y-1 hover:border-slate-600/60 hover:shadow-lg transition"
              >
                <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-1.5" />
                <div className="p-8 flex items-center gap-6">
                  <span className="text-5xl">☕</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-1">
                      Intermediate · 18 Modules
                    </p>
                    <h3 className="text-2xl font-semibold text-white mb-1">OOP in Java</h3>
                    <p className="text-sm text-slate-400">
                      Master object-oriented programming — classes, inheritance, polymorphism, abstract classes, and interfaces.
                    </p>
                  </div>
                  <span className="text-slate-600 text-xl shrink-0">→</span>
                </div>
              </div>
            )}

            {/* Python 130 card */}
            <div
              onClick={() => router.push("/learn/courses/python130")}
              className="rounded-3xl border border-slate-800/70 bg-slate-900/70 shadow-sm backdrop-blur overflow-hidden cursor-pointer hover:-translate-y-1 hover:border-slate-600/60 hover:shadow-lg transition"
            >
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5" />
              <div className="p-8 flex items-center gap-6">
                <span className="text-5xl">🐍</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-1">
                    Intermediate · 11 Modules
                  </p>
                  <h3 className="text-2xl font-semibold text-white mb-1">Python 130</h3>
                  <p className="text-sm text-slate-400">
                    Algorithms and data structures — testing, complexity, sorting, classes, stacks, recursion, linked lists, trees, and hash tables.
                  </p>
                </div>
                <span className="text-slate-600 text-xl shrink-0">→</span>
              </div>
            </div>
          </section>

        </div>
      </main>
    </AuthGuard>
  );
}
