import type { Question } from "./types";
import { cr, stdoutCases } from "./authoring";

export const JAVA_OOP_EXTRA_RUNNER_QUESTIONS: Partial<Record<string, Question[]>> = {
  "java-0": [
    cr(
      "java-cr-0-1",
      `Build a cafe bill summary.

You only need one class here: \`Main\`.

What each part should do:
- \`main()\` stores the fixed values, calls the helper methods, and prints the final bill
- \`calculateTax(double subtotal, double taxRatePercent)\` returns the tax amount
- \`calculateTotal(double subtotal, double tax)\` returns the final total after tax

Inside \`main()\`, use these fixed values:
- customer name = \`Mia\`
- subtotal = \`84.50\`
- tax rate as a percentage = \`12.0\`

Worked example:
- \`calculateTax(84.50, 12.0)\` should return \`10.14\`
- \`calculateTotal(84.50, 10.14)\` should return \`94.64\`

Then print exactly:
\`\`\`text
Customer: Mia
Subtotal: 84.50
Tax: 10.14
Total: 94.64
\`\`\`

Use \`System.out.printf\` for the numeric lines.`,
      `import java.util.*;

public class Main {
    static double calculateTax(double subtotal, double taxRatePercent) {
        // TODO
        return 0.0;
    }

    static double calculateTotal(double subtotal, double tax) {
        // TODO
        return 0.0;
    }

    public static void main(String[] args) {
        String customer = "Mia";
        double subtotal = 84.50;
        double taxRate = 12.0;

        // TODO
    }
}`,
      stdoutCases(
        [
          {
            id: "sample-1",
            description: "fixed Week 1 values",
            expectedStdout: "Customer: Mia\nSubtotal: 84.50\nTax: 10.14\nTotal: 94.64",
          },
        ],
        [
          {
            id: "hidden-1",
            expectedStdout: "Customer: Mia\nSubtotal: 84.50\nTax: 10.14\nTotal: 94.64",
          },
        ]
      ),
      "Break the work into small methods, compute tax as subtotal * rate / 100, compute total as subtotal + tax, and format doubles to two decimal places."
    ),
  ],
  "java-1": [
    cr(
      "java-cr-1-1",
      `Create a \`StudentRecord\` class with:
- fields for \`name\`, \`id\`, and three marks
- a constructor
- an \`average()\` method
- a \`hasPassed()\` method that returns \`true\` when the average is at least 50

Input format:
\`\`\`
<name> <id> <mark1> <mark2> <mark3>
\`\`\`

Print exactly:
\`\`\`
Student: <name> (<id>)
Average: <average to 1 decimal>
Result: PASS|FAIL
\`\`\``,
      `import java.util.*;

public class Main {
    static class StudentRecord {
        // TODO: fields

        StudentRecord(String name, String id, int mark1, int mark2, int mark3) {
            // TODO
        }

        double average() {
            // TODO
            return 0.0;
        }

        boolean hasPassed() {
            // TODO
            return false;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String name = scanner.next();
        String id = scanner.next();
        int mark1 = scanner.nextInt();
        int mark2 = scanner.nextInt();
        int mark3 = scanner.nextInt();

        // TODO
    }
}`,
      stdoutCases(
        [
          {
            id: "sample-1",
            description: "passing student",
            stdin: "Alice CT101 78 84 91\n",
            expectedStdout: "Student: Alice (CT101)\nAverage: 84.3\nResult: PASS",
          },
          {
            id: "sample-2",
            description: "borderline pass",
            stdin: "Nina CS230 45 60 51\n",
            expectedStdout: "Student: Nina (CS230)\nAverage: 52.0\nResult: PASS",
          },
        ],
        [
          {
            id: "hidden-1",
            stdin: "Owen SE201 20 35 49\n",
            expectedStdout: "Student: Owen (SE201)\nAverage: 34.7\nResult: FAIL",
          },
          {
            id: "hidden-2",
            stdin: "Ruby OO130 50 50 50\n",
            expectedStdout: "Student: Ruby (OO130)\nAverage: 50.0\nResult: PASS",
          },
        ]
      ),
      "Store the marks in the object, compute the mean with doubles, and let the class decide whether the student passed."
    ),
  ],
  "java-2": [
    cr(
      "java-cr-2-1",
      `Build a small payroll program using inheritance.

Create an \`Employee\` superclass with a \`name\` field and a \`calculatePay()\` method. Then create:
- \`SalariedEmployee\` with a fixed weekly salary
- \`HourlyEmployee\` with hours worked and hourly rate

Input format:
\`\`\`
<n>
S <name> <salary>
H <name> <hours> <rate>
...
\`\`\`

Print one line per employee in input order, then a total:
\`\`\`
<name>: <pay to 2 decimals>
TOTAL: <sum to 2 decimals>
\`\`\``,
      `import java.util.*;

public class Main {
    static class Employee {
        String name;

        Employee(String name) {
            this.name = name;
        }

        double calculatePay() {
            return 0.0;
        }
    }

    static class SalariedEmployee extends Employee {
        // TODO

        SalariedEmployee(String name, double salary) {
            super(name);
            // TODO
        }

        @Override
        double calculatePay() {
            // TODO
            return 0.0;
        }
    }

    static class HourlyEmployee extends Employee {
        // TODO

        HourlyEmployee(String name, double hours, double rate) {
            super(name);
            // TODO
        }

        @Override
        double calculatePay() {
            // TODO
            return 0.0;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();

        // TODO
    }
}`,
      stdoutCases(
        [
          {
            id: "sample-1",
            description: "mixed salaried and hourly staff",
            stdin: "3\nS Ava 1200\nH Ben 18 20\nH Chloe 12 25\n",
            expectedStdout: "Ava: 1200.00\nBen: 360.00\nChloe: 300.00\nTOTAL: 1860.00",
          },
          {
            id: "sample-2",
            description: "single salaried employee",
            stdin: "1\nS Kai 950\n",
            expectedStdout: "Kai: 950.00\nTOTAL: 950.00",
          },
        ],
        [
          {
            id: "hidden-1",
            stdin: "2\nH Mo 7.5 19.2\nS Priya 1400\n",
            expectedStdout: "Mo: 144.00\nPriya: 1400.00\nTOTAL: 1544.00",
          },
          {
            id: "hidden-2",
            stdin: "4\nH Tui 10 15\nH Zara 8 30\nS Liam 1000\nS Emma 875.5\n",
            expectedStdout: "Tui: 150.00\nZara: 240.00\nLiam: 1000.00\nEmma: 875.50\nTOTAL: 2265.50",
          },
        ]
      ),
      "Use subclass-specific fields and override the pay calculation so the main loop can treat every employee the same way."
    ),
  ],
  "java-3": [
    cr(
      "java-cr-3-1",
      `Build a pet hotel summary using polymorphism.

Create a \`Pet\` superclass with a \`name\` field plus two methods:
- \`sound()\`
- \`dailyFoodKg()\`

Then create \`Dog\`, \`Cat\`, and \`Bird\` subclasses. Food rules:
- Dog: \`weight * 0.04\`
- Cat: \`weight * 0.03\`
- Bird: \`weight * 0.02\`

Input format:
\`\`\`
<n>
DOG <name> <weight>
CAT <name> <weight>
BIRD <name> <weight>
...
\`\`\`

Print one line per pet:
\`\`\`
<name>: <sound> <food to 2 decimals>
\`\`\`
Then print:
\`\`\`
TOTAL FOOD: <sum to 2 decimals>
\`\`\``,
      `import java.util.*;

public class Main {
    static class Pet {
        String name;
        double weight;

        Pet(String name, double weight) {
            this.name = name;
            this.weight = weight;
        }

        String sound() {
            return "";
        }

        double dailyFoodKg() {
            return 0.0;
        }
    }

    static class Dog extends Pet {
        Dog(String name, double weight) {
            super(name, weight);
        }

        @Override
        String sound() {
            // TODO
            return "";
        }

        @Override
        double dailyFoodKg() {
            // TODO
            return 0.0;
        }
    }

    static class Cat extends Pet {
        Cat(String name, double weight) {
            super(name, weight);
        }

        @Override
        String sound() {
            // TODO
            return "";
        }

        @Override
        double dailyFoodKg() {
            // TODO
            return 0.0;
        }
    }

    static class Bird extends Pet {
        Bird(String name, double weight) {
            super(name, weight);
        }

        @Override
        String sound() {
            // TODO
            return "";
        }

        @Override
        double dailyFoodKg() {
            // TODO
            return 0.0;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();

        // TODO
    }
}`,
      stdoutCases(
        [
          {
            id: "sample-1",
            description: "three pet types",
            stdin: "3\nDOG Rex 20\nCAT Luna 4\nBIRD Pip 1.5\n",
            expectedStdout: "Rex: woof 0.80\nLuna: meow 0.12\nPip: chirp 0.03\nTOTAL FOOD: 0.95",
          },
          {
            id: "sample-2",
            description: "single cat",
            stdin: "1\nCAT Milo 5\n",
            expectedStdout: "Milo: meow 0.15\nTOTAL FOOD: 0.15",
          },
        ],
        [
          {
            id: "hidden-1",
            stdin: "2\nDOG Bolt 12.5\nDOG Nova 8\n",
            expectedStdout: "Bolt: woof 0.50\nNova: woof 0.32\nTOTAL FOOD: 0.82",
          },
          {
            id: "hidden-2",
            stdin: "4\nBIRD Sky 0.8\nCAT Misty 3.2\nDOG Bruno 25\nCAT Nori 4.5\n",
            expectedStdout: "Sky: chirp 0.02\nMisty: meow 0.10\nBruno: woof 1.00\nNori: meow 0.14\nTOTAL FOOD: 1.26",
          },
        ]
      ),
      "Override the same methods in each subclass, store them in a shared pet list, and let dynamic dispatch choose the correct behaviour."
    ),
  ],
  "java-4": [
    cr(
      "java-cr-4-1",
      `Create an abstract \`Shape\` class with an abstract \`area()\` method.

Implement three subclasses:
- \`Rectangle\`
- \`Circle\`
- \`Triangle\`

Input format:
\`\`\`
<n>
RECT <width> <height>
CIRCLE <radius>
TRI <base> <height>
...
\`\`\`

Print each shape area in order:
\`\`\`
RECT: <area to 2 decimals>
CIRCLE: <area to 2 decimals>
TRI: <area to 2 decimals>
\`\`\`
Then print:
\`\`\`
TOTAL: <sum to 2 decimals>
\`\`\`

Use \`Math.PI\` for circles.`,
      `import java.util.*;

public class Main {
    static abstract class Shape {
        abstract double area();
        abstract String label();
    }

    static class Rectangle extends Shape {
        // TODO

        Rectangle(double width, double height) {
            // TODO
        }

        @Override
        double area() {
            // TODO
            return 0.0;
        }

        @Override
        String label() {
            return "RECT";
        }
    }

    static class Circle extends Shape {
        // TODO

        Circle(double radius) {
            // TODO
        }

        @Override
        double area() {
            // TODO
            return 0.0;
        }

        @Override
        String label() {
            return "CIRCLE";
        }
    }

    static class Triangle extends Shape {
        // TODO

        Triangle(double base, double height) {
            // TODO
        }

        @Override
        double area() {
            // TODO
            return 0.0;
        }

        @Override
        String label() {
            return "TRI";
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();

        // TODO
    }
}`,
      stdoutCases(
        [
          {
            id: "sample-1",
            description: "rectangle, circle, and triangle",
            stdin: "3\nRECT 4 3\nCIRCLE 2\nTRI 6 5\n",
            expectedStdout: "RECT: 12.00\nCIRCLE: 12.57\nTRI: 15.00\nTOTAL: 39.57",
          },
          {
            id: "sample-2",
            description: "single circle",
            stdin: "1\nCIRCLE 1.5\n",
            expectedStdout: "CIRCLE: 7.07\nTOTAL: 7.07",
          },
        ],
        [
          {
            id: "hidden-1",
            stdin: "2\nTRI 10 4\nRECT 2.5 8\n",
            expectedStdout: "TRI: 20.00\nRECT: 20.00\nTOTAL: 40.00",
          },
          {
            id: "hidden-2",
            stdin: "4\nRECT 1 9\nRECT 3 3\nCIRCLE 1\nTRI 8 2\n",
            expectedStdout: "RECT: 9.00\nRECT: 9.00\nCIRCLE: 3.14\nTRI: 8.00\nTOTAL: 29.14",
          },
        ]
      ),
      "This question is about abstract classes: put the shared interface in the abstract base type and force each concrete subclass to supply its own area formula."
    ),
  ],
  "java-5": [
    cr(
      "java-cr-5-1",
      `Design a checkout calculator around an interface.

Create a \`DiscountPolicy\` interface with a method that returns the discount amount for a subtotal.

Implement:
- \`NoDiscount\`
- \`StudentDiscount\` (10% off)
- \`PremiumDiscount\` (15% off when subtotal >= 100, otherwise 8% off)

Input format:
\`\`\`
<policy> <subtotal>
\`\`\`

\`policy\` will be one of \`NONE\`, \`STUDENT\`, or \`PREMIUM\`.

Print exactly:
\`\`\`
Discount: <discount to 2 decimals>
Final: <final total to 2 decimals>
\`\`\``,
      `import java.util.*;

public class Main {
    interface DiscountPolicy {
        double discountFor(double subtotal);
    }

    static class NoDiscount implements DiscountPolicy {
        @Override
        public double discountFor(double subtotal) {
            // TODO
            return 0.0;
        }
    }

    static class StudentDiscount implements DiscountPolicy {
        @Override
        public double discountFor(double subtotal) {
            // TODO
            return 0.0;
        }
    }

    static class PremiumDiscount implements DiscountPolicy {
        @Override
        public double discountFor(double subtotal) {
            // TODO
            return 0.0;
        }
    }

    static DiscountPolicy buildPolicy(String type) {
        // TODO
        return new NoDiscount();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String policyType = scanner.next();
        double subtotal = scanner.nextDouble();

        // TODO
    }
}`,
      stdoutCases(
        [
          {
            id: "sample-1",
            description: "student discount",
            stdin: "STUDENT 95\n",
            expectedStdout: "Discount: 9.50\nFinal: 85.50",
          },
          {
            id: "sample-2",
            description: "premium discount above threshold",
            stdin: "PREMIUM 160\n",
            expectedStdout: "Discount: 24.00\nFinal: 136.00",
          },
        ],
        [
          {
            id: "hidden-1",
            stdin: "NONE 43.25\n",
            expectedStdout: "Discount: 0.00\nFinal: 43.25",
          },
          {
            id: "hidden-2",
            stdin: "PREMIUM 80\n",
            expectedStdout: "Discount: 6.40\nFinal: 73.60",
          },
        ]
      ),
      "Put the pricing rule behind an interface so the checkout flow only depends on the abstraction, not on a particular discount implementation."
    ),
  ],
  "6": [
    cr(
      "java-cr-6-1",
      `Model a football team using aggregation.

Create:
- a \`Player\` class with \`name\`, \`goals\`, and \`assists\`
- a \`Team\` class that stores many \`Player\` objects in an \`ArrayList\`

The team must provide methods for:
- total goals
- total assists
- top scorer name

Input format:
\`\`\`
<teamName>
<n>
<playerName> <goals> <assists>
...
\`\`\`

If there is a tie for top scorer, keep the first player who reached that highest total.

Print exactly:
\`\`\`
Team: <teamName>
Goals: <total goals>
Assists: <total assists>
Top Scorer: <player name>
\`\`\``,
      `import java.util.*;

public class Main {
    static class Player {
        // TODO

        Player(String name, int goals, int assists) {
            // TODO
        }
    }

    static class Team {
        String name;
        ArrayList<Player> players = new ArrayList<>();

        Team(String name) {
            this.name = name;
        }

        void addPlayer(Player player) {
            // TODO
        }

        int totalGoals() {
            // TODO
            return 0;
        }

        int totalAssists() {
            // TODO
            return 0;
        }

        String topScorerName() {
            // TODO
            return "";
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String teamName = scanner.next();
        int n = scanner.nextInt();

        // TODO
    }
}`,
      stdoutCases(
        [
          {
            id: "sample-1",
            description: "three players",
            stdin: "Tigers\n3\nAva 5 2\nMia 7 4\nZoe 3 6\n",
            expectedStdout: "Team: Tigers\nGoals: 15\nAssists: 12\nTop Scorer: Mia",
          },
          {
            id: "sample-2",
            description: "tie keeps first player",
            stdin: "Falcons\n2\nLuca 4 1\nNoah 4 8\n",
            expectedStdout: "Team: Falcons\nGoals: 8\nAssists: 9\nTop Scorer: Luca",
          },
        ],
        [
          {
            id: "hidden-1",
            stdin: "Storm\n4\nIvy 1 1\nKye 2 3\nRia 0 5\nTaj 6 0\n",
            expectedStdout: "Team: Storm\nGoals: 9\nAssists: 9\nTop Scorer: Taj",
          },
          {
            id: "hidden-2",
            stdin: "United\n1\nPia 9 2\n",
            expectedStdout: "Team: United\nGoals: 9\nAssists: 2\nTop Scorer: Pia",
          },
        ]
      ),
      "The team should aggregate existing player objects instead of hard-coding player data directly into the team itself."
    ),
  ],
  "9": [
    cr(
      "java-cr-9-1",
      `Implement a generic \`Pair<T>\` class and use it in a small console program.

Requirements:
- \`Pair<T>\` stores \`first\` and \`second\`
- add a \`swapped()\` method that returns a new \`Pair<T>\` with the values reversed
- add a \`describe()\` method that returns \`"<first> | <second>"\`

Input format:
\`\`\`
<mode> <value1> <value2>
\`\`\`

\`mode\` is either:
- \`INT\`
- \`WORD\`

For \`INT\`, create a \`Pair<Integer>\`.
For \`WORD\`, create a \`Pair<String>\`.

Print exactly:
\`\`\`
Original: <first> | <second>
Swapped: <second> | <first>
\`\`\``,
      `import java.util.*;

public class Main {
    static class Pair<T> {
        // TODO

        Pair(T first, T second) {
            // TODO
        }

        Pair<T> swapped() {
            // TODO
            return null;
        }

        String describe() {
            // TODO
            return "";
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String mode = scanner.next();

        // TODO
    }
}`,
      stdoutCases(
        [
          {
            id: "sample-1",
            description: "integer pair",
            stdin: "INT 7 12\n",
            expectedStdout: "Original: 7 | 12\nSwapped: 12 | 7",
          },
          {
            id: "sample-2",
            description: "word pair",
            stdin: "WORD alpha beta\n",
            expectedStdout: "Original: alpha | beta\nSwapped: beta | alpha",
          },
        ],
        [
          {
            id: "hidden-1",
            stdin: "INT -3 8\n",
            expectedStdout: "Original: -3 | 8\nSwapped: 8 | -3",
          },
          {
            id: "hidden-2",
            stdin: "WORD red blue\n",
            expectedStdout: "Original: red | blue\nSwapped: blue | red",
          },
        ]
      ),
      "Make the pair generic instead of writing separate integer and string versions; the main method should only choose which concrete type argument to use."
    ),
  ],
  "13": [
    cr(
      "java-cr-13-1",
      `Build a shipping calculator with the Strategy pattern.

Create a \`ShippingStrategy\` interface with a \`cost(double weight, double distance)\` method.

Implement:
- \`StandardShipping\`: \`4 + 0.8 * weight + 0.05 * distance\`
- \`ExpressShipping\`: \`8 + 1.4 * weight + 0.09 * distance\`
- \`PriorityShipping\`: \`12 + 2.0 * weight + 0.12 * distance\`

Input format:
\`\`\`
<method> <weight> <distance>
\`\`\`

\`method\` is one of \`STANDARD\`, \`EXPRESS\`, or \`PRIORITY\`.

Print exactly:
\`\`\`
Method: <method>
Cost: <cost to 2 decimals>
\`\`\``,
      `import java.util.*;

public class Main {
    interface ShippingStrategy {
        double cost(double weight, double distance);
    }

    static class StandardShipping implements ShippingStrategy {
        @Override
        public double cost(double weight, double distance) {
            // TODO
            return 0.0;
        }
    }

    static class ExpressShipping implements ShippingStrategy {
        @Override
        public double cost(double weight, double distance) {
            // TODO
            return 0.0;
        }
    }

    static class PriorityShipping implements ShippingStrategy {
        @Override
        public double cost(double weight, double distance) {
            // TODO
            return 0.0;
        }
    }

    static ShippingStrategy choose(String method) {
        // TODO
        return new StandardShipping();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String method = scanner.next();
        double weight = scanner.nextDouble();
        double distance = scanner.nextDouble();

        // TODO
    }
}`,
      stdoutCases(
        [
          {
            id: "sample-1",
            description: "standard parcel",
            stdin: "STANDARD 5 40\n",
            expectedStdout: "Method: STANDARD\nCost: 10.00",
          },
          {
            id: "sample-2",
            description: "priority parcel",
            stdin: "PRIORITY 3 25\n",
            expectedStdout: "Method: PRIORITY\nCost: 21.00",
          },
        ],
        [
          {
            id: "hidden-1",
            stdin: "EXPRESS 2.5 10\n",
            expectedStdout: "Method: EXPRESS\nCost: 12.40",
          },
          {
            id: "hidden-2",
            stdin: "STANDARD 1.2 8\n",
            expectedStdout: "Method: STANDARD\nCost: 5.36",
          },
        ]
      ),
      "Encapsulate each pricing algorithm in its own strategy class so adding a new shipping method does not require rewriting the calling code."
    ),
  ],
  "17": [
    cr(
      "java-cr-17-1",
      `Practice dependency inversion with constructor injection.

Create:
- a \`Notifier\` interface with \`send(String customerName, int itemCount)\`
- \`EmailNotifier\` and \`SmsNotifier\` implementations
- an \`OrderService\` class that depends on \`Notifier\` through its constructor

Input format:
\`\`\`
<channel> <customerName> <itemCount>
\`\`\`

\`channel\` is either \`EMAIL\` or \`SMS\`.

When the order is placed, print exactly:
\`\`\`
Preparing order for <customerName>
<CHANNEL>: Order confirmed for <customerName> (<itemCount> items)
\`\`\`

Do not let \`OrderService\` directly create the concrete notifier itself.`,
      `import java.util.*;

public class Main {
    interface Notifier {
        void send(String customerName, int itemCount);
    }

    static class EmailNotifier implements Notifier {
        @Override
        public void send(String customerName, int itemCount) {
            // TODO
        }
    }

    static class SmsNotifier implements Notifier {
        @Override
        public void send(String customerName, int itemCount) {
            // TODO
        }
    }

    static class OrderService {
        private final Notifier notifier;

        OrderService(Notifier notifier) {
            this.notifier = notifier;
        }

        void placeOrder(String customerName, int itemCount) {
            // TODO
        }
    }

    static Notifier chooseNotifier(String channel) {
        // TODO
        return new EmailNotifier();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String channel = scanner.next();
        String customerName = scanner.next();
        int itemCount = scanner.nextInt();

        // TODO
    }
}`,
      stdoutCases(
        [
          {
            id: "sample-1",
            description: "email notifier",
            stdin: "EMAIL Mia 3\n",
            expectedStdout: "Preparing order for Mia\nEMAIL: Order confirmed for Mia (3 items)",
          },
          {
            id: "sample-2",
            description: "sms notifier",
            stdin: "SMS Tane 1\n",
            expectedStdout: "Preparing order for Tane\nSMS: Order confirmed for Tane (1 items)",
          },
        ],
        [
          {
            id: "hidden-1",
            stdin: "EMAIL Ava 8\n",
            expectedStdout: "Preparing order for Ava\nEMAIL: Order confirmed for Ava (8 items)",
          },
          {
            id: "hidden-2",
            stdin: "SMS Noah 5\n",
            expectedStdout: "Preparing order for Noah\nSMS: Order confirmed for Noah (5 items)",
          },
        ]
      ),
      "Choose the concrete notifier outside the service and inject it. That keeps the high-level order flow dependent on an abstraction instead of a hard-coded notification class."
    ),
  ],
};
