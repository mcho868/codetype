from typing import List

class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        tempStack = []
        outputTemp = [0 for _ in range(len(temperatures))]
        for i in range(len(temperatures)):
            if len(tempStack) > 0:
                while (
                    len(tempStack) > 0
                    and temperatures[i] > tempStack[len(tempStack) - 1][0]
                ):
                    temp = tempStack.pop()
                    outputTemp[temp[1]] = i - temp[1]
            tempStack.append((temperatures[i], i))
        return outputTemp

# Try it out — press Run
sol = Solution()
print(sol.dailyTemperatures([73,74,75,71,69,72,76,73]))  # [1,1,4,2,1,1,0,0]
print(sol.dailyTemperatures([30,40,50,60]))               # [1,1,1,0]
print(sol.dailyTemperatures([30,60,90]))                  # [1,1,0]
