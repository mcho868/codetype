from typing import List

class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:

        # o(nlogn)
        nums.sort()

        # [-4, -1, -1, 0, 1, 2]
        output = []
        # print(nums)
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            target = nums[i]
            output += self.twoSum(nums, target, i + 1, len(nums) - 1)
        return output

    def twoSum(
        self, numbers: List[int], target: int, left: int, right: int
    ) -> List[int]:

        # print(f"current target: {target}")
        # print(f"current left: {numbers[left]}, right: {numbers[right]}")
        output = []

        while left < right:
            total = numbers[left] + numbers[right] + target
            # print(total)
            if total == 0:
                output.append([target, numbers[left], numbers[right]])
                left += 1
                right -= 1

                while left < right and numbers[left] == numbers[left - 1]:
                    left += 1
                while left < right and numbers[right] == numbers[right + 1]:
                    right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1

        # print(output)

        return output

# Try it out — press Run
sol = Solution()
print(sol.threeSum([-1,0,1,2,-1,-4]))  # [[-1,-1,2],[-1,0,1]]
print(sol.threeSum([0,1,1]))           # []
print(sol.threeSum([0,0,0]))           # [[0,0,0]]
