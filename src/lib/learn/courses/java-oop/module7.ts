import type { Module } from './types';

const module7: Module = {
  id: 'module-7',
  slug: '7',
  title: 'Static & Dynamic Binding',
  description: 'Understand how Java decides which method to call at compile time vs at runtime.',
  icon: '⚡',
  color: 'from-yellow-500 to-amber-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-7-1',
      title: 'What is Binding?',
      content: `**Binding** is the process of connecting a method call to the actual method body that will execute. Java does this in two ways:

**Static Binding (Compile-time)**:
- Resolved by the compiler before the program runs
- Used for: variables/fields, private methods, static methods, final methods, overloaded methods
- Faster — no runtime lookup needed

**Dynamic Binding (Runtime)**:
- Resolved while the program is running
- Used for: overridden instance methods (the most common case in OOP)
- Enables polymorphism`,
      codeExamples: [
        {
          language: 'java',
          code: `class Animal {
    String name = "Animal";  // field
    public void speak() { System.out.println("..."); }          // overrideable → dynamic
    public static void breathe() { System.out.println("Breathing"); } // static → static binding
    private void secret() { System.out.println("secret"); }    // private → static binding
}

class Dog extends Animal {
    String name = "Dog";   // hides Animal.name — field access is static
    @Override
    public void speak() { System.out.println("Woof!"); }  // overrides → dynamic binding
}

Animal a = new Dog();
System.out.println(a.name);  // "Animal" — static binding on FIELD (declared type wins)
a.speak();                    // "Woof!" — dynamic binding on METHOD (actual type wins)`,
          caption: 'Static vs dynamic binding — fields use declared type, overridden methods use actual type',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-7-2',
      title: 'Type Safety and the Rules',
      content: `Java enforces type safety at compile time. When you use a variable of type \`T\`, Java guarantees it holds a \`T\` or a subclass of \`T\` — but you can only call methods declared in \`T\`.

Key rules:
- A variable of type \`T\` CAN hold a \`T\` or any subclass — (upcast is automatic)
- A variable of type \`T\` CANNOT be assigned a superclass reference — (downcast requires explicit cast)
- Field access always uses the **declared type** (static binding)
- Overridden method calls use the **actual type** (dynamic binding)`,
      codeExamples: [
        {
          language: 'java',
          code: `class Person {
    String name = "Person";
    public void greet() { System.out.println("Hello, I am a person"); }
}

class Chef extends Person {
    String name = "Chef";
    @Override
    public void greet() { System.out.println("Hello, I am a chef"); }
    public void cook() { System.out.println("Cooking!"); }
}

Person p = new Chef();  // OK: Chef IS-A Person (upcast)
p.greet();              // "Hello, I am a chef" — dynamic binding
System.out.println(p.name); // "Person" — static binding (declared type is Person)
// p.cook();           // COMPILE ERROR: cook() not in Person

Chef c = (Chef) p;      // explicit downcast — OK if actual type is Chef
c.cook();               // now we can call cook()`,
          caption: 'Type safety rules — upcast is automatic, downcast requires explicit cast',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-7-3',
      title: 'Final Methods and Field Hiding',
      content: `**final methods** — cannot be overridden. Java uses static binding for final methods. This gives a small performance benefit and prevents subclasses from changing the behavior.

**Field hiding** — when a subclass declares a field with the same name as the superclass, it *hides* the parent field. Use \`super.fieldName\` to access the parent's field.`,
      codeExamples: [
        {
          language: 'java',
          code: `class Vehicle {
    String type = "Vehicle";

    public final void identify() {
        System.out.println("I am a: " + type);
    }

    public String getType() { return type; }
}

class Truck extends Vehicle {
    String type = "Truck";  // hides Vehicle.type

    // public void identify() { }  // COMPILE ERROR — cannot override final

    @Override
    public String getType() { return type; }  // dynamic binding: returns "Truck"

    public void showBoth() {
        System.out.println("My type: " + type);           // "Truck"
        System.out.println("Parent type: " + super.type); // "Vehicle"
    }
}

Truck t = new Truck();
t.identify();            // "I am a: Vehicle" — final method, static binding on field
System.out.println(t.getType()); // "Truck" — dynamic binding
t.showBoth();`,
          caption: 'final methods use static binding; super.fieldName accesses the hidden parent field',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q7-1',
      type: 'multiple-choice',
      prompt: 'Which type of binding is used for overridden instance methods?',
      choices: [
        { id: 'a', text: 'Static' },
        { id: 'b', text: 'Dynamic' },
        { id: 'c', text: 'Final' },
        { id: 'd', text: 'Compile-time' },
      ],
      correctAnswer: 'b',
      explanation: 'Overridden methods use dynamic binding — the JVM resolves which version to call at runtime based on the actual object type.',
    },
    {
      id: 'q7-2',
      type: 'true-false',
      prompt: 'Field access in Java uses dynamic binding.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'Fields always use static (compile-time) binding based on the declared type, not the actual type.',
    },
    {
      id: 'q7-3',
      type: 'multiple-choice',
      prompt: 'Given `Animal a = new Dog();` where Dog overrides speak(), what does `a.speak()` call?',
      choices: [
        { id: 'a', text: 'Animal.speak()' },
        { id: 'b', text: 'Dog.speak()' },
        { id: 'c', text: 'Compile error' },
        { id: 'd', text: 'Runtime error' },
      ],
      correctAnswer: 'b',
      explanation: 'speak() is an overridden instance method, so dynamic binding kicks in and calls Dog.speak().',
    },
    {
      id: 'q7-4',
      type: 'multiple-choice',
      prompt: 'Given `Animal a = new Dog();` where both have a field `name`, what does `a.name` return?',
      choices: [
        { id: 'a', text: "Dog's name" },
        { id: 'b', text: "Animal's name" },
        { id: 'c', text: 'null' },
        { id: 'd', text: 'Compile error' },
      ],
      correctAnswer: 'b',
      explanation: 'Field access uses static binding based on the declared type (Animal), so Animal\'s name field is accessed.',
    },
    {
      id: 'q7-5',
      type: 'true-false',
      prompt: 'A variable of type Person can hold a reference to a Chef object if Chef extends Person.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'A subclass IS-A superclass, so upcasting is automatic and safe in Java.',
    },
    {
      id: 'q7-6',
      type: 'multiple-choice',
      prompt: 'What keyword prevents a method from being overridden?',
      choices: [
        { id: 'a', text: 'static' },
        { id: 'b', text: 'private' },
        { id: 'c', text: 'final' },
        { id: 'd', text: 'abstract' },
      ],
      correctAnswer: 'c',
      explanation: 'The `final` keyword prevents overriding. Java uses static binding for final methods.',
    },
    {
      id: 'q7-7',
      type: 'fill-in-blank',
      prompt: 'To access a hidden parent field from a subclass, use the keyword ______.',
      correctAnswer: 'super',
      explanation: '`super.fieldName` accesses the parent class\'s version of a field that has been hidden by the subclass.',
    },
    {
      id: 'q7-8',
      type: 'multiple-choice',
      prompt: 'Which of these uses static binding?',
      choices: [
        { id: 'a', text: 'Overridden instance methods' },
        { id: 'b', text: 'final methods' },
        { id: 'c', text: 'interface default methods' },
        { id: 'd', text: 'abstract method calls' },
      ],
      correctAnswer: 'b',
      explanation: 'final methods cannot be overridden so the compiler binds them at compile time (static binding).',
    },
    {
      id: 'q7-9',
      type: 'true-false',
      prompt: 'You can call a subclass-specific method through a superclass reference without casting.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'The compiler only knows the declared type. To call a method not in the superclass, you must explicitly downcast.',
    },
    {
      id: 'q7-10',
      type: 'multiple-choice',
      prompt: 'What happens when you try to override a final method?',
      choices: [
        { id: 'a', text: 'Runtime exception' },
        { id: 'b', text: 'Compile error' },
        { id: 'c', text: 'The override silently fails' },
        { id: 'd', text: 'Works normally' },
      ],
      correctAnswer: 'b',
      explanation: 'The compiler rejects any attempt to override a final method — it is a compile-time error.',
    },
    {
      id: 'q7-11',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Demonstrate static vs dynamic binding:\n- Parent has a field name="Parent" and method greet() prints "Hello from Parent".\n- Child extends Parent, hides name="Child", overrides greet() to print "Hello from Child".\n- Declare: Parent p = new Child();\n- Print p.name (static binding on field) then call p.greet() (dynamic binding on method).\nExpected output:\nParent\nHello from Child',
      starterCode: `public class Main {\n    static class Parent {\n        String name = "Parent";\n        public void greet() { System.out.println("Hello from Parent"); }\n    }\n\n    static class Child extends Parent {\n        String name = "Child";\n        // Override greet()\n    }\n\n    public static void main(String[] args) {\n        Parent p = new Child();\n        System.out.println(p.name);\n        p.greet();\n    }\n}`,
      expectedOutput: 'Parent\nHello from Child',
      correctAnswer: '__code__',
      explanation: 'p.name uses the declared type (Parent) — static binding. p.greet() uses the actual type (Child) — dynamic binding.',
    },
    {
      id: 'q7-12',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create a Base class with a final method describe() that prints "I am Base".\nCreate a Sub class that extends Base (do NOT override describe()).\nCall describe() on a Sub instance.\nExpected output:\nI am Base',
      starterCode: `public class Main {\n    static class Base {\n        public final void describe() {\n            System.out.println("I am Base");\n        }\n    }\n\n    static class Sub extends Base {\n        // Do not override describe()\n    }\n\n    public static void main(String[] args) {\n        Sub s = new Sub();\n        s.describe();\n    }\n}`,
      expectedOutput: 'I am Base',
      correctAnswer: '__code__',
      explanation: 'final methods are statically bound — Sub inherits describe() but cannot override it. The Base version always runs.',
    },
  ],
};

export default module7;
