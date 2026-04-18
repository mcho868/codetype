"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CoursePageLayout from "@/components/learn/CoursePageLayout";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { getAllModules } from "@/lib/learn/courses/python130/index";
import { loadAllProgress } from "@/lib/learn/db";

const allModules = getAllModules();
const regularModules = allModules.filter((m) => !m.isMidterm);
const midterms = allModules.filter((m) => m.isMidterm);
const totalQ = regularModules.reduce((s, m) => s + m.questions.length, 0);

interface ModuleProgress {
  score: number;
  answeredCount: number;
}

export default function Python130Page() {
  const { user, studentId, logout } = useLearnAuth();
  const router = useRouter();
  const [tab, setTab] = useState("learn");
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
    .filter(([key]) => key.startsWith("python130/"))
    .reduce((s, [, m]) => s + m.score, 0);

  const isAdmin = user?.role === "admin";

  const tabs = [
    { id: "learn", label: "Learn" },
    { id: "tests", label: "Tests" },
  ];

  const testsContent = (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-white mb-1">Midterm Tests</h2>
        <p className="text-sm text-slate-400">
          Past-exam style assessments covering key modules. Work through each question and review your answers at the end.
        </p>
      </div>
      {midterms.map((mod) => {
        const p = progress[`python130/${mod.slug}`];
        const isLocked = isAdmin ? false : mod.locked;
        const answered = p?.answeredCount ?? 0;
        const completed = !isLocked && answered >= mod.questions.length;
        return (
          <div
            key={mod.id}
            onClick={() => !isLocked && router.push(`/learn/courses/python130/${mod.slug}/quiz`)}
            className="rounded-3xl border border-slate-800/70 bg-slate-900/70 shadow-sm backdrop-blur overflow-hidden cursor-pointer hover:-translate-y-1 hover:border-slate-600/60 hover:shadow-lg transition"
          >
            <div className={`bg-gradient-to-r ${mod.color} h-1.5`} />
            <div className="p-7 flex items-center gap-6">
              <span className="text-4xl">{mod.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-1">
                  {mod.questions.length} Questions
                  {completed && (
                    <span className="ml-3 text-emerald-400">· Completed — {p?.score}/{mod.questions.length} correct</span>
                  )}
                  {!completed && answered > 0 && (
                    <span className="ml-3 text-yellow-400">· In Progress — {answered}/{mod.questions.length} answered</span>
                  )}
                </p>
                <h3 className="text-xl font-semibold text-white mb-1">{mod.title}</h3>
                <p className="text-sm text-slate-400">{mod.description}</p>
              </div>
              <span className="text-slate-600 text-xl shrink-0">→</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <CoursePageLayout
      courseSlug="python130"
      courseTitle="Python 130"
      courseIcon="🐍"
      courseLevel="Intermediate"
      moduleCount={regularModules.length}
      totalCorrect={totalCorrect}
      totalQ={totalQ}
      loadingProgress={loadingProgress}
      modules={regularModules}
      progress={progress}
      tabs={tabs}
      activeTab={tab}
      onTabChange={setTab}
      tabContent={{ tests: testsContent }}
      isAdmin={isAdmin}
      onLogout={handleLogout}
    />
  );
}
