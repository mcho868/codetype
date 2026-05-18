import type { Module } from '../python101/types';

const module4: Module = {
  id: 'leetcode-347-top-k-frequent-elements',
  slug: '4',
  title: '347. Top K Frequent Elements',
  description:
    'Given an integer array nums and an integer k, return the k most frequent elements. Uses a frequency hash map to count occurrences, then extracts the top k.',
  icon: '📊',
  color: 'from-orange-500 to-amber-400',
  locked: false,
  section: 'Arrays & Hashing',
  lessons: [
    {
      id: 'lesson-top-k-frequent-problem',
      title: 'The Problem',
      content: `**347. Top K Frequent Elements** — Medium

Given an integer array **nums** and an integer **k**, return the **k most frequent elements**. You may return the answer in any order.

**Example 1**
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

**Example 2**
Input: nums = [1], k = 1
Output: [1]

**Example 3**
Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2
Output: [1,2]

**Constraints**
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4
- k is in the range [1, number of unique elements in nums]
- The answer is guaranteed to be unique.`,
      codeExamples: [],
    },
    {
      id: 'lesson-top-k-frequent-your-solution',
      title: 'Your Solution — Repeated Max Extraction',
      content: `Your approach builds a frequency map then extracts the maximum k times by calling \`max()\` and deleting the winner each round.

**How it works**
1. Walk \`nums\` once, using \`hm.get(num, 0) + 1\` to count each number.
2. Loop k times: find the key with the highest count via \`max(hm, key=hm.get)\`, append it to the result, then pop it from the map.
3. Return the collected list.

**Complexity**
- Time: **O(n + k · u)** — n to build the map, then k passes each scanning u unique elements to find the max. In the worst case u ≈ n, so this is O(n · k).
- Space: **O(u)** — the frequency map holds at most u unique elements.

**Why the commented-out block is equivalent:** \`hm[num] = hm.get(num, 0) + 1\` is just a one-liner version of the if/else you left in comments — both are correct.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        hm = {}
        for i, num in enumerate(nums):
            hm[num] = hm.get(num, 0) + 1

        lst = []
        for x in range(k):
            curr_mx = max(hm, key=hm.get)
            lst.append(curr_mx)
            hm.pop(curr_mx, None)

        return lst

# Try it out — press Run
sol = Solution()
print(sol.topKFrequent([1,1,1,2,2,3], 2))             # [1, 2]
print(sol.topKFrequent([1], 1))                        # [1]
print(sol.topKFrequent([1,2,1,2,1,2,3,1,3,2], 2))     # [1, 2]`,
          caption: 'Your solution — O(n + k·u) repeated max extraction',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-top-k-frequent-optimal',
      title: 'Optimal Solution — Heap O(n log k) / Sort O(n log n)',
      content: `Two standard approaches improve on repeated max scanning.

**Approach 1 — Min-heap of size k — O(n log k)**
Keep a min-heap capped at k entries. After building the frequency map, push every (count, number) pair onto the heap. Once the heap exceeds k elements, pop the smallest. At the end the heap holds exactly the k most frequent numbers.

**Approach 2 — Sort by frequency — O(n log n)**
Build the frequency map, then sort its keys by count descending, and slice the first k. Simple but slightly slower than the heap when k ≪ n.

**Approach 3 — Bucket sort — O(n)**
Create an array of n+1 buckets where index i holds all numbers that appear exactly i times. Walk buckets from highest to lowest, collecting numbers until you have k.

**Complexity comparison**

| Approach | Time | Space |
|---|---|---|
| Your solution | O(n · k) | O(u) |
| Sort by frequency | O(n log n) | O(u) |
| Min-heap | O(n log k) | O(u + k) |
| Bucket sort | O(n) | O(n) |`,
      codeExamples: [
        {
          language: 'python',
          code: `import heapq
from typing import List

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        hm = {}
        for num in nums:
            hm[num] = hm.get(num, 0) + 1

        # heapq.nlargest picks the k largest by count in O(n log k)
        return heapq.nlargest(k, hm, key=hm.get)

# Try it out — press Run
sol = Solution()
print(sol.topKFrequent([1,1,1,2,2,3], 2))             # [1, 2]
print(sol.topKFrequent([1], 1))                        # [1]
print(sol.topKFrequent([1,2,1,2,1,2,3,1,3,2], 2))     # [1, 2]`,
          caption: 'Python — O(n log k) min-heap via heapq.nlargest',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function topKFrequent(nums: number[], k: number): number[] {
  const hm: Record<number, number> = {};

  // Count frequency
  nums.forEach((value) => {
    if (!(value in hm)) {
      hm[value] = 0;
    }
    hm[value]++;
  });

  const sorted = Object.keys(hm).map(Number).sort((a, b) => hm[b] - hm[a]);

  return sorted.slice(0, k);
}

// Try it out — press Run
console.log(topKFrequent([1,1,1,2,2,3], 2));             // [1, 2]
console.log(topKFrequent([1], 1));                        // [1]
console.log(topKFrequent([1,2,1,2,1,2,3,1,3,2], 2));     // [1, 2]`,
          caption: 'TypeScript — O(n log n) sort by frequency',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module4;
