import type { Module } from './types';

const module3: Module = {
  id: 'module-3',
  slug: '3',
  title: 'Strings & File I/O',
  description: 'Work with text: slicing, methods, formatting, and reading/writing files.',
  icon: '📝',
  color: 'from-yellow-500 to-orange-400',
  locked: false,
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
      prompt: 'Complete the f-string:\n    name = "Bob"\n    print(____"Hello, {name}!")\nWhat prefix fills the blank? (length of _ does not equal to the length of answer)',
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
};

export default module3;
