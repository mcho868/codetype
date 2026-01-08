import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "kmp",
  title: "Knuth-Morris-Pratt (KMP)",
  difficulty: "hard",
  category: "Strings",
  description: "Pattern matching with prefix table.",
  runtime: "O(n + m)",
  variants: {
    typescript: `function kmpSearch(text: string, pattern: string): number[] {
  const lps = buildLps(pattern);
  const matches: number[] = [];
  let i = 0;
  let j = 0;
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i += 1;
      j += 1;
      if (j === pattern.length) {
        matches.push(i - j);
        j = lps[j - 1];
      }
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i += 1;
    }
  }
  return matches;
}

function buildLps(pattern: string): number[] {
  const lps = Array(pattern.length).fill(0);
  let len = 0;
  for (let i = 1; i < pattern.length; ) {
    if (pattern[i] === pattern[len]) {
      lps[i++] = ++len;
    } else if (len > 0) {
      len = lps[len - 1];
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
}`,
    javascript: `function kmpSearch(text, pattern) {
  const lps = buildLps(pattern);
  const matches = [];
  let i = 0;
  let j = 0;
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i += 1;
      j += 1;
      if (j === pattern.length) {
        matches.push(i - j);
        j = lps[j - 1];
      }
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i += 1;
    }
  }
  return matches;
}

function buildLps(pattern) {
  const lps = Array(pattern.length).fill(0);
  let len = 0;
  for (let i = 1; i < pattern.length; ) {
    if (pattern[i] === pattern[len]) {
      lps[i++] = ++len;
    } else if (len > 0) {
      len = lps[len - 1];
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
}`,
    python: `def kmp_search(text, pattern):
    lps = build_lps(pattern)
    matches = []
    i = j = 0
    while i < len(text):
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == len(pattern):
                matches.append(i - j)
                j = lps[j - 1]
        elif j > 0:
            j = lps[j - 1]
        else:
            i += 1
    return matches


def build_lps(pattern):
    lps = [0] * len(pattern)
    length = 0
    i = 1
    while i < len(pattern):
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1
    return lps`,
    java: `public List<Integer> kmpSearch(String text, String pattern) {
    int[] lps = buildLps(pattern);
    List<Integer> matches = new ArrayList<>();
    int i = 0, j = 0;
    while (i < text.length()) {
        if (text.charAt(i) == pattern.charAt(j)) {
            i++;
            j++;
            if (j == pattern.length()) {
                matches.add(i - j);
                j = lps[j - 1];
            }
        } else if (j > 0) {
            j = lps[j - 1];
        } else {
            i++;
        }
    }
    return matches;
}

private int[] buildLps(String pattern) {
    int[] lps = new int[pattern.length()];
    int len = 0;
    int i = 1;
    while (i < pattern.length()) {
        if (pattern.charAt(i) == pattern.charAt(len)) {
            lps[i++] = ++len;
        } else if (len > 0) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}`,
    csharp: `public List<int> KmpSearch(string text, string pattern)
{
    var lps = BuildLps(pattern);
    var matches = new List<int>();
    int i = 0, j = 0;
    while (i < text.Length)
    {
        if (text[i] == pattern[j])
        {
            i++;
            j++;
            if (j == pattern.Length)
            {
                matches.Add(i - j);
                j = lps[j - 1];
            }
        }
        else if (j > 0)
        {
            j = lps[j - 1];
        }
        else
        {
            i++;
        }
    }
    return matches;
}

private int[] BuildLps(string pattern)
{
    var lps = new int[pattern.Length];
    int len = 0;
    int i = 1;
    while (i < pattern.Length)
    {
        if (pattern[i] == pattern[len])
        {
            lps[i++] = ++len;
        }
        else if (len > 0)
        {
            len = lps[len - 1];
        }
        else
        {
            lps[i++] = 0;
        }
    }
    return lps;
}`,
    c: `#include <string.h>

void build_lps(const char *pattern, int *lps) {
  int len = 0;
  int i = 1;
  int m = (int)strlen(pattern);
  lps[0] = 0;
  while (i < m) {
    if (pattern[i] == pattern[len]) {
      len++;
      lps[i++] = len;
    } else if (len > 0) {
      len = lps[len - 1];
    } else {
      lps[i++] = 0;
    }
  }
}

int kmp_search(const char *text, const char *pattern, int *matches) {
  int n = (int)strlen(text);
  int m = (int)strlen(pattern);
  int lps[m];
  build_lps(pattern, lps);
  int i = 0, j = 0, count = 0;
  while (i < n) {
    if (text[i] == pattern[j]) {
      i++; j++;
      if (j == m) {
        matches[count++] = i - j;
        j = lps[j - 1];
      }
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }
  return count;
}`,
  },
};

export default algorithm;
