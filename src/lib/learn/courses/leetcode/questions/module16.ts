import type { Module } from '../../python101/types';

const module16: Module = {
  id: 'leetcode-739-daily-temperatures',
  slug: '16',
  title: '739. Daily Temperatures',
  description:
    'Given daily temperatures, return how many days until a warmer day for each index. Uses a monotonic decreasing stack to find the next greater element in O(n).',
  icon: '🌡️',
  color: 'from-orange-500 to-red-400',
  locked: false,
  section: 'Stack',
  lessons: [
    {
      id: 'lesson-daily-temperatures-problem',
      title: 'The Problem',
      content: `**739. Daily Temperatures** — Medium

Given an array of integers **temperatures** representing daily temperatures, return an array **answer** such that \`answer[i]\` is the number of days you have to wait after the i-th day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\`.

**Example 1**
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]

**Example 2**
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]

**Example 3**
Input: temperatures = [30,60,90]
Output: [1,1,0]

**Constraints**
- 1 <= temperatures.length <= 10^5
- 30 <= temperatures[i] <= 100`,
      codeExamples: [],
    },
    {
      id: 'lesson-daily-temperatures-your-solution',
      title: 'Your Solution — Monotonic Stack with (temp, index)',
      content: `Your approach uses a **monotonic decreasing stack** that stores \`(temperature, index)\` pairs. Whenever the current day is warmer than the temperature at the top of the stack, you pop and record how many days that earlier index had to wait.

**How it works**
1. Initialize \`outputTemp = [0] * n\` and an empty \`tempStack\`.
2. For each index \`i\`:
   - While the stack is not empty and \`temperatures[i]\` is warmer than the top pair's temperature, pop \`(temp, j)\` and set \`outputTemp[j] = i - j\`.
   - Push \`(temperatures[i], i)\` onto the stack.
3. Any pairs left in the stack have no warmer day ahead (output stays 0).

**Why it works:** The stack stays in decreasing temperature order. When a warmer day arrives, it resolves every colder day still waiting on top of the stack — the classic **next greater element** pattern.

**Complexity**
- Time: **O(n)** — each index is pushed and popped at most once.
- Space: **O(n)** — the stack holds at most n pairs.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

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
print(sol.dailyTemperatures([30,60,90]))                  # [1,1,0]`,
          caption: 'Your solution — O(n) monotonic stack storing (temperature, index) pairs',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function dailyTemperatures(temperatures: number[]): number[] {
    let tempStack: [number, number][] = [];
    let outputTemp: number[] = Array(temperatures.length).fill(0)
    for (let i: number = 0; i < temperatures.length; i ++){
        if (tempStack.length === 0){
            tempStack.push([temperatures[i], i]);
        }
        else{
            while (tempStack.length > 0 && temperatures[i] > tempStack[tempStack.length - 1][0]) {
                let temp: [number, number] = tempStack.pop();
                outputTemp[temp[1]] = i - temp[1];
            }
            tempStack.push([temperatures[i], i]);
        }
    }
    return outputTemp
};

// Try it out — press Run
console.log(dailyTemperatures([73,74,75,71,69,72,76,73])); // [1,1,4,2,1,1,0,0]
console.log(dailyTemperatures([30,40,50,60]));              // [1,1,1,0]
console.log(dailyTemperatures([30,60,90]));                 // [1,1,0]`,
          caption: 'Your solution — O(n) monotonic stack storing [temperature, index] pairs',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module16;
