from typing import List

class Solution:
    def maxArea(self, height: List[int]) -> int:
        n = len(height)
        left = 0
        right = n - 1
        max_area = 0
        while left < right:
            area = min(height[left], height[right]) * (right - left)

            # print(f"area: {area}")
            max_area = max(area, max_area)

            if height[left] < height[right]:
                i = 1
                while left + i < right and height[left + i] < height[left]:
                    i += 1
                left += i
            else:
                j = 1
                while right - j > left and height[right - j] < height[right]:
                    j += 1
                right -= j

        return max_area

# Try it out — press Run
sol = Solution()
print(sol.maxArea([1,8,6,2,5,4,8,3,7]))  # 49
print(sol.maxArea([1,1]))                # 1
