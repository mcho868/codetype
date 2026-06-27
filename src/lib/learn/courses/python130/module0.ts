import type { Module } from './types';
import { cr, mc, tf, funcCases, ms } from './authoring';

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

The simplest form of testing uses Pythons built-in **assert** statement. \`assert condition\` does nothing if condition is True, but raises an AssertionError immediately if it's False. This lets you write quick sanity checks. A more structured approach uses the **pytest** framework — you write functions whose names start with \`test_\`, and pytest discovers and runs them all, reporting any failures.

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
    cr(
      'm0-c1',
      'Write `safe_divide(a, b)` that returns `a / b`, or `0` when `b` is zero (catch `ZeroDivisionError`).',
      'def safe_divide(a, b):\n    # Your code here\n    pass\n',
      'function',
      funcCases(
        'safe_divide',
        [
          { id: 's1', description: 'Normal division', args: [10, 2], expectedReturn: 5.0 },
          { id: 's2', description: 'Another valid division', args: [9, 3], expectedReturn: 3.0 },
        ],
        [
          { id: 'h1', args: [5, 0], expectedReturn: 0 },
          { id: 'h2', args: [0, 5], expectedReturn: 0.0 },
          { id: 'h3', args: [-10, 2], expectedReturn: -5.0 },
          { id: 'h4', args: [7, 0], expectedReturn: 0 },
        ]
      ),
      ms(
        'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 0',
        'Catch ZeroDivisionError and return 0 instead of crashing.'
      )
    ),
    cr(
      'm0-c2',
      'Write `parse_int(s)` that returns `int(s)`, or `-1` when the string is not a valid integer (catch `ValueError`).',
      'def parse_int(s):\n    # Your code here\n    pass\n',
      'function',
      funcCases(
        'parse_int',
        [
          { id: 's1', description: 'Valid integer string', args: ['42'], expectedReturn: 42 },
          { id: 's2', description: 'Non-numeric string', args: ['hello'], expectedReturn: -1 },
        ],
        [
          { id: 'h1', args: ['0'], expectedReturn: 0 },
          { id: 'h2', args: ['-7'], expectedReturn: -7 },
          { id: 'h3', args: ['3.5'], expectedReturn: -1 },
          { id: 'h4', args: [''], expectedReturn: -1 },
        ]
      ),
      ms(
        'def parse_int(s):\n    try:\n        return int(s)\n    except ValueError:\n        return -1',
        'Wrap int(s) in try/except ValueError and return -1 on failure.'
      )
    ),
    cr(
      'm0-c3',
      'Write `safe_get(lst, i)` that returns `lst[i]`, or `None` when the index is out of range (catch `IndexError`).',
      'def safe_get(lst, i):\n    # Your code here\n    pass\n',
      'function',
      funcCases(
        'safe_get',
        [
          { id: 's1', description: 'Valid index', args: [[1, 2, 3], 0], expectedReturn: 1 },
          { id: 's2', description: 'Out-of-range index', args: [[1, 2, 3], 10], expectedReturn: null },
        ],
        [
          { id: 'h1', args: [[1, 2, 3], -1], expectedReturn: 3 },
          { id: 'h2', args: [[], 0], expectedReturn: null },
          { id: 'h3', args: [[5], 0], expectedReturn: 5 },
        ]
      ),
      ms(
        'def safe_get(lst, i):\n    try:\n        return lst[i]\n    except IndexError:\n        return None',
        'Catch IndexError when the index is out of range.'
      )
    ),
    cr(
      'm0-c4',
      'Write `lookup(d, key)` that returns `d[key]`, or the string `"missing"` when the key is absent (catch `KeyError`).',
      'def lookup(d, key):\n    # Your code here\n    pass\n',
      'function',
      funcCases(
        'lookup',
        [
          { id: 's1', description: 'Present key', args: [{ a: 1 }, 'a'], expectedReturn: 1 },
          { id: 's2', description: 'Absent key', args: [{ a: 1 }, 'b'], expectedReturn: 'missing' },
        ],
        [
          { id: 'h1', args: [{}, 'x'], expectedReturn: 'missing' },
          { id: 'h2', args: [{ name: 'Ada' }, 'name'], expectedReturn: 'Ada' },
        ]
      ),
      ms(
        'def lookup(d, key):\n    try:\n        return d[key]\n    except KeyError:\n        return "missing"',
        'Catch KeyError for absent dictionary keys.'
      )
    ),
    cr(
      'm0-c5',
      'Write `validate_age(age)` that **raises `ValueError`** when `age` is below 0 or above 150, otherwise returns `age`.\n\nThe starter includes `check_validate_age` — **do not edit it**. Tests call that helper, which returns `"ok:<age>"` on success or `"error"` when `ValueError` is raised.',
      'def validate_age(age):\n    # Your code here\n    pass\n\n\ndef check_validate_age(age):\n    try:\n        result = validate_age(age)\n        return f"ok:{result}"\n    except ValueError:\n        return "error"\n',
      'function',
      funcCases(
        'check_validate_age',
        [
          { id: 's1', description: 'Valid age', args: [25], expectedReturn: 'ok:25' },
          { id: 's2', description: 'Negative age', args: [-1], expectedReturn: 'error' },
        ],
        [
          { id: 'h1', args: [151], expectedReturn: 'error' },
          { id: 'h2', args: [0], expectedReturn: 'ok:0' },
          { id: 'h3', args: [150], expectedReturn: 'ok:150' },
        ]
      ),
      ms(
        'def validate_age(age):\n    if age < 0 or age > 150:\n        raise ValueError("invalid age")\n    return age',
        'Raise ValueError for out-of-range ages; valid ages pass through.'
      )
    ),
    cr(
      'm0-c6',
      'Write `count_passes(results)` that returns how many scores in the list are **≥ 50**.',
      'def count_passes(results):\n    # Your code here\n    pass\n',
      'function',
      funcCases(
        'count_passes',
        [
          { id: 's1', description: 'Mixed scores', args: [[50, 49, 80]], expectedReturn: 2 },
          { id: 's2', description: 'Single pass', args: [[100]], expectedReturn: 1 },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: 0 },
          { id: 'h2', args: [[30, 40]], expectedReturn: 0 },
          { id: 'h3', args: [[50, 50, 50]], expectedReturn: 3 },
        ]
      ),
      ms(
        'def count_passes(results):\n    count = 0\n    for score in results:\n        if score >= 50:\n            count += 1\n    return count',
        'Loop once and count scores that meet the pass threshold.'
      )
    ),
    mc(
      'q0-1',
      'What happens when Python encounters a ZeroDivisionError inside a try block?',
      [
        { id: 'a', text: 'The program crashes immediately' },
        { id: 'b', text: 'Python skips the rest of the try block and runs the matching except block' },
        { id: 'c', text: 'Python ignores the error and continues' },
        { id: 'd', text: 'Python restarts from the beginning of the try block' },
      ],
      'b',
      'When an exception occurs in a try block, Python immediately jumps to the matching except clause. The remaining code in the try block is skipped.'
    ),
    mc(
      'q0-2',
      'Which exception does int("hello") raise?',
      [
        { id: 'a', text: 'TypeError' },
        { id: 'b', text: 'IndexError' },
        { id: 'c', text: 'ValueError' },
        { id: 'd', text: 'RuntimeError' },
      ],
      'c',
      'int("hello") raises ValueError because "hello" has the right type (string) but is not a valid integer value. TypeError would occur if you passed the wrong type entirely, like int([1,2,3]).'
    ),
    tf(
      'q0-3',
      'The finally block only runs if no exception was raised in the try block.',
      'false',
      'The finally block always runs, regardless of whether an exception occurred. It is used for cleanup code that must execute no matter what.'
    ),
    tf(
      'q0-7',
      'Catching "Exception" as a base class will also catch ValueError and TypeError, since they are subclasses of Exception.',
      'true',
      'Because of the exception hierarchy, catching a parent class catches all subclasses. ValueError and TypeError both inherit from Exception, so "except Exception:" catches them both.'
    ),
    mc(
      'q0-9',
      'In unit testing, what does an "edge case" refer to?',
      [
        { id: 'a', text: 'A test that always fails' },
        { id: 'b', text: 'A typical, everyday input to the function' },
        { id: 'c', text: 'A boundary or unusual input like zero, empty list, or very large number' },
        { id: 'd', text: 'A test that checks for syntax errors' },
      ],
      'c',
      'Edge cases are boundary or unusual inputs — zero, empty collections, negative numbers, very large values. They often reveal bugs that normal cases miss.'
    ),
    cr(
      'm0-c7',
      'Write `safe_index(lst, i)` that returns `lst[i]`, but returns `-1` if the index is out of range (catch `IndexError`).',
      'def safe_index(lst, i):\n    # Your code here\n    pass\n',
      'function',
      funcCases(
        'safe_index',
        [
          { id: 's1', description: 'Valid index', args: [[1, 2, 3], 1], expectedReturn: 2 },
          { id: 's2', description: 'Out of range', args: [[1, 2, 3], 9], expectedReturn: -1 },
        ],
        [
          { id: 'h1', args: [[], 0], expectedReturn: -1 },
          { id: 'h2', args: [[5], -1], expectedReturn: 5 },
          { id: 'h3', args: [[10, 20], 2], expectedReturn: -1 },
        ]
      ),
      ms(
        'def safe_index(lst, i):\n    try:\n        return lst[i]\n    except IndexError:\n        return -1',
        'Out-of-range indexing raises IndexError; catch it and return the -1 sentinel. Negative indices that are still in range (like -1) work normally.'
      )
    ),
    cr(
      'm0-c8',
      'Write `to_float(s)` that converts a string to a float, returning `0.0` if the string is not a valid number (catch `ValueError`).',
      'def to_float(s):\n    # Your code here\n    pass\n',
      'function',
      funcCases(
        'to_float',
        [
          { id: 's1', description: 'Valid float', args: ['3.5'], expectedReturn: 3.5 },
          { id: 's2', description: 'Invalid', args: ['x'], expectedReturn: 0.0 },
        ],
        [
          { id: 'h1', args: ['0'], expectedReturn: 0.0 },
          { id: 'h2', args: ['-2.5'], expectedReturn: -2.5 },
          { id: 'h3', args: ['hello'], expectedReturn: 0.0 },
        ]
      ),
      ms(
        'def to_float(s):\n    try:\n        return float(s)\n    except ValueError:\n        return 0.0',
        'float() raises ValueError on non-numeric text; catch it and fall back to 0.0. This mirrors safe input parsing.'
      )
    ),
    tf(
      'q0-13',
      'A single `try` block can be followed by multiple `except` clauses, each handling a different exception type.',
      'true',
      'You can chain except clauses; Python runs the first one whose type matches the raised exception. Order specific types before general ones.'
    ),
    mc(
      'q0-14',
      'What does `raise ValueError("bad input")` do if it is NOT inside a try block?',
      [
        { id: 'a', text: 'Nothing — raise only works inside try' },
        { id: 'b', text: 'It propagates up and, if uncaught, crashes the program with a traceback' },
        { id: 'c', text: 'It prints "bad input" and continues' },
        { id: 'd', text: 'It returns the string "bad input"' },
      ],
      'b',
      'A raised exception travels up the call stack looking for a matching except; if none is found, the program stops with a traceback.'
    ),
  ],
};

export default module0;
