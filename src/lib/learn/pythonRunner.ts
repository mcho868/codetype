export interface PythonRunResult {
  output: string;
  error: string;
}

export async function runPythonCode(
  code: string,
  stdin = "",
  signal?: AbortSignal
): Promise<PythonRunResult> {
  const response = await fetch("/api/run-python", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, stdin }),
    signal,
  });

  const data = (await response.json()) as Partial<PythonRunResult> & { error?: string };
  if (!response.ok) {
    throw new Error(data.error || "Python runner request failed.");
  }

  return {
    output: typeof data.output === "string" ? data.output : "",
    error: typeof data.error === "string" ? data.error : "",
  };
}
