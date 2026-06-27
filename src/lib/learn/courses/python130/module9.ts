import type { Module } from './types';
import { module9Questions } from './questions/module9Questions';


const module9: Module = {
  id: 'module-9',
  slug: '9',
  title: 'Hash Tables',
  description: 'Achieve O(1) average-case lookup using hash functions and collision resolution strategies.',
  icon: '#️⃣',
  color: 'from-pink-500 to-rose-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-9-1',
      title: 'Hash Table Concepts',
      content: `A **hash table** is a data structure that maps keys to values and achieves **O(1) average-case** lookup, insertion, and deletion. This seems almost magical — how can you find something in a million-element collection instantly? The secret is the **hash function**: a mathematical function that converts a key directly into an array index, letting you jump straight to the right location without any searching.

The big idea: instead of scanning through elements (like a linked list) or navigating down a tree (like a BST), a hash table computes exactly where a key should be stored. For integer keys, the simplest hash function is \`h(key) = key % table_size\`. If your table has 10 slots, key 42 always maps to slot 2 (42 % 10 = 2). No matter how large the table gets, the lookup is one computation away.

A **good hash function** has three properties: it must be **deterministic** (same key always gives the same index), **fast to compute** (ideally O(1)), and produces a **uniform distribution** (spreads keys evenly across all slots to minimize collisions). Poor distribution leads to many keys landing in the same slot, degrading performance.

Python's \`dict\` and \`set\` are both implemented as hash tables — they are why dictionary lookups in Python are so fast. When you write \`my_dict["name"]\`, Python calls \`hash("name")\`, uses it to compute a slot index, and retrieves the value. The entire operation is O(1) on average. This is also why dict keys must be **hashable** — Python requires that keys support the \`hash()\` function, which rules out mutable types like lists.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Simple hash function for integers
def hash_int(key, table_size=10):
    return key % table_size

# Every key maps to a predictable slot
keys = [15, 25, 37, 42, 100, 7]
for k in keys:
    print(f"key {k:3d} -> slot {hash_int(k)}")

# Python's built-in hash() for different types
print()
print("hash('hello'):", hash('hello'))
print("hash(42):", hash(42))
print("hash(3.14):", hash(3.14))

# Lists are NOT hashable (they're mutable)
try:
    hash([1, 2, 3])
except TypeError as e:
    print("Error:", e)`,
          caption: 'Hash functions map keys to array indices — lists can\'t be keys because they\'re mutable',
          editable: true,
        },
        {
          language: 'python',
          code: `# Python dicts are hash tables — O(1) average operations
import time

# Compare dict lookup vs list lookup
N = 1_000_000
data_dict = {i: i * 2 for i in range(N)}
data_list = list(range(N))

target = 999_999

start = time.time()
result = data_dict[target]
dict_time = time.time() - start

start = time.time()
result = data_list[target]
list_time = time.time() - start

print(f"Dict lookup:  {dict_time:.8f}s  (O(1))")
print(f"List index:   {list_time:.8f}s  (O(1))")
# Both are fast here — but searching by VALUE in a list is O(n)

start = time.time()
found = 999_999 in data_list   # linear scan O(n)
list_in_time = time.time() - start

start = time.time()
found = 999_999 in data_dict   # hash lookup O(1)
dict_in_time = time.time() - start

print(f"\\n'in' list (O(n)):  {list_in_time:.6f}s")
print(f"'in' dict (O(1)):  {dict_in_time:.6f}s")`,
          caption: 'The "in" operator: O(n) for lists (linear scan) vs O(1) for dicts (hash lookup)',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-9-2',
      title: 'Hash Functions for Strings',
      content: `Hashing integers is easy (just use modulo), but most real programs use string keys. We need a way to convert a string — a sequence of characters — into a single integer that we can then take modulo with the table size.

The **simplest approach** is to sum the ASCII values of all characters: \`sum(ord(c) for c in s) % table_size\`. This is fast, but terrible in practice: anagrams hash to the same slot! "eat", "tea", "ate", "eta" all contain the same characters with the same sum, so they all collide. In a dictionary of English words, this would cause massive clustering.

A much better approach is **positional weighting**: multiply each character's ASCII value by a weight based on its position. A common formula is \`sum((i+1) * ord(c) for i, c in enumerate(s)) % table_size\`. Now "eat" and "tea" produce different hashes because the position of each character matters. The multiplication by position ensures that two strings with the same characters in different orders get different hash values.

The **table size** also matters. Using a **prime number** as the table size reduces clustering caused by patterns in keys. If the table size is a power of 2 (like 16 or 32), keys with common factors will cluster into a few slots. Primes like 7, 11, 13, 97, 101 ensure better distribution. Python's internal hash tables use sophisticated polynomial hashing combined with prime-like sizes, but the core principles remain the same.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Simple hash: sum of ASCII values — anagrams collide!
def hash_simple(s, size=11):
    return sum(ord(c) for c in s) % size

# Weighted hash: position matters — anagrams differ
def hash_weighted(s, size=11):
    total = 0
    for i, c in enumerate(s):
        total += (i + 1) * ord(c)
    return total % size

words = ["eat", "tea", "ate", "eta"]
print("Simple hash (bad):")
for w in words:
    print(f"  '{w}' -> slot {hash_simple(w)}")  # all same!

print("\\nWeighted hash (better):")
for w in words:
    print(f"  '{w}' -> slot {hash_weighted(w)}")  # all different!`,
          caption: 'Simple ASCII sum hashes anagrams to the same slot — position weighting fixes this',
          editable: true,
        },
        {
          language: 'python',
          code: `# Why prime table sizes distribute better
def hash_weighted(s, size):
    return sum((i+1)*ord(c) for i,c in enumerate(s)) % size

words = ["apple", "banana", "cherry", "date", "elderberry",
         "fig", "grape", "honeydew", "kiwi", "lemon"]

# Non-prime size (10) — more clustering
slots_10 = {}
for w in words:
    slot = hash_weighted(w, 10)
    slots_10[slot] = slots_10.get(slot, 0) + 1

# Prime size (11) — better distribution
slots_11 = {}
for w in words:
    slot = hash_weighted(w, 11)
    slots_11[slot] = slots_11.get(slot, 0) + 1

print("With size 10:", sorted(slots_10.items()))
print("With size 11:", sorted(slots_11.items()))

# Python's built-in hash for strings (uses SipHash)
for w in ["hello", "world", "python"]:
    print(f"hash('{w}') % 11 = {hash(w) % 11}")`,
          caption: 'Prime table sizes reduce clustering; Python uses sophisticated SipHash internally',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-9-3',
      title: 'Collision Resolution',
      content: `A **collision** occurs when two different keys hash to the same array slot. With any finite table and enough keys, collisions are inevitable (this is guaranteed by the Pigeonhole Principle). The question is not how to avoid collisions, but how to **handle them gracefully**. There are two main strategies.

**Separate chaining** makes each slot hold a **list** (or linked list) of all key-value pairs that hash there. If keys "apple" and "elderberry" both hash to slot 3, slot 3 stores both pairs in its list. Lookup scans the list at the computed slot. Insertion is always O(1) (just append to the list). Lookup is O(1 + α) where α is the **load factor** — the ratio of stored items to table size. Separate chaining degrades gracefully as the table fills.

**Open addressing (linear probing)** stores all items in the array itself. When a slot is taken, probe the next slot, and the next, until an empty one is found (wrapping around). This avoids the overhead of separate lists but causes **clustering** — long runs of occupied slots form, making future insertions and lookups trace long probe sequences. Lookup must trace the same probe sequence to find or confirm absence of a key.

The **load factor α = n / table_size** is critical to performance. When α exceeds ~0.7 for open addressing or ~1.0 for chaining, performance degrades significantly. The solution is **rehashing**: create a larger table (typically double the size) and reinsert all existing keys. Python's dict rehashes automatically when α exceeds a threshold — this is why dict operations stay O(1) amortized even as you add more items.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Separate chaining: each slot holds a list of (key, value) pairs
class HashTableChaining:
    def __init__(self, size=7):
        self.size = size
        self.buckets = [[] for _ in range(size)]

    def _hash(self, key):
        return sum((i+1)*ord(c) for i,c in enumerate(str(key))) % self.size

    def put(self, key, value):
        idx = self._hash(key)
        for i, (k, v) in enumerate(self.buckets[idx]):
            if k == key:
                self.buckets[idx][i] = (key, value)  # update existing
                return
        self.buckets[idx].append((key, value))        # new key

    def get(self, key):
        idx = self._hash(key)
        for k, v in self.buckets[idx]:
            if k == key:
                return v
        return None

    def display(self):
        for i, bucket in enumerate(self.buckets):
            if bucket:
                print(f"slot {i}: {bucket}")

ht = HashTableChaining()
ht.put("apple", 1.2)
ht.put("banana", 0.5)
ht.put("cherry", 3.0)
ht.put("apple", 1.5)   # update existing key
ht.display()
print("banana:", ht.get("banana"))
print("mango:", ht.get("mango"))`,
          caption: 'Separate chaining: each slot holds a list of pairs — collisions are stored together',
          editable: true,
        },
        {
          language: 'python',
          code: `# Linear probing: find next empty slot on collision
class HashTableProbing:
    def __init__(self, size=11):
        self.size = size
        self.slots = [None] * size   # keys
        self.data  = [None] * size   # values

    def _hash(self, key):
        return hash(key) % self.size

    def _rehash(self, old_hash):
        return (old_hash + 1) % self.size   # probe next slot

    def put(self, key, value):
        idx = self._hash(key)
        if self.slots[idx] is None:
            self.slots[idx] = key
            self.data[idx]  = value
        else:
            if self.slots[idx] == key:
                self.data[idx] = value   # update
                return
            next_slot = self._rehash(idx)
            while self.slots[next_slot] is not None and self.slots[next_slot] != key:
                next_slot = self._rehash(next_slot)
            self.slots[next_slot] = key
            self.data[next_slot]  = value

    def get(self, key):
        idx = self._hash(key)
        start = idx
        while self.slots[idx] is not None:
            if self.slots[idx] == key:
                return self.data[idx]
            idx = self._rehash(idx)
            if idx == start:
                break
        return None

ht = HashTableProbing()
for k, v in [("cat", 1), ("dog", 2), ("bird", 3)]:
    ht.put(k, v)
print(ht.get("dog"))    # 2
print(ht.get("fish"))   # None`,
          caption: 'Linear probing stores everything in the array — collisions probe forward until an empty slot',
          editable: true,
        },
      ],
    },
  ],
  questions: module9Questions,
};

export default module9;
