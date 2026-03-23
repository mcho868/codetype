import type { Module } from './types';

const module4: Module = {
  id: 'java-module-4',
  slug: 'java-4',
  title: 'Abstract Classes',
  description: 'Use the `abstract` keyword to define incomplete blueprints that subclasses must complete.',
  icon: '🔷',
  color: 'from-cyan-500 to-sky-400',
  locked: false,
  lessons: [
    {
      id: 'java-lesson-4-1',
      title: 'Concrete vs Abstract Classes',
      content: `So far, every class we've written is a **concrete class** — you can create objects directly from it using \`new\`.

An **abstract class** is a class that:
- Is declared with the \`abstract\` keyword
- **Cannot be instantiated** — you cannot write \`new AbstractClass()\`
- Serves as an incomplete blueprint that subclasses must finish

**When to use abstract classes?**
When you have a concept that is too general to stand on its own. For example:
- A \`Shape\` exists conceptually, but what does a "shape" look like by itself?
- A \`Vehicle\` exists, but how specifically does a generic vehicle move?

You model these as abstract classes and let specific subclasses (\`Circle\`, \`Car\`, \`Bicycle\`) provide the details.

**Abstract methods**
An abstract class can contain **abstract methods** — methods declared with no body:
\`\`\`java
public abstract double area();
\`\`\`
Subclasses *must* implement all abstract methods (unless they are also abstract).`,
      codeExamples: [
        {
          language: 'java',
          code: `// Abstract class — cannot instantiate directly
abstract class Shape {
    private String color;

    public Shape(String color) {
        this.color = color;
    }

    public String getColor() { return color; }

    // Abstract method — subclasses MUST implement this
    public abstract double area();
    public abstract double perimeter();

    // Concrete method — inherited by all subclasses
    public void describe() {
        System.out.printf("%s (color=%s): area=%.2f, perimeter=%.2f%n",
            getClass().getSimpleName(), color, area(), perimeter());
    }
}

class Rectangle extends Shape {
    private double width, height;

    public Rectangle(String color, double width, double height) {
        super(color);
        this.width  = width;
        this.height = height;
    }

    @Override public double area()      { return width * height; }
    @Override public double perimeter() { return 2 * (width + height); }
}

class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override public double area()      { return Math.PI * radius * radius; }
    @Override public double perimeter() { return 2 * Math.PI * radius; }
}

public class TestAbstract {
    public static void main(String[] args) {
        // Shape s = new Shape("red");  // ERROR! Cannot instantiate abstract class

        Shape r = new Rectangle("blue", 4, 5);
        Shape c = new Circle("red", 3);

        r.describe();
        c.describe();

        // Polymorphism still works!
        Shape[] shapes = { r, c, new Rectangle("green", 6, 2) };
        double total = 0;
        for (Shape s : shapes) total += s.area();
        System.out.printf("Total area: %.2f%n", total);
    }
}`,
          caption: 'Abstract Shape class — subclasses must implement area() and perimeter()',
          editable: true,
        },
        {
          language: 'java',
          code: `abstract class Animal {
    private String name;

    public Animal(String name) { this.name = name; }
    public String getName()    { return name; }

    // Every animal makes a sound, but what sound? Subclass decides.
    public abstract void makeSound();

    // Concrete: all animals eat the same way (for this example)
    public void eat() {
        System.out.println(name + " is eating.");
    }
}

class Dog extends Animal {
    public Dog(String name) { super(name); }

    @Override
    public void makeSound() {
        System.out.println(getName() + " says: Woof!");
    }
}

class Cat extends Animal {
    public Cat(String name) { super(name); }

    @Override
    public void makeSound() {
        System.out.println(getName() + " says: Meow!");
    }
}

class Duck extends Animal {
    public Duck(String name) { super(name); }

    @Override
    public void makeSound() {
        System.out.println(getName() + " says: Quack!");
    }
}

public class AnimalSounds {
    public static void main(String[] args) {
        Animal[] animals = {
            new Dog("Rex"),
            new Cat("Whiskers"),
            new Duck("Donald"),
            new Dog("Buddy"),
        };

        for (Animal a : animals) {
            a.makeSound();
        }
    }
}`,
          caption: 'Abstract Animal — each subclass implements makeSound() differently',
          editable: true,
        },
      ],
    },
    {
      id: 'java-lesson-4-2',
      title: 'Rules of Abstract Classes',
      content: `Here are the key rules to remember about abstract classes:

**Rule 1: Cannot instantiate**
\`\`\`java
abstract class Shape { ... }
Shape s = new Shape(); // COMPILE ERROR
\`\`\`

**Rule 2: Subclasses must implement all abstract methods**
If a subclass does NOT implement all abstract methods, it must also be declared \`abstract\`.

**Rule 3: Abstract classes CAN have constructors**
Even though you can't directly instantiate them, their constructors are called via \`super()\` from subclasses.

**Rule 4: Abstract classes can have concrete methods**
Mix abstract and concrete methods freely. The concrete ones give shared behaviour; the abstract ones force subclasses to customise.

**Rule 5: A class can only extend ONE abstract class**
Java allows single inheritance only. (Use interfaces for multiple inheritance — next module!)`,
      codeExamples: [
        {
          language: 'java',
          code: `abstract class Vehicle {
    private String brand;
    private int    year;

    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year  = year;
    }

    public String getBrand() { return brand; }
    public int    getYear()  { return year; }

    // Abstract — every vehicle moves, but HOW?
    public abstract void move();

    // Concrete — shared behaviour
    public void startEngine() {
        System.out.println(brand + " engine starting...");
    }

    public String info() {
        return year + " " + brand;
    }
}

class Car extends Vehicle {
    public Car(String brand, int year) { super(brand, year); }

    @Override
    public void move() {
        System.out.println(info() + " drives on the road.");
    }
}

class Boat extends Vehicle {
    public Boat(String brand, int year) { super(brand, year); }

    @Override
    public void move() {
        System.out.println(info() + " sails on the water.");
    }
}

class Plane extends Vehicle {
    public Plane(String brand, int year) { super(brand, year); }

    @Override
    public void move() {
        System.out.println(info() + " flies through the air.");
    }
}

public class VehicleDemo {
    public static void main(String[] args) {
        Vehicle[] fleet = {
            new Car("Toyota", 2022),
            new Boat("Yamaha", 2020),
            new Plane("Boeing", 2019),
        };

        for (Vehicle v : fleet) {
            v.startEngine();  // concrete method
            v.move();          // abstract → each subclass version
            System.out.println();
        }
    }
}`,
          caption: 'Abstract Vehicle with concrete startEngine() and abstract move()',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'java-q-4-1',
      type: 'true-false',
      prompt: 'You can create an instance of an abstract class directly using `new`.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'False. Abstract classes cannot be instantiated. Attempting `new AbstractClass()` causes a compile error. You must create instances of concrete subclasses that implement all abstract methods.',
    },
    {
      id: 'java-q-4-2',
      type: 'multiple-choice',
      prompt: 'What must a concrete subclass do with inherited abstract methods?',
      choices: [
        { id: 'a', text: 'Nothing — abstract methods are optional' },
        { id: 'b', text: 'Override and provide an implementation for all of them' },
        { id: 'c', text: 'Delete them from the class' },
        { id: 'd', text: 'Rename them' },
      ],
      correctAnswer: 'b',
      explanation: 'A concrete subclass MUST implement (override and provide a body for) all abstract methods inherited from its abstract superclass. If it does not, it must also be declared abstract.',
    },
    {
      id: 'java-q-4-3',
      type: 'multiple-choice',
      prompt: 'Which of the following is a valid abstract method declaration?',
      choices: [
        { id: 'a', text: 'abstract double area() { return 0; }' },
        { id: 'b', text: 'public abstract double area();' },
        { id: 'c', text: 'void abstract area();' },
        { id: 'd', text: 'double area() abstract;' },
      ],
      correctAnswer: 'b',
      explanation: '`public abstract double area();` is correct. Abstract methods have no body (no curly braces), just a semicolon. The `abstract` keyword comes before the return type.',
    },
    {
      id: 'java-q-4-4',
      type: 'fill-in-blank',
      prompt: 'Abstract classes CAN have _____ methods (methods with a full implementation that subclasses inherit).',
      correctAnswer: 'concrete',
      explanation: 'Abstract classes can mix abstract methods (no body) with concrete methods (full implementation). Concrete methods are inherited directly by subclasses without needing to be overridden.',
    },
    {
      id: 'java-q-4-5',
      type: 'multiple-choice',
      prompt: 'Can an abstract class have a constructor?',
      choices: [
        { id: 'a', text: 'No — abstract classes cannot have constructors' },
        { id: 'b', text: 'Yes — called via super() from subclass constructors' },
        { id: 'c', text: 'Yes — but only if there are no abstract methods' },
        { id: 'd', text: 'Yes — and you can call it directly with new' },
      ],
      correctAnswer: 'b',
      explanation: 'Abstract classes CAN have constructors. Even though you cannot directly instantiate an abstract class, its constructor is called via `super(...)` when a subclass object is created.',
    },
    {
      id: 'java-q-4-6',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create an abstract class Shape with an abstract method area().\nCreate a Square subclass with a double side field that implements area() returning side * side.\nPrint the area of a Square with side 4.\nExpected output:\n16.0',
      starterCode: `public class Main {\n    abstract static class Shape {\n        // Declare abstract area()\n    }\n\n    static class Square extends Shape {\n        double side;\n        Square(double s) { side = s; }\n        // Implement area()\n    }\n\n    public static void main(String[] args) {\n        Shape sq = new Square(4);\n        System.out.println(sq.area());\n    }\n}`,
      expectedOutput: '16.0',
      correctAnswer: '__code__',
      explanation: 'abstract public double area(); in Shape, then @Override public double area() { return side * side; } in Square.',
    },
    {
      id: 'java-q-4-7',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create an abstract class Animal with a String name field, a constructor, and an abstract method sound().\nCreate a Cow subclass; sound() prints name + " says Moo!".\nExpected output:\nBessie says Moo!',
      starterCode: `public class Main {\n    abstract static class Animal {\n        String name;\n        Animal(String n) { name = n; }\n        public abstract void sound();\n    }\n\n    static class Cow extends Animal {\n        Cow(String n) { super(n); }\n        // Implement sound()\n    }\n\n    public static void main(String[] args) {\n        Animal a = new Cow("Bessie");\n        a.sound();\n    }\n}`,
      expectedOutput: 'Bessie says Moo!',
      correctAnswer: '__code__',
      explanation: '@Override public void sound() { System.out.println(name + " says Moo!"); }',
    },
  ],
};

export default module4;
