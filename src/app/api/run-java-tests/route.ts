import { NextRequest, NextResponse } from "next/server";
import { mkdir, readdir, rm, unlink, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { spawn } from "child_process";
import type { TestCase } from "@/lib/learn/courseData";

export const runtime = "nodejs";

const DEFAULT_TIMEOUT_MS = 8000;
const MAX_CODE_LENGTH = 10_000;

type GradeMode = "stdout";

interface CaseResult {
  caseId: string;
  passed: boolean;
  expected?: unknown;
  actual?: unknown;
  error?: string;
}

type CommandResult = {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  timedOut: boolean;
  error?: string;
};

function extractEntryTypeName(code: string): string {
  const publicTypeMatch = code.match(
    /public\s+(?:final\s+|abstract\s+)?(?:class|record|enum)\s+([A-Za-z_]\w*)/
  );
  if (publicTypeMatch) return publicTypeMatch[1];

  const anyTypeMatch = code.match(
    /(?:final\s+|abstract\s+)?(?:class|record|enum)\s+([A-Za-z_]\w*)/
  );
  if (anyTypeMatch) return anyTypeMatch[1];

  return "Main";
}

function sanitizeJavaOutput(text: string, dir: string): string {
  return text
    .replaceAll(`${dir}/`, "")
    .replaceAll(`${dir}\\`, "")
    .trim();
}

function cleanStdout(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n")
    .toLowerCase();
}

function runCommand(
  command: string,
  args: string[],
  cwd: string,
  timeoutMs: number,
  stdin = ""
): Promise<CommandResult> {
  return new Promise((resolve) => {
    const child = spawn(command, args, { cwd, stdio: ["pipe", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";
    let settled = false;
    let timedOut = false;

    const finish = (result: CommandResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      resolve(result);
    };

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      const message =
        (error as NodeJS.ErrnoException).code === "ENOENT"
          ? `Command not found: ${command}`
          : error.message;
      finish({
        stdout,
        stderr,
        exitCode: null,
        timedOut: false,
        error: message,
      });
    });

    child.on("close", (exitCode) => {
      finish({
        stdout,
        stderr,
        exitCode,
        timedOut,
      });
    });

    if (stdin.length > 0) {
      child.stdin.write(stdin);
    }
    child.stdin.end();

    const timeout = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, timeoutMs);
  });
}

async function setupCaseFiles(dir: string, testCase: TestCase): Promise<string[]> {
  if (testCase.fileName === undefined) return [];

  const filePath = join(dir, testCase.fileName);
  await writeFile(filePath, testCase.fileContent ?? "", "utf8");
  return [filePath];
}

async function cleanupCaseFiles(paths: string[]) {
  await Promise.all(paths.map((path) => unlink(path).catch(() => {})));
}

async function cleanupCompiledClasses(dir: string) {
  const entries = await readdir(dir).catch(() => []);
  await Promise.all(
    entries
      .filter((name) => name.endsWith(".class"))
      .map((name) => unlink(join(dir, name)).catch(() => {}))
  );
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

  if (typeof studentCode !== "string" || studentCode.length === 0 || studentCode.length > MAX_CODE_LENGTH) {
    return NextResponse.json({ error: "Invalid or oversized code" }, { status: 400 });
  }

  if (!Array.isArray(testCases) || testCases.length === 0) {
    return NextResponse.json({ error: "testCases must be a non-empty array" }, { status: 400 });
  }

  if (gradeMode !== "stdout") {
    return NextResponse.json({ error: "Java runner only supports stdout grading." }, { status: 400 });
  }

  if (/^\s*package\s+/m.test(studentCode)) {
    const results: CaseResult[] = testCases.map((testCase) => ({
      caseId: testCase.id,
      passed: false,
      error: "Package declarations are not supported in the in-browser Java runner.",
    }));
    return NextResponse.json({ results, allPassed: false });
  }

  const className = extractEntryTypeName(studentCode);
  const dir = join(
    tmpdir(),
    `java-tests-${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
  const filePath = join(dir, `${className}.java`);

  try {
    await mkdir(dir, { recursive: true });
    await writeFile(filePath, studentCode, "utf8");

    const compileResult = await runCommand("javac", [`${className}.java`], dir, timeoutMs);

    if (compileResult.error) {
      const results: CaseResult[] = testCases.map((testCase) => ({
        caseId: testCase.id,
        passed: false,
        error: `Java compiler error: ${compileResult.error}`,
      }));
      return NextResponse.json({ results, allPassed: false });
    }

    if (compileResult.timedOut) {
      const results: CaseResult[] = testCases.map((testCase) => ({
        caseId: testCase.id,
        passed: false,
        error: `Compilation timed out (${Math.round(timeoutMs / 1000)}s limit).`,
      }));
      return NextResponse.json({ results, allPassed: false });
    }

    if (compileResult.exitCode !== 0) {
      const error = sanitizeJavaOutput(
        compileResult.stderr || compileResult.stdout || "Compilation failed.",
        dir
      );
      const results: CaseResult[] = testCases.map((testCase) => ({
        caseId: testCase.id,
        passed: false,
        error,
      }));
      return NextResponse.json({ results, allPassed: false });
    }

    const hiddenIds = new Set(testCases.filter((testCase) => testCase.hidden).map((testCase) => testCase.id));
    const results: CaseResult[] = [];

    for (const testCase of testCases) {
      const caseFiles = await setupCaseFiles(dir, testCase);

      try {
        const runResult = await runCommand(
          "java",
          ["-cp", dir, className],
          dir,
          timeoutMs,
          testCase.stdin ?? ""
        );

        if (runResult.error) {
          results.push({
            caseId: testCase.id,
            passed: false,
            error: `Java runtime error: ${runResult.error}`,
          });
          continue;
        }

        if (runResult.timedOut) {
          results.push({
            caseId: testCase.id,
            passed: false,
            error: `Execution timed out (${Math.round(timeoutMs / 1000)}s limit).`,
          });
          continue;
        }

        if (runResult.exitCode !== 0) {
          results.push({
            caseId: testCase.id,
            passed: false,
            error: sanitizeJavaOutput(runResult.stderr || runResult.stdout, dir),
          });
          continue;
        }

        const actual = runResult.stdout;
        const expected = testCase.expectedStdout ?? "";
        const passed = cleanStdout(actual) === cleanStdout(expected);
        const hidden = hiddenIds.has(testCase.id);

        results.push({
          caseId: testCase.id,
          passed,
          expected: hidden ? undefined : expected,
          actual: hidden && passed ? undefined : actual,
        });
      } finally {
        await cleanupCaseFiles(caseFiles);
      }
    }

    return NextResponse.json({
      results,
      allPassed: results.length > 0 && results.every((result) => result.passed),
    });
  } finally {
    await cleanupCompiledClasses(dir);
    await rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}
