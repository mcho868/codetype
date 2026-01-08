import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "bubble-sort",
  title: "Bubble Sort",
  difficulty: "easy",
  category: "Sorting",
  description: "Swap adjacent out-of-order elements.",
  runtime: "O(n^2)",
  variants: {
    typescript: `function bubbleSort(arr: number[]): number[] {
  const result = [...arr];
  for (let i = 0; i < result.length; i += 1) {
    let swapped = false;
    for (let j = 0; j < result.length - i - 1; j += 1) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return result;
}`,
    javascript: `function bubbleSort(arr) {
  const result = [...arr];
  for (let i = 0; i < result.length; i += 1) {
    let swapped = false;
    for (let j = 0; j < result.length - i - 1; j += 1) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return result;
}`,
    python: `def bubble_sort(arr):
    result = list(arr)
    for i in range(len(result)):
        swapped = False
        for j in range(0, len(result) - i - 1):
            if result[j] > result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]
                swapped = True
        if not swapped:
            break
    return result`,
    java: `public int[] bubbleSort(int[] arr) {
    int[] result = java.util.Arrays.copyOf(arr, arr.length);
    for (int i = 0; i < result.length; i++) {
        boolean swapped = false;
        for (int j = 0; j < result.length - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                int temp = result[j];
                result[j] = result[j + 1];
                result[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return result;
}`,
    csharp: `public int[] BubbleSort(int[] arr)
{
    var result = (int[])arr.Clone();
    for (int i = 0; i < result.Length; i++)
    {
        bool swapped = false;
        for (int j = 0; j < result.Length - i - 1; j++)
        {
            if (result[j] > result[j + 1])
            {
                (result[j], result[j + 1]) = (result[j + 1], result[j]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return result;
}`,
    c: `void bubble_sort(int *arr, int n) {
  for (int i = 0; i < n; i++) {
    int swapped = 0;
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        swapped = 1;
      }
    }
    if (!swapped) break;
  }
}`,
  },
};

export default algorithm;
