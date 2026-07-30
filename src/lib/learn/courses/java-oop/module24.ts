import type { Module } from './types';

const module24: Module = {
  id: 'module-24',
  slug: '24',
  title: 'Loops & Control Flow',
  description: 'Use while, for, and do-while loops correctly, manage loop control with break and continue, and generate random values safely.',
  icon: '🔁',
  color: 'from-lime-500 to-emerald-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-24-1',
      title: 'while Loops and Sentinel-Controlled Repetition',
      content: `Lecture 5 starts with **repetition structure**: statements that run repeatedly while a loop condition remains true.

Two important loop categories appear immediately:
- **counter-controlled repetition**: you know how many iterations you want
- **sentinel-controlled repetition**: you do not know in advance how many values will arrive, so a special value ends the loop

The lecture's key sentinel idea is:
1. read the first value **before** the loop
2. test whether that value is the sentinel
3. process it
4. read the next value at the end of the loop body

This avoids skipping the first input and avoids processing the sentinel as real data.

Use \`while\` when the body might execute **zero or more times**.`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int total = 0;
        int count = 0;

        int grade = input.nextInt();
        while (grade != -1) {
            total += grade;
            count++;
            grade = input.nextInt();
        }

        if (count == 0) {
            System.out.println("No grades");
        } else {
            System.out.printf("Average = %.1f%n", (double) total / count);
        }
    }
}`,
          caption: 'Sentinel-controlled repetition: keep reading grades until `-1` appears.',
          sampleInput: '80\n90\n-1\n',
          expectedOutput: 'Average = 85.0',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-24-2',
      title: 'for Loops and Counter-Controlled Repetition',
      content: `A **for loop** packages the three pieces of counter-controlled repetition into one place:

