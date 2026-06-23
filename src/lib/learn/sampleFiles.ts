/**
 * Sample text files used by the course code runner and offered as downloads.
 *
 * IMPORTANT: these contents must stay in sync with the files seeded into the
 * Pyodide worker's virtual filesystem in `public/pyodide-worker.js`
 * (the `SAMPLE_FILES` object there). A student can `open("data.txt")` in the
 * runner AND download the identical file from the lesson.
 */
export const SAMPLE_FILES: Record<string, string> = {
  "data.txt": "apple\nbanana\ncherry\ndate\n",
  "numbers.txt": "10\n20\n30\n40\n50\n",
};
