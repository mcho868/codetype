import type { Module } from '../python101/types';
import { cr, mc, stdoutCases } from './authoring';

const test5: Module = {
  id: 'test-5',
  slug: 'test-5',
  title: 'Week 5 Test — Sequences: Strings & Lists',
  description:
    'Practice questions on indexing, slicing, substrings, sublists, loops over sequences, and mutability.',
  icon: '📝',
  color: 'from-cyan-500 to-sky-400',
  locked: false,
  section: 'Week 5',
  lessons: [],
  questions: [
    cr(
      't5-q1',
      'Read a string `s` and print its **middle character(s)**:\n- If `s` is empty, print an empty line\n- If length is **odd**, print the single middle character\n- If length is **even**, print the **two** middle characters\n\nExamples: `abc` → `b`, `abcd` → `bc`, empty → (blank)',
      '',
      'stdout',
      stdoutCases(
        [{ id: 's1', description: 'Odd length', stdin: 'abc\n', expectedStdout: 'b' }],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '' },
          { id: 'h2', stdin: 'a\n', expectedStdout: 'a' },
          { id: 'h3', stdin: 'ab\n', expectedStdout: 'ab' },
          { id: 'h4', stdin: 'abcd\n', expectedStdout: 'bc' },
          { id: 'h5', stdin: 'hello\n', expectedStdout: 'l' },
        ]
      ),
      'Model solution:\ns = input()\nif not s:\n    print("")\nelse:\n    n = len(s)\n    mid = n // 2\n    if n % 2 == 1:\n        print(s[mid])\n    else:\n        print(s[mid - 1 : mid + 1])\n\nWhy: Integer division `n // 2` finds the center index. For even length, the two middles sit at indices mid-1 and mid, so `s[mid-1:mid+1]` returns both. Empty string is handled first to avoid an index error.'
    ),

    cr(
      't5-q2',
      'Read a string `s` and print the characters at indices 0, 2, 4, … using slice notation `s[::2]`.',
      '',
      'stdout',
      stdoutCases(
        [{ id: 's1', description: 'Every other from hello', stdin: 'hello\n', expectedStdout: 'hlo' }],
        [
          { id: 'h1', stdin: '\n', expectedStdout: '' },
          { id: 'h2', stdin: 'a\n', expectedStdout: 'a' },
          { id: 'h3', stdin: 'ab\n', expectedStdout: 'a' },
          { id: 'h4', stdin: 'abcdef\n', expectedStdout: 'ace' },
        ]
      ),
      'Model solution:\ns = input()\nprint(s[::2])\n\nWhy: Step slicing `[::2]` means "from start to end, step by 2", keeping indices 0, 2, 4… An empty string returns empty; a single char returns itself.'
    ),

    cr(
      't5-q3',
      'Read a string `s` (length ≥ 2) and print it with its **first and last characters swapped**, keeping everything in between unchanged. Use indexing and slicing.\n\nExample: `hello` → `oellh` (the `h` and `o` trade places).',
      '',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: 'Swap ends of hello',
            stdin: 'hello\n',
            expectedStdout: 'oellh',
          },
        ],
        [
          { id: 'h1', stdin: 'ab\n', expectedStdout: 'ba' },
          { id: 'h2', stdin: 'abcd\n', expectedStdout: 'dbca' },
          { id: 'h3', stdin: 'racecar\n', expectedStdout: 'racecar' },
          { id: 'h4', stdin: 'Python\n', expectedStdout: 'nythoP' },
        ]
      ),
      'Model solution:\ns = input()\nprint(s[-1] + s[1:-1] + s[0])\n\nWhy: Rebuild the string from three pieces — the last character, the untouched middle `s[1:-1]`, and the first character — concatenated with `+`. A palindrome like `racecar` looks unchanged because its ends are already equal.'
    ),

    cr(
      't5-q4',
      'Read a string `s` and print how many **vowels** it contains (`a, e, i, o, u`, both lowercase and uppercase). Use a **while loop with an index** and the `in` operator to test each character — do **not** use `.count()`.',
      '',
      'stdout',
      stdoutCases(
        [{ id: 's1', description: 'Vowels in hello', stdin: 'hello\n', expectedStdout: '2' }],
        [
          { id: 'h1', stdin: 'xyz\n', expectedStdout: '0' },
          { id: 'h2', stdin: 'AEIOU\n', expectedStdout: '5' },
          { id: 'h3', stdin: '\n', expectedStdout: '0' },
          { id: 'h4', stdin: 'banana\n', expectedStdout: '3' },
          { id: 'h5', stdin: 'Python\n', expectedStdout: '1' },
        ]
      ),
      'Model solution:\ns = input()\ncount = 0\ni = 0\nwhile i < len(s):\n    if s[i] in "aeiouAEIOU":\n        count = count + 1\n    i = i + 1\nprint(count)\n\nWhy: A while loop with an index (Week 4) walks the string; `s[i] in "aeiouAEIOU"` (the `in` operator from Week 5) tests membership against both cases at once. An empty string never enters the loop, so the count is 0.'
    ),

    cr(
      't5-q5',
      'Read a string `s` and print `True` if it reads the same forwards and backwards, else `False`. Use **slicing** (`s[::-1]`) to compare. An empty string is a palindrome.',
      '',
      'stdout',
      stdoutCases(
        [{ id: 's1', description: 'Classic palindrome', stdin: 'racecar\n', expectedStdout: 'True' }],
        [
          { id: 'h1', stdin: '\n', expectedStdout: 'True' },
          { id: 'h2', stdin: 'a\n', expectedStdout: 'True' },
          { id: 'h3', stdin: 'ab\n', expectedStdout: 'False' },
          { id: 'h4', stdin: 'abba\n', expectedStdout: 'True' },
          { id: 'h5', stdin: 'Python\n', expectedStdout: 'False' },
        ]
      ),
      'Model solution:\ns = input()\nprint(s == s[::-1])\n\nWhy: `s[::-1]` reverses the string. If it equals the original, it is a palindrome. Empty and single-char strings equal their reverse. This transfer question applies slicing to a real string-processing task.'
    ),

    mc(
      't5-q6',
      'What happens when you run this code?\n    s = "hello"\n    s[0] = "H"\n    lst = ["h", "e", "l", "l", "o"]\n    lst[0] = "H"',
      [
        { id: 'a', text: 'Both assignments succeed; s becomes "Hello" and lst becomes ["H", "e", "l", "l", "o"]' },
        { id: 'b', text: 's[0] = "H" raises TypeError; lst[0] = "H" succeeds' },
        { id: 'c', text: 'Both assignments raise TypeError' },
        { id: 'd', text: 's[0] = "H" succeeds; lst[0] = "H" raises TypeError' },
      ],
      'b',
      'Model answer: **b** — strings are **immutable**; lists are **mutable**.\n\nWhy:\n- `s[0] = "H"` on a string raises **TypeError: \'str\' object does not support item assignment**. You must create a new string instead (e.g. `"H" + s[1:]`).\n- `lst[0] = "H"` on a list **succeeds** — lists allow in-place element replacement.\n\nThis is a core Week 5 distinction. Mutating a list affects the same object; "changing" a string always creates a new string object.'
    ),
  ],
};

export default test5;
