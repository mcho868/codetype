# intermediate-tasks.md — Rework "Python Intermediate" into a CodeRunner-style course

> **For the executing agent.** This converts the **Python Intermediate** course to the same
> backend-graded, mostly-coding, sequential format we built for Python Essentials (compsci101).
> Follow phases in order. Build the engine + ONE reference module first, get it reviewed, then roll out.
> Do not transcribe blindly — open each cited file and copy real patterns.

---

## 0. Context — read before touching anything

**Where the content lives (important):** The registry course `python-intermediate` has **no content of
its own** — `src/lib/learn/courses/python-intermediate/index.ts` re-exports **`python130`'s** non-midterm
modules, renames them "Week N", and sets `locked: true`. So **all real editing happens in
`src/lib/learn/courses/python130/`** (module0–module10, midterm1–3). Changes there flow through to
Python Intermediate automatically.

**Curriculum (python130 module order — this IS the teaching sequence):**
| # | Module | Lessons |
|---|--------|---------|
| 0 | Testing & Exceptions | Exception Handling · Types & Hierarchy · Unit Testing |
| 1 | Algorithm Complexity | Big-O · Analysing Code · Space Complexity |
| 2 | Sorting & Searching | Linear/Binary Search · Selection/Bubble · Insertion · Merge |
| 3 | Classes & Objects | Defining Classes · Methods & Special Methods · Encapsulation |
| 4 | Stacks & Queues | Stack ADT · Queue ADT · Circular Queue |
| 5 | Recursion | What is Recursion · Tracing · Recursion vs Iteration |
| 6 | Linked Lists | Node Class · Core Operations · Remove |
| 7 | Binary Trees | Concepts · Implementation · Traversal |
| 8 | Binary Search Trees | BST Property · Search & Insert · Traversal & Deletion |
| 9 | Hash Tables | Concepts · Hash Functions · Collision Resolution |
| 10 | Priority Queues & Heaps | PQ ADT · Binary Heap · Implementation |

**Current question state (the gap to close):** modules use the OLD types only —
- `code-challenge` (client-side Pyodide, graded by `expectedOutput` exact-string match, single hidden answer), and
- `multiple-choice` / `true-false` / `fill-in-blank`.
There are **47 `code-challenge` questions** total. The course does **NOT** use the new `code-runner`
(backend hidden test cases). Counts per module today (approx): mostly 1–3 coding + ~10 concept Qs each,
EXCEPT the data-structure modules 6–10 which already have ~7 coding each.

**Key files:**
- `src/lib/learn/courses/python130/types.ts` — python130's local types. **Does NOT define `code-runner`,
  `TestCase`, `gradeMode`, `testCases`, `fileName`/`fileContent`.**
- `src/lib/learn/courses/python101/types.ts` — the SHARED types that DO define all of the above (used by
  Essentials). 
- `src/lib/learn/courses/compsci101/authoring.ts` — the proven helper set: `cr`, `mc`, `tf`, `fib`,
  `funcCases`, `stdoutCases`, `fileCases`. Copy this pattern.
- `src/app/api/run-python-tests/route.ts` — the backend grader (function/stdout modes, per-case file).
- `src/components/learn/CodeRunnerCard.tsx` — renders/grades `code-runner` (admin "model solution"
  button, per-attempt draft, sample-file download). Already supports everything needed.
- `src/components/learn/QuestionCard.tsx` — routes question types to renderers.

---

## Locked decisions / principles
1. **Convert `code-challenge` → `code-runner`** with backend hidden test cases (function mode preferred
   for these algorithm/DS questions; stdout mode only where the task is genuinely about printed output).
2. **Mostly coding.** Keep enough concept Qs (mc/tf/fib) to check understanding, but the bulk should be
   `code-runner`. Target per module: **~10–14 questions, ≥60% coding.**
3. **Sequential — only use what's already taught.** This course **assumes Python Essentials** (variables,
   types, control flow, loops, strings/lists/tuples/dicts, functions, files, comprehensions). On top of
   that, within Intermediate a module may only rely on concepts from itself or EARLIER intermediate
   modules. Examples of the rule:
   - Module 0–2 may use functions/loops/lists/dicts (Essentials) but NOT classes (taught module 3).
   - `try/except` is available from module 0 on; Big-O *notation* from module 1; etc.
   - Classes/`__init__`/methods only from module 3 onward. So Stacks/Queues (4), Linked Lists (6),
     Trees (7+) — which need classes — are correctly after module 3. Verify each question respects this.
   - Recursion only from module 5 — do not write recursive solutions in modules 0–4.
