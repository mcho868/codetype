import type { Module } from '../../python101/types';

const module25: Module = {
  id: 'leetcode-33-search-in-rotated-sorted-array',
  slug: '25',
  title: '33. Search in Rotated Sorted Array',
  description:
    'Search for a target in a rotated sorted array of unique integers. Identify which half is sorted at each step, then discard the half that cannot contain the target.',
  icon: '⌕',
  color: 'from-rose-500 to-orange-400',
  locked: false,
  section: 'Binary Search',
  lessons: [
    {
      id: 'lesson-search-rotated-array-problem',
      title: 'The Problem',
      content: `**33. Search in Rotated Sorted Array** - Medium

An array of length **n** was originally sorted in ascending order, then rotated between **1** and **n** times.

For example, \`[1,2,3,4,5,6]\` could become:

- \`[3,4,5,6,1,2]\` after four rotations.
- \`[1,2,3,4,5,6]\` after six rotations.

Given the rotated sorted array **nums** and an integer **target**, return the index of **target**. Return **-1** if it is not present.

Every value in **nums** is unique, and the algorithm must run in **O(log n)** time.

**Example 1**
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

**Example 2**
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1

**Example 3**
Input: nums = [1], target = 0
Output: -1`,
      codeExamples: [],
    },
    {
      id: 'lesson-search-rotated-array-solution',
      title: 'Find the Sorted Half',
      content: `Rotation breaks the ordering at one point, but around any \`middle\` index at least one half of the current search range is still sorted.

First, compare the target with \`nums[middle]\`. If they match, return \`middle\` immediately.

Otherwise, identify the sorted half:

1. If \`nums[left] <= nums[middle]\`, the left half is sorted.
2. Otherwise, the right half is sorted.

Once we know which half is sorted, we can check whether the target falls inside its value range.

**When the left half is sorted**

- If \`nums[left] <= target < nums[middle]\`, search left.
- Otherwise, search right.

**When the right half is sorted**

- If \`nums[middle] < target <= nums[right]\`, search right.
- Otherwise, search left.

The inequalities exclude \`middle\` because it was already checked. They include the outer endpoint because that value is still a possible match.

Each iteration discards at least half of the remaining indices.

**Complexity**
- Time: **O(log n)**
- Space: **O(1)**`,
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

            if nums[middle] == target:
                return middle
            if nums[left] <= nums[middle]:
                if nums[left] <= target < nums[middle]:
                    right = middle - 1
                else:
                    left = middle + 1
            else:
                if nums[middle] < target <= nums[right]:
                    left = middle + 1
                else:
                    right = middle - 1

        return -1

# Try it out - press Run
sol = Solution()
print(sol.search([4, 5, 6, 7, 0, 1, 2], 0))  # 4
print(sol.search([4, 5, 6, 7, 0, 1, 2], 3))  # -1
print(sol.search([1], 1))                     # 0`,
          caption: 'Python - binary search by identifying the sorted half',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'leetcode-33-sorted-half',
      type: 'multiple-choice',
      prompt:
        'What does `nums[left] <= nums[middle]` tell us in this solution?',
      choices: [
        { id: 'a', text: 'The entire array is sorted.' },
        { id: 'b', text: 'The left half from `left` through `middle` is sorted.' },
        { id: 'c', text: 'The target must be in the left half.' },
        { id: 'd', text: '`middle` is the minimum value.' },
      ],
      correctAnswer: 'b',
      explanation:
        'Because values are unique, this comparison shows that the rotation boundary is not inside the left half, so that half is sorted.',
    },
    {
      id: 'leetcode-33-search-left',
      type: 'multiple-choice',
      prompt:
        'The left half is sorted. When should the search continue in that half?',
      choices: [
        { id: 'a', text: 'When `target < nums[left]`.' },
        { id: 'b', text: 'When `nums[left] <= target < nums[middle]`.' },
        { id: 'c', text: 'Whenever `target > nums[middle]`.' },
        { id: 'd', text: 'Only when `left == middle`.' },
      ],
      correctAnswer: 'b',
      explanation:
        'A target inside the sorted left half must be at least its first value and smaller than the already-checked middle value.',
    },
    {
      id: 'leetcode-33-code-runner',
      type: 'code-runner',
      prompt:
        'Complete the LeetCode-style `Solution.search` method. Return the target index, or `-1` when it is absent, in O(log n) time.',
      language: 'python',
      starterCode: `from typing import List


class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left = 0
        right = len(nums) - 1

        # Use binary search and identify the sorted half.
        return -1


def run_search(nums, target):
    return Solution().search(nums, target)
`,
      gradeMode: 'function',
      testCases: [
        {
          id: 'sample-1',
          description: 'Target lies after the rotation boundary',
          funcName: 'run_search',
          args: [[4, 5, 6, 7, 0, 1, 2], 0],
          expectedReturn: 4,
        },
        {
          id: 'sample-2',
          description: 'Target is absent',
          funcName: 'run_search',
          args: [[4, 5, 6, 7, 0, 1, 2], 3],
          expectedReturn: -1,
        },
        {
          id: 'sample-3',
          description: 'Single value does not match',
          funcName: 'run_search',
          args: [[1], 0],
          expectedReturn: -1,
        },
        {
          id: 'hidden-left-sorted-half',
          hidden: true,
          funcName: 'run_search',
          args: [[6, 7, 8, 1, 2, 3, 4, 5], 7],
          expectedReturn: 1,
        },
        {
          id: 'hidden-right-sorted-half',
          hidden: true,
          funcName: 'run_search',
          args: [[6, 7, 8, 1, 2, 3, 4, 5], 4],
          expectedReturn: 6,
        },
        {
          id: 'hidden-unrotated-last',
          hidden: true,
          funcName: 'run_search',
          args: [[-5, -2, 0, 3, 9], 9],
          expectedReturn: 4,
        },
        {
          id: 'hidden-two-values',
          hidden: true,
          funcName: 'run_search',
          args: [[3, 1], 1],
          expectedReturn: 1,
        },
        {
          id: 'hidden-single-match',
          hidden: true,
          funcName: 'run_search',
          args: [[7], 7],
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

            if nums[middle] == target:
                return middle
            if nums[left] <= nums[middle]:
                if nums[left] <= target < nums[middle]:
                    right = middle - 1
                else:
                    left = middle + 1
            else:
                if nums[middle] < target <= nums[right]:
                    left = middle + 1
                else:
                    right = middle - 1

        return -1

Why: at least one half of the current range is sorted. Checking whether the target falls inside that sorted half tells us which half can be safely discarded.`,
    },
  ],
};

export default module25;
