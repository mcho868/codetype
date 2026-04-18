"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CoursePageLayout from "@/components/learn/CoursePageLayout";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { getAllModules } from "@/lib/learn/courses/java-oop/index";
import { loadAllProgress } from "@/lib/learn/db";

const modules = getAllModules();
const totalQ = modules.reduce((s, m) => s + m.questions.length, 0);

interface ModuleProgress { score: number; answeredCount: number; }

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

  const totalCorrect = Object.entries(progress)
    .filter(([key]) => key.startsWith("java-oop/"))
    .reduce((s, [, m]) => s + m.score, 0);

  return (
    <CoursePageLayout
      courseSlug="java-oop"
      courseTitle="OOP in Java"
      courseIcon="☕"
      courseLevel="Intermediate"
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
