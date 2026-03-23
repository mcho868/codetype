import type { Module } from './types';

const module8: Module = {
  id: 'module-8',
  slug: '8',
  title: 'Nested Classes',
  description: 'Define classes inside other classes: static nested, inner member, and anonymous classes.',
  icon: '📦',
  color: 'from-teal-500 to-cyan-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-8-1',
      title: 'Static Nested Classes',
      content: `A **nested class** is a class defined inside another class. There are several kinds; the simplest is the **static nested class**.

A static nested class:
- Is declared with \`static\` inside the outer class
- Can access the outer class's **static** members only
- Does NOT need an instance of the outer class to be created
- Is accessed as \`OuterClass.NestedClass\`

Why use them? To group helper classes that only make sense in the context of one other class.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Outer {
    private static int count = 0;
    private int instanceVal = 42;

    public static class Counter {
        public void increment() {
            count++;  // OK: count is static
            // instanceVal++;  // ERROR: cannot access instance field
        }
        public int getCount() { return count; }
    }

    public static void main(String[] args) {
        // No Outer instance needed:
        Outer.Counter c = new Outer.Counter();
        c.increment();
        c.increment();
        System.out.println("Count: " + c.getCount());  // 2
    }
}`,
          caption: 'Static nested class — created without an Outer instance, can only access static members',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-8-2',
      title: 'Inner (Non-Static) Classes',
      content: `A **member inner class** (non-static nested class) is associated with an instance of the outer class. It can access ALL members of the outer class — including private fields and methods.

Rules:
- Must have an outer class instance to create an inner class instance
- Syntax to create from outside: \`Outer outer = new Outer(); Outer.Inner inner = outer.new Inner();\`
- From inside the outer class, just use \`new Inner()\``,
      codeExamples: [
        {
          language: 'java',
          code: `public class BankAccount {
    private String owner;
    private double balance;

    public BankAccount(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }

    // Inner class can see private members
    public class Transaction {
        private String type;
        private double amount;

        public Transaction(String type, double amount) {
            this.type = type;
            this.amount = amount;
        }

        public void apply() {
            if (type.equals("deposit")) {
                balance += amount;  // accesses outer private field!
            } else {
                balance -= amount;
            }
            System.out.println(owner + "'s balance: " + balance);
        }
    }

    public void makeDeposit(double amount) {
        Transaction t = new Transaction("deposit", amount);
        t.apply();
    }
}

BankAccount account = new BankAccount("Alice", 1000);
account.makeDeposit(500);
// Output: Alice's balance: 1500.0

// Can also create Transaction from outside:
BankAccount.Transaction t = account.new Transaction("withdraw", 200);
t.apply();
// Output: Alice's balance: 1300.0`,
          caption: 'Non-static inner class — Transaction accesses BankAccount\'s private fields directly',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-8-3',
      title: 'Anonymous Classes',
      content: `An **anonymous class** is a one-time class with no name, defined and instantiated at the same point. It's typically used to implement an interface or extend a class inline, without creating a full named class.

Syntax: \`new InterfaceName() { /* body */ }\`

Anonymous classes are common in event listeners and callbacks. Java 8+ replaced many with lambda expressions, but anonymous classes are still important to understand.`,
      codeExamples: [
        {
          language: 'java',
          code: `interface Greeter {
    void greet(String name);
}

public class Main {
    public static void main(String[] args) {
        // Anonymous class implementing Greeter:
        Greeter formal = new Greeter() {
            @Override
            public void greet(String name) {
                System.out.println("Good day, " + name + ".");
            }
        };

        Greeter casual = new Greeter() {
            @Override
            public void greet(String name) {
                System.out.println("Hey " + name + "!");
            }
        };

        formal.greet("Alice");  // "Good day, Alice."
        casual.greet("Bob");    // "Hey Bob!"
    }
}`,
          caption: 'Anonymous classes implementing Greeter — each provides a different one-time implementation',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q8-1',
      type: 'multiple-choice',
      prompt: 'What makes a static nested class different from a regular inner class?',
      choices: [
        { id: 'a', text: 'It can override methods' },
        { id: 'b', text: 'It does not need an outer class instance' },
        { id: 'c', text: 'It has no methods' },
        { id: 'd', text: 'It cannot access outer members' },
      ],
      correctAnswer: 'b',
      explanation: 'A static nested class is independent of any outer class instance; you create it without creating an Outer object.',
    },
    {
      id: 'q8-2',
      type: 'true-false',
      prompt: 'A non-static inner class can access private fields of its outer class.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'Inner (non-static) classes have full access to all members of the enclosing outer class, including private fields.',
    },
    {
      id: 'q8-3',
      type: 'multiple-choice',
      prompt: 'How do you access a static nested class named Inner inside Outer?',
      choices: [
        { id: 'a', text: 'new Inner()' },
        { id: 'b', text: 'Outer.inner()' },
        { id: 'c', text: 'new Outer.Inner()' },
        { id: 'd', text: 'Outer::Inner' },
      ],
      correctAnswer: 'c',
      explanation: 'Static nested classes are accessed as Outer.Inner; you create them with `new Outer.Inner()`.',
    },
    {
      id: 'q8-4',
      type: 'fill-in-blank',
      prompt: 'An anonymous class is defined and ______ at the same point in code.',
      correctAnswer: 'instantiated',
      explanation: 'Anonymous classes have no name and are created with `new InterfaceName() { ... }` in one expression.',
    },
    {
      id: 'q8-5',
      type: 'multiple-choice',
      prompt: 'Which of these can a static nested class NOT access?',
      choices: [
        { id: 'a', text: 'Outer static fields' },
        { id: 'b', text: 'Outer static methods' },
        { id: 'c', text: 'Outer instance fields' },
        { id: 'd', text: 'Other nested classes' },
      ],
      correctAnswer: 'c',
      explanation: 'Static nested classes can only access static members of the outer class, not instance fields.',
    },
    {
      id: 'q8-6',
      type: 'true-false',
      prompt: 'To create an instance of a non-static inner class from outside, you need an existing instance of the outer class.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'Syntax is `outerObj.new Inner()` — the inner class is tied to a specific outer instance.',
    },
    {
      id: 'q8-7',
      type: 'multiple-choice',
      prompt: 'Anonymous classes are most commonly used to:',
      choices: [
        { id: 'a', text: 'Define long reusable utilities' },
        { id: 'b', text: 'Implement interfaces or extend classes inline' },
        { id: 'c', text: 'Replace constructors' },
        { id: 'd', text: 'Create static fields' },
      ],
      correctAnswer: 'b',
      explanation: 'Anonymous classes implement an interface or extend a class on the spot for a one-time use case.',
    },
    {
      id: 'q8-8',
      type: 'multiple-choice',
      prompt: 'Where is a local class defined?',
      choices: [
        { id: 'a', text: 'At the top of a file' },
        { id: 'b', text: 'Inside an interface' },
        { id: 'c', text: 'Inside a method body' },
        { id: 'd', text: 'As a static member' },
      ],
      correctAnswer: 'c',
      explanation: 'Local classes are defined inside a method and only visible within that method.',
    },
    {
      id: 'q8-9',
      type: 'true-false',
      prompt: 'Java 8 lambda expressions can replace some uses of anonymous classes that implement interfaces with a single method.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'When an interface has exactly one abstract method (functional interface), a lambda can replace an anonymous class more concisely.',
    },
    {
      id: 'q8-10',
      type: 'multiple-choice',
      prompt: 'Which nested class type is most appropriate for a helper that only uses static data from its enclosing class?',
      choices: [
        { id: 'a', text: 'Anonymous class' },
        { id: 'b', text: 'Local class' },
        { id: 'c', text: 'Static nested class' },
        { id: 'd', text: 'Non-static inner class' },
      ],
      correctAnswer: 'c',
      explanation: 'If the helper only needs static data, a static nested class is the right choice — it\'s simpler because it doesn\'t need an outer instance.',
    },
    {
      id: 'q8-11',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create a Wallet class with a private double balance field.\nAdd an inner class Receipt that has a method printBalance() — it should print "Balance: " + balance (accessing the outer private field).\nIn main, create a Wallet with balance 250.0, then create a Receipt and call printBalance().\nExpected output:\nBalance: 250.0',
      starterCode: `public class Main {\n    static class Wallet {\n        private double balance;\n        Wallet(double b) { balance = b; }\n\n        class Receipt {\n            // Add printBalance() accessing outer balance\n        }\n    }\n\n    public static void main(String[] args) {\n        Wallet w = new Wallet(250.0);\n        Wallet.Receipt r = w.new Receipt();\n        r.printBalance();\n    }\n}`,
      expectedOutput: 'Balance: 250.0',
      correctAnswer: '__code__',
      explanation: 'public void printBalance() { System.out.println("Balance: " + balance); } — inner classes access outer private fields directly.',
    },
    {
      id: 'q8-12',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create an interface Printer with a method print(String msg).\nIn main, use an anonymous class to implement Printer so that print() outputs the msg in uppercase.\nCall print("hello") on it.\nExpected output:\nHELLO',
      starterCode: `public class Main {\n    interface Printer {\n        void print(String msg);\n    }\n\n    public static void main(String[] args) {\n        Printer p = new Printer() {\n            // Implement print()\n        };\n        p.print("hello");\n    }\n}`,
      expectedOutput: 'HELLO',
      correctAnswer: '__code__',
      explanation: '@Override public void print(String msg) { System.out.println(msg.toUpperCase()); } — anonymous class implements Printer inline.',
    },
  ],
};

export default module8;
