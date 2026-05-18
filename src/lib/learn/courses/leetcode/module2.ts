import type { Module } from '../python101/types';

const module2: Module = {
  id: 'leetcode-242-valid-anagram',
  slug: '2',
  title: '242. Valid Anagram',
  description:
    'Given two strings s and t, return true if t is an anagram of s. Uses a frequency hash map to compare character counts in one pass over each string.',
  icon: '🔤',
  color: 'from-green-500 to-emerald-400',
  locked: false,
  section: 'Arrays & Hashing',
  lessons: [
    {
      id: 'lesson-valid-anagram-problem',
      title: 'The Problem',
      content: `**242. Valid Anagram** — Easy

Given two strings **s** and **t**, return **true** if **t** is an anagram of **s**, and **false** otherwise.

An anagram is a word formed by rearranging the letters of another word using all original letters exactly once.

**Example 1**
Input: s = "anagram", t = "nagaram"
Output: true

**Example 2**
Input: s = "rat", t = "car"
Output: false

**Constraints**
- 1 <= s.length, t.length <= 5 × 10^4
- s and t consist of lowercase English letters.

**Follow-up:** What if the inputs contain Unicode characters? How would you adapt your solution?`,
      codeExamples: [],
    },
    {
      id: 'lesson-valid-anagram-hashmap',
      title: 'Hash Map — O(n)',
      content: `Build a frequency map for s, then drain it using t. If every character in t is found with a remaining count > 0, and the map ends up empty, the strings are anagrams.

**How it works**
1. Walk s, incrementing the count for each character.
2. Walk t — if the character isn't in the map, return false immediately. Otherwise decrement its count; remove the key when the count reaches 0.
3. After both passes, if the map is empty every character matched exactly.

**Complexity**
- Time: **O(n + m)** — one pass over each string.
- Space: **O(k)** where k is the size of the character alphabet (at most 26 for lowercase ASCII).

**Follow-up (Unicode):** The same algorithm handles Unicode — a Python dict or JS Map stores any hashable key, so no change is needed for correctness. The space becomes O(k) where k may be larger, but the logic is identical.`,
      codeExamples: [
        {
          language: 'python',
          code: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        hm = {}
        for val in s:
            if val not in hm:
                hm[val] = 1
            else:
                hm[val] += 1

        for char in t:
            if char not in hm:
                return False
            else:
                hm[char] -= 1
                if hm[char] == 0:
                    hm.pop(char)

        return len(hm) == 0

# Try it out — press Run
sol = Solution()
print(sol.isAnagram("anagram", "nagaram"))  # True
print(sol.isAnagram("rat", "car"))          # False`,
          caption: 'Python — O(n) frequency map with incremental drain',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function isAnagram(s: string, t: string): boolean {
  const hm = new Map<string, number>();
  for (const ch of s) {
    hm.set(ch, (hm.get(ch) ?? 0) + 1);
  }
  for (const ch of t) {
    if (!hm.has(ch)) return false;
    const count = hm.get(ch)! - 1;
    if (count === 0) hm.delete(ch);
    else hm.set(ch, count);
  }
  return hm.size === 0;
}

// Try it out — press Run
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car"));         // false`,
          caption: 'TypeScript — O(n) frequency map with incremental drain',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module2;
