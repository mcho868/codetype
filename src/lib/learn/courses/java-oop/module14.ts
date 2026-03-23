import type { Module } from './types';

const module14: Module = {
  id: 'module-14',
  slug: '14',
  title: 'Decorator, Factory & Template Method',
  description: 'Wrap objects to add behavior dynamically, delegate object creation to subclasses, and define reusable algorithm skeletons.',
  icon: '🎨',
  color: 'from-pink-500 to-rose-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-14-1',
      title: 'The Decorator Pattern',
      content: `**Intent**: "Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality."

**Key insight**: Instead of creating an explosion of subclasses (CoffeeWithMilk, CoffeeWithSugar, CoffeeWithMilkAndSugar...), decorators **wrap** an existing object and add behavior before or after delegating to it.

**Roles:**
- **Component** — the interface that both real objects and decorators implement
- **ConcreteComponent** — the base object being decorated
- **Decorator** — abstract class that wraps a Component and delegates to it
- **ConcreteDecorator** — adds specific behavior on top of the delegation

**Real examples:** Java's I/O streams (\`BufferedReader\` wraps \`FileReader\`), HTTP middleware chains, logging wrappers, UI widget styling.`,
      codeExamples: [
        {
          language: 'java',
          code: `// Component interface
public interface Coffee {
    String getDescription();
    double getCost();
}

// ConcreteComponent
public class SimpleCoffee implements Coffee {
    public String getDescription() { return "Coffee"; }
    public double getCost() { return 1.00; }
}

// Abstract Decorator
public abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    public CoffeeDecorator(Coffee coffee) { this.coffee = coffee; }
}

// Concrete Decorators
public class Milk extends CoffeeDecorator {
    public Milk(Coffee coffee) { super(coffee); }
    public String getDescription() { return coffee.getDescription() + ", Milk"; }
    public double getCost() { return coffee.getCost() + 0.25; }
}

public class Sugar extends CoffeeDecorator {
    public Sugar(Coffee coffee) { super(coffee); }
    public String getDescription() { return coffee.getDescription() + ", Sugar"; }
    public double getCost() { return coffee.getCost() + 0.10; }
}

public class Main {
    public static void main(String[] args) {
        Coffee coffee = new SimpleCoffee();
        System.out.println(coffee.getDescription() + " $" + coffee.getCost());

        coffee = new Milk(coffee);
        System.out.println(coffee.getDescription() + " $" + coffee.getCost());

        coffee = new Sugar(new Milk(new SimpleCoffee()));
        System.out.println(coffee.getDescription() + " $" + coffee.getCost());
    }
}`,
          caption: 'Decorators chain at runtime — Sugar wraps Milk wraps SimpleCoffee, each adding its own description and cost without any subclass explosion.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-14-2',
      title: 'The Factory Method Pattern',
      content: `**Intent**: "Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses."

**Key insight**: The creator class calls a \`createDocument()\` method — it doesn't know (or care) which concrete class will be returned. Subclasses override the factory method to decide.

**Roles:**
- **Creator** — declares the factory method; may call it in template methods
- **ConcreteCreator** — overrides factory method to return a specific product
- **Product** — interface for the objects the factory creates
- **ConcreteProduct** — the actual object created

**Why not just \`new\`?** Using \`new\` hard-codes the class name. Factory Method moves that decision to a single, overridable point — making the system open for extension (new product types) without modifying existing creator logic.`,
      codeExamples: [
        {
          language: 'java',
          code: `// Product interface
public interface Document {
    void open();
    void save();
}

// Concrete Products
public class PDFDocument implements Document {
    public void open() { System.out.println("Opening PDF document"); }
    public void save() { System.out.println("Saving PDF document"); }
}

public class WordDocument implements Document {
    public void open() { System.out.println("Opening Word document"); }
    public void save() { System.out.println("Saving Word document"); }
}

// Creator (abstract)
public abstract class DocumentCreator {
    // Factory Method — subclasses decide what to create
    public abstract Document createDocument();

    // Template method that uses the factory method
    public void newDocument() {
        Document doc = createDocument();
        doc.open();
        System.out.println("Document ready.");
    }
}

// Concrete Creators
public class PDFCreator extends DocumentCreator {
    public Document createDocument() { return new PDFDocument(); }
}

public class WordCreator extends DocumentCreator {
    public Document createDocument() { return new WordDocument(); }
}

public class Main {
    public static void main(String[] args) {
        DocumentCreator creator = new PDFCreator();
        creator.newDocument();

        creator = new WordCreator();
        creator.newDocument();
    }
}`,
          caption: 'DocumentCreator never mentions PDFDocument or WordDocument — subclasses own the creation decision, keeping the parent class stable.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-14-3',
      title: 'The Template Method Pattern',
      content: `**Intent**: "Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure."

**Key insight**: The base class defines the **order** of steps and provides the invariant structure. Subclasses fill in the **variable** steps. The top-level method (the template method) is \`final\` — subclasses cannot reorder the steps.

**Roles:**
- **AbstractClass** — defines the template method and declares abstract primitive operations
- **ConcreteClass** — implements the primitive operations (the variable steps)

**Hollywood Principle**: "Don't call us, we'll call you." The base class calls the subclass methods — not the other way around.

**Difference from Strategy**: Template Method uses **inheritance** to vary steps; Strategy uses **composition** to vary the whole algorithm.`,
      codeExamples: [
        {
          language: 'java',
          code: `// Abstract class with template method
public abstract class DataProcessor {
    // Template method — defines the algorithm skeleton
    public final void process() {
        loadData();
        processData();
        outputResults();
    }

    // Invariant step
    private void loadData() {
        System.out.println("Loading data from source...");
    }

    // Variable steps — subclasses implement these
    protected abstract void processData();
    protected abstract void outputResults();
}

// Concrete subclasses fill in the variable steps
public class CSVProcessor extends DataProcessor {
    protected void processData() {
        System.out.println("Parsing CSV rows and normalizing fields");
    }
    protected void outputResults() {
        System.out.println("Writing results to output.csv");
    }
}

public class JSONProcessor extends DataProcessor {
    protected void processData() {
        System.out.println("Deserializing JSON and validating schema");
    }
    protected void outputResults() {
        System.out.println("Serializing results to output.json");
    }
}

public class Main {
    public static void main(String[] args) {
        DataProcessor csv = new CSVProcessor();
        csv.process();
        System.out.println("---");
        DataProcessor json = new JSONProcessor();
        json.process();
    }
}`,
          caption: 'DataProcessor.process() is final — the order loadData → processData → outputResults never changes. Subclasses only fill in the two abstract steps.',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q14-1',
      type: 'multiple-choice',
      prompt: 'What problem does the Decorator pattern primarily solve?',
      choices: [
        { id: 'a', text: 'Creating objects without specifying their concrete class' },
        { id: 'b', text: 'Adding responsibilities to objects dynamically without subclassing' },
        { id: 'c', text: 'Defining the skeleton of an algorithm' },
        { id: 'd', text: 'Notifying dependents of state changes' },
      ],
      correctAnswer: 'b',
      explanation: 'Decorator wraps an existing object and adds behavior at runtime. It avoids the subclass explosion that would occur if every combination of features needed its own subclass.',
    },
    {
      id: 'q14-2',
      type: 'true-false',
      prompt: 'A Decorator must implement the same interface as the object it wraps.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'This is the key structural rule of Decorator — both the ConcreteComponent and the Decorator implement the Component interface. This allows decorators to be stacked arbitrarily deep.',
    },
    {
      id: 'q14-3',
      type: 'fill-in-blank',
      prompt: 'In the Factory Method pattern, subclasses decide which class to _______ by overriding the factory method.',
      correctAnswer: 'instantiate',
      explanation: 'The parent Creator defines the factory method signature, but each ConcreteCreator overrides it to return a specific ConcreteProduct, deferring the instantiation decision.',
    },
    {
      id: 'q14-4',
      type: 'multiple-choice',
      prompt: 'In the Template Method pattern, which keyword is typically applied to the template method?',
      choices: [
        { id: 'a', text: 'abstract' },
        { id: 'b', text: 'static' },
        { id: 'c', text: 'final' },
        { id: 'd', text: 'synchronized' },
      ],
      correctAnswer: 'c',
      explanation: 'The template method is marked final so subclasses cannot override the algorithm\'s overall structure — they can only fill in the designated abstract steps.',
    },
    {
      id: 'q14-5',
      type: 'multiple-choice',
      prompt: 'Java\'s BufferedReader wrapping FileReader is an example of which pattern?',
      choices: [
        { id: 'a', text: 'Factory Method' },
        { id: 'b', text: 'Template Method' },
        { id: 'c', text: 'Adapter' },
        { id: 'd', text: 'Decorator' },
      ],
      correctAnswer: 'd',
      explanation: 'BufferedReader wraps any Reader and adds buffering behavior — the classic Decorator pattern. Both implement the Reader interface, so they are interchangeable from the client\'s perspective.',
    },
    {
      id: 'q14-6',
      type: 'true-false',
      prompt: 'Template Method uses composition to vary algorithm steps, while Strategy uses inheritance.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'It is the opposite: Template Method uses inheritance (subclasses override abstract steps), while Strategy uses composition (the context holds a strategy object that can be swapped).',
    },
    {
      id: 'q14-7',
      type: 'fill-in-blank',
      prompt: 'In the Decorator pattern, the abstract decorator class holds a reference to the _______ interface, not a concrete class.',
      correctAnswer: 'Component',
      explanation: 'The Decorator stores a Component reference so it can wrap any implementation — including other decorators — enabling arbitrary chaining without knowing concrete types.',
    },
    {
      id: 'q14-8',
      type: 'multiple-choice',
      prompt: 'Which design principle does the Factory Method pattern primarily support?',
      choices: [
        { id: 'a', text: 'Program to an implementation, not an interface' },
        { id: 'b', text: 'Favor inheritance over composition' },
        { id: 'c', text: 'Depend on abstractions; let subclasses decide concrete types' },
        { id: 'd', text: 'Each class should have only one responsibility' },
      ],
      correctAnswer: 'c',
      explanation: 'Factory Method decouples the Creator from concrete product classes. The Creator depends on the Product interface; the specific class is decided by overriding the factory method in a subclass.',
    },
    {
      id: 'q14-9',
      type: 'multiple-choice',
      prompt: 'If you have CoffeeWithMilk, CoffeeWithSugar, CoffeeWithVanilla, CoffeeWithMilkAndSugar, etc., which pattern should you apply?',
      choices: [
        { id: 'a', text: 'Template Method — make each combination a subclass step' },
        { id: 'b', text: 'Factory Method — create a factory for each combination' },
        { id: 'c', text: 'Decorator — wrap a base Coffee with composable add-on decorators' },
        { id: 'd', text: 'Observer — let each ingredient notify the coffee' },
      ],
      correctAnswer: 'c',
      explanation: 'Decorator eliminates the subclass explosion — instead of N! subclasses for N add-ons, you create N small decorator classes that can be stacked in any combination at runtime.',
    },
    {
      id: 'q14-10',
      type: 'true-false',
      prompt: 'In Template Method, the abstract primitive operations are called by the subclass.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'The Hollywood Principle applies: the base class calls the subclass\'s primitive operations — "don\'t call us, we\'ll call you." The subclass implements them but never calls the template method itself.',
    },
    {
      id: 'q14-11',
      type: 'multiple-choice',
      prompt: 'Adding a new document type (e.g. SpreadsheetDocument) to a Factory Method design requires:',
      choices: [
        { id: 'a', text: 'Modifying the abstract Creator class' },
        { id: 'b', text: 'Modifying all existing ConcreteCreators' },
        { id: 'c', text: 'Adding a new ConcreteProduct and a new ConcreteCreator subclass' },
        { id: 'd', text: 'Changing the Product interface' },
      ],
      correctAnswer: 'c',
      explanation: 'Factory Method is Open/Closed — you extend with new classes. Add SpreadsheetDocument (new ConcreteProduct) and SpreadsheetCreator (new ConcreteCreator). Existing code is untouched.',
    },
    {
      id: 'q14-12',
      type: 'code-challenge',
      language: 'java',
      prompt: `Implement a Decorator pattern for text messages.\nTextMessage is the base component with getText() returning the stored string.\nExclaim decorator appends "!" to the text.\nUpper decorator uppercases the text.\nChain them: new Upper(new Exclaim(new TextMessage("hello"))) and call getText().\nExpected output:\nHELLO!`,
      starterCode: `public class Main {\n    interface Message {\n        String getText();\n    }\n\n    static class TextMessage implements Message {\n        private String text;\n        TextMessage(String text) { this.text = text; }\n        public String getText() { return text; }\n    }\n\n    static class Exclaim implements Message {\n        private Message message;\n        Exclaim(Message m) { message = m; }\n        public String getText() {\n            // return message text with "!" appended\n            return "";\n        }\n    }\n\n    static class Upper implements Message {\n        private Message message;\n        Upper(Message m) { message = m; }\n        public String getText() {\n            // return message text uppercased\n            return "";\n        }\n    }\n\n    public static void main(String[] args) {\n        Message msg = new Upper(new Exclaim(new TextMessage("hello")));\n        System.out.println(msg.getText());\n    }\n}`,
      expectedOutput: 'HELLO!',
      correctAnswer: '__code__',
      explanation: 'Exclaim.getText() returns message.getText() + "!". Upper.getText() returns message.getText().toUpperCase(). Chaining Upper(Exclaim(TextMessage("hello"))) first appends "!" giving "hello!", then uppercases giving "HELLO!".',
    },
    {
      id: 'q14-13',
      type: 'code-challenge',
      language: 'java',
      prompt: `Implement the Template Method pattern for a report generator.\nAbstract class Report has a final method generate() that calls: loadData(), processData(), printReport() in that order.\nHTMLReport implements the three steps printing:\n"Loading data..."\n"Processing data..."\n"HTML: Sales Report"\nExpected output:\nLoading data...\nProcessing data...\nHTML: Sales Report`,
      starterCode: `public class Main {\n    static abstract class Report {\n        // Template method — do not override\n        public final void generate() {\n            loadData();\n            processData();\n            printReport();\n        }\n        protected abstract void loadData();\n        protected abstract void processData();\n        protected abstract void printReport();\n    }\n\n    static class HTMLReport extends Report {\n        protected void loadData() {\n            // print "Loading data..."\n        }\n        protected void processData() {\n            // print "Processing data..."\n        }\n        protected void printReport() {\n            // print "HTML: Sales Report"\n        }\n    }\n\n    public static void main(String[] args) {\n        Report report = new HTMLReport();\n        report.generate();\n    }\n}`,
      expectedOutput: 'Loading data...\nProcessing data...\nHTML: Sales Report',
      correctAnswer: '__code__',
      explanation: 'HTMLReport.loadData() prints "Loading data...", processData() prints "Processing data...", printReport() prints "HTML: Sales Report". The template method generate() calls them in order.',
    },
  ],
};

export default module14;
