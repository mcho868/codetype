import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "hash-table",
  title: "Hash Table (Basic)",
  difficulty: "easy",
  category: "Data Structures",
  description: "Basic key-value storage.",
  runtime: "O(1) avg",
  variants: {
    typescript: `const map = new Map<string, number>();
map.set("alpha", 1);
const value = map.get("alpha") ?? 0;`,
    javascript: `const map = new Map();
map.set("alpha", 1);
const value = map.get("alpha") ?? 0;`,
    python: `store = {"alpha": 1}
value = store.get("alpha", 0)`,
    java: `Map<String, Integer> map = new HashMap<>();
map.put("alpha", 1);
int value = map.getOrDefault("alpha", 0);`,
    csharp: `var map = new Dictionary<string, int>();
map["alpha"] = 1;
var value = map.TryGetValue("alpha", out var v) ? v : 0;`,
    c: `#include <string.h>

typedef struct {
  const char *key;
  int value;
} Entry;

typedef struct {
  Entry *entries;
  int count;
} HashTable;

int ht_get(HashTable *table, const char *key, int fallback) {
  for (int i = 0; i < table->count; i++) {
    if (strcmp(table->entries[i].key, key) == 0) return table->entries[i].value;
  }
  return fallback;
}
`,
  },
};

export default algorithm;
