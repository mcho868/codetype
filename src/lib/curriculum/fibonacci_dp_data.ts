import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "fibonacci-dp",
  title: "Fibonacci DP",
  difficulty: "medium",
  category: "Dynamic Programming",
  description: "Compute Fibonacci with memoization or tabulation.",
  runtime: "O(n)",
  variants: {
    typescript: `function fib(n: number): number {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i += 1) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}`,
    javascript: `function fib(n) {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i += 1) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}`,
    python: `def fib(n):
    if n <= 1:
        return n
    dp = [0, 1]
    for i in range(2, n + 1):
        dp.append(dp[i - 1] + dp[i - 2])
    return dp[n]`,
    java: `public int fib(int n) {
    if (n <= 1) return n;
    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
    csharp: `public int Fib(int n)
{
    if (n <= 1) return n;
    var dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++)
    {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
    c: `int fib(int n) {
  if (n <= 1) return n;
  int dp[n + 1];
  dp[0] = 0;
  dp[1] = 1;
  for (int i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}`,
  },
};

export default algorithm;
