import type { Module } from './types';

const module0: Module = {
  id: 'java-module-0',
  slug: 'java-0',
  title: 'Introduction to Java',
  description: 'Discover what Java is, how it runs on the JVM, and write your first Java program.',
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
      id: 'java-q-0-6',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Write a Java program that prints exactly:\nHello, Java!',
      starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`,
      expectedOutput: 'Hello, Java!',
      correctAnswer: '__code__',
      explanation: 'Use System.out.println("Hello, Java!") inside the main method.',
    },
    {
      id: 'java-q-0-7',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Declare two int variables a = 8 and b = 3, then print their sum, difference, and product each on a separate line.\nExpected output:\n11\n5\n24',
      starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Declare a and b, then print sum, difference, product\n    }\n}`,
      expectedOutput: '11\n5\n24',
      correctAnswer: '__code__',
      explanation: 'int a = 8; int b = 3; then System.out.println(a + b); System.out.println(a - b); System.out.println(a * b);',
    },
  ],
};

export default module0;
