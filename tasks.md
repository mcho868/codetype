# tasks.md — CodeRunner-Style 10-Week Python Course

> **For the executing agent.** This is a build spec. Follow phases in order. Do not skip the
> verification steps. Two architectural decisions are already locked (see "Locked Decisions").
> When a task says "model on X", open file X first and copy its real patterns — do not invent APIs.

---

## 0. Context you need before touching anything

**Repo:** `/Users/choemanseung/CodeType/algotype` (Next.js App Router, TypeScript).

**Goal:** Redesign the Python learning course into a **10-week curriculum** where most questions are
**coding questions graded by hidden test cases run on the backend** (CodeRunner style: student types in
an IDE; the server runs the test suite and returns pass/fail). Quizzes should be ~1 hour, mostly coding.

**Source of truth for curriculum:** `COMPSCI_101_Text.pdf` at repo root — *COMPSCI 101: Principles of
Programming (in Python)* by Andrew Luxton-Reilly. Chapters 0–17 + appendices. The week→chapter mapping
is in Phase 5 below; read the relevant chapter pages before authoring each week's questions.

### Key files (read these first)
- `src/lib/learn/courses/python101/types.ts` — `Module`, `Lesson`, `Question`, `CodeExample`, `QuestionType`. **Shared by the leetcode course too — changes must stay back-compatible.**
- `src/lib/learn/courses/python101/index.ts` — registers modules into `MODULES[]`; `getModule(slug)`.
- `src/lib/learn/courses/python101/module0.ts` … `module6.ts` — existing 7 modules (the content being replaced/expanded).
- `src/components/learn/QuestionCard.tsx` — renders + grades questions today.
- `src/lib/learn/usePyodide.ts` + `public/pyodide-worker.js` — **client-side** Python execution (Pyodide in a web worker; SharedArrayBuffer for `input()`).
- `src/app/api/run-java/route.ts` — **the template for the new backend runner** (temp dir + `child_process.exec` + 8s timeout + `finally` cleanup).
- `src/app/api/run-typescript/route.ts`, `src/app/api/run-sql/route.ts` — other existing backend runners (SQL uses `better-sqlite3` with per-question seeded DBs keyed by `sqlContextId`).

### How grading works TODAY (the gap we're closing)
In `QuestionCard.tsx`, a `code-challenge` is correct iff:
`normalize(stdout) === normalize(question.expectedOutput)` **AND** every `question.requiredPatterns` regex
matches the source. Python runs **client-side** via Pyodide. **There is no real test-case harness** —
no hidden cases, no per-case stdin, no function-return testing. That is what Phase 1–3 add.

---

## Locked Decisions (do not re-litigate)
1. **Runner is UNSANDBOXED** — use `child_process` + temp dir + timeout, exactly like `run-java/route.ts`.
   This matches how Java/TS already run on this server. Do **not** add Vercel Sandbox / Judge0.
2. **Build the engine first** (Phases 1–4), prove it with a fully-authored **Week 1** module (Phase 5a),
   then roll out Weeks 2–10. Schema changes are **additive** so existing courses keep working.

---

## Phase 1 — Schema (`types.ts`), additive & back-compatible

- [ ] **1.1** Add `'code-runner'` to the `QuestionType` union (keep `'code-challenge'` for old questions).
- [ ] **1.2** Add a `TestCase` interface:
  ```ts
  export interface TestCase {
    id: string;
    description?: string;        // shown for visible cases
    hidden?: boolean;            // hidden: report pass/fail only, never reveal args/expected
    // function mode:
    funcName?: string;           // name of the student function to call
    args?: unknown[];            // positional args
    expectedReturn?: unknown;    // deep-equality compared to the return value
    // stdout mode:
    stdin?: string;              // fed to the program's stdin
    expectedStdout?: string;     // normalized-compared to stdout
  }
  ```
- [ ] **1.3** Extend `Question` with (all optional, back-compat):
  ```ts
  gradeMode?: 'stdout' | 'function' | 'patterns';
  testCases?: TestCase[];
  timeoutMs?: number;           // default 8000
  ```
- [ ] **1.4** Do NOT remove any existing field. Confirm `tsc`/`next build` still passes after this phase.

