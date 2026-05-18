import type { Module } from '../python101/types';

const module3: Module = {
  id: 'leetcode-49-group-anagrams',
  slug: '3',
  title: '49. Group Anagrams',
  description:
    'Given an array of strings, group the anagrams together. Uses sorted-string keys in a hash map to bucket words that share the same character multiset.',
  icon: '📦',
  color: 'from-purple-500 to-violet-400',
  locked: false,
  section: 'Arrays & Hashing',
  lessons: [
    {
      id: 'lesson-group-anagrams-problem',
      title: 'The Problem',
      content: `**49. Group Anagrams** — Medium

Given an array of strings **strs**, group the anagrams together. You can return the answer in any order.

Two strings are anagrams of each other if one can be rearranged to form the other using exactly the same characters.

**Example 1**
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

**Example 2**
Input: strs = [""]
Output: [[""]]

**Example 3**
Input: strs = ["a"]
Output: [["a"]]

**Constraints**
- 1 <= strs.length <= 10^4
- 0 <= strs[i].length <= 100
- strs[i] consists of lowercase English letters.`,
      codeExamples: [],
    },
    {
      id: 'lesson-group-anagrams-sorted-key',
      title: 'Sorted-Key Hash Map — O(n · k log k)',
      content: `Two words are anagrams if and only if their sorted character sequences are identical. We can use the sorted form as a canonical key to bucket all anagrams together.

**How it works**
- For each word, sort its characters to get a canonical key (e.g. "eat" → "aet").
- Look up that key in a hash map; if it doesn't exist, create an empty list.
- Append the original word to the list under that key.
- Return all the values of the map.

**Complexity**
- Time: **O(n · k log k)** — n words, each sorted in O(k log k) where k is word length.
- Space: **O(n · k)** — storing all words in the map.

**Alternative:** Use a fixed-size count array of 26 integers as the key instead of sorting. That makes the per-word work O(k) rather than O(k log k), but for the given constraints the sorted approach is simple and fast enough.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        grouped = {}
        for word in strs:
            sorted_key = "".join(sorted(word))
            if sorted_key not in grouped:
                grouped[sorted_key] = []
            grouped[sorted_key].append(word)
        return list(grouped.values())

# Try it out — press Run
sol = Solution()
print(sol.groupAnagrams(["eat","tea","tan","ate","nat","bat"]))
# [['eat','tea','ate'], ['tan','nat'], ['bat']] (order may vary)
print(sol.groupAnagrams([""]))   # [['']]
print(sol.groupAnagrams(["a"]))  # [['a']]`,
          caption: 'Python — O(n · k log k) sorted-key grouping',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function groupAnagrams(strs: string[]): string[][] {
  const grouped = new Map<string, string[]>();
  for (const word of strs) {
    const key = word.split('').sort().join('');
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(word);
  }
  return Array.from(grouped.values());
}

// Try it out — press Run
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// [['eat','tea','ate'], ['tan','nat'], ['bat']] (order may vary)
console.log(groupAnagrams([""]));  // [['']]
console.log(groupAnagrams(["a"])); // [['a']]`,
          caption: 'TypeScript — O(n · k log k) sorted-key grouping',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module3;
