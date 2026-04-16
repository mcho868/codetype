import type { Module } from '../python101/types';

const module6: Module = {
  id: 'ts-module-6',
  slug: '6',
  title: 'Generics, keyof & Utilities',
  description: 'Write reusable code with generics, index types with keyof, handle null safely, and use built-in utility types.',
  icon: '🧰',
  color: 'from-indigo-500 to-violet-400',
  locked: false,
  lessons: [
    {
      id: 'ts-lesson-6-1',
      title: 'Generics',
      content: `**Generics** allow you to write reusable, type-safe code that works with multiple types without losing type information.

Instead of typing a function to accept \`number\` or \`string\` specifically, you use a **type parameter** (conventionally named \`T\`, \`S\`, etc.) that acts as a placeholder.

The caller decides what T is when they use the function. TypeScript then checks that the usage is consistent.

Generics work in functions, classes, and type aliases.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `// Without generics — you'd need separate functions for each type
function wrapNumber(value: number): { value: number } { return { value }; }
function wrapString(value: string): { value: string } { return { value }; }

// With generics — one function handles all types
function wrap<T>(value: T): { value: T } {
  return { value };
}

console.log(wrap<string>("hello")); // { value: "hello" }
console.log(wrap<number>(42));      // { value: 42 }
console.log(wrap(true));            // TypeScript infers T = boolean`,
          caption: 'Generics avoid code duplication while staying type-safe',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Multiple type parameters
function createPair<S, T>(v1: S, v2: T): [S, T] {
  return [v1, v2];
}

console.log(createPair<string, number>("hello", 42)); // ["hello", 42]

// Generic class
class NamedValue<T> {
  private _value: T | undefined;

  constructor(private name: string) {}

  setValue(value: T): void {
    this._value = value;
  }

  getValue(): T | undefined {
    return this._value;
  }
}

const item = new NamedValue<number>("score");
item.setValue(100);
console.log(item.getValue()); // 100`,
          caption: 'Multiple type parameters and generic classes',
        },
      ],
    },
    {
      id: 'ts-lesson-6-2',
      title: 'keyof',
      content: `The **keyof** operator creates a union type of all property names of a given type.

If you have \`interface Person { name: string; age: number }\`, then \`keyof Person\` is \`"name" | "age"\`.

This is powerful for writing functions that work with any property of an object, while still being type-safe. Combined with generics, it prevents you from accessing properties that don't exist.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `interface Person {
  name: string;
  age: number;
}

// keyof Person = "name" | "age"
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const alice: Person = { name: "Alice", age: 30 };
console.log(getProperty(alice, "name")); // "Alice" — typed as string
console.log(getProperty(alice, "age"));  // 30 — typed as number

// getProperty(alice, "email"); // Error — "email" is not a key of Person`,
          caption: 'keyof combined with generics for type-safe property access',
        },
      ],
    },
    {
      id: 'ts-lesson-6-3',
      title: 'Null & Undefined Safety',
      content: `TypeScript has two special types for absent values: **null** (intentionally empty) and **undefined** (not yet set).

By default TypeScript is strict about these. Key operators:
- **Optional chaining (?.)** — safely accesses nested properties, returning \`undefined\` instead of throwing
- **Nullish coalescing (??)** — returns the right side if the left is \`null\` or \`undefined\`
- **Non-null assertion (!)** — tells TypeScript "I know this isn't null" (use sparingly)`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `// Union with null/undefined
let value: string | null | undefined = null;
value = "hello";
value = undefined;

// Optional chaining — safe access on possibly-undefined values
interface House { yard?: { sqft: number } }

function printYard(house: House) {
  const size = house.yard?.sqft; // undefined if yard doesn't exist
  console.log(size ?? "No yard");
}`,
          caption: 'Optional chaining and nullish coalescing',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Nullish coalescing ?? vs ||
// ?? only triggers on null/undefined, not on 0 or ""
function printMileage(mileage: number | null | undefined) {
  console.log(\`Mileage: \${mileage ?? "Not Available"}\`);
}

printMileage(null); // "Mileage: Not Available"
printMileage(0);    // "Mileage: 0"  ← ?? doesn't treat 0 as falsy!

// Non-null assertion
function getValue(): string | undefined { return "hello"; }
let v = getValue();
console.log(v!.length); // 5 — we assert it's not undefined`,
          caption: 'Nullish coalescing vs logical OR, and non-null assertion',
        },
      ],
    },
    {
      id: 'ts-lesson-6-4',
      title: 'Utility Types',
      content: `TypeScript ships with built-in **utility types** that transform existing types into new ones.

Most commonly used:
- **Partial<T>** — makes all properties optional
- **Required<T>** — makes all properties required
- **Readonly<T>** — makes all properties readonly
- **Record<K, V>** — creates an object type with keys K and values V
- **Pick<T, K>** — keeps only the listed properties from T
- **Omit<T, K>** — removes the listed properties from T
- **Exclude<T, U>** — removes types from a union
- **ReturnType<T>** — extracts the return type of a function`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `interface Point { x: number; y: number; }

// Partial — all fields become optional
let p: Partial<Point> = {};
p.x = 10; // fine — y is not required

// Required — all optional fields become required
interface Config { host?: string; port?: number; }
const cfg: Required<Config> = { host: "localhost", port: 3000 };

// Record — dictionary type
const scores: Record<string, number> = {
  Alice: 95,
  Bob: 82,
};`,
          caption: 'Partial, Required, and Record utility types',
        },
        {
          language: 'typescript',
          editable: true,
          code: `interface Person { name: string; age: number; email?: string; }

// Pick — keep only specific properties
const nameOnly: Pick<Person, "name"> = { name: "Alice" };

// Omit — remove specific properties
const noEmail: Omit<Person, "email"> = { name: "Bob", age: 30 };

// ReturnType — extract a function's return type
type GetUser = () => { id: number; name: string };
type User = ReturnType<GetUser>; // { id: number; name: string }`,
          caption: 'Pick, Omit, and ReturnType utility types',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'ts-q6-1',
      type: 'multiple-choice',
      prompt: 'What is the purpose of generics in TypeScript?',
      choices: [
        { id: 'a', text: 'To make all functions accept any type without type checking' },
        { id: 'b', text: 'To write reusable, type-safe code that works with multiple types' },
        { id: 'c', text: 'To define enums with multiple values' },
        { id: 'd', text: 'To create class hierarchies' },
      ],
      correctAnswer: 'b',
      explanation: 'Generics use type parameters (like T) as placeholders, allowing one function or class to work with different types while still being fully type-checked.',
    },
    {
      id: 'ts-q6-2',
      type: 'fill-in-blank',
      prompt: 'Complete the generic function signature:\n    function identity<T>(value: _____): T { return value; }',
      correctAnswer: 'T',
      explanation: 'The parameter type T matches the type parameter — so the function takes a T and returns a T.',
    },
    {
      id: 'ts-q6-3',
      type: 'multiple-choice',
      prompt: 'Given: interface Dog { name: string; breed: string }\nWhat is keyof Dog?',
      choices: [
        { id: 'a', text: 'string' },
        { id: 'b', text: '"name" | "breed"' },
        { id: 'c', text: '{ name: string; breed: string }' },
        { id: 'd', text: 'number' },
      ],
      correctAnswer: 'b',
      explanation: 'keyof creates a union of all property name strings. keyof Dog = "name" | "breed".',
    },
    {
      id: 'ts-q6-4',
      type: 'multiple-choice',
      prompt: 'What does the ?. operator do?',
      choices: [
        { id: 'a', text: 'Checks if a value is null and throws an error' },
        { id: 'b', text: 'Safely accesses a nested property, returning undefined instead of throwing' },
        { id: 'c', text: 'Marks a property as optional in an interface' },
        { id: 'd', text: 'Provides a fallback value if the left side is null' },
      ],
      correctAnswer: 'b',
      explanation: 'Optional chaining (?.) short-circuits and returns undefined if the value before it is null or undefined, instead of throwing a TypeError.',
    },
    {
      id: 'ts-q6-5',
      type: 'multiple-choice',
      prompt: 'What is the difference between ?? and ||?\n    mileage ?? "N/A"  vs  mileage || "N/A"',
      choices: [
        { id: 'a', text: 'They are identical' },
        { id: 'b', text: '?? only triggers on null/undefined; || also triggers on 0, "", and false' },
        { id: 'c', text: '|| only works with strings; ?? works with all types' },
        { id: 'd', text: '?? is only for TypeScript; || is JavaScript' },
      ],
      correctAnswer: 'b',
      explanation: '?? (nullish coalescing) only returns the right side if the left is null or undefined. || returns the right side for any falsy value, including 0 and "".',
    },
    {
      id: 'ts-q6-6',
      type: 'multiple-choice',
      prompt: 'Which utility type makes all properties of an interface optional?',
      choices: [
        { id: 'a', text: 'Required<T>' },
        { id: 'b', text: 'Readonly<T>' },
        { id: 'c', text: 'Partial<T>' },
        { id: 'd', text: 'Optional<T>' },
      ],
      correctAnswer: 'c',
      explanation: 'Partial<T> creates a new type where all properties of T are optional. Required<T> does the opposite.',
    },
    {
      id: 'ts-q6-7',
      type: 'multiple-choice',
      prompt: 'Given: interface User { name: string; age: number; email: string }\nWhat does Omit<User, "email"> produce?',
      choices: [
        { id: 'a', text: '{ email: string }' },
        { id: 'b', text: '{ name: string; age: number }' },
        { id: 'c', text: '{ name: string; age: number; email?: string }' },
        { id: 'd', text: '{ name: string }' },
      ],
      correctAnswer: 'b',
      explanation: 'Omit removes the specified keys from the type. Omit<User, "email"> gives { name: string; age: number }.',
    },
    {
      id: 'ts-q6-8',
      type: 'true-false',
      prompt: 'Record<string, number> describes an object where keys are strings and values are numbers.',
      correctAnswer: 'true',
      explanation: 'Record<K, V> creates an object type with key type K and value type V. Record<string, number> is a dictionary mapping string keys to number values.',
    },
    {
      id: 'ts-q6-code-1',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Write a generic function `identity<T>` that takes a value of type `T` and returns it. Call it with `"hello"` and print the result, then call it with `42` and print the result.\n\nExpected output:\n```\nhello\n42\n```',
      starterCode: `// Write a generic identity function\n`,
      expectedOutput: 'hello\n42',
      correctAnswer: '__code__',
      explanation: 'function identity<T>(value: T): T { return value; } console.log(identity("hello")); console.log(identity(42));',
      requiredPatterns: [
        { pattern: 'function\\s+identity\\s*<T>', hint: 'Define a generic function with <T> after the function name.' },
        { pattern: ':\\s*T', hint: 'The parameter and return type should both be T.' },
      ],
    },
    {
      id: 'ts-q6-code-2',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Use `Partial<T>` — define an interface `Config` with `host: string` and `port: number`. Create a variable `partial: Partial<Config>` with only `host: "localhost"`. Print the host.\n\nExpected output:\n```\nlocalhost\n```',
      starterCode: `// Define Config interface, then use Partial<Config>\n`,
      expectedOutput: 'localhost',
      correctAnswer: '__code__',
      explanation: 'interface Config { host: string; port: number; } const partial: Partial<Config> = { host: "localhost" }; console.log(partial.host);',
      requiredPatterns: [
        { pattern: 'interface\\s+Config', hint: 'Define a Config interface with host and port.' },
        { pattern: 'Partial<Config>', hint: 'Use Partial<Config> as the variable type.' },
      ],
    },
    {
      id: 'ts-q6-code-3',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Use optional chaining and nullish coalescing — declare a variable `user` typed as `{ name: string; address?: { city: string } } | null` and assign it `null`. Print the city using `?.` and `??` to fall back to `"Unknown"`.\n\nExpected output:\n```\nUnknown\n```',
      starterCode: `// Use ?. and ?? to safely access a nested property on a null value\nconst user: { name: string; address?: { city: string } } | null = null;\n`,
      expectedOutput: 'Unknown',
      correctAnswer: '__code__',
      explanation: 'console.log(user?.address?.city ?? "Unknown"); — ?. safely traverses null/undefined and ?? provides the fallback.',
      requiredPatterns: [
        { pattern: '\\?\\?', hint: 'Use the ?? nullish coalescing operator for the fallback value.' },
        { pattern: '\\?\\.', hint: 'Use optional chaining ?. to safely access the nested property.' },
      ],
    },
    {
      id: 'ts-q6-code-4',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Use `Record<string, number>` — create a `scores` object mapping `"Alice"` to `95` and `"Bob"` to `82`. Print Alice\'s score.\n\nExpected output:\n```\n95\n```',
      starterCode: `// Use Record<string, number> for a scores dictionary\n`,
      expectedOutput: '95',
      correctAnswer: '__code__',
      explanation: 'const scores: Record<string, number> = { Alice: 95, Bob: 82 }; console.log(scores["Alice"]);',
      requiredPatterns: [
        { pattern: 'Record<string,\\s*number>', hint: 'Annotate the variable with Record<string, number>.' },
      ],
    },
  ],
};

export default module6;
