import type { Module } from './types';

const module2: Module = {
  id: 'module-2',
  slug: '2',
  title: 'Control Flow',
  description: 'Master if statements, loops, and functions to control program execution.',
  icon: '🔀',
  color: 'from-purple-500 to-violet-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-2-1',
      title: 'If Statements',
      content: `If statements let your program make decisions based on conditions.

**Key rules:**
- Use a colon ':' after each condition
- **Indentation is mandatory** — Python uses 4 spaces to define blocks
- 'elif' means "else if" — checked only if the previous condition was False
- 'else' catches everything that didn't match

You can also **nest** if statements inside each other for more complex logic.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Basic if-else
age = 18
if age >= 18:
    print("Adult")
else:
    print("Minor")

# if-elif-else
score = 75
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("F")

# Nested if
x = 5
if x > 0:
    if x > 10:
        print("Large positive")
    else:
        print("Small positive")`,
          caption: 'Conditional statements with if, elif, else',
        },
      ],
    },
    {
      id: 'lesson-2-2',
      title: 'For Loops',
      content: `For loops repeat code for each item in a sequence.

- **Iterating a list**: loops through each element
- **range(n)**: generates 0, 1, 2, ..., n-1
- **range(start, stop)**: generates start to stop-1
- **range(start, stop, step)**: with step size
- **range(len(list))**: lets you use index to access elements`,
      codeExamples: [
        {
          language: 'python',
          code: `# Iterate over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Using range()
for i in range(5):
    print(i)   # 0, 1, 2, 3, 4

# range with start and stop
for i in range(2, 6):
    print(i)   # 2, 3, 4, 5

# Access by index
for i in range(len(fruits)):
    print(i, fruits[i])
# 0 apple
# 1 banana
# 2 cherry`,
          caption: 'For loops with lists and range()',
        },
      ],
    },
    {
      id: 'lesson-2-3',
      title: 'While Loops',
      content: `While loops repeat as long as a condition is True.

**Warning**: If the condition never becomes False, you get an **infinite loop** — the program hangs forever. Always make sure something in the loop will eventually make the condition False.

Use **break** to exit a loop early, and **continue** to skip the rest of the current iteration.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Basic while loop
count = 0
while count < 5:
    print(count)
    count += 1   # Important: update the condition variable!

# Using break
number = 0
while True:       # Would loop forever...
    if number == 3:
        break     # ...but break exits the loop
    print(number)
    number += 1
# Prints: 0, 1, 2

# Using continue
for i in range(5):
    if i == 2:
        continue  # Skip 2
    print(i)
# Prints: 0, 1, 3, 4`,
          caption: 'While loops, break, and continue',
        },
      ],
    },
    {
      id: 'lesson-2-4',
      title: 'Functions',
      content: `Functions let you group reusable code under a name.

- **def**: keyword to define a function
- **return**: sends a value back to the caller; without it, the function returns None
- **Parameters**: variables listed in the function definition
- **Arguments**: actual values passed when calling the function
- Variables created inside a function are **local** — they don't exist outside it`,
      codeExamples: [
        {
          language: 'python',
          code: `# Define a function
def greet(name):
    return "Hello, " + name + "!"

# Call the function
message = greet("Alice")
print(message)   # Hello, Alice!

# Multiple parameters
def add(a, b):
    return a + b

print(add(3, 4))  # 7

# Default parameter values
def power(base, exponent=2):
    return base ** exponent

print(power(3))     # 9  (uses default exponent=2)
print(power(3, 3))  # 27`,
          caption: 'Defining and calling functions',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q2-1',
      type: 'multiple-choice',
      prompt: 'What does this code print?\n    x = 5\n    if x > 3:\n        print("big")\n    else:\n        print("small")',
      choices: [
        { id: 'a', text: 'small' },
        { id: 'b', text: 'big' },
        { id: 'c', text: 'Nothing' },
        { id: 'd', text: 'Error' },
      ],
      correctAnswer: 'b',
      explanation: 'x is 5, which is greater than 3, so the if condition is True and "big" is printed.',
    },
    {
      id: 'q2-2',
      type: 'multiple-choice',
      prompt: 'What does list(range(3)) produce?',
      choices: [
        { id: 'a', text: '[1, 2, 3]' },
        { id: 'b', text: '[0, 1, 2, 3]' },
        { id: 'c', text: '[0, 1, 2]' },
        { id: 'd', text: '[1, 2]' },
      ],
      correctAnswer: 'c',
      explanation: 'range(3) generates 0, 1, 2 — it starts at 0 and stops before 3.',
    },
    {
      id: 'q2-3',
      type: 'fill-in-blank',
      prompt: 'Complete the function to send a value back:\n    def greet(name):\n        ______ "Hello, " + name\nWhat keyword fills the blank?',
      correctAnswer: 'return',
      explanation: 'The "return" keyword sends a value back from a function to the caller.',
    },
    {
      id: 'q2-4',
      type: 'true-false',
      prompt: 'A "while True:" loop will run forever unless there is a "break" statement inside it.',
      correctAnswer: 'true',
      explanation: 'while True: creates an infinite loop. You must use break (or return in a function) to exit it.',
    },
    {
      id: 'q2-5',
      type: 'multiple-choice',
      prompt: 'What does enumerate(["a", "b", "c"]) give you in a for loop?',
      choices: [
        { id: 'a', text: 'Just the values: "a", "b", "c"' },
        { id: 'b', text: 'Just the indices: 0, 1, 2' },
        { id: 'c', text: 'Index-value pairs: (0,"a"), (1,"b"), (2,"c")' },
        { id: 'd', text: 'A count of elements: 3' },
      ],
      correctAnswer: 'c',
      explanation: 'enumerate() yields (index, value) tuples, letting you access both the position and value in one loop.',
    },
    {
      id: 'q2-6',
      type: 'multiple-choice',
      prompt: 'How many times does this loop print?\n    for i in range(2, 7):\n        print(i)',
      choices: [
        { id: 'a', text: '7 times' },
        { id: 'b', text: '6 times' },
        { id: 'c', text: '5 times' },
        { id: 'd', text: '4 times' },
      ],
      correctAnswer: 'c',
      explanation: 'range(2, 7) generates 2, 3, 4, 5, 6 — that is 5 numbers (stops before 7).',
    },
    {
      id: 'q2-7',
      type: 'true-false',
      prompt: 'In Python, indentation (the spaces at the start of a line) is optional — it is just for style.',
      correctAnswer: 'false',
      explanation: 'Indentation is mandatory in Python. It defines code blocks (like the body of an if or loop). Wrong indentation causes an error.',
    },
    {
      id: 'q2-8',
      type: 'fill-in-blank',
      prompt: 'What keyword is used to define a function in Python?\n    ___ my_function():\n        pass',
      correctAnswer: 'def',
      explanation: '"def" is the keyword used to define (create) a function in Python.',
    },
    {
      id: 'q2-9',
      type: 'multiple-choice',
      prompt: 'What does this function return?\n    def double(x):\n        return x * 2\n    print(double(6))',
      choices: [
        { id: 'a', text: '6' },
        { id: 'b', text: '2' },
        { id: 'c', text: '12' },
        { id: 'd', text: 'double' },
      ],
      correctAnswer: 'c',
      explanation: 'double(6) returns 6 * 2 = 12, which is then printed.',
    },
    {
      id: 'q2-10',
      type: 'code-challenge',
      prompt: 'Write a function called is_even that returns True if a number is even, False if odd.\nThen call it with 4 and print the result.\nExpected output: True',
      starterCode: `def is_even(n):
    # return True if n is even, False otherwise
    pass

print(is_even(4))`,
      expectedOutput: 'True',
      correctAnswer: '__code__',
      explanation: 'Use the modulo operator: return n % 2 == 0. If the remainder when divided by 2 is 0, the number is even.',
      requiredPatterns: [
        { pattern: 'def\\s+is_even', hint: 'You must define a function called is_even.' },
        { pattern: '%\\s*2', hint: 'Use % 2 inside is_even to check for even/odd.' },
        { pattern: 'return', hint: 'Your function must use return to send back a value.' },
      ],
    },
    {
      id: 'q2-11',
      type: 'code-challenge',
      prompt: 'Write a function called add that takes two numbers and returns their sum.\nThen print add(3, 4).\nExpected output: 7',
      starterCode: `def add(a, b):
    # return the sum
    pass

print(add(3, 4))`,
      expectedOutput: '7',
      correctAnswer: '__code__',
      explanation: 'def add(a, b): return a + b. Then print(add(3, 4)) prints 7.',
      requiredPatterns: [
        { pattern: 'def\\s+add', hint: 'You must define a function called add.' },
        { pattern: 'a\\s*\\+\\s*b|b\\s*\\+\\s*a', hint: 'Use a + b inside the function, not a hardcoded value.' },
        { pattern: 'return', hint: 'Your function must use return.' },
      ],
    },
    {
      id: 'q2-12',
      type: 'code-challenge',
      prompt: 'Use a for loop to print the numbers 1, 2, 3, 4, 5 each on its own line.',
      starterCode: `# Use a for loop with range()\n`,
      expectedOutput: '1\n2\n3\n4\n5',
      correctAnswer: '__code__',
      explanation: 'for i in range(1, 6): print(i) prints 1 through 5.',
      requiredPatterns: [
        { pattern: 'for\\s+\\w+\\s+in\\s+range', hint: 'Use a for loop with range() — not individual print statements.' },
      ],
    },
    {
      id: 'q2-13',
      type: 'code-challenge',
      prompt: 'Print all even numbers from 2 to 10 (inclusive), each on its own line.',
      starterCode: `# Print even numbers from 2 to 10\n`,
      expectedOutput: '2\n4\n6\n8\n10',
      correctAnswer: '__code__',
      explanation: 'Use range(2, 11, 2) or check n % 2 == 0 inside a loop.',
      requiredPatterns: [
        { pattern: 'for\\s+\\w+\\s+in', hint: 'Use a for loop — not individual print statements.' },
      ],
    },
    {
      id: 'q2-14',
      type: 'code-challenge',
      prompt: 'Write a function max_of_two(a, b) that returns the larger number.\nThen print max_of_two(10, 7).\nExpected output: 10',
      starterCode: `def max_of_two(a, b):
    # return the larger of a and b
    pass

print(max_of_two(10, 7))`,
      expectedOutput: '10',
      correctAnswer: '__code__',
      explanation: 'if a > b: return a else: return b. Or simply: return a if a > b else b.',
      requiredPatterns: [
        { pattern: 'def\\s+max_of_two', hint: 'You must define a function called max_of_two.' },
        { pattern: 'a\\s*>\\s*b|b\\s*<\\s*a|b\\s*>\\s*a|a\\s*<\\s*b', hint: 'Compare a and b using > or < inside the function.' },
        { pattern: 'return', hint: 'Your function must use return.' },
      ],
    },
    {
      id: 'q2-15',
      type: 'multiple-choice',
      prompt: 'What is printed?\n    def greet(name="World"):\n        print("Hello,", name)\n    greet()',
      choices: [
        { id: 'a', text: 'Hello,' },
        { id: 'b', text: 'Hello, World' },
        { id: 'c', text: 'Error — name is required' },
        { id: 'd', text: 'Hello, name' },
      ],
      correctAnswer: 'b',
      explanation: '"World" is the default value for name. When greet() is called with no argument, name defaults to "World".',
    },
    {
      id: 'q2-16',
      type: 'true-false',
      prompt: 'The "continue" keyword skips the rest of the current loop iteration and goes to the next one.',
      correctAnswer: 'true',
      explanation: 'continue skips the remaining code in the current iteration and moves to the next. break exits the loop entirely.',
    },
  ],
};

export default module2;
