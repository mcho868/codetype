import type { Module } from '../python101/types';

const module12: Module = {
  id: 'leetcode-42-trapping-rain-water',
  slug: '12',
  title: '42. Trapping Rain Water',
  description:
    'Given an elevation map, return the total water that can be trapped. Uses two pointers tracking the max height seen from each side — O(n) time and O(1) space.',
  icon: '🌧️',
  color: 'from-slate-500 to-blue-400',
  locked: false,
  section: 'Two Pointers',
  lessons: [
    {
      id: 'lesson-trapping-rain-water-problem',
      title: 'The Problem',
      content: `**42. Trapping Rain Water** — Hard

You are given an array of non-negative integers **height** representing an elevation map where each bar has width 1.

Return the **maximum area of water** that can be trapped between the bars.

**Example 1**
Input: height = [0,2,0,3,1,0,1,3,2,1]
Output: 9

**Constraints**
- 1 <= height.length <= 1000
- 0 <= height[i] <= 1000`,
      codeExamples: [],
    },
    {
      id: 'lesson-trapping-rain-water-prefix-suffix',
      title: 'Prefix/Suffix Max Arrays — O(n) time, O(n) space',
      content: `Water above position \`i\` is: \`min(max_left[i], max_right[i]) - height[i]\`, where \`max_left[i]\` is the tallest bar at or to the left of \`i\`, and \`max_right[i]\` is the tallest bar at or to the right of \`i\`.

**How it works**
1. Build \`max_left\`: walk left to right, tracking the running maximum.
2. Build \`max_right\`: walk right to left, tracking the running maximum.
3. For each index, water trapped = \`max(0, min(max_left[i], max_right[i]) - height[i])\`.
4. Sum it all up.

**Complexity**
- Time: **O(n)** — three linear passes.
- Space: **O(n)** — two extra arrays.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def trap(self, height: List[int]) -> int:
        n = len(height)
        if n == 0:
            return 0

        max_left = [0] * n
        max_right = [0] * n

        max_left[0] = height[0]
        for i in range(1, n):
            max_left[i] = max(max_left[i - 1], height[i])

        max_right[n - 1] = height[n - 1]
        for i in range(n - 2, -1, -1):
            max_right[i] = max(max_right[i + 1], height[i])

        water = 0
        for i in range(n):
            water += max(0, min(max_left[i], max_right[i]) - height[i])

        return water

# Try it out — press Run
sol = Solution()
print(sol.trap([0,2,0,3,1,0,1,3,2,1]))  # 9`,
          caption: 'Python — O(n) time, O(n) space prefix/suffix max arrays',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-trapping-rain-water-two-pointers',
      title: 'Two Pointers — O(n) time, O(1) space',
      content: `We can eliminate the extra arrays by observing: the water at position \`i\` depends only on the **minimum** of the two side maxes. Whichever side currently has the smaller max is the constraining side — we can process that side's cell immediately without knowing the other side's final maximum.

**How it works**
1. \`left = 0\`, \`right = n - 1\`, \`max_left = max_right = 0\`, \`water = 0\`.
2. While \`left <= right\`:
   - If \`height[left] <= height[right]\` (left side is the constraint):
     - Update \`max_left = max(max_left, height[left])\`.
     - Add \`max_left - height[left]\` to water.
     - Move \`left\` right.
   - Else (right side is the constraint):
     - Update \`max_right = max(max_right, height[right])\`.
     - Add \`max_right - height[right]\` to water.
     - Move \`right\` left.

**Complexity**
- Time: **O(n)** — single pass.
- Space: **O(1)** — only four integer variables.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def trap(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        max_left = max_right = 0
        water = 0

        while left <= right:
            if height[left] <= height[right]:
                max_left = max(max_left, height[left])
                water += max_left - height[left]
                left += 1
            else:
                max_right = max(max_right, height[right])
                water += max_right - height[right]
                right -= 1

        return water

# Try it out — press Run
sol = Solution()
print(sol.trap([0,2,0,3,1,0,1,3,2,1]))  # 9`,
          caption: 'Python — O(n) time, O(1) space two-pointer (optimal)',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function trap(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxLeft = 0;
  let maxRight = 0;
  let water = 0;

  while (left <= right) {
    if (height[left] <= height[right]) {
      maxLeft = Math.max(maxLeft, height[left]);
      water += maxLeft - height[left];
      left++;
    } else {
      maxRight = Math.max(maxRight, height[right]);
      water += maxRight - height[right];
      right--;
    }
  }

  return water;
}

// Try it out — press Run
console.log(trap([0,2,0,3,1,0,1,3,2,1])); // 9`,
          caption: 'TypeScript — O(n) time, O(1) space two-pointer (optimal)',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module12;
