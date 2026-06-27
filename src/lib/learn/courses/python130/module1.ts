import type { Module } from './types';
import { module1Questions } from './questions/module1Questions';


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

For nested loops, multiply the complexities: an outer loop running n times with an inner loop running m times is O(n×m). If both loops go to n, it\’s O(n²). If the inner loop goes to n but starts at i (the outer index), it's O(n²/2) which is still O(n²) after dropping the constant.

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
          code: `# List vs set for membership: a huge practical difference
import time

data_list = list(range(100000))
data_set  = set(range(100000))

target = 99999  # worst case: near the end

# O(n) list search
start = time.perf_counter()
for _ in range(1000):
    result = target in data_list
list_time = time.perf_counter() - start

# O(1) set search
start = time.perf_counter()
for _ in range(1000):
    result = target in data_set
set_time = time.perf_counter() - start

print(f"List lookup: {list_time:.4f}s")
print(f"Set  lookup: {set_time:.4f}s")
if set_time > 0:
    print(f"Set is ~{list_time / set_time:.0f}x faster")
else:
    print("Set lookup was too fast to measure precisely")`,
          caption: 'O(n) list membership vs O(1) set membership — measured difference',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-1-3',
      title: 'Space Complexity & Trade-offs',
      content: `Time complexity is only half the story. **Space complexity** measures how much **extra memory** an algorithm uses as the input grows. Some operations are fast because they allocate extra storage; others save memory by modifying data in place.

Space complexity uses the same Big-O notation. If an algorithm only needs a few variables no matter how large the input gets, that is **O(1) space**. If it builds a new list, set, or dictionary that grows with the input, that is usually **O(n) space**.

A very practical trade-off in Python is **using extra memory to speed up lookup**. Checking \`x in my_list\` is O(n), because Python may need to scan the whole list. But if you convert the data to a set first, \`x in my_set\` is O(1) average case. The cost is that the set itself takes extra memory. This is often a good trade when you need many lookups.

Another common example is copying a list versus updating it in place. Making \`new_list = old_list[:]\` uses O(n) extra space because it creates a second list of the same size. Updating elements inside the original list can often be done in O(1) extra space.

**Best, worst, and average case** analysis gives a fuller picture of an algorithm\'s behaviour. For example, searching a list for a target: the best case is O(1) if it's the first element; the worst case is O(n) if it\'s the last or absent. We usually focus on worst-case because it\'s a guarantee — your program will never be slower than that.

The key habit is practical: when a program feels slow, ask both questions. How many operations is it doing? And how much extra memory is it allocating? Good algorithm design is usually about choosing the right balance for the job.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Time-space trade-off: use extra memory for faster membership checks
import time

data_list = list(range(100000))
data_set = set(data_list)  # extra memory: O(n) space

target = 99999

start = time.perf_counter()
print(target in data_list)   # O(n) time, O(1) extra space
print(f"List lookup: {time.perf_counter() - start:.6f}s")

start = time.perf_counter()
print(target in data_set)    # O(1) average time, but set uses extra memory
print(f"Set lookup:  {time.perf_counter() - start:.6f}s")`,
          caption: 'A set uses extra memory, but repeated membership checks become much faster',
          editable: true,
        },
        {
          language: 'python',
          code: `# O(1) extra space vs O(n) extra space
def double_in_place(numbers):
    for i in range(len(numbers)):
        numbers[i] = numbers[i] * 2   # modifies original list
    return numbers

def doubled_copy(numbers):
    result = []
    for num in numbers:
        result.append(num * 2)        # builds a new list
    return result

data = [1, 2, 3, 4]
print(double_in_place(data[:]))   # O(1) extra space
print(doubled_copy(data))         # O(n) extra space`,
          caption: 'Updating in place uses constant extra space; building a new list uses linear extra space',
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
  questions: module1Questions,
};

export default module1;
