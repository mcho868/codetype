"use client";

import { useRouter } from "next/navigation";
import { Module } from "@/lib/learn/courseData";
import ProgressBar from "./ProgressBar";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  module: Module;
  score?: number;
  completed?: boolean;
  courseSlug?: string;
  courseTitle?: string;
}

export default function ModuleCard({
  module,
  score = 0,
  completed = false,
  courseSlug,
  courseTitle = 'Python 101',
}: ModuleCardProps) {
  const router = useRouter();
  const total = module.questions.length;
  const locked = module.locked;
  const modulePath = courseSlug
    ? `/learn/courses/${courseSlug}/${module.slug}`
    : `/learn/${module.slug}`;

  let statusLabel = "Not Started";
  if (locked) statusLabel = "Coming Soon";
  else if (completed) statusLabel = "Completed";
  else if (score > 0) statusLabel = "In Progress";

  return (
    <div
      className={cn(
        "rounded-3xl border bg-slate-900/70 shadow-sm backdrop-blur overflow-hidden transition",
        locked
          ? "border-slate-800/50 opacity-50 cursor-not-allowed"
          : "border-slate-800/70 cursor-pointer hover:-translate-y-1 hover:border-slate-600/60 hover:shadow-lg"
      )}
      onClick={() => !locked && router.push(modulePath)}
    >
      {/* Colour band */}
      <div className={cn("bg-gradient-to-r h-1.5", module.color)} />

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <span className="text-3xl">{locked ? "🔒" : module.icon}</span>
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.25em] px-2.5 py-1 rounded-full",
              locked
                ? "bg-slate-800 text-slate-600"
                : completed
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : score > 0
                ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                : "bg-slate-800 text-slate-500"
            )}
          >
            {statusLabel}
          </span>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-2">
          {courseTitle}
        </p>
        <h3 className="text-lg font-semibold text-white mb-2">{module.title}</h3>
        <p className="text-sm text-slate-400 mb-5">{module.description}</p>

        {!locked && (
          <ProgressBar
            current={score}
            total={total}
            showLabel
            size="sm"
            colorClass={completed ? "bg-emerald-400" : "bg-cyan-400"}
          />
        )}

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 mt-4">
          {module.lessons.length} lessons · {total} questions
        </p>
      </div>
    </div>
  );
}
