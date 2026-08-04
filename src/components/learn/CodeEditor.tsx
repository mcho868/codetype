"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { runPythonCode } from "@/lib/learn/pythonRunner";

const CodeMirrorEditor = dynamic(() => import("./CodeMirrorEditor"), { ssr: false });

interface CodeEditorProps {
  initialCode: string;
  caption?: string;
  sampleInput?: string;
  expectedOutput?: string;
  readOnly?: boolean;
}

type TerminalLine =
  | { type: "output"; text: string }
  | { type: "error"; text: string };

export default function CodeEditor({
  initialCode,
  caption,
  sampleInput = "",
  expectedOutput,
  readOnly = false,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState(sampleInput);
  const [resetKey, setResetKey] = useState(0);
  const [termLines, setTermLines] = useState<TerminalLine[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "pass" | "fail">("idle");
  const termRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const isRunning = status === "loading";
  const readsInput = /\binput\s*\(/.test(code);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [termLines, status]);

  async function handleRun() {
    if (readsInput && stdin.length === 0) {
      setTermLines([
        {
          type: "error",
          text: "This program reads input. Enter one line per input() call in the field below, then run it again.",
        },
      ]);
      setStatus("fail");
      return;
    }

    setStatus("loading");
    setTermLines([]);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const result = await runPythonCode(code, stdin, controller.signal);
      if (result.error) {
        setTermLines([{ type: "error", text: result.error }]);
        setStatus("fail");
      } else {
        setTermLines(result.output ? [{ type: "output", text: result.output }] : []);
        const clean = (s: string) => s.trim().replace(/\r\n/g, "\n");
        setStatus(
          expectedOutput !== undefined && clean(result.output) !== clean(expectedOutput)
            ? "fail"
            : expectedOutput !== undefined
            ? "pass"
            : "done"
        );
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        setTermLines([{ type: "error", text: (error as Error).message }]);
      }
      setStatus("fail");
    } finally {
      abortRef.current = null;
    }
  }

  function handleStop() {
    abortRef.current?.abort();
    setTermLines([{ type: "error", text: "Execution stopped by user." }]);
    setStatus("fail");
  }

  function handleReset() {
    setCode(initialCode);
    setStdin(sampleInput);
    setResetKey((k) => k + 1);
    setTermLines([]);
    setStatus("idle");
  }

  const hasTerminalContent = termLines.length > 0;

  return (
    <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 overflow-hidden my-4 shadow-sm backdrop-blur">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-slate-800/70 bg-slate-900/60">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">python</span>
        <div className="flex items-center gap-2">
          {!readOnly && (
            <button
              onClick={handleReset}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 hover:text-slate-400 transition px-2 py-1"
            >
              Reset
            </button>
          )}
          {isRunning ? (
            <button
              onClick={handleStop}
              className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-red-400"
            >
              {status === "loading" ? (
                <>
                  <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Stop
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleRun}
              className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400 px-4 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              ▶ Run
            </button>
          )}
        </div>
      </div>

      {/* CodeMirror editor */}
      <CodeMirrorEditor
        key={resetKey}
        initialCode={code}
        language="python"
        onChange={(v) => !readOnly && setCode(v)}
        readOnly={readOnly}
      />

      <div className="border-t border-slate-800/70">
        <div className="flex items-center gap-3 px-5 py-2 bg-slate-900/60 border-b border-slate-800/70">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            {readsInput ? "Program input" : "Input (optional)"}
          </span>
          {readsInput && (
            <span className="text-xs text-slate-600">one line per input() call</span>
          )}
        </div>
        <textarea
          value={stdin}
          onChange={(e) => !readOnly && setStdin(e.target.value)}
          disabled={readOnly || isRunning}
          placeholder={readsInput ? "One line per input() call" : "Optional stdin"}
          className="w-full min-h-16 resize-y bg-slate-950/50 px-5 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 disabled:opacity-60"
          style={{ fontFamily: "var(--font-mono), monospace" }}
          spellCheck={false}
        />
      </div>

      {/* Terminal */}
      {hasTerminalContent && (
        <div className="border-t border-slate-800/70">
          <div className="flex items-center gap-3 px-5 py-2 bg-slate-900/60 border-b border-slate-800/70">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Terminal</span>
            {status === "pass" && (
              <span className="text-xs font-semibold text-cyan-400">✓ Correct</span>
            )}
            {status === "fail" && expectedOutput !== undefined && (
              <span className="text-xs font-semibold text-red-400">✗ Not quite</span>
            )}
          </div>
          <div
            ref={termRef}
            className="px-5 py-4 text-sm max-h-64 overflow-y-auto"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            {termLines.map((line, i) => {
              if (line.type === "output") return <div key={i} className="text-emerald-400 whitespace-pre-wrap">{line.text}</div>;
              if (line.type === "error") return <div key={i} className="text-red-400 whitespace-pre-wrap">{line.text}</div>;
            })}
          </div>
        </div>
      )}

      {status === "pass" && expectedOutput !== undefined && (
        <div className="px-5 py-3 border-t border-slate-800/70 bg-cyan-400/5 text-cyan-300 text-xs font-semibold uppercase tracking-[0.2em]">
          🎉 Output matches — nicely done
        </div>
      )}
      {status === "fail" && expectedOutput !== undefined && (
        <div className="px-5 py-3 border-t border-slate-800/70 bg-slate-900/60 text-xs text-slate-500">
          Expected:{" "}
          <span className="text-slate-300" style={{ fontFamily: "var(--font-mono), monospace" }}>
            {expectedOutput}
          </span>
        </div>
      )}

      {caption && (
        <div className="px-5 py-2.5 border-t border-slate-800/70 bg-slate-900/60">
          <p className="text-xs text-slate-500 italic">{caption}</p>
        </div>
      )}
    </div>
  );
}
