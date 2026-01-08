import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "randomized-quicksort",
  title: "Randomized Quicksort",
  difficulty: "expert",
  category: "Randomized",
  description: "Random pivot to avoid worst-case inputs.",
  runtime: "O(n log n) expected",
  variants: {
    typescript: `function randomizedQuickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(Math.random() * arr.length)];
  const left = arr.filter((v) => v < pivot);
  const right = arr.filter((v) => v > pivot);
  const equal = arr.filter((v) => v === pivot);
  return [...randomizedQuickSort(left), ...equal, ...randomizedQuickSort(right)];
}`,
    javascript: `function randomizedQuickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(Math.random() * arr.length)];
  const left = arr.filter((v) => v < pivot);
  const right = arr.filter((v) => v > pivot);
  const equal = arr.filter((v) => v === pivot);
  return [...randomizedQuickSort(left), ...equal, ...randomizedQuickSort(right)];
}`,
    python: `import random

def randomized_quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = random.choice(arr)
    left = [x for x in arr if x < pivot]
    right = [x for x in arr if x > pivot]
    equal = [x for x in arr if x == pivot]
    return randomized_quick_sort(left) + equal + randomized_quick_sort(right)`,
    java: `public int[] randomizedQuickSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int pivot = arr[new java.util.Random().nextInt(arr.length)];
    java.util.List<Integer> left = new java.util.ArrayList<>();
    java.util.List<Integer> right = new java.util.ArrayList<>();
    java.util.List<Integer> equal = new java.util.ArrayList<>();
    for (int v : arr) {
        if (v < pivot) left.add(v);
        else if (v > pivot) right.add(v);
        else equal.add(v);
    }
    int[] l = randomizedQuickSort(left.stream().mapToInt(i -> i).toArray());
    int[] r = randomizedQuickSort(right.stream().mapToInt(i -> i).toArray());
    int[] result = new int[arr.length];
    int idx = 0;
    for (int v : l) result[idx++] = v;
    for (int v : equal) result[idx++] = v;
    for (int v : r) result[idx++] = v;
    return result;
}`,
    csharp: `public int[] RandomizedQuickSort(int[] arr)
{
    if (arr.Length <= 1) return arr;
    int pivot = arr[new Random().Next(arr.Length)];
    var left = arr.Where(v => v < pivot).ToArray();
    var right = arr.Where(v => v > pivot).ToArray();
    var equal = arr.Where(v => v == pivot).ToArray();
    return RandomizedQuickSort(left).Concat(equal).Concat(RandomizedQuickSort(right)).ToArray();
}`,
    c: `// Randomized Quicksort
#include <stdlib.h>

static void swap_int(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int partition(int *arr, int lo, int hi) {
  int pivot = arr[hi];
  int i = lo;
  for (int j = lo; j < hi; j++) {
    if (arr[j] <= pivot) {
      swap_int(&arr[i], &arr[j]);
      i++;
    }
  }
  swap_int(&arr[i], &arr[hi]);
  return i;
}

void randomized_quicksort(int *arr, int lo, int hi) {
  if (lo >= hi) return;
  int pivot_index = lo + rand() % (hi - lo + 1);
  swap_int(&arr[pivot_index], &arr[hi]);
  int p = partition(arr, lo, hi);
  randomized_quicksort(arr, lo, p - 1);
  randomized_quicksort(arr, p + 1, hi);
}`,
  },
};

export default algorithm;
