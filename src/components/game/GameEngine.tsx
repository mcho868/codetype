"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { AlgorithmEntry, Language } from "@/lib/curriculum";
import { calculateAccuracy, calculateWpm, cn } from "@/lib/utils";
import { useGameStore } from "@/lib/store";
import { LANGUAGE_LABELS, LANGUAGE_OPTIONS } from "@/lib/curriculum/languages";

import { CodeDisplay } from "@/components/game/CodeDisplay";
import { HiddenInput } from "@/components/game/HiddenInput";
import { KeyboardUI } from "@/components/game/KeyboardUI";
import { ResultsModal } from "@/components/game/ResultsModal";

export function GameEngine({ algorithm }: { algorithm: AlgorithmEntry }) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const codeContainerRef = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [completedAt, setCompletedAt] = useState<number | null>(null);
  const [language, setLanguage] = useState<Language>(() => {
    return algorithm.variants.typescript ? "typescript" : "javascript";
  });
  const [pulseRange, setPulseRange] = useState<{
    start: number;
    end: number;
    id: number;
  } | null>(null);
  const previousInputRef = useRef("");
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [isLinear, setIsLinear] = useState(false);

  const {
    status,
    userInput,
    targetCode,
    startTime,
    mistakes,
    startGame,
    handleInput,
    resetGame,
  } = useGameStore();

  useEffect(() => {
    const rawCode =
      algorithm.variants[language] ?? algorithm.variants.typescript;
    const nextCode = isLinear
      ? rawCode.replace(/\s+/g, " ").trim()
      : rawCode;
    startGame(nextCode);
    setCompletedAt(null);
    setPulseRange(null);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [algorithm, isLinear, language, startGame]);

  useEffect(() => {
    if (status === "completed") {
      setCompletedAt((prev) => prev ?? Date.now());
    } else {
      setCompletedAt(null);
    }
  }, [status]);

  useEffect(() => {
    const previous = previousInputRef.current;
    if (!targetCode || userInput.length <= previous.length) {
      previousInputRef.current = userInput;
      return;
    }

    const added = userInput.slice(previous.length);
    const newlineOffset = added.indexOf("\n");
    const boundaryIndex =
      newlineOffset >= 0 ? previous.length + newlineOffset : userInput.length - 1;
    const boundaryChar =
      newlineOffset >= 0 ? "\n" : userInput[userInput.length - 1];
    const expectedBoundaryChar = targetCode[boundaryIndex];

    previousInputRef.current = userInput;

    if (boundaryChar !== expectedBoundaryChar) return;
    if (boundaryChar !== " " && boundaryChar !== "\n") return;
    if (
      boundaryChar === " " &&
      boundaryIndex > 0 &&
      /\s/.test(targetCode[boundaryIndex - 1])
    ) {
      return;
    }

    let cursor = boundaryIndex - 1;
    while (cursor >= 0 && /\s/.test(targetCode[cursor])) {
      cursor -= 1;
    }
    if (cursor < 0) return;
    const wordEnd = cursor;
    while (cursor >= 0 && !/\s/.test(targetCode[cursor])) {
      cursor -= 1;
    }
    const wordStart = cursor + 1;

    const targetWord = targetCode.slice(wordStart, wordEnd + 1);
    const typedWord = userInput.slice(wordStart, wordEnd + 1);
    if (targetWord !== typedWord) return;

    setPulseRange((prevRange) => ({
      start: wordStart,
      end: wordEnd,
      id: (prevRange?.id ?? 0) + 1,
    }));
  }, [targetCode, userInput]);

  useEffect(() => {
    const container = codeContainerRef.current;
    if (!container) return;
    const cursorEl = container.querySelector<HTMLElement>(
      "[data-cursor=\"true\"]"
    );
    if (!cursorEl) return;
    cursorEl.scrollIntoView({ block: "center", inline: "center" });
  }, [userInput.length]);

  useEffect(() => {
    if (!pulseRange) return;
    const timeout = setTimeout(() => setPulseRange(null), 360);
    return () => clearTimeout(timeout);
  }, [pulseRange?.id]);

  const elapsedMs = completedAt && startTime ? completedAt - startTime : 0;
  const correctChars = Math.max(0, userInput.length - mistakes);

  const stats = useMemo(
    () => ({
      wpm: calculateWpm(userInput.length, elapsedMs),
      accuracy: calculateAccuracy(correctChars, userInput.length),
    }),
    [correctChars, elapsedMs, userInput.length]
  );

  const expectedKey = useMemo(() => {
    const nextChar = targetCode[userInput.length];
    if (!nextChar) return "Done";
    if (nextChar === "\n") return "Enter";
    if (nextChar === "\t") return "Tab";
    if (nextChar === " ") return "Space";
    return nextChar.toUpperCase();
  }, [targetCode, userInput.length]);

  const formatKeyLabel = (key: string) => {
    if (key === " ") return "Space";
    if (key === "Enter") return "Enter";
    if (key === "Tab") return "Tab";
    if (key === "Backspace") return "Backspace";
    if (key === "Shift") return "Shift";
    if (key.length === 1) return key.toUpperCase();
    return key;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Practice Session
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            {algorithm.title}
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            {LANGUAGE_LABELS[language]}
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Runtime: {algorithm.runtime}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Language
          </label>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as Language)}
            className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 outline-none"
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Linear
          </label>
          <button
            type="button"
            onClick={() => setIsLinear((prev) => !prev)}
            className={cn(
              "rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition",
              isLinear
                ? "border-cyan-300 bg-cyan-400/20 text-cyan-100"
                : "border-slate-800 bg-slate-900/70 text-slate-300"
            )}
          >
            {isLinear ? "On" : "Off"}
          </button>
          <div className="rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            {status}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 lg:hidden">
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            <span className="text-slate-500">Next</span>
            <span className="text-cyan-200">{expectedKey}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            <span className="text-slate-500">Last</span>
            <span className="text-slate-200">{lastKey ?? "—"}</span>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div
          className="relative"
          onClick={() => inputRef.current?.focus()}
          role="button"
          tabIndex={-1}
        >
          <div
            ref={codeContainerRef}
            className={cn(
              "relative max-h-[70vh] overflow-auto rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-xl transition",
              !isFocused && "blur-[1.5px]"
            )}
          >
            <CodeDisplay
              targetCode={targetCode}
              userInput={userInput}
              language={language}
              pulseRange={pulseRange}
            />
          </div>

          <HiddenInput
            ref={inputRef}
            targetCode={targetCode}
            userInput={userInput}
            onInput={handleInput}
            onFocusChange={setIsFocused}
            disabled={status === "completed"}
            onKeyPress={(key) => setLastKey(formatKeyLabel(key))}
            isLinear={isLinear}
          />

          {!isFocused && (
            <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-slate-950/70">
              <div className="rounded-full border border-slate-800 bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300 shadow">
                Click to focus
              </div>
            </div>
          )}
        </div>
        <div className="hidden w-full max-w-[260px] space-y-4 lg:justify-self-end lg:block">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Next Key
            </p>
            <p className="mt-3 text-2xl font-semibold text-cyan-200">
              {expectedKey}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Last Pressed
            </p>
            <p className="mt-3 text-xl font-semibold text-slate-200">
              {lastKey ?? "—"}
            </p>
          </div>
        </div>
        </div>

        <div className="flex justify-center">
          <KeyboardUI expectedKey={expectedKey} lastKey={lastKey} showHeader={false} />
        </div>
      </div>

      <ResultsModal
        isOpen={status === "completed"}
        wpm={stats.wpm}
        accuracy={stats.accuracy}
        mistakes={mistakes}
        totalChars={userInput.length}
        onRestart={() => {
          resetGame();
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
      />
    </div>
  );
}
