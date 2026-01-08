import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "trie",
  title: "Trie Operations",
  difficulty: "medium",
  category: "Strings",
  description: "Insert and search prefixes in a trie.",
  runtime: "O(m)",
  variants: {
    typescript: `class TrieNode {
  children: Record<string, TrieNode> = {};
  isEnd = false;
}

class Trie {
  root = new TrieNode();
  insert(word: string) {
    let node = this.root;
    for (const ch of word) {
      node.children[ch] = node.children[ch] ?? new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }
  search(word: string): boolean {
    const node = this.find(word);
    return !!node && node.isEnd;
  }
  startsWith(prefix: string): boolean {
    return !!this.find(prefix);
  }
  private find(str: string): TrieNode | null {
    let node = this.root;
    for (const ch of str) {
      if (!node.children[ch]) return null;
      node = node.children[ch];
    }
    return node;
  }
}`,
    javascript: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      node.children[ch] = node.children[ch] || new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }
  search(word) {
    const node = this.find(word);
    return !!node && node.isEnd;
  }
  startsWith(prefix) {
    return !!this.find(prefix);
  }
  find(str) {
    let node = this.root;
    for (const ch of str) {
      if (!node.children[ch]) return null;
      node = node.children[ch];
    }
    return node;
  }
}`,
    python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            node.children.setdefault(ch, TrieNode())
            node = node.children[ch]
        node.is_end = True

    def search(self, word):
        node = self._find(word)
        return bool(node and node.is_end)

    def starts_with(self, prefix):
        return self._find(prefix) is not None

    def _find(self, text):
        node = self.root
        for ch in text:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node`,
    java: `class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEnd = false;
}

class Trie {
    TrieNode root = new TrieNode();

    void insert(String word) {
        TrieNode node = root;
        for (char ch : word.toCharArray()) {
            node.children.putIfAbsent(ch, new TrieNode());
            node = node.children.get(ch);
        }
        node.isEnd = true;
    }

    boolean search(String word) {
        TrieNode node = find(word);
        return node != null && node.isEnd;
    }

    boolean startsWith(String prefix) {
        return find(prefix) != null;
    }

    TrieNode find(String text) {
        TrieNode node = root;
        for (char ch : text.toCharArray()) {
            if (!node.children.containsKey(ch)) return null;
            node = node.children.get(ch);
        }
        return node;
    }
}`,
    csharp: `public class TrieNode
{
    public Dictionary<char, TrieNode> Children = new();
    public bool IsEnd;
}

public class Trie
{
    private readonly TrieNode _root = new();

    public void Insert(string word)
    {
        var node = _root;
        foreach (var ch in word)
        {
            if (!node.Children.ContainsKey(ch)) node.Children[ch] = new TrieNode();
            node = node.Children[ch];
        }
        node.IsEnd = true;
    }

    public bool Search(string word)
    {
        var node = Find(word);
        return node != null && node.IsEnd;
    }

    public bool StartsWith(string prefix) => Find(prefix) != null;

    private TrieNode? Find(string text)
    {
        var node = _root;
        foreach (var ch in text)
        {
            if (!node.Children.TryGetValue(ch, out var next)) return null;
            node = next;
        }
        return node;
    }
}
`,
    c: `#include <stdlib.h>

#define ALPHABET 26

typedef struct TrieNode {
  struct TrieNode *children[ALPHABET];
  int is_end;
} TrieNode;

TrieNode *trie_new() {
  TrieNode *node = (TrieNode *)malloc(sizeof(TrieNode));
  for (int i = 0; i < ALPHABET; i++) node->children[i] = NULL;
  node->is_end = 0;
  return node;
}

void trie_insert(TrieNode *root, const char *word) {
  TrieNode *node = root;
  for (int i = 0; word[i]; i++) {
    int idx = word[i] - 'a';
    if (idx < 0 || idx >= ALPHABET) continue;
    if (!node->children[idx]) node->children[idx] = trie_new();
    node = node->children[idx];
  }
  node->is_end = 1;
}

int trie_search(TrieNode *root, const char *word) {
  TrieNode *node = root;
  for (int i = 0; word[i]; i++) {
    int idx = word[i] - 'a';
    if (idx < 0 || idx >= ALPHABET) return 0;
    if (!node->children[idx]) return 0;
    node = node->children[idx];
  }
  return node->is_end;
}`,
  },
};

export default algorithm;
