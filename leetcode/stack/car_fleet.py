from typing import List

class Solution:
    def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
        combined = [
            [position[i], speed[i], (target - position[i]) / speed[i]]
            for i in range(len(position))
        ]

        sorted_cars = sorted(combined, key=lambda x: x[0])

        stack = []

        for i in range(len(position) - 1, -1, -1):
            car = sorted_cars[i]

            if len(stack) == 0 or stack[-1][2] < car[2]:
                stack.append(car)

        return len(stack)

# Try it out — press Run
sol = Solution()
print(sol.carFleet(10, [1,4], [3,2]))       # 1
print(sol.carFleet(10, [4,1,0,7], [2,2,1,1]))  # 3
