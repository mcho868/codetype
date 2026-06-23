# tests-tasks.md — Weekly Tests for the 10-Week CompSci 101 Course

> **For the executing agent.** Author 10 timed "test" modules (one per week) plus a Week-1 Python
> install lesson. The teaching modules already exist and work. Reuse existing patterns — do NOT change
> the engine, the schema, or any component. This is content authoring only.

---

## 0. Context (read before authoring)

**Course location:** `src/lib/learn/courses/compsci101/`
- `week1.ts` … `week10.ts` — existing teaching modules (slug `week-1` … `week-10`, `section: 'Week N'`).
- `index.ts` — registers modules in `MODULES[]` and exports `getModule(slug)`.
- `authoring.ts` — **use these helpers; do not hand-write Question objects.**

**Authoring helpers (`authoring.ts`) — already implemented:**
- `cr(id, prompt, starterCode, gradeMode, testCases, explanation)` → a `code-runner` question. `gradeMode` is `'stdout' | 'function'`.
- `mc(id, prompt, choices[], correctAnswer, explanation)` → multiple-choice.
- `tf(id, prompt, 'true'|'false', explanation)` → true/false.
- `fib(id, prompt, correctAnswer, explanation)` → fill-in-blank.
- `stdoutCases(samples[], hidden[])` — samples have `{id, description, stdin?, expectedStdout}`, hidden have `{id, stdin?, expectedStdout}` (auto-flagged hidden).
- `funcCases(funcName, samples[], hidden[])` — samples `{id, description, args[], expectedReturn}`, hidden `{id, args[], expectedReturn}`.

**How exams already work (no code changes needed):** `src/components/learn/QuizView.tsx` reads `mod.isMidterm`.
When `true` it runs `isExam` mode: a countdown timer (`EXAM_DURATION_MS`, persisted in localStorage so
navigation preserves it), suppressed answer reveal until finish, and a final score. **A "test" is simply a
`Module` with `isMidterm: true`.** Backend grading of `code-runner` questions already works via
`/api/run-python-tests`.

---

## Locked Decisions (from the owner — do not change)
1. **Delivery:** ten separate test modules `test1.ts … test10.ts`, each `isMidterm: true`, each slotted
   in `index.ts` **immediately after its matching week** (week1, test1, week2, test2, …).
2. **Length:** **5–6 questions per test, ~20 min.** Mostly harder coding (4–5 `cr`) + 1–2 concept (`mc`/`tf`/`fib`).
3. **No gating.** Tests are optional; do not add unlock/threshold logic. No component edits.
4. **Week 1 install guide** = a NEW first lesson inside `week1.ts` (NOT in the test).

---

## Design principles — these tests must TEACH, not just assess
Calibrate every test against its week (titles + drilled functions listed in §3). For each test:
- **Synthesis over recall:** each coding question combines ≥2 concepts from that week (e.g. nested `if`
  + boolean logic, or slicing + a loop), harder than the week's scaffolded practice.
- **Fewer visible, more hidden:** **1 visible sample + 3–5 hidden cases.** Hidden cases must include the
  real edge cases — empty string/list, `0`, negatives, duplicates, single element, boundary values.
  Students should reason about edges rather than pattern-match the sample.
