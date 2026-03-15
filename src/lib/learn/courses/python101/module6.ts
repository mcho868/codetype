import type { Module } from './types';

const module6: Module = {
  id: 'module-6',
  slug: '6',
  title: 'Dictionaries',
  description: 'Store and retrieve data with key-value pairs, methods, and comprehensions.',
  icon: '📚',
  color: 'from-indigo-500 to-blue-400',
  locked: false,
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
- 'update(other_dict)': merges another dict in

**Finding min/max by value:**

'max()' and 'min()' accept a 'key=' argument — a function that tells Python *what to compare*. To find the key with the highest value in a dictionary, use:
'max(d, key=d.get)'

This tells 'max()' to compare keys by looking up their values via 'd.get'.`,
      codeExamples: [
        {
          language: 'python',
          code: `d = {"a": 1, "b": 2, "c": 3}

# View keys, values, items
print(list(d.keys()))    # ['a', 'b', 'c']
print(list(d.values()))  # [1, 2, 3]
print(list(d.items()))   # [('a',1), ('b',2), ('c',3)]

# Safe access with get()
print(d.get("a"))        # 1
print(d.get("z"))        # None (no error!)
print(d.get("z", 0))    # 0  (custom default)

# pop() removes and returns
val = d.pop("b")
print(val)      # 2
print(d)        # {'a': 1, 'c': 3}

# update() merges
d.update({"d": 4, "e": 5})
print(d)        # {'a':1, 'c':3, 'd':4, 'e':5}

# max/min by value using key=
scores = {"Alice": 90, "Bob": 75, "Carol": 88}
best  = max(scores, key=scores.get)
worst = min(scores, key=scores.get)
print(best)   # Alice
print(worst)  # Bob`,
          caption: 'Dictionary methods: keys, values, items, get, pop, update, max/min by value',
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
};

export default module6;
