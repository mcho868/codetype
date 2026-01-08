import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "kruskal",
  title: "Kruskal's Algorithm",
  difficulty: "hard",
  category: "Graphs",
  description: "Minimum spanning tree using sorted edges.",
  runtime: "O(E log E)",
  variants: {
    typescript: `type Edge = { u: number; v: number; w: number };

function kruskal(n: number, edges: Edge[]): Edge[] {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  const union = (a: number, b: number) => { parent[find(a)] = find(b); };
  const result: Edge[] = [];
  edges.sort((a, b) => a.w - b.w);
  for (const edge of edges) {
    if (find(edge.u) !== find(edge.v)) {
      result.push(edge);
      union(edge.u, edge.v);
    }
  }
  return result;
}`,
    javascript: `function kruskal(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  const union = (a, b) => { parent[find(a)] = find(b); };
  const result = [];
  edges.sort((a, b) => a.w - b.w);
  for (const edge of edges) {
    if (find(edge.u) !== find(edge.v)) {
      result.push(edge);
      union(edge.u, edge.v);
    }
  }
  return result;
}`,
    python: `def kruskal(n, edges):
    parent = list(range(n))

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(a, b):
        parent[find(a)] = find(b)

    result = []
    edges.sort(key=lambda e: e[2])
    for u, v, w in edges:
        if find(u) != find(v):
            result.append((u, v, w))
            union(u, v)
    return result`,
    java: `public List<int[]> kruskal(int n, List<int[]> edges) {
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    java.util.function.IntUnaryOperator find = new java.util.function.IntUnaryOperator() {
        public int applyAsInt(int x) { return parent[x] == x ? x : (parent[x] = applyAsInt(parent[x])); }
    };
    edges.sort(java.util.Comparator.comparingInt(a -> a[2]));
    List<int[]> result = new ArrayList<>();
    for (int[] e : edges) {
        int u = e[0], v = e[1];
        if (find.applyAsInt(u) != find.applyAsInt(v)) {
            result.add(e);
            parent[find.applyAsInt(u)] = find.applyAsInt(v);
        }
    }
    return result;
}`,
    csharp: `public List<(int u, int v, int w)> Kruskal(int n, List<(int u, int v, int w)> edges)
{
    var parent = Enumerable.Range(0, n).ToArray();
    int Find(int x) => parent[x] == x ? x : parent[x] = Find(parent[x]);
    void Union(int a, int b) => parent[Find(a)] = Find(b);

    var result = new List<(int u, int v, int w)>();
    foreach (var edge in edges.OrderBy(e => e.w))
    {
        if (Find(edge.u) != Find(edge.v))
        {
            result.Add(edge);
            Union(edge.u, edge.v);
        }
    }
    return result;
}`,
    c: `#include <stdlib.h>

typedef struct { int u; int v; int w; } Edge;

int cmp_edge(const void *a, const void *b) {
  return ((const Edge *)a)->w - ((const Edge *)b)->w;
}

typedef struct { int *parent; } DSU;

int dsu_find(DSU *dsu, int x) {
  if (dsu->parent[x] != x) dsu->parent[x] = dsu_find(dsu, dsu->parent[x]);
  return dsu->parent[x];
}

void dsu_union(DSU *dsu, int a, int b) {
  int ra = dsu_find(dsu, a);
  int rb = dsu_find(dsu, b);
  if (ra != rb) dsu->parent[ra] = rb;
}

int kruskal(int n, Edge *edges, int m, Edge *out) {
  qsort(edges, m, sizeof(Edge), cmp_edge);
  DSU dsu; dsu.parent = (int *)malloc(sizeof(int) * n);
  for (int i = 0; i < n; i++) dsu.parent[i] = i;
  int count = 0;
  for (int i = 0; i < m; i++) {
    if (dsu_find(&dsu, edges[i].u) != dsu_find(&dsu, edges[i].v)) {
      out[count++] = edges[i];
      dsu_union(&dsu, edges[i].u, edges[i].v);
    }
  }
  free(dsu.parent);
  return count;
}`,
  },
};

export default algorithm;
