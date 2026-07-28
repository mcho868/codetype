"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Question, TestCase } from "@/lib/learn/courseData";
import { QuestionAnswer } from "@/lib/learn/progress";
import { usePyodide, type TerminalLine } from "@/lib/learn/usePyodide";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { cn } from "@/lib/utils";
import LearnMarkdown from "./LearnMarkdown";

/**
 * Extract the model-solution code embedded in a question's explanation.
 * Convention: explanations start with "Model solution:\n<code>" and the code
 * ends at the first "\n\nWhy:" (or the end of the string if there's no "Why:").
 * Returns null when no model solution is present.
 */
function extractModelSolution(explanation: string): string | null {
  const afterLabel = explanation.split("Model solution:")[1];
  if (afterLabel === undefined) return null;
  const code = afterLabel.split("\n\nWhy:")[0].replace(/^\n+/, "").trimEnd();
  return code.length > 0 ? code : null;
}

/**
 * Extract a top-level `def <name>(...):` block (header + indented body) from
 * source. Used to recover a test "driver" function from the starter code.
 * Returns null if not found.
 */
function extractTopLevelDef(source: string, name: string): string | null {
  const lines = source.split("\n");
  const headerRe = new RegExp(`^def\\s+${name}\\s*\\(`);
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (headerRe.test(lines[i])) {
      start = i;
      break;
    }
  }
  if (start === -1) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    // A non-blank, non-indented line ends the def block.
    if (line.trim() !== "" && !/^\s/.test(line)) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join("\n").trimEnd();
}

/**
 * Build the code to load when an admin clicks "Model solution". Driver-based
 * questions keep a test harness function (e.g. run_account, check_*) in the
 * STARTER that the grader calls but the model solution omits. If the graded
 * funcName is such a driver and the model solution doesn't define it, append
 * the driver from the starter so the loaded solution actually passes.
 */
function buildModelSolutionCode(
  modelSolution: string,
  starterCode: string | undefined,
  funcName: string | undefined
): string {
  if (!funcName || !starterCode) return modelSolution;
  if (new RegExp(`def\\s+${funcName}\\s*\\(`).test(modelSolution)) {
    return modelSolution; // model already defines the driver
  }
  const driver = extractTopLevelDef(starterCode, funcName);
  if (!driver) return modelSolution;
  return `${modelSolution.trimEnd()}\n\n\n${driver}\n`;
}

const CodeMirrorEditor = dynamic(() => import("./CodeMirrorEditor"), { ssr: false });

interface CaseResult {
  caseId: string;
  passed: boolean;
  expected?: unknown;
  actual?: unknown;
  error?: string;
}

interface DisplayRow {
  caseId: string;
  description: string;
  hidden: boolean;
  passed: boolean;
  expected: unknown;
  actual?: unknown;
  error?: string;
  inputLabel?: string;
}

interface CodeRunnerCardProps {
  question: Question;
  onAnswerSubmit: (answer: QuestionAnswer) => void;
  previousAnswer?: QuestionAnswer;
  examMode?: boolean;
  examLocked?: boolean;
  /** Attempt number — scopes the local draft so a new attempt starts fresh */
  attemptNumber?: number | null;
}

const FONT = "var(--font-mono), monospace";

function getRunnerLanguage(question: Question): NonNullable<Question["language"]> {
  return question.language ?? "python";
}

function getRunnerAccentClass(language: NonNullable<Question["language"]>): string {
  switch (language) {
    case "java":
      return "bg-orange-400 hover:bg-orange-300";
    case "sql":
      return "bg-teal-400 hover:bg-teal-300";
    case "typescript":
      return "bg-blue-400 hover:bg-blue-300";
    default:
      return "bg-cyan-400 hover:bg-cyan-300";
  }
}

function getRunnerButtonClass(language: NonNullable<Question["language"]>): string {
  switch (language) {
    case "java":
      return "text-orange-300 hover:border-orange-500/60 hover:text-orange-200";
    case "sql":
      return "text-teal-300 hover:border-teal-500/60 hover:text-teal-200";
    case "typescript":
      return "text-blue-300 hover:border-blue-500/60 hover:text-blue-200";
    default:
      return "text-cyan-300 hover:border-cyan-500/60 hover:text-cyan-200";
  }
}

