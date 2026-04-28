import type { Module } from '../python101/types';

const module0: Module = {
  id: 'leetcode-1-two-sum',
  slug: '0',
  title: '1. Two Sum',
  description:
    'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. Classic introduction to the hash-map pattern.',
  icon: '➕',
  color: 'from-yellow-500 to-amber-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-two-sum-problem',
      title: 'The Problem',
      content: `**1. Two Sum** — Easy

Given an array of integers **nums** and an integer **target**, return the **indices** of the two numbers such that they add up to **target**.

You may assume that each input has exactly one solution, and you may not use the same element twice. You can return the answer in any order.

**Example 1**
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] == 9.

**Example 2**
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]

**Example 3**
Input: nums = [3, 3], target = 6
Output: [0, 1]

**Constraints**
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.

**Follow-up:** Can you find an algorithm with less than O(n²) time complexity?`,
      codeExamples: [],
    },
    {
      id: 'lesson-two-sum-brute-force',
      title: 'Brute Force — O(n²)',
      content: `The most straightforward approach is to check **every pair** of indices (i, j) and see whether nums[i] + nums[j] == target.

**How it works**
- Outer loop picks index i.
- Inner loop picks index j, where j > i (so we never use the same element twice, and we avoid checking the same pair twice).
- If the pair sums to target, return [i, j].

**Complexity**
- Time: **O(n²)** — we examine every pair.
- Space: **O(1)** — no extra data structures.

This always works, but on the constraint n up to 10⁴ we'd do ~10⁸ comparisons in the worst case — slow. That's why the hash-map solution below exists.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []

# Try it out — press Run
sol = Solution()
print(sol.twoSum([2, 7, 11, 15], 9))   # [0, 1]
print(sol.twoSum([3, 2, 4], 6))        # [1, 2]
print(sol.twoSum([3, 3], 6))           # [0, 1]`,
          caption: 'Python — O(n²) brute force with a nested loop',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function twoSum(nums: number[], target: number): number[] {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

// Try it out — press Run
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]
console.log(twoSum([3, 3], 6));         // [0, 1]`,
          caption: 'TypeScript — O(n²) brute force with a nested loop',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-two-sum-hashmap',
      title: 'Hash Map — O(n)',
      content: `We can do much better than O(n²) by trading space for time.

**Key insight:** as we walk through the array, for each number **n** we already know what its partner must be: **diff = target - n**. If we've seen that partner before, we're done.

**How it works**
- Keep a hash map from value → index of values we've already seen.
- For each element (i, n):
  1. Compute diff = target - n.
  2. If diff is already in the map, return [map[diff], i].
  3. Otherwise store n → i in the map and continue.

Because we return as soon as the pair is found, and each lookup/insert in a hash map is O(1) on average, we touch each element at most once.

**Complexity**
- Time: **O(n)** — single pass.
- Space: **O(n)** — the hash map may hold up to n entries.

**Why this is less than O(n²)**
The follow-up asks for sub-quadratic time. O(n) is strictly less than O(n²) for large n — this is the canonical answer for Two Sum, and the pattern (use a hash map to turn a "find the partner" search into an O(1) lookup) shows up in many harder problems.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        hashMap = {}

        for i, n in enumerate(nums):
            diff = target - n
            if diff in hashMap:
                return [hashMap[diff], i]
            hashMap[n] = i

# Try it out — press Run
sol = Solution()
print(sol.twoSum([2, 7, 11, 15], 9))   # [0, 1]
print(sol.twoSum([3, 2, 4], 6))        # [1, 2]
print(sol.twoSum([3, 3], 6))           # [0, 1]`,
          caption: 'Python — O(n) single-pass hash map (the reference solution)',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function twoSum(nums: number[], target: number): number[] {
  const hashMap = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const diff = target - n;
    if (hashMap.has(diff)) {
      return [hashMap.get(diff)!, i];
    }
    hashMap.set(n, i);
  }

  return [];
}

// Try it out — press Run
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]
console.log(twoSum([3, 3], 6));         // [0, 1]`,
          caption: 'TypeScript — O(n) single-pass hash map using Map<number, number>',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module0;
