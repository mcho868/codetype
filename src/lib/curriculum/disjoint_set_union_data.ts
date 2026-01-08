import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "disjoint-set-union",
  title: "Disjoint Set Union (Union-Find)",
  difficulty: "hard",
  category: "Advanced Data Structures",
  description: "Union and find with path compression.",
  runtime: "O(alpha(n))",
  variants: {
    typescript: `class DSU {
  parent: number[];
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }
  find(x: number): number {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
  union(a: number, b: number) {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra !== rb) this.parent[ra] = rb;
  }
}`,
    javascript: `class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
  union(a, b) {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra !== rb) this.parent[ra] = rb;
  }
}`,
    python: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, a, b):
        ra = self.find(a)
        rb = self.find(b)
        if ra != rb:
            self.parent[ra] = rb`,
    java: `class DSU {
    int[] parent;
    DSU(int n) { parent = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }

    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    void union(int a, int b) {
        int ra = find(a);
        int rb = find(b);
        if (ra != rb) parent[ra] = rb;
    }
}
`,
    csharp: `public class Dsu
{
    private readonly int[] _parent;
    public Dsu(int n)
    {
        _parent = new int[n];
        for (int i = 0; i < n; i++) _parent[i] = i;
    }

    public int Find(int x)
    {
        if (_parent[x] != x) _parent[x] = Find(_parent[x]);
        return _parent[x];
    }

    public void Union(int a, int b)
    {
        int ra = Find(a);
        int rb = Find(b);
        if (ra != rb) _parent[ra] = rb;
    }
}
`,
    c: `// Disjoint Set Union (Union-Find)
#include <stdlib.h>

typedef struct {
  int n;
  int *parent;
  int *rank;
} DSU;

void dsu_init(DSU *d, int n) {
  d->n = n;
  d->parent = (int *)malloc(sizeof(int) * n);
  d->rank = (int *)calloc(n, sizeof(int));
  for (int i = 0; i < n; i++) d->parent[i] = i;
}

int dsu_find(DSU *d, int x) {
  if (d->parent[x] != x) d->parent[x] = dsu_find(d, d->parent[x]);
  return d->parent[x];
}

void dsu_union(DSU *d, int a, int b) {
  int ra = dsu_find(d, a);
  int rb = dsu_find(d, b);
  if (ra == rb) return;
  if (d->rank[ra] < d->rank[rb]) d->parent[ra] = rb;
  else if (d->rank[ra] > d->rank[rb]) d->parent[rb] = ra;
  else { d->parent[rb] = ra; d->rank[ra]++; }
}`,
  },
};

export default algorithm;