**Verify:** `npx tsc --noEmit` (or the repo's typecheck script) is clean; existing leetcode/python101 modules still compile.

---

## Phase 2 — Backend runner `src/app/api/run-python-tests/route.ts`

Model structure on `src/app/api/run-java/route.ts` (open it). Differences below.

- [ ] **2.1** `POST` body: `{ studentCode: string; testCases: TestCase[]; gradeMode: 'stdout'|'function'; timeoutMs?: number }`.
  Validate: `studentCode` is a string ≤ `MAX_CODE_LENGTH` (use 10_000 like run-java); `testCases` non-empty.
- [ ] **2.2** Make a temp dir under `os.tmpdir()` (unique suffix, like run-java). Write `solution.py` = student code.
- [ ] **2.3** Generate a `harness.py` that:
  - imports the student module (`import solution` after adding the dir to `sys.path`, or `runpy`),
  - **function mode:** for each case, calls `getattr(solution, case.funcName)(*case.args)`, captures return,
    compares to `expectedReturn` (use `==`; JSON-encode args/expected from the route),
  - **stdout mode:** runs `solution.py` as a subprocess per case feeding `stdin`, captures stdout,
  - prints **one JSON object per line** to stdout: `{"caseId","passed","actual","error"}` and nothing else.
    (Wrap each case in try/except so one crash doesn't abort the rest.)
- [ ] **2.4** Run `python3 harness.py` via `execAsync` with `timeout: timeoutMs ?? 8000`. On `err.killed`,
  return a timeout result. Strip the temp-dir path from any stderr (run-java does this — copy the regex).
- [ ] **2.5** Parse harness stdout lines → build `results: { caseId, passed, expected, actual, error }[]`.
  For **hidden** cases, blank out `expected`/`actual` in the response (only `passed` survives).
- [ ] **2.6** Respond `{ results, allPassed: results.every(r => r.passed) }`. `finally { rm(dir, {recursive,force}) }`.
- [ ] **2.7** Decide the Python binary: confirm `python3` is on PATH in the deploy/runtime env; if the repo
  pins a version elsewhere, match it. Note it in a comment.

**Verify (manual):** with the dev server running, POST a trivial function-mode case
(`def add(a,b): return a+b`, case `{funcName:"add",args:[2,3],expectedReturn:5}`) and a stdout-mode case;
confirm `allPassed:true`, then a deliberately-wrong solution returns `allPassed:false` with correct per-case flags.
Confirm an infinite loop hits the timeout and the temp dir is cleaned up.

---

## Phase 3 — UI: render & submit `code-runner` questions

Extend `src/components/learn/QuestionCard.tsx` (or add a sibling `CodeRunnerCard.tsx` it delegates to).

- [ ] **3.1** When `question.type === 'code-runner'`: show the code editor (reuse the existing `CodeEditor`
  component used for python `code-challenge`) seeded with `question.starterCode`.
- [ ] **3.2** Two actions:
  - **Run** — quick local feedback via existing Pyodide path against *visible* sample cases only (optional but nice).
  - **Submit** — POST `{ studentCode, testCases, gradeMode, timeoutMs }` to `/api/run-python-tests`.
    Server result is authoritative.
- [ ] **3.3** Render a results table: one row per **visible** case (description + ✓/✗ + expected vs actual on fail);
  hidden cases collapsed to "Hidden tests: N/M passed". Show stderr/timeout messaging.
- [ ] **3.4** Set correctness via the existing `onAnswerSubmit({ selectedAnswer: code, isCorrect: allPassed })`
  flow so progress tracking keeps working (see how the current `code-challenge` branch calls it).
- [ ] **3.5** Loading/disabled states while the request is in flight; handle network/500 errors gracefully.

**Verify:** wire ONE temporary `code-runner` question into an existing module, run it in the browser,
confirm pass and fail paths and that progress records correctly. Remove the temp question after.

---

## Phase 4 — Timed quiz / exam mode (~1 hour)

- [ ] **4.1** Reuse the existing `Module.isMidterm` flag for exam modules.
- [ ] **4.2** Add a countdown timer for `isMidterm` modules and suppress per-question answer reveal until
  the quiz is submitted (or time expires). ~1 hr ≈ 12–15 coding tasks (~4–5 min each) + a few MCQs.
- [ ] **4.3** On submit/expiry, grade all questions (coding via the backend runner) and show a summary score.
- [ ] **4.4** Confirm timer state survives navigation within the quiz but cannot be reset by reload (best-effort).

**Verify:** a sample `isMidterm` module with 3 coding + 1 MCQ runs end-to-end with the timer.

---

## Phase 5 — Author the 10-week curriculum

**Per-module standard:** 4–5 lessons (markdown `content` + `CodeExample[]`, mirror the style in existing
`module*.ts`), then **15–20 questions, ≥70% `code-runner` coding**, the rest MCQ/true-false/fill-in-blank
for concept checks and code tracing. Each coding question: `prompt` (markdown), `starterCode` (signature stub
or skeleton), `gradeMode`, **4–8 `testCases` (2–3 visible "sample" + the rest `hidden`)**, and an
`explanation` containing a model solution.

Create as new module files (`module7.ts`+ or renumber deliberately) and register them in
`python101/index.ts`. Read the cited textbook chapter pages from `COMPSCI_101_Text.pdf` before authoring.

| Wk | Module | Textbook ch. | Lesson topics | Question target |
|----|--------|--------------|---------------|-----------------|
| 1  | Foundations & Simple Data | 0–1 | algorithms, how Python runs, literals, operators, variables, expressions, `print()`, syntax vs runtime errors | 16 (≥12 coding) |
| 2  | Input & Output, Types | 2 | `input()`, types, int/float/str, numbers, f-strings, code style/docstrings/comments | 18 (≥15 coding, stdout mode + stdin) |
| 3  | Conditions | 3–4 | `if/elif/else`, booleans, logical ops, operator chaining, floats, nested conditions, code tracing | 18 (≥14 coding) |
| 4  | `while` Loops | 5 | while, accumulators, sentinel loops, input validation | 16 (≥14 coding) |
| 5  | Sequences: strings & lists | 6 | indexing/slicing, substrings, list basics, sublists, mutable vs immutable | 18 (≥15 coding, function mode) |
| 6  | String & list methods | 7 | string methods, list methods, worked examples | 18 (≥16 coding) |
| 7  | `for` loops & `range()` | 8–9 | iterate strings/lists, text processing, range 1/2/3 args | 18 (≥16 coding) |
| 8  | Functions | 10–11 | define/call, parameters, return, decomposition; mini Tic-Tac-Toe helpers | 16 (≥14 coding, function mode) |
| 9  | Tuples & Files | 12–14 | tuples, multiple assignment, lists of tuples, read/write/append files | 16 (≥13 coding) |
| 10 | Dictionaries & Nested Loops | 15–17 | dict CRUD, iterate keys/values/items, frequency count, nested lists, 2D data | 18 (≥15 coding) |

- [ ] **5a. Week 1 FIRST as the reference module.** Fully author it, ship it end-to-end through the new
  engine, and get it reviewed before mass-producing. It becomes the template for Weeks 2–10.
- [ ] **5b.** Weeks 2–10, one module each, following the table.
- [ ] **5c.** (Optional) **Midterm** after Wk 5 and **Final** after Wk 10 as `isMidterm` timed quizzes
  (~1 hr, ~15 coding tasks each).
- [ ] **5d.** Register every new module in `python101/index.ts`; decide whether to retire or migrate the
  old thin `code-challenge` questions in module0–6 (do not silently delete content — confirm with the owner).

**Authoring rules for test cases**
- Always include ≥1 edge case in hidden cases (empty input, 0, negative, duplicates, single element).
- For `function` mode, the `starterCode` must define the exact `funcName` the test cases call.
- For `stdout` mode, expected output must match `print()` formatting exactly (mind trailing newline/spaces;
  the runner normalizes per the existing `normalise`/`clean` logic — confirm what it strips).
- Keep prompts unambiguous about return type vs printing.

---

## Phase 6 — Wire-up, cleanup, final verification
- [ ] **6.1** All new modules imported & ordered in `python101/index.ts`.
- [ ] **6.2** `next build` passes; no TS errors.
- [ ] **6.3** Spot-check one coding question per week in the browser (pass + fail path).
- [ ] **6.4** Confirm the old leetcode course is untouched and still works (shared `types.ts`).
- [ ] **6.5** Do NOT commit/push unless the owner asks. Summarize what changed.

---

## Open items to confirm with the owner (don't guess)
- Final module numbering / whether to replace vs. append to existing module0–6.
- Whether the deploy target actually has `python3` available for `child_process` (Locked Decision 1 assumes
  parity with the working Java/TS runners — verify in the real runtime, not just locally).
- Exact total question count (~170 implied) and whether Midterm/Final are in scope for v1.
