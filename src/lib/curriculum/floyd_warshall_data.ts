import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "floyd-warshall",
  title: "Floyd-Warshall",
  difficulty: "hard",
  category: "Graphs",
  description: "All-pairs shortest paths.",
  runtime: "O(V^3)",
  variants: {
    typescript: `function floydWarshall(dist: number[][]): number[][] {
  const n = dist.length;
  const result = dist.map((row) => [...row]);
  for (let k = 0; k < n; k += 1) {
    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < n; j += 1) {
        if (result[i][k] + result[k][j] < result[i][j]) {
          result[i][j] = result[i][k] + result[k][j];
        }
      }
    }
  }
  return result;
}`,
    javascript: `function floydWarshall(dist) {
  const n = dist.length;
  const result = dist.map((row) => [...row]);
  for (let k = 0; k < n; k += 1) {
    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < n; j += 1) {
        if (result[i][k] + result[k][j] < result[i][j]) {
          result[i][j] = result[i][k] + result[k][j];
        }
      }
    }
  }
  return result;
}`,
    python: `def floyd_warshall(dist):
    n = len(dist)
    result = [row[:] for row in dist]
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if result[i][k] + result[k][j] < result[i][j]:
                    result[i][j] = result[i][k] + result[k][j]
    return result`,
    java: `public int[][] floydWarshall(int[][] dist) {
    int n = dist.length;
    int[][] result = new int[n][n];
    for (int i = 0; i < n; i++) result[i] = java.util.Arrays.copyOf(dist[i], n);
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (result[i][k] + result[k][j] < result[i][j]) {
                    result[i][j] = result[i][k] + result[k][j];
                }
            }
        }
    }
    return result;
}`,
    csharp: `public int[][] FloydWarshall(int[][] dist)
{
    int n = dist.Length;
    var result = dist.Select(row => row.ToArray()).ToArray();
    for (int k = 0; k < n; k++)
    {
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (result[i][k] + result[k][j] < result[i][j])
                {
                    result[i][j] = result[i][k] + result[k][j];
                }
            }
        }
    }
    return result;
}`,
    c: `#define INF 1000000000

void floyd_warshall(int n, int dist[n][n]) {
  for (int k = 0; k < n; k++) {
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) dist[i][j] = dist[i][k] + dist[k][j];
      }
    }
  }
}`,
  },
};

export default algorithm;