- **Match the week's grade mode:** stdout-heavy weeks (1–2) → `stdout`; function-heavy weeks (5–10) →
  `function`; mixed weeks (3–4) → mix. (See each week's existing ratio in §3.)
- **One transfer question per test:** apply the week's skill to a slightly novel scenario (mild stretch).
- **Rich explanations:** every question's `explanation` includes the model solution AND the *why*, so a
  failed test becomes a lesson on review. This is the core learning mechanism given there's no gating.
- **Difficulty ramp:** order questions easy → hard within the test.

---

## Phase A — Week 1 install lesson (`week1.ts`)
- [ ] **A1.** Add a new FIRST lesson to `week1.lessons` (before `lesson-w1-1` "What Is an Algorithm?"),
  id `lesson-w1-0`, title **"Set Up Python on Your Computer"**. Match the existing lesson `content`
  markdown style (headings, bullet lists, fenced code).
- [ ] **A2.** Content must cover:
  - Download from python.org (latest 3.x); on **Windows** check "Add Python to PATH" in the installer.
  - **macOS**: installer from python.org (note system `python` may be old; use `python3`).
  - **Linux**: usually preinstalled; otherwise `sudo apt install python3` (Debian/Ubuntu).
  - **Verify install:** open a terminal/Command Prompt and run `python --version` (or `python3 --version`);
    expect `Python 3.x.x`.
  - **Run a file:** create `hello.py` with `print("Hello, Python!")`, run `python hello.py`.
  - Mention IDLE (ships with Python) and that this site's in-browser runner means they can practice even
    before a local install works.
- [ ] **A3.** Add 1–2 `codeExamples` (e.g. the `hello.py` one-liner) with `editable: true`, matching the style.
- [ ] **A4.** Do not renumber the other lessons' ids; just prepend the new one.

---

## Phase B — Create the 10 test modules

For each week N (1–10): create `testN.ts`. Copy the exact object shape from `week1.ts` (imports from
`./authoring`, `Module` type) and set:
- [ ] `id: 'test-N'`, `slug: 'test-N'`, `section: 'Week N'` (groups it under the same week divider).
- [ ] `title: 'Week N Test — <week topic>'`, a one-line `description`, an `icon` (e.g. 📝) and a `color`.
- [ ] **`isMidterm: true`** (this enables the timer + exam UX).
- [ ] `locked: false`.
- [ ] `lessons: []` (a test has no lessons — straight to questions). Confirm the course page renders a
  lessons-empty module cleanly; if not, add a single short "Instructions" lesson.
- [ ] `questions: [ ... ]` — 5–6 questions per §2 and the per-week designs in §3.
- [ ] `export default testN;`

Use **fresh question ids** namespaced `tN-q1 … tN-q6` and fresh test-case ids (`s1`, `h1`, `h2`, …).

---

## Phase C — Register in `index.ts`
- [ ] Import `test1 … test10`.
- [ ] Order `MODULES[]` as: `week1, test1, week2, test2, … week10, test10`.
- [ ] Keep `getAllModules` / `getModule` untouched.

---

## Phase D — Verify
- [ ] `npx tsc --noEmit` clean (or repo typecheck).
- [ ] `next build` passes.
- [ ] In the browser: open one test module, confirm the **timer appears** (isMidterm path) and a coding
  question can be submitted and graded by the backend (pass + fail). Confirm answer reveal is suppressed
  until the exam is finished.
- [ ] Confirm teaching weeks still render normally and the leetcode/python101 courses are untouched.

---

## §3 — Per-week test designs (calibrated to existing content)

> Each: 4–5 coding (`cr`) + 1–2 concept. 1 visible sample + 3–5 hidden (with edge cases). Mode noted.
> The "drilled funcs" are the real function names that week's practice uses — pick *adjacent, harder*
> tasks, don't just reuse them verbatim.

### Test 1 — Foundations & Simple Data (week1: print, literals, expressions, variables, errors) — **stdout**
- Q1 (cr/stdout): print result of a multi-operator expression e.g. `(7 + 3) * 4 - 5` → `35`. Hidden: vary nothing (stdout is fixed) but include `//` and `%` variants as separate cases is N/A — instead test a 2nd expression question.
- Q2 (cr/stdout): variables `a,b,c`, print `a*b + c` style combo on one line.
- Q3 (cr/stdout): print 3 specific lines combining a string + an int expression (e.g. `Total: 50`).
- Q4 (cr/stdout): floor division vs true division — print both `17 // 5` and `17 / 5` (lines `3` and `3.4`).
- Q5 (mc): identify which line raises a **syntax** vs **runtime** error (uses the week's error lesson).
- Q6 (tf or fib): assignment `=` vs equality `==` distinction.

### Test 2 — Input & Output, Types (week2: input, int/float/str, numbers, f-strings, comments) — **stdout + stdin**
- Q1 (cr/stdout+stdin): read a name with `input()`, print `Hello, <name>!`. Sample stdin `Ada` → `Hello, Ada!`; hidden: empty-ish, spaces, other names.
- Q2 (cr/stdout+stdin): read an int, print its square. Hidden: `0`, negative, large.
- Q3 (cr/stdout+stdin): read two ints on two lines, print sum with an f-string `Sum: N`.
- Q4 (cr/stdout+stdin): read a float price + int qty, print total to 2 dp via f-string. Hidden: rounding edge.
- Q5 (mc): result type of `10 / 2` vs `10 // 2` vs `int("5")` — type conversion concept.
- Q6 (cr/stdout): f-string formatting a computed value.

### Test 3 — Conditions (week3: if/elif/else, booleans, logical ops, chaining, floats, nested) — **mix**
- Q1 (cr/function): `grade(score)` → letter grade via if/elif chain. Hidden: boundary scores (89/90), 0, 100.
- Q2 (cr/function): `in_range(n, lo, hi)` using comparison chaining → bool. Hidden: equal-to-bounds, out.
- Q3 (cr/function): `classify(n)` nested conditions (negative/zero/positive AND even/odd). Hidden: 0, -2, 1.
- Q4 (cr/function): a boolean-logic predicate combining `and`/`or`/`not`. Hidden: all truth-table corners.
- Q5 (cr/stdout): tiny program reading input then branching (transfer).
- Q6 (mc): short-circuit / operator-precedence or float-equality pitfall question.

### Test 4 — while Loops (week4: while, accumulators, sentinel, validation) — **mix**
- Q1 (cr/function): `sum_to(n)` accumulate 1..n with a while loop. Hidden: 0, 1, large.
- Q2 (cr/function): `count_digits(n)` via repeated `//10`. Hidden: 0, single digit, negative (define behavior).
- Q3 (cr/function): `first_power_over(limit)` — loop doubling until exceeding limit (transfer/sentinel idea).
- Q4 (cr/stdout+stdin): sentinel loop — read numbers until `0`, print their sum.
- Q5 (cr/function): input-validation-style clamp/retry logic expressed as a pure function.
- Q6 (tf/mc): infinite-loop / off-by-one pitfall concept.

### Test 5 — Sequences: Strings & Lists (week5: indexing, slicing, substrings, sublists, mutability) — **function**
Drilled funcs incl: `char_at, slice_word, reverse_string, first_n, last_k, sublist, count_char, has_substring, list_sum, append_copy`.
- Q1 (cr/function): `middle_char(s)` (return middle char, or two for even). Hidden: len 1, 2, empty.
- Q2 (cr/function): `every_other(s)` slicing `s[::2]`. Hidden: empty, len 1.
- Q3 (cr/function): `without_first_last(seq)` slicing works on str AND list. Hidden: len 0/1/2.
- Q4 (cr/function): `count_char(s, ch)` without `.count` (loop). Hidden: not present, all same, empty.
- Q5 (cr/function): `is_palindrome(s)` via slicing (transfer). Hidden: empty, single, even/odd palindromes.
- Q6 (mc): mutable vs immutable — what happens when you try to assign `s[0] = 'x'` on a string vs list.

### Test 6 — String & List Methods (week6: upper/lower, split/join, replace/find, append/extend/pop, sort/count) — **function**
- Q1 (cr/function): `title_case(s)` using split/join (no `.title`). Hidden: empty, single word, extra spaces.
- Q2 (cr/function): `csv_to_list(s)` split on commas, strip spaces. Hidden: trailing comma, empty.
- Q3 (cr/function): `replace_all(s, a, b)` then return; or count occurrences via find loop. Hidden: overlap, absent.
- Q4 (cr/function): `merge_sorted_unique(xs, ys)` extend + sort + dedupe (transfer). Hidden: empties, dups.
- Q5 (cr/function): `most_frequent_word(s)` (split + count). Hidden: tie, single word.
- Q6 (mc): which method mutates in place vs returns new (`.sort()` vs `sorted()`, `.append` vs `+`).

### Test 7 — for Loops & range() (week7: for over str/list, text processing, range 1/2/3 args) — **mix (function-leaning)**
- Q1 (cr/function): `sum_range(a, b)` using `range(a, b)`. Hidden: a==b (empty), single, reversed (define).
- Q2 (cr/function): `count_vowels(s)` for-loop. Hidden: empty, no vowels, all vowels, mixed case.
- Q3 (cr/function): `evens_up_to(n)` using `range(0, n, 2)` → list. Hidden: 0, 1, odd n.
- Q4 (cr/function): `word_count(s)` (split + len, but implement via loop). Hidden: empty, multiple spaces.
- Q5 (cr/stdout): print a small multiplication-table row using a for loop (transfer).
- Q6 (mc/fib): what does `range(2, 10, 3)` produce / off-by-one on `range`.

### Test 8 — Functions (week8: define/call, params, return, decomposition, Tic-Tac-Toe helpers) — **function**
Drilled funcs incl: `add, max_of_two, clamp, is_even, is_divisible, count_digits, rectangle_area, is_winning_row, is_full, format_score`.
- Q1 (cr/function): `clamp(n, lo, hi)`. Hidden: below/within/above, n==bounds.
- Q2 (cr/function): `is_leap_year(y)` (decomposition of boolean rule). Hidden: 2000, 1900, 2024, 2023.
- Q3 (cr/function): `is_winning_row(row)` for 3-cell tic-tac-toe row (reuse week's domain). Hidden: empty cells, mixed, all-X, all-O.
- Q4 (cr/function): `apply_discount(price, pct)` returning rounded value (params + return). Hidden: 0%, 100%, rounding.
- Q5 (cr/function): a function that CALLS a helper you also define (decomposition/transfer), e.g. `score_board(board)` using `is_winning_row`.
- Q6 (mc): return vs print — what a function that only prints returns (`None`).

### Test 9 — Tuples & Files (week9: tuples, multiple assignment, lists of tuples, read/write files) — **function**
- Q1 (cr/function): `swap(a, b)` returning a tuple `(b, a)`. Hidden: equal, negatives, strings.
- Q2 (cr/function): `min_max(nums)` returning a tuple `(min, max)`. Hidden: single, all equal, negatives.
- Q3 (cr/function): `total_price(items)` where items is a list of `(name, price)` tuples. Hidden: empty, one.
- Q4 (cr/function): `sort_by_second(pairs)` — sort list of tuples by 2nd element. Hidden: ties, empty.
- Q5 (cr/function): `count_lines(text)` simulating file-content processing on a multiline string (transfer; avoids real file I/O in tests). Hidden: empty, trailing newline.
- Q6 (tf/mc): tuple immutability / multiple-assignment unpacking concept.

### Test 10 — Dictionaries & Nested Loops (week10: dict CRUD, iterate, frequency, 2D grids) — **function**
Drilled funcs incl: `make_dict, get_or_zero, freq_count, most_common, invert_dict, merge_counts, grid_sum, row_sums, col_sums, get_cell, flatten`.
- Q1 (cr/function): `freq_count(s)` → dict of char→count. Hidden: empty, all same, mixed.
- Q2 (cr/function): `most_common(s)` → the most frequent char (define tie rule). Hidden: tie, single.
- Q3 (cr/function): `invert_dict(d)` swap keys/values. Hidden: empty, value collisions (define), one entry.
- Q4 (cr/function): `grid_sum(grid)` sum a 2D list via nested loops. Hidden: empty, 1x1, jagged-or-not (define).
- Q5 (cr/function): `column_sums(grid)` → list of per-column totals (transfer, nested loops). Hidden: single row/col.
- Q6 (mc): iterating `.items()` vs `.keys()` vs `.values()` — what each yields.

---

## §4 — Authoring rules (apply to every coding question)
- Function-mode `starterCode` MUST define the exact `funcName` the test cases call (a stub with `pass` or `# TODO`).
- For stdout-mode with input, sample `expectedStdout` must match `print()` output exactly (mind trailing newline/spaces).
- Define behavior for edge inputs in the `prompt` when ambiguous (e.g. "for an empty list return 0", tie rules).
- `expectedReturn` types must be JSON-serializable (numbers, strings, bools, lists, dicts, nested) — the
  route encodes args/expected as JSON. Tuples returned by student code compare against a list `expectedReturn`
  only if the runner coerces — **verify tuple handling in `/api/run-python-tests` before relying on it; if it
  doesn't coerce, have the function return a list, or note the tuple expectation explicitly.**
- Keep each test self-contained: no dependency on files on disk (use string inputs to simulate file content).

## §5 — Open items to confirm with the owner (don't guess)
- Whether an empty `lessons: []` renders acceptably for a test module, or each test needs a short
  "Instructions" lesson (check the course page component before mass-producing — fix once, apply to all 10).
- The exam timer is a fixed `EXAM_DURATION_MS` in `QuizView.tsx`. The owner asked for ~20 min tests but
  the timer is global. Confirm whether 20 min is acceptable as-is or the timer should be per-module
  (would require a small `QuizView` change — out of scope unless approved).
- Tie-break / edge-case behavior choices in Q designs above (e.g. `most_common` ties) — pick sensible
  defaults and state them in the prompt; flag if the owner wants specific rules.
