import type { Module } from '../python101/types';

const module19: Module = {
  id: 'leetcode-11-container-with-most-water',
  slug: '19',
  title: '11. Container With Most Water',
  description:
    'Given heights of vertical lines, find two lines that together with the x-axis form a container holding the most water. Uses two pointers converging from the ends in O(n) with O(1) space.',
  icon: '🚰',
  color: 'from-cyan-500 to-blue-400',
  locked: false,
  section: 'Two Pointers',
  lessons: [
    {
      id: 'lesson-container-water-problem',
      title: 'The Problem',
      content: `**11. Container With Most Water** — Medium

You are given an integer array **height** of length *n*. There are *n* vertical lines drawn such that the two endpoints of the *i*-th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that, together with the x-axis, form a container that holds the **most water**. Return the maximum amount of water a container can store.

Note: you may not slant the container.

**Example 1**
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The lines at index 1 and index 8 (heights 8 and 7) are 7 apart, holding min(8,7) * 7 = 49.

**Example 2**
Input: height = [1,1]
Output: 1

**Constraints**
- n == height.length
- 2 <= n <= 10^5
- 0 <= height[i] <= 10^4`,
      codeExamples: [],
    },
    {
      id: 'lesson-container-water-two-pointers',
      title: 'Two Pointers — O(n)',
      content: `The area between two lines is bounded by the **shorter** of the two: \`area = min(height[left], height[right]) * (right - left)\`.

**How it works**
1. \`left = 0\`, \`right = n - 1\` (the widest possible container).
2. Compute the current area and track the maximum.
3. Move the pointer at the **shorter** line inward. Moving the taller one can never help: the width shrinks and the height is still capped by the shorter line.

**Why moving the shorter line is correct:** the area is limited by the shorter wall, so keeping it and shrinking the width can only reduce or match the area. The only chance at a bigger area is replacing the shorter wall with a taller one — so we advance that pointer.

**Optimization:** when advancing, skip over any lines shorter than the wall we are leaving — they can only produce smaller areas at a narrower width.

**Complexity**
- Time: **O(n)** — the two pointers move toward each other and never cross back.
- Space: **O(1)**.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

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
print(sol.maxArea([1,1]))                # 1`,
          caption: 'Python — O(n) two-pointer, move the shorter wall inward',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function maxArea(height: number[]): number {
  let n:number = height.length;
  let left: number = 0;
  let right: number = n - 1;
  let max_area: number = 0;

  while (left < right){

    let area = Math.min(height[left], height[right]) * (right - left);

    max_area = Math.max(area, max_area);

    if (height[left] < height[right]){
      let i: number = 1;

      while (left + i < right && height[left + i] < height[left]){
        i++;
      }
      left += i;
    }
    else{
      let j: number = 1;

      while (right - j > left && height[right - j] < height[right]){
        j++;
      }
      right -= j;
    }
  }

  return max_area;
}

// Try it out — press Run
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49
console.log(maxArea([1,1]));               // 1`,
          caption: 'TypeScript — O(n) two-pointer, move the shorter wall inward',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module19;
