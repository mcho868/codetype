# COMPSCI 230 — Java OOP exam notes

This is a revision sheet for the parts of Java OOP that are easiest to mix up:

- arrays and ArrayList
- compile time and runtime
- interfaces and abstract classes
- nested classes
- overloads, overrides, and binding

For a tracing question, keep two facts separate:

1. the **declared type** of the reference
2. the **actual object** created by a new expression

The declared type controls what the compiler allows you to call. The actual object controls an overridden instance method when the program runs.

---

## 1. Compile time, runtime, and the JVM

The basic path is:

    Source.java --javac--> Source.class bytecode --JVM--> running program

### Compile time

The compiler checks the source before the program runs. It checks, among other things:

- syntax and brackets
- whether names exist
- whether types are compatible
- whether a method exists on the declared type
- access rules such as private
- which overloaded method signature is applicable

If there is a compile-time error, no normal program execution takes place.

### Runtime

At runtime the JVM executes the bytecode. It can fail because of the values or objects encountered while executing:

- NullPointerException
- ArithmeticException
- ArrayIndexOutOfBoundsException
- ClassCastException

Example:

~~~java
int denominator = 0;
int result = 10 / denominator;       // compiles; ArithmeticException at runtime

String name = null;
System.out.println(name.length());   // compiles; NullPointerException at runtime
~~~

The compiler can see that denominator is an int. It cannot reject every possible value stored in it. The JVM discovers the division by zero when that line executes.

### Declared type versus actual object

~~~java
class Animal {
    void speak() {
        System.out.println("animal");
    }
}

class Dog extends Animal {
    @Override
    void speak() {
        System.out.println("dog");
    }

    void fetch() {
        System.out.println("fetching");
    }
}

Animal pet = new Dog();
pet.speak();       // dog
// pet.fetch();    // compile-time error
~~~

pet is declared as Animal, so the compiler only knows the methods declared in Animal. The object is actually a Dog, so the overridden Dog.speak method runs.

This line is not legal:

~~~java
pet.fetch();
~~~

It does not matter that the object happens to be a Dog. The reference is typed as Animal, and Animal does not declare fetch.

If a downcast is needed, check the object first:

~~~java
if (pet instanceof Dog) {
    Dog dog = (Dog) pet;
    dog.fetch();
}
~~~

A cast can compile and still fail at runtime:

~~~java
Animal animal = new Cat();
Dog dog = (Dog) animal;       // compiles; ClassCastException at runtime
~~~

Cat and Dog may both extend Animal, so the cast is syntactically possible. The actual object is a Cat, so the JVM rejects the cast when it runs.

---

## 2. Array versus ArrayList

Both are indexed and both use zero-based indexes. The important difference is that an array has a fixed length, while an ArrayList can grow and shrink.

| | Array | ArrayList |
|---|---|---|
| Create | int array with new int[3] | ArrayList of Integer with new ArrayList |
| Number of elements | array.length | list.size() |
| Read element | array[index] | list.get(index) |
| Replace element | array[index] = value | list.set(index, value) |
| Add/remove | No resizing | add and remove |
| Element types | Primitives or reference types | Reference types only |
| Initial contents | int elements start at 0; references start at null | Empty until elements are added |

### Array

~~~java
int[] marks = new int[3];
marks[0] = 72;
marks[1] = 65;
marks[2] = 81;

System.out.println(marks[0]);       // 72
System.out.println(marks.length);  // 3
// marks[3] = 90;                  // runtime error
~~~

new int[3] creates exactly three positions: indexes 0, 1, and 2. The array cannot become length 4.

An array can hold objects as well:

~~~java
String[] names = new String[2];
System.out.println(names[0]);       // null
~~~

The array contains two String references. It does not contain two String objects yet.

### ArrayList

~~~java
import java.util.ArrayList;

ArrayList<Integer> marks = new ArrayList<>();
marks.add(72);                       // int is boxed to Integer
marks.add(65);
marks.add(81);

System.out.println(marks.get(0));    // 72
System.out.println(marks.size());    // 3

marks.set(1, 80);                    // replace index 1
marks.add(90);                       // size is now 4
marks.remove(0);                     // remove index 0
~~~

ArrayList<Integer> stores Integer objects. Java performs autoboxing when an int is added and unboxing when an int is required.

This is illegal:

~~~java
ArrayList<int> numbers;
~~~

Use the wrapper class:

~~~java
ArrayList<Integer> numbers;
~~~

