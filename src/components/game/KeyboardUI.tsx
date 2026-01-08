"use client";

import { cn } from "@/lib/utils";

const KEY_ROWS = [
  ["Esc", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
  ["Space"],
];

const KEY_WIDTHS: Record<string, number> = {
  Backspace: 4.75,
  Tab: 3.25,
  Caps: 3.75,
  Enter: 4.5,
  Shift: 5.25,
  Space: 14,
};

const ROW_OFFSETS = ["", "pl-2", "pl-3", "pl-5", ""];

type KeyboardUIProps = {
  expectedKey?: string;
  lastKey?: string | null;
  showHeader?: boolean;
};

export function KeyboardUI({
  expectedKey,
  lastKey,
  showHeader = true,
}: KeyboardUIProps) {
  return (
    <aside className="flex flex-col items-center rounded-3xl border border-slate-800 bg-slate-950/70 p-5 shadow-xl">
      {showHeader && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Next Key
            </p>
            <p className="mt-3 text-2xl font-semibold text-cyan-200">
              {expectedKey}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Last Pressed
            </p>
            <p className="mt-3 text-xl font-semibold text-slate-200">
              {lastKey ?? "—"}
            </p>
          </div>
        </div>
      )}

      <div className={cn(showHeader ? "mt-6" : "", "space-y-2")}>
        {KEY_ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn("flex gap-2 justify-center", ROW_OFFSETS[rowIndex])}
          >
            {row.map((keyLabel, keyIndex) => {
              const isExpected =
                expectedKey &&
                keyLabel.toUpperCase() === expectedKey.toUpperCase();
              const isPressed =
                lastKey && keyLabel.toUpperCase() === lastKey.toUpperCase();
              const width = KEY_WIDTHS[keyLabel] ?? 2.5;
              return (
                <div
                  key={`${keyLabel}-${keyIndex}`}
                  className={cn(
                    "flex h-9 items-center justify-center rounded-lg border border-slate-800 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300 shadow-sm",
                    isExpected &&
                      "border-cyan-300 bg-cyan-400/20 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.5)]",
                    isPressed &&
                      "border-emerald-300 bg-emerald-400/20 text-emerald-100"
                  )}
                  style={{ minWidth: `${width}rem` }}
                >
                  {keyLabel}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}
