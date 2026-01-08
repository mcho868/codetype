import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "merge-sort",
  title: "Merge Sort",
  difficulty: "medium",
  category: "Sorting",
  description: "Divide array, sort recursively, then merge.",
  runtime: "O(n log n)",
  variants: {
    typescript: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)


def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    return result + left[i:] + right[j:]`,
    java: `public int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int mid = arr.length / 2;
    int[] left = java.util.Arrays.copyOfRange(arr, 0, mid);
    int[] right = java.util.Arrays.copyOfRange(arr, mid, arr.length);
    return merge(mergeSort(left), mergeSort(right));
}

private int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result[k++] = left[i++];
        else result[k++] = right[j++];
    }
    while (i < left.length) result[k++] = left[i++];
    while (j < right.length) result[k++] = right[j++];
    return result;
}`,
    csharp: `public int[] MergeSort(int[] arr)
{
    if (arr.Length <= 1) return arr;
    int mid = arr.Length / 2;
    var left = arr.Take(mid).ToArray();
    var right = arr.Skip(mid).ToArray();
    return Merge(MergeSort(left), MergeSort(right));
}

private int[] Merge(int[] left, int[] right)
{
    var result = new int[left.Length + right.Length];
    int i = 0, j = 0, k = 0;
    while (i < left.Length && j < right.Length)
    {
        result[k++] = left[i] <= right[j] ? left[i++] : right[j++];
    }
    while (i < left.Length) result[k++] = left[i++];
    while (j < right.Length) result[k++] = right[j++];
    return result;
}`,
    c: `void merge(int *arr, int l, int m, int r, int *tmp) {
  int i = l, j = m + 1, k = l;
  while (i <= m && j <= r) {
    tmp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
  }
  while (i <= m) tmp[k++] = arr[i++];
  while (j <= r) tmp[k++] = arr[j++];
  for (i = l; i <= r; i++) arr[i] = tmp[i];
}

void merge_sort(int *arr, int l, int r, int *tmp) {
  if (l >= r) return;
  int m = (l + r) / 2;
  merge_sort(arr, l, m, tmp);
  merge_sort(arr, m + 1, r, tmp);
  merge(arr, l, m, r, tmp);
}`,
  },
};

export default algorithm;
