import type { Module } from '../python101/types';
import { cr, mc, stdoutCases } from './authoring';

const test2: Module = {
  id: 'test-2',
  slug: 'test-2',
  title: 'Week 2 Test — Input & Output, Types',
  description:
    'Practice questions on input(), int/float/str conversion, f-strings, and numeric types.',
  icon: '📝',
  color: 'from-emerald-500 to-teal-400',
  locked: false,
  section: 'Week 2',
  lessons: [],
  questions: [
    cr(
      't2-q1',
      'Read a **first name** (line 1) and a **last name** (line 2) from stdin. Print them in the format `Last, First` — last name, a comma and a space, then the first name. Use an f-string.\n\nExample: `Ada` then `Lovelace` → `Lovelace, Ada`',
      'first = input()\nlast = input()\n# Print "Last, First"\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Ada Lovelace', stdin: 'Ada\nLovelace\n', expectedStdout: 'Lovelace, Ada' },
        ],
        [
          { id: 'h1', stdin: 'Grace\nHopper\n', expectedStdout: 'Hopper, Grace' },
          { id: 'h2', stdin: 'Alan\nTuring\n', expectedStdout: 'Turing, Alan' },
          { id: 'h3', stdin: 'Madonna\n\n', expectedStdout: ', Madonna' },
          { id: 'h4', stdin: 'X\nY\n', expectedStdout: 'Y, X' },
        ]
      ),
      'Model solution:\nfirst = input()\nlast = input()\nprint(f"{last}, {first}")\n\nWhy: Read the two lines in order, then an f-string places them in the swapped "Last, First" layout with a literal comma-space between. This reorders input rather than echoing it — a small but real formatting task.'
    ),

    cr(
      't2-q2',
      'Read an integer from stdin, then print its **square** (n × n) on one line.',
      '# Print n squared\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Square of 5', stdin: '5\n', expectedStdout: '25' },
        ],
        [
          { id: 'h1', stdin: '0\n', expectedStdout: '0' },
          { id: 'h2', stdin: '-3\n', expectedStdout: '9' },
          { id: 'h3', stdin: '1\n', expectedStdout: '1' },
          { id: 'h4', stdin: '12\n', expectedStdout: '144' },
        ]
      ),
      'Model solution:\nn = int(input())\nprint(n * n)\n\nWhy: `input()` gives a string; `int()` converts it before arithmetic. Squaring a negative still yields a positive (since negative × negative = positive). Zero squared is 0.'
    ),

    cr(
      't2-q3',
      'Read **three integers** (one per line) from stdin and print their **average** to **2 decimal places** using an f-string, exactly like: `Average: <value>`.\n\nExample: `1`, `2`, `3` → `Average: 2.00`.',
      'a = int(input())\nb = int(input())\nc = int(input())\n# Print "Average: X.XX"\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Average of 1, 2, 3', stdin: '1\n2\n3\n', expectedStdout: 'Average: 2.00' },
        ],
        [
          { id: 'h1', stdin: '2\n2\n2\n', expectedStdout: 'Average: 2.00' },
          { id: 'h2', stdin: '1\n2\n4\n', expectedStdout: 'Average: 2.33' },
          { id: 'h3', stdin: '10\n20\n30\n', expectedStdout: 'Average: 20.00' },
          { id: 'h4', stdin: '0\n0\n1\n', expectedStdout: 'Average: 0.33' },
        ]
      ),
      'Model solution:\na = int(input())\nb = int(input())\nc = int(input())\nprint(f"Average: {(a + b + c) / 3:.2f}")\n\nWhy: Parenthesize the sum so it happens before dividing by 3. The format specifier `:.2f` inside the f-string rounds to two decimals — combining input, arithmetic, and formatted output.'
    ),

    cr(
      't2-q4',
      'Read a **float** price (line 1) and an **int** quantity (line 2). Print the total cost formatted to **2 decimal places** using an f-string: `Total: $<amount>`\n\nExample: price `2.50`, qty `3` → `Total: $7.50`',
      '# Print total to 2 decimal places\n',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: '2.50 × 3',
            stdin: '2.50\n3\n',
            expectedStdout: 'Total: $7.50',
          },
        ],
        [
          { id: 'h1', stdin: '1.99\n2\n', expectedStdout: 'Total: $3.98' },
          { id: 'h2', stdin: '0.10\n3\n', expectedStdout: 'Total: $0.30' },
          { id: 'h3', stdin: '2.5\n4\n', expectedStdout: 'Total: $10.00' },
          { id: 'h4', stdin: '4.00\n0\n', expectedStdout: 'Total: $0.00' },
        ]
      ),
      'Model solution:\nprice = float(input())\nqty = int(input())\ntotal = price * qty\nprint(f"Total: ${total:.2f}")\n\nWhy: Mix float and int types — multiplication promotes to float. The format specifier `:.2f` always shows exactly two decimal places, padding with zeros (2.5 × 4 → $10.00). Always convert input before math; raw strings cannot multiply.'
    ),

    mc(
      't2-q5',
      'What are the types of these expressions?\n    `10 / 2`    `10 // 2`    `int("5")`',
      [
        { id: 'a', text: 'float, int, int' },
        { id: 'b', text: 'int, int, str' },
        { id: 'c', text: 'float, float, int' },
        { id: 'd', text: 'int, float, int' },
      ],
      'a',
      'Model answer: **a** — float, int, int.\n\nWhy:\n- `10 / 2` uses true division → always **float** (5.0), even when the result is whole.\n- `10 // 2` uses floor division → **int** (5).\n- `int("5")` converts the string to an **int** (5).\n\nRemember: `/` never returns an int in Python 3. Use `//` when you need an integer quotient.'
    ),

    cr(
      't2-q6',
      'Set `width = 8` and `height = 5`. Print exactly `Area: 40` using an f-string where **40 is computed** from `width * height` inside the braces (do not hard-code 40).',
      '# Print area with f-string\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Computed area in f-string', expectedStdout: 'Area: 40' },
        ],
        [
          { id: 'h1', expectedStdout: 'Area: 40' },
          { id: 'h2', expectedStdout: 'Area: 40' },
          { id: 'h3', expectedStdout: 'Area: 40' },
        ]
      ),
      'Model solution:\nwidth = 8\nheight = 5\nprint(f"Area: {width * height}")\n\nWhy: F-strings evaluate expressions inside `{}`. Writing `{width * height}` computes 40 at run time. This is a transfer question — you apply f-string formatting to a derived value rather than a variable read from input.'
    ),
  ],
};

export default test2;
