import type { Module } from './types';
import { cr, mc, tf, funcCases, ms } from './authoring';

const NODE_CLASS = `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

`;

const test6: Module = {
  id: 'test-6',
  slug: 'test-6',
  title: 'Module 6 Test — Linked Lists',
  description:
    'Transfer-level practice: reverse a chain, remove all matching values, and find the nth node from the end.',
  icon: '📝',
  color: 'from-cyan-500 to-sky-400',
  locked: true,
  isMidterm: true,
  lessons: [],
  questions: [
    cr(
      't6-q1',
      `Implement \`reverse_chain(head)\` returning the new head after **reversing** a singly linked list in-place.\n\nUse the provided \`Node\` class. Return \`null\` for an empty list.\n\nThe starter includes \`run_reverse_chain\` — **do not edit it**.`,
      `${NODE_CLASS}def reverse_chain(head):
    pass


def run_reverse_chain(values):
    head = None
    for v in reversed(values):
        node = Node(v)
        node.next = head
        head = node
    new_head = reverse_chain(head)
    out = []
    cur = new_head
    while cur:
        out.append(cur.data)
        cur = cur.next
    return out
`,
      'function',
      funcCases(
        'run_reverse_chain',
        [
          { id: 's1', description: 'Reverse 1→2→3', args: [[1, 2, 3]], expectedReturn: [3, 2, 1] },
          { id: 's2', description: 'Empty', args: [[]], expectedReturn: [] },
        ],
        [
          { id: 'h1', args: [[5]], expectedReturn: [5] },
          { id: 'h2', args: [[1, 2]], expectedReturn: [2, 1] },
          { id: 'h3', args: [[1, 1, 2]], expectedReturn: [2, 1, 1] },
        ]
      ),
      ms(
        `${NODE_CLASS}def reverse_chain(head):
    prev = None
    cur = head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev`,
        'Iterative reversal rewires next pointers: prev walks backward, cur forward. O(n) time, O(1) extra space — the classic linked-list interview pattern.'
      )
    ),

    cr(
      't6-q2',
      `Implement \`remove_value(head, val)\` returning the head after removing **every** node whose \`data == val\`.\n\nThe starter includes \`run_remove_value\` — **do not edit it**.`,
      `${NODE_CLASS}def remove_value(head, val):
    pass


def run_remove_value(values, val):
    head = None
    for v in reversed(values):
        node = Node(v)
        node.next = head
        head = node
    new_head = remove_value(head, val)
    out = []
    cur = new_head
    while cur:
        out.append(cur.data)
        cur = cur.next
    return out
`,
      'function',
      funcCases(
        'run_remove_value',
        [
          { id: 's1', description: 'Remove middle 2s', args: [[1, 2, 2, 3], 2], expectedReturn: [1, 3] },
          { id: 's2', description: 'Remove all', args: [[5, 5], 5], expectedReturn: [] },
        ],
        [
          { id: 'h1', args: [[1, 2, 3], 9], expectedReturn: [1, 2, 3] },
          { id: 'h2', args: [[2, 1, 2, 2], 2], expectedReturn: [1] },
          { id: 'h3', args: [[], 1], expectedReturn: [] },
        ]
      ),
      ms(
        `${NODE_CLASS}def remove_value(head, val):
    dummy = Node(0)
    dummy.next = head
    prev = dummy
    cur = head
    while cur:
        if cur.data == val:
            prev.next = cur.next
        else:
            prev = cur
        cur = cur.next
    return dummy.next`,
        'A dummy head simplifies removing the first node. Only advance prev when the current node is kept; skip nodes that match val.'
      )
    ),

    cr(
      't6-q3',
      `Implement \`nth_from_end(head, n)\` returning the **data** of the node that is \`n\` positions from the end (\`n=1\` is the last node). Return \`null\` if \`n\` is larger than the list length.\n\nUse the two-pointer technique.\n\nThe starter includes \`run_nth_from_end\` — **do not edit it**.`,
      `${NODE_CLASS}def nth_from_end(head, n):
    pass


def run_nth_from_end(values, n):
    head = None
    for v in reversed(values):
        node = Node(v)
        node.next = head
        head = node
    return nth_from_end(head, n)
`,
      'function',
      funcCases(
        'run_nth_from_end',
        [
          { id: 's1', description: '2nd from end of 1→2→3→4', args: [[1, 2, 3, 4], 2], expectedReturn: 3 },
          { id: 's2', description: 'Last node', args: [[10, 20], 1], expectedReturn: 20 },
        ],
        [
          { id: 'h1', args: [[5], 1], expectedReturn: 5 },
          { id: 'h2', args: [[1, 2, 3], 5], expectedReturn: null },
          { id: 'h3', args: [[1, 2, 3, 4, 5], 5], expectedReturn: 1 },
        ]
      ),
      ms(
        `${NODE_CLASS}def nth_from_end(head, n):
    fast = head
    for _ in range(n):
        if fast is None:
            return None
        fast = fast.next
    slow = head
    while fast:
        fast = fast.next
        slow = slow.next
    return slow.data if slow else None`,
        'Advance fast n steps ahead; then move both until fast hits the end — slow is n behind. If fast runs off early, n exceeds the length.'
      )
    ),

    cr(
      't6-q4',
      `Implement \`list_length(head)\` returning the number of nodes. The starter includes \`run_list_length\` — **do not edit it**.`,
      `${NODE_CLASS}def list_length(head):
    pass


def run_list_length(values):
    head = None
    for v in reversed(values):
        node = Node(v)
        node.next = head
        head = node
    return list_length(head)
`,
      'function',
      funcCases(
        'run_list_length',
        [
          { id: 's1', description: 'Three nodes', args: [[1, 2, 3]], expectedReturn: 3 },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: 0 },
          { id: 'h2', args: [[7]], expectedReturn: 1 },
          { id: 'h3', args: [[1, 2, 3, 4]], expectedReturn: 4 },
        ]
      ),
      ms(
        `${NODE_CLASS}def list_length(head):
    count = 0
    cur = head
    while cur:
        count += 1
        cur = cur.next
    return count`,
        'Walk the chain once — O(n). Unlike Python lists, length is not stored on a linked list unless you maintain a counter.'
      )
    ),

    mc(
      't6-q5',
      'Why is inserting at the **front** of a singly linked list O(1) but accessing index `i` is O(n)?',
      [
        { id: 'a', text: 'Nodes are stored in sorted order' },
        { id: 'b', text: 'Only the head pointer is directly reachable; reaching index i requires i steps along next' },
        { id: 'c', text: 'Python lists and linked lists have the same access cost' },
        { id: 'd', text: 'Each node caches its index' },
      ],
      'b',
      ms(
        'Sequential access only — no random indexing.',
        'Front insert rewires one next pointer. Index i demands walking i links from head because nodes are not contiguous in memory like array elements.'
      )
    ),

    tf(
      't6-q6',
      'In a singly linked list, each node stores a reference to the next node (or null at the tail).',
      'true',
      ms(
        'True — forward links only in the basic singly linked list.',
        'That is the defining structure: data plus one next pointer. Doubly linked lists add prev; arrays use indices instead of pointers.'
      )
    ),
  ],
};

export default test6;
