import type { Module } from '../python101/types';
import { cr, mc, tf, fib, stdoutCases, funcCases } from './authoring';

const test8: Module = {
  id: 'test-8',
  slug: 'test-8',
  title: 'Week 8 Test — Functions',
  description:
    'Extra practice: clamping, leap years, tic-tac-toe helpers, discount math, decomposition, and return vs print.',
  icon: '📝',
  color: 'from-emerald-500 to-teal-400',
  locked: false,
  section: 'Week 8',
  lessons: [],
  questions: [
    cr(
      't8-q1',
      'Implement `average(a, b, c)` returning the **mean** of three numbers — their sum divided by 3. Return the value (do not print it). Example: `average(2, 4, 9)` → `5.0`.',
      `def average(a, b, c):
    pass
`,
      'function',
      funcCases(
        'average',
        [
          {
            id: 's1',
            description: 'Mean of 2, 4, 9',
            args: [2, 4, 9],
            expectedReturn: 5,
          },
        ],
        [
          { id: 'h1', args: [0, 0, 0], expectedReturn: 0 },
          { id: 'h2', args: [10, 20, 30], expectedReturn: 20 },
          { id: 'h3', args: [1, 1, 1], expectedReturn: 1 },
          { id: 'h4', args: [-3, 0, 3], expectedReturn: 0 },
          { id: 'h5', args: [5, 10, 15], expectedReturn: 10 },
        ]
      ),
      `Model solution:
def average(a, b, c):
    return (a + b + c) / 3

**Why:** Wrap the addition in parentheses so it happens **before** the division — \`a + b + c / 3\` would only divide \`c\`. Division with \`/\` always returns a float (so \`average(1,1,1)\` is \`1.0\`). Returning the value (not printing) lets the caller use it in further calculations.`
    ),

    cr(
      't8-q2',
      'Implement `is_leap_year(y)` returning `True` if year `y` is a leap year: divisible by 4 **and** (not divisible by 100 **or** divisible by 400).',
      `def is_leap_year(y):
    pass
`,
      'function',
      funcCases(
        'is_leap_year',
        [
          {
            id: 's1',
            description: '2024 is a leap year',
            args: [2024],
            expectedReturn: true,
          },
        ],
        [
          { id: 'h1', args: [2000], expectedReturn: true },
          { id: 'h2', args: [1900], expectedReturn: false },
          { id: 'h3', args: [2023], expectedReturn: false },
          { id: 'h4', args: [2100], expectedReturn: false },
          { id: 'h5', args: [2400], expectedReturn: true },
        ]
      ),
      `Model solution:
def is_leap_year(y):
    if y % 400 == 0:
        return True
    if y % 100 == 0:
        return False
    if y % 4 == 0:
        return True
    return False

**Why:** The century rules must be checked **before** the divisible-by-4 rule — 1900 is divisible by 4 but not by 400, so it is not a leap year. Decomposing into ordered checks mirrors how you break a complex boolean rule into readable steps.`
    ),

    cr(
      't8-q3',
      'Implement `has_winning_column(board)` for a tic-tac-toe board (list of 9 cells). Return `True` if **any column** is entirely the same mark and not blank, otherwise `False`.\n\nUnlike a row, a column\'s cells are **3 apart** in the flat list — column `c` is indices `c`, `c+3`, `c+6`:\n```\n index          columns\n 0 | 1 | 2      col 0: indices 0, 3, 6\n---+---+---    col 1: indices 1, 4, 7\n 3 | 4 | 5      col 2: indices 2, 5, 8\n---+---+---\n 6 | 7 | 8\n```\nExample: `["X"," "," ","X"," "," ","X"," "," "]` has `X` down column 0 (indices 0, 3, 6) → `True`.',
      `def has_winning_column(board):
    pass
`,
      'function',
      funcCases(
        'has_winning_column',
        [
          {
            id: 's1',
            description: 'X down column 0',
            args: [['X', ' ', ' ', 'X', ' ', ' ', 'X', ' ', ' ']],
            expectedReturn: true,
          },
        ],
        [
          { id: 'h1', args: [['O', 'X', ' ', 'O', ' ', ' ', 'O', ' ', ' ']], expectedReturn: true },
          { id: 'h2', args: [[' ', ' ', 'X', ' ', ' ', 'X', ' ', ' ', 'X']], expectedReturn: true },
          { id: 'h3', args: [['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O']], expectedReturn: false },
          { id: 'h4', args: [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']], expectedReturn: false },
          { id: 'h5', args: [['X', 'X', 'X', 'O', 'O', 'O', ' ', ' ', ' ']], expectedReturn: false },
        ]
      ),
      `Model solution:
def has_winning_column(board):
    for c in range(3):
        if board[c] != " " and board[c] == board[c + 3] == board[c + 6]:
            return True
    return False

**Why:** Each column is a **stride-3** slice of the flat list: column \`c\` is \`board[c]\`, \`board[c+3]\`, \`board[c+6]\`. Looping \`c\` over 0–2 checks all three columns. The \`!= " "\` guard stops a blank column from counting as a win. Note h5: three filled **rows** is not a winning **column** — column 0 is X/O/space, not all equal.`
    ),

    cr(
      't8-q4',
      'Implement `apply_discount(price, pct)` returning the final price after a **pct** percent discount, **rounded to the nearest integer** using `round()`. Example: `apply_discount(100, 20)` → `80`. Assume `0 <= pct <= 100`.',
      `def apply_discount(price, pct):
    pass
`,
      'function',
      funcCases(
        'apply_discount',
        [
          {
            id: 's1',
            description: '20% off 100',
            args: [100, 20],
            expectedReturn: 80,
          },
        ],
        [
          { id: 'h1', args: [50, 0], expectedReturn: 50 },
          { id: 'h2', args: [99, 100], expectedReturn: 0 },
          { id: 'h3', args: [10, 50], expectedReturn: 5 },
          { id: 'h4', args: [7, 33], expectedReturn: 5 },
          { id: 'h5', args: [0, 10], expectedReturn: 0 },
        ]
      ),
      `Model solution:
def apply_discount(price, pct):
    return round(price * (1 - pct / 100))

**Why:** Convert percent to a multiplier: 20% off means pay 80% → \`price * (1 - pct/100)\`. \`round()\` handles fractional cents. Returning the value (not printing) lets callers chain calculations — e.g. tax on the discounted price.`
    ),

    cr(
      't8-q5',
      'This question is about **decomposition** — breaking a problem into a small helper plus a function that uses it.\n\nWrite a helper `is_winning_row(row)` that takes a 3-cell list and returns `True` when all three are equal and not blank. Then write `score_board(board)` (board = list of 9 cells) that **calls `is_winning_row`** on each of the three rows and returns the winning mark (`"X"` or `"O"`) if a row wins, otherwise `None`. Rows are indices 0–2, 3–5, and 6–8.\n\nThe 9 cells map onto the grid by index, and each row is a slice of the board:\n```\n index          board          rows\n 0 | 1 | 2      X | X | X      board[0:3] -> ["X","X","X"]\n---+---+---    ---+---+---    board[3:6] -> ["O"," ","O"]\n 3 | 4 | 5      O |   | O      board[6:9] -> [" "," "," "]\n---+---+---    ---+---+---\n 6 | 7 | 8        |   |\n```\nThe board on the right is the sample `["X","X","X","O"," ","O"," "," "," "]`. The top row wins for `"X"`, so `score_board(board)` returns `"X"`. Only `score_board` is graded, but it needs your `is_winning_row` helper to work.',
      `def is_winning_row(row):
    pass

def score_board(board):
    pass
`,
      'function',
      funcCases(
        'score_board',
        [
          {
            id: 's1',
            description: 'X wins top row',
            args: [['X', 'X', 'X', 'O', ' ', 'O', ' ', ' ', ' ']],
            expectedReturn: 'X',
          },
        ],
        [
          { id: 'h1', args: [['O', 'O', 'O', 'X', 'X', ' ', ' ', ' ', ' ']], expectedReturn: 'O' },
          { id: 'h2', args: [[' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X']], expectedReturn: 'X' },
          { id: 'h3', args: [['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O']], expectedReturn: null },
          { id: 'h4', args: [['A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G']], expectedReturn: 'A' },
          { id: 'h5', args: [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']], expectedReturn: null },
        ]
      ),
      `Model solution:
def is_winning_row(row):
    return row[0] != " " and row[0] == row[1] == row[2]

def score_board(board):
    for i in range(3):
        row = board[i * 3 : i * 3 + 3]
        if is_winning_row(row):
            return row[0]
    return None

**Why:** **Decomposition** — \`score_board\` handles "which row?" while \`is_winning_row\` handles "does this row win?". Slicing \`board[i*3:i*3+3]\` extracts each row without nested indexing bugs. Returning \`None\` (not printing "no winner") lets the caller decide what to display.`
    ),

    mc(
      't8-q6',
      'What does this function return when called as `result = shout(5)`?\n\n```python\ndef shout(n):\n    print(n * 2)\n```',
      [
        { id: 'a', text: '10' },
        { id: 'b', text: 'None' },
        { id: 'c', text: 'It raises an error' },
        { id: 'd', text: 'It never returns because print stops execution' },
      ],
      'b',
      `\`print()\` displays output but the function has no \`return\` statement, so Python returns \`None\`. \`result\` is therefore \`None\`, **not** 10 — even though \`10\` appears on screen.

**Return vs print:** use \`return\` to pass a value back to the caller; use \`print\` only for human-visible output. Functions that only print are hard to test and cannot be composed into larger calculations.`
    ),
  ],
};

export default test8;
