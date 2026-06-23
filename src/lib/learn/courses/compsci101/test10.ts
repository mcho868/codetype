import type { Module } from '../python101/types';
import { cr, mc, funcCases } from './authoring';

const test10: Module = {
  id: 'test-10',
  slug: 'test-10',
  title: 'Week 10 Test — Dictionaries & Nested Loops',
  description:
    'Extra practice: grouping into a dict of lists, finding the max-value key, merging dictionaries, and 2D grid work (diagonal sum, transpose).',
  icon: '📝',
  color: 'from-violet-500 to-purple-400',
  locked: false,
  section: 'Week 10',
  lessons: [],
  questions: [
    cr(
      't10-q1',
      'Implement `group_by_first_letter(words)` that takes a list of lowercase words and returns a dictionary mapping each **first letter** to the **list of words** starting with that letter (in their original order). Return `{}` for an empty list.\n\nExample: `["apple", "ant", "bee"]` → `{"a": ["apple", "ant"], "b": ["bee"]}`.',
      `def group_by_first_letter(words):
    pass
`,
      'function',
      funcCases(
        'group_by_first_letter',
        [
          {
            id: 's1',
            description: 'Group five words',
            args: [['apple', 'ant', 'bee', 'cat', 'cow']],
            expectedReturn: { a: ['apple', 'ant'], b: ['bee'], c: ['cat', 'cow'] },
          },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: {} },
          { id: 'h2', args: [['solo']], expectedReturn: { s: ['solo'] } },
          { id: 'h3', args: [['a', 'b', 'c']], expectedReturn: { a: ['a'], b: ['b'], c: ['c'] } },
          { id: 'h4', args: [['dog', 'deer', 'duck']], expectedReturn: { d: ['dog', 'deer', 'duck'] } },
        ]
      ),
      `Model solution:
def group_by_first_letter(words):
    result = {}
    for w in words:
        first = w[0]
        if first not in result:
            result[first] = []
        result[first].append(w)
    return result

**Why:** Build a dictionary of **lists**: when a first letter is new, start an empty list; then append the word. This "dict of lists" grouping pattern combines dict CRUD with list building — a very common real-world shape (grouping records by a field).`
    ),

    cr(
      't10-q2',
      'Implement `max_key(d)` returning the **key** whose value is the largest. `d` is a non-empty dictionary mapping strings to numbers, and you may assume the largest value is unique (no ties).\n\nExample: `{"a": 3, "b": 9, "c": 5}` → `"b"`.',
      `def max_key(d):
    pass
`,
      'function',
      funcCases(
        'max_key',
        [
          {
            id: 's1',
            description: 'b has the largest value',
            args: [{ a: 3, b: 9, c: 5 }],
            expectedReturn: 'b',
          },
        ],
        [
          { id: 'h1', args: [{ only: 1 }], expectedReturn: 'only' },
          { id: 'h2', args: [{ x: -5, y: -1, z: -9 }], expectedReturn: 'y' },
          { id: 'h3', args: [{ low: 0, high: 100 }], expectedReturn: 'high' },
          { id: 'h4', args: [{ a: 10, b: 20, c: 15, d: 5 }], expectedReturn: 'b' },
        ]
      ),
      `Model solution:
def max_key(d):
    best = None
    for key, val in d.items():
        if best is None or val > d[best]:
            best = key
    return best

**Why:** Walk every (key, value) pair, remembering the key with the biggest value so far. Starting \`best = None\` handles the first item cleanly. Comparing \`val > d[best]\` looks up the current best's value. This is the dictionary version of finding a maximum.`
    ),

    cr(
      't10-q3',
      'Implement `merge_sum(a, b)` returning a new dictionary that combines two dictionaries of string→number. For keys in **both**, add the two values together; keys in only one are copied as-is. Neither input is modified.\n\nExample: `merge_sum({"x": 1, "y": 2}, {"y": 3, "z": 4})` → `{"x": 1, "y": 5, "z": 4}`.',
      `def merge_sum(a, b):
    pass
`,
      'function',
      funcCases(
        'merge_sum',
        [
          {
            id: 's1',
            description: 'Overlapping key y',
            args: [{ x: 1, y: 2 }, { y: 3, z: 4 }],
            expectedReturn: { x: 1, y: 5, z: 4 },
          },
        ],
        [
          { id: 'h1', args: [{}, {}], expectedReturn: {} },
          { id: 'h2', args: [{}, { a: 5 }], expectedReturn: { a: 5 } },
          { id: 'h3', args: [{ a: 5 }, {}], expectedReturn: { a: 5 } },
          { id: 'h4', args: [{ a: 1, b: 2 }, { a: 10, b: 20 }], expectedReturn: { a: 11, b: 22 } },
          { id: 'h5', args: [{ p: 1 }, { q: 2 }], expectedReturn: { p: 1, q: 2 } },
        ]
      ),
      `Model solution:
def merge_sum(a, b):
    result = dict(a)
    for key, val in b.items():
        result[key] = result.get(key, 0) + val
    return result

**Why:** Start with a **copy** of \`a\` (\`dict(a)\`) so the original is untouched. For each entry of \`b\`, \`result.get(key, 0)\` returns the existing total or 0, then adds \`b\`'s value — combining shared keys and inserting new ones. This is the standard "merge counters" pattern.`
    ),

    cr(
      't10-q4',
      'Implement `diagonal_sum(grid)` returning the sum of the **main diagonal** of a **square** grid (a list of *n* rows, each of length *n*). The main diagonal is the cells `grid[0][0]`, `grid[1][1]`, …, `grid[n-1][n-1]`. Return `0` for an empty grid.\n\nExample: `[[1, 2], [3, 4]]` → `1 + 4 = 5`.',
      `def diagonal_sum(grid):
    pass
`,
      'function',
      funcCases(
        'diagonal_sum',
        [
          {
            id: 's1',
            description: '2×2 main diagonal',
            args: [[[1, 2], [3, 4]]],
            expectedReturn: 5,
          },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: 0 },
          { id: 'h2', args: [[[5]]], expectedReturn: 5 },
          { id: 'h3', args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expectedReturn: 15 },
          { id: 'h4', args: [[[0, 9], [9, 0]]], expectedReturn: 0 },
          { id: 'h5', args: [[[2, 0, 0], [0, 3, 0], [0, 0, 4]]], expectedReturn: 9 },
        ]
      ),
      `Model solution:
def diagonal_sum(grid):
    total = 0
    for i in range(len(grid)):
        total += grid[i][i]
    return total

**Why:** The diagonal cells share the **same row and column index**, so \`grid[i][i]\` for \`i\` in \`range(len(grid))\` walks them. Only one loop is needed (not nested) because you touch exactly one cell per row. An empty grid has \`range(0)\` → 0.`
    ),

    cr(
      't10-q5',
      'Implement `transpose(grid)` returning a **new** 2D list with rows and columns swapped: the value at `grid[r][c]` ends up at `result[c][r]`. Assume a rectangular grid; return `[]` for an empty grid.\n\nExample: `[[1, 2, 3], [4, 5, 6]]` → `[[1, 4], [2, 5], [3, 6]]`.',
      `def transpose(grid):
    pass
`,
      'function',
      funcCases(
        'transpose',
        [
          {
            id: 's1',
            description: '2×3 → 3×2',
            args: [[[1, 2, 3], [4, 5, 6]]],
            expectedReturn: [[1, 4], [2, 5], [3, 6]],
          },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: [] },
          { id: 'h2', args: [[[1, 2], [3, 4]]], expectedReturn: [[1, 3], [2, 4]] },
          { id: 'h3', args: [[[1], [2], [3]]], expectedReturn: [[1, 2, 3]] },
          { id: 'h4', args: [[[7, 8, 9]]], expectedReturn: [[7], [8], [9]] },
        ]
      ),
      `Model solution:
def transpose(grid):
    if len(grid) == 0:
        return []
    result = []
    for c in range(len(grid[0])):
        new_row = []
        for r in range(len(grid)):
            new_row.append(grid[r][c])
        result.append(new_row)
    return result

**Why:** The transposed grid has one row per **column** of the original. The outer loop walks columns \`c\`, the inner loop gathers \`grid[r][c]\` down each row \`r\` — building a new row. This nested-loop index-swap is the core of matrix transposition. Empty grid returns \`[]\`.`
    ),

    mc(
      't10-q6',
      'Given `d = {"a": 1, "b": 2}`, what does `list(d.items())` produce?',
      [
        { id: 'a', text: '[("a", 1), ("b", 2)]' },
        { id: 'b', text: '["a", "b"]' },
        { id: 'c', text: '[1, 2]' },
        { id: 'd', text: '[("a", "b"), (1, 2)]' },
      ],
      'a',
      `\`.items()\` yields **(key, value)** pairs. Wrapping in \`list()\` materializes them as tuples (order follows insertion in Python 3.7+).

- \`.keys()\` → \`["a", "b"]\` (option b)
- \`.values()\` → \`[1, 2]\` (option c)

Use \`.items()\` when you need both parts in a loop: \`for key, val in d.items(): ...\`.`
    ),
  ],
};

export default test10;
