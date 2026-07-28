import { NextRequest, NextResponse } from "next/server";
import { mkdir, rm, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { spawn } from "child_process";

export const runtime = "nodejs";

const TIMEOUT_MS = 8000;
const MAX_CODE_LENGTH = 10_000;
const MAX_STDIN_LENGTH = 4_000;

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

function runCommand(
  command: string,
  args: string[],
  cwd: string,
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

    if (stdin.length > 0) {
      child.stdin.write(stdin);
    }
    child.stdin.end();

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

    const timeout = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, TIMEOUT_MS);
  });
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

  if (/^\s*package\s+/m.test(code)) {
    return NextResponse.json({
      output: "",
      error: "Package declarations are not supported in the in-browser Java runner.",
    });
  }

  const className = extractEntryTypeName(code);
  const dir = join(tmpdir(), `java-run-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const filePath = join(dir, `${className}.java`);

  try {
    await mkdir(dir, { recursive: true });
    await writeFile(filePath, code, "utf8");

    const compileResult = await runCommand("javac", [`${className}.java`], dir);

    if (compileResult.error) {
      return NextResponse.json({
        output: "",
        error: `Java compiler error: ${compileResult.error}`,
      });
    }

    if (compileResult.timedOut) {
      return NextResponse.json({
        output: "",
        error: "Compilation timed out (8s limit).",
      });
    }

    if (compileResult.exitCode !== 0) {
      return NextResponse.json({
        output: sanitizeJavaOutput(compileResult.stdout, dir),
        error: sanitizeJavaOutput(compileResult.stderr || compileResult.stdout, dir),
      });
    }

    const runResult = await runCommand("java", ["-cp", dir, className], dir, stdin);

    if (runResult.error) {
      return NextResponse.json({
        output: sanitizeJavaOutput(runResult.stdout, dir),
        error: `Java runtime error: ${runResult.error}`,
      });
    }

    if (runResult.timedOut) {
      return NextResponse.json({
        output: sanitizeJavaOutput(runResult.stdout, dir),
        error: "Execution timed out (8s limit).",
      });
    }

    return NextResponse.json({
      output: runResult.stdout,
      error:
        runResult.exitCode === 0 ? "" : sanitizeJavaOutput(runResult.stderr || runResult.stdout, dir),
    });
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}
