import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";

const MAX_CODE_LENGTH = 5_000;
const MAX_ROWS = 200;

// Each question context seeds a fresh in-memory SQLite database.
// contextId maps to a seed function.
function seedDatabase(db: Database.Database, contextId: string) {
  switch (contextId) {
    case "students": {
      db.exec(`
        CREATE TABLE students (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          age INTEGER,
          grade TEXT,
          score INTEGER
        );
        INSERT INTO students VALUES
          (1, 'Alice',   20, 'A', 92),
          (2, 'Bob',     19, 'B', 75),
          (3, 'Carol',   21, 'A', 88),
          (4, 'David',   20, 'C', 61),
          (5, 'Eve',     22, 'B', 79),
          (6, 'Frank',   19, 'A', 95),
          (7, 'Grace',   21, 'C', 58),
          (8, 'Hank',    20, 'B', 83);
      `);
      break;
    }
    case "products": {
      db.exec(`
        CREATE TABLE products (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          category TEXT,
          price REAL,
          stock INTEGER
        );
        INSERT INTO products VALUES
          (1, 'Laptop',        'Electronics', 999.99, 15),
          (2, 'Mouse',         'Electronics',  29.99, 80),
          (3, 'Desk',          'Furniture',   249.99,  8),
          (4, 'Chair',         'Furniture',   199.99, 12),
          (5, 'Notebook',      'Stationery',    4.99, 200),
          (6, 'Pen Set',       'Stationery',    9.99, 150),
          (7, 'Monitor',       'Electronics', 399.99, 20),
          (8, 'Keyboard',      'Electronics',  79.99, 35),
          (9, 'Lamp',          'Furniture',    49.99, 25),
          (10,'Sticky Notes',  'Stationery',    2.99, 300);
      `);
      break;
    }
    case "employees": {
      db.exec(`
        CREATE TABLE employees (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          department TEXT,
          salary INTEGER,
          manager_id INTEGER
        );
        INSERT INTO employees VALUES
          (1, 'Alice',   'Engineering', 95000, NULL),
          (2, 'Bob',     'Engineering', 82000, 1),
          (3, 'Carol',   'HR',          60000, NULL),
          (4, 'David',   'HR',          55000, 3),
          (5, 'Eve',     'Engineering', 90000, 1),
          (6, 'Frank',   'Marketing',   70000, NULL),
          (7, 'Grace',   'Marketing',   65000, 6),
          (8, 'Hank',    'Engineering', 78000, 1);
      `);
      break;
    }
    case "orders_customers": {
      db.exec(`
        CREATE TABLE customers (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          city TEXT
        );
        CREATE TABLE orders (
          id INTEGER PRIMARY KEY,
          customer_id INTEGER,
          total REAL,
          status TEXT,
          order_date TEXT
        );
        INSERT INTO customers VALUES
          (1, 'Alice',   'Auckland'),
          (2, 'Bob',     'Wellington'),
          (3, 'Carol',   'Christchurch'),
          (4, 'David',   'Auckland'),
          (5, 'Eve',     'Wellington');
        INSERT INTO orders VALUES
          (101, 1, 150.00, 'shipped',    '2024-01-15'),
          (102, 2, 320.50, 'pending',    '2024-02-10'),
          (103, 1, 89.99,  'delivered',  '2024-03-01'),
          (104, 3, 450.00, 'shipped',    '2024-03-15'),
          (105, 2, 75.00,  'pending',    '2024-04-01'),
          (106, 4, 200.00, 'delivered',  '2024-04-10');
      `);
      break;
    }
    case "sales": {
      db.exec(`
        CREATE TABLE sales (
          id INTEGER PRIMARY KEY,
          rep_name TEXT,
          region TEXT,
          amount REAL,
          sale_date TEXT
        );
        INSERT INTO sales VALUES
          (1, 'Alice', 'North', 1200.00, '2024-01-10'),
          (2, 'Bob',   'South',  850.00, '2024-01-15'),
          (3, 'Carol', 'North', 1500.00, '2024-02-01'),
          (4, 'Alice', 'North',  900.00, '2024-02-20'),
          (5, 'Bob',   'South', 1100.00, '2024-03-05'),
          (6, 'Carol', 'East',   750.00, '2024-03-12'),
          (7, 'David', 'East',   980.00, '2024-03-18'),
          (8, 'Alice', 'North',  620.00, '2024-04-02');
      `);
      break;
    }
    default:
      break;
  }
}

// Serialise a value — round floats to 4 sig figs to avoid JS float noise
function fmtValue(v: unknown): string {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number" && !Number.isInteger(v)) {
    return parseFloat(v.toPrecision(10)).toString();
  }
  return String(v);
}

// Serialise a row array as a readable table string
function formatResults(columns: string[], rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "(no rows returned)";

  const colWidths = columns.map((c) =>
    Math.max(c.length, ...rows.map((r) => fmtValue(r[c]).length))
  );

  const header = columns.map((c, i) => c.padEnd(colWidths[i])).join(" | ");
  const divider = colWidths.map((w) => "-".repeat(w)).join("-+-");
  const dataRows = rows.map((r) =>
    columns.map((c, i) => fmtValue(r[c]).padEnd(colWidths[i])).join(" | ")
  );

  return [header, divider, ...dataRows].join("\n");
}

export async function POST(req: NextRequest) {
  let sql: string;
  let contextId: string;

  try {
    const body = await req.json();
    sql = body.sql;
    contextId = body.contextId ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof sql !== "string" || sql.length > MAX_CODE_LENGTH) {
    return NextResponse.json({ error: "Invalid or oversized query" }, { status: 400 });
  }

  // Only allow SELECT (and CREATE/INSERT for the CREATE TABLE module)
  // Strip comments first so a leading -- doesn't block a valid query
  const firstStatement = sql.replace(/--[^\n]*/g, "").trim().toUpperCase();
  const isAllowed =
    firstStatement.startsWith("SELECT") ||
    firstStatement.startsWith("WITH") ||
    firstStatement.startsWith("CREATE") ||
    firstStatement.startsWith("INSERT");

  if (!isAllowed) {
    return NextResponse.json({
      error: "Only SELECT queries are allowed in the quiz. (UPDATE, DELETE, DROP etc. are disabled for safety.)",
    });
  }

  const db = new Database(":memory:");
  try {
    seedDatabase(db, contextId);

    // Strip single-line comments (-- ...) before splitting, so they don't
    // produce phantom "statements" that confuse the SELECT/exec logic.
    const stripped = sql.replace(/--[^\n]*/g, "");

    // Split on semicolons to support multi-statement setups (CREATE + INSERT + SELECT)
    const statements = stripped
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    let output = "";
    let lastIsSelect = false;

    for (const stmt of statements) {
      const upper = stmt.trimStart().toUpperCase();
      const isSelect = upper.startsWith("SELECT") || upper.startsWith("WITH");

      if (isSelect) {
        const prepared = db.prepare(stmt);
        const rows = prepared.all() as Record<string, unknown>[];
        const capped = rows.slice(0, MAX_ROWS);
        const columns = prepared.columns().map((c) => c.name);
        output = formatResults(columns, capped);
        if (rows.length > MAX_ROWS) {
          output += `\n(showing first ${MAX_ROWS} of ${rows.length} rows)`;
        }
        lastIsSelect = true;
      } else {
        db.exec(stmt + ";");
        lastIsSelect = false;
      }
    }

    if (!lastIsSelect) {
      output = output || "Statement executed successfully.";
    }

    return NextResponse.json({ output, error: "" });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ output: "", error: msg });
  } finally {
    db.close();
  }
}
