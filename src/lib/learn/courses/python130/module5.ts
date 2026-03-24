import type { Module } from './types';

const module5: Module = {
  id: 'module-5',
  slug: '5',
  title: 'Recursion',
  description: 'Solve problems by having functions call themselves — understand base cases, recursive cases, and tracing.',
  icon: '🔄',
  color: 'from-indigo-500 to-blue-400',
  locked: true,
  lessons: [
    {
      id: 'lesson-5-1',
      title: 'What is Recursion?',
      content: `**Recursion** is when a function calls itself as part of its own definition. It sounds circular at first, but it's an incredibly powerful technique that lets you break big problems into smaller, identical sub-problems.

Every recursive function must have two parts: a **base case** and a **recursive case**. The **base case** is a condition where the function returns a result directly, without calling itself — it's the stopping point. The **recursive case** is where the function calls itself with a slightly simpler version of the problem, moving step by step toward the base case.

Without a proper base case, recursion never stops. Python will keep creating new function calls on the **call stack** until it runs out of memory, raising a \`RecursionError: maximum recursion depth exceeded\`. Think of the call stack like a stack of plates — each function call adds a plate, and each return removes one.

The classic example is **factorial**: 5! = 5 × 4 × 3 × 2 × 1. We can define it recursively as \`factorial(n) = n * factorial(n-1)\` with the base case \`factorial(0) = 1\`. Another clean example is summing a list: \`sum_list([1,2,3,4])\` equals \`1 + sum_list([2,3,4])\` — peel off the first element and recurse on the rest.`,
      codeExamples: [
        {
          language: 'python',
          code: `def factorial(n):
    # Base case: 0! = 1
    if n == 0:
        return 1
    # Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1)

print(factorial(5))   # 120
print(factorial(0))   # 1
print(factorial(7))   # 5040`,
          caption: 'Factorial: the classic recursive function',
          editable: true,
        },
        {
          language: 'python',
          code: `def sum_list(lst):
    # Base case: empty list sums to 0
    if len(lst) == 0:
        return 0
    # Recursive case: first element + sum of the rest
    return lst[0] + sum_list(lst[1:])

print(sum_list([1, 2, 3, 4]))   # 10
print(sum_list([10, 20, 30]))   # 60
print(sum_list([]))              # 0`,
          caption: 'Recursively summing a list by peeling off the first element',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-5-2',
      title: 'Tracing Recursion',
      content: `To really understand recursion, you need to be able to **trace the call tree** — draw out each function call and what it returns. Let's trace \`factorial(4)\`:

\`factorial(4)\` calls \`factorial(3)\`, which calls \`factorial(2)\`, which calls \`factorial(1)\`, which calls \`factorial(0)\`. At that point, the base case fires and returns 1. Now the returns cascade back up: factorial(1) returns 1×1=1, factorial(2) returns 2×1=2, factorial(3) returns 3×2=6, factorial(4) returns 4×6=**24**. Think of it as the function "winding down" (making calls) and then "unwinding" (returning values).

**Fibonacci** is another famous recursive sequence: fib(n) = fib(n-1) + fib(n-2), with base cases fib(0)=0 and fib(1)=1. This gives us 0, 1, 1, 2, 3, 5, 8, 13, 21... The recursive definition is beautiful and mirrors the mathematical definition exactly.

However, naive recursive Fibonacci is extremely slow — **O(2^n)**. To compute fib(5), you compute fib(4) and fib(3). But fib(4) also needs fib(3)! The same subproblems are recomputed over and over. For fib(40) there are over a billion redundant calls. This is a preview of why **memoization** (caching results) matters so much in practice.`,
      codeExamples: [
        {
          language: 'python',
          code: `def factorial(n, depth=0):
    indent = "  " * depth
    print(f"{indent}factorial({n}) called")
    if n == 0:
        print(f"{indent}base case! returning 1")
        return 1
    result = n * factorial(n - 1, depth + 1)
    print(f"{indent}factorial({n}) returning {result}")
    return result

factorial(4)`,
          caption: 'Trace each recursive call and return to see the "winding" and "unwinding"',
          editable: true,
        },
        {
          language: 'python',
          code: `def fib(n):
    # Base cases
    if n == 0:
        return 0
    if n == 1:
        return 1
    # Recursive case: sum of two previous
    return fib(n - 1) + fib(n - 2)

for i in range(10):
    print(f"fib({i}) = {fib(i)}")

# Warning: fib(40) is already very slow!
# Each call branches into 2 more calls — O(2^n)`,
          caption: 'Fibonacci is elegant but the naive version is O(2^n) — exponential time!',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-5-3',
      title: 'Recursion vs Iteration',
      content: `A fundamental theorem in computer science says that **every recursive function can be rewritten iteratively** (using loops), and vice versa. So why ever use recursion? Because some problems have a naturally **recursive structure** — they're defined in terms of smaller versions of themselves — and the recursive code is dramatically cleaner and easier to read.

**When to use recursion:** tree traversal, processing nested data structures, divide-and-conquer algorithms (merge sort, quicksort, binary search), and mathematical definitions (Fibonacci, factorial, combinations). In these cases, the recursive solution often matches the problem's own structure, making it self-documenting.

**When to prefer iteration:** when performance is critical, when the input could be very deep (causing stack overflow), or when the recursive structure would repeat subproblems exponentially. Python has a default recursion limit of 1000 — check it with \`sys.getrecursionlimit()\`. Each recursive call also has overhead (creating a new stack frame), so deep recursion is both slower and uses more memory than a loop.

The key insight is this: **recursion is a tool, not a rule**. Use it when the problem naturally decomposes into identical sub-problems. If a simple loop does the job cleanly, prefer that. As you advance into algorithms on trees and graphs, you'll find recursion becomes almost essential.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Recursive vs Iterative factorial

def factorial_recursive(n):
    if n == 0:
        return 1
    return n * factorial_recursive(n - 1)

def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

print(factorial_recursive(10))  # 3628800
print(factorial_iterative(10))  # 3628800

import sys
print("Recursion limit:", sys.getrecursionlimit())  # 1000`,
          caption: 'Both produce the same result — iteration avoids stack overhead for large n',
          editable: true,
        },
        {
          language: 'python',
          code: `# Recursive power of 2 — naturally divide and conquer
def fast_power(base, exp):
    if exp == 0:
        return 1
    if exp % 2 == 0:
        half = fast_power(base, exp // 2)
        return half * half           # O(log n) — much faster!
    return base * fast_power(base, exp - 1)

print(fast_power(2, 10))   # 1024
print(fast_power(3, 8))    # 6561

# Recursion shines when it halves the problem each time`,
          caption: 'Fast power via divide-and-conquer: O(log n) instead of O(n)',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q5-1',
      type: 'multiple-choice',
      prompt: 'What are the two required parts of every recursive function?',
      choices: [
        { id: 'a', text: 'A loop and a return statement' },
        { id: 'b', text: 'A base case and a recursive case' },
        { id: 'c', text: 'An input and an output' },
        { id: 'd', text: 'A condition and an assignment' },
      ],
      correctAnswer: 'b',
      explanation: 'Every recursive function needs a base case (where it stops and returns directly) and a recursive case (where it calls itself with a simpler input).',
    },
    {
      id: 'q5-2',
      type: 'true-false',
      prompt: 'A recursive function without a base case will run forever (or until Python raises a RecursionError).',
      correctAnswer: 'true',
      explanation: 'Without a base case, the function never stops calling itself. Python enforces a recursion limit (default 1000) and raises RecursionError: maximum recursion depth exceeded.',
    },
    {
      id: 'q5-3',
      type: 'multiple-choice',
      prompt: 'What does factorial(0) return according to the standard recursive definition?',
      choices: [
        { id: 'a', text: '0' },
        { id: 'b', text: '-1' },
        { id: 'c', text: '1' },
        { id: 'd', text: 'None' },
      ],
      correctAnswer: 'c',
      explanation: 'factorial(0) = 1 is the base case. This is mathematically correct (0! = 1 by definition) and stops the recursion.',
    },
    {
      id: 'q5-4',
      type: 'fill-in-blank',
      prompt: 'Complete the recursive definition: factorial(n) = n * factorial(___)',
      correctAnswer: 'n - 1',
      explanation: 'Each recursive call reduces n by 1, moving toward the base case of factorial(0) = 1.',
    },
    {
      id: 'q5-5',
      type: 'multiple-choice',
      prompt: 'What is the time complexity of naive recursive Fibonacci (fib(n) = fib(n-1) + fib(n-2))?',
      choices: [
        { id: 'a', text: 'O(n)' },
        { id: 'b', text: 'O(n log n)' },
        { id: 'c', text: 'O(2^n)' },
        { id: 'd', text: 'O(n^2)' },
      ],
      correctAnswer: 'c',
      explanation: 'Each call to fib(n) makes two calls, each of those makes two more, creating an exponential tree of calls. Many subproblems are recomputed repeatedly, giving O(2^n) time.',
    },
    {
      id: 'q5-6',
      type: 'true-false',
      prompt: 'Every problem that can be solved recursively can also be solved iteratively.',
      correctAnswer: 'true',
      explanation: 'Recursion and iteration are equally powerful — any recursive solution can be rewritten with loops (often using an explicit stack). The choice is usually about clarity and performance.',
    },
    {
      id: 'q5-7',
      type: 'multiple-choice',
      prompt: 'What is Python\'s default recursion depth limit?',
      choices: [
        { id: 'a', text: '100' },
        { id: 'b', text: '500' },
        { id: 'c', text: '1000' },
        { id: 'd', text: '10000' },
      ],
      correctAnswer: 'c',
      explanation: 'Python\'s default recursion limit is 1000, which you can check with sys.getrecursionlimit(). You can change it with sys.setrecursionlimit(), but this is rarely a good idea.',
    },
    {
      id: 'q5-8',
      type: 'multiple-choice',
      prompt: 'Tracing factorial(3), what is the correct sequence of return values unwinding back up?',
      choices: [
        { id: 'a', text: '1 → 2 → 6' },
        { id: 'b', text: '3 → 2 → 1' },
        { id: 'c', text: '1 → 3 → 6' },
        { id: 'd', text: '6 → 3 → 1' },
      ],
      correctAnswer: 'a',
      explanation: 'factorial(0) returns 1, then factorial(1) returns 1×1=1, then factorial(2) returns 2×1=2, then factorial(3) returns 3×2=6. The values unwind as 1 → 1 → 2 → 6.',
    },
    {
      id: 'q5-9',
      type: 'fill-in-blank',
      prompt: 'The Fibonacci base cases are: fib(0) = 0 and fib(1) = ___',
      correctAnswer: '1',
      explanation: 'fib(0) = 0 and fib(1) = 1 are the two base cases. From these, fib(2) = 0+1 = 1, fib(3) = 1+1 = 2, and so on.',
    },
    {
      id: 'q5-10',
      type: 'true-false',
      prompt: 'Recursion is always more efficient than iteration because it uses less memory.',
      correctAnswer: 'false',
      explanation: 'Recursion is often less memory-efficient than iteration because each recursive call creates a new stack frame. Iteration reuses the same frame. Recursion can also be slower due to function-call overhead.',
    },
    {
      id: 'q5-11',
      type: 'multiple-choice',
      prompt: 'Which type of problem is recursion MOST naturally suited for?',
      choices: [
        { id: 'a', text: 'Simple loops over a flat list' },
        { id: 'b', text: 'Reading user input repeatedly' },
        { id: 'c', text: 'Problems with hierarchical or self-similar structure, like trees' },
        { id: 'd', text: 'Sorting a list of numbers' },
      ],
      correctAnswer: 'c',
      explanation: 'Recursion shines on problems that have a naturally recursive structure — trees, nested data, divide-and-conquer algorithms. For simple flat iteration, a loop is usually cleaner and more efficient.',
    },
    {
      id: 'q5-12',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Write a recursive function `power(base, exp)` that computes base^exp without using ** or math.pow. Base case: exp==0 returns 1. Recursive case: base * power(base, exp-1). Print power(2, 10) and power(3, 4).',
      starterCode: "def power(base, exp):\n    # Base case: anything^0 = 1\n    # Recursive case: base * power(base, exp-1)\n    pass\n\nprint(power(2, 10))\nprint(power(3, 4))",
      expectedOutput: "1024\n81",
      correctAnswer: '__code__',
      explanation: 'The base case is exp==0, returning 1. The recursive case multiplies base by power(base, exp-1). power(2,10) = 2*power(2,9) = ... = 1024. power(3,4) = 3*3*3*3 = 81.',
    },
    {
      id: 'q5-13',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Write a recursive function `flatten(lst)` that takes a nested list and returns a flat list. E.g., flatten([1, [2, [3, 4], 5], 6]) returns [1, 2, 3, 4, 5, 6]. If an element is a list, recurse into it; otherwise add it to the result. Print the result.',
      starterCode: "def flatten(lst):\n    result = []\n    for item in lst:\n        if isinstance(item, list):\n            # Recursively flatten and extend result\n            pass\n        else:\n            result.append(item)\n    return result\n\nprint(flatten([1, [2, [3, 4], 5], 6]))",
      expectedOutput: "[1, 2, 3, 4, 5, 6]",
      correctAnswer: '__code__',
      explanation: 'When you encounter a list element, call flatten() on it and extend result with the returned flat list. For non-list elements, just append them. This handles any depth of nesting.',
    },
  ],
};

export default module5;
