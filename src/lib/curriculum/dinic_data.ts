import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "dinic",
  title: "Dinic's Algorithm",
  difficulty: "hard",
  category: "Network Flow",
  description: "Level graph + blocking flows for max flow.",
  runtime: "O(E sqrt V)",
  variants: {
    typescript: `type Edge = { to: number; rev: number; cap: number };

class Dinic {
  graph: Edge[][];
  level: number[];
  it: number[];

  constructor(n: number) {
    this.graph = Array.from({ length: n }, () => []);
    this.level = new Array(n).fill(0);
    this.it = new Array(n).fill(0);
  }

  addEdge(from: number, to: number, cap: number) {
    const fwd = { to, rev: this.graph[to].length, cap };
    const rev = { to: from, rev: this.graph[from].length, cap: 0 };
    this.graph[from].push(fwd);
    this.graph[to].push(rev);
  }

  bfs(source: number, sink: number): boolean {
    this.level.fill(-1);
    const queue: number[] = [source];
    this.level[source] = 0;
    while (queue.length) {
      const v = queue.shift()!;
      for (const e of this.graph[v]) {
        if (e.cap > 0 && this.level[e.to] < 0) {
          this.level[e.to] = this.level[v] + 1;
          queue.push(e.to);
        }
      }
    }
    return this.level[sink] >= 0;
  }

  dfs(v: number, sink: number, f: number): number {
    if (v === sink) return f;
    for (let i = this.it[v]; i < this.graph[v].length; i += 1) {
      this.it[v] = i;
      const e = this.graph[v][i];
      if (e.cap > 0 && this.level[v] < this.level[e.to]) {
        const d = this.dfs(e.to, sink, Math.min(f, e.cap));
        if (d > 0) {
          e.cap -= d;
          this.graph[e.to][e.rev].cap += d;
          return d;
        }
      }
    }
    return 0;
  }

  maxFlow(source: number, sink: number): number {
    let flow = 0;
    while (this.bfs(source, sink)) {
      this.it.fill(0);
      let f;
      while ((f = this.dfs(source, sink, Infinity)) > 0) {
        flow += f;
      }
    }
    return flow;
  }
}`,
    javascript: `class Dinic {
  constructor(n) {
    this.graph = Array.from({ length: n }, () => []);
    this.level = new Array(n).fill(0);
    this.it = new Array(n).fill(0);
  }

  addEdge(from, to, cap) {
    const fwd = { to, rev: this.graph[to].length, cap };
    const rev = { to: from, rev: this.graph[from].length, cap: 0 };
    this.graph[from].push(fwd);
    this.graph[to].push(rev);
  }

  bfs(source, sink) {
    this.level.fill(-1);
    const queue = [source];
    this.level[source] = 0;
    while (queue.length) {
      const v = queue.shift();
      for (const e of this.graph[v]) {
        if (e.cap > 0 && this.level[e.to] < 0) {
          this.level[e.to] = this.level[v] + 1;
          queue.push(e.to);
        }
      }
    }
    return this.level[sink] >= 0;
  }

  dfs(v, sink, f) {
    if (v === sink) return f;
    for (let i = this.it[v]; i < this.graph[v].length; i += 1) {
      this.it[v] = i;
      const e = this.graph[v][i];
      if (e.cap > 0 && this.level[v] < this.level[e.to]) {
        const d = this.dfs(e.to, sink, Math.min(f, e.cap));
        if (d > 0) {
          e.cap -= d;
          this.graph[e.to][e.rev].cap += d;
          return d;
        }
      }
    }
    return 0;
  }

  maxFlow(source, sink) {
    let flow = 0;
    while (this.bfs(source, sink)) {
      this.it.fill(0);
      let f;
      while ((f = this.dfs(source, sink, Infinity)) > 0) {
        flow += f;
      }
    }
    return flow;
  }
}
`,
    python: `class Dinic:
    def __init__(self, n):
        self.graph = [[] for _ in range(n)]
        self.level = [0] * n
        self.it = [0] * n

    def add_edge(self, frm, to, cap):
        fwd = {"to": to, "rev": len(self.graph[to]), "cap": cap}
        rev = {"to": frm, "rev": len(self.graph[frm]), "cap": 0}
        self.graph[frm].append(fwd)
        self.graph[to].append(rev)

    def bfs(self, source, sink):
        self.level = [-1] * len(self.graph)
        queue = [source]
        self.level[source] = 0
        while queue:
            v = queue.pop(0)
            for e in self.graph[v]:
                if e["cap"] > 0 and self.level[e["to"]] < 0:
                    self.level[e["to"]] = self.level[v] + 1
                    queue.append(e["to"])
        return self.level[sink] >= 0

    def dfs(self, v, sink, f):
        if v == sink:
            return f
        while self.it[v] < len(self.graph[v]):
            i = self.it[v]
            self.it[v] += 1
            e = self.graph[v][i]
            if e["cap"] > 0 and self.level[v] < self.level[e["to"]]:
                d = self.dfs(e["to"], sink, min(f, e["cap"]))
                if d > 0:
                    e["cap"] -= d
                    self.graph[e["to"]][e["rev"]]["cap"] += d
                    return d
        return 0

    def max_flow(self, source, sink):
        flow = 0
        while self.bfs(source, sink):
            self.it = [0] * len(self.graph)
            while True:
                f = self.dfs(source, sink, 10**9)
                if f == 0:
                    break
                flow += f
        return flow`,
    java: `class Dinic {
    static class Edge {
        int to, rev, cap;
        Edge(int to, int rev, int cap) { this.to = to; this.rev = rev; this.cap = cap; }
    }

    java.util.List<Edge>[] graph;
    int[] level;
    int[] it;

    @SuppressWarnings("unchecked")
    Dinic(int n) {
        graph = new java.util.ArrayList[n];
        for (int i = 0; i < n; i++) graph[i] = new java.util.ArrayList<>();
        level = new int[n];
        it = new int[n];
    }

    void addEdge(int from, int to, int cap) {
        Edge fwd = new Edge(to, graph[to].size(), cap);
        Edge rev = new Edge(from, graph[from].size(), 0);
        graph[from].add(fwd);
        graph[to].add(rev);
    }

    boolean bfs(int source, int sink) {
        java.util.Arrays.fill(level, -1);
        java.util.Queue<Integer> queue = new java.util.ArrayDeque<>();
        level[source] = 0;
        queue.add(source);
        while (!queue.isEmpty()) {
            int v = queue.poll();
            for (Edge e : graph[v]) {
                if (e.cap > 0 && level[e.to] < 0) {
                    level[e.to] = level[v] + 1;
                    queue.add(e.to);
                }
            }
        }
        return level[sink] >= 0;
    }

    int dfs(int v, int sink, int f) {
        if (v == sink) return f;
        for (; it[v] < graph[v].size(); it[v]++) {
            Edge e = graph[v].get(it[v]);
            if (e.cap > 0 && level[v] < level[e.to]) {
                int d = dfs(e.to, sink, Math.min(f, e.cap));
                if (d > 0) {
                    e.cap -= d;
                    graph[e.to].get(e.rev).cap += d;
                    return d;
                }
            }
        }
        return 0;
    }

    int maxFlow(int source, int sink) {
        int flow = 0;
        while (bfs(source, sink)) {
            java.util.Arrays.fill(it, 0);
            int f;
            while ((f = dfs(source, sink, Integer.MAX_VALUE)) > 0) {
                flow += f;
            }
        }
        return flow;
    }
}
`,
    csharp: `public class Dinic
{
    private class Edge
    {
        public int To;
        public int Rev;
        public int Cap;
        public Edge(int to, int rev, int cap) { To = to; Rev = rev; Cap = cap; }
    }

    private readonly List<Edge>[] _graph;
    private readonly int[] _level;
    private readonly int[] _it;

    public Dinic(int n)
    {
        _graph = Enumerable.Range(0, n).Select(_ => new List<Edge>()).ToArray();
        _level = new int[n];
        _it = new int[n];
    }

    public void AddEdge(int from, int to, int cap)
    {
        var fwd = new Edge(to, _graph[to].Count, cap);
        var rev = new Edge(from, _graph[from].Count, 0);
        _graph[from].Add(fwd);
        _graph[to].Add(rev);
    }

    private bool Bfs(int source, int sink)
    {
        Array.Fill(_level, -1);
        var queue = new Queue<int>();
        _level[source] = 0;
        queue.Enqueue(source);
        while (queue.Count > 0)
        {
            int v = queue.Dequeue();
            foreach (var e in _graph[v])
            {
                if (e.Cap > 0 && _level[e.To] < 0)
                {
                    _level[e.To] = _level[v] + 1;
                    queue.Enqueue(e.To);
                }
            }
        }
        return _level[sink] >= 0;
    }

    private int Dfs(int v, int sink, int f)
    {
        if (v == sink) return f;
        for (; _it[v] < _graph[v].Count; _it[v]++)
        {
            var e = _graph[v][_it[v]];
            if (e.Cap > 0 && _level[v] < _level[e.To])
            {
                int d = Dfs(e.To, sink, Math.Min(f, e.Cap));
                if (d > 0)
                {
                    e.Cap -= d;
                    _graph[e.To][e.Rev].Cap += d;
                    return d;
                }
            }
        }
        return 0;
    }

    public int MaxFlow(int source, int sink)
    {
        int flow = 0;
        while (Bfs(source, sink))
        {
            Array.Fill(_it, 0);
            int f;
            while ((f = Dfs(source, sink, int.MaxValue)) > 0)
            {
                flow += f;
            }
        }
        return flow;
    }
}
`,
  },
};

export default algorithm;
