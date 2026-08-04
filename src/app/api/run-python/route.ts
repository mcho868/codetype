import { NextRequest, NextResponse } from "next/server";
import { mkdir, rm, writeFile } from "fs/promises";
import { spawn } from "child_process";
import { join } from "path";
import { tmpdir } from "os";
import { SAMPLE_FILES } from "@/lib/learn/sampleFiles";

export const runtime = "nodejs";

const PYTHON_BIN = "python3";
const TIMEOUT_MS = 15_000;
const MAX_CODE_LENGTH = 10_000;
const MAX_STDIN_LENGTH = 4_000;
const MAX_OUTPUT_LENGTH = 100_000;

type CommandResult = {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  timedOut: boolean;
  error?: string;
};

function runPython(
  cwd: string,
  stdin: string,
  signal: AbortSignal
): Promise<CommandResult> {
  return new Promise((resolve) => {
    const child = spawn(PYTHON_BIN, ["solution.py"], {
      cwd,
      stdio: ["pipe", "pipe", "pipe"],
      env: {
        PATH: process.env.PATH ?? "/usr/local/bin:/usr/bin:/bin",
        HOME: "/tmp",
        LANG: "C.UTF-8",
        LC_ALL: "C.UTF-8",
        NODE_ENV: process.env.NODE_ENV ?? "production",
      },
    });

    let stdout = "";
    let stderr = "";
    let settled = false;
    let timedOut = false;
    let outputLimitReached = false;

    const onAbort = () => {
      if (settled) return;
      child.kill("SIGKILL");
      finish({
        stdout,
        stderr,
        exitCode: null,
        timedOut: false,
        error: "Execution stopped by user.",
      });
    };

    const finish = (result: CommandResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      signal.removeEventListener("abort", onAbort);
      resolve(result);
    };

    const appendOutput = (target: "stdout" | "stderr", chunk: Buffer) => {
      if (settled) return;
      const text = chunk.toString("utf8");
      if (target === "stdout") stdout += text;
      else stderr += text;

      if (stdout.length + stderr.length > MAX_OUTPUT_LENGTH) {
        outputLimitReached = true;
        child.kill("SIGKILL");
      }
    };

    child.stdout.on("data", (chunk: Buffer) => appendOutput("stdout", chunk));
    child.stderr.on("data", (chunk: Buffer) => appendOutput("stderr", chunk));

    child.stdin.end(stdin);

    child.on("error", (error) => {
      const message =
        (error as NodeJS.ErrnoException).code === "ENOENT"
          ? `Command not found: ${PYTHON_BIN}`
          : error.message;
      finish({ stdout, stderr, exitCode: null, timedOut: false, error: message });
    });

    child.on("close", (exitCode) => {
      if (outputLimitReached) {
        finish({
          stdout,
          stderr,
          exitCode,
          timedOut: false,
          error: `Output exceeded the ${MAX_OUTPUT_LENGTH.toLocaleString()} character limit.`,
        });
        return;
      }

      finish({ stdout, stderr, exitCode, timedOut });
    });

    const timeout = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, TIMEOUT_MS);

    signal.addEventListener("abort", onAbort, { once: true });
    if (signal.aborted) onAbort();
  });
}

function cleanOutput(text: string, dir: string): string {
  return text
    .replaceAll(`${dir}/`, "")
    .replaceAll(`${dir}\\`, "")
    .trim();
}

export async function POST(req: NextRequest) {
  let code: string;
  let stdin = "";

  try {
    const body = await req.json();
    code = body.code;
    stdin = typeof body.stdin === "string" ? body.stdin : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof code !== "string" || code.length === 0 || code.length > MAX_CODE_LENGTH) {
    return NextResponse.json({ error: "Invalid or oversized code" }, { status: 400 });
  }

  if (stdin.length > MAX_STDIN_LENGTH) {
    return NextResponse.json({ error: "Input is too large" }, { status: 400 });
  }

  const dir = join(tmpdir(), `python-run-${Date.now()}-${Math.random().toString(36).slice(2)}`);

  try {
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, "solution.py"), code, "utf8");

    await Promise.all(
      Object.entries(SAMPLE_FILES).map(([name, content]) =>
        writeFile(join(dir, name), content, "utf8")
      )
    );

    const result = await runPython(dir, stdin, req.signal);

    if (result.error) {
      return NextResponse.json({
        output: cleanOutput(result.stdout, dir),
        error: result.error,
      });
    }

    if (result.timedOut) {
      return NextResponse.json({
        output: cleanOutput(result.stdout, dir),
        error: "Execution timed out (15s limit).",
      });
    }

    return NextResponse.json({
      output: result.stdout,
      error: result.exitCode === 0 ? "" : cleanOutput(result.stderr || result.stdout, dir),
    });
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}
