import type { Module } from '../python101/types';

const module1: Module = {
  id: 'leetcode-217-contains-duplicate',
  slug: '1',
  title: '217. Contains Duplicate',
  description:
    'Given an integer array nums, return true if any value appears at least twice, and false if every element is distinct. Classic hash-set membership check.',
  icon: '🔁',
  color: 'from-blue-500 to-cyan-400',
  locked: false,
  section: 'Arrays & Hashing',
  lessons: [
    {
      id: 'lesson-contains-duplicate-problem',
      title: 'The Problem',
      content: `**217. Contains Duplicate** — Easy

Given an integer array **nums**, return **true** if any value appears **at least twice**, and **false** if every element is distinct.

**Example 1**
Input: nums = [1,2,3,1]
Output: true
Explanation: The element 1 occurs at indices 0 and 3.

**Example 2**
Input: nums = [1,2,3,4]
Output: false
Explanation: All elements are distinct.

**Example 3**
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true

**Constraints**
- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9`,
      codeExamples: [],
    },
    {
      id: 'lesson-contains-duplicate-hashmap',
      title: 'Hash Map — O(n)',
      content: `Store each value and its first-seen index in a hash map. If a value is encountered again at a different index, a duplicate exists.

**How it works**
- Walk through nums with index i and value n.
- If n is not in the map, store n → i.
- If n is already in the map and the stored index differs from i, return true immediately.
- If the loop finishes without a hit, return false.

**Complexity**
- Time: **O(n)** — single pass, each lookup/insert is O(1) average.
- Space: **O(n)** — map may hold up to n entries.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        hm = {}
        for i, n in enumerate(nums):
            if n not in hm:
                hm[n] = i
            elif hm[n] != i:
                return True
        return False

# Try it out — press Run
sol = Solution()
print(sol.containsDuplicate([1,2,3,1]))           # True
print(sol.containsDuplicate([1,2,3,4]))           # False
print(sol.containsDuplicate([1,1,1,3,3,4,3,2,4,2]))  # True`,
          caption: 'Python — O(n) hash map approach',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function containsDuplicate(nums: number[]): boolean {
  const hm = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    if (!hm.has(n)) {
      hm.set(n, i);
    } else if (hm.get(n) !== i) {
      return true;
    }
  }
  return false;
}

// Try it out — press Run
console.log(containsDuplicate([1,2,3,1]));            // true
console.log(containsDuplicate([1,2,3,4]));            // false
console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2])); // true`,
          caption: 'TypeScript — O(n) hash map approach',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module1;
