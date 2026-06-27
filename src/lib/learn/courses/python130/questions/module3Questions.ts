import type { Question } from '../../python101/types';
import { cr, mc, tf, fib, funcCases, ms } from '../authoring';

export const module3Questions: Question[] = [
  cr(
    'm3-c1',
    'Implement a `Rectangle` class with `__init__(self, w, h)`, `area()`, and `perimeter()`.\n\nThe starter includes `test_rectangle` — **do not edit it**. Tests call that driver, which returns `[area, perimeter]`.',
    'class Rectangle:\n    def __init__(self, w, h):\n        # Your code here\n        pass\n\n    def area(self):\n        pass\n\n    def perimeter(self):\n        pass\n\n\ndef test_rectangle(w, h):\n    r = Rectangle(w, h)\n    return [r.area(), r.perimeter()]\n',
    'function',
    funcCases(
      'test_rectangle',
      [
        { id: 's1', description: '4 × 6', args: [4, 6], expectedReturn: [24, 20] },
        { id: 's2', description: '5 × 5 square', args: [5, 5], expectedReturn: [25, 20] },
      ],
      [
        { id: 'h1', args: [1, 1], expectedReturn: [1, 4] },
        { id: 'h2', args: [3, 10], expectedReturn: [30, 26] },
        { id: 'h3', args: [0, 5], expectedReturn: [0, 10] },
      ]
    ),
    ms(
      'class Rectangle:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n\n    def area(self):\n        return self.w * self.h\n\n    def perimeter(self):\n        return 2 * (self.w + self.h)',
      'Store width/height on self; area is w×h, perimeter is 2(w+h).'
    )
  ),
  cr(
    'm3-c2',
    'Implement `BankAccount` with `__init__(self, balance=0)`, `deposit(x)`, `withdraw(x)` (raise `ValueError` on overdraft), and `get_balance()`.\n\nThe starter includes `run_account` — **do not edit it**. It runs a list of ops like `[["deposit", 10], ["withdraw", 3]]` and records balances or `"error"` on `ValueError`.',
    'class BankAccount:\n    def __init__(self, balance=0):\n        # Your code here\n        pass\n\n    def deposit(self, amount):\n        pass\n\n    def withdraw(self, amount):\n        pass\n\n    def get_balance(self):\n        pass\n\n\ndef run_account(ops):\n    acc = BankAccount()\n    result = []\n    for op in ops:\n        kind = op[0]\n        if kind == "deposit":\n            acc.deposit(op[1])\n            result.append(acc.get_balance())\n        elif kind == "withdraw":\n            try:\n                acc.withdraw(op[1])\n                result.append(acc.get_balance())\n            except ValueError:\n                result.append("error")\n    return result\n',
    'function',
    funcCases(
      'run_account',
      [
        {
          id: 's1',
          description: 'Deposit and withdraw',
          args: [[['deposit', 10], ['withdraw', 3]]],
          expectedReturn: [10, 7],
        },
        {
          id: 's2',
          description: 'Overdraft raises error',
          args: [[['deposit', 10], ['withdraw', 3], ['withdraw', 20]]],
          expectedReturn: [10, 7, 'error'],
        },
      ],
      [
        { id: 'h1', args: [[['deposit', 5], ['deposit', 5]]], expectedReturn: [5, 10] },
        { id: 'h2', args: [[['withdraw', 1]]], expectedReturn: ['error'] },
        { id: 'h3', args: [[['deposit', 100], ['withdraw', 40], ['withdraw', 60]]], expectedReturn: [100, 60, 0] },
      ]
    ),
    ms(
      'class BankAccount:\n    def __init__(self, balance=0):\n        self._balance = balance\n\n    def deposit(self, amount):\n        self._balance += amount\n\n    def withdraw(self, amount):\n        if amount > self._balance:\n            raise ValueError("insufficient funds")\n        self._balance -= amount\n\n    def get_balance(self):\n        return self._balance',
      'Guard withdraw with a balance check; raise ValueError instead of allowing overdraft.'
    )
  ),
  cr(
    'm3-c3',
    'Implement `Counter` with `__init__`, `increment()`, a `count` attribute, and `__str__` returning `"Count: N"`.\n\nThe starter includes `test_counter` — **do not edit it**. It increments `steps` times and returns `(count, str(c))`.',
    'class Counter:\n    def __init__(self):\n        # Your code here\n        pass\n\n    def increment(self):\n        pass\n\n    def __str__(self):\n        pass\n\n\ndef test_counter(steps):\n    c = Counter()\n    for _ in range(steps):\n        c.increment()\n    return (c.count, str(c))\n',
    'function',
    funcCases(
      'test_counter',
      [
        { id: 's1', description: 'Three increments', args: [3], expectedReturn: [3, 'Count: 3'] },
        { id: 's2', description: 'No increments', args: [0], expectedReturn: [0, 'Count: 0'] },
      ],
      [
        { id: 'h1', args: [1], expectedReturn: [1, 'Count: 1'] },
        { id: 'h2', args: [5], expectedReturn: [5, 'Count: 5'] },
      ]
    ),
    ms(
      'class Counter:\n    def __init__(self):\n        self.count = 0\n\n    def increment(self):\n        self.count += 1\n\n    def __str__(self):\n        return f"Count: {self.count}"',
      'Track count on self; __str__ formats the human-readable label.'
    )
  ),
  cr(
    'm3-c4',
    'Implement `Point` with `__init__(self, x, y)`, `__eq__` (compare coordinates), and `__str__` returning `"Point(x, y)"`.\n\nThe starter includes `compare_points` — **do not edit it**. Tests call that driver.',
    'class Point:\n    def __init__(self, x, y):\n        # Your code here\n        pass\n\n    def __eq__(self, other):\n        pass\n\n    def __str__(self):\n        pass\n\n\ndef compare_points():\n    p1 = Point(1, 2)\n    p2 = Point(1, 2)\n    p3 = Point(3, 4)\n    return (p1 == p2, p1 == p3, str(p1), str(p3))\n',
    'function',
    funcCases(
      'compare_points',
      [
        {
          id: 's1',
          description: 'Equality and string form',
          args: [],
          expectedReturn: [true, false, 'Point(1, 2)', 'Point(3, 4)'],
        },
      ],
      [
        {
          id: 'h1',
          args: [],
          expectedReturn: [true, false, 'Point(1, 2)', 'Point(3, 4)'],
        },
      ]
    ),
    ms(
      'class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y\n\n    def __str__(self):\n        return f"Point({self.x}, {self.y})"',
      '__eq__ compares attribute values; __str__ controls print/str output.'
    )
  ),
  mc(
    'q3-1',
    'What is the purpose of the __init__ method in a Python class?',
    [
      { id: 'a', text: 'It is called when you print an object' },
      { id: 'b', text: 'It runs when a new instance is created and sets up the object\'s initial state' },
      { id: 'c', text: 'It defines the class attributes shared by all instances' },
      { id: 'd', text: 'It is only needed if the class has no methods' },
    ],
    'b',
    '__init__ is the constructor — called automatically when you create a new instance.'
  ),
  fib(
    'q3-4',
    'The first parameter of every instance method must be ___.',
    'self',
    '"self" refers to the instance the method was called on; Python passes it automatically.'
  ),
  mc(
    'q3-5',
    'Without defining __eq__, what does p1 == p2 check for two Point objects?',
    [
      { id: 'a', text: 'Whether p1.x == p2.x and p1.y == p2.y' },
      { id: 'b', text: 'Whether they are the exact same object in memory' },
      { id: 'c', text: 'It always returns True' },
      { id: 'd', text: 'It raises a TypeError' },
    ],
    'b',
    'Without __eq__, Python uses identity comparison — same object in memory, not equal values.'
  ),
  mc(
    'q3-7',
    'What does the _ (single underscore) prefix on an attribute name (e.g., self._balance) signal in Python?',
    [
      { id: 'a', text: 'The attribute is deleted automatically after use' },
      { id: 'b', text: 'Python will raise an error if external code accesses it' },
      { id: 'c', text: 'It is a convention meaning "this is a private implementation detail — do not access directly"' },
      { id: 'd', text: 'The attribute stores a negative number' },
    ],
    'c',
    'A single underscore is a convention signalling internal implementation — not enforced by Python.'
  ),
  mc(
    'q3-8',
    'What is the difference between a **class** and an **instance**?',
    [
      { id: 'a', text: 'They are two words for the same thing' },
      { id: 'b', text: 'A class is the blueprint; an instance is a specific object built from it' },
      { id: 'c', text: 'An instance is the blueprint; a class is the object' },
      { id: 'd', text: 'A class can only ever have one instance' },
    ],
    'b',
    'The class defines structure and behaviour; each instance (created by calling the class) holds its own attribute values.'
  ),
  mc(
    'q3-9',
    'Given `class Dog: ...`, how do you create a new instance?',
    [
      { id: 'a', text: 'new Dog()' },
      { id: 'b', text: 'Dog.create()' },
      { id: 'c', text: 'Dog()' },
      { id: 'd', text: 'make Dog' },
    ],
    'c',
    'Calling the class like a function — `Dog()` — creates an instance and runs `__init__`. Python has no `new` keyword.'
  ),
  mc(
    'q3-10',
    'Which method is called automatically by `str(obj)` or `print(obj)`?',
    [
      { id: 'a', text: '__init__' },
      { id: 'b', text: '__str__' },
      { id: 'c', text: '__eq__' },
      { id: 'd', text: '__name__' },
    ],
    'b',
    '__str__ defines the human-readable string form used by print() and str().'
  ),
  mc(
    'q3-11',
    'You write `p1 == p2` for two objects and define `__eq__` to compare attributes. What does `__eq__` let you control?',
    [
      { id: 'a', text: 'How objects are created' },
      { id: 'b', text: 'What "equal" means for your objects (value equality instead of identity)' },
      { id: 'c', text: 'How objects are printed' },
      { id: 'd', text: 'How objects are deleted' },
    ],
    'b',
    '__eq__ defines value-based equality, overriding the default identity (same-object) comparison.'
  ),
  mc(
    'q3-12',
    'An **instance attribute** (set with `self.x = ...` in `__init__`) differs from a **class attribute** because:',
    [
      { id: 'a', text: 'Instance attributes are shared by all objects of the class' },
      { id: 'b', text: 'Each instance has its own copy of an instance attribute' },
      { id: 'c', text: 'Class attributes cannot be read' },
      { id: 'd', text: 'There is no difference' },
    ],
    'b',
    'Instance attributes live on each object; class attributes are shared across all instances of the class.'
  ),
  tf(
    'q3-13',
    'A method defined inside a class must include `self` as its first parameter to access the instance it is called on.',
    'true',
    'Python passes the instance as the first argument automatically; the conventional name for that parameter is `self`.'
  ),
  tf(
    'q3-14',
    'Encapsulation means hiding internal state behind methods so callers interact through a controlled interface rather than touching attributes directly.',
    'true',
    'Encapsulation bundles data with the methods that manage it, exposing a clean interface and protecting internal invariants.'
  ),
  fib(
    'q3-15',
    'The method that runs automatically when an object is first created is called ___ (include the underscores).',
    '__init__',
    '__init__ is the constructor/initializer, invoked when you create an instance.'
  ),
];
