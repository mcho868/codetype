import type { Question } from '../../python101/types';
import { cr, mc, tf, fib, funcCases, ms } from '../authoring';

const BTREE_CLASS = `class BinaryTree:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

`;

function buildTreeDriver(fnName: string, body: string): string {
  return `${BTREE_CLASS}${body}

def ${fnName}():
    root = BinaryTree(1)
    root.left = BinaryTree(2)
    root.right = BinaryTree(3)
    root.left.left = BinaryTree(4)
    root.left.right = BinaryTree(5)
    return ${fnName.replace('run_', '')}(root)
`;
}

export const module7Questions: Question[] = [
  cr(
    'm7-c1',
    'Implement the `BinaryTree` class with `__init__(self, data)`, `left`, and `right` attributes (initially `None`).\n\nThe starter includes `build_and_read` — **do not edit it**. It builds a small tree and returns `[root.data, root.left.data, root.right.data]`.',
    `${BTREE_CLASS}def build_and_read():
    root = BinaryTree(1)
    root.left = BinaryTree(2)
    root.right = BinaryTree(3)
    return [root.data, root.left.data, root.right.data]
`,
    'function',
    funcCases(
      'build_and_read',
      [
        { id: 's1', description: 'Root and children', args: [], expectedReturn: [1, 2, 3] },
      ],
      [
        { id: 'h1', args: [], expectedReturn: [1, 2, 3] },
      ]
    ),
    ms(
      `${BTREE_CLASS}`,
      'Each node stores data plus left and right child references, initially None.'
    )
  ),
  cr(
    'm7-c2',
    'Write `tree_height(node)` returning the height of a binary tree. An empty tree (`None`) has height `0`; a single node has height `1`.\n\nThe starter includes `run_tree_height` — **do not edit it**.',
    buildTreeDriver('run_tree_height', 'def tree_height(node):\n    pass'),
    'function',
    funcCases(
      'run_tree_height',
      [
        { id: 's1', description: 'Sample tree height', args: [], expectedReturn: 3 },
      ],
      [
        { id: 'h1', args: [], expectedReturn: 3 },
      ]
    ),
    ms(
      `${BTREE_CLASS}def tree_height(node):
    if node is None:
        return 0
    return 1 + max(tree_height(node.left), tree_height(node.right))`,
      'Recursive: 1 + max of subtree heights; None contributes 0.'
    )
  ),
  cr(
    'm7-c3',
    'Write `count_nodes(node)` returning the total number of nodes in the tree.\n\nThe starter includes `run_count_nodes` — **do not edit it**.',
    buildTreeDriver('run_count_nodes', 'def count_nodes(node):\n    pass'),
    'function',
    funcCases(
      'run_count_nodes',
      [
        { id: 's1', description: 'Five-node tree', args: [], expectedReturn: 5 },
      ],
      [
        { id: 'h1', args: [], expectedReturn: 5 },
      ]
    ),
    ms(
      `${BTREE_CLASS}def count_nodes(node):
    if node is None:
        return 0
    return 1 + count_nodes(node.left) + count_nodes(node.right)`,
      'Count self plus both subtrees recursively.'
    )
  ),
  cr(
    'm7-c4',
    'Write `pre_order(node)` returning a **list** of node values in pre-order (node, left, right).\n\nThe starter includes `run_pre_order` — **do not edit it**.',
    buildTreeDriver('run_pre_order', 'def pre_order(node):\n    pass'),
    'function',
    funcCases(
      'run_pre_order',
      [
        { id: 's1', description: 'Pre-order list', args: [], expectedReturn: [1, 2, 4, 5, 3] },
      ],
      [
        { id: 'h1', args: [], expectedReturn: [1, 2, 4, 5, 3] },
      ]
    ),
    ms(
      `${BTREE_CLASS}def pre_order(node):
    if node is None:
        return []
    return [node.data] + pre_order(node.left) + pre_order(node.right)`,
      'Visit node first, then left subtree, then right subtree.'
    )
  ),
  cr(
    'm7-c5',
    'Write `in_order(node)` returning a **list** of node values in in-order (left, node, right).\n\nThe starter includes `run_in_order` — **do not edit it**.',
    buildTreeDriver('run_in_order', 'def in_order(node):\n    pass'),
    'function',
    funcCases(
      'run_in_order',
      [
        { id: 's1', description: 'In-order list', args: [], expectedReturn: [4, 2, 5, 1, 3] },
      ],
      [
        { id: 'h1', args: [], expectedReturn: [4, 2, 5, 1, 3] },
      ]
    ),
    ms(
      `${BTREE_CLASS}def in_order(node):
    if node is None:
        return []
    return in_order(node.left) + [node.data] + in_order(node.right)`,
      'Left subtree, then node, then right subtree.'
    )
  ),
  cr(
    'm7-c6',
    'Write `post_order(node)` returning a **list** of node values in post-order (left, right, node).\n\nThe starter includes `run_post_order` — **do not edit it**.',
    buildTreeDriver('run_post_order', 'def post_order(node):\n    pass'),
    'function',
    funcCases(
      'run_post_order',
      [
        { id: 's1', description: 'Post-order list', args: [], expectedReturn: [4, 5, 2, 3, 1] },
      ],
      [
        { id: 'h1', args: [], expectedReturn: [4, 5, 2, 3, 1] },
      ]
    ),
    ms(
      `${BTREE_CLASS}def post_order(node):
    if node is None:
        return []
    return post_order(node.left) + post_order(node.right) + [node.data]`,
      'Both children before the current node.'
    )
  ),
  cr(
    'm7-c7',
    'Write `find_max(node)` returning the maximum value in a binary tree (not necessarily a BST).\n\nThe starter includes `run_find_max` — **do not edit it**.',
    `class BinaryTree:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


def find_max(node):
    pass


def run_find_max():
    root = BinaryTree(3)
    root.left = BinaryTree(7)
    root.right = BinaryTree(1)
    root.left.left = BinaryTree(9)
    root.left.right = BinaryTree(2)
    return find_max(root)
`,
    'function',
    funcCases(
      'run_find_max',
      [
        { id: 's1', description: 'Max in mixed tree', args: [], expectedReturn: 9 },
      ],
      [
        { id: 'h1', args: [], expectedReturn: 9 },
      ]
    ),
    ms(
      `${BTREE_CLASS}def find_max(node):
    if node is None:
        return float("-inf")
    return max(node.data, find_max(node.left), find_max(node.right))`,
      'Compare node data with max of both subtrees — must visit all nodes.'
    )
  ),
  mc(
    'q7-1',
    'What is the "root" of a tree?',
    [
      { id: 'a', text: 'Any node with no children' },
      { id: 'b', text: 'The single top node with no parent' },
      { id: 'c', text: 'The deepest node in the tree' },
      { id: 'd', text: 'The node with the most children' },
    ],
    'b',
    'The root is the unique top node with no parent.'
  ),
  fib(
    'q7-2',
    'A node with no children is called a ___ node.',
    'leaf',
    'Leaf nodes sit at the tips of branches — no children.'
  ),
  tf(
    'q7-4',
    'Trees can contain cycles — a node can be its own ancestor.',
    'false',
    'Trees are acyclic — every node except the root has exactly one parent.'
  ),
  mc(
    'q7-6',
    'For a Binary Search Tree, which traversal visits nodes in sorted ascending order?',
    [
      { id: 'a', text: 'Pre-order' },
      { id: 'b', text: 'In-order' },
      { id: 'c', text: 'Post-order' },
      { id: 'd', text: 'Level-order' },
    ],
    'b',
    'In-order (left → node → right) of a BST yields sorted ascending values.'
  ),
  mc(
    'q7-7',
    'In a binary tree, what is a "leaf" node?',
    [
      { id: 'a', text: 'The topmost node' },
      { id: 'b', text: 'A node with no children' },
      { id: 'c', text: 'A node with exactly one child' },
      { id: 'd', text: 'Any node on the left side' },
    ],
    'b',
    'A leaf has no left or right child — it sits at the bottom of its branch. The topmost node is the root.'
  ),
  mc(
    'q7-8',
    'What is the maximum number of children a node can have in a BINARY tree?',
    [
      { id: 'a', text: '1' },
      { id: 'b', text: '2' },
      { id: 'c', text: '3' },
      { id: 'd', text: 'Unlimited' },
    ],
    'b',
    'A binary tree node has at most two children, conventionally called left and right.'
  ),
  mc(
    'q7-9',
    'Pre-order traversal visits nodes in which order?',
    [
      { id: 'a', text: 'Left subtree, node, right subtree' },
      { id: 'b', text: 'Node, left subtree, right subtree' },
      { id: 'c', text: 'Left subtree, right subtree, node' },
      { id: 'd', text: 'Right subtree, node, left subtree' },
    ],
    'b',
    'Pre-order = Node first, then Left, then Right. (In-order = L,N,R; Post-order = L,R,N.)'
  ),
  mc(
    'q7-10',
    'The "height" of a binary tree is:',
    [
      { id: 'a', text: 'The total number of nodes' },
      { id: 'b', text: 'The number of leaf nodes' },
      { id: 'c', text: 'The length of the longest path from the root down to a leaf' },
      { id: 'd', text: 'The number of children of the root' },
    ],
    'c',
    'Height is the longest root-to-leaf path; it bounds the worst-case cost of operations that descend the tree.'
  ),
  tf(
    'q7-11',
    'Tree traversals are naturally expressed with recursion: process a node, then recurse on its left and right subtrees.',
    'true',
    'A subtree is itself a tree, so recursing on `node.left` and `node.right` mirrors the structure — the base case is an empty (None) subtree.'
  ),
];
