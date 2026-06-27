import type { Question } from '../../python101/types';
import { cr, mc, tf, fib, funcCases, ms } from '../authoring';

const NODE_CLASS = `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

`;

export const module6Questions: Question[] = [
  cr(
    'm6-c1',
    'Implement `Node` and `LinkedList` with `add(item)` (insert at front), `size()`, and `search(item)` returning a bool.\n\nThe starter includes `run_ll_basic` — **do not edit it**.',
    `${NODE_CLASS}class LinkedList:
    def __init__(self):
        self.head = None

    def add(self, item):
        pass

    def size(self):
        pass

    def search(self, item):
        pass


def run_ll_basic(add_values, search_value):
    ll = LinkedList()
    for v in add_values:
        ll.add(v)
    return [ll.size(), ll.search(search_value)]
`,
    'function',
    funcCases(
      'run_ll_basic',
      [
        {
          id: 's1',
          description: 'Add 10, 20, 30 then search 20',
          args: [[10, 20, 30], 20],
          expectedReturn: [3, true],
        },
        {
          id: 's2',
          description: 'Missing value',
          args: [[10, 20, 30], 99],
          expectedReturn: [3, false],
        },
      ],
      [
        { id: 'h1', args: [[], 1], expectedReturn: [0, false] },
        { id: 'h2', args: [[5], 5], expectedReturn: [1, true] },
        { id: 'h3', args: [[1, 2, 3], 1], expectedReturn: [3, true] },
      ]
    ),
    ms(
      `${NODE_CLASS}class LinkedList:
    def __init__(self):
        self.head = None

    def add(self, item):
        node = Node(item)
        node.next = self.head
        self.head = node

    def size(self):
        count = 0
        current = self.head
        while current:
            count += 1
            current = current.next
        return count

    def search(self, item):
        current = self.head
        while current:
            if current.data == item:
                return True
            current = current.next
        return False`,
      'add prepends a new node; size and search traverse from head.'
    )
  ),
  cr(
    'm6-c2',
    'Extend `LinkedList` with `append(item)` (add to end) and `to_list()` returning values head-to-tail.\n\nThe starter includes `run_ll_append` — **do not edit it**.',
    `${NODE_CLASS}class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, item):
        pass

    def to_list(self):
        pass


def run_ll_append(values):
    ll = LinkedList()
    for v in values:
        ll.append(v)
    return ll.to_list()
`,
    'function',
    funcCases(
      'run_ll_append',
      [
        { id: 's1', description: '1..5', args: [[1, 2, 3, 4, 5]], expectedReturn: [1, 2, 3, 4, 5] },
        { id: 's2', description: 'Empty', args: [[]], expectedReturn: [] },
      ],
      [
        { id: 'h1', args: [[7]], expectedReturn: [7] },
        { id: 'h2', args: [[3, 3, 1]], expectedReturn: [3, 3, 1] },
      ]
    ),
    ms(
      `${NODE_CLASS}class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, item):
        node = Node(item)
        if self.head is None:
            self.head = node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = node

    def to_list(self):
        result = []
        current = self.head
        while current:
            result.append(current.data)
            current = current.next
        return result`,
      'append walks to the tail; to_list collects data during traversal.'
    )
  ),
  cr(
    'm6-c3',
    'Write `count_nodes(head)` that returns how many nodes are in the chain starting at `head`.\n\nThe starter includes `build_chain` — **do not edit it**.',
    `${NODE_CLASS}def count_nodes(head):
    pass


def build_chain(values):
    if not values:
        return None
    head = Node(values[0])
    current = head
    for v in values[1:]:
        current.next = Node(v)
        current = current.next
    return count_nodes(head)
`,
    'function',
    funcCases(
      'build_chain',
      [
        { id: 's1', description: 'Four nodes', args: [[1, 2, 3, 4]], expectedReturn: 4 },
        { id: 's2', description: 'Empty', args: [[]], expectedReturn: 0 },
      ],
      [
        { id: 'h1', args: [[10]], expectedReturn: 1 },
        { id: 'h2', args: [[1, 2, 3]], expectedReturn: 3 },
      ]
    ),
    ms(
      `${NODE_CLASS}def count_nodes(head):
    count = 0
    current = head
    while current:
        count += 1
        current = current.next
    return count`,
      'Walk the chain until current is None, incrementing a counter.'
    )
  ),
  cr(
    'm6-c4',
    'Write `reverse_list(head)` that reverses a singly linked list **in place** and returns the new head.\n\nThe starter includes `run_reverse` — **do not edit it**.',
    `${NODE_CLASS}def reverse_list(head):
    pass


def run_reverse(values):
    if not values:
        return None
    head = Node(values[0])
    current = head
    for v in values[1:]:
        n = Node(v)
        current.next = n
        current = n
    new_head = reverse_list(head)
    result = []
    while new_head:
        result.append(new_head.data)
        new_head = new_head.next
    return result
`,
    'function',
    funcCases(
      'run_reverse',
      [
        { id: 's1', description: '1→2→3', args: [[1, 2, 3]], expectedReturn: [3, 2, 1] },
        { id: 's2', description: 'Single node', args: [[5]], expectedReturn: [5] },
      ],
      [
        { id: 'h1', args: [[]], expectedReturn: null },
        { id: 'h2', args: [[1, 2]], expectedReturn: [2, 1] },
      ]
    ),
    ms(
      `${NODE_CLASS}def reverse_list(head):
    prev = None
    current = head
    while current:
        nxt = current.next
        current.next = prev
        prev = current
        current = nxt
    return prev`,
      'Three-pointer in-place reversal: prev, current, next.'
    )
  ),
  cr(
    'm6-c5',
    'Write `find_middle(head)` returning the **data value** at the middle node. For even length, return the second middle value.\n\nThe starter includes `run_middle` — **do not edit it**.',
    `${NODE_CLASS}def find_middle(head):
    pass


def run_middle(values):
    if not values:
        return None
    head = Node(values[0])
    current = head
    for v in values[1:]:
        n = Node(v)
        current.next = n
        current = n
    return find_middle(head)
`,
    'function',
    funcCases(
      'run_middle',
      [
        { id: 's1', description: 'Odd length', args: [[1, 2, 3, 4, 5]], expectedReturn: 3 },
        { id: 's2', description: 'Even length', args: [[1, 2, 3, 4]], expectedReturn: 3 },
      ],
      [
        { id: 'h1', args: [[10]], expectedReturn: 10 },
        { id: 'h2', args: [[1, 2]], expectedReturn: 2 },
      ]
    ),
    ms(
      `${NODE_CLASS}def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow.data`,
      'Slow/fast pointers: when fast reaches the end, slow is at the middle.'
    )
  ),
  cr(
    'm6-c6',
    'Implement `LinkedList.remove(item)` removing the **first** occurrence (raise `ValueError` if not found).\n\nThe starter includes `run_remove` — **do not edit it**.',
    `${NODE_CLASS}class LinkedList:
    def __init__(self):
        self.head = None

    def add(self, item):
        node = Node(item)
        node.next = self.head
        self.head = node

    def remove(self, item):
        pass

    def to_list(self):
        result = []
        current = self.head
        while current:
            result.append(current.data)
            current = current.next
        return result


def run_remove(values, target):
    ll = LinkedList()
    for v in values:
        ll.add(v)
    try:
        ll.remove(target)
        return ll.to_list()
    except ValueError:
        return "error"
`,
    'function',
    funcCases(
      'run_remove',
      [
        {
          id: 's1',
          description: 'Remove middle value',
          args: [[5, 10, 15, 20], 15],
          expectedReturn: [20, 10, 5],
        },
        {
          id: 's2',
          description: 'Not found',
          args: [[1, 2, 3], 9],
          expectedReturn: 'error',
        },
      ],
      [
        { id: 'h1', args: [[7, 7, 7], 7], expectedReturn: [7, 7] },
        { id: 'h2', args: [[3], 3], expectedReturn: [] },
      ]
    ),
    ms(
      `${NODE_CLASS}class LinkedList:
    def __init__(self):
        self.head = None

    def add(self, item):
        node = Node(item)
        node.next = self.head
        self.head = node

    def remove(self, item):
        if self.head is None:
            raise ValueError("not found")
        if self.head.data == item:
            self.head = self.head.next
            return
        prev = self.head
        current = self.head.next
        while current:
            if current.data == item:
                prev.next = current.next
                return
            prev = current
            current = current.next
        raise ValueError("not found")`,
      'Two-pointer remove: handle head separately, then walk prev/current.'
    )
  ),
  cr(
    'm6-c7',
    'Write `contains(head, target)` returning `True` if `target` appears anywhere in the list.\n\nThe starter includes `run_contains` — **do not edit it**.',
    `${NODE_CLASS}def contains(head, target):
    pass


def run_contains(values, target):
    if not values:
        return contains(None, target)
    head = Node(values[0])
    current = head
    for v in values[1:]:
        n = Node(v)
        current.next = n
        current = n
    return contains(head, target)
`,
    'function',
    funcCases(
      'run_contains',
      [
        { id: 's1', description: 'Found', args: [[5, 10, 15, 20], 15], expectedReturn: true },
        { id: 's2', description: 'Not found', args: [[5, 10, 15, 20], 99], expectedReturn: false },
      ],
      [
        { id: 'h1', args: [[], 1], expectedReturn: false },
        { id: 'h2', args: [[1, 2, 3], 1], expectedReturn: true },
      ]
    ),
    ms(
      `${NODE_CLASS}def contains(head, target):
    current = head
    while current:
        if current.data == target:
            return True
        current = current.next
    return False`,
      'Linear scan comparing each node\'s data to target.'
    )
  ),
  mc(
    'q6-1',
    'What does each Node in a linked list store?',
    [
      { id: 'a', text: 'Only data' },
      { id: 'b', text: 'An index and data' },
      { id: 'c', text: 'Data and a reference to the next node' },
      { id: 'd', text: 'Data and references to both neighbors' },
    ],
    'c',
    'Each node stores data plus a next pointer; the last node\'s next is None.'
  ),
  tf(
    'q6-2',
    'Inserting at the front of a linked list is O(1) — faster than inserting at the front of a Python list.',
    'true',
    'Front insertion updates only head — O(1) vs O(n) for list.insert(0).'
  ),
  mc(
    'q6-3',
    'What attribute of the LinkedList class keeps track of the first node?',
    [
      { id: 'a', text: 'self.first' },
      { id: 'b', text: 'self.start' },
      { id: 'c', text: 'self.head' },
      { id: 'd', text: 'self.root' },
    ],
    'c',
    'self.head points to the first node; traversal follows .next pointers.'
  ),
  fib(
    'q6-5',
    'The last node in a linked list has its .next attribute set to ___',
    'None',
    'None marks the end of the chain — the traversal stop condition.'
  ),
  mc(
    'q6-7',
    'What two pieces of information does a singly linked-list `Node` hold?',
    [
      { id: 'a', text: 'A value and an index number' },
      { id: 'b', text: 'A value (data) and a reference to the next node' },
      { id: 'c', text: 'A value and a reference to the previous node' },
      { id: 'd', text: 'Two values' },
    ],
    'b',
    'Each node stores its data plus a `.next` pointer to the following node; the chain of next-pointers links the list.'
  ),
  mc(
    'q6-8',
    'Adding a new node at the FRONT of a linked list (given the head) is which complexity?',
    [
      { id: 'a', text: 'O(1)' },
      { id: 'b', text: 'O(n)' },
      { id: 'c', text: 'O(log n)' },
      { id: 'd', text: 'O(n²)' },
    ],
    'a',
    'Point the new node’s next at the old head, then move head — constant work, no traversal.'
  ),
  mc(
    'q6-9',
    'Why is finding the element at "index k" in a linked list O(n), unlike a Python list?',
    [
      { id: 'a', text: 'Linked lists store elements out of order' },
      { id: 'b', text: 'You must follow next-pointers one node at a time from the head' },
      { id: 'c', text: 'Linked lists cannot be indexed at all' },
      { id: 'd', text: 'It requires sorting first' },
    ],
    'b',
    'There is no contiguous memory/offset; reaching position k means walking k links from the head.'
  ),
  tf(
    'q6-10',
    'To traverse a linked list you typically start at the head and follow `.next` until you reach `None`.',
    'true',
    'A `current` pointer starts at head and advances via `current = current.next` until it becomes None.'
  ),
  mc(
    'q6-11',
    'When removing a node from the middle of a singly linked list, what must you update?',
    [
      { id: 'a', text: 'The removed node’s data' },
      { id: 'b', text: 'The PREVIOUS node’s `.next` to skip over the removed node' },
      { id: 'c', text: 'Only the head pointer' },
      { id: 'd', text: 'Nothing — Python removes it automatically' },
    ],
    'b',
    'Set previous.next = current.next so the chain bypasses the removed node; it then becomes unreachable and is garbage-collected.'
  ),
];
