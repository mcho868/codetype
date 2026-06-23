import type { Module } from '../python101/types';
import { cr, mc, tf, stdoutCases } from './authoring';

const week5: Module = {
  id: 'week-5',
  slug: 'week-5',
  title: 'Sequences: Strings & Lists',
  description:
    'Work with ordered sequences: string and list indexing, slicing, substrings, sublists, and the difference between mutable lists and immutable strings.',
  icon: '📋',
  color: 'from-amber-500 to-orange-400',
  locked: false,
  section: 'Week 5',
  lessons: [
    {
      id: 'lesson-w5-1',
      title: 'Indexing & Slicing',
      content: `A **sequence** is an ordered collection you can access by position. Strings and lists are both sequences.

**Indexing** picks one element by its position. Positions start at **0** for the first item:
- \`s[0]\` — first character
- \`s[1]\` — second character
- \`s[-1]\` — last character (negative indices count from the end)
- \`s[-2]\` — second-to-last

**Slicing** \`s[start:stop]\` returns a **new** substring from index \`start\` up to (but **not including**) \`stop\`:
- \`s[2:5]\` — characters at indices 2, 3, 4
- \`s[:3]\` — from the start through index 2
- \`s[3:]\` — from index 3 through the end
- \`s[:]\` — a copy of the whole string

**Step slicing** \`s[start:stop:step]\`:
- \`s[::-1]\` — reverse the string`,
      codeExamples: [
        {
          language: 'python',
          code: `word = "Python"

print(word[0])    # P
print(word[-1])   # n
print(word[1:4])  # yth
print(word[:2])   # Py
print(word[2:])   # thon
print(word[::-1]) # nohtyP`,
          caption: 'Indexing and slicing a string',
          editable: true,
        },
        {
          language: 'python',
          code: `s = "hello"
print(len(s))     # 5
print(s[0])       # h
print(s[4])       # o
print(s[-1])      # o (same as s[4])`,
          caption: 'len() and positive vs negative indices',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w5-2',
      title: 'Substrings',
      content: `A **substring** is a contiguous piece of a string. You get substrings with slicing or by searching.

**Common operations:**
- \`len(s)\` — number of characters
- \`sub in s\` — True if \`sub\` appears anywhere in \`s\`
- \`s + t\` — concatenate two strings
- \`s * 3\` — repeat \`s\` three times

**Searching with slicing:** To check whether \`s\` starts with a prefix \`"Py"\`, compare \`s[:2] == "Py"\`.

**Important:** Strings are **immutable** — you cannot change a character in place with \`s[0] = "x"\`. You create a new string instead.`,
      codeExamples: [
        {
          language: 'python',
          code: `text = "hello world"

print("world" in text)   # True
print("mars" in text)    # False
print(text[:5])          # hello
print(text[6:])          # world
print(text.upper())      # HELLO WORLD (returns new string)`,
          caption: 'Membership, slicing, and upper()',
          editable: true,
        },
        {
          language: 'python',
          code: `name = "Alice"
greeting = "Hi, " + name + "!"
print(greeting)

# Repeat a substring
print("ha" * 3)   # hahaha`,
          caption: 'Concatenation and repetition',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w5-3',
      title: 'List Basics',
      content: `A **list** is an ordered, mutable sequence written with square brackets:

\`\`\`python
nums = [10, 20, 30]
mixed = [1, "two", 3.0, True]
empty = []
\`\`\`

**Basics:**
- \`len(lst)\` — number of elements
- \`lst[0]\`, \`lst[-1]\` — index like strings
- Lists can hold different types in one collection
- Lists are **mutable** — you can change, add, and remove items

**Creating from values:** \`list("abc")\` → \`['a', 'b', 'c']\` (each character becomes an element).`,
      codeExamples: [
        {
          language: 'python',
          code: `scores = [85, 92, 78, 95]

print(scores[0])    # 85
print(scores[-1])   # 95
print(len(scores))  # 4

scores[1] = 100     # mutate in place
print(scores)       # [85, 100, 78, 95]`,
          caption: 'Create, index, and mutate a list',
          editable: true,
        },
        {
          language: 'python',
          code: `items = ["apple", "banana", "cherry"]

items.append("date")
print(items)

items[0] = "apricot"
print(items)`,
          caption: 'append() adds to the end; assignment changes an element',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w5-4',
      title: 'Sublists',
      content: `Just like strings, lists support **slicing** to extract a **sublist**:

\`\`\`python
nums = [0, 1, 2, 3, 4, 5]
nums[1:4]   # [1, 2, 3]
nums[:3]    # [0, 1, 2]
nums[3:]    # [3, 4, 5]
nums[::2]   # [0, 2, 4]  every second element
\`\`\`

**Copying:** \`copy = lst[:]\` or \`copy = list(lst)\` makes a shallow copy.

**Assignment trap:** \`sub = lst[1:3]\` gives a new list object. Changing \`sub\` does **not** change \`lst\`. But \`alias = lst\` makes two names for the **same** list — mutating through one name affects the other.`,
      codeExamples: [
        {
          language: 'python',
          code: `data = [10, 20, 30, 40, 50]

print(data[1:4])   # [20, 30, 40]
print(data[:2])    # [10, 20]
print(data[-2:])   # [40, 50]

first_half = data[:3]
first_half[0] = 999
print(data)        # [10, 20, 30, 40, 50] — original unchanged
print(first_half)  # [999, 20, 30]`,
          caption: 'Slicing creates a new list',
          editable: true,
        },
        {
          language: 'python',
          code: `letters = ['a', 'b', 'c', 'd', 'e']
print(letters[::2])   # ['a', 'c', 'e']
print(letters[::-1])  # ['e', 'd', 'c', 'b', 'a']`,
          caption: 'Step slicing on lists',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w5-5',
      title: 'Mutable vs Immutable',
      content: `Python sequences differ in whether you can change them **in place**:

| Type   | Mutable? | Example change |
|--------|----------|----------------|
| str    | **No**   | \`s[0] = "x"\` → TypeError |
| list   | **Yes**  | \`lst[0] = 99\` works |

**Strings:** Methods like \`.upper()\`, \`.replace()\`, and \`+\` return **new** strings. The original is untouched.

**Lists:** \`.append()\`, \`.pop()\`, \`lst[i] = ...\`, and \`.sort()\` change the list object itself.

**Aliasing:**
\`\`\`python
a = [1, 2, 3]
b = a          # same object
b.append(4)
print(a)       # [1, 2, 3, 4]
\`\`\`

Use \`b = a[:]\` when you need an independent copy.`,
      codeExamples: [
        {
          language: 'python',
          code: `s = "hello"
t = s.upper()
print(s)   # hello  (unchanged)
print(t)   # HELLO  (new string)

lst = [1, 2, 3]
lst.append(4)
print(lst) # [1, 2, 3, 4]  (same object, mutated)`,
          caption: 'Strings produce new values; lists mutate in place',
          editable: true,
        },
        {
          language: 'python',
          code: `original = [10, 20, 30]
alias = original
alias[0] = 999

print(original)  # [999, 20, 30]
print(alias)     # [999, 20, 30]

copy = original[:]
copy[0] = 0
print(original)  # [999, 20, 30]  (copy is separate)`,
          caption: 'Aliasing vs slicing copy',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    cr(
      'w5-q1',
      'Read a non-empty string `s` from stdin and print its **first** character (index 0).',
      's = input()\n# Print the first character\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Simple word', stdin: 'hello\n', expectedStdout: 'h' },
          { id: 's2', description: 'Single char', stdin: 'A\n', expectedStdout: 'A' },
        ],
        [
          { id: 'h1', stdin: 'Python\n', expectedStdout: 'P' },
          { id: 'h2', stdin: 'xyz\n', expectedStdout: 'x' },
          { id: 'h3', stdin: '12345\n', expectedStdout: '1' },
        ]
      ),
      'Model solution:\ns = input()\nprint(s[0])'
    ),

    cr(
      'w5-q2',
      'Read a non-empty string `s` from stdin and print its **last** character (use a negative index, `s[-1]`).',
      's = input()\n# Print the last character\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Word', stdin: 'hello\n', expectedStdout: 'o' },
          { id: 's2', description: 'Single char', stdin: 'Z\n', expectedStdout: 'Z' },
        ],
        [
          { id: 'h1', stdin: 'Python\n', expectedStdout: 'n' },
          { id: 'h2', stdin: 'abc\n', expectedStdout: 'c' },
          { id: 'h3', stdin: '123\n', expectedStdout: '3' },
        ]
      ),
      'Model solution:\ns = input()\nprint(s[-1])'
    ),

    cr(
      'w5-q3',
      'Read a string `s` (line 1) and an integer index `i` (line 2). Print the character at index `i` (0-based). Assume `0 <= i < len(s)`.',
      's = input()\ni = int(input())\n# Print the character at index i\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'First index', stdin: 'hello\n0\n', expectedStdout: 'h' },
          { id: 's2', description: 'Middle index', stdin: 'hello\n2\n', expectedStdout: 'l' },
        ],
        [
          { id: 'h1', stdin: 'Python\n3\n', expectedStdout: 'h' },
          { id: 'h2', stdin: 'abc\n2\n', expectedStdout: 'c' },
          { id: 'h3', stdin: 'test\n1\n', expectedStdout: 'e' },
        ]
      ),
      'Model solution:\ns = input()\ni = int(input())\nprint(s[i])'
    ),

    cr(
      'w5-q4',
      'Read a string `s` (line 1), `start` (line 2), and `end` (line 3). Print the substring `s[start:end]` (stop is exclusive, like normal slicing).',
      's = input()\nstart = int(input())\nend = int(input())\n# Print the substring s[start:end]\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Middle slice', stdin: 'Python\n1\n4\n', expectedStdout: 'yth' },
          { id: 's2', description: 'From start', stdin: 'hello\n0\n2\n', expectedStdout: 'he' },
        ],
        [
          { id: 'h1', stdin: 'abcdef\n2\n5\n', expectedStdout: 'cde' },
          { id: 'h2', stdin: 'slice\n1\n3\n', expectedStdout: 'li' },
          { id: 'h3', stdin: 'end\n1\n4\n', expectedStdout: 'nd' },
        ]
      ),
      'Model solution:\ns = input()\nstart = int(input())\nend = int(input())\nprint(s[start:end])'
    ),

    mc(
      'w5-q5',
      'What does this code print?\n    s = "Python"\n    print(s[-1])\n    print(s[1:4])',
      [
        { id: 'a', text: 'P, yth' },
        { id: 'b', text: 'n, yth' },
        { id: 'c', text: 'n, Pyt' },
        { id: 'd', text: 'o, yth' },
      ],
      'b',
      's[-1] is the last character "n". s[1:4] is indices 1,2,3 → "yth".'
    ),

    cr(
      'w5-q6',
      'Read a string `s` from stdin and print it **reversed**. Use slicing with a step: `s[::-1]`.',
      's = input()\n# Print s reversed\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Word', stdin: 'hello\n', expectedStdout: 'olleh' },
          { id: 's2', description: 'Palindrome', stdin: 'aba\n', expectedStdout: 'aba' },
        ],
        [
          { id: 'h1', stdin: 'Python\n', expectedStdout: 'nohtyP' },
          { id: 'h2', stdin: 'a\n', expectedStdout: 'a' },
          { id: 'h3', stdin: '12345\n', expectedStdout: '54321' },
        ]
      ),
      'Model solution:\ns = input()\nprint(s[::-1])'
    ),

    cr(
      'w5-q7',
      'Read a string `s` (line 1) and `sub` (line 2). Print `True` if `sub` appears anywhere in `s`, otherwise `False`. Use the `in` operator.',
      's = input()\nsub = input()\n# Print True if sub is in s\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Found', stdin: 'hello world\nworld\n', expectedStdout: 'True' },
          { id: 's2', description: 'Not found', stdin: 'hello world\nmars\n', expectedStdout: 'False' },
        ],
        [
          { id: 'h1', stdin: 'Python\nthon\n', expectedStdout: 'True' },
          { id: 'h2', stdin: 'Python\njava\n', expectedStdout: 'False' },
          { id: 'h3', stdin: 'aaa\naa\n', expectedStdout: 'True' },
          { id: 'h4', stdin: 'abc\nabcd\n', expectedStdout: 'False' },
        ]
      ),
      'Model solution:\ns = input()\nsub = input()\nprint(sub in s)'
    ),

    cr(
      'w5-q8',
      'Read a string `s` (line 1) and `prefix` (line 2). Print `True` if `s` begins with `prefix`, otherwise `False`. Use slicing: `s[:len(prefix)] == prefix`.',
      's = input()\nprefix = input()\n# Print True if s starts with prefix\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Matches', stdin: 'Python\nPy\n', expectedStdout: 'True' },
          { id: 's2', description: 'No match', stdin: 'Python\nJava\n', expectedStdout: 'False' },
        ],
        [
          { id: 'h1', stdin: 'hello\nhe\n', expectedStdout: 'True' },
          { id: 'h2', stdin: 'hello\nhello\n', expectedStdout: 'True' },
          { id: 'h3', stdin: 'hello\nhellos\n', expectedStdout: 'False' },
          { id: 'h4', stdin: 'a\na\n', expectedStdout: 'True' },
        ]
      ),
      'Model solution:\ns = input()\nprefix = input()\nprint(s[:len(prefix)] == prefix)'
    ),

    cr(
      'w5-q9',
      'Read a string `s` (line 1) and a single character `ch` (line 2). Print how many times `ch` appears in `s`.',
      's = input()\nch = input()\n# Print the count of ch in s\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Multiple matches', stdin: 'banana\na\n', expectedStdout: '3' },
          { id: 's2', description: 'No match', stdin: 'hello\nz\n', expectedStdout: '0' },
        ],
        [
          { id: 'h1', stdin: 'mississippi\ns\n', expectedStdout: '4' },
          { id: 'h2', stdin: 'aaa\na\n', expectedStdout: '3' },
          { id: 'h3', stdin: 'abc\na\n', expectedStdout: '1' },
          { id: 'h4', stdin: '\nx\n', expectedStdout: '0' },
        ]
      ),
      'Model solution:\ns = input()\nch = input()\ncount = 0\ni = 0\nwhile i < len(s):\n    if s[i] == ch:\n        count = count + 1\n    i = i + 1\nprint(count)\n\nWhy: A `while` loop with an index (Week 4) walks the string one character at a time using indexing (Week 5). `for` loops come in Week 7 — this stays within what you have learned.'
    ),

    cr(
      'w5-q10',
      'Read a string `s` from stdin and print the number of characters in it using `len()`. (An empty line has length 0.)',
      's = input()\n# Print the length of s\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Word', stdin: 'hello\n', expectedStdout: '5' },
          { id: 's2', description: 'Empty', stdin: '\n', expectedStdout: '0' },
        ],
        [
          { id: 'h1', stdin: 'Python\n', expectedStdout: '6' },
          { id: 'h2', stdin: 'a\n', expectedStdout: '1' },
          { id: 'h3', stdin: '12345\n', expectedStdout: '5' },
        ]
      ),
      'Model solution:\ns = input()\nprint(len(s))'
    ),

    cr(
      'w5-q11',
      'Read a string `s` and print its **first half** — the characters up to the middle, `s[:len(s)//2]`. For odd lengths the extra middle character is **not** included.',
      's = input()\n# Print the first half of s\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Even length', stdin: 'abcd\n', expectedStdout: 'ab' },
          { id: 's2', description: 'Odd length', stdin: 'python\n', expectedStdout: 'pyt' },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '' },
          { id: 'h2', stdin: 'a\n', expectedStdout: '' },
          { id: 'h3', stdin: 'hello\n', expectedStdout: 'he' },
        ]
      ),
      'Model solution:\ns = input()\nprint(s[:len(s)//2])\n\nWhy: `len(s)//2` is the midpoint index (floor division). Slicing `[:mid]` takes everything before it. A 1-char string has midpoint 0, so the first half is empty.'
    ),

    cr(
      'w5-q12',
      'Read a string `s` and print its **second half** — from the middle to the end, `s[len(s)//2:]`. For odd lengths this **includes** the extra middle character.',
      's = input()\n# Print the second half of s\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Even length', stdin: 'abcd\n', expectedStdout: 'cd' },
          { id: 's2', description: 'Odd length', stdin: 'python\n', expectedStdout: 'hon' },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '' },
          { id: 'h2', stdin: 'a\n', expectedStdout: 'a' },
          { id: 'h3', stdin: 'hello\n', expectedStdout: 'llo' },
        ]
      ),
      'Model solution:\ns = input()\nprint(s[len(s)//2:])\n\nWhy: Slicing from the midpoint `[mid:]` to the end captures the rest of the string. With odd length the middle character falls into the second half.'
    ),

    cr(
      'w5-q13',
      'Read a string `s` (line 1) and an integer `n` (line 2). Print the **first `n` characters** of `s` (`s[:n]`).',
      's = input()\nn = int(input())\n# Print the first n characters\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'First three', stdin: 'python\n3\n', expectedStdout: 'pyt' },
          { id: 's2', description: 'First one', stdin: 'hello\n1\n', expectedStdout: 'h' },
        ],
        [
          { id: 'h1', stdin: 'ab\n0\n', expectedStdout: '' },
          { id: 'h2', stdin: 'hi\n5\n', expectedStdout: 'hi' },
          { id: 'h3', stdin: 'x\n1\n', expectedStdout: 'x' },
        ]
      ),
      'Model solution:\ns = input()\nn = int(input())\nprint(s[:n])\n\nWhy: Slicing `[:n]` takes the first n characters. `[:0]` is empty, and asking for more characters than exist simply returns the whole string.'
    ),

    cr(
      'w5-q14',
      'Read a string `s` (line 1) and an integer `k` (line 2). Print the **last `k` characters** of `s` (`s[-k:]`). Assume `0 < k <= len(s)`.',
      's = input()\nk = int(input())\n# Print the last k characters\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Last two', stdin: 'python\n2\n', expectedStdout: 'on' },
          { id: 's2', description: 'Last one', stdin: 'hello\n1\n', expectedStdout: 'o' },
        ],
        [
          { id: 'h1', stdin: 'abc\n3\n', expectedStdout: 'abc' },
          { id: 'h2', stdin: 'slice\n2\n', expectedStdout: 'ce' },
          { id: 'h3', stdin: 'z\n1\n', expectedStdout: 'z' },
        ]
      ),
      'Model solution:\ns = input()\nk = int(input())\nprint(s[-k:])\n\nWhy: A negative-start slice `[-k:]` takes the last k characters, counting from the end.'
    ),

    cr(
      'w5-q15',
      'Read a string `s` and print it with the **first and last characters removed** (`s[1:-1]`). If `s` has fewer than 2 characters, this is an empty string.',
      's = input()\n# Print s without its first and last character\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Middle of word', stdin: 'python\n', expectedStdout: 'ytho' },
          { id: 's2', description: 'Five chars', stdin: 'abcde\n', expectedStdout: 'bcd' },
        ],
        [
          { id: 'h1', stdin: 'ab\n', expectedStdout: '' },
          { id: 'h2', stdin: 'a\n', expectedStdout: '' },
          { id: 'h3', stdin: '\n', expectedStdout: '' },
        ]
      ),
      'Model solution:\ns = input()\nprint(s[1:-1])\n\nWhy: `[1:-1]` starts after the first character and stops before the last. With 0, 1, or 2 characters there is nothing in between, so the result is empty.'
    ),

    tf(
      'w5-q16',
      'Lists in Python are mutable — you can change their elements after creation.',
      'true',
      'Unlike strings, lists support in-place changes such as lst[0] = 99 and lst.append(4).'
    ),

    cr(
      'w5-q18',
      'Read a non-empty string `s` and print a 2-character string made of its **first and last** characters (`s[0] + s[-1]`).',
      's = input()\n# Print first + last character\n',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Word', stdin: 'hello\n', expectedStdout: 'ho' },
          { id: 's2', description: 'Two chars', stdin: 'ab\n', expectedStdout: 'ab' },
        ],
        [
          { id: 'h1', stdin: 'python\n', expectedStdout: 'pn' },
          { id: 'h2', stdin: 'xy\n', expectedStdout: 'xy' },
          { id: 'h3', stdin: 'racecar\n', expectedStdout: 'rr' },
        ]
      ),
      'Model solution:\ns = input()\nprint(s[0] + s[-1])\n\nWhy: `s[0]` is the first character and `s[-1]` the last; `+` concatenates them. For a 1-char string both indices point at the same character (not tested here, since the prompt asks for non-empty with ≥1 char).'
    ),
  ],
};

export default week5;
