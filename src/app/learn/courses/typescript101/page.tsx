"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CoursePageLayout from "@/components/learn/CoursePageLayout";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { getAllModules } from "@/lib/learn/courses/typescript101/index";
import { loadAllProgress } from "@/lib/learn/db";

const modules = getAllModules();
const totalQ = modules.reduce((s, m) => s + m.questions.length, 0);

interface ModuleProgress { score: number; answeredCount: number; }

export default function Typescript101Page() {
  const { user, studentId, logout } = useLearnAuth();
  const router = useRouter();
  const [tab, setTab] = useState("learn");
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({});
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.replace("/learn/dashboard");
    }
  }, [router, user]);

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

  const totalCorrect = Object.entries(progress)
    .filter(([key]) => key.startsWith("typescript101/"))
    .reduce((s, [, m]) => s + m.score, 0);

  const tabs = [
    { id: "learn", label: "Learn" },
    { id: "tests", label: "Tests" },
  ];

  return (
    <CoursePageLayout
      courseSlug="typescript101"
      courseTitle="TypeScript 101"
      courseIcon="🟦"
      courseLevel="Beginner"
      moduleCount={modules.length}
      totalCorrect={totalCorrect}
      totalQ={totalQ}
      loadingProgress={loadingProgress}
      modules={modules}
      progress={progress}
      tabs={tabs}
      activeTab={tab}
      onTabChange={setTab}
      tabContent={{ tests: <TestsTab router={router} /> }}
      isAdmin={user?.role === "admin"}
      onLogout={() => { logout(); router.push("/learn/auth"); }}
    />
  );
}

function TestsTab({ router }: { router: ReturnType<typeof useRouter> }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-white mb-1">Tests</h2>
        <p className="text-sm text-slate-400">
          Formal assessments for this course. Each test is timed and graded — you need 60% or above to pass.
        </p>
      </div>
      <div
        onClick={() => router.push("/learn/courses/typescript101/tests/resit-1")}
        className="rounded-3xl border border-slate-800/70 bg-slate-900/70 shadow-sm backdrop-blur overflow-hidden cursor-pointer hover:-translate-y-1 hover:border-slate-600/60 hover:shadow-lg transition"
      >
        <div className="bg-gradient-to-r from-red-500 to-rose-400 h-1.5" />
        <div className="p-7 flex items-center gap-6">
          <span className="text-4xl">📝</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-1">
              15 Questions
            </p>
            <h3 className="text-xl font-semibold text-white mb-1">TypeScript 101 — Test</h3>
            <p className="text-sm text-slate-400">
              5 multiple-choice + 10 coding questions covering the full TypeScript 101 curriculum — types, arrays, tuples, objects, enums, interfaces, classes, generics, and utility types.
            </p>
          </div>
          <span className="text-slate-600 text-xl shrink-0">→</span>
        </div>
      </div>
    </div>
  );
}