Common wrappers include Integer, Double, Boolean, and Character.

### Common collection traps

1. An array uses array.length; there are no parentheses.
2. An ArrayList uses list.size(); size is a method.
3. Both use zero-based indexing.
4. new ArrayList<Integer>(10) has size 0. The 10 is an initial capacity request, not ten elements.
5. ArrayList is in java.util, so import it.

### remove(0) with ArrayList<Integer>

ArrayList<Integer> has both remove(int index) and remove(Object value).

~~~java
ArrayList<Integer> numbers = new ArrayList<>();
numbers.add(0);
numbers.add(1);

numbers.remove(0);                   // removes index 0
numbers.remove(Integer.valueOf(1));  // removes the value 1
~~~

Because the literal 0 is an int, the first call chooses remove(int). Use Integer.valueOf(0) when the intention is to remove the value 0.

---

## 3. Interface versus abstract class

Both can be reference types:

~~~java
Payable thing = new Invoice();
Employee worker = new SalariedEmployee("Mina");
~~~

The difference is what the type is meant to provide.

| Interface | Abstract class |
|---|---|
| Describes a capability or contract: “can be paid” | Describes a partial base class: “is an employee” |
| A class can implement several interfaces | A class can extend only one class |
| Use implements | Use extends |
| No instance constructor | Can have constructors |
| No ordinary instance fields | Can have instance fields |
| Can have constants, abstract methods, and modern default/static methods | Can have concrete and abstract methods |
| Cannot be instantiated directly | Cannot be instantiated while abstract |

Interface fields, if declared, are constants: public static final. They are not ordinary per-object fields.

### Example using both

~~~java
interface Payable {
    double amount();
}

abstract class Employee {
    private final String name;

    Employee(String name) {
        this.name = name;
    }

    public String name() {
        return name;
    }

    public abstract double weeklyPay();
}

class SalariedEmployee extends Employee implements Payable {
    SalariedEmployee(String name) {
        super(name);
    }

    @Override
    public double weeklyPay() {
        return 1200.0;
    }

    @Override
    public double amount() {
        return weeklyPay();
    }
}

Employee employee = new SalariedEmployee("Mina");
System.out.println(employee.name());                 // Mina
System.out.println(employee.weeklyPay());            // 1200.0
System.out.println(((Payable) employee).amount());  // 1200.0
~~~

SalariedEmployee:

- inherits the name field and constructor behaviour from Employee
- must provide the abstract weeklyPay method
- promises to provide the Payable.amount method

These are invalid:

~~~java
new Payable();                 // interface: no
new Employee("Mina");          // abstract class: no
~~~

### Choosing between them

Use an interface when classes that are otherwise unrelated need the same capability. Examples: Runnable, Comparable, and Payable.

Use an abstract class when subclasses belong to one family and should share state or implementation. Examples: Employee, Shape, and Animal.

---

## 4. Nested classes

A nested class is declared inside another class. Nesting is about organisation and access. It is not the same thing as inheritance.

| Form | Attached to | Creation clue |
|---|---|---|
| Static nested class | The outer class itself | Outer.Nested n = new Outer.Nested() |
| Non-static member class (inner class) | One outer object | outer.new Inner() |
| Local class | A method or block | Declared and used inside that method or block |
| Anonymous class | One expression | new Interface() { ... } |

### Example

~~~java
class Computer {
    private static final String MODEL = "lab PC";
    private int batteryPercent = 40;

    // Static nested class: no Computer object is needed.
    static class UsbPort {
        void printModel() {
            System.out.println(MODEL);       // outer static data
        }
    }

    // Non-static member class: tied to one Computer object.
    class Battery {
        void charge() {
            batteryPercent = 100;            // outer instance data
        }
    }

    void start() {
        // Local class: exists only inside this method.
        class StartupMessage {
            void print() {
                System.out.println("starting");
            }
        }

        new StartupMessage().print();

        // Anonymous class: one unnamed Runnable object.
        Runnable task = new Runnable() {
            @Override
            public void run() {
                System.out.println("background task");
            }
        };
        task.run();
    }
}

Computer.UsbPort port = new Computer.UsbPort();
Computer computer = new Computer();
Computer.Battery battery = computer.new Battery();
computer.start();
~~~

Remember:

- A static nested class has no automatic outer object. It can directly use outer static members.
- An inner class is tied to a particular outer object. It can use that object's instance members.
- A local class is only in scope inside its method or block.
- An anonymous class has no named class declaration. It is useful for a one-off implementation, such as an event listener or Runnable.
- A local or anonymous class can use a local variable only when that variable is final or effectively final.

