import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "knapsack-01",
  title: "Knapsack (0/1)",
  difficulty: "hard",
  category: "Dynamic Programming",
  description: "Max value under a weight capacity.",
  runtime: "O(nW)",
  variants: {
    typescript: `function knapsack(weights: number[], values: number[], capacity: number): number {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i += 1) {
    for (let w = 0; w <= capacity; w += 1) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][capacity];
}`,
    javascript: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i += 1) {
    for (let w = 0; w <= capacity; w += 1) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][capacity];
}`,
    python: `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][capacity]`,
    java: `public int knapsack(int[] weights, int[] values, int capacity) {
    int n = weights.length;
    int[][] dp = new int[n + 1][capacity + 1];
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][capacity];
}`,
    csharp: `public int Knapsack(int[] weights, int[] values, int capacity)
{
    int n = weights.Length;
    var dp = new int[n + 1, capacity + 1];
    for (int i = 1; i <= n; i++)
    {
        for (int w = 0; w <= capacity; w++)
        {
            if (weights[i - 1] <= w)
            {
                dp[i, w] = Math.Max(dp[i - 1, w], values[i - 1] + dp[i - 1, w - weights[i - 1]]);
            }
            else
            {
                dp[i, w] = dp[i - 1, w];
            }
        }
    }
    return dp[n, capacity];
}`,
    c: `int knapsack(int *weights, int *values, int n, int capacity) {
  int dp[n + 1][capacity + 1];
  for (int i = 0; i <= n; i++) {
    for (int w = 0; w <= capacity; w++) {
      if (i == 0 || w == 0) dp[i][w] = 0;
      else if (weights[i - 1] <= w) {
        int include = values[i - 1] + dp[i - 1][w - weights[i - 1]];
        int exclude = dp[i - 1][w];
        dp[i][w] = include > exclude ? include : exclude;
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][capacity];
}`,
  },
};

export default algorithm;
