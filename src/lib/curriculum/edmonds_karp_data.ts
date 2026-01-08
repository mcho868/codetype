import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "edmonds-karp",
  title: "Edmonds-Karp",
  difficulty: "hard",
  category: "Network Flow",
  description: "BFS-based Ford-Fulkerson.",
  runtime: "O(VE^2)",
  variants: {
    typescript: `function edmondsKarp(capacity: number[][], source: number, sink: number): number {
  const n = capacity.length;
  const flow = capacity.map((row) => row.map(() => 0));
  const parent = new Array(n).fill(-1);

  const bfs = (): boolean => {
    parent.fill(-1);
    const queue: number[] = [source];
    parent[source] = source;
    while (queue.length) {
      const u = queue.shift()!;
      for (let v = 0; v < n; v += 1) {
        if (parent[v] === -1 && capacity[u][v] - flow[u][v] > 0) {
          parent[v] = u;
          if (v === sink) return true;
          queue.push(v);
        }
      }
    }
    return false;
  };

  let maxFlow = 0;
  while (bfs()) {
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
    javascript: `function edmondsKarp(capacity, source, sink) {
  const n = capacity.length;
  const flow = capacity.map((row) => row.map(() => 0));
  const parent = new Array(n).fill(-1);

  function bfs() {
    parent.fill(-1);
    const queue = [source];
    parent[source] = source;
    while (queue.length) {
      const u = queue.shift();
      for (let v = 0; v < n; v += 1) {
        if (parent[v] === -1 && capacity[u][v] - flow[u][v] > 0) {
          parent[v] = u;
          if (v === sink) return true;
          queue.push(v);
        }
      }
    }
    return false;
  }

  let maxFlow = 0;
  while (bfs()) {
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
    python: `def edmonds_karp(capacity, source, sink):
    n = len(capacity)
    flow = [[0] * n for _ in range(n)]
    parent = [-1] * n

    def bfs():
        for i in range(n):
            parent[i] = -1
        queue = [source]
        parent[source] = source
        while queue:
            u = queue.pop(0)
            for v in range(n):
                if parent[v] == -1 and capacity[u][v] - flow[u][v] > 0:
                    parent[v] = u
                    if v == sink:
                        return True
                    queue.append(v)
        return False

    max_flow = 0
    while bfs():
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
    java: `public int edmondsKarp(int[][] capacity, int source, int sink) {
    int n = capacity.length;
    int[][] flow = new int[n][n];
    int[] parent = new int[n];

    java.util.function.Supplier<Boolean> bfs = () -> {
        java.util.Arrays.fill(parent, -1);
        java.util.Queue<Integer> queue = new java.util.ArrayDeque<>();
        queue.add(source);
        parent[source] = source;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            for (int v = 0; v < n; v++) {
                if (parent[v] == -1 && capacity[u][v] - flow[u][v] > 0) {
                    parent[v] = u;
                    if (v == sink) return true;
                    queue.add(v);
                }
            }
        }
        return false;
    };

    int maxFlow = 0;
    while (bfs.get()) {
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
    csharp: `public int EdmondsKarp(int[][] capacity, int source, int sink)
{
    int n = capacity.Length;
    var flow = new int[n][];
    for (int i = 0; i < n; i++) flow[i] = new int[n];
    var parent = new int[n];

    bool Bfs()
    {
        Array.Fill(parent, -1);
        var queue = new Queue<int>();
        queue.Enqueue(source);
        parent[source] = source;
        while (queue.Count > 0)
        {
            int u = queue.Dequeue();
            for (int v = 0; v < n; v++)
            {
                if (parent[v] == -1 && capacity[u][v] - flow[u][v] > 0)
                {
                    parent[v] = u;
                    if (v == sink) return true;
                    queue.Enqueue(v);
                }
            }
        }
        return false;
    }

    int maxFlow = 0;
    while (Bfs())
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

int bfs_ek(int n, int **cap, int **flow, int s, int t, int *parent) {
  int queue[n];
  int head = 0, tail = 0;
  for (int i = 0; i < n; i++) parent[i] = -1;
  parent[s] = s;
  queue[tail++] = s;
  while (head < tail) {
    int u = queue[head++];
    for (int v = 0; v < n; v++) {
      if (parent[v] == -1 && cap[u][v] - flow[u][v] > 0) {
        parent[v] = u;
        if (v == t) return 1;
        queue[tail++] = v;
      }
    }
  }
  return 0;
}

int edmonds_karp(int n, int **cap, int s, int t) {
  int **flow = (int **)malloc(sizeof(int *) * n);
  for (int i = 0; i < n; i++) flow[i] = (int *)calloc(n, sizeof(int));
  int max_flow = 0;
  int parent[n];
  while (bfs_ek(n, cap, flow, s, t, parent)) {
    int path = INT_MAX;
    for (int v = t; v != s; v = parent[v]) {
      int u = parent[v];
      int residual = cap[u][v] - flow[u][v];
      if (residual < path) path = residual;
    }
    for (int v = t; v != s; v = parent[v]) {
      int u = parent[v];
      flow[u][v] += path;
      flow[v][u] -= path;
    }
    max_flow += path;
  }
  return max_flow;
}`,
  },
};

export default algorithm;
