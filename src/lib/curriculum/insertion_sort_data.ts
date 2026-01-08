import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "insertion-sort",
  title: "Insertion Sort",
  difficulty: "easy",
  category: "Sorting",
  description: "Insert each element into its sorted position.",
  runtime: "O(n^2)",
  variants: {
    typescript: `function insertionSort(arr: number[]): number[] {
  const result = [...arr];
  for (let i = 1; i < result.length; i += 1) {
    const key = result[i];
    let j = i - 1;
    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j];
      j -= 1;
    }
    result[j + 1] = key;
  }
  return result;
}`,
    javascript: `function insertionSort(arr) {
  const result = [...arr];
  for (let i = 1; i < result.length; i += 1) {
    const key = result[i];
    let j = i - 1;
    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j];
      j -= 1;
    }
    result[j + 1] = key;
  }
  return result;
}`,
    python: `def insertion_sort(arr):
    result = list(arr)
    for i in range(1, len(result)):
        key = result[i]
        j = i - 1
        while j >= 0 and result[j] > key:
            result[j + 1] = result[j]
            j -= 1
        result[j + 1] = key
    return result`,
    java: `public int[] insertionSort(int[] arr) {
    int[] result = java.util.Arrays.copyOf(arr, arr.length);
    for (int i = 1; i < result.length; i++) {
        int key = result[i];
        int j = i - 1;
        while (j >= 0 && result[j] > key) {
            result[j + 1] = result[j];
            j--;
        }
        result[j + 1] = key;
    }
    return result;
}`,
    csharp: `public int[] InsertionSort(int[] arr)
{
    var result = (int[])arr.Clone();
    for (int i = 1; i < result.Length; i++)
    {
        int key = result[i];
        int j = i - 1;
        while (j >= 0 && result[j] > key)
        {
            result[j + 1] = result[j];
            j--;
        }
        result[j + 1] = key;
    }
    return result;
}`,
    c: `void insertion_sort(int *arr, int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
  },
};

export default algorithm;
