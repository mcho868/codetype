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
      title: 'Your Solution — Stack',
      content: `Your approach walks each token and uses an \`operands\` set to detect operators. Numbers get pushed; operators pop the top two values and push the result back.

**How it works**
1. For each token:
   - If it's in \`operands\`, pop \`right\` then \`left\` (first pop is the right operand) and apply the operator.
   - Otherwise push \`int(token)\` onto the stack.
2. Return the last value on the stack.

**Pop order matters:** For \`-\` and \`/\`, you compute \`left - right\` and \`int(left / right)\` — not the reverse.

**Truncation toward zero:** Use \`int(left / right)\` in Python and \`Math.trunc(nTwo / nOne)\` in TypeScript — not \`//\` or \`Math.floor\`, which behave differently on negatives.

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
        operands = {"+", "-", "/", "*"}

        for token in tokens:
            if token in operands:
                right = stack.pop()
                left = stack.pop()
                if token == "+":
                    stack.append(left + right)
                elif token == "-":
                    stack.append(left - right)
                elif token == "/":
                    stack.append(int(left / right))
                elif token == "*":
                    stack.append(left * right)
            else:
                stack.append(int(token))

        return stack.pop()

# Try it out — press Run
sol = Solution()
print(sol.evalRPN(["1","2","+","3","*","4","-"]))  # 5
print(sol.evalRPN(["4","13","5","/","+"]))          # 6
print(sol.evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]))  # 22`,
          caption: 'Your solution — stack with operands set, truncate toward zero',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  const operands = new Set(["+", "-", "/", "*"]);

  for (const token of tokens) {
    if (operands.has(token)) {
      const nOne = stack.pop()!;
      const nTwo = stack.pop()!;

      if (token === "+") {
        stack.push(nTwo + nOne);
      } else if (token === "-") {
        stack.push(nTwo - nOne);
      } else if (token === "/") {
        stack.push(Math.trunc(nTwo / nOne));
      } else if (token === "*") {
        stack.push(nTwo * nOne);
      }
    } else {
      stack.push(Number(token));
    }
  }

  return stack.pop()!;
}

// Try it out — press Run
console.log(evalRPN(["1","2","+","3","*","4","-"])); // 5
console.log(evalRPN(["4","13","5","/","+"]));         // 6
console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])); // 22`,
          caption: 'Your solution — stack with operands set, Math.trunc for division',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module15;
