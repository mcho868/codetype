import type { Module } from '../python101/types';
import { cr, mc, tf, fib, stdoutCases } from './authoring';

const week6: Module = {
  id: 'week-6',
  slug: 'week-6',
  title: 'String & List Methods',
  description:
    'Master built-in string methods (upper, lower, split, join, replace, find) and list methods (append, extend, pop, sort, count) with practical worked examples.',
  icon: '🔧',
  color: 'from-rose-500 to-pink-400',
  locked: false,
  section: 'Week 6',
  lessons: [
    {
      id: 'lesson-w6-1',
      title: 'upper() and lower()',
      content: `Strings have **methods** — functions attached to a value, called with dot notation: \`value.method()\`.

**Case methods** return a **new string** (the original is unchanged — strings are immutable):

- \`s.upper()\` — every letter becomes uppercase
- \`s.lower()\` — every letter becomes lowercase

Non-letter characters (digits, spaces, punctuation) stay the same.

**Common uses:** normalizing user input for comparisons, formatting output, building case-insensitive searches.`,
      codeExamples: [
        {
          language: 'python',
          code: `greeting = "Hello, Python!"

print(greeting.upper())   # HELLO, PYTHON!
print(greeting.lower())   # hello, python!

# Original string is unchanged
print(greeting)             # Hello, Python!`,
          caption: 'upper() and lower() return new strings',
          editable: true,
        },
        {
          language: 'python',
          code: `answer = input()
if answer.lower() == "yes":
    print("Confirmed!")
else:
    print("Cancelled.")`,
          caption: 'Case-insensitive comparison with lower()',
          sampleInput: 'YES\n',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w6-2',
      title: 'split() and join()',
      content: `**split(sep)** breaks a string into a **list** of substrings. By default it splits on whitespace; pass a separator to split on something else:

\`\`\`python
"one two three".split()       # ['one', 'two', 'three']
"a,b,c".split(",")            # ['a', 'b', 'c']
\`\`\`

**join(iterable)** is the opposite — it takes a list (or any iterable of strings) and glues them together with a separator string:

\`\`\`python
"-".join(["a", "b", "c"])   # 'a-b-c'
" ".join(["Hello", "world"]) # 'Hello world'
\`\`\`

**Remember:** \`join\` is called on the separator string, not on the list: \`sep.join(items)\`, not \`items.join(sep)\`.`,
      codeExamples: [
        {
          language: 'python',
          code: `sentence = "Python is fun"
words = sentence.split()
print(words)        # ['Python', 'is', 'fun']
print(len(words))   # 3

csv = "red,green,blue"
colors = csv.split(",")
print(colors)       # ['red', 'green', 'blue']`,
          caption: 'split() turns a string into a list',
          editable: true,
        },
        {
          language: 'python',
          code: `parts = ["2024", "06", "20"]
date = "-".join(parts)
print(date)         # 2024-06-20

words = ["Hello", "from", "Python"]
line = " ".join(words)
print(line)         # Hello from Python`,
          caption: 'join() glues a list into one string',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w6-3',
      title: 'replace() and find()',
      content: `**replace(old, new)** returns a new string where every occurrence of \`old\` is replaced with \`new\`:

\`\`\`python
"hello world".replace("world", "Python")  # 'hello Python'
"aaa".replace("a", "b")                   # 'bbb'
\`\`\`

**find(sub)** searches for a substring and returns the **index** of the first match (0-based). If \`sub\` is not found, it returns **-1** (it does not raise an error):

\`\`\`python
"banana".find("na")    # 2
"banana".find("z")     # -1
\`\`\`

Use \`find\` when you need the position; use \`in\` when you only need to know whether something is present.`,
      codeExamples: [
        {
          language: 'python',
          code: `text = "I love Java"

fixed = text.replace("Java", "Python")
print(fixed)        # I love Python

no_spaces = "a b c".replace(" ", "")
print(no_spaces)    # abc`,
          caption: 'replace() substitutes text',
          editable: true,
        },
        {
          language: 'python',
          code: `email = "user@example.com"

at_index = email.find("@")
print(at_index)     # 4

dot_index = email.find(".")
print(dot_index)    # 12

missing = email.find("z")
print(missing)      # -1`,
          caption: 'find() returns an index or -1',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w6-4',
      title: 'append(), extend(), and pop()',
      content: `Unlike strings, **lists are mutable** — you can change them in place with methods:

- \`lst.append(item)\` — add **one** item to the end
- \`lst.extend(other)\` — add **all** items from another list (or iterable) to the end
- \`lst.pop()\` — remove and return the **last** item; \`lst.pop(i)\` removes at index \`i\`

**append vs extend:** \`append([1, 2])\` adds the list as a single element; \`extend([1, 2])\` adds 1 and 2 separately.

\`\`\`python
a = [1, 2]
a.append(3)      # [1, 2, 3]
a.extend([4, 5]) # [1, 2, 3, 4, 5]
last = a.pop()   # 5, list is now [1, 2, 3, 4]
\`\`\``,
      codeExamples: [
        {
          language: 'python',
          code: `nums = [1, 2, 3]
nums.append(4)
print(nums)         # [1, 2, 3, 4]

nums.append([5, 6])
print(nums)         # [1, 2, 3, 4, [5, 6]]  — one nested list!`,
          caption: 'append adds a single element',
          editable: true,
        },
        {
          language: 'python',
          code: `a = [1, 2, 3]
a.extend([4, 5])
print(a)            # [1, 2, 3, 4, 5]

b = ["x", "y"]
b.extend(["z"])
print(b)            # ['x', 'y', 'z']

last = b.pop()
print(last)         # z
print(b)            # ['x', 'y']`,
          caption: 'extend flattens items; pop removes from the end',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w6-5',
      title: 'sort() and count()',
      content: `**sort()** rearranges a list **in place** (ascending by default). It returns \`None\` — the list itself is modified:

\`\`\`python
nums = [3, 1, 4, 1, 5]
nums.sort()
print(nums)   # [1, 1, 3, 4, 5]
\`\`\`

Pass \`reverse=True\` for descending order.

**sorted(list)** is the **non-mutating** counterpart: it returns a **new** sorted list and leaves the original unchanged. Use it when you need the sorted order *and* want to keep the original:

\`\`\`python
original = [3, 1, 2]
new_list = sorted(original)
print(new_list)   # [1, 2, 3]
print(original)   # [3, 1, 2]  (unchanged)
\`\`\`

Key difference: \`list.sort()\` changes the list in place and returns \`None\`; \`sorted(list)\` returns a new list. So write \`nums.sort()\` then use \`nums\`, **or** \`new = sorted(nums)\` — never \`nums = nums.sort()\` (that stores \`None\`).

**count(value)** returns how many times \`value\` appears in the list — it does not modify the list:

\`\`\`python
[1, 2, 2, 3, 2].count(2)   # 3
\`\`\`

**Worked pattern:** combine string and list methods to process text:

\`\`\`python
text = "one two three four"
words = text.split()
print(len(words))           # word count
print(words.count("two"))   # 1
\`\`\``,
      codeExamples: [
        {
          language: 'python',
          code: `scores = [88, 92, 75, 92, 100, 75]
scores.sort()
print(scores)       # [75, 75, 88, 92, 92, 100]

print(scores.count(92))   # 2
print(scores.count(75))   # 2`,
          caption: 'sort() orders the list; count() tallies matches',
          editable: true,
        },
        {
          language: 'python',
          code: `# sort() vs sorted(): in-place vs new list
data = [3, 1, 2]

# sorted() returns a NEW list, original untouched
ordered = sorted(data)
print(ordered)   # [1, 2, 3]
print(data)      # [3, 1, 2]  (unchanged)

# sort() changes the list itself and returns None
data.sort()
print(data)      # [1, 2, 3]
print(data.sort())  # None  <- common mistake to assign this`,
          caption: 'sorted() leaves the original; sort() mutates and returns None',
          editable: true,
        },
        {
          language: 'python',
          code: `line = "apple,banana,cherry,banana"
fruits = line.split(",")
fruits.sort()
print(fruits)               # ['apple', 'banana', 'banana', 'cherry']
print(fruits.count("banana")) # 2

joined = " | ".join(fruits)
print(joined)`,
          caption: 'Chaining split, sort, count, and join',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    mc(
      'w6-q1',
      'What does `"a,b,c".split(",")` return?',
      [
        { id: 'a', text: `'a,b,c'` },
        { id: 'b', text: `['a', 'b', 'c']` },
        { id: 'c', text: `('a', 'b', 'c')` },
        { id: 'd', text: `'abc'` },
      ],
      'b',
      'split(sep) breaks a string at each separator and returns a list of the parts.'
    ),

    cr(
      'w6-q2',
      'Read one line of text and print it converted to **uppercase** with `.upper()`.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Simple word', stdin: 'hello\n', expectedStdout: 'HELLO' },
          { id: 's2', description: 'Mixed case', stdin: 'PyThOn\n', expectedStdout: 'PYTHON' },
          { id: 's3', description: 'With digits', stdin: 'Hi 42\n', expectedStdout: 'HI 42' },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '' },
          { id: 'h2', stdin: 'a\n', expectedStdout: 'A' },
          { id: 'h3', stdin: '123\n', expectedStdout: '123' },
          { id: 'h4', stdin: 'Hello, World!\n', expectedStdout: 'HELLO, WORLD!' },
        ]
      ),
      'Model solution:\nprint(input().upper())'
    ),

    cr(
      'w6-q3',
      'Read one line of text and print it converted to **lowercase** with `.lower()`.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Uppercase input', stdin: 'HELLO\n', expectedStdout: 'hello' },
          { id: 's2', description: 'Mixed case', stdin: 'PyThOn\n', expectedStdout: 'python' },
          { id: 's3', description: 'Already lower', stdin: 'abc\n', expectedStdout: 'abc' },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '' },
          { id: 'h2', stdin: 'A\n', expectedStdout: 'a' },
          { id: 'h3', stdin: '123\n', expectedStdout: '123' },
          { id: 'h4', stdin: 'YES!\n', expectedStdout: 'yes!' },
        ]
      ),
      'Model solution:\nprint(input().lower())'
    ),

    cr(
      'w6-q4',
      'Read one line of text and print the list of words from `text.split()` (default whitespace split). Print the list as a Python list, e.g. `[\'one\', \'two\']`.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Three words', stdin: 'one two three\n', expectedStdout: "['one', 'two', 'three']" },
          { id: 's2', description: 'Single word', stdin: 'hello\n', expectedStdout: "['hello']" },
          { id: 's3', description: 'Extra spaces', stdin: '  a   b  \n', expectedStdout: "['a', 'b']" },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '[]' },
          { id: 'h2', stdin: 'x\n', expectedStdout: "['x']" },
          { id: 'h3', stdin: 'foo bar\n', expectedStdout: "['foo', 'bar']" },
          { id: 'h4', stdin: 'Python is fun\n', expectedStdout: "['Python', 'is', 'fun']" },
        ]
      ),
      'Model solution:\nprint(input().split())\n\nWhy: `.split()` with no argument splits on any run of whitespace and ignores leading/trailing spaces, so empty input gives [].'
    ),

    cr(
      'w6-q5',
      'Read one line and print the list produced by splitting it on **commas** with `split(",")`. Print the list as a Python list.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Three items', stdin: 'red,green,blue\n', expectedStdout: "['red', 'green', 'blue']" },
          { id: 's2', description: 'Single item', stdin: 'only\n', expectedStdout: "['only']" },
          { id: 's3', description: 'Numbers as text', stdin: '1,2,3\n', expectedStdout: "['1', '2', '3']" },
        ],
        [
          { id: 'h1', stdin: 'a,b\n', expectedStdout: "['a', 'b']" },
          { id: 'h2', stdin: '\n', expectedStdout: "['']" },
          { id: 'h3', stdin: 'x,y,z,w\n', expectedStdout: "['x', 'y', 'z', 'w']" },
          { id: 'h4', stdin: 'one,two\n', expectedStdout: "['one', 'two']" },
        ]
      ),
      'Model solution:\nprint(input().split(","))\n\nWhy: Unlike `.split()` with no argument, `split(",")` keeps empty pieces — an empty line yields `[\'\']`.'
    ),

    fib(
      'w6-q6',
      'Complete the join call that glues a list with hyphens:\n    parts = ["a", "b", "c"]\n    result = ______(parts)\nWhat goes in the blank?',
      '"-".join',
      'join is called on the separator string: "-".join(parts) produces "a-b-c".'
    ),

    cr(
      'w6-q7',
      'Read a line of space-separated words (use `input().split()` to get a list), then print them **joined with a single space** using `" ".join(words)`.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Three words', stdin: 'Hello world again\n', expectedStdout: 'Hello world again' },
          { id: 's2', description: 'One word', stdin: 'Python\n', expectedStdout: 'Python' },
          { id: 's3', description: 'Two items', stdin: 'a b\n', expectedStdout: 'a b' },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '' },
          { id: 'h2', stdin: 'x\n', expectedStdout: 'x' },
          { id: 'h3', stdin: '1 2 3\n', expectedStdout: '1 2 3' },
          { id: 'h4', stdin: 'hi there\n', expectedStdout: 'hi there' },
        ]
      ),
      'Model solution:\nwords = input().split()\nprint(" ".join(words))\n\nWhy: `split()` makes a list of words; `" ".join(...)` glues them back with single spaces. An empty line gives [] → "".'
    ),

    cr(
      'w6-q8',
      'Read one line and print it with every **space** replaced by a **hyphen** using `.replace(" ", "-")`.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Two words', stdin: 'hello world\n', expectedStdout: 'hello-world' },
          { id: 's2', description: 'Three words', stdin: 'one two three\n', expectedStdout: 'one-two-three' },
          { id: 's3', description: 'No spaces', stdin: 'nospaces\n', expectedStdout: 'nospaces' },
        ],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '' },
          { id: 'h2', stdin: 'a b\n', expectedStdout: 'a-b' },
          { id: 'h3', stdin: 'x y z\n', expectedStdout: 'x-y-z' },
          { id: 'h4', stdin: 'one two three four\n', expectedStdout: 'one-two-three-four' },
        ]
      ),
      'Model solution:\nprint(input().replace(" ", "-"))'
    ),

    cr(
      'w6-q9',
      'Read a string `text` (line 1) and a single character `ch` (line 2). Print the index of the **first** occurrence of `ch` using `.find()` (which returns `-1` if not found).',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Found at start', stdin: 'apple\na\n', expectedStdout: '0' },
          { id: 's2', description: 'Found in middle', stdin: 'banana\nn\n', expectedStdout: '2' },
          { id: 's3', description: 'Not found', stdin: 'hello\nz\n', expectedStdout: '-1' },
        ],
        [
          { id: 'h1', stdin: 'abc\nc\n', expectedStdout: '2' },
          { id: 'h2', stdin: '\na\n', expectedStdout: '-1' },
          { id: 'h3', stdin: 'aaa\na\n', expectedStdout: '0' },
          { id: 'h4', stdin: 'test\nt\n', expectedStdout: '0' },
        ]
      ),
      'Model solution:\ntext = input()\nch = input()\nprint(text.find(ch))\n\nWhy: `.find()` returns the index of the first match, or `-1` when absent (unlike `.index()`, which raises an error).'
    ),

    tf(
      'w6-q10',
      'When `find(sub)` does not find `sub` in a string, it raises a `ValueError`.',
      'false',
      'find returns -1 when the substring is not found — it does not raise an error. (index() does raise ValueError.)'
    ),

    cr(
      'w6-q11',
      'Read a list of space-separated integers (line 1) and an integer `item` (line 2). **Append** `item` to the list with `.append()` and print the modified list.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Append int', stdin: '1 2\n3\n', expectedStdout: '[1, 2, 3]' },
          { id: 's2', description: 'Append to empty', stdin: '\n0\n', expectedStdout: '[0]' },
          { id: 's3', description: 'Append duplicate', stdin: '5 5\n5\n', expectedStdout: '[5, 5, 5]' },
        ],
        [
          { id: 'h1', stdin: '1\n2\n', expectedStdout: '[1, 2]' },
          { id: 'h2', stdin: '\n-1\n', expectedStdout: '[-1]' },
          { id: 'h3', stdin: '10 20\n30\n', expectedStdout: '[10, 20, 30]' },
          { id: 'h4', stdin: '7\n8\n', expectedStdout: '[7, 8]' },
        ]
      ),
      'Model solution:\nparts = input().split()\nnums = []\ni = 0\nwhile i < len(parts):\n    nums.append(int(parts[i]))\n    i = i + 1\nitem = int(input())\nnums.append(item)\nprint(nums)\n\nWhy: `.split()` (this week) breaks the line into string pieces; a `while` loop (Week 4) converts each to int with `int()`. Then `.append()` adds the new item to the end in place. (`for` loops arrive in Week 7.)'
    ),

    cr(
      'w6-q12',
      'Read two lists of space-separated integers — `lst` (line 1) and `items` (line 2). **Extend** `lst` with all elements of `items` using `.extend()` and print the result.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Extend with two', stdin: '1\n2 3\n', expectedStdout: '[1, 2, 3]' },
          { id: 's2', description: 'Extend empty', stdin: '\n1 2\n', expectedStdout: '[1, 2]' },
          { id: 's3', description: 'Extend with empty', stdin: '1 2\n\n', expectedStdout: '[1, 2]' },
        ],
        [
          { id: 'h1', stdin: '0\n1\n', expectedStdout: '[0, 1]' },
          { id: 'h2', stdin: '1 2 3\n4 5\n', expectedStdout: '[1, 2, 3, 4, 5]' },
          { id: 'h3', stdin: '\n\n', expectedStdout: '[]' },
          { id: 'h4', stdin: '9\n8 7\n', expectedStdout: '[9, 8, 7]' },
        ]
      ),
      'Model solution:\nlst = input().split()\nitems = input().split()\ni = 0\nwhile i < len(lst):\n    lst[i] = int(lst[i])\n    i = i + 1\ni = 0\nwhile i < len(items):\n    items[i] = int(items[i])\n    i = i + 1\nlst.extend(items)\nprint(lst)\n\nWhy: `.extend()` adds every element of another list, unlike `.append()` which would add the whole list as one nested element. Each line is read with `.split()` and converted to ints with a `while` loop (Week 4).'
    ),

    cr(
      'w6-q13',
      'Read a non-empty list of space-separated integers and print the **last** element removed with `.pop()`.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Pop from three', stdin: '1 2 3\n', expectedStdout: '3' },
          { id: 's2', description: 'Pop from one', stdin: '42\n', expectedStdout: '42' },
          { id: 's3', description: 'Pop last of two', stdin: '8 9\n', expectedStdout: '9' },
        ],
        [
          { id: 'h1', stdin: '0 0\n', expectedStdout: '0' },
          { id: 'h2', stdin: '-1 -2 -3\n', expectedStdout: '-3' },
          { id: 'h3', stdin: '5\n', expectedStdout: '5' },
          { id: 'h4', stdin: '10 20\n', expectedStdout: '20' },
        ]
      ),
      'Model solution:\nparts = input().split()\nnums = []\ni = 0\nwhile i < len(parts):\n    nums.append(int(parts[i]))\n    i = i + 1\nprint(nums.pop())\n\nWhy: `.pop()` with no argument removes and returns the last element. The list is built from the split pieces with a `while` loop (Week 4) so we stay before `for` loops.'
    ),

    cr(
      'w6-q14',
      'Read a list of space-separated integers and print it sorted **in ascending order** using `.sort()`. Print the list as a Python list.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Unsorted three', stdin: '3 1 2\n', expectedStdout: '[1, 2, 3]' },
          { id: 's2', description: 'Already sorted', stdin: '1 2 3\n', expectedStdout: '[1, 2, 3]' },
          { id: 's3', description: 'Duplicates', stdin: '2 1 2\n', expectedStdout: '[1, 2, 2]' },
        ],
        [
          { id: 'h1', stdin: '0\n', expectedStdout: '[0]' },
          { id: 'h2', stdin: '5 4 3 2 1\n', expectedStdout: '[1, 2, 3, 4, 5]' },
          { id: 'h3', stdin: '-3 -1 -2\n', expectedStdout: '[-3, -2, -1]' },
          { id: 'h4', stdin: '10 10\n', expectedStdout: '[10, 10]' },
        ]
      ),
      'Model solution:\nparts = input().split()\nnums = []\ni = 0\nwhile i < len(parts):\n    nums.append(int(parts[i]))\n    i = i + 1\nnums.sort()\nprint(nums)\n\nWhy: `.sort()` orders the list in place (it returns None, so you print the list afterward, not the result of sort()). The list is built from the split pieces with a `while` loop.'
    ),

    cr(
      'w6-q15',
      'Read a list of space-separated integers (line 1) and an integer `value` (line 2). Print how many times `value` appears in the list using `.count()`.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Count twos', stdin: '1 2 2 3\n2\n', expectedStdout: '2' },
          { id: 's2', description: 'Count missing', stdin: '1 2 3\n5\n', expectedStdout: '0' },
          { id: 's3', description: 'All match', stdin: '7 7 7\n7\n', expectedStdout: '3' },
        ],
        [
          { id: 'h1', stdin: '\n1\n', expectedStdout: '0' },
          { id: 'h2', stdin: '0 0 1\n0\n', expectedStdout: '2' },
          { id: 'h3', stdin: '4 5 4\n4\n', expectedStdout: '2' },
          { id: 'h4', stdin: '1 1 1 1\n1\n', expectedStdout: '4' },
        ]
      ),
      'Model solution:\nparts = input().split()\nnums = []\ni = 0\nwhile i < len(parts):\n    nums.append(int(parts[i]))\n    i = i + 1\nvalue = int(input())\nprint(nums.count(value))\n\nWhy: `.count(value)` returns how many elements equal value (0 if none, including on an empty list). The list is built from the split pieces with a `while` loop.'
    ),

    cr(
      'w6-q16',
      'Read a line of text (line 1) and a single `word` (line 2). Print how many times `word` appears as a whitespace-separated word in the text. Use `split()` to get the words, then `.count()`. (Whole-word match — `"cat"` does **not** match inside `"category"`.)',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Repeated word', stdin: 'the cat the dog the\nthe\n', expectedStdout: '3' },
          { id: 's2', description: 'Not present', stdin: 'a b c\nz\n', expectedStdout: '0' },
          { id: 's3', description: 'Whole-word only', stdin: 'cat category cat\ncat\n', expectedStdout: '2' },
        ],
        [
          { id: 'h1', stdin: 'hi\nhi\n', expectedStdout: '1' },
          { id: 'h2', stdin: 'one one one\none\n', expectedStdout: '3' },
          { id: 'h3', stdin: '\nx\n', expectedStdout: '0' },
          { id: 'h4', stdin: 'Cat cat\ncat\n', expectedStdout: '1' },
        ]
      ),
      'Model solution:\ntext = input()\nword = input()\nwords = text.split()\nprint(words.count(word))\n\nWhy: `split()` turns the line into a list of words, then `.count()` counts exact matches in that list. Counting on the list (not the raw string) gives whole-word matches, so "cat" does not match inside "category", and it is case-sensitive ("Cat" ≠ "cat").'
    ),

    cr(
      'w6-q17',
      'Read one line of text and print the **number of words** in it (use `split()` and `len`).',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Three words', stdin: 'one two three\n', expectedStdout: '3' },
          { id: 's2', description: 'One word', stdin: 'hello\n', expectedStdout: '1' },
          { id: 's3', description: 'Empty string', stdin: '\n', expectedStdout: '0' },
        ],
        [
          { id: 'h1', stdin: '  a   b  \n', expectedStdout: '2' },
          { id: 'h2', stdin: 'Python is fun\n', expectedStdout: '3' },
          { id: 'h3', stdin: 'x\n', expectedStdout: '1' },
          { id: 'h4', stdin: 'four five six seven\n', expectedStdout: '4' },
        ]
      ),
      'Model solution:\nprint(len(input().split()))\n\nWhy: `split()` with no argument collapses runs of whitespace, so extra spaces do not inflate the count, and an empty line gives 0.'
    ),

    cr(
      'w6-q18',
      'Read a title line and print a URL-style **slug**: convert to **lowercase**, then replace every **space** with a **hyphen**. (Chain `.lower()` and `.replace(...)`.)',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Simple title', stdin: 'Hello World\n', expectedStdout: 'hello-world' },
          { id: 's2', description: 'Already lower', stdin: 'python rocks\n', expectedStdout: 'python-rocks' },
          { id: 's3', description: 'Single word upper', stdin: 'PYTHON\n', expectedStdout: 'python' },
        ],
        [
          { id: 'h1', stdin: 'A B C\n', expectedStdout: 'a-b-c' },
          { id: 'h2', stdin: '\n', expectedStdout: '' },
          { id: 'h3', stdin: 'One Two Three\n', expectedStdout: 'one-two-three' },
          { id: 'h4', stdin: 'Hi There Friend\n', expectedStdout: 'hi-there-friend' },
        ]
      ),
      'Model solution:\nprint(input().lower().replace(" ", "-"))\n\nWhy: Method calls chain left-to-right: `.lower()` first lowercases, then `.replace(" ", "-")` swaps spaces for hyphens.'
    ),
  ],
};

export default week6;
