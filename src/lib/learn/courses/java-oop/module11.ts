import type { Module } from './types';

const module11: Module = {
  id: 'module-11',
  slug: '11',
  title: 'Clean Code: Naming & Functions',
  description: 'Master the craft of writing readable code through meaningful naming, focused functions, and avoiding duplication.',
  icon: '✍️',
  color: 'from-green-500 to-emerald-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-11-1',
      title: 'The Power of Good Naming',
      content: `Names are the first thing a reader encounters. **Identifiers that reveal intent** dramatically reduce the time needed to understand code.

Rules for good names:
- **Use intention-revealing names** — the name should tell you WHY it exists, WHAT it does, and HOW it is used
- **Avoid abbreviations** — \`cstmrLst\` is worse than \`customerList\`
- **Classes should be nouns** — \`Customer\`, \`OrderProcessor\`, \`Invoice\`
- **Methods should be verbs** — \`calculateTotal()\`, \`findByEmail()\`, \`isValid()\`
- **Boolean names should read as questions** — \`isEmpty()\`, \`hasPermission()\`, \`isLoggedIn()\`
- **Constants in UPPER_SNAKE_CASE** — \`MAX_RETRIES\`, \`DEFAULT_TIMEOUT\``,
      codeExamples: [
        {
          language: 'java',
          code: `// BAD names — what does any of this mean?
public class Mgr {
    private List<Obj> lst = new ArrayList<>();

    public boolean chk(Obj o) {
        for (Obj x : lst) {
            if (x.getId() == o.getId()) return true;
        }
        return false;
    }

    public void proc(Obj o) {
        if (!chk(o)) lst.add(o);
    }
}`,
          caption: 'Abbreviated names force the reader to guess intent — every name is a puzzle to solve.',
          editable: true,
        },
        {
          language: 'java',
          code: `// GOOD names — intention is clear
public class UserRegistry {
    private List<User> registeredUsers = new ArrayList<>();

    public boolean isAlreadyRegistered(User user) {
        for (User existing : registeredUsers) {
            if (existing.getId() == user.getId()) return true;
        }
        return false;
    }

    public void register(User user) {
        if (!isAlreadyRegistered(user)) registeredUsers.add(user);
    }
}`,
          caption: 'Same logic — but now every name tells a story. A new developer understands this class in seconds.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-11-2',
      title: 'Functions That Do One Thing',
      content: `Robert C. Martin's most important rule for functions: **Functions should do one thing. They should do it well. They should do it only.**

Key heuristics:
- **Small** — a function should be small. Very small. Martin suggests no more than 20 lines; the ideal is often 4–10.
- **One level of abstraction** — all statements in a function should be at the same abstraction level. Don't mix high-level decisions with low-level details in the same function.
- **No side effects** — a function named \`getUser()\` should not also delete a log file.
- **Command-Query Separation** — a function either does something (command) or answers something (query), not both.
- **DRY — Don't Repeat Yourself** — duplicated logic is a maintenance nightmare. Every time you copy-paste, you create two places that must be kept in sync.`,
      codeExamples: [
        {
          language: 'java',
          code: `// BAD: one method doing everything
public void processOrder(Order order) {
    // validate
    if (order.getItems().isEmpty()) throw new IllegalArgumentException("Empty order");
    if (order.getCustomer() == null) throw new IllegalArgumentException("No customer");

    // calculate total
    double total = 0;
    for (Item item : order.getItems()) {
        total += item.getPrice() * item.getQuantity();
    }
    double tax = total * 0.15;
    double grandTotal = total + tax;

    // save to database
    Database.save(order);
    Database.save(new Invoice(order, grandTotal));

    // send email
    EmailService.send(order.getCustomer().getEmail(),
        "Order confirmed: $" + grandTotal);
}`,
          caption: 'One large method mixing validation, calculation, persistence, and notification — a maintenance nightmare.',
          editable: true,
        },
        {
          language: 'java',
          code: `// GOOD: each method does one thing
public void processOrder(Order order) {
    validateOrder(order);
    double total = calculateTotal(order);
    saveOrder(order, total);
    notifyCustomer(order, total);
}

private void validateOrder(Order order) {
    if (order.getItems().isEmpty()) throw new IllegalArgumentException("Empty order");
    if (order.getCustomer() == null) throw new IllegalArgumentException("No customer");
}

private double calculateTotal(Order order) {
    double subtotal = order.getItems().stream()
        .mapToDouble(i -> i.getPrice() * i.getQuantity()).sum();
    return subtotal * 1.15; // includes 15% tax
}

private void saveOrder(Order order, double total) {
    Database.save(order);
    Database.save(new Invoice(order, total));
}

private void notifyCustomer(Order order, double total) {
    EmailService.send(order.getCustomer().getEmail(),
        "Order confirmed: $" + total);
}`,
          caption: 'The top-level method reads like a summary. Each helper method is independently testable and understandable.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-11-3',
      title: 'DRY and Code Smells',
      content: `**DRY (Don't Repeat Yourself)** — every piece of knowledge should have a single, unambiguous representation. Duplication means two places to maintain, two places to get wrong.

**Common Code Smells** — signals that code may have quality problems:
- **Long Method** — a method that's grown too large; hard to understand and test
- **Large Class** — doing too many things; violates Single Responsibility
- **Long Parameter List** — more than 3-4 parameters signals the method is doing too much, or the parameters should be grouped into an object
- **Duplicated Code** — the same or similar logic appearing in multiple places
- **Comments as Deodorant** — a comment explaining WHAT the code does means the code isn't clear enough; the fix is better naming, not more comments`,
      codeExamples: [
        {
          language: 'java',
          code: `// SMELL: duplicated discount logic
public double getPriceForGold(double basePrice) {
    double discount = basePrice * 0.20;
    double price = basePrice - discount;
    System.out.println("Gold price: " + price);
    return price;
}

public double getPriceForSilver(double basePrice) {
    double discount = basePrice * 0.10;
    double price = basePrice - discount;
    System.out.println("Silver price: " + price);
    return price;
}`,
          caption: 'Duplicated structure — if the discount logic changes, you must remember to update both methods.',
          editable: true,
        },
        {
          language: 'java',
          code: `// FIX: extract common logic
public double getPriceWithDiscount(double basePrice, double discountRate, String tier) {
    double price = basePrice * (1 - discountRate);
    System.out.println(tier + " price: " + price);
    return price;
}

public double getPriceForGold(double base)   { return getPriceWithDiscount(base, 0.20, "Gold"); }
public double getPriceForSilver(double base) { return getPriceWithDiscount(base, 0.10, "Silver"); }`,
          caption: 'Single source of truth — the discount calculation logic lives in exactly one place.',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q11-1',
      type: 'multiple-choice',
      prompt: 'Which naming convention should boolean methods follow?',
      choices: [
        { id: 'a', text: 'UPPER_CASE' },
        { id: 'b', text: 'Verb phrases like isValid() or hasPermission()' },
        { id: 'c', text: 'Noun phrases like validity' },
        { id: 'd', text: 'Single letters' },
      ],
      correctAnswer: 'b',
      explanation: 'Boolean methods should read as questions — isValid(), hasPermission(), isEmpty() — so calling them reads naturally in an if statement.',
    },
    {
      id: 'q11-2',
      type: 'true-false',
      prompt: 'According to the DRY principle, duplicated code means two places that must be kept in sync when logic changes.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'DRY (Don\'t Repeat Yourself) says every piece of knowledge should have a single representation. Duplication creates the risk of only updating one copy when logic changes.',
    },
    {
      id: 'q11-3',
      type: 'fill-in-blank',
      prompt: 'Robert C. Martin\'s principle states: Functions should do ___ thing.',
      correctAnswer: 'one',
      explanation: '"Functions should do one thing. They should do it well. They should do it only." — Robert C. Martin, Clean Code.',
    },
    {
      id: 'q11-4',
      type: 'multiple-choice',
      prompt: 'Which is a \'code smell\'?',
      choices: [
        { id: 'a', text: 'Using interfaces' },
        { id: 'b', text: 'Long parameter lists' },
        { id: 'c', text: 'Short methods' },
        { id: 'd', text: 'Meaningful names' },
      ],
      correctAnswer: 'b',
      explanation: 'A long parameter list (more than 3-4 parameters) is a code smell — it signals the method is doing too much or the parameters should be grouped into an object.',
    },
    {
      id: 'q11-5',
      type: 'multiple-choice',
      prompt: 'Command-Query Separation means:',
      choices: [
        { id: 'a', text: 'Commands run faster than queries' },
        { id: 'b', text: 'A method should either DO something or ANSWER something, not both' },
        { id: 'c', text: 'Queries are always static' },
        { id: 'd', text: 'Commands never return values' },
      ],
      correctAnswer: 'b',
      explanation: 'CQS keeps methods predictable: a query returns data without side effects; a command changes state without returning data.',
    },
    {
      id: 'q11-6',
      type: 'true-false',
      prompt: 'Adding more comments is the best fix for code that is hard to understand.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'Comments that explain WHAT code does are a sign the code itself isn\'t clear. The real fix is better naming and smaller methods — make the code speak for itself.',
    },
    {
      id: 'q11-7',
      type: 'fill-in-blank',
      prompt: 'DRY stands for Don\'t _______ Yourself.',
      correctAnswer: 'Repeat',
      explanation: 'Don\'t Repeat Yourself — every piece of knowledge should have a single, unambiguous, authoritative representation in the system.',
    },
    {
      id: 'q11-8',
      type: 'multiple-choice',
      prompt: 'What does \'one level of abstraction per function\' mean?',
      choices: [
        { id: 'a', text: 'Only one if-statement per function' },
        { id: 'b', text: 'All statements in a function should be at the same conceptual level' },
        { id: 'c', text: 'Functions must be one line' },
        { id: 'd', text: 'No function calls inside functions' },
      ],
      correctAnswer: 'b',
      explanation: 'A function should operate at one conceptual level — either high-level coordination (calling other methods) or low-level detail, not mixed together.',
    },
    {
      id: 'q11-9',
      type: 'multiple-choice',
      prompt: 'Classes should be named with:',
      choices: [
        { id: 'a', text: 'Verbs' },
        { id: 'b', text: 'Nouns' },
        { id: 'c', text: 'Adjectives' },
        { id: 'd', text: 'Abbreviations' },
      ],
      correctAnswer: 'b',
      explanation: 'Classes represent things — objects, concepts, entities — so they should be named with nouns: Customer, OrderProcessor, Invoice.',
    },
    {
      id: 'q11-10',
      type: 'true-false',
      prompt: 'A function named getUserById() should also update a log file as a side effect.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'This violates Command-Query Separation and the principle of no side effects. A function named getX() should only retrieve X — callers have no reason to expect it does anything else.',
    },
    {
      id: 'q11-11',
      type: 'multiple-choice',
      prompt: 'Which code smell describes a class with almost no methods — only getters and setters?',
      choices: [
        { id: 'a', text: 'Long Method' },
        { id: 'b', text: 'Data Class' },
        { id: 'c', text: 'Speculative Generality' },
        { id: 'd', text: 'Large Class' },
      ],
      correctAnswer: 'b',
      explanation: 'A Data Class is a smell — it holds data but has no behaviour. Often it means the behaviour that should be in this class has been placed elsewhere.',
    },
    {
      id: 'q11-12',
      type: 'code-challenge',
      language: 'java',
      prompt: `Fix the duplicated code below by extracting a helper method.\nExpected output:\nCircle area: 78.54\nSquare area: 25.0`,
      starterCode: `public class Main {
    public static void main(String[] args) {
        // Fix the duplication by extracting a printArea(String shape, double area) method
        double circleRadius = 5.0;
        double circleArea = Math.PI * circleRadius * circleRadius;
        System.out.printf("Circle area: %.2f%n", circleArea);

        double squareSide = 5.0;
        double squareArea = squareSide * squareSide;
        System.out.printf("Square area: %.1f%n", squareArea);
    }
}`,
      expectedOutput: 'Circle area: 78.54\nSquare area: 25.0',
      correctAnswer: '__code__',
      explanation: 'Extract: static void printArea(String shape, double area) and call it for each shape. The printf format differs so keep the formatting in each call, or pass the format string.',
    },
    {
      id: 'q11-13',
      type: 'code-challenge',
      language: 'java',
      prompt: `Write a method isValidEmail(String email) that returns true if the email contains '@' and '.', false otherwise.\nAlso write isEmpty(String s) that returns true if null or blank.\nExpected output:\ntrue\nfalse\ntrue\nfalse`,
      starterCode: `public class Main {
    public static boolean isValidEmail(String email) {
        // return true if email contains both '@' and '.'
        return false;
    }

    public static boolean isEmpty(String s) {
        // return true if s is null or blank
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isValidEmail("user@example.com"));
        System.out.println(isValidEmail("notanemail"));
        System.out.println(isEmpty(""));
        System.out.println(isEmpty("hello"));
    }
}`,
      expectedOutput: 'true\nfalse\ntrue\nfalse',
      correctAnswer: '__code__',
      explanation: 'isValidEmail: return email != null && email.contains("@") && email.contains("."); isEmpty: return s == null || s.isBlank();',
    },
  ],
};

export default module11;
