import type { Module } from '../python101/types';

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

You are given an array of integers **temperatures** where \`temperatures[i]\` is the temperature on day i.

Return an array **result** where \`result[i]\` is the number of days after day i before a **warmer** temperature appears. If no warmer day exists in the future, set \`result[i] = 0\`.

**Example 1**
Input: temperatures = [30,38,30,36,35,40,28]
Output: [1,4,1,2,1,0,0]

**Example 2**
Input: temperatures = [22,21,20]
Output: [0,0,0]

**Constraints**
- 1 <= temperatures.length <= 1000
- 1 <= temperatures[i] <= 100`,
      codeExamples: [],
    },
    {
      id: 'lesson-daily-temperatures-monotonic-stack',
      title: 'Monotonic Decreasing Stack — O(n)',
      content: `This is the classic **next greater element** pattern. We maintain a stack of indices whose "warmer day" we haven't found yet. The stack stays in **decreasing order of temperature** — whenever a new temperature is warmer than the top, we've found the answer for that index.

**How it works**
1. Initialize \`result = [0] * n\` and an empty stack.
2. For each index \`i\`:
   - While the stack is not empty and \`temperatures[i] > temperatures[stack[-1]]\`:
     - Pop index \`j\` from the stack.
     - \`result[j] = i - j\` (i is the next warmer day after j).
   - Push \`i\` onto the stack.
3. Any indices remaining in the stack have no warmer day (result stays 0).

**Why monotonic?** We never push an index whose temperature is higher than the current — that would mean we skipped finding its answer. The stack always holds a decreasing sequence of temperatures (indices of days still waiting for a warmer day).

**Complexity**
- Time: **O(n)** — each index is pushed and popped at most once.
- Space: **O(n)** — the stack holds at most n indices.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        result = [0] * n
        stack = []  # stores indices

        for i in range(n):
            while stack and temperatures[i] > temperatures[stack[-1]]:
                j = stack.pop()
                result[j] = i - j
            stack.append(i)

        return result

# Try it out — press Run
sol = Solution()
print(sol.dailyTemperatures([30,38,30,36,35,40,28]))  # [1,4,1,2,1,0,0]
print(sol.dailyTemperatures([22,21,20]))               # [0,0,0]`,
          caption: 'Python — O(n) monotonic decreasing stack (next greater element)',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack: number[] = []; // stores indices

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const j = stack.pop()!;
      result[j] = i - j;
    }
    stack.push(i);
  }

  return result;
}

// Try it out — press Run
console.log(dailyTemperatures([30,38,30,36,35,40,28])); // [1,4,1,2,1,0,0]
console.log(dailyTemperatures([22,21,20]));              // [0,0,0]`,
          caption: 'TypeScript — O(n) monotonic decreasing stack',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module16;
