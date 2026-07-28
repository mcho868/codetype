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

# Try it out - press Run
sol = Solution()
print(sol.findMin([3, 4, 5, 1, 2]))        # 1
print(sol.findMin([4, 5, 6, 7, 0, 1, 2]))  # 0
print(sol.findMin([11, 13, 15, 17]))       # 11
