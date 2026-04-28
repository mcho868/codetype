import type { Module } from './types';

const midterm3: Module = {
  id: 'midterm-3',
  slug: 'midterm-3',
  title: 'Midterm Test 3',
  description: 'Covers Exceptions, Testing & Debugging, Big O, Sorting & Searching (no merge sort), Classes & OOP, and Stacks & Queues.',
  icon: '🎯',
  color: 'from-sky-500 to-blue-400',
  locked: false,
  isMidterm: true,
  lessons: [],
  questions: [
    // ── Exceptions MCQ (2) ────────────────────────────────────────────────
    {
      id: 'mt3-q1',
      type: 'multiple-choice',
      prompt: 'What is the output of the following code?\n\n```python\ndef divide(a, b):\n    try:\n        result = a / b\n    except ZeroDivisionError:\n        print("cannot divide by zero")\n        return None\n    finally:\n        print("cleaning up")\n    return result\n\nprint(divide(10, 2))\n```',
      choices: [
        { id: 'a', text: 'cleaning up\n5.0' },
        { id: 'b', text: '5.0' },
        { id: 'c', text: 'cannot divide by zero\ncleaning up\nNone' },
        { id: 'd', text: 'cleaning up\nNone' },
      ],
      correctAnswer: 'a',
      explanation: 'No exception is raised so the except block is skipped. The finally block always runs, printing "cleaning up". Then return result returns 5.0, which the outer print displays.',
    },
    {
      id: 'mt3-q2',
      type: 'multiple-choice',
      prompt: 'What exception is raised by the following code?\n\n```python\ndata = {"name": "Alice", "age": 30}\nprint(data["email"])\n```',
      choices: [
        { id: 'a', text: 'IndexError' },
        { id: 'b', text: 'ValueError' },
        { id: 'c', text: 'KeyError' },
        { id: 'd', text: 'AttributeError' },
      ],
      correctAnswer: 'c',
      explanation: 'Accessing a dictionary with a key that does not exist raises a KeyError. IndexError is for out-of-range list indices. ValueError is for wrong value types. AttributeError is for missing attributes on objects.',
    },

    // ── Big O MCQ (2) ─────────────────────────────────────────────────────
    {
      id: 'mt3-q5',
      type: 'multiple-choice',
      prompt: 'What is the time complexity of the following function?\n\n```python\ndef func(lst):\n    total = 0\n    for i in range(len(lst)):\n        for j in range(len(lst)):\n            total += lst[i] * lst[j]\n    return total\n```',
      choices: [
        { id: 'a', text: 'O(n)' },
        { id: 'b', text: 'O(n log n)' },
        { id: 'c', text: 'O(n²)' },
        { id: 'd', text: 'O(2ⁿ)' },
      ],
      correctAnswer: 'c',
      explanation: 'Two nested loops both running from 0 to n perform n × n = n² iterations in total. This is O(n²) quadratic time — typical of algorithms that examine every pair of elements.',
    },
    {
      id: 'mt3-q6',
      type: 'multiple-choice',
      prompt: 'An algorithm cuts the remaining problem in half at each step. Which Big-O class best describes its time complexity?',
      choices: [
        { id: 'a', text: 'O(1)' },
        { id: 'b', text: 'O(n)' },
        { id: 'c', text: 'O(n²)' },
        { id: 'd', text: 'O(log n)' },
      ],
      correctAnswer: 'd',
      explanation: 'Halving the problem at every step produces a depth of log₂(n) levels — classic O(log n) logarithmic complexity. Binary search is the canonical example: a list of 1,000,000 elements needs at most 20 steps.',
    },

    // ── Sorting & Searching MCQ (3) ───────────────────────────────────────
    {
      id: 'mt3-q3',
      type: 'multiple-choice',
      prompt: 'Which sorting algorithm has a best-case time complexity of O(n) when the list is already sorted?',
      choices: [
        { id: 'a', text: 'Selection sort' },
        { id: 'b', text: 'Insertion sort' },
        { id: 'c', text: 'Bubble sort without early-exit optimisation' },
        { id: 'd', text: 'Both B and C' },
      ],
      correctAnswer: 'b',
      explanation: 'Insertion sort is O(n) on already-sorted data — each element just compares once to its left neighbour and no shifting occurs. Selection sort is always O(n²) regardless of input. Bubble sort is only O(n) best-case when it has the early-exit (swapped flag) optimisation.',
    },
    {
      id: 'mt3-q4',
      type: 'multiple-choice',
      prompt: 'What is the key requirement for binary search to work correctly?',
      choices: [
        { id: 'a', text: 'The list must contain only integers' },
        { id: 'b', text: 'The list must be sorted' },
        { id: 'c', text: 'The list must have an even number of elements' },
        { id: 'd', text: 'The list must have no duplicate values' },
      ],
      correctAnswer: 'b',
      explanation: 'Binary search works by eliminating half the remaining elements at each step based on a comparison with the middle element. This logic is only valid when the data is sorted — on an unsorted list, discarding half the elements would miss the target.',
    },
    {
      id: 'mt3-q5a',
      type: 'multiple-choice',
      prompt: 'Which of the following correctly describes what bubble sort does in each pass?',
      choices: [
        { id: 'a', text: 'Finds the minimum and swaps it to the front' },
        { id: 'b', text: 'Inserts the next element into its correct position among sorted elements' },
        { id: 'c', text: 'Swaps adjacent elements that are out of order, bubbling the largest to the end' },
        { id: 'd', text: 'Splits the list in half and sorts each half recursively' },
      ],
      correctAnswer: 'c',
      explanation: 'Bubble sort walks through the list swapping adjacent pairs that are in the wrong order. After each full pass, the next-largest unsorted element "bubbles up" to its correct position at the end of the unsorted section.',
    },

    // ── Sorting & Searching True/False (2) ────────────────────────────────
    {
      id: 'mt3-q5b',
      type: 'true-false',
      prompt: 'Selection sort always performs exactly n−1 swaps regardless of the input.',
      correctAnswer: 'true',
      explanation: 'Selection sort does exactly one swap per pass (swapping the minimum into position i). With n elements there are n passes, giving exactly n−1 swaps. This makes it efficient when swaps are expensive, even though its comparison count is always O(n²).',
    },
    {
      id: 'mt3-q5c',
      type: 'true-false',
      prompt: 'Linear search requires the list to be sorted before it can be used.',
      correctAnswer: 'false',
      explanation: 'Linear search scans each element one by one from start to finish — it works on any list, sorted or not. Binary search is the algorithm that requires sorted data.',
    },

    // ── Sorting & Searching Code Challenges (2) ────────────────────────────
    {
      id: 'mt3-q7',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Write a function `find_kth_smallest(lst, k)` that uses selection sort logic to find and return the k-th smallest element (1-indexed). Do not use Python\'s built-in `sort` or `sorted`. Print `find_kth_smallest([7, 2, 9, 4, 1, 5], 3)` and `find_kth_smallest([10, 40, 20, 30], 2)`.',
      starterCode: '',
      expectedOutput: '4\n20',
      correctAnswer: '__code__',
      explanation: 'Copy the list. Run k passes of selection sort: each pass finds the minimum of arr[i:] and swaps it into position i. After k passes, arr[k-1] holds the k-th smallest. [7,2,9,4,1,5] sorted → [1,2,4,5,7,9], k=3 → 4. [10,40,20,30] sorted → [10,20,30,40], k=2 → 20.',
    },
    {
      id: 'mt3-q8',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Write a recursive function `binary_search_recursive(lst, target, low=0, high=None)` that returns the index of `target` in the sorted list, or `-1` if not found. On the first call `high` should default to `len(lst) - 1`. Print `binary_search_recursive([2, 5, 8, 12, 16, 23, 38, 56], 23)` and `binary_search_recursive([2, 5, 8, 12, 16, 23, 38, 56], 15)`.',
      starterCode: '',
      expectedOutput: '5\n-1',
      correctAnswer: '__code__',
      explanation: 'Base case: if low > high return -1. Compute mid = (low+high)//2. If lst[mid]==target return mid. If lst[mid]<target recurse with low=mid+1. Else recurse with high=mid-1. For 23 in the list: mid lands on index 5 (value 23) → return 5. For 15: search narrows until low>high → -1.',
    },

    // ── Sorting & Searching Code Challenges — Extra (4) ──────────────────
    {
      id: 'mt3-q7b',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Write `count_passes(lst)` that runs bubble sort on a copy of the list and returns how many passes were needed before it was fully sorted (use the early-exit optimisation — stop as soon as a pass makes no swaps). Print `count_passes([3, 1, 2])` and `count_passes([1, 2, 3, 4])`.',
      starterCode: '',
      expectedOutput: '2\n1',
      correctAnswer: '__code__',
      explanation: 'arr = lst[:]. passes = 0. while True: swapped = False. for j in range(len(arr)-1-passes): if arr[j]>arr[j+1]: swap and set swapped=True. passes += 1. if not swapped: break. return passes. passes increments before the break check, so every iteration counts. [3,1,2] needs 2 passes. [1,2,3,4] is already sorted — the first pass makes no swaps but passes is still incremented to 1 before breaking.',
    },
    {
      id: 'mt3-q7c',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Write `insertion_sort_descending(lst)` that sorts a copy of the list in descending order using insertion sort (largest first) and returns it. Do not use `sort`, `sorted`, or `reverse`. Print `insertion_sort_descending([3, 1, 4, 1, 5, 9, 2, 6])`.',
      starterCode: '',
      expectedOutput: '[9, 6, 5, 4, 3, 2, 1, 1]',
      correctAnswer: '__code__',
      explanation: 'arr = lst[:]. for i in range(1, len(arr)): key = arr[i]; j = i-1. Change the condition to arr[j] < key (shift smaller elements right instead of larger ones). while j>=0 and arr[j]<key: arr[j+1]=arr[j]; j-=1. arr[j+1]=key. return arr.',
    },
    {
      id: 'mt3-q7d',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Write `search_rotated(lst, target)` that uses linear search to find `target` in a list and returns its index, or `-1` if not found. The list may or may not be sorted — do not assume order. Print `search_rotated([4, 5, 6, 7, 0, 1, 2], 0)` and `search_rotated([4, 5, 6, 7, 0, 1, 2], 3)`.',
      starterCode: '',
      expectedOutput: '4\n-1',
      correctAnswer: '__code__',
      explanation: 'def search_rotated(lst, target): for i, val in enumerate(lst): if val == target: return i. return -1. Linear search works on any unsorted or rotated list — just scan each element. 0 is at index 4; 3 is not present so return -1.',
    },
    {
      id: 'mt3-q7e',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Write `median_of_three(a, b, c)` that returns the median value of three numbers using only comparisons and swaps — no sorting functions, no list. Then print `median_of_three(3, 1, 2)` and `median_of_three(9, 5, 7)`.',
      starterCode: '',
      expectedOutput: '2\n7',
      correctAnswer: '__code__',
      explanation: 'Sort three variables with at most 3 comparisons (selection/insertion logic on variables): if a > b: a, b = b, a. if b > c: b, c = c, b. if a > b: a, b = b, a. Now a <= b <= c, so b is the median. return b. median(3,1,2)→2, median(9,5,7)→7.',
    },

    // ── Classes & OOP Code Challenges (2) ────────────────────────────────
    {
      id: 'mt3-q9',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Create a `Student` class with `__init__(self, name)` that sets `self.name` and `self.grades = []`. Add `add_grade(g)` to append a grade, `average()` that returns the mean (or `0` if no grades), and `__str__` returning `"Name - avg: X.X"` (average rounded to 1 decimal place). Create student `"Alice"`, add grades `85`, `92`, `78`, then print the student object.',
      starterCode: '',
      expectedOutput: 'Alice - avg: 85.0',
      correctAnswer: '__code__',
      explanation: 'add_grade: self.grades.append(g). average: return sum(self.grades)/len(self.grades) if self.grades else 0. __str__: return f"{self.name} - avg: {round(self.average(), 1)}". (85+92+78)/3 = 85.0.',
    },
    {
      id: 'mt3-q10',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Create a `Vehicle` base class with `__init__(self, make, model)` and a `describe()` method returning `"make model"`. Create `ElectricVehicle(Vehicle)` with `__init__(self, make, model, battery_kwh)` (call super().__init__) and override `describe()` to return `"make model (Electric, battery_kwh kWh)"`. Create `Vehicle("Toyota", "Camry")` and `ElectricVehicle("Tesla", "Model 3", 75)`, then print each object\'s `describe()` result.',
      starterCode: '',
      expectedOutput: 'Toyota Camry\nTesla Model 3 (Electric, 75 kWh)',
      correctAnswer: '__code__',
      explanation: 'Vehicle.describe returns f"{self.make} {self.model}". ElectricVehicle.__init__ stores battery_kwh after calling super(). ElectricVehicle.describe returns f"{self.make} {self.model} (Electric, {self.battery_kwh} kWh)". This demonstrates inheritance and method overriding (polymorphism).',
    },

    // ── Stacks & Queues Code Challenges (2) ──────────────────────────────
    {
      id: 'mt3-q11',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Write `decimal_to_binary(n)` using a stack (Python list). Repeatedly push the remainder of `n % 2` onto the stack and floor-divide `n` by 2 until `n` is 0. Then pop all items to build and return the binary string. Print `decimal_to_binary(10)` and `decimal_to_binary(255)`.',
      starterCode: '',
      expectedOutput: '1010\n11111111',
      correctAnswer: '__code__',
      explanation: 'stack=[]. while n>0: stack.append(n%2); n//=2. result="". while stack: result+=str(stack.pop()). return result. The LIFO order of the stack naturally reverses the remainders into the correct binary representation. 10 → "1010", 255 → "11111111".',
    },
    {
      id: 'mt3-q12',
      type: 'code-challenge',
      language: 'python',
      prompt: 'Write `hot_potato(names, num)` using `collections.deque` to simulate the hot potato game. In each round: move the person at the front to the back `num` times (using `popleft` and `append`), then eliminate the person now at the front (`popleft`). Repeat until one person remains and return their name. Print `hot_potato(["Alice", "Bob", "Charlie", "Diana", "Eve"], 7)`.',
      starterCode: '',
      expectedOutput: 'Alice',
      correctAnswer: '__code__',
      explanation: 'from collections import deque. queue=deque(names). while len(queue)>1: for _ in range(num): queue.append(queue.popleft()); queue.popleft(). return queue[0]. With num=7: Charlie is eliminated first, then Bob, then Eve, then Diana — leaving Alice as the winner.',
    },
  ],
};

export default midterm3;
