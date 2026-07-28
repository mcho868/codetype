import type { Module } from './types';

const module18: Module = {
  id: 'module-18',
  slug: '18',
  title: 'OO Modelling with UML',
  description: 'Model classes, views, relationships, and object interactions before writing code, using UML class, object, and sequence diagrams.',
  icon: '🗺️',
  color: 'from-sky-500 to-cyan-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-18-1',
      title: 'Why Model Before Coding?',
      content: `**Object-oriented modelling** is the bridge between a problem statement and the code you eventually write. Instead of jumping straight into Java classes, you first identify the important domain objects, what data they hold, and how they collaborate.

The COMPSCI 230 slides frame modelling as part of the larger **software engineering process**:
- models help you understand a problem before implementation
- models capture design decisions so you can revisit and refine them later
- models communicate ideas to other developers
- models expose important structure while suppressing irrelevant detail

That last point matters. A model is an **abstraction** of reality, not reality itself. A good model shows what is important for the current design conversation and intentionally leaves out noise.

The UML material also stresses four modelling principles:
1. the choice of model shapes how you attack the problem
2. a model can be expressed at different levels of precision
3. the best models stay connected to reality
4. no single model is sufficient for every non-trivial system

A **UML class diagram** is the standard lightweight notation for that job. At the simplest level, a class box has:
- A **class name**
- A list of **attributes** (fields)
- A list of **operations** (methods)

Example:
\`\`\`
+-------------------+
| Student           |
+-------------------+
| -name: String     |
| -id: int          |
+-------------------+
| +enrol(c: Course) |
| +printRecord()    |
+-------------------+
\`\`\`

The minus sign means **private**; the plus sign means **public**. The point of the diagram is not artistic perfection. The point is to clarify responsibilities before implementation.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Student {
    private String name;
    private int id;

    public Student(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public void enrol(Course course) {
        System.out.println(name + " enrolled in " + course.getCode());
    }

    public void printRecord() {
        System.out.println(id + " - " + name);
    }
}`,
          caption: 'A simple Java class corresponding to the UML idea of attributes + operations.',
        },
      ],
    },
    {
      id: 'lesson-18-2',
      title: 'Relationships: Association, Aggregation, Composition, Inheritance',
      content: `A good model is mostly about **relationships**.

- **Association**: one class knows about another
- **Aggregation**: a whole contains parts, but the parts can exist independently
- **Composition**: a whole owns parts whose lifetime depends on the whole
- **Inheritance**: one class is a specialized version of another

For a course like COMPSCI 230, modelling the relationship correctly matters more than drawing fancy arrows. A \`Library\` *has many* \`Book\` objects. A \`Car\` may be composed of an \`Engine\`. A \`SavingsAccount\` *is an* \`Account\`.

You should also think about **multiplicity**:
- \`1\` means exactly one
- \`0..1\` means optional
- \`*\` means many
- \`1..*\` means one or more

This helps you decide whether your Java field should be a single reference, a nullable reference, or a collection like \`ArrayList<T>\`.`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.util.ArrayList;
import java.util.List;

public class Main {
    static class Book {
        private String title;

        Book(String title) {
            this.title = title;
        }

        public String getTitle() {
            return title;
        }
    }

    static class Library {
        private List<Book> books = new ArrayList<>();

        public void addBook(Book book) {
            books.add(book);
        }

        public void printTitles() {
            for (Book book : books) {
                System.out.println(book.getTitle());
            }
        }
    }

    public static void main(String[] args) {
        Library library = new Library();
        library.addBook(new Book("Clean Code"));
        library.addBook(new Book("Design Patterns"));
        library.printTitles();
    }
}`,
          caption: 'Multiplicity `1 .. *` or `*` usually becomes a collection field in Java.',
          expectedOutput: 'Clean Code\nDesign Patterns',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-18-3',
      title: 'CRC Cards and Turning a Model Into Code',
      content: `A practical modelling technique is the **CRC card**:
- **Class**
- **Responsibilities**
- **Collaborators**

Suppose you are building a very small enrolment system:
- **Student**: stores identity, requests enrolment
- **Course**: stores code and capacity, accepts or rejects enrolments
- **EnrolmentService**: coordinates the process

This prevents the common beginner mistake of dumping every responsibility into one "manager" class.

Once the design is clear, translate it into Java:
1. Write the classes and fields
2. Add constructors
3. Add public methods that match the responsibilities
4. Only then fill in implementation details

In other words: **model first, code second**. The model does not replace code, but it reduces blind trial-and-error.`,
      codeExamples: [
        {
          language: 'java',
          code: `class Student {
    private String name;

    Student(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

class Course {
    private String code;

    Course(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}

class EnrolmentService {
    public void enrol(Student student, Course course) {
        System.out.println(student.getName() + " -> " + course.getCode());
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Ava");
        Course c = new Course("COMPSCI230");
        new EnrolmentService().enrol(s, c);
    }
}`,
          caption: 'A small model translated into code with clear responsibilities.',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-18-4',
      title: 'Multiple Views, Object Diagrams, and Sequence Diagrams',
      content: `One of the most important ideas in the UML lectures is that **no single model is sufficient**. Different diagrams show different views of the same system.

Common Week 2 modelling views are:
- **Use case diagrams**: user-centered tasks and actors
- **Class diagrams**: static structure
- **Object diagrams**: a snapshot of actual objects and their links at one moment in time
- **Sequence diagrams**: time-ordered message passing between objects

An **object diagram** is useful when you want to stop talking about classes in the abstract and show concrete instances:
\`\`\`
: Borrower
: Book
: Book
\`\`\`

A **sequence diagram** is useful when you want to show behaviour over time:
1. one object sends a message
2. another object replies or forwards work
3. the order of those messages matters

For example, a borrower asking to borrow a book might involve:
- \`borrow(book)\`
- \`canBorrow()\`
- \`isOnLoan()\`
- \`setBorrowedBy(this)\`

This is the core difference:
- a **class diagram** says what can exist
- an **object diagram** says what exists right now
- a **sequence diagram** says how objects collaborate over time`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Main {
    static class Borrower {
        public boolean canBorrow() {
            return true;
        }

        public boolean borrow(Book book) {
            if (!canBorrow() || book.isOnLoan()) {
                return false;
            }
            book.setBorrowedBy(this);
            return true;
        }
    }

    static class Book {
        private Borrower borrowedBy;

        public boolean isOnLoan() {
            return borrowedBy != null;
        }

        void setBorrowedBy(Borrower borrower) {
            borrowedBy = borrower;
        }
    }

    public static void main(String[] args) {
        Borrower borrower = new Borrower();
        Book book = new Book();

        System.out.println(borrower.borrow(book));
        System.out.println(book.isOnLoan());
        System.out.println(borrower.borrow(book));
    }
}`,
          caption: 'The code gives structure, while an accompanying sequence diagram explains the order of borrow(), canBorrow(), isOnLoan(), and setBorrowedBy().',
          expectedOutput: 'true\ntrue\nfalse',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-18-5',
      title: 'Well-Formed Models and Information Hiding',
      content: `A UML model is strongest when its views are **well formed**. That means the diagrams are semantically consistent with one another.

Examples of consistency:
- the multiplicity in the class diagram should match the object diagram snapshots
- the messages shown in the sequence diagram should make sense given the methods in the classes
- visibility decisions in code should support the intended collaborations

The Week 2 borrowing example is especially useful here. In the code, \`Book.setBorrowedBy(...)\` or \`checkout(...)\` is intentionally **not public**. That prevents outside code from connecting objects incorrectly.

This demonstrates two object-oriented ideas:
- **information hiding**: clients should not manipulate internal links however they want
- **encapsulation**: data and the methods that preserve its integrity are bundled together

So modelling is not just drawing boxes. It should influence visibility, ownership, and which objects are allowed to coordinate with which others.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Main {
    static class Book {
        private Borrower borrowedBy;

        public boolean isOnLoan() {
            return borrowedBy != null;
        }

        void checkout(Borrower borrower) {
            if (borrowedBy == null) {
                borrowedBy = borrower;
            }
        }
    }

    static class Borrower {
        public boolean borrow(Book book) {
            if (book.isOnLoan()) {
                return false;
            }
            book.checkout(this);
            return true;
        }
    }

    public static void main(String[] args) {
        Book book = new Book();
        Borrower first = new Borrower();
        Borrower second = new Borrower();

        System.out.println(first.borrow(book));
        System.out.println(book.isOnLoan());
        System.out.println(second.borrow(book));
    }
}`,
          caption: 'The borrowing link is established through controlled collaboration, not arbitrary public field access.',
          expectedOutput: 'true\ntrue\nfalse',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q18-1',
      type: 'multiple-choice',
      prompt: 'What is the main purpose of a UML class diagram?',
      choices: [
        { id: 'a', text: 'To execute Java code faster' },
        { id: 'b', text: 'To model classes, their data, and their operations before coding' },
        { id: 'c', text: 'To replace all source code' },
        { id: 'd', text: 'To store test results' },
      ],
      correctAnswer: 'b',
      explanation: 'A class diagram is a design tool. It clarifies structure and responsibility before implementation.',
    },
    {
      id: 'q18-2',
      type: 'true-false',
      prompt: 'Multiplicity in a model helps you decide whether a field should be a single object reference or a collection.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'If a relationship is one-to-many, the Java design usually needs a collection rather than a single field.',
    },
    {
      id: 'q18-3',
      type: 'fill-in-blank',
      prompt: 'CRC stands for Class, Responsibilities, and ______.',
      correctAnswer: 'Collaborators',
      explanation: 'CRC cards help you assign responsibilities and identify which classes work together.',
    },
    {
      id: 'q18-4',
      type: 'multiple-choice',
      prompt: 'Which relationship best describes a `Library` storing many `Book` objects?',
      choices: [
        { id: 'a', text: 'Association only' },
        { id: 'b', text: 'Aggregation or composition depending on ownership semantics' },
        { id: 'c', text: 'Inheritance' },
        { id: 'd', text: 'Polymorphism' },
      ],
      correctAnswer: 'b',
      explanation: 'A whole-part relationship is usually aggregation or composition; the exact choice depends on who owns the lifetime of the parts.',
    },
    {
      id: 'q18-5',
      type: 'true-false',
      prompt: 'If one class is doing all the work in your model, that is usually a modelling smell.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'A good model distributes responsibilities instead of creating one giant "god object".',
    },
    {
      id: 'q18-6',
      type: 'code-challenge',
      language: 'java',
      prompt: `Create a small OO model in code.\nDefine a Student class with a name field and getName().\nDefine a Course class with a code field and getCode().\nIn main, create Student("Mia") and Course("COMPSCI230"), then print exactly:\nMia -> COMPSCI230`,
      starterCode: `public class Main {\n    static class Student {\n        // add field, constructor, getter\n    }\n\n    static class Course {\n        // add field, constructor, getter\n    }\n\n    public static void main(String[] args) {\n        // create objects and print "Mia -> COMPSCI230"\n    }\n}`,
      expectedOutput: 'Mia -> COMPSCI230',
      correctAnswer: '__code__',
      explanation: 'This checks that you can translate a tiny model into classes, constructors, getters, and object interaction.',
    },
    {
      id: 'q18-7',
      type: 'multiple-choice',
      prompt: 'Which UML diagram captures a snapshot of objects and their connections at a particular point in time?',
      choices: [
        { id: 'a', text: 'Use case diagram' },
        { id: 'b', text: 'Class diagram' },
        { id: 'c', text: 'Object diagram' },
        { id: 'd', text: 'Package diagram' },
      ],
      correctAnswer: 'c',
      explanation: 'An object diagram shows actual instances and links at a moment in time, not just class-level structure.',
    },
    {
      id: 'q18-8',
      type: 'multiple-choice',
      prompt: 'What does the multiplicity `0..1` mean on an association end?',
      choices: [
        { id: 'a', text: 'Exactly one' },
        { id: 'b', text: 'Zero or one' },
        { id: 'c', text: 'One or more' },
        { id: 'd', text: 'Zero or more' },
      ],
      correctAnswer: 'b',
      explanation: '`0..1` means the relationship is optional: there may be no instance, or there may be exactly one.',
    },
    {
      id: 'q18-9',
      type: 'true-false',
      prompt: 'A sequence diagram emphasizes time-ordered message passing between objects.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'Sequence diagrams focus on interaction order over time, rather than just static structure.',
    },
    {
      id: 'q18-10',
      type: 'multiple-choice',
      prompt: 'What is the key difference between aggregation and composition?',
      choices: [
        { id: 'a', text: 'Aggregation uses methods while composition uses fields' },
        { id: 'b', text: 'Composition is stronger ownership, often with dependent lifetime of the part' },
        { id: 'c', text: 'Aggregation only exists in sequence diagrams' },
        { id: 'd', text: 'There is no difference' },
      ],
      correctAnswer: 'b',
      explanation: 'Composition is a more restrictive form of aggregation: parts are typically not shared and often depend on the whole for their lifetime.',
    },
    {
      id: 'q18-11',
      type: 'true-false',
      prompt: 'A well-formed UML model means its different diagrams are semantically consistent with one another.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'The views should tell one coherent story about the same system.',
    },
    {
      id: 'q18-12',
      type: 'multiple-choice',
      prompt: 'Why might a method like `checkout(Borrower borrower)` deliberately avoid being public in a borrowing model?',
      choices: [
        { id: 'a', text: 'Because only static methods should be public' },
        { id: 'b', text: 'To support information hiding and prevent invalid external manipulation of links' },
        { id: 'c', text: 'Because UML forbids public methods' },
        { id: 'd', text: 'Because constructors should call it automatically' },
      ],
      correctAnswer: 'b',
      explanation: 'Restricting access helps ensure object relationships are established only through the intended collaboration flow.',
    },
  ],
};

export default module18;
