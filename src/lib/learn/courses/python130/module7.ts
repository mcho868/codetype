import type { Module } from './types';

const module7: Module = {
  id: 'module-7',
  slug: '7',
  title: 'Binary Trees',
  description: 'Explore hierarchical data structures — trees, binary trees, and the three classic traversal algorithms.',
  icon: '🌳',
  color: 'from-green-500 to-emerald-400',
  locked: true,
  lessons: [
    {
      id: 'lesson-7-1',
      title: 'Tree Concepts & Terminology',
      content: `A **tree** is a hierarchical data structure made up of **nodes** connected by **edges**. Unlike the linear structures we've seen (lists, stacks, linked lists), trees branch — one node can connect to multiple children. Trees are everywhere in computing: your file system is a tree, the HTML structure of a webpage is a tree, and some of the most important search and storage algorithms rely on trees.

Key vocabulary: the **root** is the single top node with no parent. **Leaf** nodes are at the bottom — they have no children. **Internal nodes** have at least one child. The **depth** of a node is the number of edges from root to that node. The **height** of the tree is the maximum depth of any leaf. Crucially, a tree is **acyclic** — there are no loops or cycles; every node except the root has exactly one parent.

A **binary tree** is a special case where each node has **at most two children**: a left child and a right child. This constraint is what makes binary trees so powerful for algorithms. Many efficient search structures (Binary Search Trees, heaps, AVL trees) are all binary trees.

The beauty of trees lies in their **recursive definition**: a tree is either empty, or it consists of a root node plus a left subtree and a right subtree, where each subtree is itself a (possibly empty) tree. This recursive definition makes recursive algorithms on trees natural and elegant. The three traversal algorithms you'll learn in Lesson 3 all exploit this recursive structure.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Visualizing tree structure with a simple dict representation
# Not the real class, just to show the shape

tree = {
    "value": "A",                   # root
    "left": {
        "value": "B",               # internal
        "left":  {"value": "D", "left": None, "right": None},   # leaf
        "right": {"value": "E", "left": None, "right": None},   # leaf
    },
    "right": {
        "value": "C",               # internal
        "left":  {"value": "F", "left": None, "right": None},   # leaf
        "right": None,
    }
}

print("Root:", tree["value"])           # A
print("Left child:", tree["left"]["value"])    # B
print("Right child:", tree["right"]["value"])  # C
print("B's left leaf:", tree["left"]["left"]["value"])  # D`,
          caption: 'A tree represented as nested dicts — root A has children B and C',
          editable: true,
        },
        {
          language: 'python',
          code: `# Counting nodes and finding height of a simple tree
def count_nodes(node):
    if node is None:
        return 0
    return 1 + count_nodes(node["left"]) + count_nodes(node["right"])

def height(node):
    if node is None:
        return 0
    return 1 + max(height(node["left"]), height(node["right"]))

tree = {
    "value": 1,
    "left": {
        "value": 2,
        "left":  {"value": 4, "left": None, "right": None},
        "right": {"value": 5, "left": None, "right": None},
    },
    "right": {"value": 3, "left": None, "right": None}
}

print("Nodes:", count_nodes(tree))  # 5
print("Height:", height(tree))      # 3`,
          caption: 'Recursive node-count and height using the recursive tree definition',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-7-2',
      title: 'BinaryTree Class Implementation',
      content: `Now we'll build a proper \`BinaryTree\` class in Python. Each node in the tree stores three things: its \`data\` value, a reference to its \`left\` child, and a reference to its \`right\` child. Both children start as \`None\` (empty subtrees) when a node is first created.

The \`insert_left\` and \`insert_right\` methods handle a subtle case: what if the node already has a child? Instead of simply overwriting it (which would lose the entire subtree), we **push the existing child down**. The new node takes the current child's place, and the current child becomes the new node's child. This preserves the existing structure.

For example, if node A has a left child B, and we call \`A.insert_left(X)\`, node X is inserted between A and B: A's left becomes X, and X's left becomes the old B. This "push down" behavior lets you insert new internal nodes into an existing tree without destroying branches.

Getter and setter methods (\`get_left\`, \`get_right\`, \`get_data\`, \`set_data\`) provide a clean interface. While Python doesn't enforce access control, writing explicit getters and setters is good practice for data structures — it gives you a place to add validation later and makes your API clear. In practice, many Python programmers access \`.left\` and \`.right\` directly, but the method style mirrors how tree classes are taught and implemented in other languages.`,
      codeExamples: [
        {
          language: 'python',
          code: `class BinaryTree:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

    def insert_left(self, new_data):
        if self.left is None:
            self.left = BinaryTree(new_data)
        else:
            # Push existing left child down
            subtree = BinaryTree(new_data, left=self.left)
            self.left = subtree

    def insert_right(self, new_data):
        if self.right is None:
            self.right = BinaryTree(new_data)
        else:
            subtree = BinaryTree(new_data, right=self.right)
            self.right = subtree

    def get_data(self): return self.data
    def get_left(self): return self.left
    def get_right(self): return self.right
    def set_data(self, val): self.data = val

# Build a small tree
root = BinaryTree(1)
root.insert_left(2)
root.insert_right(3)
root.get_left().insert_left(4)
root.get_left().insert_right(5)

print(root.get_data())                     # 1
print(root.get_left().get_data())          # 2
print(root.get_left().get_left().get_data())  # 4`,
          caption: 'BinaryTree class: insert_left pushes existing children down rather than overwriting them',
          editable: true,
        },
        {
          language: 'python',
          code: `class BinaryTree:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

    def insert_left(self, new_data):
        node = BinaryTree(new_data)
        node.left = self.left     # preserve existing subtree
        self.left = node

    def insert_right(self, new_data):
        node = BinaryTree(new_data)
        node.right = self.right
        self.right = node

# Demonstrating push-down behaviour
root = BinaryTree('A')
root.insert_left('B')
print(root.left.data)        # B
root.insert_left('X')        # X is pushed between A and B
print(root.left.data)        # X  (new left child)
print(root.left.left.data)   # B  (pushed down)`,
          caption: 'insert_left between existing nodes: the old child is pushed down, not lost',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-7-3',
      title: 'Tree Traversal (Pre/In/Post-order)',
      content: `Traversal means visiting every node in the tree exactly once. For binary trees, there are three classic **depth-first traversal** orders, each defined recursively: **pre-order**, **in-order**, and **post-order**. The names tell you when the current node is visited relative to its subtrees.

**Pre-order** (node → left → right): Visit the current node first, then recursively traverse the left subtree, then the right subtree. Pre-order is useful for copying a tree or producing a prefix-notation expression from an expression tree. The root is always the first node visited.

**In-order** (left → node → right): Recurse into the left subtree, visit the current node, then recurse into the right subtree. For a **Binary Search Tree** (which we'll cover next module), in-order traversal visits all nodes in **sorted ascending order** — this is one of the most important properties in computer science.

**Post-order** (left → right → node): Visit both subtrees before visiting the current node. Post-order is ideal when you need to process children before parents — for example, deleting a tree (you must delete children before the parent), computing directory sizes in a file system, or evaluating expression trees (evaluate sub-expressions before combining them). The root is always the last node visited.

All three traversals have O(n) time complexity — you must visit every node exactly once — and O(h) space complexity from the recursive call stack, where h is the height of the tree.`,
      codeExamples: [
        {
          language: 'python',
          code: `class BinaryTree:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

def pre_order(node):
    """Visit: node, then left, then right"""
    if node is None:
        return
    print(node.data, end=" ")
    pre_order(node.left)
    pre_order(node.right)

def in_order(node):
    """Visit: left, then node, then right"""
    if node is None:
        return
    in_order(node.left)
    print(node.data, end=" ")
    in_order(node.right)

def post_order(node):
    """Visit: left, then right, then node"""
    if node is None:
        return
    post_order(node.left)
    post_order(node.right)
    print(node.data, end=" ")

# Build: root=1, left=2, right=3, 2.left=4, 2.right=5
root = BinaryTree(1)
root.left = BinaryTree(2)
root.right = BinaryTree(3)
root.left.left = BinaryTree(4)
root.left.right = BinaryTree(5)

print("Pre-order:  ", end=""); pre_order(root);  print()  # 1 2 4 5 3
print("In-order:   ", end=""); in_order(root);   print()  # 4 2 5 1 3
print("Post-order: ", end=""); post_order(root); print()  # 4 5 2 3 1`,
          caption: 'All three traversal orders on the same tree — notice the different visit sequences',
          editable: true,
        },
        {
          language: 'python',
          code: `class BinaryTree:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

# Expression tree for: (3 + 4) * (2 - 1)
#         *
#        / \\
#       +   -
#      / \\ / \\
#     3  4 2  1

root = BinaryTree('*')
root.left = BinaryTree('+')
root.right = BinaryTree('-')
root.left.left = BinaryTree(3)
root.left.right = BinaryTree(4)
root.right.left = BinaryTree(2)
root.right.right = BinaryTree(1)

def evaluate(node):
    """Post-order: evaluate children before applying operator"""
    if isinstance(node.data, int):
        return node.data
    left_val = evaluate(node.left)
    right_val = evaluate(node.right)
    if node.data == '+': return left_val + right_val
    if node.data == '-': return left_val - right_val
    if node.data == '*': return left_val * right_val

print("Result:", evaluate(root))  # (3+4) * (2-1) = 7`,
          caption: 'Post-order traversal evaluates an expression tree — children (operands) processed before parent (operator)',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q7-1',
      type: 'multiple-choice',
      prompt: 'What is the "root" of a tree?',
      choices: [
        { id: 'a', text: 'Any node with no children' },
        { id: 'b', text: 'The single top node with no parent' },
        { id: 'c', text: 'The deepest node in the tree' },
        { id: 'd', text: 'The node with the most children' },
      ],
      correctAnswer: 'b',
      explanation: 'The root is the single top-level node that has no parent. Every other node in the tree is reachable from the root by following child edges.',
    },
    {
      id: 'q7-2',
      type: 'fill-in-blank',
      prompt: 'A node with no children is called a ___ node.',
      correctAnswer: 'leaf',
      explanation: 'Leaf nodes are at the bottom of the tree — they have no children. The "leaves" of the tree analogy: they are at the tips of the branches.',
    },
    {
      id: 'q7-3',
      type: 'multiple-choice',
      prompt: 'In a binary tree, each node can have at most how many children?',
      choices: [
        { id: 'a', text: '1' },
        { id: 'b', text: '2' },
        { id: 'c', text: '3' },
        { id: 'd', text: 'Unlimited' },
      ],
      correctAnswer: 'b',
      explanation: '"Binary" means 2. Each node in a binary tree has at most 2 children: a left child and a right child. Either or both can be None (empty).',
    },
    {
      id: 'q7-4',
      type: 'true-false',
      prompt: 'Trees can contain cycles — a node can be its own ancestor.',
      correctAnswer: 'false',
      explanation: 'Trees are by definition acyclic — there are no cycles or loops. Every node except the root has exactly one parent. A structure with cycles is called a graph, not a tree.',
    },
    {
      id: 'q7-5',
      type: 'multiple-choice',
      prompt: 'In pre-order traversal, when is the current node visited?',
      choices: [
        { id: 'a', text: 'After both children' },
        { id: 'b', text: 'Between left and right children' },
        { id: 'c', text: 'Before both children' },
        { id: 'd', text: 'Only if it has no children' },
      ],
      correctAnswer: 'c',
      explanation: 'Pre-order means "before": visit the current node FIRST, then recurse left, then recurse right. The root is always the first node visited in a pre-order traversal.',
    },
    {
      id: 'q7-6',
      type: 'multiple-choice',
      prompt: 'For a Binary Search Tree, which traversal visits nodes in sorted ascending order?',
      choices: [
        { id: 'a', text: 'Pre-order' },
        { id: 'b', text: 'In-order' },
        { id: 'c', text: 'Post-order' },
        { id: 'd', text: 'Level-order' },
      ],
      correctAnswer: 'b',
      explanation: 'In-order traversal (left → node → right) of a BST visits nodes in sorted ascending order. This is a fundamental property used to verify BST correctness and retrieve sorted output.',
    },
    {
      id: 'q7-7',
      type: 'true-false',
      prompt: 'Post-order traversal visits the root node last.',
      correctAnswer: 'true',
      explanation: 'Post-order is left → right → node, so the root is visited after all its descendants. This makes post-order ideal for deletion (delete children before parent) and expression evaluation.',
    },
    {
      id: 'q7-8',
      type: 'fill-in-blank',
      prompt: 'The height of an empty tree (None) is ___',
      correctAnswer: '0',
      explanation: 'By convention, an empty tree (None) has height 0. A single leaf node has height 1. Height is 1 + max(height(left), height(right)) for non-empty trees.',
    },
    {
      id: 'q7-9',
      type: 'multiple-choice',
      prompt: 'What happens when insert_left is called on a node that already has a left child?',
      choices: [
        { id: 'a', text: 'The existing left child is lost (overwritten)' },
        { id: 'b', text: 'An error is raised' },
        { id: 'c', text: 'The new node is inserted between the current node and its old left child' },
        { id: 'd', text: 'The new node is added to the right instead' },
      ],
      correctAnswer: 'c',
      explanation: 'insert_left pushes down the existing left child: the new node takes the left position, and the old left child becomes the new node\'s left child. This preserves the entire existing subtree.',
    },
    {
      id: 'q7-10',
      type: 'multiple-choice',
      prompt: 'What is the time complexity of any depth-first tree traversal (pre/in/post-order)?',
      choices: [
        { id: 'a', text: 'O(log n)' },
        { id: 'b', text: 'O(n)' },
        { id: 'c', text: 'O(n log n)' },
        { id: 'd', text: 'O(n^2)' },
      ],
      correctAnswer: 'b',
      explanation: 'All three depth-first traversals visit every node exactly once, so they are O(n) where n is the number of nodes. There is no shortcut — you must process every node.',
    },
    {
      id: 'q7-11',
      type: 'true-false',
      prompt: 'The recursive definition of a tree states: a tree is either empty, or a root node plus a left subtree and a right subtree.',
      correctAnswer: 'true',
      explanation: 'This recursive definition is fundamental. A tree IS a node with two (possibly empty) subtrees, each of which IS a tree. This self-similar definition is why recursive algorithms map so naturally to trees.',
    },
    {
      id: 'q7-12',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Build a binary tree with root 1, left child 2, right child 3. Node 2 has left child 4 and right child 5. Write a pre_order(node) function that prints each node\'s data. Call pre_order on the root.',
      starterCode: "class BinaryTree:\n    def __init__(self, data):\n        self.data = data\n        self.left = None\n        self.right = None\n\ndef pre_order(node):\n    if node is None:\n        return\n    print(node.data)\n    # Recurse left then right\n    pass\n\nroot = BinaryTree(1)\nroot.left = BinaryTree(2)\nroot.right = BinaryTree(3)\nroot.left.left = BinaryTree(4)\nroot.left.right = BinaryTree(5)\npre_order(root)",
      expectedOutput: "1\n2\n4\n5\n3",
      correctAnswer: '__code__',
      explanation: 'Pre-order: print node.data, then pre_order(node.left), then pre_order(node.right). Starting from root 1: visit 1, go left to 2, visit 2, go left to 4, visit 4, backtrack to 5, visit 5, backtrack to 3, visit 3.',
    },
    {
      id: 'q7-13',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Write a recursive function `tree_height(node)` that returns the height of a binary tree. Height of empty tree is 0. Height of leaf is 1. Otherwise: 1 + max(height(left), height(right)). Test on a tree where root=1, left=2, right=3, and 2 has left=4.',
      starterCode: "class BinaryTree:\n    def __init__(self, data):\n        self.data = data\n        self.left = None\n        self.right = None\n\ndef tree_height(node):\n    if node is None:\n        return 0\n    # Height is 1 + max of left and right heights\n    pass\n\nroot = BinaryTree(1)\nroot.left = BinaryTree(2)\nroot.right = BinaryTree(3)\nroot.left.left = BinaryTree(4)\nprint(tree_height(root))",
      expectedOutput: "3",
      correctAnswer: '__code__',
      explanation: 'tree_height returns 1 + max(tree_height(node.left), tree_height(node.right)). The path 1→2→4 has depth 3, while 1→3 has depth 2. max gives 3. The height of this tree is 3.',
    },
  ],
};

export default module7;
