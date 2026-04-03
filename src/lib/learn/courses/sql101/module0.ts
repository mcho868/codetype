import type { Module } from '../python101/types';

const module0: Module = {
  id: 'sql-module-0',
  slug: '0',
  title: 'SELECT & FROM',
  description: 'Query data from tables using SELECT and FROM — the foundation of every SQL query.',
  icon: '📋',
  color: 'from-blue-500 to-sky-400',
  locked: false,
  lessons: [
    {
      id: 'sql-lesson-0-1',
      title: 'Your First SQL Query',
      content: `SQL (Structured Query Language) is the language used to communicate with relational databases. Virtually every application that stores data — from Instagram to banking systems — uses SQL under the hood.

The most fundamental SQL statement is **SELECT**. It retrieves data from a table and displays it as a result set.

The basic structure is:
\`\`\`
SELECT column1, column2 FROM table_name;
\`\`\`

- **SELECT** tells the database what you want to retrieve
- **FROM** tells the database which table to get it from
- The **semicolon (;)** ends the statement

To select every column at once, use the wildcard **\***:
\`\`\`
SELECT * FROM table_name;
\`\`\`

SQL keywords like SELECT and FROM are **not case-sensitive** — but by convention, they are written in UPPERCASE to make queries easier to read.`,
      codeExamples: [
        {
          language: 'sql',
          code: `-- Retrieve every column and every row from the students table
SELECT * FROM students;

-- Retrieve only the name and age columns
SELECT name, age FROM students;`,
          caption: 'The two most basic SELECT queries',
        },
      ],
    },
    {
      id: 'sql-lesson-0-2',
      title: 'Selecting Specific Columns',
      content: `Instead of retrieving every column with \`*\`, you can name exactly which columns you want. This is better practice because:

- It makes your query's intent clear
- It reduces the amount of data transferred
- It avoids surprises if the table structure changes

List column names separated by **commas** after SELECT:
\`\`\`
SELECT first_name, last_name, email FROM customers;
\`\`\`

**Column Aliases with AS**

You can give a column a temporary display name in the output using **AS**:
\`\`\`
SELECT name AS student_name, age AS years_old FROM students;
\`\`\`

The original column in the table is unchanged — AS only affects how it appears in the result.

**Arithmetic in SELECT**

You can also perform calculations directly in SELECT:
\`\`\`
SELECT name, price * 1.15 AS price_with_tax FROM products;
\`\`\`

This computes a new value for each row without modifying the table.`,
      codeExamples: [
        {
          language: 'sql',
          code: `-- Select specific columns from an orders table
SELECT order_id, customer_id, total FROM orders;

-- Use AS to give columns friendlier display names
SELECT
    name        AS student_name,
    score       AS result
FROM students;

-- Calculate a new column (10% bonus added)
SELECT
    name,
    score,
    score * 1.1 AS boosted_score
FROM students;`,
          caption: 'Selecting columns, using aliases, and calculating new values',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'sql-q0-1',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'students',
      prompt: `The **students** table has columns: id, name, age, grade, score.\n\nWrite a query to retrieve **all columns** from the students table.`,
      starterCode: `-- Write your query here\n`,
      expectedOutput: "id | name  | age | grade | score\n---+-------+-----+-------+------\n1  | Alice | 20  | A     | 92   \n2  | Bob   | 19  | B     | 75   \n3  | Carol | 21  | A     | 88   \n4  | David | 20  | C     | 61   \n5  | Eve   | 22  | B     | 79   \n6  | Frank | 19  | A     | 95   \n7  | Grace | 21  | C     | 58   \n8  | Hank  | 20  | B     | 83   ",
      correctAnswer: '__code__',
      explanation: 'SELECT * FROM students; — the * wildcard selects all columns, and FROM students specifies the table.',
      requiredPatterns: [
        { pattern: '\\*', hint: 'Use SELECT * to retrieve all columns.' },
        { pattern: 'FROM\\s+students', hint: 'Use FROM students to specify the table.' },
      ],
    },
    {
      id: 'sql-q0-2',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'students',
      prompt: `The **students** table has columns: id, name, age, grade, score.\n\nWrite a query to retrieve only the **name** and **score** columns.`,
      starterCode: `-- Retrieve only name and score\n`,
      expectedOutput: "name  | score\n------+------\nAlice | 92   \nBob   | 75   \nCarol | 88   \nDavid | 61   \nEve   | 79   \nFrank | 95   \nGrace | 58   \nHank  | 83   ",
      correctAnswer: '__code__',
      explanation: 'SELECT name, score FROM students; — list only the columns you need, separated by a comma.',
      requiredPatterns: [
        { pattern: 'SELECT\\s+name\\s*,\\s*score|SELECT\\s+score\\s*,\\s*name', hint: 'Select only the name and score columns (comma-separated).' },
      ],
    },
    {
      id: 'sql-q0-3',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'products',
      prompt: `The **products** table has columns: id, name, category, price, stock.\n\nWrite a query to retrieve the **name** and **price** columns from products.`,
      starterCode: `-- Retrieve name and price from products\n`,
      expectedOutput: "name         | price \n-------------+-------\nLaptop       | 999.99\nMouse        | 29.99 \nDesk         | 249.99\nChair        | 199.99\nNotebook     | 4.99  \nPen Set      | 9.99  \nMonitor      | 399.99\nKeyboard     | 79.99 \nLamp         | 49.99 \nSticky Notes | 2.99  ",
      correctAnswer: '__code__',
      explanation: 'SELECT name, price FROM products; selects just those two columns from every row in the products table.',
      requiredPatterns: [
        { pattern: 'FROM\\s+products', hint: 'Use FROM products to specify the table.' },
      ],
    },
    {
      id: 'sql-q0-4',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'students',
      prompt: `The **students** table has columns: id, name, age, grade, score.\n\nWrite a query that retrieves the **name** column and renames it to **student_name** using AS.`,
      starterCode: `-- Select name with an alias of student_name\n`,
      expectedOutput: "student_name\n------------\nAlice       \nBob         \nCarol       \nDavid       \nEve         \nFrank       \nGrace       \nHank        ",
      correctAnswer: '__code__',
      explanation: 'SELECT name AS student_name FROM students; — AS gives the column a temporary display name in the output.',
      requiredPatterns: [
        { pattern: 'AS\\s+student_name', hint: 'Use AS student_name to alias the column.' },
      ],
    },
    {
      id: 'sql-q0-5',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'products',
      prompt: `The **products** table has columns: id, name, category, price, stock.\n\nWrite a query that shows each product's **name** and its price with a 10% discount, aliased as **sale_price**.\n\nHint: multiply price by 0.9`,
      starterCode: `-- Show name and discounted price\n`,
      expectedOutput: "name         | sale_price\n-------------+-----------\nLaptop       | 899.991   \nMouse        | 26.991    \nDesk         | 224.991   \nChair        | 179.991   \nNotebook     | 4.491     \nPen Set      | 8.991     \nMonitor      | 359.991   \nKeyboard     | 71.991    \nLamp         | 44.991    \nSticky Notes | 2.691     ",
      correctAnswer: '__code__',
      explanation: 'SELECT name, price * 0.9 AS sale_price FROM products; — arithmetic expressions in SELECT are calculated per row, and AS gives the result a name.',
      requiredPatterns: [
        { pattern: 'price\\s*\\*\\s*0\\.9', hint: 'Multiply price by 0.9 to apply the 10% discount.' },
        { pattern: 'AS\\s+sale_price', hint: 'Use AS sale_price to name the calculated column.' },
      ],
    },
    {
      id: 'sql-q0-6',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'employees',
      prompt: `The **employees** table has columns: id, name, department, salary, manager_id.\n\nWrite a query to retrieve the **name** and **department** of all employees.`,
      starterCode: `-- Retrieve name and department from employees\n`,
      expectedOutput: "name  | department \n------+------------\nAlice | Engineering\nBob   | Engineering\nCarol | HR         \nDavid | HR         \nEve   | Engineering\nFrank | Marketing  \nGrace | Marketing  \nHank  | Engineering",
      correctAnswer: '__code__',
      explanation: 'SELECT name, department FROM employees; retrieves just those two columns for every employee.',
      requiredPatterns: [
        { pattern: 'FROM\\s+employees', hint: 'Use FROM employees to specify the table.' },
      ],
    },
  ],
};

export default module0;
