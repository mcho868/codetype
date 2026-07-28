import type { Module } from './types';

const module1: Module = {
  id: 'java-module-1',
  slug: 'java-1',
  title: 'Classes & Objects',
  description: 'Learn how to create classes, objects, instance state, constructors, accessors, mutators, and class-wide static members in Java.',
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

The lecture also emphasizes that Java gives you many **built-in classes** before you write your own:
- \`String\` — represents text
- \`Math\` — provides mathematical operations
- \`Scanner\` — reads user input
- \`Point\` and \`Rectangle\` from \`java.awt\`

For object creation, the slides separate the process into:
1. **Declaration** — declare a variable that can refer to an object
2. **Instantiation** — use \`new\` to allocate the object
3. **Initialization** — run a constructor to give it its starting state

\`\`\`java
Point p;
Point p2 = new Point(23, 94);
\`\`\`

The variable stores a **reference** to the object. The object itself lives elsewhere in memory.`,
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
          expectedOutput: 'p1 x = 3\np1 y = 4\np2 x = 10\np1 after move: x=7, y=8',
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

The \`new\` keyword allocates memory and calls the constructor.

The slides also stress an important memory idea:
- a class declaration defines the structure of an object
- but it does **not** allocate storage for each future instance variable value
- memory for instance variables is allocated when each object is instantiated

That is why three different \`Car\` objects can all have different speeds, models, and years even though they share the same class definition.`,
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
          expectedOutput:
            'Ball 1: red, radius=5.0\nBall 1 volume: 523.60\nBall 2: blue, radius=3.0\nBall 2 new colour: green',
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
          expectedOutput:
            '2022 Toyota Corolla (speed: 0.0 km/h)\nToyota Corolla accelerates to 60.0 km/h\nToyota Corolla accelerates to 100.0 km/h\nToyota Corolla slows to 70.0 km/h\n2022 Toyota Corolla (speed: 70.0 km/h)',
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

You can also use \`this(...)\` to call another constructor from within a constructor.

Two details from the lecture matter a lot:
- if a class defines **no constructor**, Java supplies a default no-argument constructor
- once you define **any** constructor yourself, Java does **not** generate that default one for you

That is why:
\`\`\`java
Author a = new Author();
\`\`\`
fails when the class only defines \`Author(String name)\`.

The lecture also covers **shadowing**:
- if a parameter and an instance variable have the same name, the parameter hides the field inside the method body
- use \`this.fieldName\` to explicitly refer to the instance variable`,
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
          expectedOutput:
            'Alice (age 0, unknown)\nBob (age 25, unknown)\nCharlie (age 30, charlie@example.com)',
          editable: true,
        },
      ],
    },
    {
      id: 'java-lesson-1-4',
      title: 'Accessor, Mutator, and Behaviour Methods',
      content: `A well-designed class exposes behaviour through methods rather than letting outside code manipulate fields directly.

The lecture introduces two common categories:
- **Accessor methods** (getters): return information from the object
- **Mutator methods** (setters): update the object’s state

Examples:
- \`getX()\`
- \`setX(int x)\`
- \`getAge()\`
- \`setAge(int age)\`

This gives the class a place to enforce rules. For example:
- only accept ages between 0 and 120
- keep a radius positive
- clamp a speed so it never drops below 0

The class can also expose higher-level behaviour methods such as:
- \`growOlder()\`
- \`isOfLegalAge()\`
- \`getBodyMassIndex()\`

These methods make the class more meaningful than just a bag of fields.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Person {
    private String name;
    private int age;
    private double weight;
    private double height;

    public Person(String name, int age, double weight, double height) {
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.height = height;
    }

    public String getName() { return name; }
    public int getAge() { return age; }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        if (age >= 0 && age <= 120) {
            this.age = age;
        }
    }

    public void growOlder() {
        age++;
    }

    public boolean isOfLegalAge() {
        return age >= 18;
    }

    public double getBodyMassIndex() {
        return weight / (height * height);
    }

    public static void main(String[] args) {
        Person p = new Person("Ava", 17, 68.0, 1.70);

        System.out.println(p.getName());
        System.out.println(p.getAge());
        System.out.println(p.isOfLegalAge());

        p.growOlder();
        p.setAge(200); // invalid, so age stays unchanged

        System.out.println(p.getAge());
        System.out.printf("%.2f%n", p.getBodyMassIndex());
    }
}`,
          caption: 'Accessors expose information; mutators enforce invariants; behaviour methods express domain logic.',
          expectedOutput: 'Ava\n17\nfalse\n18\n23.53',
          editable: true,
        },
      ],
    },
    {
      id: 'java-lesson-1-5',
      title: 'Class Variables, Class Methods, and Enums',
      content: `The slides then move beyond per-object state to **class-wide** information.

Use the \`static\` keyword for:
- **class variables**: one shared copy for the entire class
- **class methods**: methods that belong to the class itself, not a particular object

Examples you already know:
- \`Math.round(...)\`
- \`Integer.parseInt(...)\`

Important rules:
- static methods can directly access other static members
- static methods **cannot directly access instance variables**
- instance methods can access both instance and static members

This is useful for things like:
- counting how many objects have been created
- writing conversion helpers
- utility functions that do not depend on any single object

The lecture also revisits **enum** as a special class-like type with a fixed set of values. Enums can even define methods and private constructors.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Main {
    static class Employee {
    private static int count = 0;
    private String firstName;
    private String lastName;

    public Employee(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        count++;
    }

    public static int getCount() {
        return count;
    }
    }

    enum Grade {
        E, D, C, B, A;

        public static Grade convertToGrade(int score) {
            if (score > 8) return A;
            if (score > 6) return B;
            if (score > 4) return C;
            if (score > 2) return D;
            return E;
        }

        public boolean isPass() {
            return ordinal() >= C.ordinal();
        }
    }

    public static void main(String[] args) {
        Employee first = new Employee("Ana", "Ng");
        Employee second = new Employee("Ben", "Park");

        System.out.println(Employee.getCount());

        Grade g1 = Grade.convertToGrade(9);
        Grade g2 = Grade.convertToGrade(5);

        System.out.println(g1);
        System.out.println(g1.isPass());
        System.out.println(g2);
        System.out.println(g2.isPass());
    }
}`,
          caption: 'Static members belong to the class; enums can also define behaviour.',
          expectedOutput: '2\nA\ntrue\nC\ntrue',
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
      id: 'java-q-1-8',
      type: 'multiple-choice',
      prompt: 'What does the `new` keyword do when creating an object?',
      choices: [
        { id: 'a', text: 'It only declares a variable' },
        { id: 'b', text: 'It allocates memory, creates the object, and invokes a constructor' },
        { id: 'c', text: 'It automatically makes all fields public' },
        { id: 'd', text: 'It converts a class into an enum' },
      ],
      correctAnswer: 'b',
      explanation: 'The `new` operator creates the object, allocates space for it, and calls the appropriate constructor.',
    },
    {
      id: 'java-q-1-9',
      type: 'true-false',
      prompt: 'If you define any constructor in a class, Java will still automatically provide a default no-argument constructor.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'Once you declare a constructor yourself, the compiler stops generating the default no-argument constructor automatically.',
    },
    {
      id: 'java-q-1-10',
      type: 'multiple-choice',
      prompt: 'Which statement best describes an instance variable?',
      choices: [
        { id: 'a', text: 'One shared copy exists for the whole class' },
        { id: 'b', text: 'It is allocated only when a method is called' },
        { id: 'c', text: 'Each object gets its own copy of the variable' },
        { id: 'd', text: 'It must always be public' },
      ],
      correctAnswer: 'c',
      explanation: 'Instance variables belong to individual objects, so different instances can hold different values.',
    },
    {
      id: 'java-q-1-11',
      type: 'fill-in-blank',
      prompt: 'A get method is also commonly called an ______ method.',
      correctAnswer: 'accessor',
      explanation: 'Getter methods are accessors because they provide access to an object’s data without directly exposing the field.',
    },
    {
      id: 'java-q-1-12',
      type: 'multiple-choice',
      prompt: 'Why do we often make fields private and methods public?',
      choices: [
        { id: 'a', text: 'Because Java requires all fields to be private' },
        { id: 'b', text: 'To support encapsulation and controlled access to state' },
        { id: 'c', text: 'Because constructors cannot read private fields' },
        { id: 'd', text: 'So static methods can modify any object automatically' },
      ],
      correctAnswer: 'b',
      explanation: 'Private fields hide raw state, while public methods expose safe operations that preserve the object’s rules.',
    },
    {
      id: 'java-q-1-13',
      type: 'multiple-choice',
      prompt: 'What is true about a static method?',
      choices: [
        { id: 'a', text: 'It can directly use instance variables without an object' },
        { id: 'b', text: 'It belongs to the class and can be called even if no instances exist' },
        { id: 'c', text: 'It must be declared private' },
        { id: 'd', text: 'It is the same thing as a constructor' },
      ],
      correctAnswer: 'b',
      explanation: 'Static methods are class methods, so they can be called via the class name without creating an object first.',
    },
    {
      id: 'java-q-1-14',
      type: 'true-false',
      prompt: 'Instance methods can access both instance variables and static variables of the class.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'An instance method runs in the context of an object, so it can access both the object state and class-wide shared state.',
    },
    {
      id: 'java-q-1-15',
      type: 'multiple-choice',
      prompt: 'What does `this.x = x;` do in a constructor or setter?',
      choices: [
        { id: 'a', text: 'Assigns the field x to itself only' },
        { id: 'b', text: 'Assigns the parameter x to the current object’s field x' },
        { id: 'c', text: 'Creates a new object named x' },
        { id: 'd', text: 'Calls a static method named x' },
      ],
      correctAnswer: 'b',
      explanation: '`this.x` refers to the current object’s field, while the bare `x` usually refers to the local parameter.',
    },
    {
      id: 'java-q-1-16',
      type: 'multiple-choice',
      prompt: 'Which statement about enums in Java is correct?',
      choices: [
        { id: 'a', text: 'Enums cannot define methods' },
        { id: 'b', text: 'Enums are a special type with a fixed set of constant values' },
        { id: 'c', text: 'Enums must always be converted to strings before use' },
        { id: 'd', text: 'Enums are primitive types' },
      ],
      correctAnswer: 'b',
      explanation: 'Enums define a fixed set of named constants and can also include fields, methods, and private constructors.',
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
    {
      id: 'java-q-1-17',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Exercise 1-2 style question: define a `Person` class with private fields `name` and `age`, two constructors (`Person()` and `Person(String, int)`), and a `toString()` method. In `main`, create `new Person("Michael", 21)` and print it. Expected output:\nMichael(21)',
      starterCode: `public class Main {\n    static class Person {\n        private String name;\n        private int age;\n\n        // add constructors and toString()\n    }\n\n    public static void main(String[] args) {\n        Person p1 = new Person("Michael", 21);\n        System.out.println(p1);\n    }\n}`,
      expectedOutput: 'Michael(21)',
      correctAnswer: '__code__',
      explanation: 'This matches the lecture exercise: private fields, overloaded constructors, and a readable toString() result.',
    },
    {
      id: 'java-q-1-18',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Exercise 10 style question: complete an `Employee` class with private fields `firstName` and `lastName`, a static variable that counts how many Employee objects were created, and a static `getCount()` method. In `main`, create two Employee objects and print the count. Expected output:\n2',
      starterCode: `public class Main {\n    static class Employee {\n        private String firstName;\n        private String lastName;\n        // add static count\n\n        public Employee(String firstName, String lastName) {\n            // complete constructor\n        }\n\n        public static int getCount() {\n            // return count\n            return 0;\n        }\n    }\n\n    public static void main(String[] args) {\n        Employee bob = new Employee("Bob", "Blue");\n        Employee susan = new Employee("Susan", "Baker");\n        System.out.println(Employee.getCount());\n    }\n}`,
      expectedOutput: '2',
      correctAnswer: '__code__',
      explanation: 'Use a shared static field, increment it inside the constructor, and access it through a static class method.',
    },
  ],
};

export default module1;
