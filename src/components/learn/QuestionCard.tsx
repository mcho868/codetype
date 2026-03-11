"use client";

import { useState } from "react";
import { Question } from "@/lib/learn/courseData";
import { QuestionAnswer } from "@/lib/learn/progress";
import { usePyodide } from "@/lib/learn/usePyodide";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  onAnswerSubmit: (answer: QuestionAnswer) => void;
  previousAnswer?: QuestionAnswer;
}

const TYPE_LABELS: Record<string, string> = {
  "multiple-choice": "Multiple Choice",
  "fill-in-blank": "Fill in the Blank",
  "true-false": "True / False",
  "code-challenge": "Code Challenge",
};

export default function QuestionCard({
  question,
  onAnswerSubmit,
  previousAnswer,
}: QuestionCardProps) {
  const [selected, setSelected] = useState(previousAnswer?.selectedAnswer ?? "");
  const [submitted, setSubmitted] = useState(!!previousAnswer);
  const [code, setCode] = useState(question.starterCode ?? "");
  const [codeOutput, setCodeOutput] = useState("");
  const [codeError, setCodeError] = useState("");
  const [patternError, setPatternError] = useState("");
  const [runStatus, setRunStatus] = useState<"idle" | "loading" | "pass" | "fail">("idle");
  const { runCodeSimple } = usePyodide();

  const isCorrect = submitted
    ? previousAnswer?.isCorrect ??
      (question.type === "code-challenge"
        ? runStatus === "pass"
        : selected.toLowerCase() === question.correctAnswer.toLowerCase())
    : false;

  function handleSubmit() {
    if (submitted || (question.type !== "code-challenge" && !selected)) return;
    const correct = selected.toLowerCase() === question.correctAnswer.toLowerCase();
    setSubmitted(true);
    onAnswerSubmit({ selectedAnswer: selected, isCorrect: correct });
  }

  async function handleRunCode() {
    if (submitted) return;
    setRunStatus("loading");
    setCodeOutput("");
    setCodeError("");
    setPatternError("");

    // Check required patterns before running
    if (question.requiredPatterns) {
      for (const { pattern, hint } of question.requiredPatterns) {
        if (!new RegExp(pattern).test(code)) {
          setPatternError(hint);
          setRunStatus("fail");
          return;
        }
      }
    }

    const result = await runCodeSimple(code);
    setCodeOutput(result.output);
    setCodeError(result.error);
    if (result.error) {
      setRunStatus("fail");
      return;
    }
    const clean = (s: string) => s.trim().replace(/\r\n/g, "\n");
    const passed =
      question.expectedOutput !== undefined
        ? clean(result.output) === clean(question.expectedOutput)
        : true;
    setRunStatus(passed ? "pass" : "fail");
    if (passed) {
      setSubmitted(true);
      onAnswerSubmit({ selectedAnswer: "__code__", isCorrect: true });
    }
  }

  function renderPrompt() {
    return question.prompt.split("\n").map((line, i) => (
      <p
        key={i}
        className={cn(
          "leading-relaxed",
          line.startsWith("    ")
            ? "font-mono text-sm text-cyan-300 bg-slate-900 px-3 py-0.5 rounded-lg my-0.5"
            : "text-slate-200"
        )}
        style={line.startsWith("    ") ? { fontFamily: "var(--font-mono), monospace" } : {}}
      >
        {line}
      </p>
    ));
  }

  const lineCount = code.split("\n").length;

  return (
    <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 overflow-hidden shadow-sm backdrop-blur">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-800/70">
        <div className="mb-3">
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.3em] px-3 py-1 rounded-full",
              question.type === "code-challenge"
                ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                : "bg-slate-800 text-slate-400"
            )}
          >
            {TYPE_LABELS[question.type] ?? question.type}
          </span>
        </div>
        <div className="space-y-1.5">{renderPrompt()}</div>
      </div>

      {/* Answer area */}
      <div className="px-6 py-5 space-y-3">
        {/* Multiple choice */}
        {question.type === "multiple-choice" && question.choices && (
          <div className="space-y-2">
            {question.choices.map((choice) => {
              let cls =
                "w-full text-left px-4 py-3 rounded-2xl border text-sm transition ";
              if (!submitted) {
                cls +=
                  selected === choice.id
                    ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                    : "border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50";
              } else {
                if (choice.id === question.correctAnswer) {
                  cls += "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
                } else if (choice.id === selected && !isCorrect) {
                  cls += "border-red-500/50 bg-red-500/10 text-red-300";
                } else {
                  cls += "border-slate-800/50 text-slate-600";
                }
              }
              return (
                <button
                  key={choice.id}
                  className={cls}
                  onClick={() => !submitted && setSelected(choice.id)}
                  disabled={submitted}
                >
                  <span className="font-semibold mr-2 uppercase tracking-wider">{choice.id}.</span>
                  {choice.text}
                </button>
              );
            })}
          </div>
        )}

        {/* Fill in blank */}
        {question.type === "fill-in-blank" && (
          <input
            type="text"
            value={selected}
            onChange={(e) => !submitted && setSelected(e.target.value)}
            disabled={submitted}
            placeholder="Type your answer..."
            className={cn(
              "w-full px-4 py-3 rounded-2xl border bg-slate-950/50 text-sm outline-none transition",
              !submitted
                ? "border-slate-800 focus:border-cyan-400/50 text-slate-100 placeholder:text-slate-600"
                : isCorrect
                ? "border-emerald-500/50 text-emerald-300"
                : "border-red-500/50 text-red-300"
            )}
            style={{ fontFamily: "var(--font-mono), monospace" }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        )}

        {/* True / False */}
        {question.type === "true-false" && (
          <div className="flex gap-3">
            {["true", "false"].map((opt) => {
              let cls = "flex-1 py-3 rounded-2xl border text-sm font-semibold uppercase tracking-[0.2em] transition ";
              if (!submitted) {
                cls +=
                  selected === opt
                    ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                    : "border-slate-800 text-slate-400 hover:border-slate-600";
              } else {
                if (opt === question.correctAnswer) {
                  cls += "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
                } else if (opt === selected && !isCorrect) {
                  cls += "border-red-500/50 bg-red-500/10 text-red-300";
                } else {
                  cls += "border-slate-800/50 text-slate-600";
                }
              }
              return (
                <button
                  key={opt}
                  className={cls}
                  onClick={() => !submitted && setSelected(opt)}
                  disabled={submitted}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Code challenge */}
        {question.type === "code-challenge" && (
          <div className="rounded-2xl border border-slate-800/70 overflow-hidden bg-slate-950/70">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/70">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">python</span>
              <button
                onClick={handleRunCode}
                disabled={submitted || runStatus === "loading"}
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400 px-4 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
              >
                {runStatus === "loading" ? (
                  <>
                    <span className="w-3 h-3 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                    Loading...
                  </>
                ) : "▶ Run & Check"}
              </button>
            </div>
            <div className="flex">
              <div
                className="select-none px-3 py-4 text-right text-slate-700 text-sm leading-6 min-w-[2.5rem]"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => !submitted && setCode(e.target.value)}
                readOnly={submitted}
                spellCheck={false}
                className="flex-1 py-4 pr-4 bg-transparent text-slate-100 text-sm leading-6 resize-none outline-none"
                style={{
                  height: `${Math.max(6, lineCount) * 1.5 + 2}rem`,
                  fontFamily: "var(--font-mono), monospace",
                }}
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
            {patternError && (
              <div className="border-t border-slate-800/70 px-4 py-3 bg-amber-500/5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-1">Hint</p>
                <p className="text-sm text-amber-300">{patternError}</p>
              </div>
            )}
            {(codeOutput || codeError) && (
              <div className="border-t border-slate-800/70">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 border-b border-slate-800/70">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Output</span>
                  {runStatus === "pass" && (
                    <span className="text-xs font-semibold text-cyan-400">✓ Correct</span>
                  )}
                  {runStatus === "fail" && !codeError && (
                    <span className="text-xs font-semibold text-red-400">✗ Doesn&apos;t match</span>
                  )}
                </div>
                <div className="px-4 py-3 text-sm" style={{ fontFamily: "var(--font-mono), monospace" }}>
                  {codeOutput && <pre className="text-emerald-400 whitespace-pre-wrap">{codeOutput}</pre>}
                  {codeError && <pre className="text-red-400 whitespace-pre-wrap">{codeError}</pre>}
                </div>
              </div>
            )}
            {runStatus === "fail" && !codeError && question.expectedOutput && (
              <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/70 text-xs text-slate-500">
                Expected:{" "}
                <span className="text-slate-300" style={{ fontFamily: "var(--font-mono), monospace" }}>
                  {question.expectedOutput}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Submit for non-code */}
        {question.type !== "code-challenge" && !submitted && (
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="mt-1 w-full rounded-full bg-cyan-400 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-30"
          >
            Check Answer
          </button>
        )}

        {/* Explanation */}
        {submitted && (
          <div
            className={cn(
              "mt-1 px-4 py-4 rounded-2xl border text-sm",
              isCorrect
                ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
                : "border-red-500/30 bg-red-500/5 text-red-300"
            )}
          >
            <p className="font-semibold uppercase tracking-[0.2em] text-xs mb-2">
              {isCorrect ? "✓ Correct" : "✗ Incorrect"}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
