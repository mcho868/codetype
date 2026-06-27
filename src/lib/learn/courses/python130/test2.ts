import type { Module } from './types';
import { cr, mc, tf, funcCases, ms } from './authoring';

const test2: Module = {
  id: 'test-2',
  slug: 'test-2',
  title: 'Module 2 Test — Sorting & Searching',
  description:
    'Transfer-level practice: full merge sort, sortedness check, and binary search on tricky edge inputs.',
  icon: '📝',
  color: 'from-blue-500 to-cyan-400',
  locked: false,
  isMidterm: true,
  lessons: [],
  questions: [
    cr(
      't2-q1',
      'Implement `merge_sort(lst)` returning a **new sorted list** (do not mutate the input). Use divide-and-conquer: split in half, recursively sort each half, then merge.\n\nYou may define a helper `merge(a, b)` inside your solution.',
      `def merge_sort(lst):
    pass
`,
      'function',
      funcCases(
        'merge_sort',
        [
          { id: 's1', description: 'Unsorted list', args: [[3, 1, 4, 1, 5]], expectedReturn: [1, 1, 3, 4, 5] },
          { id: 's2', description: 'Empty list', args: [[]], expectedReturn: [] },
        ],
        [
          { id: 'h1', args: [[1]], expectedReturn: [1] },
          { id: 'h2', args: [[5, 4, 3, 2, 1]], expectedReturn: [1, 2, 3, 4, 5] },
          { id: 'h3', args: [[2, 2, 2]], expectedReturn: [2, 2, 2] },
          { id: 'h4', args: [[-1, 0, -3, 2]], expectedReturn: [-3, -1, 0, 2] },
        ]
      ),
      ms(
        `def merge_sort(lst):
    if len(lst) <= 1:
        return lst[:]
    mid = len(lst) // 2
    left = merge_sort(lst[:mid])
    right = merge_sort(lst[mid:])
    return merge(left, right)

def merge(a, b):
    result, i, j = [], 0, 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            result.append(a[i])
            i += 1
        else:
            result.append(b[j])
            j += 1
    result.extend(a[i:])
    result.extend(b[j:])
    return result`,
        'Merge sort splits until trivial (0–1 elements), then merges sorted halves in O(n) per level — O(n log n) overall. Copying with lst[:] keeps the original list unchanged.'
      )
    ),

    cr(
      't2-q2',
      'Implement `is_sorted(lst)` returning `True` when each element is **less than or equal to** the next (`lst[i] <= lst[i+1]`), and `True` for empty or single-element lists.',
      `def is_sorted(lst):
    pass
`,
      'function',
      funcCases(
        'is_sorted',
        [
          { id: 's1', description: 'Ascending', args: [[1, 2, 3, 3]], expectedReturn: true },
          { id: 's2', description: 'Out of order', args: [[1, 3, 2]], expectedReturn: false },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: true },
          { id: 'h2', args: [[7]], expectedReturn: true },
          { id: 'h3', args: [[5, 4]], expectedReturn: false },
          { id: 'h4', args: [[1, 1, 1]], expectedReturn: true },
        ]
      ),
      ms(
        `def is_sorted(lst):
    for i in range(len(lst) - 1):
        if lst[i] > lst[i + 1]:
            return False
    return True`,
        'A single forward scan compares neighbors — O(n). Allowing equal neighbors handles duplicates in non-decreasing order.'
      )
    ),

    cr(
      't2-q3',
      'Implement `binary_search_leftmost(sorted_lst, target)` on a **non-decreasing** list. Return the **leftmost index** where `target` appears, or `-1` if absent.\n\nHandle empty lists and duplicate values (e.g. `[1,2,2,2,3]`, target `2` → index `1`).',
      `def binary_search_leftmost(sorted_lst, target):
    pass
`,
      'function',
      funcCases(
        'binary_search_leftmost',
        [
          { id: 's1', description: 'Found at index 2', args: [[1, 2, 3, 4, 5], 3], expectedReturn: 2 },
          { id: 's2', description: 'Not found', args: [[1, 2, 4], 3], expectedReturn: -1 },
        ],
        [
          { id: 'h1', args: [[], 1], expectedReturn: -1 },
          { id: 'h2', args: [[5], 5], expectedReturn: 0 },
          { id: 'h3', args: [[1, 2, 2, 2, 3], 2], expectedReturn: 1 },
          { id: 'h4', args: [[1, 2, 2, 2, 3], 4], expectedReturn: -1 },
          { id: 'h5', args: [[0, 0, 0], 0], expectedReturn: 0 },
        ]
      ),
      ms(
        `def binary_search_leftmost(sorted_lst, target):
    lo, hi = 0, len(sorted_lst)
    while lo < hi:
        mid = (lo + hi) // 2
        if sorted_lst[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    if lo < len(sorted_lst) and sorted_lst[lo] == target:
        return lo
    return -1`,
        'Standard binary search narrows to any match; biasing toward the left (`hi = mid` when mid >= target) lands on the first equal element. Empty list returns -1 immediately via the final check.'
      )
    ),

    mc(
      't2-q4',
      'Merge sort combines two sorted halves of total length `n` in the merge step. What is the time complexity of one merge operation?',
      [
        { id: 'a', text: 'O(1)' },
        { id: 'b', text: 'O(log n)' },
        { id: 'c', text: 'O(n)' },
        { id: 'd', text: 'O(n²)' },
      ],
      'c',
      ms(
        'O(n) — each element is moved at most once.',
        'Merge walks both halves with two pointers, appending the smaller head each time. Every element is visited once, so a single merge is linear in the combined size.'
      )
    ),

    cr(
      't2-q5',
      'Implement `search_insert_index(sorted_lst, target)` returning the index where `target` **would be inserted** to keep the list sorted. If `target` is already present, return the **leftmost** index (same as `binary_search_leftmost`).\n\nExamples: `([], 5)` → `0`; `([1,3,5], 3)` → `1`; `([1,3,5], 4)` → `2`.',
      `def search_insert_index(sorted_lst, target):
    pass
`,
      'function',
      funcCases(
        'search_insert_index',
        [
          { id: 's1', description: 'Insert in middle gap', args: [[1, 3, 5], 4], expectedReturn: 2 },
          { id: 's2', description: 'Empty list', args: [[], 5], expectedReturn: 0 },
        ],
        [
          { id: 'h1', args: [[1, 3, 5], 0], expectedReturn: 0 },
          { id: 'h2', args: [[1, 3, 5], 6], expectedReturn: 3 },
          { id: 'h3', args: [[1, 2, 2, 3], 2], expectedReturn: 1 },
          { id: 'h4', args: [[1, 3, 5], 3], expectedReturn: 1 },
        ]
      ),
      ms(
        `def search_insert_index(sorted_lst, target):
    lo, hi = 0, len(sorted_lst)
    while lo < hi:
        mid = (lo + hi) // 2
        if sorted_lst[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
        'This is lower-bound binary search: when the loop ends, lo is the first position where all elements before are < target. No final equality check is needed — lo is always a valid insert index.'
      )
    ),

    tf(
      't2-q6',
      'Binary search requires the input list to be sorted in non-decreasing order; otherwise the halving logic may skip the target.',
      'true',
      ms(
        'True — unsorted input breaks the ordering invariant.',
        'Binary search assumes that comparing to the middle element lets you discard half the range. Without sorted order, the target may live in the discarded half, so results are unreliable.'
      )
    ),
  ],
};

export default test2;
