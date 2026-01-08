import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "pram-prefix-sum",
  title: "PRAM Prefix Sum",
  difficulty: "expert",
  category: "Parallel",
  description: "Parallel prefix sum model.",
  runtime: "O(log n)",
  variants: {
    typescript: `function prefixSum(arr: number[]): number[] {
  const result = [...arr];
  for (let step = 1; step < result.length; step *= 2) {
    for (let i = result.length - 1; i >= step; i -= 1) {
      result[i] += result[i - step];
    }
  }
  return result;
}`,
    javascript: `function prefixSum(arr) {
  const result = [...arr];
  for (let step = 1; step < result.length; step *= 2) {
    for (let i = result.length - 1; i >= step; i -= 1) {
      result[i] += result[i - step];
    }
  }
  return result;
}`,
    python: `def prefix_sum(arr):
    result = list(arr)
    step = 1
    while step < len(result):
        for i in range(len(result) - 1, step - 1, -1):
            result[i] += result[i - step]
        step *= 2
    return result`,
    java: `public int[] prefixSum(int[] arr) {
    int[] result = java.util.Arrays.copyOf(arr, arr.length);
    for (int step = 1; step < result.length; step *= 2) {
        for (int i = result.length - 1; i >= step; i--) {
            result[i] += result[i - step];
        }
    }
    return result;
}`,
    csharp: `public int[] PrefixSum(int[] arr)
{
    var result = (int[])arr.Clone();
    for (int step = 1; step < result.Length; step *= 2)
    {
        for (int i = result.Length - 1; i >= step; i--)
        {
            result[i] += result[i - step];
        }
    }
    return result;
}`,
    c: `void prefix_sum_parallel(int *arr, int n) {
  for (int step = 1; step < n; step *= 2) {
    for (int i = n - 1; i >= step; i--) {
      arr[i] += arr[i - step];
    }
  }
}`,
  },
};

export default algorithm;
