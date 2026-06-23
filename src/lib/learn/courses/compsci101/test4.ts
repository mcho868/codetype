import type { Module } from '../python101/types';
import { cr, mc, stdoutCases } from './authoring';

const test4: Module = {
  id: 'test-4',
  slug: 'test-4',
  title: 'Week 4 Test — while Loops',
  description:
    'Practice questions on while loops, accumulators, sentinel values, and input-validation patterns.',
  icon: '📝',
  color: 'from-fuchsia-500 to-purple-400',
  locked: false,
  section: 'Week 4',
  lessons: [],
  questions: [
    cr(
      't4-q1',
      'Read an integer `n` and print the sum of all **even** numbers from 1 to `n` inclusive, using a **while** loop. Assume n ≥ 0. If there are no evens (e.g. n = 0 or 1), print 0.\n\nExample: n = 10 → 2 + 4 + 6 + 8 + 10 = 30.',
      '',
      'stdout',
      stdoutCases(
        [{ id: 's1', description: 'Evens up to 10', stdin: '10\n', expectedStdout: '30' }],
        [
          { id: 'h1', stdin: '0\n', expectedStdout: '0' },
          { id: 'h2', stdin: '1\n', expectedStdout: '0' },
          { id: 'h3', stdin: '2\n', expectedStdout: '2' },
          { id: 'h4', stdin: '6\n', expectedStdout: '12' },
          { id: 'h5', stdin: '11\n', expectedStdout: '30' },
        ]
      ),
      'Model solution:\nn = int(input())\ntotal = 0\ni = 2\nwhile i <= n:\n    total += i\n    i += 2\nprint(total)\n\nWhy: Start at 2 and step by 2 so the loop visits only even numbers — an accumulator with a stride. When n < 2 the loop never runs, so the total stays 0. (n = 11 gives the same as n = 10, since 11 is odd.)'
    ),

    cr(
      't4-q2',
      'Read an integer `n` and print how many digits are in its **absolute value**. Use repeated `// 10` in a while loop (not str). **0 counts as 1 digit.** Negative inputs use abs(n).',
      '',
      'stdout',
      stdoutCases(
        [{ id: 's1', description: 'Five digits', stdin: '90210\n', expectedStdout: '5' }],
        [
          { id: 'h1', stdin: '0\n', expectedStdout: '1' },
          { id: 'h2', stdin: '7\n', expectedStdout: '1' },
          { id: 'h3', stdin: '-123\n', expectedStdout: '3' },
          { id: 'h4', stdin: '1000\n', expectedStdout: '4' },
          { id: 'h5', stdin: '-9\n', expectedStdout: '1' },
        ]
      ),
      'Model solution:\nn = abs(int(input()))\nif n == 0:\n    print(1)\nelse:\n    count = 0\n    while n > 0:\n        count += 1\n        n //= 10\n    print(count)\n\nWhy: Each `//= 10` strips the last digit. Zero is a special case (loop would never run). Using abs() makes negatives behave like their positive counterpart — a design choice stated in the prompt.'
    ),

    cr(
      't4-q3',
      'Read an integer `limit` and print the **smallest power of 2** (starting at 1: 1, 2, 4, 8, …) that is **strictly greater than** `limit`. Use a while loop that doubles each iteration.\n\nExamples: input `0` → `1`, input `8` → `16`.',
      '',
      'stdout',
      stdoutCases(
        [{ id: 's1', description: 'First power over 10', stdin: '10\n', expectedStdout: '16' }],
        [
          { id: 'h1', stdin: '0\n', expectedStdout: '1' },
          { id: 'h2', stdin: '1\n', expectedStdout: '2' },
          { id: 'h3', stdin: '16\n', expectedStdout: '32' },
          { id: 'h4', stdin: '100\n', expectedStdout: '128' },
        ]
      ),
      'Model solution:\nlimit = int(input())\npower = 1\nwhile power <= limit:\n    power *= 2\nprint(power)\n\nWhy: Transfer from sentinel/doubling patterns — keep doubling until you exceed the limit. Start at 1 (2⁰). Strictly greater means 8 is not enough when limit is 8; you need 16.'
    ),

    cr(
      't4-q4',
      'Read integers (one per line) until **0** is read (the 0 is a sentinel, not counted). Print **how many of the numbers were positive** (strictly greater than 0).\n\nExample: input `3`, `-1`, `5`, `0` → output `2` (the 3 and the 5).',
      `count = 0\nnum = int(input())\n# Keep reading until 0; print how many were positive\n`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Two positives among the inputs', stdin: '3\n-1\n5\n0\n', expectedStdout: '2' },
        ],
        [
          { id: 'h1', stdin: '0\n', expectedStdout: '0' },
          { id: 'h2', stdin: '-1\n-2\n0\n', expectedStdout: '0' },
          { id: 'h3', stdin: '1\n2\n3\n0\n', expectedStdout: '3' },
          { id: 'h4', stdin: '7\n-7\n7\n-7\n0\n', expectedStdout: '2' },
        ]
      ),
      'Model solution:\ncount = 0\nnum = int(input())\nwhile num != 0:\n    if num > 0:\n        count += 1\n    num = int(input())\nprint(count)\n\nWhy: A sentinel loop (stop at 0) combined with a conditional counter — only increment when the value is positive. This pairs the "read until sentinel" pattern with selective counting, a step up from a plain running sum.'
    ),

    cr(
      't4-q5',
      'Read `value` (line 1), `lo` (line 2), and `hi` (line 3) as integers. Print `value` clamped to the range **[lo, hi]** inclusive: if value < lo print lo; if value > hi print hi; otherwise print value. Assume lo ≤ hi.',
      '',
      'stdout',
      stdoutCases(
        [{ id: 's1', description: 'Within range', stdin: '5\n1\n10\n', expectedStdout: '5' }],
        [
          { id: 'h1', stdin: '0\n1\n10\n', expectedStdout: '1' },
          { id: 'h2', stdin: '15\n1\n10\n', expectedStdout: '10' },
          { id: 'h3', stdin: '1\n1\n10\n', expectedStdout: '1' },
          { id: 'h4', stdin: '10\n1\n10\n', expectedStdout: '10' },
          { id: 'h5', stdin: '-100\n-5\n5\n', expectedStdout: '-5' },
        ]
      ),
      'Model solution:\nvalue = int(input())\nlo = int(input())\nhi = int(input())\nif value < lo:\n    print(lo)\nelif value > hi:\n    print(hi)\nelse:\n    print(value)\n\nWhy: The print version of input validation — instead of re-prompting, you output the nearest valid value. Boundaries map to lo/hi exactly. This pattern appears in games (health capped at max) and forms (scores limited to 0–100).'
    ),

    mc(
      't4-q6',
      'Which while loop causes an **infinite loop** when `n = 5`?',
      [
        { id: 'a', text: 'i = 1\nwhile i <= n:\n    print(i)\n    i += 1' },
        { id: 'b', text: 'i = 1\nwhile i < n:\n    print(i)\n    i += 1' },
        { id: 'c', text: 'i = 1\nwhile i <= n:\n    print(i)' },
        { id: 'd', text: 'i = 0\nwhile i < n:\n    print(i)\n    i += 1' },
      ],
      'c',
      'Model answer: **c** — the counter `i` is never updated inside the loop, so `i <= n` stays True forever when n ≥ 1.\n\nWhy the others terminate:\n- **a** prints 1 through 5 correctly (`i += 1` each time).\n- **b** is an off-by-one — prints 1–4 only (stops when i reaches 5), but it still **terminates**.\n- **d** prints 0 through 4 (correct for `i < n` starting at 0).\n\nClassic loop pitfalls: forgetting to increment (infinite) vs wrong boundary `<` vs `<=` (off-by-one). Always trace the first and last iteration.'
    ),
  ],
};

export default test4;