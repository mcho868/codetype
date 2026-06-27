import type { Question } from '../../python101/types';
import { cr, mc, tf, fib, funcCases, ms } from '../authoring';

export const module9Questions: Question[] = [
  cr(
    'm9-c1',
    'Write `hash_string(s, size)` that returns `(sum of (i+1) * ord(char) for each character) % size`.',
    'def hash_string(s, size):\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'hash_string',
      [
        { id: 's1', description: 'Small table', args: ['abc', 7], expectedReturn: 2 },
        { id: 's2', description: 'Empty string', args: ['', 5], expectedReturn: 0 },
      ],
      [
        { id: 'h1', args: ['a', 10], expectedReturn: 7 },
        { id: 'h2', args: ['eat', 7], expectedReturn: 6 },
        { id: 'h3', args: ['tea', 7], expectedReturn: 0 },
      ]
    ),
    ms(
      'def hash_string(s, size):\n    total = 0\n    for i, ch in enumerate(s):\n        total += (i + 1) * ord(ch)\n    return total % size',
      'Positional weighting avoids anagram collisions from a plain character sum.'
    )
  ),
  cr(
    'm9-c2',
    'Implement `HashTable` with separate chaining: `put(key, value)` and `get(key)` (return `None` if missing).\n\nThe starter includes `run_ht_put_get` — **do not edit it**.',
    `class HashTable:
    def __init__(self, size=7):
        self.size = size
        self.buckets = [[] for _ in range(size)]

    def _hash(self, key):
        total = 0
        for i, ch in enumerate(key):
            total += (i + 1) * ord(ch)
        return total % self.size

    def put(self, key, value):
        pass

    def get(self, key):
        pass


def run_ht_put_get(ops):
    ht = HashTable()
    results = []
    for op in ops:
        if op[0] == "put":
            ht.put(op[1], op[2])
        elif op[0] == "get":
            results.append(ht.get(op[1]))
    return results
`,
    'function',
    funcCases(
      'run_ht_put_get',
      [
        {
          id: 's1',
          description: 'Put then get',
          args: [[['put', 'apple', 1], ['put', 'banana', 2], ['get', 'banana'], ['get', 'grape']]],
          expectedReturn: [2, null],
        },
        {
          id: 's2',
          description: 'Overwrite',
          args: [[['put', 'cat', 10], ['put', 'cat', 20], ['get', 'cat']]],
          expectedReturn: [20],
        },
      ],
      [
        {
          id: 'h1',
          args: [[['put', 'x', 5], ['get', 'x'], ['get', 'y']]],
          expectedReturn: [5, null],
        },
      ]
    ),
    ms(
      `class HashTable:
    def __init__(self, size=7):
        self.size = size
        self.buckets = [[] for _ in range(size)]

    def _hash(self, key):
        total = 0
        for i, ch in enumerate(key):
            total += (i + 1) * ord(ch)
        return total % self.size

    def put(self, key, value):
        idx = self._hash(key)
        bucket = self.buckets[idx]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))

    def get(self, key):
        idx = self._hash(key)
        for k, v in self.buckets[idx]:
            if k == key:
                return v
        return None`,
      'Scan the bucket chain; update existing key or append a new pair.'
    )
  ),
  cr(
    'm9-c3',
    'Add `contains(key)` to `HashTable` returning `True` if the key exists.\n\nThe starter includes `run_ht_contains` — **do not edit it**.',
    `class HashTable:
    def __init__(self, size=7):
        self.size = size
        self.buckets = [[] for _ in range(size)]

    def _hash(self, key):
        total = 0
        for i, ch in enumerate(key):
            total += (i + 1) * ord(ch)
        return total % self.size

    def put(self, key, value):
        idx = self._hash(key)
        bucket = self.buckets[idx]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))

    def contains(self, key):
        pass


def run_ht_contains(keys):
    ht = HashTable()
    ht.put("apple", 1)
    ht.put("banana", 2)
    return [ht.contains(k) for k in keys]
`,
    'function',
    funcCases(
      'run_ht_contains',
      [
        {
          id: 's1',
          description: 'Present and absent keys',
          args: [['apple', 'banana', 'grape']],
          expectedReturn: [true, true, false],
        },
      ],
      [
        { id: 'h1', args: [['banana', 'x']], expectedReturn: [true, false] },
        { id: 'h2', args: [['apple']], expectedReturn: [true] },
      ]
    ),
    ms(
      `    def contains(self, key):
        idx = self._hash(key)
        for k, v in self.buckets[idx]:
            if k == key:
                return True
        return False`,
      'Same bucket scan as get, but return a bool instead of the value.'
    )
  ),
  cr(
    'm9-c4',
    'With a **small** table (`size=3`), store three keys that may collide and verify all round-trip via `get`.\n\nImplement `put` and `get` on `HashTable`. The starter includes `run_ht_collision` — **do not edit it**.',
    `class HashTable:
    def __init__(self, size=3):
        self.size = size
        self.buckets = [[] for _ in range(size)]

    def _hash(self, key):
        total = 0
        for i, ch in enumerate(key):
            total += (i + 1) * ord(ch)
        return total % self.size

    def put(self, key, value):
        pass

    def get(self, key):
        pass


def run_ht_collision():
    ht = HashTable(size=3)
    pairs = [("a", 1), ("b", 2), ("c", 3)]
    for k, v in pairs:
        ht.put(k, v)
    return [ht.get(k) for k, _ in pairs]
`,
    'function',
    funcCases(
      'run_ht_collision',
      [
        { id: 's1', description: 'All values retrieved', args: [], expectedReturn: [1, 2, 3] },
      ],
      [
        { id: 'h1', args: [], expectedReturn: [1, 2, 3] },
      ]
    ),
    ms(
      `    def put(self, key, value):
        idx = self._hash(key)
        bucket = self.buckets[idx]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))

    def get(self, key):
        idx = self._hash(key)
        for k, v in self.buckets[idx]:
            if k == key:
                return v
        return None`,
      'Chaining lets multiple keys share a bucket — scan the list to find the right one.'
    )
  ),
  cr(
    'm9-c5',
    'Implement `put` so overwriting an existing key updates the value (no duplicate entries in the bucket).\n\nThe starter includes `run_ht_overwrite` — **do not edit it**.',
    `class HashTable:
    def __init__(self, size=7):
        self.size = size
        self.buckets = [[] for _ in range(size)]

    def _hash(self, key):
        total = 0
        for i, ch in enumerate(key):
            total += (i + 1) * ord(ch)
        return total % self.size

    def put(self, key, value):
        pass

    def get(self, key):
        idx = self._hash(key)
        for k, v in self.buckets[idx]:
            if k == key:
                return v
        return None


def run_ht_overwrite():
    ht = HashTable()
    ht.put("dog", 1)
    ht.put("dog", 99)
    return ht.get("dog")
`,
    'function',
    funcCases(
      'run_ht_overwrite',
      [
        { id: 's1', description: 'Updated value', args: [], expectedReturn: 99 },
      ],
      [
        { id: 'h1', args: [], expectedReturn: 99 },
      ]
    ),
    ms(
      `    def put(self, key, value):
        idx = self._hash(key)
        bucket = self.buckets[idx]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))`,
      'On key match, replace the tuple in place instead of appending a duplicate.'
    )
  ),
  cr(
    'm9-c6',
    'Write `two_sum(nums, target)` using a dict to find two indices whose values sum to `target`. Return `[i, j]`.',
    'def two_sum(nums, target):\n    seen = {}\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'two_sum',
      [
        { id: 's1', description: 'Classic example', args: [[2, 7, 11, 15], 9], expectedReturn: [0, 1] },
        { id: 's2', description: 'Later pair', args: [[3, 2, 4], 6], expectedReturn: [1, 2] },
      ],
      [
        { id: 'h1', args: [[3, 3], 6], expectedReturn: [0, 1] },
        { id: 'h2', args: [[1, 2, 3, 4], 7], expectedReturn: [2, 3] },
      ]
    ),
    ms(
      'def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        need = target - num\n        if need in seen:\n            return [seen[need], i]\n        seen[num] = i',
      'Store value→index; each step checks if the complement was seen already.'
    )
  ),
  cr(
    'm9-c7',
    'Write `word_count(text)` returning a dict of lowercase word frequencies (split on spaces).',
    'def word_count(text):\n    counts = {}\n    # Your code here\n    pass\n',
    'function',
    funcCases(
      'word_count',
      [
        {
          id: 's1',
          description: 'Repeated words',
          args: ['the cat sat on the mat the cat'],
          expectedReturn: { cat: 2, mat: 1, on: 1, sat: 1, the: 3 },
        },
        {
          id: 's2',
          description: 'Single word',
          args: ['hello'],
          expectedReturn: { hello: 1 },
        },
      ],
      [
        { id: 'h1', args: [''], expectedReturn: {} },
        { id: 'h2', args: ['a a b'], expectedReturn: { a: 2, b: 1 } },
      ]
    ),
    ms(
      'def word_count(text):\n    counts = {}\n    for word in text.lower().split():\n        counts[word] = counts.get(word, 0) + 1\n    return counts',
      'Dict gives O(1) average updates — the hash-table payoff in practice.'
    )
  ),
  mc(
    'q9-1',
    'What is the average-case time complexity of hash table lookup?',
    [
      { id: 'a', text: 'O(log n)' },
      { id: 'b', text: 'O(n)' },
      { id: 'c', text: 'O(1)' },
      { id: 'd', text: 'O(n log n)' },
    ],
    'c',
    'Hash index computation avoids scanning — O(1) average with a good hash and low load factor.'
  ),
  tf(
    'q9-2',
    'Python\'s built-in dict uses a hash table internally.',
    'true',
    'dict (and set) are hash tables — why key lookup is O(1) average.'
  ),
  fib(
    'q9-4',
    'The simplest hash function for integer keys is: h(key) = key % ___',
    'table_size',
    'Modulo maps any integer key into valid bucket indices.'
  ),
  mc(
    'q9-6',
    'What is the load factor of a hash table?',
    [
      { id: 'a', text: 'The size of the largest bucket' },
      { id: 'b', text: 'The ratio of stored items to table size (n / table_size)' },
      { id: 'c', text: 'The number of collisions that have occurred' },
      { id: 'd', text: 'The speed of the hash function' },
    ],
    'b',
    'Load factor α = n / table_size — higher α means more collisions and slower ops.'
  ),
  mc(
    'q9-7',
    'What is the average-case time complexity of `get`/`put` in a well-sized hash table?',
    [
      { id: 'a', text: 'O(1)' },
      { id: 'b', text: 'O(log n)' },
      { id: 'c', text: 'O(n)' },
      { id: 'd', text: 'O(n²)' },
    ],
    'a',
    'A good hash spreads keys evenly so each bucket holds few items — lookups and inserts are O(1) on average.'
  ),
  mc(
    'q9-8',
    'A "collision" in a hash table is when:',
    [
      { id: 'a', text: 'Two different keys hash to the same bucket index' },
      { id: 'b', text: 'The table runs out of memory' },
      { id: 'c', text: 'A key is not found' },
      { id: 'd', text: 'The hash function returns a negative number' },
    ],
    'a',
    'Different keys can map to the same index; collision-resolution strategies (like chaining) handle storing both.'
  ),
  mc(
    'q9-9',
    'In collision resolution by **chaining**, each bucket holds:',
    [
      { id: 'a', text: 'Exactly one key-value pair' },
      { id: 'b', text: 'A list of all key-value pairs that hashed to that index' },
      { id: 'c', text: 'The hash code only' },
      { id: 'd', text: 'A pointer to the next table' },
    ],
    'b',
    'Chaining stores a list (or linked list) per bucket; colliding entries are appended and searched within that small list.'
  ),
  tf(
    'q9-10',
    'Using `% table_size` on a hash value keeps the resulting index within the bounds of the table.',
    'true',
    'Modulo maps an arbitrarily large hash code into the valid index range 0 .. table_size-1.'
  ),
  mc(
    'q9-11',
    'Why must hash table keys be **immutable** (e.g. strings, numbers, tuples — not lists)?',
    [
      { id: 'a', text: 'Immutable objects are smaller' },
      { id: 'b', text: 'If a key’s value changed, its hash would change and it could no longer be found' },
      { id: 'c', text: 'Python forbids storing mutable values' },
      { id: 'd', text: 'Immutable keys sort faster' },
    ],
    'b',
    'The bucket is chosen from the key’s hash; a mutable key whose contents change would hash to a different bucket, losing the entry. That’s why lists can’t be dict keys but tuples can.'
  ),
];
