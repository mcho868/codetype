import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "balanced-trees",
  title: "Balanced Trees (AVL)",
  difficulty: "hard",
  category: "Data Structures",
  description: "Keep tree height logarithmic with rotations.",
  runtime: "O(log n)",
  variants: {
    typescript: `class AVLNode {
  value: number;
  height: number = 1;
  left: AVLNode | null = null;
  right: AVLNode | null = null;
  constructor(value: number) { this.value = value; }
}

class AVLTree {
  root: AVLNode | null = null;
  insert(value: number) { this.root = this.insertNode(this.root, value); }

  private height(node: AVLNode | null): number { return node ? node.height : 0; }
  private balance(node: AVLNode | null): number {
    return node ? this.height(node.left) - this.height(node.right) : 0;
  }

  private rotateRight(y: AVLNode): AVLNode {
    const x = y.left!;
    const t2 = x.right;
    x.right = y;
    y.left = t2;
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    return x;
  }

  private rotateLeft(x: AVLNode): AVLNode {
    const y = x.right!;
    const t2 = y.left;
    y.left = x;
    x.right = t2;
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    return y;
  }

  private insertNode(node: AVLNode | null, value: number): AVLNode {
    if (!node) return new AVLNode(value);
    if (value < node.value) node.left = this.insertNode(node.left, value);
    else if (value > node.value) node.right = this.insertNode(node.right, value);
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
    const balance = this.balance(node);
    if (balance > 1 && value < node.left!.value) return this.rotateRight(node);
    if (balance < -1 && value > node.right!.value) return this.rotateLeft(node);
    if (balance > 1 && value > node.left!.value) {
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }
    if (balance < -1 && value < node.right!.value) {
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }
    return node;
  }
}`,
    javascript: `class AVLNode {
  constructor(value) {
    this.value = value;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

class AVLTree {
  constructor() { this.root = null; }
  height(node) { return node ? node.height : 0; }
  balance(node) { return node ? this.height(node.left) - this.height(node.right) : 0; }

  rotateRight(y) {
    const x = y.left;
    const t2 = x.right;
    x.right = y;
    y.left = t2;
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    const t2 = y.left;
    y.left = x;
    x.right = t2;
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    return y;
  }

  insert(value) { this.root = this.insertNode(this.root, value); }

  insertNode(node, value) {
    if (!node) return new AVLNode(value);
    if (value < node.value) node.left = this.insertNode(node.left, value);
    else if (value > node.value) node.right = this.insertNode(node.right, value);
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
    const balance = this.balance(node);
    if (balance > 1 && value < node.left.value) return this.rotateRight(node);
    if (balance < -1 && value > node.right.value) return this.rotateLeft(node);
    if (balance > 1 && value > node.left.value) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }
    if (balance < -1 && value < node.right.value) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }
    return node;
  }
}`,
    python: `class AVLNode:
    def __init__(self, value):
        self.value = value
        self.height = 1
        self.left = None
        self.right = None


class AVLTree:
    def __init__(self):
        self.root = None

    def height(self, node):
        return node.height if node else 0

    def balance(self, node):
        return self.height(node.left) - self.height(node.right) if node else 0

    def rotate_right(self, y):
        x = y.left
        t2 = x.right
        x.right = y
        y.left = t2
        y.height = max(self.height(y.left), self.height(y.right)) + 1
        x.height = max(self.height(x.left), self.height(x.right)) + 1
        return x

    def rotate_left(self, x):
        y = x.right
        t2 = y.left
        y.left = x
        x.right = t2
        x.height = max(self.height(x.left), self.height(x.right)) + 1
        y.height = max(self.height(y.left), self.height(y.right)) + 1
        return y

    def insert(self, value):
        self.root = self._insert(self.root, value)

    def _insert(self, node, value):
        if not node:
            return AVLNode(value)
        if value < node.value:
            node.left = self._insert(node.left, value)
        elif value > node.value:
            node.right = self._insert(node.right, value)
        node.height = max(self.height(node.left), self.height(node.right)) + 1
        balance = self.balance(node)
        if balance > 1 and value < node.left.value:
            return self.rotate_right(node)
        if balance < -1 and value > node.right.value:
            return self.rotate_left(node)
        if balance > 1 and value > node.left.value:
            node.left = self.rotate_left(node.left)
            return self.rotate_right(node)
        if balance < -1 and value < node.right.value:
            node.right = self.rotate_right(node.right)
            return self.rotate_left(node)
        return node`,
    java: `class AVLNode {
    int value;
    int height = 1;
    AVLNode left;
    AVLNode right;
    AVLNode(int value) { this.value = value; }
}

class AVLTree {
    AVLNode root;

    int height(AVLNode node) { return node == null ? 0 : node.height; }
    int balance(AVLNode node) { return node == null ? 0 : height(node.left) - height(node.right); }

    AVLNode rotateRight(AVLNode y) {
        AVLNode x = y.left;
        AVLNode t2 = x.right;
        x.right = y;
        y.left = t2;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        return x;
    }

    AVLNode rotateLeft(AVLNode x) {
        AVLNode y = x.right;
        AVLNode t2 = y.left;
        y.left = x;
        x.right = t2;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        return y;
    }

    void insert(int value) { root = insertNode(root, value); }

    AVLNode insertNode(AVLNode node, int value) {
        if (node == null) return new AVLNode(value);
        if (value < node.value) node.left = insertNode(node.left, value);
        else if (value > node.value) node.right = insertNode(node.right, value);
        node.height = Math.max(height(node.left), height(node.right)) + 1;
        int balance = balance(node);
        if (balance > 1 && value < node.left.value) return rotateRight(node);
        if (balance < -1 && value > node.right.value) return rotateLeft(node);
        if (balance > 1 && value > node.left.value) {
            node.left = rotateLeft(node.left);
            return rotateRight(node);
        }
        if (balance < -1 && value < node.right.value) {
            node.right = rotateRight(node.right);
            return rotateLeft(node);
        }
        return node;
    }
}`,
    csharp: `public class AvlNode
{
    public int Value;
    public int Height = 1;
    public AvlNode? Left;
    public AvlNode? Right;
    public AvlNode(int value) { Value = value; }
}

public class AvlTree
{
    public AvlNode? Root;

    private int Height(AvlNode? node) => node?.Height ?? 0;
    private int Balance(AvlNode? node) => node == null ? 0 : Height(node.Left) - Height(node.Right);

    private AvlNode RotateRight(AvlNode y)
    {
        var x = y.Left!;
        var t2 = x.Right;
        x.Right = y;
        y.Left = t2;
        y.Height = Math.Max(Height(y.Left), Height(y.Right)) + 1;
        x.Height = Math.Max(Height(x.Left), Height(x.Right)) + 1;
        return x;
    }

    private AvlNode RotateLeft(AvlNode x)
    {
        var y = x.Right!;
        var t2 = y.Left;
        y.Left = x;
        x.Right = t2;
        x.Height = Math.Max(Height(x.Left), Height(x.Right)) + 1;
        y.Height = Math.Max(Height(y.Left), Height(y.Right)) + 1;
        return y;
    }

    public void Insert(int value) => Root = InsertNode(Root, value);

    private AvlNode InsertNode(AvlNode? node, int value)
    {
        if (node == null) return new AvlNode(value);
        if (value < node.Value) node.Left = InsertNode(node.Left, value);
        else if (value > node.Value) node.Right = InsertNode(node.Right, value);
        node.Height = Math.Max(Height(node.Left), Height(node.Right)) + 1;
        int balance = Balance(node);
        if (balance > 1 && value < node.Left!.Value) return RotateRight(node);
        if (balance < -1 && value > node.Right!.Value) return RotateLeft(node);
        if (balance > 1 && value > node.Left!.Value)
        {
            node.Left = RotateLeft(node.Left!);
            return RotateRight(node);
        }
        if (balance < -1 && value < node.Right!.Value)
        {
            node.Right = RotateRight(node.Right!);
            return RotateLeft(node);
        }
        return node;
    }
}
`,
    c: `#include <stdlib.h>

typedef struct AVLNode {
  int value;
  int height;
  struct AVLNode *left;
  struct AVLNode *right;
} AVLNode;

int height(AVLNode *node) { return node ? node->height : 0; }

int max_int(int a, int b) { return a > b ? a : b; }

AVLNode *new_node(int value) {
  AVLNode *node = (AVLNode *)malloc(sizeof(AVLNode));
  node->value = value;
  node->left = node->right = NULL;
  node->height = 1;
  return node;
}

AVLNode *rotate_right(AVLNode *y) {
  AVLNode *x = y->left;
  AVLNode *t2 = x->right;
  x->right = y;
  y->left = t2;
  y->height = max_int(height(y->left), height(y->right)) + 1;
  x->height = max_int(height(x->left), height(x->right)) + 1;
  return x;
}

AVLNode *rotate_left(AVLNode *x) {
  AVLNode *y = x->right;
  AVLNode *t2 = y->left;
  y->left = x;
  x->right = t2;
  x->height = max_int(height(x->left), height(x->right)) + 1;
  y->height = max_int(height(y->left), height(y->right)) + 1;
  return y;
}

int balance(AVLNode *node) { return node ? height(node->left) - height(node->right) : 0; }

AVLNode *avl_insert(AVLNode *node, int value) {
  if (!node) return new_node(value);
  if (value < node->value) node->left = avl_insert(node->left, value);
  else if (value > node->value) node->right = avl_insert(node->right, value);
  node->height = 1 + max_int(height(node->left), height(node->right));
  int b = balance(node);
  if (b > 1 && value < node->left->value) return rotate_right(node);
  if (b < -1 && value > node->right->value) return rotate_left(node);
  if (b > 1 && value > node->left->value) {
    node->left = rotate_left(node->left);
    return rotate_right(node);
  }
  if (b < -1 && value < node->right->value) {
    node->right = rotate_right(node->right);
    return rotate_left(node);
  }
  return node;
}`,
  },
};

export default algorithm;
