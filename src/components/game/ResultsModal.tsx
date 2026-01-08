"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";

type ResultsModalProps = {
  isOpen: boolean;
  wpm: number;
  accuracy: number;
  mistakes: number;
  totalChars: number;
  onRestart: () => void;
};

export function ResultsModal({
  isOpen,
  wpm,
  accuracy,
  mistakes,
  totalChars,
  onRestart,
}: ResultsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Session Complete
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Your Results
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">WPM</p>
            <p className="mt-2 text-2xl font-semibold text-white">{wpm}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Accuracy
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {accuracy}%
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Mistakes
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {mistakes}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Typed
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {totalChars}
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button onClick={onRestart}>Restart</Button>
          <Link href="/" className="text-sm font-semibold text-slate-300">
            Back to list
          </Link>
        </div>
      </div>
    </div>
  );
}
