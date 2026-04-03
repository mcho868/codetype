import type { Module } from '../python101/types';

const module3: Module = {
  id: 'sql-module-3',
  slug: '3',
  title: 'Aggregate Functions',
  description: 'Summarise data with COUNT, SUM, AVG, MIN, MAX, and GROUP BY.',
  icon: '📊',
  color: 'from-green-500 to-emerald-400',
  locked: false,
  lessons: [
    {
      id: 'sql-lesson-3-1',
      title: 'Aggregate Functions',
      content: `**Aggregate functions** compute a single summary value from a set of rows. Instead of returning one row per record, they collapse many rows into one result.

The five core aggregate functions:

| Function | What it does |
|---|---|
| **COUNT(\*)** | Counts the number of rows |
| **SUM(col)** | Adds up all values in a column |
| **AVG(col)** | Calculates the arithmetic mean |
| **MIN(col)** | Finds the smallest value |
| **MAX(col)** | Finds the largest value |

**COUNT(\*) vs COUNT(column):**
- \`COUNT(*)\` counts every row, including those with NULL values
- \`COUNT(column)\` counts only non-NULL values in that column

**Important:** MAX(price) returns only the number (the highest price), not the full row. To get the full row of the most expensive product, use \`ORDER BY price DESC LIMIT 1\`.`,
      codeExamples: [
        {
          language: 'sql',
          code: `-- How many students are there?
SELECT COUNT(*) FROM students;

-- What is the total of all salaries?
SELECT SUM(salary) AS total_payroll FROM employees;

-- What is the average product price?
SELECT AVG(price) AS avg_price FROM products;

-- What are the lowest and highest scores?
SELECT MIN(score) AS lowest, MAX(score) AS highest
FROM students;`,
          caption: 'The five core aggregate functions in action',
        },
      ],
    },
    {
      id: 'sql-lesson-3-2',
      title: 'GROUP BY and HAVING',
      content: `Aggregate functions become much more powerful with **GROUP BY**. Instead of collapsing the whole table into one row, GROUP BY groups the rows first, then applies the aggregate to each group separately.

\`\`\`
SELECT department, COUNT(*) AS headcount
FROM employees
GROUP BY department;
\`\`\`
This returns one row per department — how many employees are in each.

**Rules for GROUP BY:**
Every column in your SELECT must either be in GROUP BY or inside an aggregate function. You cannot select a non-grouped, non-aggregated column.

**HAVING — filtering groups:**
WHERE filters individual rows **before** grouping. To filter groups **after** aggregation, use **HAVING**:
\`\`\`
-- Only show departments with more than 2 employees
SELECT department, COUNT(*) AS headcount
FROM employees
GROUP BY department
HAVING COUNT(*) > 2;
\`\`\`

**Full clause order:**
\`\`\`
SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT
\`\`\``,
      codeExamples: [
        {
          language: 'sql',
          code: `-- Count employees per department
SELECT department, COUNT(*) AS headcount
FROM employees
GROUP BY department;

-- Average score per grade
SELECT grade, AVG(score) AS avg_score
FROM students
GROUP BY grade
ORDER BY avg_score DESC;

-- Departments with more than 2 employees
SELECT department, COUNT(*) AS headcount
FROM employees
GROUP BY department
HAVING COUNT(*) > 2;`,
          caption: 'GROUP BY and HAVING for grouped aggregation',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'sql-q3-1',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'students',
      prompt: `The **students** table has columns: id, name, age, grade, score.\n\nWrite a query to count the **total number of students** in the table.\n\nThe result column should be called **total_students**.`,
      starterCode: `-- Count total students\n`,
      expectedOutput: "total_students\n--------------\n8             ",
      correctAnswer: '__code__',
      explanation: 'SELECT COUNT(*) AS total_students FROM students; — COUNT(*) counts every row.',
      requiredPatterns: [
        { pattern: 'COUNT\\s*\\(', hint: 'Use COUNT() to count rows.' },
        { pattern: 'AS\\s+total_students', hint: 'Alias the result as total_students.' },
      ],
    },
    {
      id: 'sql-q3-2',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'employees',
      prompt: `The **employees** table has columns: id, name, department, salary, manager_id.\n\nWrite a query to find the **total payroll** (sum of all salaries).\n\nAlias the result as **total_payroll**.`,
      starterCode: `-- Total of all salaries\n`,
      expectedOutput: "total_payroll\n-------------\n595000       ",
      correctAnswer: '__code__',
      explanation: 'SELECT SUM(salary) AS total_payroll FROM employees; — SUM adds up all values in the column.',
      requiredPatterns: [
        { pattern: 'SUM\\s*\\(\\s*salary\\s*\\)', hint: 'Use SUM(salary) to total all salaries.' },
        { pattern: 'AS\\s+total_payroll', hint: 'Alias the result as total_payroll.' },
      ],
    },
    {
      id: 'sql-q3-3',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'students',
      prompt: `The **students** table has columns: id, name, age, grade, score.\n\nWrite a query to find the **highest** and **lowest** scores.\n\nAlias them as **highest_score** and **lowest_score**.`,
      starterCode: `-- Highest and lowest scores\n`,
      expectedOutput: "highest_score | lowest_score\n--------------+-------------\n95            | 58          ",
      correctAnswer: '__code__',
      explanation: 'SELECT MAX(score) AS highest_score, MIN(score) AS lowest_score FROM students; — MAX and MIN can be used together in one query.',
      requiredPatterns: [
        { pattern: 'MAX\\s*\\(\\s*score\\s*\\)', hint: 'Use MAX(score) for the highest score.' },
        { pattern: 'MIN\\s*\\(\\s*score\\s*\\)', hint: 'Use MIN(score) for the lowest score.' },
      ],
    },
    {
      id: 'sql-q3-4',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'employees',
      prompt: `The **employees** table has columns: id, name, department, salary, manager_id.\n\nWrite a query to show the **number of employees per department**.\n\nReturn department and a count aliased as **headcount**, sorted by headcount descending.`,
      starterCode: `-- Count employees per department\n`,
      expectedOutput: "department  | headcount\n------------+----------\nEngineering | 4        \nHR          | 2        \nMarketing   | 2        ",
      correctAnswer: '__code__',
      explanation: 'SELECT department, COUNT(*) AS headcount FROM employees GROUP BY department ORDER BY headcount DESC; — GROUP BY creates one group per department, then COUNT(*) counts each group.',
      requiredPatterns: [
        { pattern: 'GROUP\\s+BY\\s+department', hint: 'Use GROUP BY department to group rows by department.' },
        { pattern: 'COUNT\\s*\\(', hint: 'Use COUNT(*) to count employees in each group.' },
      ],
    },
    {
      id: 'sql-q3-5',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'students',
      prompt: `The **students** table has columns: id, name, age, grade, score.\n\nWrite a query to show the **average score per grade**.\n\nReturn grade and avg_score (rounded is fine), sorted by grade A-Z.`,
      starterCode: `-- Average score per grade\n`,
      expectedOutput: "grade | avg_score  \n------+------------\nA     | 91.66666667\nB     | 79         \nC     | 59.5       ",
      correctAnswer: '__code__',
      explanation: 'SELECT grade, AVG(score) AS avg_score FROM students GROUP BY grade ORDER BY grade ASC; — GROUP BY grade creates one group per grade letter.',
      requiredPatterns: [
        { pattern: 'GROUP\\s+BY\\s+grade', hint: 'Use GROUP BY grade to group by grade letter.' },
        { pattern: 'AVG\\s*\\(\\s*score\\s*\\)', hint: 'Use AVG(score) to compute the average per group.' },
      ],
    },
    {
      id: 'sql-q3-6',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'products',
      prompt: `The **products** table has columns: id, name, category, price, stock.\n\nWrite a query to show the **total stock per category**, but only include categories with a total stock **greater than 100**.\n\nReturn category and total_stock.`,
      starterCode: `-- Categories with total stock over 100\n`,
      expectedOutput: "category    | total_stock\n------------+------------\nStationery  | 650        \nElectronics | 150        ",
      correctAnswer: '__code__',
      explanation: 'SELECT category, SUM(stock) AS total_stock FROM products GROUP BY category HAVING SUM(stock) > 100; — HAVING filters groups after aggregation (WHERE cannot be used with aggregate conditions).',
      requiredPatterns: [
        { pattern: 'GROUP\\s+BY\\s+category', hint: 'Use GROUP BY category.' },
        { pattern: 'HAVING', hint: 'Use HAVING (not WHERE) to filter aggregated groups.' },
        { pattern: 'SUM\\s*\\(\\s*stock\\s*\\)', hint: 'Use SUM(stock) to total the stock.' },
      ],
    },
  ],
};

export default module3;
