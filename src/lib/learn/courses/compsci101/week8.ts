import type { Module } from '../python101/types';
import { cr, mc, tf, funcCases } from './authoring';

const week8: Module = {
  id: 'week-8',
  slug: 'week-8',
  title: 'Functions',
  description:
    'Define and call functions, pass parameters, return values, break problems into smaller pieces with decomposition, and build tic-tac-toe helper functions.',
  icon: '⚙️',
  color: 'from-slate-500 to-zinc-400',
  locked: false,
  section: 'Week 8',
  lessons: [
    {
      id: 'lesson-w8-1',
      title: 'Defining and Calling Functions',
      content: `A **function** is a named block of reusable code.

\`\`\`python
def greet():
    print("Hello!")

greet()   # call the function
\`\`\`

**def** introduces a function definition. The name follows \`def\`, then parentheses, then a colon. The indented body runs each time you **call** the function by writing its name followed by \`()\`.

Functions help you:
- Avoid repeating the same code
- Give a meaningful name to a chunk of logic
- Test one piece of a program at a time`,
      codeExamples: [
        {
          language: 'python',
          code: `def say_twice(msg):
    print(msg)
    print(msg)

say_twice("Hi")
# Hi
# Hi`,
          caption: 'Define a function and call it',
          editable: true,
        },
        {
          language: 'python',
          code: `def draw_line():
    print("-" * 20)

draw_line()
print("Title")
draw_line()`,
          caption: 'Reuse a function for repeated output',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w8-2',
      title: 'Parameters and Arguments',
      content: `Functions can accept **input values** through **parameters**:

\`\`\`python
def add(a, b):
    print(a + b)

add(3, 5)      # 8 — 3 and 5 are arguments
\`\`\`

- **Parameter** — variable name in the function definition (\`a\`, \`b\`)
- **Argument** — actual value passed when calling (\`3\`, \`5\`)

Parameters make functions flexible — the same code works with different data. The number and order of arguments must match the definition.`,
      codeExamples: [
        {
          language: 'python',
          code: `def area(width, height):
    return width * height

print(area(4, 5))   # 20
print(area(10, 3))  # 30`,
          caption: 'Parameters let one function handle many inputs',
          editable: true,
        },
        {
          language: 'python',
          code: `def repeat(word, times):
    for _ in range(times):
        print(word)

repeat("Go", 3)`,
          caption: 'Multiple parameters',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w8-3',
      title: 'Return Values',
      content: `Use **return** to send a result back to the caller:

\`\`\`python
def double(x):
    return x * 2

y = double(7)   # y is 14
\`\`\`

**return** exits the function immediately. Code after return in the same block does not run.

If a function has no \`return\` (or bare \`return\` with no value), Python returns **None**.

**return vs print:** \`print\` displays output; \`return\` gives a value the caller can store, test, or pass to another function.`,
      codeExamples: [
        {
          language: 'python',
          code: `def max_of_two(a, b):
    if a >= b:
        return a
    return b

print(max_of_two(10, 3))  # 10`,
          caption: 'return sends a value back',
          editable: true,
        },
        {
          language: 'python',
          code: `def no_return():
    print("working")

result = no_return()
print(result)  # None`,
          caption: 'Functions without return give None',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w8-4',
      title: 'Decomposition',
      content: `**Decomposition** means breaking a big problem into smaller functions, each doing one clear job.

Example — computing a test average:
1. \`sum_scores(scores)\` — add them up
2. \`average(scores)\` — divide sum by count
3. \`main()\` — read input, call helpers, print result

Each function should be **short**, have a **descriptive name**, and ideally do **one thing**. If a function is hard to name, it may be doing too much.

Top-down design: sketch the main steps first, then fill in the helper functions.`,
      codeExamples: [
        {
          language: 'python',
          code: `def sum_list(nums):
    total = 0
    for n in nums:
        total += n
    return total

def average(nums):
    return sum_list(nums) / len(nums)

scores = [90, 85, 92]
print(average(scores))  # 89.0`,
          caption: 'average uses sum_list — layered helpers',
          editable: true,
        },
        {
          language: 'python',
          code: `def is_valid_age(age):
    return 0 <= age <= 120

def classify(age):
    if not is_valid_age(age):
        return "invalid"
    if age < 13:
        return "child"
    return "teen or adult"

print(classify(10))   # child
print(classify(150))  # invalid`,
          caption: 'Small validators as separate functions',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w8-5',
      title: 'Tic-Tac-Toe Helpers',
      content: `Games like tic-tac-toe are ideal for practicing decomposition. A 3×3 board is often stored as a **list of 9 strings** (or characters), indexed 0–8:

\`\`\`
 0 | 1 | 2
---+---+---
 3 | 4 | 5
---+---+---
 6 | 7 | 8
\`\`\`

Helper functions might:
- \`print_board(board)\` — display the grid
- \`is_winning_row(board, player)\` — check if player won a row
- \`count_marks(board, mark)\` — count X or O on the board
- \`is_full(board)\` — no empty cells left

Each helper takes the board (and maybe a player) as a parameter and returns a boolean or count. The main game loop calls these helpers instead of inlining all the logic.`,
      codeExamples: [
        {
          language: 'python',
          code: `def print_board(board):
    for i in range(3):
        row = board[i * 3 : i * 3 + 3]
        print(" | ".join(row))
        if i < 2:
            print("---+---+---")

board = ["X", "O", "X", " ", "X", "O", "O", " ", " "]
print_board(board)`,
          caption: 'Print a 3×3 board from a flat list',
          editable: true,
        },
        {
          language: 'python',
          code: `def count_marks(board, mark):
    count = 0
    for cell in board:
        if cell == mark:
            count += 1
    return count

def is_full(board):
    return " " not in board

b = ["X", "O", "X", "O", "X", "O", "O", "X", "O"]
print(count_marks(b, "X"))  # 4
print(is_full(b))           # True`,
          caption: 'Count marks and detect a full board',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    mc(
      'w8-q1',
      'Which is the correct way to define a function named `square` that takes one parameter `x`?',
      [
        { id: 'a', text: 'function square(x):' },
        { id: 'b', text: 'def square(x):' },
        { id: 'c', text: 'def square(x) {' },
        { id: 'd', text: 'func square(x):' },
      ],
      'b',
      'Python uses def, the function name, parameters in parentheses, and a colon. No curly braces.'
    ),

    cr(
      'w8-q2',
      'Implement `add(a, b)` returning the sum of `a` and `b`.',
      `def add(a, b):
    return a + b`,
      'function',
      funcCases(
        'add',
        [
          { id: 's1', description: 'Positive ints', args: [3, 5], expectedReturn: 8 },
          { id: 's2', description: 'With zero', args: [0, 7], expectedReturn: 7 },
        ],
        [
          { id: 'h1', args: [-1, 1], expectedReturn: 0 },
          { id: 'h2', args: [100, 200], expectedReturn: 300 },
          { id: 'h3', args: [-5, -3], expectedReturn: -8 },
          { id: 'h4', args: [0, 0], expectedReturn: 0 },
        ]
      ),
      'Model solution:\ndef add(a, b):\n    return a + b'
    ),

    cr(
      'w8-q3',
      'Implement `is_even(n)` returning `True` if `n` is divisible by 2, otherwise `False`.',
      `def is_even(n):
    return n % 2 == 0`,
      'function',
      funcCases(
        'is_even',
        [
          { id: 's1', description: 'Even', args: [4], expectedReturn: true },
          { id: 's2', description: 'Odd', args: [7], expectedReturn: false },
        ],
        [
          { id: 'h1', args: [0], expectedReturn: true },
          { id: 'h2', args: [1], expectedReturn: false },
          { id: 'h3', args: [-2], expectedReturn: true },
          { id: 'h4', args: [-3], expectedReturn: false },
        ]
      ),
      'Model solution:\ndef is_even(n):\n    return n % 2 == 0'
    ),

    cr(
      'w8-q4',
      'Implement `greet(name)` returning the string `"Hello, {name}!"` (include the comma and space exactly).',
      `def greet(name):
    return "Hello, " + name + "!"`,
      'function',
      funcCases(
        'greet',
        [
          { id: 's1', description: 'Simple name', args: ['Ada'], expectedReturn: 'Hello, Ada!' },
          { id: 's2', description: 'Another name', args: ['Bob'], expectedReturn: 'Hello, Bob!' },
        ],
        [
          { id: 'h1', args: [''], expectedReturn: 'Hello, !' },
          { id: 'h2', args: ['X'], expectedReturn: 'Hello, X!' },
          { id: 'h3', args: ['World'], expectedReturn: 'Hello, World!' },
        ]
      ),
      'Model solution:\ndef greet(name):\n    return "Hello, " + name + "!"'
    ),

    cr(
      'w8-q5',
      'Implement `rectangle_area(width, height)` returning the area of a rectangle.',
      `def rectangle_area(width, height):
    return width * height`,
      'function',
      funcCases(
        'rectangle_area',
        [
          { id: 's1', description: '4 × 5', args: [4, 5], expectedReturn: 20 },
          { id: 's2', description: 'Square', args: [3, 3], expectedReturn: 9 },
        ],
        [
          { id: 'h1', args: [0, 10], expectedReturn: 0 },
          { id: 'h2', args: [1, 1], expectedReturn: 1 },
          { id: 'h3', args: [10, 2], expectedReturn: 20 },
          { id: 'h4', args: [7, 8], expectedReturn: 56 },
        ]
      ),
      'Model solution:\ndef rectangle_area(width, height):\n    return width * height'
    ),

    cr(
      'w8-q6',
      'Implement `max_of_two(a, b)` returning the larger of the two integers (if equal, return either).',
      `def max_of_two(a, b):
    if a >= b:
        return a
    return b`,
      'function',
      funcCases(
        'max_of_two',
        [
          { id: 's1', description: 'First larger', args: [10, 3], expectedReturn: 10 },
          { id: 's2', description: 'Second larger', args: [2, 8], expectedReturn: 8 },
        ],
        [
          { id: 'h1', args: [5, 5], expectedReturn: 5 },
          { id: 'h2', args: [-1, -5], expectedReturn: -1 },
          { id: 'h3', args: [0, 0], expectedReturn: 0 },
          { id: 'h4', args: [100, -100], expectedReturn: 100 },
        ]
      ),
      'Model solution:\ndef max_of_two(a, b):\n    if a >= b:\n        return a\n    return b'
    ),

    cr(
      'w8-q7',
      'Implement `is_divisible(a, b)` returning `True` if `a` is evenly divisible by `b` (assume b ≠ 0).',
      `def is_divisible(a, b):
    return a % b == 0`,
      'function',
      funcCases(
        'is_divisible',
        [
          { id: 's1', description: 'Divisible', args: [10, 2], expectedReturn: true },
          { id: 's2', description: 'Not divisible', args: [10, 3], expectedReturn: false },
        ],
        [
          { id: 'h1', args: [0, 5], expectedReturn: true },
          { id: 'h2', args: [7, 7], expectedReturn: true },
          { id: 'h3', args: [9, 4], expectedReturn: false },
          { id: 'h4', args: [-8, 4], expectedReturn: true },
        ]
      ),
      'Model solution:\ndef is_divisible(a, b):\n    return a % b == 0'
    ),

    cr(
      'w8-q8',
      'Implement `count_digits(n)` returning how many digits are in the **absolute value** of integer `n` (0 counts as 1 digit).',
      `def count_digits(n):
    n = abs(n)
    if n == 0:
        return 1
    count = 0
    while n > 0:
        count += 1
        n //= 10
    return count`,
      'function',
      funcCases(
        'count_digits',
        [
          { id: 's1', description: 'Three digits', args: [123], expectedReturn: 3 },
          { id: 's2', description: 'Zero', args: [0], expectedReturn: 1 },
        ],
        [
          { id: 'h1', args: [9], expectedReturn: 1 },
          { id: 'h2', args: [-456], expectedReturn: 3 },
          { id: 'h3', args: [1000], expectedReturn: 4 },
          { id: 'h4', args: [-7], expectedReturn: 1 },
        ]
      ),
      'Model solution:\ndef count_digits(n):\n    n = abs(n)\n    if n == 0:\n        return 1\n    count = 0\n    while n > 0:\n        count += 1\n        n //= 10\n    return count'
    ),

    cr(
      'w8-q9',
      'Implement `is_winning_row(board, player)` for a tic-tac-toe board (list of 9 cells). Return `True` if **any row** (indices 0–2, 3–5, or 6–8) is entirely `player`.\n\nThe 9 cells map onto the grid by index like this:\n```\n index          board\n 0 | 1 | 2      X | X | X\n---+---+---    ---+---+---\n 3 | 4 | 5      O |   | O\n---+---+---    ---+---+---\n 6 | 7 | 8        |   |\n```\nThe board on the right is the sample `["X","X","X","O"," ","O"," "," "," "]` — the **top row** (indices 0,1,2) is all `"X"`, so `is_winning_row(board, "X")` is `True`.',
      `def is_winning_row(board, player):
    for row in range(3):
        start = row * 3
        if board[start] == board[start + 1] == board[start + 2] == player:
            return True
    return False`,
      'function',
      funcCases(
        'is_winning_row',
        [
          { id: 's1', description: 'Top row X', args: [['X', 'X', 'X', 'O', ' ', 'O', ' ', ' ', ' '], 'X'], expectedReturn: true },
          { id: 's2', description: 'No winning row', args: [['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'], 'X'], expectedReturn: false },
        ],
        [
          { id: 'h1', args: [['O', 'O', 'O', 'X', 'X', ' ', ' ', ' ', ' '], 'O'], expectedReturn: true },
          { id: 'h2', args: [[' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' '], 'X'], expectedReturn: true },
          { id: 'h3', args: [[' ', ' ', ' ', ' ', ' ', ' ', 'O', 'O', 'O'], 'O'], expectedReturn: true },
          { id: 'h4', args: [['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'], 'O'], expectedReturn: false },
        ]
      ),
      'Model solution:\ndef is_winning_row(board, player):\n    for row in range(3):\n        start = row * 3\n        if board[start] == board[start + 1] == board[start + 2] == player:\n            return True\n    return False'
    ),

    cr(
      'w8-q10',
      'Implement `fibonacci(n)` returning the **n-th** Fibonacci number (0-indexed: fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, …). Assume n ≥ 0.',
      `def fibonacci(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
      'function',
      funcCases(
        'fibonacci',
        [
          { id: 's1', description: 'fib(5)', args: [5], expectedReturn: 5 },
          { id: 's2', description: 'fib(0)', args: [0], expectedReturn: 0 },
        ],
        [
          { id: 'h1', args: [1], expectedReturn: 1 },
          { id: 'h2', args: [2], expectedReturn: 1 },
          { id: 'h3', args: [10], expectedReturn: 55 },
          { id: 'h4', args: [7], expectedReturn: 13 },
        ]
      ),
      'Model solution:\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b'
    ),

    cr(
      'w8-q11',
      'Implement `count_marks(board, mark)` returning how many cells equal `mark` on a tic-tac-toe board (list of 9 strings).\n\nThe 9 cells map onto the grid by index like this:\n```\n index          board\n 0 | 1 | 2      X | O | X\n---+---+---    ---+---+---\n 3 | 4 | 5        | X | O\n---+---+---    ---+---+---\n 6 | 7 | 8      O |   |\n```\nThe board on the right is the sample `["X","O","X"," ","X","O","O"," "," "]`. Counting `"X"` gives **3** (indices 0, 2, 4).',
      `def count_marks(board, mark):
    count = 0
    for cell in board:
        if cell == mark:
            count += 1
    return count`,
      'function',
      funcCases(
        'count_marks',
        [
          { id: 's1', description: 'Count X', args: [['X', 'O', 'X', ' ', 'X', 'O', 'O', ' ', ' '], 'X'], expectedReturn: 3 },
          { id: 's2', description: 'Empty board', args: [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], 'X'], expectedReturn: 0 },
        ],
        [
          { id: 'h1', args: [['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], 'O'], expectedReturn: 9 },
          { id: 'h2', args: [['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'], 'X'], expectedReturn: 9 },
          { id: 'h3', args: [['X', 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' '], 'O'], expectedReturn: 1 },
          { id: 'h4', args: [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ' '], expectedReturn: 9 },
        ]
      ),
      'Model solution:\ndef count_marks(board, mark):\n    count = 0\n    for cell in board:\n        if cell == mark:\n            count += 1\n    return count'
    ),

    cr(
      'w8-q12',
      'Implement `clamp(n, low, high)` returning `n` constrained to the inclusive range `[low, high]`.',
      `def clamp(n, low, high):
    if n < low:
        return low
    if n > high:
        return high
    return n`,
      'function',
      funcCases(
        'clamp',
        [
          { id: 's1', description: 'Within range', args: [5, 0, 10], expectedReturn: 5 },
          { id: 's2', description: 'Below low', args: [-3, 0, 10], expectedReturn: 0 },
          { id: 's3', description: 'Above high', args: [15, 0, 10], expectedReturn: 10 },
        ],
        [
          { id: 'h1', args: [0, 0, 10], expectedReturn: 0 },
          { id: 'h2', args: [10, 0, 10], expectedReturn: 10 },
          { id: 'h3', args: [100, -5, 5], expectedReturn: 5 },
          { id: 'h4', args: [-100, -5, 5], expectedReturn: -5 },
        ]
      ),
      'Model solution:\ndef clamp(n, low, high):\n    if n < low:\n        return low\n    if n > high:\n        return high\n    return n'
    ),

    cr(
      'w8-q13',
      'Implement `format_score(home, away)` returning a score string like `"3-2"` (home score, hyphen, away score).',
      `def format_score(home, away):
    return str(home) + "-" + str(away)`,
      'function',
      funcCases(
        'format_score',
        [
          { id: 's1', description: 'Typical score', args: [3, 2], expectedReturn: '3-2' },
          { id: 's2', description: 'Draw', args: [0, 0], expectedReturn: '0-0' },
        ],
        [
          { id: 'h1', args: [10, 1], expectedReturn: '10-1' },
          { id: 'h2', args: [1, 10], expectedReturn: '1-10' },
          { id: 'h3', args: [99, 88], expectedReturn: '99-88' },
        ]
      ),
      'Model solution:\ndef format_score(home, away):\n    return str(home) + "-" + str(away)'
    ),

    cr(
      'w8-q14',
      'Implement `is_full(board)` returning `True` if no cell on the tic-tac-toe board is a space `" "`, otherwise `False`.\n\nThe 9 cells map onto the grid by index like this:\n```\n index          board\n 0 | 1 | 2      X | O | X\n---+---+---    ---+---+---\n 3 | 4 | 5      O | X | O\n---+---+---    ---+---+---\n 6 | 7 | 8      O | X | O\n```\nThe board on the right is the sample `["X","O","X","O","X","O","O","X","O"]` — every cell is filled, so `is_full(board)` is `True`. A board is **not** full if any cell is still `" "`.',
      `def is_full(board):
    return " " not in board`,
      'function',
      funcCases(
        'is_full',
        [
          { id: 's1', description: 'Full board', args: [['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O']], expectedReturn: true },
          { id: 's2', description: 'Has empty', args: [['X', 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' ']], expectedReturn: false },
        ],
        [
          { id: 'h1', args: [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']], expectedReturn: false },
          { id: 'h2', args: [['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']], expectedReturn: true },
          { id: 'h3', args: [['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', ' ']], expectedReturn: false },
          { id: 'h4', args: [['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']], expectedReturn: true },
        ]
      ),
      'Model solution:\ndef is_full(board):\n    return " " not in board'
    ),

    cr(
      'w8-q15',
      'Implement `absolute_value(n)` returning the absolute value of integer `n` (do not use the built-in `abs()`).',
      `def absolute_value(n):
    if n < 0:
        return -n
    return n`,
      'function',
      funcCases(
        'absolute_value',
        [
          { id: 's1', description: 'Positive', args: [5], expectedReturn: 5 },
          { id: 's2', description: 'Negative', args: [-7], expectedReturn: 7 },
        ],
        [
          { id: 'h1', args: [0], expectedReturn: 0 },
          { id: 'h2', args: [-1], expectedReturn: 1 },
          { id: 'h3', args: [100], expectedReturn: 100 },
          { id: 'h4', args: [-999], expectedReturn: 999 },
        ]
      ),
      'Model solution:\ndef absolute_value(n):\n    if n < 0:\n        return -n\n    return n'
    ),

    tf(
      'w8-q16',
      'A function that does not use `return` automatically returns the value `None`.',
      'true',
      'In Python, falling off the end of a function (or using bare return) yields None.'
    ),
  ],
};

export default week8;
