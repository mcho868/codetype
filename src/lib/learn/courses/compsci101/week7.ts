import type { Module } from '../python101/types';
import { cr, mc, tf, stdoutCases } from './authoring';

const week7: Module = {
  id: 'week-7',
  slug: 'week-7',
  title: 'for Loops & range()',
  description:
    'Repeat work with for loops over strings and lists, process text character by character, and generate sequences with range() in one-, two-, and three-argument forms.',
  icon: '🔁',
  color: 'from-indigo-500 to-blue-400',
  locked: false,
  section: 'Week 7',
  lessons: [
    {
      id: 'lesson-w7-1',
      title: 'for Loops Over Strings',
      content: `A **for loop** runs a block of code once for each item in a sequence.

\`\`\`python
for char in "hi":
    print(char)
\`\`\`

Each iteration binds the loop variable (\`char\`) to the next character. Strings are sequences of characters, so you can iterate them directly.

**Common patterns:**
- Count or classify characters (vowels, digits, spaces)
- Build a new string by appending in the loop
- Print one character per line

The loop variable is just a name — \`for c in word:\` and \`for letter in word:\` behave the same.`,
      codeExamples: [
        {
          language: 'python',
          code: `word = "Python"
for char in word:
    print(char)

# Prints P, y, t, h, o, n on separate lines`,
          caption: 'Iterate a string one character at a time',
          editable: true,
        },
        {
          language: 'python',
          code: `text = "hello"
count = 0
for ch in text:
    if ch == "l":
        count += 1
print(count)  # 2`,
          caption: 'Count occurrences of a character',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w7-2',
      title: 'for Loops Over Lists',
      content: `Lists are the most common sequence to loop over:

\`\`\`python
nums = [10, 20, 30]
total = 0
for n in nums:
    total += n
\`\`\`

**Accumulators:** start with an initial value (\`0\` for sums, \`1\` for products, \`""\` for strings, \`[]\` for new lists) and update it each iteration.

**Building new lists:** append to a result list inside the loop:

\`\`\`python
squares = []
for x in nums:
    squares.append(x * x)
\`\`\`

You can loop over any iterable — strings, lists, the result of \`range()\`, and more.`,
      codeExamples: [
        {
          language: 'python',
          code: `scores = [88, 92, 75, 100]
total = 0
for s in scores:
    total += s
print(total)       # 355
print(total / len(scores))  # average`,
          caption: 'Sum a list with an accumulator',
          editable: true,
        },
        {
          language: 'python',
          code: `names = ["Ada", "Grace", "Alan"]
upper = []
for name in names:
    upper.append(name.upper())
print(upper)  # ['ADA', 'GRACE', 'ALAN']`,
          caption: 'Build a new list in a for loop',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w7-3',
      title: 'Text Processing with for',
      content: `Many string tasks are natural for loops:

- **Filter:** keep only characters that pass a test
- **Transform:** change each character (case, Caesar shift)
- **Validate:** check every character meets a rule

Because strings are **immutable**, you build results in a new variable:

\`\`\`python
result = ""
for ch in s:
    result += ch.upper()
\`\`\`

Watch for **off-by-one** errors when building slices or checking neighbors — loop over indices with \`range(len(s))\` only when you need the index, not the character alone.`,
      codeExamples: [
        {
          language: 'python',
          code: `s = "Hello, World!"
digits = ""
for ch in s:
    if ch.isdigit():
        digits += ch
print(digits)  # "" — no digits here

s2 = "Room 101"
digits2 = ""
for ch in s2:
    if ch.isdigit():
        digits2 += ch
print(digits2)  # 101`,
          caption: 'Extract digits from a string',
          editable: true,
        },
        {
          language: 'python',
          code: `def count_vowels(text):
    vowels = "aeiouAEIOU"
    count = 0
    for ch in text:
        if ch in vowels:
            count += 1
    return count

print(count_vowels("Python"))  # 1`,
          caption: 'Count vowels character by character',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w7-4',
      title: 'range() — One Argument',
      content: `\`range(n)\` produces integers from **0** up to (but not including) **n**:

\`\`\`python
for i in range(5):
    print(i)   # 0, 1, 2, 3, 4
\`\`\`

Use \`range\` when you need to repeat something a fixed number of times or generate indices.

**range vs list:** \`range(5)\` is lazy — it generates values on demand. Wrap in \`list()\` to see them: \`list(range(5))\` → \`[0, 1, 2, 3, 4]\`.

Common idiom — repeat N times without caring about the index:

\`\`\`python
for _ in range(3):
    print("again")
\`\`\``,
      codeExamples: [
        {
          language: 'python',
          code: `for i in range(4):
    print(i * i)

# Prints 0, 1, 4, 9`,
          caption: 'Squares using range(4)',
          editable: true,
        },
        {
          language: 'python',
          code: `total = 0
for i in range(1, 6):  # preview: two-arg form
    total += i
print(total)  # 15`,
          caption: 'Sum 1 through 5 (two-argument range)',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w7-5',
      title: 'range() — Two & Three Arguments',
      content: `\`range(start, stop)\` — from **start** up to (not including) **stop**:

\`\`\`python
list(range(2, 6))   # [2, 3, 4, 5]
\`\`\`

\`range(start, stop, step)\` — third argument is the **step** (increment):

\`\`\`python
list(range(0, 10, 2))   # [0, 2, 4, 6, 8]
list(range(5, 0, -1))    # [5, 4, 3, 2, 1]  countdown
\`\`\`

**Rules:**
- \`stop\` is never included
- \`step\` can be negative (count down)
- If \`step\` goes the wrong direction, the range is empty

Combine \`range(len(seq))\` with indexing when you need both position and value.`,
      codeExamples: [
        {
          language: 'python',
          code: `for i in range(1, 4):
    print(i)

# Prints 1, 2, 3`,
          caption: 'range(1, 4) — start at 1, stop before 4',
          editable: true,
        },
        {
          language: 'python',
          code: `for i in range(10, 0, -2):
    print(i, end=" ")
print()
# 10 8 6 4 2`,
          caption: 'Count down with a negative step',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w7-6',
      title: 'List Comprehensions',
      content: `A **list comprehension** is a compact way to build a list with a \`for\` loop **inside** square brackets. It is shorthand for the "create an empty list, loop, append" pattern you already know.

**The long way:**
\`\`\`python
squares = []
for x in range(1, 6):
    squares.append(x * x)
# squares == [1, 4, 9, 16, 25]
\`\`\`

**The same thing as a comprehension:**
\`\`\`python
squares = [x * x for x in range(1, 6)]
# [1, 4, 9, 16, 25]
\`\`\`

Read it left to right: *"\`x * x\` **for** each \`x\` **in** \`range(1, 6)\`."* The expression on the left is what goes into the list; the \`for ... in ...\` part is the same loop header you'd write normally.

**Adding a condition** — keep only items that pass a test by adding \`if\` at the end:
\`\`\`python
positives = [n for n in [4, -1, 7, -3] if n > 0]
# [4, 7]
\`\`\`

**The most common use: reading numbers from input.** \`input().split()\` gives a list of **strings**; a comprehension converts each to an \`int\` in one line:
\`\`\`python
nums = [int(x) for x in input().split()]
# input "3 1 2"  ->  [3, 1, 2]
\`\`\`

This is exactly the same as looping and appending — pick whichever is clearer. Comprehensions shine for short "transform every item" or "filter items" tasks.`,
      codeExamples: [
        {
          language: 'python',
          code: `# A comprehension and its long-form equivalent give the same list
squares = [x * x for x in range(1, 6)]
print(squares)        # [1, 4, 9, 16, 25]

long_way = []
for x in range(1, 6):
    long_way.append(x * x)
print(long_way)       # [1, 4, 9, 16, 25]`,
          caption: 'Comprehension vs the explicit for-loop — identical result',
          editable: true,
        },
        {
          language: 'python',
          code: `# Transform every character
print([c.upper() for c in "abc"])     # ['A', 'B', 'C']

# Filter with an if at the end
print([n for n in [4, -1, 7, -3] if n > 0])   # [4, 7]`,
          caption: 'Transforming and filtering in a comprehension',
          editable: true,
        },
        {
          language: 'python',
          code: `# Read a line of integers into a list (very common!)
nums = [int(x) for x in input().split()]
print(nums)
print(sum(nums))

# Try input like:  3 1 2`,
          caption: 'The int(input().split()) idiom for reading number lists',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    mc(
      'w7-q1',
      'What does this code print?\n    for i in range(3):\n        print(i, end=" ")\n    print()',
      [
        { id: 'a', text: '1 2 3' },
        { id: 'b', text: '0 1 2' },
        { id: 'c', text: '0 1 2 3' },
        { id: 'd', text: '1 2' },
      ],
      'b',
      'range(3) produces 0, 1, 2. The stop value 3 is never included.'
    ),

    cr(
      'w7-q2',
      'Write a program that reads a string with `input()` and prints **each character on its own line** (use a for loop).',
      `text = input()
for ch in text:
    print(ch)`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Short word', stdin: 'hi\n', expectedStdout: 'h\ni' },
          { id: 's2', description: 'Single char', stdin: 'A\n', expectedStdout: 'A' },
        ],
        [
          { id: 'h1', stdin: 'abc\n', expectedStdout: 'a\nb\nc' },
          { id: 'h2', stdin: '\n', expectedStdout: '' },
          { id: 'h3', stdin: '123\n', expectedStdout: '1\n2\n3' },
          { id: 'h4', stdin: 'Go\n', expectedStdout: 'G\no' },
        ]
      ),
      'Model solution:\ntext = input()\nfor ch in text:\n    print(ch)'
    ),

    cr(
      'w7-q3',
      'Read one line of text and print how many vowels (**a, e, i, o, u**, upper or lower) it contains. Use a `for` loop over the characters.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Mixed case', stdin: 'Hello\n', expectedStdout: '2' },
          { id: 's2', description: 'No vowels', stdin: 'xyz\n', expectedStdout: '0' },
        ],
        [
          { id: 'h1', stdin: 'AEIOU\n', expectedStdout: '5' },
          { id: 'h2', stdin: '\n', expectedStdout: '0' },
          { id: 'h3', stdin: 'Python\n', expectedStdout: '1' },
          { id: 'h4', stdin: 'beautiful\n', expectedStdout: '5' },
        ]
      ),
      'Model solution:\ntext = input()\nvowels = "aeiouAEIOU"\ncount = 0\nfor ch in text:\n    if ch in vowels:\n        count = count + 1\nprint(count)\n\nWhy: A `for` loop visits each character; checking `ch in vowels` counts both cases. An empty line has no characters, so the count stays 0.'
    ),

    cr(
      'w7-q4',
      'Read a line of space-separated integers and print their **sum** using a `for` loop (not built-in `sum`). An empty line is an empty list (sum 0).',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Small list', stdin: '1 2 3\n', expectedStdout: '6' },
          { id: 's2', description: 'Single element', stdin: '42\n', expectedStdout: '42' },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '0' },
          { id: 'h2', stdin: '-1 1 0\n', expectedStdout: '0' },
          { id: 'h3', stdin: '10 -3 7\n', expectedStdout: '14' },
          { id: 'h4', stdin: '5 5 5 5\n', expectedStdout: '20' },
        ]
      ),
      'Model solution:\nnums = [int(x) for x in input().split()]\ntotal = 0\nfor n in nums:\n    total = total + n\nprint(total)\n\nWhy: A list comprehension reads the numbers; a `for` loop accumulates the running total. An empty line gives an empty list, so the sum stays 0.'
    ),

    cr(
      'w7-q5',
      'Write a program that prints the numbers **0, 1, 4, 9, 16** (squares of 0–4), each on its own line, using `range()` and a for loop.',
      `for i in range(5):
    print(i * i)`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Squares 0-4', expectedStdout: '0\n1\n4\n9\n16' },
        ],
        [
          { id: 'h1', expectedStdout: '0\n1\n4\n9\n16' },
        ]
      ),
      'Model solution:\nfor i in range(5):\n    print(i * i)'
    ),

    cr(
      'w7-q6',
      'Read a string `s` and print it reversed, building the result with a `for` loop (do not use slicing `[::-1]` here — practice the loop).',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Word', stdin: 'hello\n', expectedStdout: 'olleh' },
          { id: 's2', description: 'Palindrome', stdin: 'aba\n', expectedStdout: 'aba' },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '' },
          { id: 'h2', stdin: 'a\n', expectedStdout: 'a' },
          { id: 'h3', stdin: 'Python\n', expectedStdout: 'nohtyP' },
          { id: 'h4', stdin: '12345\n', expectedStdout: '54321' },
        ]
      ),
      'Model solution:\ns = input()\nresult = ""\nfor ch in s:\n    result = ch + result\nprint(result)\n\nWhy: Prepending each new character (`ch + result`) builds the string back-to-front, producing the reverse.'
    ),

    cr(
      'w7-q7',
      'Read a string `s` (line 1) and a character `ch` (line 2). Print how many times `ch` appears in `s`, using a `for` loop.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Multiple matches', stdin: 'banana\na\n', expectedStdout: '3' },
          { id: 's2', description: 'No match', stdin: 'hello\nz\n', expectedStdout: '0' },
        ],
        [
          { id: 'h1', stdin: '\na\n', expectedStdout: '0' },
          { id: 'h2', stdin: 'aaa\na\n', expectedStdout: '3' },
          { id: 'h3', stdin: 'Mississippi\ns\n', expectedStdout: '4' },
          { id: 'h4', stdin: 'abc\nb\n', expectedStdout: '1' },
        ]
      ),
      'Model solution:\ns = input()\nch = input()\ncount = 0\nfor c in s:\n    if c == ch:\n        count = count + 1\nprint(count)\n\nWhy: The `for` loop checks each character against `ch`. This is the loop version of `.count()` — useful for understanding what that method does.'
    ),

    cr(
      'w7-q8',
      'Read a line of space-separated integers and print their **product** using a `for` loop. An empty line (empty list) gives **1**.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Small list', stdin: '2 3 4\n', expectedStdout: '24' },
          { id: 's2', description: 'With zero', stdin: '5 0 3\n', expectedStdout: '0' },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '1' },
          { id: 'h2', stdin: '7\n', expectedStdout: '7' },
          { id: 'h3', stdin: '-2 3\n', expectedStdout: '-6' },
          { id: 'h4', stdin: '1 1 1\n', expectedStdout: '1' },
        ]
      ),
      'Model solution:\nnums = [int(x) for x in input().split()]\nresult = 1\nfor n in nums:\n    result = result * n\nprint(result)\n\nWhy: A product accumulator starts at 1 (the multiplicative identity), so an empty list yields 1. Any 0 in the list makes the whole product 0.'
    ),

    cr(
      'w7-q9',
      'Write a program that reads an integer **n** and prints the numbers **1 through n** inclusive, one per line.',
      `n = int(input())
for i in range(1, n + 1):
    print(i)`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'n = 3', stdin: '3\n', expectedStdout: '1\n2\n3' },
          { id: 's2', description: 'n = 1', stdin: '1\n', expectedStdout: '1' },
        ],
        [
          { id: 'h1', stdin: '5\n', expectedStdout: '1\n2\n3\n4\n5' },
          { id: 'h2', stdin: '0\n', expectedStdout: '' },
          { id: 'h3', stdin: '10\n', expectedStdout: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10' },
        ]
      ),
      'Model solution:\nn = int(input())\nfor i in range(1, n + 1):\n    print(i)'
    ),

    cr(
      'w7-q10',
      'Read a string `s` and print `True` if **any** character is a digit, otherwise `False`. Use a `for` loop and a boolean flag.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Has digit', stdin: 'Room 101\n', expectedStdout: 'True' },
          { id: 's2', description: 'No digit', stdin: 'hello\n', expectedStdout: 'False' },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: 'False' },
          { id: 'h2', stdin: '0\n', expectedStdout: 'True' },
          { id: 'h3', stdin: 'abc9def\n', expectedStdout: 'True' },
          { id: 'h4', stdin: '---\n', expectedStdout: 'False' },
        ]
      ),
      'Model solution:\ns = input()\nfound = False\nfor ch in s:\n    if ch.isdigit():\n        found = True\nprint(found)\n\nWhy: A flag starts `False` and flips to `True` if any digit is seen. `.isdigit()` checks a single character. An empty string never enters the loop, so the answer is `False`.'
    ),

    cr(
      'w7-q11',
      'Read an integer `n` and print a list of the first **n** positive even numbers: `[2, 4, 6, ...]`. Use `range()` and a `for` loop. Print it as a Python list.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Three evens', stdin: '3\n', expectedStdout: '[2, 4, 6]' },
          { id: 's2', description: 'One even', stdin: '1\n', expectedStdout: '[2]' },
        ],
        [
          { id: 'h1', stdin: '0\n', expectedStdout: '[]' },
          { id: 'h2', stdin: '5\n', expectedStdout: '[2, 4, 6, 8, 10]' },
          { id: 'h3', stdin: '2\n', expectedStdout: '[2, 4]' },
          { id: 'h4', stdin: '10\n', expectedStdout: '[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]' },
        ]
      ),
      'Model solution:\nn = int(input())\nresult = []\nfor i in range(1, n + 1):\n    result.append(i * 2)\nprint(result)\n\nWhy: `range(1, n+1)` gives 1..n; multiplying each by 2 yields the even numbers. When n is 0 the range is empty, so the list is empty.'
    ),

    cr(
      'w7-q12',
      'Read a line of space-separated words and print a list of their **lengths**, in the same order. Use a `for` loop. Print it as a Python list.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Three words', stdin: 'cat dog bird\n', expectedStdout: '[3, 3, 4]' },
          { id: 's2', description: 'Empty line', stdin: '\n', expectedStdout: '[]' },
        ],
        [
          { id: 'h1', stdin: 'a\n', expectedStdout: '[1]' },
          { id: 'h2', stdin: 'Python is fun\n', expectedStdout: '[6, 2, 3]' },
          { id: 'h3', stdin: 'test\n', expectedStdout: '[4]' },
          { id: 'h4', stdin: 'one two\n', expectedStdout: '[3, 3]' },
        ]
      ),
      'Model solution:\nwords = input().split()\nlengths = []\nfor w in words:\n    lengths.append(len(w))\nprint(lengths)\n\nWhy: `split()` gives the list of words; the `for` loop records each word\'s `len()`. An empty line gives no words, so the list is empty.'
    ),

    cr(
      'w7-q13',
      'Read a line of space-separated integers and print a new list containing only the **positive** ones (strictly > 0), in order. Use a `for` loop. Print it as a Python list.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Mixed', stdin: '-1 2 0 5\n', expectedStdout: '[2, 5]' },
          { id: 's2', description: 'All negative', stdin: '-3 -1\n', expectedStdout: '[]' },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '[]' },
          { id: 'h2', stdin: '1 2 3\n', expectedStdout: '[1, 2, 3]' },
          { id: 'h3', stdin: '0 0\n', expectedStdout: '[]' },
          { id: 'h4', stdin: '100 -50 0 1\n', expectedStdout: '[100, 1]' },
        ]
      ),
      'Model solution:\nnums = [int(x) for x in input().split()]\nresult = []\nfor n in nums:\n    if n > 0:\n        result.append(n)\nprint(result)\n\nWhy: The `for` loop keeps only values that pass the `n > 0` test. Zero is excluded (strictly greater), so `[0, 0]` gives `[]`.'
    ),

    cr(
      'w7-q14',
      'Write a program that reads an integer **n** and prints a right-aligned triangle of `*` with **n** rows (row 1 has 1 star, row 2 has 2, etc.).',
      `n = int(input())
for i in range(1, n + 1):
    print("*" * i)`,
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: '3 rows', stdin: '3\n', expectedStdout: '*\n**\n***' },
          { id: 's2', description: '1 row', stdin: '1\n', expectedStdout: '*' },
        ],
        [
          { id: 'h1', stdin: '4\n', expectedStdout: '*\n**\n***\n****' },
          { id: 'h2', stdin: '2\n', expectedStdout: '*\n**' },
          { id: 'h3', stdin: '5\n', expectedStdout: '*\n**\n***\n****\n*****' },
        ]
      ),
      'Model solution:\nn = int(input())\nfor i in range(1, n + 1):\n    print("*" * i)'
    ),

    cr(
      'w7-q15',
      'Read `start` (line 1), `stop` (line 2), and `step` (line 3). Print the list of values produced by `range(start, stop, step)`, built with a `for` loop. Print it as a Python list.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: '0 to 5', stdin: '0\n5\n1\n', expectedStdout: '[0, 1, 2, 3, 4]' },
          { id: 's2', description: 'Step 2', stdin: '0\n10\n2\n', expectedStdout: '[0, 2, 4, 6, 8]' },
        ],
        [
          { id: 'h1', stdin: '1\n4\n1\n', expectedStdout: '[1, 2, 3]' },
          { id: 'h2', stdin: '5\n0\n-1\n', expectedStdout: '[5, 4, 3, 2, 1]' },
          { id: 'h3', stdin: '0\n0\n1\n', expectedStdout: '[]' },
          { id: 'h4', stdin: '10\n15\n1\n', expectedStdout: '[10, 11, 12, 13, 14]' },
        ]
      ),
      'Model solution:\nstart = int(input())\nstop = int(input())\nstep = int(input())\nresult = []\nfor i in range(start, stop, step):\n    result.append(i)\nprint(result)\n\nWhy: `range(start, stop, step)` stops before `stop`. A negative step counts down. When start == stop the range is empty.'
    ),

    cr(
      'w7-q16',
      'Read a string `text` (line 1) and an integer `n` (line 2). Print a new string where each **lowercase letter** is shifted forward by `n` positions in the alphabet (wrap **z** → **a**). Leave every non-lowercase character unchanged. Use a `for` loop.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Shift by 1', stdin: 'abc\n1\n', expectedStdout: 'bcd' },
          { id: 's2', description: 'Wrap z', stdin: 'xyz\n1\n', expectedStdout: 'yza' },
        ],
        [
          { id: 'h1', stdin: '\n3\n', expectedStdout: '' },
          { id: 'h2', stdin: 'hello\n0\n', expectedStdout: 'hello' },
          { id: 'h3', stdin: 'a\n25\n', expectedStdout: 'z' },
          { id: 'h4', stdin: 'Hi!\n1\n', expectedStdout: 'Hj!' },
        ]
      ),
      'Model solution:\ntext = input()\nn = int(input())\nresult = ""\nfor ch in text:\n    if "a" <= ch <= "z":\n        result = result + chr((ord(ch) - ord("a") + n) % 26 + ord("a"))\n    else:\n        result = result + ch\nprint(result)\n\nWhy: Each lowercase letter is shifted with modular arithmetic so `z` wraps to `a`. Only lowercase letters move — in `Hi!` the capital `H` and `!` are unchanged, but lowercase `i` shifts to `j`.'
    ),

    tf(
      'w7-q17',
      '`list(range(2, 6))` produces `[2, 3, 4, 5]` — the stop value 6 is not included.',
      'true',
      'range(start, stop) always stops before stop. range(2, 6) yields 2, 3, 4, 5.'
    ),

    cr(
      'w7-q18',
      'Read a line of space-separated words and print the **longest** one. If two words tie for longest, print the **first** of them. Use a `for` loop.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Clear winner', stdin: 'cat elephant dog\n', expectedStdout: 'elephant' },
          { id: 's2', description: 'Tie — first wins', stdin: 'ab cd a\n', expectedStdout: 'ab' },
        ],
        [
          { id: 'h1', stdin: 'solo\n', expectedStdout: 'solo' },
          { id: 'h2', stdin: 'a bb cc\n', expectedStdout: 'bb' },
          { id: 'h3', stdin: 'same size\n', expectedStdout: 'same' },
          { id: 'h4', stdin: 'x yy zzz yy\n', expectedStdout: 'zzz' },
        ]
      ),
      'Model solution:\nwords = input().split()\nbest = words[0]\nfor w in words:\n    if len(w) > len(best):\n        best = w\nprint(best)\n\nWhy: Tracking `best` and only replacing it when a **strictly longer** word appears means ties keep the earliest one. `split()` gives the word list.'
    ),
  ],
};

export default week7;
