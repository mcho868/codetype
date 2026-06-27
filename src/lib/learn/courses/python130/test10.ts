import type { Module } from './types';
import { cr, mc, tf, funcCases, ms } from './authoring';

const test10: Module = {
  id: 'test-10',
  slug: 'test-10',
  title: 'Module 10 Test — Priority Queues & Heaps',
  description:
    'Transfer-level practice: k smallest via a heap, heap sort, and validating min-heap structure.',
  icon: '📝',
  color: 'from-teal-500 to-green-400',
  locked: false,
  isMidterm: true,
  lessons: [],
  questions: [
    cr(
      't10-q1',
      `Implement \`k_smallest(nums, k)\` returning a **sorted list** of the \`k\` smallest values in \`nums\` (use a min-heap or heapify approach). If \`k\` exceeds len(nums), return sorted(nums).\n\nExample: \`k_smallest([3, 1, 4, 1, 5], 3)\` → \`[1, 1, 3]\`.`,
      `def k_smallest(nums, k):
    pass
`,
      'function',
      funcCases(
        'k_smallest',
        [
          { id: 's1', description: 'Three smallest', args: [[3, 1, 4, 1, 5], 3], expectedReturn: [1, 1, 3] },
          { id: 's2', description: 'k equals length', args: [[5, 2], 2], expectedReturn: [2, 5] },
        ],
        [
          { id: 'h1', args: [[7], 1], expectedReturn: [7] },
          { id: 'h2', args: [[9, 3, 7, 1], 2], expectedReturn: [1, 3] },
          { id: 'h3', args: [[4, 4, 4], 2], expectedReturn: [4, 4] },
        ]
      ),
      ms(
        `def k_smallest(nums, k):
    if k >= len(nums):
        return sorted(nums)
    heap = nums[:]
    n = len(heap)

    def perc_down(i):
        while True:
            left = 2 * i + 1
            right = 2 * i + 2
            smallest = i
            if left < n and heap[left] < heap[smallest]:
                smallest = left
            if right < n and heap[right] < heap[smallest]:
                smallest = right
            if smallest == i:
                break
            heap[i], heap[smallest] = heap[smallest], heap[i]
            i = smallest

    for i in range(n // 2 - 1, -1, -1):
        perc_down(i)

    result = []
    for _ in range(k):
        result.append(heap[0])
        heap[0] = heap[n - 1 - len(result)]
        perc_down(0)
    return sorted(result)`,
        'Build a min-heap, extract-min k times, then sort the k values for the expected output order. A size-k max-heap is an alternative when k << n.'
      )
    ),

    cr(
      't10-q2',
      `Implement \`heap_sort(nums)\` returning a **new sorted list** in ascending order using **heap sort** (build max-heap or min-heap, then repeatedly extract).\n\nDo not use Python's built-in \`sorted()\` on the full input as your only step.`,
      `def heap_sort(nums):
    pass
`,
      'function',
      funcCases(
        'heap_sort',
        [
          { id: 's1', description: 'Unsorted', args: [[3, 1, 4, 1, 5]], expectedReturn: [1, 1, 3, 4, 5] },
          { id: 's2', description: 'Empty', args: [[]], expectedReturn: [] },
        ],
        [
          { id: 'h1', args: [[1]], expectedReturn: [1] },
          { id: 'h2', args: [[5, 4, 3, 2, 1]], expectedReturn: [1, 2, 3, 4, 5] },
          { id: 'h3', args: [[2, 2]], expectedReturn: [2, 2] },
        ]
      ),
      ms(
        `def heap_sort(nums):
    arr = nums[:]
    n = len(arr)

    def perc_down(i, size):
        while True:
            left = 2 * i + 1
            right = 2 * i + 2
            largest = i
            if left < size and arr[left] > arr[largest]:
                largest = left
            if right < size and arr[right] > arr[largest]:
                largest = right
            if largest == i:
                break
            arr[i], arr[largest] = arr[largest], arr[i]
            i = largest

    for i in range(n // 2 - 1, -1, -1):
        perc_down(i, n)
    for end in range(n - 1, 0, -1):
        arr[0], arr[end] = arr[end], arr[0]
        perc_down(0, end)
    return arr`,
        'Classic heap sort: heapify into max-heap, swap root to end, shrink heap, sift down. O(n log n) time and sorts in-place on a copy.'
      )
    ),

    cr(
      't10-q3',
      `Implement \`is_min_heap(arr)\` returning \`True\` when \`arr\` satisfies the **min-heap property**: each parent is <= both children (indices \`2i+1\`, \`2i+2\`). Empty array → \`True\`.`,
      `def is_min_heap(arr):
    pass
`,
      'function',
      funcCases(
        'is_min_heap',
        [
          { id: 's1', description: 'Valid min-heap', args: [[1, 3, 2, 7, 5, 4]], expectedReturn: true },
          { id: 's2', description: 'Child smaller than parent', args: [[2, 1]], expectedReturn: false },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: true },
          { id: 'h2', args: [[5]], expectedReturn: true },
          { id: 'h3', args: [[1, 2, 3, 4]], expectedReturn: true },
          { id: 'h4', args: [[3, 1, 2]], expectedReturn: false },
        ]
      ),
      ms(
        `def is_min_heap(arr):
    n = len(arr)
    for i in range(n):
        left = 2 * i + 1
        right = 2 * i + 2
        if left < n and arr[left] < arr[i]:
            return False
        if right < n and arr[right] < arr[i]:
            return False
    return True`,
        'Check every parent against existing children only — O(n). A single violation means the array is not a valid min-heap representation.'
      )
    ),

    cr(
      't10-q4',
      `Implement \`MinHeapLite\` with \`insert(val)\`, \`peek_min()\` (return \`null\` if empty), and \`extract_min()\` (remove and return smallest).\n\nStore data in a list heap. The starter includes \`run_min_heap_lite\` — **do not edit it**.`,
      `class MinHeapLite:
    def __init__(self):
        self._data = []

    def insert(self, val):
        pass

    def peek_min(self):
        pass

    def extract_min(self):
        pass


def run_min_heap_lite(values):
    h = MinHeapLite()
    for v in values:
        h.insert(v)
    out = []
    while h.peek_min() is not None:
        out.append(h.extract_min())
    return out
`,
      'function',
      funcCases(
        'run_min_heap_lite',
        [
          { id: 's1', description: 'Extract ascending', args: [[3, 1, 4, 1]], expectedReturn: [1, 1, 3, 4] },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: [] },
          { id: 'h2', args: [[5]], expectedReturn: [5] },
          { id: 'h3', args: [[2, 2, 2]], expectedReturn: [2, 2, 2] },
        ]
      ),
      ms(
        `class MinHeapLite:
    def __init__(self):
        self._data = []

    def _perc_up(self, i):
        while i > 0:
            parent = (i - 1) // 2
            if self._data[i] < self._data[parent]:
                self._data[i], self._data[parent] = self._data[parent], self._data[i]
                i = parent
            else:
                break

    def _perc_down(self, i):
        n = len(self._data)
        while True:
            left = 2 * i + 1
            right = 2 * i + 2
            smallest = i
            if left < n and self._data[left] < self._data[smallest]:
                smallest = left
            if right < n and self._data[right] < self._data[smallest]:
                smallest = right
            if smallest == i:
                break
            self._data[i], self._data[smallest] = self._data[smallest], self._data[i]
            i = smallest

    def insert(self, val):
        self._data.append(val)
        self._perc_up(len(self._data) - 1)

    def peek_min(self):
        return self._data[0] if self._data else None

    def extract_min(self):
        if not self._data:
            return None
        top = self._data[0]
        last = self._data.pop()
        if self._data:
            self._data[0] = last
            self._perc_down(0)
        return top`,
        'insert bubbles up; extract_min replaces root with last leaf and sifts down. Repeated extract_min yields ascending order — the heap sort idea incrementally.'
      )
    ),

    mc(
      't10-q5',
      'In a binary min-heap stored in an array, where is the parent of the node at index `i` (for `i > 0`)?',
      [
        { id: 'a', text: 'index i // 2' },
        { id: 'b', text: 'index (i - 1) // 2' },
        { id: 'c', text: 'index i - 1' },
        { id: 'd', text: 'index 2 * i' },
      ],
      'b',
      ms(
        'Parent at (i - 1) // 2.',
        '0-based heap indexing: children of i are 2i+1 and 2i+2; inverting gives parent (i-1)//2. Index arithmetic is how heaps avoid pointer-based tree nodes.'
      )
    ),

    tf(
      't10-q6',
      'Extracting the minimum from a binary min-heap of n elements takes O(log n) time in the worst case because the replacement may sift down one level per tree level.',
      'true',
      ms(
        'True — sift-down height is O(log n).',
        'After moving the last leaf to the root, percolate down compares with children along at most tree height ≈ log n levels.'
      )
    ),
  ],
};

export default test10;