---

## 5. Binding

Binding is the process of deciding which member a name or method call refers to.

| Feature | Binding | Decision based on |
|---|---|---|
| Overloaded methods | Compile-time / static | Declared types of the arguments |
| Overridden instance methods | Runtime / dynamic | Actual object created with new |
| Fields | Compile-time / static | Declared type of the reference |
| Static methods | Compile-time / static | Declared type; they are hidden, not overridden |
| private and final methods | No dynamic override | They cannot be overridden |

### Overloading: compile-time binding

Overloading means the same method name has different parameter lists in one class or inheritance hierarchy.

~~~java
class Printer {
    void print(Object value) {
        System.out.println("Object version");
    }

    void print(String value) {
        System.out.println("String version");
    }
}

Object message = "hello";
new Printer().print(message);      // Object version
new Printer().print("hello");      // String version
~~~

The first call uses print(Object) because message is declared as Object, even though the object stored in it is a String.

### Overriding: runtime binding

Overriding means a subclass supplies a new implementation of an inherited instance method.

~~~java
class Parent {
    String label = "Parent";

    void speak() {
        System.out.println("Parent method");
    }

    static void kind() {
        System.out.println("Parent static method");
    }
}

class Child extends Parent {
    String label = "Child";

    @Override
    void speak() {
        System.out.println("Child method");
    }

    static void kind() {
        System.out.println("Child static method");
    }
}

Parent value = new Child();
System.out.println(value.label);  // Parent
value.speak();                    // Child method
value.kind();                     // Parent static method
~~~

Why?

- label is a field. Fields are hidden, not overridden. The declared type is Parent.
- speak is an overridden instance method. The actual object is a Child.
- kind is static. Static methods are hidden, not dynamically dispatched. The declared type is Parent.

Use @Override. It makes the compiler check that the method really overrides a superclass or interface method.

### Combined trace

~~~java
class A {
    void f(Object value) {
        System.out.println("A Object");
    }

    void f(String value) {
        System.out.println("A String");
    }
}

class B extends A {
    @Override
    void f(Object value) {
        System.out.println("B Object");
    }
}

A reference = new B();
Object text = "hi";

reference.f(text);    // B Object
reference.f("hi");    // A String
~~~

Trace reference.f(text) in two stages:

1. text is declared as Object, so compile-time overload resolution selects f(Object).
2. reference refers to a B, and B overrides f(Object), so runtime dispatch selects B.f(Object).

For reference.f("hi"), the argument is known as a String at compile time, so f(String) is selected. B did not override f(String), so A.f(String) runs.

---

## 6. Exam tracing routine

When given a code fragment, use this order:

1. Write the declared type on the left of every important reference.
2. Write the actual class created after new.
3. Check whether the declared type contains the method being called. If not, it is a compile-time error.
4. If the call is overloaded, choose the signature using the declared argument types.
5. If the selected method is an overridden instance method, use the actual object to choose the implementation.
6. For fields and static methods, use the declared reference type.
7. Check indexes, null values, casts, integer division, and changes to collection size.

### Quick checks

**Question 1**

~~~java
int[] a = new int[2];
System.out.println(a.length);
~~~

Answer: 2.

**Question 2**

~~~java
ArrayList<Integer> a = new ArrayList<>();
a.add(7);
System.out.println(a.size());
~~~

Answer: 1, not the capacity of the backing storage.

**Question 3**

~~~java
Animal a = new Dog();
a.fetch();
~~~

Answer: compile-time error. fetch is not declared in Animal.

**Question 4**

~~~java
Animal a = new Dog();
a.speak();
~~~

Answer: Dog.speak, assuming Dog overrides speak.

**Question 5**

~~~java
Parent p = new Child();
System.out.println(p.label);
p.speak();
~~~

Answer: the parent field value, then the child method implementation.

---

## Final memory aid

- Array: length, brackets, fixed size.
- ArrayList: size(), get, set, add, remove, resizable.
- Compile time: “is this legal according to the declared types?”
- Runtime: “what happens for these actual values and objects?”
- Interface: a capability or contract.
- Abstract class: a partial shared base.
- Static nested class: no outer object.
- Inner class: attached to one outer object.
- Overload: compiler chooses.
- Override: runtime object chooses.
- Fields and static methods follow the declared type.
