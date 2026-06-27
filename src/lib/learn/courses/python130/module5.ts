import type { Module } from './types';
import { module5Questions } from './questions/module5Questions';


const module5: Module = {
  id: 'module-5',
  slug: '5',
  title: 'Recursion',
  description: 'Solve problems by having functions call themselves — understand base cases, recursive cases, and tracing.',
  icon: '🔄',
  color: 'from-indigo-500 to-blue-400',
  locked: false,
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
  questions: module5Questions,
};

export default module5;
