export type QuestionType = 'multiple-choice' | 'fill-in-blank' | 'true-false' | 'code-challenge';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  choices?: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  /** For code-challenge questions: starter code shown in the editor */
  starterCode?: string;
  /** For code-challenge questions: expected stdout output (trimmed) */
  expectedOutput?: string;
  /** For code-challenge questions: regex patterns the submitted code must contain */
  requiredPatterns?: { pattern: string; hint: string }[];
}

export interface CodeExample {
  language: 'python';
  code: string;
  caption?: string;
  /** If true, the code block will be an editable runner */
  editable?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExamples: CodeExample[];
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  locked: boolean;
  lessons: Lesson[];
  questions: Question[];
}

const MODULES: Module[] = [
  // ── Module 0: Hello World ─────────────────────────────────────────────────
  {
    id: 'module-0',
    slug: '0',
    title: 'Hello, World!',
    description: 'Your very first Python program. Print text, use variables, get input, and write comments.',
    icon: '👋',
    color: 'from-sky-500 to-blue-400',
    locked: false,
    lessons: [
      {
        id: 'lesson-0-1',
        title: 'Your First Python Program',
        content: `Welcome to Python! Python is one of the easiest programming languages to learn — its code reads almost like plain English.

The very first thing every programmer learns is how to make the computer display a message. In Python, you do this with **print()**.

**print()** is a built-in function that outputs text to the screen. Whatever you put inside the parentheses gets displayed.

Try running the code on the right — press the green **Run** button!`,
        codeExamples: [
          {
            language: 'python',
            code: `print("Hello, World!")`,
            caption: 'Your very first Python program — press Run!',
            editable: true,
          },
          {
            language: 'python',
            code: `print("Hello, World!")
print("My name is Alice")
print("I am learning Python")`,
            caption: 'You can print multiple lines',
            editable: true,
          },
        ],
      },
      {
        id: 'lesson-0-2',
        title: 'Variables',
        content: `A **variable** is a named container that stores a value. Think of it like a labeled box.

You create a variable by writing:
name = value

The **=** sign is called the assignment operator. It puts the value on the right into the box on the left.

Variable names:
- Can contain letters, numbers, and underscores
- Cannot start with a number
- Are case-sensitive ('name' and 'Name' are different)
- By convention, use lowercase with underscores: 'my_name'`,
        codeExamples: [
          {
            language: 'python',
            code: `name = "Alice"
age = 14
height = 1.65

print(name)
print(age)
print(height)`,
            caption: 'Creating and printing variables',
            editable: true,
          },
          {
            language: 'python',
            code: `# You can print variables and text together
name = "Alice"
age = 14

print("My name is", name)
print("I am", age, "years old")`,
            caption: 'Printing text and variables together',
            editable: true,
          },
        ],
      },
      {
        id: 'lesson-0-3',
        title: 'Numbers and Simple Maths',
        content: `Python can do arithmetic just like a calculator.

- **+** addition
- **-** subtraction
- **\\*** multiplication
- **/** division
- **\\*\\*** power (e.g. 2\\*\\*3 = 8)

You can store the result in a variable and print it.`,
        codeExamples: [
          {
            language: 'python',
            code: `x = 10
y = 3

print(x + y)   # 13
print(x - y)   # 7
print(x * y)   # 30
print(x / y)   # 3.333...
print(x ** 2)  # 100`,
            caption: 'Basic arithmetic with variables',
            editable: true,
          },
          {
            language: 'python',
            code: `price = 4.50
quantity = 3
total = price * quantity

print("Total cost:", total)`,
            caption: 'A practical calculation',
            editable: true,
          },
        ],
      },
      {
        id: 'lesson-0-4',
        title: 'Getting Input from the User',
        content: `So far, your programs always do the same thing. To make them interactive, use **input()**.

input() pauses the program and waits for the user to type something and press Enter. The typed text is returned as a string.

**Important**: input() always gives you a string. If you need a number, convert it with int() or float().`,
        codeExamples: [
          {
            language: 'python',
            code: `name = input("What is your name? ")
print("Hello,", name)`,
            caption: 'Ask the user for their name',
            editable: true,
          },
          {
            language: 'python',
            code: `age_str = input("How old are you? ")
age = int(age_str)       # convert string to int
next_year = age + 1
print("Next year you will be", next_year)`,
            caption: 'Converting input to a number',
            editable: true,
          },
        ],
      },
      {
        id: 'lesson-0-5',
        title: 'Comments',
        content: `A **comment** is a line that Python ignores — it's a note for the human reading the code.

Start a comment with **#**. Everything after # on that line is ignored.

Comments are important for explaining what your code does, especially when it's complex. Good programmers write comments often!`,
        codeExamples: [
          {
            language: 'python',
            code: `# This is a comment — Python ignores this line

name = "Alice"   # This comment is at the end of a line

# Comments help explain your code:
# Step 1: get the user's name
name = input("Enter your name: ")
# Step 2: greet them
print("Hello,", name)`,
            caption: 'Comments explain your code',
            editable: true,
          },
        ],
      },
    ],
    questions: [
      {
        id: 'q0-1',
        type: 'multiple-choice',
        prompt: 'Which function do you use to display output in Python?',
        choices: [
          { id: 'a', text: 'display()' },
          { id: 'b', text: 'print()' },
          { id: 'c', text: 'show()' },
          { id: 'd', text: 'output()' },
        ],
        correctAnswer: 'b',
        explanation: 'print() is the built-in function for displaying output to the screen in Python.',
      },
      {
        id: 'q0-2',
        type: 'fill-in-blank',
        prompt: 'Complete the code to print "Hello":\n    _____("Hello")',
        correctAnswer: 'print',
        explanation: 'print() is the function that outputs text to the screen.',
      },
      {
        id: 'q0-3',
        type: 'multiple-choice',
        prompt: 'What does this code output?\n    name = "Bob"\n    print(name)',
        choices: [
          { id: 'a', text: '"name"' },
          { id: 'b', text: '"Bob"' },
          { id: 'c', text: 'Bob' },
          { id: 'd', text: 'Error' },
        ],
        correctAnswer: 'c',
        explanation: 'print(name) prints the value stored in the variable "name", which is Bob (without quotes).',
      },
      {
        id: 'q0-4',
        type: 'true-false',
        prompt: 'The = sign in Python checks if two values are equal.',
        correctAnswer: 'false',
        explanation: '= is the assignment operator — it stores a value into a variable. To check equality, use == (two equals signs).',
      },
      {
        id: 'q0-5',
        type: 'multiple-choice',
        prompt: 'What symbol starts a comment in Python?',
        choices: [
          { id: 'a', text: '//' },
          { id: 'b', text: '/*' },
          { id: 'c', text: '#' },
          { id: 'd', text: '--' },
        ],
        correctAnswer: 'c',
        explanation: 'In Python, # starts a comment. Everything after # on that line is ignored by Python.',
      },
      {
        id: 'q0-6',
        type: 'multiple-choice',
        prompt: 'What does input() return?',
        choices: [
          { id: 'a', text: 'An integer' },
          { id: 'b', text: 'A float' },
          { id: 'c', text: 'A string' },
          { id: 'd', text: 'Whatever type the user types' },
        ],
        correctAnswer: 'c',
        explanation: 'input() always returns a string, even if the user types a number. Use int() or float() to convert it.',
      },
      {
        id: 'q0-7',
        type: 'fill-in-blank',
        prompt: 'To convert the string "42" to an integer, you write: ___("42")',
        correctAnswer: 'int',
        explanation: 'int() converts a string (or float) to an integer.',
      },
      {
        id: 'q0-8',
        type: 'true-false',
        prompt: 'Variable names in Python are case-sensitive, so "age" and "Age" are different variables.',
        correctAnswer: 'true',
        explanation: 'Python is case-sensitive. "age", "Age", and "AGE" are three completely different variable names.',
      },
      {
        id: 'q0-9',
        type: 'multiple-choice',
        prompt: 'What does this print?\n    x = 5\n    y = 3\n    print(x * y)',
        choices: [
          { id: 'a', text: 'x * y' },
          { id: 'b', text: '53' },
          { id: 'c', text: '15' },
          { id: 'd', text: '8' },
        ],
        correctAnswer: 'c',
        explanation: 'x * y is 5 × 3 = 15. The * operator multiplies.',
      },
      {
        id: 'q0-10',
        type: 'code-challenge',
        prompt: 'Write a program that prints exactly:\n    Hello, Python!',
        starterCode: `# Write your code here\n`,
        expectedOutput: 'Hello, Python!',
        correctAnswer: '__code__',
        explanation: 'Use print("Hello, Python!") — make sure the spelling, comma, and exclamation mark match exactly.',
      },
      {
        id: 'q0-11',
        type: 'code-challenge',
        prompt: 'Print your name and age on two separate lines.\nExpected output:\n    Alice\n    20',
        starterCode: `# Print "Alice" on the first line and 20 on the second\n`,
        expectedOutput: 'Alice\n20',
        correctAnswer: '__code__',
        explanation: 'Use two print() calls: print("Alice") then print(20).',
      },
      {
        id: 'q0-12',
        type: 'code-challenge',
        prompt: 'Create a variable called greeting with the value "Hi there" and print it.\nExpected output: Hi there',
        starterCode: `# Create the variable and print it\n`,
        expectedOutput: 'Hi there',
        correctAnswer: '__code__',
        explanation: 'greeting = "Hi there" then print(greeting).',
      },
      {
        id: 'q0-13',
        type: 'code-challenge',
        prompt: 'Print the result of adding 15 and 27.\nExpected output: 42',
        starterCode: `# Print the sum of 15 and 27\n`,
        expectedOutput: '42',
        correctAnswer: '__code__',
        explanation: 'print(15 + 27) prints 42.',
      },
      {
        id: 'q0-14',
        type: 'code-challenge',
        prompt: 'Store the string "Python" in a variable called language, then print:\n    I love Python\n(Hint: use the variable in your print statement)',
        starterCode: `language = "Python"\n# Print "I love Python" using the variable\n`,
        expectedOutput: 'I love Python',
        correctAnswer: '__code__',
        explanation: 'print("I love", language) or print("I love " + language) both work.',
      },
      {
        id: 'q0-15',
        type: 'multiple-choice',
        prompt: 'Which of these is a valid Python variable name?',
        choices: [
          { id: 'a', text: '2fast' },
          { id: 'b', text: 'my-var' },
          { id: 'c', text: 'my_var' },
          { id: 'd', text: 'class' },
        ],
        correctAnswer: 'c',
        explanation: 'Variable names must start with a letter or underscore, use only letters/numbers/underscores, and cannot be reserved words like "class".',
      },
      {
        id: 'q0-16',
        type: 'true-false',
        prompt: 'You can store a number directly in a variable without quotes: x = 42',
        correctAnswer: 'true',
        explanation: 'Numbers do not need quotes. x = 42 stores the integer 42. Quotes are only needed for strings.',
      },
    ],
  },
  // ── Module 1: Python Basics ───────────────────────────────────────────────
  {
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
  },
  {
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
  },
  {
    id: 'module-3',
    slug: '3',
    title: 'Strings & File I/O',
    description: 'Work with text: slicing, methods, formatting, and reading/writing files.',
    icon: '📝',
    color: 'from-yellow-500 to-orange-400',
    locked: true,
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'String Indexing & Slicing',
        content: `Strings are sequences of characters, and you can access individual characters or substrings:

- **Positive indexing**: starts at 0 from the left
- **Negative indexing**: starts at -1 from the right
- **Slicing** '[start:stop:step]':
  - 'start': index to begin (inclusive)
  - 'stop': index to end (exclusive)
  - 'step': how many to skip (default 1)
- Omitting start/stop defaults to the beginning/end`,
        codeExamples: [
          {
            language: 'python',
            code: `text = "Hello"
#        H  e  l  l  o
# index: 0  1  2  3  4
# neg:  -5 -4 -3 -2 -1

print(text[0])    # H
print(text[1])    # e
print(text[-1])   # o  (last character)
print(text[-2])   # l  (second to last)

# Slicing
print(text[1:4])  # ell  (index 1,2,3)
print(text[:3])   # Hel  (from start to index 2)
print(text[2:])   # llo  (from index 2 to end)
print(text[::-1]) # olleH  (reversed!)`,
            caption: 'String indexing and slicing',
          },
        ],
      },
      {
        id: 'lesson-3-2',
        title: 'String Methods',
        content: `Python strings have many built-in methods. Methods are called with dot notation: 'string.method()'.

**Case & Whitespace:**
- 'upper()', 'lower()': change case
- 'strip()': remove leading/trailing whitespace; 'lstrip()', 'rstrip()'

**Searching & Replacing:**
- 'find(sub)': returns index of first match (-1 if not found)
- 'count(sub)': counts occurrences
- 'replace(old, new)': replaces all occurrences
- 'startswith(sub)', 'endswith(sub)': returns True/False

**Splitting & Joining:**
- 'split(sep)': splits string into a list
- 'join(iterable)': joins a list into a string`,
        codeExamples: [
          {
            language: 'python',
            code: `s = "  Hello, World!  "

# Case
print(s.upper())   # "  HELLO, WORLD!  "
print(s.lower())   # "  hello, world!  "

# Whitespace
print(s.strip())   # "Hello, World!"

# Search
print(s.find("World"))    # 9
print(s.count("l"))       # 3

# Replace
print(s.replace("World", "Python"))
# "  Hello, Python!  "

# Split and Join
words = "apple,banana,cherry"
lst = words.split(",")   # ['apple', 'banana', 'cherry']
print(lst)

back = " | ".join(lst)   # 'apple | banana | cherry'
print(back)`,
            caption: 'Common string methods',
          },
        ],
      },
      {
        id: 'lesson-3-3',
        title: 'String Formatting',
        content: `There are several ways to embed variables into strings:

**f-strings (recommended)**: prefix the string with 'f' and put expressions in '{}'

**str.format()**: use '{}' as placeholders and pass values to '.format()'

f-strings are the modern, preferred way — they're readable and fast.`,
        codeExamples: [
          {
            language: 'python',
            code: `name = "Alice"
age = 25
score = 98.567

# f-string (Python 3.6+)
print(f"Name: {name}, Age: {age}")
# Name: Alice, Age: 25

# f-string with expressions
print(f"Next year: {age + 1}")
# Next year: 26

# f-string with format spec
print(f"Score: {score:.2f}")
# Score: 98.57

# .format() method
print("Name: {}, Age: {}".format(name, age))
# Name: Alice, Age: 25

# Named placeholders
print("{name} is {age} years old".format(name=name, age=age))`,
            caption: 'f-strings and .format()',
          },
        ],
      },
      {
        id: 'lesson-3-4',
        title: 'File I/O',
        content: `Python can read from and write to files using the built-in 'open()' function.

**File modes:**
- 'r': read (default) — file must exist
- 'w': write — creates new file or overwrites existing
- 'a': append — adds to end of file

**Best practice**: Use the 'with' statement, which automatically closes the file when done, even if an error occurs.`,
        codeExamples: [
          {
            language: 'python',
            code: `# Writing to a file
with open("example.txt", "w") as f:
    f.write("Hello, World!\\n")
    f.write("Second line\\n")

# Reading entire file
with open("example.txt", "r") as f:
    content = f.read()
    print(content)

# Reading line by line
with open("example.txt", "r") as f:
    for line in f:
        print(line.strip())

# Appending to a file
with open("example.txt", "a") as f:
    f.write("Third line\\n")`,
            caption: 'Reading and writing files with open()',
          },
        ],
      },
    ],
    questions: [
      {
        id: 'q3-1',
        type: 'multiple-choice',
        prompt: 'What does `"hello"[1]` return?',
        choices: [
          { id: 'a', text: '"h"' },
          { id: 'b', text: '"e"' },
          { id: 'c', text: '"l"' },
          { id: 'd', text: '"hello"' },
        ],
        correctAnswer: 'b',
        explanation: 'String indexing starts at 0. Index 0 is "h", index 1 is "e".',
      },
      {
        id: 'q3-2',
        type: 'multiple-choice',
        prompt: 'What does `"  hello  ".strip()` return?',
        choices: [
          { id: 'a', text: '"  hello  "' },
          { id: 'b', text: '"hello  "' },
          { id: 'c', text: '"hello"' },
          { id: 'd', text: '"  hello"' },
        ],
        correctAnswer: 'c',
        explanation: 'strip() removes all leading and trailing whitespace from both sides of the string.',
      },
      {
        id: 'q3-3',
        type: 'fill-in-blank',
        prompt: 'Complete the f-string:\n```python\nname = "Bob"\nprint(____"Hello, {name}!")\n```\nWhat prefix fills the blank? (just the letter)',
        correctAnswer: 'f',
        explanation: 'f-strings require the letter "f" before the opening quote. The f tells Python to evaluate expressions inside {}.',
      },
      {
        id: 'q3-4',
        type: 'true-false',
        prompt: '`"hello"[-1]` returns `"h"` (the first character).',
        correctAnswer: 'false',
        explanation: 'Negative indexing starts from the end. -1 is the last character, which is "o", not "h".',
      },
      {
        id: 'q3-5',
        type: 'multiple-choice',
        prompt: 'What does "hello".upper() return?',
        choices: [
          { id: 'a', text: 'hello' },
          { id: 'b', text: 'Hello' },
          { id: 'c', text: 'HELLO' },
          { id: 'd', text: 'Error' },
        ],
        correctAnswer: 'c',
        explanation: 'upper() returns a new string with all characters converted to uppercase.',
      },
      {
        id: 'q3-6',
        type: 'fill-in-blank',
        prompt: '"apple,banana,cherry".______(",")\nThis method splits a string into a list. What is it called?',
        correctAnswer: 'split',
        explanation: 'split(separator) splits a string at each separator and returns a list of the parts.',
      },
      {
        id: 'q3-7',
        type: 'true-false',
        prompt: '"abc" * 3 produces "abcabcabc".',
        correctAnswer: 'true',
        explanation: 'The * operator repeats a string. "abc" * 3 gives "abcabcabc".',
      },
      {
        id: 'q3-8',
        type: 'multiple-choice',
        prompt: 'What does len("Python") return?',
        choices: [
          { id: 'a', text: '5' },
          { id: 'b', text: '6' },
          { id: 'c', text: '7' },
          { id: 'd', text: 'Error' },
        ],
        correctAnswer: 'b',
        explanation: '"Python" has 6 characters: P-y-t-h-o-n.',
      },
      {
        id: 'q3-9',
        type: 'multiple-choice',
        prompt: 'What does "hello world".replace("world", "Python") return?',
        choices: [
          { id: 'a', text: '"hello world"' },
          { id: 'b', text: '"hello Python"' },
          { id: 'c', text: '"Python world"' },
          { id: 'd', text: 'Error' },
        ],
        correctAnswer: 'b',
        explanation: 'replace(old, new) returns a new string with all occurrences of old replaced by new.',
      },
      {
        id: 'q3-10',
        type: 'code-challenge',
        prompt: 'Print the string "hello" in all uppercase.\nExpected output: HELLO',
        starterCode: `word = "hello"\n# Print it in uppercase\n`,
        expectedOutput: 'HELLO',
        correctAnswer: '__code__',
        explanation: 'print(word.upper()) converts the string to uppercase.',
        requiredPatterns: [
          { pattern: '\\.upper\\s*\\(', hint: 'Use the .upper() method on the string, not a hardcoded value.' },
        ],
      },
      {
        id: 'q3-11',
        type: 'code-challenge',
        prompt: 'Count how many times the letter "a" appears in "banana" and print it.\nExpected output: 3',
        starterCode: `word = "banana"\n# Count occurrences of "a" and print\n`,
        expectedOutput: '3',
        correctAnswer: '__code__',
        explanation: 'print(word.count("a")) counts occurrences. "banana" has 3 "a"s.',
        requiredPatterns: [
          { pattern: '\\.count\\s*\\(', hint: 'Use the .count() method to count occurrences, not a hardcoded number.' },
        ],
      },
      {
        id: 'q3-12',
        type: 'code-challenge',
        prompt: 'Use an f-string to print: My score is 95\n(store 95 in a variable called score)',
        starterCode: `score = 95\n# Use an f-string to print "My score is 95"\n`,
        expectedOutput: 'My score is 95',
        correctAnswer: '__code__',
        explanation: 'print(f"My score is {score}") inserts the variable value into the string.',
        requiredPatterns: [
          { pattern: 'f["\']', hint: 'Use an f-string — a string that starts with f"..." or f\'...\'.' },
          { pattern: '\\{score\\}', hint: 'Insert the variable inside the f-string using {score}.' },
        ],
      },
      {
        id: 'q3-13',
        type: 'code-challenge',
        prompt: 'Reverse the string "Python" and print it.\nExpected output: nohtyP',
        starterCode: `word = "Python"\n# Print the reversed string\n`,
        expectedOutput: 'nohtyP',
        correctAnswer: '__code__',
        explanation: 'print(word[::-1]) uses slice notation with step -1 to reverse the string.',
        requiredPatterns: [
          { pattern: '::-1|word', hint: 'Use slice notation [::-1] on the word variable to reverse it.' },
        ],
      },
      {
        id: 'q3-14',
        type: 'code-challenge',
        prompt: 'Split "red,green,blue" by comma and print the second item.\nExpected output: green',
        starterCode: `colors = "red,green,blue"\n# Split and print the second item\n`,
        expectedOutput: 'green',
        correctAnswer: '__code__',
        explanation: 'parts = colors.split(",") gives ["red","green","blue"]. print(parts[1]) prints "green".',
        requiredPatterns: [
          { pattern: '\\.split\\s*\\(', hint: 'Use the .split(",") method to split the string into a list.' },
          { pattern: '\\[1\\]', hint: 'Access the second item using index [1].' },
        ],
      },
    ],
  },
  {
    id: 'module-4',
    slug: '4',
    title: 'Lists',
    description: 'Master Python lists: methods, operations, 2D lists, and comprehensions.',
    icon: '📋',
    color: 'from-red-500 to-pink-400',
    locked: true,
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
nums.append(9)       # [3, 1, 4, 1, 5, 9]
nums.insert(0, 0)    # [0, 3, 1, 4, 1, 5, 9]

# Removing
nums.remove(1)       # removes first 1: [0, 3, 4, 1, 5, 9]
last = nums.pop()    # removes 9: last=9
print(last)          # 9

# Sorting
nums.sort()
print(nums)          # [0, 1, 3, 4, 5]

nums.reverse()
print(nums)          # [5, 4, 3, 1, 0]

# Searching
data = [10, 20, 10, 30]
print(data.count(10))  # 2
print(data.index(20))  # 1`,
            caption: 'Common list methods',
          },
        ],
      },
      {
        id: 'lesson-4-3',
        title: 'List Operations',
        content: `Lists support several operators:

- **+** (concatenation): combines two lists into a new list
- **\*** (repetition): repeats a list n times
- **in**: checks if an element exists in the list`,
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
print(len(c))   # 6`,
            caption: 'List operators: +, *, in',
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

# Iterate over a 2D list
for row in grid:
    for val in row:
        print(val, end=" ")
    print()  # newline after each row
# 1 2 3
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
  },
  {
    id: 'module-5',
    slug: '5',
    title: 'Tuples',
    description: 'Learn immutable sequences: creation, access, methods, and multiple return values.',
    icon: '📦',
    color: 'from-teal-500 to-cyan-400',
    locked: true,
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
- Usable as dictionary keys (lists cannot be)`,
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
print(len(point))   # 3`,
            caption: 'Tuple access and immutability',
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
        prompt: 'Given:\n```python\ndef swap(a, b):\n    return b, a\nx, y = swap(1, 2)\n```\nWhat is `x`?',
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
  },
  {
    id: 'module-6',
    slug: '6',
    title: 'Dictionaries',
    description: 'Store and retrieve data with key-value pairs, methods, and comprehensions.',
    icon: '📚',
    color: 'from-indigo-500 to-blue-400',
    locked: true,
    lessons: [
      {
        id: 'lesson-6-1',
        title: 'Creating Dictionaries',
        content: `A dictionary stores data as **key-value pairs**. Keys must be unique and immutable (strings, numbers, tuples). Values can be anything.

- Created with curly braces '{}' or 'dict()'
- Access values by key with square brackets or 'get()'`,
        codeExamples: [
          {
            language: 'python',
            code: `# Creating a dictionary
person = {
    "name": "Alice",
    "age": 25,
    "city": "Seoul"
}

# Using dict()
scores = dict(math=95, english=88, science=92)

# Keys can be different types
mixed = {
    1: "one",
    "two": 2,
    (3, 4): "tuple key"
}

# Empty dictionary
empty = {}`,
            caption: 'Creating dictionaries with {} and dict()',
          },
        ],
      },
      {
        id: 'lesson-6-2',
        title: 'Access, Add, Change & Delete',
        content: `**Accessing**: Use 'd[key]' — raises KeyError if key doesn't exist.

**Adding/Changing**: Use 'd[key] = value' — adds if new, updates if exists.

**Deleting**: Use 'del d[key]' — raises KeyError if key doesn't exist.`,
        codeExamples: [
          {
            language: 'python',
            code: `person = {"name": "Alice", "age": 25}

# Access
print(person["name"])   # Alice

# KeyError if key missing!
try:
    print(person["email"])
except KeyError:
    print("Key not found!")

# Add new key
person["email"] = "alice@example.com"
print(person)

# Change existing value
person["age"] = 26
print(person["age"])    # 26

# Delete
del person["email"]
print(person)`,
            caption: 'Accessing, adding, changing, deleting in dicts',
          },
        ],
      },
      {
        id: 'lesson-6-3',
        title: 'Dictionary Methods',
        content: `**Viewing contents:**
- 'keys()': returns all keys
- 'values()': returns all values
- 'items()': returns all key-value pairs as tuples

**Safe access:**
- 'get(key, default)': returns value or default (no KeyError)

**Modifying:**
- 'pop(key)': removes and returns value
- 'update(other_dict)': merges another dict in`,
        codeExamples: [
          {
            language: 'python',
            code: `d = {"a": 1, "b": 2, "c": 3}

# View keys, values, items
print(list(d.keys()))    # ['a', 'b', 'c']
print(list(d.values()))  # [1, 2, 3]
print(list(d.items()))   # [('a',1), ('b',2), ('c',3)]

# Safe access with get()
print(d.get("a"))         # 1
print(d.get("z"))         # None (no error!)
print(d.get("z", 0))     # 0  (custom default)

# pop() removes and returns
val = d.pop("b")
print(val)      # 2
print(d)        # {'a': 1, 'c': 3}

# update() merges
d.update({"d": 4, "e": 5})
print(d)        # {'a':1, 'c':3, 'd':4, 'e':5}`,
            caption: 'Dictionary methods: keys, values, items, get, pop, update',
          },
        ],
      },
      {
        id: 'lesson-6-4',
        title: 'Looping Over Dictionaries',
        content: `There are several ways to iterate over a dictionary:

- **for k in d**: iterates over keys
- **for k, v in d.items()**: iterates over key-value pairs (most common)
- **for v in d.values()**: iterates over values only`,
        codeExamples: [
          {
            language: 'python',
            code: `grades = {"Alice": 90, "Bob": 85, "Carol": 92}

# Loop over keys only
for name in grades:
    print(name)
# Alice, Bob, Carol

# Loop over key-value pairs (most useful)
for name, score in grades.items():
    print(f"{name}: {score}")
# Alice: 90
# Bob: 85
# Carol: 92

# Loop over values only
for score in grades.values():
    print(score)
# 90, 85, 92`,
            caption: 'Iterating over dictionary keys, values, and items',
          },
        ],
      },
      {
        id: 'lesson-6-5',
        title: 'Dictionary Comprehensions',
        content: `Like list comprehensions, dict comprehensions create dictionaries concisely.

**Syntax**: '{key_expr: value_expr for var in iterable if condition}'`,
        codeExamples: [
          {
            language: 'python',
            code: `# Basic dict comprehension
squares = {k: k**2 for k in range(5)}
print(squares)
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# From an existing list
words = ["apple", "banana", "cherry"]
lengths = {word: len(word) for word in words}
print(lengths)
# {'apple': 5, 'banana': 6, 'cherry': 6}

# With a condition (filter)
even_squares = {k: k**2 for k in range(10) if k % 2 == 0}
print(even_squares)
# {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}`,
            caption: 'Dictionary comprehension syntax and examples',
          },
        ],
      },
    ],
    questions: [
      {
        id: 'q6-1',
        type: 'multiple-choice',
        prompt: 'After `d = {"a": 1}` then `d["b"] = 2`, what is `len(d)`?',
        choices: [
          { id: 'a', text: '1' },
          { id: 'b', text: '2' },
          { id: 'c', text: '3' },
          { id: 'd', text: 'Error' },
        ],
        correctAnswer: 'b',
        explanation: 'Adding a new key "b" makes the dictionary have 2 key-value pairs, so len(d) is 2.',
      },
      {
        id: 'q6-2',
        type: 'fill-in-blank',
        prompt: '`d = {"x": 10}` — to safely get key "y" with default 0, you write `d.______(\"y\", 0)`. What method name fills the blank?',
        correctAnswer: 'get',
        explanation: 'get(key, default) returns the value if the key exists, otherwise returns the default. It never raises a KeyError.',
      },
      {
        id: 'q6-3',
        type: 'true-false',
        prompt: 'Dictionary keys must be unique — you cannot have two of the same key.',
        correctAnswer: 'true',
        explanation: 'Keys are unique in a dictionary. If you assign a value to an existing key, it overwrites the old value.',
      },
      {
        id: 'q6-4',
        type: 'multiple-choice',
        prompt: 'When you use `for k, v in d.items():`, what does each iteration give you?',
        choices: [
          { id: 'a', text: 'Just the key k' },
          { id: 'b', text: 'Just the value v' },
          { id: 'c', text: 'A tuple of (key, value)' },
          { id: 'd', text: 'The index and key' },
        ],
        correctAnswer: 'c',
        explanation: 'd.items() returns (key, value) tuples. The "for k, v in" pattern unpacks each tuple into k and v.',
      },
      {
        id: 'q6-5',
        type: 'multiple-choice',
        prompt: 'What does `{k: k**2 for k in range(3)}` produce?',
        choices: [
          { id: 'a', text: '{1: 1, 2: 4, 3: 9}' },
          { id: 'b', text: '{0: 0, 1: 1, 2: 4}' },
          { id: 'c', text: '[0, 1, 4]' },
          { id: 'd', text: '{0: 0, 1: 1, 2: 4, 3: 9}' },
        ],
        correctAnswer: 'b',
        explanation: 'range(3) is 0, 1, 2. The comprehension maps each k to k**2: {0:0, 1:1, 2:4}.',
      },
      {
        id: 'q6-6',
        type: 'true-false',
        prompt: 'Accessing a missing key with `d["missing"]` raises a KeyError.',
        correctAnswer: 'true',
        explanation: 'Direct key access raises KeyError if the key does not exist. Use d.get("missing") to avoid the error.',
      },
      {
        id: 'q6-7',
        type: 'multiple-choice',
        prompt: 'What does `d.keys()` return for `d = {"a": 1, "b": 2}`?',
        choices: [
          { id: 'a', text: '[1, 2]' },
          { id: 'b', text: '("a", "b")' },
          { id: 'c', text: 'dict_keys(["a", "b"])' },
          { id: 'd', text: '"a", "b"' },
        ],
        correctAnswer: 'c',
        explanation: 'keys() returns a dict_keys view of all keys. You can iterate over it or convert it with list().',
      },
      {
        id: 'q6-8',
        type: 'fill-in-blank',
        prompt: 'To delete a key from a dict: `d = {"x": 1}` then `del d[_____]` removes key "x". What goes in the blank?',
        correctAnswer: '"x"',
        explanation: 'del d["x"] removes the key "x" and its value from the dictionary.',
      },
      {
        id: 'q6-9',
        type: 'multiple-choice',
        prompt: 'What does `d.get("z", 99)` return if "z" is not in d?',
        choices: [
          { id: 'a', text: 'None' },
          { id: 'b', text: 'Error' },
          { id: 'c', text: '0' },
          { id: 'd', text: '99' },
        ],
        correctAnswer: 'd',
        explanation: 'get(key, default) returns the default value (99) when the key is not found, instead of raising an error.',
      },
      {
        id: 'q6-10',
        type: 'true-false',
        prompt: '`d.values()` returns a view of all values in the dictionary.',
        correctAnswer: 'true',
        explanation: 'values() returns a dict_values view of all values. It updates automatically if the dict changes.',
      },
      {
        id: 'q6-11',
        type: 'code-challenge',
        prompt: 'Create a dictionary with keys "name" and "age" set to "Bob" and 25. Print the value of "name".\nExpected output: Bob',
        starterCode: `# Create the dictionary and print the value of "name"\n`,
        expectedOutput: 'Bob',
        correctAnswer: '__code__',
        explanation: 'd = {"name": "Bob", "age": 25} then print(d["name"]) prints "Bob".',
      },
      {
        id: 'q6-12',
        type: 'code-challenge',
        prompt: 'Count the number of keys in {"a": 1, "b": 2, "c": 3} and print it.\nExpected output: 3',
        starterCode: `d = {"a": 1, "b": 2, "c": 3}\n# Print the number of keys\n`,
        expectedOutput: '3',
        correctAnswer: '__code__',
        explanation: 'print(len(d)) returns the number of key-value pairs, which is 3.',
      },
      {
        id: 'q6-13',
        type: 'code-challenge',
        prompt: 'Print all keys in {"x": 10, "y": 20, "z": 30}, one per line, in sorted order.\nExpected output:\n    x\n    y\n    z',
        starterCode: `d = {"x": 10, "y": 20, "z": 30}\n# Print keys in sorted order\n`,
        expectedOutput: 'x\ny\nz',
        correctAnswer: '__code__',
        explanation: 'for k in sorted(d.keys()): print(k) prints keys alphabetically.',
      },
      {
        id: 'q6-14',
        type: 'code-challenge',
        prompt: 'Use a dict comprehension to create {1: 1, 2: 4, 3: 9} and print it.\nExpected output: {1: 1, 2: 4, 3: 9}',
        starterCode: `# Create the dict using a comprehension and print it\n`,
        expectedOutput: '{1: 1, 2: 4, 3: 9}',
        correctAnswer: '__code__',
        explanation: 'print({k: k**2 for k in range(1, 4)}) produces {1:1, 2:4, 3:9}.',
      },
      {
        id: 'q6-15',
        type: 'code-challenge',
        prompt: 'Given scores = {"Alice": 90, "Bob": 75}, print the name of the person with the highest score.\nExpected output: Alice',
        starterCode: `scores = {"Alice": 90, "Bob": 75}\n# Print the name of the top scorer\n`,
        expectedOutput: 'Alice',
        correctAnswer: '__code__',
        explanation: 'print(max(scores, key=scores.get)) finds the key with the highest value.',
      },
    ],
  },
];

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}

export function getAllModules(): Module[] {
  return MODULES;
}

export { MODULES };
