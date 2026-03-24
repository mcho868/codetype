"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { generateSteps } from "./visualizers/generateSteps";
import type { VisualizerKind, HighlightRole } from "./visualizers/types";

const LABEL: Record<VisualizerKind, string> = {
  "linear-search": "Linear Search",
  "binary-search": "Binary Search",
  "selection-sort": "Selection Sort",
  "bubble-sort": "Bubble Sort",
  "insertion-sort": "Insertion Sort",
  "merge-sort": "Merge Sort",
};

const COMPLEXITY: Record<VisualizerKind, { time: string; space: string; note: string }> = {
  "linear-search": { time: "O(n)", space: "O(1)", note: "Works on unsorted data" },
  "binary-search": { time: "O(log n)", space: "O(1)", note: "Requires sorted data" },
  "selection-sort": { time: "O(n²)", space: "O(1)", note: "Always n−1 swaps" },
  "bubble-sort": { time: "O(n²)", space: "O(1)", note: "O(n) best case with early exit" },
  "insertion-sort": { time: "O(n²)", space: "O(1)", note: "O(n) on nearly-sorted data" },
  "merge-sort": { time: "O(n log n)", space: "O(n)", note: "Stable, consistent" },
};

const BAR_COLOR: Record<HighlightRole, string> = {
  comparing: "bg-cyan-400",
  pivot: "bg-violet-400",
  sorted: "bg-emerald-500",
  found: "bg-cyan-300",
  "subarray-left": "bg-sky-500",
  "subarray-right": "bg-amber-500",
};

const LEGEND: { role: HighlightRole; label: string }[] = [
  { role: "comparing", label: "Comparing" },
  { role: "pivot", label: "Pivot / Mid" },
  { role: "sorted", label: "Sorted" },
  { role: "found", label: "Found" },
  { role: "subarray-left", label: "Left half" },
  { role: "subarray-right", label: "Right half" },
];

const SPEEDS = [
  { label: "Slow", ms: 1000 },
  { label: "Medium", ms: 500 },
  { label: "Fast", ms: 200 },
];

interface Props {
  kind: VisualizerKind;
}

export default function AlgorithmVisualizer({ kind }: Props) {
  const steps = useMemo(() => generateSteps(kind), [kind]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1);

  const speed = SPEEDS[speedIdx].ms;
  const current = steps[stepIndex];
  const isLast = stepIndex >= steps.length - 1;
  const isFirst = stepIndex === 0;

  // Reset when kind changes
  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(false);
  }, [kind]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying) return;
    if (isLast) {
      setIsPlaying(false);
      return;
    }
    const id = setTimeout(() => setStepIndex((i) => i + 1), speed);
    return () => clearTimeout(id);
  }, [isPlaying, stepIndex, speed, isLast]);

  const reset = useCallback(() => {
    setStepIndex(0);
    setIsPlaying(false);
  }, []);

  const prev = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((i) => Math.min(steps.length - 1, i + 1));
  }, [steps.length]);

  const maxVal = Math.max(...current.array);

  return (
    <div className="my-6 rounded-3xl border border-slate-800/70 bg-slate-950/80 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            {LABEL[kind]}
          </span>
          <span className="text-xs text-slate-600">visualiser</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span>
            <span className="text-slate-400 font-semibold">Time</span>{" "}
            {COMPLEXITY[kind].time}
          </span>
          <span>
            <span className="text-slate-400 font-semibold">Space</span>{" "}
            {COMPLEXITY[kind].space}
          </span>
          <span className="hidden sm:inline">{COMPLEXITY[kind].note}</span>
        </div>
      </div>

      {/* Bars */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-end justify-center gap-1.5 h-32">
          {current.array.map((val, i) => {
            const role = current.highlights[i];
            const barColor = role ? BAR_COLOR[role] : "bg-slate-700";
            const heightPct = Math.max(10, Math.round((val / maxVal) * 100));
            const isRing = role === "found";

            const isActive = !!role;
            const glowColor: Partial<Record<HighlightRole, string>> = {
              comparing: "0 0 8px 2px rgba(34,211,238,0.7)",
              pivot: "0 0 8px 2px rgba(167,139,250,0.7)",
              found: "0 0 12px 4px rgba(103,232,249,0.8)",
              "subarray-left": "0 0 8px 2px rgba(56,189,248,0.6)",
              "subarray-right": "0 0 8px 2px rgba(251,191,36,0.6)",
              sorted: "none",
            };

            return (
              <div
                key={i}
                className="flex flex-col items-center gap-1 flex-1 max-w-[52px]"
              >
                <span className={`text-[10px] font-semibold transition-colors duration-150 ${isActive ? "text-white" : "text-slate-500"}`}>
                  {val}
                </span>
                <div
                  className={`w-full rounded-t-md transition-all duration-200 ${barColor} ${
                    isRing ? "ring-2 ring-cyan-300 ring-offset-1 ring-offset-slate-950" : ""
                  }`}
                  style={{
                    height: `${heightPct}%`,
                    boxShadow: role && glowColor[role] ? glowColor[role] : undefined,
                  }}
                />
                <span className={`text-[9px] transition-colors duration-150 ${isActive ? "text-slate-300 font-semibold" : "text-slate-600"}`}>{i}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 py-2 flex flex-wrap gap-3">
        {LEGEND.map(({ role, label }) => (
          <div key={role} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-sm ${BAR_COLOR[role]}`} />
            <span className="text-[10px] text-slate-500">{label}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="px-6 pb-1">
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-cyan-400/60 transition-all duration-200"
            style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Explanation */}
      <div className="px-6 py-4 min-h-[56px]">
        <p className="text-sm text-slate-300 leading-relaxed">
          {current.explanation}
        </p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-600">
          Step {stepIndex + 1} / {steps.length}
        </p>
      </div>

      {/* Controls */}
      <div className="px-6 pb-5 flex flex-wrap items-center gap-3">
        {/* Prev */}
        <button
          onClick={prev}
          disabled={isFirst}
          className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Prev
        </button>

        {/* Play / Pause */}
        <button
          onClick={() => setIsPlaying((p) => !p)}
          disabled={isLast}
          className="rounded-full bg-cyan-400 px-5 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>

        {/* Next */}
        <button
          onClick={next}
          disabled={isLast}
          className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next →
        </button>

        {/* Reset */}
        <button
          onClick={reset}
          className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-semibold text-slate-500 transition hover:border-slate-500 hover:text-slate-300"
        >
          ↺ Reset
        </button>

        {/* Speed */}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-600">
            Speed
          </span>
          {SPEEDS.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setSpeedIdx(i)}
              className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                speedIdx === i
                  ? "bg-slate-700 text-slate-200"
                  : "text-slate-600 hover:text-slate-400"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
