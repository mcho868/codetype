import type { Module } from '../python101/types';

const module11: Module = {
  id: 'leetcode-11-container-with-most-water',
  slug: '11',
  title: '11. Container With Most Water',
  description:
    'Given heights of bars, find two bars that form a container holding the most water. Two pointers from both ends, always moving the shorter side inward — O(n).',
  icon: '🪣',
  color: 'from-blue-500 to-cyan-400',
  locked: false,
  section: 'Two Pointers',
  lessons: [
    {
      id: 'lesson-container-water-problem',
      title: 'The Problem',
      content: `**11. Container With Most Water** — Medium

You are given an integer array **heights** where \`heights[i]\` represents the height of the i-th bar.

You may choose any two bars to form a container. Return the **maximum amount of water** a container can store.

The area between bars at indices \`left\` and \`right\` is: \`min(heights[left], heights[right]) × (right - left)\`.

**Example 1**
Input: height = [1,7,2,5,4,7,3,6]
Output: 36

**Example 2**
Input: height = [2,2,2]
Output: 4

**Constraints**
- 2 <= height.length <= 1000
- 0 <= height[i] <= 1000`,
      codeExamples: [],
    },
    {
      id: 'lesson-container-water-two-pointers',
      title: 'Two Pointers — O(n)',
      content: `Start with the widest possible container (left = 0, right = n-1). Then move the **shorter** side inward — because moving the taller side can only decrease width without any chance of increasing the limiting height.

**How it works**
1. \`left = 0\`, \`right = n - 1\`, \`max_water = 0\`.
2. While \`left < right\`:
   - Compute \`area = min(height[left], height[right]) × (right - left)\`.
   - Update \`max_water\`.
   - If \`height[left] <= height[right]\`, move \`left\` right (the left bar is the bottleneck).
   - Otherwise move \`right\` left.
3. Return \`max_water\`.

**Why move the shorter side?** The area is bounded by the shorter bar. Keeping it and moving the taller bar inward reduces width and can't increase the minimum height — guaranteed worse or equal area. Moving the shorter bar is the only possible way to find a larger area.

**Complexity**
- Time: **O(n)** — each pointer moves at most n steps total.
- Space: **O(1)**.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def maxArea(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        max_water = 0

        while left < right:
            area = min(height[left], height[right]) * (right - left)
            max_water = max(max_water, area)

            if height[left] <= height[right]:
                left += 1
            else:
                right -= 1

        return max_water

# Try it out — press Run
sol = Solution()
print(sol.maxArea([1,7,2,5,4,7,3,6]))  # 36
print(sol.maxArea([2,2,2]))             # 4`,
          caption: 'Python — O(n) two-pointer, always move the shorter side',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    maxWater = Math.max(maxWater, area);

    if (height[left] <= height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}

// Try it out — press Run
console.log(maxArea([1,7,2,5,4,7,3,6])); // 36
console.log(maxArea([2,2,2]));             // 4`,
          caption: 'TypeScript — O(n) two-pointer, always move the shorter side',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module11;
