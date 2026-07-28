import type { Module } from './types';

const module23: Module = {
  id: 'module-23',
  slug: '23',
  title: 'Expressions & Selection',
  description: 'Work with arithmetic, relational, and logical expressions, then control program flow with if, else-if, ternary, and switch.',
  icon: '🧮',
  color: 'from-amber-500 to-orange-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-23-1',
      title: 'Arithmetic Expressions, Promotion, and Precedence',
      content: `Lecture 4 begins with **expressions**: pieces of code that evaluate to a single value.

The core arithmetic operators are:

| Operator | Meaning |
|---|---|
| \`+\` | addition |
| \`-\` | subtraction |
| \`*\` | multiplication |
| \`/\` | division |
| \`%\` | remainder |

The lecture stresses two rules that students often miss:
- **integer division truncates**: \`10 / 4\` is \`2\`, not \`2.5\`
- Java performs **widening promotion** automatically when needed: \`1.0 / 2\` becomes \`0.5\`

It also introduces unary operators:
- \`+\` unary plus
- \`-\` unary minus
- \`++\` increment
- \`--\` decrement

For mixed expressions, evaluation follows precedence rules:
1. higher-precedence operators first
2. if precedence is the same, evaluate left to right

Parentheses are still the safest way to make your intent obvious.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Main {
    public static void main(String[] args) {
        int whole = 10 / 4;
        double exact = 10 / 4.0;
        double lectureValue = 3 / 2 * 3.0 + 8 / 3;
        double promoted = 2.0 * 4 / 5 + 6 / 4.0;
        int remainder = 7 % 3;

        System.out.println(whole);
        System.out.println(exact);
        System.out.println(lectureValue);
        System.out.println(promoted);
        System.out.println(remainder);
    }
}`,
          caption: 'Integer division truncates, promotion widens, and precedence affects the final value.',
          expectedOutput: '2\n2.5\n5.0\n3.1\n1',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-23-2',
      title: 'Relational and Logical Expressions',
      content: `A **relational expression** compares values and produces a boolean result: \`true\` or \`false\`.

Comparison operators:

| Operator | Meaning |
|---|---|
| \`<\` | less than |
| \`<=\` | less than or equal |
| \`>\` | greater than |
| \`>=\` | greater than or equal |
| \`==\` | equal to |
| \`!=\` | not equal to |

The lecture highlights two common mistakes:
- confusing \`=\` (assignment) with \`==\` (equality)
- trying to chain comparisons like \`1 < value < 100\` as if Java were mathematics

For compound conditions, use logical operators:

| Operator | Meaning |
|---|---|
| \`!\` | not |
| \`&&\` | and |
| \`||\` | or |

Important precedence:
1. \`!\`
2. \`&&\`
3. \`||\`

The slides also introduce **short-circuit evaluation**:
- \`&&\` stops as soon as the answer must be false
- \`||\` stops as soon as the answer must be true`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Main {
    public static void main(String[] args) {
        int value = 50;

        System.out.println(value > 10 && value < 100);
        System.out.println(value % 2 == 0 || value == 1);
        System.out.println(!(value > 10));
        System.out.println(value != 53);
    }
}`,
          caption: 'Relational expressions produce booleans; logical operators combine those boolean results.',
          expectedOutput: 'true\ntrue\nfalse\ntrue',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-23-3',
      title: 'Selection Structures: if, else-if, Ternary, and switch',
      content: `Once you can build conditions, you can control which statements run.

Lecture 4 covers three major selection tools:
- **if**: run code only when a condition is true
- **if-else / else-if**: choose between alternatives
- **switch**: select among several discrete constant values

The lecture also introduces the **ternary operator**:
\`\`\`java
result = condition ? valueIfTrue : valueIfFalse;
\`\`\`

Use it when you are choosing between **two values**, not when a full multi-branch \`if\` chain would be clearer.

Two selection details matter in exams:
- braces remove ambiguity in nested \`if\` statements
- \`switch\` tests **discrete equalities**, not numeric ranges

If you forget a \`break\`, control "falls through" into later cases.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Main {
    public static void main(String[] args) {
        int grade = 78;
        String result = grade >= 60 ? "Passed" : "Failed";

        if (grade <= 60) {
            System.out.println("D");
        } else if (grade < 75) {
            System.out.println("C");
        } else if (grade < 90) {
            System.out.println("B");
        } else {
            System.out.println("A");
        }

        System.out.println(result);
    }
}`,
          caption: 'Use if/else-if for ranges and ternary for simple value selection.',
          expectedOutput: 'B\nPassed',
          editable: true,
        },
        {
          language: 'java',
          code: `public class Main {
    public static void main(String[] args) {
        int day = 2;

        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            default:
                System.out.println("Unknown");
        }
    }
}`,
          caption: 'switch is best when you are matching one value against several constant cases.',
          expectedOutput: 'Tuesday',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'java-q-23-1',
      type: 'multiple-choice',
      prompt: 'What is the value of `10 / 4` in Java?',
      choices: [
        { id: 'a', text: '2' },
        { id: 'b', text: '2.5' },
        { id: 'c', text: '3' },
        { id: 'd', text: 'Compilation error' },
      ],
      correctAnswer: 'a',
      explanation: 'Both operands are ints, so Java performs integer division and truncates the fractional part.',
    },
    {
      id: 'java-q-23-2',
      type: 'multiple-choice',
      prompt: 'Which operator returns the remainder after division?',
      choices: [
        { id: 'a', text: '/' },
        { id: 'b', text: '*' },
        { id: 'c', text: '%' },
        { id: 'd', text: '//' },
      ],
      correctAnswer: 'c',
      explanation: 'The modulus operator `%` returns the remainder. For example, `7 % 3` is `1`.',
    },
    {
      id: 'java-q-23-3',
      type: 'multiple-choice',
      prompt: 'What is the value of `3 / 2 * 3.0 + 8 / 3`?',
      choices: [
        { id: 'a', text: '7.1666...' },
        { id: 'b', text: '5.0' },
        { id: 'c', text: '5.5' },
        { id: 'd', text: '3.0' },
      ],
      correctAnswer: 'b',
      explanation: '`3 / 2` uses integer division, so it becomes `1`. Then `1 * 3.0` is `3.0`, and `8 / 3` is `2`, so the final result is `5.0`.',
    },
    {
      id: 'java-q-23-4',
      type: 'true-false',
      prompt: 'The condition `1 < value < 100` is a valid way to test whether `value` is between 1 and 100 in Java.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'Java does not allow chained comparisons like mathematics. Use `value > 1 && value < 100` instead.',
    },
    {
      id: 'java-q-23-5',
      type: 'multiple-choice',
      prompt: 'Which condition correctly tests that `b` is strictly between 10 and 20?',
      choices: [
        { id: 'a', text: '10 < b < 20' },
        { id: 'b', text: 'b > 10 && b < 20' },
        { id: 'c', text: 'b > 10 || b < 20' },
        { id: 'd', text: 'b == 10 && b == 20' },
      ],
      correctAnswer: 'b',
      explanation: 'Use two comparisons joined with `&&`: one for the lower bound and one for the upper bound.',
    },
    {
      id: 'java-q-23-6',
      type: 'fill-in-blank',
      prompt: 'Complete the equality operator: `if (a _____ b)`',
      correctAnswer: '==',
      explanation: '`==` compares values for equality. A single `=` assigns a value instead.',
    },
    {
      id: 'java-q-23-7',
      type: 'multiple-choice',
      prompt: 'Which logical operator has the highest precedence?',
      choices: [
        { id: 'a', text: '||' },
        { id: 'b', text: '&&' },
        { id: 'c', text: '!' },
        { id: 'd', text: 'all the same' },
      ],
      correctAnswer: 'c',
      explanation: 'Logical NOT (`!`) is evaluated before `&&`, which is evaluated before `||`.',
    },
    {
      id: 'java-q-23-8',
      type: 'multiple-choice',
      prompt: 'Which selection statement is best when you are matching one variable against several discrete constant values?',
      choices: [
        { id: 'a', text: 'while' },
        { id: 'b', text: 'switch' },
        { id: 'c', text: 'do-while' },
        { id: 'd', text: 'enhanced for' },
      ],
      correctAnswer: 'b',
      explanation: 'A switch statement is designed for multiple discrete equality checks against one controlling expression.',
    },
    {
      id: 'java-q-23-9',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Use an `if-else-if` chain with `int grade = 78;` and print the letter grade using the lecture cutoffs:\n- `<= 60` prints `D`\n- `< 75` prints `C`\n- `< 90` prints `B`\n- otherwise prints `A`\n\nExpected output:\n```text\nB\n```',
      starterCode: `public class Main {\n    public static void main(String[] args) {\n        int grade = 78;\n        // Print the correct letter grade\n    }\n}`,
      expectedOutput: 'B',
      correctAnswer: '__code__',
      explanation: 'Since 78 is not `<= 60` and not `< 75`, but it is `< 90`, the correct branch prints `B`.',
    },
    {
      id: 'java-q-23-10',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Use a `switch` statement with `int month = 2;` and print the month name.\nUse cases for `1`, `2`, and `3` as `January`, `February`, and `March`, with `default` printing `Unknown`.\n\nExpected output:\n```text\nFebruary\n```',
      starterCode: `public class Main {\n    public static void main(String[] args) {\n        int month = 2;\n        // Use switch to print the month name\n    }\n}`,
      expectedOutput: 'February',
      correctAnswer: '__code__',
      explanation: 'Month `2` should match the `case 2:` branch and print `February` before breaking out of the switch.',
    },
  ],
};

export default module23;
