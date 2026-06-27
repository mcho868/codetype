import type { Module } from './types';
import { cr, mc, tf, funcCases, ms } from './authoring';

const test9: Module = {
  id: 'test-9',
  slug: 'test-9',
  title: 'Module 9 Test — Hash Tables',
  description:
    'Transfer-level practice: a chaining-based set and word frequency counting with a hash table.',
  icon: '📝',
  color: 'from-pink-500 to-rose-400',
  locked: false,
  isMidterm: true,
  lessons: [],
  questions: [
    cr(
      't9-q1',
      `Implement \`ChainingSet\` using **separate chaining** (list of buckets, each bucket a list of values).\n\nMethods: \`__init__(self, size=11)\`, \`add(self, item)\` (no duplicates), \`contains(self, item)\`.\n\nThe starter includes \`run_chaining_set\` — **do not edit it**.`,
      `class ChainingSet:
    def __init__(self, size=11):
        pass

    def _hash(self, item):
        return hash(item) % self.size

    def add(self, item):
        pass

    def contains(self, item):
        pass


def run_chaining_set(items):
    s = ChainingSet(7)
    for x in items:
        s.add(x)
    return [s.contains(x) for x in items]
`,
      'function',
      funcCases(
        'run_chaining_set',
        [
          { id: 's1', description: 'All added items found', args: [['a', 'b', 'c']], expectedReturn: [true, true, true] },
        ],
        [
          { id: 'h1', args: [['x', 'x', 'y']], expectedReturn: [true, true, true] },
          { id: 'h2', args: [[]], expectedReturn: [] },
          { id: 'h3', args: [['only']], expectedReturn: [true] },
        ]
      ),
      ms(
        `class ChainingSet:
    def __init__(self, size=11):
        self.size = size
        self.buckets = [[] for _ in range(size)]

    def _hash(self, item):
        return hash(item) % self.size

    def add(self, item):
        bucket = self.buckets[self._hash(item)]
        if item not in bucket:
            bucket.append(item)

    def contains(self, item):
        return item in self.buckets[self._hash(item)]`,
        'Chaining stores collisions in per-bucket lists. add skips duplicates; contains scans only the matching bucket — average O(1) with a good load factor.'
      )
    ),

    cr(
      't9-q2',
      `Implement \`HashTable\` with chaining: \`put(key, value)\` and \`get(key)\` (return \`null\` if missing).\n\nThen implement \`word_freq(words)\` that uses your \`HashTable\` to count occurrences and returns a **plain dict** mapping word → count.\n\nThe starter tests \`word_freq\` only.`,
      `class HashTable:
    def __init__(self, size=13):
        self.size = size
        self.buckets = [[] for _ in range(size)]

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        pass

    def get(self, key):
        pass


def word_freq(words):
    pass
`,
      'function',
      funcCases(
        'word_freq',
        [
          {
            id: 's1',
            description: 'Count duplicates',
            args: [['to', 'be', 'or', 'not', 'to', 'be']],
            expectedReturn: { to: 2, be: 2, or: 1, not: 1 },
          },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: {} },
          { id: 'h2', args: [['solo']], expectedReturn: { solo: 1 } },
          { id: 'h3', args: [['a', 'a', 'a']], expectedReturn: { a: 3 } },
        ]
      ),
      ms(
        `class HashTable:
    def put(self, key, value):
        idx = self._hash(key)
        for i, (k, _) in enumerate(self.buckets[idx]):
            if k == key:
                self.buckets[idx][i] = (key, value)
                return
        self.buckets[idx].append((key, value))

    def get(self, key):
        idx = self._hash(key)
        for k, v in self.buckets[idx]:
            if k == key:
                return v
        return None


def word_freq(words):
    ht = HashTable()
    for w in words:
        ht.put(w, (ht.get(w) or 0) + 1)
    result = {}
    for bucket in ht.buckets:
        for k, v in bucket:
            result[k] = v
    return result`,
        'put overwrites existing keys in the bucket chain. word_freq increments with get-or-zero pattern, then flattens buckets into a dict for the grader.'
      )
    ),

    cr(
      't9-q3',
      `Implement \`two_sum_indices(nums, target)\` returning **indices** \`[i, j]\` with \`i < j\` where \`nums[i] + nums[j] == target\`, or \`null\` if none. Use a hash map (dict) for O(n) lookup.`,
      `def two_sum_indices(nums, target):
    pass
`,
      'function',
      funcCases(
        'two_sum_indices',
        [
          { id: 's1', description: '2 + 7 = 9', args: [[2, 7, 11, 15], 9], expectedReturn: [0, 1] },
        ],
        [
          { id: 'h1', args: [[3, 3], 6], expectedReturn: [0, 1] },
          { id: 'h2', args: [[1, 2, 3], 10], expectedReturn: null },
          { id: 'h3', args: [[0, 4, 3, 0], 0], expectedReturn: [0, 3] },
        ]
      ),
      ms(
        `def two_sum_indices(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        need = target - x
        if need in seen:
            return [seen[need], i]
        seen[x] = i
    return None`,
        'Store each value\'s index on first sight. When complement exists, return earlier index first to satisfy i < j. Different from module two_sum which may use another signature.'
      )
    ),

    cr(
      't9-q4',
      `Implement \`anagram_groups(words)\` grouping words that are **anagrams** (same letters, different order). Return a list of lists; order within groups and across groups may vary — tests compare sorted groups.\n\nUse a hash key (sorted tuple of chars). The grader calls \`sorted(result, key=lambda g: sorted(g))\`.`,
      `def anagram_groups(words):
    pass


def run_anagram_groups(words):
    groups = anagram_groups(words)
    return sorted([sorted(g) for g in groups])
`,
      'function',
      funcCases(
        'run_anagram_groups',
        [
          {
            id: 's1',
            description: 'eat/tea/ate and bat',
            args: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']],
            expectedReturn: [
              ['ate', 'eat', 'tea'],
              ['bat'],
              ['nat', 'tan'],
            ],
          },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: [] },
          { id: 'h2', args: [['solo']], expectedReturn: [['solo']] },
        ]
      ),
      ms(
        `def anagram_groups(words):
    groups = {}
    for w in words:
        key = tuple(sorted(w))
        if key not in groups:
            groups[key] = []
        groups[key].append(w)
    return list(groups.values())`,
        'Anagrams share the same sorted character tuple — a perfect hash key. Bucket words by key to group in O(n * k log k) for word length k.'
      )
    ),

    mc(
      't9-q5',
      'With separate chaining, what happens when two keys hash to the same bucket index?',
      [
        { id: 'a', text: 'The table doubles in size automatically' },
        { id: 'b', text: 'Both entries share the bucket list — a collision' },
        { id: 'c', text: 'The second key is discarded' },
        { id: 'd', text: 'Python raises HashError' },
      ],
      'b',
      ms(
        'Both entries live in the same bucket list.',
        'Chaining resolves collisions by storing multiple (key, value) pairs in the bucket\'s list. Lookup scans that short list for an exact key match.'
      )
    ),

    tf(
      't9-q6',
      'Average-case lookup in a well-sized hash table with chaining is O(1) when the load factor stays bounded.',
      'true',
      ms(
        'True — short bucket chains when load factor is controlled.',
        'If buckets stay short on average, contains/get scans O(1) entries. Degrade toward O(n) if everything collides into one bucket.'
      )
    ),
  ],
};

export default test9;
