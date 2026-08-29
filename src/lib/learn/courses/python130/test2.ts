import type { Module } from './types';
import { cr, mc, tf, funcCases, ms } from './authoring';

const test2: Module = {
  id: 'test-2',
  slug: 'test-2',
  title: 'Module 2 Test — Sorting & Searching',
  description:
    'Transfer-level practice: merge-sort trade-offs, sortedness checking, and binary search on tricky edge inputs.',
  icon: '📝',
  color: 'from-blue-500 to-cyan-400',
  locked: false,
  isMidterm: true,
  lessons: [],
  questions: [
    mc(
      't2-q1',
      'Which statement best describes the time and extra-space cost of the merge sort implementation taught this week?',
      [
        { id: 'a', text: 'O(n²) time and O(1) extra space' },
        { id: 'b', text: 'O(n log n) time and O(n) extra space' },
        { id: 'c', text: 'O(log n) time and O(n²) extra space' },
        { id: 'd', text: 'O(n) time and O(log n) extra space' },
      ],
      'b',
      ms(
        'O(n log n) time and O(n) extra space.',
        'There are about log n levels of splitting, and each level processes n elements while merging. The temporary lists and merge results require O(n) additional space.'
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
      'Which statement correctly compares selection sort and insertion sort?',
      [
        { id: 'a', text: 'Selection sort is O(n) on an already-sorted list, while insertion sort is always O(n²).' },
        { id: 'b', text: 'Selection sort makes O(n²) comparisons regardless of input, while insertion sort can be O(n) on an already-sorted list.' },
        { id: 'c', text: 'Both algorithms are O(n log n) in the worst case.' },
        { id: 'd', text: 'Both algorithms require the input list to be sorted before they can run.' },
      ],
      'b',
      ms(
        'Selection sort makes O(n²) comparisons regardless of input, while insertion sort can be O(n) on an already-sorted list.',
        'Selection sort always scans the remaining unsorted section to find the minimum, so its comparisons stay O(n²). Insertion sort can move through an already-sorted list with one comparison per item, giving a best case of O(n).'
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
