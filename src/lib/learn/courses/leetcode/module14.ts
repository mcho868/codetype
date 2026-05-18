import type { Module } from '../python101/types';

const module14: Module = {
  id: 'leetcode-155-min-stack',
  slug: '14',
  title: '155. Min Stack',
  description:
    'Design a stack that supports push, pop, top, and getMin — all in O(1). Uses a second "min stack" that tracks the current minimum at every depth.',
  icon: '📉',
  color: 'from-emerald-500 to-green-400',
  locked: false,
  section: 'Stack',
  lessons: [
    {
      id: 'lesson-min-stack-problem',
      title: 'The Problem',
      content: `**155. Min Stack** — Medium

Design a stack that supports the following operations, each in **O(1)** time:

- \`MinStack()\` — initializes the stack.
- \`push(val)\` — pushes val onto the stack.
- \`pop()\` — removes the top element.
- \`top()\` — returns the top element.
- \`getMin()\` — retrieves the minimum element in the stack.

**Example**
Input: ["MinStack","push","push","push","getMin","pop","top","getMin"]
        with values [1, 2, 0]
Output: [null,null,null,null,0,null,2,1]

**Constraints**
- -2^31 <= val <= 2^31 - 1
- pop, top, and getMin will always be called on a non-empty stack.`,
      codeExamples: [],
    },
    {
      id: 'lesson-min-stack-dual-stack',
      title: 'Dual Stack — O(1) all operations',
      content: `The challenge is \`getMin\` in O(1) — a plain stack can't do this because popping an element might change the minimum, and we can't recompute it without scanning.

**Key insight:** Maintain a second stack (\`min_stack\`) that always holds the **current minimum** at each level of the main stack. When we push to the main stack, we also push \`min(val, min_stack.top)\` to the min stack. When we pop, we pop both stacks together. \`getMin\` just peeks the top of the min stack.

**How it works**
- \`push(val)\`: push val onto main stack; push \`min(val, min_stack[-1])\` onto min stack (or just val if min stack is empty).
- \`pop()\`: pop both stacks.
- \`top()\`: peek main stack.
- \`getMin()\`: peek min stack.

**Complexity**
- Time: **O(1)** for all four operations.
- Space: **O(n)** — the min stack mirrors the main stack in size.`,
      codeExamples: [
        {
          language: 'python',
          code: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        current_min = val if not self.min_stack else min(val, self.min_stack[-1])
        self.min_stack.append(current_min)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]

# Try it out — press Run
ms = MinStack()
ms.push(1)
ms.push(2)
ms.push(0)
print(ms.getMin())  # 0
ms.pop()
print(ms.top())     # 2
print(ms.getMin())  # 1`,
          caption: 'Python — O(1) all ops using a parallel min stack',
          editable: true,
        },
        {
          language: 'typescript',
          code: `class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];

  push(val: number): void {
    this.stack.push(val);
    const currentMin = this.minStack.length === 0
      ? val
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currentMin);
  }

  pop(): void {
    this.stack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}

// Try it out — press Run
const ms = new MinStack();
ms.push(1);
ms.push(2);
ms.push(0);
console.log(ms.getMin()); // 0
ms.pop();
console.log(ms.top());    // 2
console.log(ms.getMin()); // 1`,
          caption: 'TypeScript — O(1) all ops using a parallel min stack',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module14;
