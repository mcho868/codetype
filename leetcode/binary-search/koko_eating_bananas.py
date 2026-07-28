from typing import List

class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        left = 1
        right = max(piles)
        while left < right:
            middle = (left + right) // 2
            if self._can_eat(piles, middle, h):
                right = middle
            else:
                left = middle + 1
        return left

    def _can_eat(self, piles: List[int], k: int, h: int) -> bool:
        total = 0
        for banana in piles:
            if banana % k == 0:
                total += banana // k
            else:
                total += banana // k + 1
        return total <= h

# Try it out - press Run
sol = Solution()
print(sol.minEatingSpeed([1, 4, 3, 2], 9))      # 2
print(sol.minEatingSpeed([25, 10, 23, 4], 4))  # 25
