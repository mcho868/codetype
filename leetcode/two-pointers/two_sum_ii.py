from typing import List

class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        left, right = 0, len(numbers) - 1

        while left < right:
            total = numbers[left] + numbers[right]
            if total == target:
                return [left + 1, right + 1]
            elif total < target:
                left += 1
            else:
                right -= 1

        return []  # guaranteed to find a solution

# Try it out — press Run
sol = Solution()
print(sol.twoSum([1,2,3,4], 3))    # [1, 2]
print(sol.twoSum([1,3,4,5,7], 9))  # [3, 4]