4. **No teaching-ahead inside a question’s model solution either** (same rule we enforced in Essentials).
5. **Tests/midterms must not duplicate the practice questions** (same overlap rule as Essentials).

---

## Phase A — Engine setup (do once, first)

- [ ] **A1. Unify the types.** python130 must use the shared `code-runner`-capable types. Options (pick one,
  prefer the first): **(a)** change python130 files to `import type { Module, Question, ... } from
  '../python101/types'` (delete/forward python130/types.ts), OR **(b)** copy the missing definitions
  (`code-runner` in QuestionType, `TestCase`, `gradeMode`, `testCases`, `fileName`, `fileContent`) into
  python130/types.ts. Verify `tsc --noEmit` clean either way.
- [ ] **A2. Add an authoring helper module** `src/lib/learn/courses/python130/authoring.ts` mirroring
  compsci101/authoring.ts (`cr`, `mc`, `tf`, `fib`, `funcCases`, `stdoutCases`). These DS questions also
  need class/object testing — see A3.
- [ ] **A3. Class-based grading.** Many questions define a CLASS (Stack, LinkedList, BST, MinHeap, …) and
  must be graded by exercising methods, not a single return. The current `run-python-tests` function mode
  calls `solution.funcName(*args)`. For classes, add a **driver** pattern: each test case provides a small
  Python **driver snippet** that the student's class must satisfy, OR extend the harness to support a
  `gradeMode: 'function'` case whose `funcName` is a top-level harness function the question author writes.
  RECOMMENDED minimal approach: keep function mode, and for class questions have the student implement the
  class PLUS the test cases call a top-level **driver function** the prompt asks them to leave as-is in the
  starter (e.g. `def run_ops(ops): st = Stack(); ...; return result`). Confirm with the owner which
  approach before building (this is the one real new capability vs Essentials).
- [ ] **A4. Verify the unlock/lock + registry.** python-intermediate sets `locked: true` on every module.
  Decide whether Intermediate modules should be unlocked for students (mirror Essentials) — confirm with
  owner. Do NOT change `isMidterm` handling.

**Verify A:** build a throwaway `code-runner` question in module0, run it through the browser
(Run + Submit), confirm backend grading works for this course's registry path.

---

## Phase B — Reference module (module 0: Testing & Exceptions) FIRST

Author module 0 fully in the new format as the template, get it reviewed, THEN roll out 1–10.

Module 0 today: 11 concept Qs (mc/tf/fib) + 2 code-challenge (`safe_divide`, `parse_int`).
Target: keep ~6 best concept Qs, convert the 2 coding to `code-runner` function mode, ADD ~4 new coding
Qs so coding is the majority. Per-question spec:

- [ ] **m0-c1 `safe_divide(a, b)`** (function mode). Returns `a/b`, or `0` when `b == 0` (try/except
  ZeroDivisionError). Cases: `(10,2)->5.0`, `(9,3)->3.0`, hidden `(5,0)->0`, `(0,5)->0.0`, `(-10,2)->-5.0`,
  `(7,0)->0`. (Note `5.0 == 5` under Python `==`, fine.)
- [ ] **m0-c2 `parse_int(s)`** (function). int(s) or `-1` on ValueError. Cases: `"42"->42`, `"hello"->-1`,
  hidden `"0"->0`, `"-7"->-7`, `"3.5"->-1`, `""->-1`.
- [ ] **m0-c3 `safe_get(lst, i)`** (function, NEW). Return `lst[i]`, or `None` on IndexError. Cases cover
  valid index, out-of-range, negative index, empty list. Teaches IndexError handling.
- [ ] **m0-c4 `lookup(d, key)`** (function, NEW). Return `d[key]`, or the string `"missing"` on KeyError.
  Cases: present key, absent key, empty dict.
- [ ] **m0-c5 `validate_age(age)`** (function, NEW). `raise ValueError` if age < 0 or > 150, else return
  age. Grade by a driver that calls it in try/except and returns `"ok:<age>"` or `"error"`. (Tests `raise`.)
- [ ] **m0-c6 `count_passes(results)`** (function, NEW, light). Given a list of ints, return how many are
  `>= 50` — a simple Essentials-level warmup that also lets students write an `assert`-style check.
- [ ] **Concept Qs to keep (trim 11→~5):** q0-1 (try/except flow), q0-2 (ValueError), q0-3 (finally always
  runs), q0-7 (Exception base catches subclasses), q0-9 (edge case meaning). Drop near-duplicates
  (q0-8 IndexError MCQ overlaps c3; q0-10/q0-11 trivial). Keep at most 5.

**Verify B:** every model solution passes its cases (run in Python the same way we did for Essentials —
function mode: `actual == expected`). tsc clean. No concept-Q duplicates of the coding tasks.

