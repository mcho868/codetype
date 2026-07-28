import type { Module } from '../../python101/types';

const module20: Module = {
  id: 'leetcode-42-trapping-rain-water',
  slug: '20',
  title: '42. Trapping Rain Water',
  description:
    'Given an elevation map, compute how much rainwater is trapped between the bars. Precompute the tallest bar to the left and right of every index — water above a bar is min(leftMax, rightMax) − height. ⚠️ Needs revisit.',
  icon: '🌧️',
  color: 'from-sky-500 to-indigo-400',
  locked: false,
  section: 'Two Pointers',
  lessons: [
    {
      id: 'lesson-trapping-rain-water-problem',
      title: 'The Problem',
      content: `**42. Trapping Rain Water** — Hard

> ⚠️ **Needs revisit** — Manseung flagged this problem to come back to.

Given \`n\` non-negative integers **height** representing an elevation map where the width of each bar is 1, compute **how much water it can trap** after raining.

**Example 1**
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6

**Example 2**
Input: height = [4,2,0,3,2,5]
Output: 9

**Constraints**
- n == height.length
- 1 <= n <= 2 * 10^4
- 0 <= height[i] <= 10^5`,
      codeExamples: [],
    },
    {
      id: 'lesson-trapping-rain-water-prefix-max',
      title: 'Left/Right Max Arrays — O(n)',
      content: `The water sitting **above any bar** \`i\` is bounded by the tallest bar to its left and the tallest bar to its right. The level it can hold up to is \`min(leftMax[i], rightMax[i])\`, and the trapped water there is that level minus the bar's own height.

**How it works**
1. Build \`leftMax\` — \`leftMax[i]\` = tallest bar from index 0 through \`i\` (scan left → right).
2. Build \`rightMax\` — \`rightMax[i]\` = tallest bar from index \`i\` through \`n-1\` (scan right → left).
3. For each index, add \`min(leftMax[i], rightMax[i]) - height[i]\` to the total.

**Why it works:** water can only rise as high as the shorter of the two walls enclosing a position. Precomputing both walls for every index turns the problem into a single linear sweep.

**Complexity**
- Time: **O(n)** — three linear passes.
- Space: **O(n)** — the two max arrays.

> 💡 There is also an O(1)-space two-pointer variant. Manseung's current solution uses the O(n)-space prefix-max approach.`,
      codeExamples: [
        {
          language: 'typescript',
          code: `function trap(height: number[]): number {
    const n = height.length;
    if (n === 0) return 0;

    let total: number = 0;
    let leftMax: number[] = new Array(n);
    let rightMax: number[] = new Array(n);

    leftMax[0] = height[0];

    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    rightMax[n - 1] = height[n - 1];

    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    for (let i = 0; i < n; i++) {
        const waterLevel = Math.min(leftMax[i], rightMax[i]);
        total += waterLevel - height[i];
    }

    return total;
}

// Try it out — press Run
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
console.log(trap([4,2,0,3,2,5]));             // 9`,
          caption: 'TypeScript — O(n) left/right max arrays (Manseung’s solution)',
          editable: true,
        },
        {
          language: 'python',
          code: `# Manseung has not yet written a Python version of this solution.`,
          caption: 'Python — not yet written',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module20;
