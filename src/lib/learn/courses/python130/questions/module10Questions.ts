import type { Question } from '../../python101/types';
import { cr, mc, tf, fib, funcCases, ms } from '../authoring';

export const module10Questions: Question[] = [
  cr(
    'm10-c1',
    'Implement `MinHeap` with `insert(val)` using a 1-indexed list (`self.heap = [0]`). Percolate up after insert.\n\nThe starter includes `run_heap_insert` — **do not edit it**.',
    `class MinHeap:
    def __init__(self):
        self.heap = [0]

    def insert(self, val):
        pass


def run_heap_insert(values):
    h = MinHeap()
    for v in values:
        h.insert(v)
    return h.heap[1:]
`,
    'function',
    funcCases(
      'run_heap_insert',
      [
        { id: 's1', description: 'Insert sequence', args: [[5, 3, 8, 1, 4]], expectedReturn: [1, 3, 8, 5, 4] },
        { id: 's2', description: 'Single value', args: [[7]], expectedReturn: [7] },
      ],
      [
        { id: 'h1', args: [[2, 1]], expectedReturn: [1, 2] },
        { id: 'h2', args: [[4, 2, 6]], expectedReturn: [2, 4, 6] },
      ]
    ),
    ms(
      `class MinHeap:
    def __init__(self):
        self.heap = [0]

    def insert(self, val):
        self.heap.append(val)
        i = len(self.heap) - 1
        while i > 1 and self.heap[i] < self.heap[i // 2]:
            self.heap[i], self.heap[i // 2] = self.heap[i // 2], self.heap[i]
            i //= 2`,
      'Append at the end, then swap with parent while smaller — percolate up.'
    )
  ),
  cr(
    'm10-c2',
    'Add `peek_min()` returning the minimum without removing it (or `None` if empty).\n\nThe starter includes `run_peek_min` — **do not edit it**.',
    `class MinHeap:
    def __init__(self):
        self.heap = [0]

    def insert(self, val):
        self.heap.append(val)
        i = len(self.heap) - 1
        while i > 1 and self.heap[i] < self.heap[i // 2]:
            self.heap[i], self.heap[i // 2] = self.heap[i // 2], self.heap[i]
            i //= 2

    def peek_min(self):
        pass


def run_peek_min(values):
    h = MinHeap()
    for v in values:
        h.insert(v)
    return h.peek_min()
`,
    'function',
    funcCases(
      'run_peek_min',
      [
        { id: 's1', description: 'Peek after inserts', args: [[5, 3, 8, 1, 4]], expectedReturn: 1 },
        { id: 's2', description: 'Empty heap', args: [[]], expectedReturn: null },
      ],
      [
        { id: 'h1', args: [[9, 2, 7]], expectedReturn: 2 },
      ]
    ),
    ms(
      `    def peek_min(self):
        if len(self.heap) <= 1:
            return None
        return self.heap[1]`,
      'Root at index 1 always holds the minimum in a min-heap.'
    )
  ),
  cr(
    'm10-c3',
    'Add `extract_min()` removing and returning the minimum. Move the last element to the root and percolate down.\n\nThe starter includes `run_extract_min` — **do not edit it**.',
    `class MinHeap:
    def __init__(self):
        self.heap = [0]

    def insert(self, val):
        self.heap.append(val)
        i = len(self.heap) - 1
        while i > 1 and self.heap[i] < self.heap[i // 2]:
            self.heap[i], self.heap[i // 2] = self.heap[i // 2], self.heap[i]
            i //= 2

    def extract_min(self):
        pass


def run_extract_min(values):
    h = MinHeap()
    for v in values:
        h.insert(v)
    first = h.extract_min()
    second = h.extract_min()
    return [first, second, h.heap[1:]]
`,
    'function',
    funcCases(
      'run_extract_min',
      [
        {
          id: 's1',
          description: 'Two extracts',
          args: [[5, 3, 8, 1, 4]],
          expectedReturn: [1, 3, [4, 5, 8]],
        },
      ],
      [
        {
          id: 'h1',
          args: [[7, 2, 9]],
          expectedReturn: [2, 7, [9]],
        },
      ]
    ),
    ms(
      `    def extract_min(self):
        if len(self.heap) <= 1:
            return None
        result = self.heap[1]
        self.heap[1] = self.heap[-1]
        self.heap.pop()
        i = 1
        while True:
            left = 2 * i
            right = 2 * i + 1
            smallest = i
            if left < len(self.heap) and self.heap[left] < self.heap[smallest]:
                smallest = left
            if right < len(self.heap) and self.heap[right] < self.heap[smallest]:
                smallest = right
            if smallest == i:
                break
            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
            i = smallest
        return result`,
      'Replace root with last element, then percolate down via smaller child swaps.'
    )
  ),
  cr(
    'm10-c4',
    'Add `size()` returning the number of elements in the heap.\n\nThe starter includes `run_heap_size` — **do not edit it**.',
    `class MinHeap:
    def __init__(self):
        self.heap = [0]

    def insert(self, val):
        self.heap.append(val)
        i = len(self.heap) - 1
        while i > 1 and self.heap[i] < self.heap[i // 2]:
            self.heap[i], self.heap[i // 2] = self.heap[i // 2], self.heap[i]
            i //= 2

    def size(self):
        pass


def run_heap_size(values):
    h = MinHeap()
    for v in values:
        h.insert(v)
    return h.size()
`,
    'function',
    funcCases(
      'run_heap_size',
      [
        { id: 's1', description: 'Five inserts', args: [[5, 3, 8, 1, 4]], expectedReturn: 5 },
        { id: 's2', description: 'Empty', args: [[]], expectedReturn: 0 },
      ],
      [
        { id: 'h1', args: [[1]], expectedReturn: 1 },
      ]
    ),
    ms(
      `    def size(self):
        return len(self.heap) - 1`,
      'Index 0 is unused — subtract 1 from list length.'
    )
  ),
  cr(
    'm10-c5',
    'Combine `insert`, `peek_min`, `extract_min`, and `size` on `MinHeap`.\n\nThe starter includes `run_heap_ops` — **do not edit it**.',
    `class MinHeap:
    def __init__(self):
        self.heap = [0]

    def insert(self, val):
        pass

    def peek_min(self):
        pass

    def extract_min(self):
        pass

    def size(self):
        pass


def run_heap_ops(ops):
    h = MinHeap()
    results = []
    for op in ops:
        kind = op[0]
        if kind == "insert":
            h.insert(op[1])
        elif kind == "peek":
            results.append(h.peek_min())
        elif kind == "extract":
            results.append(h.extract_min())
        elif kind == "size":
            results.append(h.size())
    return results
`,
    'function',
    funcCases(
      'run_heap_ops',
      [
        {
          id: 's1',
          description: 'Mixed operations',
          args: [
            [
              ['insert', 5],
              ['insert', 3],
              ['insert', 8],
              ['peek'],
              ['extract'],
              ['size'],
            ],
          ],
          expectedReturn: [3, 3, 2],
        },
      ],
      [
        {
          id: 'h1',
          args: [[['insert', 1], ['insert', 2], ['extract'], ['extract']]],
          expectedReturn: [1, 2],
        },
      ]
    ),
    ms(
      `class MinHeap:
    def __init__(self):
        self.heap = [0]

    def insert(self, val):
        self.heap.append(val)
        i = len(self.heap) - 1
        while i > 1 and self.heap[i] < self.heap[i // 2]:
            self.heap[i], self.heap[i // 2] = self.heap[i // 2], self.heap[i]
            i //= 2

    def peek_min(self):
        if len(self.heap) <= 1:
            return None
        return self.heap[1]

    def extract_min(self):
        if len(self.heap) <= 1:
            return None
        result = self.heap[1]
        self.heap[1] = self.heap[-1]
        self.heap.pop()
        i = 1
        while True:
            left, right = 2 * i, 2 * i + 1
            smallest = i
            if left < len(self.heap) and self.heap[left] < self.heap[smallest]:
                smallest = left
            if right < len(self.heap) and self.heap[right] < self.heap[smallest]:
                smallest = right
            if smallest == i:
                break
            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
            i = smallest
        return result

    def size(self):
        return len(self.heap) - 1`,
      'Full min-heap API — insert/peek O(1) root access, extract O(log n).'
    )
  ),
  cr(
    'm10-c6',
    'Write `heapify(lst)` that returns a **new** valid min-heap list (1-indexed: prepend `0` as unused slot, or use 0-based — return the heap array with smallest at index 0).\n\nReturn a 0-based min-heap list where `result[0]` is the minimum.',
    'def heapify(lst):\n    # Build a min-heap from lst; return heap as a list with smallest at index 0\n    pass\n',
    'function',
    funcCases(
      'heapify',
      [
        { id: 's1', description: 'Unsorted input', args: [[5, 3, 8, 1, 4]], expectedReturn: [1, 3, 8, 5, 4] },
        { id: 's2', description: 'Already sorted', args: [[1, 2, 3]], expectedReturn: [1, 2, 3] },
      ],
      [
        { id: 'h1', args: [[]], expectedReturn: [] },
        { id: 'h2', args: [[7]], expectedReturn: [7] },
      ]
    ),
    ms(
      'def heapify(lst):\n    heap = lst[:]\n    n = len(heap)\n\n    def perc_down(i):\n        while True:\n            left = 2 * i + 1\n            right = 2 * i + 2\n            smallest = i\n            if left < n and heap[left] < heap[smallest]:\n                smallest = left\n            if right < n and heap[right] < heap[smallest]:\n                smallest = right\n            if smallest == i:\n                break\n            heap[i], heap[smallest] = heap[smallest], heap[i]\n            i = smallest\n\n    for i in range(n // 2 - 1, -1, -1):\n        perc_down(i)\n    return heap',
      'Floyd\'s build: perc_down from the last non-leaf up — O(n) total.'
    )
  ),
  mc(
    'q10-1',
    'What does a min-priority queue\'s delete_min() operation return?',
    [
      { id: 'a', text: 'The most recently inserted element' },
      { id: 'b', text: 'A random element' },
      { id: 'c', text: 'The element with the smallest priority value' },
      { id: 'd', text: 'The element with the largest priority value' },
    ],
    'c',
    'delete_min removes the smallest priority — the root of a min-heap.'
  ),
  tf(
    'q10-2',
    'In a min-heap, the root node always holds the minimum value.',
    'true',
    'Min-heap property: every parent ≤ its children, so the root is global minimum.'
  ),
  fib(
    'q10-4',
    'In a binary heap stored as a list with root at index 1, the left child of the node at index 3 is at index ___',
    '6',
    'Left child at 2*i — for i=3, left is at 6.'
  ),
  tf(
    'q10-6',
    'When delete_min() is called on a heap, the root is simply removed and its smaller child becomes the new root.',
    'false',
    'The last element moves to the root, then percolates down — not a direct child promotion.'
  ),
  mc(
    'q10-7',
    'In a MIN-heap, the smallest element is always located at:',
    [
      { id: 'a', text: 'A leaf node' },
      { id: 'b', text: 'The root' },
      { id: 'c', text: 'The rightmost node' },
      { id: 'd', text: 'It varies — you must search' },
    ],
    'b',
    'The min-heap property guarantees every parent ≤ its children, so the overall minimum sits at the root — peek is O(1).'
  ),
  mc(
    'q10-8',
    'A priority queue differs from a regular FIFO queue because:',
    [
      { id: 'a', text: 'It removes items in insertion order' },
      { id: 'b', text: 'It removes the highest-priority item next, regardless of insertion order' },
      { id: 'c', text: 'It can only hold numbers' },
      { id: 'd', text: 'It has no remove operation' },
    ],
    'b',
    'A priority queue serves items by priority (e.g. smallest key first), not by arrival order — heaps implement it efficiently.'
  ),
  mc(
    'q10-9',
    'A binary heap is stored in a flat array. For a node at index `i` (0-based), its children are at:',
    [
      { id: 'a', text: 'i+1 and i+2' },
      { id: 'b', text: '2i and 2i+1' },
      { id: 'c', text: '2i+1 and 2i+2' },
      { id: 'd', text: 'i/2 and i/2+1' },
    ],
    'c',
    'With 0-based indexing, children are at 2i+1 and 2i+2, and a node’s parent is at (i-1)//2 — no pointers needed.'
  ),
  mc(
    'q10-10',
    'Inserting into a binary heap of n elements is which complexity?',
    [
      { id: 'a', text: 'O(1)' },
      { id: 'b', text: 'O(log n)' },
      { id: 'c', text: 'O(n)' },
      { id: 'd', text: 'O(n log n)' },
    ],
    'b',
    'Append at the end, then "bubble up" swapping with the parent while smaller — at most the tree height, O(log n).'
  ),
  tf(
    'q10-11',
    'A binary heap is always a COMPLETE binary tree — every level is full except possibly the last, which fills left to right.',
    'true',
    'This completeness is what lets a heap be stored compactly in an array with index arithmetic for parent/child.'
  ),
  fib(
    'q10-12',
    'The heap operation that returns the minimum WITHOUT removing it is called ___ (one word).',
    'peek',
    'peek (or peek_min) reads the root in O(1); extract_min/delete_min removes it.'
  ),
];
