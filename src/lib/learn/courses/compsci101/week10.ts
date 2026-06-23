import type { Module } from '../python101/types';
import { cr, mc, tf, fib, funcCases } from './authoring';

const week10: Module = {
  id: 'week-10',
  slug: 'week-10',
  title: 'Dictionaries & Nested Loops',
  description:
    'Create and update dictionaries, iterate keys/values/items, build frequency counts, and process nested lists and 2D grid data with nested loops.',
  icon: '🗂️',
  color: 'from-fuchsia-500 to-purple-400',
  locked: false,
  section: 'Week 10',
  lessons: [
    {
      id: 'lesson-w10-1',
      title: 'Dictionary Basics & CRUD',
      content: `A **dictionary** maps **keys** to **values** — like a real dictionary maps words to definitions.

\`\`\`python
ages = {"Ada": 36, "Grace": 89, "Alan": 41}
\`\`\`

**CRUD operations:**
- **Create / Read:** \`ages["Ada"]\` → 36; \`ages.get("Bob", 0)\` with default
- **Update:** \`ages["Ada"] = 37\`
- **Add:** \`ages["Bob"] = 50\`
- **Delete:** \`del ages["Alan"]\` or \`ages.pop("Alan")\`

Keys must be **immutable** (strings, numbers, tuples). Values can be anything.

Check membership: \`"Ada" in ages\` → True (checks keys, not values).`,
      codeExamples: [
        {
          language: 'python',
          code: `scores = {"math": 90, "english": 85}
scores["science"] = 92      # add
scores["math"] = 95           # update
print(scores["math"])         # 95
print("art" in scores)        # False
print(scores.get("art", 0))   # 0`,
          caption: 'Create, read, update a dictionary',
          editable: true,
        },
        {
          language: 'python',
          code: `phone = {}
phone["home"] = "555-0100"
phone["work"] = "555-0200"
del phone["home"]
print(phone)  # {'work': '555-0200'}`,
          caption: 'Add and delete keys',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w10-2',
      title: 'Iterating Dictionaries',
      content: `Loop over a dictionary's contents:

\`\`\`python
for key in d:           # keys (default)
    print(key, d[key])

for key in d.keys():    # explicit keys
    ...

for val in d.values():  # values only
    ...

for key, val in d.items():  # key-value pairs
    ...
\`\`\`

**.items()** is the most common when you need both key and value.

**Building a dict in a loop:**
\`\`\`python
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1
\`\`\``,
      codeExamples: [
        {
          language: 'python',
          code: `capitals = {"NZ": "Wellington", "AU": "Canberra", "FJ": "Suva"}

for country, city in capitals.items():
    print(country, "->", city)`,
          caption: 'Iterate with .items()',
          editable: true,
        },
        {
          language: 'python',
          code: `d = {"a": 1, "b": 2, "c": 3}
total = 0
for v in d.values():
    total += v
print(total)  # 6`,
          caption: 'Sum all values',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w10-3',
      title: 'Frequency Counts',
      content: `Counting how often each item appears is a classic dictionary pattern:

\`\`\`python
def freq(items):
    counts = {}
    for item in items:
        counts[item] = counts.get(item, 0) + 1
    return counts
\`\`\`

**.get(key, default)** returns 0 for unseen keys instead of raising KeyError.

**Applications:**
- Word counts in text
- Vote tallies
- Inventory tracking
- Finding the most common element`,
      codeExamples: [
        {
          language: 'python',
          code: `letters = ["a", "b", "a", "c", "b", "a"]
counts = {}
for ch in letters:
    counts[ch] = counts.get(ch, 0) + 1
print(counts)  # {'a': 3, 'b': 2, 'c': 1}`,
          caption: 'Letter frequency count',
          editable: true,
        },
        {
          language: 'python',
          code: `votes = ["yes", "no", "yes", "yes", "no"]
tally = {}
for v in votes:
    tally[v] = tally.get(v, 0) + 1
print(tally)  # {'yes': 3, 'no': 2}`,
          caption: 'Vote tally',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w10-4',
      title: 'Nested Lists & 2D Data',
      content: `A **nested list** is a list containing other lists — useful for grids, tables, and matrices:

\`\`\`python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
\`\`\`

Access element at row \`r\`, column \`c\`: \`grid[r][c]\`

**Nested loops** visit every cell:

\`\`\`python
for row in grid:
    for cell in row:
        print(cell, end=" ")
    print()
\`\`\`

Or with indices: \`for r in range(len(grid)):\` then \`grid[r][c]\`.`,
      codeExamples: [
        {
          language: 'python',
          code: `matrix = [[1, 2], [3, 4], [5, 6]]
print(matrix[1][0])  # 3 — row 1, col 0

total = 0
for row in matrix:
    for val in row:
        total += val
print(total)  # 21`,
          caption: 'Access and sum a 2D list',
          editable: true,
        },
        {
          language: 'python',
          code: `board = [["X", "O", " "], [" ", "X", "O"], ["O", " ", "X"]]
for row in board:
    print(" | ".join(row))`,
          caption: 'Print a tic-tac-toe grid',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-w10-5',
      title: 'Combining Dicts & Nested Loops',
      content: `Real programs combine both tools:

- Store a 2D grid as a **list of lists**, loop to search or transform
- Use a **dict** to count occurrences found during the nested loop
- Map names to nested data: \`{"Ada": [95, 88], "Grace": [92]}\`

\`\`\`python
def count_in_grid(grid, target):
    count = 0
    for row in grid:
        for cell in row:
            if cell == target:
                count += 1
    return count
\`\`\`

When looping 2D data, decide: iterate rows then cells (cleaner) or use indices when you need positions.`,
      codeExamples: [
        {
          language: 'python',
          code: `grid = [[1, 0, 1], [0, 1, 0], [1, 1, 0]]

count = 0
for row in grid:
    for cell in row:
        if cell == 1:
            count += 1
print(count)  # 5`,
          caption: 'Count 1s in a binary grid',
          editable: true,
        },
        {
          language: 'python',
          code: `students = {"Ada": [90, 85], "Grace": [88, 92]}

averages = {}
for name, scores in students.items():
    total = 0
    for s in scores:
        total += s
    averages[name] = total / len(scores)

print(averages)  # {'Ada': 87.5, 'Grace': 90.0}`,
          caption: 'Dict of lists → dict of averages',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    mc(
      'w10-q1',
      'What does `{"a": 1, "b": 2}["a"]` evaluate to?',
      [
        { id: 'a', text: '0' },
        { id: 'b', text: '1' },
        { id: 'c', text: '"a"' },
        { id: 'd', text: 'KeyError' },
      ],
      'b',
      'Dictionary lookup by key "a" returns its value, 1.'
    ),

    cr(
      'w10-q2',
      'Implement `make_dict(keys, values)` that builds a dictionary mapping each key to the corresponding value (same length lists; index i maps keys[i] → values[i]).',
      `def make_dict(keys, values):
    d = {}
    for i in range(len(keys)):
        d[keys[i]] = values[i]
    return d`,
      'function',
      funcCases(
        'make_dict',
        [
          { id: 's1', description: 'Two pairs', args: [['a', 'b'], [1, 2]], expectedReturn: { a: 1, b: 2 } },
          { id: 's2', description: 'Empty', args: [[], []], expectedReturn: {} },
        ],
        [
          { id: 'h1', args: [['x'], [10]], expectedReturn: { x: 10 } },
          { id: 'h2', args: [['one', 'two', 'three'], [1, 2, 3]], expectedReturn: { one: 1, two: 2, three: 3 } },
          { id: 'h3', args: [['k'], [0]], expectedReturn: { k: 0 } },
          { id: 'h4', args: [['a', 'b'], [9, 8]], expectedReturn: { a: 9, b: 8 } },
        ]
      ),
      'Model solution:\ndef make_dict(keys, values):\n    d = {}\n    for i in range(len(keys)):\n        d[keys[i]] = values[i]\n    return d'
    ),

    cr(
      'w10-q3',
      'Implement `get_or_zero(d, key)` returning `d[key]` if the key exists, otherwise **0** (use `.get()`).',
      `def get_or_zero(d, key):
    return d.get(key, 0)`,
      'function',
      funcCases(
        'get_or_zero',
        [
          { id: 's1', description: 'Key exists', args: [{ a: 5, b: 3 }, 'a'], expectedReturn: 5 },
          { id: 's2', description: 'Missing key', args: [{ a: 5 }, 'z'], expectedReturn: 0 },
        ],
        [
          { id: 'h1', args: [{}, 'x'], expectedReturn: 0 },
          { id: 'h2', args: [{ n: 0 }, 'n'], expectedReturn: 0 },
          { id: 'h3', args: [{ k: -1 }, 'k'], expectedReturn: -1 },
          { id: 'h4', args: [{ a: 1, b: 2 }, 'b'], expectedReturn: 2 },
        ]
      ),
      'Model solution:\ndef get_or_zero(d, key):\n    return d.get(key, 0)'
    ),

    cr(
      'w10-q4',
      'Implement `sum_values(d)` returning the sum of all **values** in dictionary `d` (values are integers).',
      `def sum_values(d):
    total = 0
    for v in d.values():
        total += v
    return total`,
      'function',
      funcCases(
        'sum_values',
        [
          { id: 's1', description: 'Small dict', args: [{ a: 1, b: 2, c: 3 }], expectedReturn: 6 },
          { id: 's2', description: 'Empty dict', args: [{}], expectedReturn: 0 },
        ],
        [
          { id: 'h1', args: [{ x: 10 }], expectedReturn: 10 },
          { id: 'h2', args: [{ a: -1, b: 1 }], expectedReturn: 0 },
          { id: 'h3', args: [{ k: 0, m: 0 }], expectedReturn: 0 },
          { id: 'h4', args: [{ a: 100, b: 200, c: 300 }], expectedReturn: 600 },
        ]
      ),
      'Model solution:\ndef sum_values(d):\n    total = 0\n    for v in d.values():\n        total += v\n    return total'
    ),

    cr(
      'w10-q5',
      'Implement `freq_count(items)` returning a dictionary mapping each item to how many times it appears in the list.',
      `def freq_count(items):
    counts = {}
    for item in items:
        counts[item] = counts.get(item, 0) + 1
    return counts`,
      'function',
      funcCases(
        'freq_count',
        [
          { id: 's1', description: 'Letters', args: [['a', 'b', 'a', 'c']], expectedReturn: { a: 2, b: 1, c: 1 } },
          { id: 's2', description: 'Empty', args: [[]], expectedReturn: {} },
        ],
        [
          { id: 'h1', args: [['x']], expectedReturn: { x: 1 } },
          { id: 'h2', args: [['a', 'a', 'a']], expectedReturn: { a: 3 } },
          { id: 'h3', args: [['dog', 'cat', 'dog', 'dog']], expectedReturn: { dog: 3, cat: 1 } },
          { id: 'h4', args: [['yes', 'no', 'yes']], expectedReturn: { yes: 2, no: 1 } },
        ]
      ),
      'Model solution:\ndef freq_count(items):\n    counts = {}\n    for item in items:\n        counts[item] = counts.get(item, 0) + 1\n    return counts'
    ),

    cr(
      'w10-q6',
      'Implement `most_common(items)` returning the item that appears most often. On a tie, return the **first** to reach that count.',
      `def most_common(items):
    counts = freq_count(items)  # or inline the loop
    best_item = items[0]
    best_count = 0
    for item, count in counts.items():
        if count > best_count:
            best_count = count
            best_item = item
    return best_item

# Alternative without helper:
def most_common(items):
    counts = {}
    for item in items:
        counts[item] = counts.get(item, 0) + 1
    best_item = items[0]
    best_count = 0
    for item in items:
        if counts[item] > best_count:
            best_count = counts[item]
            best_item = item
    return best_item`,
      'function',
      funcCases(
        'most_common',
        [
          { id: 's1', description: 'Clear winner', args: [['a', 'b', 'a', 'c', 'a']], expectedReturn: 'a' },
          { id: 's2', description: 'Tie — first wins', args: [['x', 'y', 'x', 'y']], expectedReturn: 'x' },
        ],
        [
          { id: 'h1', args: [['solo']], expectedReturn: 'solo' },
          { id: 'h2', args: [[1, 2, 3]], expectedReturn: 1 },
          { id: 'h3', args: [['a', 'a', 'b', 'b', 'b']], expectedReturn: 'b' },
          { id: 'h4', args: [[5, 5, 5, 1, 1]], expectedReturn: 5 },
        ]
      ),
      'Model solution:\ndef most_common(items):\n    counts = freq_count(items)  # or inline the loop\n    best_item = items[0]\n    best_count = 0\n    for item, count in counts.items():\n        if count > best_count:\n            best_count = count\n            best_item = item\n    return best_item\n\n# Alternative without helper:\ndef most_common(items):\n    counts = {}\n    for item in items:\n        counts[item] = counts.get(item, 0) + 1\n    best_item = items[0]\n    best_count = 0\n    for item in items:\n        if counts[item] > best_count:\n            best_count = counts[item]\n            best_item = item\n    return best_item'
    ),

    cr(
      'w10-q7',
      'Implement `invert_dict(d)` returning a new dictionary that swaps keys and values, so each value maps back to its key. Assume the values are **unique strings**. Example: `{"alice": "admin"}` → `{"admin": "alice"}`.',
      `def invert_dict(d):
    result = {}
    for key, val in d.items():
        result[val] = key
    return result`,
      'function',
      funcCases(
        'invert_dict',
        [
          { id: 's1', description: 'Two entries', args: [{ alice: 'admin', bob: 'editor' }], expectedReturn: { admin: 'alice', editor: 'bob' } },
          { id: 's2', description: 'Empty', args: [{}], expectedReturn: {} },
        ],
        [
          { id: 'h1', args: [{ x: 'ten' }], expectedReturn: { ten: 'x' } },
          { id: 'h2', args: [{ one: 'a', two: 'b', three: 'c' }], expectedReturn: { a: 'one', b: 'two', c: 'three' } },
          { id: 'h3', args: [{ red: 'stop' }], expectedReturn: { stop: 'red' } },
          { id: 'h4', args: [{ p: 'first', q: 'second' }], expectedReturn: { first: 'p', second: 'q' } },
        ]
      ),
      'Model solution:\ndef invert_dict(d):\n    result = {}\n    for key, val in d.items():\n        result[val] = key\n    return result\n\nWhy: Loop over `d.items()` and store each value as a key pointing back to the original key. The values must be unique (so no two map to the same new key) and strings (so the inverted dictionary has string keys).'
    ),

    cr(
      'w10-q8',
      'Implement `grid_sum(grid)` returning the sum of all numbers in a 2D list (list of lists of integers).',
      `def grid_sum(grid):
    total = 0
    for row in grid:
        for val in row:
            total += val
    return total`,
      'function',
      funcCases(
        'grid_sum',
        [
          { id: 's1', description: '2×2 grid', args: [[[1, 2], [3, 4]]], expectedReturn: 10 },
          { id: 's2', description: 'Single cell', args: [[[5]]], expectedReturn: 5 },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: 0 },
          { id: 'h2', args: [[[0, 0], [0, 0]]], expectedReturn: 0 },
          { id: 'h3', args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expectedReturn: 45 },
          { id: 'h4', args: [[[-1, 1], [2, -2]]], expectedReturn: 0 },
        ]
      ),
      'Model solution:\ndef grid_sum(grid):\n    total = 0\n    for row in grid:\n        for val in row:\n            total += val\n    return total'
    ),

    cr(
      'w10-q9',
      'Implement `count_in_grid(grid, target)` returning how many times `target` appears in the 2D list.',
      `def count_in_grid(grid, target):
    count = 0
    for row in grid:
        for cell in row:
            if cell == target:
                count += 1
    return count`,
      'function',
      funcCases(
        'count_in_grid',
        [
          { id: 's1', description: 'Count 1s', args: [[[1, 0, 1], [0, 1, 0]], 1], expectedReturn: 3 },
          { id: 's2', description: 'Not found', args: [[[2, 3], [4, 5]], 9], expectedReturn: 0 },
        ],
        [
          { id: 'h1', args: [[], 0], expectedReturn: 0 },
          { id: 'h2', args: [[[5]], 5], expectedReturn: 1 },
          { id: 'h3', args: [[['a', 'b'], ['a', 'a']], 'a'], expectedReturn: 3 },
          { id: 'h4', args: [[[0, 0], [0, 0]], 0], expectedReturn: 4 },
        ]
      ),
      'Model solution:\ndef count_in_grid(grid, target):\n    count = 0\n    for row in grid:\n        for cell in row:\n            if cell == target:\n                count += 1\n    return count'
    ),

    cr(
      'w10-q10',
      'Implement `row_sums(grid)` returning a list where element `i` is the sum of row `i` in the grid.',
      `def row_sums(grid):
    result = []
    for row in grid:
        total = 0
        for val in row:
            total += val
        result.append(total)
    return result`,
      'function',
      funcCases(
        'row_sums',
        [
          { id: 's1', description: '2×2', args: [[[1, 2], [3, 4]]], expectedReturn: [3, 7] },
          { id: 's2', description: 'Single row', args: [[[10, 20, 30]]], expectedReturn: [60] },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: [] },
          { id: 'h2', args: [[[0], [0], [0]]], expectedReturn: [0, 0, 0] },
          { id: 'h3', args: [[[1, 1, 1], [2, 2, 2]]], expectedReturn: [3, 6] },
          { id: 'h4', args: [[[-1, 1], [5, -5]]], expectedReturn: [0, 0] },
        ]
      ),
      'Model solution:\ndef row_sums(grid):\n    result = []\n    for row in grid:\n        total = 0\n        for val in row:\n            total += val\n        result.append(total)\n    return result'
    ),

    cr(
      'w10-q11',
      'Implement `dict_keys_sorted(d)` returning a **list** of keys sorted alphabetically (ascending).',
      `def dict_keys_sorted(d):
    keys = []
    for k in d:
        keys.append(k)
    keys.sort()
    return keys`,
      'function',
      funcCases(
        'dict_keys_sorted',
        [
          { id: 's1', description: 'Three keys', args: [{ c: 3, a: 1, b: 2 }], expectedReturn: ['a', 'b', 'c'] },
          { id: 's2', description: 'Empty', args: [{}], expectedReturn: [] },
        ],
        [
          { id: 'h1', args: [{ z: 1 }], expectedReturn: ['z'] },
          { id: 'h2', args: [{ m: 1, a: 2, z: 3 }], expectedReturn: ['a', 'm', 'z'] },
          { id: 'h3', args: [{ aa: 1, ab: 2 }], expectedReturn: ['aa', 'ab'] },
          { id: 'h4', args: [{ x: 0, y: 0 }], expectedReturn: ['x', 'y'] },
        ]
      ),
      'Model solution:\ndef dict_keys_sorted(d):\n    keys = []\n    for k in d:\n        keys.append(k)\n    keys.sort()\n    return keys'
    ),

    cr(
      'w10-q12',
      'Implement `merge_counts(d1, d2)` returning a new dict combining both. If a key is in both, **add** the counts.',
      `def merge_counts(d1, d2):
    result = {}
    for k, v in d1.items():
        result[k] = v
    for k, v in d2.items():
        result[k] = result.get(k, 0) + v
    return result`,
      'function',
      funcCases(
        'merge_counts',
        [
          { id: 's1', description: 'Overlap', args: [{ a: 2, b: 1 }, { a: 3, c: 1 }], expectedReturn: { a: 5, b: 1, c: 1 } },
          { id: 's2', description: 'Disjoint', args: [{ x: 1 }, { y: 2 }], expectedReturn: { x: 1, y: 2 } },
        ],
        [
          { id: 'h1', args: [{}, {}], expectedReturn: {} },
          { id: 'h2', args: [{ a: 1 }, {}], expectedReturn: { a: 1 } },
          { id: 'h3', args: [{ k: 0 }, { k: 0 }], expectedReturn: { k: 0 } },
          { id: 'h4', args: [{ a: 1, b: 2 }, { b: 3, c: 4 }], expectedReturn: { a: 1, b: 5, c: 4 } },
        ]
      ),
      'Model solution:\ndef merge_counts(d1, d2):\n    result = {}\n    for k, v in d1.items():\n        result[k] = v\n    for k, v in d2.items():\n        result[k] = result.get(k, 0) + v\n    return result'
    ),

    cr(
      'w10-q13',
      'Implement `get_cell(grid, row, col)` returning `grid[row][col]`. Assume valid indices.',
      `def get_cell(grid, row, col):
    return grid[row][col]`,
      'function',
      funcCases(
        'get_cell',
        [
          { id: 's1', description: 'Center', args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1, 1], expectedReturn: 5 },
          { id: 's2', description: 'Top-left', args: [[[10, 20], [30, 40]], 0, 0], expectedReturn: 10 },
        ],
        [
          { id: 'h1', args: [[[99]], 0, 0], expectedReturn: 99 },
          { id: 'h2', args: [[['a', 'b'], ['c', 'd']], 1, 0], expectedReturn: 'c' },
          { id: 'h3', args: [[[0, 1], [2, 3]], 0, 1], expectedReturn: 1 },
          { id: 'h4', args: [[[1, 2, 3], [4, 5, 6]], 1, 2], expectedReturn: 6 },
        ]
      ),
      'Model solution:\ndef get_cell(grid, row, col):\n    return grid[row][col]'
    ),

    cr(
      'w10-q14',
      'Implement `word_lengths_dict(words)` returning a dict mapping each word to its length.',
      `def word_lengths_dict(words):
    d = {}
    for w in words:
        d[w] = len(w)
    return d`,
      'function',
      funcCases(
        'word_lengths_dict',
        [
          { id: 's1', description: 'Three words', args: [['cat', 'dog', 'bird']], expectedReturn: { cat: 3, dog: 3, bird: 4 } },
          { id: 's2', description: 'Empty', args: [[]], expectedReturn: {} },
        ],
        [
          { id: 'h1', args: [['a']], expectedReturn: { a: 1 } },
          { id: 'h2', args: [['', 'hi']], expectedReturn: { '': 0, hi: 2 } },
          { id: 'h3', args: [['Python']], expectedReturn: { Python: 6 } },
          { id: 'h4', args: [['ab', 'cd']], expectedReturn: { ab: 2, cd: 2 } },
        ]
      ),
      'Model solution:\ndef word_lengths_dict(words):\n    d = {}\n    for w in words:\n        d[w] = len(w)\n    return d'
    ),

    cr(
      'w10-q15',
      'Implement `flatten(grid)` returning a **single list** of all elements, row by row (top row first, left to right).',
      `def flatten(grid):
    result = []
    for row in grid:
        for val in row:
            result.append(val)
    return result`,
      'function',
      funcCases(
        'flatten',
        [
          { id: 's1', description: '2×2', args: [[[1, 2], [3, 4]]], expectedReturn: [1, 2, 3, 4] },
          { id: 's2', description: 'Single row', args: [[[5, 6, 7]]], expectedReturn: [5, 6, 7] },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: [] },
          { id: 'h2', args: [[[1]]], expectedReturn: [1] },
          { id: 'h3', args: [[['a'], ['b'], ['c']]], expectedReturn: ['a', 'b', 'c'] },
          { id: 'h4', args: [[[0, 0], [0, 0]]], expectedReturn: [0, 0, 0, 0] },
        ]
      ),
      'Model solution:\ndef flatten(grid):\n    result = []\n    for row in grid:\n        for val in row:\n            result.append(val)\n    return result'
    ),

    tf(
      'w10-q16',
      'The expression `"key" in my_dict` checks whether `"key"` is a **value** in the dictionary.',
      'false',
      'The in operator on a dict checks keys, not values. Use my_dict.values() or a loop to search values.'
    ),

    fib(
      'w10-q17',
      'What method returns key-value pairs for iterating a dictionary?\n    for key, val in d.______():\n        print(key, val)',
      'items',
      'd.items() yields (key, value) tuples suitable for unpacking in a for loop.'
    ),

    cr(
      'w10-q18',
      'Implement `col_sums(grid)` returning a list where element `j` is the sum of column `j`. Assume all rows have the same length (including empty grid → `[]`).',
      `def col_sums(grid):
    if len(grid) == 0:
        return []
    num_cols = len(grid[0])
    result = []
    for j in range(num_cols):
        total = 0
        for row in grid:
            total += row[j]
        result.append(total)
    return result`,
      'function',
      funcCases(
        'col_sums',
        [
          { id: 's1', description: '2×2', args: [[[1, 2], [3, 4]]], expectedReturn: [4, 6] },
          { id: 's2', description: 'Empty grid', args: [[]], expectedReturn: [] },
        ],
        [
          { id: 'h1', args: [[[10, 20, 30]]], expectedReturn: [10, 20, 30] },
          { id: 'h2', args: [[[1], [2], [3]]], expectedReturn: [6] },
          { id: 'h3', args: [[[0, 0], [0, 0]]], expectedReturn: [0, 0] },
          { id: 'h4', args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expectedReturn: [12, 15, 18] },
        ]
      ),
      'Model solution:\ndef col_sums(grid):\n    if len(grid) == 0:\n        return []\n    num_cols = len(grid[0])\n    result = []\n    for j in range(num_cols):\n        total = 0\n        for row in grid:\n            total += row[j]\n        result.append(total)\n    return result'
    ),
  ],
};

export default week10;
