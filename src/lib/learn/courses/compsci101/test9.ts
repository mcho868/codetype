import type { Module } from '../python101/types';
import { cr, mc, tf, fib, funcCases } from './authoring';

const test9: Module = {
  id: 'test-9',
  slug: 'test-9',
  title: 'Week 9 Test — Tuples & Files',
  description:
    'Extra practice: swapping, min/max tuples, list-of-tuples aggregation, sorting pairs, line counting, and tuple immutability.',
  icon: '📝',
  color: 'from-amber-500 to-orange-400',
  locked: false,
  section: 'Week 9',
  lessons: [],
  questions: [
    cr(
      't9-q1',
      'Implement `swap(a, b)` returning a **list** `[b, a]` (use a list, not a tuple, so the grader can compare it). Works for any two values.',
      `def swap(a, b):
    pass
`,
      'function',
      funcCases(
        'swap',
        [
          {
            id: 's1',
            description: 'Swap integers',
            args: [1, 2],
            expectedReturn: [2, 1],
          },
        ],
        [
          { id: 'h1', args: [5, 5], expectedReturn: [5, 5] },
          { id: 'h2', args: [-1, 1], expectedReturn: [1, -1] },
          { id: 'h3', args: ['x', 'y'], expectedReturn: ['y', 'x'] },
          { id: 'h4', args: [0, -99], expectedReturn: [-99, 0] },
          { id: 'h5', args: ['a', 'a'], expectedReturn: ['a', 'a'] },
        ]
      ),
      `Model solution:
def swap(a, b):
    return [b, a]

**Why:** Multiple assignment \`a, b = b, a\` swaps in place but here we **return** a new ordering as a list. Returning a list (not a tuple) ensures JSON grading compares equal. This mirrors tuple unpacking \`(b, a)\` without tuple serialization issues.`
    ),

    cr(
      't9-q2',
      'Implement `min_max(nums)`, where `nums` is a non-empty **list of numbers**, returning a **list** `[minimum, maximum]` — the smallest and largest values in `nums`.',
      `def min_max(nums):
    pass
`,
      'function',
      funcCases(
        'min_max',
        [
          {
            id: 's1',
            description: 'Mixed positives',
            args: [[3, 1, 4, 1, 5]],
            expectedReturn: [1, 5],
          },
        ],
        [
          { id: 'h1', args: [[7]], expectedReturn: [7, 7] },
          { id: 'h2', args: [[-5, -1, -3]], expectedReturn: [-5, -1] },
          { id: 'h3', args: [[0, 0, 0]], expectedReturn: [0, 0] },
          { id: 'h4', args: [[100, -100]], expectedReturn: [-100, 100] },
          { id: 'h5', args: [[2, 2, 2, 2]], expectedReturn: [2, 2] },
        ]
      ),
      `Model solution:
def min_max(nums):
    smallest = nums[0]
    largest = nums[0]
    for n in nums:
        if n < smallest:
            smallest = n
        if n > largest:
            largest = n
    return [smallest, largest]

**Why:** One pass tracks both extremes — \(O(n)\) time. Using \`min()\`/\`max()\` would also work, but the loop reinforces the pattern. Returning \`[min, max]\` as a list packs two related results, like a coordinate pair.`
    ),

    cr(
      't9-q3',
      'Implement `cheapest_and_priciest(items)` where `items` is a non-empty list of `(name, price)` tuples with **distinct prices**. Return a **list** `[cheapest_name, priciest_name]` — the names of the lowest- and highest-priced items.\n\n(Return a list, not a tuple, so the result compares cleanly.)',
      `def cheapest_and_priciest(items):
    pass
`,
      'function',
      funcCases(
        'cheapest_and_priciest',
        [
          {
            id: 's1',
            description: 'Three items',
            args: [[['apple', 3], ['banana', 1], ['cherry', 5]]],
            expectedReturn: ['banana', 'cherry'],
          },
        ],
        [
          { id: 'h1', args: [[['solo', 9]]], expectedReturn: ['solo', 'solo'] },
          { id: 'h2', args: [[['x', -5], ['y', 10], ['z', 0]]], expectedReturn: ['x', 'y'] },
          { id: 'h3', args: [[['a', 100], ['b', 50]]], expectedReturn: ['b', 'a'] },
          { id: 'h4', args: [[['p', 1], ['q', 2], ['r', 3], ['s', 4]]], expectedReturn: ['p', 's'] },
        ]
      ),
      `Model solution:
def cheapest_and_priciest(items):
    cheapest = items[0]
    priciest = items[0]
    for name, price in items:
        if price < cheapest[1]:
            cheapest = (name, price)
        if price > priciest[1]:
            priciest = (name, price)
    return [cheapest[0], priciest[0]]

**Why:** Track the lowest and highest *(name, price)* tuples while looping, comparing on \`price\` (index 1). Tuple unpacking \`for name, price in items\` reads each pair. A single-item list makes both the cheapest and priciest, so it returns the same name twice. We return a **list** because a tuple would not compare equal to the expected list under grading.`
    ),

    cr(
      't9-q4',
      'Implement `sort_by_second(pairs)` returning a **new list** sorted by the **second element** of each `(first, second)` tuple. Use ascending order. Preserve relative order among ties (Python\'s sort is stable). Return `[]` for an empty input.',
      `def sort_by_second(pairs):
    pass
`,
      'function',
      funcCases(
        'sort_by_second',
        [
          {
            id: 's1',
            description: 'Sort by score',
            args: [[['Ada', 95], ['Grace', 88], ['Alan', 91]]],
            expectedReturn: [
              ['Grace', 88],
              ['Alan', 91],
              ['Ada', 95],
            ],
          },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: [] },
          { id: 'h2', args: [[['only', 1]]], expectedReturn: [['only', 1]] },
          { id: 'h3', args: [[['a', 2], ['b', 2], ['c', 1]]], expectedReturn: [['c', 1], ['a', 2], ['b', 2]] },
          { id: 'h4', args: [[['x', -1], ['y', 0]]], expectedReturn: [['x', -1], ['y', 0]] },
          { id: 'h5', args: [[['p', 10], ['q', 5], ['r', 10]]], expectedReturn: [['q', 5], ['p', 10], ['r', 10]] },
        ]
      ),
      `Model solution:
def sort_by_second(pairs):
    result = []
    for pair in pairs:
        result.append(pair)
    result.sort(key=lambda p: p[1])
    return result

**Why:** Copy first so the original is not mutated. \`sort(key=lambda p: p[1])\` sorts by index 1 of each tuple. Stable sort keeps \`['a', 2]\` before \`['b', 2]\` when scores tie. Without \`key\`, sort would compare tuples lexicographically by first element first.`
    ),

    cr(
      't9-q5',
      'Implement `save_numbers(nums)` that **writes** each integer in `nums` to the file `output.txt` (one per line, each followed by `\\n`) using **write mode** `open("output.txt", "w")`, then reads the file back and returns its full contents.\n\nThe file already has old content — opening it in `"w"` mode **overwrites** it. An empty list produces an empty file (`""`).',
      `def save_numbers(nums):
    pass
`,
      'function',
      [
        { id: 's1', description: 'Three numbers (overwrites old content)', funcName: 'save_numbers', args: [[10, 20, 30]], fileName: 'output.txt', fileContent: 'OLD DATA\nHERE\n', expectedReturn: '10\n20\n30\n' },
        { id: 'h1', hidden: true, funcName: 'save_numbers', args: [[]], fileName: 'output.txt', fileContent: 'junk\n', expectedReturn: '' },
        { id: 'h2', hidden: true, funcName: 'save_numbers', args: [[42]], fileName: 'output.txt', fileContent: '', expectedReturn: '42\n' },
        { id: 'h3', hidden: true, funcName: 'save_numbers', args: [[-1, 0, 5]], fileName: 'output.txt', fileContent: 'x\ny\n', expectedReturn: '-1\n0\n5\n' },
        { id: 'h4', hidden: true, funcName: 'save_numbers', args: [[7, 7]], fileName: 'output.txt', fileContent: 'old\n', expectedReturn: '7\n7\n' },
      ],
      `Model solution:
def save_numbers(nums):
    with open("output.txt", "w") as f:
        for n in nums:
            f.write(str(n) + "\\n")
    with open("output.txt") as f:
        return f.read()

**Why:** \`"w"\` mode truncates the file the instant it is opened, so the old content is gone before you write — the result holds only the new numbers. Each number must be converted with \`str(n)\` before writing (you cannot write an int directly). We read the file back to return what was saved.`
    ),

    tf(
      't9-q6',
      'After `t = (1, 2, 3)`, the assignment `t[0] = 99` succeeds and changes the first element.',
      'false',
      `Tuples are **immutable** — you cannot assign to an index. \`t[0] = 99\` raises \`TypeError: 'tuple' object does not support item assignment\`.

To "change" a tuple you build a **new** one: \`t = (99,) + t[1:]\`. Lists, by contrast, allow \`lst[0] = 99\`. Immutability makes tuples safe as dictionary keys and protects fixed-size records from accidental modification.`
    ),
  ],
};

export default test9;
