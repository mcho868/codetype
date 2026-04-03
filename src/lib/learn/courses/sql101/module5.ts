import type { Module } from '../python101/types';

const module5: Module = {
  id: 'sql-module-5',
  slug: '5',
  title: 'INSERT, UPDATE & DELETE',
  description: 'Modify data in tables using INSERT to add rows, UPDATE to change them, and DELETE to remove them.',
  icon: '✏️',
  color: 'from-orange-500 to-amber-400',
  locked: false,
  lessons: [
    {
      id: 'sql-lesson-5-1',
      title: 'INSERT INTO',
      content: `**INSERT INTO** adds new rows to a table.

**Basic syntax:**
\`\`\`
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
\`\`\`

Always specify the column names explicitly — this protects you if the table structure changes, and makes your intent clear.

**String values** use single quotes. **Numbers** do not:
\`\`\`
INSERT INTO students (name, age, grade)
VALUES ('Alice', 20, 'A');
\`\`\`

**Inserting multiple rows at once** (more efficient than separate statements):
\`\`\`
INSERT INTO colors (name)
VALUES ('Red'), ('Green'), ('Blue');
\`\`\`

**Auto-generated columns:** If a column uses AUTO_INCREMENT (like an id), you simply omit it — the database generates the value automatically:
\`\`\`
INSERT INTO users (name, email)
VALUES ('Bob', 'bob@example.com');
-- id is generated automatically
\`\`\``,
      codeExamples: [
        {
          language: 'sql',
          code: `-- Insert then immediately SELECT to verify
INSERT INTO students (name, age, grade, score)
VALUES ('Zara', 20, 'A', 97);

SELECT * FROM students WHERE name = 'Zara';`,
          caption: 'INSERT a new student then verify with SELECT',
        },
      ],
    },
    {
      id: 'sql-lesson-5-2',
      title: 'UPDATE and DELETE',
      content: `**UPDATE** modifies existing rows. The SET clause specifies the new values, and WHERE limits which rows are affected:
\`\`\`
UPDATE employees
SET salary = salary * 1.10
WHERE department = 'Engineering';
\`\`\`

You can update multiple columns in one statement:
\`\`\`
UPDATE users
SET email = 'new@example.com', updated_at = NOW()
WHERE id = 5;
\`\`\`

**WARNING:** An UPDATE without WHERE updates **every single row** in the table. Always write and verify your WHERE clause first.

---

**DELETE** removes rows from a table:
\`\`\`
DELETE FROM orders WHERE status = 'cancelled';
\`\`\`

Like UPDATE, a DELETE without WHERE removes **all rows** (the table structure remains, but it becomes empty). To remove the table entirely, use DROP TABLE.

**Safety tip:** Before running any UPDATE or DELETE, first run a SELECT with the same WHERE clause to preview exactly which rows will be affected.`,
      codeExamples: [
        {
          language: 'sql',
          code: `-- Update Bob's score then check the result
UPDATE students SET score = 90 WHERE name = 'Bob';
SELECT name, score FROM students WHERE name = 'Bob';

-- Delete a student then verify
DELETE FROM students WHERE name = 'Grace';
SELECT * FROM students;`,
          caption: 'UPDATE and DELETE — always use WHERE, then verify with SELECT',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'sql-q5-1',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'students',
      prompt: `The **students** table has columns: id, name, age, grade, score.\n\nInsert a new student named **'Zara'**, age **20**, grade **'A'**, score **97**.\n\nThen write a SELECT to retrieve all columns for students with grade 'A' to verify.`,
      starterCode: `-- Insert Zara then select all grade A students\n`,
      expectedOutput: `id | name  | age | grade | score
---+-------+-----+-------+------
1  | Alice | 20  | A     | 92
3  | Carol | 21  | A     | 88
6  | Frank | 19  | A     | 95
9  | Zara  | 20  | A     | 97`,
      correctAnswer: '__code__',
      explanation: "INSERT INTO students (name, age, grade, score) VALUES ('Zara', 20, 'A', 97); then SELECT * FROM students WHERE grade = 'A';",
      requiredPatterns: [
        { pattern: 'INSERT\\s+INTO\\s+students', hint: 'Use INSERT INTO students to add the new row.' },
        { pattern: "'Zara'", hint: "Include 'Zara' as the name value." },
        { pattern: 'SELECT', hint: 'Write a SELECT after the INSERT to verify.' },
      ],
    },
    {
      id: 'sql-q5-2',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'students',
      prompt: `The **students** table has columns: id, name, age, grade, score.\n\nUpdate **Bob's** score to **90**.\n\nThen SELECT name and score for all students to see the change.`,
      starterCode: `-- Update Bob's score then verify\n`,
      expectedOutput: `name  | score
------+------
Alice | 92
Bob   | 90
Carol | 88
David | 61
Eve   | 79
Frank | 95
Grace | 58
Hank  | 83`,
      correctAnswer: '__code__',
      explanation: "UPDATE students SET score = 90 WHERE name = 'Bob'; — always use WHERE to limit which rows are updated.",
      requiredPatterns: [
        { pattern: 'UPDATE\\s+students', hint: 'Use UPDATE students to modify rows.' },
        { pattern: 'SET\\s+score\\s*=\\s*90', hint: 'Use SET score = 90 to update the score.' },
        { pattern: "WHERE\\s+name\\s*=\\s*'Bob'", hint: "Use WHERE name = 'Bob' so only Bob is updated." },
      ],
    },
    {
      id: 'sql-q5-3',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'employees',
      prompt: `The **employees** table has columns: id, name, department, salary, manager_id.\n\nGive all **'Marketing'** employees a **15% pay raise**.\n\nThen SELECT name, department, salary for all employees to verify.`,
      starterCode: `-- Give Marketing a 15% raise then verify\n`,
      expectedOutput: `name  | department  | salary
------+-------------+-------
Alice | Engineering | 95000
Bob   | Engineering | 82000
Carol | HR          | 60000
David | HR          | 55000
Eve   | Engineering | 90000
Frank | Marketing   | 80500
Grace | Marketing   | 74750
Hank  | Engineering | 78000`,
      correctAnswer: '__code__',
      explanation: "UPDATE employees SET salary = salary * 1.15 WHERE department = 'Marketing'; — multiplying by 1.15 applies a 15% increase.",
      requiredPatterns: [
        { pattern: 'UPDATE\\s+employees', hint: 'Use UPDATE employees.' },
        { pattern: 'salary\\s*\\*\\s*1\\.15', hint: 'Multiply salary by 1.15 for a 15% raise.' },
        { pattern: "WHERE\\s+department\\s*=\\s*'Marketing'", hint: "Filter WHERE department = 'Marketing'." },
      ],
    },
    {
      id: 'sql-q5-4',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'students',
      prompt: `The **students** table has columns: id, name, age, grade, score.\n\nDelete all students who received a grade of **'C'**.\n\nThen SELECT all remaining students to verify.`,
      starterCode: `-- Delete grade C students then verify\n`,
      expectedOutput: `id | name  | age | grade | score
---+-------+-----+-------+------
1  | Alice | 20  | A     | 92
2  | Bob   | 19  | B     | 75
3  | Carol | 21  | A     | 88
5  | Eve   | 22  | B     | 79
6  | Frank | 19  | A     | 95
8  | Hank  | 20  | B     | 83`,
      correctAnswer: '__code__',
      explanation: "DELETE FROM students WHERE grade = 'C'; removes David (C, 61) and Grace (C, 58). Always verify with SELECT afterward.",
      requiredPatterns: [
        { pattern: 'DELETE\\s+FROM\\s+students', hint: 'Use DELETE FROM students to remove rows.' },
        { pattern: "WHERE\\s+grade\\s*=\\s*'C'", hint: "Use WHERE grade = 'C' to target only grade C students." },
      ],
    },
    {
      id: 'sql-q5-5',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'students',
      prompt: `The **students** table has columns: id, name, age, grade, score.\n\nInsert **two new students** in a single INSERT statement:\n- **'Ivan'**, age 21, grade 'B', score 80\n- **'Julia'**, age 20, grade 'A', score 91\n\nThen SELECT all students ordered by name.`,
      starterCode: `-- Insert two students then select all ordered by name\n`,
      expectedOutput: `id | name  | age | grade | score
---+-------+-----+-------+------
1  | Alice | 20  | A     | 92
2  | Bob   | 19  | B     | 75
3  | Carol | 21  | A     | 88
4  | David | 20  | C     | 61
5  | Eve   | 22  | B     | 79
6  | Frank | 19  | A     | 95
7  | Grace | 21  | C     | 58
8  | Hank  | 20  | B     | 83
9  | Ivan  | 21  | B     | 80
10 | Julia | 20  | A     | 91`,
      correctAnswer: '__code__',
      explanation: "INSERT INTO students (name, age, grade, score) VALUES ('Ivan', 21, 'B', 80), ('Julia', 20, 'A', 91); — multiple rows are separated by commas.",
      requiredPatterns: [
        { pattern: 'INSERT\\s+INTO\\s+students', hint: 'Use INSERT INTO students.' },
        { pattern: "'Ivan'", hint: "Include Ivan in your VALUES list." },
        { pattern: "'Julia'", hint: "Include Julia in your VALUES list." },
      ],
    },
    {
      id: 'sql-q5-6',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'products',
      prompt: `The **products** table has columns: id, name, category, price, stock.\n\nReduce the stock of **all 'Electronics'** products by **5** units.\n\nThen SELECT name, category, stock for all products to verify.`,
      starterCode: `-- Reduce Electronics stock by 5 then verify\n`,
      expectedOutput: `name         | category   | stock
-------------+------------+------
Laptop       | Electronics| 10
Mouse        | Electronics| 75
Desk         | Furniture  | 8
Chair        | Furniture  | 12
Notebook     | Stationery | 200
Pen Set      | Stationery | 150
Monitor      | Electronics| 15
Keyboard     | Electronics| 30
Lamp         | Furniture  | 25
Sticky Notes | Stationery | 300`,
      correctAnswer: '__code__',
      explanation: "UPDATE products SET stock = stock - 5 WHERE category = 'Electronics'; — subtracting from the current value reduces stock by 5 for each Electronics product.",
      requiredPatterns: [
        { pattern: 'UPDATE\\s+products', hint: 'Use UPDATE products.' },
        { pattern: 'stock\\s*=\\s*stock\\s*-\\s*5', hint: 'Use stock = stock - 5 to reduce by 5.' },
        { pattern: "WHERE\\s+category\\s*=\\s*'Electronics'", hint: "Filter WHERE category = 'Electronics'." },
      ],
    },
  ],
};

export default module5;