function cleanStdout(s: string): string {
  return s
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .join("\n")
    .toLowerCase();
}

function formatValue(v: unknown): string {
  if (v === undefined || v === null) return String(v);
  if (typeof v === "string") return v;
  return JSON.stringify(v);
}

function expectedForCase(tc: TestCase, gradeMode: string): unknown {
  return gradeMode === "function" ? tc.expectedReturn : tc.expectedStdout;
}

function inputLabelForCase(tc: TestCase, gradeMode: string): string | undefined {
  if (gradeMode === "function" && tc.args !== undefined) {
    return `${tc.funcName ?? "fn"}(${tc.args.map((a) => JSON.stringify(a)).join(", ")})`;
  }
  if (gradeMode === "stdout" && tc.stdin !== undefined && tc.stdin !== "") {
    return `stdin: ${JSON.stringify(tc.stdin)}`;
  }
  return undefined;
}

function buildDisplayRows(
  testCases: TestCase[],
  serverResults: CaseResult[] | null,
  gradeMode: string,
  afterSubmit: boolean
): DisplayRow[] {
  if (!afterSubmit || !serverResults) return [];

  return testCases.map((tc) => {
    const server = serverResults.find((r) => r.caseId === tc.id);
    const expected = expectedForCase(tc, gradeMode);
    return {
      caseId: tc.id,
      description: tc.description ?? (tc.hidden ? "Hidden test" : `Case ${tc.id}`),
      hidden: !!tc.hidden,
      passed: server?.passed ?? false,
      expected,
      actual: server?.actual,
      error: server?.error,
      inputLabel: inputLabelForCase(tc, gradeMode),
    };
  });
}

function buildVisibleRunRows(
  visibleCases: TestCase[],
  localResults: CaseResult[],
  gradeMode: string
): DisplayRow[] {
  return visibleCases.map((tc) => {
    const result = localResults.find((r) => r.caseId === tc.id);
    return {
      caseId: tc.id,
      description: tc.description ?? `Case ${tc.id}`,
      hidden: false,
      passed: result?.passed ?? false,
      expected: result?.expected ?? expectedForCase(tc, gradeMode),
      actual: result?.actual,
      error: result?.error,
      inputLabel: inputLabelForCase(tc, gradeMode),
    };
  });
}

