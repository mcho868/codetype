import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "suffix-array",
  title: "Suffix Array",
  difficulty: "hard",
  category: "Advanced Data Structures",
  description: "Sorted suffix indices for fast string queries.",
  runtime: "O(n log n)",
  variants: {
    typescript: `function buildSuffixArray(text: string): number[] {
  const suffixes = Array.from({ length: text.length }, (_, i) => i);
  suffixes.sort((a, b) => text.slice(a).localeCompare(text.slice(b)));
  return suffixes;
}`,
    javascript: `function buildSuffixArray(text) {
  const suffixes = Array.from({ length: text.length }, (_, i) => i);
  suffixes.sort((a, b) => text.slice(a).localeCompare(text.slice(b)));
  return suffixes;
}`,
    python: `def build_suffix_array(text):
    suffixes = list(range(len(text)))
    suffixes.sort(key=lambda i: text[i:])
    return suffixes`,
    java: `public int[] buildSuffixArray(String text) {
    Integer[] suffixes = new Integer[text.length()];
    for (int i = 0; i < text.length(); i++) suffixes[i] = i;
    java.util.Arrays.sort(suffixes, (a, b) -> text.substring(a).compareTo(text.substring(b)));
    int[] result = new int[suffixes.length];
    for (int i = 0; i < suffixes.length; i++) result[i] = suffixes[i];
    return result;
}`,
    csharp: `public int[] BuildSuffixArray(string text)
{
    var suffixes = Enumerable.Range(0, text.Length).ToList();
    suffixes.Sort((a, b) => string.Compare(text.Substring(a), text.Substring(b), StringComparison.Ordinal));
    return suffixes.ToArray();
}`,
    c: `// Suffix Array (O(n log n) using sort of suffixes)
#include <stdlib.h>
#include <string.h>

typedef struct {
  const char *s;
  int idx;
} Suffix;

static int cmp_suffix(const void *a, const void *b) {
  const Suffix *x = (const Suffix *)a;
  const Suffix *y = (const Suffix *)b;
  return strcmp(x->s + x->idx, y->s + y->idx);
}

void build_suffix_array(const char *s, int *sa, int n) {
  Suffix *suffixes = (Suffix *)malloc(sizeof(Suffix) * n);
  for (int i = 0; i < n; i++) {
    suffixes[i].s = s;
    suffixes[i].idx = i;
  }
  qsort(suffixes, n, sizeof(Suffix), cmp_suffix);
  for (int i = 0; i < n; i++) sa[i] = suffixes[i].idx;
  free(suffixes);
}`,
  },
};

export default algorithm;
