"use client";

import type { LessonAttachment } from "@/lib/learn/courses/python101/types";

const FONT = "var(--font-mono), monospace";

function downloadFile(name: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

interface LessonAttachmentsProps {
  attachments: LessonAttachment[];
}

/** Renders downloadable sample files for a lesson. The same files are seeded
 *  into the code runner, so students can open them in code or download them. */
export default function LessonAttachments({ attachments }: LessonAttachmentsProps) {
  if (attachments.length === 0) return null;

  return (
    <div className="my-4 rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
        Sample files
      </p>
      <ul className="space-y-2">
        {attachments.map((file) => (
          <li key={file.name} className="flex items-center gap-3">
            <button
              onClick={() => downloadFile(file.name, file.content)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm font-medium text-cyan-300 transition hover:border-cyan-500/60 hover:text-cyan-200"
            >
              <span aria-hidden>↓</span>
              <span style={{ fontFamily: FONT }}>{file.name}</span>
            </button>
            {file.description && (
              <span className="text-sm text-slate-400">{file.description}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
