import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "bellman-ford",
  title: "Bellman-Ford",
  difficulty: "hard",
  category: "Graphs",
  description: "Shortest paths with negative edges.",
  runtime: "O(VE)",
  variants: {
    typescript: `type Edge = { from: string; to: string; weight: number };

function bellmanFord(nodes: string[], edges: Edge[], start: string) {
  const dist: Record<string, number> = {};
  nodes.forEach((n) => (dist[n] = Infinity));
  dist[start] = 0;
  for (let i = 0; i < nodes.length - 1; i += 1) {
    for (const edge of edges) {
      if (dist[edge.from] + edge.weight < dist[edge.to]) {
        dist[edge.to] = dist[edge.from] + edge.weight;
      }
    }
  }
  return dist;
}`,
    javascript: `function bellmanFord(nodes, edges, start) {
  const dist = {};
  nodes.forEach((n) => (dist[n] = Infinity));
  dist[start] = 0;
  for (let i = 0; i < nodes.length - 1; i += 1) {
    for (const edge of edges) {
      if (dist[edge.from] + edge.weight < dist[edge.to]) {
        dist[edge.to] = dist[edge.from] + edge.weight;
      }
    }
  }
  return dist;
}`,
    python: `def bellman_ford(nodes, edges, start):
    dist = {n: float("inf") for n in nodes}
    dist[start] = 0
    for _ in range(len(nodes) - 1):
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    return dist`,
    java: `public Map<String, Integer> bellmanFord(List<String> nodes, List<int[]> edges, String start) {
    Map<String, Integer> dist = new HashMap<>();
    for (String node : nodes) dist.put(node, Integer.MAX_VALUE);
    dist.put(start, 0);
    for (int i = 0; i < nodes.size() - 1; i++) {
        for (int[] edge : edges) {
            String u = String.valueOf(edge[0]);
            String v = String.valueOf(edge[1]);
            int w = edge[2];
            int current = dist.getOrDefault(u, Integer.MAX_VALUE);
            if (current != Integer.MAX_VALUE && current + w < dist.getOrDefault(v, Integer.MAX_VALUE)) {
                dist.put(v, current + w);
            }
        }
    }
    return dist;
}`,
    csharp: `public Dictionary<string, int> BellmanFord(List<string> nodes, List<(string from, string to, int w)> edges, string start)
{
    var dist = nodes.ToDictionary(n => n, _ => int.MaxValue);
    dist[start] = 0;
    for (int i = 0; i < nodes.Count - 1; i++)
    {
        foreach (var (from, to, w) in edges)
        {
            if (dist[from] == int.MaxValue) continue;
            int alt = dist[from] + w;
            if (alt < dist.GetValueOrDefault(to, int.MaxValue)) dist[to] = alt;
        }
    }
    return dist;
}`,
    c: `#include <limits.h>

typedef struct { int u; int v; int w; } Edge;

void bellman_ford(int n, Edge *edges, int m, int start, int *dist) {
  for (int i = 0; i < n; i++) dist[i] = INT_MAX;
  dist[start] = 0;
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < m; j++) {
      int u = edges[j].u;
      int v = edges[j].v;
      int w = edges[j].w;
      if (dist[u] != INT_MAX && dist[u] + w < dist[v]) dist[v] = dist[u] + w;
    }
  }
}`,
  },
};

export default algorithm;
