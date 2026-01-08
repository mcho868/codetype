import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "rabin-karp",
  title: "Rabin-Karp",
  difficulty: "hard",
  category: "Strings",
  description: "Hash-based string matching.",
  runtime: "O(n + m) avg",
  variants: {
    typescript: `function rabinKarp(text: string, pattern: string): number[] {
  const base = 256;
  const mod = 101;
  let patHash = 0;
  let textHash = 0;
  let h = 1;
  const matches: number[] = [];

  for (let i = 0; i < pattern.length - 1; i += 1) h = (h * base) % mod;
  for (let i = 0; i < pattern.length; i += 1) {
    patHash = (base * patHash + pattern.charCodeAt(i)) % mod;
    textHash = (base * textHash + text.charCodeAt(i)) % mod;
  }

  for (let i = 0; i <= text.length - pattern.length; i += 1) {
    if (patHash === textHash) {
      if (text.slice(i, i + pattern.length) === pattern) matches.push(i);
    }
    if (i < text.length - pattern.length) {
      textHash =
        (base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + pattern.length)) % mod;
      if (textHash < 0) textHash += mod;
    }
  }

  return matches;
}`,
    javascript: `function rabinKarp(text, pattern) {
  const base = 256;
  const mod = 101;
  let patHash = 0;
  let textHash = 0;
  let h = 1;
  const matches = [];

  for (let i = 0; i < pattern.length - 1; i += 1) h = (h * base) % mod;
  for (let i = 0; i < pattern.length; i += 1) {
    patHash = (base * patHash + pattern.charCodeAt(i)) % mod;
    textHash = (base * textHash + text.charCodeAt(i)) % mod;
  }

  for (let i = 0; i <= text.length - pattern.length; i += 1) {
    if (patHash === textHash) {
      if (text.slice(i, i + pattern.length) === pattern) matches.push(i);
    }
    if (i < text.length - pattern.length) {
      textHash =
        (base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + pattern.length)) % mod;
      if (textHash < 0) textHash += mod;
    }
  }

  return matches;
}`,
    python: `def rabin_karp(text, pattern):
    base = 256
    mod = 101
    pat_hash = 0
    text_hash = 0
    h = 1
    matches = []

    for _ in range(len(pattern) - 1):
        h = (h * base) % mod
    for i in range(len(pattern)):
        pat_hash = (base * pat_hash + ord(pattern[i])) % mod
        text_hash = (base * text_hash + ord(text[i])) % mod

    for i in range(len(text) - len(pattern) + 1):
        if pat_hash == text_hash:
            if text[i:i + len(pattern)] == pattern:
                matches.append(i)
        if i < len(text) - len(pattern):
            text_hash = (base * (text_hash - ord(text[i]) * h) + ord(text[i + len(pattern)])) % mod
            if text_hash < 0:
                text_hash += mod
    return matches`,
    java: `public List<Integer> rabinKarp(String text, String pattern) {
    int base = 256;
    int mod = 101;
    int patHash = 0;
    int textHash = 0;
    int h = 1;
    List<Integer> matches = new ArrayList<>();

    for (int i = 0; i < pattern.length() - 1; i++) h = (h * base) % mod;
    for (int i = 0; i < pattern.length(); i++) {
        patHash = (base * patHash + pattern.charAt(i)) % mod;
        textHash = (base * textHash + text.charAt(i)) % mod;
    }

    for (int i = 0; i <= text.length() - pattern.length(); i++) {
        if (patHash == textHash && text.substring(i, i + pattern.length()).equals(pattern)) {
            matches.add(i);
        }
        if (i < text.length() - pattern.length()) {
            textHash = (base * (textHash - text.charAt(i) * h) + text.charAt(i + pattern.length())) % mod;
            if (textHash < 0) textHash += mod;
        }
    }
    return matches;
}`,
    csharp: `public List<int> RabinKarp(string text, string pattern)
{
    int baseVal = 256;
    int mod = 101;
    int patHash = 0;
    int textHash = 0;
    int h = 1;
    var matches = new List<int>();

    for (int i = 0; i < pattern.Length - 1; i++) h = (h * baseVal) % mod;
    for (int i = 0; i < pattern.Length; i++)
    {
        patHash = (baseVal * patHash + pattern[i]) % mod;
        textHash = (baseVal * textHash + text[i]) % mod;
    }

    for (int i = 0; i <= text.Length - pattern.Length; i++)
    {
        if (patHash == textHash && text.Substring(i, pattern.Length) == pattern)
        {
            matches.Add(i);
        }
        if (i < text.Length - pattern.Length)
        {
            textHash = (baseVal * (textHash - text[i] * h) + text[i + pattern.Length]) % mod;
            if (textHash < 0) textHash += mod;
        }
    }
    return matches;
}`,
    c: `#include <string.h>

int rabin_karp(const char *text, const char *pattern, int *matches) {
  int n = (int)strlen(text);
  int m = (int)strlen(pattern);
  int base = 256;
  int mod = 101;
  int h = 1;
  int pat = 0, txt = 0;
  int count = 0;
  for (int i = 0; i < m - 1; i++) h = (h * base) % mod;
  for (int i = 0; i < m; i++) {
    pat = (base * pat + pattern[i]) % mod;
    txt = (base * txt + text[i]) % mod;
  }
  for (int i = 0; i <= n - m; i++) {
    if (pat == txt) {
      if (strncmp(text + i, pattern, m) == 0) matches[count++] = i;
    }
    if (i < n - m) {
      txt = (base * (txt - text[i] * h) + text[i + m]) % mod;
      if (txt < 0) txt += mod;
    }
  }
  return count;
}`,
  },
};

export default algorithm;
