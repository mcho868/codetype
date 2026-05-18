import type { Module } from '../python101/types';

const module13: Module = {
  id: 'leetcode-20-valid-parentheses',
  slug: '13',
  title: '20. Valid Parentheses',
  description:
    'Given a string of brackets, return true if every open bracket is closed in the correct order. Classic stack problem — push opens, pop and match on closes.',
  icon: '🔣',
  color: 'from-yellow-500 to-orange-400',
  locked: false,
  section: 'Stack',
  lessons: [
    {
      id: 'lesson-valid-parens-problem',
      title: 'The Problem',
      content: `**20. Valid Parentheses** — Easy

You are given a string **s** consisting of \`(\`, \`)\`, \`{\`, \`}\`, \`[\`, and \`]\`.

The string is valid if and only if:
- Every open bracket is closed by the **same type** of close bracket.
- Open brackets are closed in the **correct order**.
- Every close bracket has a **corresponding open bracket**.

**Example 1**
Input: s = "[]"
Output: true

**Example 2**
Input: s = "([{}])"
Output: true

**Example 3**
Input: s = "[(])"
Output: false
Explanation: Brackets are not closed in the correct order.

**Constraints**
- 1 <= s.length <= 1000`,
      codeExamples: [],
    },
    {
      id: 'lesson-valid-parens-stack',
      title: 'Stack — O(n)',
      content: `Use a stack to track unmatched open brackets. When you see a close bracket, the top of the stack must be its matching open bracket — otherwise the string is invalid.

**How it works**
1. Create a mapping from each close bracket to its corresponding open bracket.
2. Walk through each character:
   - If it's an **open** bracket, push it onto the stack.
   - If it's a **close** bracket:
     - If the stack is empty or the top doesn't match, return false.
     - Otherwise pop the top.
3. At the end, return true only if the stack is **empty** (all opens were matched).

**Why the stack is the right tool:** Brackets must be matched in LIFO order — the most recently opened bracket must be the next one closed. That's exactly what a stack tracks.

**Complexity**
- Time: **O(n)** — single pass, each character pushed and popped at most once.
- Space: **O(n)** — worst case all opens (e.g. \`"((((("\`).`,
      codeExamples: [
        {
          language: 'python',
          code: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        close_to_open = {')': '(', '}': '{', ']': '['}

        for char in s:
            if char in close_to_open:
                if not stack or stack[-1] != close_to_open[char]:
                    return False
                stack.pop()
            else:
                stack.append(char)

        return len(stack) == 0

# Try it out — press Run
sol = Solution()
print(sol.isValid("[]"))      # True
print(sol.isValid("([{}])"))  # True
print(sol.isValid("[(])"))    # False
print(sol.isValid("(]"))      # False`,
          caption: 'Python — O(n) stack with close→open mapping',
          editable: true,
        },
        {
          language: 'typescript',
          code: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const closeToOpen: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '[',
  };

  for (const char of s) {
    if (char in closeToOpen) {
      if (stack.length === 0 || stack[stack.length - 1] !== closeToOpen[char]) {
        return false;
      }
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}

// Try it out — press Run
console.log(isValid("[]"));      // true
console.log(isValid("([{}])")); // true
console.log(isValid("[(])"));   // false
console.log(isValid("(]"));     // false`,
          caption: 'TypeScript — O(n) stack with close→open mapping',
          editable: true,
        },
      ],
    },
  ],
  questions: [],
};

export default module13;
