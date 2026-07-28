from typing import List

class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        hm = {}
        for i, n in enumerate(nums):
            if n not in hm:
                hm[n] = i
            elif hm[n] != i:
                return True
        return False

# Try it out — press Run
sol = Solution()
print(sol.containsDuplicate([1,2,3,1]))           # True
print(sol.containsDuplicate([1,2,3,4]))           # False
print(sol.containsDuplicate([1,1,1,3,3,4,3,2,4,2]))  # True
