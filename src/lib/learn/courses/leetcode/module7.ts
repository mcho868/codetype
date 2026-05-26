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

Given an unsorted array of integers **nums**, return the length of the **longest consecutive elements sequence**.

You must write an algorithm that runs in **O(n)** time.

**Example 1**
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

**Example 2**
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9

**Example 3**
Input: nums = [1,0,1,2]
Output: 3

**Constraints**
- 0 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9`,
      codeExamples: [],
    },
    {
      id: 'lesson-longest-consecutive-your-solution',
      title: 'Your Solution — Hash Set with Sequence Starts',
      content: `Your approach puts every number into a hash set, then only starts counting from the **beginning** of a consecutive run — when \`num - 1\` is not in the set.

**How it works**
1. Return 0 immediately if \`nums\` is empty.
2. Build a set \`h_nums\` from all values (deduplicates duplicates like the two 0s in Example 2).
3. For each \`num\` in the set, skip it unless \`num - 1\` is absent — that means \`num\` is the start of a sequence.
4. From that start, increment \`i\` while \`num + i\` exists in the set, tracking \`count\`.
5. Update \`max_count\` with the longest run found.

**Complexity**
- Time: **O(n)** — each number is visited at most twice across all inner while loops.
- Space: **O(n)** — the hash set.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        if not nums:
            return 0

        h_nums = set(nums)

        max_count = 1

        for num in h_nums:
            if num - 1 not in h_nums:
                count = 1
                i = 1
                while num + i in h_nums:
                    count += 1
                    i += 1
                max_count = max(count, max_count)

        return max_count

# Try it out — press Run
sol = Solution()
print(sol.longestConsecutive([100, 4, 200, 1, 3, 2]))  # 4
print(sol.longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))  # 9
print(sol.longestConsecutive([1, 0, 1, 2]))  # 3
print(sol.longestConsecutive([]))  # 0`,
          caption: 'Your solution — hash set, only count from sequence starts',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function longestConsecutive(nums: number[]): number {
  const h_num = new Set<number>(nums);
  let max_count = 1;
  if (nums.length === 0) {
    return 0;
  }
  for (const num of h_num) {
    if (!h_num.has(num - 1)) {
      let count = 1;
      let i = 1;
      while (h_num.has(num + i)) {
        count++;
        i++;
      }
      max_count = Math.max(count, max_count);
    }
  }
  return max_count;
}

// Try it out — press Run
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); // 9
console.log(longestConsecutive([1, 0, 1, 2])); // 3
console.log(longestConsecutive([])); // 0`,
          caption: 'Your solution — hash set, only count from sequence starts',
          editable: true,
        },
      ],
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
print(sol.longestConsecutive([100, 4, 200, 1, 3, 2]))  # 4
print(sol.longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))  # 9
print(sol.longestConsecutive([]))  # 0`,
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
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); // 9
console.log(longestConsecutive([])); // 0`,
          caption: 'TypeScript — O(n) hash set, only count from sequence starts',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module7;
