import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "prim",
  title: "Prim's Algorithm",
  difficulty: "hard",
  category: "Graphs",
  description: "Minimum spanning tree from a start node.",
  runtime: "O(E log V)",
  variants: {
    typescript: `function prim(graph: Record<number, [number, number][]>, start: number) {
  const visited = new Set<number>();
  const edges: [number, number, number][] = [];
  visited.add(start);
  while (true) {
    let candidate: [number, number, number] | null = null;
    for (const u of visited) {
      for (const [v, w] of graph[u] ?? []) {
        if (!visited.has(v) && (!candidate || w < candidate[2])) {
          candidate = [u, v, w];
        }
      }
    }
    if (!candidate) break;
    edges.push(candidate);
    visited.add(candidate[1]);
  }
  return edges;
}`,
    javascript: `function prim(graph, start) {
  const visited = new Set();
  const edges = [];
  visited.add(start);
  while (true) {
    let candidate = null;
    for (const u of visited) {
      for (const [v, w] of graph[u] || []) {
        if (!visited.has(v) && (!candidate || w < candidate[2])) {
          candidate = [u, v, w];
        }
      }
    }
    if (!candidate) break;
    edges.push(candidate);
    visited.add(candidate[1]);
  }
  return edges;
}`,
    python: `def prim(graph, start):
    visited = {start}
    edges = []
    while True:
        candidate = None
        for u in visited:
            for v, w in graph.get(u, []):
                if v not in visited and (candidate is None or w < candidate[2]):
                    candidate = (u, v, w)
        if candidate is None:
            break
        edges.append(candidate)
        visited.add(candidate[1])
    return edges`,
    java: `public List<int[]> prim(Map<Integer, List<int[]>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    List<int[]> edges = new ArrayList<>();
    visited.add(start);
    while (true) {
        int[] candidate = null;
        for (int u : visited) {
            for (int[] edge : graph.getOrDefault(u, List.of())) {
                int v = edge[0];
                int w = edge[1];
                if (!visited.contains(v) && (candidate == null || w < candidate[2])) {
                    candidate = new int[] { u, v, w };
                }
            }
        }
        if (candidate == null) break;
        edges.add(candidate);
        visited.add(candidate[1]);
    }
    return edges;
}`,
    csharp: `public List<(int u, int v, int w)> Prim(Dictionary<int, List<(int v, int w)>> graph, int start)
{
    var visited = new HashSet<int> { start };
    var edges = new List<(int u, int v, int w)>();
    while (true)
    {
        (int u, int v, int w)? candidate = null;
        foreach (var u in visited)
        {
            foreach (var (v, w) in graph.GetValueOrDefault(u, new()))
            {
                if (!visited.Contains(v) && (candidate == null || w < candidate.Value.w))
                {
                    candidate = (u, v, w);
                }
            }
        }
        if (candidate == null) break;
        edges.Add(candidate.Value);
        visited.Add(candidate.Value.v);
    }
    return edges;
}`,
    c: `#include <limits.h>

void prim(int **graph, int n, int start, int *parent) {
  int key[n];
  int in_mst[n];
  for (int i = 0; i < n; i++) { key[i] = INT_MAX; in_mst[i] = 0; parent[i] = -1; }
  key[start] = 0;
  for (int count = 0; count < n - 1; count++) {
    int min = INT_MAX, u = -1;
    for (int v = 0; v < n; v++) if (!in_mst[v] && key[v] < min) { min = key[v]; u = v; }
    if (u == -1) break;
    in_mst[u] = 1;
    for (int v = 0; v < n; v++) {
      if (graph[u][v] && !in_mst[v] && graph[u][v] < key[v]) {
        parent[v] = u;
        key[v] = graph[u][v];
      }
    }
  }
}`,
  },
};

export default algorithm;
