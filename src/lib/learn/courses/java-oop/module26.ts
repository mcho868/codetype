import type { Module } from './types';

const module26: Module = {
  id: 'java-module-26',
  slug: 'java-26',
  title: 'Exceptions & File I/O',
  description: 'Handle failures safely, understand checked exceptions, and read structured text files with Scanner.',
  icon: '🛡️',
  color: 'from-orange-500 to-amber-400',
  locked: false,
  lessons: [
    {
      id: 'java-lesson-26-1',
      title: 'Exceptions, try-catch, and finally',
      content: `An **exception** is an object that represents a problem during program execution. Instead of allowing the program to stop immediately, you can place risky code in a try block and handle a matching exception in a catch block.

The normal flow is:

1. Java starts running the try block.
2. If an exception occurs, the rest of the try block is skipped.
3. Java searches the catch clauses from top to bottom.
4. The first compatible handler runs.
5. Execution continues after the whole try-catch statement.

Use more specific exception types before general types. A catch (Exception e) placed first would also catch subclasses such as ArithmeticException, making later specific handlers unreachable.

A finally block is for cleanup. It runs after the try/catch whether an exception occurred or not, including when the try block returns early.`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.util.InputMismatchException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        try {
            int numerator = input.nextInt();
            int denominator = input.nextInt();
            System.out.println("Result: " + numerator / denominator);
        } catch (InputMismatchException e) {
            System.out.println("Input must be two integers.");
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero.");
        } finally {
            input.close();
            System.out.println("Finished.");
        }
    }
}`,
          caption: 'Specific catch clauses handle different failures, while finally performs cleanup.',
          sampleInput: '12 0',
          expectedOutput: 'Cannot divide by zero.\\nFinished.',
        },
      ],
    },
    {
      id: 'java-lesson-26-2',
      title: 'throw, throws, and checked exceptions',
      content: `The throw statement creates and raises one exception object immediately:

throw new IllegalArgumentException("message");

The throws clause documents that a method may pass an exception to its caller instead of handling it itself:

static String readFirstLine(String filename) throws IOException

Java divides exceptions into two useful groups:

- Runtime exceptions such as ArithmeticException, NullPointerException, and ArrayIndexOutOfBoundsException are usually programming or input errors.
- Checked exceptions such as IOException are enforced by the compiler. A method must catch a checked exception or declare it with throws.

Use a checked exception when the caller can reasonably recover or choose what to do next. The method that discovers the problem does not always need to be the method that decides how to present it to the user.`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    static String firstLine(Path path) throws IOException {
        if (!Files.exists(path)) {
            throw new IOException("Missing file: " + path);
        }
        return Files.readAllLines(path).get(0);
    }

    public static void main(String[] args) {
        try {
            System.out.println(firstLine(Path.of("message.txt")));
        } catch (IOException e) {
            System.out.println("Could not read the file.");
        }
    }
}`,
          caption: 'A method can throw a checked exception and let its caller decide how to recover.',
        },
      ],
    },
    {
      id: 'java-lesson-26-3',
      title: 'Reading text files with Scanner',
      content: `Java I/O classes represent data moving between a source and a destination. For a text file, a common beginner-friendly approach is to create a File, pass it to Scanner, read until there is no more data, and close the scanner.

For line-oriented files, use hasNextLine() and nextLine(). For token-oriented files, use hasNext() and next(). A scanner uses whitespace as its default delimiter, but you can call useDelimiter(",") for comma-separated data.

Opening a file may throw FileNotFoundException, which is a checked exception. The scanner should be closed in a finally block when following the lecture's explicit cleanup pattern. Modern Java also supports try-with-resources, which closes an AutoCloseable automatically.`,
      attachments: [
        {
          name: 'names.txt',
          content: 'Ada,Grace,James,Linus\\n',
          description: 'Comma-separated names for the Scanner delimiter example.',
        },
      ],
      codeExamples: [
        {
          language: 'java',
          code: `import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner fileInput = null;

        try {
            fileInput = new Scanner(new File("names.txt"));
            fileInput.useDelimiter(",");

            while (fileInput.hasNext()) {
                System.out.println(fileInput.next().trim());
            }
        } catch (FileNotFoundException e) {
            System.out.println("File not found.");
        } finally {
            if (fileInput != null) {
                fileInput.close();
            }
        }
    }
}`,
          caption: 'Scanner can read tokens from a file and use a custom delimiter.',
        },
      ],
    },
    {
      id: 'java-lesson-26-4',
      title: 'Writing files and try-with-resources',
      content: `Output follows the same general pattern: open a destination, write data, and close it. A PrintWriter is convenient for writing formatted text.

The older explicit pattern uses try, catch, and finally. The modern try-with-resources form is usually safer because Java closes the resource automatically, even when an exception occurs. You should still understand the explicit finally pattern because it makes the cleanup responsibility visible and is part of the lecture material.`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.io.FileNotFoundException;
import java.io.PrintWriter;

public class Main {
    public static void main(String[] args) {
        try (PrintWriter output = new PrintWriter("summary.txt")) {
            output.println("Java I/O");
            output.println("Resources close automatically.");
        } catch (FileNotFoundException e) {
            System.out.println("Could not open the output file.");
        }
    }
}`,
          caption: 'Try-with-resources closes PrintWriter automatically after the block.',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'java-q-26-1',
      type: 'multiple-choice',
      prompt: 'What happens to the rest of a try block after an exception is thrown?',
      choices: [
        { id: 'a', text: 'It runs twice after the catch block' },
        { id: 'b', text: 'It is skipped and Java searches for a matching catch block' },
        { id: 'c', text: 'It is converted into a finally block' },
        { id: 'd', text: 'It is ignored only for checked exceptions' },
      ],
      correctAnswer: 'b',
      explanation: 'Once an exception is thrown, the current try block stops immediately and control moves to the first compatible catch clause.',
    },
    {
      id: 'java-q-26-2',
      type: 'true-false',
      prompt: 'A finally block normally runs whether the try block succeeds or throws an exception.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'finally is intended for cleanup and runs after try/catch in both the success and handled-failure paths.',
    },
    {
      id: 'java-q-26-3',
      type: 'multiple-choice',
      prompt: 'Which catch order is valid?',
      choices: [
        { id: 'a', text: 'catch (Exception e) followed by catch (ArithmeticException e)' },
        { id: 'b', text: 'catch (ArithmeticException e) followed by catch (Exception e)' },
        { id: 'c', text: 'The order never matters' },
        { id: 'd', text: 'Only one catch clause is allowed' },
      ],
      correctAnswer: 'b',
      explanation: 'Specific subclasses must appear before a general superclass catch; otherwise the later handler is unreachable.',
    },
    {
      id: 'java-q-26-4',
      type: 'fill-in-blank',
      prompt: 'The keyword used to raise an exception object immediately is ______.',
      correctAnswer: 'throw',
      explanation: 'Use throw with one Throwable object, for example throw new IllegalArgumentException("Bad value").',
    },
    {
      id: 'java-q-26-5',
      type: 'multiple-choice',
      prompt: 'What must a method do when it calls code that can throw a checked IOException?',
      choices: [
        { id: 'a', text: 'Catch it or declare it with throws' },
        { id: 'b', text: 'Convert it to a boolean automatically' },
        { id: 'c', text: 'Ignore it because Java handles all I/O errors' },
        { id: 'd', text: 'Declare the method final' },
      ],
      correctAnswer: 'a',
      explanation: 'Checked exceptions are enforced by the compiler through the catch-or-declare rule.',
    },
    {
      id: 'java-q-26-6',
      type: 'fill-in-blank',
      prompt: 'Which Scanner method checks whether another complete line is available in a file?',
      correctAnswer: 'hasNextLine',
      explanation: 'Use hasNextLine() before nextLine() when reading a text file line by line.',
    },
    {
      id: 'java-q-26-7',
      type: 'multiple-choice',
      prompt: 'What does Scanner.useDelimiter(",") change?',
      choices: [
        { id: 'a', text: 'It changes the file encoding to UTF-8' },
        { id: 'b', text: 'It makes commas separate the next tokens' },
        { id: 'c', text: 'It closes the scanner after every token' },
        { id: 'd', text: 'It converts tokens into integers' },
      ],
      correctAnswer: 'b',
      explanation: 'A delimiter tells Scanner where one token ends and the next begins.',
    },
    {
      id: 'java-q-26-8',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Write a program that divides 24 by 0 inside a try block. Catch ArithmeticException and print exactly Cannot divide by zero. Print Finished. after the try-catch statement.\\n\\nExpected output:\\nCannot divide by zero.\\nFinished.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        try {
            // Cause and handle an ArithmeticException
        } catch (ArithmeticException e) {
            // Print the error message
        }

        // Print Finished. after the try-catch
    }
}`,
      expectedOutput: 'Cannot divide by zero.\\nFinished.',
      correctAnswer: '__code__',
      explanation: 'The division throws ArithmeticException, the catch block prints the first line, and execution then continues after the try-catch statement.',
    },
  ],
};

export default module26;
