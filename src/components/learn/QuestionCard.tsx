"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import { Question } from "@/lib/learn/courseData";
import { QuestionAnswer } from "@/lib/learn/progress";
import { usePyodide } from "@/lib/learn/usePyodide";
import { cn } from "@/lib/utils";

const CodeMirrorEditor = dynamic(() => import("./CodeMirrorEditor"), { ssr: false });

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

const FONT = "var(--font-mono), monospace";

export default function QuestionCard({
  question,
  onAnswerSubmit,
  previousAnswer,
}: QuestionCardProps) {
  const isCodeChallenge = question.type === "code-challenge";
  const draftKey = `code-draft:${question.id}`;

  // Priority: submitted code from Supabase > localStorage draft > starter code
  const savedCode = isCodeChallenge && previousAnswer?.selectedAnswer && previousAnswer.selectedAnswer !== "__code__"
    ? previousAnswer.selectedAnswer
    : null;
  const draftCode = isCodeChallenge && !savedCode && typeof window !== "undefined"
    ? (localStorage.getItem(draftKey) ?? null)
    : null;

  const [selected, setSelected] = useState(previousAnswer?.selectedAnswer ?? "");
  const [submitted, setSubmitted] = useState(!!previousAnswer);
  const [code, setCode] = useState(savedCode ?? draftCode ?? question.starterCode ?? "");

  // Persist draft to localStorage while typing (only when not yet submitted)
  const handleCodeChange = useCallback((v: string) => {
    if (!submitted) {
      setCode(v);
      localStorage.setItem(draftKey, v);
    }
  }, [submitted, draftKey]);
  const [codeOutput, setCodeOutput] = useState("");
  const [codeError, setCodeError] = useState("");
  const [patternError, setPatternError] = useState("");
  const [runStatus, setRunStatus] = useState<"idle" | "loading" | "pass" | "fail">("idle");
  const { runCodeSimple, terminateWorker } = usePyodide();

  const isJava = question.language === "java";
  const lang = isJava ? "java" : "python";

  const normalise = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '');

  const isCorrect = submitted
    ? previousAnswer?.isCorrect ??
      (question.type === "code-challenge"
        ? runStatus === "pass"
        : normalise(selected) === normalise(question.correctAnswer))
    : false;

  function handleSubmit() {
    if (submitted || (question.type !== "code-challenge" && !selected)) return;
    const correct = normalise(selected) === normalise(question.correctAnswer);
    setSubmitted(true);
    onAnswerSubmit({ selectedAnswer: selected, isCorrect: correct });
  }

  async function handleRunCode() {
    if (submitted) return;
    setRunStatus("loading");
    setCodeOutput("");
    setCodeError("");
    setPatternError("");

    if (question.requiredPatterns) {
      for (const { pattern, hint } of question.requiredPatterns) {
        if (!new RegExp(pattern).test(code)) {
          setPatternError(hint);
          setRunStatus("fail");
          return;
        }
      }
    }

    let output = "";
    let error = "";

    if (isJava) {
      try {
        const res = await fetch("/api/run-java", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        const data = await res.json();
        output = data.output ?? "";
        error = data.error ?? "";
      } catch {
        error = "Failed to reach the Java runner.";
      }
    } else {
      const result = await runCodeSimple(code);
      output = result.output;
      error = result.error;
    }

    setCodeOutput(output);
    setCodeError(error);

    if (error) {
      setRunStatus("fail");
      return;
    }

    const clean = (s: string) => s.trim().replace(/\r\n/g, "\n");
    const passed =
      question.expectedOutput !== undefined
        ? clean(output) === clean(question.expectedOutput)
        : true;
    setRunStatus(passed ? "pass" : "fail");
    if (passed) {
      setSubmitted(true);
      localStorage.removeItem(draftKey);
      onAnswerSubmit({ selectedAnswer: code, isCorrect: true });
    }
  }

  const accentClass = isJava ? "bg-orange-400 hover:bg-orange-300" : "bg-cyan-400 hover:bg-cyan-300";
  const correctColor = isJava ? "text-orange-400" : "text-cyan-400";

  return (
    <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 overflow-hidden shadow-sm backdrop-blur">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-800/70">
        <div className="mb-3">
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.3em] px-3 py-1 rounded-full",
              question.type === "code-challenge"
                ? isJava
                  ? "bg-orange-400/10 text-orange-400 border border-orange-400/20"
                  : "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                : "bg-slate-800 text-slate-400"
            )}
          >
            {TYPE_LABELS[question.type] ?? question.type}
          </span>
        </div>
        <div className="space-y-2">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="text-slate-200 leading-relaxed">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="text-white font-semibold">{children}</strong>
              ),
              code: ({ children, className }) => {
                const isBlock = !!className;
                return isBlock ? (
                  <code className="block text-cyan-300 text-sm" style={{ fontFamily: FONT }}>{children}</code>
                ) : (
                  <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded text-sm" style={{ fontFamily: FONT }}>{children}</code>
                );
              },
              pre: ({ children }) => (
                <pre className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-cyan-300 overflow-x-auto my-2" style={{ fontFamily: FONT }}>{children}</pre>
              ),
            }}
          >
            {question.prompt}
          </ReactMarkdown>
        </div>
      </div>

      {/* Answer area */}
      <div className="px-6 py-5 space-y-3">
        {/* Multiple choice */}
        {question.type === "multiple-choice" && question.choices && (
          <div className="space-y-2">
            {question.choices.map((choice) => {
              let cls = "w-full text-left px-4 py-3 rounded-2xl border text-sm transition ";
              if (!submitted) {
                cls += selected === choice.id
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
            style={{ fontFamily: FONT }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        )}

        {/* True / False */}
        {question.type === "true-false" && (
          <div className="flex gap-3">
            {["true", "false"].map((opt) => {
              let cls = "flex-1 py-3 rounded-2xl border text-sm font-semibold uppercase tracking-[0.2em] transition ";
              if (!submitted) {
                cls += selected === opt
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
                <button key={opt} className={cls} onClick={() => !submitted && setSelected(opt)} disabled={submitted}>
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Code challenge */}
        {question.type === "code-challenge" && (
          <div className="rounded-2xl border border-slate-800/70 overflow-hidden bg-slate-950/70">
            {/* Editor top bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/70">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{lang}</span>
              {runStatus === "loading" ? (
                <button
                  onClick={() => {
                    terminateWorker();
                    setCodeError("Execution stopped by user.");
                    setRunStatus("fail");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-red-400"
                >
                  <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Stop
                </button>
              ) : (
                <button
                  onClick={handleRunCode}
                  disabled={submitted}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-950 transition disabled:opacity-50",
                    accentClass
                  )}
                >
                  ▶ Run & Check
                </button>
              )}
            </div>

            {/* CodeMirror editor */}
            <CodeMirrorEditor
              initialCode={code}
              language={lang}
              onChange={handleCodeChange}
              readOnly={submitted}
            />

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
                    <span className={cn("text-xs font-semibold", correctColor)}>✓ Correct</span>
                  )}
                  {runStatus === "fail" && !codeError && (
                    <span className="text-xs font-semibold text-red-400">✗ Doesn&apos;t match</span>
                  )}
                </div>
                <div className="px-4 py-3 text-sm" style={{ fontFamily: FONT }}>
                  {codeOutput && <pre className="text-emerald-400 whitespace-pre-wrap">{codeOutput}</pre>}
                  {codeError && <pre className="text-red-400 whitespace-pre-wrap">{codeError}</pre>}
                </div>
              </div>
            )}
            {runStatus === "fail" && !codeError && question.expectedOutput && (
              <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/70 text-xs text-slate-500">
                Expected:{" "}
                <span className="text-slate-300" style={{ fontFamily: FONT }}>
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
