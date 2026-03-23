import type { Module } from './types';

const module16: Module = {
  id: 'module-16',
  slug: '16',
  title: 'SOLID Principles: SRP, OCP & LSP',
  description: 'Learn the first three SOLID principles — Single Responsibility, Open/Closed, and Liskov Substitution — with real Java examples.',
  icon: '⚖️',
  color: 'from-teal-500 to-green-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-16-1',
      title: 'Single Responsibility Principle (SRP)',
      content: `**SRP**: "A class should have only one reason to change."

**What is a "reason to change"?** Think of it as a stakeholder. If the HR department changes salary rules AND the accounting department changes report formats, a class that handles both will change for two different reasons — that's a violation.

**Signs of SRP violation:**
- A class has methods doing unrelated things (save to DB AND send email AND calculate tax)
- The class name is vague: "Manager", "Helper", "Processor"
- The class is very long (100+ lines is a smell)

**How to fix:** Split the class along responsibility boundaries. Each piece of cohesive logic gets its own class.

**The Employee example:**
- \`Employee\` — stores name and salary data
- \`SalaryCalculator\` — computes bonuses, tax deductions
- \`EmployeeReport\` — formats employee data for printing

Now HR owns Employee, payroll owns SalaryCalculator, reporting owns EmployeeReport. Each has one reason to change.`,
      codeExamples: [
        {
          language: 'java',
          code: `// VIOLATION — Employee does too many things
public class Employee {
    private String name;
    private double salary;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    // Reason 1: business rules (HR's concern)
    public double calculateBonus() {
        return salary * 0.10;
    }

    // Reason 2: reporting format (reporting team's concern)
    public void printReport() {
        System.out.println("Employee: " + name + ", Salary: $" + salary);
    }

    // Reason 3: persistence (database team's concern)
    public void saveToDatabase() {
        System.out.println("Saving " + name + " to DB...");
    }
}

// FIXED — each class has one reason to change
public class Employee {
    String name;
    double salary;
    public Employee(String name, double salary) {
        this.name = name; this.salary = salary;
    }
}

public class SalaryCalculator {
    public double calculateBonus(Employee e) { return e.salary * 0.10; }
    public double calculateTax(Employee e)   { return e.salary * 0.20; }
}

public class EmployeeReport {
    public void print(Employee e) {
        System.out.println("Employee: " + e.name + ", Salary: $" + e.salary);
    }
}

public class EmployeeRepository {
    public void save(Employee e) {
        System.out.println("Saving " + e.name + " to DB...");
    }
}`,
          caption: 'SRP fixed: Employee holds data only. Each other class has one job — change salary rules without touching the report class, and vice versa.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-16-2',
      title: 'Open/Closed Principle (OCP)',
      content: `**OCP**: "Software entities should be open for extension, but closed for modification."

**"Open for extension"** — you can add new behavior.
**"Closed for modification"** — adding new behavior should not require changing existing, tested code.

**The classic violation** — a long if/else or switch on type:
\`\`\`
if (shape.type.equals("circle")) { ... }
else if (shape.type.equals("rectangle")) { ... }
// Adding triangle means editing this method — VIOLATION
\`\`\`

**The fix** — use polymorphism. Each shape knows how to compute its own area. Adding a new shape means adding a new class, never touching existing code.

**How to achieve OCP:**
1. Program to interfaces/abstract classes
2. Use polymorphism to let new subclasses define new behavior
3. Move the varying logic into subclasses; keep the invariant logic in the base

**Benefit**: Existing code (already tested and deployed) is never modified — reducing regression risk.`,
      codeExamples: [
        {
          language: 'java',
          code: `// VIOLATION — adding a new shape requires modifying AreaCalculator
public class AreaCalculator {
    public double calculate(Object shape) {
        if (shape instanceof Circle) {
            Circle c = (Circle) shape;
            return Math.PI * c.radius * c.radius;
        } else if (shape instanceof Rectangle) {
            Rectangle r = (Rectangle) shape;
            return r.width * r.height;
        }
        // Adding Triangle means editing this method!
        return 0;
    }
}

// FIXED — each shape is responsible for its own area
public interface Shape {
    double area();
}

public class Circle implements Shape {
    private double radius;
    public Circle(double radius) { this.radius = radius; }
    public double area() { return Math.PI * radius * radius; }
}

public class Rectangle implements Shape {
    private double width, height;
    public Rectangle(double w, double h) { width = w; height = h; }
    public double area() { return width * height; }
}

// Adding Triangle: new class only — AreaCalculator never changes
public class Triangle implements Shape {
    private double base, height;
    public Triangle(double base, double height) { this.base = base; this.height = height; }
    public double area() { return 0.5 * base * height; }
}

public class AreaCalculator {
    public double calculate(Shape shape) { return shape.area(); }
}

public class Main {
    public static void main(String[] args) {
        AreaCalculator calc = new AreaCalculator();
        System.out.printf("Circle area: %.2f%n", calc.calculate(new Circle(5)));
        System.out.printf("Rectangle area: %.2f%n", calc.calculate(new Rectangle(4, 6)));
        System.out.printf("Triangle area: %.2f%n", calc.calculate(new Triangle(3, 4)));
    }
}`,
          caption: 'OCP fixed: AreaCalculator.calculate() never changes. New shapes are new classes that implement Shape — the old code is untouched.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-16-3',
      title: 'Liskov Substitution Principle (LSP)',
      content: `**LSP**: "Objects of a superclass should be replaceable with objects of a subclass without breaking the application."

More precisely: if S is a subtype of T, then wherever T is used, S can be used and the program still behaves correctly.

**The Rectangle/Square problem:**
A square IS-A rectangle mathematically — but in code, it breaks LSP. If you set width=4 and height=5 on a Rectangle, area should be 20. But a Square enforces width==height, so setting height=5 also changes width — the area is 25, not 20. Any code that depends on Rectangle's contract is now broken.

**LSP violations show up as:**
- Overriding a method to throw \`UnsupportedOperationException\`
- Overriding a method to do nothing (empty body)
- Needing \`instanceof\` checks in client code
- Subtypes that weaken postconditions or strengthen preconditions

**How to fix:** Don't force an IS-A relationship that breaks the contract. Use a common interface that both types implement, or restructure the hierarchy.`,
      codeExamples: [
        {
          language: 'java',
          code: `// VIOLATION — Square breaks Rectangle's contract
public class Rectangle {
    protected int width;
    protected int height;

    public void setWidth(int w)  { this.width = w; }
    public void setHeight(int h) { this.height = h; }
    public int area() { return width * height; }
}

public class Square extends Rectangle {
    // Square keeps width == height — violates Rectangle's contract!
    public void setWidth(int w)  { this.width = w; this.height = w; }
    public void setHeight(int h) { this.height = h; this.width = h; }
}

// This test passes for Rectangle but FAILS for Square — LSP violated
public void testArea(Rectangle r) {
    r.setWidth(4);
    r.setHeight(5);
    assert r.area() == 20; // Square gives 25!
}

// FIXED — separate hierarchy using a common interface
public interface Shape {
    int area();
}

public class Rectangle implements Shape {
    private int width, height;
    public Rectangle(int w, int h) { width = w; height = h; }
    public int area() { return width * height; }
}

public class Square implements Shape {
    private int side;
    public Square(int side) { this.side = side; }
    public int area() { return side * side; }
}

public class Main {
    public static void main(String[] args) {
        Shape r = new Rectangle(4, 5);
        Shape s = new Square(4);
        System.out.println("Rectangle area: " + r.area()); // 20
        System.out.println("Square area: " + s.area());    // 16
    }
}`,
          caption: 'LSP fixed: Rectangle and Square both implement Shape but are no longer in a parent-child relationship — no contract is broken.',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q16-1',
      type: 'multiple-choice',
      prompt: 'Which SOLID principle says a class should have only one reason to change?',
      choices: [
        { id: 'a', text: 'Open/Closed Principle' },
        { id: 'b', text: 'Liskov Substitution Principle' },
        { id: 'c', text: 'Single Responsibility Principle' },
        { id: 'd', text: 'Interface Segregation Principle' },
      ],
      correctAnswer: 'c',
      explanation: 'SRP — Single Responsibility Principle. A "reason to change" maps to a stakeholder or concern. If two different teams could demand changes to the same class, it has too many responsibilities.',
    },
    {
      id: 'q16-2',
      type: 'true-false',
      prompt: 'The Open/Closed Principle means existing code should never be deleted.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'OCP means you should be able to add new behavior without modifying existing, stable code. It does not mean code can never be deleted — refactoring and dead code removal are still valid.',
    },
    {
      id: 'q16-3',
      type: 'fill-in-blank',
      prompt: 'LSP states that objects of a subclass should be replaceable with objects of their _______ without breaking the application.',
      correctAnswer: 'superclass',
      explanation: 'LSP — Liskov Substitution Principle. Anywhere you use a base class (superclass) reference, substituting a subclass object should not alter the correctness of the program.',
    },
    {
      id: 'q16-4',
      type: 'multiple-choice',
      prompt: 'A class with a long if/else chain checking shape.type to calculate area violates which principle?',
      choices: [
        { id: 'a', text: 'Single Responsibility Principle' },
        { id: 'b', text: 'Open/Closed Principle' },
        { id: 'c', text: 'Liskov Substitution Principle' },
        { id: 'd', text: 'Dependency Inversion Principle' },
      ],
      correctAnswer: 'b',
      explanation: 'Adding a new shape requires modifying the existing if/else chain — the class is not closed for modification. Polymorphism fixes this: each shape implements its own area() method.',
    },
    {
      id: 'q16-5',
      type: 'true-false',
      prompt: 'In the SRP-fixed Employee example, the SalaryCalculator class can change independently of the EmployeeReport class.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'SRP gives each class one reason to change. Changing the bonus calculation only touches SalaryCalculator; changing the report format only touches EmployeeReport — they are fully independent.',
    },
    {
      id: 'q16-6',
      type: 'multiple-choice',
      prompt: 'The Square-extends-Rectangle problem is a classic violation of which principle?',
      choices: [
        { id: 'a', text: 'Single Responsibility Principle' },
        { id: 'b', text: 'Open/Closed Principle' },
        { id: 'c', text: 'Liskov Substitution Principle' },
        { id: 'd', text: 'Interface Segregation Principle' },
      ],
      correctAnswer: 'c',
      explanation: 'Square breaks the Rectangle contract — setWidth(4) then setHeight(5) should give area=20, but Square keeps width==height so area=25. Code using Rectangle as a base type breaks when given a Square.',
    },
    {
      id: 'q16-7',
      type: 'fill-in-blank',
      prompt: 'OCP is achieved by programming to _______ or abstract classes rather than concrete implementations.',
      correctAnswer: 'interfaces',
      explanation: 'By depending on interfaces (or abstract classes), client code works with any conforming implementation. New implementations can be added without changing the client — extension without modification.',
    },
    {
      id: 'q16-8',
      type: 'multiple-choice',
      prompt: 'Which is a common sign of an SRP violation?',
      choices: [
        { id: 'a', text: 'A class has exactly one public method' },
        { id: 'b', text: 'A class has a clear, specific name' },
        { id: 'c', text: 'A class has vague names like "Manager" or "Helper" and does many unrelated things' },
        { id: 'd', text: 'A class implements one interface' },
      ],
      correctAnswer: 'c',
      explanation: 'Vague class names (Manager, Helper, Processor) are a common code smell indicating SRP violation — the class likely handles multiple unrelated concerns bundled together.',
    },
    {
      id: 'q16-9',
      type: 'true-false',
      prompt: 'According to LSP, a subclass method can throw an exception in situations where the parent class would have returned a valid result.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'This violates LSP — the subclass breaks the contract established by the parent. Code that called the parent method expecting a valid result would now crash. Subtypes must honor the parent\'s postconditions.',
    },
    {
      id: 'q16-10',
      type: 'multiple-choice',
      prompt: 'Using polymorphism to achieve OCP means:',
      choices: [
        { id: 'a', text: 'Copying the existing class and modifying the copy' },
        { id: 'b', text: 'Writing a new subclass that overrides behavior without touching the parent' },
        { id: 'c', text: 'Adding new if/else branches to the existing class' },
        { id: 'd', text: 'Deleting the old class and replacing it entirely' },
      ],
      correctAnswer: 'b',
      explanation: 'Polymorphism achieves OCP by letting you create a new subclass that provides new behavior. The existing class (and all code using it) remains unchanged — open for extension, closed for modification.',
    },
    {
      id: 'q16-11',
      type: 'multiple-choice',
      prompt: 'Which fix correctly resolves the Square/Rectangle LSP problem?',
      choices: [
        { id: 'a', text: 'Make Square extend Rectangle and override setWidth only' },
        { id: 'b', text: 'Have both Square and Rectangle implement a common Shape interface independently' },
        { id: 'c', text: 'Remove the setWidth method from Rectangle' },
        { id: 'd', text: 'Add an isSquare() check everywhere Rectangle is used' },
      ],
      correctAnswer: 'b',
      explanation: 'Breaking the parent-child relationship and using a common interface (Shape with area()) lets both Square and Rectangle fulfill their contracts independently — no substitution violation.',
    },
    {
      id: 'q16-12',
      type: 'code-challenge',
      language: 'java',
      prompt: `Implement OCP with a Shape hierarchy.\nShape interface has area() returning double.\nCircle(double radius) computes Math.PI * radius * radius.\nTriangle(double base, double height) computes 0.5 * base * height.\nPrint both areas formatted to 2 decimal places.\nExpected output:\nCircle area: 78.54\nTriangle area: 6.00`,
      starterCode: `public class Main {\n    interface Shape {\n        double area();\n    }\n\n    static class Circle implements Shape {\n        private double radius;\n        Circle(double radius) { this.radius = radius; }\n        public double area() {\n            // return Math.PI * radius * radius\n            return 0;\n        }\n    }\n\n    static class Triangle implements Shape {\n        private double base, height;\n        Triangle(double base, double height) { this.base = base; this.height = height; }\n        public double area() {\n            // return 0.5 * base * height\n            return 0;\n        }\n    }\n\n    public static void main(String[] args) {\n        Shape circle = new Circle(5);\n        Shape triangle = new Triangle(3, 4);\n        System.out.printf("Circle area: %.2f%n", circle.area());\n        System.out.printf("Triangle area: %.2f%n", triangle.area());\n    }\n}`,
      expectedOutput: 'Circle area: 78.54\nTriangle area: 6.00',
      correctAnswer: '__code__',
      explanation: 'Circle.area() returns Math.PI * radius * radius (Math.PI * 25 ≈ 78.54). Triangle.area() returns 0.5 * 3 * 4 = 6.0. Each shape owns its formula — adding new shapes never changes existing code.',
    },
    {
      id: 'q16-13',
      type: 'code-challenge',
      language: 'java',
      prompt: `Implement an LSP-correct Bird hierarchy.\nAbstract class Bird has abstract method describe().\nInterface FlyingBird has method fly().\nEagle extends Bird, implements FlyingBird: describe() prints "Eagle", fly() prints "Eagle flies!".\nPenguin extends Bird: describe() prints "Penguin", and has walk() that prints "Penguin walks."\nCreate an Eagle and a Penguin. Call fly() on eagle and walk() on penguin.\nExpected output:\nEagle flies!\nPenguin walks.`,
      starterCode: `public class Main {\n    interface FlyingBird {\n        void fly();\n    }\n\n    static abstract class Bird {\n        public abstract void describe();\n    }\n\n    static class Eagle extends Bird implements FlyingBird {\n        public void describe() { System.out.println("Eagle"); }\n        public void fly() {\n            // print "Eagle flies!"\n        }\n    }\n\n    static class Penguin extends Bird {\n        public void describe() { System.out.println("Penguin"); }\n        public void walk() {\n            // print "Penguin walks."\n        }\n    }\n\n    public static void main(String[] args) {\n        Eagle eagle = new Eagle();\n        Penguin penguin = new Penguin();\n        eagle.fly();\n        penguin.walk();\n    }\n}`,
      expectedOutput: 'Eagle flies!\nPenguin walks.',
      correctAnswer: '__code__',
      explanation: 'Eagle.fly() prints "Eagle flies!". Penguin.walk() prints "Penguin walks." Penguin does not implement FlyingBird — so there is no forced fly() method that throws UnsupportedOperationException, preserving LSP.',
    },
  ],
};

export default module16;
