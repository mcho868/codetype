import type { Module } from './types';

const module12: Module = {
  id: 'module-12',
  slug: '12',
  title: 'Composite & Command Patterns',
  description: 'Build tree structures where parts and wholes are interchangeable, and encapsulate actions as first-class objects.',
  icon: '🌳',
  color: 'from-cyan-500 to-sky-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-12-1',
      title: 'The Composite Pattern',
      content: `**Intent**: "Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly."

**Three roles:**
- **Component** — the common interface for both leaves and composites (clients only talk to this)
- **Leaf** — a single item that has no children
- **Composite** — a container that holds other Components (which can be leaves or other composites)

The magic: because both Leaf and Composite implement Component, the client never needs to know which it has.

**Real examples:** File systems (files = leaves, directories = composites), UI widgets (buttons = leaves, panels = composites), arithmetic expressions.`,
      codeExamples: [
        {
          language: 'java',
          code: `public interface File {
    String getDetails();
}

public class PlainFile implements File {
    private String name;
    public PlainFile(String name) { this.name = name; }

    public String getDetails() {
        return name;
    }
}

public class Directory implements File {
    private String name;
    private List<File> contents = new ArrayList<>();

    public Directory(String name) { this.name = name; }

    public void add(File file) { contents.add(file); }

    public String getDetails() {
        StringBuilder sb = new StringBuilder(name + "/");
        for (File f : contents) {
            sb.append("\n  ").append(f.getDetails());
        }
        return sb.toString();
    }
}

// Client — treats everything as File
public class Main {
    public static void main(String[] args) {
        Directory root = new Directory("root");
        root.add(new PlainFile("README.txt"));

        Directory src = new Directory("src");
        src.add(new PlainFile("Main.java"));
        src.add(new PlainFile("Utils.java"));
        root.add(src);

        // Client calls getDetails() — doesn't care if leaf or composite
        System.out.println(root.getDetails());
    }
}`,
          caption: 'File system Composite — Directory and PlainFile both implement File, so the client treats them identically.',
          editable: true,
        },
        {
          language: 'java',
          code: `public interface Employee {
    String getSummary();
    double getTotalSalary();
}

public class Developer implements Employee {
    private String name;
    private double salary;
    public Developer(String name, double salary) { this.name = name; this.salary = salary; }
    public String getSummary() { return "Dev: " + name; }
    public double getTotalSalary() { return salary; }
}

public class Department implements Employee {
    private String name;
    private List<Employee> members = new ArrayList<>();
    public Department(String name) { this.name = name; }
    public void addMember(Employee e) { members.add(e); }
    public String getSummary() {
        StringBuilder sb = new StringBuilder("Dept: " + name);
        for (Employee e : members) sb.append("\n  ").append(e.getSummary());
        return sb.toString();
    }
    public double getTotalSalary() {
        return members.stream().mapToDouble(Employee::getTotalSalary).sum();
    }
}

public class Main {
    public static void main(String[] args) {
        Department engineering = new Department("Engineering");
        engineering.addMember(new Developer("Alice", 90000));
        engineering.addMember(new Developer("Bob", 85000));

        Department company = new Department("Acme Corp");
        company.addMember(engineering);
        company.addMember(new Developer("CEO Charlie", 200000));

        System.out.println(company.getSummary());
        System.out.println("Total payroll: $" + company.getTotalSalary());
    }
}`,
          caption: 'Employee hierarchy — getTotalSalary() on a Department recursively sums all nested employees.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-12-2',
      title: 'Composite and Alterability',
      content: `How does Composite help with Change Ratio?

When you add a **new kind of leaf** (e.g. a new file type like SymbolicLink):
- The new class is brand new code — doesn't count toward C
- Only the code that creates the object needs to change — typically 1 class
- The client (Browser) doesn't need to change at all — it just calls the Component interface
- **Result: CR is very low**

When you need to add a **new operation** (a new method on the Component interface):
- You MUST change the interface, every leaf, AND every composite
- This is the weakness of Composite — adding new methods cascades
- **Result: CR is high**

This is why the Component interface should be designed carefully upfront.`,
      codeExamples: [
        {
          language: 'java',
          code: `// No changes needed to File, PlainFile, Directory, or clients
// Just add a new class:
public class SymbolicLink implements File {
    private String name;
    private File target;

    public SymbolicLink(String name, File target) {
        this.name = name;
        this.target = target;
    }

    public String getDetails() {
        return name + " -> " + target.getDetails();
    }
}

// Only the factory/builder code changes to construct SymbolicLinks`,
          caption: 'Adding a new leaf type: C=1 (only the factory changes). The interface, other leaves, composites, and clients are untouched.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-12-3',
      title: 'The Command Pattern',
      content: `**Intent**: "Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations."

**Four roles:**
- **Command** — interface with an \`execute()\` method
- **ConcreteCommand** — implements Command; knows what to do and who to do it to
- **Receiver** — the object that actually does the work
- **Invoker** — calls \`execute()\` on a Command; doesn't know what will happen

**Key insight**: The Invoker never needs to change when you add new commands. You add new ConcreteCommand classes, and wire them in one place.

**Real examples:** GUI buttons (each button is a Command), undo/redo systems, task queues, remote controls.`,
      codeExamples: [
        {
          language: 'java',
          code: `public interface Command {
    void execute();
    void undo();
}

public class TextEditor {
    private StringBuilder text = new StringBuilder();

    public void insert(String s) { text.append(s); }
    public void delete(int length) { text.delete(text.length() - length, text.length()); }
    public String getText() { return text.toString(); }
}

public class InsertCommand implements Command {
    private TextEditor editor;
    private String text;

    public InsertCommand(TextEditor editor, String text) {
        this.editor = editor;
        this.text = text;
    }

    public void execute() { editor.insert(text); }
    public void undo()    { editor.delete(text.length()); }
}

public class CommandHistory {
    private Deque<Command> history = new ArrayDeque<>();

    public void execute(Command cmd) {
        cmd.execute();
        history.push(cmd);
    }

    public void undo() {
        if (!history.isEmpty()) history.pop().undo();
    }
}

// Main
public class Main {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        CommandHistory history = new CommandHistory();

        history.execute(new InsertCommand(editor, "Hello"));
        history.execute(new InsertCommand(editor, ", World"));
        System.out.println(editor.getText()); // Hello, World

        history.undo();
        System.out.println(editor.getText()); // Hello
    }
}`,
          caption: 'Text editor with undo — each InsertCommand stores the text it inserted, so undo simply deletes the same number of characters.',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q12-1',
      type: 'multiple-choice',
      prompt: 'In the Composite pattern, what role does a Directory play?',
      choices: [
        { id: 'a', text: 'Leaf' },
        { id: 'b', text: 'Component' },
        { id: 'c', text: 'Composite' },
        { id: 'd', text: 'Client' },
      ],
      correctAnswer: 'c',
      explanation: 'A Directory is a Composite — it implements the Component interface and holds a collection of other Components (which can be files or subdirectories).',
    },
    {
      id: 'q12-2',
      type: 'true-false',
      prompt: 'In the Composite pattern, a client must check whether it is dealing with a Leaf or Composite before calling a method.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'The whole point of Composite is that the client never checks — both Leaf and Composite implement the same Component interface, so the client calls the same method on either.',
    },
    {
      id: 'q12-3',
      type: 'fill-in-blank',
      prompt: 'The Command pattern encapsulates a _______ as an object.',
      correctAnswer: 'request',
      explanation: 'The Command pattern turns a request (an action to perform) into a standalone object, enabling queuing, logging, and undo.',
    },
    {
      id: 'q12-4',
      type: 'multiple-choice',
      prompt: 'Which role in the Command pattern calls execute() but doesn\'t know what will happen?',
      choices: [
        { id: 'a', text: 'Receiver' },
        { id: 'b', text: 'ConcreteCommand' },
        { id: 'c', text: 'Client' },
        { id: 'd', text: 'Invoker' },
      ],
      correctAnswer: 'd',
      explanation: 'The Invoker holds a Command reference and calls execute(). It is decoupled from the Receiver — it has no idea what the command actually does.',
    },
    {
      id: 'q12-5',
      type: 'true-false',
      prompt: 'Adding a new Leaf type to a Composite structure requires changing the Component interface.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'Adding a new Leaf type only requires creating a new class that implements Component. The interface, other leaves, composites, and clients are unaffected — this is the strength of the pattern.',
    },
    {
      id: 'q12-6',
      type: 'multiple-choice',
      prompt: 'What is the main weakness of the Composite pattern?',
      choices: [
        { id: 'a', text: 'Cannot add new leaf types' },
        { id: 'b', text: 'Adding a new method to Component requires changing every leaf and composite' },
        { id: 'c', text: 'Composites cannot contain other composites' },
        { id: 'd', text: 'Clients must know all leaf types' },
      ],
      correctAnswer: 'b',
      explanation: 'Adding a new operation to the Component interface cascades — every Leaf and Composite class must implement it, giving a high Change Ratio.',
    },
    {
      id: 'q12-7',
      type: 'multiple-choice',
      prompt: 'Which is NOT a real-world use of the Command pattern?',
      choices: [
        { id: 'a', text: 'Undo/redo' },
        { id: 'b', text: 'Task queues' },
        { id: 'c', text: 'File systems' },
        { id: 'd', text: 'GUI buttons' },
      ],
      correctAnswer: 'c',
      explanation: 'File systems are the classic example of the Composite pattern (files as leaves, directories as composites), not the Command pattern.',
    },
    {
      id: 'q12-8',
      type: 'fill-in-blank',
      prompt: 'In the Command pattern, the object that actually performs the work is called the _______.',
      correctAnswer: 'Receiver',
      explanation: 'The Receiver contains the business logic. ConcreteCommands delegate to the Receiver — they know which Receiver method to call but don\'t contain the logic themselves.',
    },
    {
      id: 'q12-9',
      type: 'true-false',
      prompt: 'The Command pattern supports undo operations because a ConcreteCommand can store the state needed to reverse itself.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'Because commands are objects, they can store parameters and state. An InsertCommand remembers what text was inserted, so its undo() method can delete that exact text.',
    },
    {
      id: 'q12-10',
      type: 'multiple-choice',
      prompt: 'In an employee hierarchy using Composite, what is an individual developer (no reports)?',
      choices: [
        { id: 'a', text: 'Composite' },
        { id: 'b', text: 'Client' },
        { id: 'c', text: 'Leaf' },
        { id: 'd', text: 'Component' },
      ],
      correctAnswer: 'c',
      explanation: 'An individual developer has no subordinates — they cannot contain other Employees. This makes them a Leaf in the Composite pattern.',
    },
    {
      id: 'q12-11',
      type: 'multiple-choice',
      prompt: 'Command pattern\'s impact on Change Ratio when adding a new command: typically C = 2 because:',
      choices: [
        { id: 'a', text: 'Two methods change in the Invoker' },
        { id: 'b', text: 'One new ConcreteCommand class + one class to wire it in' },
        { id: 'c', text: 'The Command interface and Receiver both change' },
        { id: 'd', text: 'Two Receivers are always needed' },
      ],
      correctAnswer: 'b',
      explanation: 'The new ConcreteCommand is a brand new class (doesn\'t count toward C). Only the wiring code (e.g. a factory or configuration class) changes — typically just 1 existing class.',
    },
    {
      id: 'q12-12',
      type: 'code-challenge',
      language: 'java',
      prompt: `Implement a simple Composite pattern for arithmetic expressions.\nA Num is a leaf holding an int value.\nAn Add is a composite that holds two Expr children and returns their sum.\nExpected output:\n3\n7\n10`,
      starterCode: `public class Main {
    interface Expr {
        int evaluate();
    }

    static class Num implements Expr {
        int value;
        Num(int v) { value = v; }
        // implement evaluate()
        public int evaluate() { return 0; }
    }

    static class Add implements Expr {
        Expr left, right;
        Add(Expr l, Expr r) { left = l; right = r; }
        // implement evaluate()
        public int evaluate() { return 0; }
    }

    public static void main(String[] args) {
        Expr three = new Num(3);
        Expr seven = new Add(new Num(3), new Num(4));
        Expr ten = new Add(new Num(3), new Add(new Num(4), new Num(3)));
        System.out.println(three.evaluate());
        System.out.println(seven.evaluate());
        System.out.println(ten.evaluate());
    }
}`,
      expectedOutput: '3\n7\n10',
      correctAnswer: '__code__',
      explanation: 'Num.evaluate() returns value. Add.evaluate() returns left.evaluate() + right.evaluate(). The recursion handles arbitrarily nested expressions.',
    },
    {
      id: 'q12-13',
      type: 'code-challenge',
      language: 'java',
      prompt: `Implement the Command pattern for a simple lamp.\nTurnOnCommand turns the lamp on (prints 'Lamp is ON').\nTurnOffCommand turns it off (prints 'Lamp is OFF').\nExpected output:\nLamp is ON\nLamp is OFF\nLamp is ON`,
      starterCode: `public class Main {
    static class Lamp {
        public void turnOn()  { System.out.println("Lamp is ON"); }
        public void turnOff() { System.out.println("Lamp is OFF"); }
    }

    interface Command {
        void execute();
    }

    static class TurnOnCommand implements Command {
        private Lamp lamp;
        TurnOnCommand(Lamp l) { lamp = l; }
        // implement execute()
        public void execute() {}
    }

    static class TurnOffCommand implements Command {
        private Lamp lamp;
        TurnOffCommand(Lamp l) { lamp = l; }
        // implement execute()
        public void execute() {}
    }

    public static void main(String[] args) {
        Lamp lamp = new Lamp();
        Command on  = new TurnOnCommand(lamp);
        Command off = new TurnOffCommand(lamp);
        on.execute();
        off.execute();
        on.execute();
    }
}`,
      expectedOutput: 'Lamp is ON\nLamp is OFF\nLamp is ON',
      correctAnswer: '__code__',
      explanation: 'TurnOnCommand.execute() calls lamp.turnOn(). TurnOffCommand.execute() calls lamp.turnOff(). The Lamp is the Receiver — it contains the actual logic.',
    },
  ],
};

export default module12;
