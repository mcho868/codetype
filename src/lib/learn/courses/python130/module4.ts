import type { Module } from './types';

const module4: Module = {
  id: 'module-4',
  slug: '4',
  title: 'Stacks & Queues',
  description: 'Master the Stack (LIFO) and Queue (FIFO) abstract data types and their real-world applications.',
  icon: '📚',
  color: 'from-orange-500 to-amber-400',
  locked: true,
  lessons: [
    {
      id: 'lesson-4-1',
      title: 'The Stack ADT',
      content: `A **Stack** is one of the simplest and most useful data structures in computer science. It follows the **LIFO** principle: **Last In, First Out**. The last item you put on the stack is the first one you get back. Think of a stack of plates: you always add and remove from the top.

The Stack is an **Abstract Data Type (ADT)** — a specification of behaviour without specifying implementation. Any implementation that provides the right operations with the right behaviour is a valid Stack. The five core operations are: **push(item)** — add item to the top; **pop()** — remove and return the top item; **peek()** — look at the top item without removing it; **is_empty()** — check whether the stack has any items; and **size()** — return the number of items.

Python lists make a natural stack. Using **append()** for push and **pop()** for pop gives O(1) amortised time for both operations — ideal. The alternative — using \`insert(0, item)\` for push and \`pop(0)\` for pop — works but is O(n) for each operation since the entire list must shift, making it far less efficient.

Stacks appear everywhere in computing. The **function call stack** is literally a stack: when function A calls function B which calls function C, Python pushes each function's "frame" onto the call stack. When C returns, its frame is popped. **Undo/redo** in text editors uses two stacks: each action is pushed onto the undo stack; Ctrl+Z pops from undo and pushes to redo. **Expression evaluation** — parsing mathematical expressions with parentheses — uses a stack. **Bracket matching** (our code challenge) is a classic stack application.

One important detail: trying to pop from an empty stack (a "stack underflow") is an error. Well-designed stack implementations either raise an exception or return None/a sentinel value. Always check \`is_empty()\` before popping in situations where the stack might be empty.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Stack implementation using a Python list
class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)   # O(1) amortised

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._items.pop()   # O(1) — removes from end

    def peek(self):
        if self.is_empty():
            return None
        return self._items[-1]     # last element = top

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)

    def __str__(self):
        return f"Stack(top→ {self._items[::-1]})"

s = Stack()
s.push("a")
s.push("b")
s.push("c")
print(s)           # Stack(top→ ['c', 'b', 'a'])
print(s.peek())    # c
print(s.pop())     # c
print(s.size())    # 2`,
          caption: 'Stack implementation: O(1) push and pop using list.append/pop',
          editable: true,
        },
        {
          language: 'python',
          code: `# Practical use: reversing a string with a stack
def reverse_string(s):
    stack = []
    for char in s:
        stack.append(char)    # push each character
    result = ""
    while stack:
        result += stack.pop() # pop in reverse order
    return result

print(reverse_string("hello"))    # olleh
print(reverse_string("Python"))   # nohtyP

# Tracking function calls: a mental model
def demonstrate_call_stack():
    def c():
        print("  c() is on top of the call stack")
    def b():
        print("  b() calls c()")
        c()
        print("  c() returned — b() is on top again")
    print("main() calls b()")
    b()
    print("b() returned — only main() remains")

demonstrate_call_stack()`,
          caption: 'Reversing a string with a stack; visualising the call stack',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-4-2',
      title: 'The Queue ADT',
      content: `A **Queue** is the complement of a Stack. It follows **FIFO**: **First In, First Out**. The first item added is the first item removed. Think of a queue at a coffee shop: the person who arrived first is served first. This is fundamentally fair — items are processed in the order they arrive.

The Queue's core operations are: **enqueue(item)** — add item to the back; **dequeue()** — remove and return the item from the front; **front()** (or peek) — look at the front item without removing it; **is_empty()**; and **size()**. The key distinction from a Stack: you add to one end (back) and remove from the other (front).

A straightforward Python list implementation: use \`append(item)\` for enqueue (O(1) amortised, adds to back), and \`pop(0)\` for dequeue (O(n) — shifts all remaining elements left). This asymmetry is the basic queue's weakness. For small queues or infrequent dequeuing, it's fine. For high-throughput queuing, Python's \`collections.deque\` provides O(1) for both ends.

Queues appear in many real-world and programming contexts. **Print spoolers** queue documents in order. **Web servers** queue incoming requests. **Breadth-first search (BFS)** in graphs uses a queue to explore nodes level by level. **Task scheduling** in operating systems queues processes waiting for CPU time. Whenever you need to process items in the order they arrived, a Queue is the right tool.

A subtle but important design decision: should your Queue raise an exception on dequeue-from-empty, or return None? Both are valid. Raising is safer (it catches bugs where you call dequeue unexpectedly), while returning None is more forgiving. Document your choice clearly — users of your class need to know the contract.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Basic Queue using a Python list
class Queue:
    def __init__(self):
        self._items = []

    def enqueue(self, item):
        self._items.append(item)    # O(1) — add to back

    def dequeue(self):
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        return self._items.pop(0)   # O(n) — shifts elements left

    def front(self):
        if self.is_empty():
            return None
        return self._items[0]

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)

    def __str__(self):
        return f"Queue(front→ {self._items})"

q = Queue()
q.enqueue("first")
q.enqueue("second")
q.enqueue("third")
print(q)               # Queue(front→ ['first', 'second', 'third'])
print(q.dequeue())     # first (FIFO)
print(q.front())       # second (peek)
print(q.size())        # 2`,
          caption: 'Basic Queue implementation: enqueue O(1), dequeue O(n)',
          editable: true,
        },
        {
          language: 'python',
          code: `# Better Queue with collections.deque (both ends O(1))
from collections import deque

class FastQueue:
    def __init__(self):
        self._items = deque()   # double-ended queue

    def enqueue(self, item):
        self._items.append(item)       # O(1) — right end

    def dequeue(self):
        if not self._items:
            return None
        return self._items.popleft()   # O(1) — left end (front)

    def size(self):
        return len(self._items)

# Simulate a print queue
print_queue = FastQueue()
for doc in ["Report.pdf", "Invoice.pdf", "Photo.jpg"]:
    print_queue.enqueue(doc)
    print(f"Added: {doc}")

print("\\nPrinting in order:")
while print_queue.size() > 0:
    print(f"Printing: {print_queue.dequeue()}")`,
          caption: 'Efficient Queue using collections.deque — O(1) for both ends',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-4-3',
      title: 'Circular Queue',
      content: `The basic list-based Queue has a hidden performance problem: \`pop(0)\` is O(n) because every remaining element shifts one position to the left. For a queue processing millions of items, this becomes catastrophically slow. The **circular queue** (also called a ring buffer) solves this with a fixed-size array and two pointers — no shifting ever needed.

The idea: allocate a fixed-size array upfront. Keep two indices, **front** and **back** (or rear), pointing to the positions of the front item and the next empty slot. When you enqueue, place the item at \`back\`, then advance \`back\` by 1. When you dequeue, take the item at \`front\`, then advance \`front\` by 1. Both operations are O(1) — no shifting, no copying.

The "circular" part handles what happens when \`back\` reaches the end of the array: instead of failing, it **wraps around** to index 0 using the modulo operator: \`back = (back + 1) % capacity\`. This reuses space freed by earlier dequeues. The array is treated as if it forms a circle — hence the name. As long as the queue never holds more than \`capacity\` items at once, it works perfectly.

Detecting whether the circular queue is full or empty requires care, since both states can have \`front == back\`. One common solution: track a \`count\` or \`size\` variable. Full when \`size == capacity\`; empty when \`size == 0\`. Another solution: leave one slot always empty and declare full when \`(back + 1) % capacity == front\` — but this wastes one slot.

Circular queues (ring buffers) are ubiquitous in systems programming: **audio/video streaming buffers**, **keyboard input buffers** in operating systems, **network packet buffers**, and **inter-process communication pipes** all use circular buffers internally. They are one of the foundational data structures in embedded systems and performance-critical software.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Circular Queue: O(1) enqueue and dequeue
class CircularQueue:
    def __init__(self, capacity):
        self.capacity = capacity
        self._data = [None] * capacity
        self._front = 0
        self._back  = 0
        self._size  = 0

    def enqueue(self, item):
        if self._size == self.capacity:
            raise OverflowError("Queue is full")
        self._data[self._back] = item
        self._back = (self._back + 1) % self.capacity  # wrap around!
        self._size += 1

    def dequeue(self):
        if self._size == 0:
            raise IndexError("Queue is empty")
        item = self._data[self._front]
        self._data[self._front] = None   # clear slot
        self._front = (self._front + 1) % self.capacity  # wrap around!
        self._size -= 1
        return item

    def is_empty(self): return self._size == 0
    def is_full(self):  return self._size == self.capacity
    def size(self):     return self._size

    def __str__(self):
        return f"CircularQueue(data={self._data}, front={self._front}, back={self._back}, size={self._size})"

cq = CircularQueue(4)
cq.enqueue("a"); cq.enqueue("b"); cq.enqueue("c")
print(cq)
print(cq.dequeue())   # 'a'
cq.enqueue("d"); cq.enqueue("e")  # wraps around!
print(cq)`,
          caption: 'Circular queue using modulo to wrap indices — O(1) both operations',
          editable: true,
        },
        {
          language: 'python',
          code: `# Visualising the modulo wrap-around
capacity = 5
back = 0

print("Simulating 8 enqueues with capacity 5:")
for i in range(8):
    print(f"  Enqueue item {i}: back goes to index {back}")
    back = (back + 1) % capacity   # this is the key line!

# Why this is powerful: the array "loops"
print("\\nModulo pattern for capacity=5:")
for i in range(12):
    print(f"  i={i}, i % 5 = {i % 5}")`,
          caption: 'Visualising how modulo creates the "circular" wrapping behaviour',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q4-1',
      type: 'multiple-choice',
      prompt: 'Which principle does a Stack follow?',
      choices: [
        { id: 'a', text: 'FIFO — First In, First Out' },
        { id: 'b', text: 'LIFO — Last In, First Out' },
        { id: 'c', text: 'LILO — Last In, Last Out' },
        { id: 'd', text: 'FILO — First In, Last Out' },
      ],
      correctAnswer: 'b',
      explanation: 'A Stack follows LIFO: Last In, First Out. The most recently pushed item is the first to be popped. Think of a stack of plates — you take from the top.',
    },
    {
      id: 'q4-2',
      type: 'multiple-choice',
      prompt: 'When implementing a Stack with a Python list, which operations give O(1) performance?',
      choices: [
        { id: 'a', text: 'insert(0, item) for push, pop(0) for pop' },
        { id: 'b', text: 'append(item) for push, pop() for pop' },
        { id: 'c', text: 'Both give O(1) performance' },
        { id: 'd', text: 'Neither — lists are always O(n)' },
      ],
      correctAnswer: 'b',
      explanation: 'append() adds to the end of the list in O(1) amortised time. pop() removes from the end in O(1). Using insert(0) and pop(0) would be O(n) each because all elements must shift.',
    },
    {
      id: 'q4-3',
      type: 'true-false',
      prompt: 'The peek() operation on a Stack removes the top element and returns it.',
      correctAnswer: 'false',
      explanation: 'peek() (sometimes called "top") reads the top element without removing it. pop() is the operation that removes and returns the top element. This distinction is important — peek lets you inspect without modifying.',
    },
    {
      id: 'q4-4',
      type: 'multiple-choice',
      prompt: 'You push A, B, C onto a Stack (A first, then B, then C). What order do you get when you pop all three?',
      choices: [
        { id: 'a', text: 'A, B, C' },
        { id: 'b', text: 'C, B, A' },
        { id: 'c', text: 'B, A, C' },
        { id: 'd', text: 'C, A, B' },
      ],
      correctAnswer: 'b',
      explanation: 'LIFO means the last pushed (C) comes out first. Pop order: C, B, A — the reverse of push order. This reversal property is what makes stacks useful for undo, expression evaluation, etc.',
    },
    {
      id: 'q4-5',
      type: 'multiple-choice',
      prompt: 'Which principle does a Queue follow?',
      choices: [
        { id: 'a', text: 'LIFO — Last In, First Out' },
        { id: 'b', text: 'FIFO — First In, First Out' },
        { id: 'c', text: 'Random order' },
        { id: 'd', text: 'Sorted order' },
      ],
      correctAnswer: 'b',
      explanation: 'A Queue follows FIFO: First In, First Out. Items are processed in the exact order they were added. The first item enqueued is the first item dequeued.',
    },
    {
      id: 'q4-6',
      type: 'multiple-choice',
      prompt: 'In a basic list-based Queue, why is dequeue() (using pop(0)) O(n)?',
      choices: [
        { id: 'a', text: 'Because Python has to search for the first element' },
        { id: 'b', text: 'Because removing from the front requires every remaining element to shift one position left' },
        { id: 'c', text: 'Because it creates a new list each time' },
        { id: 'd', text: 'pop(0) is actually O(1)' },
      ],
      correctAnswer: 'b',
      explanation: 'When you remove the element at index 0, Python must shift all n-1 remaining elements one position to the left to fill the gap. This shift is O(n). This is the fundamental weakness of the basic list queue.',
    },
    {
      id: 'q4-7',
      type: 'fill-in-blank',
      prompt: 'In a circular queue with capacity 6, if the back pointer is at index 5, after one enqueue the back pointer moves to index ___.',
      correctAnswer: '0',
      explanation: 'back = (5 + 1) % 6 = 6 % 6 = 0. The modulo operator causes the index to wrap around from the last position back to 0, creating the "circular" behaviour.',
    },
    {
      id: 'q4-8',
      type: 'true-false',
      prompt: 'Python\'s collections.deque supports O(1) operations at both the front and back of the collection.',
      correctAnswer: 'true',
      explanation: 'collections.deque (double-ended queue) is implemented as a doubly-linked list of fixed-size blocks, providing O(1) amortised append and popleft. It is the recommended way to implement an efficient Queue in Python.',
    },
    {
      id: 'q4-9',
      type: 'multiple-choice',
      prompt: 'Which real-world application best illustrates a Stack?',
      choices: [
        { id: 'a', text: 'A supermarket checkout line' },
        { id: 'b', text: 'Documents waiting to print' },
        { id: 'c', text: 'The browser back button (history of visited pages)' },
        { id: 'd', text: 'A first-come-first-served ticket system' },
      ],
      correctAnswer: 'c',
      explanation: 'The browser back button is a stack: each page you visit is pushed; pressing Back pops the most recent page. The other examples are queues (FIFO), where the first item in is the first served.',
    },
    {
      id: 'q4-10',
      type: 'multiple-choice',
      prompt: 'What advantage does a circular queue have over a basic list-based queue?',
      choices: [
        { id: 'a', text: 'It can store more items' },
        { id: 'b', text: 'Both enqueue and dequeue are O(1) because no elements are shifted' },
        { id: 'c', text: 'It automatically sorts the items' },
        { id: 'd', text: 'It uses less memory because it is circular' },
      ],
      correctAnswer: 'b',
      explanation: 'A circular queue uses front and back pointers with modulo wrapping. Neither enqueue (advance back) nor dequeue (advance front) requires shifting elements — both are O(1), unlike the basic list where pop(0) is O(n).',
    },
    {
      id: 'q4-11',
      type: 'multiple-choice',
      prompt: 'You enqueue "x", "y", "z" into a Queue (x first). What does dequeue() return?',
      choices: [
        { id: 'a', text: '"z"' },
        { id: 'b', text: '"y"' },
        { id: 'c', text: '"x"' },
        { id: 'd', text: 'Depends on the implementation' },
      ],
      correctAnswer: 'c',
      explanation: 'FIFO: the first item enqueued ("x") is the first dequeued. A Queue is like a line — x arrived first, so it leaves first, regardless of implementation.',
    },
    {
      id: 'q4-12',
      type: 'code-challenge',
      language: 'python',
      prompt: "Use a Stack to check if brackets are balanced. Write `is_balanced(s)` that returns True if all '(', '[', '{' are properly closed in the right order. Test: is_balanced('({[]})'), is_balanced('([)]'), is_balanced('').",
      starterCode: "def is_balanced(s):\n    stack = []\n    matching = {')': '(', ']': '[', '}': '{'}\n    for char in s:\n        if char in '([{':\n            stack.append(char)\n        elif char in ')]}':\n            if not stack:\n                return False\n            # Check if top of stack matches\n            # Your code here\n            pass\n    return len(stack) == 0\n\nprint(is_balanced('({[]})'))\nprint(is_balanced('([)]'))\nprint(is_balanced(''))",
      expectedOutput: "True\nFalse\nTrue",
      correctAnswer: '__code__',
      explanation: 'When you see a closing bracket, pop the stack and check if it matches the expected opener using the matching dict: if stack.pop() != matching[char]: return False. At the end, the stack must be empty (all openers were closed). An empty string returns True immediately since len([]) == 0.',
    },
    {
      id: 'q4-13',
      type: 'code-challenge',
      language: 'python',
      prompt: "Implement a Queue class using a Python list. Implement enqueue(item) (add to back), dequeue() (remove from front, return None if empty), is_empty(), size(). Enqueue 'a','b','c', dequeue once, then print size() and dequeue() again.",
      starterCode: "class Queue:\n    def __init__(self):\n        self._items = []\n    \n    def enqueue(self, item):\n        pass\n    \n    def dequeue(self):\n        if self.is_empty():\n            return None\n        pass\n    \n    def is_empty(self):\n        pass\n    \n    def size(self):\n        pass\n\nq = Queue()\nq.enqueue('a')\nq.enqueue('b')\nq.enqueue('c')\nq.dequeue()\nprint(q.size())\nprint(q.dequeue())",
      expectedOutput: "2\nb",
      correctAnswer: '__code__',
      explanation: 'enqueue: self._items.append(item). dequeue: return self._items.pop(0). is_empty: return len(self._items) == 0. size: return len(self._items). After enqueuing a,b,c and dequeuing once (removes a), size is 2. The next dequeue returns b (FIFO).',
    },
  ],
};

export default module4;
