import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "ford-fulkerson",
  title: "Ford-Fulkerson",
  difficulty: "hard",
  category: "Network Flow",
  description: "Max flow using augmenting paths.",
  runtime: "O(E * maxflow)",
  variants: {
    typescript: `function fordFulkerson(capacity: number[][], source: number, sink: number): number {
  const n = capacity.length;
  const flow = capacity.map((row) => row.map(() => 0));
  const parent = new Array(n).fill(-1);

  const dfs = (u: number, visited: boolean[]): boolean => {
    if (u === sink) return true;
    visited[u] = true;
    for (let v = 0; v < n; v += 1) {
      if (!visited[v] && capacity[u][v] - flow[u][v] > 0) {
        parent[v] = u;
        if (dfs(v, visited)) return true;
      }
    }
    return false;
  };

  let maxFlow = 0;
  while (dfs(source, new Array(n).fill(false))) {
    let pathFlow = Infinity;
    for (let v = sink; v !== source; v = parent[v]) {
      const u = parent[v];
      pathFlow = Math.min(pathFlow, capacity[u][v] - flow[u][v]);
    }
    for (let v = sink; v !== source; v = parent[v]) {
      const u = parent[v];
      flow[u][v] += pathFlow;
      flow[v][u] -= pathFlow;
    }
    maxFlow += pathFlow;
  }
  return maxFlow;
}`,
    javascript: `function fordFulkerson(capacity, source, sink) {
  const n = capacity.length;
  const flow = capacity.map((row) => row.map(() => 0));
  const parent = new Array(n).fill(-1);

  function dfs(u, visited) {
    if (u === sink) return true;
    visited[u] = true;
    for (let v = 0; v < n; v += 1) {
      if (!visited[v] && capacity[u][v] - flow[u][v] > 0) {
        parent[v] = u;
        if (dfs(v, visited)) return true;
      }
    }
    return false;
  }

  let maxFlow = 0;
  while (dfs(source, new Array(n).fill(false))) {
    let pathFlow = Infinity;
    for (let v = sink; v !== source; v = parent[v]) {
      const u = parent[v];
      pathFlow = Math.min(pathFlow, capacity[u][v] - flow[u][v]);
    }
    for (let v = sink; v !== source; v = parent[v]) {
      const u = parent[v];
      flow[u][v] += pathFlow;
      flow[v][u] -= pathFlow;
    }
    maxFlow += pathFlow;
  }
  return maxFlow;
}`,
    python: `def ford_fulkerson(capacity, source, sink):
    n = len(capacity)
    flow = [[0] * n for _ in range(n)]
    parent = [-1] * n

    def dfs(u, visited):
        if u == sink:
            return True
        visited[u] = True
        for v in range(n):
            if not visited[v] and capacity[u][v] - flow[u][v] > 0:
                parent[v] = u
                if dfs(v, visited):
                    return True
        return False

    max_flow = 0
    while dfs(source, [False] * n):
        path_flow = float("inf")
        v = sink
        while v != source:
            u = parent[v]
            path_flow = min(path_flow, capacity[u][v] - flow[u][v])
            v = u
        v = sink
        while v != source:
            u = parent[v]
            flow[u][v] += path_flow
            flow[v][u] -= path_flow
            v = u
        max_flow += path_flow
    return max_flow`,
    java: `public int fordFulkerson(int[][] capacity, int source, int sink) {
    int n = capacity.length;
    int[][] flow = new int[n][n];
    int[] parent = new int[n];

    java.util.function.Supplier<Boolean> dfs = () -> {
        boolean[] visited = new boolean[n];
        java.util.Stack<Integer> stack = new java.util.Stack<>();
        stack.push(source);
        visited[source] = true;
        while (!stack.isEmpty()) {
            int u = stack.pop();
            if (u == sink) return true;
            for (int v = 0; v < n; v++) {
                if (!visited[v] && capacity[u][v] - flow[u][v] > 0) {
                    parent[v] = u;
                    visited[v] = true;
                    stack.push(v);
                }
            }
        }
        return false;
    };

    int maxFlow = 0;
    while (dfs.get()) {
        int pathFlow = Integer.MAX_VALUE;
        for (int v = sink; v != source; v = parent[v]) {
            int u = parent[v];
            pathFlow = Math.min(pathFlow, capacity[u][v] - flow[u][v]);
        }
        for (int v = sink; v != source; v = parent[v]) {
            int u = parent[v];
            flow[u][v] += pathFlow;
            flow[v][u] -= pathFlow;
        }
        maxFlow += pathFlow;
    }
    return maxFlow;
}`,
    csharp: `public int FordFulkerson(int[][] capacity, int source, int sink)
{
    int n = capacity.Length;
    var flow = new int[n][];
    for (int i = 0; i < n; i++) flow[i] = new int[n];
    var parent = new int[n];

    bool Dfs()
    {
        var visited = new bool[n];
        var stack = new Stack<int>();
        stack.Push(source);
        visited[source] = true;
        while (stack.Count > 0)
        {
            int u = stack.Pop();
            if (u == sink) return true;
            for (int v = 0; v < n; v++)
            {
                if (!visited[v] && capacity[u][v] - flow[u][v] > 0)
                {
                    parent[v] = u;
                    visited[v] = true;
                    stack.Push(v);
                }
            }
        }
        return false;
    }

    int maxFlow = 0;
    while (Dfs())
    {
        int pathFlow = int.MaxValue;
        for (int v = sink; v != source; v = parent[v])
        {
            int u = parent[v];
            pathFlow = Math.Min(pathFlow, capacity[u][v] - flow[u][v]);
        }
        for (int v = sink; v != source; v = parent[v])
        {
            int u = parent[v];
            flow[u][v] += pathFlow;
            flow[v][u] -= pathFlow;
        }
        maxFlow += pathFlow;
    }
    return maxFlow;
}`,
    c: `#include <limits.h>

int dfs_ff(int n, int **cap, int **flow, int *visited, int u, int t, int f) {
  if (u == t) return f;
  visited[u] = 1;
  for (int v = 0; v < n; v++) {
    int residual = cap[u][v] - flow[u][v];
    if (!visited[v] && residual > 0) {
      int pushed = dfs_ff(n, cap, flow, visited, v, t, f < residual ? f : residual);
      if (pushed > 0) {
        flow[u][v] += pushed;
        flow[v][u] -= pushed;
        return pushed;
      }
    }
  }
  return 0;
}

int ford_fulkerson(int n, int **cap, int s, int t) {
  int **flow = (int **)malloc(sizeof(int *) * n);
  for (int i = 0; i < n; i++) {
    flow[i] = (int *)calloc(n, sizeof(int));
  }
  int max_flow = 0;
  while (1) {
    int visited[n];
    for (int i = 0; i < n; i++) visited[i] = 0;
    int pushed = dfs_ff(n, cap, flow, visited, s, t, INT_MAX);
    if (pushed == 0) break;
    max_flow += pushed;
  }
  return max_flow;
}`,
  },
};

export default algorithm;
