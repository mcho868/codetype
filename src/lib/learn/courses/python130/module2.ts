import type { Module } from './types';
import { module2Questions } from './questions/module2Questions';


const module2: Module = {
  id: 'module-2',
  slug: '2',
  title: 'Sorting & Searching',
  description: 'Implement classic sorting and searching algorithms and understand their trade-offs.',
  icon: '🔢',
  color: 'from-blue-500 to-cyan-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-2-1',
      title: 'Linear & Binary Search',
      visualizer: ['linear-search', 'binary-search'] as const,
      content: `Searching is one of the most fundamental operations in computing. Given a collection of data, find a specific item. Two classic algorithms approach this very differently: **linear search** and **binary search**.

**Linear search** (also called sequential search) is the simplest possible approach: start at the beginning and check each element one by one until you find the target or exhaust the list. It requires no special setup — the list doesn't need to be sorted. Its time complexity is O(n): in the worst case (target is last or absent), you check every element. This is acceptable for small lists or when you only search once, but impractical for large, frequently-searched datasets.

**Binary search** is dramatically more efficient, but with one strict requirement: **the list must be sorted**. The algorithm works by elimination: compare the target to the middle element. If it matches, done. If the target is smaller, it must be in the left half — discard the right half entirely. If larger, discard the left half. Repeat on the remaining half. Each step eliminates half the remaining candidates, giving O(log n) time. For a list of 1,000,000 elements, binary search takes at most 20 comparisons — linear search might take 1,000,000.

The trade-off is clear: binary search is far faster, but only works on sorted data. If you search a list only once and it's unsorted, linear search may be fine. If you search repeatedly, it may be worth sorting first (O(n log n)) and then binary searching (O(log n) each time).

Python\'s standard library includes **bisect** module for binary search on sorted lists. \`bisect.bisect_left(lst, x)\` returns the position where x would be inserted to keep the list sorted — if x is already in the list, that's its index. This is a production-quality, well-tested binary search you can rely on.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Linear search: O(n) — no sorting required
def linear_search(lst, target):
    for i, item in enumerate(lst):
        if item == target:
            return i   # found at index i
    return -1          # not found

data = [34, 7, 23, 32, 5, 62]
print(linear_search(data, 23))   # 2
print(linear_search(data, 99))   # -1 (not found)

# Works on unsorted data — no problem!
# But in the worst case, checks all n elements`,
          caption: 'Linear search: simple, works anywhere, O(n)',
          editable: true,
        },
        {
          language: 'python',
          code: `# Binary search: O(log n) — list MUST be sorted
def binary_search(lst, target):
    low, high = 0, len(lst) - 1
    steps = 0
    while low <= high:
        steps += 1
        mid = (low + high) // 2
        if lst[mid] == target:
            print(f"Found in {steps} steps!")
            return mid
        elif lst[mid] < target:
            low = mid + 1    # target is in the right half
        else:
            high = mid - 1   # target is in the left half
    print(f"Not found after {steps} steps")
    return -1

sorted_data = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
binary_search(sorted_data, 23)   # in the middle
binary_search(sorted_data, 91)   # at the end
binary_search(sorted_data, 10)   # not present`,
          caption: 'Binary search: O(log n) but requires sorted data',
          editable: true,
        },
        {
          language: 'python',
          code: `# Python's built-in bisect for production binary search
import bisect

sorted_list = [1, 3, 5, 7, 9, 11, 13]

# bisect_left returns the insertion point
idx = bisect.bisect_left(sorted_list, 7)
if idx < len(sorted_list) and sorted_list[idx] == 7:
    print(f"Found 7 at index {idx}")
else:
    print("7 not found")

# Also works for sorted insertion
bisect.insort(sorted_list, 6)
print(sorted_list)  # [1, 3, 5, 6, 7, 9, 11, 13]`,
          caption: 'Python\'s bisect module: production-quality binary search',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-2-2',
      title: 'Selection Sort & Bubble Sort',
      visualizer: ['selection-sort', 'bubble-sort'] as const,
      content: `Sorting is the process of rearranging elements into order. There are dozens of sorting algorithms; understanding a few simple ones deeply is more valuable than skimming many. The simplest algorithms all share O(n²) time complexity — they are not used in production for large inputs, but they are excellent for learning algorithm design and the concept of invariants.

**Selection sort** works by finding the minimum element in the unsorted portion of the list and swapping it into its correct position. After the first pass, the smallest element is in position 0. After the second, the second-smallest is in position 1. The "sorted portion" grows from the left. It performs exactly n-1 swaps — always — making it ideal when swaps are expensive. Its comparison count is O(n²) regardless of the input (even a sorted list!), which is a disadvantage.

**Bubble sort** repeatedly walks through the list and swaps adjacent elements that are in the wrong order. After the first full pass, the largest element has "bubbled" to the last position. After the second pass, the second-largest is in its place, and so on. Bubble sort has an interesting best-case property: if the list is already sorted, an optimised version can detect this in O(n) — one pass with no swaps. In the worst case, it is O(n²).

Python uses a tuple-swap for exchanging two variables elegantly: \`a, b = b, a\`. No temporary variable needed. This works because the right side is evaluated first as a tuple (b, a), then unpacked into a and b simultaneously.

Python's built-in \`sorted()\` function and the \`.sort()\` method use **Timsort**, a sophisticated hybrid algorithm combining merge sort and insertion sort. Timsort is O(n log n) in all cases and O(n) on nearly-sorted data. It is far superior to any O(n²) algorithm for real use — the simple sorts here are purely educational.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Selection sort: O(n²) — always n(n-1)/2 comparisons
def selection_sort(lst):
    n = len(lst)
    for i in range(n):
        # Find the index of the minimum in the unsorted section
        min_idx = i
        for j in range(i + 1, n):
            if lst[j] < lst[min_idx]:
                min_idx = j
        # Swap the minimum into position i
        lst[i], lst[min_idx] = lst[min_idx], lst[i]
        print(f"Step {i+1}: {lst}")
    return lst

print(selection_sort([64, 25, 12, 22, 11]))`,
          caption: 'Selection sort: watch the minimum swap into place each step',
          editable: true,
        },
        {
          language: 'python',
          code: `# Bubble sort with early-termination optimisation
def bubble_sort(lst):
    n = len(lst)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):  # last i elements are already sorted
            if lst[j] > lst[j + 1]:
                lst[j], lst[j + 1] = lst[j + 1], lst[j]  # Python swap
                swapped = True
        if not swapped:
            print(f"Already sorted! Stopped after pass {i+1}")
            break
    return lst

print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))
print(bubble_sort([1, 2, 3, 4, 5]))  # triggers early exit`,
          caption: 'Bubble sort with early exit on already-sorted input',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-2-3',
      title: 'Insertion Sort',
      visualizer: 'insertion-sort' as const,
      content: `**Insertion sort** builds the sorted list one element at a time. Think of how you sort a hand of playing cards: you pick up one card and slot it into the correct position among the cards you're already holding. The sorted portion grows from the left, and each new element is inserted by shifting larger elements one position to the right to make room.

The algorithm maintains an **invariant**: at the start of each pass \`i\`, the elements \`lst[0..i-1]\` are already in sorted order. For each new element at index \`i\`, we compare it backwards through the sorted portion, shifting elements right until we find the correct insertion point.

**Time complexity**: O(n²) in the worst and average case (reverse-sorted input requires the most shifting). However, insertion sort has an excellent **best case of O(n)** — if the list is already sorted, each element just compares once to its left neighbour and no shifting is needed. This makes it the algorithm of choice for **nearly-sorted data**, which is why Python's Timsort uses insertion sort internally for small subarrays.

**Space complexity**: O(1) — it sorts in-place with no extra memory beyond a single \`key\` variable.

Compared to selection sort and bubble sort, insertion sort is generally faster in practice on small or nearly-sorted lists, and is also **stable** — equal elements keep their original relative order.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Insertion sort: O(n²) worst case, O(n) best case
def insertion_sort(lst):
    for i in range(1, len(lst)):
        key = lst[i]          # the element to insert
        j = i - 1
        # Shift elements that are greater than key one position right
        while j >= 0 and lst[j] > key:
            lst[j + 1] = lst[j]
            j -= 1
        lst[j + 1] = key      # insert key into its correct position
        print(f"Step {i}: {lst}")
    return lst

print(insertion_sort([5, 2, 4, 6, 1, 3]))`,
          caption: 'Insertion sort: each element is inserted into its correct position',
          editable: true,
        },
        {
          language: 'python',
          code: `# Best case: nearly-sorted input — very fast!
def insertion_sort(lst):
    comparisons = 0
    for i in range(1, len(lst)):
        key = lst[i]
        j = i - 1
        while j >= 0 and lst[j] > key:
            lst[j + 1] = lst[j]
            j -= 1
            comparisons += 1
        comparisons += 1  # final comparison that exits the while
        lst[j + 1] = key
    return lst, comparisons

sorted_result, c1 = insertion_sort([1, 2, 3, 4, 5])
print(f"Already sorted:  {sorted_result} — {c1} comparisons")

reversed_result, c2 = insertion_sort([5, 4, 3, 2, 1])
print(f"Reverse sorted:  {reversed_result} — {c2} comparisons")`,
          caption: 'Insertion sort is O(n) on already-sorted input — far fewer comparisons',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-2-4',
      title: 'Merge Sort (Divide & Conquer)',
      visualizer: 'merge-sort' as const,
      content: `**Note: Merge sort is not typically examined in COSC 130 — this is optional material for students who want to go deeper.**

**Merge sort** is an O(n log n) sorting algorithm that uses a strategy called **divide and conquer**: split the problem in half, solve each half recursively, then combine the results. It is guaranteed O(n log n) in all cases — best, average, and worst — unlike quicksort which has an O(n²) worst case.

The algorithm has two phases. **Divide**: if the list has 0 or 1 elements, it's already sorted (base case, return it). Otherwise, split it down the middle into a left half and right half, and recursively sort each. **Merge**: take two sorted halves and combine them into one sorted list by repeatedly picking the smaller of the two front elements.

The merge step is the heart of the algorithm. Imagine two sorted piles of cards face-up. You pick the smaller card from the front of either pile and place it on the result pile. You repeat until one pile is empty, then append the remaining pile. This linear merge pass is O(n). Since the recursion depth is O(log n) levels, and each level does O(n) total merging work, the overall complexity is O(n log n).

The trade-off compared to the O(n²) sorts: merge sort uses O(n) extra space for the temporary arrays created during merging. In practice, the massive time savings almost always outweigh this space cost.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Merge sort: O(n log n) time, O(n) space
def merge_sort(lst):
    if len(lst) <= 1:
        return lst          # base case: already sorted

    mid = len(lst) // 2
    left  = merge_sort(lst[:mid])   # recursively sort left half
    right = merge_sort(lst[mid:])   # recursively sort right half
    return merge(left, right)       # merge the two sorted halves

def merge(left, right):
    result = []
    i, j = 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    # Append any remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))`,
          caption: 'Merge sort: divide into halves, sort each, then merge',
          editable: true,
        },
        {
          language: 'python',
          code: `# Visualising the divide phase
def merge_sort_verbose(lst, depth=0):
    indent = "  " * depth
    print(f"{indent}merge_sort({lst})")
    if len(lst) <= 1:
        return lst

    mid = len(lst) // 2
    left  = merge_sort_verbose(lst[:mid],  depth + 1)
    right = merge_sort_verbose(lst[mid:],  depth + 1)
    merged = merge(left, right)
    print(f"{indent}=> merged: {merged}")
    return merged

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]

merge_sort_verbose([5, 2, 8, 1, 9])`,
          caption: 'Visualise the recursive divide-and-conquer tree',
          editable: true,
        },
      ],
    },
  ],
  questions: module2Questions,
};

export default module2;
