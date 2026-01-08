import { notFound } from "next/navigation";

import { GameEngine } from "@/components/game/GameEngine";
import { CURRICULUM } from "@/lib/curriculum";

export default async function PracticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const algorithm = CURRICULUM.find((item) => item.id === id);

  if (!algorithm) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--page-bg)] px-6 py-12 text-[var(--page-text)]">
      <div className="mx-auto w-full max-w-5xl">
        <GameEngine algorithm={algorithm} />
      </div>
    </main>
  );
}
