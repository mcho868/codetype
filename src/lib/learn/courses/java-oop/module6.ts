import type { Module } from './types';

const module6: Module = {
  id: 'module-6',
  slug: '6',
  title: 'Aggregation & Composition',
  description: 'Model real-world relationships using has-a: aggregation (shared ownership) and composition (exclusive ownership).',
  icon: '🔗',
  color: 'from-rose-500 to-pink-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-6-1',
      title: 'Three Ways Classes Relate',
      content: `Three relationship types between classes:

1. **Association** — classes interact but are independent (e.g., Student submits Assignment). Neither owns the other.
2. **Aggregation** — "has-a" with shared ownership. The part can exist without the whole (e.g., Employee has-a Date of birth — if Employee is deleted, Date still exists). Implemented by storing a reference to an existing object.
3. **Composition** — "has-a" with exclusive ownership. The part CANNOT exist without the whole (e.g., Car has-a CarEngine — if Car is destroyed, CarEngine is also destroyed). Created inside the constructor.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Date {
    private int day, month, year;
    public Date(int d, int m, int y) { day = d; month = m; year = y; }
    public String toString() { return day + "/" + month + "/" + year; }
}

public class Employee {
    private String name;
    private Date dob;  // aggregation: Date lives outside Employee

    public Employee(String name, Date dob) {
        this.name = name;
        this.dob = dob;  // stores reference to existing Date
    }
    public void display() {
        System.out.println(name + " born " + dob);
    }
}

// Usage:
Date birthday = new Date(15, 6, 1990);
Employee emp = new Employee("Alice", birthday);
emp.display();`,
          caption: 'Employee/Date aggregation — Date is passed in via constructor (shared, not owned)',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-6-2',
      title: 'Composition in Practice',
      content: `Composition creates its "parts" internally — you don't pass them in. When the outer object dies, so do its parts. This is tighter coupling but useful when parts have no meaning alone.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class CarEngine {
    private int horsepower;
    public CarEngine(int hp) { this.horsepower = hp; }
    public void start() { System.out.println("Engine started! HP: " + horsepower); }
}

public class Car {
    private String model;
    private CarEngine engine;  // composition: Car owns the engine

    public Car(String model, int hp) {
        this.model = model;
        this.engine = new CarEngine(hp);  // created inside Car
    }
    public void drive() {
        engine.start();
        System.out.println(model + " is driving!");
    }
}

Car car = new Car("Tesla", 450);
car.drive();`,
          caption: 'Car/CarEngine composition — the engine is created inside Car',
          editable: true,
        },
        {
          language: 'java',
          code: `import java.util.ArrayList;

public class Student {
    private String name;
    public Student(String name) { this.name = name; }
    public String getName() { return name; }
}

public class Department {
    private String name;
    private ArrayList<Student> students = new ArrayList<>();

    public Department(String name) { this.name = name; }

    public void addStudent(Student s) { students.add(s); }

    public void listStudents() {
        System.out.println("Students in " + name + ":");
        for (Student s : students) {
            System.out.println("  " + s.getName());
        }
    }
}

Student s1 = new Student("Alice");
Student s2 = new Student("Bob");
Department dept = new Department("Computer Science");
dept.addStudent(s1);
dept.addStudent(s2);
dept.listStudents();`,
          caption: 'Aggregation with ArrayList — Department has many Students, but students exist independently',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-6-3',
      title: 'Composition vs Aggregation — Choosing Right',
      content: `Quick rule of thumb:
- Ask "Can the part exist without the whole?" → YES = aggregation, NO = composition
- Aggregation: pass the object in via constructor parameter (store a reference)
- Composition: create the object inside the constructor (new inside constructor)`,
      codeExamples: [
        {
          language: 'java',
          code: `public class SimpleRectangle {
    private double width, height;
    public SimpleRectangle(double w, double h) { width = w; height = h; }
    public double area() { return width * height; }
}

public class SimpleTriangle {
    private double base, height;
    public SimpleTriangle(double b, double h) { base = b; height = h; }
    public double area() { return 0.5 * base * height; }
}

public class TriangularPrism {
    private SimpleRectangle face;         // composition
    private SimpleTriangle crossSection;  // composition
    private double length;

    public TriangularPrism(double rW, double rH, double tB, double tH, double len) {
        face = new SimpleRectangle(rW, rH);
        crossSection = new SimpleTriangle(tB, tH);
        length = len;
    }

    public double surfaceArea() {
        return 2 * crossSection.area() + 3 * face.area();
    }

    public double volume() {
        return crossSection.area() * length;
    }
}

TriangularPrism prism = new TriangularPrism(4, 3, 4, 3, 10);
System.out.println("Surface area: " + prism.surfaceArea());
System.out.println("Volume: " + prism.volume());`,
          caption: 'TriangularPrism uses composition of SimpleRectangle and SimpleTriangle',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q6-1',
      type: 'multiple-choice',
      prompt: 'Which relationship type means the part CANNOT exist without the whole?',
      choices: [
        { id: 'a', text: 'Association' },
        { id: 'b', text: 'Aggregation' },
        { id: 'c', text: 'Composition' },
        { id: 'd', text: 'Inheritance' },
      ],
      correctAnswer: 'c',
      explanation: 'Composition means exclusive ownership — the part is created inside the whole and destroyed with it.',
    },
    {
      id: 'q6-2',
      type: 'true-false',
      prompt: 'In aggregation, the object reference is typically passed into the constructor rather than created inside it.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'Aggregation stores a reference to an independently-existing object, so it\'s usually passed in.',
    },
    {
      id: 'q6-3',
      type: 'multiple-choice',
      prompt: 'In the Employee/Date example, Date is an example of:',
      choices: [
        { id: 'a', text: 'Composition' },
        { id: 'b', text: 'Aggregation' },
        { id: 'c', text: 'Inheritance' },
        { id: 'd', text: 'Static binding' },
      ],
      correctAnswer: 'b',
      explanation: 'Date is passed into Employee and can exist independently — that\'s aggregation.',
    },
    {
      id: 'q6-4',
      type: 'fill-in-blank',
      prompt: 'To store a list of objects in Java, use ______<StudentName>.',
      correctAnswer: 'ArrayList',
      explanation: 'ArrayList is a dynamic list that can hold any object type when parameterized.',
    },
    {
      id: 'q6-5',
      type: 'multiple-choice',
      prompt: 'Which best describes the Car/CarEngine relationship?',
      choices: [
        { id: 'a', text: 'Association' },
        { id: 'b', text: 'Aggregation' },
        { id: 'c', text: 'Composition' },
        { id: 'd', text: 'Polymorphism' },
      ],
      correctAnswer: 'c',
      explanation: 'CarEngine is created inside Car\'s constructor and has no meaning without a Car — that\'s composition.',
    },
    {
      id: 'q6-6',
      type: 'true-false',
      prompt: 'In composition, the part object is created inside the whole object\'s constructor.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: '`new PartClass()` inside the constructor defines composition — the part is born and dies with the whole.',
    },
    {
      id: 'q6-7',
      type: 'multiple-choice',
      prompt: 'A Pond has many Ducks, but ducks can exist without the pond. This is:',
      choices: [
        { id: 'a', text: 'Composition' },
        { id: 'b', text: 'Generalization' },
        { id: 'c', text: 'Aggregation' },
        { id: 'd', text: 'None of the above' },
      ],
      correctAnswer: 'c',
      explanation: 'Ducks exist independently of the pond — that\'s aggregation, not composition.',
    },
    {
      id: 'q6-8',
      type: 'multiple-choice',
      prompt: 'What does the for-each loop `for (Student s : students)` do?',
      choices: [
        { id: 'a', text: 'Loops over indexes 0 to students.length' },
        { id: 'b', text: 'Loops over each Student object in the students list' },
        { id: 'c', text: 'Compiles a new list' },
        { id: 'd', text: 'Sorts the list' },
      ],
      correctAnswer: 'b',
      explanation: 'The enhanced for-each loop iterates over each element in a collection directly.',
    },
    {
      id: 'q6-9',
      type: 'fill-in-blank',
      prompt: 'The keyword used to create a new object inside a constructor is ______.',
      correctAnswer: 'new',
      explanation: 'The `new` keyword allocates memory and calls the constructor of the specified class.',
    },
    {
      id: 'q6-10',
      type: 'multiple-choice',
      prompt: 'Which is the key difference between aggregation and composition?',
      choices: [
        { id: 'a', text: 'Aggregation uses inheritance' },
        { id: 'b', text: 'Composition creates its parts internally' },
        { id: 'c', text: 'Aggregation cannot use ArrayList' },
        { id: 'd', text: 'Composition uses interfaces' },
      ],
      correctAnswer: 'b',
      explanation: 'Composition creates parts with `new` inside the constructor; aggregation takes existing references.',
    },
    {
      id: 'q6-11',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create an Engine class whose constructor takes int horsepower and prints "Engine: " + horsepower.\nCreate a Car class (composition) whose constructor creates its own Engine with 300 hp.\nInstantiate a Car.\nExpected output:\nEngine: 300',
      starterCode: `public class Main {\n    static class Engine {\n        Engine(int hp) {\n            System.out.println("Engine: " + hp);\n        }\n    }\n\n    static class Car {\n        Engine engine;\n        // Create engine inside constructor\n    }\n\n    public static void main(String[] args) {\n        new Car();\n    }\n}`,
      expectedOutput: 'Engine: 300',
      correctAnswer: '__code__',
      explanation: 'Car() { engine = new Engine(300); } — the Engine is created inside the Car constructor, making it composition.',
    },
    {
      id: 'q6-12',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create a Person class with a String name field.\nCreate a Team class with an ArrayList<Person> field.\nAdd two Person objects ("Alice", "Bob") to the team and print each name.\nExpected output:\nAlice\nBob',
      starterCode: `import java.util.ArrayList;\n\npublic class Main {\n    static class Person {\n        String name;\n        Person(String n) { name = n; }\n    }\n\n    static class Team {\n        ArrayList<Person> members = new ArrayList<>();\n        void add(Person p) { members.add(p); }\n    }\n\n    public static void main(String[] args) {\n        Team t = new Team();\n        t.add(new Person("Alice"));\n        t.add(new Person("Bob"));\n        for (Person p : t.members) {\n            System.out.println(p.name);\n        }\n    }\n}`,
      expectedOutput: 'Alice\nBob',
      correctAnswer: '__code__',
      explanation: 'The Team aggregates Person objects passed in from outside — classic aggregation with ArrayList.',
    },
  ],
};

export default module6;
