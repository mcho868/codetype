import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "las-vegas",
  title: "Las Vegas Algorithms",
  difficulty: "expert",
  category: "Randomized",
  description: "Always correct with random runtime.",
  runtime: "Expected poly",
  variants: {
    typescript: `function lasVegasFind(arr: number[], target: number): number {
  while (true) {
    const index = Math.floor(Math.random() * arr.length);
    if (arr[index] === target) return index;
  }
}`,
    javascript: `function lasVegasFind(arr, target) {
  while (true) {
    const index = Math.floor(Math.random() * arr.length);
    if (arr[index] === target) return index;
  }
}`,
    python: `import random

def las_vegas_find(arr, target):
    while True:
        index = random.randrange(len(arr))
        if arr[index] == target:
            return index`,
    java: `public int lasVegasFind(int[] arr, int target) {
    java.util.Random random = new java.util.Random();
    while (true) {
        int index = random.nextInt(arr.length);
        if (arr[index] == target) return index;
    }
}`,
    csharp: `public int LasVegasFind(int[] arr, int target)
{
    var random = new Random();
    while (true)
    {
        int index = random.Next(arr.Length);
        if (arr[index] == target) return index;
    }
}`,
    c: `// Las Vegas Algorithm (randomized min search with guaranteed correctness)
#include <stdlib.h>

static void swap_int(int *a, int *b) { int t = *a; *a = *b; *b = t; }

void shuffle(int *arr, int n) {
  for (int i = n - 1; i > 0; i--) {
    int j = rand() % (i + 1);
    swap_int(&arr[i], &arr[j]);
  }
}

int las_vegas_min(int *arr, int n) {
  shuffle(arr, n);
  int min = arr[0];
  for (int i = 1; i < n; i++) if (arr[i] < min) min = arr[i];
  return min;
}`,
  },
};

export default algorithm;
