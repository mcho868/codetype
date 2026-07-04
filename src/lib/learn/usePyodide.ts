"use client";

import { useRef } from "react";

export type TerminalLine =
  | { type: "output"; text: string }
  | { type: "input"; prompt: string; value: string }
  | { type: "error"; text: string };

const LOAD_TIMEOUT_MS = 120_000;
const EXECUTION_TIMEOUT_MS = 15_000;

const TIMEOUT_MSG =
  "TimeoutError: Program ran for too long — possible infinite loop. Check your loop conditions.";

let runIdCounter = 0;

export function usePyodide() {
  const workerRef = useRef<Worker | null>(null);
  const inputBufferRef = useRef<SharedArrayBuffer | null>(null);
  const inputLenBufferRef = useRef<SharedArrayBuffer | null>(null);
  const resumeExecutionTimeoutRef = useRef<(() => void) | null>(null);

  function getWorker(): Worker {
    if (!workerRef.current) {
      workerRef.current = new Worker("/pyodide-worker.js");
      inputBufferRef.current = new SharedArrayBuffer(4 * 513);
      inputLenBufferRef.current = new SharedArrayBuffer(4);
    }
    return workerRef.current;
  }

  function submitInput(value: string) {
    if (!inputBufferRef.current || !inputLenBufferRef.current) return;
    const buf = new Int32Array(inputBufferRef.current);
    const lenBuf = new Int32Array(inputLenBufferRef.current);
    const len = Math.min(value.length, 512);
    Atomics.store(lenBuf, 0, len);
    for (let i = 0; i < len; i++) {
      Atomics.store(buf, i + 1, value.charCodeAt(i));
    }
    Atomics.store(buf, 0, 1);
    Atomics.notify(buf, 0);
    resumeExecutionTimeoutRef.current?.();
  }

  async function runCode(
    code: string,
    onLine: (line: TerminalLine) => void,
    onWaitingForInput: (prompt: string) => void,
    onDone: () => void,
    timeoutMs = EXECUTION_TIMEOUT_MS
  ): Promise<{ error: string }> {
    const worker = getWorker();
    resumeExecutionTimeoutRef.current = null;
    const runId = ++runIdCounter;

    return new Promise((resolve) => {
      let settled = false;
      let executionTimeoutId: ReturnType<typeof setTimeout> | null = null;
      let executionTimerStarted = false;

      const settle = (error: string) => {
        if (settled) return;
        settled = true;
        clearTimeout(loadTimeoutId);
        if (executionTimeoutId) clearTimeout(executionTimeoutId);
        resumeExecutionTimeoutRef.current = null;
        if (error) onLine({ type: "error", text: error });
        onDone();
        resolve({ error });
      };

      const clearExecutionTimeout = () => {
        if (executionTimeoutId) {
          clearTimeout(executionTimeoutId);
          executionTimeoutId = null;
        }
      };

      const startExecutionTimeout = () => {
        clearExecutionTimeout();
        executionTimeoutId = setTimeout(() => {
          worker.terminate();
          workerRef.current = null;
          inputBufferRef.current = null;
          inputLenBufferRef.current = null;
          settle(TIMEOUT_MSG);
        }, timeoutMs);
      };

      resumeExecutionTimeoutRef.current = () => {
        if (!settled) startExecutionTimeout();
      };

      const ensureExecutionTimeout = () => {
        if (!executionTimerStarted) {
          executionTimerStarted = true;
          startExecutionTimeout();
        }
      };

      const loadTimeoutId = setTimeout(() => {
        worker.terminate();
        workerRef.current = null;
        inputBufferRef.current = null;
        inputLenBufferRef.current = null;
        settle("Failed to load the Python runtime. Please refresh and try again.");
      }, LOAD_TIMEOUT_MS);

      worker.onmessage = (e) => {
        const msg = e.data;
        if (msg.runId !== undefined && msg.runId !== runId) return; // stale message from a superseded run
        if (msg.type === "stdout") {
          ensureExecutionTimeout();
          onLine({ type: "output", text: msg.text });
        } else if (msg.type === "stderr") {
          ensureExecutionTimeout();
          onLine({ type: "error", text: msg.text });
        } else if (msg.type === "input_request") {
          clearTimeout(loadTimeoutId);
          ensureExecutionTimeout();
          clearExecutionTimeout();
          onWaitingForInput(msg.prompt);
        } else if (msg.type === "done") {
          clearTimeout(loadTimeoutId);
          clearExecutionTimeout();
          if (settled) return;
          settled = true;
          resumeExecutionTimeoutRef.current = null;
          onDone();
          resolve({ error: "" });
        } else if (msg.type === "error") {
          clearTimeout(loadTimeoutId);
          clearExecutionTimeout();
          if (settled) return;
          settled = true;
          resumeExecutionTimeoutRef.current = null;
          onLine({ type: "error", text: msg.text });
          onDone();
          resolve({ error: msg.text });
        }
      };

      worker.postMessage({
        type: "run",
        code,
        runId,
        inputBuffer: inputBufferRef.current,
        inputLenBuffer: inputLenBufferRef.current,
      });
    });
  }

  async function runCodeSimple(code: string): Promise<{ output: string; error: string }> {
    const lines: string[] = [];
    let errorMsg = "";
    const result = await runCode(
      code,
      (line) => {
        if (line.type === "output") lines.push(line.text);
        else if (line.type === "error") errorMsg = line.text;
      },
      () => {},
      () => {}
    );
    if (result.error) errorMsg = result.error;
    return { output: lines.join("\n"), error: errorMsg };
  }

  function terminateWorker() {
    resumeExecutionTimeoutRef.current = null;
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
      inputBufferRef.current = null;
      inputLenBufferRef.current = null;
    }
  }

  return { runCode, runCodeSimple, submitInput, terminateWorker };
}
