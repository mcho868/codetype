import type { Module } from './types';
import { cr, mc, tf, funcCases, ms } from './authoring';

const BTREE_CLASS = `class BinaryTree:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

`;

const test7: Module = {
  id: 'test-7',
  slug: 'test-7',
  title: 'Module 7 Test — Binary Trees',
  description:
    'Transfer-level practice: tree depth, nodes at a level, building from preorder, and mirroring.',
  icon: '📝',
  color: 'from-green-500 to-emerald-400',
  locked: false,
  isMidterm: true,
  lessons: [],
  questions: [
    cr(
      't7-q1',
      `Implement \`max_depth(root)\` returning the **height** of a binary tree: 0 for \`null\`, else 1 + max depth of subtrees.\n\nThe starter includes \`run_max_depth\` — **do not edit it**.`,
      `${BTREE_CLASS}def max_depth(root):
    pass


def run_max_depth():
    root = BinaryTree(1)
    root.left = BinaryTree(2)
    root.right = BinaryTree(3)
    root.left.left = BinaryTree(4)
    return max_depth(root)
`,
      'function',
      funcCases(
        'run_max_depth',
        [
          { id: 's1', description: 'Sample tree depth 3', args: [], expectedReturn: 3 },
        ],
        [
          { id: 'h1', args: [], expectedReturn: 3 },
        ]
      ),
      ms(
        `${BTREE_CLASS}def max_depth(root):
    if root is None:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
        'Recursive definition: empty tree height 0; otherwise one plus the deeper subtree. Same recurrence as computing max levels from root.'
      )
    ),

    cr(
      't7-q2',
      `Implement \`count_at_level(root, level)\` returning how many nodes sit at **level** \`level\` (root is level 1). Return 0 if the tree is empty or level is below 1.\n\nThe starter includes \`run_count_at_level\` — **do not edit it**.`,
      `${BTREE_CLASS}def count_at_level(root, level):
    pass


def run_count_at_level(level):
    root = BinaryTree(1)
    root.left = BinaryTree(2)
    root.right = BinaryTree(3)
    root.left.left = BinaryTree(4)
    root.left.right = BinaryTree(5)
    return count_at_level(root, level)
`,
      'function',
      funcCases(
        'run_count_at_level',
        [
          { id: 's1', description: 'Level 2 has two nodes', args: [2], expectedReturn: 2 },
          { id: 's2', description: 'Level 3 has two nodes', args: [3], expectedReturn: 2 },
        ],
        [
          { id: 'h1', args: [1], expectedReturn: 1 },
          { id: 'h2', args: [4], expectedReturn: 0 },
          { id: 'h3', args: [0], expectedReturn: 0 },
        ]
      ),
      ms(
        `${BTREE_CLASS}def count_at_level(root, level):
    if root is None or level < 1:
        return 0
    if level == 1:
        return 1
    return count_at_level(root.left, level - 1) + count_at_level(root.right, level - 1)`,
        'Decrement level while recursing; when level hits 1, count the current node. Summing left and right counts all nodes at that depth.'
      )
    ),

    cr(
      't7-q3',
      `Build a binary tree from a **preorder list with null markers** (\`null\` means no child). Implement \`build_from_preorder(nodes)\` consuming the list left-to-right.\n\nExample: \`[1, 2, null, null, 3, null, null]\` builds root 1, left child 2, right child 3.\n\nThe starter includes \`run_build_preorder\` — **do not edit it**.`,
      `${BTREE_CLASS}def build_from_preorder(nodes):
    pass


def run_build_preorder(nodes):
    root = build_from_preorder(nodes[:])
    if root is None:
        return []
    return [root.data, root.left.data if root.left else None, root.right.data if root.right else None]
`,
      'function',
      funcCases(
        'run_build_preorder',
        [
          {
            id: 's1',
            description: 'Small tree',
            args: [[1, 2, null, null, 3, null, null]],
            expectedReturn: [1, 2, 3],
          },
        ],
        [
          {
            id: 'h1',
            args: [[5, null, null]],
            expectedReturn: [5, null, null],
          },
          {
            id: 'h2',
            args: [[2, 1, null, null, 3, null, null]],
            expectedReturn: [2, 1, 3],
          },
        ]
      ),
      ms(
        `${BTREE_CLASS}def build_from_preorder(nodes):
    if not nodes:
        return None
    val = nodes.pop(0)
    if val is None:
        return None
    node = BinaryTree(val)
    node.left = build_from_preorder(nodes)
    node.right = build_from_preorder(nodes)
    return node`,
        'Preorder visits root before children — pop the next value, attach left subtree, then right. Null markers encode missing children without ambiguity.'
      )
    ),

    cr(
      't7-q4',
      `Implement \`mirror_tree(root)\` returning a **new tree** that is the left-right mirror of \`root\` (swap children recursively). Return \`null\` for \`null\` input.\n\nThe starter includes \`run_mirror\` — **do not edit it**.`,
      `${BTREE_CLASS}def mirror_tree(root):
    pass


def in_order(root):
    if root is None:
        return []
    return in_order(root.left) + [root.data] + in_order(root.right)


def run_mirror():
    root = BinaryTree(1)
    root.left = BinaryTree(2)
    root.right = BinaryTree(3)
    root.left.left = BinaryTree(4)
    mirrored = mirror_tree(root)
    return in_order(mirrored)
`,
      'function',
      funcCases(
        'run_mirror',
        [
          { id: 's1', description: 'In-order of mirrored tree', args: [], expectedReturn: [3, 1, 4, 2] },
        ],
        [
          { id: 'h1', args: [], expectedReturn: [3, 1, 4, 2] },
        ]
      ),
      ms(
        `${BTREE_CLASS}def mirror_tree(root):
    if root is None:
        return None
    new_node = BinaryTree(root.data)
    new_node.left = mirror_tree(root.right)
    new_node.right = mirror_tree(root.left)
    return new_node`,
        'Mirror swaps left and right at every node. Building new nodes avoids mutating the original tree — useful when both versions must coexist.'
      )
    ),

    mc(
      't7-q5',
      'In-order traversal of a binary search tree visits values in sorted order. What order does **pre-order** visit nodes?',
      [
        { id: 'a', text: 'Right subtree, root, left subtree' },
        { id: 'b', text: 'Root, left subtree, right subtree' },
        { id: 'c', text: 'Left subtree, right subtree, root' },
        { id: 'd', text: 'Level by level from leaves upward' },
      ],
      'b',
      ms(
        'Root, then left, then right.',
        'Pre-order processes the current node before its children — useful for copying trees or prefix serializations. Post-order is left, right, root; in-order is left, root, right.'
      )
    ),

    tf(
      't7-q6',
      'A full binary tree of height `h` has at most `2^h - 1` nodes when every level is completely filled.',
      'true',
      ms(
        'True — geometric series 1 + 2 + 4 + ... + 2^(h-1).',
        'Each level doubles the maximum node count. This upper bound explains why balanced trees keep height logarithmic in n.'
      )
    ),
  ],
};

export default test7;
