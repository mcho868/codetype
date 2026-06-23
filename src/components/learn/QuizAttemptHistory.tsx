"use client";

import { cn } from "@/lib/utils";
import type { QuizAttemptSummary } from "@/lib/learn/db";

interface QuizAttemptHistoryProps {
  attempts: QuizAttemptSummary[];
  totalQuestions: number;
  onOpenAttempt: (attemptNumber: number) => void;
  loading?: boolean;
}

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function QuizAttemptHistory({
  attempts,
  totalQuestions,
  onOpenAttempt,
  loading = false,
}: QuizAttemptHistoryProps) {
  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-800/70 bg-slate-900/70 px-8 py-6 shadow-sm backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-4">
          Recent Attempts
        </p>
        <div className="flex justify-center py-4">
          <div className="w-5 h-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        </div>
      </section>
    );
  }

  if (attempts.length === 0) return null;

  return (
    <section className="rounded-3xl border border-slate-800/70 bg-slate-900/70 overflow-hidden shadow-sm backdrop-blur">
      <div className="px-8 py-5 border-b border-slate-800/70">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Recent Attempts
        </p>
      </div>
      <ul className="divide-y divide-slate-800/70">
        {attempts.map((attempt) => {
          const pct =
            totalQuestions > 0
              ? Math.round((attempt.score / totalQuestions) * 100)
              : 0;
          const label = attempt.inProgress ? "In progress" : `${pct}%`;
          const time = formatRelativeTime(attempt.completedAt ?? attempt.startedAt);

          return (
            <li key={attempt.attemptNumber}>
              <button
                type="button"
                onClick={() => onOpenAttempt(attempt.attemptNumber)}
                className="w-full flex items-center gap-4 px-8 py-4 text-left hover:bg-slate-800/40 transition"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center">
                  {attempt.attemptNumber}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{time}</p>
                </div>
                <span
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.15em]",
                    attempt.inProgress
                      ? "text-cyan-400"
                      : pct === 100
                      ? "text-emerald-400"
                      : pct >= 50
                      ? "text-yellow-400"
                      : "text-slate-500"
                  )}
                >
                  {attempt.inProgress ? "Continue →" : "View →"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