export default function CodeRunnerCard({
  question,
  onAnswerSubmit,
  previousAnswer,
  examMode = false,
  examLocked = false,
  attemptNumber,
}: CodeRunnerCardProps) {
  // Scope the draft per attempt so starting a new quiz/test attempt does not
  // restore code typed (or a model solution loaded) during a previous attempt.
  const draftKey =
    attemptNumber != null
      ? `code-draft:${question.id}:attempt-${attemptNumber}`
      : `code-draft:${question.id}`;
  const testCases = question.testCases ?? [];
  const gradeMode = question.gradeMode ?? "stdout";
  const language = getRunnerLanguage(question);
  const visibleCases = testCases.filter((tc) => !tc.hidden);
  const interactiveRun = language === "python" && gradeMode === "stdout";
  const accentClass = getRunnerAccentClass(language);
  const actionButtonClass = getRunnerButtonClass(language);

  const { user } = useLearnAuth();
  const isAdmin = user?.role === "admin";
  const modelSolution = isAdmin ? extractModelSolution(question.explanation) : null;

  // If this question reads a file, offer the visible sample file as a download so
  // students can see/open the exact data their code will read in the sample run.
  const sampleFileCase = testCases.find(
    (tc) => !tc.hidden && tc.fileContent !== undefined && tc.fileContent !== null
  );
  const downloadFileName = sampleFileCase?.fileName ?? "input.txt";

  const [code, setCode] = useState(() => {
    if (previousAnswer?.selectedAnswer && previousAnswer.selectedAnswer !== "__code__") {
      return previousAnswer.selectedAnswer;
    }
    if (typeof window !== "undefined") {
      return localStorage.getItem(draftKey) ?? question.starterCode ?? "";
    }
    return question.starterCode ?? "";
  });
  const [testRunLoading, setTestRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [localResults, setLocalResults] = useState<CaseResult[] | null>(null);
  const [serverResults, setServerResults] = useState<CaseResult[] | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [allPassed, setAllPassed] = useState(previousAnswer?.isCorrect ?? false);
  const [codeRevision, setCodeRevision] = useState(0);

  // Interactive terminal — same pattern as CodeEditor (course runner)
  const [termLines, setTermLines] = useState<TerminalLine[]>([]);
  const [runStatus, setRunStatus] = useState<
    "idle" | "loading" | "running" | "waiting" | "done"
  >("idle");
  const [inputPrompt, setInputPrompt] = useState("");
  const [inputValue, setInputValue] = useState("");
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastSubmittedRef = useRef<{ questionId: string; code: string } | null>(null);

  const { runCode, runCodeSimple, submitInput, terminateWorker } = usePyodide();

  const isInteractiveRunning =
    runStatus === "loading" || runStatus === "running" || runStatus === "waiting";
  const runLoading = interactiveRun ? isInteractiveRunning : testRunLoading;
  const hasTerminalContent = termLines.length > 0 || runStatus === "waiting";

  const showRunResults = !examMode && localResults !== null;
  const showSubmitResults = !examMode && serverResults !== null;

  useEffect(() => {
    const previousSelected =
      previousAnswer?.selectedAnswer && previousAnswer.selectedAnswer !== "__code__"
        ? previousAnswer.selectedAnswer
        : null;
    const lastSubmitted = lastSubmittedRef.current;

    if (
      !examMode &&
      previousSelected &&
      lastSubmitted?.questionId === question.id &&
      lastSubmitted.code === previousSelected
    ) {
      setRestoreLoading(false);
      return;
    }

    const saved =
      previousSelected
        ? previousSelected
        : typeof window !== "undefined"
        ? localStorage.getItem(draftKey)
        : null;

    setCode(saved ?? question.starterCode ?? "");
    setCodeRevision((r) => r + 1);
    setLocalResults(null);
    setSubmitError("");
    setServerResults(null);
    setTermLines([]);
    setRunStatus("idle");
    setInputValue("");
    setInputPrompt("");

    if (examMode) {
      setAllPassed(false);
      return;
    }

    if (!previousAnswer?.selectedAnswer || previousAnswer.selectedAnswer === "__code__") {
      setAllPassed(false);
      return;
    }

    setAllPassed(previousAnswer.isCorrect);
    setRestoreLoading(true);

    gradeCodeRunnerQuestion(question, previousAnswer.selectedAnswer)
      .then((results) => {
        setServerResults(results.results);
        // Trust the originally-graded, persisted result for correctness — this
        // re-run is only to repopulate the per-case display table. Re-executing
        // in a fresh Pyodide worker on every reload is inherently a bit flaky
        // (timing, shared worker state), so it must never downgrade a stored
        // "correct" to "incorrect".
        setAllPassed(previousAnswer.isCorrect);
      })
      .catch(() => {
        setSubmitError("Could not reload test results.");
      })
      .finally(() => {
        setRestoreLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id, previousAnswer?.selectedAnswer, examMode]);

  useEffect(() => {
    if (runStatus === "waiting") inputRef.current?.focus();
  }, [runStatus]);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [termLines, runStatus]);

  const handleCodeChange = useCallback(
    (v: string) => {
      if (!examLocked) {
        setCode(v);
        localStorage.setItem(draftKey, v);
      }
    },
    [examLocked, draftKey]
  );

  async function runTestCasesLocally(
    cases: TestCase[],
    submittedCode: string
  ): Promise<CaseResult[]> {
    if (language !== "python") {
      throw new Error(`Local execution is not supported for ${language}.`);
    }

    const results: CaseResult[] = [];

    const filePreamble = (tc: TestCase): string => {
      if (tc.fileContent === undefined || tc.fileContent === null) return "";
      const name = tc.fileName ?? "input.txt";
      return `with open(${JSON.stringify(name)}, "w") as __f:\n    __f.write(${JSON.stringify(tc.fileContent)})\n`;
    };

    const stdoutPreamble = (tc: TestCase): string => {
      const stdin = tc.stdin ?? "";
      return `import builtins as __builtins\n__inputs = iter(${JSON.stringify(stdin.split(/\r?\n/))})\n__builtins.input = lambda prompt="": next(__inputs, "")\n`;
    };

    for (const tc of cases) {
      try {
        if (gradeMode === "function" && tc.funcName) {
          // Decode args via json.loads inside Python rather than inlining raw
          // JSON as Python source — JSON `false`/`true`/`null` are not valid
          // Python literals (they'd raise NameError). This matches the backend.
          const argsJson = JSON.stringify(tc.args ?? []);
          const wrapped = `${filePreamble(tc)}${submittedCode}\n\n__args = __import__("json").loads(${JSON.stringify(argsJson)})\n__result = ${tc.funcName}(*__args)`;
          const { output, error } = await runCodeSimple(
            `${wrapped}\nprint(__import__("json").dumps(__result))`
          );
          if (error) {
            results.push({ caseId: tc.id, passed: false, error });
            continue;
          }
          const line = output.trim().split("\n").pop() ?? "null";
          let actual: unknown;
          try {
            actual = JSON.parse(line);
          } catch {
            actual = line;
          }
          const passed = JSON.stringify(actual) === JSON.stringify(tc.expectedReturn);
          results.push({
            caseId: tc.id,
            passed,
            expected: tc.expectedReturn,
            actual,
          });
        } else {
          const wrapped = `${stdoutPreamble(tc)}${filePreamble(tc)}${submittedCode}`;
          const { output, error } = await runCodeSimple(wrapped);
          if (error) {
            results.push({ caseId: tc.id, passed: false, error });
            continue;
          }
          const passed = cleanStdout(output) === cleanStdout(tc.expectedStdout ?? "");
          results.push({
            caseId: tc.id,
            passed,
            expected: tc.expectedStdout,
            actual: output,
          });
        }
      } catch (err) {
        results.push({
          caseId: tc.id,
          passed: false,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    return results;
  }

  async function handleInteractiveRun() {
    if (examLocked) return;
    setRunStatus("loading");
    setTermLines([]);
    setInputValue("");
    setLocalResults(null);
    setServerResults(null);
    setSubmitError("");

    const { error } = await runCode(
      code,
      (line) => {
        setRunStatus("running");
        setTermLines((prev) => [...prev, line]);
      },
      (prompt) => {
        setInputPrompt(prompt);
        setRunStatus("waiting");
      },
      () => {}
    );

    if (error) {
      setRunStatus("done");
    } else {
      setRunStatus("done");
    }
  }

  function handleInputSubmit() {
    if (runStatus !== "waiting") return;
    const val = inputValue;
    setTermLines((prev) => [...prev, { type: "input", prompt: inputPrompt, value: val }]);
    setInputValue("");
    setInputPrompt("");
    setRunStatus("running");
    submitInput(val);
  }

  function handleStopRun() {
    terminateWorker();
    setTermLines((prev) => [...prev, { type: "error", text: "Execution stopped by user." }]);
    setRunStatus("done");
    setTestRunLoading(false);
  }

  async function runVisibleCases() {
    if (examLocked || visibleCases.length === 0) return;
    setTestRunLoading(true);
    setLocalResults(null);
    setServerResults(null);
    setSubmitError("");

    try {
      if (language === "python") {
        const results = await runTestCasesLocally(visibleCases, code);
        setLocalResults(results);
        return;
      }

      const data = await gradeCodeRunnerQuestion(question, code, visibleCases);
      setLocalResults(data.results);
    } catch {
      setSubmitError(`Failed to run the ${language} test cases.`);
    } finally {
      setTestRunLoading(false);
    }
  }

  function handleRunClick() {
    if (interactiveRun) {
      void handleInteractiveRun();
    } else {
      void runVisibleCases();
    }
  }

  // Admin-only: drop the model solution into the editor so it can be run/submitted.
  // For driver-based questions, re-attach the harness function from the starter
  // (the model solution omits it) so the loaded code actually passes the tests.
  function loadModelSolution() {
    if (!modelSolution) return;
    const driverFn = testCases.find((tc) => tc.funcName)?.funcName;
    const full = buildModelSolutionCode(modelSolution, question.starterCode, driverFn);
    setCode(full);
    localStorage.setItem(draftKey, full);
    setCodeRevision((r) => r + 1);
  }

  function downloadSampleFile() {
    if (!sampleFileCase) return;
    const blob = new Blob([sampleFileCase.fileContent ?? ""], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function resetToStarter() {
    if (examLocked) return;
    const starter = question.starterCode ?? "";
    setCode(starter);
    localStorage.removeItem(draftKey);
    setCodeRevision((r) => r + 1);
    setLocalResults(null);
    setServerResults(null);
    setSubmitError("");
    setAllPassed(false);
    setTermLines([]);
    setRunStatus("idle");
    setInputValue("");
    setInputPrompt("");
    lastSubmittedRef.current = null;
  }

  async function submitToServer() {
    if (examLocked) return;
    setSubmitLoading(true);
    setSubmitError("");
    setLocalResults(null);

    try {
      const data = await gradeCodeRunnerQuestion(question, code);
      setServerResults(data.results);
      setAllPassed(data.allPassed);
      lastSubmittedRef.current = { questionId: question.id, code };
      onAnswerSubmit({ selectedAnswer: code, isCorrect: data.allPassed });
    } catch {
      setSubmitError(`Failed to reach the ${language} test runner.`);
    } finally {
      setSubmitLoading(false);
    }
  }

  const displayRows = showSubmitResults
    ? buildDisplayRows(testCases, serverResults, gradeMode, true)
    : showRunResults
    ? buildVisibleRunRows(visibleCases, localResults ?? [], gradeMode)
    : [];

  function renderResultRow(row: DisplayRow) {
    return (
      <div key={row.caseId} className="px-4 py-3 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={cn(
              "text-xs font-bold",
              row.passed ? "text-emerald-400" : "text-red-400"
            )}
          >
            {row.passed ? "✓" : "✗"}
          </span>
          <span className="text-slate-300">{row.description}</span>
          {row.hidden && (
            <span className="text-xs uppercase tracking-wider text-slate-600">hidden</span>
          )}
        </div>
        {row.inputLabel && (
          <p className="text-xs text-slate-500 mt-0.5" style={{ fontFamily: FONT }}>
            {row.inputLabel}
          </p>
        )}
        {row.error && (
          <pre
            className="text-red-400 text-xs whitespace-pre-wrap mt-1"
            style={{ fontFamily: FONT }}
          >
            {row.error}
          </pre>
        )}
        <div className="text-xs text-slate-500 mt-1 space-y-0.5">
          <p>
            Expected:{" "}
            <span className="text-slate-300" style={{ fontFamily: FONT }}>
              {formatValue(row.expected)}
            </span>
          </p>
          {row.actual !== undefined && row.actual !== null && row.actual !== "" && (
            <p>
              Got:{" "}
              <span className="text-slate-300" style={{ fontFamily: FONT }}>
                {formatValue(row.actual)}
              </span>
            </p>
          )}
          {row.passed && (row.actual === undefined || row.actual === null || row.actual === "") && (
            <p className="text-emerald-400/80">Got: matches expected</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800/70 overflow-hidden bg-slate-950/70">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/70">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          {language}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={resetToStarter}
            disabled={examLocked || runLoading || submitLoading || restoreLoading}
            title="Discard your draft and reload the question starter code"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-slate-100 disabled:opacity-40"
          >
            Reset to starter
          </button>
          {sampleFileCase && (
            <button
              onClick={downloadSampleFile}
              title={`Download the sample ${downloadFileName} your code reads`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-slate-600 px-3 py-1.5 text-xs font-semibold transition",
                actionButtonClass
              )}
            >
              <span aria-hidden>↓</span>
              <span style={{ fontFamily: FONT }}>{downloadFileName}</span>
            </button>
          )}
          {modelSolution && (
            <button
              onClick={loadModelSolution}
              disabled={runLoading || submitLoading}
              title="Admin only — load the model solution into the editor"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/60 px-3 py-1.5 text-xs font-semibold text-amber-300 transition hover:border-amber-400 hover:text-amber-200 disabled:opacity-40"
            >
              ★ Model solution
            </button>
          )}
          {runLoading ? (
            <button
              onClick={handleStopRun}
              className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-red-400"
            >
              {interactiveRun && runStatus === "loading" ? (
                <>
                  <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                "Stop"
              )}
            </button>
          ) : (
            <button
              onClick={handleRunClick}
              disabled={examLocked || (!interactiveRun && visibleCases.length === 0)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-slate-600 px-4 py-1.5 text-xs font-semibold transition disabled:opacity-40",
                actionButtonClass
              )}
            >
              ▶ Run
            </button>
          )}
          <button
            onClick={submitToServer}
            disabled={examLocked || submitLoading || restoreLoading}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-950 transition disabled:opacity-50",
              accentClass
            )}
          >
            {submitLoading ? "Submitting…" : examMode ? "Save Answer" : serverResults ? "Re-submit" : "Submit"}
          </button>
        </div>
      </div>

      <CodeMirrorEditor
        key={`${question.id}-${codeRevision}`}
        initialCode={code}
        language={language}
        onChange={handleCodeChange}
        readOnly={examLocked}
      />

      {restoreLoading && (
        <div className="border-t border-slate-800/70 px-4 py-3 text-xs text-slate-500">
          Loading your previous results…
        </div>
      )}

      {submitError && (
        <div className="border-t border-slate-800/70 px-4 py-3 bg-red-500/5">
          <p className="text-sm text-red-400">{submitError}</p>
        </div>
      )}

      {interactiveRun && hasTerminalContent && (
        <div className="border-t border-slate-800/70">
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/60 border-b border-slate-800/70">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Terminal
            </span>
          </div>
          <div
            ref={termRef}
            className="px-4 py-3 text-sm max-h-48 overflow-y-auto"
            style={{ fontFamily: FONT }}
          >
            {termLines.map((line, i) => {
              if (line.type === "output") {
                return (
                  <div key={i} className="text-emerald-400 whitespace-pre-wrap">
                    {line.text}
                  </div>
                );
              }
              if (line.type === "input") {
                return (
                  <div key={i} className="text-slate-300 whitespace-pre-wrap">
                    {line.prompt}
                    <span className="text-cyan-300">{line.value}</span>
                  </div>
                );
              }
              return (
                <div key={i} className="text-red-400 whitespace-pre-wrap">
                  {line.text}
                </div>
              );
            })}
            {runStatus === "waiting" && (
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
                  style={{ fontFamily: FONT }}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {displayRows.length > 0 && (
        <div className="border-t border-slate-800/70">
          <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/70">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Test Results
            </span>
            {showSubmitResults && (
              <span
                className={cn(
                  "ml-3 text-xs font-semibold",
                  allPassed ? "text-emerald-400" : "text-red-400"
                )}
              >
                {allPassed ? "✓ All tests passed" : "✗ Some tests failed"}
              </span>
            )}
          </div>
          <div className="divide-y divide-slate-800/70">
            {displayRows.map(renderResultRow)}
          </div>

          {showSubmitResults && (
            <div
              className={cn(
                "px-4 py-4 border-t border-slate-800/70 text-sm",
                allPassed
                  ? "bg-emerald-500/5 text-emerald-300"
                  : "bg-red-500/5 text-red-300"
              )}
            >
              <p className="font-semibold uppercase tracking-[0.2em] text-xs mb-2">
                {allPassed ? "✓ Correct" : "✗ Incorrect"}
              </p>
              <LearnMarkdown>{question.explanation}</LearnMarkdown>
            </div>
          )}
        </div>
      )}

      {examMode && previousAnswer && (
        <div className="border-t border-slate-800/70 px-4 py-2 text-xs text-slate-500">
          Answer saved — results shown when you submit the exam.
        </div>
      )}
    </div>
  );
}

export async function gradeCodeRunnerQuestion(
  question: Question,
  studentCode: string,
  testCasesOverride?: TestCase[]
): Promise<{ allPassed: boolean; results: CaseResult[] }> {
  const language = getRunnerLanguage(question);
  const endpoint =
    language === "java"
      ? "/api/run-java-tests"
      : "/api/run-python-tests";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      studentCode,
      testCases: testCasesOverride ?? question.testCases ?? [],
      gradeMode: question.gradeMode ?? "stdout",
      timeoutMs: question.timeoutMs ?? 8000,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to grade code-runner question");
  }
  return res.json();
}
