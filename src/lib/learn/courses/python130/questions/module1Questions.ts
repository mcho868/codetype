import type { Question } from '../../python101/types';
import { cr, mc, funcCases, ms } from '../authoring';

export const module1Questions: Question[] = [
  cr(
    'm1-c1',
    'Write `count_pairs(n)` that returns how many times the inner statement runs in:\n```python\nfor i in range(n):\n    for j in range(n):\n        # inner statement\n```',
    'def count_pairs(n):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'count_pairs',
      [
        { id: 's1', description: 'n = 3', args: [3], expectedReturn: 9 },
        { id: 's2', description: 'n = 0', args: [0], expectedReturn: 0 },
      ],
      [
        { id: 'h1', args: [1], expectedReturn: 1 },
        { id: 'h2', args: [5], expectedReturn: 25 },
        { id: 'h3', args: [10], expectedReturn: 100 },
      ]
    ),
    ms('def count_pairs(n):\n    return n * n', 'Nested loops each run n times → n × n = n² iterations.')
  ),
  cr(
    'm1-c2',
    'Write `linear_max(lst)` that returns the maximum value using a **single loop**. Return `None` for an empty list.',
    'def linear_max(lst):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'linear_max',
      [
        { id: 's1', description: 'Mixed values', args: [[3, 7, 2, 9, 1]], expectedReturn: 9 },
        { id: 's2', description: 'Empty list', args: [[]], expectedReturn: null },
      ],
      [
        { id: 'h1', args: [[-5, -1, -9]], expectedReturn: -1 },
        { id: 'h2', args: [[42]], expectedReturn: 42 },
        { id: 'h3', args: [[0, 0, 5]], expectedReturn: 5 },
      ]
    ),
    ms(
      'def linear_max(lst):\n    if not lst:\n        return None\n    best = lst[0]\n    for x in lst[1:]:\n        if x > best:\n            best = x\n    return best',
      'One pass tracking the best value seen — O(n) time.'
    )
  ),
  cr(
    'm1-c3',
    'Write `has_duplicate(lst)` that returns `True` if any value appears more than once. Use a **set** for O(n) time.',
    'def has_duplicate(lst):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'has_duplicate',
      [
        { id: 's1', description: 'Has duplicate', args: [[1, 2, 3, 2]], expectedReturn: true },
        { id: 's2', description: 'All unique', args: [[1, 2, 3, 4]], expectedReturn: false },
      ],
      [
        { id: 'h1', args: [[]], expectedReturn: false },
        { id: 'h2', args: [[5, 5]], expectedReturn: true },
        { id: 'h3', args: [['a', 'b', 'c', 'a']], expectedReturn: true },
      ]
    ),
    ms(
      'def has_duplicate(lst):\n    seen = set()\n    for x in lst:\n        if x in seen:\n            return True\n        seen.add(x)\n    return False',
      'Set membership is O(1) average — one pass beats nested loops.'
    )
  ),
  cr(
    'm1-c4',
    'Write `constant_first(lst)` that returns `lst[0]` if the list is non-empty, otherwise `None`. (O(1) access.)',
    'def constant_first(lst):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'constant_first',
      [
        { id: 's1', description: 'Non-empty', args: [[10, 20, 30]], expectedReturn: 10 },
        { id: 's2', description: 'Empty', args: [[]], expectedReturn: null },
      ],
      [
        { id: 'h1', args: [['only']], expectedReturn: 'only' },
        { id: 'h2', args: [[0, 1, 2]], expectedReturn: 0 },
      ]
    ),
    ms(
      'def constant_first(lst):\n    if not lst:\n        return None\n    return lst[0]',
      'Index 0 is O(1) regardless of list length.'
    )
  ),
  mc(
    'q1-1',
    'What does Big-O notation measure?',
    [
      { id: 'a', text: 'The exact number of milliseconds an algorithm takes' },
      { id: 'b', text: 'How the number of operations grows as the input size grows' },
      { id: 'c', text: 'The amount of memory a program uses in bytes' },
      { id: 'd', text: 'How many lines of code the algorithm has' },
    ],
    'b',
    'Big-O describes growth rate relative to input size n, not wall-clock time.'
  ),
  mc(
    'q1-2',
    'What is the Big-O complexity of accessing an element by index in a Python list (e.g., lst[5])?',
    [
      { id: 'a', text: 'O(n)' },
      { id: 'b', text: 'O(log n)' },
      { id: 'c', text: 'O(n²)' },
      { id: 'd', text: 'O(1)' },
    ],
    'd',
    'List index access is O(1) — fixed memory offset.'
  ),
  mc(
    'q1-3',
    'What is the complexity of two nested loops that each iterate n times?',
    [
      { id: 'a', text: 'O(2n)' },
      { id: 'b', text: 'O(n)' },
      { id: 'c', text: 'O(n²)' },
      { id: 'd', text: 'O(log n)' },
    ],
    'c',
    'n × n iterations → O(n²).'
  ),
  mc(
    'q1-5',
    'What is the Big-O complexity of "x in my_list" when my_list is a Python list?',
    [
      { id: 'a', text: 'O(1)' },
      { id: 'b', text: 'O(log n)' },
      { id: 'c', text: 'O(n)' },
      { id: 'd', text: 'O(n²)' },
    ],
    'c',
    'List membership scans elements in order — O(n).'
  ),
  mc(
    'q1-6',
    'An algorithm that halves its search space each step (like binary search) has O(_____) complexity.',
    [
      { id: 'a', text: '1' },
      { id: 'b', text: 'log n' },
      { id: 'c', text: 'n' },
      { id: 'd', text: 'n²' },
    ],
    'b',
    'Halving each step → at most log₂(n) steps.'
  ),
  mc(
    'q1-11',
    'Which ordering correctly ranks these complexities from slowest to fastest growth?',
    [
      { id: 'a', text: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n)' },
      { id: 'b', text: 'O(log n) < O(1) < O(n) < O(n²) < O(n log n) < O(2^n)' },
      { id: 'c', text: 'O(1) < O(n) < O(log n) < O(n log n) < O(n²) < O(2^n)' },
      { id: 'd', text: 'O(1) < O(log n) < O(n log n) < O(n) < O(2^n) < O(n²)' },
    ],
    'a',
    'Fundamental complexity ordering for algorithm analysis.'
  ),
  cr(
    'm1-c5',
    'Write `count_triples(n)` returning how many times the innermost statement runs in **three** nested loops that each range over `n` (i.e. n³).',
    'def count_triples(n):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'count_triples',
      [
        { id: 's1', description: 'n = 2', args: [2], expectedReturn: 8 },
        { id: 's2', description: 'n = 0', args: [0], expectedReturn: 0 },
      ],
      [
        { id: 'h1', args: [1], expectedReturn: 1 },
        { id: 'h2', args: [3], expectedReturn: 27 },
        { id: 'h3', args: [5], expectedReturn: 125 },
      ]
    ),
    ms('def count_triples(n):\n    return n * n * n', 'Three nested loops each run n times → n³ iterations, i.e. O(n³).')
  ),
  cr(
    'm1-c6',
    'A teacher wants to know how many students scored **below the class average**. Write `count_below_average(nums)` that returns how many values in the list are **strictly less than** the average of the list. Return 0 for an empty list.\n\nAim for an **O(n)** solution — compute the average once, then count — rather than recomputing the average for every element.',
    'def count_below_average(nums):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'count_below_average',
      [
        { id: 's1', description: '[1, 2, 3, 4] → avg 2.5, two below', args: [[1, 2, 3, 4]], expectedReturn: 2 },
        { id: 's2', description: 'All equal → none below', args: [[10, 10, 10]], expectedReturn: 0 },
      ],
      [
        { id: 'h1', args: [[]], expectedReturn: 0 },
        { id: 'h2', args: [[5]], expectedReturn: 0 },
        { id: 'h3', args: [[1, 100]], expectedReturn: 1 },
        { id: 'h4', args: [[0, 0, 0, 4]], expectedReturn: 3 },
        { id: 'h5', args: [[4, 1, 7, 2, 6]], expectedReturn: 2 },
      ]
    ),
    ms(
      'def count_below_average(nums):\n    if not nums:\n        return 0\n    avg = sum(nums) / len(nums)\n    count = 0\n    for x in nums:\n        if x < avg:\n            count += 1\n    return count',
      'Computing the average ONCE (one pass) and then counting in a second pass is O(n). The naive approach — recomputing sum(nums)/len(nums) inside the loop for every element — would be O(n²) for the same answer. Equal values are not strictly below the average, so an all-equal list returns 0.'
    )
  ),
  cr(
    'm1-c7',
    'Write `first_negative(lst)` that returns the **first** negative number in the list, or `None` if there are none. This is O(n) worst case but can stop early.',
    'def first_negative(lst):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'first_negative',
      [
        { id: 's1', description: 'Has a negative', args: [[3, -2, 5]], expectedReturn: -2 },
        { id: 's2', description: 'All positive', args: [[1, 2, 3]], expectedReturn: null },
      ],
      [
        { id: 'h1', args: [[]], expectedReturn: null },
        { id: 'h2', args: [[-7]], expectedReturn: -7 },
        { id: 'h3', args: [[4, 5, -1, -9]], expectedReturn: -1 },
      ]
    ),
    ms(
      'def first_negative(lst):\n    for x in lst:\n        if x < 0:\n            return x\n    return None',
      'Returning as soon as the first negative is found means the best case is O(1); only an all-positive list forces a full O(n) scan.'
    )
  ),
  mc(
    'q1-12',
    'Adding one element to the END of a Python list (list.append) is which complexity on average?',
    [
      { id: 'a', text: 'O(1)' },
      { id: 'b', text: 'O(n)' },
      { id: 'c', text: 'O(log n)' },
      { id: 'd', text: 'O(n²)' },
    ],
    'a',
    'append adds at the end in amortized O(1) — no shifting of existing elements is needed.',
  ),
  mc(
    'q1-13',
    'A function does a fixed amount of work, then calls itself on half the input each time. Its complexity is:',
    [
      { id: 'a', text: 'O(n)' },
      { id: 'b', text: 'O(log n)' },
      { id: 'c', text: 'O(1)' },
      { id: 'd', text: 'O(n²)' },
    ],
    'b',
    'Halving the input each step gives about log₂(n) levels — O(log n).',
  ),
];
