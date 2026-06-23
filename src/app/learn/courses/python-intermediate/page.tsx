"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CoursePageLayout from "@/components/learn/CoursePageLayout";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { getAllModules } from "@/lib/learn/courses/python-intermediate/index";
import { loadAllProgress } from "@/lib/learn/db";

const modules = getAllModules();
const totalQ = modules.reduce((s, m) => s + m.questions.length, 0);
const COURSE_SLUG = "python-intermediate";

interface ModuleProgress {
  score: number;
  answeredCount: number;
}

export default function PythonIntermediatePage() {
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
    return () => {
      active = false;
    };
  }, [studentId]);

  function handleLogout() {
    logout();
    router.push("/learn/auth");
  }

  const totalCorrect = Object.entries(progress)
    .filter(([key]) => key.startsWith(`${COURSE_SLUG}/`))
    .reduce((s, [, m]) => s + m.score, 0);

  const tabs = [{ id: "learn", label: "Learn" }];

  return (
    <CoursePageLayout
      courseSlug={COURSE_SLUG}
      courseTitle="Python Intermediate"
      courseIcon="🐍"
      courseLevel="Intermediate · 11 Weeks"
      moduleCount={modules.length}
      totalCorrect={totalCorrect}
      totalQ={totalQ}
      loadingProgress={loadingProgress}
      modules={modules}
      progress={progress}
      tabs={tabs}
      activeTab={tab}
      onTabChange={setTab}
      isAdmin={user?.role === "admin"}
      onLogout={handleLogout}
      overviewHref={`/learn/courses/${COURSE_SLUG}/overview`}
    />
  );
}
