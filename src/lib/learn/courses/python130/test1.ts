import type { Module } from './types';
import { cr, mc, tf, funcCases, ms } from './authoring';

const test1: Module = {
  id: 'test-1',
  slug: 'test-1',
  title: 'Module 1 Test — Algorithm Complexity',
  description:
    'Transfer-level practice: classify code snippets by Big-O and replace a quadratic scan with a linear-time set approach.',
  icon: '📝',
  color: 'from-purple-500 to-violet-400',
  locked: false,
  isMidterm: true,
  lessons: [],
  questions: [
    mc(
      't1-q1',
      'What is the time complexity of this function in terms of `n = len(data)`?\n\n```python\ndef f(data):\n    total = 0\n    for i in range(len(data)):\n        for j in range(i + 1, len(data)):\n            if data[i] == data[j]:\n                total += 1\n    return total\n```',
      [
        { id: 'a', text: 'O(1)' },
        { id: 'b', text: 'O(n)' },
        { id: 'c', text: 'O(n log n)' },
        { id: 'd', text: 'O(n²)' },
      ],
      'd',
      ms(
        'O(n²) — nested loops over pairs.',
        'The outer loop runs n times; the inner loop runs up to n times per outer iteration (all pairs with j > i). That is Θ(n²) comparisons in the worst case — the same growth class as a full nested `for j in range(n)` loop.'
      )
    ),

    cr(
      't1-q2',
      'A login system wants to flag the **first username that appears twice** in a sign-up list. Write `first_repeat_fast(lst)` that scans left-to-right and returns the **first value that has already been seen**, or `None` if every value is unique.\n\nThe obvious approach — comparing every pair of elements — is **O(n²)**. Do it in a single **O(n)** pass instead by remembering values you have already seen in a `set` (membership checks are O(1) on average).\n\nExample: `[3, 1, 4, 1, 5]` → `1` (the second `1` is the first repeat).',
      `def first_repeat_fast(lst):
    # Use a set to track values seen so far
    pass
`,
      'function',
      funcCases(
        'first_repeat_fast',
        [
          { id: 's1', description: 'First repeat is 1', args: [[3, 1, 4, 1, 5]], expectedReturn: 1 },
          { id: 's2', description: 'No repeats', args: [[1, 2, 3]], expectedReturn: null },
        ],
        [
          { id: 'h1', args: [[5, 5]], expectedReturn: 5 },
          { id: 'h2', args: [[2, 3, 2, 3]], expectedReturn: 2 },
          { id: 'h3', args: [[]], expectedReturn: null },
          { id: 'h4', args: [['a', 'b', 'c', 'a']], expectedReturn: 'a' },
        ]
      ),
      ms(
        `def first_repeat_fast(lst):
    seen = set()
    for x in lst:
        if x in seen:
            return x
        seen.add(x)
    return None`,
        'Membership in a set is O(1) average, so one pass is O(n) overall — versus O(n²) for checking all pairs. Return as soon as a value is seen again to get the earliest repeat.'
      )
    ),

    cr(
      't1-q3',
      'A program repeatedly **halves** a value until nothing is left — like repeatedly splitting a search range in two. Write `count_halving_steps(n)` that counts how many times you can integer-halve `n` (using `n = n // 2`) before it reaches 0. Assume n ≥ 0.\n\nExample: `8 → 4 → 2 → 1 → 0` takes **4** steps. This step count grows like **O(log n)** — far slower than counting every element.',
      `def count_halving_steps(n):
    pass
`,
      'function',
      funcCases(
        'count_halving_steps',
        [
          { id: 's1', description: '8 halves in 4 steps', args: [8], expectedReturn: 4 },
          { id: 's2', description: '0 → 0 steps', args: [0], expectedReturn: 0 },
        ],
        [
          { id: 'h1', args: [1], expectedReturn: 1 },
          { id: 'h2', args: [7], expectedReturn: 3 },
          { id: 'h3', args: [16], expectedReturn: 5 },
          { id: 'h4', args: [1000], expectedReturn: 10 },
          { id: 'h5', args: [1024], expectedReturn: 11 },
        ]
      ),
      ms(
        `def count_halving_steps(n):
    steps = 0
    while n > 0:
        n = n // 2
        steps += 1
    return steps`,
        'Each step throws away half of what remains, so the number of steps is about log₂(n) — this is why halving algorithms like binary search are O(log n). Contrast with a single loop over n elements (O(n)) or nested loops (O(n²)): halving reaches 0 in only ~10 steps for n = 1000.'
      )
    ),

    mc(
      't1-q4',
      'A sorted list of 1,000,000 elements is searched with **binary search**. How does the maximum number of comparisons grow when the list doubles to 2,000,000 elements?',
      [
        { id: 'a', text: 'It doubles — O(n)' },
        { id: 'b', text: 'It increases by about 1 — O(log n)' },
        { id: 'c', text: 'It stays constant — O(1)' },
        { id: 'd', text: 'It squares — O(n²)' },
      ],
      'b',
      ms(
        'O(log n) — one extra comparison when n doubles.',
        'Binary search halves the search space each step, so the comparison count grows logarithmically. Doubling n adds at most one more halving step — the hallmark of O(log n).'
      )
    ),

    cr(
      't1-q4b',
      'A checkout system wants to know if **any two different items** add up to a target price. Write `pair_sum_exists(nums, target)` that returns `True` if two values at **distinct positions** sum to `target`, otherwise `False`.\n\nThe obvious approach checks every pair — **O(n²)**. Do it in a single **O(n)** pass instead: for each value `x`, you need a partner equal to `target - x` that you have **already seen**, so keep seen values in a `set`.\n\nExample: `pair_sum_exists([2, 3, 1], 5)` → `True` (2 + 3).',
      `def pair_sum_exists(nums, target):
    seen = set()
    # For each value, has its partner (target - value) already been seen?
    pass
`,
      'function',
      funcCases(
        'pair_sum_exists',
        [
          { id: 's1', description: '2 + 3 = 5', args: [[2, 3, 1], 5], expectedReturn: true },
          { id: 's2', description: 'No pair sums to 10', args: [[1, 2, 3], 10], expectedReturn: false },
        ],
        [
          { id: 'h1', args: [[0, 0, 1], 0], expectedReturn: true },
          { id: 'h2', args: [[5], 5], expectedReturn: false },
          { id: 'h3', args: [[-1, 5, 6], 5], expectedReturn: true },
          { id: 'h4', args: [[1, 1, 1], 2], expectedReturn: true },
          { id: 'h5', args: [[], 0], expectedReturn: false },
        ]
      ),
      ms(
        `def pair_sum_exists(nums, target):
    seen = set()
    for x in nums:
        need = target - x
        if need in seen:
            return True
        seen.add(x)
    return False`,
        'For each value x, check whether its partner (target - x) was already seen — that guarantees the two values sit at distinct positions. A set makes each lookup O(1), so the whole scan is O(n), versus O(n²) for checking all pairs. A single element (e.g. [5] with target 5) returns False because there is no distinct partner.'
      )
    ),

    tf(
      't1-q6',
      'An algorithm that allocates a new list of length `n` on every iteration of a loop that runs `n` times uses O(n) extra space overall.',
      'false',
      ms(
        'False — overall space is O(n²) if a length-n list is allocated each of n iterations.',
        'Space complexity counts peak memory. Creating n fresh lists of size n over n iterations can retain O(n²) total storage if earlier lists are still referenced. A single auxiliary list reused in the loop would be O(n).'
      )
    ),
  ],
};

export default test1;