---

## Phase C — Roll out modules 1–10 (same recipe per module)

For EACH module: convert its `code-challenge` → `code-runner` (function mode), keep/trim concept Qs to the
best ~4–5 non-overlapping ones, add coding Qs so coding is the majority, respect the sequencing rule.
Below: the coding questions to (re)build per module. (Open each module file for the exact current prompts;
these are the target function specs.)

### Module 1 — Algorithm Complexity
Concept-heavy by nature. Keep the strongest ~6 MCQs on Big-O classification. Coding (function mode,
**no recursion/classes**):
- [ ] `count_pairs(n)` → return number of times the inner statement runs in a nested loop `for i in range(n): for j in range(n)` (i.e. `n*n`); teaches O(n²) by measuring.
- [ ] `linear_max(lst)` → return the max via a single loop (O(n)); empty list → `None`.
- [ ] `has_duplicate(lst)` → `True/False` using a set (O(n)); contrast with the nested-loop version in the lesson.
- [ ] `constant_first(lst)` → return `lst[0]` if non-empty else `None` (O(1) illustration).
Concept Qs: keep classification MCQs; ensure none just re-ask what a coding Q demonstrates.

### Module 2 — Sorting & Searching
Coding (function mode; loops/lists only — **no recursion except merge sort which IS this module's topic**):
- [ ] `linear_search(lst, target)` → index or `-1`.
- [ ] `binary_search(sorted_lst, target)` → index or `-1` (iterative).
- [ ] `bubble_sort(lst)` → return a NEW sorted list (don't mutate input); cover empty, 1-elem, dups, reverse.
- [ ] `selection_sort(lst)` → new sorted list.
- [ ] `insertion_sort(lst)` → new sorted list.
- [ ] `merge(a, b)` → merge two sorted lists into one sorted list (the merge step; recursion lesson is here so full `merge_sort` is allowed as a stretch coding Q).
Tests should include already-sorted, reverse-sorted, duplicates, empty.

### Module 3 — Classes & Objects  (classes FIRST become available here)
Coding (function mode + class driver per A3):
- [ ] `Rectangle` class: `__init__(w,h)`, `area()`, `perimeter()`. Driver builds one and returns a tuple/list of results.
- [ ] `BankAccount`: `__init__(balance=0)`, `deposit(x)`, `withdraw(x)` (raise/guard on overdraft), `get_balance()`.
- [ ] `Counter`: `__init__()`, `increment()`, `count` attr; plus `__str__` returning `"Count: N"` (special methods lesson).
- [ ] `Point` with `__eq__` and `__str__` — teaches special methods; driver compares two points.
Concept Qs: keep MCQs on `self`, `__init__`, encapsulation; drop any the coding Qs already cover.

### Module 4 — Stacks & Queues  (uses classes from m3, lists)
- [ ] `Stack` class: `push`, `pop`, `peek`, `is_empty`, `size` (list-backed). Driver runs an op sequence.
- [ ] `Queue` class: `enqueue`, `dequeue`, `is_empty`, `size`.
- [ ] `is_balanced(s)` (function) → check balanced brackets using a stack — classic application.
- [ ] `CircularQueue(capacity)` — the module's advanced topic; enqueue/dequeue with wraparound.

### Module 5 — Recursion  (recursion FIRST fully here)
- [ ] `factorial(n)` recursive.
- [ ] `fib(n)` recursive (define n≥0; fib(0)=0, fib(1)=1).
- [ ] `sum_list(lst)` recursive.
- [ ] `power(base, exp)` recursive (exp≥0).
- [ ] `reverse_string(s)` recursive.
- [ ] `count_down(n)` returns list `[n, n-1, ..., 1]` recursively (or stdout) — tracing practice.

### Module 6 — Linked Lists  (already 7 code-challenge — convert each to code-runner)
Convert existing: `Node`+`LinkedList` with `add`(front)/`size`/`search`; `append`+`to_list`;
`count_nodes(head)`; plus reverse, find-middle, remove. Drivers exercise the class; cover empty list,
single node, not-found.

### Module 7 — Binary Trees  (convert existing 7)
`Node`/`BinaryTree`; build a tree; `height`, `count_nodes`, `pre/in/post-order` traversals returning lists.
Drivers build a known tree and assert traversal order.

### Module 8 — Binary Search Trees  (convert existing 7)
`BST` with `insert`, `search`→bool, `in_order`→sorted list, `find_min`, delete. Cases: insert sequence then
assert in-order is sorted; search hit/miss; empty tree.

### Module 9 — Hash Tables  (convert existing 7)
`hash_string(s, size)` function; `HashTable` with `put`/`get`/`contains`, collision handling (chaining).
Cases: put/get round-trip, missing key, collisions forced by small size, overwrite existing key.

### Module 10 — Priority Queues & Heaps  (convert existing ~6)
`MinHeap` with `insert`, `peek_min`, `extract_min`, `size`; maybe `heapify(list)`. Cases: insert sequence
then repeated extract_min yields ascending order; peek doesn't remove; empty behavior.

---

## Phase D — Per-module tests (DECIDED: mirror Python Essentials)

Today Python Intermediate exposes **only the 11 module quizzes** — `python-intermediate/index.ts` does
`.filter((module) => !module.isMidterm)`, so python130's 3 midterms are stripped out entirely. There are
**no per-module tests**. The owner chose: **add a paired TEST for each of the 11 modules**, exactly like
Essentials' week/test pairing.

- [ ] **D1. Create 11 test modules** in `python130/` (e.g. `test0.ts … test10.ts`), each
  `isMidterm: true`, `lessons: []`, **5–6 questions, mostly `code-runner`**, calibrated to that module's
  topic but **HARDER / transfer-level** — NOT copies of the module's quiz questions. (Same standard we
  used for compsci101 tests.)
- [ ] **D2. Register + pair them** in `python130/index.ts` so each test follows its module
  (module0, test0, module1, test1, …). NOTE: a test slug must survive the python-intermediate wrapper's
  "Week N" renaming — check how the wrapper maps slugs/titles and make tests appear as e.g.
  "Week N Test". The wrapper currently FILTERS OUT `isMidterm` modules — **change the wrapper so it keeps
  the per-module tests** (they need `isMidterm: true` for the timed-exam UX in QuizView, but must NOT be
  filtered out). Reconcile this: the filter was there to drop the 3 OLD midterms — either delete those 3
  old midterms, or filter only by name, so the new per-module tests pass through.
- [ ] **D3. The 3 old midterms (midterm1–3):** with per-module tests replacing them, decide whether to
  delete them or convert+keep as extra cumulative exams. Default: delete to avoid confusion (confirm).
- [ ] **D4. Overlap rule:** each test's questions must NOT duplicate its module's quiz (by function
  name AND by concept) — run the same week-vs-test overlap check we used for Essentials.
- [ ] **D5. Sequencing still applies:** a test may only use concepts from its module or earlier.

Per-module test focus (harder than the quiz; design question-by-question like Phase B/C):
| Module | Test focus (transfer, not repeats) |
|--------|-----------------------------------|
| 0 Exceptions | multi-except dispatch; custom `raise` + driver; nested try/finally behavior |
| 1 Complexity | classify a given snippet's Big-O (mc) + implement an O(n) replacement for an O(n²) function |
| 2 Sorting | full `merge_sort`; "is this list sorted?"; binary search on edge inputs |
| 3 Classes | a small multi-method class with `__eq__`/`__str__`; composition (a class holding another) |
| 4 Stacks/Queues | evaluate postfix / balanced-brackets with a stack; queue-based task simulation |
| 5 Recursion | recursive `count` over nested structure; `gcd`; palindrome check recursively |
| 6 Linked Lists | reverse a list; detect/remove by value; nth-from-end |
| 7 Binary Trees | tree height + level-count; build from traversal; mirror a tree |
| 8 BST | range-query; validate-is-BST; kth-smallest via in-order |
| 9 Hash Tables | implement a small set via chaining; word-frequency using your HashTable |
| 10 Heaps | k-smallest using a heap; heap-sort; is-valid-min-heap check |

## Phase E — Verify & wire-up
- [ ] Every model solution passes its own test cases (run via Python, function mode `actual == expected`;
  watch the known traps: tuple≠list, dict numeric keys become strings under JSON, float formatting).
- [ ] No question uses a concept taught in a LATER module (sequencing scan).
- [ ] No test/midterm question duplicates a practice question.
- [ ] `next build` + `tsc --noEmit` clean.
- [ ] Spot-check one coding question per module in the browser (Run + Submit, pass & fail paths).
- [ ] Confirm Python Intermediate (the wrapper) reflects all changes; decide locked/unlocked with owner.

## Open items to confirm with the owner (don't guess)
- **A3 class-grading approach** (driver function vs harness extension) — the one genuinely new capability.
- Whether to **unlock** Intermediate modules for students (currently all `locked: true`).
- **D3:** delete the 3 old midterms, or convert+keep them as extra cumulative exams (default: delete).
- Final per-module question counts and how aggressively to trim concept Qs.

## Decided
- **Test structure:** per-module tests (11), paired with each module quiz — mirrors Python Essentials.
