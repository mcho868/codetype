from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        hashMap = {}

        for i, n in enumerate(nums):
            diff = target - n
            if diff in hashMap:
                return [hashMap[diff], i]
            hashMap[n] = i

# Try it out — press Run
sol = Solution()
print(sol.twoSum([2, 7, 11, 15], 9))   # [0, 1]
print(sol.twoSum([3, 2, 4], 6))        # [1, 2]
print(sol.twoSum([3, 3], 6))           # [0, 1]
