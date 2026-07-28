import type { Module } from '../../python101/types';

const module23: Module = {
  id: 'leetcode-875-koko-eating-bananas',
  slug: '23',
  title: '875. Koko Eating Bananas',
  description:
    'Find the minimum bananas-per-hour speed k that lets Koko finish all piles within h hours. Binary search the answer range from 1 to max(piles), using a feasibility check for each speed.',
  icon: '🍌',
  color: 'from-yellow-500 to-lime-400',
  locked: false,
  section: 'Binary Search',
  lessons: [
    {
      id: 'lesson-koko-eating-bananas-problem',
      title: 'The Problem',
      content: `**875. Koko Eating Bananas** - Medium

You are given an integer array **piles**, where **piles[i]** is the number of bananas in the i-th pile. You are also given an integer **h**, which represents the number of hours available to eat all the bananas.

You may choose an eating speed **k** bananas per hour.

Each hour, Koko chooses one pile and eats up to **k** bananas from that pile. If the pile has fewer than **k** bananas, she finishes the pile but cannot eat from another pile during the same hour.

Return the minimum integer **k** such that all bananas can be eaten within **h** hours.

**Example 1**
Input: piles = [1,4,3,2], h = 9
Output: 2
Explanation: At speed 2, Koko finishes in 6 hours. At speed 1, she needs 10 hours, which is too slow.

**Example 2**
Input: piles = [25,10,23,4], h = 4
Output: 25`,
      codeExamples: [],
    },
    {
      id: 'lesson-koko-eating-bananas-solution',
      title: 'Binary Search the Speed',
      content: `This is binary search, but not over an array index. We binary search over possible eating speeds.

The lowest possible speed is \`1\`.

The highest speed we ever need is \`max(piles)\`, because eating faster than the biggest pile cannot reduce that pile below one hour.

**Key idea:** \`_can_eat(piles, k, h)\` is monotonic.

- If Koko can finish at speed \`k\`, she can also finish at any faster speed.
- If Koko cannot finish at speed \`k\`, every slower speed also fails.

That means we can binary search for the smallest working speed.

**How the updates work**
1. Try \`middle = (left + right) // 2\`.
2. If \`middle\` works, keep it as a possible answer and search smaller speeds with \`right = middle\`.
3. If \`middle\` fails, search faster speeds with \`left = middle + 1\`.
4. When \`left == right\`, that value is the minimum valid speed.

**Complexity**
- Time: **O(n log max(piles))**
- Space: **O(1)**`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        left = 1
        right = max(piles)
        while left < right:
            middle = (left + right) // 2
            if self._can_eat(piles, middle, h):
                right = middle
            else:
                left = middle + 1
        return left

    def _can_eat(self, piles: List[int], k: int, h: int) -> bool:
        total = 0
        for banana in piles:
            if banana % k == 0:
                total += banana // k
            else:
                total += banana // k + 1
        return total <= h

# Try it out - press Run
sol = Solution()
print(sol.minEatingSpeed([1, 4, 3, 2], 9))      # 2
print(sol.minEatingSpeed([25, 10, 23, 4], 4))  # 25`,
          caption: 'Python - binary search the minimum working eating speed',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'leetcode-875-search-space',
      type: 'multiple-choice',
      prompt: 'For Koko Eating Bananas, what range do we binary search over?',
      choices: [
        { id: 'a', text: 'Array indices from 0 to len(piles) - 1.' },
        { id: 'b', text: 'Possible speeds from 1 to max(piles).' },
        { id: 'c', text: 'Possible hour counts from 1 to h.' },
        { id: 'd', text: 'Pile values after sorting them.' },
      ],
      correctAnswer: 'b',
      explanation:
        'The answer is a speed k. The slowest possible speed is 1, and max(piles) is always fast enough.',
    },
    {
      id: 'leetcode-875-working-speed',
      type: 'multiple-choice',
      prompt: 'In this solution, why do we set `right = middle` when `_can_eat(...)` returns `True`?',
      choices: [
        { id: 'a', text: '`middle` is too slow, so we need faster speeds.' },
        { id: 'b', text: '`middle` works, but there may be a smaller working speed.' },
        { id: 'c', text: '`middle` is always the final answer.' },
        { id: 'd', text: 'The piles need to be sorted first.' },
      ],
      correctAnswer: 'b',
      explanation:
        'When a speed works, it is a possible answer. We keep it in the range by using `right = middle`, then look left for a smaller valid speed.',
    },
    {
      id: 'leetcode-875-code-runner',
      type: 'code-runner',
      prompt:
        'Complete the LeetCode-style `Solution.minEatingSpeed` method. Return the minimum integer speed `k` that lets Koko finish all piles within `h` hours.',
      language: 'python',
      starterCode: `from typing import List


class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        left = 1
        right = max(piles)

        # Write your binary search here.
        return right

    def _can_eat(self, piles: List[int], k: int, h: int) -> bool:
        # Return True if speed k finishes within h hours.
        return False


def run_min_eating_speed(piles, h):
    return Solution().minEatingSpeed(piles, h)
`,
      gradeMode: 'function',
      testCases: [
        {
          id: 'sample-1',
          description: 'Minimum speed is 2',
          funcName: 'run_min_eating_speed',
          args: [[1, 4, 3, 2], 9],
          expectedReturn: 2,
        },
        {
          id: 'sample-2',
          description: 'One hour per pile requires max speed',
          funcName: 'run_min_eating_speed',
          args: [[25, 10, 23, 4], 4],
          expectedReturn: 25,
        },
        {
          id: 'hidden-standard',
          hidden: true,
          funcName: 'run_min_eating_speed',
          args: [[3, 6, 7, 11], 8],
          expectedReturn: 4,
        },
        {
          id: 'hidden-tight',
          hidden: true,
          funcName: 'run_min_eating_speed',
          args: [[30, 11, 23, 4, 20], 5],
          expectedReturn: 30,
        },
        {
          id: 'hidden-one-more-hour',
          hidden: true,
          funcName: 'run_min_eating_speed',
          args: [[30, 11, 23, 4, 20], 6],
          expectedReturn: 23,
        },
      ],
      correctAnswer: '__code__',
      explanation: `Model solution:
from typing import List


class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        left = 1
        right = max(piles)
        while left < right:
            middle = (left + right) // 2
            if self._can_eat(piles, middle, h):
                right = middle
            else:
                left = middle + 1
        return left

    def _can_eat(self, piles: List[int], k: int, h: int) -> bool:
        total = 0
        for banana in piles:
            if banana % k == 0:
                total += banana // k
            else:
                total += banana // k + 1
        return total <= h

Why: feasible speeds form a true/false boundary, so binary search finds the smallest speed that can finish within h hours.`,
    },
  ],
};

export default module23;
