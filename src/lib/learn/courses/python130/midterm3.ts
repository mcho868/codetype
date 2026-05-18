import type { Module } from './types';

const midterm3: Module = {
  id: 'midterm-3',
  slug: 'midterm-3',
  title: 'Midterm Test 3',
  description: 'Covers Exceptions, Testing & Debugging, Big O, Sorting & Searching (no merge sort), Classes & OOP, and Stacks & Queues.',
  icon: '🎯',
  color: 'from-sky-500 to-blue-400',
  locked: true,
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
      prompt: 'Write `hot_potato(names, num)` using `collections.deque` to simulate the hot potato game (Note deque is a Stack). In each round: move the person at the front to the back `num` times (using `popleft` and `append`), then eliminate the person now at the front (`popleft`). Repeat until one person remains and return their name. Print `hot_potato(["Alice", "Bob", "Charlie", "Diana", "Eve"], 7)`.',
      starterCode: '',
      expectedOutput: 'Alice',
      correctAnswer: '__code__',
      explanation: 'from collections import deque. queue=deque(names). while len(queue)>1: for _ in range(num): queue.append(queue.popleft()); queue.popleft(). return queue[0]. With num=7: Charlie is eliminated first, then Bob, then Eve, then Diana — leaving Alice as the winner.',
    },
  ],
};

export default midterm3;
