import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "bfs",
  title: "Breadth-First Search (BFS)",
  difficulty: "medium",
  category: "Graphs",
  description: "Traverse graph level by level.",
  runtime: "O(V + E)",
  variants: {
    typescript: `function bfs(graph: Record<string, string[]>, start: string): string[] {
  const visited = new Set<string>();
  const queue: string[] = [start];
  const order: string[] = [];
  while (queue.length) {
    const node = queue.shift()!;
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    for (const neighbor of graph[node] ?? []) {
      if (!visited.has(neighbor)) queue.push(neighbor);
    }
  }
  return order;
}`,
    javascript: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) queue.push(neighbor);
    }
  }
  return order;
}`,
    python: `def bfs(graph, start):
    visited = set()
    queue = [start]
    order = []
    while queue:
        node = queue.pop(0)
        if node in visited:
            continue
        visited.add(node)
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                queue.append(neighbor)
    return order`,
    java: `public List<String> bfs(Map<String, List<String>> graph, String start) {
    Set<String> visited = new HashSet<>();
    Queue<String> queue = new LinkedList<>();
    List<String> order = new ArrayList<>();
    queue.add(start);
    while (!queue.isEmpty()) {
        String node = queue.poll();
        if (visited.contains(node)) continue;
        visited.add(node);
        order.add(node);
        for (String neighbor : graph.getOrDefault(node, List.of())) {
            if (!visited.contains(neighbor)) queue.add(neighbor);
        }
    }
    return order;
}`,
    csharp: `public List<string> Bfs(Dictionary<string, List<string>> graph, string start)
{
    var visited = new HashSet<string>();
    var queue = new Queue<string>();
    var order = new List<string>();
    queue.Enqueue(start);
    while (queue.Count > 0)
    {
        var node = queue.Dequeue();
        if (visited.Contains(node)) continue;
        visited.Add(node);
        order.Add(node);
        if (!graph.ContainsKey(node)) continue;
        foreach (var neighbor in graph[node])
        {
            if (!visited.Contains(neighbor)) queue.Enqueue(neighbor);
        }
    }
    return order;
}`,
    c: `#include <stdlib.h>

typedef struct {
  int *data;
  int head;
  int tail;
} Queue;

void bfs(int **adj, int n, int start, int *order, int *order_len) {
  int *visited = (int *)calloc(n, sizeof(int));
  Queue q = { (int *)malloc(sizeof(int) * n), 0, 0 };
  q.data[q.tail++] = start;
  *order_len = 0;

  while (q.head < q.tail) {
    int node = q.data[q.head++];
    if (visited[node]) continue;
    visited[node] = 1;
    order[(*order_len)++] = node;
    for (int i = 0; i < n; i++) {
      if (adj[node][i] && !visited[i]) q.data[q.tail++] = i;
    }
  }
  free(visited);
  free(q.data);
}`,
  },
};

export default algorithm;
