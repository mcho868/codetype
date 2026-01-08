import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "selection-sort",
  title: "Selection Sort",
  difficulty: "easy",
  category: "Sorting",
  description: "Select the smallest remaining element each pass.",
  runtime: "O(n^2)",
  variants: {
    typescript: `function selectionSort(arr: number[]): number[] {
  const result = [...arr];
  for (let i = 0; i < result.length; i += 1) {
    let minIndex = i;
    for (let j = i + 1; j < result.length; j += 1) {
      if (result[j] < result[minIndex]) minIndex = j;
    }
    [result[i], result[minIndex]] = [result[minIndex], result[i]];
  }
  return result;
}`,
    javascript: `function selectionSort(arr) {
  const result = [...arr];
  for (let i = 0; i < result.length; i += 1) {
    let minIndex = i;
    for (let j = i + 1; j < result.length; j += 1) {
      if (result[j] < result[minIndex]) minIndex = j;
    }
    [result[i], result[minIndex]] = [result[minIndex], result[i]];
  }
  return result;
}`,
    python: `def selection_sort(arr):
    result = list(arr)
    for i in range(len(result)):
        min_index = i
        for j in range(i + 1, len(result)):
            if result[j] < result[min_index]:
                min_index = j
        result[i], result[min_index] = result[min_index], result[i]
    return result`,
    java: `public int[] selectionSort(int[] arr) {
    int[] result = java.util.Arrays.copyOf(arr, arr.length);
    for (int i = 0; i < result.length; i++) {
        int minIndex = i;
        for (int j = i + 1; j < result.length; j++) {
            if (result[j] < result[minIndex]) minIndex = j;
        }
        int temp = result[i];
        result[i] = result[minIndex];
        result[minIndex] = temp;
    }
    return result;
}`,
    csharp: `public int[] SelectionSort(int[] arr)
{
    var result = (int[])arr.Clone();
    for (int i = 0; i < result.Length; i++)
    {
        int minIndex = i;
        for (int j = i + 1; j < result.Length; j++)
        {
            if (result[j] < result[minIndex]) minIndex = j;
        }
        (result[i], result[minIndex]) = (result[minIndex], result[i]);
    }
    return result;
}`,
    c: `void selection_sort(int *arr, int n) {
  for (int i = 0; i < n; i++) {
    int min = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    int tmp = arr[i];
    arr[i] = arr[min];
    arr[min] = tmp;
  }
}`,
  },
};

export default algorithm;
