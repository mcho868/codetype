import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { writeFile, rm, mkdir } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { promisify } from "util";

const execAsync = promisify(exec);

const TIMEOUT_MS = 8000;
const MAX_CODE_LENGTH = 10_000;

// Extract the public class name from Java source, or fall back to "Main"
function extractClassName(code: string): string {
  const match = code.match(/public\s+class\s+(\w+)/);
  return match ? match[1] : "Main";
}

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

  const className = extractClassName(code);
  const dir = join(tmpdir(), `java-run-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const filePath = join(dir, `${className}.java`);

  try {
    await mkdir(dir, { recursive: true });
    await writeFile(filePath, code, "utf8");

    // Compile
    try {
      await execAsync(`javac "${filePath}"`, { timeout: TIMEOUT_MS });
    } catch (compileErr) {
      const err = compileErr as { stderr?: string; stdout?: string };
      // Strip the temp path from error messages so students see clean errors
      const stderr = (err.stderr ?? err.stdout ?? String(compileErr))
        .replace(new RegExp(dir.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "/", "g"), "");
      return NextResponse.json({ output: "", error: stderr });
    }

    // Run with timeout
    try {
      const { stdout, stderr } = await execAsync(
        `java -cp "${dir}" ${className}`,
        { timeout: TIMEOUT_MS }
      );
      return NextResponse.json({ output: stdout, error: stderr });
    } catch (runErr) {
      const err = runErr as { killed?: boolean; stderr?: string; stdout?: string };
      if (err.killed) {
        return NextResponse.json({ output: "", error: "Execution timed out (8s limit)." });
      }
      return NextResponse.json({
        output: err.stdout ?? "",
        error: err.stderr ?? String(runErr),
      });
    }
  } finally {
    rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}
