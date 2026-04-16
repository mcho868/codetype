import type { Module } from '../python101/types';

const module5: Module = {
  id: 'ts-module-5',
  slug: '5',
  title: 'Classes',
  description: 'Build type-safe classes with access modifiers, readonly fields, inheritance, and abstract classes.',
  icon: '🏗️',
  color: 'from-cyan-500 to-sky-400',
  locked: false,
  lessons: [
    {
      id: 'ts-lesson-5-1',
      title: 'Class Members & Access Modifiers',
      content: `TypeScript classes build on JavaScript classes with **typed members** and **access modifiers**.

Access modifiers control visibility:
- **public** — accessible from anywhere (the default)
- **private** — only accessible inside the class
- **protected** — accessible inside the class and its subclasses

TypeScript also adds a **readonly** modifier — the property can be read but never reassigned after initialization.

All class members (properties and methods) are typed, and TypeScript will error if you access a property that doesn't exist on the type.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `class Person {
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}

const p = new Person("Jane");
console.log(p.getName()); // "Jane"
// console.log(p.name);   // Error: property 'name' is private`,
          caption: 'Private members and public methods',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Parameter shorthand — declare and assign in the constructor
class Person {
  public constructor(private name: string) {}

  public getName(): string {
    return this.name;
  }
}

// Readonly — can be set in constructor, never changed after
class Car {
  public readonly make: string;

  constructor(make: string) {
    this.make = make;
  }
}

const car = new Car("Toyota");
// car.make = "Ford"; // Error: Cannot assign to 'make' because it is a read-only property`,
          caption: 'Constructor shorthand and readonly properties',
        },
      ],
    },
    {
      id: 'ts-lesson-5-2',
      title: 'Inheritance & Interfaces in Classes',
      content: `TypeScript classes support **inheritance** with \`extends\` — a subclass inherits all members of its parent.

A class can also **implement** one or more interfaces, promising to provide the required properties and methods.

Key rules:
- Use **super()** to call the parent constructor
- Override methods by redefining them in the subclass
- A class can only extend one class, but can implement multiple interfaces`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `class Animal {
  constructor(public name: string) {}

  speak(): string {
    return \`\${this.name} makes a sound.\`;
  }
}

class Dog extends Animal {
  speak(): string {
    return \`\${this.name} barks.\`;
  }
}

const d = new Dog("Rex");
console.log(d.speak()); // "Rex barks."`,
          caption: 'Class inheritance with method override',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Implementing an interface
interface Printable {
  print(): void;
}

class Document implements Printable {
  constructor(private title: string) {}

  print(): void {
    console.log(\`Printing: \${this.title}\`);
  }
}

// A class can implement multiple interfaces
interface Saveable {
  save(): void;
}

class Report implements Printable, Saveable {
  print(): void { console.log("Print report"); }
  save(): void  { console.log("Save report"); }
}`,
          caption: 'Implementing interfaces — fulfilling a contract',
        },
      ],
    },
    {
      id: 'ts-lesson-5-3',
      title: 'Abstract Classes',
      content: `An **abstract class** is a base class that cannot be instantiated directly — it's meant to be extended.

Abstract methods are declared without a body, and every subclass must implement them.

This is useful when you want to define a template for a group of related classes — enforcing that all subclasses implement certain methods while sharing common logic.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `abstract class Shape {
  abstract getArea(): number; // subclasses must implement this

  describe(): string {
    return \`I am a shape with area \${this.getArea()}\`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) { super(); }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

const c = new Circle(5);
console.log(c.describe()); // "I am a shape with area 78.53..."

// new Shape(); // Error: Cannot create an instance of an abstract class`,
          caption: 'Abstract class with concrete and abstract methods',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'ts-q5-1',
      type: 'multiple-choice',
      prompt: 'Which access modifier makes a class member only accessible within the class itself?',
      choices: [
        { id: 'a', text: 'public' },
        { id: 'b', text: 'protected' },
        { id: 'c', text: 'private' },
        { id: 'd', text: 'readonly' },
      ],
      correctAnswer: 'c',
      explanation: 'private members are only accessible inside the class. protected extends that to subclasses as well.',
    },
    {
      id: 'ts-q5-2',
      type: 'true-false',
      prompt: 'A readonly class property can be reassigned freely after construction.',
      correctAnswer: 'false',
      explanation: 'readonly properties can only be set in the constructor. Attempting to reassign them elsewhere is a TypeScript error.',
    },
    {
      id: 'ts-q5-3',
      type: 'multiple-choice',
      prompt: 'What does "constructor parameter shorthand" mean in TypeScript?',
      choices: [
        { id: 'a', text: 'Calling super() with fewer arguments' },
        { id: 'b', text: 'Declaring a class property by adding an access modifier to the constructor parameter' },
        { id: 'c', text: 'Using optional parameters in the constructor' },
        { id: 'd', text: 'A shorter way to write the class keyword' },
      ],
      correctAnswer: 'b',
      explanation: 'Writing constructor(private name: string) automatically declares and assigns a private name property — no separate property declaration needed.',
    },
    {
      id: 'ts-q5-4',
      type: 'multiple-choice',
      prompt: 'A class that implements an interface must:',
      choices: [
        { id: 'a', text: 'Extend the interface with the extends keyword' },
        { id: 'b', text: 'Provide all the properties and methods declared in the interface' },
        { id: 'c', text: 'Only implement the methods, not the properties' },
        { id: 'd', text: 'Be abstract' },
      ],
      correctAnswer: 'b',
      explanation: 'Implementing an interface is a contract — the class must provide all members (properties and methods) declared in the interface.',
    },
    {
      id: 'ts-q5-5',
      type: 'true-false',
      prompt: 'A TypeScript class can extend multiple parent classes at once.',
      correctAnswer: 'false',
      explanation: 'TypeScript (like JavaScript) only supports single inheritance — a class can only extend one class. However, it can implement multiple interfaces.',
    },
    {
      id: 'ts-q5-6',
      type: 'multiple-choice',
      prompt: 'What is an abstract class?',
      choices: [
        { id: 'a', text: 'A class with no properties' },
        { id: 'b', text: 'A class that cannot be instantiated directly and is meant to be extended' },
        { id: 'c', text: 'A class where all methods are private' },
        { id: 'd', text: 'A class that implements an interface' },
      ],
      correctAnswer: 'b',
      explanation: 'Abstract classes cannot be instantiated with new. They define a base template, and subclasses must implement any abstract methods.',
    },
    {
      id: 'ts-q5-7',
      type: 'multiple-choice',
      prompt: 'Which access modifier allows access from the class itself AND its subclasses?',
      choices: [
        { id: 'a', text: 'private' },
        { id: 'b', text: 'public' },
        { id: 'c', text: 'protected' },
        { id: 'd', text: 'internal' },
      ],
      correctAnswer: 'c',
      explanation: 'protected is accessible inside the class and in any class that extends it. private is only accessible in the defining class itself.',
    },
    {
      id: 'ts-q5-8',
      type: 'fill-in-blank',
      prompt: 'Complete: A subclass calls the parent constructor with _____().',
      correctAnswer: 'super',
      explanation: 'super() must be called in the subclass constructor before accessing this, to run the parent class\'s initialization logic.',
    },
    {
      id: 'ts-q5-code-1',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Define a class `Rectangle` with `public width: number` and `public height: number` properties set in the constructor. Add an `area(): number` method that returns `width * height`. Create a rectangle with width `5` and height `4` and print the area.\n\nExpected output:\n```\n20\n```',
      starterCode: `// Define Rectangle class with typed properties and area()\n`,
      expectedOutput: '20',
      correctAnswer: '__code__',
      explanation: 'class Rectangle { public width: number; public height: number; constructor(w: number, h: number) { this.width = w; this.height = h; } area(): number { return this.width * this.height; } }',
      requiredPatterns: [
        { pattern: 'class\\s+Rectangle', hint: 'Define a class named Rectangle.' },
        { pattern: 'area\\(\\)', hint: 'Add an area() method to the class.' },
      ],
    },
    {
      id: 'ts-q5-code-2',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Define a class `Animal` with a `private name: string` property set in the constructor. Add a `getName(): string` method that returns the name. Create an `Animal` with name `"Lion"` and print it via `getName()`.\n\nExpected output:\n```\nLion\n```',
      starterCode: `// Define Animal with a private name property and public getter\n`,
      expectedOutput: 'Lion',
      correctAnswer: '__code__',
      explanation: 'class Animal { private name: string; constructor(name: string) { this.name = name; } getName(): string { return this.name; } } const a = new Animal("Lion"); console.log(a.getName());',
      requiredPatterns: [
        { pattern: 'private', hint: 'Mark the name property as private in the class body.' },
        { pattern: 'getName', hint: 'Add a getName() method to expose the private field.' },
      ],
    },
    {
      id: 'ts-q5-code-3',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Define a class `Vehicle` with a `public make: string` property. Define a class `Car` that extends `Vehicle` and adds a `public model: string` property. Assign both in their constructors — `Car` must call `super(make)`. Create a `Car` with make `"Toyota"` and model `"Camry"`. Print make and model on separate lines.\n\nExpected output:\n```\nToyota\nCamry\n```',
      starterCode: `// Define Vehicle, then Car extends Vehicle\n`,
      expectedOutput: 'Toyota\nCamry',
      correctAnswer: '__code__',
      explanation: 'class Vehicle { public make: string; constructor(make: string) { this.make = make; } } class Car extends Vehicle { public model: string; constructor(make: string, model: string) { super(make); this.model = model; } }',
      requiredPatterns: [
        { pattern: 'extends\\s+Vehicle', hint: 'Use extends Vehicle in the Car class definition.' },
        { pattern: 'super\\(', hint: 'Call super(make) in Car\'s constructor.' },
      ],
    },
    {
      id: 'ts-q5-code-4',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Define an interface `Describable` with a method `describe(): string`. Define a class `Book` that implements `Describable`. Give `Book` a `public title: string` property set in the constructor. The `describe()` method should return `` `Book: ${this.title}` ``. Create a book titled `"TypeScript Deep Dive"` and print its description.\n\nExpected output:\n```\nBook: TypeScript Deep Dive\n```',
      starterCode: `// Define interface Describable, then class Book implements it\n`,
      expectedOutput: 'Book: TypeScript Deep Dive',
      correctAnswer: '__code__',
      explanation: 'interface Describable { describe(): string } class Book implements Describable { public title: string; constructor(title: string) { this.title = title; } describe(): string { return `Book: ${this.title}`; } }',
      requiredPatterns: [
        { pattern: 'interface\\s+Describable', hint: 'Define the Describable interface first.' },
        { pattern: 'implements\\s+Describable', hint: 'Use implements Describable in the Book class.' },
      ],
    },
  ],
};

export default module5;
