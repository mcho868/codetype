import type { Module } from './types';

const module0: Module = {
  id: 'module-0',
  slug: '0',
  title: 'Testing & Exceptions',
  description: 'Write robust Python programs using exception handling and unit testing principles.',
  icon: '🧪',
  color: 'from-red-500 to-rose-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-0-1',
      title: 'Exception Handling',
      content: `Every program encounters unexpected situations — a user types letters where you expected a number, a file doesn't exist, or you try to divide by zero. Without any protection, Python stops your program immediately with an error message. **Exception handling** lets you anticipate these problems and respond gracefully instead of crashing.

The core tool is the **try/except block**. You put the risky code inside \`try:\`, and the code that should run if something goes wrong inside \`except:\`. If the try block raises an exception, Python jumps straight to the matching except clause and runs that code instead. If everything in try succeeds, the except block is skipped entirely.

You can catch specific exception types by naming them: \`except ZeroDivisionError:\` or \`except ValueError:\`. This is important — catching only the exceptions you expect means you won't accidentally hide real bugs. You can also use \`as e\` to capture the exception object and read its message with \`str(e)\` or just \`e\`.

The **finally** block runs no matter what — whether the try block succeeded or raised an exception. This is perfect for cleanup work: closing files, releasing resources, or printing a summary message. Think of finally as "always do this at the end."

The **raise** statement lets you deliberately trigger an exception yourself. This is useful when you detect an invalid situation in your own logic — for example, if someone calls your function with a negative age. You can raise any built-in exception type, or even create your own custom exception classes (more on that in the next lesson).`,
      codeExamples: [
        {
          language: 'python',
          code: `# Basic try/except: catching division by zero
def divide(a, b):
    try:
        result = a / b
        print("Result:", result)
    except ZeroDivisionError:
        print("Error: cannot divide by zero!")

divide(10, 2)   # prints: Result: 5.0
divide(10, 0)   # prints: Error: cannot divide by zero!`,
          caption: 'Catching ZeroDivisionError with try/except',
          editable: true,
        },
        {
          language: 'python',
          code: `# Catching ValueError when converting strings to int
def get_age(text):
    try:
        age = int(text)
        print("Your age is", age)
    except ValueError as e:
        print("That's not a valid number:", str(e))
    finally:
        print("Done processing input.")

get_age("25")       # works fine
get_age("twenty")   # triggers ValueError`,
          caption: 'ValueError from int() conversion, with finally block',
          editable: true,
        },
        {
          language: 'python',
          code: `# Using raise to enforce preconditions
def set_temperature(degrees):
    if degrees < -273.15:
        raise ValueError(f"Temperature {degrees} is below absolute zero!")
    print("Temperature set to", degrees)

try:
    set_temperature(100)
    set_temperature(-300)   # this raises ValueError
except ValueError as e:
    print("Invalid input:", e)`,
          caption: 'Using raise to signal invalid input',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-0-2',
      title: 'Exception Types & Hierarchy',
      content: `Python has a rich family of built-in exceptions, all arranged in a hierarchy. At the very top is **BaseException**, which covers everything including keyboard interrupts. Below that is **Exception**, the base class for all "normal" errors your programs will encounter. Most of the exceptions you'll deal with are subclasses of Exception.

The most common built-in exceptions are: **ValueError** (right type, wrong value — like int("hello")), **TypeError** (wrong type entirely — like "abc" + 5), **IndexError** (list index out of range), **KeyError** (dictionary key doesn't exist), **ZeroDivisionError** (dividing by zero), and **FileNotFoundError** (file or directory doesn't exist).

Understanding the hierarchy matters because catching a parent class also catches all its subclasses. \`except Exception:\` catches almost everything. This can be a double-edged sword — it's convenient, but it might hide unexpected errors. As a general rule, catch the most specific exception type that makes sense for your situation.

You can catch multiple different exception types in a single except clause using a tuple: \`except (ValueError, TypeError) as e:\`. This is cleaner than writing two separate except blocks when you want to handle two error types the same way. You can also chain multiple except clauses to handle different exceptions differently.

When you have multiple except clauses, Python checks them in order from top to bottom and runs the first one that matches. Put more specific exceptions before more general ones — if you put \`except Exception:\` first, the specific ones below it will never be reached.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Different exception types for different errors
def risky_operations(data, index, key):
    try:
        value = data[index]       # might be IndexError
        number = int(value)       # might be ValueError
        result = 100 / number     # might be ZeroDivisionError
        print("Result:", result)
    except IndexError:
        print("Index out of range!")
    except ValueError:
        print("Could not convert to number!")
    except ZeroDivisionError:
        print("Cannot divide by zero!")

risky_operations(["10", "0", "abc"], 0, "x")  # works: 10.0
risky_operations(["10", "0", "abc"], 1, "x")  # ZeroDivisionError
risky_operations(["10", "0", "abc"], 2, "x")  # ValueError
risky_operations(["10", "0", "abc"], 9, "x")  # IndexError`,
          caption: 'Chaining multiple except clauses for different error types',
          editable: true,
        },
        {
          language: 'python',
          code: `# Catching multiple exceptions in one clause
def parse_value(s):
    try:
        return int(s)
    except (ValueError, TypeError) as e:
        print(f"Could not parse '{s}': {e}")
        return None

print(parse_value("42"))      # 42
print(parse_value("hello"))   # ValueError
print(parse_value(None))      # TypeError`,
          caption: 'Catching multiple exception types with a tuple',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-0-3',
      title: 'Unit Testing',
      content: `A **unit test** is a small piece of code whose sole job is to verify that one specific piece of your program works correctly. The "unit" is typically a single function. Good unit tests are automated (they run without human input), independent (each test doesn't depend on others passing), and repeatable (they always give the same result).

Why write tests? Because without them, the only way to know your code works is to manually run it and stare at the output. That doesn't scale. When you add a new feature or fix a bug, tests catch if you accidentally broke something that was working before — this is called a **regression**. Teams with good test coverage can make changes confidently.

The simplest form of testing uses Python\'s built-in **assert** statement. \`assert condition\` does nothing if condition is True, but raises an AssertionError immediately if it’s False. This lets you write quick sanity checks. A more structured approach uses the **pytest** framework — you write functions whose names start with \`test_\`, and pytest discovers and runs them all, reporting any failures.

Good tests cover three categories: **normal cases** (typical inputs that should work), **edge cases** (boundary values like empty lists, zero, very large numbers), and **error cases** (inputs that should raise exceptions). Thinking about edge cases forces you to understand your function's requirements deeply. For exception testing, use \`try/except\` in your test to confirm the right exception is raised.

The mindset shift that comes with testing is powerful: instead of asking "does my code run?" you ask "does my code do exactly what it's supposed to do?" Writing the test first, before the implementation, is a technique called **Test-Driven Development (TDD)** — it forces you to clearly define what correct behaviour looks like before you write a single line of logic.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Simple assertion-based tests for a function
def add(a, b):
    return a + b

# Normal cases
assert add(2, 3) == 5, "2 + 3 should be 5"
assert add(-1, 1) == 0, "-1 + 1 should be 0"
assert add(0, 0) == 0, "0 + 0 should be 0"

# Edge case: large numbers
assert add(1000000, 2000000) == 3000000

print("All tests passed!")`,
          caption: 'Testing a function with assert statements',
          editable: true,
        },
        {
          language: 'python',
          code: `# Testing normal, edge, and error cases
def safe_sqrt(n):
    if n < 0:
        raise ValueError("Cannot take sqrt of negative number")
    return n ** 0.5

# Normal case
assert abs(safe_sqrt(4) - 2.0) < 0.001

# Edge case: zero
assert safe_sqrt(0) == 0.0

# Error case: negative input should raise ValueError
try:
    safe_sqrt(-1)
    print("ERROR: should have raised ValueError!")
except ValueError:
    print("Correctly raised ValueError for negative input")

print("All tests passed!")`,
          caption: 'Testing normal, edge, and error cases including exceptions',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q0-1',
      type: 'multiple-choice',
      prompt: 'What happens when Python encounters a ZeroDivisionError inside a try block?',
      choices: [
        { id: 'a', text: 'The program crashes immediately' },
        { id: 'b', text: 'Python skips the rest of the try block and runs the matching except block' },
        { id: 'c', text: 'Python ignores the error and continues' },
        { id: 'd', text: 'Python restarts from the beginning of the try block' },
      ],
      correctAnswer: 'b',
      explanation: 'When an exception occurs in a try block, Python immediately jumps to the matching except clause. The remaining code in the try block is skipped.',
    },
    {
      id: 'q0-2',
      type: 'multiple-choice',
      prompt: 'Which exception does int("hello") raise?',
      choices: [
        { id: 'a', text: 'TypeError' },
        { id: 'b', text: 'IndexError' },
        { id: 'c', text: 'ValueError' },
        { id: 'd', text: 'RuntimeError' },
      ],
      correctAnswer: 'c',
      explanation: 'int("hello") raises ValueError because "hello" has the right type (string) but is not a valid integer value. TypeError would occur if you passed the wrong type entirely, like int([1,2,3]).',
    },
    {
      id: 'q0-3',
      type: 'true-false',
      prompt: 'The finally block only runs if no exception was raised in the try block.',
      correctAnswer: 'false',
      explanation: 'The finally block always runs, regardless of whether an exception occurred. It is used for cleanup code that must execute no matter what.',
    },
    {
      id: 'q0-4',
      type: 'fill-in-blank',
      prompt: 'To capture an exception object and store it in variable e, you write: except ValueError ___ e:',
      correctAnswer: 'as',
      explanation: 'The "as" keyword binds the exception object to a variable: except ValueError as e: — you can then call str(e) to get the error message.',
    },
    {
      id: 'q0-5',
      type: 'multiple-choice',
      prompt: 'You want to handle ValueError and TypeError the same way. Which is the most concise correct syntax?',
      choices: [
        { id: 'a', text: 'except ValueError or TypeError:' },
        { id: 'b', text: 'except (ValueError, TypeError):' },
        { id: 'c', text: 'except ValueError, TypeError:' },
        { id: 'd', text: 'except [ValueError, TypeError]:' },
      ],
      correctAnswer: 'b',
      explanation: 'Use a tuple of exception types: except (ValueError, TypeError): — this catches either type and handles them with the same code.',
    },
    {
      id: 'q0-6',
      type: 'multiple-choice',
      prompt: 'What does the raise statement do?',
      choices: [
        { id: 'a', text: 'It silences an exception so the program continues normally' },
        { id: 'b', text: 'It deliberately triggers an exception' },
        { id: 'c', text: 'It prints the exception message to the screen' },
        { id: 'd', text: 'It re-runs the try block' },
      ],
      correctAnswer: 'b',
      explanation: 'raise deliberately triggers an exception. You use it to signal that an error condition has been detected, for example when a function receives an invalid argument.',
    },
    {
      id: 'q0-7',
      type: 'true-false',
      prompt: 'Catching "Exception" as a base class will also catch ValueError and TypeError, since they are subclasses of Exception.',
      correctAnswer: 'true',
      explanation: 'Because of the exception hierarchy, catching a parent class catches all subclasses. ValueError and TypeError both inherit from Exception, so "except Exception:" catches them both.',
    },
    {
      id: 'q0-8',
      type: 'multiple-choice',
      prompt: 'Which exception would accessing my_list[99] raise when my_list has only 3 elements?',
      choices: [
        { id: 'a', text: 'KeyError' },
        { id: 'b', text: 'ValueError' },
        { id: 'c', text: 'IndexError' },
        { id: 'd', text: 'TypeError' },
      ],
      correctAnswer: 'c',
      explanation: 'Accessing a list with an out-of-range index raises IndexError. KeyError is raised for missing dictionary keys, not list indices.',
    },
    {
      id: 'q0-9',
      type: 'multiple-choice',
      prompt: 'In unit testing, what does an "edge case" refer to?',
      choices: [
        { id: 'a', text: 'A test that always fails' },
        { id: 'b', text: 'A typical, everyday input to the function' },
        { id: 'c', text: 'A boundary or unusual input like zero, empty list, or very large number' },
        { id: 'd', text: 'A test that checks for syntax errors' },
      ],
      correctAnswer: 'c',
      explanation: 'Edge cases are boundary or unusual inputs — zero, empty collections, negative numbers, very large values. They often reveal bugs that normal cases miss.',
    },
    {
      id: 'q0-10',
      type: 'true-false',
      prompt: 'assert 5 == 5 raises an AssertionError.',
      correctAnswer: 'false',
      explanation: 'assert raises AssertionError only when the condition is False. Since 5 == 5 is True, assert 5 == 5 does nothing and execution continues normally.',
    },
    {
      id: 'q0-11',
      type: 'fill-in-blank',
      prompt: 'To access the message text from a caught exception e, you call: ___(e)',
      correctAnswer: 'str',
      explanation: 'str(e) converts the exception object to its string representation, giving you the human-readable error message.',
    },
    {
      id: 'q0-12',
      type: 'code-challenge',
      language: 'python',
      prompt: "Write a function `safe_divide(a, b)` that returns `a / b`, but returns 0 if b is 0. Then call `safe_divide(10, 2)` and `safe_divide(5, 0)` and print each result.",
      starterCode: "def safe_divide(a, b):\n    # Your code here\n    pass\n\nprint(safe_divide(10, 2))\nprint(safe_divide(5, 0))",
      expectedOutput: "5.0\n0",
      correctAnswer: '__code__',
      explanation: 'Use a try/except block: try to return a / b, and in an except ZeroDivisionError block, return 0.',
    },
    {
      id: 'q0-13',
      type: 'code-challenge',
      language: 'python',
      prompt: "Write a function `parse_int(s)` that converts a string to int. If the string is not a valid integer, catch the ValueError and return -1. Test it: print parse_int('42'), parse_int('hello'), parse_int('0').",
      starterCode: "def parse_int(s):\n    # Your code here\n    pass\n\nprint(parse_int('42'))\nprint(parse_int('hello'))\nprint(parse_int('0'))",
      expectedOutput: "42\n-1\n0",
      correctAnswer: '__code__',
      explanation: 'Wrap int(s) in a try block. In the except ValueError block, return -1. This pattern is extremely common for safe user input parsing.',
    },
  ],
};

export default module0;
