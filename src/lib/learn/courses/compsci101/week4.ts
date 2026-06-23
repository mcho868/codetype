import type { Module } from '../python101/types';
import { cr, mc, tf, stdoutCases } from './authoring';

const week4: Module = {
  id: 'week-4',
  slug: 'week-4',
  title: 'while Loops',
  description:
    'Repeat code with while loops, build accumulators, read until a sentinel value, and validate user input with loops.',
  icon: '🔄',
  color: 'from-emerald-500 to-green-400',
  locked: false,
  section: 'Week 4',
  lessons: [
    {
      id: 'lesson-w4-1',
      title: 'while Loops',
      content: `A **while loop** repeats a block of code **as long as** a condition is True.

**Structure:**
\`\`\`python
while condition:
    # body — indented 4 spaces
\`\`\`

**How it works:**
1. Python checks the condition
2. If True, run the body, then go back to step 1
3. If False, skip the body and continue after the loop

**Important:** If the condition never becomes False, you get an **infinite loop**. Make sure something in the body eventually changes the condition (e.g. increment a counter, read new input).

**When to use while:** you do not know in advance how many times to repeat — you stop when a condition becomes False.`,
      codeExamples: [
        {
          language: 'python',
          code: `count = 1
while count <= 3:
    print(count)
    count = count + 1

# Prints:
# 1
# 2
# 3`,
          caption: 'Counter-controlled while loop',
          editable: true,
        },
        {
          language: 'python',
          code: `n = 5
while n > 0:
    print(n)
    n = n - 1

# Prints 5 down to 1`,
          caption: 'Decrementing until the condition is False',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w4-2',
      title: 'Accumulators',
      content: `An **accumulator** is a variable that **builds up a result** across loop iterations.

Common patterns:
- **Sum:** \`total = 0\`, then \`total = total + value\` each time
- **Count:** \`count = 0\`, then \`count = count + 1\` when something happens
- **Product:** \`product = 1\`, then \`product = product * value\`

Initialize **before** the loop, update **inside**, use **after**.

Here the loop runs a **known** number of times (a counter controls when to stop). Sentinel loops — stopping on special input — come next.`,
      codeExamples: [
        {
          language: 'python',
          code: `total = 0
i = 1
while i <= 5:
    total = total + i
    i = i + 1
print(total)  # 15`,
          caption: 'Sum 1 through 5 with a counter',
          editable: true,
        },
        {
          language: 'python',
          code: `count = 0
n = 10
while n > 0:
    if n % 2 == 0:
        count = count + 1
    n = n - 1
print(count)  # even numbers from 1..10 → 5`,
          caption: 'Count how many values meet a condition',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w4-3',
      title: 'Sentinel Loops',
      content: `A **sentinel loop** repeats until a special **sentinel value** signals "stop." You usually do **not** know how many iterations you need ahead of time.

Common sentinels:
- \`0\` or \`-1\` when reading numbers
- \`""\` (empty string) when reading lines
- \`"done"\` or \`"quit"\` when reading commands

The sentinel is **not** part of the result. Read the first value **before** the loop, check it in the condition, then read again at the bottom of the body.

Sentinel loops often use an **accumulator** inside — but the stopping rule is what makes this pattern different from a counter loop.`,
      codeExamples: [
        {
          language: 'python',
          code: `total = 0
num = int(input())
while num != 0:
    total = total + num
    num = int(input())
print(total)`,
          caption: 'Sum integers until sentinel 0 (0 is not included)',
          editable: true,
        },
        {
          language: 'python',
          code: `count = 0
line = input()
while line != "":
    count = count + 1
    line = input()
print(count)`,
          caption: 'Count lines until a blank line',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w4-4',
      title: 'Input Validation',
      content: `Use a while loop to **keep asking** until the user enters valid data.

Pattern:
\`\`\`python
value = int(input())
while value < 1 or value > 10:
    value = int(input())
print(value)  # guaranteed valid
\`\`\`

The loop body runs again when input is invalid. Once input passes the check, the loop exits.

**Tips:**
- Validate **after** reading (check the variable, not \`input()\` alone in the condition)
- Give clear bounds: \`< 1\`, \`<= 0\`, \`len(password) < 8\`, etc.
- This is different from a sentinel loop: you keep the **last invalid** read until a valid one arrives

> **Note:** \`len(x)\` gives the number of characters in a string (or items in a list). We use it here just to check a length — it is covered fully in **Week 5**.`,
      codeExamples: [
        {
          language: 'python',
          code: `age = int(input())
while age < 0 or age > 120:
    age = int(input())
print("Age accepted:", age)`,
          caption: 'Re-read until age is in range',
          editable: true,
        },
        {
          language: 'python',
          code: `password = input()
while len(password) < 8:
    password = input()
print("ok")`,
          caption: 'Repeat until password is long enough',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w4-5',
      title: 'Loop Patterns & Pitfalls',
      content: `**Counter vs sentinel:** A counter loop runs until a variable reaches a limit (\`while i <= n\`). A sentinel loop runs until a special input value appears.

**Off-by-one:** \`while i <= n\` includes \`n\`; \`while i < n\` excludes it. Pick deliberately.

**Infinite loops:** If the condition never becomes False, the program runs forever. Always ensure the body moves toward False (update the counter, read new input, shrink \`n\`).

**break** (preview): You can exit a loop early with \`break\` when a special case occurs inside the body.`,
      codeExamples: [
        {
          language: 'python',
          code: `n = 5

# Includes n → 1, 2, 3, 4, 5
i = 1
while i <= n:
    print(i, end=" ")
    i = i + 1
print()

# Excludes n → 1, 2, 3, 4
i = 1
while i < n:
    print(i, end=" ")
    i = i + 1
print()`,
          caption: '<= vs < — off-by-one matters',
          editable: true,
        },
        {
          language: 'python',
          code: `# Avoid: condition never changes → infinite loop
# while True:
#     print("stuck")

# Better: use a counter or sentinel
remaining = 3
while remaining > 0:
    print("tick")
    remaining = remaining - 1`,
          caption: 'Always progress toward False',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    mc(
      'w4-q1',
      `What does this code print?

\`\`\`python
n = 3
while n > 0:
    print(n)
    n = n - 1
\`\`\``,
      [
        { id: 'a', text: '3\n2\n1' },
        { id: 'b', text: '1\n2\n3' },
        { id: 'c', text: '3\n2\n1\n0' },
        { id: 'd', text: 'Infinite loop' },
      ],
      'a',
      'n starts at 3. Each iteration prints n then decrements. When n becomes 0, the condition n > 0 is False and the loop stops. Output: 3, 2, 1.'
    ),

    cr(
      'w4-q2',
      'Write a program that reads an integer `n`, then prints the numbers **1 through n** (one per line). Use a **while** loop.',
      `n = int(input())
i = 1
while i <= n:
    print(i)
    i = i + 1`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'n = 3', stdin: '3\n', expectedStdout: '1\n2\n3' },
          { id: 's2', description: 'n = 1', stdin: '1\n', expectedStdout: '1' },
        ],
        [
          { id: 'h1', stdin: '5\n', expectedStdout: '1\n2\n3\n4\n5' },
          { id: 'h2', stdin: '2\n', expectedStdout: '1\n2' },
          { id: 'h3', stdin: '4\n', expectedStdout: '1\n2\n3\n4' },
        ]
      ),
      'Model solution:\nn = int(input())\ni = 1\nwhile i <= n:\n    print(i)\n    i = i + 1'
    ),

    cr(
      'w4-q3',
      'Read an integer `n` from stdin and print the sum **1 + 2 + … + n** using a **while** loop. Assume n ≥ 0 (if n is 0, the sum is 0).',
      'n = int(input())\n# Print the sum 1..n\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Small sum', stdin: '5\n', expectedStdout: '15' },
          { id: 's2', description: 'Zero', stdin: '0\n', expectedStdout: '0' },
        ],
        [
          { id: 'h1', stdin: '1\n', expectedStdout: '1' },
          { id: 'h2', stdin: '10\n', expectedStdout: '55' },
          { id: 'h3', stdin: '100\n', expectedStdout: '5050' },
          { id: 'h4', stdin: '3\n', expectedStdout: '6' },
        ]
      ),
      'Model solution:\nn = int(input())\ntotal = 0\ni = 1\nwhile i <= n:\n    total = total + i\n    i = i + 1\nprint(total)'
    ),

    tf(
      'w4-q4',
      'A while loop always executes its body at least once, even when the condition starts as False.',
      'false',
      'Python checks the condition before each iteration. If it is False initially, the body never runs. (Some languages have do-while; Python does not.)'
    ),

    cr(
      'w4-q5',
      'Write a program that reads integers (one per line) until **0** is read. Print the **sum** of all numbers read **excluding** the final 0.',
      `total = 0
num = int(input())
while num != 0:
    total = total + num
    num = int(input())
print(total)`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: '1 2 0', stdin: '1\n2\n0\n', expectedStdout: '3' },
          { id: 's2', description: 'Only sentinel', stdin: '0\n', expectedStdout: '0' },
        ],
        [
          { id: 'h1', stdin: '5\n-2\n3\n0\n', expectedStdout: '6' },
          { id: 'h2', stdin: '10\n0\n', expectedStdout: '10' },
          { id: 'h3', stdin: '-1\n-2\n-3\n0\n', expectedStdout: '-6' },
          { id: 'h4', stdin: '7\n0\n', expectedStdout: '7' },
        ]
      ),
      'Model solution:\ntotal = 0\nnum = int(input())\nwhile num != 0:\n    total = total + num\n    num = int(input())\nprint(total)'
    ),

    cr(
      'w4-q6',
      'Read an integer `n` and print **n!** (n × (n−1) × … × 1) using a **while** loop. By convention, **0! = 1**. Assume n ≥ 0.',
      'n = int(input())\n# Print n factorial\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: '5!', stdin: '5\n', expectedStdout: '120' },
          { id: 's2', description: '0!', stdin: '0\n', expectedStdout: '1' },
        ],
        [
          { id: 'h1', stdin: '1\n', expectedStdout: '1' },
          { id: 'h2', stdin: '3\n', expectedStdout: '6' },
          { id: 'h3', stdin: '4\n', expectedStdout: '24' },
          { id: 'h4', stdin: '6\n', expectedStdout: '720' },
        ]
      ),
      'Model solution:\nn = int(input())\nresult = 1\nwhile n > 1:\n    result = result * n\n    n = n - 1\nprint(result)'
    ),

    cr(
      'w4-q7',
      'Write a program that reads an integer `n` and prints a **countdown** from **n down to 1** (one number per line). Use a while loop.',
      `n = int(input())
while n >= 1:
    print(n)
    n = n - 1`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Count from 3', stdin: '3\n', expectedStdout: '3\n2\n1' },
          { id: 's2', description: 'Count from 1', stdin: '1\n', expectedStdout: '1' },
        ],
        [
          { id: 'h1', stdin: '5\n', expectedStdout: '5\n4\n3\n2\n1' },
          { id: 'h2', stdin: '2\n', expectedStdout: '2\n1' },
          { id: 'h3', stdin: '4\n', expectedStdout: '4\n3\n2\n1' },
        ]
      ),
      'Model solution:\nn = int(input())\nwhile n >= 1:\n    print(n)\n    n = n - 1'
    ),

    cr(
      'w4-q8',
      'Read an integer `n` and print how many **even integers** are in **1, 2, …, n** (inclusive). Use a while loop. Assume n ≥ 0.',
      'n = int(input())\n# Print the count of evens in 1..n\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: '1 through 10', stdin: '10\n', expectedStdout: '5' },
          { id: 's2', description: 'No numbers', stdin: '0\n', expectedStdout: '0' },
        ],
        [
          { id: 'h1', stdin: '1\n', expectedStdout: '0' },
          { id: 'h2', stdin: '2\n', expectedStdout: '1' },
          { id: 'h3', stdin: '7\n', expectedStdout: '3' },
          { id: 'h4', stdin: '20\n', expectedStdout: '10' },
        ]
      ),
      'Model solution:\nn = int(input())\ncount = 0\ni = 1\nwhile i <= n:\n    if i % 2 == 0:\n        count = count + 1\n    i = i + 1\nprint(count)'
    ),

    cr(
      'w4-q9',
      'Write a program that reads lines of text until an **empty line** (`""`) is entered. Print the **number of non-empty lines** read (do not count the final empty line).',
      `count = 0
line = input()
while line != "":
    count = count + 1
    line = input()
print(count)`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Two lines then blank', stdin: 'hello\nworld\n\n', expectedStdout: '2' },
          { id: 's2', description: 'Immediate blank', stdin: '\n', expectedStdout: '0' },
        ],
        [
          { id: 'h1', stdin: 'a\nb\nc\n\n', expectedStdout: '3' },
          { id: 'h2', stdin: 'only\n\n', expectedStdout: '1' },
          { id: 'h3', stdin: 'x\ny\nz\nw\n\n', expectedStdout: '4' },
        ]
      ),
      'Model solution:\ncount = 0\nline = input()\nwhile line != "":\n    count = count + 1\n    line = input()\nprint(count)'
    ),

    cr(
      'w4-q10',
      'Read a **non-negative** integer `n` and print the number of digits in it. Use a while loop with `// 10` (not str). Example: input `90210` → `5`. Note: `0` has 1 digit.',
      'n = int(input())\n# Print how many digits n has\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Five digits', stdin: '90210\n', expectedStdout: '5' },
          { id: 's2', description: 'Single digit', stdin: '7\n', expectedStdout: '1' },
        ],
        [
          { id: 'h1', stdin: '0\n', expectedStdout: '1' },
          { id: 'h2', stdin: '1000\n', expectedStdout: '4' },
          { id: 'h3', stdin: '99\n', expectedStdout: '2' },
          { id: 'h4', stdin: '123456789\n', expectedStdout: '9' },
        ]
      ),
      'Model solution:\nn = int(input())\nif n == 0:\n    print(1)\nelse:\n    count = 0\n    while n > 0:\n        count = count + 1\n        n = n // 10\n    print(count)'
    ),

    cr(
      'w4-q11',
      'Write a program that reads integers (one per line) until a value **between 1 and 10 inclusive** is entered. Print that **valid** number. (Invalid values are discarded; keep reading.)',
      `value = int(input())
while value < 1 or value > 10:
    value = int(input())
print(value)`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Valid on second try', stdin: '0\n5\n', expectedStdout: '5' },
          { id: 's2', description: 'Valid immediately', stdin: '10\n', expectedStdout: '10' },
        ],
        [
          { id: 'h1', stdin: '-1\n11\n3\n', expectedStdout: '3' },
          { id: 'h2', stdin: '1\n', expectedStdout: '1' },
          { id: 'h3', stdin: '99\n0\n7\n', expectedStdout: '7' },
          { id: 'h4', stdin: '20\n15\n10\n', expectedStdout: '10' },
        ]
      ),
      'Model solution:\nvalue = int(input())\nwhile value < 1 or value > 10:\n    value = int(input())\nprint(value)'
    ),

    cr(
      'w4-q12',
      'Read `base` (line 1) and `exp` (line 2) as integers. Print **base raised to exp** using a **while** loop (no `**` operator). Assume **exp ≥ 0**; any base including 0.',
      'base = int(input())\nexp = int(input())\n# Print base ** exp using a loop\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: '2^10', stdin: '2\n10\n', expectedStdout: '1024' },
          { id: 's2', description: 'Anything^0', stdin: '99\n0\n', expectedStdout: '1' },
        ],
        [
          { id: 'h1', stdin: '3\n4\n', expectedStdout: '81' },
          { id: 'h2', stdin: '5\n3\n', expectedStdout: '125' },
          { id: 'h3', stdin: '0\n5\n', expectedStdout: '0' },
          { id: 'h4', stdin: '1\n100\n', expectedStdout: '1' },
        ]
      ),
      'Model solution:\nbase = int(input())\nexp = int(input())\nresult = 1\nwhile exp > 0:\n    result = result * base\n    exp = exp - 1\nprint(result)'
    ),

    cr(
      'w4-q13',
      'Write a program that reads passwords (one per line) until one has **length ≥ 8**, then prints **`ok`**. (Keep reading shorter passwords.)',
      `password = input()
while len(password) < 8:
    password = input()
print("ok")`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Too short then valid', stdin: 'abc\n12345678\n', expectedStdout: 'ok' },
          { id: 's2', description: 'Valid first try', stdin: 'longenough\n', expectedStdout: 'ok' },
        ],
        [
          { id: 'h1', stdin: 'a\nbb\nccc\ndddd\n12345678\n', expectedStdout: 'ok' },
          { id: 'h2', stdin: '123456789\n', expectedStdout: 'ok' },
          { id: 'h3', stdin: 'short\nx\n12345678\n', expectedStdout: 'ok' },
        ]
      ),
      'Model solution:\npassword = input()\nwhile len(password) < 8:\n    password = input()\nprint("ok")'
    ),

    cr(
      'w4-q14',
      'Read two positive integers `a` (line 1) and `b` (line 2). Print their **greatest common divisor** using the **Euclidean algorithm** with a while loop.',
      'a = int(input())\nb = int(input())\n# Print gcd(a, b)\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'gcd(48, 18)', stdin: '48\n18\n', expectedStdout: '6' },
          { id: 's2', description: 'Coprime', stdin: '17\n13\n', expectedStdout: '1' },
        ],
        [
          { id: 'h1', stdin: '100\n25\n', expectedStdout: '25' },
          { id: 'h2', stdin: '12\n8\n', expectedStdout: '4' },
          { id: 'h3', stdin: '7\n7\n', expectedStdout: '7' },
          { id: 'h4', stdin: '54\n24\n', expectedStdout: '6' },
        ]
      ),
      'Model solution:\na = int(input())\nb = int(input())\nwhile b != 0:\n    temp = b\n    b = a % b\n    a = temp\nprint(a)'
    ),

    cr(
      'w4-q15',
      'Write a program that reads integers (one per line) until **-1** is read (sentinel). Print the **count** of numbers read **before** the sentinel (exclude -1).',
      `count = 0
num = int(input())
while num != -1:
    count = count + 1
    num = int(input())
print(count)`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Three numbers', stdin: '4\n8\n15\n-1\n', expectedStdout: '3' },
          { id: 's2', description: 'Immediate sentinel', stdin: '-1\n', expectedStdout: '0' },
        ],
        [
          { id: 'h1', stdin: '1\n2\n-1\n', expectedStdout: '2' },
          { id: 'h2', stdin: '0\n0\n0\n-1\n', expectedStdout: '3' },
          { id: 'h3', stdin: '5\n-1\n', expectedStdout: '1' },
          { id: 'h4', stdin: '10\n20\n30\n40\n-1\n', expectedStdout: '4' },
        ]
      ),
      'Model solution:\ncount = 0\nnum = int(input())\nwhile num != -1:\n    count = count + 1\n    num = int(input())\nprint(count)'
    ),

    cr(
      'w4-q16',
      'Read a character `ch` (line 1) and an integer `n` (line 2). Print a string of **`ch` repeated `n` times** using a **while** loop (not `*` on strings). Assume n ≥ 0. When n is 0, print an empty line.',
      'ch = input()\nn = int(input())\n# Print ch repeated n times\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Repeat dash', stdin: '-\n5\n', expectedStdout: '-----' },
          { id: 's2', description: 'Zero repeats', stdin: 'x\n0\n', expectedStdout: '' },
        ],
        [
          { id: 'h1', stdin: 'a\n1\n', expectedStdout: 'a' },
          { id: 'h2', stdin: '*\n3\n', expectedStdout: '***' },
          { id: 'h3', stdin: 'z\n10\n', expectedStdout: 'zzzzzzzzzz' },
          { id: 'h4', stdin: '@\n6\n', expectedStdout: '@@@@@@' },
        ]
      ),
      'Model solution:\nch = input()\nn = int(input())\nresult = ""\nwhile n > 0:\n    result = result + ch\n    n = n - 1\nprint(result)'
    ),
  ],
};

export default week4;
