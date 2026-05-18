import type { Module } from '../python101/types';

const module18: Module = {
  id: 'leetcode-84-largest-rectangle-histogram',
  slug: '18',
  title: '84. Largest Rectangle in Histogram',
  description:
    'Given bar heights in a histogram, return the area of the largest rectangle. Uses a monotonic increasing stack to find, for each bar, the leftmost index it can extend to — O(n).',
  icon: '📊',
  color: 'from-purple-500 to-violet-400',
  locked: false,
  section: 'Stack',
  lessons: [
    {
      id: 'lesson-histogram-problem',
      title: 'The Problem',
      content: `**84. Largest Rectangle in Histogram** — Hard

You are given an array of integers **heights** where \`heights[i]\` is the height of a bar with width 1.

Return the area of the **largest rectangle** that can be formed among the bars.

**Example 1**
Input: heights = [7,1,7,2,2,4]
Output: 8
Explanation: The rectangle of height 2 spanning indices 2–5 has area 2 × 4 = 8.

**Example 2**
Input: heights = [1,3,7]
Output: 7
Explanation: The bar of height 7 alone gives area 7 × 1 = 7.

**Constraints**
- 1 <= heights.length <= 1000
- 0 <= heights[i] <= 1000`,
      codeExamples: [],
    },
    {
      id: 'lesson-histogram-monotonic-stack',
      title: 'Monotonic Increasing Stack — O(n)',
      content: `For each bar, the largest rectangle it can be the **height** of extends leftward until it hits a bar shorter than itself. A **monotonic increasing stack** tracks exactly which bars are "still extendable" — when a shorter bar arrives, all taller bars on the stack are forced to stop.

**How it works**
Stack stores \`(index, height)\` pairs where \`index\` is the leftmost position the bar at that height can still extend to.

1. For each bar at index \`i\` with height \`h\`:
   - Set \`start = i\`.
   - While the stack is not empty and the top bar's height \`>= h\`:
     - Pop \`(j, top_h)\` — its rectangle ends here.
     - Compute area \`= top_h × (i - j)\`, update max.
     - Set \`start = j\` (the current bar can extend back to where the popped bar started).
   - Push \`(start, h)\`.
2. After the loop, every bar still on the stack can extend to the end of the array:
   - For each \`(j, h)\` in the stack: area \`= h × (n - j)\`, update max.

**Complexity**
- Time: **O(n)** — each bar is pushed and popped at most once.
- Space: **O(n)** — the stack.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        n = len(heights)
        max_area = 0
        stack = []  # (start_index, height)

        for i, h in enumerate(heights):
            start = i
            while stack and stack[-1][1] >= h:
                j, top_h = stack.pop()
                max_area = max(max_area, top_h * (i - j))
                start = j
            stack.append((start, h))

        # Remaining bars extend to the end
        for j, h in stack:
            max_area = max(max_area, h * (n - j))

        return max_area

# Try it out — press Run
sol = Solution()
print(sol.largestRectangleArea([7,1,7,2,2,4]))  # 8
print(sol.largestRectangleArea([1,3,7]))         # 7
print(sol.largestRectangleArea([2,1,5,6,2,3]))  # 10`,
          caption: 'Python — O(n) monotonic increasing stack tracking extendable starts',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function largestRectangleArea(heights: number[]): number {
  const n = heights.length;
  let maxArea = 0;
  const stack: [number, number][] = []; // [startIndex, height]

  for (let i = 0; i < n; i++) {
    const h = heights[i];
    let start = i;

    while (stack.length > 0 && stack[stack.length - 1][1] >= h) {
      const [j, topH] = stack.pop()!;
      maxArea = Math.max(maxArea, topH * (i - j));
      start = j;
    }
    stack.push([start, h]);
  }

  // Remaining bars extend to the end
  for (const [j, h] of stack) {
    maxArea = Math.max(maxArea, h * (n - j));
  }

  return maxArea;
}

// Try it out — press Run
console.log(largestRectangleArea([7,1,7,2,2,4])); // 8
console.log(largestRectangleArea([1,3,7]));        // 7
console.log(largestRectangleArea([2,1,5,6,2,3])); // 10`,
          caption: 'TypeScript — O(n) monotonic increasing stack',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module18;
