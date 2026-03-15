import type { Module } from './types';

const module0: Module = {
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
};

export default module0;
