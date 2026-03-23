import type { Module } from './types';

const module5: Module = {
  id: 'java-module-5',
  slug: 'java-5',
  title: 'Interfaces',
  description: 'Define contracts with `interface` and `implements` — achieve multiple inheritance in Java.',
  icon: '🔌',
  color: 'from-pink-500 to-rose-400',
  locked: false,
  lessons: [
    {
      id: 'java-lesson-5-1',
      title: 'What is an Interface?',
      content: `An **interface** is a contract that specifies what a class can do, without saying how.

Think of it like an electrical socket — the socket defines a standard (the contract). Any device that conforms to the standard (implements the interface) can plug in.

**Declaring an interface:**
\`\`\`java
public interface Washable {
    void wash();    // implicitly public abstract
    void dry();     // implicitly public abstract
}
\`\`\`

**Implementing an interface:**
\`\`\`java
public class Shirt implements Washable {
    @Override
    public void wash() { System.out.println("Washing shirt..."); }

    @Override
    public void dry()  { System.out.println("Drying shirt..."); }
}
\`\`\`

**Key rules:**
- All interface methods are implicitly \`public abstract\` (no body)
- All interface fields are implicitly \`public static final\` (constants)
- A class implements an interface using the \`implements\` keyword
- A class can implement **multiple interfaces** (unlike inheritance, which is single-only)
- An implementing class must provide a body for **all** interface methods`,
      codeExamples: [
        {
          language: 'java',
          code: `interface Washable {
    void wash();
    boolean isDirty();
}

interface Bounceable {
    void bounce(int height);
    double getBounciness();
}

// Ball implements BOTH interfaces
class Ball implements Washable, Bounceable {
    private String color;
    private boolean dirty;
    private double bounciness;

    public Ball(String color, double bounciness) {
        this.color      = color;
        this.bounciness = bounciness;
        this.dirty      = false;
    }

    // Washable methods
    @Override
    public void wash() {
        dirty = false;
        System.out.println(color + " ball washed!");
    }

    @Override
    public boolean isDirty() { return dirty; }

    // Bounceable methods
    @Override
    public void bounce(int height) {
        dirty = true;
        System.out.println(color + " ball bounces " + height + "cm!");
    }

    @Override
    public double getBounciness() { return bounciness; }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        Ball b = new Ball("red", 0.85);

        b.bounce(50);
        System.out.println("Dirty? " + b.isDirty());
        b.wash();
        System.out.println("Dirty? " + b.isDirty());
        System.out.println("Bounciness: " + b.getBounciness());

        // Can use interface types as variable types
        Washable w = b;
        w.wash();  // only Washable methods accessible through w
    }
}`,
          caption: 'Ball implements both Washable and Bounceable interfaces',
          editable: true,
        },
      ],
    },
    {
      id: 'java-lesson-5-2',
      title: 'Abstract Classes vs Interfaces',
      content: `Both abstract classes and interfaces define incomplete types, but they serve different purposes.

| Feature | Abstract Class | Interface |
|---|---|---|
| Instantiate? | No | No |
| Methods | Abstract + concrete | Abstract only (Java 8+: default methods) |
| Fields | Any | Only constants (public static final) |
| Constructors | Yes | No |
| Inheritance | extends (one only) | implements (many) |
| Relationship | Is-a | Can-do |

**When to use each:**
- **Abstract class** → shared code + is-a relationship. A \`Shape\` is the right abstract base for \`Circle\` and \`Rectangle\`.
- **Interface** → capabilities/contracts + no shared state. \`Printable\`, \`Serializable\`, \`Comparable\` are capabilities any class can gain.

**The rule of thumb:**
- If you want to share code → abstract class
- If you want to define a capability → interface
- If you need both → use an abstract class that implements an interface`,
      codeExamples: [
        {
          language: 'java',
          code: `// Interface: defines a capability
interface Printable {
    void print();
}

interface Saveable {
    void save(String filename);
}

// Abstract class: defines shared behaviour + structure
abstract class Document {
    private String title;
    private String author;

    public Document(String title, String author) {
        this.title  = title;
        this.author = author;
    }

    public String getTitle()  { return title; }
    public String getAuthor() { return author; }

    // Abstract: each document renders differently
    public abstract String getContent();
}

// PDFDocument is a Document AND is Printable AND is Saveable
class PDFDocument extends Document implements Printable, Saveable {
    private String content;

    public PDFDocument(String title, String author, String content) {
        super(title, author);
        this.content = content;
    }

    @Override public String getContent() { return content; }

    @Override
    public void print() {
        System.out.println("=== Printing PDF ===");
        System.out.println("Title: " + getTitle());
        System.out.println("Author: " + getAuthor());
        System.out.println(content);
    }

    @Override
    public void save(String filename) {
        System.out.println("Saving '" + getTitle() + "' to " + filename + ".pdf");
    }
}

public class DocumentDemo {
    public static void main(String[] args) {
        PDFDocument doc = new PDFDocument(
            "Java OOP Guide",
            "CodeType",
            "Java uses classes and objects..."
        );

        doc.print();
        doc.save("java-guide");
    }
}`,
          caption: 'Abstract class + interfaces working together',
          editable: true,
        },
        {
          language: 'java',
          code: `// Interfaces can extend other interfaces
interface Shape2D {
    double area();
}

interface Colorable extends Shape2D {
    String getColor();

    // Default method (Java 8+) — provides a default implementation
    default void printInfo() {
        System.out.printf("Color: %s, Area: %.2f%n", getColor(), area());
    }
}

class FilledCircle implements Colorable {
    private double radius;
    private String color;

    public FilledCircle(double radius, String color) {
        this.radius = radius;
        this.color  = color;
    }

    @Override public double area()      { return Math.PI * radius * radius; }
    @Override public String getColor()  { return color; }
    // printInfo() is inherited from Colorable as a default method
}

public class InterfaceExtension {
    public static void main(String[] args) {
        FilledCircle fc = new FilledCircle(5.0, "blue");
        fc.printInfo();  // uses the default method from Colorable

        // Can use either interface type
        Shape2D s = fc;
        System.out.printf("Area via Shape2D ref: %.2f%n", s.area());
    }
}`,
          caption: 'Interface extending another interface, and default methods',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'java-q-5-1',
      type: 'multiple-choice',
      prompt: 'How many interfaces can a single Java class implement?',
      choices: [
        { id: 'a', text: 'Only one' },
        { id: 'b', text: 'Only two' },
        { id: 'c', text: 'As many as needed' },
        { id: 'd', text: 'It depends on the JVM version' },
      ],
      correctAnswer: 'c',
      explanation: 'A Java class can implement as many interfaces as needed, separated by commas: `class Ball implements Washable, Bounceable, Serializable`. This is how Java achieves multiple inheritance of type.',
    },
    {
      id: 'java-q-5-2',
      type: 'true-false',
      prompt: 'Interface methods are implicitly `public abstract` even without those keywords.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'True. In an interface, all methods (unless marked as `default` or `static`) are implicitly `public abstract`. You don\'t need to write those keywords, but you can for clarity.',
    },
    {
      id: 'java-q-5-3',
      type: 'multiple-choice',
      prompt: 'Which keyword is used to implement an interface?',
      choices: [
        { id: 'a', text: 'extends' },
        { id: 'b', text: 'uses' },
        { id: 'c', text: 'implements' },
        { id: 'd', text: 'interface' },
      ],
      correctAnswer: 'c',
      explanation: '`implements` is used when a class adopts an interface. For example: `class Shirt implements Washable`. The `extends` keyword is for class-to-class inheritance and interface-to-interface extension.',
    },
    {
      id: 'java-q-5-4',
      type: 'multiple-choice',
      prompt: 'When should you prefer an interface over an abstract class?',
      choices: [
        { id: 'a', text: 'When you have shared code (fields and concrete methods) between related classes' },
        { id: 'b', text: 'When you want to define a capability that unrelated classes can share' },
        { id: 'c', text: 'When you want to prevent instantiation' },
        { id: 'd', text: 'When you only have one subclass' },
      ],
      correctAnswer: 'b',
      explanation: 'Use an interface when you want to define a capability (can-do relationship) that multiple unrelated classes can adopt, like `Printable`, `Comparable`, or `Serializable`. Use an abstract class when you have shared code and an is-a relationship.',
    },
    {
      id: 'java-q-5-5',
      type: 'fill-in-blank',
      prompt: 'All fields declared in an interface are implicitly `public static _____` — they are constants.',
      correctAnswer: 'final',
      explanation: 'Interface fields are implicitly `public static final`. This means they are constants shared across all implementing classes. You cannot change their values after declaration.',
    },
    {
      id: 'java-q-5-6',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create an interface Greetable with a method greet().\nCreate a Person class that implements Greetable; greet() prints "Hello, I am a person.".\nExpected output:\nHello, I am a person.',
      starterCode: `public class Main {\n    interface Greetable {\n        void greet();\n    }\n\n    static class Person implements Greetable {\n        // Implement greet()\n    }\n\n    public static void main(String[] args) {\n        Greetable g = new Person();\n        g.greet();\n    }\n}`,
      expectedOutput: 'Hello, I am a person.',
      correctAnswer: '__code__',
      explanation: '@Override public void greet() { System.out.println("Hello, I am a person."); }',
    },
    {
      id: 'java-q-5-7',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create two interfaces: Flyable (method fly()) and Swimmable (method swim()).\nCreate a Duck class that implements both.\nfly() prints "Duck flying!", swim() prints "Duck swimming!".\nCall both methods.\nExpected output:\nDuck flying!\nDuck swimming!',
      starterCode: `public class Main {\n    interface Flyable { void fly(); }\n    interface Swimmable { void swim(); }\n\n    static class Duck implements Flyable, Swimmable {\n        // Implement fly() and swim()\n    }\n\n    public static void main(String[] args) {\n        Duck d = new Duck();\n        d.fly();\n        d.swim();\n    }\n}`,
      expectedOutput: 'Duck flying!\nDuck swimming!',
      correctAnswer: '__code__',
      explanation: 'Implement both interfaces: public void fly() { System.out.println("Duck flying!"); } and public void swim() { System.out.println("Duck swimming!"); }',
    },
  ],
};

export default module5;
