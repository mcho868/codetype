import type { Module } from '../python101/types';

const module1: Module = {
  id: 'sql-module-1',
  slug: '1',
  title: 'WHERE & Filtering',
  description: 'Filter rows with WHERE, comparison operators, AND, OR, NOT, and IN.',
  icon: '🔍',
  color: 'from-violet-500 to-purple-400',
  locked: false,
  lessons: [
    {
      id: 'sql-lesson-1-1',
      title: 'Filtering with WHERE',
      content: `Without filtering, a SELECT query returns every row in the table. The **WHERE** clause lets you specify a condition — only rows where the condition is **true** are returned.

\`\`\`
SELECT * FROM employees WHERE salary > 50000;
\`\`\`

**Comparison Operators:**
- \`=\` — equal to
- \`<>\` or \`!=\` — not equal to
- \`<\` — less than
- \`>\` — greater than
- \`<=\` — less than or equal to
- \`>=\` — greater than or equal to

**String values** must be wrapped in single quotes:
\`\`\`
SELECT * FROM students WHERE grade = 'A';
\`\`\`

**Number values** do not use quotes:
\`\`\`
SELECT * FROM products WHERE price < 100;
\`\`\`

WHERE always comes **after FROM** and **before ORDER BY**.`,
      codeExamples: [
        {
          language: 'sql',
          code: `-- Find all products priced under $50
SELECT name, price FROM products WHERE price < 50;

-- Find employees NOT in the HR department
SELECT * FROM employees WHERE department <> 'HR';

-- Find students who passed (score 50 or above)
SELECT name, score FROM students WHERE score >= 50;`,
          caption: 'Basic WHERE filtering with comparison operators',
        },
      ],
    },
    {
      id: 'sql-lesson-1-2',
      title: 'AND, OR, NOT, IN, and BETWEEN',
      content: `You can combine multiple conditions in a single WHERE clause using logical operators.

**AND** — both conditions must be true:
\`\`\`
SELECT * FROM employees WHERE department = 'IT' AND salary > 70000;
\`\`\`

**OR** — at least one condition must be true:
\`\`\`
SELECT * FROM users WHERE city = 'Auckland' OR city = 'Wellington';
\`\`\`

**NOT** — negates a condition:
\`\`\`
SELECT * FROM employees WHERE NOT department = 'HR';
\`\`\`

**IN** — matches any value in a list (cleaner than multiple ORs):
\`\`\`
SELECT * FROM orders WHERE status IN ('pending', 'processing', 'shipped');
\`\`\`

**BETWEEN** — checks a range (inclusive on both ends):
\`\`\`
SELECT * FROM products WHERE price BETWEEN 10 AND 50;
\`\`\`
This is equivalent to \`price >= 10 AND price <= 50\`.

**Important:** A query can only have **one WHERE clause**. Combine multiple conditions with AND/OR inside it — never write two WHERE clauses.`,
      codeExamples: [
        {
          language: 'sql',
          code: `-- AND: employees in Engineering earning over 80k
SELECT name, salary
FROM employees
WHERE department = 'Engineering' AND salary > 80000;

-- IN: products in certain categories
SELECT name, category FROM products
WHERE category IN ('Electronics', 'Furniture');

-- BETWEEN: students with scores in the 70-90 range
SELECT name, score FROM students
WHERE score BETWEEN 70 AND 90;

-- NOT IN: exclude certain categories
SELECT name FROM products
WHERE category NOT IN ('Stationery');`,
          caption: 'Combining conditions with AND, IN, BETWEEN and NOT',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'sql-q1-1',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'students',
      prompt: `The **students** table has columns: id, name, age, grade, score.\n\nWrite a query to retrieve all students who received a grade of **'A'**.`,
      starterCode: `-- Find all students with grade A\n`,
      expectedOutput: "id | name  | age | grade | score\n---+-------+-----+-------+------\n1  | Alice | 20  | A     | 92   \n3  | Carol | 21  | A     | 88   \n6  | Frank | 19  | A     | 95   ",
      correctAnswer: '__code__',
      explanation: "SELECT * FROM students WHERE grade = 'A'; — string values need single quotes in SQL.",
      requiredPatterns: [
        { pattern: "WHERE\\s+grade\\s*=\\s*'A'", hint: "Use WHERE grade = 'A' to filter for grade A students." },
      ],
    },
    {
      id: 'sql-q1-2',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'products',
      prompt: `The **products** table has columns: id, name, category, price, stock.\n\nWrite a query to find all products with a price **less than 50**.`,
      starterCode: `-- Find products cheaper than 50\n`,
      expectedOutput: "id | name         | category    | price | stock\n---+--------------+-------------+-------+------\n2  | Mouse        | Electronics | 29.99 | 80   \n5  | Notebook     | Stationery  | 4.99  | 200  \n6  | Pen Set      | Stationery  | 9.99  | 150  \n9  | Lamp         | Furniture   | 49.99 | 25   \n10 | Sticky Notes | Stationery  | 2.99  | 300  ",
      correctAnswer: '__code__',
      explanation: 'SELECT * FROM products WHERE price < 50; — numbers do not need quotes in SQL.',
      requiredPatterns: [
        { pattern: 'WHERE\\s+price\\s*<\\s*50', hint: 'Use WHERE price < 50 to filter by price.' },
      ],
    },
    {
      id: 'sql-q1-3',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'employees',
      prompt: `The **employees** table has columns: id, name, department, salary, manager_id.\n\nWrite a query to find all employees in the **'Engineering'** department with a salary **greater than 85000**.\n\nReturn only the name and salary columns.`,
      starterCode: `-- Engineering employees earning over 85000\n`,
      expectedOutput: "name  | salary\n------+-------\nAlice | 95000 \nEve   | 90000 ",
      correctAnswer: '__code__',
      explanation: "SELECT name, salary FROM employees WHERE department = 'Engineering' AND salary > 85000; — AND requires both conditions to be true.",
      requiredPatterns: [
        { pattern: 'AND', hint: 'Use AND to combine both conditions.' },
        { pattern: 'salary\\s*>\\s*85000', hint: 'Filter for salary > 85000.' },
      ],
    },
    {
      id: 'sql-q1-4',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'products',
      prompt: `The **products** table has columns: id, name, category, price, stock.\n\nWrite a query to find all products in the **'Electronics'** OR **'Furniture'** category.\n\nReturn the name and category columns.`,
      starterCode: `-- Find Electronics or Furniture products\n`,
      expectedOutput: "name     | category   \n---------+------------\nLaptop   | Electronics\nMouse    | Electronics\nDesk     | Furniture  \nChair    | Furniture  \nMonitor  | Electronics\nKeyboard | Electronics\nLamp     | Furniture  ",
      correctAnswer: '__code__',
      explanation: "Use WHERE category IN ('Electronics', 'Furniture') or use OR: WHERE category = 'Electronics' OR category = 'Furniture'.",
      requiredPatterns: [
        { pattern: "Electronics", hint: "Filter for the Electronics category." },
        { pattern: "Furniture", hint: "Also include the Furniture category." },
      ],
    },
    {
      id: 'sql-q1-5',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'students',
      prompt: `The **students** table has columns: id, name, age, grade, score.\n\nWrite a query to find all students with a score **between 70 and 90** (inclusive).\n\nReturn the name and score columns.`,
      starterCode: `-- Students scoring between 70 and 90\n`,
      expectedOutput: "name  | score\n------+------\nBob   | 75   \nCarol | 88   \nEve   | 79   \nHank  | 83   ",
      correctAnswer: '__code__',
      explanation: 'SELECT name, score FROM students WHERE score BETWEEN 70 AND 90; — BETWEEN is inclusive on both ends.',
      requiredPatterns: [
        { pattern: 'BETWEEN\\s+70\\s+AND\\s+90|score\\s*>=\\s*70.*score\\s*<=\\s*90', hint: 'Use BETWEEN 70 AND 90, or use >= 70 AND <= 90.' },
      ],
    },
    {
      id: 'sql-q1-6',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'employees',
      prompt: `The **employees** table has columns: id, name, department, salary, manager_id.\n\nWrite a query to find all employees who are **NOT** in the 'HR' department.\n\nReturn the name and department columns.`,
      starterCode: `-- Employees not in HR\n`,
      expectedOutput: "name  | department \n------+------------\nAlice | Engineering\nBob   | Engineering\nEve   | Engineering\nFrank | Marketing  \nGrace | Marketing  \nHank  | Engineering",
      correctAnswer: '__code__',
      explanation: "SELECT name, department FROM employees WHERE department <> 'HR'; — use <> or != for not equal.",
      requiredPatterns: [
        { pattern: "department\\s*(<>|!=)\\s*'HR'|NOT\\s+department\\s*=\\s*'HR'|department\\s+NOT\\s+IN\\s*\\(\\s*'HR'\\s*\\)", hint: "Use <> 'HR' or != 'HR' to exclude the HR department." },
      ],
    },
  ],
};

export default module1;
