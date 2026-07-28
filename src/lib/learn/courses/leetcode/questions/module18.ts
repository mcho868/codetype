import type { Module } from '../../python101/types';

const module18: Module = {
  id: 'leetcode-84-largest-rectangle-histogram',
  slug: '18',
  title: '84. Largest Rectangle in Histogram',
  description:
    'Given bar heights in a histogram, return the area of the largest rectangle. NeetCode monotonic stack — track extendable bars, pop when a shorter bar ends them — O(n).',
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

**Example 3**
Input: heights = [2,1,5,6,2,3]
Output: 10

**Constraints**
- 1 <= heights.length <= 1000
- 0 <= heights[i] <= 1000`,
      codeExamples: [],
    },
    {
      id: 'lesson-histogram-neetcode',
      title: 'NeetCode — Monotonic Stack Walkthrough',
      content: `*NeetCode solution — studied and copied to understand the approach.*

좋아. 제일 쉬운 방식으로 보자.

예시는 이것으로 할게요.

\`heights = [2, 1, 5, 6, 2, 3]\`

히스토그램은 이렇게 생겼습니다.

\`\`\`
index:   0  1  2  3  4  5
height:  2  1  5  6  2  3
        █
        █  █
        █  █
        █  █
█       █  █  █
█  █    █  █  █  █
2  1    5  6  2  3
\`\`\`

⸻

**핵심 생각**

stack은 이렇게 생각하면 됩니다.

아직 오른쪽으로 얼마나 더 갈 수 있을지 모르는 막대들을 잠깐 보관하는 곳

그런데 갑자기 더 낮은 막대가 나오면?

\`5  6  2\`

여기서 2가 나오면 5와 6은 더 이상 오른쪽으로 못 갑니다.

왜냐하면 높이 5짜리 직사각형이나 높이 6짜리 직사각형은 높이 2를 지나갈 수 없기 때문입니다.

\`\`\`
5  6  2
█  █
█  █
█  █
█  █
█  █  █
\`\`\`

높이 6은 index 3에서만 가능합니다.

\`\`\`
      █
      █
      █
      █
      █
      █
index 3
\`\`\`

넓이:

\`height = 6\`, \`width = 1\`, \`area = 6\`

높이 5는 index 2부터 index 3까지 가능합니다.

\`\`\`
   █  █
   █  █
   █  █
   █  █
   █  █
index 2  3
\`\`\`

넓이:

\`height = 5\`, \`width = 2\`, \`area = 10\`

그래서 현재까지 가장 큰 넓이는 10입니다.

⸻

코드에서 이 부분이 바로 여기

\`\`\`python
while stack and stack[-1][1] > h:
    index, height = stack.pop()
    maxArea = max(maxArea, height * (i - index))
    start = index
\`\`\`

쉽게 말하면:

현재 높이보다 높은 애들은 이제 끝났다.
그러니까 넓이 계산하고 stack에서 빼자.

끝입니다.

⸻

**하나씩 visual로 보기**

시작: \`heights = [2, 1, 5, 6, 2, 3]\`

⸻

**i = 0, h = 2**

\`\`\`
index:   0
height:  2
█
█
2
\`\`\`

stack에 넣습니다.

\`stack = [(0, 2)]\`

뜻: 높이 2는 index 0부터 시작할 수 있다.

⸻

**i = 1, h = 1**

\`\`\`
2  1
█
█  █
\`\`\`

높이 1이 이전 높이 2보다 낮습니다. 그러면 높이 2는 여기서 끝입니다.

넓이 계산: \`height = 2\`, \`width = 1\`, \`area = 2\`

그리고 중요한 점: 높이 1은 index 1에서 시작하는 게 아니라, index 0부터 시작할 수 있습니다.

\`\`\`
1  1
█  █
\`\`\`

왜냐하면 index 0의 높이 2도 높이 1 이상이기 때문입니다.

\`stack = [(0, 1)]\`

⸻

**i = 2, h = 5**

\`\`\`
1  5
   █
   █
   █
   █
█  █
\`\`\`

5는 1보다 높으니까 그냥 추가합니다.

\`stack = [(0, 1), (2, 5)]\`

⸻

**i = 3, h = 6**

\`\`\`
1  5  6
      █
   █  █
   █  █
   █  █
   █  █
█  █  █
\`\`\`

6은 5보다 높으니까 그냥 추가합니다.

\`stack = [(0, 1), (2, 5), (3, 6)]\`

⸻

**i = 4, h = 2** — 여기가 제일 중요합니다.

현재 높이 2가 나왔습니다. 현재 높이 2가 이전 높이 6보다 낮습니다.

그러면 높이 6은 여기서 끝입니다.

계산: \`height = 6\`, \`width = 4 - 3 = 1\`, \`area = 6\`

stack에서 6 제거 → \`stack = [(0, 1), (2, 5)]\`

그런데 아직 stack top은 5입니다. 현재 높이 2는 5보다도 낮습니다.

그러면 높이 5도 여기서 끝입니다.

\`\`\`
index:  2  3
        █  █
        █  █
        █  █
        █  █
        █  █
\`\`\`

계산: \`height = 5\`, \`width = 4 - 2 = 2\`, \`area = 10\`

현재 최대 넓이: \`maxArea = 10\`

이제 stack은 \`stack = [(0, 1)]\`

그리고 현재 높이 2를 넣어야 합니다. 그런데 현재 높이 2는 index 4에서만 시작하는 게 아닙니다.

\`5  6  2\` — 여기서 5와 6도 높이 2 이상입니다.

그러니까 높이 2짜리 직사각형은 index 2부터 시작할 수 있습니다.

\`stack\`에 넣는 값은 \`(4, 2)\`가 아니라 \`(2, 2)\`입니다.

\`stack = [(0, 1), (2, 2)]\`

이게 코드의 \`start = index\` + \`stack.append((start, h))\` 부분입니다.

⸻

**i = 5, h = 3**

\`\`\`
1  2  3
      █
   █  █
█  █  █
\`\`\`

3은 2보다 높으니까 그냥 추가합니다.

\`stack = [(0, 1), (2, 2), (5, 3)]\`

⸻

**마지막 처리**

반복문이 끝났습니다. stack에 아직 남은 애들은 끝까지 오른쪽으로 갈 수 있었다.

전체 길이는 6입니다.

- 높이 1: index 0부터 끝까지 → \`area = 1 × 6 = 6\`
- 높이 2: index 2부터 끝까지 → \`area = 2 × 4 = 8\`
- 높이 3: index 5부터 끝까지 → \`area = 3 × 1 = 3\`

최대값은 여전히 **10**. 답은 **10**.

⸻

**진짜 핵심만 한 문장으로**

막대 높이가 올라가는 동안은 stack에 저장하고, 갑자기 낮은 막대가 나오면 이전 높은 막대들의 최대 넓이를 그 자리에서 계산한다.

⸻

**\`start = index\`가 헷갈리면**

현재 낮은 막대가 나왔을 때 \`5  6  2\` — 높이 2는 원래 index 4에 있지만, 사실 index 2까지 왼쪽으로 확장할 수 있습니다.

\`\`\`
5  6  2
■  ■  ■
■  ■  ■
\`\`\`

그래서 2의 시작점은 4가 아니라 2입니다. 이걸 코드로 표현한 게 \`start = index\`입니다.

**Complexity**
- Time: **O(n)** — each bar pushed and popped at most once.
- Space: **O(n)** — the stack.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        stack = []
        maxArea = 0

        for i, h in enumerate(heights):
            start = i
            while stack and stack[-1][1] > h:
                index, height = stack.pop()
                maxArea = max(maxArea, height * (i - index))
                start = index
            stack.append((start, h))

        for i, h in stack:
            maxArea = max(maxArea, h * (len(heights) - i))

        return maxArea

# Try it out — press Run
sol = Solution()
print(sol.largestRectangleArea([2,1,5,6,2,3]))  # 10
print(sol.largestRectangleArea([7,1,7,2,2,4]))  # 8
print(sol.largestRectangleArea([1,3,7]))         # 7`,
          caption: 'Python — NeetCode monotonic stack (studied solution)',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function largestRectangleArea(heights: number[]): number {
  const stack: [number, number][] = [];
  let maxArea = 0;

  for (let i = 0; i < heights.length; i++) {
    const h = heights[i];
    let start = i;

    while (stack.length > 0 && stack[stack.length - 1][1] > h) {
      const [index, height] = stack.pop()!;
      maxArea = Math.max(maxArea, height * (i - index));
      start = index;
    }
    stack.push([start, h]);
  }

  for (const [i, h] of stack) {
    maxArea = Math.max(maxArea, h * (heights.length - i));
  }

  return maxArea;
}

// Try it out — press Run
console.log(largestRectangleArea([2,1,5,6,2,3])); // 10
console.log(largestRectangleArea([7,1,7,2,2,4])); // 8
console.log(largestRectangleArea([1,3,7]));        // 7`,
          caption: 'TypeScript — same NeetCode logic',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module18;
