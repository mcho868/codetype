import type { Question } from '../../python101/types';
import { cr, mc, tf, funcCases, ms } from '../authoring';

const BST_CLASS = `class BST:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

`;

export const module8Questions: Question[] = [
  cr(
    'm8-c1',
    'Implement `BST` with `insert(value)` placing smaller values left and greater-or-equal values right.\n\nThe starter includes `run_bst_insert` — **do not edit it**. It inserts a sequence and returns an in-order list via the provided helper.',
    `${BST_CLASS}    def insert(self, value):
        pass


def in_order(node):
    if node is None:
        return []
    return in_order(node.left) + [node.data] + in_order(node.right)


def run_bst_insert(values):
    if not values:
        return []
    root = BST(values[0])
    for v in values[1:]:
        root.insert(v)
    return in_order(root)
`,
    'function',
    funcCases(
      'run_bst_insert',
      [
        {
          id: 's1',
          description: 'Classic insert sequence',
          args: [[8, 3, 10, 1, 6, 14, 13]],
          expectedReturn: [1, 3, 6, 8, 10, 13, 14],
        },
        {
          id: 's2',
          description: 'Single value',
          args: [[5]],
          expectedReturn: [5],
        },
      ],
      [
        { id: 'h1', args: [[4, 2, 6]], expectedReturn: [2, 4, 6] },
        { id: 'h2', args: [[5, 5, 5]], expectedReturn: [5, 5, 5] },
      ]
    ),
    ms(
      `${BST_CLASS}    def insert(self, value):
        if value < self.data:
            if self.left is None:
                self.left = BST(value)
            else:
                self.left.insert(value)
        else:
            if self.right is None:
                self.right = BST(value)
            else:
                self.right.insert(value)`,
      'Recurse left for smaller, right for greater-or-equal; new leaf at None.'
    )
  ),
  cr(
    'm8-c2',
    'Add `search(value)` to `BST` returning `True` if the value exists, else `False`.\n\nThe starter includes `run_bst_search` — **do not edit it**.',
    `${BST_CLASS}    def insert(self, value):
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

    def search(self, value):
        pass


def run_bst_search():
    root = BST(8)
    for v in [3, 10, 1, 6, 14, 13]:
        root.insert(v)
    return [root.search(6), root.search(7), root.search(1)]
`,
    'function',
    funcCases(
      'run_bst_search',
      [
        { id: 's1', description: 'Hit and miss', args: [], expectedReturn: [true, false, true] },
      ],
      [
        { id: 'h1', args: [], expectedReturn: [true, false, true] },
      ]
    ),
    ms(
      `${BST_CLASS}    def search(self, value):
        if value == self.data:
            return True
        if value < self.data:
            return self.left.search(value) if self.left else False
        return self.right.search(value) if self.right else False`,
      'Compare at each node; recurse left or right; None means not found.'
    )
  ),
  cr(
    'm8-c3',
    'Add `in_order(self)` returning a sorted **list** of all values.\n\nThe starter includes `run_bst_in_order` — **do not edit it**.',
    `${BST_CLASS}    def insert(self, value):
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

    def in_order(self):
        pass


def run_bst_in_order():
    root = BST(8)
    for v in [3, 10, 1, 6, 14, 13]:
        root.insert(v)
    return root.in_order()
`,
    'function',
    funcCases(
      'run_bst_in_order',
      [
        { id: 's1', description: 'Sorted output', args: [], expectedReturn: [1, 3, 6, 8, 10, 13, 14] },
      ],
      [
        { id: 'h1', args: [], expectedReturn: [1, 3, 6, 8, 10, 13, 14] },
      ]
    ),
    ms(
      `${BST_CLASS}    def in_order(self):
        result = []
        if self.left:
            result += self.left.in_order()
        result.append(self.data)
        if self.right:
            result += self.right.in_order()
        return result`,
      'Left subtree, current node, right subtree — yields ascending order in a BST.'
    )
  ),
  cr(
    'm8-c4',
    'Write `find_min(root)` returning the smallest value in a BST.\n\nThe starter includes `run_find_min` — **do not edit it**.',
    `${BST_CLASS}    def insert(self, value):
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


def find_min(root):
    pass


def run_find_min():
    root = BST(8)
    for v in [3, 10, 1, 6, 14]:
        root.insert(v)
    return find_min(root)
`,
    'function',
    funcCases(
      'run_find_min',
      [
        { id: 's1', description: 'Minimum value', args: [], expectedReturn: 1 },
      ],
      [
        { id: 'h1', args: [], expectedReturn: 1 },
      ]
    ),
    ms(
      `${BST_CLASS}def find_min(root):
    current = root
    while current.left:
        current = current.left
    return current.data`,
      'Follow left pointers until left is None — leftmost node is minimum.'
    )
  ),
  cr(
    'm8-c5',
    'Write `find_max(root)` returning the largest value in a BST.\n\nThe starter includes `run_find_max` — **do not edit it**.',
    `${BST_CLASS}    def insert(self, value):
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


def find_max(root):
    pass


def run_find_max():
    root = BST(8)
    for v in [3, 10, 1, 6, 14]:
        root.insert(v)
    return find_max(root)
`,
    'function',
    funcCases(
      'run_find_max',
      [
        { id: 's1', description: 'Maximum value', args: [], expectedReturn: 14 },
      ],
      [
        { id: 'h1', args: [], expectedReturn: 14 },
      ]
    ),
    ms(
      `${BST_CLASS}def find_max(root):
    current = root
    while current.right:
        current = current.right
    return current.data`,
      'Follow right pointers to the rightmost node.'
    )
  ),
  cr(
    'm8-c6',
    'Implement `delete(self, value)` on `BST` handling leaf, one-child, and two-children cases. Return the (possibly new) root.\n\nThe starter includes `run_bst_delete` — **do not edit it**.',
    `${BST_CLASS}    def insert(self, value):
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

    def in_order(self):
        result = []
        if self.left:
            result += self.left.in_order()
        result.append(self.data)
        if self.right:
            result += self.right.in_order()
        return result

    def find_min_node(self):
        current = self
        while current.left:
            current = current.left
        return current.data

    def delete(self, value):
        pass


def run_bst_delete():
    root = BST(8)
    for v in [3, 10, 1, 6, 14, 13]:
        root.insert(v)
    root = root.delete(3)
    return root.in_order()
`,
    'function',
    funcCases(
      'run_bst_delete',
      [
        { id: 's1', description: 'Delete node with two children', args: [], expectedReturn: [1, 6, 8, 10, 13, 14] },
      ],
      [
        { id: 'h1', args: [], expectedReturn: [1, 6, 8, 10, 13, 14] },
      ]
    ),
    ms(
      `${BST_CLASS}    def delete(self, value):
        if value < self.data:
            if self.left:
                self.left = self.left.delete(value)
        elif value > self.data:
            if self.right:
                self.right = self.right.delete(value)
        else:
            if self.left is None:
                return self.right
            if self.right is None:
                return self.left
            successor = self.right.find_min_node()
            self.data = successor
            self.right = self.right.delete(successor)
        return self`,
      'Two-child case: replace with in-order successor from right subtree, then delete successor.'
    )
  ),
  cr(
    'm8-c7',
    'Combine insert, search, and in-order: implement all three on `BST`.\n\nThe starter includes `run_bst_all` — **do not edit it**.',
    `${BST_CLASS}    def insert(self, value):
        pass

    def search(self, value):
        pass

    def in_order(self):
        pass


def run_bst_all():
    root = BST(8)
    for v in [3, 10, 1, 6, 14, 13]:
        root.insert(v)
    return [root.search(6), root.search(7), root.in_order()]
`,
    'function',
    funcCases(
      'run_bst_all',
      [
        {
          id: 's1',
          description: 'Search and sorted list',
          args: [],
          expectedReturn: [true, false, [1, 3, 6, 8, 10, 13, 14]],
        },
      ],
      [
        {
          id: 'h1',
          args: [],
          expectedReturn: [true, false, [1, 3, 6, 8, 10, 13, 14]],
        },
      ]
    ),
    ms(
      `${BST_CLASS}    def insert(self, value):
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

    def search(self, value):
        if value == self.data:
            return True
        if value < self.data:
            return self.left.search(value) if self.left else False
        return self.right.search(value) if self.right else False

    def in_order(self):
        result = []
        if self.left:
            result += self.left.in_order()
        result.append(self.data)
        if self.right:
            result += self.right.in_order()
        return result`,
      'Standard BST insert/search/in-order trio — foundation for all BST operations.'
    )
  ),
  mc(
    'q8-1',
    'The BST property states that for any node, values in the left subtree are:',
    [
      { id: 'a', text: 'Greater than the node\'s value' },
      { id: 'b', text: 'Less than the node\'s value' },
      { id: 'c', text: 'Equal to the node\'s value' },
      { id: 'd', text: 'In random order' },
    ],
    'b',
    'Left < node < right at every node — enables O(log n) search in a balanced tree.'
  ),
  tf(
    'q8-2',
    'Inserting values 1, 2, 3, 4, 5 in sorted order into a BST produces a balanced tree.',
    'false',
    'Sorted insertion creates a degenerate chain — height n, operations become O(n).'
  ),
  mc(
    'q8-4',
    'In-order traversal of a BST always produces values in what kind of order?',
    [
      { id: 'a', text: 'Sorted ascending order' },
      { id: 'b', text: 'Reverse insertion order' },
      { id: 'c', text: 'Random order' },
      { id: 'd', text: 'Level-order' },
    ],
    'a',
    'In-order visits left (smaller), node, right (larger) — ascending sorted output.'
  ),
  tf(
    'q8-6',
    'The BST property must hold at every node in the tree, not just the root.',
    'true',
    'BST ordering is recursive — every subtree must also satisfy the property.'
  ),
  mc(
    'q8-7',
    'In a Binary Search Tree, for any node, values in its LEFT subtree are:',
    [
      { id: 'a', text: 'Greater than the node’s value' },
      { id: 'b', text: 'Less than the node’s value' },
      { id: 'c', text: 'Equal to the node’s value' },
      { id: 'd', text: 'In no particular relationship' },
    ],
    'b',
    'The BST property: left subtree holds smaller values, right subtree holds larger values — this is what makes search efficient.'
  ),
  mc(
    'q8-8',
    'Searching for a value in a BALANCED BST of n nodes is which complexity?',
    [
      { id: 'a', text: 'O(n)' },
      { id: 'b', text: 'O(log n)' },
      { id: 'c', text: 'O(1)' },
      { id: 'd', text: 'O(n²)' },
    ],
    'b',
    'Each comparison discards one subtree, halving the search space — O(log n) when the tree is balanced.'
  ),
  mc(
    'q8-9',
    'A BST built by inserting already-sorted values (1, 2, 3, 4, 5) degenerates into what, and what is search then?',
    [
      { id: 'a', text: 'A balanced tree; O(log n)' },
      { id: 'b', text: 'A straight line (like a linked list); O(n)' },
      { id: 'c', text: 'An empty tree; O(1)' },
      { id: 'd', text: 'A complete tree; O(1)' },
    ],
    'b',
    'Sorted inserts make every node a right child, forming a chain of height n — search degrades to O(n). This motivates self-balancing trees.'
  ),
  mc(
    'q8-10',
    'To find the SMALLEST value in a BST, you:',
    [
      { id: 'a', text: 'Follow right children until there is none' },
      { id: 'b', text: 'Follow left children until there is none' },
      { id: 'c', text: 'Return the root' },
      { id: 'd', text: 'Do an in-order traversal of the whole tree' },
    ],
    'b',
    'The minimum is the leftmost node — keep going left until a node has no left child.'
  ),
];
