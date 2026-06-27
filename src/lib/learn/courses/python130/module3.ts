import type { Module } from './types';
import { module3Questions } from './questions/module3Questions';


const module3: Module = {
  id: 'module-3',
  slug: '3',
  title: 'Classes & Objects',
  description: 'Build your own data types using Python classes, attributes, and methods.',
  icon: '🏗️',
  color: 'from-emerald-500 to-teal-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-3-1',
      title: 'Defining Classes',
      content: `So far you have used Python's built-in types: int, str, list, dict. But what if you need a type that represents a 2D point, a student record, or a playing card? **Classes** let you define your own types with custom data and custom behaviour. This is the foundation of **object-oriented programming (OOP)**.

A **class** is a blueprint. An **object** (also called an **instance**) is a specific thing built from that blueprint. The class Point is the blueprint; \`p = Point(3, 4)\` creates one specific point at (3, 4). You can create as many independent instances as you like from the same class.

Every class needs an **\`__init__\`** method (pronounced "dunder init" — dunder means double underscore). This special method is the **constructor**: it runs automatically whenever you create a new object. The first parameter is always **\`self\`**, which refers to the new object being created. Inside \`__init__\`, you set **instance attributes** with \`self.attribute_name = value\`. Each instance gets its own copy of these attributes.

**Instance attributes** (set with \`self.x\`) are specific to each object — \`p1.x\` and \`p2.x\` are completely independent. **Class attributes** are defined directly in the class body (not in a method) and are shared by all instances — useful for constants or counters. Methods are functions defined inside a class; they always receive \`self\` as the first argument, giving them access to the instance's data.

After creating an object, access its attributes with dot notation: \`p.x\`, \`p.y\`. Call its methods the same way: \`p.translate(1, 0)\`. Python automatically passes the object as \`self\` — you never write it yourself when calling a method.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Defining a Point class
class Point:
    def __init__(self, x, y):
        self.x = x    # instance attribute
        self.y = y    # instance attribute

    def translate(self, dx, dy):
        self.x += dx
        self.y += dy

    def distance_from_origin(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

# Create instances
p1 = Point(3, 4)
p2 = Point(0, 0)

print(p1.x, p1.y)                    # 3 4
print(p1.distance_from_origin())     # 5.0
p1.translate(1, 1)
print(p1.x, p1.y)                    # 4 5
print(p2.x, p2.y)                    # 0 0 — p2 is independent`,
          caption: 'A Point class with attributes and methods',
          editable: true,
        },
        {
          language: 'python',
          code: `# Class attributes vs instance attributes
class Dog:
    species = "Canis familiaris"   # class attribute — shared by ALL dogs

    def __init__(self, name, breed):
        self.name  = name    # instance attribute — unique to each dog
        self.breed = breed

    def bark(self):
        print(f"{self.name} says: Woof!")

dog1 = Dog("Rex",   "Labrador")
dog2 = Dog("Bella", "Poodle")

print(dog1.name)     # Rex
print(dog2.name)     # Bella
print(dog1.species)  # Canis familiaris
print(dog2.species)  # Canis familiaris — same class attribute
dog1.bark()
dog2.bark()`,
          caption: 'Class attribute shared across instances vs instance attributes unique to each',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-3-2',
      title: 'Methods & Special Methods',
      content: `Methods are functions that belong to a class. Every instance method takes \`self\` as its first parameter — this gives the method access to the object's data. When you call \`p.distance()\`, Python translates this to \`Point.distance(p)\` behind the scenes. You never pass self explicitly; Python does it for you.

Python's **special methods** (also called dunder methods or magic methods) let your objects work with Python's built-in syntax. They all have names surrounded by double underscores. The most useful ones to know:

**\`__str__(self)\`** — called by \`str(obj)\` and \`print(obj)\`. Should return a human-friendly string description of the object. Without it, printing your object shows something like \`<Point object at 0x7f...>\`, which is unhelpful.

**\`__repr__(self)\`** — called by \`repr(obj)\` and in the REPL. Should return a string that, ideally, could be used to recreate the object. Convention: \`repr(p)\` might return \`"Point(3, 4)"\`. If only \`__repr__\` is defined and not \`__str__\`, Python uses \`__repr__\` for both.

**\`__eq__(self, other)\`** — called when you use \`==\`. Without this, \`p1 == p2\` checks if they are the *same object in memory* (identity), not if they have equal values. Define \`__eq__\` to compare based on attributes.

You can also define \`__add__\` (+), \`__len__\` (len()), \`__lt__\` (<), and many more. This is called **operator overloading** — making your custom types work naturally with Python's operators. Well-designed special methods make your classes feel like first-class citizens of the language.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Special methods: __str__, __repr__, __eq__
class Fraction:
    def __init__(self, numerator, denominator):
        if denominator == 0:
            raise ValueError("Denominator cannot be zero")
        self.num = numerator
        self.den = denominator

    def __str__(self):
        return f"{self.num}/{self.den}"

    def __repr__(self):
        return f"Fraction({self.num}, {self.den})"

    def __eq__(self, other):
        # Cross-multiply to compare: a/b == c/d if a*d == b*c
        return self.num * other.den == other.num * self.den

    def add(self, other):
        new_num = self.num * other.den + other.num * self.den
        new_den = self.den * other.den
        return Fraction(new_num, new_den)

f1 = Fraction(1, 2)
f2 = Fraction(2, 4)
f3 = Fraction(1, 3)
print(f1)           # 1/2  (uses __str__)
print(repr(f1))     # Fraction(1, 2)
print(f1 == f2)     # True (1/2 == 2/4)
print(f1 == f3)     # False
print(f1.add(f3))   # 5/6`,
          caption: 'Fraction class with __str__, __repr__, and __eq__',
          editable: true,
        },
        {
          language: 'python',
          code: `# __add__ for operator overloading
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def magnitude(self):
        return (self.x**2 + self.y**2) ** 0.5

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)      # Vector(4, 6) — uses __add__
print(v1 * 3)       # Vector(3, 6) — uses __mul__
print((v1 + v2).magnitude())  # 7.211...`,
          caption: 'Operator overloading with __add__ and __mul__',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-3-3',
      title: 'Encapsulation & Design',
      content: `**Encapsulation** is the OOP principle of bundling data and the methods that operate on it together, and controlling access to that data. The idea: an object should manage its own state. External code should interact through well-defined methods, not poke directly at internal attributes. This makes it easier to change implementation details later without breaking code that uses the class.

Python uses a **naming convention** rather than strict access control. An attribute named with a single underscore prefix (\`_balance\`) signals "this is an implementation detail — don't access it directly from outside the class." It's not enforced by Python, but it's a strong social contract among Python programmers. Double underscores (\`__balance\`) trigger name mangling, making accidental access from outside slightly harder — useful but rarely necessary.

The **\`@property\`** decorator creates a "computed attribute" — something that looks like a regular attribute from the outside but is actually computed by a method. For example, a Rectangle might have a \`width\` and \`height\` attribute but an \`area\` property that computes \`width * height\` on demand. Properties also let you add validation: a \`@setter\` can check that a value is valid before storing it.

When designing a class, ask two questions: **what data does this object hold?** (those become instance attributes in \`__init__\`) and **what can this object do?** (those become methods). A class should have a single, clear responsibility — don't build a "god class" that does everything. Good class design is one of the most important skills in software engineering.

The BankAccount example illustrates all these ideas: the balance is internal state (prefixed with \`_balance\`). Deposits and withdrawals are methods that validate their inputs before modifying the state. This means it's impossible (via normal access) to accidentally set a negative balance or withdraw more than available.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Encapsulation: BankAccount with validation
class BankAccount:
    def __init__(self, owner, initial_balance=0):
        self.owner = owner
        self._balance = initial_balance   # _balance is "private"

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self._balance += amount
        print(f"Deposited £{amount:.2f}. Balance: £{self._balance:.2f}")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount
        print(f"Withdrew £{amount:.2f}. Balance: £{self._balance:.2f}")

    def get_balance(self):
        return self._balance

    def __str__(self):
        return f"Account({self.owner}, £{self._balance:.2f})"

acc = BankAccount("Alice", 100)
acc.deposit(50)
acc.withdraw(30)
print(acc)`,
          caption: 'BankAccount with encapsulated balance and validation',
          editable: true,
        },
        {
          language: 'python',
          code: `# @property for computed attributes and validation
class Circle:
    def __init__(self, radius):
        self.radius = radius  # calls the setter below

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self):
        import math
        return math.pi * self._radius ** 2

    @property
    def circumference(self):
        import math
        return 2 * math.pi * self._radius

c = Circle(5)
print(f"Area: {c.area:.2f}")
print(f"Circumference: {c.circumference:.2f}")
c.radius = 10          # calls setter — validates value
print(f"New area: {c.area:.2f}")
# c.radius = -1       # would raise ValueError`,
          caption: '@property for computed attributes and radius validation',
          editable: true,
        },
      ],
    },
  ],
  questions: module3Questions,
};

export default module3;
