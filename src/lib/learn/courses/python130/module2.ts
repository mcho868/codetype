import type { Module } from './types';

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
      content: `Searching is one of the most fundamental operations in computing. Given a collection of data, find a specific item. Two classic algorithms approach this very differently: **linear search** and **binary search**.

**Linear search** (also called sequential search) is the simplest possible approach: start at the beginning and check each element one by one until you find the target or exhaust the list. It requires no special setup — the list doesn't need to be sorted. Its time complexity is O(n): in the worst case (target is last or absent), you check every element. This is acceptable for small lists or when you only search once, but impractical for large, frequently-searched datasets.

**Binary search** is dramatically more efficient, but with one strict requirement: **the list must be sorted**. The algorithm works by elimination: compare the target to the middle element. If it matches, done. If the target is smaller, it must be in the left half — discard the right half entirely. If larger, discard the left half. Repeat on the remaining half. Each step eliminates half the remaining candidates, giving O(log n) time. For a list of 1,000,000 elements, binary search takes at most 20 comparisons — linear search might take 1,000,000.

The trade-off is clear: binary search is far faster, but only works on sorted data. If you search a list only once and it's unsorted, linear search may be fine. If you search repeatedly, it may be worth sorting first (O(n log n)) and then binary searching (O(log n) each time).

Python's standard library includes **bisect** module for binary search on sorted lists. \`bisect.bisect_left(lst, x)\` returns the position where x would be inserted to keep the list sorted — if x is already in the list, that's its index. This is a production-quality, well-tested binary search you can rely on.`,
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
      title: 'Merge Sort (Divide & Conquer)',
      content: `**Merge sort** is the first O(n log n) sorting algorithm you'll implement. It uses a powerful strategy called **divide and conquer**: split the problem in half, solve each half recursively, then combine the results. It is guaranteed O(n log n) in all cases — best, average, and worst — unlike quicksort which has an O(n²) worst case.

The algorithm has two phases. **Divide**: if the list has 0 or 1 elements, it's already sorted (base case, return it). Otherwise, split it down the middle into a left half and right half, and recursively sort each. **Merge**: take two sorted halves and combine them into one sorted list by repeatedly picking the smaller of the two front elements.

The merge step is the heart of the algorithm. Imagine two sorted piles of cards face-up. You pick the smaller card from the front of either pile and place it on the result pile. You repeat until one pile is empty, then append the remaining pile. This linear merge pass is O(n). Since the recursion depth is O(log n) levels, and each level does O(n) total merging work, the overall complexity is O(n log n).

The trade-off compared to selection/bubble sort: merge sort uses O(n) extra space for the temporary arrays created during merging. This is its main disadvantage — if memory is extremely limited, an in-place O(n²) algorithm might be preferred. In practice, the massive time savings of O(n log n) almost always outweigh the O(n) space cost.

Understanding merge sort also builds intuition for **recursion** on collections and **invariants** — merge sort's invariant is "I trust that the recursive calls return sorted lists." Writing recursive algorithms requires trusting the recursion to work correctly on smaller inputs; you only need to handle the current step correctly.`,
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
  questions: [
    {
      id: 'q2-1',
      type: 'multiple-choice',
      prompt: 'What is the time complexity of linear search in the worst case?',
      choices: [
        { id: 'a', text: 'O(1)' },
        { id: 'b', text: 'O(log n)' },
        { id: 'c', text: 'O(n)' },
        { id: 'd', text: 'O(n²)' },
      ],
      correctAnswer: 'c',
      explanation: 'Linear search checks each element one by one. In the worst case (target is last or absent), it examines all n elements, giving O(n) time.',
    },
    {
      id: 'q2-2',
      type: 'true-false',
      prompt: 'Binary search can be used on an unsorted list as long as you check every element.',
      correctAnswer: 'false',
      explanation: 'Binary search requires the list to be sorted. It works by eliminating half the remaining elements each step based on a comparison with the middle — this logic is only correct when the data is in order.',
    },
    {
      id: 'q2-3',
      type: 'multiple-choice',
      prompt: 'A sorted list has 1,024 elements. What is the maximum number of comparisons binary search needs to find any target?',
      choices: [
        { id: 'a', text: '512' },
        { id: 'b', text: '1024' },
        { id: 'c', text: '10' },
        { id: 'd', text: '32' },
      ],
      correctAnswer: 'c',
      explanation: 'Binary search on n elements takes at most log₂(n) comparisons. log₂(1024) = 10. So even a list of 1,024 elements only requires 10 comparisons — compared to up to 1,024 for linear search.',
    },
    {
      id: 'q2-4',
      type: 'multiple-choice',
      prompt: 'In selection sort, what does each pass through the unsorted portion accomplish?',
      choices: [
        { id: 'a', text: 'It swaps every adjacent pair that is out of order' },
        { id: 'b', text: 'It finds the minimum element and swaps it to the correct position' },
        { id: 'c', text: 'It splits the list into two sorted halves' },
        { id: 'd', text: 'It removes duplicate elements' },
      ],
      correctAnswer: 'b',
      explanation: 'Selection sort scans the unsorted portion to find the minimum element, then swaps it to the front of the unsorted section. This grows the sorted portion by one element per pass.',
    },
    {
      id: 'q2-5',
      type: 'fill-in-blank',
      prompt: 'In Python, to swap the values of variables a and b without a temp variable, you write: a, b = ___',
      correctAnswer: 'b, a',
      explanation: 'Python\'s tuple assignment evaluates the right side first (b, a) as a tuple, then unpacks it into a and b simultaneously. This cleanly swaps the values in one line.',
    },
    {
      id: 'q2-6',
      type: 'multiple-choice',
      prompt: 'What is the time complexity of bubble sort in the best case (already sorted list) with the early-exit optimisation?',
      choices: [
        { id: 'a', text: 'O(n²) — always' },
        { id: 'b', text: 'O(n log n)' },
        { id: 'c', text: 'O(n)' },
        { id: 'd', text: 'O(1)' },
      ],
      correctAnswer: 'c',
      explanation: 'With the optimisation that stops if no swaps occurred in a pass, bubble sort on an already-sorted list does only one pass (n-1 comparisons, 0 swaps) and terminates — O(n) best case.',
    },
    {
      id: 'q2-7',
      type: 'true-false',
      prompt: 'Merge sort uses O(n) extra space because it creates new lists during the merge step.',
      correctAnswer: 'true',
      explanation: 'Merge sort is not in-place. The merge function allocates a new list to hold the merged result. Across all levels of recursion, the total extra space is O(n).',
    },
    {
      id: 'q2-8',
      type: 'multiple-choice',
      prompt: 'What is the time complexity of merge sort?',
      choices: [
        { id: 'a', text: 'O(n) in all cases' },
        { id: 'b', text: 'O(n log n) in all cases' },
        { id: 'c', text: 'O(n²) worst case, O(n log n) average' },
        { id: 'd', text: 'O(log n) in all cases' },
      ],
      correctAnswer: 'b',
      explanation: 'Merge sort is O(n log n) in all cases — best, average, and worst. There is no bad input that degrades its performance, unlike quicksort which can be O(n²) in the worst case.',
    },
    {
      id: 'q2-9',
      type: 'multiple-choice',
      prompt: 'You have a large dataset that you will search thousands of times. Which approach is most efficient overall?',
      choices: [
        { id: 'a', text: 'Linear search every time — no setup needed' },
        { id: 'b', text: 'Sort once with merge sort (O(n log n)), then binary search each time (O(log n))' },
        { id: 'c', text: 'Sort with selection sort (O(n²)), then binary search' },
        { id: 'd', text: 'Linear search the first time, binary search after' },
      ],
      correctAnswer: 'b',
      explanation: 'Pay O(n log n) once to sort with an efficient algorithm, then every subsequent search is O(log n). Thousands of O(log n) searches are far cheaper than thousands of O(n) linear searches.',
    },
    {
      id: 'q2-10',
      type: 'multiple-choice',
      prompt: 'In merge sort, what is the base case that stops the recursion?',
      choices: [
        { id: 'a', text: 'When the list has exactly 2 elements' },
        { id: 'b', text: 'When the list has 0 or 1 elements — it is already sorted' },
        { id: 'c', text: 'When all elements are in order' },
        { id: 'd', text: 'When the recursion depth exceeds 10' },
      ],
      correctAnswer: 'b',
      explanation: 'A list with 0 or 1 elements is trivially sorted — there is nothing to do. This is the base case that stops merge sort\'s recursion.',
    },
    {
      id: 'q2-11',
      type: 'true-false',
      prompt: 'Selection sort performs fewer swaps than bubble sort in the worst case.',
      correctAnswer: 'true',
      explanation: 'Selection sort does exactly n-1 swaps total — one per pass. Bubble sort can do up to n(n-1)/2 swaps in the worst case. This makes selection sort better when swaps are expensive (e.g., writing to disk).',
    },
    {
      id: 'q2-12',
      type: 'code-challenge',
      language: 'python',
      prompt: "Implement binary search. Write `binary_search(lst, target)` that returns the index of target in sorted list lst, or -1 if not found. Test: binary_search([1,3,5,7,9,11], 7) and binary_search([1,3,5,7,9,11], 4).",
      starterCode: "def binary_search(lst, target):\n    low = 0\n    high = len(lst) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        # Compare lst[mid] with target\n        # Your code here\n        pass\n    return -1\n\nprint(binary_search([1,3,5,7,9,11], 7))\nprint(binary_search([1,3,5,7,9,11], 4))",
      expectedOutput: "3\n-1",
      correctAnswer: '__code__',
      explanation: 'If lst[mid] == target return mid. If lst[mid] < target set low = mid + 1 (search right half). If lst[mid] > target set high = mid - 1 (search left half). Loop ends when low > high — target not found.',
    },
    {
      id: 'q2-13',
      type: 'code-challenge',
      language: 'python',
      prompt: "Implement selection sort. Write `selection_sort(lst)` that sorts the list in-place and returns it. Find the minimum of the unsorted portion and swap it into place. Test with [64, 25, 12, 22, 11].",
      starterCode: "def selection_sort(lst):\n    n = len(lst)\n    for i in range(n):\n        # Find index of minimum in lst[i:]\n        min_idx = i\n        for j in range(i + 1, n):\n            # Your code here\n            pass\n        lst[i], lst[min_idx] = lst[min_idx], lst[i]\n    return lst\n\nprint(selection_sort([64, 25, 12, 22, 11]))",
      expectedOutput: "[11, 12, 22, 25, 64]",
      correctAnswer: '__code__',
      explanation: 'In the inner loop, update min_idx whenever lst[j] < lst[min_idx]. After the inner loop, swap lst[i] with lst[min_idx]. This places the smallest unsorted element at position i each pass.',
    },
  ],
};

export default module2;
