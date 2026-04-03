import type { Module } from '../python101/types';

const module4: Module = {
  id: 'sql-module-4',
  slug: '4',
  title: 'JOINs',
  description: 'Combine data from multiple tables using INNER JOIN, LEFT JOIN, and RIGHT JOIN.',
  icon: '🔗',
  color: 'from-rose-500 to-pink-400',
  locked: false,
  lessons: [
    {
      id: 'sql-lesson-4-1',
      title: 'INNER JOIN',
      content: `Relational databases split data across multiple tables to avoid duplication. For example, an **orders** table stores \`customer_id\` but not the customer's name — the name lives in the **customers** table. **JOINs** combine columns from two tables into one result.

**INNER JOIN** returns only rows where there is a **matching value in both tables**. If a row in either table has no match, it is excluded.

\`\`\`
SELECT orders.id, customers.name, orders.total
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;
\`\`\`

- **ON** specifies the join condition — which columns must match
- Rows without a match in both tables are dropped

**Table Aliases** make JOIN queries shorter and easier to read:
\`\`\`
SELECT o.id, c.name, o.total
FROM orders AS o
INNER JOIN customers AS c ON o.customer_id = c.id;
\`\`\`

**Ambiguous column names:** When both tables have a column with the same name (like \`id\`), you must qualify it: \`orders.id\` or \`o.id\`.`,
      codeExamples: [
        {
          language: 'sql',
          code: `-- Join orders with customer names
SELECT o.id AS order_id, c.name AS customer, o.total
FROM orders AS o
INNER JOIN customers AS c ON o.customer_id = c.id;

-- Only show orders from Auckland customers
SELECT o.id, c.name, c.city, o.total
FROM orders AS o
INNER JOIN customers AS c ON o.customer_id = c.id
WHERE c.city = 'Auckland';`,
          caption: 'INNER JOIN — only matching rows from both tables are returned',
        },
      ],
    },
    {
      id: 'sql-lesson-4-2',
      title: 'LEFT JOIN and RIGHT JOIN',
      content: `**LEFT JOIN** returns **all rows from the left table**, plus matching data from the right table. If there is no match, the right-table columns are filled with **NULL**.

\`\`\`
SELECT c.name, o.id AS order_id
FROM customers AS c
LEFT JOIN orders AS o ON c.id = o.customer_id;
\`\`\`
This returns every customer — even those who have never placed an order. Their \`order_id\` will be NULL.

**Why use LEFT JOIN?**
Use it when you need all records from one table, regardless of whether they have related data in another. Common examples:
- All customers, including those with no orders
- All employees, including those with no manager
- All products, including those never ordered

**RIGHT JOIN** is the mirror — it returns all rows from the right table. In practice, most developers rewrite RIGHT JOINs as LEFT JOINs by swapping the table order, since LEFT JOIN is more intuitive.

**Counting with LEFT JOIN:**
\`\`\`
SELECT c.name, COUNT(o.id) AS order_count
FROM customers AS c
LEFT JOIN orders AS o ON c.id = o.customer_id
GROUP BY c.id, c.name;
\`\`\`
\`COUNT(o.id)\` counts non-NULL order IDs — customers with no orders get 0.`,
      codeExamples: [
        {
          language: 'sql',
          code: `-- All customers with their orders (NULL if no order)
SELECT c.name, o.id AS order_id, o.total
FROM customers AS c
LEFT JOIN orders AS o ON c.id = o.customer_id;

-- Count orders per customer (0 for those with no orders)
SELECT c.name, COUNT(o.id) AS order_count
FROM customers AS c
LEFT JOIN orders AS o ON c.id = o.customer_id
GROUP BY c.id, c.name
ORDER BY order_count DESC;`,
          caption: 'LEFT JOIN — all left-table rows, NULLs where no match exists',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'sql-q4-1',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'orders_customers',
      prompt: `You have two tables:\n- **customers**: id, name, city\n- **orders**: id, customer_id, total, status, order_date\n\nWrite a query using INNER JOIN to show each order's **id**, the **customer name**, and the order **total**.`,
      starterCode: `-- Join orders with customer names\n`,
      expectedOutput: "id  | name  | total\n----+-------+------\n101 | Alice | 150  \n102 | Bob   | 320.5\n103 | Alice | 89.99\n104 | Carol | 450  \n105 | Bob   | 75   \n106 | David | 200  ",
      correctAnswer: '__code__',
      explanation: "SELECT o.id, c.name, o.total FROM orders AS o INNER JOIN customers AS c ON o.customer_id = c.id; — INNER JOIN links each order to its customer via customer_id = id.",
      requiredPatterns: [
        { pattern: 'JOIN\\s+customers', hint: 'JOIN the customers table.' },
        { pattern: 'ON\\s+\\w+\\.customer_id\\s*=\\s*\\w+\\.id|ON\\s+\\w+\\.id\\s*=\\s*\\w+\\.customer_id', hint: 'Use ON orders.customer_id = customers.id to link the tables.' },
      ],
    },
    {
      id: 'sql-q4-2',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'orders_customers',
      prompt: `You have two tables:\n- **customers**: id, name, city\n- **orders**: id, customer_id, total, status, order_date\n\nWrite a query to show all orders placed by customers from **'Auckland'**.\n\nReturn the customer name, city, and order total.`,
      starterCode: `-- Orders from Auckland customers\n`,
      expectedOutput: "name  | city     | total\n------+----------+------\nAlice | Auckland | 150  \nAlice | Auckland | 89.99\nDavid | Auckland | 200  ",
      correctAnswer: '__code__',
      explanation: "JOIN the tables, then use WHERE c.city = 'Auckland' to filter to Auckland customers only.",
      requiredPatterns: [
        { pattern: 'JOIN', hint: 'Use JOIN to combine the orders and customers tables.' },
        { pattern: "Auckland", hint: "Filter for city = 'Auckland'." },
      ],
    },
    {
      id: 'sql-q4-3',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'orders_customers',
      prompt: `You have two tables:\n- **customers**: id, name, city\n- **orders**: id, customer_id, total, status, order_date\n\nWrite a query using LEFT JOIN to show **all customers** and any orders they have placed.\n\nReturn customer name and order id. Customers with no orders should appear with NULL for order id.`,
      starterCode: `-- All customers with their orders (include those with no orders)\n`,
      expectedOutput: "name  | id  \n------+-----\nAlice | 101 \nAlice | 103 \nBob   | 102 \nBob   | 105 \nCarol | 104 \nDavid | 106 \nEve   | NULL",
      correctAnswer: '__code__',
      explanation: "SELECT c.name, o.id FROM customers AS c LEFT JOIN orders AS o ON c.id = o.customer_id; — LEFT JOIN keeps all customers, Eve has no orders so her order id is NULL.",
      requiredPatterns: [
        { pattern: 'LEFT\\s+JOIN', hint: 'Use LEFT JOIN to keep all customers even with no orders.' },
      ],
    },
    {
      id: 'sql-q4-4',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'orders_customers',
      prompt: `You have two tables:\n- **customers**: id, name, city\n- **orders**: id, customer_id, total, status, order_date\n\nWrite a query to show each customer's name and their **total number of orders** (including 0 for customers with no orders).\n\nAlias the count as **order_count**. Sort by order_count descending.`,
      starterCode: `-- Order count per customer\n`,
      expectedOutput: "name  | order_count\n------+------------\nAlice | 2          \nBob   | 2          \nCarol | 1          \nDavid | 1          \nEve   | 0          ",
      correctAnswer: '__code__',
      explanation: "SELECT c.name, COUNT(o.id) AS order_count FROM customers AS c LEFT JOIN orders AS o ON c.id = o.customer_id GROUP BY c.id, c.name ORDER BY order_count DESC; — COUNT(o.id) returns 0 for customers with no orders because their o.id is NULL.",
      requiredPatterns: [
        { pattern: 'LEFT\\s+JOIN', hint: 'Use LEFT JOIN to include customers with no orders.' },
        { pattern: 'COUNT\\s*\\(\\s*o\\.id|COUNT\\s*\\(\\s*orders\\.id', hint: 'Use COUNT(o.id) — counting o.id returns 0 for NULL rows, unlike COUNT(*).' },
        { pattern: 'GROUP\\s+BY', hint: 'Use GROUP BY to group by each customer.' },
      ],
    },
    {
      id: 'sql-q4-5',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'orders_customers',
      prompt: `You have two tables:\n- **customers**: id, name, city\n- **orders**: id, customer_id, total, status, order_date\n\nWrite a query to find the **total amount spent** per customer.\n\nReturn customer name and total_spent, sorted by total_spent descending.`,
      starterCode: `-- Total spent per customer\n`,
      expectedOutput: "name  | total_spent\n------+------------\nCarol | 450        \nBob   | 395.5      \nAlice | 239.99     \nDavid | 200        ",
      correctAnswer: '__code__',
      explanation: "SELECT c.name, SUM(o.total) AS total_spent FROM customers AS c INNER JOIN orders AS o ON c.id = o.customer_id GROUP BY c.id, c.name ORDER BY total_spent DESC;",
      requiredPatterns: [
        { pattern: 'JOIN', hint: 'JOIN orders to customers.' },
        { pattern: 'SUM\\s*\\(', hint: 'Use SUM() to total the order amounts.' },
        { pattern: 'GROUP\\s+BY', hint: 'GROUP BY customer to get totals per person.' },
      ],
    },
    {
      id: 'sql-q4-6',
      type: 'code-challenge',
      language: 'sql',
      sqlContextId: 'orders_customers',
      prompt: `You have two tables:\n- **customers**: id, name, city\n- **orders**: id, customer_id, total, status, order_date\n\nWrite a query to find all **'pending'** orders with the customer's name.\n\nReturn customer name and order total, sorted by total descending.`,
      starterCode: `-- Pending orders with customer names\n`,
      expectedOutput: "name | total\n-----+------\nBob  | 320.5\nBob  | 75   ",
      correctAnswer: '__code__',
      explanation: "SELECT c.name, o.total FROM orders AS o INNER JOIN customers AS c ON o.customer_id = c.id WHERE o.status = 'pending' ORDER BY o.total DESC;",
      requiredPatterns: [
        { pattern: 'JOIN', hint: 'JOIN customers to get the customer name.' },
        { pattern: "pending", hint: "Filter WHERE status = 'pending'." },
      ],
    },
  ],
};

export default module4;
