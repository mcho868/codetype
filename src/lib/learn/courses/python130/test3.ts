import type { Module } from './types';
import { cr, mc, tf, funcCases, ms } from './authoring';

const test3: Module = {
  id: 'test-3',
  slug: 'test-3',
  title: 'Module 3 Test — Classes & Objects',
  description:
    'Transfer-level practice: special methods and composition — a Book holds an Author, with __eq__ and __str__.',
  icon: '📝',
  color: 'from-emerald-500 to-teal-400',
  locked: true,
  isMidterm: true,
  lessons: [],
  questions: [
    cr(
      't3-q1',
      'Implement `Author` with `__init__(self, name)`, `__eq__` (same class and same `name`), and `__str__` returning `Author(<name>)`.\n\nImplement `Book` with `__init__(self, title, author)` where `author` is an `Author` instance (**composition**). `__eq__` compares title and author; `__str__` returns `"<title>" by <author>` using the author\'s `__str__`.\n\nThe starter includes `test_book_catalog` — **do not edit it**.',
      `class Author:
    def __init__(self, name):
        pass

    def __eq__(self, other):
        pass

    def __str__(self):
        pass


class Book:
    def __init__(self, title, author):
        pass

    def __eq__(self, other):
        pass

    def __str__(self):
        pass


def test_book_catalog():
    ada = Author("Ada")
    ada2 = Author("Ada")
    bob = Author("Bob")
    b1 = Book("Notes", ada)
    b2 = Book("Notes", ada2)
    b3 = Book("Other", bob)
    return (b1 == b2, b1 == b3, str(b1), str(b3))
`,
      'function',
      funcCases(
        'test_book_catalog',
        [
          {
            id: 's1',
            description: 'Equality and string forms',
            args: [],
            expectedReturn: [true, false, '"Notes" by Author(Ada)', '"Other" by Author(Bob)'],
          },
        ],
        [
          {
            id: 'h1',
            args: [],
            expectedReturn: [true, false, '"Notes" by Author(Ada)', '"Other" by Author(Bob)'],
          },
        ]
      ),
      ms(
        `class Author:
    def __init__(self, name):
        self.name = name

    def __eq__(self, other):
        if not isinstance(other, Author):
            return False
        return self.name == other.name

    def __str__(self):
        return f"Author({self.name})"


class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    def __eq__(self, other):
        if not isinstance(other, Book):
            return False
        return self.title == other.title and self.author == other.author

    def __str__(self):
        return f'"{self.title}" by {self.author}'`,
        'Composition stores an Author inside Book rather than inheriting. __eq__ should check type before comparing fields; author equality delegates to Author.__eq__, so two Books match when titles and author names match.'
      )
    ),

    cr(
      't3-q2',
      'Implement `Team` with `__init__(self, name)` and `add_member(self, person)` appending to an internal list. Implement `Person` with `__init__(self, name, role)` and `__str__` returning `"Name (role)"`.\n\n`Team.__str__` must return `"<team>: m1; m2; ..."` joining member strings with `"; "`.\n\nThe starter includes `describe_team` — **do not edit it**.',
      `class Person:
    def __init__(self, name, role):
        pass

    def __str__(self):
        pass


class Team:
    def __init__(self, name):
        pass

    def add_member(self, person):
        pass

    def __str__(self):
        pass


def describe_team():
    t = Team("Alpha")
    t.add_member(Person("Kim", "dev"))
    t.add_member(Person("Lee", "qa"))
    return str(t)
`,
      'function',
      funcCases(
        'describe_team',
        [
          {
            id: 's1',
            description: 'Team string joins members',
            args: [],
            expectedReturn: 'Alpha: Kim (dev); Lee (qa)',
          },
        ],
        [
          {
            id: 'h1',
            args: [],
            expectedReturn: 'Alpha: Kim (dev); Lee (qa)',
          },
        ]
      ),
      ms(
        `class Person:
    def __init__(self, name, role):
        self.name = name
        self.role = role

    def __str__(self):
        return f"{self.name} ({self.role})"


class Team:
    def __init__(self, name):
        self.name = name
        self._members = []

    def add_member(self, person):
        self._members.append(person)

    def __str__(self):
        joined = "; ".join(str(m) for m in self._members)
        return f"{self.name}: {joined}"`,
        'Team composes a collection of Person objects. __str__ on Team delegates to each member\'s __str__, demonstrating how special methods chain through contained objects.'
      )
    ),

    cr(
      't3-q3',
      'Implement `Wallet` with private balance `_balance`, `deposit(amount)` (add positive amounts only), and `__eq__(self, other)` comparing balances between `Wallet` instances.\n\nThe starter includes `compare_wallets` — **do not edit it**.',
      `class Wallet:
    def __init__(self, balance=0):
        pass

    def deposit(self, amount):
        pass

    def __eq__(self, other):
        pass


def compare_wallets():
    w1 = Wallet(10)
    w2 = Wallet(10)
    w3 = Wallet(5)
    w1.deposit(5)
    return (w1 == w2, w1 == w3, w1._balance)
`,
      'function',
      funcCases(
        'compare_wallets',
        [
          { id: 's1', description: 'Equality after deposit', args: [], expectedReturn: [false, false, 15] },
        ],
        [
          { id: 'h1', args: [], expectedReturn: [false, false, 15] },
        ]
      ),
      ms(
        `class Wallet:
    def __init__(self, balance=0):
        self._balance = balance

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def __eq__(self, other):
        if not isinstance(other, Wallet):
            return False
        return self._balance == other._balance`,
        'Encapsulation keeps balance in _balance; __eq__ compares logical state. After w1 deposits 5, its balance is 15 so it no longer equals w2 (still 10).'
      )
    ),

    mc(
      't3-q4',
      'Given `p1 = Point(1, 2)` and `p2 = Point(1, 2)` with a correct `Point.__eq__`, what does `p1 is p2` evaluate to?',
      [
        { id: 'a', text: 'True — equal points are the same object' },
        { id: 'b', text: 'False — equal values can still be different objects' },
        { id: 'c', text: 'SyntaxError' },
        { id: 'd', text: 'Depends on __str__' },
      ],
      'b',
      ms(
        'False — is tests identity, == tests equality.',
        '__eq__ controls == but does not merge objects. Two separately constructed Points with the same coordinates are equal by value yet distinct in memory unless explicitly aliased.'
      )
    ),

    cr(
      't3-q5',
      'Implement `Shelf` that **composes** multiple `Book` objects (from the earlier pattern) in a list. Provide `add(self, book)` and `find_by_title(self, title)` returning the first matching `Book` or `null`.\n\nReuse this minimal `Book` stub (do not change its interface):\n\n```python\nclass Book:\n    def __init__(self, title):\n        self.title = title\n```\n\nThe starter includes `run_shelf` — **do not edit it**.',
      `class Book:
    def __init__(self, title):
        self.title = title


class Shelf:
    def __init__(self):
        pass

    def add(self, book):
        pass

    def find_by_title(self, title):
        pass


def run_shelf():
    s = Shelf()
    s.add(Book("A"))
    s.add(Book("B"))
    found = s.find_by_title("B")
    missing = s.find_by_title("Z")
    return (found.title if found else None, missing)
`,
      'function',
      funcCases(
        'run_shelf',
        [
          { id: 's1', description: 'Find existing and missing', args: [], expectedReturn: ['B', null] },
        ],
        [
          { id: 'h1', args: [], expectedReturn: ['B', null] },
        ]
      ),
      ms(
        `class Shelf:
    def __init__(self):
        self._books = []

    def add(self, book):
        self._books.append(book)

    def find_by_title(self, title):
        for book in self._books:
            if book.title == title:
                return book
        return None`,
        'Shelf aggregates Book objects — composition over inheritance. Linear scan for title is O(n); a dict keyed by title would be O(1) lookup if titles are unique.'
      )
    ),

    tf(
      't3-q6',
      'In Python, every instance method automatically receives the instance as its first argument because the dot call passes `self`.',
      'true',
      ms(
        'True — obj.method(x) desugars to Class.method(obj, x).',
        'That is why methods are defined with self as the first parameter. The caller never passes self explicitly; Python binds it from the object before the dot.'
      )
    ),
  ],
};

export default test3;
