import type { Question } from '../../python101/types';
import { cr, mc, tf, fib, funcCases, ms } from '../authoring';

export const module5Questions: Question[] = [
  cr(
    'm5-c1',
    'Write a **recursive** `factorial(n)` where `factorial(0) == 1` and `factorial(n) == n * factorial(n - 1)`.',
    'def factorial(n):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'factorial',
      [
        { id: 's1', description: 'n = 5', args: [5], expectedReturn: 120 },
        { id: 's2', description: 'Base case', args: [0], expectedReturn: 1 },
      ],
      [
        { id: 'h1', args: [1], expectedReturn: 1 },
        { id: 'h2', args: [7], expectedReturn: 5040 },
        { id: 'h3', args: [3], expectedReturn: 6 },
      ]
    ),
    ms(
      'def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)',
      'Base case n==0; recursive case multiplies n by factorial(n-1).'
    )
  ),
  cr(
    'm5-c2',
    'Write a **recursive** `fib(n)` with `fib(0) == 0`, `fib(1) == 1`, and `fib(n) == fib(n-1) + fib(n-2)`.',
    'def fib(n):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'fib',
      [
        { id: 's1', description: 'fib(6)', args: [6], expectedReturn: 8 },
        { id: 's2', description: 'Base cases', args: [0], expectedReturn: 0 },
      ],
      [
        { id: 'h1', args: [1], expectedReturn: 1 },
        { id: 'h2', args: [10], expectedReturn: 55 },
        { id: 'h3', args: [2], expectedReturn: 1 },
      ]
    ),
    ms(
      'def fib(n):\n    if n == 0:\n        return 0\n    if n == 1:\n        return 1\n    return fib(n - 1) + fib(n - 2)',
      'Two base cases (0 and 1); recursive case sums the two previous values.'
    )
  ),
  cr(
    'm5-c3',
    'Write a **recursive** `sum_list(lst)` that returns the sum of all elements. An empty list sums to `0`.',
    'def sum_list(lst):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'sum_list',
      [
        { id: 's1', description: 'Mixed values', args: [[1, 2, 3, 4]], expectedReturn: 10 },
        { id: 's2', description: 'Empty list', args: [[]], expectedReturn: 0 },
      ],
      [
        { id: 'h1', args: [[10]], expectedReturn: 10 },
        { id: 'h2', args: [[-1, 1, 5]], expectedReturn: 5 },
        { id: 'h3', args: [[0, 0, 0]], expectedReturn: 0 },
      ]
    ),
    ms(
      'def sum_list(lst):\n    if not lst:\n        return 0\n    return lst[0] + sum_list(lst[1:])',
      'Peel off the first element and recurse on the rest.'
    )
  ),
  cr(
    'm5-c4',
    'Write a **recursive** `power(base, exp)` for `exp >= 0` where `power(base, 0) == 1`. Do not use `**` or `math.pow`.',
    'def power(base, exp):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'power',
      [
        { id: 's1', description: '2^10', args: [2, 10], expectedReturn: 1024 },
        { id: 's2', description: '3^4', args: [3, 4], expectedReturn: 81 },
      ],
      [
        { id: 'h1', args: [5, 0], expectedReturn: 1 },
        { id: 'h2', args: [7, 1], expectedReturn: 7 },
        { id: 'h3', args: [2, 5], expectedReturn: 32 },
      ]
    ),
    ms(
      'def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)',
      'Base case exp==0; otherwise multiply base by power(base, exp-1).'
    )
  ),
  cr(
    'm5-c5',
    'Write a **recursive** `reverse_string(s)` that returns the reversed string.',
    'def reverse_string(s):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'reverse_string',
      [
        { id: 's1', description: 'hello', args: ['hello'], expectedReturn: 'olleh' },
        { id: 's2', description: 'Empty', args: [''], expectedReturn: '' },
      ],
      [
        { id: 'h1', args: ['a'], expectedReturn: 'a' },
        { id: 'h2', args: ['Python'], expectedReturn: 'nohtyP' },
        { id: 'h3', args: ['ab'], expectedReturn: 'ba' },
      ]
    ),
    ms(
      'def reverse_string(s):\n    if len(s) <= 1:\n        return s\n    return reverse_string(s[1:]) + s[0]',
      'Recurse on s[1:], then append the first character at the end.'
    )
  ),
  cr(
    'm5-c6',
    'Write a **recursive** `count_down(n)` that returns `[n, n-1, ..., 1]` for `n >= 1`.',
    'def count_down(n):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'count_down',
      [
        { id: 's1', description: 'n = 4', args: [4], expectedReturn: [4, 3, 2, 1] },
        { id: 's2', description: 'n = 1', args: [1], expectedReturn: [1] },
      ],
      [
        { id: 'h1', args: [3], expectedReturn: [3, 2, 1] },
        { id: 'h2', args: [5], expectedReturn: [5, 4, 3, 2, 1] },
      ]
    ),
    ms(
      'def count_down(n):\n    if n == 1:\n        return [1]\n    return [n] + count_down(n - 1)',
      'Base case returns [1]; prepend n to the recursive result.'
    )
  ),
  mc(
    'q5-1',
    'What are the two required parts of every recursive function?',
    [
      { id: 'a', text: 'A loop and a return statement' },
      { id: 'b', text: 'A base case and a recursive case' },
      { id: 'c', text: 'An input and an output' },
      { id: 'd', text: 'A condition and an assignment' },
    ],
    'b',
    'Every recursive function needs a base case (stops recursion) and a recursive case (calls itself).'
  ),
  tf(
    'q5-2',
    'A recursive function without a base case will run forever (or until Python raises a RecursionError).',
    'true',
    'Without a base case, calls never stop — Python raises RecursionError at the recursion limit.'
  ),
  mc(
    'q5-3',
    'What does factorial(0) return according to the standard recursive definition?',
    [
      { id: 'a', text: '0' },
      { id: 'b', text: '-1' },
      { id: 'c', text: '1' },
      { id: 'd', text: 'None' },
    ],
    'c',
    'factorial(0) = 1 is the base case that stops the recursion.'
  ),
  fib(
    'q5-6',
    'Complete the recursive definition: factorial(n) = n * factorial(___)',
    'n-1',
    'Each call reduces n by 1, moving toward the base case factorial(0) = 1.'
  ),
  cr(
    'm5-c7',
    'Write `rec_len(lst)` that returns the length of a list **recursively** (do not use `len()`). Base case: an empty list has length 0.',
    'def rec_len(lst):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'rec_len',
      [
        { id: 's1', description: 'Three items', args: [[1, 2, 3]], expectedReturn: 3 },
        { id: 's2', description: 'Empty', args: [[]], expectedReturn: 0 },
      ],
      [
        { id: 'h1', args: [[9]], expectedReturn: 1 },
        { id: 'h2', args: [['a', 'b', 'c', 'd']], expectedReturn: 4 },
      ]
    ),
    ms(
      'def rec_len(lst):\n    if not lst:\n        return 0\n    return 1 + rec_len(lst[1:])',
      'Count 1 for the first element, then recurse on the rest. The empty list is the base case returning 0.'
    )
  ),
  cr(
    'm5-c8',
    'Write `rec_sum_digits(n)` that returns the sum of the digits of a non-negative integer **recursively** using `% 10` and `// 10`. Example: 123 → 6.',
    'def rec_sum_digits(n):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'rec_sum_digits',
      [
        { id: 's1', description: '123', args: [123], expectedReturn: 6 },
        { id: 's2', description: 'Single digit', args: [9], expectedReturn: 9 },
      ],
      [
        { id: 'h1', args: [0], expectedReturn: 0 },
        { id: 'h2', args: [1000], expectedReturn: 1 },
        { id: 'h3', args: [99999], expectedReturn: 45 },
      ]
    ),
    ms(
      'def rec_sum_digits(n):\n    if n < 10:\n        return n\n    return n % 10 + rec_sum_digits(n // 10)',
      'The last digit is n % 10; recurse on the remaining digits n // 10. A single-digit number is the base case.'
    )
  ),
  cr(
    'm5-c9',
    'Write `is_palindrome(s)` that returns `True` if string `s` reads the same forwards and backwards, **recursively** (compare the ends, then recurse on the middle). Empty and single-char strings are palindromes.',
    'def is_palindrome(s):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'is_palindrome',
      [
        { id: 's1', description: 'Palindrome', args: ['racecar'], expectedReturn: true },
        { id: 's2', description: 'Not a palindrome', args: ['ab'], expectedReturn: false },
      ],
      [
        { id: 'h1', args: [''], expectedReturn: true },
        { id: 'h2', args: ['a'], expectedReturn: true },
        { id: 'h3', args: ['abba'], expectedReturn: true },
        { id: 'h4', args: ['abca'], expectedReturn: false },
      ]
    ),
    ms(
      'def is_palindrome(s):\n    if len(s) <= 1:\n        return True\n    if s[0] != s[-1]:\n        return False\n    return is_palindrome(s[1:-1])',
      'Compare first and last characters; if they match, recurse on the inner substring. Strings of length 0 or 1 are the base case.'
    )
  ),
  tf(
    'q5-7',
    'Every recursive function must have at least one base case that does NOT recurse, or it will recurse forever (until a RecursionError).',
    'true',
    'The base case stops the recursion. Without one, the calls never terminate and Python raises RecursionError when the call stack overflows.'
  ),
  mc(
    'q5-8',
    'A recursive function calls itself but the argument never moves toward the base case. What happens?',
    [
      { id: 'a', text: 'It returns None immediately' },
      { id: 'b', text: 'It eventually raises RecursionError (stack overflow)' },
      { id: 'c', text: 'Python automatically converts it to a loop' },
      { id: 'd', text: 'It returns the base-case value anyway' },
    ],
    'b',
    'If the recursion never reaches a base case, the call stack grows without bound until Python raises RecursionError.'
  ),
  mc(
    'q5-9',
    'Which is generally TRUE about recursion vs iteration for the same problem?',
    [
      { id: 'a', text: 'Recursion is always faster than iteration' },
      { id: 'b', text: 'Recursion can be clearer for naturally recursive structures (trees), but uses call-stack memory' },
      { id: 'c', text: 'Iteration cannot solve anything recursion can' },
      { id: 'd', text: 'Recursion never uses extra memory' },
    ],
    'b',
    'Recursion often reads more naturally for recursive data (trees, divide-and-conquer) but each call consumes stack space; iteration avoids that overhead.'
  ),
];