\`\`\`java
for (initialization; condition; update) {
    // body
}
\`\`\`

This is ideal when you already know the repetition pattern:
- count from 1 to 10
- visit every array index
- print a fixed-size pattern

The lecture also points out that a \`for\` loop can usually be rewritten as a \`while\` loop, but \`for\` is typically clearer when a control variable is doing the counting.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Main {
    public static void main(String[] args) {
        for (int number = 1; number <= 5; number++) {
            System.out.println(number * number);
        }
    }
}`,
          caption: 'A counter-controlled for loop is compact and clear when the repetition count is known.',
          expectedOutput: '1\n4\n9\n16\n25',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-24-3',
      title: 'do-while, break, continue, and Nested Loops',
      content: `A **do-while** loop checks its condition **after** executing the body, so it runs **one or more times**.

Lecture 5 then moves to loop-control statements:
- **break**: terminate the innermost loop immediately
- **continue**: skip the rest of the current iteration and move to the next one

One especially important lecture warning:
- in a \`for\` loop, the increment still happens after \`continue\`
- in a \`while\` loop, if your increment is written **after** the \`continue\`, you may accidentally create an infinite loop

The lecture also uses **nested loops** for patterns, grids, and multi-step repetition.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Main {
    public static void main(String[] args) {
        int counter = 1;

        do {
            System.out.print(counter + " ");
            counter++;
        } while (counter <= 5);

        System.out.printf("%nLoop ended with counter=%d%n", counter);

        // The body always runs at least once, even when the condition starts false
        int value = 100;

        do {
            System.out.println("Ran once with value=" + value);
            value++;
        } while (value < 0);
    }
}`,
          caption: 'do-while tests the condition after the body, so the body always runs at least once.',
          expectedOutput: '1 2 3 4 5 \nLoop ended with counter=6\nRan once with value=100',
          editable: true,
        },
        {
          language: 'java',
          code: `public class Main {
    public static void main(String[] args) {
        int count;

        for (count = 1; count <= 10; count++) {
            if (count == 5) {
                break;
            }
            System.out.print(count + " ");
        }

        System.out.printf("%nBroke out of loop at count=%d%n", count);
    }
}`,
          caption: 'break exits the innermost loop immediately and control continues after the loop.',
          expectedOutput: '1 2 3 4 \nBroke out of loop at count=5',
          editable: true,
        },
        {
          language: 'java',
          code: `public class Main {
    public static void main(String[] args) {
        int row = 3;

        for (int i = 0; i < row; i++) {
            for (int j = 0; j < row; j++) {
                if (i + j >= row) {
                    break;
                }
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
          caption: 'Nested loops plus break let you build structured output such as patterns.',
          expectedOutput: '***\n**\n*',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-24-4',
      title: 'Random Numbers in Practice',
      content: `The lecture introduces **SecureRandom** for nondeterministic random values, but it also makes a practical teaching point: in a code runner, deterministic output is often more useful.

So the slides recommend:
- use a **single** random object
- do not create a new random object for every value
- use a **seeded** \`Random\` in CodeRunner-style environments when you want reproducible output

Range reminders:
- \`rand.nextInt(6)\` gives values from **0 to 5**
- \`1 + rand.nextInt(6)\` gives values from **1 to 6**`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.util.Random;

public class Main {
    public static void main(String[] args) {
        Random randObj = new Random(30);

        System.out.println(randObj.nextInt(10));
        System.out.println(randObj.nextInt(10));
        System.out.println(randObj.nextInt(10));
    }
}`,
          caption: 'A fixed seed makes pseudo-random output predictable for examples and automated checking.',
          expectedOutput: '6\n8\n5',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'java-q-24-1',
      type: 'multiple-choice',
      prompt: 'Which loop guarantees that its body runs at least once?',
      choices: [
        { id: 'a', text: 'while' },
        { id: 'b', text: 'for' },
        { id: 'c', text: 'do-while' },
        { id: 'd', text: 'switch' },
      ],
      correctAnswer: 'c',
      explanation: 'A do-while loop tests its condition after the body, so the body executes once before the first check.',
    },
    {
      id: 'java-q-24-2',
      type: 'multiple-choice',
      prompt: 'When is sentinel-controlled repetition especially useful?',
      choices: [
        { id: 'a', text: 'When the exact number of repetitions is known ahead of time' },
        { id: 'b', text: 'When the number of inputs is not known in advance' },
        { id: 'c', text: 'Only when using arrays' },
        { id: 'd', text: 'Only when using switch' },
      ],
      correctAnswer: 'b',
      explanation: 'A sentinel is used when you do not know beforehand how many values will be entered.',
    },
    {
      id: 'java-q-24-3',
      type: 'multiple-choice',
      prompt: 'Which loop is usually the clearest for counter-controlled repetition?',
      choices: [
        { id: 'a', text: 'do-while' },
        { id: 'b', text: 'for' },
        { id: 'c', text: 'switch' },
        { id: 'd', text: 'try-catch' },
      ],
      correctAnswer: 'b',
      explanation: 'A for loop groups initialization, continuation condition, and update into one clear header.',
    },
    {
      id: 'java-q-24-4',
      type: 'true-false',
      prompt: 'The `break` statement exits only the innermost loop or switch that contains it.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'break terminates the nearest enclosing loop or switch, then execution continues with the next statement afterwards.',
    },
    {
      id: 'java-q-24-5',
      type: 'multiple-choice',
      prompt: 'What does `continue` do inside a loop?',
      choices: [
        { id: 'a', text: 'Ends the whole program immediately' },
        { id: 'b', text: 'Restarts the current method from the top' },
        { id: 'c', text: 'Skips the rest of the current iteration and moves to the next one' },
        { id: 'd', text: 'Deletes the loop variable' },
      ],
      correctAnswer: 'c',
      explanation: 'continue skips the remaining statements in the current loop iteration and proceeds with the next one.',
    },
    {
      id: 'java-q-24-6',
      type: 'multiple-choice',
      prompt: 'What range of values can `rand.nextInt(6)` produce?',
      choices: [
        { id: 'a', text: '1 to 6' },
        { id: 'b', text: '0 to 5' },
        { id: 'c', text: '0 to 6' },
        { id: 'd', text: '1 to 5' },
      ],
      correctAnswer: 'b',
      explanation: '`nextInt(6)` returns one of 6 values starting at 0, so the range is 0 through 5.',
    },
    {
      id: 'java-q-24-7',
      type: 'multiple-choice',
      prompt: 'Which expression simulates a die roll from 1 to 6?',
      choices: [
        { id: 'a', text: 'rand.nextInt(6)' },
        { id: 'b', text: 'rand.nextInt(5) + 1' },
        { id: 'c', text: '1 + rand.nextInt(6)' },
        { id: 'd', text: 'rand.nextInt(7)' },
      ],
      correctAnswer: 'c',
      explanation: '`rand.nextInt(6)` gives 0 to 5, so adding 1 shifts the range to 1 through 6.',
    },
    {
      id: 'java-q-24-8',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Use a `for` loop to compute the sum of all integers from 1 to 10, then print the result.\n\nExpected output:\n```text\n55\n```',
      starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Use a for loop and print the sum from 1 to 10\n    }\n}`,
      expectedOutput: '55',
      correctAnswer: '__code__',
      explanation: 'Accumulate the running total in a variable, then print it after the loop finishes.',
    },
    {
      id: 'java-q-24-9',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Use nested loops to print the following pattern exactly:\n\n```text\n***\n**\n*\n```\n\nHint: the outer loop controls the row, and the inner loop controls how many `*` characters appear on that row.',
      starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Print the pattern using nested loops\n    }\n}`,
      expectedOutput: '***\n**\n*',
      correctAnswer: '__code__',
      explanation: 'For row lengths 3, 2, and 1, either count downward directly or use a break condition like the lecture example.',
    },
  ],
};

export default module24;
