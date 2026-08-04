import type { Module } from './types';

const module0: Module = {
  id: 'java-module-0',
  slug: 'java-0',
  title: 'Introduction to Java',
  description: 'Discover what Java is, how it runs on the JVM, and build your first programs with variables, formatting, type conversions, and console input.',
  icon: '☕',
  color: 'from-orange-500 to-amber-400',
  locked: false,
  lessons: [
    {
      id: 'java-lesson-0-1',
      title: 'What is Object-Oriented Programming?',
      content: `**Object-Oriented Programming (OOP)** is a way of writing programs by modelling the real world as a collection of **objects** that interact with each other.

Every object has two key characteristics:
- **State** — the data it holds (e.g. a car's colour and speed)
- **Behaviour** — the actions it can perform (e.g. a car can accelerate or brake)

OOP is built on four core pillars:

| Pillar | Meaning |
|---|---|
| **Encapsulation** | Bundle data and behaviour together; hide internal details |
| **Inheritance** | A class can inherit properties and behaviour from another class |
| **Polymorphism** | The same method name behaves differently depending on the object |
| **Abstraction** | Expose only the essential features; hide the complexity |

Java is a fully object-oriented language — virtually everything in Java is an object.`,
      codeExamples: [],
    },
    {
      id: 'java-lesson-0-2',
      title: 'Java vs Python',
      content: `You may already know Python. Here are the key differences when moving to Java:

**Static vs Dynamic Typing**
- Python: \`x = 5\` — the type is inferred at runtime
- Java: \`int x = 5;\` — the type must be declared at compile time

**Braces vs Indentation**
- Python uses indentation to define code blocks
- Java uses curly braces \`{ }\`

**Compiled + Interpreted**
- Python is interpreted directly
- Java is first compiled to **bytecode** (\`.class\` files), then the **JVM** (Java Virtual Machine) interprets that bytecode. This makes Java platform-independent — "write once, run anywhere."

**Semicolons**
- Java statements end with a semicolon \`;\`

Despite these differences, the logic you learned in Python maps directly to Java — loops, conditions, and functions all exist, just with slightly different syntax.`,
      codeExamples: [
        {
          language: 'java',
          code: `// Python:  x = 10
// Java:
int x = 10;

// Python:  name = "Alice"
// Java:
String name = "Alice";

// Python:  is_valid = True
// Java:
boolean isValid = true;`,
          caption: 'Variable declarations: Python vs Java',
          editable: false,
        },
      ],
    },
    {
      id: 'java-lesson-0-3',
      title: 'Anatomy of a Java Program',
      content: `Every Java program has a specific structure. Let's break it down piece by piece.

**Package declaration** (optional but recommended)
Groups related classes together — like folders for your code.

**Import statements**
Bring in classes from other packages (like Python's \`import\`).

**Class declaration**
All Java code lives inside a **class**. The class name must match the filename.

**The main method**
This is the entry point — Java starts executing from here.
\`\`\`
public static void main(String[] args)
\`\`\`

**Comments**
- Single-line: \`// this is a comment\`
- Multi-line: \`/* ... */\`
- Javadoc: \`/** ... */\`

Run the example on the right to see your first Java program execute!`,
      codeExamples: [
        {
          language: 'java',
          code: `// Every Java program starts here
public class HelloWorld {

    // The main method — Java starts here
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java!");
    }
}`,
          caption: 'The classic Hello World in Java — try changing the message!',
          editable: true,
        },
        {
          language: 'java',
          code: `public class Variables {
    public static void main(String[] args) {
        // Integer (whole number)
        int age = 16;

        // Double (decimal number)
        double height = 1.75;

        // String (text)
        String name = "Alice";

        // Boolean (true/false)
        boolean isStudent = true;

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Height: " + height + "m");
        System.out.println("Is student: " + isStudent);
    }
}`,
          caption: 'Basic Java data types — modify the values and run!',
          editable: true,
        },
        {
          language: 'java',
          code: `public class Arithmetic {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;

        System.out.println("a + b = " + (a + b));  // 13
        System.out.println("a - b = " + (a - b));  // 7
        System.out.println("a * b = " + (a * b));  // 30
        System.out.println("a / b = " + (a / b));  // 3  (integer division!)
        System.out.println("a % b = " + (a % b));  // 1  (remainder)

        double result = (double) a / b;
        System.out.println("a / b (double) = " + result); // 3.333...
    }
}`,
          caption: 'Arithmetic in Java — note integer division!',
          editable: true,
        },
      ],
    },
    {
      id: 'java-lesson-0-4',
      title: 'Variables, Literals, Identifiers, and Constants',
      content: `Java is a **statically typed** language. That means every variable must have a declared type before you use it.

**Key vocabulary**
- A **variable** is a named storage location in memory
- A **literal** is a value written directly in your code, like \`5\`, \`3.14\`, or \`"hello"\`
- A **declaration** introduces a variable and its type
- An **assignment** gives the variable a value

Examples:
\`\`\`java
int value;      // declaration
value = 5;      // assignment
int score = 23; // declare and initialize
\`\`\`

Java also has rules for **identifiers**:
- allowed: letters, digits, underscores, and \`$\`
- cannot start with a digit
- cannot contain spaces
- cannot be a reserved keyword like \`int\`, \`class\`, or \`public\`
- are case-sensitive, so \`itemsOrdered\` and \`itemsordered\` are different

Use **descriptive names**. Java code should be self-documenting.

For values that should never change, use **constants** with the \`final\` keyword:
\`\`\`java
final int DAYS_IN_YEAR = 365;
final double GST_RATE = 0.125;
\`\`\`

Style convention:
- constants use all-uppercase letters
- multiple words are separated with underscores`,
      codeExamples: [
        {
          language: 'java',
          code: `public class VariablesAndConstants {
    public static void main(String[] args) {
        int value;
        value = 5;

        int score = 23;
        final int DAYS_IN_YEAR = 365;
        final double GST_RATE = 0.125;

        System.out.println("The value is " + value);
        System.out.println("Score = " + score);
        System.out.println("Days in a year = " + DAYS_IN_YEAR);
        System.out.println("GST rate = " + GST_RATE);
    }
}`,
          caption: 'Declarations, assignments, and final constants.',
          editable: true,
        },
      ],
    },
    {
      id: 'java-lesson-0-5',
      title: 'Primitive Types and Reference Types',
      content: `Java divides types into **primitive** types and **reference** types.

**Primitive types**
- \`byte\`, \`short\`, \`int\`, \`long\`
- \`float\`, \`double\`
- \`char\`
- \`boolean\`

Primitive variables store the actual value directly.

**Reference types**
- \`String\`
- arrays
- classes like \`Point\`
- enums

Reference variables store a reference to an object rather than the object value itself.

Important distinctions:
- assigning one primitive to another copies the value
- assigning one reference to another makes both references point to the same object
- primitive variables do not call methods directly on a stored value
- reference variables can be used to call an object's methods

Two Java Basics details that matter a lot:
- floating-point literals are **double** by default, so \`23.5\` is a \`double\`
- to make a float literal, add \`f\` or \`F\`, like \`23.5F\`

Also note:
- \`char\` literals use single quotes, like \`'A'\`
- \`String\` literals use double quotes, like \`"Hello"\`
- uninitialized reference variables default to \`null\``,
      codeExamples: [
        {
          language: 'java',
          code: `import java.awt.Point;

public class TypesDemo {
    public static void main(String[] args) {
        int copiesValue = 15;
        int anotherInt = copiesValue;   // primitive copy

        String greeting = "Hello World!";
        char initial = 'H';

        Point p1 = new Point(10, 20);
        Point p2 = p1;                  // both refer to the same object
        p2.move(30, 40);

        float okFloat = 23.5F;
        double defaultDouble = 23.5;

        System.out.println("anotherInt = " + anotherInt);
        System.out.println("greeting length = " + greeting.length());
        System.out.println("initial = " + initial);
        System.out.println("p1 = " + p1);
        System.out.println("okFloat = " + okFloat);
        System.out.println("defaultDouble = " + defaultDouble);
    }
}`,
          caption: 'Primitive values copy data directly; references point to objects.',
          editable: true,
        },
      ],
    },
    {
      id: 'java-lesson-0-6',
      title: 'printf, Type Conversions, and Parsing Strings',
      content: `Java's \`printf\` lets you control how values appear in output.

Common conversion characters:

| Format | Meaning |
|---|---|
| \`%d\` | decimal integer |
| \`%f\` | floating-point number |
| \`%s\` | string |
| \`%c\` | character |
| \`%n\` | newline |

Examples:
- \`%10d\` means width 10, right-aligned
- \`%-10s\` means width 10, left-aligned
- \`%.2f\` means exactly 2 digits after the decimal place

Java Basics also covers **type conversion**:

**Implicit casting (widening)**
- safe conversion from a smaller type to a larger one
- example: \`int -> double\`

**Explicit casting (narrowing)**
- required when converting from a larger type to a smaller one
- example: \`double -> int\`
- can lose information

\`\`\`java
double d = 4.9;
int i = (int) d;   // i becomes 4
\`\`\`

Boolean values are special:
- \`boolean\` cannot be cast to numeric types
- numeric values cannot be cast to \`boolean\`

You can also convert strings to numbers using parsing:
\`\`\`java
int num1 = Integer.parseInt("12");
double num2 = Double.parseDouble("3.1415");
\`\`\`

This is especially useful when you read input as text and need to turn it into numbers.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class FormattingAndCasting {
    public static void main(String[] args) {
        double x = 27.5;
        double y = 33.785;

        System.out.printf("x=%10.4f y=%10.2f%n", x, y);

        char ch1 = 'A';
        int codePoint = ch1;
        int number = 66;
        char ch2 = (char) number;

        String phrase = "123";
        int parsed = Integer.parseInt(phrase);

        System.out.println(codePoint);
        System.out.println(ch2);
        System.out.println(parsed * 2);
    }
}`,
          caption: 'Formatted output, widening and narrowing casts, and parsing strings into numbers.',
          editable: true,
        },
      ],
    },
    {
      id: 'java-lesson-0-7',
      title: 'System.in and Scanner Input',
      content: `A Java program reads console input through **\`System.in\`**, which represents the keyboard.

Because reading input involves more than just grabbing raw bytes, Java usually wraps \`System.in\` in a **Scanner**:

\`\`\`java
import java.util.Scanner;
Scanner console = new Scanner(System.in);
\`\`\`

The steps are:
1. import the \`Scanner\` class
2. construct one \`Scanner\` object
3. display a prompt
4. define a variable to receive the value
5. read the input

Common Scanner methods:

| Method | Reads |
|---|---|
| \`nextInt()\` | an \`int\` token |
| \`nextDouble()\` | a \`double\` token |
| \`next()\` | one word as a \`String\` |
| \`nextLine()\` | a full line as a \`String\` |

Each method waits until the user presses Enter.

Two practical rules:
- always store the returned value in a variable
- create **one Scanner object only** for a simple program unless you have a very good reason not to`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.util.Scanner;

public class ScannerExample {
    public static void main(String[] args) {
        Scanner console = new Scanner(System.in);

        System.out.print("How old are you? ");
        int age = console.nextInt();
        System.out.println(age + "... That's quite old!");
    }
}`,
          caption: 'System.in provides the keyboard stream; Scanner turns that input into Java values.',
          sampleInput: '21\n',
          editable: true,
        },
        {
          language: 'java',
          code: `import java.util.Scanner;

public class CircleFromInput {
    public static void main(String[] args) {
        Scanner console = new Scanner(System.in);

        System.out.print("Enter a radius: ");
        int radius = console.nextInt();

        double perimeter = 2 * Math.PI * radius;
        double area = Math.PI * radius * radius;

        System.out.printf("Perimeter is = %.2f%n", perimeter);
        System.out.printf("Area is = %.2f%n", area);
    }
}`,
          caption: 'A direct Week 1-style example: read a radius, then print formatted results.',
          sampleInput: '5\n',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'java-q-0-1',
      type: 'multiple-choice',
      prompt: 'What does JVM stand for?',
      choices: [
        { id: 'a', text: 'Java Virtual Machine' },
        { id: 'b', text: 'Java Variable Method' },
        { id: 'c', text: 'Java Verified Module' },
        { id: 'd', text: 'Just Very Modern' },
      ],
      correctAnswer: 'a',
      explanation: 'JVM stands for Java Virtual Machine. It interprets Java bytecode and makes Java programs platform-independent.',
    },
    {
      id: 'java-q-0-2',
      type: 'multiple-choice',
      prompt: 'Which of the following is the correct way to declare an integer variable in Java?',
      choices: [
        { id: 'a', text: 'x = 5' },
        { id: 'b', text: 'int x = 5;' },
        { id: 'c', text: 'integer x = 5;' },
        { id: 'd', text: 'var x = 5' },
      ],
      correctAnswer: 'b',
      explanation: 'In Java, you must specify the type before the variable name, and statements end with a semicolon. `int x = 5;` is the correct syntax.',
    },
    {
      id: 'java-q-0-3',
      type: 'true-false',
      prompt: 'In Java, the class name must match the filename.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'True. Java requires that the public class name exactly matches the filename (without the .java extension). For example, class HelloWorld must be in HelloWorld.java.',
    },
    {
      id: 'java-q-0-4',
      type: 'fill-in-blank',
      prompt: 'Complete the method signature that Java uses as the entry point of every program: `public static void _____(String[] args)`',
      correctAnswer: 'main',
      explanation: 'The `main` method is Java\'s entry point. The JVM looks for `public static void main(String[] args)` to start execution.',
    },
    {
      id: 'java-q-0-5',
      type: 'multiple-choice',
      prompt: 'What is the output of: System.out.println(10 / 3); in Java?',
      choices: [
        { id: 'a', text: '3.333...' },
        { id: 'b', text: '3' },
        { id: 'c', text: '4' },
        { id: 'd', text: 'Error' },
      ],
      correctAnswer: 'b',
      explanation: 'In Java, dividing two integers performs integer division, discarding the remainder. 10 / 3 = 3 (not 3.333). To get a decimal result, at least one operand must be a double.',
    },
    {
      id: 'java-q-0-8',
      type: 'multiple-choice',
      prompt: 'Which of the following is a valid Java identifier?',
      choices: [
        { id: 'a', text: '$234' },
        { id: 'b', text: 'maxValue' },
        { id: 'c', text: 'int' },
        { id: 'd', text: '2radius' },
      ],
      correctAnswer: 'b',
      explanation: '`maxValue` follows the identifier rules. `int` is a reserved keyword, `2radius` starts with a digit, and `$234` is a poor choice even though `$` is technically allowed by Java.',
    },
    {
      id: 'java-q-0-9',
      type: 'true-false',
      prompt: 'A variable declared with the `final` keyword can be reassigned later in the program.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: '`final` creates a constant-style variable. Once initialized, it cannot be assigned a different value.',
    },
    {
      id: 'java-q-0-10',
      type: 'fill-in-blank',
      prompt: 'Complete the constant declaration keyword: `_____ int DAYS_IN_YEAR = 365;`',
      correctAnswer: 'final',
      explanation: 'Java uses the `final` keyword for constants whose value should not change after initialization.',
    },
    {
      id: 'java-q-0-11',
      type: 'multiple-choice',
      prompt: 'Which of the following is a reference type in Java?',
      choices: [
        { id: 'a', text: 'int' },
        { id: 'b', text: 'double' },
        { id: 'c', text: 'String' },
        { id: 'd', text: 'boolean' },
      ],
      correctAnswer: 'c',
      explanation: '`String` is a reference type. The others listed are primitive types.',
    },
    {
      id: 'java-q-0-12',
      type: 'multiple-choice',
      prompt: 'Why does `float number; number = 23.5;` fail to compile?',
      choices: [
        { id: 'a', text: 'Because 23.5 is an int literal' },
        { id: 'b', text: 'Because floating-point literals are double by default' },
        { id: 'c', text: 'Because float values cannot contain decimals' },
        { id: 'd', text: 'Because Java requires commas in decimal literals' },
      ],
      correctAnswer: 'b',
      explanation: 'A literal like `23.5` is a `double` by default. To store it directly in a `float`, use `23.5F` or cast explicitly.',
    },
    {
      id: 'java-q-0-13',
      type: 'multiple-choice',
      prompt: 'What is the value of the expression `(int) 27.6`?',
      choices: [
        { id: 'a', text: '28' },
        { id: 'b', text: '27' },
        { id: 'c', text: '26' },
        { id: 'd', text: 'Error' },
      ],
      correctAnswer: 'b',
      explanation: 'Casting from `double` to `int` truncates the fractional part. It does not round.',
    },
    {
      id: 'java-q-0-14',
      type: 'multiple-choice',
      prompt: 'What is the output of this code?\n```java\nString phrase = "123";\nint c = Integer.parseInt(phrase);\nSystem.out.println(c * 2);\n```',
      choices: [
        { id: 'a', text: '123123' },
        { id: 'b', text: '246' },
        { id: 'c', text: '125' },
        { id: 'd', text: 'Error' },
      ],
      correctAnswer: 'b',
      explanation: '`Integer.parseInt("123")` produces the integer `123`, and `123 * 2` is `246`.',
    },
    {
      id: 'java-q-0-15',
      type: 'true-false',
      prompt: 'A boolean value can be cast to an int in Java.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'Boolean is incompatible with Java numeric conversions. You cannot cast `true` or `false` to `int`.',
    },
    {
      id: 'java-q-0-16',
      type: 'multiple-choice',
      prompt: 'Which Scanner method reads an entire line of text as a String?',
      choices: [
        { id: 'a', text: 'next()' },
        { id: 'b', text: 'nextInt()' },
        { id: 'c', text: 'nextLine()' },
        { id: 'd', text: 'readLine()' },
      ],
      correctAnswer: 'c',
      explanation: '`nextLine()` reads a full line. `next()` reads only the next token/word.',
    },
    {
      id: 'java-q-0-17',
      type: 'fill-in-blank',
      prompt: 'The Java object that represents standard keyboard input is `System._____`.',
      correctAnswer: 'in',
      explanation: '`System.in` is the standard input stream, usually connected to the keyboard in console programs.',
    },
    {
      id: 'java-q-0-18',
      type: 'multiple-choice',
      prompt: 'What is the output of this formatting code?\n```java\ndouble x = 27.5, y = 33.785;\nSystem.out.printf("x=%10.4f y=%10.2f%n", x, y);\n```',
      choices: [
        { id: 'a', text: 'x=27.5000 y=33.7850' },
        { id: 'b', text: 'x=   27.5000 y=     33.79' },
        { id: 'c', text: 'x=27.5 y=33.78' },
        { id: 'd', text: 'x=     27.50 y=    33.785' },
      ],
      correctAnswer: 'b',
      explanation: '`%10.4f` prints width 10 with 4 decimal places, and `%10.2f` prints width 10 with 2 decimal places. The second value is rounded to 33.79.',
    },
    {
      id: 'java-q-0-6',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Write a Java program that prints exactly:\n\n```text\nHello, Java!\n```',
      starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`,
      expectedOutput: 'Hello, Java!',
      correctAnswer: '__code__',
      explanation: 'Use System.out.println("Hello, Java!") inside the main method.',
    },
    {
      id: 'java-q-0-7',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Declare two int variables `a = 8` and `b = 3`, then print their sum, difference, and product each on a separate line.\n\nExpected output:\n```text\n11\n5\n24\n```',
      starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Declare a and b, then print sum, difference, product\n    }\n}`,
      expectedOutput: '11\n5\n24',
      correctAnswer: '__code__',
      explanation: 'int a = 8; int b = 3; then System.out.println(a + b); System.out.println(a - b); System.out.println(a * b);',
    },
    {
      id: 'java-q-0-19',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Complete a Java program that uses `double radius = 7.5;` and prints the perimeter and area of a circle to exactly 2 decimal places using `System.out.printf`. Use `Math.PI` for pi.\n\nExample output:\n```text\nPerimeter is = 47.12\nArea is = 176.71\n```',
      starterCode: `public class Main {\n    public static void main(String[] args) {\n        double radius = 7.5;\n        // Use Math.PI to compute the perimeter and area, then print both to 2 decimal places\n    }\n}`,
      expectedOutput: 'Perimeter is = 47.12\nArea is = 176.71',
      correctAnswer: '__code__',
      explanation: 'Use `2 * Math.PI * radius` for perimeter and `Math.PI * radius * radius` for area, then print with `%.2f`.',
    },
    {
      id: 'java-q-0-20',
      type: 'code-runner',
      language: 'java',
      gradeMode: 'stdout',
      prompt: 'Write a Java program that prompts the user for an integer radius using one `Scanner`, then prints the perimeter and area of the circle to 2 decimal places. Use `Math.PI` for pi.\n\nExample 1:\nInput:\n```text\n12\n```\nOutput:\n```text\nEnter a radius:\nPerimeter is = 75.40\nArea is = 452.39\n```\n\nExample 2:\nInput:\n```text\n5\n```\nOutput:\n```text\nEnter a radius:\nPerimeter is = 31.42\nArea is = 78.54\n```\n\nUse `System.out.print` or `System.out.println` for the prompt and `System.out.printf` for the results.',
      starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n\n        System.out.print("Enter a radius:\\n");\n        int radius = input.nextInt();\n\n        // Calculate the perimeter and area\n        // Print both values to 2 decimal places\n    }\n}`,
      testCases: [
        {
          id: 'java-q-0-20-sample-1',
          description: 'radius 12',
          stdin: '12\n',
          expectedStdout: 'Enter a radius:\nPerimeter is = 75.40\nArea is = 452.39',
        },
        {
          id: 'java-q-0-20-sample-2',
          description: 'radius 5',
          stdin: '5\n',
          expectedStdout: 'Enter a radius:\nPerimeter is = 31.42\nArea is = 78.54',
        },
        {
          id: 'java-q-0-20-hidden-1',
          hidden: true,
          stdin: '3\n',
          expectedStdout: 'Enter a radius:\nPerimeter is = 18.85\nArea is = 28.27',
        },
        {
          id: 'java-q-0-20-hidden-2',
          hidden: true,
          stdin: '9\n',
          expectedStdout: 'Enter a radius:\nPerimeter is = 56.55\nArea is = 254.47',
        },
      ],
      correctAnswer: '__code__',
      explanation: 'Import `java.util.Scanner`, create one Scanner from `System.in`, read the radius with `nextInt()`, and format the results using `%.2f`.',
    },
  ],
};

export default module0;
