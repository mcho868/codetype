import type { Module } from '../python101/types';

const module7: Module = {
  id: 'leetcode-128-longest-consecutive-sequence',
  slug: '7',
  title: '128. Longest Consecutive Sequence',
  description:
    'Given an integer array nums, return the length of the longest consecutive sequence. Uses a hash set to find sequence starts and count runs in O(n).',
  icon: '🔗',
  color: 'from-teal-500 to-cyan-400',
  locked: false,
  section: 'Arrays & Hashing',
  lessons: [
    {
      id: 'lesson-longest-consecutive-problem',
      title: 'The Problem',
      content: `**128. Longest Consecutive Sequence** — Medium

Given an array of integers **nums**, return the length of the **longest consecutive sequence** of elements.

A consecutive sequence is a sequence where each element is exactly 1 greater than the previous. The elements do not have to be consecutive in the original array.

You must write an algorithm that runs in **O(n)** time.

**Example 1**
Input: nums = [2,20,4,10,3,4,5]
Output: 4
Explanation: The longest consecutive sequence is [2,3,4,5].

**Example 2**
Input: nums = [0,3,2,5,4,6,1,1]
Output: 7
Explanation: [0,1,2,3,4,5,6].

**Constraints**
- 0 <= nums.length <= 1000
- -10^9 <= nums[i] <= 10^9`,
      codeExamples: [],
    },
    {
      id: 'lesson-longest-consecutive-hash-set',
      title: 'Hash Set — O(n)',
      content: `The trick is to only start counting from the **beginning** of a sequence. A number \`n\` is the start of a sequence if \`n - 1\` is **not** in the set. This prevents O(n²) by ensuring each sequence is counted only once.

**How it works**
1. Insert all numbers into a hash set (deduplicates and gives O(1) lookup).
2. For each number \`n\` in the set, check if \`n - 1\` is absent — if so, \`n\` is the start of a new sequence.
3. From that start, keep incrementing while \`n + length\` exists in the set.
4. Track the maximum length seen.

**Why O(n)?** Each number is visited at most twice — once as a potential sequence start (step 2), and once during the inner while loop of the sequence it belongs to. Across all numbers the inner loop runs at most n total iterations.

**Complexity**
- Time: **O(n)** — building the set is O(n); the two-pointer walk is O(n) amortized.
- Space: **O(n)** — the hash set.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        num_set = set(nums)
        longest = 0

        for n in num_set:
            # Only start counting from the beginning of a sequence
            if n - 1 not in num_set:
                length = 1
                while n + length in num_set:
                    length += 1
                longest = max(longest, length)

        return longest

# Try it out — press Run
sol = Solution()
print(sol.longestConsecutive([2,20,4,10,3,4,5]))  # 4
print(sol.longestConsecutive([0,3,2,5,4,6,1,1]))  # 7
print(sol.longestConsecutive([]))                  # 0`,
          caption: 'Python — O(n) hash set, only count from sequence starts',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function longestConsecutive(nums: number[]): number {
  const numSet = new Set(nums);
  let longest = 0;

  for (const n of numSet) {
    // Only start counting from the beginning of a sequence
    if (!numSet.has(n - 1)) {
      let length = 1;
      while (numSet.has(n + length)) {
        length++;
      }
      longest = Math.max(longest, length);
    }
  }

  return longest;
}

// Try it out — press Run
console.log(longestConsecutive([2,20,4,10,3,4,5])); // 4
console.log(longestConsecutive([0,3,2,5,4,6,1,1])); // 7
console.log(longestConsecutive([]));                  // 0`,
          caption: 'TypeScript — O(n) hash set, only count from sequence starts',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module7;
