import type { Module } from '../python101/types';

const module17: Module = {
  id: 'leetcode-853-car-fleet',
  slug: '17',
  title: '853. Car Fleet',
  description:
    'Given car positions and speeds on a highway, count how many fleets arrive at the destination. Sort by position descending, compute arrival times, and use a stack to detect when a faster car is absorbed into a slower fleet ahead.',
  icon: '🚗',
  color: 'from-slate-500 to-gray-400',
  locked: false,
  section: 'Stack',
  lessons: [
    {
      id: 'lesson-car-fleet-problem',
      title: 'The Problem',
      content: `**853. Car Fleet** — Medium

There are n cars on a one-lane highway heading to the same **target** position. You are given arrays **position** and **speed** of length n.

A car cannot pass the car ahead — it can only catch up and then match its speed. A **fleet** is a group of cars driving together at the same position and speed. A car that catches up exactly at the destination also joins the fleet.

Return the **number of car fleets** that arrive at the destination.

**Example 1**
Input: target = 10, position = [1,4], speed = [3,2]
Output: 1
Explanation: Car at 1 (speed 3) and car at 4 (speed 2) arrive at the same time → 1 fleet.

**Example 2**
Input: target = 10, position = [4,1,0,7], speed = [2,2,1,1]
Output: 3

**Constraints**
- 1 <= n <= 1000
- 0 < target <= 1000
- 0 < speed[i] <= 100
- 0 <= position[i] < target
- All position values are unique.`,
      codeExamples: [],
    },
    {
      id: 'lesson-car-fleet-stack',
      title: 'Sort + Stack — O(n log n)',
      content: `**Key insight:** Sort cars by starting position descending (closest to target first). Compute each car's time to reach the target. Process cars from closest to farthest: if a farther car would arrive **before or at the same time** as the car ahead, it catches up and joins that fleet (same arrival time). Otherwise it forms its own new fleet.

**How it works**
1. Pair each car's (position, speed) and sort by position descending.
2. For each car compute \`time = (target - position) / speed\`.
3. Use a stack of fleet arrival times:
   - If the stack is empty, or the current car's time is **greater** than the top (it arrives later → can't catch the fleet ahead), push this time as a new fleet.
   - If it arrives at the same time or earlier (it catches the fleet ahead), don't push — it merges with the fleet already on the stack.
4. Return the stack size.

**Why descending order?** A car can only be blocked by cars *ahead* of it (closer to target). Processing closest-first means when we look at each car, all already-stacked fleets are strictly ahead of it.

**Complexity**
- Time: **O(n log n)** — dominated by sorting.
- Space: **O(n)** — the stack.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
        combined = [
            [position[i], speed[i], (target - position[i]) / speed[i]]
            for i in range(len(position))
        ]

        sorted_cars = sorted(combined, key=lambda x: x[0])

        stack = []

        for i in range(len(position) - 1, -1, -1):
            car = sorted_cars[i]

            if len(stack) == 0 or stack[-1][2] < car[2]:
                stack.append(car)

        return len(stack)

# Try it out — press Run
sol = Solution()
print(sol.carFleet(10, [1,4], [3,2]))       # 1
print(sol.carFleet(10, [4,1,0,7], [2,2,1,1]))  # 3`,
          caption: 'Python — O(n log n) sort by position + stack of cars with arrival time',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function carFleet(target: number, position: number[], speed: number[]): number {
    let combined: [number, number, number][] = position.map((pos, index) => [pos, speed[index], (target - pos) / speed[index] ]);

    // 0 = position, 1 = speed, 2 = time
    combined.sort((a, b) => b[0] - a[0]);

    let stack: [number,number,number][] = [];

    for (let i: number = 0; i < position.length; i ++) {
        let car = combined[i];
        if (stack.length == 0 || stack[stack.length - 1][2] < car[2]) {
            stack.push(car);
        }
    }

    return stack.length;
};

// Try it out — press Run
console.log(carFleet(10, [1,4], [3,2]));          // 1
console.log(carFleet(10, [4,1,0,7], [2,2,1,1]));  // 3`,
          caption: 'TypeScript — O(n log n) sort by position desc + stack of cars with arrival time',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module17;
