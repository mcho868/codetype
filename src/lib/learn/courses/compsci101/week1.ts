import type { Module } from '../python101/types';
import { cr, mc, tf, fib, stdoutCases, funcCases } from './authoring';

const week1: Module = {
  id: 'week-1',
  slug: 'week-1',
  title: 'Foundations & Simple Data',
  description:
    'Start your Python journey: what algorithms are, how Python runs code, literals, operators, expressions, variables, assignment, and printing output with print().',
  icon: '🌱',
  color: 'from-sky-500 to-blue-400',
  locked: false,
  section: 'Week 1',
  lessons: [
    {
      id: 'lesson-w1-0',
      title: 'Set Up Python on Your Computer',
      content: `Before you dive into exercises, install Python on your own machine. You can still practice in this site's **in-browser runner** right away, but a local install lets you run \`.py\` files, use IDLE, and work offline.

## Download Python

1. Go to [python.org/downloads](https://www.python.org/downloads/) and download the latest **Python 3.x** installer for your operating system.

### Windows
- Run the installer.
- **Important:** check **"Add Python to PATH"** at the bottom of the first screen — otherwise \`python\` won't work in Command Prompt.
- Choose "Install Now" (or customize if you prefer).

### macOS
- Run the installer from python.org.
- macOS may ship an old \`python\` command; use \`python3\` in Terminal for Python 3.

### Linux (Debian/Ubuntu)
- Python 3 is often preinstalled. Check with \`python3 --version\`.
- If missing: \`sudo apt install python3\`

## Verify the install

Open **Terminal** (macOS/Linux) or **Command Prompt** / **PowerShell** (Windows) and run:

\`\`\`
python --version
\`\`\`

On macOS/Linux you may need:

\`\`\`
python3 --version
\`\`\`

You should see something like \`Python 3.12.x\`.

## Run your first file

1. Create a file named \`hello.py\` with this line:

\`\`\`python
print("Hello, Python!")
\`\`\`

2. In the same folder, run:

\`\`\`
python hello.py
\`\`\`

(or \`python3 hello.py\` on macOS/Linux)

You should see \`Hello, Python!\` printed.

## IDLE

Python ships with **IDLE** — a simple editor and shell. Search for "IDLE" after installing, or launch it from the Start menu / Applications. It's fine for small scripts; many developers later use VS Code, Cursor, or PyCharm.

**Stuck?** You can complete Week 1 using only the Run buttons in this course while you sort out a local install.`,
      codeExamples: [
        {
          language: 'python',
          code: `print("Hello, Python!")`,
          caption: 'The classic hello.py one-liner — try it here before saving to a file',
          editable: true,
        },
        {
          language: 'python',
          code: `# Save this as hello.py, then run: python hello.py
print("Hello, Python!")
print("Python is working on my computer!")`,
          caption: 'A slightly longer script you can copy into hello.py locally',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w1-1',
      title: 'What Is an Algorithm?',
      content: `Before you write code, it helps to know **what you're really doing**: solving a problem step by step.

An **algorithm** is a precise, ordered set of steps that takes an input and produces an output. Recipes, directions, and sorting a deck of cards are all algorithms — the steps must be clear enough that someone (or something) can follow them without guessing.

**Programming** is the act of writing those steps in a language a computer understands. Python is one such language: readable, widely used, and great for beginners.

**How Python runs your code**
1. You write a \`.py\` file (source code — text humans read).
2. You run it with the Python interpreter (e.g. \`python myfile.py\`).
3. Python reads your file **line by line**, top to bottom.
4. Each line is translated into instructions the computer executes immediately.

There is no separate "compile" step like in C or Java — Python is **interpreted**. Change a line, run again, and you see the new result right away.

**Example algorithm in plain English**
- Input: two numbers, a and b
- Step 1: add them together
- Step 2: display the sum
- Output: the sum printed on screen

The code examples on the right turn that idea into real Python. Press **Run** to watch the interpreter execute each line.`,
      codeExamples: [
        {
          language: 'python',
          code: `# A tiny algorithm: add two numbers and show the result
a = 3
b = 5
result = a + b
print(result)`,
          caption: 'An algorithm written as Python — run it line by line in your head, then press Run',
          editable: true,
        },
        {
          language: 'python',
          code: `# Python executes from top to bottom
print("Step 1: starting")
print("Step 2: middle")
print("Step 3: done")`,
          caption: 'Order matters — statements run in the order they appear',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w1-2',
      title: 'Literals, Operators & Expressions',
      content: `A **literal** is a value written directly in your code — the raw data itself.

Common Python literals:
- **Integer**: \`42\`, \`-7\`
- **Float**: \`3.14\`, \`0.5\`
- **String**: \`"hello"\`, \`'Python'\`
- **Boolean**: \`True\`, \`False\`

An **operator** is a symbol that performs an operation on values:
- **Arithmetic**: \`+\`, \`-\`, \`*\`, \`/\`, \`//\`, \`%\`, \`**\`
- **Comparison**: \`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`

An **expression** is any combination of literals, variables, and operators that **evaluates to a single value**.

Examples:
- \`3 + 4\` → \`7\`
- \`10 / 4\` → \`2.5\` (division always gives a float in Python 3)
- \`2 ** 3\` → \`8\` (exponentiation)
- \`"Hello" + " World"\` → \`"Hello World"\` (string concatenation)

You can nest expressions with parentheses: \`(10 + 5) * 2\` → \`30\`.

Expressions become useful when you pass them to \`print()\` — the value is computed first, then displayed.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Literals
print(42)          # integer literal
print(3.14)        # float literal
print("Python")    # string literal
print(True)        # boolean literal`,
          caption: 'Printing different kinds of literals',
          editable: true,
        },
        {
          language: 'python',
          code: `# Expressions — Python evaluates them before printing
print(10 + 3)       # 13
print(10 - 3)       # 7
print(10 * 3)       # 30
print(10 / 4)       # 2.5
print(10 // 4)      # 2  (floor division)
print(10 % 3)       # 1  (remainder)
print(2 ** 8)       # 256
print((10 + 5) * 2) # 30`,
          caption: 'Arithmetic expressions inside print()',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w1-3',
      title: 'Variables & Assignment',
      content: `A **variable** is a name that refers to a value stored in memory. Instead of repeating \`3.14\` everywhere, you can write \`pi = 3.14\` and use \`pi\` later.

The **assignment operator** \`=\` puts the value on the **right** into the name on the **left**. It does **not** mean "equals" in the maths sense — it means "store this value under this name."

\`\`\`
name = "Alice"
age = 14
score = 95.5
\`\`\`

**Rules for variable names**
- Letters, digits, and underscores: \`user_name\`, \`score2\`
- Cannot start with a digit: \`2fast\` is invalid
- Case-sensitive: \`Name\` and \`name\` are different
- Convention: use \`snake_case\` for multi-word names

**Reassignment** — a variable can point to a new value:
\`\`\`
x = 10
x = x + 1   # x is now 11
\`\`\`

Variables work inside expressions and \`print()\`. Python looks up the current value before computing.`,
      codeExamples: [
        {
          language: 'python',
          code: `name = "Alice"
age = 14
height = 1.65

print(name)
print(age)
print(height)`,
          caption: 'Create variables, then print their values',
          editable: true,
        },
        {
          language: 'python',
          code: `price = 4.50
quantity = 3
total = price * quantity

print("Total:", total)`,
          caption: 'Variables in expressions — total is computed from price and quantity',
          editable: true,
        },
        {
          language: 'python',
          code: `x = 10
y = 3
print(x + y)
print(x * y)
print(x / y)`,
          caption: 'Use variables inside arithmetic expressions',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w1-4',
      title: 'print() & Errors',
      content: `\`print()\` is Python's built-in function for sending output to the screen. Put one or more **arguments** inside the parentheses — Python converts each to text and displays them.

\`\`\`python
print("Hello")           # one string
print(42)                # a number
print("Score:", 100)     # multiple items, separated by a space
print(10 + 5)            # prints the result of an expression: 15
\`\`\`

**Multiple print calls** each produce a new line by default. One \`print()\` with several arguments keeps them on the **same line**, separated by spaces.

**Two kinds of errors beginners hit**

1. **Syntax error** — Python cannot even *parse* your file. The code breaks grammar rules (missing quote, wrong indentation, typo in a keyword). The program **never runs**. Example: \`print("hello)\` — missing closing quote.

2. **Runtime error** — the grammar is fine, but something goes wrong **while executing**. Example: \`print(undefined_name)\` — the name was never assigned, so Python raises a \`NameError\`.

Syntax errors are caught before run; runtime errors appear after you press Run. Reading the error message (line number + type) is a core skill — we'll practice spotting them throughout the course.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Different ways to use print()
print("Hello, Python!")
print(2024)
print("The answer is", 42)
print(7 + 8)`,
          caption: 'Strings, numbers, multiple arguments, and expressions',
          editable: true,
        },
        {
          language: 'python',
          code: `# Multiple print() calls — each on its own line
print("Line 1")
print("Line 2")
print("Line 3")`,
          caption: 'Each print() produces a new line of output',
          editable: true,
        },
        {
          language: 'python',
          code: `# Syntax error (uncomment to see — program won't run):
# print("missing quote)

# Runtime error (uncomment to see — runs then crashes):
# print(undefined_variable)

# Correct version:
message = "No errors here"
print(message)`,
          caption: 'Syntax vs runtime errors — only the last block runs cleanly',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    cr(
      'w1-q1',
      'Write a program that prints exactly:\n    Hello, Python!',
      '# Write your code here\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Basic greeting', expectedStdout: 'Hello, Python!' },
          { id: 's2', description: 'Exact string match', expectedStdout: 'Hello, Python!' },
        ],
        [
          { id: 'h1', expectedStdout: 'Hello, Python!' },
          { id: 'h2', expectedStdout: 'Hello, Python!' },
        ]
      ),
      'print("Hello, Python!")'
    ),
    cr(
      'w1-q2',
      'Print the integer 42 on its own line.',
      '# Print the number 42\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Integer literal', expectedStdout: '42' },
          { id: 's2', description: 'Single line output', expectedStdout: '42' },
        ],
        [
          { id: 'h1', expectedStdout: '42' },
          { id: 'h2', expectedStdout: '42' },
          { id: 'h3', expectedStdout: '42' },
        ]
      ),
      'print(42)'
    ),
    cr(
      'w1-q3',
      'Create a variable `language` with the value `"Python"`, then print it.',
      'language = \n# Print the variable\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Variable holds the string', expectedStdout: 'Python' },
          { id: 's2', description: 'Print variable value', expectedStdout: 'Python' },
        ],
        [
          { id: 'h1', expectedStdout: 'Python' },
          { id: 'h2', expectedStdout: 'Python' },
        ]
      ),
      'language = "Python"\nprint(language)'
    ),
    cr(
      'w1-q4',
      'Print the result of 15 + 27 (use an expression inside print, not a hardcoded 42).',
      '# Print the sum of 15 and 27\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Addition expression', expectedStdout: '42' },
          { id: 's2', description: 'Correct sum', expectedStdout: '42' },
        ],
        [
          { id: 'h1', expectedStdout: '42' },
          { id: 'h2', expectedStdout: '42' },
          { id: 'h3', expectedStdout: '42' },
        ]
      ),
      'print(15 + 27)'
    ),
    cr(
      'w1-q5',
      'Print three lines exactly:\n    First\n    Second\n    Third',
      '# Print three lines\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Three separate lines', expectedStdout: 'First\nSecond\nThird' },
          { id: 's2', description: 'Correct order', expectedStdout: 'First\nSecond\nThird' },
        ],
        [
          { id: 'h1', expectedStdout: 'First\nSecond\nThird' },
          { id: 'h2', expectedStdout: 'First\nSecond\nThird' },
        ]
      ),
      'print("First")\nprint("Second")\nprint("Third")'
    ),
    cr(
      'w1-q6',
      'Print the result of 8 * 7 using an expression inside print().',
      '# Print 8 times 7\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Multiplication', expectedStdout: '56' },
          { id: 's2', description: 'Product of 8 and 7', expectedStdout: '56' },
        ],
        [
          { id: 'h1', expectedStdout: '56' },
          { id: 'h2', expectedStdout: '56' },
          { id: 'h3', expectedStdout: '56' },
        ]
      ),
      'print(8 * 7)'
    ),
    cr(
      'w1-q7',
      'Set `name = "Ada"` and `year = 1843`, then print both on one line separated by a space using a single print() call.\nExpected output: Ada 1843',
      'name = \nyear = \n# Print name and year on one line\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Name and year on one line', expectedStdout: 'Ada 1843' },
          { id: 's2', description: 'Space between values', expectedStdout: 'Ada 1843' },
        ],
        [
          { id: 'h1', expectedStdout: 'Ada 1843' },
          { id: 'h2', expectedStdout: 'Ada 1843' },
        ]
      ),
      'name = "Ada"\nyear = 1843\nprint(name, year)'
    ),
    cr(
      'w1-q8',
      'Print the result of 100 divided by 8 (use `/` so Python shows the decimal).\nExpected output: 12.5',
      '# Print 100 / 8\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Float division', expectedStdout: '12.5' },
          { id: 's2', description: 'Decimal result', expectedStdout: '12.5' },
        ],
        [
          { id: 'h1', expectedStdout: '12.5' },
          { id: 'h2', expectedStdout: '12.5' },
          { id: 'h3', expectedStdout: '12.5' },
        ]
      ),
      'print(100 / 8)'
    ),
    cr(
      'w1-q9',
      'Assign `a = 10` and `b = 25`, then print their sum using variables (not literal numbers in print).',
      'a = \nb = \n# Print the sum\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Sum via variables', expectedStdout: '35' },
          { id: 's2', description: 'a + b', expectedStdout: '35' },
        ],
        [
          { id: 'h1', expectedStdout: '35' },
          { id: 'h2', expectedStdout: '35' },
        ]
      ),
      'a = 10\nb = 25\nprint(a + b)'
    ),
    cr(
      'w1-q10',
      'Print the result of (20 - 8) * 3 using parentheses in the expression.',
      '# Use (20 - 8) * 3\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Parentheses first', expectedStdout: '36' },
          { id: 's2', description: 'Correct evaluation order', expectedStdout: '36' },
        ],
        [
          { id: 'h1', expectedStdout: '36' },
          { id: 'h2', expectedStdout: '36' },
          { id: 'h3', expectedStdout: '36' },
        ]
      ),
      'print((20 - 8) * 3)'
    ),
    cr(
      'w1-q11',
      'Print exactly two lines:\n    CodeType\n    rocks',
      '# Two print statements\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Two lines of text', expectedStdout: 'CodeType\nrocks' },
          { id: 's2', description: 'Exact spelling and order', expectedStdout: 'CodeType\nrocks' },
        ],
        [
          { id: 'h1', expectedStdout: 'CodeType\nrocks' },
          { id: 'h2', expectedStdout: 'CodeType\nrocks' },
        ]
      ),
      'print("CodeType")\nprint("rocks")'
    ),
    cr(
      'w1-q12',
      'Set `x = 5` and `y = 2`, then print `x ** y` (5 to the power of 2).\nExpected output: 25',
      'x = \ny = \n# Print x raised to y\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Exponent with variables', expectedStdout: '25' },
          { id: 's2', description: '5 squared', expectedStdout: '25' },
        ],
        [
          { id: 'h1', expectedStdout: '25' },
          { id: 'h2', expectedStdout: '25' },
          { id: 'h3', expectedStdout: '25' },
        ]
      ),
      'x = 5\ny = 2\nprint(x ** y)'
    ),
    mc(
      'w1-q13',
      'Which best describes an algorithm?',
      [
        { id: 'a', text: 'A random guess until something works' },
        { id: 'b', text: 'A precise, ordered set of steps that transforms input into output' },
        { id: 'c', text: 'A type of Python variable' },
        { id: 'd', text: 'An error message from the interpreter' },
      ],
      'b',
      'An algorithm is a well-defined sequence of steps. Programs implement algorithms in a language like Python.'
    ),
    tf(
      'w1-q14',
      'A syntax error means Python refuses to run the file because the code breaks grammar rules (e.g. a missing quote).',
      'true',
      'Syntax errors are detected before execution. The interpreter cannot parse the file, so no lines run.'
    ),
    fib(
      'w1-q15',
      'What operator assigns a value to a variable? (one character)',
      '=',
      'The assignment operator = stores the value on the right into the name on the left. It is not the same as == (equality comparison).'
    ),
    mc(
      'w1-q16',
      'Which of these is a string literal in Python?',
      [
        { id: 'a', text: '42' },
        { id: 'b', text: '3.14' },
        { id: 'c', text: '"hello"' },
        { id: 'd', text: 'True' },
      ],
      'c',
      '"hello" is a string literal — text written directly in code. 42 is an int, 3.14 is a float, and True is a bool.'
    ),
  ],
};

export default week1;
