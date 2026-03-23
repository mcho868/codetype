import type { Module } from './types';

const module9: Module = {
  id: 'module-9',
  slug: '9',
  title: 'Generics',
  description: 'Write type-safe, reusable classes and methods using Java generics and bounded type parameters.',
  icon: '🧩',
  color: 'from-purple-500 to-violet-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-9-1',
      title: 'What Are Generics?',
      content: `**Generics** let you write classes, interfaces, and methods that work with any type, while still being type-safe. Instead of working with \`Object\` (which requires casting), you parameterize the class with a type \`<T>\`.

Without generics:
\`\`\`java
// Old way — Object-based (not type safe)
ArrayList list = new ArrayList();
list.add("hello");
list.add(42);  // No error at compile time — but this is a bug!
String s = (String) list.get(1); // ClassCastException at runtime!
\`\`\`

With generics:
\`\`\`java
// Type-safe — compiler catches mistakes
ArrayList<String> list = new ArrayList<>();
list.add("hello");
// list.add(42);  // COMPILE ERROR — saves us from a bug!
String s = list.get(0);  // No cast needed
System.out.println(s);
\`\`\``,
      codeExamples: [
        {
          language: 'java',
          code: `public class Box<T> {
    private T item;

    public Box(T item) { this.item = item; }

    public T getItem() { return item; }

    public void setItem(T item) { this.item = item; }

    public void display() {
        System.out.println("Box contains: " + item);
    }
}

Box<String> stringBox = new Box<>("Hello");
stringBox.display();   // Box contains: Hello

Box<Integer> intBox = new Box<>(42);
intBox.display();      // Box contains: 42`,
          caption: 'A generic Box<T> class — T is replaced by any type when you create an instance',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-9-2',
      title: 'Generic Methods and Comparable<T>',
      content: `You can also make individual **methods** generic with \`<T>\`:
\`\`\`java
public static <T> void printArray(T[] array) { ... }
\`\`\`

**Comparable<T>** — the standard Java interface for comparing objects. Implementing \`Comparable<T>\` means your class provides a \`compareTo(T other)\` method. This is what \`Arrays.sort()\` requires.`,
      codeExamples: [
        {
          language: 'java',
          code: `// A generic method to find the max of two Comparable values
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

System.out.println(max(3, 7));             // 7
System.out.println(max("apple", "mango")); // mango

// Making your own class Comparable:
public class Student implements Comparable<Student> {
    private String name;
    private double gpa;

    public Student(String name, double gpa) {
        this.name = name;
        this.gpa = gpa;
    }

    @Override
    public int compareTo(Student other) {
        return Double.compare(this.gpa, other.gpa);
    }

    public String toString() { return name + " (" + gpa + ")"; }
}

Student[] students = {
    new Student("Alice", 3.8),
    new Student("Bob", 3.5),
    new Student("Carol", 3.9)
};
java.util.Arrays.sort(students);
for (Student s : students) System.out.println(s);
// Bob (3.5), Alice (3.8), Carol (3.9)`,
          caption: 'Generic max() method and implementing Comparable<T> to enable Arrays.sort()',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-9-3',
      title: 'Bounded Type Parameters',
      content: `**Bounded type parameters** restrict which types can be used with a generic: \`<T extends SomeClass>\` means T must be SomeClass or a subclass of it. This lets you call methods from SomeClass on T inside the generic code.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Item {
    protected String title;
    public Item(String title) { this.title = title; }
    public String getTitle() { return title; }
}

public class Book extends Item {
    public Book(String title) { super(title); }
}

public class DVD extends Item {
    public DVD(String title) { super(title); }
}

// Generic method — T must be Item or a subclass
public static <T extends Item> void printTitles(java.util.List<T> items) {
    for (T item : items) {
        System.out.println(item.getTitle());  // can call getTitle() because T extends Item
    }
}

// Generic method returning filtered list
public static <T extends Item> java.util.List<T> startsWithJ(java.util.List<T> items) {
    java.util.List<T> result = new java.util.ArrayList<>();
    for (T item : items) {
        if (item.getTitle().startsWith("J")) {
            result.add(item);
        }
    }
    return result;
}

java.util.List<Book> books = java.util.Arrays.asList(
    new Book("Java Basics"),
    new Book("Python 101"),
    new Book("JavaScript Guide")
);

printTitles(books);
System.out.println("--- Starting with J ---");
java.util.List<Book> jBooks = startsWithJ(books);
printTitles(jBooks);`,
          caption: 'Bounded type parameter <T extends Item> — lets you call Item methods on T inside the generic',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q9-1',
      type: 'multiple-choice',
      prompt: 'What does the T in `Box<T>` represent?',
      choices: [
        { id: 'a', text: 'A type called T' },
        { id: 'b', text: 'A placeholder for any type' },
        { id: 'c', text: 'A template file' },
        { id: 'd', text: 'A text type' },
      ],
      correctAnswer: 'b',
      explanation: 'T is a type parameter — a placeholder that gets replaced by a real type (like String or Integer) when you use the class.',
    },
    {
      id: 'q9-2',
      type: 'true-false',
      prompt: 'Using generics means you no longer need to cast objects when retrieving them from a collection.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'Generics encode the type, so `list.get(0)` returns the correct type without explicit casting.',
    },
    {
      id: 'q9-3',
      type: 'multiple-choice',
      prompt: 'What does `<T extends Comparable<T>>` mean?',
      choices: [
        { id: 'a', text: 'T must be the Comparable class' },
        { id: 'b', text: 'T must implement the Comparable interface' },
        { id: 'c', text: 'T extends another generic' },
        { id: 'd', text: 'T is a final type' },
      ],
      correctAnswer: 'b',
      explanation: '`extends` in a type bound means T must implement the interface (or extend the class). Comparable<T> is an interface.',
    },
    {
      id: 'q9-4',
      type: 'fill-in-blank',
      prompt: 'The method that Comparable<T> requires you to implement is ______.',
      correctAnswer: 'compareTo',
      explanation: '`compareTo(T other)` returns negative, zero, or positive to indicate less-than, equal, or greater-than.',
    },
    {
      id: 'q9-5',
      type: 'multiple-choice',
      prompt: 'What error does adding the wrong type to a generic collection cause?',
      choices: [
        { id: 'a', text: 'Runtime ClassCastException' },
        { id: 'b', text: 'Compile-time error' },
        { id: 'c', text: 'NullPointerException' },
        { id: 'd', text: 'StackOverflowError' },
      ],
      correctAnswer: 'b',
      explanation: 'Generics provide compile-time type safety — adding the wrong type is caught by the compiler before the program runs.',
    },
    {
      id: 'q9-6',
      type: 'true-false',
      prompt: 'A generic method must be in a generic class.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'false',
      explanation: 'Generic methods can be declared in any class using `<T>` before the return type. The class itself doesn\'t need to be generic.',
    },
    {
      id: 'q9-7',
      type: 'multiple-choice',
      prompt: 'Which interface must a class implement to be sortable with Arrays.sort()?',
      choices: [
        { id: 'a', text: 'Sortable' },
        { id: 'b', text: 'Comparable' },
        { id: 'c', text: 'Iterable' },
        { id: 'd', text: 'Serializable' },
      ],
      correctAnswer: 'b',
      explanation: 'Arrays.sort() requires elements to implement Comparable<T> so it knows how to compare them.',
    },
    {
      id: 'q9-8',
      type: 'multiple-choice',
      prompt: 'What does `<T extends Item>` mean in a bounded type parameter?',
      choices: [
        { id: 'a', text: 'T must be exactly Item' },
        { id: 'b', text: 'T must be Item or a subclass' },
        { id: 'c', text: 'Item extends T' },
        { id: 'd', text: 'T and Item are the same' },
      ],
      correctAnswer: 'b',
      explanation: '`<T extends Item>` means T can be Item itself or any class that inherits from Item.',
    },
    {
      id: 'q9-9',
      type: 'fill-in-blank',
      prompt: 'To create a type-safe list of Strings, you write: ArrayList<______> list = new ArrayList<>();',
      correctAnswer: 'String',
      explanation: 'Replacing T with String makes this an ArrayList that can only hold String objects.',
    },
    {
      id: 'q9-10',
      type: 'multiple-choice',
      prompt: 'Why is using Object instead of generics considered bad practice?',
      choices: [
        { id: 'a', text: 'Object has no methods' },
        { id: 'b', text: 'You need casts and lose compile-time type safety' },
        { id: 'c', text: 'Object is slower' },
        { id: 'd', text: 'Object cannot store integers' },
      ],
      correctAnswer: 'b',
      explanation: 'Without generics, you must cast every retrieval and the compiler cannot catch type mismatches — leading to runtime errors.',
    },
    {
      id: 'q9-11',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create a generic class Pair<A, B> that holds two values and has a method print() that prints them separated by ", ".\nCreate a Pair<String, Integer> with "Alice" and 30, then call print().\nExpected output:\nAlice, 30',
      starterCode: `public class Main {\n    static class Pair<A, B> {\n        A first;\n        B second;\n        Pair(A a, B b) { first = a; second = b; }\n        // Add print() method\n    }\n\n    public static void main(String[] args) {\n        Pair<String, Integer> p = new Pair<>("Alice", 30);\n        p.print();\n    }\n}`,
      expectedOutput: 'Alice, 30',
      correctAnswer: '__code__',
      explanation: 'public void print() { System.out.println(first + ", " + second); }',
    },
    {
      id: 'q9-12',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Write a generic method max(T a, T b) that returns the larger of two Comparable values.\nTest it by printing the max of 7 and 12, then the max of "apple" and "mango".\nExpected output:\n12\nmango',
      starterCode: `public class Main {\n    public static <T extends Comparable<T>> T max(T a, T b) {\n        // Return the larger value\n        return null;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(max(7, 12));\n        System.out.println(max("apple", "mango"));\n    }\n}`,
      expectedOutput: '12\nmango',
      correctAnswer: '__code__',
      explanation: 'return a.compareTo(b) >= 0 ? a : b; — compareTo returns positive if a > b, so we return a in that case.',
    },
  ],
};

export default module9;
