import type { Module } from './types';
import { module7Questions } from './questions/module7Questions';


const module7: Module = {
  id: 'module-7',
  slug: '7',
  title: 'Binary Trees',
  description: 'Explore hierarchical data structures — trees, binary trees, and the three classic traversal algorithms.',
  icon: '🌳',
  color: 'from-green-500 to-emerald-400',
  locked: false,
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
  questions: module7Questions,
};

export default module7;
