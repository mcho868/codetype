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

# Try it out - press Run
sol = Solution()
print(sol.searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3))   # True
print(sol.searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13))  # False
