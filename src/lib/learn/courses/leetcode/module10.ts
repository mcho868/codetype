import type { Module } from '../python101/types';

const module10: Module = {
  id: 'leetcode-15-3sum',
  slug: '10',
  title: '15. 3Sum',
  description:
    'Given an integer array, return all unique triplets that sum to zero. Sort the array, fix one element, then use two pointers on the remainder — O(n²) with no duplicate triplets.',
  icon: '🔺',
  color: 'from-pink-500 to-rose-400',
  locked: false,
  section: 'Two Pointers',
  lessons: [
    {
      id: 'lesson-3sum-problem',
      title: 'The Problem',
      content: `**15. 3Sum** — Medium

Given an integer array **nums**, return all the **unique triplets** \`[nums[i], nums[j], nums[k]]\` where \`i\`, \`j\`, and \`k\` are distinct and \`nums[i] + nums[j] + nums[k] == 0\`.

The output must not contain duplicate triplets.

**Example 1**
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]

**Example 2**
Input: nums = [0,1,1]
Output: []

**Example 3**
Input: nums = [0,0,0]
Output: [[0,0,0]]

**Constraints**
- 3 <= nums.length <= 1000
- -10^5 <= nums[i] <= 10^5`,
      codeExamples: [],
    },
    {
      id: 'lesson-3sum-sort-two-pointer',
      title: 'Sort + Two Pointers — O(n²)',
      content: `Sort the array first. Then for each index \`i\`, run the Two Sum II two-pointer approach on the subarray to the right of \`i\`, looking for pairs that sum to \`-nums[i]\`.

**How it works**
1. Sort \`nums\`.
2. For each index \`i\` (0 to n-3):
   - Skip if \`nums[i] > 0\` — since the array is sorted, no three numbers to the right can sum to 0.
   - Skip duplicates: if \`i > 0\` and \`nums[i] == nums[i-1]\`, continue.
   - Set \`left = i + 1\`, \`right = n - 1\`, target = \`-nums[i]\`.
   - Run two-pointer: when a valid triplet is found, skip all duplicate \`left\` and \`right\` values before moving inward.

**Why sorting eliminates duplicates:** Once sorted, duplicate values are adjacent. Skipping over them at both the outer loop and the inner two-pointer stage ensures each unique triplet is added exactly once.

**Complexity**
- Time: **O(n²)** — O(n log n) sort + O(n) outer loop × O(n) inner two-pointer.
- Space: **O(1)** extra (output doesn't count).`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        result = []

        for i in range(len(nums) - 2):
            if nums[i] > 0:
                break
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            left, right = i + 1, len(nums) - 1
            while left < right:
                total = nums[i] + nums[left] + nums[right]
                if total == 0:
                    result.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
                elif total < 0:
                    left += 1
                else:
                    right -= 1

        return result

# Try it out — press Run
sol = Solution()
print(sol.threeSum([-1,0,1,2,-1,-4]))  # [[-1,-1,2],[-1,0,1]]
print(sol.threeSum([0,1,1]))           # []
print(sol.threeSum([0,0,0]))           # [[0,0,0]]`,
          caption: 'Python — O(n²) sort + two-pointer with duplicate skipping',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const total = nums[i] + nums[left] + nums[right];
      if (total === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (total < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

// Try it out — press Run
console.log(threeSum([-1,0,1,2,-1,-4])); // [[-1,-1,2],[-1,0,1]]
console.log(threeSum([0,1,1]));           // []
console.log(threeSum([0,0,0]));           // [[0,0,0]]`,
          caption: 'TypeScript — O(n²) sort + two-pointer with duplicate skipping',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module10;
