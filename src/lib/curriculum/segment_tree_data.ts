import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "segment-tree",
  title: "Segment Tree",
  difficulty: "hard",
  category: "Advanced Data Structures",
  description: "Range query and update in log time.",
  runtime: "O(log n)",
  variants: {
    typescript: `class SegmentTree {
  private tree: number[];
  private n: number;

  constructor(arr: number[]) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.build(arr, 1, 0, this.n - 1);
  }

  private build(arr: number[], node: number, l: number, r: number) {
    if (l === r) {
      this.tree[node] = arr[l];
      return;
    }
    const mid = Math.floor((l + r) / 2);
    this.build(arr, node * 2, l, mid);
    this.build(arr, node * 2 + 1, mid + 1, r);
    this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1];
  }

  query(ql: number, qr: number): number {
    return this.queryNode(1, 0, this.n - 1, ql, qr);
  }

  private queryNode(node: number, l: number, r: number, ql: number, qr: number): number {
    if (ql > r || qr < l) return 0;
    if (ql <= l && r <= qr) return this.tree[node];
    const mid = Math.floor((l + r) / 2);
    return this.queryNode(node * 2, l, mid, ql, qr) + this.queryNode(node * 2 + 1, mid + 1, r, ql, qr);
  }
}
`,
    javascript: `class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.build(arr, 1, 0, this.n - 1);
  }

  build(arr, node, l, r) {
    if (l === r) {
      this.tree[node] = arr[l];
      return;
    }
    const mid = Math.floor((l + r) / 2);
    this.build(arr, node * 2, l, mid);
    this.build(arr, node * 2 + 1, mid + 1, r);
    this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1];
  }

  query(ql, qr) {
    return this.queryNode(1, 0, this.n - 1, ql, qr);
  }

  queryNode(node, l, r, ql, qr) {
    if (ql > r || qr < l) return 0;
    if (ql <= l && r <= qr) return this.tree[node];
    const mid = Math.floor((l + r) / 2);
    return this.queryNode(node * 2, l, mid, ql, qr) + this.queryNode(node * 2 + 1, mid + 1, r, ql, qr);
  }
}
`,
    python: `class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self._build(arr, 1, 0, self.n - 1)

    def _build(self, arr, node, l, r):
        if l == r:
            self.tree[node] = arr[l]
            return
        mid = (l + r) // 2
        self._build(arr, node * 2, l, mid)
        self._build(arr, node * 2 + 1, mid + 1, r)
        self.tree[node] = self.tree[node * 2] + self.tree[node * 2 + 1]

    def query(self, ql, qr):
        return self._query(1, 0, self.n - 1, ql, qr)

    def _query(self, node, l, r, ql, qr):
        if ql > r or qr < l:
            return 0
        if ql <= l and r <= qr:
            return self.tree[node]
        mid = (l + r) // 2
        return self._query(node * 2, l, mid, ql, qr) + self._query(node * 2 + 1, mid + 1, r, ql, qr)
`,
    java: `class SegmentTree {
    int[] tree;
    int n;

    SegmentTree(int[] arr) {
        n = arr.length;
        tree = new int[4 * n];
        build(arr, 1, 0, n - 1);
    }

    void build(int[] arr, int node, int l, int r) {
        if (l == r) { tree[node] = arr[l]; return; }
        int mid = (l + r) / 2;
        build(arr, node * 2, l, mid);
        build(arr, node * 2 + 1, mid + 1, r);
        tree[node] = tree[node * 2] + tree[node * 2 + 1];
    }

    int query(int ql, int qr) { return queryNode(1, 0, n - 1, ql, qr); }

    int queryNode(int node, int l, int r, int ql, int qr) {
        if (ql > r || qr < l) return 0;
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        return queryNode(node * 2, l, mid, ql, qr) + queryNode(node * 2 + 1, mid + 1, r, ql, qr);
    }
}
`,
    csharp: `public class SegmentTree
{
    private readonly int[] _tree;
    private readonly int _n;

    public SegmentTree(int[] arr)
    {
        _n = arr.Length;
        _tree = new int[4 * _n];
        Build(arr, 1, 0, _n - 1);
    }

    private void Build(int[] arr, int node, int l, int r)
    {
        if (l == r) { _tree[node] = arr[l]; return; }
        int mid = (l + r) / 2;
        Build(arr, node * 2, l, mid);
        Build(arr, node * 2 + 1, mid + 1, r);
        _tree[node] = _tree[node * 2] + _tree[node * 2 + 1];
    }

    public int Query(int ql, int qr) => QueryNode(1, 0, _n - 1, ql, qr);

    private int QueryNode(int node, int l, int r, int ql, int qr)
    {
        if (ql > r || qr < l) return 0;
        if (ql <= l && r <= qr) return _tree[node];
        int mid = (l + r) / 2;
        return QueryNode(node * 2, l, mid, ql, qr) + QueryNode(node * 2 + 1, mid + 1, r, ql, qr);
    }
}
`,
    c: `// Segment Tree for range sum
#include <stdlib.h>

typedef struct {
  int n;
  int *tree;
} SegmentTree;

void seg_init(SegmentTree *st, int n) {
  st->n = n;
  st->tree = (int *)calloc(4 * n, sizeof(int));
}

void seg_build(SegmentTree *st, int *arr, int node, int l, int r) {
  if (l == r) { st->tree[node] = arr[l]; return; }
  int mid = (l + r) / 2;
  seg_build(st, arr, node * 2, l, mid);
  seg_build(st, arr, node * 2 + 1, mid + 1, r);
  st->tree[node] = st->tree[node * 2] + st->tree[node * 2 + 1];
}

int seg_query(SegmentTree *st, int node, int l, int r, int ql, int qr) {
  if (qr < l || r < ql) return 0;
  if (ql <= l && r <= qr) return st->tree[node];
  int mid = (l + r) / 2;
  return seg_query(st, node * 2, l, mid, ql, qr)
       + seg_query(st, node * 2 + 1, mid + 1, r, ql, qr);
}

void seg_update(SegmentTree *st, int node, int l, int r, int idx, int val) {
  if (l == r) { st->tree[node] = val; return; }
  int mid = (l + r) / 2;
  if (idx <= mid) seg_update(st, node * 2, l, mid, idx, val);
  else seg_update(st, node * 2 + 1, mid + 1, r, idx, val);
  st->tree[node] = st->tree[node * 2] + st->tree[node * 2 + 1];
}`,
  },
};

export default algorithm;
