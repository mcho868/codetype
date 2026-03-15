import type { Module } from './types';

const module1: Module = {
  id: 'module-1',
  slug: '1',
  title: 'Python Basics',
  description: 'Learn data types, variables, operators, and built-in functions.',
  icon: '🐍',
  color: 'from-green-500 to-emerald-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-1-1',
      title: 'Data Types & Variables',
      content: `Python has several built-in data types. The most common ones are:

- **int**: Whole numbers like 1, 42, -7
- **float**: Decimal numbers like 3.14, 2.0, -0.5
- **str**: Text strings like "hello", 'world'
- **bool**: True or False
- **list**: An ordered collection like [1, 2, 3]
- **None**: Represents the absence of a value

Variables are created using the assignment operator (=). Python is dynamically typed, so you don't need to declare the type.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Integer
age = 25
print(age)        # 25

# Float
pi = 3.14
print(pi)         # 3.14

# String
name = "Alice"
print(name)       # Alice

# Boolean
is_student = True
print(is_student) # True

# None
result = None
print(result)     # None

# Check type with type()
print(type(age))  # <class 'int'>`,
          caption: 'Creating variables with different data types',
        },
      ],
    },
    {
      id: 'lesson-1-2',
      title: 'Type Conversion',
      content: `You can convert between data types using built-in conversion functions:

- **int()**: Converts to integer (truncates decimals)
- **float()**: Converts to float
- **str()**: Converts to string
- **bool()**: Converts to boolean (0, empty string, None → False; everything else → True)`,
      codeExamples: [
        {
          language: 'python',
          code: `# int() conversion
print(int(3.9))      # 3 (truncates, not rounds)
print(int("42"))     # 42

# float() conversion
print(float(5))      # 5.0
print(float("3.14")) # 3.14

# str() conversion
print(str(100))      # "100"
print(str(True))     # "True"

# bool() conversion
print(bool(0))       # False
print(bool(1))       # True
print(bool(""))      # False
print(bool("hello")) # True
print(bool(None))    # False`,
          caption: 'Type conversion functions',
        },
      ],
    },
    {
      id: 'lesson-1-3',
      title: 'Operators',
      content: `Python provides several types of operators:

**Arithmetic Operators:**
- '+' addition, '-' subtraction, '*' multiplication, '/' division (float result)
- '//' floor division (integer result), '%' modulo (remainder), '**' exponentiation

**Comparison Operators:**
- '==' equal, '!=' not equal, '<' less than, '>' greater than, '<=' ≤, '>=' ≥

**Logical Operators:**
- 'and', 'or', 'not'

**Membership & Identity:**
- 'in': checks if value exists in sequence
- 'is': checks if two variables reference the same object`,
      codeExamples: [
        {
          language: 'python',
          code: `# Arithmetic
print(10 + 3)   # 13
print(10 - 3)   # 7
print(10 * 3)   # 30
print(10 / 3)   # 3.3333...
print(10 // 3)  # 3  (floor division)
print(10 % 3)   # 1  (remainder)
print(2 ** 8)   # 256 (exponentiation)

# Comparison
print(5 > 3)    # True
print(5 == 5)   # True
print(5 != 4)   # True

# Logical
print(True and False)  # False
print(True or False)   # True
print(not True)        # False

# Membership
fruits = ["apple", "banana"]
print("apple" in fruits)   # True
print("grape" in fruits)   # False`,
          caption: 'Python operators in action',
        },
      ],
    },
    {
      id: 'lesson-1-4',
      title: 'Built-in Functions',
      content: `Python comes with many useful built-in functions you can use immediately without importing anything:

- **abs(x)**: Returns the absolute value
- **round(x, n)**: Rounds to n decimal places
- **max(iterable)**: Returns the largest value
- **min(iterable)**: Returns the smallest value
- **sum(iterable)**: Returns the sum of all values
- **len(x)**: Returns the length of a sequence
- **type(x)**: Returns the type of a value
- **range(start, stop, step)**: Generates a sequence of numbers`,
      codeExamples: [
        {
          language: 'python',
          code: `print(abs(-7))           # 7
print(round(3.14159, 2)) # 3.14

numbers = [3, 1, 4, 1, 5, 9]
print(max(numbers))  # 9
print(min(numbers))  # 1
print(sum(numbers))  # 23
print(len(numbers))  # 6

print(type(42))      # <class 'int'>
print(type("hi"))    # <class 'str'>

# range() generates numbers
for i in range(5):
    print(i)         # 0, 1, 2, 3, 4`,
          caption: 'Commonly used built-in functions',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q1-1',
      type: 'multiple-choice',
      prompt: 'What does type(3.14) return?',
      choices: [
        { id: 'a', text: "<class 'int'>" },
        { id: 'b', text: "<class 'float'>" },
        { id: 'c', text: "<class 'str'>" },
        { id: 'd', text: "<class 'number'>" },
      ],
      correctAnswer: 'b',
      explanation: '3.14 is a decimal number, so its type is float.',
    },
    {
      id: 'q1-2',
      type: 'multiple-choice',
      prompt: 'What is the result of 10 // 3?',
      choices: [
        { id: 'a', text: '3.33' },
        { id: 'b', text: '1' },
        { id: 'c', text: '3' },
        { id: 'd', text: '30' },
      ],
      correctAnswer: 'c',
      explanation: '// is floor division — it divides and rounds down to the nearest integer. 10 ÷ 3 = 3.33..., floored to 3.',
    },
    {
      id: 'q1-3',
      type: 'fill-in-blank',
      prompt: 'What does max([-3, 7, 2]) return? (type just the number)',
      correctAnswer: '7',
      explanation: 'max() returns the largest value in the list. Among -3, 7, and 2, the largest is 7.',
    },
    {
      id: 'q1-4',
      type: 'true-false',
      prompt: 'The ** operator is used for exponentiation (e.g., 2 ** 3 = 8).',
      correctAnswer: 'true',
      explanation: '** is Python\'s exponentiation operator. 2 ** 3 means 2³ = 8.',
    },
    {
      id: 'q1-5',
      type: 'multiple-choice',
      prompt: 'What does bool(0) return?',
      choices: [
        { id: 'a', text: 'True' },
        { id: 'b', text: 'False' },
        { id: 'c', text: '0' },
        { id: 'd', text: 'None' },
      ],
      correctAnswer: 'b',
      explanation: 'In Python, 0 is falsy. bool(0) returns False. Only non-zero numbers are truthy.',
    },
    {
      id: 'q1-6',
      type: 'multiple-choice',
      prompt: 'What is the result of 10 % 3?',
      choices: [
        { id: 'a', text: '3' },
        { id: 'b', text: '3.33' },
        { id: 'c', text: '1' },
        { id: 'd', text: '0' },
      ],
      correctAnswer: 'c',
      explanation: '% is the modulo operator — it gives the remainder after division. 10 ÷ 3 = 3 remainder 1.',
    },
    {
      id: 'q1-7',
      type: 'fill-in-blank',
      prompt: 'What does int(3.9) return? (type just the number)',
      correctAnswer: '3',
      explanation: 'int() truncates (cuts off) the decimal part — it does NOT round. 3.9 becomes 3.',
    },
    {
      id: 'q1-8',
      type: 'true-false',
      prompt: 'In Python, 10 / 2 returns the integer 5 (not 5.0).',
      correctAnswer: 'false',
      explanation: 'The / operator always returns a float in Python 3. So 10 / 2 gives 5.0. Use // for integer division.',
    },
    {
      id: 'q1-9',
      type: 'multiple-choice',
      prompt: 'Which expression checks if x is NOT equal to 10?',
      choices: [
        { id: 'a', text: 'x <> 10' },
        { id: 'b', text: 'x != 10' },
        { id: 'c', text: 'x ~= 10' },
        { id: 'd', text: 'not x = 10' },
      ],
      correctAnswer: 'b',
      explanation: '!= is the "not equal" comparison operator in Python.',
    },
    {
      id: 'q1-10',
      type: 'code-challenge',
      prompt: 'Write code that calculates and prints the area of a rectangle with width=8 and height=5.\nExpected output: 40',
      starterCode: `width = 8
height = 5
# Calculate and print the area\n`,
      expectedOutput: '40',
      correctAnswer: '__code__',
      explanation: 'area = width * height, then print(area). 8 x 5 = 40.',
      requiredPatterns: [
        { pattern: 'width\\s*\\*\\s*height|height\\s*\\*\\s*width', hint: 'Use width * height to calculate the area, not a hardcoded number.' },
      ],
    },
    {
      id: 'q1-11',
      type: 'code-challenge',
      prompt: 'Print the remainder when 17 is divided by 5.\nExpected output: 2',
      starterCode: `# Print the remainder of 17 divided by 5\n`,
      expectedOutput: '2',
      correctAnswer: '__code__',
      explanation: 'Use the modulo operator: print(17 % 5). 17 = 5*3 + 2, so the remainder is 2.',
      requiredPatterns: [
        { pattern: '17\\s*%\\s*5', hint: 'Use the % operator: 17 % 5.' },
      ],
    },
    {
      id: 'q1-12',
      type: 'code-challenge',
      prompt: 'Calculate 2 to the power of 8 and print it.\nExpected output: 256',
      starterCode: `# Print 2 raised to the power of 8\n`,
      expectedOutput: '256',
      correctAnswer: '__code__',
      explanation: 'print(2 ** 8) gives 256. The ** operator is exponentiation.',
      requiredPatterns: [
        { pattern: '2\\s*\\*\\*\\s*8', hint: 'Use the ** operator: 2 ** 8.' },
      ],
    },
    {
      id: 'q1-13',
      type: 'code-challenge',
      prompt: 'Print the result of integer division: 100 divided by 7 (no decimals).\nExpected output: 14',
      starterCode: `# Use floor division to divide 100 by 7\n`,
      expectedOutput: '14',
      correctAnswer: '__code__',
      explanation: 'print(100 // 7) gives 14. Floor division discards the decimal part.',
      requiredPatterns: [
        { pattern: '100\\s*//\\s*7', hint: 'Use the // operator for floor division: 100 // 7.' },
      ],
    },
    {
      id: 'q1-14',
      type: 'code-challenge',
      prompt: 'Use abs() to print the absolute value of -99.\nExpected output: 99',
      starterCode: `# Print the absolute value of -99\n`,
      expectedOutput: '99',
      correctAnswer: '__code__',
      explanation: 'print(abs(-99)) gives 99. abs() returns the non-negative value of a number.',
      requiredPatterns: [
        { pattern: 'abs\\s*\\(', hint: 'Use the abs() function, not a hardcoded number.' },
      ],
    },
    {
      id: 'q1-15',
      type: 'multiple-choice',
      prompt: 'What is the type of the value True in Python?',
      choices: [
        { id: 'a', text: 'str' },
        { id: 'b', text: 'int' },
        { id: 'c', text: 'bool' },
        { id: 'd', text: 'NoneType' },
      ],
      correctAnswer: 'c',
      explanation: 'True and False are of type bool (boolean). bool is a subtype of int in Python (True == 1, False == 0).',
    },
    {
      id: 'q1-16',
      type: 'fill-in-blank',
      prompt: 'What does round(3.7) return? (type just the number)',
      correctAnswer: '4',
      explanation: 'round() rounds to the nearest integer. 3.7 is closer to 4 than to 3, so it rounds up to 4.',
    },
  ],
};

export default module1;
