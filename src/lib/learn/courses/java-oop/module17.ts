import type { Module } from './types';

const module17: Module = {
  id: 'module-17',
  slug: '17',
  title: 'ISP, DIP, Code Smells & TDD',
  description: 'Complete SOLID with ISP and DIP, recognize and eliminate common code smells, and practice Test-Driven Development.',
  icon: '🧪',
  color: 'from-red-500 to-orange-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-17-1',
      title: 'Interface Segregation & Dependency Inversion',
      content: `**ISP — Interface Segregation Principle**: "Clients should not be forced to depend on methods they do not use."

A fat interface forces implementing classes to provide methods they don't need. Split fat interfaces into smaller, focused ones.

**Example:** A \`Worker\` interface with \`work()\` and \`eat()\` breaks ISP — robots can work but can't eat. Split into \`Workable\` (work()) and \`Feedable\` (eat()). Humans implement both; robots implement only Workable.

---

**DIP — Dependency Inversion Principle**: "High-level modules should not depend on low-level modules. Both should depend on abstractions."

Two rules:
1. High-level modules should not depend on low-level modules — both should depend on abstractions (interfaces).
2. Abstractions should not depend on details — details should depend on abstractions.

**Without DIP:** \`OrderService\` directly creates \`new EmailNotifier()\`. To switch to SMS, you must modify OrderService.

**With DIP:** \`OrderService\` depends on a \`Notifier\` interface. Inject \`EmailNotifier\` or \`SMSNotifier\` from outside. OrderService never changes.

This is the foundation of **Dependency Injection** (DI) frameworks like Spring.`,
      codeExamples: [
        {
          language: 'java',
          code: `// ISP — VIOLATION: fat Worker interface
public interface Worker {
    void work();
    void eat();  // Robots can't eat — forced to implement something meaningless
}

public class Robot implements Worker {
    public void work() { System.out.println("Robot working"); }
    public void eat()  { throw new UnsupportedOperationException("Robots don't eat"); }
}

// ISP — FIXED: segregated interfaces
public interface Workable { void work(); }
public interface Feedable  { void eat(); }

public class HumanWorker implements Workable, Feedable {
    public void work() { System.out.println("Human working"); }
    public void eat()  { System.out.println("Human eating"); }
}

public class RobotWorker implements Workable {
    public void work() { System.out.println("Robot working"); }
}

// DIP — VIOLATION: OrderService depends on concrete EmailNotifier
public class OrderService {
    private EmailNotifier notifier = new EmailNotifier();  // hard dependency
    public void placeOrder(String item) { notifier.send("Order placed: " + item); }
}

// DIP — FIXED: depend on abstraction
public interface Notifier { void send(String message); }

public class EmailNotifier implements Notifier {
    public void send(String message) { System.out.println("Email: " + message); }
}

public class SMSNotifier implements Notifier {
    public void send(String message) { System.out.println("SMS: " + message); }
}

public class OrderService {
    private Notifier notifier;
    public OrderService(Notifier notifier) { this.notifier = notifier; }  // injected
    public void placeOrder(String item) { notifier.send("Order placed: " + item); }
}

public class Main {
    public static void main(String[] args) {
        OrderService service = new OrderService(new EmailNotifier());
        service.placeOrder("Laptop");
        // Switch to SMS — OrderService unchanged:
        service = new OrderService(new SMSNotifier());
        service.placeOrder("Phone");
    }
}`,
          caption: 'ISP: split fat interfaces. DIP: inject the Notifier abstraction — swapping EmailNotifier for SMSNotifier requires zero changes to OrderService.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-17-2',
      title: 'Code Smells',
      content: `**Code smells** are symptoms of poor design — they don't break your code immediately, but they make it harder to change, test, and understand.

**Common smells and their fixes:**

| Smell | Description | Fix |
|---|---|---|
| **Long Method** | Method does too much; hard to read | Extract Method — split into smaller focused methods |
| **Large Class** | Class has too many fields/methods | Extract Class — apply SRP |
| **Long Parameter List** | 4+ parameters is hard to read and change | Introduce Parameter Object — group related params into a class |
| **Duplicated Code** | Same logic copy-pasted in multiple places | Extract Method or Extract Superclass |
| **Data Class** | Class with only fields and getters/setters, no behavior | Move the behavior that uses the data into the class |
| **Comments as Deodorant** | Comments explain what bad code does instead of fixing it | Rename the method/variable so it's self-explanatory |

**The "Comments as Deodorant" rule:** If you write a comment explaining what a piece of code does, that's a sign the code itself should be refactored. Good names make comments unnecessary.

**Refactoring** is the process of restructuring code without changing its external behavior — improving the design after the fact.`,
      codeExamples: [
        {
          language: 'java',
          code: `// SMELL 1: Long Method — hard to understand and test
public void processOrder(Order order) {
    // validate
    if (order.getItems().isEmpty()) throw new IllegalArgumentException("Empty order");
    if (order.getCustomer() == null) throw new IllegalArgumentException("No customer");
    // calculate total
    double total = 0;
    for (Item item : order.getItems()) total += item.getPrice() * item.getQuantity();
    if (order.getCustomer().isPremium()) total *= 0.9;
    // save to db
    Database.save(order, total);
    // send confirmation
    Emailer.send(order.getCustomer().getEmail(), "Your order total: $" + total);
}

// FIXED: Extract Method — each step is now named and testable
public void processOrder(Order order) {
    validateOrder(order);
    double total = calculateTotal(order);
    saveOrder(order, total);
    sendConfirmation(order, total);
}

// SMELL 2: Long Parameter List
public void createUser(String firstName, String lastName, String email,
                        String phone, String address, int age) { ... }

// FIXED: Parameter Object
public class UserDetails {
    String firstName, lastName, email, phone, address;
    int age;
}
public void createUser(UserDetails details) { ... }

// SMELL 3: Comments as Deodorant
// check if user can get discount (age > 65 or is premium member)
if (u.getAge() > 65 || u.isPremium()) { ... }

// FIXED: self-documenting name
if (isEligibleForDiscount(u)) { ... }
private boolean isEligibleForDiscount(User u) {
    return u.getAge() > 65 || u.isPremium();
}`,
          caption: 'Extract Method turns Long Methods readable. Parameter Object tames Long Parameter Lists. Good naming eliminates the need for comments.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-17-3',
      title: 'Test-Driven Development (TDD)',
      content: `**TDD** flips the normal development order: write the **test first**, then write the code to make it pass.

**The Red-Green-Refactor cycle:**
1. **Red** — write a failing test for the next small piece of functionality
2. **Green** — write the minimal code to make the test pass (no more, no less)
3. **Refactor** — clean up the code while keeping tests passing

**Why TDD?**
- Forces you to think about the API before the implementation
- Tests serve as living documentation
- Small iterations keep bugs local and easy to find
- Builds confidence to refactor (tests catch regressions)
- Naturally produces loosely-coupled code (hard-to-test code is usually badly designed)

**In Java, JUnit is the standard testing framework:**
\`\`\`java
@Test
public void testAdd() {
    Calculator calc = new Calculator();
    assertEquals(5, calc.add(2, 3));
}
\`\`\`

**In our runner**, since we don't have JUnit, we simulate TDD by using assertions that print PASS/FAIL or throw exceptions to signal test failures. The principle is identical.`,
      codeExamples: [
        {
          language: 'java',
          code: `// TDD Example: Building a Calculator step by step

// Step 1 — RED: write the test first (this won't compile yet)
// assertEquals(5, calculator.add(2, 3));
// assertEquals(0, calculator.subtract(5, 5));

// Step 2 — GREEN: write minimal code to pass
public class Calculator {
    public int add(int a, int b)      { return a + b; }
    public int subtract(int a, int b) { return a - b; }
    public int multiply(int a, int b) { return a * b; }
    public double divide(int a, int b) {
        if (b == 0) throw new ArithmeticException("Division by zero");
        return (double) a / b;
    }
}

// Step 3 — Simulate tests (in real Java: JUnit @Test methods)
public class Main {
    static int passed = 0;
    static int failed = 0;

    static void assertEquals(Object expected, Object actual, String testName) {
        if (expected.equals(actual)) {
            System.out.println("PASS: " + testName);
            passed++;
        } else {
            System.out.println("FAIL: " + testName + " (expected " + expected + ", got " + actual + ")");
            failed++;
        }
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        assertEquals(5,    calc.add(2, 3),        "add(2,3) == 5");
        assertEquals(0,    calc.subtract(5, 5),   "subtract(5,5) == 0");
        assertEquals(12,   calc.multiply(3, 4),   "multiply(3,4) == 12");
        assertEquals(2.5,  calc.divide(5, 2),      "divide(5,2) == 2.5");
        System.out.println(passed + " passed, " + failed + " failed.");
    }
}`,
          caption: 'TDD in practice: write the test that describes what you want, then implement just enough code to pass. Refactor only when green.',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q17-1',
      type: 'multiple-choice',
      prompt: 'The Interface Segregation Principle says clients should not be forced to depend on:',
      choices: [
        { id: 'a', text: 'Abstract classes' },
        { id: 'b', text: 'Methods they do not use' },
        { id: 'c', text: 'Concrete implementations' },
        { id: 'd', text: 'Public fields' },
      ],
      correctAnswer: 'b',
      explanation: 'ISP: fat interfaces force implementing classes to provide methods they have no use for (like a Robot being forced to implement eat()). Split interfaces into small, focused ones.',
    },
    {
      id: 'q17-2',
      type: 'true-false',
      prompt: 'The Dependency Inversion Principle says high-level modules should depend directly on low-level modules for efficiency.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'DIP says the opposite: high-level modules should NOT depend on low-level modules. Both should depend on abstractions (interfaces). This allows low-level implementations to change without affecting high-level policy.',
    },
    {
      id: 'q17-3',
      type: 'fill-in-blank',
      prompt: 'In TDD, the three-step cycle is: Red, _______, Refactor.',
      correctAnswer: 'Green',
      explanation: 'Red (write a failing test), Green (write minimal code to pass), Refactor (clean up while keeping tests green). This cycle drives incremental, well-tested development.',
    },
    {
      id: 'q17-4',
      type: 'multiple-choice',
      prompt: 'Which code smell describes a class with only fields and getters/setters but no behavior?',
      choices: [
        { id: 'a', text: 'Long Method' },
        { id: 'b', text: 'Large Class' },
        { id: 'c', text: 'Data Class' },
        { id: 'd', text: 'Long Parameter List' },
      ],
      correctAnswer: 'c',
      explanation: 'Data Class: a class that holds data but has no methods that operate on that data. The fix is to move the behavior that uses the data into the class itself — making it a proper object.',
    },
    {
      id: 'q17-5',
      type: 'true-false',
      prompt: 'In TDD, you write the implementation code before writing the test.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'TDD requires the test to be written first (Red phase). This forces you to think about the desired API and behavior before implementation, and ensures every line of code has a test.',
    },
    {
      id: 'q17-6',
      type: 'multiple-choice',
      prompt: 'What is "Comments as Deodorant"?',
      choices: [
        { id: 'a', text: 'Using comments to explain a complex algorithm' },
        { id: 'b', text: 'Writing comments that describe what bad code does instead of refactoring the code' },
        { id: 'c', text: 'Removing all comments from clean code' },
        { id: 'd', text: 'Adding TODO comments for future work' },
      ],
      correctAnswer: 'b',
      explanation: 'Comments as Deodorant: comments mask bad code smells instead of eliminating them. If you need a comment to explain what code does, the fix is to rename things or extract methods so the code speaks for itself.',
    },
    {
      id: 'q17-7',
      type: 'fill-in-blank',
      prompt: 'Dependency Inversion is achieved by injecting a _______ rather than instantiating a concrete class directly.',
      correctAnswer: 'abstraction',
      explanation: 'DIP: instead of new EmailNotifier() inside OrderService, inject a Notifier interface. The concrete class (EmailNotifier or SMSNotifier) is decided by the caller — the high-level module depends only on the abstraction.',
    },
    {
      id: 'q17-8',
      type: 'multiple-choice',
      prompt: 'Which refactoring technique fixes the Long Parameter List code smell?',
      choices: [
        { id: 'a', text: 'Extract Method' },
        { id: 'b', text: 'Introduce Parameter Object' },
        { id: 'c', text: 'Extract Superclass' },
        { id: 'd', text: 'Inline Method' },
      ],
      correctAnswer: 'b',
      explanation: 'Introduce Parameter Object: group related parameters into a new class (e.g. UserDetails). The method signature shrinks to one parameter, and the grouping adds semantic meaning.',
    },
    {
      id: 'q17-9',
      type: 'multiple-choice',
      prompt: 'What is the primary benefit of writing tests first in TDD?',
      choices: [
        { id: 'a', text: 'It makes the code run faster' },
        { id: 'b', text: 'It forces you to think about desired behavior and API before implementation' },
        { id: 'c', text: 'It eliminates the need for documentation' },
        { id: 'd', text: 'It reduces the number of classes needed' },
      ],
      correctAnswer: 'b',
      explanation: 'Writing the test first forces you to define what the code should do from the caller\'s perspective. This drives better API design and ensures every feature has a corresponding test.',
    },
    {
      id: 'q17-10',
      type: 'true-false',
      prompt: 'ISP violation occurs when an interface has so many methods that implementing classes are forced to leave some unimplemented or throw exceptions.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'That is precisely the ISP violation pattern — the Robot forced to implement eat() and throw UnsupportedOperationException is the textbook example. Fat interfaces should be split into smaller, cohesive ones.',
    },
    {
      id: 'q17-11',
      type: 'multiple-choice',
      prompt: 'Which SOLID principle is the foundation of Dependency Injection frameworks like Spring?',
      choices: [
        { id: 'a', text: 'Single Responsibility Principle' },
        { id: 'b', text: 'Open/Closed Principle' },
        { id: 'c', text: 'Liskov Substitution Principle' },
        { id: 'd', text: 'Dependency Inversion Principle' },
      ],
      correctAnswer: 'd',
      explanation: 'DIP is the theoretical basis for DI frameworks. Spring, Guice, and similar frameworks wire dependencies (concrete implementations) to abstractions at runtime — the classes themselves never use new to create their dependencies.',
    },
    {
      id: 'q17-12',
      type: 'code-challenge',
      language: 'java',
      prompt: `Implement DIP for a notification service.\nMessageSender interface has send(String message).\nEmailSender implements it by printing "Email: " + message.\nNotificationService takes a MessageSender in its constructor and has sendNotification(String msg) that calls sender.send(msg).\nCreate a NotificationService with an EmailSender and call sendNotification("Hello").\nExpected output:\nEmail: Hello`,
      starterCode: `public class Main {\n    interface MessageSender {\n        void send(String message);\n    }\n\n    static class EmailSender implements MessageSender {\n        public void send(String message) {\n            // print "Email: " + message\n        }\n    }\n\n    static class NotificationService {\n        private MessageSender sender;\n\n        NotificationService(MessageSender sender) {\n            this.sender = sender;\n        }\n\n        public void sendNotification(String msg) {\n            // delegate to sender\n        }\n    }\n\n    public static void main(String[] args) {\n        MessageSender emailSender = new EmailSender();\n        NotificationService service = new NotificationService(emailSender);\n        service.sendNotification("Hello");\n    }\n}`,
      expectedOutput: 'Email: Hello',
      correctAnswer: '__code__',
      explanation: 'EmailSender.send() prints "Email: " + message. NotificationService.sendNotification() calls sender.send(msg). The service depends on the MessageSender abstraction — swapping to SMSSender requires no changes to NotificationService.',
    },
    {
      id: 'q17-13',
      type: 'code-challenge',
      language: 'java',
      prompt: `Implement a Stack class with push(int), pop() returning int, and isEmpty() returning boolean.\nThen verify its behavior TDD-style:\n- push 1, 2, 3; pop should return 3 then 2; isEmpty() after popping all should be true.\nIf all assertions pass, print "Tests passed!"\nExpected output:\nTests passed!`,
      starterCode: `public class Main {\n    static class Stack {\n        private int[] data = new int[100];\n        private int top = 0;\n\n        public void push(int value) {\n            // add value to stack\n        }\n\n        public int pop() {\n            // remove and return top value\n            return 0;\n        }\n\n        public boolean isEmpty() {\n            // return true if stack is empty\n            return true;\n        }\n    }\n\n    public static void main(String[] args) {\n        Stack stack = new Stack();\n        stack.push(1);\n        stack.push(2);\n        stack.push(3);\n\n        boolean allPassed = true;\n\n        if (stack.pop() != 3) allPassed = false;\n        if (stack.pop() != 2) allPassed = false;\n        stack.pop(); // remove 1\n        if (!stack.isEmpty()) allPassed = false;\n\n        if (allPassed) {\n            System.out.println("Tests passed!");\n        } else {\n            System.out.println("Tests FAILED!");\n        }\n    }\n}`,
      expectedOutput: 'Tests passed!',
      correctAnswer: '__code__',
      explanation: 'Stack.push() stores value at data[top] and increments top. Stack.pop() decrements top and returns data[top]. Stack.isEmpty() returns top == 0. After pushing 1,2,3: pop returns 3 then 2; after removing all three, isEmpty() is true.',
    },
  ],
};

export default module17;
