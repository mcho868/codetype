"use client";

import { useEffect, useRef, useState } from "react";
import { usePyodide, type TerminalLine } from "@/lib/learn/usePyodide";

interface CodeEditorProps {
  initialCode: string;
  caption?: string;
  expectedOutput?: string;
  readOnly?: boolean;
}

export default function CodeEditor({
  initialCode,
  caption,
  expectedOutput,
  readOnly = false,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [termLines, setTermLines] = useState<TerminalLine[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "running" | "waiting" | "done" | "pass" | "fail">("idle");
  const [inputPrompt, setInputPrompt] = useState("");
  const [inputValue, setInputValue] = useState("");
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputAccRef = useRef<string[]>([]);
  const { runCode, submitInput } = usePyodide();

  const lineCount = code.split("\n").length;
  const isRunning = status === "loading" || status === "running" || status === "waiting";

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [termLines, status]);

  // Focus input when waiting
  useEffect(() => {
    if (status === "waiting") {
      inputRef.current?.focus();
    }
  }, [status]);

  async function handleRun() {
    setStatus("loading");
    setTermLines([]);
    setInputValue("");
    outputAccRef.current = [];

    const { error } = await runCode(
      code,
      (line) => {
        setStatus("running");
        if (line.type === "output") outputAccRef.current.push(line.text);
        setTermLines((prev) => [...prev, line]);
      },
      (prompt) => {
        setInputPrompt(prompt);
        setStatus("waiting");
      },
      () => {
        // onDone — status set below after error check
      }
    );

    if (error) {
      setTermLines((prev) => [...prev, { type: "error", text: error }]);
      setStatus("fail");
    } else if (expectedOutput !== undefined) {
      const allOutput = outputAccRef.current.join("\n");
      const clean = (s: string) => s.trim().replace(/\r\n/g, "\n");
      setStatus(clean(allOutput) === clean(expectedOutput) ? "pass" : "fail");
    } else {
      setStatus("done");
    }
  }

  function handleInputSubmit() {
    if (status !== "waiting") return;
    const val = inputValue;
    // Add the input line to terminal display
    setTermLines((prev) => [...prev, { type: "input", prompt: inputPrompt, value: val }]);
    setInputValue("");
    setInputPrompt("");
    setStatus("running");
    submitInput(val);
  }

  function handleReset() {
    setCode(initialCode);
    setTermLines([]);
    setStatus("idle");
    setInputValue("");
    setInputPrompt("");
  }

  const hasTerminalContent = termLines.length > 0 || status === "waiting";

  return (
    <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 overflow-hidden my-4 shadow-sm backdrop-blur">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-slate-800/70 bg-slate-900/60">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          python
        </span>
        <div className="flex items-center gap-2">
          {!readOnly && (
            <button
              onClick={handleReset}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 hover:text-slate-400 transition px-2 py-1"
            >
              Reset
            </button>
          )}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400 px-4 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
          >
            {status === "loading" ? (
              <>
                <span className="w-3 h-3 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                Loading Python...
              </>
            ) : status === "running" || status === "waiting" ? (
              <>
                <span className="w-3 h-3 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                Running...
              </>
            ) : (
              "▶ Run"
            )}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex bg-slate-950/70">
        <div className="select-none px-4 py-4 text-right text-slate-700 text-sm leading-6 min-w-[2.5rem]">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={(e) => !readOnly && setCode(e.target.value)}
          readOnly={readOnly}
          spellCheck={false}
          className="flex-1 py-4 pr-4 bg-transparent text-slate-100 text-sm leading-6 resize-none outline-none"
          style={{ height: `${Math.max(6, lineCount) * 1.5 + 2}rem`, fontFamily: "var(--font-mono), monospace" }}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              const el = e.currentTarget;
              const start = el.selectionStart;
              const end = el.selectionEnd;
              const next = code.substring(0, start) + "    " + code.substring(end);
              setCode(next);
              requestAnimationFrame(() => {
                el.selectionStart = el.selectionEnd = start + 4;
              });
            }
          }}
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

          {/* Terminal output lines */}
          <div
            ref={termRef}
            className="px-5 py-4 text-sm max-h-64 overflow-y-auto"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            {termLines.map((line, i) => {
              if (line.type === "output") {
                return <div key={i} className="text-emerald-400 whitespace-pre-wrap">{line.text}</div>;
              }
              if (line.type === "input") {
                return (
                  <div key={i} className="text-slate-300 whitespace-pre-wrap">
                    {line.prompt}<span className="text-cyan-300">{line.value}</span>
                  </div>
                );
              }
              if (line.type === "error") {
                return <div key={i} className="text-red-400 whitespace-pre-wrap">{line.text}</div>;
              }
            })}

            {/* Live input row */}
            {status === "waiting" && (
              <div className="flex items-center gap-0 text-slate-300">
                <span className="whitespace-pre">{inputPrompt}</span>
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleInputSubmit();
                    }
                  }}
                  className="flex-1 bg-transparent text-cyan-300 outline-none caret-cyan-400 min-w-0"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            )}
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
