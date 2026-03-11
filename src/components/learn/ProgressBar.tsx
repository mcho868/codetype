"use client";

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  colorClass?: string;
}

export default function ProgressBar({
  current,
  total,
  showLabel = false,
  size = "md",
  colorClass = "bg-cyan-400",
}: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);
  const heightClass =
    size === "sm" ? "h-1" : size === "lg" ? "h-3" : "h-1.5";

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-slate-500 mb-1 font-semibold uppercase tracking-[0.2em]">
          <span>{current} / {total}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800 rounded-full ${heightClass} overflow-hidden`}>
        <div
          className={`${heightClass} rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
