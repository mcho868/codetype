import type { Module } from '../../python101/types';

const module24: Module = {
  id: 'leetcode-153-find-minimum-in-rotated-sorted-array',
  slug: '24',
  title: '153. Find Minimum in Rotated Sorted Array',
  description:
    'Find the minimum value in a rotated sorted array of unique integers. Use circular neighbor checks to detect the rotation boundary, then discard half of the remaining search range.',
  icon: '↻',
  color: 'from-violet-500 to-fuchsia-400',
  locked: false,
  section: 'Binary Search',
  lessons: [
    {
      id: 'lesson-find-minimum-rotated-array-problem',
      title: 'The Problem',
      content: `**153. Find Minimum in Rotated Sorted Array** - Medium

An array of length **n** was originally sorted in ascending order, then rotated between **1** and **n** times.

For example, \`[0,1,2,4,5,6,7]\` could become:

- \`[4,5,6,7,0,1,2]\` after four rotations.
- \`[0,1,2,4,5,6,7]\` after seven rotations.

Given the rotated sorted array **nums**, return its minimum element.

Every value in **nums** is unique, and the algorithm must run in **O(log n)** time.

**Example 1**
Input: nums = [3,4,5,1,2]
Output: 1

**Example 2**
Input: nums = [4,5,6,7,0,1,2]
Output: 0

**Example 3**
Input: nums = [11,13,15,17]
Output: 11

**Constraints**
- 1 <= nums.length <= 5000
- -5000 <= nums[i] <= 5000
- All values in nums are unique`,
      codeExamples: [],
    },
    {
      id: 'lesson-find-minimum-rotated-array-solution',
      title: 'Find the Rotation Boundary',
      content: `A rotated sorted array still consists of increasing values, except at one boundary where a large value is followed by the minimum.

This solution treats the array as circular when checking the values beside \`middle\`:

- If both neighbors are greater than \`nums[middle]\`, then \`middle\` is the minimum.
- If both neighbors are less than \`nums[middle]\`, then \`middle\` is the largest value and the next circular position is the minimum.

The modulo expressions make those checks work at the ends of the array:

- \`(middle - 1) % len(nums)\` wraps left from index \`0\` to the last index.
- \`(middle + 1) % len(nums)\` wraps right from the last index to index \`0\`.

If \`middle\` is not beside the rotation boundary, the endpoint values reveal which half can contain the minimum:

1. When \`nums[left] < nums[right]\`, the current range is increasing, so its smallest candidate is toward the left.
2. When \`nums[right] < nums[left]\`, the current range contains the rotation boundary.
3. In that rotated range, a middle value below \`nums[left]\` belongs to the lower portion, so the minimum is at or to its left. Otherwise, the boundary is to its right.

The local-minimum and local-maximum checks handle \`middle\` before the search discards it with \`middle - 1\` or \`middle + 1\`.

**Complexity**
- Time: **O(log n)**
- Space: **O(1)**`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def findMin(self, nums: List[int]) -> int:
        left = 0
        right = len(nums) - 1

        while right > left:
            middle = (left + right) // 2
            if (
                nums[(middle - 1) % len(nums)] > nums[middle]
                and nums[(middle + 1) % len(nums)] > nums[middle]
            ):
                return nums[middle]
            elif (
                nums[(middle - 1) % len(nums)] < nums[middle]
                and nums[(middle + 1) % len(nums)] < nums[middle]
            ):
                return nums[(middle + 1) % len(nums)]
            else:
                if (nums[left] < nums[right] and nums[middle] > nums[left]) or (
                    nums[right] < nums[left] and nums[middle] < nums[left]
                ):
                    right = middle - 1
                else:
                    left = middle + 1

        return min(nums[left : right + 1])

# Try it out - press Run
sol = Solution()
print(sol.findMin([3, 4, 5, 1, 2]))        # 1
print(sol.findMin([4, 5, 6, 7, 0, 1, 2]))  # 0
print(sol.findMin([11, 13, 15, 17]))       # 11`,
          caption: 'Python - binary search using circular neighbor checks',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'leetcode-153-circular-neighbors',
      type: 'multiple-choice',
      prompt:
        'Why does the solution use modulo when checking the neighbors of `middle`?',
      choices: [
        {
          id: 'a',
          text: 'To wrap around the array when `middle` is at an endpoint.',
        },
        { id: 'b', text: 'To sort the array without allocating extra space.' },
        { id: 'c', text: 'To remove duplicate values from the search.' },
        { id: 'd', text: 'To calculate the number of rotations directly.' },
      ],
      correctAnswer: 'a',
      explanation:
        'Modulo makes the first and last elements circular neighbors, matching the rotation boundary.',
    },
    {
      id: 'leetcode-153-local-maximum',
      type: 'multiple-choice',
      prompt:
        'If both circular neighbors are smaller than `nums[middle]`, where is the minimum?',
      choices: [
        { id: 'a', text: 'At `middle`.' },
        { id: 'b', text: 'At `(middle + 1) % len(nums)`.' },
        { id: 'c', text: 'Always at index `0`.' },
        { id: 'd', text: 'Always at `middle - 1`.' },
      ],
      correctAnswer: 'b',
      explanation:
        '`middle` is the local maximum, so the following circular element crosses the rotation boundary and is the minimum.',
    },
    {
      id: 'leetcode-153-code-runner',
      type: 'code-runner',
      prompt:
        'Complete the LeetCode-style `Solution.findMin` method. Return the minimum value in O(log n) time.',
      language: 'python',
      starterCode: `from typing import List


class Solution:
    def findMin(self, nums: List[int]) -> int:
        left = 0
        right = len(nums) - 1

        # Use binary search to find the rotation boundary.
        return nums[0]


def run_find_min(nums):
    return Solution().findMin(nums)
`,
      gradeMode: 'function',
      testCases: [
        {
          id: 'sample-1',
          description: 'Minimum lies in the right half',
          funcName: 'run_find_min',
          args: [[3, 4, 5, 1, 2]],
          expectedReturn: 1,
        },
        {
          id: 'sample-2',
          description: 'Rotation boundary follows the maximum',
          funcName: 'run_find_min',
          args: [[4, 5, 6, 7, 0, 1, 2]],
          expectedReturn: 0,
        },
        {
          id: 'sample-3',
          description: 'A full rotation leaves the array sorted',
          funcName: 'run_find_min',
          args: [[11, 13, 15, 17]],
          expectedReturn: 11,
        },
        {
          id: 'hidden-single',
          hidden: true,
          funcName: 'run_find_min',
          args: [[7]],
          expectedReturn: 7,
        },
        {
          id: 'hidden-two-values',
          hidden: true,
          funcName: 'run_find_min',
          args: [[2, 1]],
          expectedReturn: 1,
        },
        {
          id: 'hidden-boundary-near-end',
          hidden: true,
          funcName: 'run_find_min',
          args: [[2, 3, 4, 5, 1]],
          expectedReturn: 1,
        },
        {
          id: 'hidden-negative-values',
          hidden: true,
          funcName: 'run_find_min',
          args: [[0, 3, 8, -5, -2]],
          expectedReturn: -5,
        },
      ],
      correctAnswer: '__code__',
      explanation: `Model solution:
from typing import List


class Solution:
    def findMin(self, nums: List[int]) -> int:
        left = 0
        right = len(nums) - 1

        while right > left:
            middle = (left + right) // 2
            if (
                nums[(middle - 1) % len(nums)] > nums[middle]
                and nums[(middle + 1) % len(nums)] > nums[middle]
            ):
                return nums[middle]
            elif (
                nums[(middle - 1) % len(nums)] < nums[middle]
                and nums[(middle + 1) % len(nums)] < nums[middle]
            ):
                return nums[(middle + 1) % len(nums)]
            else:
                if (nums[left] < nums[right] and nums[middle] > nums[left]) or (
                    nums[right] < nums[left] and nums[middle] < nums[left]
                ):
                    right = middle - 1
                else:
                    left = middle + 1

        return min(nums[left : right + 1])

Why: circular neighbor checks identify the minimum or the value immediately before it. Otherwise, the endpoint and middle values identify which half can still contain the rotation boundary.`,
    },
  ],
};

export default module24;
