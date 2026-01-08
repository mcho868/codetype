import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "dijkstra",
  title: "Dijkstra's Algorithm",
  difficulty: "hard",
  category: "Graphs",
  description: "Shortest paths with non-negative weights.",
  runtime: "O((V + E) log V)",
  variants: {
    typescript: `function dijkstra(graph: Record<string, [string, number][]>, start: string) {
  const dist: Record<string, number> = {};
  const visited = new Set<string>();
  for (const node in graph) dist[node] = Infinity;
  dist[start] = 0;

  while (true) {
    let closest: string | null = null;
    let best = Infinity;
    for (const node in dist) {
      if (!visited.has(node) && dist[node] < best) {
        best = dist[node];
        closest = node;
      }
    }
    if (closest === null) break;
    visited.add(closest);
    for (const [neighbor, weight] of graph[closest] ?? []) {
      const alt = dist[closest] + weight;
      if (alt < dist[neighbor]) dist[neighbor] = alt;
    }
  }

  return dist;
}`,
    javascript: `function dijkstra(graph, start) {
  const dist = {};
  const visited = new Set();
  for (const node in graph) dist[node] = Infinity;
  dist[start] = 0;

  while (true) {
    let closest = null;
    let best = Infinity;
    for (const node in dist) {
      if (!visited.has(node) && dist[node] < best) {
        best = dist[node];
        closest = node;
      }
    }
    if (closest === null) break;
    visited.add(closest);
    for (const [neighbor, weight] of graph[closest] || []) {
      const alt = dist[closest] + weight;
      if (alt < dist[neighbor]) dist[neighbor] = alt;
    }
  }
  return dist;
}`,
    python: `def dijkstra(graph, start):
    dist = {node: float("inf") for node in graph}
    dist[start] = 0
    visited = set()
    while True:
        closest = None
        best = float("inf")
        for node, value in dist.items():
            if node not in visited and value < best:
                best = value
                closest = node
        if closest is None:
            break
        visited.add(closest)
        for neighbor, weight in graph.get(closest, []):
            alt = dist[closest] + weight
            if alt < dist[neighbor]:
                dist[neighbor] = alt
    return dist`,
    java: `public Map<String, Integer> dijkstra(Map<String, List<int[]>> graph, String start) {
    Map<String, Integer> dist = new HashMap<>();
    Set<String> visited = new HashSet<>();
    for (String node : graph.keySet()) dist.put(node, Integer.MAX_VALUE);
    dist.put(start, 0);

    while (true) {
        String closest = null;
        int best = Integer.MAX_VALUE;
        for (var entry : dist.entrySet()) {
            if (!visited.contains(entry.getKey()) && entry.getValue() < best) {
                best = entry.getValue();
                closest = entry.getKey();
            }
        }
        if (closest == null) break;
        visited.add(closest);
        for (int[] edge : graph.getOrDefault(closest, List.of())) {
            String neighbor = String.valueOf(edge[0]);
            int weight = edge[1];
            int alt = dist.get(closest) + weight;
            if (alt < dist.getOrDefault(neighbor, Integer.MAX_VALUE)) dist.put(neighbor, alt);
        }
    }
    return dist;
}`,
    csharp: `public Dictionary<string, int> Dijkstra(Dictionary<string, List<(string to, int w)>> graph, string start)
{
    var dist = graph.Keys.ToDictionary(k => k, _ => int.MaxValue);
    dist[start] = 0;
    var visited = new HashSet<string>();

    while (true)
    {
        string? closest = null;
        int best = int.MaxValue;
        foreach (var kv in dist)
        {
            if (!visited.Contains(kv.Key) && kv.Value < best)
            {
                best = kv.Value;
                closest = kv.Key;
            }
        }
        if (closest == null) break;
        visited.Add(closest);
        foreach (var (to, w) in graph.GetValueOrDefault(closest, new()))
        {
            if (dist[closest] == int.MaxValue) continue;
            int alt = dist[closest] + w;
            if (alt < dist.GetValueOrDefault(to, int.MaxValue)) dist[to] = alt;
        }
    }
    return dist;
}`,
    c: `#include <limits.h>

void dijkstra(int **graph, int n, int start, int *dist) {
  int visited[n];
  for (int i = 0; i < n; i++) {
    dist[i] = INT_MAX;
    visited[i] = 0;
  }
  dist[start] = 0;
  for (int count = 0; count < n - 1; count++) {
    int min = INT_MAX;
    int u = -1;
    for (int v = 0; v < n; v++) {
      if (!visited[v] && dist[v] < min) { min = dist[v]; u = v; }
    }
    if (u == -1) break;
    visited[u] = 1;
    for (int v = 0; v < n; v++) {
      if (!visited[v] && graph[u][v] > 0 && dist[u] != INT_MAX) {
        int alt = dist[u] + graph[u][v];
        if (alt < dist[v]) dist[v] = alt;
      }
    }
  }
}`,
  },
};

export default algorithm;
