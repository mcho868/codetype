import type { Module } from '../python101/types';
import { cr, fileCases, funcCases, mc, tf } from './authoring';

const finalExam: Module = {
  id: 'python-essentials-final',
  slug: 'final-exam',
  title: 'Final Exam — Python Essentials',
  description:
    'A cumulative assessment covering all ten weeks: core syntax, control flow, sequences, methods, loops, functions, tuples, files, dictionaries, and nested data.',
  icon: '🏆',
  color: 'from-rose-500 to-violet-500',
  locked: false,
  quizOnly: true,
  section: 'Final Exam',
  lessons: [],
  questions: [
    cr(
      'pe-final-q1',
      'Implement `normalize_words(text)` that converts `text` to lowercase, replaces commas and periods with spaces, splits it into words, and returns the resulting list.',
      '',
      'function',
      funcCases(
        'normalize_words',
        [
          {
            id: 's1',
            description: 'Mixed case and comma',
            args: ['Hello, PYTHON world.'],
            expectedReturn: ['hello', 'python', 'world'],
          },
          {
            id: 's2',
            description: 'Extra spaces',
            args: ['  One   TWO  '],
            expectedReturn: ['one', 'two'],
          },
        ],
        [
          { id: 'h1', args: [''], expectedReturn: [] },
          { id: 'h2', args: ['A.B,C'], expectedReturn: ['a', 'b', 'c'] },
          { id: 'h3', args: ['no punctuation'], expectedReturn: ['no', 'punctuation'] },
        ]
      ),
      `Model solution:
def normalize_words(text):
    cleaned = text.lower().replace(",", " ").replace(".", " ")
    return cleaned.split()

Why: Normalise case and punctuation first, then \`.split()\` handles any amount of whitespace and returns an empty list for empty input.`
    ),

    cr(
      'pe-final-q2',
      'Implement `running_totals(numbers)` returning a new list whose item at each index is the sum of all input values up to that index. Return `[]` for an empty list.',
      '',
      'function',
      funcCases(
        'running_totals',
        [
          {
            id: 's1',
            description: 'Increasing values',
            args: [[2, 4, 1, 3]],
            expectedReturn: [2, 6, 7, 10],
          },
          {
            id: 's2',
            description: 'Includes negatives',
            args: [[5, -2, -3, 4]],
            expectedReturn: [5, 3, 0, 4],
          },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: [] },
          { id: 'h2', args: [[7]], expectedReturn: [7] },
          { id: 'h3', args: [[0, 0, 0]], expectedReturn: [0, 0, 0] },
        ]
      ),
      `Model solution:
def running_totals(numbers):
    result = []
    total = 0
    for number in numbers:
        total += number
        result.append(total)
    return result

Why: Keep one accumulator and append its updated value after processing each item.`
    ),

    cr(
      'pe-final-q3',
      'Implement `classify_numbers(numbers)` returning a dictionary with keys `"positive"`, `"negative"`, and `"zero"` whose values count the three kinds of numbers.',
      '',
      'function',
      funcCases(
        'classify_numbers',
        [
          {
            id: 's1',
            description: 'All three categories',
            args: [[3, -1, 0, 8, -4]],
            expectedReturn: { positive: 2, negative: 2, zero: 1 },
          },
          {
            id: 's2',
            description: 'Only zeroes',
            args: [[0, 0]],
            expectedReturn: { positive: 0, negative: 0, zero: 2 },
          },
        ],
        [
          {
            id: 'h1',
            args: [[]],
            expectedReturn: { positive: 0, negative: 0, zero: 0 },
          },
          {
            id: 'h2',
            args: [[1, 2, 3]],
            expectedReturn: { positive: 3, negative: 0, zero: 0 },
          },
          {
            id: 'h3',
            args: [[-2, -5]],
            expectedReturn: { positive: 0, negative: 2, zero: 0 },
          },
        ]
      ),
      `Model solution:
def classify_numbers(numbers):
    counts = {"positive": 0, "negative": 0, "zero": 0}
    for number in numbers:
        if number > 0:
            counts["positive"] += 1
        elif number < 0:
            counts["negative"] += 1
        else:
            counts["zero"] += 1
    return counts

Why: Initialise every required key, then use an if/elif/else chain so each number contributes to exactly one category.`
    ),

    cr(
      'pe-final-q4',
      'Implement `best_student(records)` where each record is `[name, score]`. Return the name with the highest score. If scores tie, return the name that appears first. Assume at least one record.',
      '',
      'function',
      funcCases(
        'best_student',
        [
          {
            id: 's1',
            description: 'Clear highest score',
            args: [[['Ari', 74], ['Bea', 91], ['Cal', 80]]],
            expectedReturn: 'Bea',
          },
          {
            id: 's2',
            description: 'First student wins a tie',
            args: [[['Ana', 90], ['Bo', 90], ['Cy', 70]]],
            expectedReturn: 'Ana',
          },
        ],
        [
          { id: 'h1', args: [[['Solo', 1]]], expectedReturn: 'Solo' },
          {
            id: 'h2',
            args: [[['Low', -10], ['LessLow', -2]]],
            expectedReturn: 'LessLow',
          },
          {
            id: 'h3',
            args: [[['First', 5], ['Second', 4], ['Third', 5]]],
            expectedReturn: 'First',
          },
        ]
      ),
      `Model solution:
def best_student(records):
    best_name, best_score = records[0]
    for name, score in records:
        if score > best_score:
            best_name = name
            best_score = score
    return best_name

Why: Update only for a strictly greater score. Equal scores leave the earlier record unchanged.`
    ),

    cr(
      'pe-final-q5',
      'Implement `sum_numbers_file()` that opens `"numbers.txt"`, reads one integer per non-blank line, and returns their sum. Blank or whitespace-only lines should be ignored.',
      '',
      'function',
      fileCases(
        'sum_numbers_file',
        [
          {
            id: 's1',
            description: 'Three numbers',
            fileContent: '10\n-3\n5\n',
            expectedReturn: 12,
          },
          {
            id: 's2',
            description: 'Contains blank lines',
            fileContent: '4\n\n  \n6\n',
            expectedReturn: 10,
          },
        ],
        [
          { id: 'h1', fileContent: '', expectedReturn: 0 },
          { id: 'h2', fileContent: '7', expectedReturn: 7 },
          { id: 'h3', fileContent: '-1\n-2\n-3\n', expectedReturn: -6 },
        ],
        'numbers.txt'
      ),
      `Model solution:
def sum_numbers_file():
    total = 0
    with open("numbers.txt") as file:
        for line in file:
            if line.strip() != "":
                total += int(line)
    return total

Why: Iterating over the file processes one line at a time. Strip only for the blank-line check; \`int()\` can otherwise handle surrounding whitespace.`
    ),

    cr(
      'pe-final-q6',
      'Implement `word_frequency(text)` returning a dictionary that counts lowercase words. Ignore case by converting the text to lowercase, then split on whitespace.',
      '',
      'function',
      funcCases(
        'word_frequency',
        [
          {
            id: 's1',
            description: 'Repeated mixed-case words',
            args: ['Red blue RED green blue red'],
            expectedReturn: { red: 3, blue: 2, green: 1 },
          },
          {
            id: 's2',
            description: 'Single word',
            args: ['Python'],
            expectedReturn: { python: 1 },
          },
        ],
        [
          { id: 'h1', args: [''], expectedReturn: {} },
          { id: 'h2', args: ['a a a'], expectedReturn: { a: 3 } },
          { id: 'h3', args: ['One two three'], expectedReturn: { one: 1, two: 1, three: 1 } },
        ]
      ),
      `Model solution:
def word_frequency(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts

Why: Normalise before counting. \`dict.get(word, 0)\` supplies the starting count for a new word.`
    ),

    cr(
      'pe-final-q7',
      'Implement `row_maxes(grid)` returning a list containing the largest value from each row of a rectangular grid. Return `[]` for an empty grid. Every row is non-empty.',
      '',
      'function',
      funcCases(
        'row_maxes',
        [
          {
            id: 's1',
            description: 'Three rows',
            args: [[[1, 8, 3], [9, 2, 4], [-5, -1, -7]]],
            expectedReturn: [8, 9, -1],
          },
          {
            id: 's2',
            description: 'One-column grid',
            args: [[[3], [1], [6]]],
            expectedReturn: [3, 1, 6],
          },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: [] },
          { id: 'h2', args: [[[5]]], expectedReturn: [5] },
          { id: 'h3', args: [[[0, 0], [2, 2]]], expectedReturn: [0, 2] },
        ]
      ),
      `Model solution:
def row_maxes(grid):
    result = []
    for row in grid:
        largest = row[0]
        for value in row:
            if value > largest:
                largest = value
        result.append(largest)
    return result

Why: The outer loop visits rows; the inner loop searches one row. Initialising from \`row[0]\` also works when all values are negative.`
    ),

    cr(
      'pe-final-q8',
      'Implement `inventory_value(records)` where every record is `[name, unit_price, quantity]`. Return the total value of all inventory (`unit_price * quantity`). Return `0` for no records.',
      '',
      'function',
      funcCases(
        'inventory_value',
        [
          {
            id: 's1',
            description: 'Two products',
            args: [[['Pen', 2.5, 4], ['Book', 10, 2]]],
            expectedReturn: 30,
          },
          {
            id: 's2',
            description: 'Includes zero quantity',
            args: [[['A', 5, 0], ['B', 3, 2]]],
            expectedReturn: 6,
          },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: 0 },
          { id: 'h2', args: [[['Only', 1.25, 4]]], expectedReturn: 5 },
          {
            id: 'h3',
            args: [[['X', 0.5, 3], ['Y', 2, 1], ['Z', 4, 2]]],
            expectedReturn: 11.5,
          },
        ]
      ),
      `Model solution:
def inventory_value(records):
    total = 0
    for name, unit_price, quantity in records:
        total += unit_price * quantity
    return total

Why: Tuple-style unpacking gives each record a meaningful set of names, and the accumulator combines every product's value.`
    ),

    cr(
      'pe-final-q9',
      'Implement `rotate_left(items, steps)` returning a new list rotated left by `steps`. Steps may be larger than the list length. Return `[]` when `items` is empty.',
      '',
      'function',
      funcCases(
        'rotate_left',
        [
          {
            id: 's1',
            description: 'Rotate by two',
            args: [[1, 2, 3, 4, 5], 2],
            expectedReturn: [3, 4, 5, 1, 2],
          },
          {
            id: 's2',
            description: 'Steps wrap around',
            args: [['a', 'b', 'c'], 4],
            expectedReturn: ['b', 'c', 'a'],
          },
        ],
        [
          { id: 'h1', args: [[], 3], expectedReturn: [] },
          { id: 'h2', args: [[1], 100], expectedReturn: [1] },
          { id: 'h3', args: [[1, 2, 3], 0], expectedReturn: [1, 2, 3] },
          { id: 'h4', args: [[1, 2, 3, 4], 4], expectedReturn: [1, 2, 3, 4] },
        ]
      ),
      `Model solution:
def rotate_left(items, steps):
    if len(items) == 0:
        return []
    steps = steps % len(items)
    return items[steps:] + items[:steps]

Why: Modulo reduces any large step count to an equivalent index. Two slices collect the tail and head in rotated order without modifying the input.`
    ),

    cr(
      'pe-final-q10',
      'Implement `text_stats(text)` returning a dictionary with the number of letters, digits, spaces, and other characters. Use the exact keys `"letters"`, `"digits"`, `"spaces"`, and `"other"`.',
      '',
      'function',
      funcCases(
        'text_stats',
        [
          {
            id: 's1',
            description: 'Letters, digit, space, punctuation',
            args: ['Hi 2!'],
            expectedReturn: { letters: 2, digits: 1, spaces: 1, other: 1 },
          },
          {
            id: 's2',
            description: 'Only letters',
            args: ['Python'],
            expectedReturn: { letters: 6, digits: 0, spaces: 0, other: 0 },
          },
        ],
        [
          {
            id: 'h1',
            args: [''],
            expectedReturn: { letters: 0, digits: 0, spaces: 0, other: 0 },
          },
          {
            id: 'h2',
            args: ['123 45'],
            expectedReturn: { letters: 0, digits: 5, spaces: 1, other: 0 },
          },
          {
            id: 'h3',
            args: ['A-b_c'],
            expectedReturn: { letters: 3, digits: 0, spaces: 0, other: 2 },
          },
        ]
      ),
      `Model solution:
def text_stats(text):
    stats = {"letters": 0, "digits": 0, "spaces": 0, "other": 0}
    for character in text:
        if character.isalpha():
            stats["letters"] += 1
        elif character.isdigit():
            stats["digits"] += 1
        elif character == " ":
            stats["spaces"] += 1
        else:
            stats["other"] += 1
    return stats

Why: The mutually exclusive condition chain assigns every character to exactly one dictionary counter.`
    ),

    mc(
      'pe-final-q11',
      `What is the final value of \`data\`?

\`\`\`python
data = {"a": [1, 2], "b": [3]}
data["a"].append(4)
data["c"] = data["b"]
data["c"].append(5)
\`\`\``,
      [
        { id: 'a', text: '{"a": [1, 2, 4], "b": [3], "c": [3, 5]}' },
        { id: 'b', text: '{"a": [1, 2, 4], "b": [3, 5], "c": [3, 5]}' },
        { id: 'c', text: '{"a": [1, 2], "b": [3], "c": [5]}' },
        { id: 'd', text: 'The code raises a KeyError' },
      ],
      'b',
      'Model answer: **b**. `data["c"]` and `data["b"]` refer to the same mutable list, so appending through `"c"` is also visible through `"b"`. The `"a"` list is separate.'
    ),

    tf(
      'pe-final-q12',
      'True or false: opening an existing file with `open("report.txt", "w")` preserves its old content and adds new text at the end.',
      'false',
      'Model answer: **False**. Write mode (`"w"`) truncates the existing file. Append mode (`"a"`) preserves existing content and writes at the end.'
    ),
  ],
};

export default finalExam;
