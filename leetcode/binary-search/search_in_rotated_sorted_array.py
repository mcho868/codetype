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

# Try it out - press Run
sol = Solution()
print(sol.search([4, 5, 6, 7, 0, 1, 2], 0))  # 4
print(sol.search([4, 5, 6, 7, 0, 1, 2], 3))  # -1
print(sol.search([1], 1))                     # 0
