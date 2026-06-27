import type { Question } from '../../python101/types';
import { cr, mc, tf, funcCases, ms } from '../authoring';

export const module2Questions: Question[] = [
  cr(
    'm2-c1',
    'Write `linear_search(lst, target)` returning the **index** of `target`, or `-1` if not found.',
    'def linear_search(lst, target):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'linear_search',
      [
        { id: 's1', description: 'Found', args: [[4, 2, 7, 1], 7], expectedReturn: 2 },
        { id: 's2', description: 'Not found', args: [[4, 2, 7, 1], 9], expectedReturn: -1 },
      ],
      [
        { id: 'h1', args: [[], 1], expectedReturn: -1 },
        { id: 'h2', args: [[5], 5], expectedReturn: 0 },
        { id: 'h3', args: [[1, 1, 1], 1], expectedReturn: 0 },
      ]
    ),
    ms(
      'def linear_search(lst, target):\n    for i, x in enumerate(lst):\n        if x == target:\n            return i\n    return -1',
      'Scan left to right — O(n) worst case.'
    )
  ),
  cr(
    'm2-c2',
    'Write **iterative** `binary_search(sorted_lst, target)` returning index or `-1`. Assume the list is sorted ascending.',
    'def binary_search(sorted_lst, target):\n    low = 0\n    high = len(sorted_lst) - 1\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'binary_search',
      [
        { id: 's1', description: 'Found', args: [[1, 3, 5, 7, 9, 11], 7], expectedReturn: 3 },
        { id: 's2', description: 'Missing', args: [[1, 3, 5, 7, 9, 11], 4], expectedReturn: -1 },
      ],
      [
        { id: 'h1', args: [[], 5], expectedReturn: -1 },
        { id: 'h2', args: [[2], 2], expectedReturn: 0 },
        { id: 'h3', args: [[1, 2, 3, 4, 5], 1], expectedReturn: 0 },
        { id: 'h4', args: [[1, 2, 3, 4, 5], 6], expectedReturn: -1 },
      ]
    ),
    ms(
      'def binary_search(sorted_lst, target):\n    low, high = 0, len(sorted_lst) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if sorted_lst[mid] == target:\n            return mid\n        if sorted_lst[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1',
      'Halve the search range each step — O(log n).'
    )
  ),
  cr(
    'm2-c3',
    'Write `bubble_sort(lst)` that returns a **new sorted list** without mutating the input.',
    'def bubble_sort(lst):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'bubble_sort',
      [
        { id: 's1', description: 'Unsorted', args: [[5, 1, 4, 2, 8]], expectedReturn: [1, 2, 4, 5, 8] },
        { id: 's2', description: 'Empty', args: [[]], expectedReturn: [] },
      ],
      [
        { id: 'h1', args: [[3]], expectedReturn: [3] },
        { id: 'h2', args: [[3, 3, 1]], expectedReturn: [1, 3, 3] },
        { id: 'h3', args: [[5, 4, 3, 2, 1]], expectedReturn: [1, 2, 3, 4, 5] },
      ]
    ),
    ms(
      'def bubble_sort(lst):\n    arr = lst[:]\n    n = len(arr)\n    for i in range(n):\n        swapped = False\n        for j in range(n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped:\n            break\n    return arr',
      'Copy first, then bubble adjacent swaps — O(n²) worst case.'
    )
  ),
  cr(
    'm2-c4',
    'Write `selection_sort(lst)` returning a **new sorted list** (do not mutate the input).',
    'def selection_sort(lst):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'selection_sort',
      [
        { id: 's1', description: 'Classic example', args: [[64, 25, 12, 22, 11]], expectedReturn: [11, 12, 22, 25, 64] },
        { id: 's2', description: 'Already sorted', args: [[1, 2, 3]], expectedReturn: [1, 2, 3] },
      ],
      [
        { id: 'h1', args: [[]], expectedReturn: [] },
        { id: 'h2', args: [[2, 1]], expectedReturn: [1, 2] },
        { id: 'h3', args: [[3, 3, 1]], expectedReturn: [1, 3, 3] },
      ]
    ),
    ms(
      'def selection_sort(lst):\n    arr = lst[:]\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr',
      'Each pass places the minimum of the unsorted suffix.'
    )
  ),
  cr(
    'm2-c5',
    'Write `insertion_sort(lst)` returning a **new sorted list** (do not mutate the input).',
    'def insertion_sort(lst):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'insertion_sort',
      [
        { id: 's1', description: 'Mixed order', args: [[5, 2, 4, 6, 1, 3]], expectedReturn: [1, 2, 3, 4, 5, 6] },
        { id: 's2', description: 'Reverse', args: [[3, 2, 1]], expectedReturn: [1, 2, 3] },
      ],
      [
        { id: 'h1', args: [[]], expectedReturn: [] },
        { id: 'h2', args: [[7]], expectedReturn: [7] },
        { id: 'h3', args: [[2, 2, 1]], expectedReturn: [1, 2, 2] },
      ]
    ),
    ms(
      'def insertion_sort(lst):\n    arr = lst[:]\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr',
      'Grow the sorted prefix by inserting each key.'
    )
  ),
  cr(
    'm2-c6',
    'Write `merge(a, b)` that merges two **sorted** lists into one sorted list (the merge step of merge sort).',
    'def merge(a, b):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'merge',
      [
        { id: 's1', description: 'Equal length', args: [[1, 3, 5], [2, 4, 6]], expectedReturn: [1, 2, 3, 4, 5, 6] },
        { id: 's2', description: 'One empty', args: [[1, 2], []], expectedReturn: [1, 2] },
      ],
      [
        { id: 'h1', args: [[], []], expectedReturn: [] },
        { id: 'h2', args: [[1, 1, 2], [1, 3]], expectedReturn: [1, 1, 1, 2, 3] },
        { id: 'h3', args: [[7], [1, 2, 3]], expectedReturn: [1, 2, 3, 7] },
      ]
    ),
    ms(
      'def merge(a, b):\n    result, i, j = [], 0, 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            result.append(a[i])\n            i += 1\n        else:\n            result.append(b[j])\n            j += 1\n    result.extend(a[i:])\n    result.extend(b[j:])\n    return result',
      'Two-pointer merge — O(len(a) + len(b)).'
    )
  ),
  mc(
    'q2-1',
    'What is the time complexity of linear search in the worst case?',
    [
      { id: 'a', text: 'O(1)' },
      { id: 'b', text: 'O(log n)' },
      { id: 'c', text: 'O(n)' },
      { id: 'd', text: 'O(n²)' },
    ],
    'c',
    'Worst case scans every element.'
  ),
  tf(
    'q2-2',
    'Binary search can be used on an unsorted list as long as you check every element.',
    'false',
    'Binary search requires sorted data.'
  ),
  mc(
    'q2-3',
    'A sorted list has 1,024 elements. What is the maximum number of comparisons binary search needs?',
    [
      { id: 'a', text: '512' },
      { id: 'b', text: '1024' },
      { id: 'c', text: '10' },
      { id: 'd', text: '32' },
    ],
    'c',
    'log₂(1024) = 10.'
  ),
  mc(
    'q2-4',
    'In selection sort, what does each pass through the unsorted portion accomplish?',
    [
      { id: 'a', text: 'It swaps every adjacent pair that is out of order' },
      { id: 'b', text: 'It finds the minimum element and swaps it to the correct position' },
      { id: 'c', text: 'It splits the list into two sorted halves' },
      { id: 'd', text: 'It removes duplicate elements' },
    ],
    'b',
    'Selection sort places the minimum of the unsorted suffix.'
  ),
  mc(
    'q2-9',
    'You will search a large dataset thousands of times. Which approach is most efficient overall?',
    [
      { id: 'a', text: 'Linear search every time' },
      { id: 'b', text: 'Sort once O(n log n), then binary search O(log n) each time' },
      { id: 'c', text: 'Sort with selection sort O(n²), then binary search' },
      { id: 'd', text: 'Linear search first, binary search after' },
    ],
    'b',
    'Amortise sorting cost across many fast searches.'
  ),
  cr(
    'm2-c7',
    'Write `is_sorted(lst)` returning `True` if the list is in non-decreasing order (each element ≥ the one before), else `False`. Empty and single-element lists are sorted.',
    'def is_sorted(lst):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'is_sorted',
      [
        { id: 's1', description: 'Ascending', args: [[1, 2, 3]], expectedReturn: true },
        { id: 's2', description: 'Out of order', args: [[3, 1, 2]], expectedReturn: false },
      ],
      [
        { id: 'h1', args: [[]], expectedReturn: true },
        { id: 'h2', args: [[5]], expectedReturn: true },
        { id: 'h3', args: [[2, 2, 3]], expectedReturn: true },
        { id: 'h4', args: [[1, 3, 2, 4]], expectedReturn: false },
      ]
    ),
    ms(
      'def is_sorted(lst):\n    for i in range(1, len(lst)):\n        if lst[i] < lst[i - 1]:\n            return False\n    return True',
      'Compare each element to its predecessor; one out-of-order pair means not sorted. Equal neighbours are allowed (non-decreasing).'
    )
  ),
  cr(
    'm2-c8',
    'Write `merge_sort(lst)` returning a new sorted list using the **divide-and-conquer** merge sort algorithm (split in half, sort each half, merge). Do not mutate the input.',
    'def merge_sort(lst):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'merge_sort',
      [
        { id: 's1', description: 'Unsorted', args: [[3, 1, 2]], expectedReturn: [1, 2, 3] },
        { id: 's2', description: 'Reverse', args: [[5, 4, 3, 2, 1]], expectedReturn: [1, 2, 3, 4, 5] },
      ],
      [
        { id: 'h1', args: [[]], expectedReturn: [] },
        { id: 'h2', args: [[42]], expectedReturn: [42] },
        { id: 'h3', args: [[2, 2, 1]], expectedReturn: [1, 2, 2] },
        { id: 'h4', args: [[9, 3, 7, 1, 8]], expectedReturn: [1, 3, 7, 8, 9] },
      ]
    ),
    ms(
      'def merge_sort(lst):\n    if len(lst) <= 1:\n        return lst\n    mid = len(lst) // 2\n    left = merge_sort(lst[:mid])\n    right = merge_sort(lst[mid:])\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    return result + left[i:] + right[j:]',
      'Recursively split until single elements, then merge sorted halves — O(n log n). The base case (length ≤ 1) is already sorted.'
    )
  ),
  tf(
    'q2-8',
    'Binary search requires the list to be sorted first; running it on an unsorted list can give wrong results.',
    'true',
    'Binary search relies on order to decide which half to discard — on unsorted data its assumptions break.'
  ),
  mc(
    'q2-9',
    'Why is bubble sort O(n²) in the worst case while merge sort is O(n log n)?',
    [
      { id: 'a', text: 'It uses recursion, which is always slower' },
      { id: 'b', text: 'It makes about n passes, each comparing/swapping up to n elements' },
      { id: 'c', text: 'It allocates a new list on every comparison' },
      { id: 'd', text: 'It only works on numbers' },
    ],
    'b',
    'Bubble sort does ~n passes over ~n elements → O(n²). Merge sort splits the problem into log n levels of O(n) work.'
  ),
];
