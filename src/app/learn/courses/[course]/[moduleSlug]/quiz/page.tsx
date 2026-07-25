import { Suspense } from "react";
import { redirect } from "next/navigation";
import QuizView from "@/components/learn/QuizView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ course: string; moduleSlug: string }>;
}

export default async function CourseQuizPage({ params }: Props) {
  const { course, moduleSlug } = await params;
  if (course === "compsci101") {
    redirect(`/learn/courses/python-essentials/${moduleSlug}/quiz`);
  }
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[var(--page-bg)] flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        </main>
      }
    >
      <QuizView courseSlug={course} moduleId={moduleSlug} />
    </Suspense>
  );
}
