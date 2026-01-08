import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "linear-search",
  title: "Linear Search",
  difficulty: "easy",
  category: "Searching",
  description: "Scan each element until the target is found.",
  runtime: "O(n)",
  variants: {
    typescript: `function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    python: `def linear_search(arr, target):
    for i, value in enumerate(arr):
        if value == target:
            return i
    return -1`,
    java: `public int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    csharp: `public int LinearSearch(int[] arr, int target)
{
    for (int i = 0; i < arr.Length; i++)
    {
        if (arr[i] == target)
        {
            return i;
        }
    }
    return -1;
}`,
    c: `#include <stddef.h>

int linear_search(const int *arr, int n, int target) {
  for (int i = 0; i < n; i++) {
    if (arr[i] == target) return i;
  }
  return -1;
}`,
  },
};

export default algorithm;
