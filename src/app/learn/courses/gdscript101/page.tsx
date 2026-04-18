"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CoursePageLayout from "@/components/learn/CoursePageLayout";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { getAllModules } from "@/lib/learn/courses/gdscript101/index";
import { loadAllProgress } from "@/lib/learn/db";

const modules = getAllModules();
const totalQ = modules.reduce((s, m) => s + m.questions.length, 0);

interface ModuleProgress { score: number; answeredCount: number; }

export default function Gdscript101Page() {
  const { user, studentId, logout } = useLearnAuth();
  const router = useRouter();
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
    .filter(([key]) => key.startsWith("gdscript101/"))
    .reduce((s, [, m]) => s + m.score, 0);

  return (
    <CoursePageLayout
      courseSlug="gdscript101"
      courseTitle="GDScript 101"
      courseIcon="🐸"
      courseLevel="Beginner"
      moduleCount={modules.length}
      totalCorrect={totalCorrect}
      totalQ={totalQ}
      loadingProgress={loadingProgress}
      modules={modules}
      progress={progress}
      tabs={[{ id: "learn", label: "Learn" }]}
      activeTab="learn"
      onTabChange={() => {}}
      isAdmin={user?.role === "admin"}
      onLogout={() => { logout(); router.push("/learn/auth"); }}
    />
  );
}
