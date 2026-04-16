import type { Module } from './types';

const module8: Module = {
  id: 'module-8',
  slug: '8',
  title: 'Binary Search Trees',
  description: 'Exploit the BST ordering property for O(log n) search, insertion, and deletion.',
  icon: '🔍',
  color: 'from-violet-500 to-purple-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-8-1',
      title: 'BST Property & Motivation',
      content: `A **Binary Search Tree (BST)** is a binary tree with one powerful constraint: the **BST property**. For every node in the tree, all values in its **left subtree** are strictly **less than** the node's value, and all values in its **right subtree** are strictly **greater than** the node's value. This ordering property is maintained at every node, not just the root.

Why does this matter so much? Because it turns searching into a game of elimination. At each node, you compare your target against the node's value. If the target is smaller, you know it can only be in the left subtree — ignore the entire right subtree. If the target is larger, ignore the entire left subtree. Each comparison eliminates roughly half the remaining tree. This is the same logic as binary search on a sorted array, giving us **O(log n)** average-case performance for search, insert, and delete.

Consider a BST with 8 as the root. Values 3 and 10 are its children. Node 3 has children 1 (left) and 6 (right). Node 10 has a right child 14, which has a left child 13. Every value left of 8 is less than 8; every value right of 8 is greater. Within node 3's subtree, 1 < 3 < 6 — the property holds recursively everywhere.

**The critical weakness** of BSTs is that their efficiency depends on being **balanced** — roughly equal numbers of nodes in left and right subtrees. If you insert already-sorted data (1, 2, 3, 4, 5...), every new node goes to the right, forming a long chain. This **degenerate BST** looks like a linked list and gives O(n) performance for all operations. Self-balancing BSTs (AVL trees, Red-Black trees) automatically prevent this, but they are more complex to implement.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Visualising the BST property
# Insert values one by one and verify the property

def is_bst(node, min_val=float('-inf'), max_val=float('inf')):
    """Verify BST property: all left < node < all right"""
    if node is None:
        return True
    if not (min_val < node.data < max_val):
        return False
    return (is_bst(node.left, min_val, node.data) and
            is_bst(node.right, node.data, max_val))

class BST:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

root = BST(8)
# Manually build the example tree
root.left = BST(3)
root.right = BST(10)
root.left.left = BST(1)
root.left.right = BST(6)
root.right.right = BST(14)
root.right.right.left = BST(13)

print("Is valid BST?", is_bst(root))  # True

# Deliberately break the property
root.left.right.right = BST(99)  # 99 > 8 but in left subtree!
print("Still valid?", is_bst(root))   # False`,
          caption: 'The BST property must hold at every node — not just the root',
          editable: true,
        },
        {
          language: 'python',
          code: `# Degenerate BST: inserting sorted data creates a chain
class BST:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
    def insert(self, value):
        if value < self.data:
            if self.left is None: self.left = BST(value)
            else: self.left.insert(value)
        else:
            if self.right is None: self.right = BST(value)
            else: self.right.insert(value)

def height(node):
    if node is None: return 0
    return 1 + max(height(node.left), height(node.right))

# Balanced insertion
root_balanced = BST(4)
for v in [2, 6, 1, 3, 5, 7]:
    root_balanced.insert(v)
print("Balanced height:", height(root_balanced))   # 3

# Degenerate: sorted insertion — chain!
root_degenerate = BST(1)
for v in [2, 3, 4, 5, 6, 7]:
    root_degenerate.insert(v)
print("Degenerate height:", height(root_degenerate))  # 7 (a chain!)`,
          caption: 'Sorted insertion creates a degenerate BST — all nodes in one long chain',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-8-2',
      title: 'Search & Insert',
      content: `Both **search** and **insert** in a BST follow the same navigation logic: start at the root, compare the target value against the current node, and go left if smaller, right if bigger. The only difference is what happens when you reach a \`None\` position — search returns False (not found), while insert creates a new node there.

**Search** is elegant: if you reach the target value, return True. If you fall off the tree (reach None), return False. The BST property guarantees you'll never need to backtrack — once you go left, the target can't be in the right subtree. The recursive implementation mirrors this logic beautifully: \`search(value)\` on a node either finds it, recurses left, or recurses right.

**Insert** also follows the search path and places the new node at the first \`None\` it encounters. This means every new node is always inserted as a **leaf** — it has no children. The path it takes is determined entirely by comparison with existing nodes. If you insert 6 into a BST with root 8 and left child 3, you go left (6 < 8), then right (6 > 3), and if 3 has no right child, the new node 6 goes there.

Both operations are **O(h)** where h is the height of the tree — O(log n) for a balanced tree, O(n) worst case. This is also true for an iterative implementation (using a while loop instead of recursion), which avoids stack overhead and is often preferred in production code. Both are shown below.`,
      codeExamples: [
        {
          language: 'python',
          code: `class BST:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

    def search(self, value):
        """Recursive search — O(log n) balanced, O(n) worst"""
        if value == self.data:
            return True
        elif value < self.data:
            return self.left.search(value) if self.left else False
        else:
            return self.right.search(value) if self.right else False

    def insert(self, value):
        """Recursive insert — always inserts as a new leaf"""
        if value < self.data:
            if self.left is None:
                self.left = BST(value)
            else:
                self.left.insert(value)
        else:
            if self.right is None:
                self.right = BST(value)
            else:
                self.right.insert(value)

root = BST(8)
for v in [3, 10, 1, 6, 14, 13]:
    root.insert(v)

print(root.search(6))   # True
print(root.search(13))  # True
print(root.search(7))   # False
print(root.search(15))  # False`,
          caption: 'Recursive BST search and insert — both follow the same left/right navigation logic',
          editable: true,
        },
        {
          language: 'python',
          code: `class BST:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

def search_iterative(root, value):
    """Iterative search — avoids recursion stack overhead"""
    current = root
    steps = 0
    while current is not None:
        steps += 1
        if value == current.data:
            print(f"Found {value} in {steps} steps")
            return True
        elif value < current.data:
            current = current.left
        else:
            current = current.right
    print(f"{value} not found after {steps} steps")
    return False

root = BST(8)
for v in [3, 10, 1, 6, 14, 13]:
    root.insert(v)

search_iterative(root, 13)   # Found 13 in 3 steps
search_iterative(root, 7)    # 7 not found after 3 steps`,
          caption: 'Iterative search tracks steps — shows how quickly BST navigates to the answer',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-8-3',
      title: 'In-order Traversal & Deletion',
      content: `**In-order traversal** of a BST (left → node → right) always produces values in **sorted ascending order**. This is a direct consequence of the BST property: every node in the left subtree is smaller, so you visit all smaller values first, then the current node, then all larger values in the right subtree. This property is extremely useful — you can sort a collection by inserting all values into a BST and then doing an in-order traversal.

**Deletion** is the trickiest BST operation because you must maintain the BST property after removing a node. There are three cases depending on the node's children:

**Case 1 — Leaf node** (no children): Simply remove it by setting the parent's pointer to None. Easy.

**Case 2 — One child**: Replace the deleted node with its only child. The parent just skips over the deleted node and points directly to the grandchild.

**Case 3 — Two children**: This is the hard case. You can't just remove the node because you'd disconnect two subtrees. The solution is to replace the deleted node's value with its **in-order successor** — the smallest value in the right subtree. Why? Because the in-order successor is greater than everything in the left subtree (so it can take the deleted node's position) and is the smallest value in the right subtree (so the right subtree remains valid). To find the in-order successor: go right once, then go left as far as possible. Then delete the in-order successor from its original position (which is always a leaf or has one right child).`,
      codeExamples: [
        {
          language: 'python',
          code: `class BST:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

    def insert(self, value):
        if value < self.data:
            if self.left is None: self.left = BST(value)
            else: self.left.insert(value)
        else:
            if self.right is None: self.right = BST(value)
            else: self.right.insert(value)

    def in_order(self):
        """Returns sorted list — proof of BST property"""
        result = []
        if self.left:
            result += self.left.in_order()
        result.append(self.data)
        if self.right:
            result += self.right.in_order()
        return result

# Insert in random order — in_order always gives sorted output
root = BST(8)
for v in [3, 10, 1, 6, 14, 13, 4, 7]:
    root.insert(v)

print("In-order:", root.in_order())
# [1, 3, 4, 6, 7, 8, 10, 13, 14] — always sorted!`,
          caption: 'In-order traversal of any BST always produces sorted ascending output',
          editable: true,
        },
        {
          language: 'python',
          code: `class BST:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

    def insert(self, val):
        if val < self.data:
            if self.left is None: self.left = BST(val)
            else: self.left.insert(val)
        else:
            if self.right is None: self.right = BST(val)
            else: self.right.insert(val)

    def in_order(self):
        result = []
        if self.left: result += self.left.in_order()
        result.append(self.data)
        if self.right: result += self.right.in_order()
        return result

    def find_min(self):
        """In-order successor helper: go left as far as possible"""
        current = self
        while current.left is not None:
            current = current.left
        return current.data

    def delete(self, value):
        if value < self.data:
            if self.left: self.left = self.left.delete(value)
        elif value > self.data:
            if self.right: self.right = self.right.delete(value)
        else:
            # Found the node to delete
            if self.left is None: return self.right   # case 1 or 2
            if self.right is None: return self.left   # case 2
            # Case 3: two children — replace with in-order successor
            successor_val = self.right.find_min()
            self.data = successor_val
            self.right = self.right.delete(successor_val)
        return self

root = BST(8)
for v in [3, 10, 1, 6, 14, 13]:
    root.insert(v)
print("Before:", root.in_order())   # [1, 3, 6, 8, 10, 13, 14]
root = root.delete(3)               # node with two children
print("After:", root.in_order())    # [1, 6, 8, 10, 13, 14]`,
          caption: 'delete() handles all 3 cases; two-children case uses the in-order successor',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q8-1',
      type: 'multiple-choice',
      prompt: 'The BST property states that for any node, values in the left subtree are:',
      choices: [
        { id: 'a', text: 'Greater than the node\'s value' },
        { id: 'b', text: 'Less than the node\'s value' },
        { id: 'c', text: 'Equal to the node\'s value' },
        { id: 'd', text: 'In random order' },
      ],
      correctAnswer: 'b',
      explanation: 'BST property: left subtree values < node < right subtree values. This ordering at every node is what enables O(log n) search — you always know which half to discard.',
    },
    {
      id: 'q8-2',
      type: 'true-false',
      prompt: 'Inserting values 1, 2, 3, 4, 5 in sorted order into a BST produces a balanced tree.',
      correctAnswer: 'false',
      explanation: 'Inserting in sorted order creates a degenerate (chain-like) BST where every node only has a right child. This is the worst case — the tree has height n and all operations become O(n).',
    },
    {
      id: 'q8-3',
      type: 'multiple-choice',
      prompt: 'What is the average-case time complexity of BST search in a balanced tree?',
      choices: [
        { id: 'a', text: 'O(1)' },
        { id: 'b', text: 'O(log n)' },
        { id: 'c', text: 'O(n)' },
        { id: 'd', text: 'O(n log n)' },
      ],
      correctAnswer: 'b',
      explanation: 'In a balanced BST, each comparison at a node eliminates roughly half the remaining nodes. This halving at each step gives O(log n) search time — the same as binary search on a sorted array.',
    },
    {
      id: 'q8-4',
      type: 'multiple-choice',
      prompt: 'In-order traversal of a BST always produces values in what kind of order?',
      choices: [
        { id: 'a', text: 'Sorted ascending order' },
        { id: 'b', text: 'Reverse insertion order' },
        { id: 'c', text: 'Random order' },
        { id: 'd', text: 'Level-order' },
      ],
      correctAnswer: 'a',
      explanation: 'In-order (left → node → right) visits all left (smaller) values first, then the node, then all right (larger) values. This recursive pattern guarantees ascending sorted output for any valid BST.',
    },
    {
      id: 'q8-5',
      type: 'multiple-choice',
      prompt: 'Every new node inserted into a BST is always placed as:',
      choices: [
        { id: 'a', text: 'A new root' },
        { id: 'b', text: 'An internal node with existing children' },
        { id: 'c', text: 'A leaf node (with no children)' },
        { id: 'd', text: 'The left child of the current root' },
      ],
      correctAnswer: 'c',
      explanation: 'BST insert follows the search path until it reaches a None position, then creates a new node there. Since the position is None, the new node has no children — it\'s always a leaf.',
    },
    {
      id: 'q8-6',
      type: 'true-false',
      prompt: 'The BST property must hold at every node in the tree, not just the root.',
      correctAnswer: 'true',
      explanation: 'The BST property is recursive: for every node (not just the root), all values in its left subtree are less than it, and all in its right subtree are greater. A common mistake is only checking direct children.',
    },
    {
      id: 'q8-7',
      type: 'multiple-choice',
      prompt: 'What is the "in-order successor" of a node with two children?',
      choices: [
        { id: 'a', text: 'The largest value in the left subtree' },
        { id: 'b', text: 'The smallest value in the right subtree' },
        { id: 'c', text: 'The right child' },
        { id: 'd', text: 'The parent node' },
      ],
      correctAnswer: 'b',
      explanation: 'The in-order successor is the next value in in-order sequence — the smallest value in the right subtree. To find it: go right once, then go left as far as possible.',
    },
    {
      id: 'q8-8',
      type: 'multiple-choice',
      prompt: 'When deleting a leaf node from a BST, what do you do?',
      choices: [
        { id: 'a', text: 'Replace it with its in-order successor' },
        { id: 'b', text: 'Replace it with its only child' },
        { id: 'c', text: 'Set the parent\'s pointer to None' },
        { id: 'd', text: 'Delete the entire subtree' },
      ],
      correctAnswer: 'c',
      explanation: 'A leaf node has no children, so you simply set the parent\'s pointer (left or right) to None. The node is removed with no restructuring needed.',
    },
    {
      id: 'q8-9',
      type: 'fill-in-blank',
      prompt: 'In the worst case (a degenerate BST from sorted input), BST operations are O(___)',
      correctAnswer: 'n',
      explanation: 'A degenerate BST from sorted input is essentially a linked list — each node has only a right child. The height becomes n, making search, insert, and delete all O(n).',
    },
    {
      id: 'q8-10',
      type: 'true-false',
      prompt: 'To find the in-order successor, you go left once, then right as far as possible.',
      correctAnswer: 'false',
      explanation: 'It\'s the opposite: go RIGHT once (to the right subtree), then go LEFT as far as possible (to find the minimum of that subtree). That minimum is the in-order successor.',
    },
    {
      id: 'q8-11',
      type: 'multiple-choice',
      prompt: 'If you search for a value in a BST and reach a None node, what does that mean?',
      choices: [
        { id: 'a', text: 'The value is the root' },
        { id: 'b', text: 'The value is in the left subtree' },
        { id: 'c', text: 'The value is not in the tree' },
        { id: 'd', text: 'The tree is empty' },
      ],
      correctAnswer: 'c',
      explanation: 'If you reach None during BST search, you\'ve gone past all relevant nodes without finding the target. The value is not in the tree, and search returns False.',
    },
    {
      id: 'q8-12',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Implement a BST with insert(value) and search(value) methods. Insert 8, 3, 10, 1, 6, 14, 13 (in that order). Then search for 6 and 7, printing results. Also print an in-order traversal to verify the BST is sorted.',
      starterCode: "class BST:\n    def __init__(self, data):\n        self.data = data\n        self.left = None\n        self.right = None\n    \n    def insert(self, value):\n        # Insert smaller values to the left, larger values to the right\n        pass\n    \n    def search(self, value):\n        # Return True if found, otherwise False\n        pass\n    \n    def in_order(self):\n        result = []\n        # Traverse left, visit node, traverse right\n        return result\n\nroot = BST(8)\nfor v in [3, 10, 1, 6, 14, 13]:\n    root.insert(v)\nprint(root.search(6))\nprint(root.search(7))\nprint(root.in_order())",
      expectedOutput: "True\nFalse\n[1, 3, 6, 8, 10, 13, 14]",
      correctAnswer: '__code__',
      explanation: 'search(6) navigates: 6<8 go left to 3, 6>3 go right to 6, found — True. search(7) navigates to where 7 would be but finds None — False. in_order() gives the sorted sequence.',
    },
    {
      id: 'q8-13',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Write a function `bst_from_sorted(lst)` that builds a balanced BST from a sorted list by always inserting the middle element first. Returns the root BST node. Then print an in-order traversal of the resulting tree for [1,2,3,4,5,6,7]. The in-order should give back the sorted list.',
      starterCode: "class BST:\n    def __init__(self, data):\n        self.data = data\n        self.left = None\n        self.right = None\n    \n    def insert(self, value):\n        if value < self.data:\n            if self.left is None: self.left = BST(value)\n            else: self.left.insert(value)\n        else:\n            if self.right is None: self.right = BST(value)\n            else: self.right.insert(value)\n    \n    def in_order(self):\n        result = []\n        if self.left: result += self.left.in_order()\n        result.append(self.data)\n        if self.right: result += self.right.in_order()\n        return result\n\ndef bst_from_sorted(lst):\n    if not lst:\n        return None\n    mid = len(lst) // 2\n    root = BST(lst[mid])\n    # Recursively insert left and right halves\n    # Your code here\n    return root\n\nroot = bst_from_sorted([1, 2, 3, 4, 5, 6, 7])\nprint(root.in_order())",
      expectedOutput: "[1, 2, 3, 4, 5, 6, 7]",
      correctAnswer: '__code__',
      explanation: 'bst_from_sorted recursively builds balanced halves: left_tree = bst_from_sorted(lst[:mid]), right_tree = bst_from_sorted(lst[mid+1:]). Insert all left nodes into root, then all right nodes. In-order traversal gives back the sorted list.',
    },
  ],
};

export default module8;
