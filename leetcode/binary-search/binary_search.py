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

# Try it out — press Run
sol = Solution()
print(sol.search([-1, 0, 3, 5, 9, 12], 9))  # 4
print(sol.search([-1, 0, 3, 5, 9, 12], 2))  # -1
