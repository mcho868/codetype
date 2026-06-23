import type { Module } from '../python101/types';
import { cr, mc, stdoutCases } from './authoring';

const test6: Module = {
  id: 'test-6',
  slug: 'test-6',
  title: 'Week 6 Test — String & List Methods',
  description:
    'Extra practice: split/join, replace/find, list merge & dedupe, word frequency, and in-place vs returning methods.',
  icon: '📝',
  color: 'from-rose-500 to-pink-400',
  locked: false,
  section: 'Week 6',
  lessons: [],
  questions: [
    cr(
      't6-q1',
      'Read one line and print a **title-cased** version: the first letter of each word uppercase, the rest lowercase. Use `split()` and `join()` — **do not** use `.title()`. Extra whitespace between words collapses to single spaces (default `split()` handles this). Print an empty line for an empty string.',
      '',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: '"hello world" → "Hello World"',
            stdin: 'hello world\n',
            expectedStdout: 'Hello World',
          },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '' },
          { id: 'h2', stdin: 'python\n', expectedStdout: 'Python' },
          { id: 'h3', stdin: 'UPPER lower MiXeD\n', expectedStdout: 'Upper Lower Mixed' },
          { id: 'h4', stdin: '  spaced   words  \n', expectedStdout: 'Spaced Words' },
          { id: 'h5', stdin: 'a\n', expectedStdout: 'A' },
        ]
      ),
      `Model solution:
s = input()
if s == "":
    print("")
else:
    words = s.split()
    result = []
    i = 0
    while i < len(words):
        word = words[i]
        result.append(word[0].upper() + word[1:].lower())
        i = i + 1
    print(" ".join(result))

**Why:** \`split()\` with no argument breaks on any whitespace and drops empties, so \`"  a   b  "\` becomes \`["a", "b"]\`. Title-casing each word then \`" ".join(...)\` rebuilds a clean string. A \`while\` loop with an index (Week 4) walks the word list — \`for\` loops arrive in Week 7.`
    ),

    cr(
      't6-q2',
      'Parse a comma-separated line into a **clean** list: split on commas, then **strip the spaces** around each piece. Example: `red, green, blue` → \`["red", "green", "blue"]\` (note the spaces after the commas are removed). A trailing comma produces an extra empty element (e.g. `a, b,` → \`["a", "b", ""]\`). Print \`[]\` for an empty line.',
      '',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: 'Three colors with spaces',
            stdin: 'red, green, blue\n',
            expectedStdout: "['red', 'green', 'blue']",
          },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '[]' },
          { id: 'h2', stdin: 'solo\n', expectedStdout: "['solo']" },
          { id: 'h3', stdin: 'a,b,\n', expectedStdout: "['a', 'b', '']" },
          { id: 'h4', stdin: 'x,y,z\n', expectedStdout: "['x', 'y', 'z']" },
          { id: 'h5', stdin: ' spaced , items \n', expectedStdout: "['spaced', 'items']" },
        ]
      ),
      `Model solution:
s = input()
if s == "":
    print([])
else:
    parts = s.split(",")
    result = []
    i = 0
    while i < len(parts):
        result.append(parts[i].strip())
        i = i + 1
    print(result)

**Why:** \`split(",")\` keeps empty segments after a trailing comma — \`"a,b,".split(",")\` is \`["a", "b", ""]\`. \`strip()\` removes padding spaces around each field without changing the field count. A \`while\`+index loop (Week 4) processes each piece.`
    ),

    cr(
      't6-q3',
      'Read three lines: `s`, `old`, `new`. Print `s` with **every non-overlapping** occurrence of substring `old` replaced by `new`. Use a loop with slicing — do **not** call `.replace()`. If `old` is not found, print `s` unchanged. If `old` is empty, print `s` unchanged.',
      '',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: 'Replace "cat" with "dog"',
            stdin: 'the cat sat\ncat\ndog\n',
            expectedStdout: 'the dog sat',
          },
        ],
        [
          { id: 'h1', stdin: 'aaa\na\nb\n', expectedStdout: 'bbb' },
          { id: 'h2', stdin: 'hello\nz\nx\n', expectedStdout: 'hello' },
          { id: 'h3', stdin: '\na\nb\n', expectedStdout: '' },
          { id: 'h4', stdin: 'abab\nab\nx\n', expectedStdout: 'xx' },
          { id: 'h5', stdin: 'banana\nna\nNA\n', expectedStdout: 'baNANA' },
        ]
      ),
      `Model solution:
s = input()
old = input()
new = input()
if old == "":
    print(s)
else:
    result = ""
    i = 0
    while i < len(s):
        if s[i : i + len(old)] == old:
            result += new
            i += len(old)
        else:
            result += s[i]
            i += 1
    print(result)

**Why:** Slicing in a loop builds the result left-to-right and advances by \`len(old)\` after each match, so replacements do not re-scan inside newly inserted text. The \`"aaa"\` → \`"bbb"\` case shows why advancing by the match length matters. This teaches substring search without hiding it behind \`.replace()\`.`
    ),

    cr(
      't6-q4',
      'Read two lists of space-separated integers — `xs` (line 1) and `ys` (line 2). Print a **new sorted list** containing every **unique** value from both. Use `extend`, `sort()`, then remove duplicates. Either line may be empty.',
      '',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: 'Merge with overlap',
            stdin: '1 3 5\n3 4 6\n',
            expectedStdout: '[1, 3, 4, 5, 6]',
          },
        ],
        [
          { id: 'h1', stdin: '\n\n', expectedStdout: '[]' },
          { id: 'h2', stdin: '1\n\n', expectedStdout: '[1]' },
          { id: 'h3', stdin: '\n2 2\n', expectedStdout: '[2]' },
          { id: 'h4', stdin: '5 5 5\n5\n', expectedStdout: '[5]' },
          { id: 'h5', stdin: '3 1\n2 3\n', expectedStdout: '[1, 2, 3]' },
        ]
      ),
      `Model solution:
xs = input().split()
ys = input().split()
combined = []
i = 0
while i < len(xs):
    combined.append(int(xs[i]))
    i = i + 1
i = 0
while i < len(ys):
    combined.append(int(ys[i]))
    i = i + 1
combined.sort()
if len(combined) == 0:
    print([])
else:
    result = [combined[0]]
    i = 1
    while i < len(combined):
        if combined[i] != result[-1]:
            result.append(combined[i])
        i = i + 1
    print(result)

**Why:** \`split()\` reads each line into string pieces; a \`while\` loop (Week 4) converts them to ints with \`int()\`. Sorting first groups duplicates together so a single adjacent-comparison pass removes them. \`for\` loops and \`range()\` arrive in Week 7.`
    ),

    cr(
      't6-q5',
      'Read one line and print the word appearing **most often** (words separated by whitespace). Use `split()` and counting (`.count()` in a loop). On a tie, print the word that **first reached** the highest count (scan left to right). Print an empty line for an empty string.',
      '',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: '"the cat sat on the mat"',
            stdin: 'the cat sat on the mat\n',
            expectedStdout: 'the',
          },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '' },
          { id: 'h2', stdin: 'solo\n', expectedStdout: 'solo' },
          { id: 'h3', stdin: 'a b a b c\n', expectedStdout: 'a' },
          { id: 'h4', stdin: 'x x y y y\n', expectedStdout: 'y' },
          { id: 'h5', stdin: 'one two two three three three\n', expectedStdout: 'three' },
        ]
      ),
      `Model solution:
s = input()
if s == "":
    print("")
else:
    words = s.split()
    best = words[0]
    best_count = 0
    i = 0
    while i < len(words):
        count = words.count(words[i])
        if count > best_count:
            best_count = count
            best = words[i]
        i = i + 1
    print(best)

**Why:** Scanning words in order and updating only when \`count > best_count\` (strictly greater) means ties keep the earliest winner — \`"a b a b"\` returns \`"a"\`. A \`while\`+index loop (Week 4) does the scan; \`.count()\` does the aggregation. \`for\` loops arrive in Week 7.`
    ),

    mc(
      't6-q6',
      'What does this code print?\n    nums = [3, 1, 2]\n    result = nums.sort()\n    print(result)\n    print(nums)',
      [
        { id: 'a', text: '[1, 2, 3]\nthen\n[1, 2, 3]' },
        { id: 'b', text: 'None\nthen\n[1, 2, 3]' },
        { id: 'c', text: 'None\nthen\n[3, 1, 2]' },
        { id: 'd', text: '[3, 1, 2]\nthen\n[1, 2, 3]' },
      ],
      'b',
      `Model answer: **b** — \`None\`, then \`[1, 2, 3]\`.

\`.sort()\` sorts the list **in place** (so \`nums\` becomes \`[1, 2, 3]\`) but **returns \`None\`** — it does not hand back a new list. So \`result = nums.sort()\` stores \`None\`, and \`print(result)\` shows \`None\`.

This is the classic mutating-method trap: methods that change the list in place (\`.sort()\`, \`.append()\`, \`.reverse()\`) return \`None\`. Never write \`nums = nums.sort()\` — that throws the list away. Sort the list, then use \`nums\` itself.`
    ),
  ],
};

export default test6;
