import type { Module } from './types';

const module1: Module = {
  id: 'java-module-1',
  slug: 'java-1',
  title: 'Classes & Objects',
  description: 'Learn how to create blueprints (classes) and build objects from them with constructors, fields, and methods.',
  icon: '🏗️',
  color: 'from-blue-500 to-indigo-400',
  locked: false,
  lessons: [
    {
      id: 'java-lesson-1-1',
      title: 'Classes as Blueprints',
      content: `In Java, a **class** is a blueprint or template that describes what an object looks like and what it can do.

An **object** is a specific instance created from that blueprint.

**Real-world analogy:**
- Blueprint (class) → a cookie cutter
- Object (instance) → a cookie made with that cutter

You can create many cookies from one cutter. Each cookie is independent — you can decorate them differently — but they all share the same shape.

**Built-in classes**
Java comes with many pre-built classes. For example:
- \`String\` — represents text
- \`Math\` — provides mathematical operations
- \`Scanner\` — reads user input

You use these classes every time you write Java code!`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.awt.Point;

public class BuiltInClasses {
    public static void main(String[] args) {
        // Point is a built-in class representing an (x, y) coordinate
        Point p1 = new Point(3, 4);
        Point p2 = new Point(10, 20);

        System.out.println("p1 x = " + p1.x);
        System.out.println("p1 y = " + p1.y);
        System.out.println("p2 x = " + p2.x);

        // Move p1 to a new location
        p1.setLocation(7, 8);
        System.out.println("p1 after move: x=" + p1.x + ", y=" + p1.y);
    }
}`,
          caption: 'Using the built-in Point class',
          editable: true,
        },
      ],
    },
    {
      id: 'java-lesson-1-2',
      title: 'Creating Your Own Class',
      content: `To create your own class, you declare:
1. **Instance variables** — the data each object holds
2. **Constructors** — special methods that initialise a new object
3. **Instance methods** — actions the object can perform

**Visibility modifiers** control who can access what:
- \`public\` — accessible from anywhere
- \`private\` — only accessible within the same class

The golden rule: **instance variables should be private**. This is **encapsulation** — hiding the data and only exposing it through controlled methods.

**Creating an object (3 steps):**
1. **Declare** — \`Ball myBall;\`
2. **Instantiate** — \`myBall = new Ball();\`
3. (Or combine) — \`Ball myBall = new Ball();\`

The \`new\` keyword allocates memory and calls the constructor.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Ball {
    // Instance variables (private = encapsulation)
    private double radius;
    private String color;

    // Constructor — called when you write: new Ball(...)
    public Ball(double radius, String color) {
        this.radius = radius;
        this.color = color;
    }

    // Instance method
    public double getVolume() {
        return (4.0 / 3.0) * Math.PI * radius * radius * radius;
    }

    // Getter methods
    public double getRadius() { return radius; }
    public String getColor()  { return color; }

    // Setter methods
    public void setRadius(double r) { radius = r; }
    public void setColor(String c)  { color = c; }

    public static void main(String[] args) {
        Ball b1 = new Ball(5.0, "red");
        Ball b2 = new Ball(3.0, "blue");

        System.out.println("Ball 1: " + b1.getColor() + ", radius=" + b1.getRadius());
        System.out.println("Ball 1 volume: " + String.format("%.2f", b1.getVolume()));
        System.out.println("Ball 2: " + b2.getColor() + ", radius=" + b2.getRadius());

        // Change ball 2's colour
        b2.setColor("green");
        System.out.println("Ball 2 new colour: " + b2.getColor());
    }
}`,
          caption: 'A complete Ball class with constructor, getters, setters, and a method',
          editable: true,
        },
        {
          language: 'java',
          code: `public class Car {
    private String make;
    private String model;
    private int year;
    private double speed;   // current speed in km/h

    public Car(String make, String model, int year) {
        this.make  = make;
        this.model = model;
        this.year  = year;
        this.speed = 0;     // starts stationary
    }

    public void accelerate(double amount) {
        speed += amount;
        System.out.println(make + " " + model + " accelerates to " + speed + " km/h");
    }

    public void brake(double amount) {
        speed = Math.max(0, speed - amount);
        System.out.println(make + " " + model + " slows to " + speed + " km/h");
    }

    public String getInfo() {
        return year + " " + make + " " + model + " (speed: " + speed + " km/h)";
    }

    public static void main(String[] args) {
        Car myCar = new Car("Toyota", "Corolla", 2022);
        System.out.println(myCar.getInfo());

        myCar.accelerate(60);
        myCar.accelerate(40);
        myCar.brake(30);

        System.out.println(myCar.getInfo());
    }
}`,
          caption: 'A Car class — try adding a horn() method!',
          editable: true,
        },
      ],
    },
    {
      id: 'java-lesson-1-3',
      title: 'Constructors and this',
      content: `A **constructor** is a special method that:
- Has the **same name** as the class
- Has **no return type** (not even void)
- Is called automatically when you use \`new\`

**Default constructor**
If you don't write a constructor, Java provides one automatically that sets all fields to their default values (0, null, false).

**Overloaded constructors**
You can have multiple constructors with different parameter lists — this is called **overloading**.

**The \`this\` keyword**
Inside a class, \`this\` refers to the current object. It's commonly used when a parameter has the same name as an instance variable:
\`\`\`java
this.radius = radius;  // "this" instance's radius = parameter radius
\`\`\`

You can also use \`this(...)\` to call another constructor from within a constructor.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Person {
    private String name;
    private int age;
    private String email;

    // Constructor 1: just name (age defaults to 0, email to "unknown")
    public Person(String name) {
        this(name, 0, "unknown");  // calls Constructor 3
    }

    // Constructor 2: name and age
    public Person(String name, int age) {
        this(name, age, "unknown");  // calls Constructor 3
    }

    // Constructor 3: all fields
    public Person(String name, int age, String email) {
        this.name  = name;
        this.age   = age;
        this.email = email;
    }

    public String toString() {
        return name + " (age " + age + ", " + email + ")";
    }

    public static void main(String[] args) {
        Person p1 = new Person("Alice");
        Person p2 = new Person("Bob", 25);
        Person p3 = new Person("Charlie", 30, "charlie@example.com");

        System.out.println(p1);
        System.out.println(p2);
        System.out.println(p3);
    }
}`,
          caption: 'Overloaded constructors using this() chaining',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'java-q-1-1',
      type: 'multiple-choice',
      prompt: 'What keyword is used to create a new object from a class in Java?',
      choices: [
        { id: 'a', text: 'create' },
        { id: 'b', text: 'make' },
        { id: 'c', text: 'new' },
        { id: 'd', text: 'object' },
      ],
      correctAnswer: 'c',
      explanation: 'The `new` keyword allocates memory for a new object and calls the constructor. For example: `Ball b = new Ball(5.0, "red");`',
    },
    {
      id: 'java-q-1-2',
      type: 'true-false',
      prompt: 'Instance variables should be declared as `public` to allow other classes to access them directly.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'False. This is a violation of encapsulation. Instance variables should be `private`, and access should be provided through getter and setter methods. This gives the class control over how its data is accessed and modified.',
    },
    {
      id: 'java-q-1-3',
      type: 'multiple-choice',
      prompt: 'What does the `this` keyword refer to in an instance method?',
      choices: [
        { id: 'a', text: 'The class itself' },
        { id: 'b', text: 'The current object (the instance the method was called on)' },
        { id: 'c', text: 'The parent class' },
        { id: 'd', text: 'The main method' },
      ],
      correctAnswer: 'b',
      explanation: '`this` refers to the current instance of the class. It is commonly used to distinguish between an instance variable and a parameter that has the same name.',
    },
    {
      id: 'java-q-1-4',
      type: 'fill-in-blank',
      prompt: 'A method that returns the value of a private field is called a _____ method.',
      correctAnswer: 'getter',
      explanation: 'A getter (also called an accessor) is a method that returns the value of a private instance variable. By convention, getter names start with "get", e.g., `getName()`, `getAge()`.',
    },
    {
      id: 'java-q-1-5',
      type: 'multiple-choice',
      prompt: 'Which of the following is true about constructors?',
      choices: [
        { id: 'a', text: 'Constructors must return a value' },
        { id: 'b', text: 'Constructors have the same name as the class and no return type' },
        { id: 'c', text: 'A class can only have one constructor' },
        { id: 'd', text: 'Constructors are called using the method name directly' },
      ],
      correctAnswer: 'b',
      explanation: 'Constructors have the same name as the class and no return type (not even void). A class can have multiple constructors (overloading), and they are invoked using the `new` keyword.',
    },
    {
      id: 'java-q-1-6',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create a Dog class with a String field name and a method bark() that prints "Woof! I am " followed by the name.\nIn main, create a Dog with name "Rex" and call bark().\nExpected output:\nWoof! I am Rex',
      starterCode: `public class Main {\n    static class Dog {\n        String name;\n        // Add bark() method\n    }\n\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        d.name = "Rex";\n        d.bark();\n    }\n}`,
      expectedOutput: 'Woof! I am Rex',
      correctAnswer: '__code__',
      explanation: 'Add a bark() method: public void bark() { System.out.println("Woof! I am " + name); }',
    },
    {
      id: 'java-q-1-7',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create a Rectangle class with a constructor that takes width and height, and an area() method that returns width * height.\nPrint the area of a 5x3 rectangle.\nExpected output:\n15',
      starterCode: `public class Main {\n    static class Rectangle {\n        int width, height;\n        // Add constructor and area() method\n    }\n\n    public static void main(String[] args) {\n        Rectangle r = new Rectangle(5, 3);\n        System.out.println(r.area());\n    }\n}`,
      expectedOutput: '15',
      correctAnswer: '__code__',
      explanation: 'Constructor: Rectangle(int w, int h) { width = w; height = h; } Area method: public int area() { return width * height; }',
    },
  ],
};

export default module1;
