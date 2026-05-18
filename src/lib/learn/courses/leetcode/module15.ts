import type { Module } from '../python101/types';

const module15: Module = {
  id: 'leetcode-150-evaluate-reverse-polish-notation',
  slug: '15',
  title: '150. Evaluate Reverse Polish Notation',
  description:
    'Evaluate an arithmetic expression in Reverse Polish Notation. Push operands onto a stack; on each operator, pop two operands, apply the operation, and push the result.',
  icon: '🧮',
  color: 'from-cyan-500 to-teal-400',
  locked: false,
  section: 'Stack',
  lessons: [
    {
      id: 'lesson-rpn-problem',
      title: 'The Problem',
      content: `**150. Evaluate Reverse Polish Notation** — Medium

You are given an array of strings **tokens** representing a valid arithmetic expression in **Reverse Polish Notation (RPN)**.

Return the integer result of the expression. Division truncates toward zero.

**What is RPN?** Operators follow their operands. \`["1","2","+"]\` means 1 + 2. No parentheses needed — the stack naturally handles order of operations.

**Example 1**
Input: tokens = ["1","2","+","3","*","4","-"]
Output: 5
Explanation: ((1 + 2) * 3) - 4 = 5

**Constraints**
- 1 <= tokens.length <= 1000
- tokens[i] is \`"+"\`, \`"-"\`, \`"*"\`, \`"/"\`, or an integer in [-200, 200].`,
      codeExamples: [],
    },
    {
      id: 'lesson-rpn-stack',
      title: 'Stack — O(n)',
      content: `The stack is the natural data structure for RPN evaluation: numbers go on the stack; operators consume the top two numbers and push the result.

**How it works**
1. For each token:
   - If it's a **number**, push it onto the stack.
   - If it's an **operator**, pop the top two values (\`b\` then \`a\`), apply the operator, and push the result.
2. After processing all tokens, the stack has exactly one element — the answer.

**Pop order matters:** The first pop gives the **right** operand, the second pop gives the **left** operand. For \`+\` and \`*\` this doesn't matter (commutative), but for \`-\` and \`/\` it does: \`a - b\` not \`b - a\`.

**Truncation toward zero:** Python's \`//\` floors (negative results round away from zero), so use \`int(a / b)\` instead for correct RPN semantics.

**Complexity**
- Time: **O(n)** — single pass, each token pushed/popped once.
- Space: **O(n)** — worst case all numbers before any operator.`,
      codeExamples: [
        {
          language: 'python',
          code: `from typing import List

class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        ops = {'+', '-', '*', '/'}

        for token in tokens:
            if token in ops:
                b = stack.pop()
                a = stack.pop()
                if token == '+':
                    stack.append(a + b)
                elif token == '-':
                    stack.append(a - b)
                elif token == '*':
                    stack.append(a * b)
                else:
                    stack.append(int(a / b))  # truncate toward zero
            else:
                stack.append(int(token))

        return stack[0]

# Try it out — press Run
sol = Solution()
print(sol.evalRPN(["1","2","+","3","*","4","-"]))  # 5
print(sol.evalRPN(["4","13","5","/","+"]))          # 6
print(sol.evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]))  # 22`,
          caption: 'Python — O(n) stack evaluation, truncates toward zero',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  const ops = new Set(['+', '-', '*', '/']);

  for (const token of tokens) {
    if (ops.has(token)) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      if (token === '+') stack.push(a + b);
      else if (token === '-') stack.push(a - b);
      else if (token === '*') stack.push(a * b);
      else stack.push(Math.trunc(a / b)); // truncate toward zero
    } else {
      stack.push(Number(token));
    }
  }

  return stack[0];
}

// Try it out — press Run
console.log(evalRPN(["1","2","+","3","*","4","-"])); // 5
console.log(evalRPN(["4","13","5","/","+"]));         // 6`,
          caption: 'TypeScript — O(n) stack evaluation using Math.trunc',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module15;
