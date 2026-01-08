import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "misra-gries",
  title: "Misra-Gries",
  difficulty: "expert",
  category: "Streaming",
  description: "Find heavy hitters in a stream.",
  runtime: "O(n)",
  variants: {
    typescript: `function misraGries(stream: string[], k: number): Map<string, number> {
  const counters = new Map<string, number>();
  for (const item of stream) {
    if (counters.has(item)) {
      counters.set(item, counters.get(item)! + 1);
    } else if (counters.size < k - 1) {
      counters.set(item, 1);
    } else {
      for (const key of counters.keys()) {
        const next = (counters.get(key) ?? 0) - 1;
        if (next <= 0) counters.delete(key);
        else counters.set(key, next);
      }
    }
  }
  return counters;
}`,
    javascript: `function misraGries(stream, k) {
  const counters = new Map();
  for (const item of stream) {
    if (counters.has(item)) {
      counters.set(item, counters.get(item) + 1);
    } else if (counters.size < k - 1) {
      counters.set(item, 1);
    } else {
      for (const key of Array.from(counters.keys())) {
        const next = counters.get(key) - 1;
        if (next <= 0) counters.delete(key);
        else counters.set(key, next);
      }
    }
  }
  return counters;
}`,
    python: `def misra_gries(stream, k):
    counters = {}
    for item in stream:
        if item in counters:
            counters[item] += 1
        elif len(counters) < k - 1:
            counters[item] = 1
        else:
            keys = list(counters.keys())
            for key in keys:
                counters[key] -= 1
                if counters[key] == 0:
                    del counters[key]
    return counters`,
    java: `public java.util.Map<String, Integer> misraGries(java.util.List<String> stream, int k) {
    java.util.Map<String, Integer> counters = new java.util.HashMap<>();
    for (String item : stream) {
        if (counters.containsKey(item)) {
            counters.put(item, counters.get(item) + 1);
        } else if (counters.size() < k - 1) {
            counters.put(item, 1);
        } else {
            java.util.List<String> keys = new java.util.ArrayList<>(counters.keySet());
            for (String key : keys) {
                int next = counters.get(key) - 1;
                if (next == 0) counters.remove(key);
                else counters.put(key, next);
            }
        }
    }
    return counters;
}`,
    csharp: `public Dictionary<string, int> MisraGries(List<string> stream, int k)
{
    var counters = new Dictionary<string, int>();
    foreach (var item in stream)
    {
        if (counters.ContainsKey(item))
        {
            counters[item] += 1;
        }
        else if (counters.Count < k - 1)
        {
            counters[item] = 1;
        }
        else
        {
            foreach (var key in counters.Keys.ToList())
            {
                counters[key] -= 1;
                if (counters[key] == 0) counters.Remove(key);
            }
        }
    }
    return counters;
}`,
    c: `// Misra-Gries heavy hitters (k-1 counters)
#include <stdlib.h>

typedef struct {
  int key;
  int count;
} Counter;

void misra_gries(int *items, int n, int k, Counter *counters) {
  for (int i = 0; i < k - 1; i++) {
    counters[i].key = 0;
    counters[i].count = 0;
  }
  for (int i = 0; i < n; i++) {
    int x = items[i];
    int placed = 0;
    for (int j = 0; j < k - 1; j++) {
      if (counters[j].count > 0 && counters[j].key == x) {
        counters[j].count++;
        placed = 1;
        break;
      }
    }
    if (placed) continue;
    for (int j = 0; j < k - 1; j++) {
      if (counters[j].count == 0) {
        counters[j].key = x;
        counters[j].count = 1;
        placed = 1;
        break;
      }
    }
    if (placed) continue;
    for (int j = 0; j < k - 1; j++) counters[j].count--;
  }
}`,
  },
};

export default algorithm;
