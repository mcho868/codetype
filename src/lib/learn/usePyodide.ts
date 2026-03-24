"use client";

import { useRef } from "react";

export type TerminalLine =
  | { type: "output"; text: string }
  | { type: "input"; prompt: string; value: string }
  | { type: "error"; text: string };

export function usePyodide() {
  const workerRef = useRef<Worker | null>(null);
  // SharedArrayBuffer for input synchronization
  // [0] = lock (0=waiting, 1=ready), [1..512] = char codes
  const inputBufferRef = useRef<SharedArrayBuffer | null>(null);
  const inputLenBufferRef = useRef<SharedArrayBuffer | null>(null);

  function getWorker(): Worker {
    if (!workerRef.current) {
      workerRef.current = new Worker("/pyodide-worker.js");
      inputBufferRef.current = new SharedArrayBuffer(4 * 513); // Int32Array: 1 lock + 512 chars
      inputLenBufferRef.current = new SharedArrayBuffer(4);    // Int32Array: 1 length
    }
    return workerRef.current;
  }

  function submitInput(value: string) {
    if (!inputBufferRef.current || !inputLenBufferRef.current) return;
    const buf = new Int32Array(inputBufferRef.current);
    const lenBuf = new Int32Array(inputLenBufferRef.current);
    // Write string chars
    const len = Math.min(value.length, 512);
    Atomics.store(lenBuf, 0, len);
    for (let i = 0; i < len; i++) {
      Atomics.store(buf, i + 1, value.charCodeAt(i));
    }
    // Unblock the worker
    Atomics.store(buf, 0, 1);
    Atomics.notify(buf, 0);
  }

  async function runCode(
    code: string,
    onLine: (line: TerminalLine) => void,
    onWaitingForInput: (prompt: string) => void,
    onDone: () => void,
    timeoutMs = 5000
  ): Promise<{ error: string }> {
    // Terminate any previous run
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }

    const worker = getWorker();

    return new Promise((resolve) => {
      let settled = false;

      const timeoutId = setTimeout(() => {
        if (settled) return;
        settled = true;
        worker.terminate();
        workerRef.current = null;
        const msg = "TimeoutError: Program ran for too long — possible infinite loop. Check your loop conditions.";
        onLine({ type: "error", text: msg });
        onDone();
        resolve({ error: msg });
      }, timeoutMs);

      worker.onmessage = (e) => {
        const msg = e.data;
        if (msg.type === "stdout") {
          onLine({ type: "output", text: msg.text });
        } else if (msg.type === "stderr") {
          onLine({ type: "error", text: msg.text });
        } else if (msg.type === "input_request") {
          onWaitingForInput(msg.prompt);
        } else if (msg.type === "done") {
          if (settled) return;
          settled = true;
          clearTimeout(timeoutId);
          onDone();
          resolve({ error: "" });
        } else if (msg.type === "error") {
          if (settled) return;
          settled = true;
          clearTimeout(timeoutId);
          onLine({ type: "error", text: msg.text });
          onDone();
          resolve({ error: msg.text });
        }
      };

      worker.postMessage({
        type: "run",
        code,
        inputBuffer: inputBufferRef.current,
        inputLenBuffer: inputLenBufferRef.current,
      });
    });
  }

  // Simplified version for quiz code challenges (no interactive input needed)
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
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }

  return { runCode, runCodeSimple, submitInput, terminateWorker };
}
