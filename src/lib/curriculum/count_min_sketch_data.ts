import type { AlgorithmEntry } from "./types";

export const algorithm: AlgorithmEntry = {
  id: "count-min-sketch",
  title: "Count-Min Sketch",
  difficulty: "expert",
  category: "Streaming",
  description: "Approximate frequency counting.",
  runtime: "O(1)",
  variants: {
    typescript: `class CountMinSketch {
  private width: number;
  private depth: number;
  private table: number[][];

  constructor(width: number, depth: number) {
    this.width = width;
    this.depth = depth;
    this.table = Array.from({ length: depth }, () => Array(width).fill(0));
  }

  private hash(value: string, seed: number): number {
    let hash = seed;
    for (const ch of value) hash = (hash * 31 + ch.charCodeAt(0)) % this.width;
    return hash;
  }

  add(value: string) {
    for (let i = 0; i < this.depth; i += 1) {
      const idx = this.hash(value, i + 1);
      this.table[i][idx] += 1;
    }
  }

  estimate(value: string): number {
    let min = Infinity;
    for (let i = 0; i < this.depth; i += 1) {
      const idx = this.hash(value, i + 1);
      min = Math.min(min, this.table[i][idx]);
    }
    return min;
  }
}`,
    javascript: `class CountMinSketch {
  constructor(width, depth) {
    this.width = width;
    this.depth = depth;
    this.table = Array.from({ length: depth }, () => Array(width).fill(0));
  }

  hash(value, seed) {
    let hash = seed;
    for (const ch of value) hash = (hash * 31 + ch.charCodeAt(0)) % this.width;
    return hash;
  }

  add(value) {
    for (let i = 0; i < this.depth; i += 1) {
      const idx = this.hash(value, i + 1);
      this.table[i][idx] += 1;
    }
  }

  estimate(value) {
    let min = Infinity;
    for (let i = 0; i < this.depth; i += 1) {
      const idx = this.hash(value, i + 1);
      min = Math.min(min, this.table[i][idx]);
    }
    return min;
  }
}`,
    python: `class CountMinSketch:
    def __init__(self, width, depth):
        self.width = width
        self.depth = depth
        self.table = [[0] * width for _ in range(depth)]

    def _hash(self, value, seed):
        h = seed
        for ch in value:
            h = (h * 31 + ord(ch)) % self.width
        return h

    def add(self, value):
        for i in range(self.depth):
            idx = self._hash(value, i + 1)
            self.table[i][idx] += 1

    def estimate(self, value):
        return min(self.table[i][self._hash(value, i + 1)] for i in range(self.depth))`,
    java: `class CountMinSketch {
    int width;
    int depth;
    int[][] table;

    CountMinSketch(int width, int depth) {
        this.width = width;
        this.depth = depth;
        this.table = new int[depth][width];
    }

    int hash(String value, int seed) {
        int h = seed;
        for (char ch : value.toCharArray()) h = (h * 31 + ch) % width;
        return h;
    }

    void add(String value) {
        for (int i = 0; i < depth; i++) {
            int idx = hash(value, i + 1);
            table[i][idx] += 1;
        }
    }

    int estimate(String value) {
        int min = Integer.MAX_VALUE;
        for (int i = 0; i < depth; i++) {
            int idx = hash(value, i + 1);
            min = Math.min(min, table[i][idx]);
        }
        return min;
    }
}`,
    csharp: `public class CountMinSketch
{
    private readonly int _width;
    private readonly int _depth;
    private readonly int[,] _table;

    public CountMinSketch(int width, int depth)
    {
        _width = width;
        _depth = depth;
        _table = new int[depth, width];
    }

    private int Hash(string value, int seed)
    {
        int h = seed;
        foreach (var ch in value)
        {
            h = (h * 31 + ch) % _width;
        }
        return h;
    }

    public void Add(string value)
    {
        for (int i = 0; i < _depth; i++)
        {
            int idx = Hash(value, i + 1);
            _table[i, idx] += 1;
        }
    }

    public int Estimate(string value)
    {
        int min = int.MaxValue;
        for (int i = 0; i < _depth; i++)
        {
            int idx = Hash(value, i + 1);
            min = Math.Min(min, _table[i, idx]);
        }
        return min;
    }
}`,
    c: `// Count-Min Sketch
#include <stdint.h>
#include <stdlib.h>

typedef struct {
  int width;
  int depth;
  uint32_t *table;
  uint32_t *seeds;
} CountMinSketch;

static uint32_t hash_u32(uint32_t x, uint32_t seed) {
  x ^= seed;
  x *= 0x9e3779b9u;
  x ^= x >> 16;
  return x;
}

void cms_init(CountMinSketch *cms, int width, int depth) {
  cms->width = width;
  cms->depth = depth;
  cms->table = (uint32_t *)calloc((size_t)width * depth, sizeof(uint32_t));
  cms->seeds = (uint32_t *)malloc(sizeof(uint32_t) * depth);
  for (int i = 0; i < depth; i++) cms->seeds[i] = (uint32_t)(i * 2654435761u + 12345u);
}

void cms_add(CountMinSketch *cms, uint32_t item, uint32_t count) {
  for (int i = 0; i < cms->depth; i++) {
    uint32_t h = hash_u32(item, cms->seeds[i]) % (uint32_t)cms->width;
    cms->table[i * cms->width + h] += count;
  }
}

uint32_t cms_query(const CountMinSketch *cms, uint32_t item) {
  uint32_t min = UINT32_MAX;
  for (int i = 0; i < cms->depth; i++) {
    uint32_t h = hash_u32(item, cms->seeds[i]) % (uint32_t)cms->width;
    uint32_t v = cms->table[i * cms->width + h];
    if (v < min) min = v;
  }
  return min;
}`,
  },
};

export default algorithm;
