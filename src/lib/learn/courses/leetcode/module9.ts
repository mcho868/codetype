import type { Module } from '../python101/types';

const module9: Module = {
  id: 'leetcode-167-two-sum-ii',
  slug: '9',
  title: '167. Two Integer Sum II',
  description:
    'Given a sorted array and a target, return the 1-indexed positions of two numbers that sum to target. Uses two pointers to exploit the sorted order in O(n) with O(1) space.',
  icon: '↔️',
  color: 'from-violet-500 to-purple-400',
  locked: false,
  section: 'Two Pointers',
  lessons: [
    {
      id: 'lesson-two-sum-ii-problem',
      title: 'The Problem',
      content: `**167. Two Integer Sum II** — Medium

Given an array of integers **numbers** sorted in non-decreasing order, return the **1-indexed** positions \`[index1, index2]\` of two numbers that add up to **target**, where \`index1 < index2\`.

There will always be exactly one valid solution. Your solution must use **O(1) additional space**.

**Example 1**
Input: numbers = [1,2,3,4], target = 3
Output: [1,2]
Explanation: 1 + 2 = 3. 1-indexed: index1 = 1, index2 = 2.

**Constraints**
- 2 <= numbers.length <= 1000
- -1000 <= numbers[i] <= 1000
- -1000 <= target <= 1000`,
      codeExamples: [],
    },
    {
      id: 'lesson-two-sum-ii-two-pointers',
      title: 'Two Pointers — O(n)',
      content: `Because the array is sorted, we can use two pointers — one at each end — and converge based on the current sum.

**How it works**
1. \`left = 0\`, \`right = len(numbers) - 1\`.
2. Compute \`total = numbers[left] + numbers[right]\`.
3. If \`total == target\`, return \`[left + 1, right + 1]\` (1-indexed).
4. If \`total < target\`, we need a larger sum → move \`left\` right.
5. If \`total > target\`, we need a smaller sum → move \`right\` left.

**Why this is correct:** Every time we move a pointer, we eliminate all pairs involving the old pointer position — the sorted order guarantees those pairs are either all too small or all too large. The algorithm is exhaustive without checking every pair.

**Complexity**
- Time: **O(n)** — each pointer moves at most n steps total.
- Space: **O(1)** — no extra data structures.

This contrasts with Two Sum (unsorted): there, O(1) space forces O(n²) brute force. Sorting gives us the two-pointer shortcut.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        left, right = 0, len(numbers) - 1

        while left < right:
            total = numbers[left] + numbers[right]
            if total == target:
                return [left + 1, right + 1]
            elif total < target:
                left += 1
            else:
                right -= 1

        return []  # guaranteed to find a solution

# Try it out — press Run
sol = Solution()
print(sol.twoSum([1,2,3,4], 3))    # [1, 2]
print(sol.twoSum([1,3,4,5,7], 9))  # [3, 4]`,
          caption: 'Python — O(n) two-pointer exploiting sorted order',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const total = numbers[left] + numbers[right];
    if (total === target) return [left + 1, right + 1];
    else if (total < target) left++;
    else right--;
  }

  return [];
}

// Try it out — press Run
console.log(twoSum([1,2,3,4], 3));    // [1, 2]
console.log(twoSum([1,3,4,5,7], 9));  // [3, 4]`,
          caption: 'TypeScript — O(n) two-pointer exploiting sorted order',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module9;
