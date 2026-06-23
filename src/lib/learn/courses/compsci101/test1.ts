import type { Module } from '../python101/types';
import { cr, mc, tf, stdoutCases } from './authoring';

const test1: Module = {
  id: 'test-1',
  slug: 'test-1',
  title: 'Week 1 Test — Foundations & Simple Data',
  description:
    'Practice questions on print, expressions, variables, operators, and the difference between syntax errors and runtime errors.',
  icon: '📝',
  color: 'from-rose-500 to-pink-400',
  locked: false,
  section: 'Week 1',
  lessons: [],
  questions: [
    cr(
      't1-q1',
      'Print the result of the expression `(7 + 3) * 4 - 5` using a single `print()` call with the expression inside.',
      '# Print (7 + 3) * 4 - 5\n',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: 'Multi-operator expression with parentheses',
            expectedStdout: '35',
          },
        ],
        [
          { id: 'h1', expectedStdout: '35' },
          { id: 'h2', expectedStdout: '35' },
          { id: 'h3', expectedStdout: '35' },
        ]
      ),
      'Model solution:\nprint((7 + 3) * 4 - 5)\n\nWhy: Python follows PEMDAS — parentheses first (7+3=10), then multiplication (10*4=40), then subtraction (40-5=35). Putting the whole expression inside print() shows the computed value.'
    ),

    cr(
      't1-q2',
      'Set `a = 6`, `b = 4`, and `c = 10`. Print the value of `a * b + c` on one line using variables (not literal numbers in the print call).',
      'a = \nb = \nc = \n# Print a * b + c\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Variable expression a*b + c', expectedStdout: '34' },
        ],
        [
          { id: 'h1', expectedStdout: '34' },
          { id: 'h2', expectedStdout: '34' },
          { id: 'h3', expectedStdout: '34' },
        ]
      ),
      'Model solution:\na = 6\nb = 4\nc = 10\nprint(a * b + c)\n\nWhy: Variables store values so you can reuse and combine them. Multiplication binds tighter than addition, so a*b is 24, then 24+10=34.'
    ),

    cr(
      't1-q3',
      'Print exactly **three lines**:\n1. `Items: 12` (the number 12 comes from an expression `3 * 4`, not a literal)\n2. `Ready`\n3. `Score: 100` (100 comes from variable `score = 100`)',
      'score = \n# Print three lines as described\n',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: 'String label + computed int, plain text, string + variable',
            expectedStdout: 'Items: 12\nReady\nScore: 100',
          },
        ],
        [
          { id: 'h1', expectedStdout: 'Items: 12\nReady\nScore: 100' },
          { id: 'h2', expectedStdout: 'Items: 12\nReady\nScore: 100' },
          { id: 'h3', expectedStdout: 'Items: 12\nReady\nScore: 100' },
        ]
      ),
      'Model solution:\nscore = 100\nprint("Items:", 3 * 4)\nprint("Ready")\nprint("Score:", score)\n\nWhy: print() can mix strings and numbers — Python converts the int to a string and inserts a space between arguments. Three separate print() calls produce three lines. Combining a literal label with a computed expression is a common pattern.'
    ),

    cr(
      't1-q4',
      'Print **two lines**: the floor-division result of `17 // 5`, then the true-division result of `17 / 5`.\nExpected output:\n    3\n    3.4',
      '# Print 17 // 5 on line 1, then 17 / 5 on line 2\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Floor division vs true division', expectedStdout: '3\n3.4' },
        ],
        [
          { id: 'h1', expectedStdout: '3\n3.4' },
          { id: 'h2', expectedStdout: '3\n3.4' },
          { id: 'h3', expectedStdout: '3\n3.4' },
        ]
      ),
      'Model solution:\nprint(17 // 5)\nprint(17 / 5)\n\nWhy: `//` is floor division — it drops the remainder and returns an integer (17÷5=3 remainder 2, so 3). `/` is true division and always returns a float (3.4). Knowing both operators matters when you need whole units vs exact decimals.'
    ),

    mc(
      't1-q5',
      'Which line causes a **syntax error** (Python refuses to run the file) rather than a **runtime error** (file runs but crashes on that line)?',
      [
        { id: 'a', text: 'print(10 / 0)' },
        { id: 'b', text: 'print("hello"' },
        { id: 'c', text: 'x = int("abc")' },
        { id: 'd', text: 'print(undefined_variable)' },
      ],
      'b',
      'Model answer: **b** — `print("hello"` has an unclosed parenthesis and quote. Python cannot parse the file, so it is a **syntax error** caught before any line runs.\n\nWhy the others are runtime errors:\n- **a** `10 / 0` is valid syntax; ZeroDivisionError happens at run time.\n- **c** `int("abc")` is valid syntax; ValueError happens when int() tries to convert.\n- **d** referencing an undefined name is valid syntax; NameError happens at run time.\n\nSyntax = grammar problem. Runtime = grammar OK but something goes wrong while executing.'
    ),

    tf(
      't1-q6',
      'The expression `x = 5 == 5` stores the boolean `True` in `x` because `==` compares values while `=` assigns.',
      'true',
      'Model answer: **True**.\n\nWhy: `=` is assignment; `==` is equality comparison. Python evaluates the right side first: `5 == 5` is `True`. Then `x = True` assigns that boolean to `x`. A common mistake is writing `if x = 5:` (syntax error) when you mean `if x == 5:`. Remember: one equals assigns, two equals compares.'
    ),
  ],
};

export default test1;
