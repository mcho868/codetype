import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "binary-search-tree",
  title: "Binary Search Tree (BST)",
  difficulty: "medium",
  category: "Data Structures",
  description: "Insert, search, and delete in a BST.",
  runtime: "O(log n) avg",
  variants: {
    typescript: `class BSTNode {
  value: number;
  left: BSTNode | null = null;
  right: BSTNode | null = null;
  constructor(value: number) { this.value = value; }
}

class BST {
  root: BSTNode | null = null;
  insert(value: number) { this.root = this.insertNode(this.root, value); }
  search(value: number): boolean { return this.searchNode(this.root, value); }
  delete(value: number) { this.root = this.deleteNode(this.root, value); }

  private insertNode(node: BSTNode | null, value: number): BSTNode {
    if (!node) return new BSTNode(value);
    if (value < node.value) node.left = this.insertNode(node.left, value);
    else if (value > node.value) node.right = this.insertNode(node.right, value);
    return node;
  }

  private searchNode(node: BSTNode | null, value: number): boolean {
    if (!node) return false;
    if (value === node.value) return true;
    return value < node.value
      ? this.searchNode(node.left, value)
      : this.searchNode(node.right, value);
  }

  private deleteNode(node: BSTNode | null, value: number): BSTNode | null {
    if (!node) return null;
    if (value < node.value) node.left = this.deleteNode(node.left, value);
    else if (value > node.value) node.right = this.deleteNode(node.right, value);
    else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      const min = this.findMin(node.right);
      node.value = min.value;
      node.right = this.deleteNode(node.right, min.value);
    }
    return node;
  }

  private findMin(node: BSTNode): BSTNode {
    while (node.left) node = node.left;
    return node;
  }
}`,
    javascript: `class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() { this.root = null; }
  insert(value) { this.root = this.insertNode(this.root, value); }
  search(value) { return this.searchNode(this.root, value); }
  delete(value) { this.root = this.deleteNode(this.root, value); }

  insertNode(node, value) {
    if (!node) return new BSTNode(value);
    if (value < node.value) node.left = this.insertNode(node.left, value);
    else if (value > node.value) node.right = this.insertNode(node.right, value);
    return node;
  }

  searchNode(node, value) {
    if (!node) return false;
    if (value === node.value) return true;
    return value < node.value
      ? this.searchNode(node.left, value)
      : this.searchNode(node.right, value);
  }

  deleteNode(node, value) {
    if (!node) return null;
    if (value < node.value) node.left = this.deleteNode(node.left, value);
    else if (value > node.value) node.right = this.deleteNode(node.right, value);
    else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let min = node.right;
      while (min.left) min = min.left;
      node.value = min.value;
      node.right = this.deleteNode(node.right, min.value);
    }
    return node;
  }
}`,
    python: `class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class BST:
    def __init__(self):
        self.root = None

    def insert(self, value):
        self.root = self._insert(self.root, value)

    def search(self, value):
        return self._search(self.root, value)

    def delete(self, value):
        self.root = self._delete(self.root, value)

    def _insert(self, node, value):
        if not node:
            return BSTNode(value)
        if value < node.value:
            node.left = self._insert(node.left, value)
        elif value > node.value:
            node.right = self._insert(node.right, value)
        return node

    def _search(self, node, value):
        if not node:
            return False
        if value == node.value:
            return True
        return self._search(node.left, value) if value < node.value else self._search(node.right, value)

    def _delete(self, node, value):
        if not node:
            return None
        if value < node.value:
            node.left = self._delete(node.left, value)
        elif value > node.value:
            node.right = self._delete(node.right, value)
        else:
            if not node.left:
                return node.right
            if not node.right:
                return node.left
            successor = node.right
            while successor.left:
                successor = successor.left
            node.value = successor.value
            node.right = self._delete(node.right, successor.value)
        return node`,
    java: `class BSTNode {
    int value;
    BSTNode left;
    BSTNode right;
    BSTNode(int value) { this.value = value; }
}

class BST {
    BSTNode root;

    void insert(int value) { root = insertNode(root, value); }
    boolean search(int value) { return searchNode(root, value); }
    void delete(int value) { root = deleteNode(root, value); }

    private BSTNode insertNode(BSTNode node, int value) {
        if (node == null) return new BSTNode(value);
        if (value < node.value) node.left = insertNode(node.left, value);
        else if (value > node.value) node.right = insertNode(node.right, value);
        return node;
    }

    private boolean searchNode(BSTNode node, int value) {
        if (node == null) return false;
        if (value == node.value) return true;
        return value < node.value ? searchNode(node.left, value) : searchNode(node.right, value);
    }

    private BSTNode deleteNode(BSTNode node, int value) {
        if (node == null) return null;
        if (value < node.value) node.left = deleteNode(node.left, value);
        else if (value > node.value) node.right = deleteNode(node.right, value);
        else {
            if (node.left == null) return node.right;
            if (node.right == null) return node.left;
            BSTNode successor = node.right;
            while (successor.left != null) successor = successor.left;
            node.value = successor.value;
            node.right = deleteNode(node.right, successor.value);
        }
        return node;
    }
}`,
    csharp: `public class BstNode
{
    public int Value;
    public BstNode? Left;
    public BstNode? Right;
    public BstNode(int value) { Value = value; }
}

public class Bst
{
    public BstNode? Root;

    public void Insert(int value) => Root = InsertNode(Root, value);
    public bool Search(int value) => SearchNode(Root, value);
    public void Delete(int value) => Root = DeleteNode(Root, value);

    private BstNode InsertNode(BstNode? node, int value)
    {
        if (node == null) return new BstNode(value);
        if (value < node.Value) node.Left = InsertNode(node.Left, value);
        else if (value > node.Value) node.Right = InsertNode(node.Right, value);
        return node;
    }

    private bool SearchNode(BstNode? node, int value)
    {
        if (node == null) return false;
        if (value == node.Value) return true;
        return value < node.Value ? SearchNode(node.Left, value) : SearchNode(node.Right, value);
    }

    private BstNode? DeleteNode(BstNode? node, int value)
    {
        if (node == null) return null;
        if (value < node.Value) node.Left = DeleteNode(node.Left, value);
        else if (value > node.Value) node.Right = DeleteNode(node.Right, value);
        else
        {
            if (node.Left == null) return node.Right;
            if (node.Right == null) return node.Left;
            var successor = node.Right;
            while (successor.Left != null) successor = successor.Left;
            node.Value = successor.Value;
            node.Right = DeleteNode(node.Right, successor.Value);
        }
        return node;
    }
}
`,
    c: `#include <stdlib.h>

typedef struct Node {
  int value;
  struct Node *left;
  struct Node *right;
} Node;

Node *bst_insert(Node *root, int value) {
  if (!root) {
    Node *node = (Node *)malloc(sizeof(Node));
    node->value = value;
    node->left = node->right = NULL;
    return node;
  }
  if (value < root->value) root->left = bst_insert(root->left, value);
  else if (value > root->value) root->right = bst_insert(root->right, value);
  return root;
}

int bst_search(Node *root, int value) {
  if (!root) return 0;
  if (value == root->value) return 1;
  return value < root->value ? bst_search(root->left, value) : bst_search(root->right, value);
}

Node *bst_find_min(Node *node) {
  while (node && node->left) node = node->left;
  return node;
}

Node *bst_delete(Node *root, int value) {
  if (!root) return NULL;
  if (value < root->value) root->left = bst_delete(root->left, value);
  else if (value > root->value) root->right = bst_delete(root->right, value);
  else {
    if (!root->left) {
      Node *right = root->right;
      free(root);
      return right;
    }
    if (!root->right) {
      Node *left = root->left;
      free(root);
      return left;
    }
    Node *min = bst_find_min(root->right);
    root->value = min->value;
    root->right = bst_delete(root->right, min->value);
  }
  return root;
}`,
  },
};

export default algorithm;
