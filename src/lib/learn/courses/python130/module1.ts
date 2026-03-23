import type { Module } from './types';

const module1: Module = {
  id: 'module-1',
  slug: '1',
  title: 'Algorithm Complexity',
  description: 'Analyse algorithm efficiency with Big-O notation and understand time vs space trade-offs.',
  icon: '📈',
  color: 'from-purple-500 to-violet-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-1-1',
      title: 'Big-O Notation',
      content: `When your program works correctly on small inputs, the next question is: will it still work when the data is a million times bigger? **Algorithm complexity** is how we measure an algorithm's performance as the input grows — not in seconds, but in terms of the number of operations performed.

We use **Big-O notation** to describe this growth rate. The letter n represents the size of the input (e.g., the length of a list). Big-O tells us: as n grows very large, how does the number of operations scale? Crucially, we care about the *dominant* behaviour, so we drop constants and lower-order terms. O(2n) simplifies to O(n); O(n² + n) simplifies to O(n²).

The most common complexity classes, from fastest to slowest: **O(1) constant** — the operation takes the same time regardless of input size (e.g., accessing list[i]). **O(log n) logarithmic** — the work roughly halves each step (e.g., binary search). **O(n) linear** — you visit each element once (e.g., finding the max in an unsorted list). **O(n log n)** — slightly worse than linear, typical for efficient sorting. **O(n²) quadratic** — nested loops over all pairs. **O(2^n) exponential** — doubles with each added element, catastrophically slow.

To see why this matters in practice: O(n²) with n = 10,000 means roughly 100,000,000 operations. O(n log n) with the same input is only about 130,000 — a 750× difference. On real hardware, an O(n²) algorithm that works fine with 1,000 elements might take hours with 100,000 elements.

Remember: Big-O describes the *worst case* unless otherwise specified, and it measures how the algorithm **scales**, not its absolute speed. A slow O(1) operation can be slower than a fast O(n) one for small n. Big-O is a tool for reasoning about scalability, not a precise stopwatch.`,
      codeExamples: [
        {
          language: 'python',
          code: `# O(1) — constant time: index access, no matter how long the list
fruits = ["apple", "banana", "cherry", "date", "elderberry"]
print(fruits[2])        # always 1 operation: O(1)
print(len(fruits))      # len() is O(1) in Python

# O(n) — linear: must check every element in the worst case
def find_max(lst):
    max_val = lst[0]
    for item in lst:    # visits n elements
        if item > max_val:
            max_val = item
    return max_val

print(find_max([3, 1, 4, 1, 5, 9, 2, 6]))  # O(n)`,
          caption: 'O(1) index access vs O(n) linear scan — both correct, very different scaling',
          editable: true,
        },
        {
          language: 'python',
          code: `# Comparing growth rates
# Imagine each "operation" takes 1 nanosecond

def show_growth(n):
    import math
    o1     = 1
    o_logn = int(math.log2(n)) if n > 0 else 0
    o_n    = n
    o_nlogn = int(n * math.log2(n)) if n > 0 else 0
    o_n2   = n * n
    print(f"n={n:>8} | O(1)={o1} | O(log n)={o_logn} | O(n)={o_n} | O(n log n)={o_nlogn} | O(n²)={o_n2}")

for n in [10, 100, 1000, 10000]:
    show_growth(n)`,
          caption: 'See how different complexities grow as n increases',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-1-2',
      title: 'Analysing Code',
      content: `To determine the Big-O of a piece of code, you count the number of operations as a function of the input size n. The key patterns to recognise are: a **single loop** from 0 to n is O(n). **Two nested loops** each running n times is O(n²). **Halving** the search space each iteration (like binary search) is O(log n).

When code has sequential sections (one block after another), you take the *maximum* complexity — O(n) followed by O(n²) is still O(n²). Constants don't change the Big-O class: a loop that does 5 operations per iteration is still O(n), not O(5n).

For nested loops, multiply the complexities: an outer loop running n times with an inner loop running m times is O(n×m). If both loops go to n, it's O(n²). If the inner loop goes to n but starts at i (the outer index), it's O(n²/2) which is still O(n²) after dropping the constant.

Python's built-in list operations have specific complexities you should know: **list[i]** is O(1). **list.append(x)** is O(1) amortised. **list.insert(0, x)** is O(n) because every existing element must shift right. **x in list** is O(n) because Python scans the whole list. **len(list)** is O(1). In contrast, dictionary lookup **d[key]** is O(1) average case. This is why using a set or dict for membership tests is much faster than using a list for large collections.

One practical habit: when you see nested loops in your code and the data could be large, pause and ask "could I rewrite this with a dict or set to avoid the inner loop?" Very often the answer is yes, and the result is a drop from O(n²) to O(n).`,
      codeExamples: [
        {
          language: 'python',
          code: `# Identifying complexity from code structure

# O(n) — single loop
def sum_list(lst):
    total = 0
    for x in lst:     # n iterations
        total += x    # O(1) each
    return total      # Overall: O(n)

# O(n²) — nested loops
def all_pairs(lst):
    pairs = []
    for i in range(len(lst)):       # n iterations
        for j in range(len(lst)):   # n iterations each
            pairs.append((lst[i], lst[j]))
    return pairs  # Overall: O(n²)

# O(log n) — halving the search space
def count_halvings(n):
    count = 0
    while n > 1:
        n = n // 2   # halve each step
        count += 1
    return count     # this is log₂(n)

print(count_halvings(1024))  # 10 steps for 1024 elements`,
          caption: 'Recognising O(n), O(n²), and O(log n) patterns in code',
          editable: true,
        },
        {
          language: 'python',
          code: `# List vs dict for membership: a huge practical difference
import time

data_list = list(range(100000))
data_set  = set(range(100000))

target = 99999  # worst case: near the end

# O(n) list search
start = time.time()
for _ in range(1000):
    result = target in data_list
list_time = time.time() - start

# O(1) set search
start = time.time()
for _ in range(1000):
    result = target in data_set
set_time = time.time() - start

print(f"List lookup: {list_time:.4f}s")
print(f"Set  lookup: {set_time:.4f}s")
print(f"Set is ~{list_time/set_time:.0f}x faster")`,
          caption: 'O(n) list membership vs O(1) set membership — measured difference',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-1-3',
      title: 'Space Complexity & Trade-offs',
      content: `Time complexity is only half the picture. **Space complexity** measures how much extra memory an algorithm uses as the input grows. An algorithm might be fast but require enormous amounts of RAM — that can be just as problematic as being slow.

Space complexity uses the same Big-O notation. An algorithm that uses a fixed amount of extra memory regardless of input size is O(1) space. One that creates a new list of size n is O(n) space. Recursive algorithms often use O(depth) space for the call stack, which can be O(log n) for balanced recursion or O(n) for linear recursion.

The classic **time-space trade-off** is memoisation: paying with memory to avoid recomputing values. The Fibonacci sequence calculated naively with recursion is O(2^n) time — exponentially slow — because it recalculates the same sub-problems millions of times. By storing results in a dictionary (a technique called **memoisation** or **dynamic programming**), you reduce the time to O(n) at the cost of O(n) space. This is almost always a worthwhile bargain.

**Best, worst, and average case** analysis gives a fuller picture of an algorithm's behaviour. For example, searching a list for a target: the best case is O(1) if it's the first element; the worst case is O(n) if it's the last or absent. We usually focus on worst-case because it's a guarantee — your program will never be slower than that. Average case (assuming random data) often equals worst case for simple algorithms.

Why does O(n²) fail on large inputs? A sorting algorithm with O(n²) time on a list of 100,000 items performs 10,000,000,000 operations. At 1 billion operations per second, that's 10 seconds — and it gets worse fast. The same task with an O(n log n) algorithm is roughly 1,700,000 operations — nearly instant. This is why knowing complexity matters even for "working" code.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Fibonacci: naive recursion vs memoisation
import time

# O(2^n) time, O(n) space (call stack)
def fib_slow(n):
    if n <= 1:
        return n
    return fib_slow(n - 1) + fib_slow(n - 2)

# O(n) time, O(n) space (the memo dict)
def fib_fast(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_fast(n - 1, memo) + fib_fast(n - 2, memo)
    return memo[n]

start = time.time()
print("fib_slow(30) =", fib_slow(30))
print(f"Slow took: {time.time()-start:.3f}s")

start = time.time()
print("fib_fast(30) =", fib_fast(30))
print(f"Fast took: {time.time()-start:.6f}s")`,
          caption: 'Memoisation trades O(n) space for a dramatic time speedup',
          editable: true,
        },
        {
          language: 'python',
          code: `# Best, worst, average case: linear search
def linear_search(lst, target):
    for i, item in enumerate(lst):
        if item == target:
            return i
    return -1

data = list(range(1000))

# Best case: target is first element — O(1)
print(linear_search(data, 0))    # finds at index 0

# Worst case: target is last or missing — O(n)
print(linear_search(data, 999))  # scans all 1000 elements
print(linear_search(data, 9999)) # not found, scans all 1000

# Average case: roughly n/2 comparisons on average
# Still O(n) — the constant (1/2) is dropped`,
          caption: 'Best, worst, and average case for linear search',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q1-1',
      type: 'multiple-choice',
      prompt: 'What does Big-O notation measure?',
      choices: [
        { id: 'a', text: 'The exact number of milliseconds an algorithm takes' },
        { id: 'b', text: 'How the number of operations grows as the input size grows' },
        { id: 'c', text: 'The amount of memory a program uses in bytes' },
        { id: 'd', text: 'How many lines of code the algorithm has' },
      ],
      correctAnswer: 'b',
      explanation: 'Big-O notation describes the growth rate of operations relative to input size n. It is not about exact time in milliseconds — it abstracts away hardware differences.',
    },
    {
      id: 'q1-2',
      type: 'multiple-choice',
      prompt: 'What is the Big-O complexity of accessing an element by index in a Python list (e.g., lst[5])?',
      choices: [
        { id: 'a', text: 'O(n)' },
        { id: 'b', text: 'O(log n)' },
        { id: 'c', text: 'O(n²)' },
        { id: 'd', text: 'O(1)' },
      ],
      correctAnswer: 'd',
      explanation: 'List index access is O(1) — Python lists store elements at fixed memory offsets, so any index can be reached in constant time regardless of list length.',
    },
    {
      id: 'q1-3',
      type: 'multiple-choice',
      prompt: 'What is the complexity of two nested loops that each iterate n times?',
      choices: [
        { id: 'a', text: 'O(2n)' },
        { id: 'b', text: 'O(n)' },
        { id: 'c', text: 'O(n²)' },
        { id: 'd', text: 'O(log n)' },
      ],
      correctAnswer: 'c',
      explanation: 'Two nested loops each running n times multiply: n × n = n². This is O(n²) quadratic complexity. O(2n) simplifies to O(n), which would be wrong here.',
    },
    {
      id: 'q1-4',
      type: 'true-false',
      prompt: 'An O(n²) algorithm is always slower than an O(n) algorithm, regardless of input size.',
      correctAnswer: 'false',
      explanation: 'For very small n, an O(n²) algorithm with a tiny constant might be faster than an O(n) algorithm with a large constant. Big-O describes scaling behaviour, not absolute speed for small inputs.',
    },
    {
      id: 'q1-5',
      type: 'multiple-choice',
      prompt: 'What is the Big-O complexity of "x in my_list" when my_list is a Python list?',
      choices: [
        { id: 'a', text: 'O(1)' },
        { id: 'b', text: 'O(log n)' },
        { id: 'c', text: 'O(n)' },
        { id: 'd', text: 'O(n²)' },
      ],
      correctAnswer: 'c',
      explanation: 'Searching for a value in a Python list with "in" is O(n) — Python must check each element in order until it finds a match or reaches the end.',
    },
    {
      id: 'q1-6',
      type: 'fill-in-blank',
      prompt: 'An algorithm that halves its search space each step (like binary search) has O(_____) complexity.',
      correctAnswer: 'log n',
      explanation: 'When you halve the problem each step, you need at most log₂(n) steps to reduce it to size 1. This is O(log n) — logarithmic complexity.',
    },
    {
      id: 'q1-7',
      type: 'multiple-choice',
      prompt: 'Which Big-O complexity describes Python\'s list.append() operation?',
      choices: [
        { id: 'a', text: 'O(n) because the list might need to grow' },
        { id: 'b', text: 'O(1) amortised — fast on average across many calls' },
        { id: 'c', text: 'O(log n)' },
        { id: 'd', text: 'O(n²)' },
      ],
      correctAnswer: 'b',
      explanation: 'list.append() is O(1) amortised. Occasionally Python must resize the underlying array (O(n)), but this happens infrequently enough that the average cost per append is O(1).',
    },
    {
      id: 'q1-8',
      type: 'multiple-choice',
      prompt: 'What is the time complexity of list.insert(0, x) — inserting at the front of a list?',
      choices: [
        { id: 'a', text: 'O(1)' },
        { id: 'b', text: 'O(log n)' },
        { id: 'c', text: 'O(n)' },
        { id: 'd', text: 'O(n²)' },
      ],
      correctAnswer: 'c',
      explanation: 'Inserting at the front (index 0) requires every existing element to shift one position to the right. With n elements, that is O(n) shifts.',
    },
    {
      id: 'q1-9',
      type: 'true-false',
      prompt: 'Memoisation (caching computed results in a dict) is an example of a time-space trade-off.',
      correctAnswer: 'true',
      explanation: 'Memoisation uses extra memory (space) to avoid recomputing values (time). The classic example is Fibonacci: naive recursion is O(2^n) time; memoised is O(n) time at the cost of O(n) space.',
    },
    {
      id: 'q1-10',
      type: 'multiple-choice',
      prompt: 'You have an O(n²) algorithm that processes 1,000 items in 1 second. Roughly how long would it take for 10,000 items?',
      choices: [
        { id: 'a', text: '10 seconds' },
        { id: 'b', text: '100 seconds' },
        { id: 'c', text: '1,000 seconds' },
        { id: 'd', text: '10,000 seconds' },
      ],
      correctAnswer: 'b',
      explanation: 'O(n²): when n grows 10×, the time grows 10² = 100×. So 1 second × 100 = 100 seconds. This is why O(n²) algorithms are problematic for large inputs.',
    },
    {
      id: 'q1-11',
      type: 'multiple-choice',
      prompt: 'Which ordering correctly ranks these complexities from fastest to slowest growth?',
      choices: [
        { id: 'a', text: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n)' },
        { id: 'b', text: 'O(log n) < O(1) < O(n) < O(n²) < O(n log n) < O(2^n)' },
        { id: 'c', text: 'O(1) < O(n) < O(log n) < O(n log n) < O(n²) < O(2^n)' },
        { id: 'd', text: 'O(1) < O(log n) < O(n log n) < O(n) < O(2^n) < O(n²)' },
      ],
      correctAnswer: 'a',
      explanation: 'The correct ordering from slowest-growing to fastest-growing: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n). Memorise this — it is fundamental to algorithm analysis.',
    },
    {
      id: 'q1-12',
      type: 'code-challenge',
      language: 'python',
      prompt: "Write a function `count_pairs(lst)` that counts how many pairs of elements in lst sum to 0. E.g., [-1, 1, 2, -2, 3] has 2 pairs: (-1,1) and (2,-2). Your solution will be O(n²). Print the result for [-1, 1, 2, -2, 3].",
      starterCode: "def count_pairs(lst):\n    count = 0\n    # Use a nested loop\n    # Your code here\n    return count\n\nprint(count_pairs([-1, 1, 2, -2, 3]))",
      expectedOutput: "2",
      correctAnswer: '__code__',
      explanation: 'Use two nested loops: for i in range(len(lst)) and for j in range(i+1, len(lst)). Check if lst[i] + lst[j] == 0 and increment count. Starting j at i+1 avoids counting the same pair twice.',
    },
    {
      id: 'q1-13',
      type: 'code-challenge',
      language: 'python',
      prompt: "Write a function `find_duplicates(lst)` that returns a list of elements that appear more than once. Use a dictionary to achieve O(n) time. Print sorted result for [1, 2, 3, 2, 4, 3, 5].",
      starterCode: "def find_duplicates(lst):\n    # Use a dict to count occurrences\n    # Return list of items with count > 1\n    pass\n\nprint(sorted(find_duplicates([1, 2, 3, 2, 4, 3, 5])))",
      expectedOutput: "[2, 3]",
      correctAnswer: '__code__',
      explanation: 'Build a frequency dict with one loop: counts[item] = counts.get(item, 0) + 1. Then collect items where counts[item] > 1. Both loops are O(n), giving O(n) overall — far better than the O(n²) nested-loop approach.',
    },
  ],
};

export default module1;
