import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { writeFile, rm, mkdir } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { promisify } from "util";

const execAsync = promisify(exec);

const TIMEOUT_MS = 8000;
const MAX_CODE_LENGTH = 10_000;

export async function POST(req: NextRequest) {
  let code: string;
  try {
    const body = await req.json();
    code = body.code;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof code !== "string" || code.length > MAX_CODE_LENGTH) {
    return NextResponse.json({ error: "Invalid or oversized code" }, { status: 400 });
  }

  const dir = join(tmpdir(), `ts-run-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const filePath = join(dir, "main.ts");

  try {
    await mkdir(dir, { recursive: true });
    await writeFile(filePath, code, "utf8");

    try {
      const { stdout, stderr } = await execAsync(
        `node --experimental-transform-types "${filePath}"`,
        { timeout: TIMEOUT_MS }
      );
      // strip the experimental warning Node emits on stderr
      const cleanErr = (stderr ?? "")
        .split("\n")
        .filter((l) => !l.includes("ExperimentalWarning") && !l.includes("--experimental-transform-types") && !l.includes("trace-warnings"))
        .join("\n")
        .trim();
      return NextResponse.json({ output: stdout, error: cleanErr });
    } catch (runErr) {
      const err = runErr as { killed?: boolean; stderr?: string; stdout?: string };
      if (err.killed) {
        return NextResponse.json({ output: "", error: "Execution timed out (8s limit)." });
      }
      // Strip temp path from error messages
      const rawErr = (err.stderr ?? err.stdout ?? String(runErr))
        .replace(new RegExp(dir.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "/", "g"), "")
        .split("\n")
        .filter((l) => !l.includes("ExperimentalWarning") && !l.includes("--experimental-transform-types") && !l.includes("trace-warnings"))
        .join("\n")
        .trim();
      return NextResponse.json({ output: err.stdout ?? "", error: rawErr });
    }
  } finally {
    rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}
