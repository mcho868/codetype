import { Suspense } from "react";
import QuizView from "@/components/learn/QuizView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ moduleId: string }>;
}

export default async function QuizPage({ params }: Props) {
  const { moduleId } = await params;
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[var(--page-bg)] flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        </main>
      }
    >
      <QuizView moduleId={moduleId} />
    </Suspense>
  );
}
