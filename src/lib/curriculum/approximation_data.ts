import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "approximation",
  title: "Approximation Algorithms",
  difficulty: "expert",
  category: "Approximation",
  description: "Near-optimal solutions for NP-hard problems.",
  runtime: "Varies",
  variants: {
    typescript: `type Edge = { u: number; v: number };

function vertexCoverApprox(edges: Edge[]): Set<number> {
  const cover = new Set<number>();
  const remaining = [...edges];
  while (remaining.length) {
    const edge = remaining.pop()!;
    cover.add(edge.u);
    cover.add(edge.v);
    for (let i = remaining.length - 1; i >= 0; i -= 1) {
      if (remaining[i].u === edge.u || remaining[i].v === edge.u || remaining[i].u === edge.v || remaining[i].v === edge.v) {
        remaining.splice(i, 1);
      }
    }
  }
  return cover;
}`,
    javascript: `function vertexCoverApprox(edges) {
  const cover = new Set();
  const remaining = [...edges];
  while (remaining.length) {
    const edge = remaining.pop();
    cover.add(edge.u);
    cover.add(edge.v);
    for (let i = remaining.length - 1; i >= 0; i -= 1) {
      if (remaining[i].u === edge.u || remaining[i].v === edge.u || remaining[i].u === edge.v || remaining[i].v === edge.v) {
        remaining.splice(i, 1);
      }
    }
  }
  return cover;
}`,
    python: `def vertex_cover_approx(edges):
    cover = set()
    remaining = list(edges)
    while remaining:
        u, v = remaining.pop()
        cover.add(u)
        cover.add(v)
        remaining = [e for e in remaining if u not in e and v not in e]
    return cover`,
    java: `public java.util.Set<Integer> vertexCoverApprox(java.util.List<int[]> edges) {
    java.util.Set<Integer> cover = new java.util.HashSet<>();
    java.util.List<int[]> remaining = new java.util.ArrayList<>(edges);
    while (!remaining.isEmpty()) {
        int[] edge = remaining.remove(remaining.size() - 1);
        int u = edge[0], v = edge[1];
        cover.add(u);
        cover.add(v);
        remaining.removeIf(e -> e[0] == u || e[1] == u || e[0] == v || e[1] == v);
    }
    return cover;
}`,
    csharp: `public HashSet<int> VertexCoverApprox(List<(int u, int v)> edges)
{
    var cover = new HashSet<int>();
    var remaining = new List<(int u, int v)>(edges);
    while (remaining.Count > 0)
    {
        var edge = remaining[^1];
        remaining.RemoveAt(remaining.Count - 1);
        cover.Add(edge.u);
        cover.Add(edge.v);
        remaining = remaining.Where(e => e.u != edge.u && e.v != edge.u && e.u != edge.v && e.v != edge.v).ToList();
    }
    return cover;
}`,
    c: `// 2-Approximation for Vertex Cover
#include <stdlib.h>

typedef struct { int u; int v; } Edge;

int approx_vertex_cover(Edge *edges, int m, int *in_cover, int n) {
  for (int i = 0; i < n; i++) in_cover[i] = 0;
  int count = 0;
  for (int i = 0; i < m; i++) {
    int u = edges[i].u;
    int v = edges[i].v;
    if (!in_cover[u] && !in_cover[v]) {
      in_cover[u] = 1;
      in_cover[v] = 1;
      count += 2;
    }
  }
  return count;
}`,
  },
};

export default algorithm;
