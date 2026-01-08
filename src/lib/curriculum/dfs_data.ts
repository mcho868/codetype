import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "dfs",
  title: "Depth-First Search (DFS)",
  difficulty: "medium",
  category: "Graphs",
  description: "Traverse graph by exploring depth first.",
  runtime: "O(V + E)",
  variants: {
    typescript: `function dfs(graph: Record<string, string[]>, start: string): string[] {
  const visited = new Set<string>();
  const order: string[] = [];
  const visit = (node: string) => {
    if (visited.has(node)) return;
    visited.add(node);
    order.push(node);
    for (const neighbor of graph[node] ?? []) {
      visit(neighbor);
    }
  };
  visit(start);
  return order;
}`,
    javascript: `function dfs(graph, start) {
  const visited = new Set();
  const order = [];
  const visit = (node) => {
    if (visited.has(node)) return;
    visited.add(node);
    order.push(node);
    for (const neighbor of graph[node] || []) {
      visit(neighbor);
    }
  };
  visit(start);
  return order;
}`,
    python: `def dfs(graph, start):
    visited = set()
    order = []

    def visit(node):
        if node in visited:
            return
        visited.add(node)
        order.append(node)
        for neighbor in graph.get(node, []):
            visit(neighbor)

    visit(start)
    return order`,
    java: `public List<String> dfs(Map<String, List<String>> graph, String start) {
    Set<String> visited = new HashSet<>();
    List<String> order = new ArrayList<>();
    visit(graph, start, visited, order);
    return order;
}

private void visit(Map<String, List<String>> graph, String node, Set<String> visited, List<String> order) {
    if (visited.contains(node)) return;
    visited.add(node);
    order.add(node);
    for (String neighbor : graph.getOrDefault(node, List.of())) {
        visit(graph, neighbor, visited, order);
    }
}`,
    csharp: `public List<string> Dfs(Dictionary<string, List<string>> graph, string start)
{
    var visited = new HashSet<string>();
    var order = new List<string>();
    void Visit(string node)
    {
        if (visited.Contains(node)) return;
        visited.Add(node);
        order.Add(node);
        if (!graph.ContainsKey(node)) return;
        foreach (var neighbor in graph[node])
        {
            Visit(neighbor);
        }
    }
    Visit(start);
    return order;
}`,
    c: `void dfs_visit(int **adj, int n, int node, int *visited, int *order, int *order_len) {
  if (visited[node]) return;
  visited[node] = 1;
  order[(*order_len)++] = node;
  for (int i = 0; i < n; i++) {
    if (adj[node][i]) dfs_visit(adj, n, i, visited, order, order_len);
  }
}

void dfs(int **adj, int n, int start, int *order, int *order_len) {
  int visited[n];
  for (int i = 0; i < n; i++) visited[i] = 0;
  *order_len = 0;
  dfs_visit(adj, n, start, visited, order, order_len);
}`,
  },
};

export default algorithm;
