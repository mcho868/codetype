import type { Module } from './types';
import { module6Questions } from './questions/module6Questions';


const module6: Module = {
  id: 'module-6',
  slug: '6',
  title: 'Linked Lists',
  description: 'Build a dynamic data structure using nodes and pointers — the foundation of many advanced structures.',
  icon: '🔗',
  color: 'from-cyan-500 to-sky-400',
  locked: true,
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
  questions: module6Questions,
};

export default module6;
