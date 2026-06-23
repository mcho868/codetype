import type { Module } from '../python101/types';
import { cr, mc, stdoutCases } from './authoring';

const test3: Module = {
  id: 'test-3',
  slug: 'test-3',
  title: 'Week 3 Test — Conditions',
  description:
    'Practice questions on if/elif/else, booleans, logical operators, chained comparisons, and nested branches.',
  icon: '📝',
  color: 'from-indigo-500 to-blue-400',
  locked: false,
  section: 'Week 3',
  lessons: [],
  questions: [
    cr(
      't3-q1',
      'Read three integers `a`, `b`, `c` (one per line). Print `all positive` if **all three** are strictly greater than 0; otherwise print `not all positive`. Combine the three checks with `and`.',
      'a = int(input())\nb = int(input())\nc = int(input())\n# Print "all positive" or "not all positive"\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'All positive', stdin: '1\n2\n3\n', expectedStdout: 'all positive' },
          { id: 's2', description: 'One negative', stdin: '1\n-1\n3\n', expectedStdout: 'not all positive' },
        ],
        [
          { id: 'h1', stdin: '5\n5\n5\n', expectedStdout: 'all positive' },
          { id: 'h2', stdin: '0\n5\n5\n', expectedStdout: 'not all positive' },
          { id: 'h3', stdin: '-1\n-2\n-3\n', expectedStdout: 'not all positive' },
          { id: 'h4', stdin: '100\n1\n50\n', expectedStdout: 'all positive' },
        ]
      ),
      'Model solution:\na = int(input())\nb = int(input())\nc = int(input())\nif a > 0 and b > 0 and c > 0:\n    print("all positive")\nelse:\n    print("not all positive")\n\nWhy: `and` is True only when every part is True, so one non-positive value (including 0, since the test is strictly > 0) flips the result. This combines three comparisons in a single boolean expression.'
    ),

    cr(
      't3-q2',
      'Read three integers `n`, `lo`, `hi` from stdin (one per line). Print `True` if `n` is between `lo` and `hi` **inclusive**, otherwise `False`. Use a **chained comparison**: `lo <= n <= hi`.',
      'n = int(input())\nlo = int(input())\nhi = int(input())\n# Print True or False\n',
      'stdout',
      stdoutCases(
        [{ id: 's1', description: 'Inside range', stdin: '5\n1\n10\n', expectedStdout: 'True' }],
        [
          { id: 'h1', stdin: '1\n1\n10\n', expectedStdout: 'True' },
          { id: 'h2', stdin: '10\n1\n10\n', expectedStdout: 'True' },
          { id: 'h3', stdin: '0\n1\n10\n', expectedStdout: 'False' },
          { id: 'h4', stdin: '11\n1\n10\n', expectedStdout: 'False' },
          { id: 'h5', stdin: '-5\n-10\n0\n', expectedStdout: 'True' },
        ]
      ),
      'Model solution:\nn = int(input())\nlo = int(input())\nhi = int(input())\nprint(lo <= n <= hi)\n\nWhy: Chained comparisons read naturally — Python checks both `lo <= n` and `n <= hi`. Equal-to-boundary values (1 and 10) are inclusive. `print()` of a comparison shows `True`/`False` directly.'
    ),

    cr(
      't3-q3',
      'Read an integer `n` from stdin and print a string describing its sign and parity using **nested conditions**:\n- `zero` if n is 0\n- otherwise one of `positive-even`, `positive-odd`, `negative-even`, `negative-odd`',
      'n = int(input())\n# Print the classification\n',
      'stdout',
      stdoutCases(
        [{ id: 's1', description: 'Positive odd', stdin: '7\n', expectedStdout: 'positive-odd' }],
        [
          { id: 'h1', stdin: '0\n', expectedStdout: 'zero' },
          { id: 'h2', stdin: '-2\n', expectedStdout: 'negative-even' },
          { id: 'h3', stdin: '1\n', expectedStdout: 'positive-odd' },
          { id: 'h4', stdin: '-3\n', expectedStdout: 'negative-odd' },
          { id: 'h5', stdin: '4\n', expectedStdout: 'positive-even' },
        ]
      ),
      'Model solution:\nn = int(input())\nif n == 0:\n    print("zero")\nelif n > 0:\n    if n % 2 == 0:\n        print("positive-even")\n    else:\n        print("positive-odd")\nelse:\n    if n % 2 == 0:\n        print("negative-even")\n    else:\n        print("negative-odd")\n\nWhy: Nested if handles two independent decisions — sign first, then even/odd via `% 2`. Zero is a special case handled before branching on sign. This synthesizes comparison, modulo, and nested structure.'
    ),

    cr(
      't3-q4',
      'Read `age` (int, line 1), `height` (int, line 2), and a ticket line (line 3 — the word `yes` or `no`). Print `True` only when **all** of these hold:\n- age ≥ 12\n- height ≥ 48 (inches)\n- the ticket line is `yes`\n\nOtherwise print `False`. Use `and` to combine the conditions.',
      'age = int(input())\nheight = int(input())\nticket = input()\n# Print True or False\n',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: 'Eligible rider',
            stdin: '14\n50\nyes\n',
            expectedStdout: 'True',
          },
        ],
        [
          { id: 'h1', stdin: '12\n48\nyes\n', expectedStdout: 'True' },
          { id: 'h2', stdin: '11\n50\nyes\n', expectedStdout: 'False' },
          { id: 'h3', stdin: '14\n47\nyes\n', expectedStdout: 'False' },
          { id: 'h4', stdin: '14\n50\nno\n', expectedStdout: 'False' },
          { id: 'h5', stdin: '10\n40\nno\n', expectedStdout: 'False' },
        ]
      ),
      'Model solution:\nage = int(input())\nheight = int(input())\nticket = input()\nprint(age >= 12 and height >= 48 and ticket == "yes")\n\nWhy: `and` requires every condition to be True. The hidden cases cover each requirement failing alone (too young, too short, no ticket) plus the all-fail corner. Comparing `ticket == "yes"` turns the text input into a boolean.'
    ),

    cr(
      't3-q5',
      'Write a program that reads an integer from stdin. Print `"pass"` if the score is **≥ 60**, otherwise print `"fail"`. (Transfer: apply branching to a novel pass/fail scenario.)',
      'score = int(input())\n# Print "pass" or "fail"\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Passing score', stdin: '75\n', expectedStdout: 'pass' },
        ],
        [
          { id: 'h1', stdin: '60\n', expectedStdout: 'pass' },
          { id: 'h2', stdin: '59\n', expectedStdout: 'fail' },
          { id: 'h3', stdin: '0\n', expectedStdout: 'fail' },
          { id: 'h4', stdin: '100\n', expectedStdout: 'pass' },
        ]
      ),
      'Model solution:\nscore = int(input())\nif score >= 60:\n    print("pass")\nelse:\n    print("fail")\n\nWhy: This transfer question combines `input()`, `int()` conversion, and a simple if/else — skills from Weeks 2 and 3. Boundary 60 passes (≥), 59 fails. Always convert input before comparing numerically.'
    ),

    mc(
      't3-q6',
      'What does this print?\n    print(False or print("hi"))\n    print(0.1 + 0.2 == 0.3)',
      [
        { id: 'a', text: 'hi then True' },
        { id: 'b', text: 'None then False' },
        { id: 'c', text: 'hi then False' },
        { id: 'd', text: 'None then True' },
      ],
      'b',
      'Model answer: **b** — None, then False.\n\nWhy line 1: `or` short-circuits. `False or X` must evaluate X. `print("hi")` runs (you see "hi") but **returns None**. So the first print outputs `None`.\n\nWhy line 2: Floats are approximated in binary. `0.1 + 0.2` is `0.30000000000000004`, not exactly `0.3`, so `==` is **False**. Never compare floats with `==` for exact equality — use `math.isclose()` or round first.\n\nThis question tests short-circuit evaluation and a classic float pitfall from Week 3.'
    ),
  ],
};

export default test3;
