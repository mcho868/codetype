import type { Module } from './types';
import { cr, mc, tf, funcCases, ms } from './authoring';

const test5: Module = {
  id: 'test-5',
  slug: 'test-5',
  title: 'Module 5 Test — Recursion',
  description:
    'Transfer-level practice: counting nested structures, Euclidean GCD, and recursive palindrome checks.',
  icon: '📝',
  color: 'from-indigo-500 to-blue-400',
  locked: false,
  isMidterm: true,
  lessons: [],
  questions: [
    cr(
      't5-q1',
      'Implement `count_nested(item)` recursively counting **how many integers** appear in a possibly nested list structure.\n\nScalars that are not lists count as 0 (only ints inside lists count). An int directly passed (not in a list) counts as 1.\n\nExamples: `count_nested(5)` → `1`; `count_nested([1, [2, 3], 4])` → `4`.',
      `def count_nested(item):
    pass
`,
      'function',
      funcCases(
        'count_nested',
        [
          { id: 's1', description: 'Nested list', args: [[1, [2, 3], 4]], expectedReturn: 4 },
          { id: 's2', description: 'Bare int', args: [5], expectedReturn: 1 },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: 0 },
          { id: 'h2', args: [[[], [1], [[2]]]], expectedReturn: 2 },
          { id: 'h3', args: [[1, 2, 3]], expectedReturn: 3 },
          { id: 'h4', args: ['hello'], expectedReturn: 0 },
        ]
      ),
      ms(
        `def count_nested(item):
    if isinstance(item, int):
        return 1
    if isinstance(item, list):
        return sum(count_nested(x) for x in item)
    return 0`,
        'Base case: an int contributes 1. Recursive case: a list sums counts from each child. Non-int scalars contribute 0 — the structure is list-centric.'
      )
    ),

    cr(
      't5-q2',
      'Implement `gcd(a, b)` recursively using the Euclidean algorithm. Assume `a` and `b` are non-negative and not both zero.\n\n`gcd(a, 0) = a`; otherwise `gcd(a, b) = gcd(b, a % b)`.',
      `def gcd(a, b):
    pass
`,
      'function',
      funcCases(
        'gcd',
        [
          { id: 's1', description: 'gcd(48, 18)', args: [48, 18], expectedReturn: 6 },
          { id: 's2', description: 'Coprime', args: [7, 13], expectedReturn: 1 },
        ],
        [
          { id: 'h1', args: [0, 5], expectedReturn: 5 },
          { id: 'h2', args: [12, 0], expectedReturn: 12 },
          { id: 'h3', args: [100, 25], expectedReturn: 25 },
          { id: 'h4', args: [81, 27], expectedReturn: 27 },
        ]
      ),
      ms(
        `def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)`,
        'Each recursive step reduces the problem size (b shrinks). The base case b == 0 leaves the last non-zero remainder as the greatest common divisor.'
      )
    ),

    cr(
      't5-q3',
      'Implement `is_palindrome_recursive(s)` returning `True` when `s` reads the same forward and backward. Compare outer characters, then recurse on the inner slice.\n\nAssume `s` contains only lowercase letters (empty string → `True`).',
      `def is_palindrome_recursive(s):
    pass
`,
      'function',
      funcCases(
        'is_palindrome_recursive',
        [
          { id: 's1', description: 'racecar', args: ['racecar'], expectedReturn: true },
          { id: 's2', description: 'hello', args: ['hello'], expectedReturn: false },
        ],
        [
          { id: 'h1', args: [''], expectedReturn: true },
          { id: 'h2', args: ['a'], expectedReturn: true },
          { id: 'h3', args: ['abba'], expectedReturn: true },
          { id: 'h4', args: ['abc'], expectedReturn: false },
        ]
      ),
      ms(
        `def is_palindrome_recursive(s):
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_palindrome_recursive(s[1:-1])`,
        'Check endpoints first; mismatch short-circuits to False. Shrinking by one from each end guarantees progress toward the base case len <= 1.'
      )
    ),

    cr(
      't5-q4',
      'Implement `deep_max(nested)` returning the largest integer in a nested list (arbitrary depth). Assume at least one int exists.\n\nExample: `deep_max([1, [5, [3]], 2])` → `5`.',
      `def deep_max(nested):
    pass
`,
      'function',
      funcCases(
        'deep_max',
        [
          { id: 's1', description: 'Three levels', args: [[1, [5, [3]], 2]], expectedReturn: 5 },
        ],
        [
          { id: 'h1', args: [[10]], expectedReturn: 10 },
          { id: 'h2', args: [[-1, [-5, [-2]]]], expectedReturn: -1 },
          { id: 'h3', args: [[[9]]], expectedReturn: 9 },
        ]
      ),
      ms(
        `def deep_max(nested):
    best = None
    for item in nested:
        if isinstance(item, int):
            if best is None or item > best:
                best = item
        else:
            sub = deep_max(item)
            if best is None or sub > best:
                best = sub
    return best`,
        'Walk each element: compare ints directly, recurse into sublists. Tracking best across branches is the recursive analogue of a loop-based max scan.'
      )
    ),

    mc(
      't5-q5',
      'Which recursive function is most likely to hit Python\'s recursion limit on large `n`?',
      [
        { id: 'a', text: 'def f(n): return 0 if n == 0 else f(n - 1)' },
        { id: 'b', text: 'def f(n): return 1 if n <= 1 else f(n // 2)' },
        { id: 'c', text: 'def f(n): return n if n <= 1 else f(n-1) + f(n-2)' },
        { id: 'd', text: 'def f(n): return n if n <= 1 else f(n - 1) + 1' },
      ],
      'c',
      ms(
        'Fibonacci-style double recursion — exponential call tree.',
        'f(n-1) + f(n-2) branches twice per call, creating exponential work and stack depth O(n) on one branch. Halving (b) is logarithmic depth; single n-1 chains (a,d) are linear depth.'
      )
    ),

    tf(
      't5-q6',
      'Every recursive function must include at least one base case that stops further recursive calls.',
      'true',
      ms(
        'True — without a base case, recursion never terminates.',
        'The base case handles the smallest subproblem directly. Missing it causes infinite recursion until the stack overflows.'
      )
    ),
  ],
};

export default test5;
