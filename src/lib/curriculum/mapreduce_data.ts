import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "mapreduce",
  title: "MapReduce Algorithms",
  difficulty: "expert",
  category: "Parallel",
  description: "Map and reduce for large-scale data.",
  runtime: "Varies",
  variants: {
    typescript: `function mapReduceWordCount(words: string[]): Record<string, number> {
  const mapped = words.map((w) => [w, 1] as const);
  const reduced: Record<string, number> = {};
  for (const [word, count] of mapped) {
    reduced[word] = (reduced[word] ?? 0) + count;
  }
  return reduced;
}`,
    javascript: `function mapReduceWordCount(words) {
  const mapped = words.map((w) => [w, 1]);
  const reduced = {};
  for (const [word, count] of mapped) {
    reduced[word] = (reduced[word] || 0) + count;
  }
  return reduced;
}`,
    python: `def map_reduce_word_count(words):
    mapped = [(w, 1) for w in words]
    reduced = {}
    for word, count in mapped:
        reduced[word] = reduced.get(word, 0) + count
    return reduced`,
    java: `public java.util.Map<String, Integer> mapReduceWordCount(java.util.List<String> words) {
    java.util.Map<String, Integer> reduced = new java.util.HashMap<>();
    for (String word : words) {
        reduced.put(word, reduced.getOrDefault(word, 0) + 1);
    }
    return reduced;
}`,
    csharp: `public Dictionary<string, int> MapReduceWordCount(List<string> words)
{
    var reduced = new Dictionary<string, int>();
    foreach (var word in words)
    {
        reduced[word] = reduced.GetValueOrDefault(word, 0) + 1;
    }
    return reduced;
}`,
    c: `// MapReduce (word count sketch)
#include <stdio.h>
#include <string.h>

int map_word_count(const char *line, char words[][32], int counts[], int max_words) {
  int n = 0;
  const char *p = line;
  while (*p) {
    while (*p == 32) p++;
    if (!*p) break;
    char w[32];
    int len = 0;
    while (*p && *p != 32 && len < 31) w[len++] = *p++;
    w[len] = 0;
    int found = 0;
    for (int i = 0; i < n; i++) {
      if (strcmp(words[i], w) == 0) { counts[i]++; found = 1; break; }
    }
    if (!found && n < max_words) {
      strcpy(words[n], w);
      counts[n] = 1;
      n++;
    }
  }
  return n;
}

void reduce_word_count(char words[][32], int counts[], int n) {
  for (int i = 0; i < n; i++) {
    printf("%s %d\\n", words[i], counts[i]);
  }
}`,
  },
};

export default algorithm;
