import type { Module } from '../python101/types';

const module21: Module = {
  id: 'leetcode-704-binary-search',
  slug: '21',
  title: '704. Binary Search',
  description:
    'Given a sorted array nums and a target, return the target index if it exists, otherwise -1. Uses the classic left, right, middle pointer pattern in O(log n) time.',
  icon: '🔎',
  color: 'from-emerald-500 to-cyan-400',
  locked: false,
  section: 'Binary Search',
  lessons: [
    {
      id: 'lesson-binary-search-problem',
      title: 'The Problem',
      content: `**704. Binary Search** — Easy

Given an array of integers **nums** sorted in ascending order, and an integer **target**, write a function to search **target** in **nums**.

If **target** exists, return its index. Otherwise, return **-1**.

You must write an algorithm with **O(log n)** runtime complexity.

**Example 1**
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4.

**Example 2**
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums, so return -1.

**Constraints**
- 1 <= nums.length <= 10^4
- -10^4 < nums[i], target < 10^4
- All integers in nums are unique.
- nums is sorted in ascending order.`,
      codeExamples: [],
    },
    {
      id: 'lesson-binary-search-solution',
      title: 'Binary Search — O(log n)',
      content: `Binary search works because the array is already sorted. Every comparison lets us throw away half of the remaining search space.

**How it works**
1. Start with \`left = 0\` and \`right = len(nums) - 1\`.
2. Pick the middle index.
3. If \`nums[middle]\` is the target, return \`middle\`.
4. If the target is smaller, search the left half by moving \`right\`.
5. If the target is larger, search the right half by moving \`left\`.
6. If the pointers cross, the target is not in the array.

**Complexity**
- Time: **O(log n)** — each loop cuts the search range roughly in half.
- Space: **O(1)** — only a few variables are used.

This is Manseung's solution for the Binary Search problem.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left = 0
        right = len(nums) - 1
        while left <= right:
            middle = (left + right) // 2
            if target == nums[middle]:
                return middle
            elif target < nums[middle]:
                right = middle - 1
            else:
                left = middle + 1
        return -1

# Try it out — press Run
sol = Solution()
print(sol.search([-1, 0, 3, 5, 9, 12], 9))  # 4
print(sol.search([-1, 0, 3, 5, 9, 12], 2))  # -1`,
          caption: 'Python — O(log n) binary search',
          editable: true,
        },
      ],
      visualizer: 'binary-search',
    },
  ],
  questions: [
    {
      id: 'leetcode-704-middle-update',
      type: 'multiple-choice',
      prompt:
        'In binary search on a sorted ascending array, what should you do when `target < nums[middle]`?',
      choices: [
        { id: 'a', text: 'Move `left` to `middle + 1`.' },
        { id: 'b', text: 'Move `right` to `middle - 1`.' },
        { id: 'c', text: 'Return `middle`.' },
        { id: 'd', text: 'Restart the search from index 0.' },
      ],
      correctAnswer: 'b',
      explanation:
        'If the target is smaller than the middle value, it can only be in the left half, so `right = middle - 1`.',
    },
    {
      id: 'leetcode-704-runtime',
      type: 'multiple-choice',
      prompt: 'Why is binary search O(log n)?',
      choices: [
        { id: 'a', text: 'It checks every item exactly once.' },
        { id: 'b', text: 'It sorts the array before searching.' },
        { id: 'c', text: 'Each comparison removes about half of the remaining search range.' },
        { id: 'd', text: 'It uses a hash map for constant-time lookup.' },
      ],
      correctAnswer: 'c',
      explanation:
        'Binary search repeatedly halves the remaining search range, so the number of checks grows logarithmically.',
    },
    {
      id: 'leetcode-704-code-runner',
      type: 'code-runner',
      prompt:
        'Complete the LeetCode-style `Solution.search` method. Return the index of `target` in sorted `nums`, or `-1` if it is missing.',
      language: 'python',
      starterCode: `from typing import List


class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left = 0
        right = len(nums) - 1

        # Write your binary search here.
        return -1


def run_search(nums, target):
    return Solution().search(nums, target)
`,
      gradeMode: 'function',
      testCases: [
        {
          id: 'sample-1',
          description: 'Target exists in the right half',
          funcName: 'run_search',
          args: [[-1, 0, 3, 5, 9, 12], 9],
          expectedReturn: 4,
        },
        {
          id: 'sample-2',
          description: 'Target is missing',
          funcName: 'run_search',
          args: [[-1, 0, 3, 5, 9, 12], 2],
          expectedReturn: -1,
        },
        {
          id: 'hidden-first',
          hidden: true,
          funcName: 'run_search',
          args: [[1, 3, 5, 7, 9], 1],
          expectedReturn: 0,
        },
        {
          id: 'hidden-last',
          hidden: true,
          funcName: 'run_search',
          args: [[1, 3, 5, 7, 9], 9],
          expectedReturn: 4,
        },
        {
          id: 'hidden-single',
          hidden: true,
          funcName: 'run_search',
          args: [[5], 5],
          expectedReturn: 0,
        },
      ],
      correctAnswer: '__code__',
      explanation: `Model solution:
from typing import List


class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left = 0
        right = len(nums) - 1
        while left <= right:
            middle = (left + right) // 2
            if target == nums[middle]:
                return middle
            elif target < nums[middle]:
                right = middle - 1
            else:
                left = middle + 1
        return -1

Why: the array is sorted, so each comparison safely discards one half of the remaining range.`,
    },
  ],
};

export default module21;
