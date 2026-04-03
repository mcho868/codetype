import type { Module } from './types';

const module6: Module = {
  id: 'module-6',
  slug: '6',
  title: 'Linked Lists',
  description: 'Build a dynamic data structure using nodes and pointers — the foundation of many advanced structures.',
  icon: '🔗',
  color: 'from-cyan-500 to-sky-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-6-1',
      title: 'Introduction & Node Class',
      content: `Python's built-in list is incredibly convenient, but it has a hidden cost: all elements are stored in **contiguous memory**. That means if you want to insert at the beginning, Python must shift every existing element one position to the right — an O(n) operation. For a list with a million elements, that's a million moves just to add one item at the front.

A **linked list** solves this by scattering elements throughout memory and connecting them with **pointers** (references to the next element). Each element lives in its own **Node** object, which stores two things: the actual data value, and a reference to the next Node. The last node's next pointer is \`None\`, signaling the end of the list.

The \`Node\` class is simple but fundamental. It has a \`data\` attribute to hold the value, and a \`next\` attribute (initially \`None\`) to hold a reference to the next node. We can chain nodes together by setting \`first.next = second\` and \`second.next = third\`. The linked list only needs to remember the **head** — the first node — and from there you can reach any other node by following the chain.

**Traversal** means visiting every node in order. You start at the head and keep following \`.next\` until you reach \`None\`. This is always an O(n) operation because you must visit each node one at a time — you can't jump to index 5 the way you can with a Python list. This is the fundamental trade-off: linked lists gain fast insertion/deletion at the head but lose direct random access.`,
      codeExamples: [
        {
          language: 'python',
          code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

    def get_data(self):
        return self.data

    def get_next(self):
        return self.next

    def set_next(self, new_next):
        self.next = new_next

# Create and chain three nodes
first = Node(10)
second = Node(20)
third = Node(30)

first.next = second
second.next = third

print(first.data)         # 10
print(first.next.data)    # 20
print(first.next.next.data)  # 30`,
          caption: 'The Node class: data + a pointer to the next node',
          editable: true,
        },
        {
          language: 'python',
          code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Build a chain and traverse it
n1 = Node("apple")
n2 = Node("banana")
n3 = Node("cherry")
n1.next = n2
n2.next = n3

# Traverse: start at head, follow .next until None
current = n1
while current is not None:
    print(current.data)
    current = current.next`,
          caption: 'Traversal: visit every node by following .next pointers',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-6-2',
      title: 'LinkedList Class — Core Operations',
      content: `Now we wrap our Node chain in a \`LinkedList\` class that manages the head pointer and provides a clean interface. The LinkedList stores just one attribute: \`head\` (initially \`None\` for an empty list). All operations are expressed in terms of traversing or modifying this chain.

**is_empty()** simply checks whether \`head\` is \`None\`. If it is, the list has no nodes. This is O(1) — instant.

**add(item)** inserts a new node at the **front** of the list in O(1) time. Create a new Node with the given data, set its \`next\` to the current head (so it points to the old first node), then update \`head\` to this new node. The new node is now the first in the chain. This is much faster than Python list's \`insert(0, item)\` which is O(n).

**size()** and **search(item)** both require **traversal** — you must walk the entire list. size() counts every node (O(n)). search() walks the list comparing each node's data to the target, returning True if found and False if it reaches None without a match (also O(n)). These operations show the main weakness of linked lists: no random access means no shortcuts.`,
      codeExamples: [
        {
          language: 'python',
          code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def is_empty(self):
        return self.head is None          # O(1)

    def add(self, item):
        new_node = Node(item)
        new_node.next = self.head         # point to old head
        self.head = new_node              # update head — O(1)

ll = LinkedList()
print(ll.is_empty())   # True
ll.add(10)
ll.add(20)
ll.add(30)
print(ll.is_empty())   # False
# List is now: 30 -> 20 -> 10 -> None (adds at front)`,
          caption: 'add() inserts at the front in O(1) — much faster than list.insert(0)',
          editable: true,
        },
        {
          language: 'python',
          code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def add(self, item):
        node = Node(item)
        node.next = self.head
        self.head = node

    def size(self):                       # O(n) — must count all
        count = 0
        current = self.head
        while current is not None:
            count += 1
            current = current.next
        return count

    def search(self, item):               # O(n) — may check all
        current = self.head
        while current is not None:
            if current.data == item:
                return True
            current = current.next
        return False

ll = LinkedList()
ll.add(5); ll.add(10); ll.add(15)
print(ll.size())         # 3
print(ll.search(10))     # True
print(ll.search(99))     # False`,
          caption: 'size() and search() both traverse the full list — O(n)',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-6-3',
      title: 'Remove',
      content: `**Removing** a node from a linked list requires a clever **two-pointer technique**: keep track of both the \`previous\` node and the \`current\` node as you traverse. When you find the node to remove, you "skip over" it by setting \`previous.next = current.next\`. This makes the removed node unreachable — Python's garbage collector will reclaim its memory automatically.

There's one special case: removing the **head** node. Since there's no previous node before the head, you simply set \`head = head.next\`. Always handle this case first. If the item isn't found at all, you can raise a \`ValueError\`, similar to Python's built-in list \`.remove()\` method.

Now let's compare the complexity of linked list operations vs Python's built-in list:

| Operation | Linked List | Python list |
|---|---|---|
| Insert at front | **O(1)** | O(n) |
| Insert at end | O(n) | **O(1) amortized** |
| Remove by value | O(n) | O(n) |
| Access by index | O(n) | **O(1)** |
| Search | O(n) | O(n) |

Linked lists win at front insertion; Python lists win at random access and end insertion. Understanding these trade-offs is exactly the kind of thinking that makes you a better programmer — there's no single "best" data structure, only the right tool for each job.`,
      codeExamples: [
        {
          language: 'python',
          code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def add(self, item):
        node = Node(item)
        node.next = self.head
        self.head = node

    def remove(self, item):
        if self.head is None:
            raise ValueError("Item not found")

        # Special case: removing the head
        if self.head.data == item:
            self.head = self.head.next
            return

        # General case: two-pointer traversal
        previous = self.head
        current = self.head.next
        while current is not None:
            if current.data == item:
                previous.next = current.next  # skip over current
                return
            previous = current
            current = current.next
        raise ValueError("Item not found")

ll = LinkedList()
for v in [10, 20, 30, 40]:
    ll.add(v)
# List: 40 -> 30 -> 20 -> 10
ll.remove(30)
# List: 40 -> 20 -> 10

current = ll.head
while current:
    print(current.data, end=" ")
    current = current.next`,
          caption: 'remove() uses two pointers to skip over the deleted node',
          editable: true,
        },
        {
          language: 'python',
          code: `import time

# Compare front insertion speed
N = 100_000

# Python list insert at front — O(n) each time
py_list = []
start = time.time()
for i in range(N):
    py_list.insert(0, i)
py_time = time.time() - start

# Simple linked list add at front — O(1) each time
class Node:
    def __init__(self, d): self.data = d; self.next = None

head = None
start = time.time()
for i in range(N):
    node = Node(i)
    node.next = head
    head = node
ll_time = time.time() - start

print(f"Python list insert(0): {py_time:.4f}s")
print(f"Linked list add front: {ll_time:.4f}s")
print(f"Linked list was ~{py_time/ll_time:.1f}x faster")`,
          caption: 'Linked list front insertion beats Python list insert(0) dramatically at scale',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q6-1',
      type: 'multiple-choice',
      prompt: 'What does each Node in a linked list store?',
      choices: [
        { id: 'a', text: 'Only data' },
        { id: 'b', text: 'An index and data' },
        { id: 'c', text: 'Data and a reference to the next node' },
        { id: 'd', text: 'Data and references to both neighbors' },
      ],
      correctAnswer: 'c',
      explanation: 'Each Node stores its data value and a "next" pointer (reference) to the next Node in the chain. The last node\'s next is None.',
    },
    {
      id: 'q6-2',
      type: 'true-false',
      prompt: 'Inserting at the front of a linked list is O(1) — faster than inserting at the front of a Python list.',
      correctAnswer: 'true',
      explanation: 'Linked list add() at the front is O(1): create a node, point it to the old head, update head. Python list insert(0) is O(n) because it must shift all existing elements.',
    },
    {
      id: 'q6-3',
      type: 'multiple-choice',
      prompt: 'What attribute of the LinkedList class keeps track of the first node?',
      choices: [
        { id: 'a', text: 'self.first' },
        { id: 'b', text: 'self.start' },
        { id: 'c', text: 'self.head' },
        { id: 'd', text: 'self.root' },
      ],
      correctAnswer: 'c',
      explanation: 'The LinkedList class stores one attribute: self.head, which points to the first Node. To traverse the list, you start at head and follow .next pointers.',
    },
    {
      id: 'q6-4',
      type: 'fill-in-blank',
      prompt: 'The last node in a linked list has its .next attribute set to ___',
      correctAnswer: 'None',
      explanation: 'The last node\'s .next is None, which signals the end of the list. Traversal loops check "while current is not None" to know when to stop.',
    },
    {
      id: 'q6-5',
      type: 'multiple-choice',
      prompt: 'What is the time complexity of the size() method on a linked list?',
      choices: [
        { id: 'a', text: 'O(1)' },
        { id: 'b', text: 'O(log n)' },
        { id: 'c', text: 'O(n)' },
        { id: 'd', text: 'O(n^2)' },
      ],
      correctAnswer: 'c',
      explanation: 'size() must traverse every node in the list to count them, making it O(n). Unlike Python\'s list which stores length as an attribute for O(1) access.',
    },
    {
      id: 'q6-6',
      type: 'true-false',
      prompt: 'You can access the element at index 5 in a linked list in O(1) time, just like a Python list.',
      correctAnswer: 'false',
      explanation: 'Linked lists have no random access. To reach index 5, you must traverse from the head through nodes 0, 1, 2, 3, 4, 5 — that\'s O(n). Python lists use contiguous memory for O(1) indexing.',
    },
    {
      id: 'q6-7',
      type: 'multiple-choice',
      prompt: 'When removing the head node of a linked list, what is the correct operation?',
      choices: [
        { id: 'a', text: 'Set head = None' },
        { id: 'b', text: 'Set head = head.next' },
        { id: 'c', text: 'Delete head and traverse to find new first' },
        { id: 'd', text: 'Set head.data = head.next.data' },
      ],
      correctAnswer: 'b',
      explanation: 'To remove the head, simply set self.head = self.head.next. This makes the second node become the new head. Python\'s garbage collector handles the old head node.',
    },
    {
      id: 'q6-8',
      type: 'multiple-choice',
      prompt: 'The two-pointer technique in remove() tracks which two nodes?',
      choices: [
        { id: 'a', text: 'head and tail' },
        { id: 'b', text: 'first and last' },
        { id: 'c', text: 'previous and current' },
        { id: 'd', text: 'current and next' },
      ],
      correctAnswer: 'c',
      explanation: 'remove() tracks "previous" (one step behind) and "current" (the node being examined). When current is the target, previous.next = current.next skips over it.',
    },
    {
      id: 'q6-9',
      type: 'fill-in-blank',
      prompt: 'After calling add(10), add(20), add(30) on an empty LinkedList, the head node contains the value ___',
      correctAnswer: '30',
      explanation: 'add() inserts at the front. So add(10) makes head=10, add(20) makes head=20, add(30) makes head=30. The list is 30 → 20 → 10 → None.',
    },
    {
      id: 'q6-10',
      type: 'true-false',
      prompt: 'Python\'s built-in list append() (adding to the end) is O(n) — slower than a linked list add at the front.',
      correctAnswer: 'false',
      explanation: 'Python list append() is O(1) amortized — Python pre-allocates extra space, so most appends are instant. The linked list add at front is also O(1). Both are fast at their respective ends.',
    },
    {
      id: 'q6-11',
      type: 'multiple-choice',
      prompt: 'Which operation is the biggest advantage of a singly linked list over a Python list?',
      choices: [
        { id: 'a', text: 'Random access by index' },
        { id: 'b', text: 'Searching for a value' },
        { id: 'c', text: 'Inserting an element at the very front' },
        { id: 'd', text: 'Sorting the elements' },
      ],
      correctAnswer: 'c',
      explanation: 'The key advantage of a linked list is O(1) insertion at the front (just update head), versus O(n) for Python list\'s insert(0). All other operations are generally worse or equal.',
    },
    {
      id: 'q6-12',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Implement the Node and LinkedList classes. LinkedList should support add(item) (adds at front), size(), and search(item). Create a linked list, add 10, 20, 30 (in that order). Print size() and search(20).',
      starterCode: "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    \n    def add(self, item):\n        # Create node, point to head, set as new head\n        pass\n    \n    def size(self):\n        count = 0\n        current = self.head\n        while current is not None:\n            count += 1\n            current = current.next\n        return count\n    \n    def search(self, item):\n        current = self.head\n        while current is not None:\n            if current.data == item:\n                return True\n            current = current.next\n        return False\n\nll = LinkedList()\nll.add(10)\nll.add(20)\nll.add(30)\nprint(ll.size())\nprint(ll.search(20))",
      expectedOutput: "3\nTrue",
      correctAnswer: '__code__',
      explanation: 'add() creates a new Node, sets node.next = self.head, then self.head = node. After adding 10, 20, 30, size() is 3. search(20) traverses and finds 20, returning True.',
    },
    {
      id: 'q6-13',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Extend your LinkedList with a to_list() method that returns all elements as a Python list (from head to tail). Also add an append(item) method that adds to the END of the list (O(n)). Build a list by appending 1,2,3,4,5 and print to_list().',
      starterCode: "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    \n    def append(self, item):\n        new_node = Node(item)\n        if self.head is None:\n            self.head = new_node\n            return\n        current = self.head\n        while current.next is not None:\n            current = current.next\n        # Set last node's next to new_node\n        pass\n    \n    def to_list(self):\n        result = []\n        current = self.head\n        while current is not None:\n            result.append(current.data)\n            current = current.next\n        return result\n\nll = LinkedList()\nfor i in [1, 2, 3, 4, 5]:\n    ll.append(i)\nprint(ll.to_list())",
      expectedOutput: "[1, 2, 3, 4, 5]",
      correctAnswer: '__code__',
      explanation: 'append() traverses to the last node (where current.next is None), then sets current.next = new_node. to_list() collects all data values during traversal. Appending preserves insertion order.',
    },
  ],
};

export default module6;
