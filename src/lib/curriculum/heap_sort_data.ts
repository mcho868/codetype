import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "heap-sort",
  title: "Heap Sort",
  difficulty: "medium",
  category: "Sorting",
  description: "Use a heap to repeatedly extract max.",
  runtime: "O(n log n)",
  variants: {
    typescript: `function heapSort(arr: number[]): number[] {
  const result = [...arr];
  const n = result.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) {
    heapify(result, n, i);
  }
  for (let i = n - 1; i > 0; i -= 1) {
    [result[0], result[i]] = [result[i], result[0]];
    heapify(result, i, 0);
  }
  return result;
}

function heapify(arr: number[], n: number, i: number) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    javascript: `function heapSort(arr) {
  const result = [...arr];
  const n = result.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) {
    heapify(result, n, i);
  }
  for (let i = n - 1; i > 0; i -= 1) {
    [result[0], result[i]] = [result[i], result[0]];
    heapify(result, i, 0);
  }
  return result;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    python: `def heap_sort(arr):
    result = list(arr)
    n = len(result)
    for i in range(n // 2 - 1, -1, -1):
        heapify(result, n, i)
    for i in range(n - 1, 0, -1):
        result[0], result[i] = result[i], result[0]
        heapify(result, i, 0)
    return result


def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
    java: `public int[] heapSort(int[] arr) {
    int[] result = java.util.Arrays.copyOf(arr, arr.length);
    int n = result.length;
    for (int i = n / 2 - 1; i >= 0; i--) heapify(result, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = result[0];
        result[0] = result[i];
        result[i] = temp;
        heapify(result, i, 0);
    }
    return result;
}

private void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
    }
}`,
    csharp: `public int[] HeapSort(int[] arr)
{
    var result = (int[])arr.Clone();
    int n = result.Length;
    for (int i = n / 2 - 1; i >= 0; i--) Heapify(result, n, i);
    for (int i = n - 1; i > 0; i--)
    {
        (result[0], result[i]) = (result[i], result[0]);
        Heapify(result, i, 0);
    }
    return result;
}

private void Heapify(int[] arr, int n, int i)
{
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i)
    {
        (arr[i], arr[largest]) = (arr[largest], arr[i]);
        Heapify(arr, n, largest);
    }
}`,
    c: `void heapify(int *arr, int n, int i) {
  int largest = i;
  int l = 2 * i + 1;
  int r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest != i) {
    int tmp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = tmp;
    heapify(arr, n, largest);
  }
}

void heap_sort(int *arr, int n) {
  for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
  for (int i = n - 1; i > 0; i--) {
    int tmp = arr[0];
    arr[0] = arr[i];
    arr[i] = tmp;
    heapify(arr, i, 0);
  }
}`,
  },
};

export default algorithm;
