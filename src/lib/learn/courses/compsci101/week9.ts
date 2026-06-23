import type { Module } from '../python101/types';
import { cr, mc, tf, fib, funcCases, stdoutCases, fileCases } from './authoring';
import { SAMPLE_FILES } from '../../sampleFiles';

const week9: Module = {
  id: 'week-9',
  slug: 'week-9',
  title: 'Tuples & Files',
  description:
    'Work with immutable tuples, multiple assignment, lists of tuples for structured data, and read, write, and append text files (simulated via string parameters in exercises).',
  icon: '📁',
  color: 'from-teal-500 to-cyan-400',
  locked: false,
  section: 'Week 9',
  lessons: [
    {
      id: 'lesson-w9-1',
      title: 'Tuples',
      content: `A **tuple** is an ordered, **immutable** sequence — like a list that cannot be changed after creation.

\`\`\`python
point = (3, 4)
rgb = (255, 128, 0)
single = (42,)   # note the comma for a 1-tuple
\`\`\`

**Create with parentheses** (or just commas): \`(1, 2, 3)\` or \`1, 2, 3\`.

**Why tuples?**
- Fixed-size records (x, y coordinates; RGB color)
- Safe as dictionary keys (lists cannot be keys)
- Returning multiple values from a function

Access with indexing and slicing like lists, but **no** \`.append()\`, \`.sort()\`, or item assignment.`,
      codeExamples: [
        {
          language: 'python',
          code: `t = (10, 20, 30)
print(t[0])      # 10
print(t[-1])     # 30
print(len(t))    # 3

# t[0] = 99  # TypeError — tuples are immutable`,
          caption: 'Index and length work like lists',
          editable: true,
        },
        {
          language: 'python',
          code: `def min_max(nums):
    return min(nums), max(nums)

lo, hi = min_max([3, 1, 4, 1, 5])
print(lo, hi)  # 1 5`,
          caption: 'Return a tuple of two values',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w9-2',
      title: 'Multiple Assignment',
      content: `Python can assign **multiple variables at once**:

\`\`\`python
x, y = 1, 2          # x=1, y=2
a, b = b, a          # swap without a temp variable
\`\`\`

**Tuple unpacking** — the right side is a tuple (often written without parentheses):

\`\`\`python
name, age = ("Ada", 36)
first, *rest = [1, 2, 3, 4]   # first=1, rest=[2,3,4]
\`\`\`

Unpacking works in **for loops** over lists of tuples:

\`\`\`python
pairs = [("a", 1), ("b", 2)]
for letter, num in pairs:
    print(letter, num)
\`\`\``,
      codeExamples: [
        {
          language: 'python',
          code: `x = 10
y = 20
x, y = y, x
print(x, y)  # 20 10`,
          caption: 'Swap two variables',
          editable: true,
        },
        {
          language: 'python',
          code: `students = [("Ada", 95), ("Grace", 88), ("Alan", 91)]
for name, score in students:
    print(name, "scored", score)`,
          caption: 'Unpack tuples in a for loop',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w9-3',
      title: 'Lists of Tuples',
      content: `Store **records** as tuples inside a list:

\`\`\`python
inventory = [
    ("apple", 1.20, 50),
    ("banana", 0.80, 120),
]
\`\`\`

Each tuple is one row: name, price, quantity. Loop and unpack to process:

\`\`\`python
for name, price, qty in inventory:
    print(name, price * qty)
\`\`\`

**Sorting** a list of tuples: \`sorted(pairs, key=lambda x: x[1])\` sorts by the second element. For now, focus on accessing by index and unpacking.

Tuples keep each record a fixed shape — good for tables, coordinates, and CSV-like data.`,
      codeExamples: [
        {
          language: 'python',
          code: `cities = [("Auckland", 1.7), ("Wellington", 0.5), ("Christchurch", 0.4)]

total = 0
for name, pop in cities:
    total += pop
print("Total millions:", total)`,
          caption: 'Sum a column from list-of-tuples',
          editable: true,
        },
        {
          language: 'python',
          code: `grades = [("Exam", 85), ("Lab", 92), ("Project", 78)]
best = grades[0]
for item in grades:
    if item[1] > best[1]:
        best = item
print("Best:", best[0], best[1])`,
          caption: 'Find max by second field',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w9-4',
      title: 'Reading & Writing Files',
      content: `Files let programs persist data beyond a single run.

**Read entire file:**
\`\`\`python
with open("data.txt") as f:
    text = f.read()
\`\`\`

**Read line by line:**
\`\`\`python
with open("data.txt") as f:
    for line in f:
        print(line.strip())
\`\`\`

**Write (overwrites):**
\`\`\`python
with open("out.txt", "w") as f:
    f.write("Hello\\n")
\`\`\`

**Append:**
\`\`\`python
with open("log.txt", "a") as f:
    f.write("new entry\\n")
\`\`\`

The \`with\` statement closes the file automatically.

**Try it here:** the code editor below has two sample files ready to open — \`data.txt\` (a list of fruit, one per line) and \`numbers.txt\` (numbers, one per line). Press **Run** on the example below to read \`data.txt\` for real. You can also **download** both files using the links below this lesson to inspect them or use them on your own computer. Any files you *write* (e.g. \`open("out.txt", "w")\`) live in the in-browser sandbox for that run — handy for experimenting, but they are not saved permanently.

For the graded exercises, file content is also passed as a **string parameter** so the logic can be tested without depending on a specific file.`,
      codeExamples: [
        {
          language: 'python',
          code: `# A real file is provided: data.txt (one fruit per line)
with open("data.txt") as f:
    text = f.read()
print(text.strip())

# Read it again, line by line:
with open("data.txt") as f:
    for line in f:
        print("-", line.strip())`,
          caption: 'Read the sample data.txt — press Run',
          editable: true,
        },
        {
          language: 'python',
          code: `# numbers.txt has one number per line — sum them
total = 0
with open("numbers.txt") as f:
    for line in f:
        total += int(line)
print(total)   # 150`,
          caption: 'Read and total numbers.txt — press Run',
          editable: true,
        },
        {
          language: 'python',
          code: `# Simulated: process file content from a string
def line_count(file_content):
    if file_content == "":
        return 0
    return len(file_content.split("\\n"))

print(line_count("a\\nb\\nc"))  # 3`,
          caption: 'Count lines in text (file content as string)',
          editable: true,
        },
        {
          language: 'python',
          code: `def append_line(existing, new_line):
    """Simulate appending a line to a file."""
    if existing and not existing.endswith("\\n"):
        existing += "\\n"
    return existing + new_line + "\\n"

print(repr(append_line("line1\\n", "line2")))`,
          caption: 'Simulate append mode with strings',
          editable: true,
        },
      ],
      attachments: [
        {
          name: 'data.txt',
          content: SAMPLE_FILES['data.txt'],
          description: 'Fruit names, one per line — the same file you can open() in the runner.',
        },
        {
          name: 'numbers.txt',
          content: SAMPLE_FILES['numbers.txt'],
          description: 'Numbers, one per line.',
        },
      ],
    },
  ],
  questions: [
    mc(
      'w9-q1',
      'Which of the following creates a one-element tuple containing the integer 5?',
      [
        { id: 'a', text: '(5)' },
        { id: 'b', text: '(5,)' },
        { id: 'c', text: 'tuple(5)' },
        { id: 'd', text: '[5]' },
      ],
      'b',
      '(5) is just the integer 5 in parentheses. A 1-tuple needs a trailing comma: (5,). [5] is a list.'
    ),

    cr(
      'w9-q2',
      'Implement `tuple_sum(t)` returning the sum of all numbers in tuple `t`.',
      `def tuple_sum(t):
    total = 0
    for x in t:
        total += x
    return total`,
      'function',
      funcCases(
        'tuple_sum',
        [
          { id: 's1', description: 'Three values', args: [[1, 2, 3]], expectedReturn: 6 },
          { id: 's2', description: 'Single value', args: [[10]], expectedReturn: 10 },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: 0 },
          { id: 'h2', args: [[-1, 1]], expectedReturn: 0 },
          { id: 'h3', args: [[5, 5, 5]], expectedReturn: 15 },
          { id: 'h4', args: [[100, -50]], expectedReturn: 50 },
        ]
      ),
      'Model solution:\ndef tuple_sum(t):\n    total = 0\n    for x in t:\n        total += x\n    return total'
    ),

    cr(
      'w9-q3',
      'Read two values `a` (line 1) and `b` (line 2). Build the tuple `(a, b)`, then print the **swapped** tuple `(b, a)`.\n\nExample: input `x` then `y` → output `(\'y\', \'x\')` (values read with `input()` are strings, so they print with quotes).',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Swap x and y', stdin: 'x\ny\n', expectedStdout: "('y', 'x')" },
          { id: 's2', description: 'Two words', stdin: 'apple\nbanana\n', expectedStdout: "('banana', 'apple')" },
        ],
        [
          { id: 'h1', stdin: 'a\na\n', expectedStdout: "('a', 'a')" },
          { id: 'h2', stdin: '1\n2\n', expectedStdout: "('2', '1')" },
          { id: 'h3', stdin: 'hello\nworld\n', expectedStdout: "('world', 'hello')" },
        ]
      ),
      'Model solution:\na = input()\nb = input()\npair = (a, b)\nprint((pair[1], pair[0]))\n\nWhy: `pair = (a, b)` builds a tuple; indexing `pair[1]` and `pair[0]` reads its elements in swapped order. Printing a tuple shows it as `(x, y)`. Note: tuples and lists are different types — a returned tuple is not equal to a list, which is why this exercise prints the tuple rather than returning it for comparison.'
    ),

    cr(
      'w9-q4',
      'Implement `distance(x1, y1, x2, y2)` returning the distance between points `(x1, y1)` and `(x2, y2)`: `((x2-x1)**2 + (y2-y1)**2) ** 0.5`.',
      `def distance(x1, y1, x2, y2):
    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5`,
      'function',
      funcCases(
        'distance',
        [
          { id: 's1', description: 'Unit distance', args: [0, 0, 1, 0], expectedReturn: 1 },
          { id: 's2', description: '3-4-5 triangle', args: [0, 0, 3, 4], expectedReturn: 5 },
        ],
        [
          { id: 'h1', args: [0, 0, 0, 0], expectedReturn: 0 },
          { id: 'h2', args: [1, 1, 1, 1], expectedReturn: 0 },
          { id: 'h3', args: [-1, 0, 1, 0], expectedReturn: 2 },
          { id: 'h4', args: [0, 0, 0, 10], expectedReturn: 10 },
        ]
      ),
      'Model solution:\ndef distance(x1, y1, x2, y2):\n    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5'
    ),

    cr(
      'w9-q5',
      'Implement `unpack_and_add(pair)` where `pair` is `[a, b]` — return `a + b`.',
      `def unpack_and_add(pair):
    a, b = pair
    return a + b`,
      'function',
      funcCases(
        'unpack_and_add',
        [
          { id: 's1', description: 'Small ints', args: [[3, 7]], expectedReturn: 10 },
          { id: 's2', description: 'Negatives', args: [[-2, 5]], expectedReturn: 3 },
        ],
        [
          { id: 'h1', args: [[0, 0]], expectedReturn: 0 },
          { id: 'h2', args: [[100, 200]], expectedReturn: 300 },
          { id: 'h3', args: [[-10, -10]], expectedReturn: -20 },
          { id: 'h4', args: [[1, -1]], expectedReturn: 0 },
        ]
      ),
      'Model solution:\ndef unpack_and_add(pair):\n    a, b = pair\n    return a + b'
    ),

    cr(
      'w9-q6',
      'Implement `total_population(cities)` where `cities` is a list of `[name, population]` pairs. Return the sum of all populations.',
      `def total_population(cities):
    total = 0
    for name, pop in cities:
        total += pop
    return total`,
      'function',
      funcCases(
        'total_population',
        [
          { id: 's1', description: 'Three cities', args: [[['A', 100], ['B', 200], ['C', 50]]], expectedReturn: 350 },
          { id: 's2', description: 'Empty', args: [[]], expectedReturn: 0 },
        ],
        [
          { id: 'h1', args: [[['Solo', 42]]], expectedReturn: 42 },
          { id: 'h2', args: [[['X', 0], ['Y', 0]]], expectedReturn: 0 },
          { id: 'h3', args: [[['A', 1000], ['B', 2000]]], expectedReturn: 3000 },
          { id: 'h4', args: [[['N', -5], ['P', 5]]], expectedReturn: 0 },
        ]
      ),
      'Model solution:\ndef total_population(cities):\n    total = 0\n    for name, pop in cities:\n        total += pop\n    return total'
    ),

    cr(
      'w9-q7',
      'Implement `highest_score(records)` where each record is `[name, score]`. Return the **name** with the highest score (first wins on tie).',
      `def highest_score(records):
    best_name, best_score = records[0]
    for name, score in records:
        if score > best_score:
            best_name, best_score = name, score
    return best_name`,
      'function',
      funcCases(
        'highest_score',
        [
          { id: 's1', description: 'Clear winner', args: [[['Ada', 95], ['Grace', 88], ['Alan', 91]]], expectedReturn: 'Ada' },
          { id: 's2', description: 'Tie — first wins', args: [[['A', 90], ['B', 90]]], expectedReturn: 'A' },
        ],
        [
          { id: 'h1', args: [[['Only', 50]]], expectedReturn: 'Only' },
          { id: 'h2', args: [[['X', 0], ['Y', 100]]], expectedReturn: 'Y' },
          { id: 'h3', args: [[['low', 1], ['high', 99]]], expectedReturn: 'high' },
          { id: 'h4', args: [[['a', 10], ['b', 10], ['c', 5]]], expectedReturn: 'a' },
        ]
      ),
      'Model solution:\ndef highest_score(records):\n    best_name, best_score = records[0]\n    for name, score in records:\n        if score > best_score:\n            best_name, best_score = name, score\n    return best_name'
    ),

    cr(
      'w9-q8',
      'Implement `line_count()` that **opens and reads the file `input.txt`** and returns how many lines it contains. Empty file → **0**. A trailing newline ends the current line without starting a new one (e.g. a file holding `"a\\nb\\n"` has 2 lines, and so does `"a\\nb"`).\n\nThe file is provided automatically when your code runs — just `open("input.txt")` and read it.',
      `def line_count():
    with open("input.txt") as f:
        text = f.read()
    if text == "":
        return 0
    count = text.count("\n")
    if not text.endswith("\n"):
        count += 1
    return count`,
      'function',
      fileCases(
        'line_count',
        [
          { id: 's1', description: 'Three lines, no trailing newline', fileContent: 'a\nb\nc', expectedReturn: 3 },
          { id: 's2', description: 'Empty file', fileContent: '', expectedReturn: 0 },
        ],
        [
          { id: 'h1', fileContent: 'single', expectedReturn: 1 },
          { id: 'h2', fileContent: 'a\nb\n', expectedReturn: 2 },
          { id: 'h3', fileContent: 'one\n', expectedReturn: 1 },
          { id: 'h4', fileContent: 'x\ny\nz\nw\n', expectedReturn: 4 },
        ]
      ),
      'Model solution:\ndef line_count():\n    with open("input.txt") as f:\n        text = f.read()\n    if text == "":\n        return 0\n    count = text.count("\\n")\n    if not text.endswith("\\n"):\n        count += 1\n    return count\n\nWhy: `open(...).read()` reads the whole file into a string. Each `\\n` ends a line; if the text does not end in `\\n`, add 1 for the final line. Splitting on `\\n` would wrongly count the empty piece after a trailing newline.'
    ),

    cr(
      'w9-q9',
      'Implement `read_lines()` that **opens and reads `input.txt`** and returns a **list of its lines** without trailing newline characters. Empty file → `[]`.\n\nThe file is provided automatically when your code runs.',
      `def read_lines():
    with open("input.txt") as f:
        text = f.read()
    if text == "":
        return []
    lines = text.split("\n")
    if lines and lines[-1] == "":
        lines = lines[:-1]
    return lines`,
      'function',
      fileCases(
        'read_lines',
        [
          { id: 's1', description: 'Two lines', fileContent: 'hello\nworld', expectedReturn: ['hello', 'world'] },
          { id: 's2', description: 'Empty', fileContent: '', expectedReturn: [] },
        ],
        [
          { id: 'h1', fileContent: 'one', expectedReturn: ['one'] },
          { id: 'h2', fileContent: 'a\nb\nc\n', expectedReturn: ['a', 'b', 'c'] },
          { id: 'h3', fileContent: 'line\n', expectedReturn: ['line'] },
          { id: 'h4', fileContent: 'x\n\ny', expectedReturn: ['x', '', 'y'] },
        ]
      ),
      'Model solution:\ndef read_lines():\n    with open("input.txt") as f:\n        text = f.read()\n    if text == "":\n        return []\n    lines = text.split("\\n")\n    if lines and lines[-1] == "":\n        lines = lines[:-1]\n    return lines\n\nWhy: Read the file, split on `\\n`, and drop the trailing empty piece a final newline leaves behind. A blank line in the middle (`x\\n\\ny`) is a real empty line and is kept.'
    ),

    cr(
      'w9-q10',
      'Implement `write_lines(lines)` that **writes** each string in `lines` to the file `notes.txt` (one per line, each followed by `\\n`) using **write mode** `open("notes.txt", "w")`, then reads the file back and returns its full contents.\n\nThe file already exists with some old content — opening it in `"w"` mode should **overwrite** it completely. An empty list produces an empty file (`""`).',
      `def write_lines(lines):
    with open("notes.txt", "w") as f:
        for line in lines:
            f.write(line + "\n")
    with open("notes.txt") as f:
        return f.read()`,
      'function',
      [
        { id: 's1', description: 'Two lines (overwrites old content)', funcName: 'write_lines', args: [['hello', 'world']], fileName: 'notes.txt', fileContent: 'OLD CONTENT\nTO BE REPLACED\n', expectedReturn: 'hello\nworld\n' },
        { id: 's2', description: 'Empty list → empty file', funcName: 'write_lines', args: [[]], fileName: 'notes.txt', fileContent: 'junk\n', expectedReturn: '' },
        { id: 'h1', hidden: true, funcName: 'write_lines', args: [['one']], fileName: 'notes.txt', fileContent: 'x\ny\nz\n', expectedReturn: 'one\n' },
        { id: 'h2', hidden: true, funcName: 'write_lines', args: [['a', 'b', 'c']], fileName: 'notes.txt', fileContent: '', expectedReturn: 'a\nb\nc\n' },
        { id: 'h3', hidden: true, funcName: 'write_lines', args: [['x', '', 'y']], fileName: 'notes.txt', fileContent: 'old\n', expectedReturn: 'x\n\ny\n' },
      ],
      'Model solution:\ndef write_lines(lines):\n    with open("notes.txt", "w") as f:\n        for line in lines:\n            f.write(line + "\\n")\n    with open("notes.txt") as f:\n        return f.read()\n\nWhy: Opening in `"w"` mode truncates (empties) the file the moment you open it, so the old content is gone before you write — the result contains only the new lines. We read the file back to return what was actually saved.'
    ),

    cr(
      'w9-q11',
      'Implement `append_line(new_line)` that **appends** `new_line` (followed by `\\n`) to the end of the file `log.txt` using **append mode** `open("log.txt", "a")`, then reads the file back and returns its full contents.\n\nUnlike write mode, append mode **keeps** the existing content and adds to the end. The file is provided with whatever it already contains (it may be empty).',
      `def append_line(new_line):
    with open("log.txt", "a") as f:
        f.write(new_line + "\n")
    with open("log.txt") as f:
        return f.read()`,
      'function',
      [
        { id: 's1', description: 'Append keeps existing content', funcName: 'append_line', args: ['line2'], fileName: 'log.txt', fileContent: 'line1\n', expectedReturn: 'line1\nline2\n' },
        { id: 's2', description: 'Append to an empty file', funcName: 'append_line', args: ['first'], fileName: 'log.txt', fileContent: '', expectedReturn: 'first\n' },
        { id: 'h1', hidden: true, funcName: 'append_line', args: ['b'], fileName: 'log.txt', fileContent: 'a\n', expectedReturn: 'a\nb\n' },
        { id: 'h2', hidden: true, funcName: 'append_line', args: ['c'], fileName: 'log.txt', fileContent: 'a\nb\n', expectedReturn: 'a\nb\nc\n' },
        { id: 'h3', hidden: true, funcName: 'append_line', args: ['entry'], fileName: 'log.txt', fileContent: 'header\n', expectedReturn: 'header\nentry\n' },
      ],
      'Model solution:\ndef append_line(new_line):\n    with open("log.txt", "a") as f:\n        f.write(new_line + "\\n")\n    with open("log.txt") as f:\n        return f.read()\n\nWhy: `"a"` (append) mode keeps the existing file content and writes new data at the end — contrast with `"w"`, which would erase it first. We read the file back to return the full updated contents.'
    ),

    cr(
      'w9-q12',
      'Implement `names_from_records(records)` where each record is `[id, name, score]`. Return a list of names only, in order.',
      `def names_from_records(records):
    names = []
    for id_, name, score in records:
        names.append(name)
    return names`,
      'function',
      funcCases(
        'names_from_records',
        [
          { id: 's1', description: 'Two records', args: [[[1, 'Ada', 95], [2, 'Grace', 88]]], expectedReturn: ['Ada', 'Grace'] },
          { id: 's2', description: 'Empty', args: [[]], expectedReturn: [] },
        ],
        [
          { id: 'h1', args: [[[0, 'Solo', 50]]], expectedReturn: ['Solo'] },
          { id: 'h2', args: [[[1, 'A', 1], [2, 'B', 2], [3, 'C', 3]]], expectedReturn: ['A', 'B', 'C'] },
          { id: 'h3', args: [[[99, '', 0]]], expectedReturn: [''] },
          { id: 'h4', args: [[[1, 'X', 10], [2, 'Y', 20]]], expectedReturn: ['X', 'Y'] },
        ]
      ),
      'Model solution:\ndef names_from_records(records):\n    names = []\n    for id_, name, score in records:\n        names.append(name)\n    return names'
    ),

    cr(
      'w9-q13',
      'Implement `count_nonblank_lines()` that **opens and reads `input.txt`** and returns how many **non-empty** lines it contains (strip each line; blank or whitespace-only lines do not count).\n\nThe file is provided automatically when your code runs.',
      `def count_nonblank_lines():
    with open("input.txt") as f:
        text = f.read()
    count = 0
    for line in text.split("\n"):
        if line.strip() != "":
            count += 1
    return count`,
      'function',
      fileCases(
        'count_nonblank_lines',
        [
          { id: 's1', description: 'Three words on separate lines', fileContent: 'cat\ndog\nbird', expectedReturn: 3 },
          { id: 's2', description: 'With blank lines', fileContent: 'a\n\nb\n  \nc', expectedReturn: 3 },
        ],
        [
          { id: 'h1', fileContent: '', expectedReturn: 0 },
          { id: 'h2', fileContent: '\n\n', expectedReturn: 0 },
          { id: 'h3', fileContent: 'one', expectedReturn: 1 },
          { id: 'h4', fileContent: '  hello  \n\nworld\n', expectedReturn: 2 },
        ]
      ),
      'Model solution:\ndef count_nonblank_lines():\n    with open("input.txt") as f:\n        text = f.read()\n    count = 0\n    for line in text.split("\\n"):\n        if line.strip() != "":\n            count += 1\n    return count\n\nWhy: Read the file, loop over its lines, and count only those that are non-empty after `.strip()` (so `"   "` does not count). A whitespace-only line strips to `""`.'
    ),

    tf(
      'w9-q14',
      'Tuples are mutable — you can change an element with `t[0] = 5`.',
      'false',
      'Tuples are immutable. Assigning to t[0] raises TypeError. Use a list if you need to mutate.'
    ),

    fib(
      'w9-q15',
      'What mode flag opens a file for **appending** without overwriting existing content?\n    open("log.txt", "___")',
      'a',
      'Mode "a" opens for append. "w" overwrites; "r" is read-only.'
    ),

    cr(
      'w9-q16',
      'Implement `average_score(records)` where each record is `[name, score]`. Return the average score as a **float**, or **0.0** if the list is empty.',
      `def average_score(records):
    if len(records) == 0:
        return 0.0
    total = 0
    for name, score in records:
        total += score
    return total / len(records)`,
      'function',
      funcCases(
        'average_score',
        [
          { id: 's1', description: 'Three scores', args: [[['A', 90], ['B', 80], ['C', 70]]], expectedReturn: 80 },
          { id: 's2', description: 'Empty', args: [[]], expectedReturn: 0.0 },
        ],
        [
          { id: 'h1', args: [[['Solo', 100]]], expectedReturn: 100 },
          { id: 'h2', args: [[['X', 0], ['Y', 0]]], expectedReturn: 0 },
          { id: 'h3', args: [[['a', 50], ['b', 50]]], expectedReturn: 50 },
          { id: 'h4', args: [[['n', 10], ['m', 20], ['o', 30], ['p', 40]]], expectedReturn: 25 },
        ]
      ),
      'Model solution:\ndef average_score(records):\n    if len(records) == 0:\n        return 0.0\n    total = 0\n    for name, score in records:\n        total += score\n    return total / len(records)'
    ),
  ],
};

export default week9;
