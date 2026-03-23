import type { Module } from './types';

const module10: Module = {
  id: 'module-10',
  slug: '10',
  title: 'Comprehensibility & Alterability',
  description: 'Learn the two pillars of maintainable software: writing code others can understand and code that welcomes change.',
  icon: '🔍',
  color: 'from-indigo-500 to-blue-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-10-1',
      title: 'What is Maintainability?',
      content: `Maintainability has three sub-attributes from ISO/IEC 25010:

**Comprehensibility (Analysability)** — the degree of effectiveness and efficiency with which the implementation can be understood in order to conduct maintenance with confidence. The more time and effort needed to understand code, the less comprehensible it is.

**Alterability (Modifiability)** — the degree to which a product can be effectively and efficiently changed without introducing defects or degrading existing quality.

**Testability** — the degree of effectiveness and efficiency with which test criteria can be established and tests performed.

Making a change to software requires three steps: (1) Find where changes need to be made — comprehension; (2) Determine what changes need to be made — comprehension; (3) Make the changes — alteration. So comprehensibility directly impacts alterability.`,
      codeExamples: [
        {
          language: 'java',
          code: `// Hard to understand — what does this class do?
public class Proc {
    private int[] d;
    private int n;
    public Proc(int s) { d = new int[s]; n = 0; }
    public void ins(int v) { if (n < d.length) d[n++] = v; }
    public int rem() { return n > 0 ? d[--n] : -1; }
    public boolean emp() { return n == 0; }
}

// Easy to understand — same logic, better names
public class Stack {
    private int[] data;
    private int size;
    public Stack(int capacity) { data = new int[capacity]; size = 0; }
    public void push(int value) { if (size < data.length) data[size++] = value; }
    public int pop() { return size > 0 ? data[--size] : -1; }
    public boolean isEmpty() { return size == 0; }
}`,
          caption: 'Identical logic — the only difference is naming. The second class takes seconds to understand; the first takes minutes.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-10-2',
      title: 'Comprehensibility in Practice',
      content: `When reading code for maintenance you build a **mental model** — your current understanding of what the program does and why. Good code helps you build an accurate mental model quickly.

Program comprehension is helped by:
- **Good naming** — identifiers that reveal intent
- **Consistent structure** — code organised the same way across the codebase
- **Low complexity** — short methods, shallow nesting
- **Good abstraction** — classes and methods that match the domain

A key heuristic: imagine the least experienced developer on your team reading your code. Will they understand it without asking you?`,
      codeExamples: [
        {
          language: 'java',
          code: `// Hard to follow — deeply nested
public String classify(int score) {
    String result;
    if (score >= 0) {
        if (score < 50) {
            result = "Fail";
        } else {
            if (score < 65) {
                result = "Pass";
            } else {
                if (score < 80) {
                    result = "Merit";
                } else {
                    result = "Distinction";
                }
            }
        }
    } else {
        result = "Invalid";
    }
    return result;
}`,
          caption: 'Deeply nested conditionals — the reader must track multiple levels of context simultaneously.',
          editable: true,
        },
        {
          language: 'java',
          code: `// Easy to follow — guard clauses and clear conditions
public String classify(int score) {
    if (score < 0)   return "Invalid";
    if (score < 50)  return "Fail";
    if (score < 65)  return "Pass";
    if (score < 80)  return "Merit";
    return "Distinction";
}`,
          caption: 'Guard clauses (early returns) eliminate nesting entirely — each case is visible at a glance.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-10-3',
      title: 'The Change Ratio — Measuring Alterability',
      content: `To measure how alterable a design is, use the **Change Ratio (CR)**:

**CR = C / N**

Where:
- **N** = total number of classes in the design
- **C** = number of existing classes that must change to implement a specific change case

Interpretation:
- CR close to 0 → very alterable (few classes change)
- CR = 1 → every class changes — very poor alterability
- New classes added don't count toward C (they're expected additions)

The goal of good design patterns and principles is to drive C down — when you add new behaviour, you add new classes rather than modifying existing ones.`,
      codeExamples: [
        {
          language: 'java',
          code: `// BAD: adding a new payment method requires changing many classes
// OrderProcessor, ShoppingCart, Receipt, TaxCalculator all have
// if/else blocks checking payment type — change all 4 classes

// GOOD: Strategy pattern isolates change to one new class
public interface PaymentStrategy {
    void pay(double amount);
}

public class CreditCard implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " by credit card");
    }
}

public class PayPal implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " via PayPal");
    }
}

// Adding Bitcoin? Just add a new class. Nothing else changes.
public class Bitcoin implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid " + (amount / 50000.0) + " BTC");
    }
}

public class Checkout {
    private PaymentStrategy payment;
    public Checkout(PaymentStrategy payment) { this.payment = payment; }
    public void complete(double amount) { payment.pay(amount); }
}`,
          caption: 'Strategy pattern: adding Bitcoin requires only 1 new class — C=1, giving a very low Change Ratio.',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q10-1',
      type: 'multiple-choice',
      prompt: 'Which ISO/IEC 25010 sub-attribute describes how easily implementation can be UNDERSTOOD?',
      choices: [
        { id: 'a', text: 'Alterability' },
        { id: 'b', text: 'Testability' },
        { id: 'c', text: 'Comprehensibility' },
        { id: 'd', text: 'Reusability' },
      ],
      correctAnswer: 'c',
      explanation: 'Comprehensibility (also called Analysability) is specifically about how easily the code can be understood for maintenance purposes.',
    },
    {
      id: 'q10-2',
      type: 'true-false',
      prompt: 'Improving comprehensibility also improves alterability because understanding code is a prerequisite to changing it.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'The three steps to making a change — find where, determine what, make the change — the first two are about comprehension. You cannot change code you do not understand.',
    },
    {
      id: 'q10-3',
      type: 'fill-in-blank',
      prompt: 'The Change Ratio formula is CR = C / _____, where C is the number of classes that must change.',
      correctAnswer: 'N',
      explanation: 'N is the total number of classes in the design. CR = C / N gives a ratio between 0 and 1.',
    },
    {
      id: 'q10-4',
      type: 'multiple-choice',
      prompt: 'A Change Ratio of 0.1 for a given change case means:',
      choices: [
        { id: 'a', text: '10% of classes changed' },
        { id: 'b', text: 'Only 1 class changed regardless of size' },
        { id: 'c', text: 'The design is poor' },
        { id: 'd', text: 'All classes changed' },
      ],
      correctAnswer: 'a',
      explanation: 'CR = C / N = 0.1 means C is 10% of N — 10% of existing classes needed to change for this feature.',
    },
    {
      id: 'q10-5',
      type: 'true-false',
      prompt: 'When calculating Change Ratio, newly added classes count toward C.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'C counts only existing classes that must be modified. New classes added to implement the feature are expected and do not count toward C.',
    },
    {
      id: 'q10-6',
      type: 'multiple-choice',
      prompt: 'Which practice most directly improves comprehensibility?',
      choices: [
        { id: 'a', text: 'Using design patterns' },
        { id: 'b', text: 'Meaningful naming and short methods' },
        { id: 'c', text: 'Adding more comments' },
        { id: 'd', text: 'Using inheritance' },
      ],
      correctAnswer: 'b',
      explanation: 'Meaningful names and short focused methods are the most direct way to improve how quickly a reader builds an accurate mental model.',
    },
    {
      id: 'q10-7',
      type: 'multiple-choice',
      prompt: 'The three steps to making a software change are: find where, determine what, and ___.',
      choices: [
        { id: 'a', text: 'Test it' },
        { id: 'b', text: 'Document it' },
        { id: 'c', text: 'Make the change' },
        { id: 'd', text: 'Refactor it' },
      ],
      correctAnswer: 'c',
      explanation: 'Steps 1 and 2 (finding and determining) are comprehension activities. Step 3 — making the change — is the alteration activity.',
    },
    {
      id: 'q10-8',
      type: 'fill-in-blank',
      prompt: 'A ______ model is the developer\'s current understanding of what a program does, built while reading code.',
      correctAnswer: 'mental',
      explanation: 'A mental model is the internal representation a developer builds when reading code. Good code helps build an accurate mental model quickly.',
    },
    {
      id: 'q10-9',
      type: 'true-false',
      prompt: 'Deeply nested if/else blocks generally make code harder to understand.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'Deep nesting forces the reader to track multiple levels of context simultaneously, increasing cognitive load and reducing comprehensibility.',
    },
    {
      id: 'q10-10',
      type: 'multiple-choice',
      prompt: 'Which technique reduces nesting and improves readability?',
      choices: [
        { id: 'a', text: 'More inheritance' },
        { id: 'b', text: 'Guard clauses / early returns' },
        { id: 'c', text: 'Static fields' },
        { id: 'd', text: 'Larger classes' },
      ],
      correctAnswer: 'b',
      explanation: 'Guard clauses handle edge cases with early returns at the top of a method, eliminating the need for deeply nested else branches.',
    },
    {
      id: 'q10-11',
      type: 'multiple-choice',
      prompt: 'What does high Change Ratio (CR close to 1) indicate?',
      choices: [
        { id: 'a', text: 'Good alterability' },
        { id: 'b', text: 'Poor alterability — many classes change' },
        { id: 'c', text: 'Good testability' },
        { id: 'd', text: 'Good comprehensibility' },
      ],
      correctAnswer: 'b',
      explanation: 'CR close to 1 means nearly every class in the design must be modified for a single change — a sign of poor design and tight coupling.',
    },
    {
      id: 'q10-12',
      type: 'code-challenge',
      language: 'java',
      prompt: `Refactor the following method using guard clauses so it is easier to read. The logic must be identical.\nExpected output:\nInvalid\nFail\nPass\nMerit\nDistinction`,
      starterCode: `public class Main {
    public static String classify(int score) {
        String result;
        if (score >= 0) {
            if (score < 50) {
                result = "Fail";
            } else {
                if (score < 65) {
                    result = "Pass";
                } else {
                    if (score < 80) {
                        result = "Merit";
                    } else {
                        result = "Distinction";
                    }
                }
            }
        } else {
            result = "Invalid";
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println(classify(-1));
        System.out.println(classify(30));
        System.out.println(classify(55));
        System.out.println(classify(70));
        System.out.println(classify(85));
    }
}`,
      expectedOutput: 'Invalid\nFail\nPass\nMerit\nDistinction',
      correctAnswer: '__code__',
      explanation: 'Use early returns: if (score < 0) return "Invalid"; if (score < 50) return "Fail"; if (score < 65) return "Pass"; if (score < 80) return "Merit"; return "Distinction";',
    },
    {
      id: 'q10-13',
      type: 'code-challenge',
      language: 'java',
      prompt: `Implement a Stack class with push(int), pop() returning int (-1 if empty), and isEmpty().\nExpected output:\n10\n5\ntrue`,
      starterCode: `public class Main {
    static class Stack {
        private int[] data = new int[100];
        private int size = 0;
        // implement push, pop, isEmpty
    }

    public static void main(String[] args) {
        Stack s = new Stack();
        s.push(5);
        s.push(10);
        System.out.println(s.pop());
        System.out.println(s.pop());
        System.out.println(s.isEmpty());
    }
}`,
      expectedOutput: '10\n5\ntrue',
      correctAnswer: '__code__',
      explanation: 'push: data[size++] = value; pop: return size > 0 ? data[--size] : -1; isEmpty: return size == 0;',
    },
  ],
};

export default module10;
