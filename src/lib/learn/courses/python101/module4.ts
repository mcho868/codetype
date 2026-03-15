import type { Module } from './types';

const module4: Module = {
  id: 'module-4',
  slug: '4',
  title: 'Lists',
  description: 'Master Python lists: methods, operations, 2D lists, and comprehensions.',
  icon: '📋',
  color: 'from-red-500 to-pink-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-4-1',
      title: 'Creating Lists & Indexing',
      content: `A list is an ordered, mutable collection that can hold any mix of data types.

- Created with square brackets '[]'
- Indexed like strings: positive (0 from left) and negative (-1 from right)
- Unlike strings, lists can be modified after creation`,
      codeExamples: [
        {
          language: 'python',
          code: `# Creating lists
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14, None]
empty = []

# Indexing
fruits = ["apple", "banana", "cherry"]
print(fruits[0])   # apple
print(fruits[2])   # cherry
print(fruits[-1])  # cherry (last)
print(fruits[-2])  # banana (second to last)

# Slicing works the same as strings
print(fruits[0:2]) # ['apple', 'banana']
print(fruits[::-1])# ['cherry', 'banana', 'apple']`,
          caption: 'Creating lists and accessing elements',
        },
      ],
    },
    {
      id: 'lesson-4-2',
      title: 'List Methods',
      content: `Lists have powerful built-in methods for adding, removing, and rearranging elements:

**Adding elements:**
- 'append(x)': adds x to the end
- 'insert(i, x)': inserts x at index i
- 'extend(iterable)': adds all items from another iterable

**Removing elements:**
- 'remove(x)': removes first occurrence of x (raises error if not found)
- 'pop(i)': removes and returns element at index i (default: last element)

**Ordering:**
- 'sort()': sorts in-place (modifies the original list)
- 'reverse()': reverses in-place

**Searching:**
- 'count(x)': counts occurrences of x
- 'index(x)': returns index of first x`,
      codeExamples: [
        {
          language: 'python',
          code: `nums = [3, 1, 4, 1, 5]

# Adding
nums.append(9)         # [3, 1, 4, 1, 5, 9]
nums.insert(0, 0)      # [0, 3, 1, 4, 1, 5, 9]
nums.extend([7, 8])    # [0, 3, 1, 4, 1, 5, 9, 7, 8]
print(nums)

# Removing
nums.remove(1)         # removes first 1
second = nums.pop(1)   # removes element at index 1, returns it
print(second)          # 3
last = nums.pop()      # removes last element, returns it
print(last)            # 8

nums.clear()           # removes everything
print(nums)            # []

# Sorting
data = [3, 1, 4, 1, 5]
data.sort()
print(data)            # [1, 1, 3, 4, 5]

data.reverse()
print(data)            # [5, 4, 3, 1, 1]

# Searching
values = [10, 20, 10, 30]
print(values.count(10))  # 2
print(values.index(20))  # 1`,
          caption: 'Common list methods',
        },
      ],
    },
    {
      id: 'lesson-4-3',
      title: 'List Operations',
      content: `Lists support several operators:

- **+** (concatenation): combines two lists into a new list
- **\\*** (repetition): repeats a list n times
- **in**: checks if an element exists in the list

Python also has two useful built-in functions for lists:

- **sorted(lst)**: returns a new sorted list without modifying the original (unlike '.sort()' which changes in place)
- **set(lst)**: converts a list to a set — a collection with no duplicates. Useful for removing repeated values. Wrap with 'sorted()' or 'list()' to convert back.`,
      codeExamples: [
        {
          language: 'python',
          code: `a = [1, 2, 3]
b = [4, 5, 6]

# Concatenation
c = a + b
print(c)        # [1, 2, 3, 4, 5, 6]

# Repetition
d = [0] * 5
print(d)        # [0, 0, 0, 0, 0]

# Membership
print(3 in a)   # True
print(7 in a)   # False

# Length
print(len(c))   # 6

# sorted() — returns a new sorted list, original unchanged
nums = [3, 1, 4, 1, 5]
print(sorted(nums))   # [1, 1, 3, 4, 5]
print(nums)           # [3, 1, 4, 1, 5]  (unchanged!)

# set() — removes duplicates
dupes = [1, 2, 2, 3, 3, 3]
unique = sorted(set(dupes))
print(unique)         # [1, 2, 3]`,
          caption: 'List operators: +, *, in, sorted(), set()',
        },
      ],
    },
    {
      id: 'lesson-4-4',
      title: '2D Lists',
      content: `A 2D list is a list of lists — useful for grids, matrices, and tables.

Access elements with two indices: 'grid[row][col]'`,
      codeExamples: [
        {
          language: 'python',
          code: `# 3x3 grid
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Access elements: [row][col]
print(grid[0][0])  # 1 (top-left)
print(grid[1][1])  # 5 (center)
print(grid[2][2])  # 9 (bottom-right)

# Modify an element
grid[0][0] = 99
print(grid[0])     # [99, 2, 3]

# Iterate over a 2D list
for row in grid:
    for val in row:
        print(val, end=" ")
    print()  # newline after each row
# 99 2 3
# 4 5 6
# 7 8 9`,
          caption: '2D lists for grids and matrices',
        },
      ],
    },
    {
      id: 'lesson-4-5',
      title: 'List Comprehensions',
      content: `List comprehensions are a concise way to create lists from other iterables.

**Syntax**: '[expression for variable in iterable if condition]'

The 'if condition' part is optional — it filters which items are included.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Basic comprehension
squares = [x ** 2 for x in range(5)]
print(squares)   # [0, 1, 4, 9, 16]

# With condition (filter)
evens = [x for x in range(10) if x % 2 == 0]
print(evens)     # [0, 2, 4, 6, 8]

# Transform a list
words = ["hello", "world", "python"]
upper = [w.upper() for w in words]
print(upper)     # ['HELLO', 'WORLD', 'PYTHON']

# Nested comprehension (flatten a 2D list)
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [val for row in matrix for val in row]
print(flat)      # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Equivalent using a for loop (same result):
result = []
for x in range(5):
    result.append(x ** 2)`,
          caption: 'List comprehension syntax and examples',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q4-1',
      type: 'multiple-choice',
      prompt: 'After `lst = [1, 2, 3]` and `lst.append(4)`, what is `lst`?',
      choices: [
        { id: 'a', text: '[4, 1, 2, 3]' },
        { id: 'b', text: '[1, 2, 3, 4]' },
        { id: 'c', text: '[1, 2, 4, 3]' },
        { id: 'd', text: '[1, 2, 3]' },
      ],
      correctAnswer: 'b',
      explanation: 'append() adds the element to the end of the list.',
    },
    {
      id: 'q4-2',
      type: 'fill-in-blank',
      prompt: '`lst = [3, 1, 2]` then `lst.______()` makes it `[1, 2, 3]`. What method fills the blank?',
      correctAnswer: 'sort',
      explanation: 'sort() sorts the list in ascending order in-place.',
    },
    {
      id: 'q4-3',
      type: 'multiple-choice',
      prompt: 'What does `[x*2 for x in range(3)]` produce?',
      choices: [
        { id: 'a', text: '[1, 2, 3]' },
        { id: 'b', text: '[2, 4, 6]' },
        { id: 'c', text: '[0, 2, 4]' },
        { id: 'd', text: '[0, 1, 2]' },
      ],
      correctAnswer: 'c',
      explanation: 'range(3) gives 0, 1, 2. Multiplied by 2: 0*2=0, 1*2=2, 2*2=4 → [0, 2, 4].',
    },
    {
      id: 'q4-4',
      type: 'true-false',
      prompt: '`lst.pop()` removes and returns the last element of the list.',
      correctAnswer: 'true',
      explanation: 'pop() with no argument removes and returns the last element. pop(i) removes element at index i.',
    },
    {
      id: 'q4-5',
      type: 'multiple-choice',
      prompt: 'Given `grid = [[1,2],[3,4]]`, what is `grid[1][0]`?',
      choices: [
        { id: 'a', text: '1' },
        { id: 'b', text: '2' },
        { id: 'c', text: '3' },
        { id: 'd', text: '4' },
      ],
      correctAnswer: 'c',
      explanation: 'grid[1] is the second row [3,4], and [0] picks the first element: 3.',
    },
    {
      id: 'q4-6',
      type: 'multiple-choice',
      prompt: 'What does `[1, 2, 3] + [4, 5]` produce?',
      choices: [
        { id: 'a', text: '[1, 2, 3, 4, 5]' },
        { id: 'b', text: '[5, 7]' },
        { id: 'c', text: 'Error' },
        { id: 'd', text: '[[1,2,3],[4,5]]' },
      ],
      correctAnswer: 'a',
      explanation: 'The + operator concatenates two lists, joining them end to end.',
    },
    {
      id: 'q4-7',
      type: 'fill-in-blank',
      prompt: 'To remove the value 5 from `lst = [1, 5, 3]`, you write `lst.______(5)`. What method fills the blank?',
      correctAnswer: 'remove',
      explanation: 'remove(value) removes the first occurrence of the value from the list.',
    },
    {
      id: 'q4-8',
      type: 'true-false',
      prompt: '`3 in [1, 2, 3, 4]` returns True.',
      correctAnswer: 'true',
      explanation: 'The "in" operator checks membership. 3 is in the list, so it returns True.',
    },
    {
      id: 'q4-9',
      type: 'multiple-choice',
      prompt: 'What does `sorted([3, 1, 2])` return?',
      choices: [
        { id: 'a', text: '[3, 1, 2]  (unchanged)' },
        { id: 'b', text: '[1, 2, 3]' },
        { id: 'c', text: '[3, 2, 1]' },
        { id: 'd', text: 'None' },
      ],
      correctAnswer: 'b',
      explanation: 'sorted() returns a new sorted list without modifying the original. sort() modifies in-place and returns None.',
    },
    {
      id: 'q4-10',
      type: 'multiple-choice',
      prompt: 'What does `len([[], [], []])` return?',
      choices: [
        { id: 'a', text: '0' },
        { id: 'b', text: '3' },
        { id: 'c', text: 'Error' },
        { id: 'd', text: '9' },
      ],
      correctAnswer: 'b',
      explanation: 'len() counts the number of elements. There are 3 empty lists inside, so len returns 3.',
    },
    {
      id: 'q4-11',
      type: 'code-challenge',
      prompt: 'Create a list of numbers [5, 3, 8, 1] and print the largest.\nExpected output: 8',
      starterCode: `numbers = [5, 3, 8, 1]\n# Print the largest number\n`,
      expectedOutput: '8',
      correctAnswer: '__code__',
      explanation: 'print(max(numbers)) returns the largest value in the list.',
      requiredPatterns: [
        { pattern: 'max\\s*\\(', hint: 'Use the max() function on the numbers list.' },
      ],
    },
    {
      id: 'q4-12',
      type: 'code-challenge',
      prompt: 'Use a list comprehension to create a list of squares [1, 4, 9, 16, 25] and print it.\nExpected output: [1, 4, 9, 16, 25]',
      starterCode: `# Create [1, 4, 9, 16, 25] using a list comprehension\n`,
      expectedOutput: '[1, 4, 9, 16, 25]',
      correctAnswer: '__code__',
      explanation: 'print([x**2 for x in range(1, 6)]) gives [1, 4, 9, 16, 25].',
      requiredPatterns: [
        { pattern: 'for\\s+\\w+\\s+in', hint: 'Use a list comprehension with a for ... in ... expression.' },
        { pattern: '\\*\\*2|\\*\\s*\\w', hint: 'Square each number using ** 2 inside the comprehension.' },
      ],
    },
    {
      id: 'q4-13',
      type: 'code-challenge',
      prompt: 'Print the sum of all numbers in [10, 20, 30, 40].\nExpected output: 100',
      starterCode: `numbers = [10, 20, 30, 40]\n# Print the sum\n`,
      expectedOutput: '100',
      correctAnswer: '__code__',
      explanation: 'print(sum(numbers)) adds all elements. 10+20+30+40 = 100.',
      requiredPatterns: [
        { pattern: 'sum\\s*\\(', hint: 'Use the sum() function on the numbers list.' },
      ],
    },
    {
      id: 'q4-14',
      type: 'code-challenge',
      prompt: 'Remove duplicates from [1, 2, 2, 3, 3, 3] and print the sorted unique values.\nExpected output: [1, 2, 3]',
      starterCode: `numbers = [1, 2, 2, 3, 3, 3]\n# Print sorted unique values\n`,
      expectedOutput: '[1, 2, 3]',
      correctAnswer: '__code__',
      explanation: 'print(sorted(set(numbers))) converts to a set (removes duplicates) then sorts.',
      requiredPatterns: [
        { pattern: 'set\\s*\\(', hint: 'Use set() to remove duplicates first.' },
        { pattern: 'sorted\\s*\\(', hint: 'Use sorted() to sort the result.' },
      ],
    },
    {
      id: 'q4-15',
      type: 'code-challenge',
      prompt: 'Reverse the list [1, 2, 3, 4, 5] and print it.\nExpected output: [5, 4, 3, 2, 1]',
      starterCode: `numbers = [1, 2, 3, 4, 5]\n# Print the reversed list\n`,
      expectedOutput: '[5, 4, 3, 2, 1]',
      correctAnswer: '__code__',
      explanation: 'print(numbers[::-1]) or numbers.reverse() then print(numbers) both work.',
      requiredPatterns: [
        { pattern: '::-1|\\.reverse\\s*\\(', hint: 'Use [::-1] slice notation or .reverse() to reverse the list.' },
      ],
    },
  ],
};

export default module4;
