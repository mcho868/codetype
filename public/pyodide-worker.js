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

self.onmessage = async (e) => {
  const { type } = e.data;

  if (type === "run") {
    const { code, inputBuffer: ib, inputLenBuffer: ilb } = e.data;
    inputBuffer = new Int32Array(ib);
    inputLenBuffer = new Int32Array(ilb);

    await ensurePyodide();

    // Refresh sample files before every run so reads are reproducible even if a
    // previous run overwrote them (writes share the worker's filesystem).
    seedSampleFiles();

    pyodide.setStdout({
      batched: (s) => self.postMessage({ type: "stdout", text: s }),
    });
    pyodide.setStderr({
      batched: (s) => self.postMessage({ type: "stderr", text: s }),
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
      await pyodide.runPythonAsync(mockSetup + code);
      self.postMessage({ type: "done" });
    } catch (err) {
      self.postMessage({ type: "error", text: err.message });
    }
  }
};
