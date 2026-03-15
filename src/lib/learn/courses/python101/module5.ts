import type { Module } from './types';

const module5: Module = {
  id: 'module-5',
  slug: '5',
  title: 'Tuples',
  description: 'Learn immutable sequences: creation, access, methods, and multiple return values.',
  icon: '📦',
  color: 'from-teal-500 to-cyan-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-5-1',
      title: 'Creating Tuples',
      content: `A tuple is like a list, but **immutable** — once created, it cannot be changed.

- Created with parentheses '()' or just commas
- **Single-element tuple**: you must add a trailing comma '(1,)' — without it, Python sees it as just parentheses around a value, not a tuple`,
      codeExamples: [
        {
          language: 'python',
          code: `# With parentheses
t1 = (1, 2, 3)
print(t1)         # (1, 2, 3)

# Without parentheses (still a tuple!)
t2 = 1, 2, 3
print(type(t2))   # <class 'tuple'>

# Single-element tuple (trailing comma required!)
t3 = (42,)
print(type(t3))   # <class 'tuple'>

# This is NOT a tuple — it's just the integer 42
not_a_tuple = (42)
print(type(not_a_tuple))  # <class 'int'>

# Empty tuple
empty = ()`,
          caption: 'Creating tuples: parentheses, commas, single-element',
        },
      ],
    },
    {
      id: 'lesson-5-2',
      title: 'Accessing & Immutability',
      content: `Tuples support indexing and slicing just like lists. However, you **cannot modify** them after creation.

Attempting to reassign an element raises a 'TypeError'. This immutability makes tuples:
- Safer (data can't be accidentally changed)
- Slightly faster than lists
- Usable as dictionary keys (lists cannot be, because they are mutable)

**Tuple unpacking** lets you assign each element of a tuple to its own variable in one line:
'a, b, c = (1, 2, 3)'

The number of variables on the left must match the number of elements in the tuple.`,
      codeExamples: [
        {
          language: 'python',
          code: `point = (10, 20, 30)

# Indexing works the same as lists
print(point[0])    # 10
print(point[-1])   # 30
print(point[1:3])  # (20, 30)

# Immutability — this will cause an error!
try:
    point[0] = 99
except TypeError as e:
    print(f"Error: {e}")
# Error: 'tuple' object does not support item assignment

# Can still use in, len, etc.
print(10 in point)  # True
print(len(point))   # 3

# Tuple unpacking — assign each element to its own variable
a, b, c = (7, 8, 9)
print(a)  # 7
print(b)  # 8
print(c)  # 9

# Works without parentheses too
x, y = 100, 200
print(x, y)  # 100 200`,
          caption: 'Tuple access, immutability, and unpacking',
        },
      ],
    },
    {
      id: 'lesson-5-3',
      title: 'Tuple Methods',
      content: `Tuples only have two methods (since they can't be modified):

- **count(x)**: returns how many times x appears
- **index(x)**: returns the index of the first occurrence of x`,
      codeExamples: [
        {
          language: 'python',
          code: `t = (1, 2, 3, 2, 4, 2)

print(t.count(2))   # 3  (appears 3 times)
print(t.index(3))   # 2  (first occurrence of 3 is at index 2)
print(t.index(2))   # 1  (first occurrence of 2 is at index 1)

# Comparison with list methods:
# Lists have: append, insert, remove, pop, sort, reverse, extend...
# Tuples only have: count, index`,
          caption: 'The two tuple methods: count() and index()',
        },
      ],
    },
    {
      id: 'lesson-5-4',
      title: 'Multiple Return Values',
      content: `Functions can return multiple values as a tuple. When you call the function, you can **unpack** the tuple into separate variables.

This is a very common Python pattern!`,
      codeExamples: [
        {
          language: 'python',
          code: `def swap(a, b):
    return b, a   # returns a tuple

x, y = swap(1, 2)
print(x, y)       # 2 1

def min_max(lst):
    return min(lst), max(lst)

low, high = min_max([3, 1, 4, 1, 5])
print(f"Min: {low}, Max: {high}")
# Min: 1, Max: 5

# You can also keep as a tuple
result = swap(10, 20)
print(result)    # (20, 10)`,
          caption: 'Returning multiple values with tuples',
        },
      ],
    },
    {
      id: 'lesson-5-5',
      title: 'Converting Between List and Tuple',
      content: `You can convert between lists and tuples:

- **list(tuple)**: converts tuple to list (now mutable)
- **tuple(list)**: converts list to tuple (now immutable)

This is useful when you need to modify a tuple — convert to list, modify, convert back.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Tuple to list
t = (1, 2, 3)
lst = list(t)
lst.append(4)
print(lst)     # [1, 2, 3, 4]

# List to tuple
numbers = [5, 6, 7]
tup = tuple(numbers)
print(tup)     # (5, 6, 7)

# Practical use: "modify" a tuple
coords = (10, 20, 30)
temp = list(coords)
temp[1] = 99
coords = tuple(temp)
print(coords)  # (10, 99, 30)`,
          caption: 'Converting between tuple and list',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q5-1',
      type: 'true-false',
      prompt: 'Tuples are mutable — you can change their elements after creation.',
      correctAnswer: 'false',
      explanation: 'Tuples are immutable. Once created, you cannot change, add, or remove elements. This is the key difference from lists.',
    },
    {
      id: 'q5-2',
      type: 'multiple-choice',
      prompt: 'Which of the following creates a single-element tuple?',
      choices: [
        { id: 'a', text: '(1)' },
        { id: 'b', text: '(1,)' },
        { id: 'c', text: '[1]' },
        { id: 'd', text: 'tuple(1)' },
      ],
      correctAnswer: 'b',
      explanation: '(1) is just parentheses around 1 — it\'s still an int. You need a trailing comma: (1,) to make a single-element tuple.',
    },
    {
      id: 'q5-3',
      type: 'fill-in-blank',
      prompt: '`t = (3, 1, 3, 3)` — what does `t.______(3)` return if the method counts occurrences? (write just the method name)',
      correctAnswer: 'count',
      explanation: 'count() returns the number of times a value appears in the tuple. t.count(3) would return 3.',
    },
    {
      id: 'q5-4',
      type: 'multiple-choice',
      prompt: 'Given:\n    def swap(a, b):\n        return b, a\n    x, y = swap(1, 2)\nWhat is `x`?',
      choices: [
        { id: 'a', text: '1' },
        { id: 'b', text: '2' },
        { id: 'c', text: '(2, 1)' },
        { id: 'd', text: '(1, 2)' },
      ],
      correctAnswer: 'b',
      explanation: 'swap(1, 2) returns (2, 1). When unpacked into x, y: x gets 2 and y gets 1.',
    },
    {
      id: 'q5-5',
      type: 'multiple-choice',
      prompt: 'What does `t = (1, 2, 3); t[1]` return?',
      choices: [
        { id: 'a', text: '1' },
        { id: 'b', text: '2' },
        { id: 'c', text: '3' },
        { id: 'd', text: 'Error — tuples cannot be indexed' },
      ],
      correctAnswer: 'b',
      explanation: 'Tuples support indexing just like lists. t[1] returns the element at index 1, which is 2.',
    },
    {
      id: 'q5-6',
      type: 'true-false',
      prompt: 'You can use a tuple as a dictionary key, but not a list.',
      correctAnswer: 'true',
      explanation: 'Tuples are immutable (hashable) so they can be dict keys. Lists are mutable (not hashable) and cannot be used as dict keys.',
    },
    {
      id: 'q5-7',
      type: 'fill-in-blank',
      prompt: '`t = (10, 20, 30)` — what does `t.______(20)` return if it finds the position? (write just the method name)',
      correctAnswer: 'index',
      explanation: 'index(value) returns the position of the first occurrence of value. t.index(20) returns 1.',
    },
    {
      id: 'q5-8',
      type: 'multiple-choice',
      prompt: 'What does `len((1, 2, 3, 4))` return?',
      choices: [
        { id: 'a', text: '3' },
        { id: 'b', text: '4' },
        { id: 'c', text: '(4,)' },
        { id: 'd', text: 'Error' },
      ],
      correctAnswer: 'b',
      explanation: 'len() works on tuples just like lists. The tuple has 4 elements so it returns 4.',
    },
    {
      id: 'q5-9',
      type: 'multiple-choice',
      prompt: 'What does this print?\n    a, b, c = (7, 8, 9)\n    print(b)',
      choices: [
        { id: 'a', text: '7' },
        { id: 'b', text: '8' },
        { id: 'c', text: '9' },
        { id: 'd', text: '(7, 8, 9)' },
      ],
      correctAnswer: 'b',
      explanation: 'Tuple unpacking assigns 7 to a, 8 to b, and 9 to c. print(b) prints 8.',
    },
    {
      id: 'q5-10',
      type: 'code-challenge',
      prompt: 'Create a tuple of three colors and print its length.\nExpected output: 3',
      starterCode: `colors = ("red", "green", "blue")\n# Print the length of the tuple\n`,
      expectedOutput: '3',
      correctAnswer: '__code__',
      explanation: 'print(len(colors)) returns 3 since there are 3 elements.',
      requiredPatterns: [
        { pattern: 'len\\s*\\(', hint: 'Use the len() function on the colors tuple.' },
      ],
    },
    {
      id: 'q5-11',
      type: 'code-challenge',
      prompt: 'Unpack the tuple (10, 20, 30) into three variables x, y, z and print their sum.\nExpected output: 60',
      starterCode: `t = (10, 20, 30)\n# Unpack into x, y, z and print their sum\n`,
      expectedOutput: '60',
      correctAnswer: '__code__',
      explanation: 'x, y, z = t then print(x + y + z) gives 60.',
    },
    {
      id: 'q5-12',
      type: 'code-challenge',
      prompt: 'Convert the list [1, 2, 3] to a tuple and print it.\nExpected output: (1, 2, 3)',
      starterCode: `lst = [1, 2, 3]\n# Convert to a tuple and print\n`,
      expectedOutput: '(1, 2, 3)',
      correctAnswer: '__code__',
      explanation: 'print(tuple(lst)) converts the list to a tuple and prints it.',
    },
    {
      id: 'q5-13',
      type: 'code-challenge',
      prompt: 'Use a tuple to store (name, age) = ("Alice", 20) and print:\n    Alice is 20 years old',
      starterCode: `person = ("Alice", 20)\n# Unpack and print the message\n`,
      expectedOutput: 'Alice is 20 years old',
      correctAnswer: '__code__',
      explanation: 'name, age = person then print(f"{name} is {age} years old").',
    },
    {
      id: 'q5-14',
      type: 'code-challenge',
      prompt: 'Count how many times 3 appears in (1, 3, 5, 3, 3) and print it.\nExpected output: 3',
      starterCode: `t = (1, 3, 5, 3, 3)\n# Count and print occurrences of 3\n`,
      expectedOutput: '3',
      correctAnswer: '__code__',
      explanation: 'print(t.count(3)) returns 3 since 3 appears three times.',
    },
  ],
};

export default module5;
