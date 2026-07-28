import type { Module } from '../../python101/types';

const module22: Module = {
  id: 'leetcode-74-search-a-2d-matrix',
  slug: '22',
  title: '74. Search a 2D Matrix',
  description:
    'Search a row-sorted matrix where each row starts after the previous row ends. Treat the matrix as one sorted array and binary search over virtual indices in O(log(m * n)) time.',
  icon: '▦',
  color: 'from-cyan-500 to-teal-400',
  locked: false,
  section: 'Binary Search',
  lessons: [
    {
      id: 'lesson-search-2d-matrix-problem',
      title: 'The Problem',
      content: `**74. Search a 2D Matrix** - Medium

You are given an **m x n** 2-D integer array **matrix** and an integer **target**.

Each row in **matrix** is sorted in non-decreasing order.

The first integer of every row is greater than the last integer of the previous row.

Return **true** if **target** exists within **matrix**, or **false** otherwise.

Can you write a solution that runs in **O(log(m * n))** time?

**Example 1**
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true

**Example 2**
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false

**Constraints**
- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 100
- -10^4 <= matrix[i][j], target <= 10^4`,
      codeExamples: [],
    },
    {
      id: 'lesson-search-2d-matrix-solution',
      title: 'Virtual Array Binary Search',
      content: `The matrix has two ordering rules:

1. Each row is sorted.
2. Every row starts after the previous row ends.

Together, those rules mean the whole matrix behaves like one sorted array if we read it left to right, top to bottom.

**Key idea:** binary search over a virtual 1-D index from \`0\` to \`m * n - 1\`.

To convert a virtual index into matrix coordinates:
- \`row = index // n\`
- \`col = index % n\`

Your original helper loop calculated the same coordinates, but using division and modulo keeps each conversion O(1), so the whole algorithm stays **O(log(m * n))**.

**Complexity**
- Time: **O(log(m * n))**
- Space: **O(1)**`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        m = len(matrix)
        n = len(matrix[0])

        left = 0
        right = m * n - 1

        while left <= right:
            middle_m, middle_n = self._calculate_middle(n, left, right)
            if target == matrix[middle_m][middle_n]:
                return True
            elif target > matrix[middle_m][middle_n]:
                left = middle_m * n + middle_n + 1
            else:
                right = middle_m * n + middle_n - 1
        return False

    def _calculate_middle(self, n: int, left: int, right: int) -> tuple[int, int]:
        middle = (left + right) // 2
        return middle // n, middle % n

# Try it out - press Run
sol = Solution()
print(sol.searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3))   # True
print(sol.searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13))  # False`,
          caption: 'Python - O(log(m * n)) binary search over virtual indices',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'leetcode-74-index-conversion',
      type: 'multiple-choice',
      prompt:
        'If a matrix has `n` columns and we are binary searching a virtual 1-D index `middle`, how do we convert it to `(row, col)`?',
      choices: [
        { id: 'a', text: '`row = middle % n`, `col = middle // n`' },
        { id: 'b', text: '`row = middle // n`, `col = middle % n`' },
        { id: 'c', text: '`row = n // middle`, `col = n % middle`' },
        { id: 'd', text: '`row = middle`, `col = n`' },
      ],
      correctAnswer: 'b',
      explanation:
        'The row is how many full rows fit before `middle`, so `middle // n`. The column is the remainder inside that row, so `middle % n`.',
    },
    {
      id: 'leetcode-74-why-single-search',
      type: 'multiple-choice',
      prompt: 'Why can this matrix be treated like one sorted array?',
      choices: [
        { id: 'a', text: 'Every row has the same length.' },
        { id: 'b', text: 'Every column is sorted independently.' },
        {
          id: 'c',
          text: 'Rows are sorted, and the first value of each row is greater than the previous row\'s last value.',
        },
        { id: 'd', text: 'The target is guaranteed to exist.' },
      ],
      correctAnswer: 'c',
      explanation:
        'Those two ordering rules make the row-by-row traversal globally sorted, so normal binary search works over virtual indices.',
    },
    {
      id: 'leetcode-74-code-runner',
      type: 'code-runner',
      prompt:
        'Complete the LeetCode-style `Solution.searchMatrix` method. Return `True` when `target` is in the matrix, otherwise return `False`.',
      language: 'python',
      starterCode: `from typing import List


class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        m = len(matrix)
        n = len(matrix[0])

        left = 0
        right = m * n - 1

        # Write your binary search here.
        return False


def run_search_matrix(matrix, target):
    return Solution().searchMatrix(matrix, target)
`,
      gradeMode: 'function',
      testCases: [
        {
          id: 'sample-1',
          description: 'Target exists inside the matrix',
          funcName: 'run_search_matrix',
          args: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3],
          expectedReturn: true,
        },
        {
          id: 'sample-2',
          description: 'Target is missing between matrix values',
          funcName: 'run_search_matrix',
          args: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13],
          expectedReturn: false,
        },
        {
          id: 'hidden-first',
          hidden: true,
          funcName: 'run_search_matrix',
          args: [[[1, 2, 3], [4, 5, 6]], 1],
          expectedReturn: true,
        },
        {
          id: 'hidden-last',
          hidden: true,
          funcName: 'run_search_matrix',
          args: [[[1, 2, 3], [4, 5, 6]], 6],
          expectedReturn: true,
        },
        {
          id: 'hidden-single-missing',
          hidden: true,
          funcName: 'run_search_matrix',
          args: [[[5]], 4],
          expectedReturn: false,
        },
      ],
      correctAnswer: '__code__',
      explanation: `Model solution:
from typing import List


class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        m = len(matrix)
        n = len(matrix[0])

        left = 0
        right = m * n - 1

        while left <= right:
            middle_m, middle_n = self._calculate_middle(n, left, right)
            if target == matrix[middle_m][middle_n]:
                return True
            elif target > matrix[middle_m][middle_n]:
                left = middle_m * n + middle_n + 1
            else:
                right = middle_m * n + middle_n - 1
        return False

    def _calculate_middle(self, n: int, left: int, right: int) -> tuple[int, int]:
        middle = (left + right) // 2
        return middle // n, middle % n

Why: the matrix can be searched as one sorted virtual array, and each virtual index maps back to row and column in O(1).`,
    },
  ],
};

export default module22;
