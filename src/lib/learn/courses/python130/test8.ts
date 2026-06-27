import type { Module } from './types';
import { cr, mc, tf, funcCases, ms } from './authoring';

const BST_CLASS = `class BST:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

`;

const test8: Module = {
  id: 'test-8',
  slug: 'test-8',
  title: 'Module 8 Test — Binary Search Trees',
  description:
    'Transfer-level practice: range sum queries, BST validation, and kth smallest via in-order.',
  icon: '📝',
  color: 'from-violet-500 to-purple-400',
  locked: false,
  isMidterm: true,
  lessons: [],
  questions: [
    cr(
      't8-q1',
      `Implement \`range_sum(root, lo, hi)\` returning the sum of all node values where \`lo <= value <= hi\` in a BST.\n\nThe starter includes \`run_range_sum\` — **do not edit it** (builds a BST from a list).`,
      `${BST_CLASS}def insert_bst(root, value):
    if root is None:
        return BST(value)
    if value < root.data:
        root.left = insert_bst(root.left, value)
    else:
        root.right = insert_bst(root.right, value)
    return root


def range_sum(root, lo, hi):
    pass


def run_range_sum(values, lo, hi):
    root = None
    for v in values:
        root = insert_bst(root, v)
    return range_sum(root, lo, hi)
`,
      'function',
      funcCases(
        'run_range_sum',
        [
          { id: 's1', description: 'Sum values in [4, 12]', args: [[8, 3, 10, 1, 6, 14, 4, 7, 13], 4, 12], expectedReturn: 35 },
        ],
        [
          { id: 'h1', args: [[5, 2, 8], 10, 20], expectedReturn: 0 },
          { id: 'h2', args: [[5], 5, 5], expectedReturn: 5 },
          { id: 'h3', args: [[10, 5, 15, 3, 7], 3, 7], expectedReturn: 15 },
        ]
      ),
      ms(
        `${BST_CLASS}def range_sum(root, lo, hi):
    if root is None:
        return 0
    total = 0
    if lo <= root.data <= hi:
        total += root.data
    if root.data > lo:
        total += range_sum(root.left, lo, hi)
    if root.data < hi:
        total += range_sum(root.right, lo, hi)
    return total`,
        'BST ordering prunes search: if root.data <= lo, skip left; if root.data >= hi, skip right. Only visit subtrees that can contain values in range.'
      )
    ),

    cr(
      't8-q2',
      `Implement \`is_valid_bst(root)\` returning \`True\` when the tree satisfies BST ordering (all left descendants < node < all right descendants).\n\nUse min/max bounds (\`-infinity\`, \`+infinity\`) or an in-order check.\n\nThe starter includes \`run_is_valid_bst\` — **do not edit it**.`,
      `${BST_CLASS}def is_valid_bst(root):
    pass


def run_is_valid_bst(nodes):
    # nodes: list of [value, left_index, right_index] or None child; -1 means no child
    def build(idx):
        if idx < 0 or idx >= len(nodes):
            return None
        val, li, ri = nodes[idx]
        node = BST(val)
        node.left = build(li)
        node.right = build(ri)
        return node

    root = build(0) if nodes else None
    return is_valid_bst(root)
`,
      'function',
      funcCases(
        'run_is_valid_bst',
        [
          {
            id: 's1',
            description: 'Valid BST',
            args: [[[10, 1, 2], [5, -1, -1], [15, -1, -1]]],
            expectedReturn: true,
          },
          {
            id: 's2',
            description: 'Invalid — 6 is in right subtree but less than root 10',
            args: [[[10, 1, 2], [5, -1, -1], [15, 3, -1], [6, -1, -1]]],
            expectedReturn: false,
          },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: true },
          { id: 'h2', args: [[[5, -1, -1]]], expectedReturn: true },
        ]
      ),
      ms(
        `${BST_CLASS}def is_valid_bst(root, lo=float("-inf"), hi=float("inf")):
    if root is None:
        return True
    if not (lo < root.data < hi):
        return False
    return is_valid_bst(root.left, lo, root.data) and is_valid_bst(root.right, root.data, hi)`,
        'Each node must fall inside (lo, hi) exclusive bounds passed down from ancestors. A node only in the left subtree of 10 must still be > all ancestors on the right path.'
      )
    ),

    cr(
      't8-q3',
      `Implement \`kth_smallest(root, k)\` (1-indexed) using **in-order** traversal. Return \`null\` if \`k\` is larger than the number of nodes.\n\nThe starter includes \`run_kth_smallest\` — **do not edit it**.`,
      `${BST_CLASS}def kth_smallest(root, k):
    pass


def run_kth_smallest(values, k):
    root = None
    for v in values:
        if root is None:
            root = BST(v)
        else:
            cur = root
            while True:
                if v < cur.data:
                    if cur.left is None:
                        cur.left = BST(v)
                        break
                    cur = cur.left
                else:
                    if cur.right is None:
                        cur.right = BST(v)
                        break
                    cur = cur.right
    return kth_smallest(root, k)
`,
      'function',
      funcCases(
        'run_kth_smallest',
        [
          { id: 's1', description: '3rd smallest in 5-node tree', args: [[5, 3, 7, 2, 4], 3], expectedReturn: 4 },
          { id: 's2', description: '1st smallest', args: [[5, 3, 7, 2, 4], 1], expectedReturn: 2 },
        ],
        [
          { id: 'h1', args: [[10], 1], expectedReturn: 10 },
          { id: 'h2', args: [[10], 2], expectedReturn: null },
          { id: 'h3', args: [[8, 3, 10, 1, 6], 5], expectedReturn: 8 },
        ]
      ),
      ms(
        `${BST_CLASS}def kth_smallest(root, k):
    count = [0]
    result = [None]

    def in_order(node):
        if node is None or result[0] is not None:
            return
        in_order(node.left)
        count[0] += 1
        if count[0] == k:
            result[0] = node.data
            return
        in_order(node.right)

    in_order(root)
    return result[0]`,
        'In-order on a BST yields sorted values — the kth visited node is the kth smallest. Stop early once found to avoid extra work.'
      )
    ),

    cr(
      't8-q4',
      `Implement \`bst_contains(root, target)\` returning whether \`target\` appears anywhere in the BST (standard BST search).\n\nThe starter includes \`run_bst_contains\` — **do not edit it**.`,
      `${BST_CLASS}def bst_contains(root, target):
    pass


def run_bst_contains(values, target):
    root = None
    for v in values:
        if root is None:
            root = BST(v)
        else:
            cur = root
            while True:
                if v < cur.data:
                    if cur.left is None:
                        cur.left = BST(v)
                        break
                    cur = cur.left
                else:
                    if cur.right is None:
                        cur.right = BST(v)
                        break
                    cur = cur.right
    return bst_contains(root, target)
`,
      'function',
      funcCases(
        'run_bst_contains',
        [
          { id: 's1', description: 'Found', args: [[8, 3, 10, 1, 6], 6], expectedReturn: true },
          { id: 's2', description: 'Missing', args: [[8, 3, 10, 1, 6], 99], expectedReturn: false },
        ],
        [
          { id: 'h1', args: [[5], 5], expectedReturn: true },
          { id: 'h2', args: [[5], 3], expectedReturn: false },
        ]
      ),
      ms(
        `${BST_CLASS}def bst_contains(root, target):
    if root is None:
        return False
    if target == root.data:
        return True
    if target < root.data:
        return bst_contains(root.left, target)
    return bst_contains(root.right, target)`,
        'Compare target to current node; go left if smaller, right if larger. O(h) time where h is height — O(log n) when balanced.'
      )
    ),

    mc(
      't8-q5',
      'What is the worst-case time complexity of search in a BST with `n` nodes?',
      [
        { id: 'a', text: 'O(1)' },
        { id: 'b', text: 'O(log n)' },
        { id: 'c', text: 'O(n)' },
        { id: 'd', text: 'O(n log n)' },
      ],
      'c',
      ms(
        'O(n) when the tree degenerates to a linked list.',
        'Balanced BSTs achieve O(log n), but inserting sorted data creates a skewed chain where each search walks all n nodes — the worst case is linear.'
      )
    ),

    tf(
      't8-q6',
      'An in-order traversal of a valid BST visits node values in non-decreasing sorted order.',
      'true',
      ms(
        'True — left < root < right at every step.',
        'In-order (left, root, right) on a BST yields sorted output because every left subtree holds smaller keys and every right subtree holds larger keys.'
      )
    ),
  ],
};

export default test8;
