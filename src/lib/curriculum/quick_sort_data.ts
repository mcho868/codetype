import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "quick-sort",
  title: "Quick Sort",
  difficulty: "medium",
  category: "Sorting",
  description: "Partition around a pivot, then recurse.",
  runtime: "O(n log n) avg",
  variants: {
    typescript: `function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = arr.filter((v) => v < pivot);
  const right = arr.filter((v) => v > pivot);
  const equal = arr.filter((v) => v === pivot);
  return [...quickSort(left), ...equal, ...quickSort(right)];
}`,
    javascript: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = arr.filter((v) => v < pivot);
  const right = arr.filter((v) => v > pivot);
  const equal = arr.filter((v) => v === pivot);
  return [...quickSort(left), ...equal, ...quickSort(right)];
}`,
    python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[-1]
    left = [x for x in arr if x < pivot]
    right = [x for x in arr if x > pivot]
    equal = [x for x in arr if x == pivot]
    return quick_sort(left) + equal + quick_sort(right)`,
    java: `public int[] quickSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int pivot = arr[arr.length - 1];
    java.util.List<Integer> left = new java.util.ArrayList<>();
    java.util.List<Integer> right = new java.util.ArrayList<>();
    int equalCount = 0;
    for (int value : arr) {
        if (value < pivot) left.add(value);
        else if (value > pivot) right.add(value);
        else equalCount++;
    }
    int[] sortedLeft = quickSort(left.stream().mapToInt(i -> i).toArray());
    int[] sortedRight = quickSort(right.stream().mapToInt(i -> i).toArray());
    int[] result = new int[arr.length];
    int index = 0;
    for (int value : sortedLeft) result[index++] = value;
    for (int i = 0; i < equalCount; i++) result[index++] = pivot;
    for (int value : sortedRight) result[index++] = value;
    return result;
}`,
    csharp: `public int[] QuickSort(int[] arr)
{
    if (arr.Length <= 1) return arr;
    int pivot = arr[^1];
    var left = arr.Where(v => v < pivot).ToArray();
    var right = arr.Where(v => v > pivot).ToArray();
    var equal = arr.Where(v => v == pivot).ToArray();
    return QuickSort(left).Concat(equal).Concat(QuickSort(right)).ToArray();
}`,
    c: `int partition(int *arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  for (int j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      int tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  }
  int tmp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = tmp;
  return i + 1;
}

void quick_sort(int *arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quick_sort(arr, low, pi - 1);
    quick_sort(arr, pi + 1, high);
  }
}`,
  },
};

export default algorithm;
