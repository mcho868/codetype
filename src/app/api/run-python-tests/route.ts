import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { writeFile, rm, mkdir } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { promisify } from "util";
import type { TestCase } from "@/lib/learn/courses/python101/types";

const execAsync = promisify(exec);

const DEFAULT_TIMEOUT_MS = 8000;
const MAX_CODE_LENGTH = 10_000;

// Uses system python3 on PATH (same assumption as local dev; verify on deploy target).
const PYTHON_BIN = "python3";

type GradeMode = "stdout" | "function";

interface CaseResult {
  caseId: string;
  passed: boolean;
  expected?: unknown;
  actual?: unknown;
  error?: string;
}

function buildHarness(gradeMode: GradeMode, testCases: TestCase[]): string {
  const casesJson = JSON.stringify(
    testCases.map((c) => ({
      id: c.id,
      funcName: c.funcName,
      args: c.args ?? [],
      expectedReturn: c.expectedReturn,
      stdin: c.stdin ?? "",
      expectedStdout: c.expectedStdout ?? "",
      fileName: c.fileName ?? null,
      fileContent: c.fileContent ?? null,
    }))
  );

  return `# Auto-generated test harness — do not edit
import importlib
import json
import os
import subprocess
import sys

CASES = json.loads(${JSON.stringify(casesJson)})
GRADE_MODE = ${JSON.stringify(gradeMode)}
DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, DIR)

def normalise_stdout(s: str) -> str:
    lines = s.replace("\\r\\n", "\\n").split("\\n")
    return "\\n".join(line.strip() for line in lines if line.strip()).lower()

def values_equal(actual, expected):
    return actual == expected

# Track files written for a case so we can remove them before the next case,
# preventing one case's file from leaking into another.
_written_files = []

def setup_case_file(case):
    name = case.get("fileName")
    content = case.get("fileContent")
    if name is None:
        return
    path = os.path.join(DIR, name)
    with open(path, "w") as f:
        f.write(content if content is not None else "")
    _written_files.append(path)

def cleanup_case_files():
    while _written_files:
        path = _written_files.pop()
        try:
            os.remove(path)
        except OSError:
            pass

def run_stdout_case(stdin: str):
    result = subprocess.run(
        [sys.executable, os.path.join(DIR, "solution.py")],
        input=stdin,
        capture_output=True,
        text=True,
        cwd=DIR,
    )
    if result.returncode != 0:
        err = (result.stderr or result.stdout or "Non-zero exit").strip()
        raise RuntimeError(err)
    return result.stdout

def run_function_case(func_name: str, args: list):
    import solution
    importlib.reload(solution)
    func = getattr(solution, func_name)
    return func(*args)

for case in CASES:
    case_id = case["id"]
    try:
        setup_case_file(case)
        if GRADE_MODE == "function":
            actual = run_function_case(case["funcName"], case["args"])
            expected = case["expectedReturn"]
            passed = values_equal(actual, expected)
        else:
            actual = run_stdout_case(case["stdin"])
            expected = case["expectedStdout"]
            passed = normalise_stdout(actual) == normalise_stdout(expected)
        print(json.dumps({"caseId": case_id, "passed": passed, "actual": actual, "error": None}))
    except Exception as exc:
        print(json.dumps({"caseId": case_id, "passed": False, "actual": None, "error": str(exc)}))
    finally:
        cleanup_case_files()
`;
}

function stripTempPath(text: string, dir: string): string {
  return text.replace(new RegExp(dir.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "/", "g"), "");
}

export async function POST(req: NextRequest) {
  let studentCode: string;
  let testCases: TestCase[];
  let gradeMode: GradeMode;
  let timeoutMs: number;

  try {
    const body = await req.json();
    studentCode = body.studentCode;
    testCases = body.testCases;
    gradeMode = body.gradeMode;
    timeoutMs = body.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof studentCode !== "string" || studentCode.length > MAX_CODE_LENGTH) {
    return NextResponse.json({ error: "Invalid or oversized code" }, { status: 400 });
  }

  if (!Array.isArray(testCases) || testCases.length === 0) {
    return NextResponse.json({ error: "testCases must be a non-empty array" }, { status: 400 });
  }

  if (gradeMode !== "stdout" && gradeMode !== "function") {
    return NextResponse.json({ error: "gradeMode must be 'stdout' or 'function'" }, { status: 400 });
  }

  const dir = join(
    tmpdir(),
    `python-tests-${Date.now()}-${Math.random().toString(36).slice(2)}`
  );

  try {
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, "solution.py"), studentCode, "utf8");
    await writeFile(join(dir, "harness.py"), buildHarness(gradeMode, testCases), "utf8");

    let stdout = "";
    try {
      const result = await execAsync(`"${PYTHON_BIN}" "${join(dir, "harness.py")}"`, {
        timeout: timeoutMs,
        cwd: dir,
      });
      stdout = result.stdout ?? "";
    } catch (runErr) {
      const err = runErr as { killed?: boolean; stderr?: string; stdout?: string };
      if (err.killed) {
        const timeoutResults: CaseResult[] = testCases.map((tc) => ({
          caseId: tc.id,
          passed: false,
          error: `Execution timed out (${Math.round(timeoutMs / 1000)}s limit).`,
        }));
        return NextResponse.json({ results: timeoutResults, allPassed: false });
      }
      const stderr = stripTempPath(err.stderr ?? String(runErr), dir);
      const timeoutResults: CaseResult[] = testCases.map((tc) => ({
        caseId: tc.id,
        passed: false,
        error: stderr || "Harness failed to run.",
      }));
      return NextResponse.json({ results: timeoutResults, allPassed: false });
    }

    const hiddenIds = new Set(testCases.filter((tc) => tc.hidden).map((tc) => tc.id));
    const expectedById = new Map(
      testCases.map((tc) => [
        tc.id,
        gradeMode === "function" ? tc.expectedReturn : tc.expectedStdout,
      ])
    );

    const results: CaseResult[] = [];
    for (const line of stdout.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        const parsed = JSON.parse(trimmed) as {
          caseId: string;
          passed: boolean;
          actual?: unknown;
          error?: string | null;
        };
        const isHidden = hiddenIds.has(parsed.caseId);
        results.push({
          caseId: parsed.caseId,
          passed: parsed.passed,
          expected: isHidden ? undefined : expectedById.get(parsed.caseId),
          actual: isHidden && parsed.passed ? undefined : parsed.actual,
          error: parsed.error ?? undefined,
        });
      } catch {
        // skip malformed lines
      }
    }

    // Ensure every case has a result even if harness omitted one
    const seen = new Set(results.map((r) => r.caseId));
    for (const tc of testCases) {
      if (!seen.has(tc.id)) {
        results.push({
          caseId: tc.id,
          passed: false,
          error: "No result returned for this test case.",
        });
      }
    }

    return NextResponse.json({
      results,
      allPassed: results.length > 0 && results.every((r) => r.passed),
    });
  } finally {
    rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}
