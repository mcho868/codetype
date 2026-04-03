import type { Module } from '../python101/types';

const module2: Module = {
  id: 'sql-module-2',
  slug: '2',
  title: 'ORDER BY & LIMIT',
  description: 'Sort query results with ORDER BY and control how many rows are returned with LIMIT.',
  icon: '↕️',
  color: 'from-amber-500 to-yellow-400',
  locked: false,
  lessons: [
    {
      id: 'sql-lesson-2-1',
      title: 'Sorting with ORDER BY',
      content: `By default, SQL makes **no guarantee** about the order rows are returned. If you need a specific order, you must use **ORDER BY**.

\`\`\`
SELECT * FROM employees ORDER BY salary;
\`\`\`

**ASC and DESC:**
- **ASC** (ascending) — smallest to largest, A to Z. This is the **default** if you don't specify.
- **DESC** (descending) — largest to smallest, Z to A.

\`\`\`
SELECT * FROM employees ORDER BY salary DESC;
\`\`\`

**Sorting by multiple columns:**

You can sort by more than one column. SQL sorts by the first column, then uses the second to break ties:
\`\`\`
SELECT * FROM products ORDER BY category ASC, price ASC;
\`\`\`
This sorts alphabetically by category, and within the same category, by price from lowest to highest.

**Clause order:** WHERE must come before ORDER BY:
\`\`\`
SELECT * FROM employees
WHERE department = 'IT'
ORDER BY salary DESC;
\`\`\``,
      codeExamples: [
        {
          language: 'sql',
          code: `-- Sort students from highest to lowest score
SELECT name, score FROM students ORDER BY score DESC;

-- Sort products alphabetically by name
SELECT name, price FROM products ORDER BY name ASC;

-- Sort by department, then by salary within each department
SELECT name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;`,
          caption: 'Sorting results with ORDER BY',
        },
      ],
    },
    {
      id: 'sql-lesson-2-2',
      title: 'Limiting Results with LIMIT and OFFSET',
      content: `**LIMIT** restricts how many rows a query returns. It is placed at the very end of the query:
\`\`\`
SELECT * FROM products ORDER BY price DESC LIMIT 5;
\`\`\`
This returns only the 5 most expensive products.

**The "Top N" pattern:**
Combining ORDER BY + LIMIT is one of the most common SQL patterns:
\`\`\`
-- Find the single cheapest product
SELECT * FROM products ORDER BY price ASC LIMIT 1;

-- Find the 10 most recent orders
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;
\`\`\`

**OFFSET — for pagination:**
OFFSET skips a number of rows before starting to return results:
\`\`\`
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 20;
\`\`\`
This skips the first 20 rows and returns rows 21–30. This is the standard approach for **pagination**.

**Full clause order:**
\`\`\`
SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT ... OFFSET ...
\`\`\``,
      codeExamples: [
        {
          language: 'sql',
          code: `-- Top 3 highest-paid employees
SELECT name, salary
FROM employees
ORDER BY salary DESC
LIMIT 3;

-- Page 2 of products (3 per page, skip first 3)
SELECT name, price
FROM products
ORDER BY id
LIMIT 3 OFFSET 3;

-- The single student with the lowest score
SELECT name, score FROM students
ORDER BY score ASC
LIMIT 1;`,
          caption: 'Using LIMIT and OFFSET for top-N queries and pagination',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'sql-q2-1',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'students',
      prompt: `The **students** table has columns: id, name, age, grade, score.\n\nWrite a query to retrieve all students, sorted by **score from highest to lowest**.\n\nReturn the name and score columns.`,
      starterCode: `-- Students sorted by score descending\n`,
      expectedOutput: "name  | score\n------+------\nFrank | 95   \nAlice | 92   \nCarol | 88   \nHank  | 83   \nEve   | 79   \nBob   | 75   \nDavid | 61   \nGrace | 58   ",
      correctAnswer: '__code__',
      explanation: 'SELECT name, score FROM students ORDER BY score DESC; — DESC sorts from largest to smallest.',
      requiredPatterns: [
        { pattern: 'ORDER\\s+BY\\s+score\\s+DESC', hint: 'Use ORDER BY score DESC to sort highest first.' },
      ],
    },
    {
      id: 'sql-q2-2',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'products',
      prompt: `The **products** table has columns: id, name, category, price, stock.\n\nWrite a query to show all products sorted **alphabetically by name** (A to Z).\n\nReturn name and price.`,
      starterCode: `-- Products sorted alphabetically by name\n`,
      expectedOutput: "name         | price \n-------------+-------\nChair        | 199.99\nDesk         | 249.99\nKeyboard     | 79.99 \nLamp         | 49.99 \nLaptop       | 999.99\nMonitor      | 399.99\nMouse        | 29.99 \nNotebook     | 4.99  \nPen Set      | 9.99  \nSticky Notes | 2.99  ",
      correctAnswer: '__code__',
      explanation: 'SELECT name, price FROM products ORDER BY name ASC; — ASC is the default but makes the intent clear.',
      requiredPatterns: [
        { pattern: 'ORDER\\s+BY\\s+name', hint: 'Use ORDER BY name to sort alphabetically.' },
      ],
    },
    {
      id: 'sql-q2-3',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'students',
      prompt: `The **students** table has columns: id, name, age, grade, score.\n\nWrite a query to find the **top 3 highest scoring** students.\n\nReturn name and score.`,
      starterCode: `-- Top 3 students by score\n`,
      expectedOutput: "name  | score\n------+------\nFrank | 95   \nAlice | 92   \nCarol | 88   ",
      correctAnswer: '__code__',
      explanation: 'SELECT name, score FROM students ORDER BY score DESC LIMIT 3; — sort highest first, then take only the first 3 rows.',
      requiredPatterns: [
        { pattern: 'ORDER\\s+BY\\s+score\\s+DESC', hint: 'Sort by score DESC to get highest first.' },
        { pattern: 'LIMIT\\s+3', hint: 'Use LIMIT 3 to return only 3 rows.' },
      ],
    },
    {
      id: 'sql-q2-4',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'products',
      prompt: `The **products** table has columns: id, name, category, price, stock.\n\nWrite a query to find the **single most expensive product**.\n\nReturn name and price.`,
      starterCode: `-- The most expensive product\n`,
      expectedOutput: "name   | price \n-------+-------\nLaptop | 999.99",
      correctAnswer: '__code__',
      explanation: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 1; — sort by price descending and take only the first row.',
      requiredPatterns: [
        { pattern: 'ORDER\\s+BY\\s+price\\s+DESC', hint: 'Sort by price DESC to put the most expensive first.' },
        { pattern: 'LIMIT\\s+1', hint: 'Use LIMIT 1 to return only the top row.' },
      ],
    },
    {
      id: 'sql-q2-5',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'employees',
      prompt: `The **employees** table has columns: id, name, department, salary, manager_id.\n\nWrite a query to list employees sorted by **department A-Z**, then by **salary highest to lowest** within each department.\n\nReturn name, department, salary.`,
      starterCode: `-- Sort by department then salary\n`,
      expectedOutput: "name  | department  | salary\n------+-------------+-------\nAlice | Engineering | 95000 \nEve   | Engineering | 90000 \nBob   | Engineering | 82000 \nHank  | Engineering | 78000 \nCarol | HR          | 60000 \nDavid | HR          | 55000 \nFrank | Marketing   | 70000 \nGrace | Marketing   | 65000 ",
      correctAnswer: '__code__',
      explanation: 'SELECT name, department, salary FROM employees ORDER BY department ASC, salary DESC; — multiple ORDER BY columns separated by commas.',
      requiredPatterns: [
        { pattern: 'ORDER\\s+BY\\s+department', hint: 'Start with ORDER BY department.' },
        { pattern: 'salary\\s+DESC', hint: 'Add salary DESC as the second sort column.' },
      ],
    },
    {
      id: 'sql-q2-6',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'products',
      prompt: `The **products** table has columns: id, name, category, price, stock.\n\nWrite a query to get the **2nd and 3rd cheapest products** (skip the cheapest one).\n\nReturn name and price, sorted by price ASC.\n\nHint: use LIMIT and OFFSET.`,
      starterCode: `-- 2nd and 3rd cheapest products\n`,
      expectedOutput: "name     | price\n---------+------\nNotebook | 4.99 \nPen Set  | 9.99 ",
      correctAnswer: '__code__',
      explanation: 'SELECT name, price FROM products ORDER BY price ASC LIMIT 2 OFFSET 1; — OFFSET 1 skips the cheapest row, then LIMIT 2 returns the next two.',
      requiredPatterns: [
        { pattern: 'OFFSET\\s+1', hint: 'Use OFFSET 1 to skip the first (cheapest) row.' },
        { pattern: 'LIMIT\\s+2', hint: 'Use LIMIT 2 to return exactly 2 rows.' },
      ],
    },
  ],
};

export default module2;
