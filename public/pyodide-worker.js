// Pyodide Web Worker
// True blocking input() via SharedArrayBuffer + Atomics.wait

importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js");

let pyodide = null;

// Sample files seeded into Pyodide's virtual filesystem so lessons that teach
// open()/read can actually be Run in the browser (Week 9 — Files). Keep the
// names and contents in sync with what the lesson examples reference.
const SAMPLE_FILES = {
  "data.txt": "apple\nbanana\ncherry\ndate\n",
  "numbers.txt": "10\n20\n30\n40\n50\n",
};

function seedSampleFiles() {
  for (const [name, content] of Object.entries(SAMPLE_FILES)) {
    try {
      pyodide.FS.writeFile(name, content);
    } catch (_) {
      // ignore — re-seeding an existing file is fine
    }
  }
}

async function ensurePyodide() {
  if (pyodide) return;
  pyodide = await self.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
  });
}

let inputBuffer = null;   // Int32Array over SharedArrayBuffer: [0]=lock, [1..512]=chars
let inputLenBuffer = null; // Int32Array over SharedArrayBuffer: [0]=length

// Called from Python: signals main thread and blocks until input arrives
function syncInput(prompt) {
  // Signal main thread we need input
  self.postMessage({ type: "input_request", prompt });

  // Reset lock
  Atomics.store(inputBuffer, 0, 0);
  // Block until main thread calls Atomics.notify after writing the value
  Atomics.wait(inputBuffer, 0, 0);

  // Read result string
  const len = Atomics.load(inputLenBuffer, 0);
  let result = "";
  for (let i = 0; i < len; i++) {
    result += String.fromCharCode(Atomics.load(inputBuffer, i + 1));
  }
  return result;
}

// The worker is now reused across runs (see usePyodide.ts). Every message
// this worker emits is tagged with the runId it belongs to; the main thread
// drops anything that doesn't match the run it's currently waiting on. This
// matters because Pyodide's `batched` stdout callback can flush asynchronously
// — without tagging, a trailing flush from a superseded run could arrive after
// the next run's onmessage handler is attached and get misattributed to it,
// which is exactly what caused output to "accumulate" across test cases.
let currentRunId = null;

self.onmessage = async (e) => {
  const { type } = e.data;

  if (type === "run") {
    const { code, inputBuffer: ib, inputLenBuffer: ilb, runId } = e.data;
    currentRunId = runId;
    inputBuffer = new Int32Array(ib);
    inputLenBuffer = new Int32Array(ilb);

    await ensurePyodide();

    // Refresh sample files before every run so reads are reproducible even if a
    // previous run overwrote them (writes share the worker's filesystem).
    seedSampleFiles();

    pyodide.setStdout({
      batched: (s) => {
        if (runId !== currentRunId) return; // stale flush from a superseded run
        self.postMessage({ type: "stdout", text: s, runId });
      },
    });
    pyodide.setStderr({
      batched: (s) => {
        if (runId !== currentRunId) return;
        self.postMessage({ type: "stderr", text: s, runId });
      },
    });

    // Expose syncInput to Python globals
    pyodide.globals.set("_sync_input_js", syncInput);

    const mockSetup = `
import builtins as _builtins
import sys

def _mock_input(prompt=""):
    result = _sync_input_js(prompt)
    return result

_builtins.input = _mock_input
`;

    try {
      const runGlobals = pyodide.globals.get("dict")();
      await pyodide.runPythonAsync(mockSetup + code, { globals: runGlobals });
      runGlobals.destroy();
      // Force out any output still sitting in the line buffer (e.g. a final
      // print with no trailing newline) before this run is considered done.
      pyodide.runPython("import sys; sys.stdout.flush(); sys.stderr.flush()");
      self.postMessage({ type: "done", runId });
    } catch (err) {
      self.postMessage({ type: "error", text: err.message, runId });
    }
  }
};
