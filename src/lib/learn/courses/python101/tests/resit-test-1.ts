import type { Question } from '../types';

export interface CourseTest {
  id: string;
  slug: string;
  title: string;
  description: string;
  questions: Question[];
}

const resitTest1: CourseTest = {
  id: 'python101-resit-1',
  slug: 'resit-1',
  title: 'Python 101 — Test',
  description: 'A formal assessment covering the full Python 101 course: variables, control flow, strings, lists, tuples, and dictionaries.',
  questions: [
    // ── Multiple Choice (3) ──────────────────────────────────────────────
    {
      id: 'rt1-mc-1',
      type: 'multiple-choice',
      prompt: `What is the output of the following code?

\`\`\`python
x = 10
y = 3
print(x // y, x % y)
\`\`\``,
      choices: [
        { id: 'a', text: '3 1' },
        { id: 'b', text: '3.33 1' },
        { id: 'c', text: '3 2' },
        { id: 'd', text: '4 1' },
      ],
      correctAnswer: 'a',
      explanation: '`//` is integer (floor) division: 10 // 3 = 3. `%` is the modulo (remainder): 10 % 3 = 1. So the output is `3 1`.',
    },
    {
      id: 'rt1-mc-2',
      type: 'multiple-choice',
      prompt: `Which of the following correctly describes a Python dictionary?`,
      choices: [
        { id: 'a', text: 'An ordered, immutable sequence of items' },
        { id: 'b', text: 'An unordered collection of unique values' },
        { id: 'c', text: 'A collection of key-value pairs where keys must be unique' },
        { id: 'd', text: 'A mutable sequence that allows duplicate elements' },
      ],
      correctAnswer: 'c',
      explanation: 'A dictionary stores key-value pairs. Keys must be unique and immutable (e.g. strings, numbers). Values can be anything and may be duplicated.',
    },
    {
      id: 'rt1-mc-3',
      type: 'multiple-choice',
      prompt: `What does the following list comprehension produce?

\`\`\`python
result = [x ** 2 for x in range(1, 6) if x % 2 == 0]
\`\`\``,
      choices: [
        { id: 'a', text: '[1, 4, 9, 16, 25]' },
        { id: 'b', text: '[4, 16]' },
        { id: 'c', text: '[2, 4]' },
        { id: 'd', text: '[1, 9, 25]' },
      ],
      correctAnswer: 'b',
      explanation: '`range(1, 6)` gives 1–5. The `if x % 2 == 0` filter keeps only even numbers: 2 and 4. Squaring them gives [4, 16].',
    },

    // ── Coding Questions (5, easy → hard) ────────────────────────────────
    {
      id: 'rt1-code-1',
      type: 'code-challenge',
      language: 'python',
      prompt: `Write a function \`celsius_to_fahrenheit(c)\` that converts a Celsius temperature to Fahrenheit using the formula \`F = c * 9/5 + 32\`. Print the result for 0°C and 100°C, one per line.

**Sample Input**
\`\`\`
celsius_to_fahrenheit(0)
celsius_to_fahrenheit(100)
\`\`\`

**Sample Output**
\`\`\`
32.0
212.0
\`\`\``,
      starterCode: "",
      expectedOutput: "32.0\n212.0",
      correctAnswer: '__code__',
      explanation: 'Apply the formula F = c * 9/5 + 32. For 0°C → 32.0°F and 100°C → 212.0°F.',
    },
    {
      id: 'rt1-code-2',
      type: 'code-challenge',
      language: 'python',
      prompt: `Write a function \`count_vowels(s)\` that returns the number of vowel characters (a, e, i, o, u — case-insensitive) in a string. Print the result for \`"Hello, World!"\`.

**Sample Input**
\`\`\`
count_vowels("Hello, World!")
\`\`\`

**Sample Output**
\`\`\`
3
\`\`\``,
      starterCode: "",
      expectedOutput: "3",
      correctAnswer: '__code__',
      explanation: 'Iterate over each character and check if it is in the vowels string. "Hello, World!" contains e, o, o — 3 vowels.',
    },
    {
      id: 'rt1-code-3',
      type: 'code-challenge',
      language: 'python',
      prompt: `Write a function \`word_lengths(sentence)\` that takes a string of space-separated words and returns a dictionary mapping each word to its length. Print the result for \`"python is fun"\`.

**Sample Input**
\`\`\`
word_lengths("python is fun")
\`\`\`

**Sample Output**
\`\`\`
{'python': 6, 'is': 2, 'fun': 3}
\`\`\``,
      starterCode: "",
      expectedOutput: "{'python': 6, 'is': 2, 'fun': 3}",
      correctAnswer: '__code__',
      explanation: 'Split the sentence with .split(), then build a dict comprehension or loop: {word: len(word) for word in words}.',
    },
    {
      id: 'rt1-code-4',
      type: 'code-challenge',
      language: 'python',
      prompt: `Write a function \`second_largest(lst)\` that returns the second largest unique value in a list. Assume the list has at least 2 distinct values. Print the result for \`[4, 1, 7, 3, 7, 2]\`.

**Sample Input**
\`\`\`
second_largest([4, 1, 7, 3, 7, 2])
\`\`\`

**Sample Output**
\`\`\`
4
\`\`\``,
      starterCode: "",
      expectedOutput: "4",
      correctAnswer: '__code__',
      explanation: 'Convert to a set to remove duplicates, then sort. The second largest is at index -2 of the sorted unique list. Unique values: {1,2,3,4,7} → sorted: [1,2,3,4,7] → second largest: 4.',
    },
    {
      id: 'rt1-code-5',
      type: 'code-challenge',
      language: 'python',
      prompt: `Write a function \`group_by_first_letter(words)\` that takes a list of strings and returns a dictionary where each key is a letter and the value is a sorted list of words starting with that letter. Print the result for \`["banana", "apple", "avocado", "blueberry", "cherry", "apricot"]\`. Print keys in alphabetical order.

**Sample Input**
\`\`\`
group_by_first_letter(["banana", "apple", "avocado", "blueberry", "cherry", "apricot"])
\`\`\`

**Sample Output**
\`\`\`
a: ['apple', 'apricot', 'avocado']
b: ['banana', 'blueberry']
c: ['cherry']
\`\`\``,
      starterCode: "",
      expectedOutput: "a: ['apple', 'apricot', 'avocado']\nb: ['banana', 'blueberry']\nc: ['cherry']",
      correctAnswer: '__code__',
      explanation: 'For each word, use word[0] as the key. Initialise result[key] = [] if missing, then append. Sort each list at the end with sorted() or .sort().',
    },
  ],
};

export default resitTest1;
