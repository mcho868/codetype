from typing import List

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        output = [1] * n

        # Left pass: output[i] = product of all elements before i
        prefix = 1
        for i in range(n):
            output[i] = prefix
            prefix *= nums[i]

        # Right pass: multiply by product of all elements after i
        suffix = 1
        for i in range(n - 1, -1, -1):
            output[i] *= suffix
            suffix *= nums[i]

        return output

# Try it out — press Run
sol = Solution()
print(sol.productExceptSelf([1,2,4,6]))       # [48, 24, 12, 8]
print(sol.productExceptSelf([-1,0,1,2,3]))    # [0, -6, 0, 0, 0]
