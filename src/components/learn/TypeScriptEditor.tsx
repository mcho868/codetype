"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const CodeMirrorEditor = dynamic(() => import("./CodeMirrorEditor"), { ssr: false });

interface TypeScriptEditorProps {
  initialCode: string;
  caption?: string;
  expectedOutput?: string;
}

type Status = "idle" | "running" | "done" | "pass" | "fail";

const FONT = "var(--font-mono), monospace";

export default function TypeScriptEditor({ initialCode, caption, expectedOutput }: TypeScriptEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [resetKey, setResetKey] = useState(0);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const termRef = useRef<HTMLDivElement>(null);

  const isRunning = status === "running";

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [output, error, status]);

  async function handleRun() {
    setStatus("running");
    setOutput("");
    setError("");

    try {
      const res = await fetch("/api/run-typescript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setOutput(data.output ?? "");
      setError(data.error ?? "");

      if (data.error) {
        setStatus("fail");
      } else if (expectedOutput !== undefined) {
        const clean = (s: string) => s.trim().replace(/\r\n/g, "\n");
        setStatus(clean(data.output) === clean(expectedOutput) ? "pass" : "fail");
      } else {
        setStatus("done");
      }
    } catch {
      setError("Failed to reach the TypeScript runner. Is the dev server running?");
      setStatus("fail");
    }
  }

  function handleReset() {
    setCode(initialCode);
    setResetKey((k) => k + 1);
    setOutput("");
    setError("");
    setStatus("idle");
  }

  const hasOutput = output || error || status === "running";

  return (
    <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 overflow-hidden my-4 shadow-sm backdrop-blur">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-slate-800/70 bg-slate-900/60">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">typescript</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 hover:text-slate-400 transition px-2 py-1"
          >
            Reset
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-400 px-4 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-blue-300 disabled:opacity-50"
          >
            {isRunning ? (
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

      {/* CodeMirror editor */}
      <CodeMirrorEditor
        key={resetKey}
        initialCode={code}
        language="typescript"
        onChange={setCode}
      />

      {/* Output */}
      {hasOutput && (
        <div className="border-t border-slate-800/70">
          <div className="flex items-center gap-3 px-5 py-2 bg-slate-900/60 border-b border-slate-800/70">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Output</span>
            {status === "pass" && (
              <span className="text-xs font-semibold text-blue-400">✓ Correct</span>
            )}
            {status === "fail" && expectedOutput !== undefined && !error && (
              <span className="text-xs font-semibold text-red-400">✗ Not quite</span>
            )}
          </div>
          <div
            ref={termRef}
            className="px-5 py-4 text-sm max-h-64 overflow-y-auto"
            style={{ fontFamily: FONT }}
          >
            {status === "running" && !output && !error && (
              <span className="text-slate-500">Running...</span>
            )}
            {output && <pre className="text-emerald-400 whitespace-pre-wrap">{output}</pre>}
            {error && <pre className="text-red-400 whitespace-pre-wrap">{error}</pre>}
          </div>
        </div>
      )}

      {status === "pass" && expectedOutput !== undefined && (
        <div className="px-5 py-3 border-t border-slate-800/70 bg-blue-400/5 text-blue-300 text-xs font-semibold uppercase tracking-[0.2em]">
          🎉 Output matches — nicely done
        </div>
      )}
      {status === "fail" && expectedOutput !== undefined && !error && (
        <div className="px-5 py-3 border-t border-slate-800/70 bg-slate-900/60 text-xs text-slate-500">
          Expected:{" "}
          <span className="text-slate-300" style={{ fontFamily: FONT }}>
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
