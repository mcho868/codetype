import type { Module } from '../python101/types';

const module5: Module = {
  id: 'leetcode-238-product-except-self',
  slug: '5',
  title: '238. Product of Array Except Self',
  description:
    'Given an integer array nums, return an array where output[i] is the product of all elements except nums[i]. Solved in O(n) without division using prefix and suffix products.',
  icon: '✖️',
  color: 'from-red-500 to-rose-400',
  locked: false,
  section: 'Arrays & Hashing',
  lessons: [
    {
      id: 'lesson-product-except-self-problem',
      title: 'The Problem',
      content: `**238. Product of Array Except Self** — Medium

Given an integer array **nums**, return an array **output** where **output[i]** is the product of all the elements of nums except **nums[i]**.

Each product is guaranteed to fit in a 32-bit integer.

**Follow-up:** Could you solve it in O(n) time without using the division operation?

**Example 1**
Input: nums = [1,2,4,6]
Output: [48,24,12,8]

**Example 2**
Input: nums = [-1,0,1,2,3]
Output: [0,-6,0,0,0]

**Constraints**
- 2 <= nums.length <= 10^5
- -30 <= nums[i] <= 30`,
      codeExamples: [],
    },
    {
      id: 'lesson-product-except-self-prefix-suffix',
      title: 'Prefix & Suffix Products — O(n)',
      content: `The key insight: **output[i] = (product of everything to the left of i) × (product of everything to the right of i)**.

We can compute both halves in two linear passes without ever dividing.

**How it works**
1. **Left pass** — Walk left to right. \`prefix[i]\` = product of all elements before index i. \`prefix[0] = 1\` (nothing to the left of index 0).
2. **Right pass** — Walk right to left, maintaining a running \`suffix\` value (product of elements seen so far from the right). Multiply each \`output[i]\` by the current suffix, then update suffix with \`nums[i]\`.

This avoids allocating a separate suffix array — we do it in place.

**Complexity**
- Time: **O(n)** — two linear passes.
- Space: **O(1)** extra (output array doesn't count).

**Why no division?** Division breaks when any element is 0 (division by zero). The prefix/suffix approach handles zeros naturally — output[i] will just be 0 whenever a different element in the array is 0.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        output = [1] * n

        # Left pass: output[i] = product of all elements before i
        prefix = 1
        for i in range(n):
            output[i] = prefix
            prefix *= nums[i]

        # Right pass: multiply by product of all elements after i
        suffix = 1
        for i in range(n - 1, -1, -1):
            output[i] *= suffix
            suffix *= nums[i]

        return output

# Try it out — press Run
sol = Solution()
print(sol.productExceptSelf([1,2,4,6]))       # [48, 24, 12, 8]
print(sol.productExceptSelf([-1,0,1,2,3]))    # [0, -6, 0, 0, 0]`,
          caption: 'Python — O(n) prefix/suffix in-place, no division',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const output = new Array(n).fill(1);

  // Left pass: output[i] = product of all elements before i
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    output[i] = prefix;
    prefix *= nums[i];
  }

  // Right pass: multiply by product of all elements after i
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    output[i] *= suffix;
    suffix *= nums[i];
  }

  return output;
}

// Try it out — press Run
console.log(productExceptSelf([1,2,4,6]));      // [48, 24, 12, 8]
console.log(productExceptSelf([-1,0,1,2,3]));   // [0, -6, 0, 0, 0]`,
          caption: 'TypeScript — O(n) prefix/suffix in-place, no division',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module5;
