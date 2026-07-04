import type { Module } from './types';
import { module10Questions } from './questions/module10Questions';


const module10: Module = {
  id: 'module-10',
  slug: '10',
  title: 'Priority Queues & Heaps',
  description: 'Process elements by priority using the binary heap — the most efficient priority queue implementation.',
  icon: '⬆️',
  color: 'from-teal-500 to-green-400',
  locked: true,
  lessons: [
    {
      id: 'lesson-10-1',
      title: 'Priority Queue ADT',
      content: `A **priority queue** is like a regular queue, but instead of "first in, first out", the element with the **highest priority** is always dequeued next. This makes priority queues essential for problems where you need to repeatedly find and process the "most important" or "smallest" item from a collection.

The two core operations are **insert(item, priority)** — add an item with a given priority — and **delete_min()** or **delete_max()** — remove and return the highest-priority item. (Min-priority queues return the smallest; max-priority queues return the largest.) Applications are everywhere: **CPU scheduling** (which process runs next?), **Dijkstra's shortest-path algorithm** (which unvisited node has the smallest known distance?), **event simulation** (which event happens soonest?), and **Huffman coding** (which two trees have the smallest frequency?).

Naive implementations reveal the trade-offs clearly. A **sorted list** makes delete_min O(1) (just take from the front) but insert O(n) because you must find the right position. An **unsorted list** makes insert O(1) but delete_min O(n) because you must scan all elements to find the minimum. Neither is optimal for workloads that mix many inserts and many deletes.

The **binary heap** solves this elegantly: both insert and delete_min are **O(log n)**. This is a huge practical improvement — for a priority queue with a million items, log₂(1,000,000) ≈ 20 comparisons is vastly better than 1,000,000.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Naive priority queue using a sorted list
class NaivePQ:
    def __init__(self):
        self.items = []

    def insert(self, priority, value):
        self.items.append((priority, value))
        self.items.sort(key=lambda x: x[0])   # O(n log n) to resort

    def delete_min(self):
        if not self.items:
            return None
        return self.items.pop(0)               # O(n) to shift

pq = NaivePQ()
pq.insert(3, "low priority task")
pq.insert(1, "urgent task")
pq.insert(2, "medium priority task")

print(pq.delete_min())   # (1, 'urgent task')
print(pq.delete_min())   # (2, 'medium priority task')`,
          caption: 'Naive sorted-list priority queue: easy to understand but O(n log n) insert and O(n) delete',
          editable: true,
        },
        {
          language: 'python',
          code: `# Real-world application: task scheduler
# CPU scheduling: always run the highest-priority ready task

tasks = [
    (5, "background sync"),
    (1, "user keystroke"),
    (2, "network response"),
    (1, "mouse click"),
    (3, "animation frame"),
]

# Sort by priority to simulate scheduling order
tasks.sort(key=lambda t: t[0])  # lower number = higher priority
print("Execution order:")
for priority, name in tasks:
    print(f"  [{priority}] {name}")

# Key insight: we need this ordering efficiently — not just once
# If tasks arrive dynamically, we can't re-sort every time
# That's why we need a heap`,
          caption: 'Task scheduling by priority — dynamic insertion requires O(log n) updates, not full re-sorting',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-10-2',
      title: 'Binary Heap Structure',
      content: `A **binary heap** is a binary tree with two key properties. First, it's a **complete binary tree**: every level is completely filled except possibly the last, which is filled from left to right. This completeness property keeps the tree's height at O(log n), guaranteeing efficient operations. Second, it satisfies the **heap property**: in a **min-heap**, every parent is less than or equal to both of its children. This means the minimum element is always at the root — accessible in O(1).

The magic of heaps is that a complete binary tree can be stored **perfectly efficiently in a plain array**. We place the root at index 1 (not 0, to simplify the index math). For any node at index \`i\`: its **left child** is at index \`2*i\`, its **right child** is at index \`2*i + 1\`, and its **parent** is at index \`i // 2\`. This means no pointers are needed — the parent-child relationships are encoded implicitly by the index arithmetic. Starting at index 1 (leaving index 0 unused as a placeholder) makes the math work out cleanly.

**Insert** adds the new value at the end of the array (the next available leaf position) and then **percolates up** (also called "sift up" or "bubble up"): while the new element is smaller than its parent, swap them. This restores the heap property while moving upward. At most O(log n) swaps are needed because the tree's height is O(log n).

**delete_min** removes the root (the minimum). To avoid creating a hole, we move the **last element** to the root position and then **percolate down** (sift down): compare the element with its smaller child, and if it's larger, swap them. Continue until the heap property is restored. Again, at most O(log n) swaps.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Heap stored as a list — index 0 unused (placeholder)
# Node at i: left child 2*i, right child 2*i+1, parent i//2

heap = [0, 4, 8, 6, 9, 10, 14]
#  idx:  0  1  2  3   4   5   6

#        4         <- root at index 1
#       / \\
#      8   6       <- indices 2, 3
#     / \\ /
#    9 10 14       <- indices 4, 5, 6

def get_parent(i): return i // 2
def get_left(i):   return 2 * i
def get_right(i):  return 2 * i + 1

# Verify the min-heap property at index 2 (node 8)
i = 2
print(f"Node at {i}: {heap[i]}")
print(f"  Left child (idx {get_left(i)}): {heap[get_left(i)]}")
print(f"  Right child (idx {get_right(i)}): {heap[get_right(i)]}")
print(f"  Parent (idx {get_parent(i)}): {heap[get_parent(i)]}")
print(f"  8 >= parent 4: {heap[i] >= heap[get_parent(i)]}")  # True`,
          caption: 'Heap as array: no pointers needed — parent/child positions are pure arithmetic',
          editable: true,
        },
        {
          language: 'python',
          code: `# Tracing insert and percolate-up

heap = [0, 4, 8, 6, 9, 10, 14]   # valid min-heap
print("Initial heap:", heap[1:])

# Insert value 2 — first, add to end
heap.append(2)
print("After append:", heap[1:])  # 2 is at index 7

# Percolate up: compare with parent, swap if smaller
i = len(heap) - 1
steps = 0
while i > 1 and heap[i] < heap[i // 2]:
    parent = i // 2
    print(f"  Step {steps+1}: heap[{i}]={heap[i]} < heap[{parent}]={heap[parent]}, swap")
    heap[i], heap[i // 2] = heap[i // 2], heap[i]
    i = parent
    steps += 1

print("After percolate-up:", heap[1:])
print(f"Root (minimum): {heap[1]}")   # should be 2`,
          caption: 'Percolate-up after insert: the new node bubbles up until heap order is restored',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-10-3',
      title: 'Heap Implementation',
      content: `Now we'll build a complete \`PriorityQueue\` class backed by a binary min-heap. The list is initialized with \`[0]\` as a placeholder at index 0, so the actual heap starts at index 1. We also track the current size separately.

**perc_up()** implements the percolate-up logic: while the newly inserted element at index \`i\` is smaller than its parent at \`i // 2\`, swap them and move \`i\` up. This runs at most O(log n) times. **perc_down()** is the mirror image: starting at the root (or any node), find the smaller of the left and right children, and if the current node is larger, swap down to the smaller child. Repeat until the heap property holds or we reach a leaf.

**build_heap()** is a surprisingly efficient operation. Rather than inserting n elements one by one (which would take O(n log n)), you can place all elements into the array in any order, then call perc_down() on each non-leaf node from the middle down to the root. This **Floyd's algorithm** builds a valid heap in **O(n) time** — a non-obvious result that's important in algorithms like heapsort.

Python's standard library provides \`heapq\`, a highly optimized heap implementation. \`heapq.heappush(heap, item)\` inserts an item, and \`heapq.heappop(heap)\` removes and returns the minimum. \`heapq.heapify(lst)\` converts a list to a heap in-place in O(n). The heapq module always implements a **min-heap** — for a max-heap, negate your values when inserting.`,
      codeExamples: [
        {
          language: 'python',
          code: `class PriorityQueue:
    def __init__(self):
        self.heap = [0]        # index 0 is unused placeholder

    def __len__(self):
        return len(self.heap) - 1

    def insert(self, val):
        self.heap.append(val)
        self._perc_up(len(self.heap) - 1)

    def delete_min(self):
        if len(self.heap) <= 1:
            return None
        min_val = self.heap[1]
        self.heap[1] = self.heap[-1]   # move last to root
        self.heap.pop()
        self._perc_down(1)
        return min_val

    def _perc_up(self, i):
        while i > 1 and self.heap[i] < self.heap[i // 2]:
            self.heap[i], self.heap[i // 2] = self.heap[i // 2], self.heap[i]
            i //= 2

    def _perc_down(self, i):
        while 2 * i < len(self.heap):
            mc = self._min_child(i)
            if self.heap[i] > self.heap[mc]:
                self.heap[i], self.heap[mc] = self.heap[mc], self.heap[i]
            i = mc

    def _min_child(self, i):
        if 2 * i + 1 >= len(self.heap):
            return 2 * i
        return 2 * i if self.heap[2*i] < self.heap[2*i+1] else 2*i+1

pq = PriorityQueue()
for v in [9, 5, 11, 14, 18, 19, 21, 33, 17, 27]:
    pq.insert(v)
print("Heap:", pq.heap[1:])
print("Mins:", [pq.delete_min() for _ in range(5)])`,
          caption: 'Full PriorityQueue class: insert uses perc_up, delete_min uses perc_down',
          editable: true,
        },
        {
          language: 'python',
          code: `import heapq

# Python's built-in heapq — always a min-heap
heap = []
for val in [5, 3, 8, 1, 9, 2, 7, 4, 6]:
    heapq.heappush(heap, val)

print("Heap array:", heap)
print("Pop in order:", [heapq.heappop(heap) for _ in range(len(heap) + 1) if heap])

# heapify: convert a list to a heap in O(n)
data = [12, 3, 7, 1, 9, 5]
heapq.heapify(data)
print("Heapified:", data)
print("Min:", data[0])          # always at index 0 in heapq

# Max-heap trick: negate values
max_heap = []
for val in [5, 3, 8, 1, 9]:
    heapq.heappush(max_heap, -val)  # store negatives
print("Max-heap pops:", [-heapq.heappop(max_heap) for _ in range(len(max_heap) + 1) if max_heap])

# heapq.nsmallest and nlargest
nums = [7, 1, 5, 3, 9, 2, 8, 4, 6]
print("3 smallest:", heapq.nsmallest(3, nums))
print("3 largest:",  heapq.nlargest(3, nums))`,
          caption: 'Python\'s heapq module: always min-heap, negate values for max-heap, heapify in O(n)',
          editable: true,
        },
      ],
    },
  ],
  questions: module10Questions,
};

export default module10;
