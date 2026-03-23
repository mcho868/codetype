import type { Module } from './types';

const module2: Module = {
  id: 'java-module-2',
  slug: 'java-2',
  title: 'Inheritance',
  description: 'Use `extends` to build class hierarchies, share code between classes, and override behaviour.',
  icon: '🌳',
  color: 'from-green-500 to-emerald-400',
  locked: false,
  lessons: [
    {
      id: 'java-lesson-2-1',
      title: 'What is Inheritance?',
      content: `**Inheritance** lets one class (the **subclass**) acquire the properties and behaviour of another class (the **superclass**).

Think of it like a family tree:
- A \`Dog\` is a kind of \`Animal\`
- A \`Sphere\` is a kind of \`Ball\`
- A \`Manager\` is a kind of \`Employee\`

**Why use inheritance?**
- **Code reuse** — write common behaviour once in the superclass
- **Organisation** — model real-world "is-a" relationships
- **Extensibility** — add new subclasses without touching existing code

**Has-a vs Is-a**
This is a critical distinction:
- **Is-a** → use inheritance. A Car *is-a* Vehicle ✓
- **Has-a** → use a field. A Car *has-a* Engine ✓ (don't inherit from Engine)

**Syntax:** \`class Subclass extends Superclass\``,
      codeExamples: [
        {
          language: 'java',
          code: `// Superclass
public class Animal {
    private String name;
    private int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age  = age;
    }

    public String getName() { return name; }
    public int    getAge()  { return age; }

    public void eat() {
        System.out.println(name + " is eating.");
    }

    public void sleep() {
        System.out.println(name + " is sleeping.");
    }
}

// Subclass — inherits everything from Animal
public class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age);  // call Animal's constructor
        this.breed = breed;
    }

    public void bark() {
        System.out.println(getName() + " says: Woof!");
    }

    public static void main(String[] args) {
        Dog d = new Dog("Rex", 3, "Labrador");
        d.eat();    // inherited from Animal
        d.sleep();  // inherited from Animal
        d.bark();   // Dog's own method
        System.out.println(d.getName() + " is " + d.getAge() + " years old.");
    }
}`,
          caption: 'Dog extends Animal — inheriting eat() and sleep()',
          editable: true,
        },
      ],
    },
    {
      id: 'java-lesson-2-2',
      title: 'The super Keyword & Constructor Chaining',
      content: `When a subclass is created, the **superclass constructor must be called first**. This happens via \`super(...)\`.

**Rules:**
1. If you write a constructor in a subclass, the first line should be \`super(...)\`
2. If you don't call \`super\`, Java automatically inserts \`super()\` (the no-arg constructor)
3. If the superclass has no no-arg constructor, you *must* explicitly call \`super(...)\` with the right arguments

**super** can also be used to call a superclass method that has been overridden:
\`\`\`java
super.methodName()
\`\`\`

**The protected modifier**
- \`private\` fields are hidden even from subclasses
- \`protected\` fields are accessible within the class and all subclasses

Best practice: keep fields private and use \`super\`'s getter methods instead.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Sphere extends Ball {
    // Ball has: private double radius, private String color

    // Sphere just adds a colour field on top (Ball already has radius)
    public Sphere(double radius, String color) {
        super(radius, color);  // MUST call Ball's constructor first
    }

    @Override
    public double getVolume() {
        double r = getRadius();  // use Ball's getter (radius is private)
        return (4.0 / 3.0) * Math.PI * r * r * r;
    }

    public String describe() {
        return "Sphere: radius=" + getRadius() + ", color=" + getColor();
    }
}

public class ColoredSphere extends Sphere {
    private String pattern;

    public ColoredSphere(double radius, String color, String pattern) {
        super(radius, color);  // call Sphere's constructor
        this.pattern = pattern;
    }

    public String describe() {
        return super.describe() + ", pattern=" + pattern;
    }

    public static void main(String[] args) {
        ColoredSphere cs = new ColoredSphere(3.0, "blue", "striped");
        System.out.println(cs.describe());
        System.out.println("Volume: " + String.format("%.2f", cs.getVolume()));
    }
}`,
          caption: 'Three-level hierarchy: Ball → Sphere → ColoredSphere',
          editable: true,
        },
      ],
    },
    {
      id: 'java-lesson-2-3',
      title: 'Method Overriding',
      content: `**Overriding** lets a subclass provide its own implementation of a method that is already defined in the superclass.

Rules for overriding:
- The method signature (name + parameters) must be **identical**
- The return type must be the same (or a subtype)
- The access modifier must be the same or **less restrictive**
- Use the \`@Override\` annotation (not required, but strongly recommended — it lets the compiler catch typos)

**Overriding vs Overloading**
- **Overriding** — same method name AND same parameters (in a subclass)
- **Overloading** — same method name but **different** parameters (in any class)

When you override a method, the subclass version replaces the superclass version for that object.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Shape {
    public double area() {
        return 0.0;  // default — subclasses will override this
    }

    public String describe() {
        return "I am a shape with area " + String.format("%.2f", area());
    }
}

public class Rectangle extends Shape {
    private double width, height;

    public Rectangle(double width, double height) {
        this.width  = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height;
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

public class TestShapes {
    public static void main(String[] args) {
        Shape s  = new Shape();
        Shape r  = new Rectangle(5, 3);
        Shape c  = new Circle(4);

        System.out.println(s.describe());
        System.out.println(r.describe());
        System.out.println(c.describe());
    }
}`,
          caption: '@Override in action — Rectangle and Circle override area()',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'java-q-2-1',
      type: 'multiple-choice',
      prompt: 'Which keyword is used to make one class inherit from another in Java?',
      choices: [
        { id: 'a', text: 'implements' },
        { id: 'b', text: 'inherits' },
        { id: 'c', text: 'extends' },
        { id: 'd', text: 'super' },
      ],
      correctAnswer: 'c',
      explanation: '`extends` is used to declare inheritance. For example: `class Dog extends Animal` means Dog is a subclass of Animal.',
    },
    {
      id: 'java-q-2-2',
      type: 'true-false',
      prompt: 'A subclass constructor must call `super(...)` as its very first statement if the superclass has no default (no-argument) constructor.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'True. If the superclass does not have a no-argument constructor, the subclass constructor must explicitly call `super(...)` with the appropriate arguments as the first line. Otherwise, the compiler will report an error.',
    },
    {
      id: 'java-q-2-3',
      type: 'multiple-choice',
      prompt: 'Which relationship should use inheritance?',
      choices: [
        { id: 'a', text: 'A Car has-a Engine' },
        { id: 'b', text: 'A Person has-a Address' },
        { id: 'c', text: 'A Dog is-a Animal' },
        { id: 'd', text: 'A House has-a Door' },
      ],
      correctAnswer: 'c',
      explanation: 'Inheritance models "is-a" relationships. A Dog IS-A Animal is correct for inheritance. Has-a relationships (Car has Engine, Person has Address) should use composition (a field), not inheritance.',
    },
    {
      id: 'java-q-2-4',
      type: 'fill-in-blank',
      prompt: 'The annotation `@_____` placed before a method tells the compiler that you intend to override a superclass method.',
      correctAnswer: 'Override',
      explanation: '`@Override` is a Java annotation that signals to the compiler that the method is intended to override a superclass method. If you make a typo, the compiler will report an error instead of silently creating a new method.',
    },
    {
      id: 'java-q-2-5',
      type: 'multiple-choice',
      prompt: 'What is the difference between method overriding and method overloading?',
      choices: [
        { id: 'a', text: 'Overriding is in the same class; overloading is in a subclass' },
        { id: 'b', text: 'Overriding has the same parameters; overloading has different parameters' },
        { id: 'c', text: 'Overriding changes the return type; overloading does not' },
        { id: 'd', text: 'They are the same thing' },
      ],
      correctAnswer: 'b',
      explanation: 'Overriding: same method name AND same parameters in a subclass (replaces the superclass behaviour). Overloading: same method name but different parameters in any class (creates a new variant of the method).',
    },
    {
      id: 'java-q-2-6',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create an Animal class with a speak() method that prints "...".\nCreate a Cat class that extends Animal and overrides speak() to print "Meow!".\nIn main, create a Cat and call speak().\nExpected output:\nMeow!',
      starterCode: `public class Main {\n    static class Animal {\n        public void speak() {\n            System.out.println("...");\n        }\n    }\n\n    static class Cat extends Animal {\n        // Override speak()\n    }\n\n    public static void main(String[] args) {\n        Cat c = new Cat();\n        c.speak();\n    }\n}`,
      expectedOutput: 'Meow!',
      correctAnswer: '__code__',
      explanation: '@Override public void speak() { System.out.println("Meow!"); } in the Cat class.',
    },
    {
      id: 'java-q-2-7',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create a Vehicle class with a constructor that takes a String brand and stores it.\nCreate a Car class that extends Vehicle. Its constructor takes brand and int doors — call super(brand) and store doors.\nPrint a Car\'s brand and doors.\nExpected output:\nToyota\n4',
      starterCode: `public class Main {\n    static class Vehicle {\n        String brand;\n        // Add constructor\n    }\n\n    static class Car extends Vehicle {\n        int doors;\n        // Add constructor calling super\n    }\n\n    public static void main(String[] args) {\n        Car c = new Car("Toyota", 4);\n        System.out.println(c.brand);\n        System.out.println(c.doors);\n    }\n}`,
      expectedOutput: 'Toyota\n4',
      correctAnswer: '__code__',
      explanation: 'Vehicle(String b) { brand = b; } and Car(String b, int d) { super(b); doors = d; }',
    },
  ],
};

export default module2;
