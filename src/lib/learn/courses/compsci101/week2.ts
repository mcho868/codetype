import type { Module } from '../python101/types';
import { cr, mc, tf, fib, stdoutCases } from './authoring';

const week2: Module = {
  id: 'week-2',
  slug: 'week-2',
  title: 'Input & Output, Types',
  description:
    'Read user input with input(), work with int/float/str, format output with f-strings, and write clear comments and docstrings.',
  icon: '📝',
  color: 'from-cyan-500 to-teal-400',
  locked: false,
  section: 'Week 2',
  lessons: [
    {
      id: 'lesson-w2-1',
      title: 'Input and Output',
      content: `Programs become interactive when they read data from the user and respond.

**print()** sends output to the screen. You can print literals, variables, or several values separated by commas — Python adds a space between them.

**input()** pauses the program and waits for the user to type a line and press Enter. Whatever they type is returned as a **string**.

Because input() always returns a string, convert it when you need a number:
- \`int(...)\` for whole numbers
- \`float(...)\` for decimals

**Tip:** In these exercises, use bare \`input()\` with no prompt unless the question says otherwise. Each line of stdin is one call to input().`,
      codeExamples: [
        {
          language: 'python',
          code: `name = input()
print("Hi", name)`,
          caption: 'Read a name and greet the user',
          editable: true,
        },
        {
          language: 'python',
          code: `age = int(input())
print("Next year you will be", age + 1)`,
          caption: 'Convert input to int before doing arithmetic',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w2-2',
      title: 'Types: int, float, and str',
      content: `Every value in Python has a **type** that tells you what kind of data it is.

Common types you'll use constantly:
- **int** — whole numbers: \`42\`, \`-7\`, \`0\`
- **float** — decimal numbers: \`3.14\`, \`2.0\`, \`-0.5\`
- **str** — text strings: \`"hello"\`, \`'world'\`
- **bool** — \`True\` or \`False\`

Use **type()** to inspect a value's type. Use **int()**, **float()**, and **str()** to convert between types.

**Remember:** \`int(3.9)\` truncates toward zero (gives \`3\`), it does not round.`,
      codeExamples: [
        {
          language: 'python',
          code: `x = 42
print(type(x))        # <class 'int'>

y = 3.14
print(type(y))        # <class 'float'>

word = "hello"
print(type(word))     # <class 'str'>

# Converting types
print(int("42"))      # 42
print(float("3.14"))  # 3.14
print(str(100))       # "100"`,
          caption: 'Checking and converting types',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w2-3',
      title: 'Working with Numbers',
      content: `Python supports the arithmetic you expect from a calculator:

- \`+\` addition, \`-\` subtraction, \`*\` multiplication, \`/\` division (always gives a float)
- \`//\` floor division (integer result), \`%\` modulo (remainder), \`**\` exponentiation

When you mix ints and floats, Python promotes to float. Division \`/\` always returns a float even when the result is whole (\`10 / 2\` is \`5.0\`).

**The modulo operator \`%\`** gives the **remainder** after dividing. For example, \`17 % 5\` is \`2\` because 17 = 3×5 + 2. It pairs with floor division \`//\`, which gives the quotient: \`17 // 5\` is \`3\`.

Modulo is one of the most useful operators in programming:
- **Even or odd?** \`n % 2\` is \`0\` for even numbers and \`1\` for odd ones. So \`n % 2 == 0\` tests "is n even?"
- **Divisible by k?** \`n % k == 0\` is True when \`n\` divides evenly by \`k\`.
- **Last digit** of a number: \`n % 10\` (e.g. \`426 % 10\` is \`6\`).

You'll use \`n % 2 == 0\` constantly once you reach conditions in the next module.

Combine input and conversion to build simple calculators:`,
      codeExamples: [
        {
          language: 'python',
          code: `a = int(input())
b = int(input())
print(a + b)
print(a - b)
print(a * b)
print(a // b)
print(a % b)`,
          caption: 'A two-number calculator from stdin',
          editable: true,
        },
        {
          language: 'python',
          code: `# The modulo operator % gives the remainder
print(17 % 5)        # 2  (17 = 3*5 + 2)
print(17 // 5)       # 3  (the quotient)

# Even/odd: a number is even when its remainder mod 2 is 0
print(8 % 2)         # 0
print(7 % 2)         # 1
print(8 % 2 == 0)    # True  (8 is even)
print(7 % 2 == 0)    # False (7 is odd)

print(426 % 10)      # 6  (the last digit)`,
          caption: 'Modulo (%): remainders, even/odd, and last digit',
          editable: true,
        },
        {
          language: 'python',
          code: `width = float(input())
height = float(input())
area = width * height
print(area)`,
          caption: 'Rectangle area with float input',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w2-4',
      title: 'f-strings',
      content: `An **f-string** (formatted string literal) embeds expressions inside a string. Prefix the quotes with \`f\`:

\`\`\`python
name = "Alice"
age = 14
print(f"My name is {name} and I am {age} years old.")
\`\`\`

Anything inside \`{...}\` is evaluated and converted to text. You can put variables, arithmetic, and even function calls inside the braces.

f-strings are the preferred way to build readable output in modern Python.`,
      codeExamples: [
        {
          language: 'python',
          code: `name = input()
age = int(input())
print(f"Hello, {name}! You are {age} years old.")

x = 7
y = 3
print(f"{x} + {y} = {x + y}")`,
          caption: 'f-strings with variables and expressions',
          editable: true,
        },
        {
          language: 'python',
          code: `celsius = float(input())
fahrenheit = celsius * 9 / 5 + 32
print(f"{celsius}°C is {fahrenheit}°F")`,
          caption: 'Temperature conversion with an f-string',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w2-5',
      title: 'Comments, Docstrings, and Style',
      content: `Good code explains *what* it does, not just *how*.

**Comments** start with \`#\`. Python ignores everything after \`#\` on that line. Use comments to clarify non-obvious logic.

**Docstrings** are multi-line strings at the top of a function or module, wrapped in triple quotes \`"""\`. They document what the code is for.

**PEP 8 style** (Python's style guide) recommends:
- 4 spaces per indentation level (never tabs)
- Lowercase variable names with underscores: \`student_name\`
- Spaces around operators: \`x = a + b\`
- One statement per line when possible

Comments and docstrings never change what the program computes — they are for human readers.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Program: greet the user by name
name = input()          # read one line from stdin
print("Welcome,", name) # comma adds a space automatically`,
          caption: 'Inline and full-line comments',
          editable: true,
        },
        {
          language: 'python',
          code: `def greet(name):
    """Return a friendly greeting string."""
    return f"Hello, {name}!"

print(greet("World"))`,
          caption: 'A function with a docstring',
          editable: true,
        },
      ],
    },
  ],
  questions: [
  // ── Concept checks (3) ──────────────────────────────────────────────────
    mc(
      'w2-q1',
      'What type does `input()` always return, even if the user types digits?',
      [
        { id: 'a', text: 'int' },
        { id: 'b', text: 'float' },
        { id: 'c', text: 'str' },
        { id: 'd', text: 'The type matching what the user typed' },
      ],
      'c',
      '`input()` always returns a string. Use `int()` or `float()` to convert numeric input before arithmetic.'
    ),
    tf(
      'w2-q2',
      '`int(3.9)` rounds to 4 because 3.9 is closer to 4 than to 3.',
      'false',
      '`int()` truncates toward zero — it drops the decimal part without rounding. `int(3.9)` is `3`, not `4`.'
    ),
    fib(
      'w2-q3',
      'In Python, a single-line comment begins with the _____ character.',
      '#',
      'The hash symbol `#` starts a comment. Everything after it on that line is ignored by Python.'
    ),

  // ── Code-runner: input & greeting (4) ───────────────────────────────────
    cr(
      'w2-q4',
      'Read a name from stdin with `input()` and print a greeting on one line: `Hi <name>` (with a space after Hi).\n\nExample: if stdin is `Alice`, output is `Hi Alice`.',
      `name = input()
print("Hi", name)`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Greet Alice', stdin: 'Alice\n', expectedStdout: 'Hi Alice' },
          { id: 's2', description: 'Greet Bob', stdin: 'Bob\n', expectedStdout: 'Hi Bob' },
          { id: 's3', description: 'Greet a single-letter name', stdin: 'Z\n', expectedStdout: 'Hi Z' },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: 'Hi ' },
          { id: 'h2', stdin: 'Jean-Luc\n', expectedStdout: 'Hi Jean-Luc' },
          { id: 'h3', stdin: '  spaces  \n', expectedStdout: 'Hi   spaces  ' },
          { id: 'h4', stdin: 'O\'Brien\n', expectedStdout: "Hi O'Brien" },
        ]
      ),
      'Use `name = input()` then `print("Hi", name)`. The comma in print adds a space between arguments.'
    ),
    cr(
      'w2-q5',
      'Read two integers (one per line) from stdin and print their **sum** on one line.',
      `a = int(input())
b = int(input())
print(a + b)`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: '3 + 5 = 8', stdin: '3\n5\n', expectedStdout: '8' },
          { id: 's2', description: '10 + 20 = 30', stdin: '10\n20\n', expectedStdout: '30' },
          { id: 's3', description: '0 + 0 = 0', stdin: '0\n0\n', expectedStdout: '0' },
        ],
        [
          { id: 'h1', stdin: '-3\n7\n', expectedStdout: '4' },
          { id: 'h2', stdin: '-10\n-5\n', expectedStdout: '-15' },
          { id: 'h3', stdin: '100\n250\n', expectedStdout: '350' },
          { id: 'h4', stdin: '1\n-1\n', expectedStdout: '0' },
        ]
      ),
      'Convert each line with `int(input())`, add them, and `print` the result.'
    ),
    cr(
      'w2-q6',
      'Read one line from stdin, convert it to an **integer** with `int()`, and print the value **doubled**.',
      `n = int(input())
print(n * 2)`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Double 5 → 10', stdin: '5\n', expectedStdout: '10' },
          { id: 's2', description: 'Double 0 → 0', stdin: '0\n', expectedStdout: '0' },
          { id: 's3', description: 'Double 12 → 24', stdin: '12\n', expectedStdout: '24' },
        ],
        [
          { id: 'h1', stdin: '-4\n', expectedStdout: '-8' },
          { id: 'h2', stdin: '1\n', expectedStdout: '2' },
          { id: 'h3', stdin: '100\n', expectedStdout: '200' },
          { id: 'h4', stdin: '-99\n', expectedStdout: '-198' },
        ]
      ),
      '`int(input())` converts the string to an integer, then multiply by 2 and print.'
    ),
    cr(
      'w2-q7',
      'Read an integer `age` from stdin and print how old the person will be **next year** using an f-string exactly like: `Next year: <age+1>`',
      `age = int(input())
print(f"Next year: {age + 1}")`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Age 14', stdin: '14\n', expectedStdout: 'Next year: 15' },
          { id: 's2', description: 'Age 0', stdin: '0\n', expectedStdout: 'Next year: 1' },
          { id: 's3', description: 'Age 99', stdin: '99\n', expectedStdout: 'Next year: 100' },
        ],
        [
          { id: 'h1', stdin: '1\n', expectedStdout: 'Next year: 2' },
          { id: 'h2', stdin: '-1\n', expectedStdout: 'Next year: 0' },
          { id: 'h3', stdin: '50\n', expectedStdout: 'Next year: 51' },
          { id: 'h4', stdin: '17\n', expectedStdout: 'Next year: 18' },
        ]
      ),
      'Read with `int(input())`, then `print(f"Next year: {age + 1}")`.'
    ),

  // ── Code-runner: types & conversion (3) ─────────────────────────────────
    cr(
      'w2-q8',
      'Read a number as a string from stdin and print its type on one line using `type()`. The output looks like `<class \'str\'>`.',
      `value = input()
print(type(value))`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Type of "42"', stdin: '42\n', expectedStdout: "<class 'str'>" },
          { id: 's2', description: 'Type of "hello"', stdin: 'hello\n', expectedStdout: "<class 'str'>" },
          { id: 's3', description: 'Type of "3.14"', stdin: '3.14\n', expectedStdout: "<class 'str'>" },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: "<class 'str'>" },
          { id: 'h2', stdin: '0\n', expectedStdout: "<class 'str'>" },
          { id: 'h3', stdin: '-7\n', expectedStdout: "<class 'str'>" },
          { id: 'h4', stdin: '  x  \n', expectedStdout: "<class 'str'>" },
        ]
      ),
      '`input()` always gives a str, so `type(value)` is always `<class \'str\'>` here.'
    ),
    cr(
      'w2-q9',
      'Read a string from stdin, convert it to an **int** with `int()`, and print the result.',
      `text = input()
print(int(text))`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: '"42" → 42', stdin: '42\n', expectedStdout: '42' },
          { id: 's2', description: '"0" → 0', stdin: '0\n', expectedStdout: '0' },
          { id: 's3', description: '"7" → 7', stdin: '7\n', expectedStdout: '7' },
        ],
        [
          { id: 'h1', stdin: '-15\n', expectedStdout: '-15' },
          { id: 'h2', stdin: '1000\n', expectedStdout: '1000' },
          { id: 'h3', stdin: '1\n', expectedStdout: '1' },
          { id: 'h4', stdin: '-1\n', expectedStdout: '-1' },
        ]
      ),
      'Wrap the input in `int()` before printing: `print(int(text))`.'
    ),
    cr(
      'w2-q10',
      'Read a string from stdin, convert it to a **float** with `float()`, and print the result.',
      `text = input()
print(float(text))`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: '"3.14" → 3.14', stdin: '3.14\n', expectedStdout: '3.14' },
          { id: 's2', description: '"5" → 5.0', stdin: '5\n', expectedStdout: '5.0' },
          { id: 's3', description: '"0.5" → 0.5', stdin: '0.5\n', expectedStdout: '0.5' },
        ],
        [
          { id: 'h1', stdin: '-2.5\n', expectedStdout: '-2.5' },
          { id: 'h2', stdin: '0\n', expectedStdout: '0.0' },
          { id: 'h3', stdin: '-0.1\n', expectedStdout: '-0.1' },
          { id: 'h4', stdin: '100.0\n', expectedStdout: '100.0' },
        ]
      ),
      '`float(input())` parses decimals. Whole-number strings like `"5"` become `5.0`.'
    ),

  // ── Code-runner: f-strings (4) ──────────────────────────────────────────
    cr(
      'w2-q11',
      'Read a `name` (line 1) and an integer `age` (line 2) from stdin. Print exactly: `Hello, <name>! You are <age> years old.` using an f-string.',
      `name = input()
age = int(input())
print(f"Hello, {name}! You are {age} years old.")`,
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: 'Alice, 14',
            stdin: 'Alice\n14\n',
            expectedStdout: 'Hello, Alice! You are 14 years old.',
          },
          {
            id: 's2',
            description: 'Bob, 7',
            stdin: 'Bob\n7\n',
            expectedStdout: 'Hello, Bob! You are 7 years old.',
          },
          {
            id: 's3',
            description: 'Sam, 0',
            stdin: 'Sam\n0\n',
            expectedStdout: 'Hello, Sam! You are 0 years old.',
          },
        ],
        [
          { id: 'h1', stdin: '\n10\n', expectedStdout: 'Hello, ! You are 10 years old.' },
          { id: 'h2', stdin: 'Z\n1\n', expectedStdout: 'Hello, Z! You are 1 years old.' },
          { id: 'h3', stdin: 'Lee\n99\n', expectedStdout: 'Hello, Lee! You are 99 years old.' },
          { id: 'h4', stdin: 'Pat\n-3\n', expectedStdout: 'Hello, Pat! You are -3 years old.' },
        ]
      ),
      'Read name as str and age as int, then use `print(f"Hello, {name}! You are {age} years old.")`.'
    ),
    cr(
      'w2-q12',
      'Read two integers from stdin and print their sum using an f-string in the form: `<a> + <b> = <result>`',
      `a = int(input())
b = int(input())
print(f"{a} + {b} = {a + b}")`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: '2 + 3 = 5', stdin: '2\n3\n', expectedStdout: '2 + 3 = 5' },
          { id: 's2', description: '10 + 0 = 10', stdin: '10\n0\n', expectedStdout: '10 + 0 = 10' },
          { id: 's3', description: '7 + 8 = 15', stdin: '7\n8\n', expectedStdout: '7 + 8 = 15' },
        ],
        [
          { id: 'h1', stdin: '-1\n1\n', expectedStdout: '-1 + 1 = 0' },
          { id: 'h2', stdin: '-5\n-3\n', expectedStdout: '-5 + -3 = -8' },
          { id: 'h3', stdin: '0\n0\n', expectedStdout: '0 + 0 = 0' },
          { id: 'h4', stdin: '100\n200\n', expectedStdout: '100 + 200 = 300' },
        ]
      ),
      'Embed variables and `a + b` inside the f-string braces.'
    ),
    cr(
      'w2-q13',
      'Read `width` and `height` as floats (one per line) and print the rectangle area using an f-string: `Area: <area>`',
      `width = float(input())
height = float(input())
print(f"Area: {width * height}")`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: '3 × 4 = 12', stdin: '3\n4\n', expectedStdout: 'Area: 12.0' },
          { id: 's2', description: '2.5 × 2 = 5', stdin: '2.5\n2\n', expectedStdout: 'Area: 5.0' },
          { id: 's3', description: '1 × 1 = 1', stdin: '1\n1\n', expectedStdout: 'Area: 1.0' },
        ],
        [
          { id: 'h1', stdin: '0\n5\n', expectedStdout: 'Area: 0.0' },
          { id: 'h2', stdin: '10.5\n2\n', expectedStdout: 'Area: 21.0' },
          { id: 'h3', stdin: '-3\n4\n', expectedStdout: 'Area: -12.0' },
          { id: 'h4', stdin: '0.1\n0.2\n', expectedStdout: 'Area: 0.020000000000000004' },
        ]
      ),
      'Multiply width × height, then `print(f"Area: {area}")`. Float multiplication preserves decimal type.'
    ),
    cr(
      'w2-q14',
      'Read a Celsius temperature (float) from stdin, convert to Fahrenheit with `f = c * 9/5 + 32`, and print using an f-string: `<c> C = <f> F` (use capital C and F as shown).',
      `c = float(input())
f = c * 9 / 5 + 32
print(f"{c} C = {f} F")`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: '0 °C → 32 °F', stdin: '0\n', expectedStdout: '0.0 C = 32.0 F' },
          { id: 's2', description: '100 °C → 212 °F', stdin: '100\n', expectedStdout: '100.0 C = 212.0 F' },
          { id: 's3', description: '-40 °C → -40 °F', stdin: '-40\n', expectedStdout: '-40.0 C = -40.0 F' },
        ],
        [
          { id: 'h1', stdin: '37\n', expectedStdout: '37.0 C = 98.6 F' },
          { id: 'h2', stdin: '-17.5\n', expectedStdout: '-17.5 C = 0.5 F' },
          { id: 'h3', stdin: '25\n', expectedStdout: '25.0 C = 77.0 F' },
          { id: 'h4', stdin: '1.5\n', expectedStdout: '1.5 C = 34.7 F' },
        ]
      ),
      'Formula: `f = c * 9 / 5 + 32`. Print with an f-string showing both values.'
    ),

  // ── Code-runner: numbers & arithmetic (3) ───────────────────────────────
    cr(
      'w2-q15',
      'Read two integers from stdin and print two lines:\n1. The **quotient** using integer division (`//`)\n2. The **remainder** using modulo (`%`)',
      `a = int(input())
b = int(input())
print(a // b)
print(a % b)`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: '17 ÷ 5', stdin: '17\n5\n', expectedStdout: '3\n2' },
          { id: 's2', description: '10 ÷ 2', stdin: '10\n2\n', expectedStdout: '5\n0' },
          { id: 's3', description: '7 ÷ 3', stdin: '7\n3\n', expectedStdout: '2\n1' },
        ],
        [
          { id: 'h1', stdin: '0\n5\n', expectedStdout: '0\n0' },
          { id: 'h2', stdin: '-7\n3\n', expectedStdout: '-3\n2' },
          { id: 'h3', stdin: '1\n1\n', expectedStdout: '1\n0' },
          { id: 'h4', stdin: '99\n10\n', expectedStdout: '9\n9' },
        ]
      ),
      'Use `//` for whole-number division and `%` for the remainder. Print each on its own line.'
    ),
    cr(
      'w2-q16',
      'Read three floats (one per line) from stdin and print their **average** on one line.',
      `a = float(input())
b = float(input())
c = float(input())
print((a + b + c) / 3)`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Average of 3, 6, 9', stdin: '3\n6\n9\n', expectedStdout: '6.0' },
          { id: 's2', description: 'Average of 0, 0, 0', stdin: '0\n0\n0\n', expectedStdout: '0.0' },
          { id: 's3', description: 'Average of 1, 2, 3', stdin: '1\n2\n3\n', expectedStdout: '2.0' },
        ],
        [
          { id: 'h1', stdin: '-3\n0\n3\n', expectedStdout: '0.0' },
          { id: 'h2', stdin: '10\n10\n10\n', expectedStdout: '10.0' },
          { id: 'h3', stdin: '1.5\n2.5\n3\n', expectedStdout: '2.3333333333333335' },
          { id: 'h4', stdin: '-6\n-3\n0\n', expectedStdout: '-3.0' },
        ]
      ),
      'Sum the three values and divide by 3: `print((a + b + c) / 3)`.'
    ),
    cr(
      'w2-q17',
      'Read an integer from stdin and print the result of `int(n / 2)` on one line. This shows how `/` produces a float before `int()` truncates.',
      `n = int(input())
print(int(n / 2))`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: '9 / 2 truncated', stdin: '9\n', expectedStdout: '4' },
          { id: 's2', description: '10 / 2 truncated', stdin: '10\n', expectedStdout: '5' },
          { id: 's3', description: '3 / 2 truncated', stdin: '3\n', expectedStdout: '1' },
        ],
        [
          { id: 'h1', stdin: '0\n', expectedStdout: '0' },
          { id: 'h2', stdin: '-5\n', expectedStdout: '-2' },
          { id: 'h3', stdin: '-4\n', expectedStdout: '-2' },
          { id: 'h4', stdin: '1\n', expectedStdout: '0' },
        ]
      ),
      '`n / 2` uses float division; wrapping in `int()` truncates toward zero.'
    ),

  // ── Code-runner: comments & style (1) ─────────────────────────────────
    cr(
      'w2-q18',
      'Complete the program so it reads a name from stdin and prints `Welcome, <name>` on one line. The comment lines must stay — they do not affect the output.',
      `# Read the user's name from standard input
name = input()
# Greet them on one line
print("Welcome,", name)`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Welcome Alice', stdin: 'Alice\n', expectedStdout: 'Welcome, Alice' },
          { id: 's2', description: 'Welcome Bob', stdin: 'Bob\n', expectedStdout: 'Welcome, Bob' },
          { id: 's3', description: 'Welcome empty name', stdin: '\n', expectedStdout: 'Welcome, ' },
        ],
        [
          { id: 'h1', stdin: 'Sam\n', expectedStdout: 'Welcome, Sam' },
          { id: 'h2', stdin: '0\n', expectedStdout: 'Welcome, 0' },
          { id: 'h3', stdin: '-1\n', expectedStdout: 'Welcome, -1' },
          { id: 'h4', stdin: 'Jean\n', expectedStdout: 'Welcome, Jean' },
        ]
      ),
      'Comments are ignored by Python. Use `name = input()` and `print("Welcome,", name)`.'
    ),
  ],
};

export default week2;
