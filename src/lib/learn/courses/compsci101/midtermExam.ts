import type { Module } from '../python101/types';
import { cr, fib, mc, stdoutCases } from './authoring';

const midtermExam: Module = {
  id: 'python-essentials-midterm',
  slug: 'midterm-exam',
  title: 'Mid-Course Exam — Weeks 1–4',
  description:
    'A mixed assessment covering expressions, variables, input and output, types, conditions, boolean logic, and while loops.',
  icon: '🎓',
  color: 'from-amber-500 to-orange-400',
  locked: false,
  quizOnly: true,
  section: 'Mid-Course Exam',
  lessons: [],
  questions: [
    cr(
      'pe-mid-q1',
      'Read a product name, a decimal unit price, and an integer quantity (one per line). Print `<name>: $<total>` with the total formatted to exactly two decimal places.',
      '',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: 'Three notebooks',
            stdin: 'Notebook\n4.5\n3\n',
            expectedStdout: 'Notebook: $13.50',
          },
          {
            id: 's2',
            description: 'One pen',
            stdin: 'Pen\n2\n1\n',
            expectedStdout: 'Pen: $2.00',
          },
        ],
        [
          { id: 'h1', stdin: 'Cable\n7.25\n4\n', expectedStdout: 'Cable: $29.00' },
          { id: 'h2', stdin: 'Book\n0.99\n10\n', expectedStdout: 'Book: $9.90' },
          { id: 'h3', stdin: 'Free\n0\n8\n', expectedStdout: 'Free: $0.00' },
        ]
      ),
      `Model solution:
name = input()
price = float(input())
quantity = int(input())
total = price * quantity
print(f"{name}: \${total:.2f}")

Why: Convert the numeric inputs before multiplying them. The \`:.2f\` format specifier always displays two digits after the decimal point.`
    ),

    cr(
      'pe-mid-q2',
      'Read an integer temperature. Print `"freezing"` when it is 0 or below, `"cool"` when it is from 1 through 20, and `"warm"` when it is above 20.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Below zero', stdin: '-4\n', expectedStdout: 'freezing' },
          { id: 's2', description: 'Upper cool boundary', stdin: '20\n', expectedStdout: 'cool' },
        ],
        [
          { id: 'h1', stdin: '0\n', expectedStdout: 'freezing' },
          { id: 'h2', stdin: '1\n', expectedStdout: 'cool' },
          { id: 'h3', stdin: '21\n', expectedStdout: 'warm' },
          { id: 'h4', stdin: '100\n', expectedStdout: 'warm' },
        ]
      ),
      `Model solution:
temperature = int(input())
if temperature <= 0:
    print("freezing")
elif temperature <= 20:
    print("cool")
else:
    print("warm")

Why: Once the first condition fails, the temperature is already greater than 0, so the \`elif\` only needs to check the upper boundary.`
    ),

    cr(
      'pe-mid-q3',
      'Read `age` as an integer, then read `has_ticket` and `has_adult` as `"yes"` or `"no"`. Print `True` when the person has a ticket and is either at least 16 or accompanied by an adult; otherwise print `False`.',
      '',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: 'Old enough with a ticket',
            stdin: '18\nyes\nno\n',
            expectedStdout: 'True',
          },
          {
            id: 's2',
            description: 'Younger but accompanied',
            stdin: '12\nyes\nyes\n',
            expectedStdout: 'True',
          },
        ],
        [
          { id: 'h1', stdin: '12\nyes\nno\n', expectedStdout: 'False' },
          { id: 'h2', stdin: '20\nno\nyes\n', expectedStdout: 'False' },
          { id: 'h3', stdin: '16\nyes\nno\n', expectedStdout: 'True' },
          { id: 'h4', stdin: '10\nno\nno\n', expectedStdout: 'False' },
        ]
      ),
      `Model solution:
age = int(input())
has_ticket = input()
has_adult = input()
allowed = has_ticket == "yes" and (age >= 16 or has_adult == "yes")
print(allowed)

Why: A ticket is always required, while either the age rule or adult-supervision rule may satisfy the second requirement. Parentheses make that grouping explicit.`
    ),

    cr(
      'pe-mid-q4',
      'Read an integer score from 0 to 100. Print `"A"` for 90–100, `"B"` for 80–89, `"C"` for 70–79, `"D"` for 60–69, and `"F"` below 60.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'A grade', stdin: '94\n', expectedStdout: 'A' },
          { id: 's2', description: 'B boundary', stdin: '80\n', expectedStdout: 'B' },
        ],
        [
          { id: 'h1', stdin: '100\n', expectedStdout: 'A' },
          { id: 'h2', stdin: '79\n', expectedStdout: 'C' },
          { id: 'h3', stdin: '60\n', expectedStdout: 'D' },
          { id: 'h4', stdin: '59\n', expectedStdout: 'F' },
          { id: 'h5', stdin: '0\n', expectedStdout: 'F' },
        ]
      ),
      `Model solution:
score = int(input())
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
elif score >= 60:
    print("D")
else:
    print("F")

Why: Check thresholds from highest to lowest. Reaching an \`elif\` means every higher threshold already failed.`
    ),

    cr(
      'pe-mid-q5',
      'Read a non-negative integer `n`. Using a while loop, print the sum of all multiples of 3 from 0 through `n` inclusive.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Multiples through 10', stdin: '10\n', expectedStdout: '18' },
          { id: 's2', description: 'Boundary is a multiple', stdin: '12\n', expectedStdout: '30' },
        ],
        [
          { id: 'h1', stdin: '0\n', expectedStdout: '0' },
          { id: 'h2', stdin: '2\n', expectedStdout: '0' },
          { id: 'h3', stdin: '3\n', expectedStdout: '3' },
          { id: 'h4', stdin: '30\n', expectedStdout: '165' },
        ]
      ),
      `Model solution:
n = int(input())
total = 0
value = 3
while value <= n:
    total += value
    value += 3
print(total)

Why: Starting at 3 and stepping by 3 visits only the values that contribute to the sum.`
    ),

    cr(
      'pe-mid-q6',
      'Read integers one per line until `0` is entered. The sentinel 0 is not data. Print two lines: the count of positive values, then the count of negative values.',
      '',
      'stdout',
      stdoutCases(
        [
          {
            id: 's1',
            description: 'Mixed signs',
            stdin: '4\n-2\n7\n-1\n0\n',
            expectedStdout: '2\n2',
          },
          {
            id: 's2',
            description: 'Sentinel immediately',
            stdin: '0\n',
            expectedStdout: '0\n0',
          },
        ],
        [
          { id: 'h1', stdin: '1\n2\n3\n0\n', expectedStdout: '3\n0' },
          { id: 'h2', stdin: '-1\n-2\n0\n', expectedStdout: '0\n2' },
          { id: 'h3', stdin: '9\n-9\n0\n', expectedStdout: '1\n1' },
        ]
      ),
      `Model solution:
positive = 0
negative = 0
number = int(input())
while number != 0:
    if number > 0:
        positive += 1
    else:
        negative += 1
    number = int(input())
print(positive)
print(negative)

Why: The loop reads until the sentinel and uses a condition inside the loop to update the appropriate counter.`
    ),

    cr(
      'pe-mid-q7',
      'Read a positive integer `n`. Using arithmetic and a while loop—not string conversion—print the sum of its digits.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Four digits', stdin: '4826\n', expectedStdout: '20' },
          { id: 's2', description: 'Contains zeroes', stdin: '1005\n', expectedStdout: '6' },
        ],
        [
          { id: 'h1', stdin: '7\n', expectedStdout: '7' },
          { id: 'h2', stdin: '999\n', expectedStdout: '27' },
          { id: 'h3', stdin: '10\n', expectedStdout: '1' },
          { id: 'h4', stdin: '123456\n', expectedStdout: '21' },
        ]
      ),
      `Model solution:
n = int(input())
total = 0
while n > 0:
    total += n % 10
    n //= 10
print(total)

Why: \`n % 10\` extracts the final digit and \`n //= 10\` removes it. Repeat until no digits remain.`
    ),

    cr(
      'pe-mid-q8',
      'Read a positive integer `n`. Print a countdown from `n` to 1 on one line separated by spaces, with no trailing space. You may build a result string in a while loop.',
      '',
      'stdout',
      stdoutCases(
        [
          { id: 's1', description: 'Countdown from four', stdin: '4\n', expectedStdout: '4 3 2 1' },
          { id: 's2', description: 'Single value', stdin: '1\n', expectedStdout: '1' },
        ],
        [
          { id: 'h1', stdin: '2\n', expectedStdout: '2 1' },
          { id: 'h2', stdin: '5\n', expectedStdout: '5 4 3 2 1' },
          { id: 'h3', stdin: '10\n', expectedStdout: '10 9 8 7 6 5 4 3 2 1' },
        ]
      ),
      `Model solution:
n = int(input())
result = ""
while n >= 1:
    if result != "":
        result += " "
    result += str(n)
    n -= 1
print(result)

Why: Add the separator before every value except the first, which avoids a trailing space at the end.`
    ),

    mc(
      'pe-mid-q9',
      `What is printed?

\`\`\`python
x = 1
total = 0
while x <= 4:
    if x % 2 == 0:
        total += x
    else:
        total += 1
    x += 1
print(total)
\`\`\``,
      [
        { id: 'a', text: '6' },
        { id: 'b', text: '8' },
        { id: 'c', text: '10' },
        { id: 'd', text: 'The loop is infinite' },
      ],
      'b',
      'Model answer: **b — 8**. The odd values 1 and 3 each add 1, while the even values add 2 and 4: `1 + 2 + 1 + 4 = 8`. The counter is incremented every iteration, so the loop terminates.'
    ),

    fib(
      'pe-mid-q10',
      'Complete the update so this loop prints `5`, `4`, `3`, `2`, `1` and then stops: `n = 5; while n > 0: print(n); n = ____`',
      'n - 1',
      'Model answer: `n - 1`. Assigning `n = n - 1` reduces the loop-control value each iteration until the condition becomes false.'
    ),
  ],
};

export default midtermExam;
