import type { Module } from '../python101/types';

const module6: Module = {
  id: 'sql-module-6',
  slug: '6',
  title: 'CREATE TABLE & Data Types',
  description: 'Design tables with CREATE TABLE, choose appropriate data types, and use NULL and PRIMARY KEY constraints.',
  icon: '🏗️',
  color: 'from-teal-500 to-cyan-400',
  locked: false,
  lessons: [
    {
      id: 'sql-lesson-6-1',
      title: 'CREATE TABLE and Data Types',
      content: `**CREATE TABLE** defines a new table in the database. You specify each column's name, data type, and any constraints.

\`\`\`
CREATE TABLE students (
    id   INTEGER      PRIMARY KEY,
    name TEXT         NOT NULL,
    age  INTEGER,
    gpa  REAL
);
\`\`\`

**Common Data Types (SQLite):**

| Type | Use for |
|---|---|
| \`INTEGER\` | Whole numbers (age, count, id) |
| \`REAL\` | Decimal numbers (price, score) |
| \`TEXT\` | Any text (name, email, status) |
| \`NUMERIC\` | Flexible numeric (stores as int or real) |

Choosing the right data type matters — it affects storage size, what operations are valid, and how the database sorts values.

In SQLite you can also use \`AUTOINCREMENT\` on an INTEGER PRIMARY KEY to auto-generate IDs:
\`\`\`
id INTEGER PRIMARY KEY AUTOINCREMENT
\`\`\``,
      codeExamples: [
        {
          language: 'sql',
          code: `-- Create a products table and insert data
CREATE TABLE products (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     TEXT    NOT NULL,
    price    REAL    NOT NULL,
    stock    INTEGER DEFAULT 0
);

INSERT INTO products (name, price, stock)
VALUES ('Laptop', 999.99, 10),
       ('Mouse',   29.99, 50);

SELECT * FROM products;`,
          caption: 'CREATE TABLE, INSERT, then SELECT to verify',
        },
      ],
    },
    {
      id: 'sql-lesson-6-2',
      title: 'Constraints: NULL, PRIMARY KEY, UNIQUE',
      content: `**Constraints** enforce rules on the data in your table, preventing invalid or inconsistent data from being stored.

**NULL and NOT NULL:**
- By default, columns accept NULL (no value / unknown)
- \`NOT NULL\` makes a column required — the insert will fail if no value is provided
- \`NULL\` is not zero, not an empty string, not false — it means "no value"
- To check for NULL: use \`IS NULL\` or \`IS NOT NULL\` (never \`= NULL\`)

**PRIMARY KEY:**
- Uniquely identifies each row
- Cannot be NULL
- A table can have only one primary key

**UNIQUE:**
- Prevents duplicate values in a column
- Unlike PRIMARY KEY, a UNIQUE column can contain NULL
\`\`\`
email TEXT UNIQUE NOT NULL
\`\`\`

**DEFAULT:**
- Automatically fills a value if none is provided on insert
\`\`\`
status TEXT DEFAULT 'active'
\`\`\``,
      codeExamples: [
        {
          language: 'sql',
          code: `-- Table with constraints
CREATE TABLE users (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT    UNIQUE NOT NULL,
    email    TEXT    UNIQUE NOT NULL,
    role     TEXT    DEFAULT 'user'
);

INSERT INTO users (username, email)
VALUES ('alice', 'alice@example.com'),
       ('bob',   'bob@example.com');

SELECT * FROM users;

-- Find users with no role set (would be default 'user')
SELECT * FROM users WHERE role IS NOT NULL;`,
          caption: 'NOT NULL, UNIQUE, DEFAULT, and IS NULL/IS NOT NULL',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'sql-q6-1',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: '',
      prompt: `Create a table called **books** with these columns:\n- **id** (INTEGER, PRIMARY KEY)\n- **title** (TEXT, NOT NULL)\n- **author** (TEXT, NOT NULL)\n- **price** (REAL)\n\nThen insert **two books**:\n1. 'The Pragmatic Programmer', author 'Hunt', price 49.99\n2. 'Clean Code', author 'Martin', price 39.99\n\nFinally, SELECT all books to verify.`,
      starterCode: `-- Create the books table\n\n-- Insert two books\n\n-- Select all books\n`,
      expectedOutput: `id | title                     | author | price
---+---------------------------+--------+------
1  | The Pragmatic Programmer  | Hunt   | 49.99
2  | Clean Code                | Martin | 39.99`,
      correctAnswer: '__code__',
      explanation: "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author TEXT NOT NULL, price REAL); then INSERT two rows, then SELECT * FROM books;",
      requiredPatterns: [
        { pattern: 'CREATE\\s+TABLE\\s+books', hint: 'Use CREATE TABLE books to create the table.' },
        { pattern: 'PRIMARY\\s+KEY', hint: 'Mark the id column as PRIMARY KEY.' },
        { pattern: 'NOT\\s+NULL', hint: 'Add NOT NULL to the title and author columns.' },
        { pattern: 'INSERT\\s+INTO\\s+books', hint: 'Use INSERT INTO books to add the rows.' },
      ],
    },
    {
      id: 'sql-q6-2',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: '',
      prompt: `Create a table called **tasks** with:\n- **id** (INTEGER, PRIMARY KEY)\n- **title** (TEXT, NOT NULL)\n- **done** (INTEGER, DEFAULT 0)\n- **priority** (TEXT, DEFAULT 'medium')\n\nInsert these tasks:\n1. 'Write report' (use defaults for done and priority)\n2. 'Fix bug', done=1, priority='high'\n\nThen SELECT all tasks.`,
      starterCode: `-- Create tasks table with defaults\n\n-- Insert tasks\n\n-- Select all tasks\n`,
      expectedOutput: `id | title        | done | priority
---+--------------+------+---------
1  | Write report | 0    | medium
2  | Fix bug      | 1    | high`,
      correctAnswer: '__code__',
      explanation: "The DEFAULT keyword fills in a value automatically when none is provided. INSERT INTO tasks (title) VALUES ('Write report') — done and priority get their defaults.",
      requiredPatterns: [
        { pattern: 'CREATE\\s+TABLE\\s+tasks', hint: 'CREATE TABLE tasks.' },
        { pattern: 'DEFAULT', hint: 'Use DEFAULT for done and priority columns.' },
        { pattern: 'INSERT\\s+INTO\\s+tasks', hint: 'INSERT INTO tasks.' },
      ],
    },
    {
      id: 'sql-q6-3',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: '',
      prompt: `Create a table called **employees** with:\n- **id** (INTEGER, PRIMARY KEY)\n- **name** (TEXT, NOT NULL)\n- **department** (TEXT)\n- **salary** (REAL, NOT NULL)\n\nInsert 3 employees:\n1. id=1, 'Alice', 'Engineering', 95000\n2. id=2, 'Bob', 'Marketing', 70000\n3. id=3, 'Carol', NULL (no department), 60000\n\nThen SELECT all employees **where department IS NULL**.`,
      starterCode: `-- Create employees table\n\n-- Insert 3 employees (Carol has no department)\n\n-- Select employees with no department\n`,
      expectedOutput: `id | name  | department | salary
---+-------+------------+-------
3  | Carol | NULL       | 60000.0`,
      correctAnswer: '__code__',
      explanation: "INSERT Carol with NULL for department: VALUES (3, 'Carol', NULL, 60000). Then SELECT * FROM employees WHERE department IS NULL; — always use IS NULL, never = NULL.",
      requiredPatterns: [
        { pattern: 'CREATE\\s+TABLE\\s+employees', hint: 'CREATE TABLE employees.' },
        { pattern: 'IS\\s+NULL', hint: 'Use IS NULL (not = NULL) to check for missing values.' },
      ],
    },
    {
      id: 'sql-q6-4',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: '',
      prompt: `Create a table called **scores** with:\n- **id** (INTEGER, PRIMARY KEY)\n- **student** (TEXT, NOT NULL)\n- **subject** (TEXT, NOT NULL)\n- **mark** (REAL)\n\nInsert these scores:\n1. 1, 'Alice', 'Math', 92\n2. 2, 'Bob', 'Math', 75\n3. 3, 'Alice', 'Science', 88\n4. 4, 'Bob', 'Science', 91\n\nThen write a SELECT to show **each student's average mark**, aliased as avg_mark, sorted by avg_mark descending.`,
      starterCode: `-- Create scores table\n\n-- Insert 4 scores\n\n-- Average mark per student\n`,
      expectedOutput: `student | avg_mark
--------+---------
Alice   | 90.0
Bob     | 83.0`,
      correctAnswer: '__code__',
      explanation: "After creating and populating the table: SELECT student, AVG(mark) AS avg_mark FROM scores GROUP BY student ORDER BY avg_mark DESC;",
      requiredPatterns: [
        { pattern: 'CREATE\\s+TABLE\\s+scores', hint: 'CREATE TABLE scores.' },
        { pattern: 'GROUP\\s+BY\\s+student', hint: 'GROUP BY student to get per-student averages.' },
        { pattern: 'AVG\\s*\\(\\s*mark\\s*\\)', hint: 'Use AVG(mark) for the average.' },
      ],
    },
    {
      id: 'sql-q6-5',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: '',
      prompt: `Create a table called **inventory** with:\n- **id** (INTEGER, PRIMARY KEY)\n- **item** (TEXT, NOT NULL, UNIQUE)\n- **quantity** (INTEGER, DEFAULT 0)\n- **location** (TEXT)\n\nInsert:\n1. 1, 'Laptop', 15, 'Warehouse A'\n2. 2, 'Monitor', 8, 'Warehouse B'\n3. 3, 'Cable', 200, NULL\n\nThen SELECT all items **where location IS NOT NULL**, sorted by quantity descending.`,
      starterCode: `-- Create inventory table\n\n-- Insert items\n\n-- Select items with a location\n`,
      expectedOutput: `id | item    | quantity | location
---+---------+----------+-----------
1  | Laptop  | 15       | Warehouse A
2  | Monitor | 8        | Warehouse B`,
      correctAnswer: '__code__',
      explanation: "SELECT * FROM inventory WHERE location IS NOT NULL ORDER BY quantity DESC; — IS NOT NULL filters out the Cable row which has a NULL location.",
      requiredPatterns: [
        { pattern: 'UNIQUE', hint: 'Add UNIQUE to the item column.' },
        { pattern: 'IS\\s+NOT\\s+NULL', hint: 'Use IS NOT NULL to filter out rows with no location.' },
      ],
    },
    {
      id: 'sql-q6-6',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: '',
      prompt: `Build a small database from scratch:\n\n1. Create **categories** (id INTEGER PRIMARY KEY, name TEXT NOT NULL)\n2. Create **items** (id INTEGER PRIMARY KEY, name TEXT NOT NULL, category_id INTEGER, price REAL)\n3. Insert 2 categories: (1,'Food'), (2,'Tech')\n4. Insert 3 items: (1,'Apple',1,0.5), (2,'Laptop',2,999), (3,'Bread',1,2.5)\n5. SELECT item name and category name joined together, sorted by category name then item name.`,
      starterCode: `-- Create categories table\n\n-- Create items table\n\n-- Insert categories\n\n-- Insert items\n\n-- Join and select\n`,
      expectedOutput: `name   | name
-------+------
Apple  | Food
Bread  | Food
Laptop | Tech`,
      correctAnswer: '__code__',
      explanation: "SELECT i.name, c.name FROM items AS i INNER JOIN categories AS c ON i.category_id = c.id ORDER BY c.name, i.name; — this combines CREATE TABLE, INSERT, and JOIN skills.",
      requiredPatterns: [
        { pattern: 'CREATE\\s+TABLE\\s+categories', hint: 'CREATE TABLE categories first.' },
        { pattern: 'CREATE\\s+TABLE\\s+items', hint: 'CREATE TABLE items.' },
        { pattern: 'JOIN\\s+categories|JOIN\\s+items', hint: 'JOIN the two tables together.' },
      ],
    },
  ],
};

export default module6;
