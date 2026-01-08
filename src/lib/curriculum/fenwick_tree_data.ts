import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "fenwick-tree",
  title: "Fenwick Tree (BIT)",
  difficulty: "hard",
  category: "Advanced Data Structures",
  description: "Prefix sums with log-time updates.",
  runtime: "O(log n)",
  variants: {
    typescript: `class FenwickTree {
  private tree: number[];
  constructor(n: number) {
    this.tree = new Array(n + 1).fill(0);
  }
  update(index: number, delta: number) {
    for (let i = index + 1; i < this.tree.length; i += i & -i) {
      this.tree[i] += delta;
    }
  }
  query(index: number): number {
    let sum = 0;
    for (let i = index + 1; i > 0; i -= i & -i) {
      sum += this.tree[i];
    }
    return sum;
  }
}`,
    javascript: `class FenwickTree {
  constructor(n) {
    this.tree = new Array(n + 1).fill(0);
  }
  update(index, delta) {
    for (let i = index + 1; i < this.tree.length; i += i & -i) {
      this.tree[i] += delta;
    }
  }
  query(index) {
    let sum = 0;
    for (let i = index + 1; i > 0; i -= i & -i) {
      sum += this.tree[i];
    }
    return sum;
  }
}`,
    python: `class FenwickTree:
    def __init__(self, n):
        self.tree = [0] * (n + 1)

    def update(self, index, delta):
        i = index + 1
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & -i

    def query(self, index):
        s = 0
        i = index + 1
        while i > 0:
            s += self.tree[i]
            i -= i & -i
        return s`,
    java: `class FenwickTree {
    int[] tree;
    FenwickTree(int n) { tree = new int[n + 1]; }

    void update(int index, int delta) {
        for (int i = index + 1; i < tree.length; i += i & -i) tree[i] += delta;
    }

    int query(int index) {
        int sum = 0;
        for (int i = index + 1; i > 0; i -= i & -i) sum += tree[i];
        return sum;
    }
}
`,
    csharp: `public class FenwickTree
{
    private readonly int[] _tree;
    public FenwickTree(int n) { _tree = new int[n + 1]; }

    public void Update(int index, int delta)
    {
        for (int i = index + 1; i < _tree.Length; i += i & -i)
        {
            _tree[i] += delta;
        }
    }

    public int Query(int index)
    {
        int sum = 0;
        for (int i = index + 1; i > 0; i -= i & -i)
        {
            sum += _tree[i];
        }
        return sum;
    }
}
`,
    c: `// Fenwick Tree (Binary Indexed Tree)
#include <stdlib.h>

typedef struct {
  int n;
  int *tree;
} Fenwick;

void fenwick_init(Fenwick *f, int n) {
  f->n = n;
  f->tree = (int *)calloc(n + 1, sizeof(int));
}

void fenwick_add(Fenwick *f, int idx, int delta) {
  for (int i = idx; i <= f->n; i += i & -i) f->tree[i] += delta;
}

int fenwick_sum(const Fenwick *f, int idx) {
  int res = 0;
  for (int i = idx; i > 0; i -= i & -i) res += f->tree[i];
  return res;
}

int fenwick_range_sum(const Fenwick *f, int l, int r) {
  return fenwick_sum(f, r) - fenwick_sum(f, l - 1);
}`,
  },
};

export default algorithm;
