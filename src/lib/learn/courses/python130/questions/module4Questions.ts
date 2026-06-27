import type { Question } from '../../python101/types';
import { cr, mc, tf, fib, funcCases, ms } from '../authoring';

export const module4Questions: Question[] = [
  cr(
    'm4-c1',
    'Implement a list-backed `Stack` with `push`, `pop`, `peek`, `is_empty`, and `size`. Return `None` from `pop`/`peek` on an empty stack.\n\nThe starter includes `run_stack` — **do not edit it**. Ops look like `["push", 1]`, `["pop"]`, `["peek"]`, `["is_empty"]`, `["size"]`.',
    'class Stack:\n    def __init__(self):\n        self._items = []\n\n    def push(self, item):\n        pass\n\n    def pop(self):\n        pass\n\n    def peek(self):\n        pass\n\n    def is_empty(self):\n        pass\n\n    def size(self):\n        pass\n\n\ndef run_stack(ops):\n    s = Stack()\n    results = []\n    for op in ops:\n        kind = op[0]\n        if kind == "push":\n            s.push(op[1])\n        elif kind == "pop":\n            results.append(s.pop())\n        elif kind == "peek":\n            results.append(s.peek())\n        elif kind == "is_empty":\n            results.append(s.is_empty())\n        elif kind == "size":\n            results.append(s.size())\n    return results\n',
    'function',
    funcCases(
      'run_stack',
      [
        {
          id: 's1',
          description: 'Push then peek/pop',
          args: [[['push', 1], ['push', 2], ['push', 3], ['peek'], ['pop'], ['size']]],
          expectedReturn: [3, 3, 2],
        },
        {
          id: 's2',
          description: 'Empty stack',
          args: [[['is_empty'], ['pop'], ['peek']]],
          expectedReturn: [true, null, null],
        },
      ],
      [
        {
          id: 'h1',
          args: [[['push', 'a'], ['push', 'b'], ['pop'], ['pop'], ['is_empty']]],
          expectedReturn: ['b', 'a', true],
        },
        {
          id: 'h2',
          args: [[['size'], ['push', 10], ['size']]],
          expectedReturn: [0, 1],
        },
      ]
    ),
    ms(
      'class Stack:\n    def __init__(self):\n        self._items = []\n\n    def push(self, item):\n        self._items.append(item)\n\n    def pop(self):\n        if self.is_empty():\n            return None\n        return self._items.pop()\n\n    def peek(self):\n        if self.is_empty():\n            return None\n        return self._items[-1]\n\n    def is_empty(self):\n        return len(self._items) == 0\n\n    def size(self):\n        return len(self._items)',
      'Use append/pop on the list end for O(1) LIFO behaviour.'
    )
  ),
  cr(
    'm4-c2',
    'Implement a list-backed `Queue` with `enqueue`, `dequeue`, `is_empty`, and `size`. Return `None` from `dequeue` when empty.\n\nThe starter includes `run_queue` — **do not edit it**.',
    'class Queue:\n    def __init__(self):\n        self._items = []\n\n    def enqueue(self, item):\n        pass\n\n    def dequeue(self):\n        pass\n\n    def is_empty(self):\n        pass\n\n    def size(self):\n        pass\n\n\ndef run_queue(ops):\n    q = Queue()\n    results = []\n    for op in ops:\n        kind = op[0]\n        if kind == "enqueue":\n            q.enqueue(op[1])\n        elif kind == "dequeue":\n            results.append(q.dequeue())\n        elif kind == "is_empty":\n            results.append(q.is_empty())\n        elif kind == "size":\n            results.append(q.size())\n    return results\n',
    'function',
    funcCases(
      'run_queue',
      [
        {
          id: 's1',
          description: 'FIFO order',
          args: [[['enqueue', 'a'], ['enqueue', 'b'], ['enqueue', 'c'], ['dequeue'], ['size'], ['dequeue']]],
          expectedReturn: ['a', 2, 'b'],
        },
        {
          id: 's2',
          description: 'Empty queue',
          args: [[['dequeue'], ['is_empty']]],
          expectedReturn: [null, true],
        },
      ],
      [
        {
          id: 'h1',
          args: [[['enqueue', 1], ['enqueue', 2], ['dequeue'], ['dequeue'], ['dequeue']]],
          expectedReturn: [1, 2, null],
        },
        {
          id: 'h2',
          args: [[['size'], ['enqueue', 'x'], ['size']]],
          expectedReturn: [0, 1],
        },
      ]
    ),
    ms(
      'class Queue:\n    def __init__(self):\n        self._items = []\n\n    def enqueue(self, item):\n        self._items.append(item)\n\n    def dequeue(self):\n        if self.is_empty():\n            return None\n        return self._items.pop(0)\n\n    def is_empty(self):\n        return len(self._items) == 0\n\n    def size(self):\n        return len(self._items)',
      'append to the back, pop(0) from the front — classic FIFO with a list.'
    )
  ),
  cr(
    'm4-c3',
    'Write `is_balanced(s)` that returns `True` when brackets `()`, `[]`, `{}` are properly nested and closed.',
    'def is_balanced(s):\n    stack = []\n    matching = {")": "(", "]": "[", "}": "{"}\n    for char in s:\n        if char in "([{":\n            stack.append(char)\n        elif char in ")]}":\n            if not stack:\n                return False\n            # Your code here\n            pass\n    return len(stack) == 0\n',
    'function',
    funcCases(
      'is_balanced',
      [
        { id: 's1', description: 'Balanced mix', args: ['({[]})'], expectedReturn: true },
        { id: 's2', description: 'Mismatched', args: ['([)]'], expectedReturn: false },
      ],
      [
        { id: 'h1', args: [''], expectedReturn: true },
        { id: 'h2', args: ['((()))'], expectedReturn: true },
        { id: 'h3', args: ['(()'], expectedReturn: false },
        { id: 'h4', args: ['{[()]}'], expectedReturn: true },
      ]
    ),
    ms(
      'def is_balanced(s):\n    stack = []\n    matching = {")": "(", "]": "[", "}": "{"}\n    for char in s:\n        if char in "([{":\n            stack.append(char)\n        elif char in ")]}":\n            if not stack or stack.pop() != matching[char]:\n                return False\n    return len(stack) == 0',
      'Pop and compare to the expected opener; leftover openers mean unbalanced.'
    )
  ),
  cr(
    'm4-c4',
    'Implement `CircularQueue(capacity)` with `enqueue`, `dequeue`, `is_empty`, `is_full`, and `size`. Raise `OverflowError` when full and `IndexError` when empty.\n\nThe starter includes `run_cq` — **do not edit it**. It records dequeue results or `"error"` on exceptions.',
    'class CircularQueue:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self._data = [None] * capacity\n        self._front = 0\n        self._back = 0\n        self._size = 0\n\n    def enqueue(self, item):\n        pass\n\n    def dequeue(self):\n        pass\n\n    def is_empty(self):\n        pass\n\n    def is_full(self):\n        pass\n\n    def size(self):\n        pass\n\n\ndef run_cq(capacity, ops):\n    cq = CircularQueue(capacity)\n    results = []\n    for op in ops:\n        kind = op[0]\n        try:\n            if kind == "enqueue":\n                cq.enqueue(op[1])\n            elif kind == "dequeue":\n                results.append(cq.dequeue())\n            elif kind == "is_empty":\n                results.append(cq.is_empty())\n            elif kind == "is_full":\n                results.append(cq.is_full())\n            elif kind == "size":\n                results.append(cq.size())\n        except (OverflowError, IndexError):\n            results.append("error")\n    return results\n',
    'function',
    funcCases(
      'run_cq',
      [
        {
          id: 's1',
          description: 'Wraparound dequeue',
          args: [
            3,
            [
              ['enqueue', 'a'],
              ['enqueue', 'b'],
              ['dequeue'],
              ['enqueue', 'c'],
              ['enqueue', 'd'],
              ['dequeue'],
              ['dequeue'],
            ],
          ],
          expectedReturn: ['a', 'b', 'c', 'd'],
        },
        {
          id: 's2',
          description: 'Full queue',
          args: [2, [['enqueue', 1], ['enqueue', 2], ['enqueue', 3]]],
          expectedReturn: ['error'],
        },
      ],
      [
        {
          id: 'h1',
          args: [4, [['enqueue', 1], ['enqueue', 2], ['size'], ['is_full']]],
          expectedReturn: [2, false],
        },
        {
          id: 'h2',
          args: [2, [['dequeue']]],
          expectedReturn: ['error'],
        },
      ]
    ),
    ms(
      'class CircularQueue:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self._data = [None] * capacity\n        self._front = 0\n        self._back = 0\n        self._size = 0\n\n    def enqueue(self, item):\n        if self.is_full():\n            raise OverflowError("full")\n        self._data[self._back] = item\n        self._back = (self._back + 1) % self.capacity\n        self._size += 1\n\n    def dequeue(self):\n        if self.is_empty():\n            raise IndexError("empty")\n        item = self._data[self._front]\n        self._data[self._front] = None\n        self._front = (self._front + 1) % self.capacity\n        self._size -= 1\n        return item\n\n    def is_empty(self):\n        return self._size == 0\n\n    def is_full(self):\n        return self._size == self.capacity\n\n    def size(self):\n        return self._size',
      'Advance front/back with modulo so the array wraps — O(1) enqueue and dequeue.'
    )
  ),
  mc(
    'q4-1',
    'Which principle does a Stack follow?',
    [
      { id: 'a', text: 'FIFO — First In, First Out' },
      { id: 'b', text: 'LIFO — Last In, First Out' },
      { id: 'c', text: 'LILO — Last In, Last Out' },
      { id: 'd', text: 'FILO — First In, Last Out' },
    ],
    'b',
    'A stack is LIFO — the most recently pushed item is popped first.'
  ),
  mc(
    'q4-2',
    'When implementing a Stack with a Python list, which operations give O(1) performance?',
    [
      { id: 'a', text: 'insert(0, item) for push, pop(0) for pop' },
      { id: 'b', text: 'append(item) for push, pop() for pop' },
      { id: 'c', text: 'Both give O(1) performance' },
      { id: 'd', text: 'Neither — lists are always O(n)' },
    ],
    'b',
    'append and pop at the list end are O(1) amortised — ideal for a stack.'
  ),
  mc(
    'q4-5',
    'Which principle does a Queue follow?',
    [
      { id: 'a', text: 'LIFO — Last In, First Out' },
      { id: 'b', text: 'FIFO — First In, First Out' },
      { id: 'c', text: 'Random order' },
      { id: 'd', text: 'Sorted order' },
    ],
    'b',
    'A queue is FIFO — the first item enqueued is the first dequeued.'
  ),
  fib(
    'q4-7',
    'In a circular queue with capacity 6, if the back pointer is at index 5, after one enqueue the back pointer moves to index ___.',
    '0',
    'back = (5 + 1) % 6 = 0 — modulo creates wraparound.'
  ),
  mc(
    'q4-8',
    'A stack follows which ordering principle?',
    [
      { id: 'a', text: 'FIFO — First In, First Out' },
      { id: 'b', text: 'LIFO — Last In, First Out' },
      { id: 'c', text: 'Sorted order' },
      { id: 'd', text: 'Random access' },
    ],
    'b',
    'A stack is LIFO: the most recently pushed item is the first one popped (like a stack of plates).'
  ),
  mc(
    'q4-9',
    'A queue follows which ordering principle?',
    [
      { id: 'a', text: 'LIFO — Last In, First Out' },
      { id: 'b', text: 'FIFO — First In, First Out' },
      { id: 'c', text: 'Highest priority first' },
      { id: 'd', text: 'Reverse insertion order' },
    ],
    'b',
    'A queue is FIFO: items leave in the same order they arrived (like a line of people).'
  ),
  mc(
    'q4-10',
    'Which stack operation looks at the top item WITHOUT removing it?',
    [
      { id: 'a', text: 'pop' },
      { id: 'b', text: 'push' },
      { id: 'c', text: 'peek' },
      { id: 'd', text: 'enqueue' },
    ],
    'c',
    'peek (a.k.a. top) returns the top element but leaves the stack unchanged; pop removes it.'
  ),
  mc(
    'q4-11',
    'Using a Python list as a stack, which operations are the efficient O(1) push/pop?',
    [
      { id: 'a', text: 'list.append(x) and list.pop()' },
      { id: 'b', text: 'list.insert(0, x) and list.pop(0)' },
      { id: 'c', text: 'list.append(x) and list.pop(0)' },
      { id: 'd', text: 'list.insert(0, x) and list.pop()' },
    ],
    'a',
    'append() and pop() act at the END of the list in O(1). Operations at index 0 are O(n) because every element must shift.'
  ),
  mc(
    'q4-12',
    'Why does a circular queue use modulo arithmetic for its front/back pointers?',
    [
      { id: 'a', text: 'To sort the elements automatically' },
      { id: 'b', text: 'So pointers wrap around to the start of the fixed-size array, reusing freed slots' },
      { id: 'c', text: 'To make the queue grow without limit' },
      { id: 'd', text: 'To convert the queue into a stack' },
    ],
    'b',
    'Modulo lets the index wrap from the last slot back to index 0, so a fixed-size buffer reuses space vacated by dequeues.'
  ),
  mc(
    'q4-13',
    'Checking whether a string of brackets is balanced is a classic application of which structure?',
    [
      { id: 'a', text: 'A queue' },
      { id: 'b', text: 'A stack' },
      { id: 'c', text: 'A binary tree' },
      { id: 'd', text: 'A hash table' },
    ],
    'b',
    'Push each opening bracket; on a closing bracket, pop and check it matches. The LIFO order mirrors nesting.'
  ),
  tf(
    'q4-14',
    'Calling pop() (or dequeue()) on an empty stack/queue is an error case your implementation should guard against.',
    'true',
    'Removing from an empty structure has no valid result; well-written implementations raise an error or return a sentinel rather than crashing unexpectedly.'
  ),
  tf(
    'q4-15',
    'A queue can be implemented with two stacks.',
    'true',
    'Using an "in" stack and an "out" stack, you can reverse LIFO order into FIFO — a well-known technique.'
  ),
];
