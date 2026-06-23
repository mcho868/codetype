import type { Module } from '../python101/types';
import { cr, mc, stdoutCases } from './authoring';

const test7: Module = {
  id: 'test-7',
  slug: 'test-7',
  title: 'Week 7 Test — for Loops & range()',
  description:
    'Extra practice: range()-based sums, vowel counting, list building, word counting loops, and printed patterns.',
  icon: '📝',
  color: 'from-indigo-500 to-blue-400',
  locked: false,
  section: 'Week 7',
  lessons: [],
  questions: [
    cr(
      't7-q1',
      'Read `a` (line 1) and `b` (line 2). Print the sum of all integers `n` where `a <= n < b` (same semantics as `range(a, b)`). If `a >= b`, print `0`.',
      '',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: '1+2+3+4 = 10',
            stdin: '1\n5\n',
            expectedStdout: '10',
          },
        ],
        [
          { id: 'h1', stdin: '5\n5\n', expectedStdout: '0' },
          { id: 'h2', stdin: '3\n4\n', expectedStdout: '3' },
          { id: 'h3', stdin: '10\n5\n', expectedStdout: '0' },
          { id: 'h4', stdin: '0\n0\n', expectedStdout: '0' },
          { id: 'h5', stdin: '-3\n3\n', expectedStdout: '-3' },
        ]
      ),
      `Model solution:
a = int(input())
b = int(input())
total = 0
for n in range(a, b):
    total = total + n
print(total)

**Why:** \`range(a, b)\` excludes \`b\`, so this adds 1+2+3+4 = 10, not 15. When \`a >= b\`, \`range\` is empty and the loop never runs — the total stays 0. This is the accumulator pattern applied to numeric ranges.`
    ),

    cr(
      't7-q2',
      'Read one line of text and print how many **words start with a vowel** (`a, e, i, o, u`, upper or lowercase). Split into words and use a `for` loop; check the **first character** of each word.\n\nExample: `apple banana orange` → `2` (apple, orange).',
      '',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: 'apple and orange start with vowels',
            stdin: 'apple banana orange\n',
            expectedStdout: '2',
          },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '0' },
          { id: 'h2', stdin: 'the cat ate\n', expectedStdout: '1' },
          { id: 'h3', stdin: 'Igloo Owl eel\n', expectedStdout: '3' },
          { id: 'h4', stdin: 'xyz\n', expectedStdout: '0' },
          { id: 'h5', stdin: 'a e i\n', expectedStdout: '3' },
        ]
      ),
      `Model solution:
s = input()
count = 0
for w in s.split():
    if w[0] in "aeiouAEIOU":
        count = count + 1
print(count)

**Why:** \`split()\` gives the words; the \`for\` loop checks each word's first character \`w[0]\` against the vowel set. An empty line splits to \`[]\`, so the loop never runs and the count is 0. This combines splitting, looping, indexing, and membership.`
    ),

    cr(
      't7-q3',
      'Read an integer `n` and print a list of non-negative even integers **strictly less than** `n`, using `range(0, n, 2)`. Example: input `7` → `[0, 2, 4, 6]`. Print it as a Python list.',
      '',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: 'Evens below 7',
            stdin: '7\n',
            expectedStdout: '[0, 2, 4, 6]',
          },
        ],
        [
          { id: 'h1', stdin: '0\n', expectedStdout: '[]' },
          { id: 'h2', stdin: '1\n', expectedStdout: '[0]' },
          { id: 'h3', stdin: '2\n', expectedStdout: '[0]' },
          { id: 'h4', stdin: '10\n', expectedStdout: '[0, 2, 4, 6, 8]' },
          { id: 'h5', stdin: '3\n', expectedStdout: '[0, 2]' },
        ]
      ),
      `Model solution:
n = int(input())
result = []
for x in range(0, n, 2):
    result.append(x)
print(result)

**Why:** The three-argument \`range(0, n, 2)\` starts at 0, stops before \`n\`, and steps by 2 — exactly the even numbers below \`n\`. For \`n=0\` the range is empty → \`[]\`; for \`n=1\` you get just \`[0]\`.`
    ),

    cr(
      't7-q4',
      'Read one line and print the number of whitespace-separated words in it. You may use `split()`, but **count the words with a for loop** — do not use `len(...)` on the split result. An empty line has 0 words.',
      '',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: '"one two three" → 3',
            stdin: 'one two three\n',
            expectedStdout: '3',
          },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '0' },
          { id: 'h2', stdin: 'solo\n', expectedStdout: '1' },
          { id: 'h3', stdin: '  spaced   words  \n', expectedStdout: '2' },
          { id: 'h4', stdin: 'a b c d e\n', expectedStdout: '5' },
          { id: 'h5', stdin: 'four five six seven\n', expectedStdout: '4' },
        ]
      ),
      `Model solution:
s = input()
words = s.split()
count = 0
for w in words:
    count = count + 1
print(count)

**Why:** \`split()\` without arguments handles any whitespace run, so \`"  a   b  "\` → \`["a", "b"]\`. The for loop counts by incrementing. An empty line splits to \`[]\`, so the loop runs zero times and the count is 0.`
    ),

    cr(
      't7-q5',
      'Write a program that reads an integer **n** from stdin and prints the **5-times table row** for `n`: the five products `n*1` through `n*5`, space-separated on one line. Example: input `3` → output `3 6 9 12 15`.',
      `n = int(input())
# Print the 5-times table row for n
`,
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: '3-times row',
            stdin: '3\n',
            expectedStdout: '3 6 9 12 15',
          },
        ],
        [
          { id: 'h1', stdin: '1\n', expectedStdout: '1 2 3 4 5' },
          { id: 'h2', stdin: '5\n', expectedStdout: '5 10 15 20 25' },
          { id: 'h3', stdin: '0\n', expectedStdout: '0 0 0 0 0' },
          { id: 'h4', stdin: '10\n', expectedStdout: '10 20 30 40 50' },
        ]
      ),
      `Model solution:
n = int(input())
parts = []
for i in range(1, 6):
    parts.append(str(n * i))
print(" ".join(parts))

**Why:** \`range(1, 6)\` produces 1..5 — a classic off-by-one check. Building strings in a list then \`" ".join\` avoids trailing-space bugs. This transfers loop skills to formatted output, like generating report rows.`
    ),

    mc(
      't7-q6',
      'What does `list(range(2, 10, 3))` produce?',
      [
        { id: 'a', text: '[2, 5, 8]' },
        { id: 'b', text: '[2, 5, 8, 11]' },
        { id: 'c', text: '[2, 3, 4, 5, 6, 7, 8, 9]' },
        { id: 'd', text: '[3, 6, 9]' },
      ],
      'a',
      `\`range(2, 10, 3)\` starts at **2**, stops **before 10**, and steps by **3**: 2 → 5 → 8. The next value would be 11, which is not less than 10, so the sequence ends. Result: \`[2, 5, 8]\`.

Common mistakes: including the stop value 10, or forgetting the step skips intermediate numbers. Remember: \`range(start, stop, step)\` never includes \`stop\`.`
    ),
  ],
};

export default test7;
