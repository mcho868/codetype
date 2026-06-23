import type { Module } from '../python101/types';
import { cr, mc, tf, fib, stdoutCases } from './authoring';

const week3: Module = {
  id: 'week-3',
  slug: 'week-3',
  title: 'Conditions',
  description:
    'Make decisions with if/elif/else, booleans, logical operators, chained comparisons, floats in conditions, and nested branches.',
  icon: '🔀',
  color: 'from-violet-500 to-purple-400',
  locked: false,
  section: 'Week 3',
  lessons: [
    {
      id: 'lesson-w3-1',
      title: 'if, elif, and else',
      content: `Conditional statements let your program choose different paths based on whether a condition is **True** or **False**.

**Structure:**
- \`if condition:\` — run this block when the condition is True
- \`elif condition:\` — checked only if all previous conditions were False ("else if")
- \`else:\` — runs when nothing above matched

**Rules:**
- Every condition ends with a colon \`:\`
- The indented block below is the body — use **4 spaces** of indentation
- Only **one** branch runs: Python checks from top to bottom and stops at the first match`,
      codeExamples: [
        {
          language: 'python',
          code: `score = 85

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("F")

# Prints: B`,
          caption: 'Grade letter with if / elif / else',
          editable: true,
        },
        {
          language: 'python',
          code: `temperature = 32

if temperature <= 0:
    print("Freezing")
else:
    print("Above freezing")

# Prints: Above freezing`,
          caption: 'Simple if / else',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w3-2',
      title: 'Booleans & Comparison Operators',
      content: `A **boolean** is either \`True\` or \`False\`. Comparison expressions produce booleans.

**Comparison operators:**
- \`==\` equal to
- \`!=\` not equal to
- \`<\`, \`>\`, \`<=\`, \`>=\` less/greater (or equal)

**Truthy vs falsy:** In an \`if\` condition, Python treats \`0\`, \`0.0\`, \`""\`, \`None\`, and empty collections as **False**. Most other values count as **True**.

Store comparisons in variables to make code readable:

\`\`\`python
is_passing = score >= 50
\`\`\``,
      codeExamples: [
        {
          language: 'python',
          code: `x = 10
y = 3

print(x == y)   # False
print(x != y)   # True
print(x > y)    # True
print(x <= 10)  # True

is_even = x % 2 == 0
print(is_even)  # True`,
          caption: 'Comparison operators return True or False',
          editable: true,
        },
        {
          language: 'python',
          code: `name = ""
if name:
    print("Hello,", name)
else:
    print("No name given")

# Prints: No name given`,
          caption: 'Empty string is falsy',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w3-3',
      title: 'Logical Operators',
      content: `Combine boolean expressions with **logical operators**:

- \`and\` — True only if **both** sides are True
- \`or\` — True if **at least one** side is True
- \`not\` — flips True ↔ False

**Short-circuiting:** \`and\` stops at the first False; \`or\` stops at the first True. The second part may never run — useful when the second check would error if the first failed (e.g. \`len(items) > 0 and items[0] == 5\`).`,
      codeExamples: [
        {
          language: 'python',
          code: `age = 20
has_ticket = True

if age >= 18 and has_ticket:
    print("Welcome in!")
else:
    print("Sorry, no entry")

# Prints: Welcome in!`,
          caption: 'and — both conditions must hold',
          editable: true,
        },
        {
          language: 'python',
          code: `day = "Saturday"

if day == "Saturday" or day == "Sunday":
    print("Weekend!")
else:
    print("Weekday")

is_raining = False
if not is_raining:
    print("No umbrella needed")`,
          caption: 'or and not',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w3-4',
      title: 'Chaining Comparison Operators',
      content: `Python lets you **chain** comparisons for readability:

\`\`\`python
13 <= age <= 19   # teen years
0 < x < 100       # x is strictly between 0 and 100
\`\`\`

This is equivalent to combining with \`and\`, but reads like math.

**Common use:** range checks, sorting order (\`a <= b <= c\`), validating input bounds.`,
      codeExamples: [
        {
          language: 'python',
          code: `score = 75

if 0 <= score <= 100:
    print("Valid score")
else:
    print("Invalid score")

# Prints: Valid score`,
          caption: 'Chained comparison for a valid range',
          editable: true,
        },
        {
          language: 'python',
          code: `a, b, c = 2, 5, 9

if a < b < c:
    print("Strictly increasing")

# Prints: Strictly increasing`,
          caption: 'Check ordering with a < b < c',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w3-5',
      title: 'Floats in Conditions',
      content: `Floats can represent decimals, but **== often fails** for computed values because of rounding:

\`\`\`python
0.1 + 0.2 == 0.3   # False!
\`\`\`

**Better approaches:**
- Compare with a **tolerance**: \`abs(a - b) < 0.0001\`
- Use \`<\` or \`>\` when exact equality is not needed
- Round before comparing: \`round(x, 2) == 0.3\`

For thresholds (temperature, grades, prices), \`<=\` and \`>=\` on floats work fine — just avoid \`==\` on arithmetic results.`,
      codeExamples: [
        {
          language: 'python',
          code: `total = 0.1 + 0.2
print(total == 0.3)        # False
print(abs(total - 0.3) < 0.0001)  # True

temp = 36.6
if temp >= 37.5:
    print("Fever")
else:
    print("Normal")

# Prints: Normal`,
          caption: 'Float equality vs threshold checks',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w3-6',
      title: 'Nested Conditions',
      content: `You can put an \`if\` **inside** another \`if\` when a decision depends on multiple layers.

**When to nest:** the inner question only makes sense after the outer condition is True.

**When to flatten:** if both conditions are independent, combine with \`and\` / \`or\` instead of nesting — it's often clearer.

\`\`\`python
if logged_in:
    if is_admin:
        print("Admin panel")
\`\`\`

Be careful with indentation — each nested block needs another 4 spaces.`,
      codeExamples: [
        {
          language: 'python',
          code: `age = 16
has_parent = True

if age < 18:
    if has_parent:
        print("Minor with guardian")
    else:
        print("Minor alone")
else:
    print("Adult")

# Prints: Minor with guardian`,
          caption: 'Nested if inside if',
          editable: true,
        },
        {
          language: 'python',
          code: `x = -5

if x > 0:
    print("Positive")
elif x < 0:
    print("Negative")
else:
    print("Zero")

# Prints: Negative`,
          caption: 'elif avoids deep nesting for mutually exclusive cases',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    mc(
      'w3-q1',
      'What does this code print?\n    x = 7\n    if x > 10:\n        print("big")\n    elif x > 5:\n        print("medium")\n    else:\n        print("small")',
      [
        { id: 'a', text: 'big' },
        { id: 'b', text: 'medium' },
        { id: 'c', text: 'small' },
        { id: 'd', text: 'Nothing' },
      ],
      'b',
      'x is 7. The first condition (x > 10) is False, but elif x > 5 is True, so "medium" is printed.'
    ),

    cr(
      'w3-q2',
      'Write a program that reads an integer with `input()`, then prints `"pass"` if the score is **50 or higher**, otherwise prints `"fail"`.',
      `score = int(input())
if score >= 50:
    print("pass")
else:
    print("fail")`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Passing score', stdin: '75\n', expectedStdout: 'pass' },
          { id: 's2', description: 'Failing score', stdin: '40\n', expectedStdout: 'fail' },
        ],
        [
          { id: 'h1', stdin: '50\n', expectedStdout: 'pass' },
          { id: 'h2', stdin: '49\n', expectedStdout: 'fail' },
          { id: 'h3', stdin: '100\n', expectedStdout: 'pass' },
          { id: 'h4', stdin: '0\n', expectedStdout: 'fail' },
        ]
      ),
      'Model solution:\nscore = int(input())\nif score >= 50:\n    print("pass")\nelse:\n    print("fail")'
    ),

    cr(
      'w3-q3',
      'Read an integer score from stdin, then print its letter grade:\n- **A** if score ≥ 90\n- **B** if score ≥ 80\n- **C** if score ≥ 70\n- **D** if score ≥ 60\n- **F** otherwise\n\nAssume score is an integer 0–100.',
      'score = int(input())\n# Print the letter grade\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'A grade', stdin: '95\n', expectedStdout: 'A' },
          { id: 's2', description: 'C grade', stdin: '72\n', expectedStdout: 'C' },
          { id: 's3', description: 'F grade', stdin: '55\n', expectedStdout: 'F' },
        ],
        [
          { id: 'h1', stdin: '90\n', expectedStdout: 'A' },
          { id: 'h2', stdin: '80\n', expectedStdout: 'B' },
          { id: 'h3', stdin: '60\n', expectedStdout: 'D' },
          { id: 'h4', stdin: '59\n', expectedStdout: 'F' },
          { id: 'h5', stdin: '100\n', expectedStdout: 'A' },
        ]
      ),
      'Model solution:\nscore = int(input())\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelif score >= 70:\n    print("C")\nelif score >= 60:\n    print("D")\nelse:\n    print("F")'
    ),

    tf(
      'w3-q4',
      'The expression `5 > 3` evaluates to the boolean value True.',
      'true',
      'Comparison operators return booleans. 5 is greater than 3, so 5 > 3 is True.'
    ),

    cr(
      'w3-q5',
      'Write a program that reads an integer and prints `"even"` if it is divisible by 2, otherwise `"odd"`.',
      `n = int(input())
if n % 2 == 0:
    print("even")
else:
    print("odd")`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Even number', stdin: '4\n', expectedStdout: 'even' },
          { id: 's2', description: 'Odd number', stdin: '7\n', expectedStdout: 'odd' },
        ],
        [
          { id: 'h1', stdin: '0\n', expectedStdout: 'even' },
          { id: 'h2', stdin: '1\n', expectedStdout: 'odd' },
          { id: 'h3', stdin: '-2\n', expectedStdout: 'even' },
          { id: 'h4', stdin: '-3\n', expectedStdout: 'odd' },
        ]
      ),
      'Model solution:\nn = int(input())\nif n % 2 == 0:\n    print("even")\nelse:\n    print("odd")'
    ),

    cr(
      'w3-q6',
      'Read an integer `n` from stdin and print `True` if n is greater than 0, otherwise `False`. (Printing a comparison shows the boolean directly.)',
      'n = int(input())\n# Print True if n is positive\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Positive', stdin: '5\n', expectedStdout: 'True' },
          { id: 's2', description: 'Zero', stdin: '0\n', expectedStdout: 'False' },
        ],
        [
          { id: 'h1', stdin: '-1\n', expectedStdout: 'False' },
          { id: 'h2', stdin: '100\n', expectedStdout: 'True' },
          { id: 'h3', stdin: '-999\n', expectedStdout: 'False' },
        ]
      ),
      'Model solution:\nn = int(input())\nprint(n > 0)\n\nWhy: A comparison like `n > 0` evaluates to a boolean. Passing it straight to `print()` displays `True` or `False`.'
    ),

    mc(
      'w3-q7',
      'What does this print?\n    a = True\n    b = False\n    print(a and b)\n    print(a or b)\n    print(not b)',
      [
        { id: 'a', text: 'True, True, False' },
        { id: 'b', text: 'False, True, True' },
        { id: 'c', text: 'False, False, True' },
        { id: 'd', text: 'True, False, False' },
      ],
      'b',
      'a and b → False (both must be True). a or b → True (a is True). not b → True (b is False).'
    ),

    cr(
      'w3-q8',
      'Read `age` (int, line 1) and a ticket line (line 2 — the word `yes` or `no`). Print `True` only when **age ≥ 18** and the ticket line is `yes`, otherwise `False`. Use `and`.',
      'age = int(input())\nticket = input()\n# Print True or False\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Adult with ticket', stdin: '20\nyes\n', expectedStdout: 'True' },
          { id: 's2', description: 'Adult without ticket', stdin: '25\nno\n', expectedStdout: 'False' },
          { id: 's3', description: 'Minor with ticket', stdin: '15\nyes\n', expectedStdout: 'False' },
        ],
        [
          { id: 'h1', stdin: '18\nyes\n', expectedStdout: 'True' },
          { id: 'h2', stdin: '17\nyes\n', expectedStdout: 'False' },
          { id: 'h3', stdin: '30\nno\n', expectedStdout: 'False' },
          { id: 'h4', stdin: '0\nno\n', expectedStdout: 'False' },
        ]
      ),
      'Model solution:\nage = int(input())\nticket = input()\nprint(age >= 18 and ticket == "yes")\n\nWhy: `and` is True only when both sides are. Comparing `ticket == "yes"` turns the text input into a boolean.'
    ),

    cr(
      'w3-q9',
      'Write a program that reads a day name (`"Saturday"` or `"Sunday"`) and prints `"weekend"` if it is either day, otherwise `"weekday"`.',
      `day = input()
if day == "Saturday" or day == "Sunday":
    print("weekend")
else:
    print("weekday")`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Saturday', stdin: 'Saturday\n', expectedStdout: 'weekend' },
          { id: 's2', description: 'Monday', stdin: 'Monday\n', expectedStdout: 'weekday' },
        ],
        [
          { id: 'h1', stdin: 'Sunday\n', expectedStdout: 'weekend' },
          { id: 'h2', stdin: 'Friday\n', expectedStdout: 'weekday' },
          { id: 'h3', stdin: 'Tuesday\n', expectedStdout: 'weekday' },
        ]
      ),
      'Model solution:\nday = input()\nif day == "Saturday" or day == "Sunday":\n    print("weekend")\nelse:\n    print("weekday")'
    ),

    fib(
      'w3-q10',
      'What keyword means "else if" in Python?\n    if x > 0:\n        ...\n    ______ x < 0:\n        ...',
      'elif',
      'Python uses elif (short for "else if") to test additional conditions after an if.'
    ),

    cr(
      'w3-q11',
      'Read an integer `age` from stdin and print `True` when age is between **13 and 19 inclusive**, otherwise `False`. Use a chained comparison: `13 <= age <= 19`.',
      'age = int(input())\n# Print True if age is in the teen range\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Middle teen', stdin: '15\n', expectedStdout: 'True' },
          { id: 's2', description: 'Too young', stdin: '12\n', expectedStdout: 'False' },
          { id: 's3', description: 'Too old', stdin: '20\n', expectedStdout: 'False' },
        ],
        [
          { id: 'h1', stdin: '13\n', expectedStdout: 'True' },
          { id: 'h2', stdin: '19\n', expectedStdout: 'True' },
          { id: 'h3', stdin: '0\n', expectedStdout: 'False' },
          { id: 'h4', stdin: '100\n', expectedStdout: 'False' },
        ]
      ),
      'Model solution:\nage = int(input())\nprint(13 <= age <= 19)\n\nWhy: A chained comparison checks both `13 <= age` and `age <= 19` at once. The boundaries 13 and 19 are inclusive.'
    ),

    cr(
      'w3-q12',
      'Read three integers, **one per line**, into `a`, `b`, and `c`. Print `"in order"` if they are strictly increasing (`a < b < c`), otherwise `"not in order"`. Use a chained comparison.',
      `a = int(input())
b = int(input())
c = int(input())
if a < b < c:
    print("in order")
else:
    print("not in order")`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Increasing', stdin: '1\n2\n3\n', expectedStdout: 'in order' },
          { id: 's2', description: 'Not increasing', stdin: '3\n2\n1\n', expectedStdout: 'not in order' },
        ],
        [
          { id: 'h1', stdin: '0\n1\n2\n', expectedStdout: 'in order' },
          { id: 'h2', stdin: '5\n5\n6\n', expectedStdout: 'not in order' },
          { id: 'h3', stdin: '-3\n-2\n-1\n', expectedStdout: 'in order' },
          { id: 'h4', stdin: '10\n9\n8\n', expectedStdout: 'not in order' },
        ]
      ),
      'Model solution:\na = int(input())\nb = int(input())\nc = int(input())\nif a < b < c:\n    print("in order")\nelse:\n    print("not in order")\n\nWhy: Reading each value on its own line keeps this to Week 1–3 tools. The chained comparison `a < b < c` checks both `a < b` and `b < c` at once.'
    ),

    cr(
      'w3-q13',
      'Read an integer `n` from stdin and print `1` if n is positive, `-1` if negative, and `0` if n is zero.',
      'n = int(input())\n# Print 1, -1, or 0\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Positive', stdin: '7\n', expectedStdout: '1' },
          { id: 's2', description: 'Negative', stdin: '-4\n', expectedStdout: '-1' },
          { id: 's3', description: 'Zero', stdin: '0\n', expectedStdout: '0' },
        ],
        [
          { id: 'h1', stdin: '1\n', expectedStdout: '1' },
          { id: 'h2', stdin: '-1\n', expectedStdout: '-1' },
          { id: 'h3', stdin: '999\n', expectedStdout: '1' },
          { id: 'h4', stdin: '-999\n', expectedStdout: '-1' },
        ]
      ),
      'Model solution:\nn = int(input())\nif n > 0:\n    print(1)\nelif n < 0:\n    print(-1)\nelse:\n    print(0)'
    ),

    cr(
      'w3-q14',
      'Read two floats `a` (line 1) and `b` (line 2). Print `True` when they are *almost* equal — `abs(a - b) < 0.001` — otherwise `False`. (Use this pattern instead of `==` for floats.)',
      'a = float(input())\nb = float(input())\n# Print True if a and b are close\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Classic float trap (0.1 + 0.2 vs 0.3)', stdin: '0.30000000000000004\n0.3\n', expectedStdout: 'True' },
          { id: 's2', description: 'Clearly different', stdin: '1.0\n2.0\n', expectedStdout: 'False' },
        ],
        [
          { id: 'h1', stdin: '0.0\n0.0\n', expectedStdout: 'True' },
          { id: 'h2', stdin: '1.0\n1.0005\n', expectedStdout: 'True' },
          { id: 'h3', stdin: '1.0\n1.002\n', expectedStdout: 'False' },
          { id: 'h4', stdin: '-0.5\n-0.5001\n', expectedStdout: 'True' },
        ]
      ),
      'Model solution:\na = float(input())\nb = float(input())\nprint(abs(a - b) < 0.001)\n\nWhy: Floats are approximate, so `==` is unreliable. Comparing the absolute difference to a small tolerance is the correct way to test "close enough".'
    ),

    cr(
      'w3-q15',
      'Write a program that reads a float temperature and prints `"fever"` if it is **37.5 or higher**, otherwise `"normal"`.',
      `temp = float(input())
if temp >= 37.5:
    print("fever")
else:
    print("normal")`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Normal temp', stdin: '36.6\n', expectedStdout: 'normal' },
          { id: 's2', description: 'Fever temp', stdin: '38.0\n', expectedStdout: 'fever' },
        ],
        [
          { id: 'h1', stdin: '37.5\n', expectedStdout: 'fever' },
          { id: 'h2', stdin: '37.4\n', expectedStdout: 'normal' },
          { id: 'h3', stdin: '0.0\n', expectedStdout: 'normal' },
          { id: 'h4', stdin: '40.5\n', expectedStdout: 'fever' },
        ]
      ),
      'Model solution:\ntemp = float(input())\nif temp >= 37.5:\n    print("fever")\nelse:\n    print("normal")'
    ),

    cr(
      'w3-q16',
      'Read three integers `a`, `b`, `c` from stdin (one per line) and print the **largest** of the three (use if/elif, not built-in max).',
      'a = int(input())\nb = int(input())\nc = int(input())\n# Print the largest\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Max at start', stdin: '9\n2\n5\n', expectedStdout: '9' },
          { id: 's2', description: 'Max in middle', stdin: '1\n8\n3\n', expectedStdout: '8' },
          { id: 's3', description: 'Max at end', stdin: '4\n1\n7\n', expectedStdout: '7' },
        ],
        [
          { id: 'h1', stdin: '5\n5\n3\n', expectedStdout: '5' },
          { id: 'h2', stdin: '-1\n-5\n-2\n', expectedStdout: '-1' },
          { id: 'h3', stdin: '0\n0\n0\n', expectedStdout: '0' },
          { id: 'h4', stdin: '100\n99\n100\n', expectedStdout: '100' },
        ]
      ),
      'Model solution:\na = int(input())\nb = int(input())\nc = int(input())\nif a >= b and a >= c:\n    print(a)\nelif b >= a and b >= c:\n    print(b)\nelse:\n    print(c)'
    ),

    cr(
      'w3-q17',
      'Write a program that reads an integer age and prints:\n- `"child"` if age < 13\n- `"teen"` if 13 ≤ age ≤ 19\n- `"adult"` otherwise',
      `age = int(input())
if age < 13:
    print("child")
elif 13 <= age <= 19:
    print("teen")
else:
    print("adult")`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Child', stdin: '8\n', expectedStdout: 'child' },
          { id: 's2', description: 'Teen', stdin: '15\n', expectedStdout: 'teen' },
          { id: 's3', description: 'Adult', stdin: '25\n', expectedStdout: 'adult' },
        ],
        [
          { id: 'h1', stdin: '12\n', expectedStdout: 'child' },
          { id: 'h2', stdin: '13\n', expectedStdout: 'teen' },
          { id: 'h3', stdin: '19\n', expectedStdout: 'teen' },
          { id: 'h4', stdin: '20\n', expectedStdout: 'adult' },
          { id: 'h5', stdin: '0\n', expectedStdout: 'child' },
        ]
      ),
      'Model solution:\nage = int(input())\nif age < 13:\n    print("child")\nelif 13 <= age <= 19:\n    print("teen")\nelse:\n    print("adult")'
    ),

    cr(
      'w3-q18',
      'Read `age` (int, line 1) and a student line (line 2 — `yes` or `no`). Print the ticket price:\n- **8** if age < 12 (child)\n- **12** if the student line is `yes` (student discount)\n- **18** otherwise (standard adult)\n\nIf someone is both under 12 and a student, the child price (8) applies.',
      'age = int(input())\nstudent = input()\n# Print the ticket price\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Child', stdin: '8\nno\n', expectedStdout: '8' },
          { id: 's2', description: 'Student adult', stdin: '20\nyes\n', expectedStdout: '12' },
          { id: 's3', description: 'Standard adult', stdin: '30\nno\n', expectedStdout: '18' },
        ],
        [
          { id: 'h1', stdin: '11\nyes\n', expectedStdout: '8' },
          { id: 'h2', stdin: '12\nyes\n', expectedStdout: '12' },
          { id: 'h3', stdin: '12\nno\n', expectedStdout: '18' },
          { id: 'h4', stdin: '0\nno\n', expectedStdout: '8' },
          { id: 'h5', stdin: '65\nyes\n', expectedStdout: '12' },
        ]
      ),
      'Model solution:\nage = int(input())\nstudent = input()\nif age < 12:\n    print(8)\nelif student == "yes":\n    print(12)\nelse:\n    print(18)\n\nWhy: Order matters — the child check comes first, so an under-12 student still gets the child price. `elif` only runs when earlier conditions were False.'
    ),
  ],
};

export default week3;
