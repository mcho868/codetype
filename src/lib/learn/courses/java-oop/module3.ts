import type { Module } from './types';

const module3: Module = {
  id: 'java-module-3',
  slug: 'java-3',
  title: 'Polymorphism',
  description: 'Understand how one variable can refer to different types, and how Java calls the right method at runtime.',
  icon: '🔄',
  color: 'from-purple-500 to-violet-400',
  locked: false,
  lessons: [
    {
      id: 'java-lesson-3-1',
      title: 'What is Polymorphism?',
      content: `**Polymorphism** means "many forms." In OOP, it means the same method name can behave differently depending on which object it is called on.

In Java, polymorphism is achieved through **inheritance + method overriding**. When you call a method on a superclass variable that holds a subclass object, Java runs the **subclass's version** of the method.

This is called **dynamic binding** (or late binding) — Java decides at **runtime** (not compile time) which method to call based on the actual type of the object.

**Why is this powerful?**
You can write code that works with the **superclass type** and it automatically works correctly for *any* subclass — even ones written in the future!`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Person {
    private String name;

    public Person(String name) { this.name = name; }
    public String getName()    { return name; }

    public String getJob() {
        return "Person (no specific job)";
    }
}

public class Chef extends Person {
    public Chef(String name) { super(name); }

    @Override
    public String getJob() { return "Chef"; }
}

public class PizzaChef extends Chef {
    public PizzaChef(String name) { super(name); }

    @Override
    public String getJob() { return "Pizza Chef"; }
}

public class KFCChef extends Chef {
    public KFCChef(String name) { super(name); }

    @Override
    public String getJob() { return "KFC Chef"; }
}

public class TestPoly {
    public static void main(String[] args) {
        // A Person variable can hold any subclass object
        Person p1 = new Person("Alice");
        Person p2 = new Chef("Bob");
        Person p3 = new PizzaChef("Charlie");
        Person p4 = new KFCChef("Diana");

        // Java calls the RIGHT version at runtime (dynamic binding)
        System.out.println(p1.getName() + ": " + p1.getJob());
        System.out.println(p2.getName() + ": " + p2.getJob());
        System.out.println(p3.getName() + ": " + p3.getJob());
        System.out.println(p4.getName() + ": " + p4.getJob());
    }
}`,
          caption: 'Dynamic binding: each object calls its own getJob() version',
          editable: true,
        },
      ],
    },
    {
      id: 'java-lesson-3-2',
      title: 'Arrays of Superclass Type',
      content: `One of the most powerful uses of polymorphism is storing **different subclass objects in a single array** using the superclass type.

This lets you process a mixed collection uniformly — call the same method on each element, and Java automatically runs the correct subclass version.

**Compile-time vs Runtime type**
- **Compile-time type** (declared type): what the compiler sees — \`Person p\`
- **Runtime type** (actual type): the real object — \`new Chef("Bob")\`

The compiler checks that the method exists on the compile-time type. Java's runtime decides which version to run based on the actual object.

If you need to access subclass-specific methods, you must **cast**:
\`\`\`java
if (p instanceof Chef) {
    Chef c = (Chef) p;
    c.chefOnlyMethod();
}
\`\`\``,
      codeExamples: [
        {
          language: 'java',
          code: `public class PolyArray {
    public static void main(String[] args) {
        // Array of Person — but each element is a different subclass
        Person[] people = {
            new Person("Alice"),
            new Chef("Bob"),
            new PizzaChef("Charlie"),
            new KFCChef("Diana"),
            new Chef("Eve"),
        };

        // Process all uniformly — polymorphism in action!
        System.out.println("=== All Jobs ===");
        for (Person p : people) {
            System.out.println(p.getName() + " → " + p.getJob());
        }

        // Count how many are Chefs (using instanceof)
        int chefCount = 0;
        for (Person p : people) {
            if (p instanceof Chef) {
                chefCount++;
            }
        }
        System.out.println("\nNumber of chefs: " + chefCount);
    }
}`,
          caption: 'Polymorphic array — mixed objects, uniform processing',
          editable: true,
        },
        {
          language: 'java',
          code: `// Shape hierarchy to demonstrate polymorphism
class Shape {
    public double area() { return 0; }
    public String name()  { return "Shape"; }
}

class Rectangle extends Shape {
    private double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }

    @Override public double area() { return w * h; }
    @Override public String name()  { return "Rectangle " + w + "x" + h; }
}

class Circle extends Shape {
    private double r;
    Circle(double r) { this.r = r; }

    @Override public double area() { return Math.PI * r * r; }
    @Override public String name()  { return "Circle r=" + r; }
}

class Triangle extends Shape {
    private double base, height;
    Triangle(double base, double height) { this.base = base; this.height = height; }

    @Override public double area() { return 0.5 * base * height; }
    @Override public String name()  { return "Triangle b=" + base + " h=" + height; }
}

public class TotalArea {
    public static void main(String[] args) {
        Shape[] shapes = {
            new Rectangle(4, 5),
            new Circle(3),
            new Triangle(6, 4),
            new Rectangle(2, 8),
            new Circle(1),
        };

        double total = 0;
        for (Shape s : shapes) {
            double a = s.area();
            total += a;
            System.out.printf("%-25s area = %.2f%n", s.name(), a);
        }
        System.out.printf("%nTotal area = %.2f%n", total);
    }
}`,
          caption: 'Calculate total area of mixed shapes — try adding a Triangle!',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'java-q-3-1',
      type: 'multiple-choice',
      prompt: 'What does "dynamic binding" mean in Java?',
      choices: [
        { id: 'a', text: 'The method to call is determined at compile time' },
        { id: 'b', text: 'The method to call is determined at runtime based on the actual object type' },
        { id: 'c', text: 'The method can only be called on dynamic types' },
        { id: 'd', text: 'Java binds variables to memory dynamically' },
      ],
      correctAnswer: 'b',
      explanation: 'Dynamic binding (late binding) means Java determines at runtime which overridden method to execute, based on the actual type of the object, not the declared type of the variable.',
    },
    {
      id: 'java-q-3-2',
      type: 'true-false',
      prompt: 'A variable of type `Animal` can hold a reference to a `Dog` object, as long as `Dog extends Animal`.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'True. This is a fundamental aspect of polymorphism. A superclass reference variable can hold any subclass object. `Animal a = new Dog("Rex", 3, "Labrador");` is valid Java.',
    },
    {
      id: 'java-q-3-3',
      type: 'multiple-choice',
      prompt: 'Given `Person p = new Chef("Bob");`, what does `p.getJob()` call?',
      choices: [
        { id: 'a', text: 'Person\'s getJob() because p is declared as Person' },
        { id: 'b', text: 'Chef\'s getJob() because the actual object is a Chef' },
        { id: 'c', text: 'It throws an error because you cannot call subclass methods through a superclass reference' },
        { id: 'd', text: 'It depends on the compiler settings' },
      ],
      correctAnswer: 'b',
      explanation: 'Due to dynamic binding, Java calls Chef\'s getJob() at runtime because the actual object is a Chef, even though the variable is declared as Person.',
    },
    {
      id: 'java-q-3-4',
      type: 'fill-in-blank',
      prompt: 'To check whether an object is an instance of a specific class at runtime, you use the `_________` keyword.',
      correctAnswer: 'instanceof',
      explanation: '`instanceof` tests whether an object is an instance of a particular class (or subclass). Example: `if (p instanceof Chef)` returns true if p actually holds a Chef object.',
    },
    {
      id: 'java-q-3-5',
      type: 'multiple-choice',
      prompt: 'What is the main benefit of using polymorphism with arrays?',
      choices: [
        { id: 'a', text: 'Arrays run faster with polymorphism' },
        { id: 'b', text: 'You can store and process mixed subclass objects uniformly through a superclass reference' },
        { id: 'c', text: 'Arrays become immutable with polymorphism' },
        { id: 'd', text: 'You can bypass encapsulation using arrays' },
      ],
      correctAnswer: 'b',
      explanation: 'Polymorphic arrays allow you to store different subclass objects in a single array of the superclass type, then process them all with the same code — each object automatically runs its own overridden method.',
    },
    {
      id: 'java-q-3-6',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create a Shape class with a method area() that returns 0.0.\nCreate a Circle subclass with a double radius field; override area() to return Math.PI * radius * radius.\nPrint the area of a Circle with radius 5, rounded to 2 decimal places.\nExpected output:\n78.54',
      starterCode: `public class Main {\n    static class Shape {\n        public double area() { return 0.0; }\n    }\n\n    static class Circle extends Shape {\n        double radius;\n        Circle(double r) { radius = r; }\n        // Override area()\n    }\n\n    public static void main(String[] args) {\n        Shape s = new Circle(5);\n        System.out.printf("%.2f%n", s.area());\n    }\n}`,
      expectedOutput: '78.54',
      correctAnswer: '__code__',
      explanation: '@Override public double area() { return Math.PI * radius * radius; } — dynamic binding calls Circle\'s area() even through a Shape reference.',
    },
    {
      id: 'java-q-3-7',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create a polymorphic array of Animal (use Dog and Cat subclasses). Each overrides speak().\nCall speak() on each element.\nExpected output:\nWoof!\nMeow!\nWoof!',
      starterCode: `public class Main {\n    static class Animal {\n        public void speak() { System.out.println("..."); }\n    }\n    static class Dog extends Animal {\n        public void speak() { System.out.println("Woof!"); }\n    }\n    static class Cat extends Animal {\n        public void speak() { System.out.println("Meow!"); }\n    }\n\n    public static void main(String[] args) {\n        Animal[] animals = { new Dog(), new Cat(), new Dog() };\n        // Call speak() on each\n    }\n}`,
      expectedOutput: 'Woof!\nMeow!\nWoof!',
      correctAnswer: '__code__',
      explanation: 'for (Animal a : animals) { a.speak(); } — dynamic binding calls each subclass\'s speak() at runtime.',
    },
  ],
};

export default module3;
