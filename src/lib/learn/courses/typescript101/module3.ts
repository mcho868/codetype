import type { Module } from '../python101/types';

const module3: Module = {
  id: 'ts-module-3',
  slug: '3',
  title: 'Aliases, Interfaces & Unions',
  description: 'Define reusable types with type aliases and interfaces, then combine them with union types.',
  icon: '🔗',
  color: 'from-teal-500 to-emerald-400',
  locked: false,
  lessons: [
    {
      id: 'ts-lesson-3-1',
      title: 'Type Aliases',
      content: `A **type alias** creates a new name for any type — primitives, objects, unions, or anything else.

You define one with the \`type\` keyword:
\`type AliasName = existingType\`

Type aliases don't create new types — they just give a convenient name to an existing shape. Once defined, you use the alias anywhere you'd use the original type.

They're especially useful for:
- Giving meaningful names to primitive types (\`type UserId = number\`)
- Defining complex object shapes once and reusing them
- Creating union or intersection types`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `type CarYear = number;
type CarType = string;
type CarModel = string;

type Car = {
  year: CarYear;
  type: CarType;
  model: CarModel;
};

const myCar: Car = {
  year: 2022,
  type: "SUV",
  model: "Tucson",
};`,
          caption: 'Type aliases for primitives and objects',
        },
      ],
    },
    {
      id: 'ts-lesson-3-2',
      title: 'Interfaces',
      content: `An **interface** defines the shape of an object — similar to a type alias, but with some key differences:

- Interfaces use the \`interface\` keyword
- Interfaces can be **extended** (inheritance between interfaces)
- Interfaces can be **merged** — if you declare the same interface twice, TypeScript merges them
- Type aliases can represent any type (primitives, unions); interfaces only describe objects

**When to use which?**
Prefer \`interface\` for object shapes, especially in libraries and public APIs where extensibility matters. Use \`type\` for unions, primitives, and complex computed types.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `interface Rectangle {
  height: number;
  width: number;
}

const rect: Rectangle = {
  height: 20,
  width: 10,
};`,
          caption: 'A basic interface',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Interfaces can extend other interfaces
interface Rectangle {
  height: number;
  width: number;
}

interface ColoredRectangle extends Rectangle {
  color: string;
}

const colored: ColoredRectangle = {
  height: 20,
  width: 10,
  color: "red", // must include all properties from both interfaces
};`,
          caption: 'Extending interfaces for inheritance',
        },
      ],
    },
    {
      id: 'ts-lesson-3-3',
      title: 'Union Types',
      content: `A **union type** allows a value to be one of several types. You write it with the \`|\` (pipe) operator between the types.

For example, \`string | number\` means the value can be a string OR a number.

Union types are extremely common in TypeScript. They let you write flexible functions that accept multiple types while still being type-checked.

**Narrowing:** When you have a union type, TypeScript requires you to check which type you're dealing with before calling type-specific methods. This process is called **type narrowing**.

**Nullish coalescing (??)**: When a value could be \`null\` or \`undefined\` (e.g. \`string | null\`), use \`??\` to provide a fallback. It only triggers on \`null\`/\`undefined\` — not on \`0\`, \`""\`, or \`false\`.

\`value ?? "fallback"\` — returns \`"fallback"\` only if \`value\` is \`null\` or \`undefined\`.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `// A function that accepts string or number
function printStatusCode(code: string | number) {
  console.log(\`My status code is \${code}.\`);
}

printStatusCode(404);    // works
printStatusCode("404");  // also works`,
          caption: 'Union type lets a parameter accept multiple types',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Type narrowing — check the type before using type-specific methods
function format(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // safe — we know it's a string here
  }
  return value.toFixed(2);     // safe — we know it's a number here
}

console.log(format("hello")); // "HELLO"
console.log(format(3.14159)); // "3.14"`,
          caption: 'Narrowing with typeof to use type-specific methods safely',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Nullish coalescing — fallback when value is null or undefined
let username: string | null = null;
console.log(username ?? "Guest"); // "Guest" — null triggers ??

username = "Alice";
console.log(username ?? "Guest"); // "Alice" — not null, no fallback

// ?? vs || : ?? does NOT treat 0 or "" as falsy
let score: number | null = 0;
console.log(score ?? "No score"); // 0  — zero is a valid value
console.log(score || "No score"); // "No score" — || treats 0 as falsy`,
          caption: '?? provides a fallback only for null/undefined — not 0 or ""',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'ts-q3-1',
      type: 'multiple-choice',
      prompt: 'What keyword creates a type alias in TypeScript?',
      choices: [
        { id: 'a', text: 'alias' },
        { id: 'b', text: 'type' },
        { id: 'c', text: 'interface' },
        { id: 'd', text: 'define' },
      ],
      correctAnswer: 'b',
      explanation: 'Type aliases are created with the type keyword: type UserId = number;',
    },
    {
      id: 'ts-q3-2',
      type: 'true-false',
      prompt: 'Interfaces in TypeScript can only describe object shapes — they cannot represent primitive types like string or number.',
      correctAnswer: 'true',
      explanation: 'Interfaces are for describing object structures. For primitives, unions, or other non-object types, use type aliases instead.',
    },
    {
      id: 'ts-q3-3',
      type: 'multiple-choice',
      prompt: 'How do you make one interface inherit properties from another?',
      choices: [
        { id: 'a', text: 'interface B implements A {}' },
        { id: 'b', text: 'interface B extends A {}' },
        { id: 'c', text: 'interface B inherits A {}' },
        { id: 'd', text: 'interface B: A {}' },
      ],
      correctAnswer: 'b',
      explanation: 'The extends keyword makes one interface inherit all properties from another: interface ColoredRect extends Rectangle {}.',
    },
    {
      id: 'ts-q3-4',
      type: 'fill-in-blank',
      prompt: 'Write the union type for a variable that can be a string or a number:\n    let id: string _____ number;',
      correctAnswer: '|',
      explanation: 'Union types are written with the | (pipe) operator: string | number.',
    },
    {
      id: 'ts-q3-5',
      type: 'multiple-choice',
      prompt: 'What is "type narrowing" in TypeScript?',
      choices: [
        { id: 'a', text: 'Reducing the size of a type definition' },
        { id: 'b', text: 'Checking which type a union value is before using type-specific methods' },
        { id: 'c', text: 'Converting a wide type like any to a more specific type' },
        { id: 'd', text: 'Removing properties from an object type' },
      ],
      correctAnswer: 'b',
      explanation: 'Type narrowing is when you use typeof, instanceof, or other checks to prove to TypeScript which specific type in a union you\'re dealing with.',
    },
    {
      id: 'ts-q3-6',
      type: 'true-false',
      prompt: 'Given: function f(x: string | number) { x.toUpperCase(); } — this code compiles without errors.',
      correctAnswer: 'false',
      explanation: 'TypeScript errors because toUpperCase() doesn\'t exist on number. You must narrow the type first with typeof x === "string".',
    },
    {
      id: 'ts-q3-7',
      type: 'multiple-choice',
      prompt: 'Which is a key advantage of interfaces over type aliases?',
      choices: [
        { id: 'a', text: 'Interfaces can represent primitive types' },
        { id: 'b', text: 'Interfaces support union types with |' },
        { id: 'c', text: 'Interfaces can be extended with the extends keyword' },
        { id: 'd', text: 'Interfaces are faster at compile time' },
      ],
      correctAnswer: 'c',
      explanation: 'Interfaces support inheritance with extends, and they can also be merged (declared multiple times and combined). Type aliases don\'t support declaration merging.',
    },
    {
      id: 'ts-q3-8',
      type: 'multiple-choice',
      prompt: 'What does this type mean?\n    type ID = string | number;',
      choices: [
        { id: 'a', text: 'ID is a type that is both a string and a number simultaneously' },
        { id: 'b', text: 'ID is a type that can be either a string or a number' },
        { id: 'c', text: 'ID converts between string and number automatically' },
        { id: 'd', text: 'ID is only valid when the value is a string' },
      ],
      correctAnswer: 'b',
      explanation: 'A union type (string | number) means the value can be one OR the other. A variable of type ID can hold a string or a number.',
    },
    {
      id: 'ts-q3-code-1',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Create a type alias `Point` for `{ x: number; y: number }`. Declare a variable `origin` of type `Point` with `x: 0` and `y: 0`. Print `x` and `y` on separate lines.\n\nExpected output:\n```\n0\n0\n```',
      starterCode: `// Define a type alias Point and use it\n`,
      expectedOutput: '0\n0',
      correctAnswer: '__code__',
      explanation: 'type Point = { x: number; y: number }; const origin: Point = { x: 0, y: 0 }; console.log(origin.x); console.log(origin.y);',
      requiredPatterns: [
        { pattern: '\\btype\\s+Point\\b', hint: 'Use the type keyword to create the Point alias.' },
        { pattern: ':\\s*Point\\b', hint: 'Annotate your variable with the Point type.' },
      ],
    },
    {
      id: 'ts-q3-code-2',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Define an interface `Animal` with a `name: string` property. Then define interface `Dog` that extends `Animal` and adds `breed: string`. Create a `Dog` and print its `name` and `breed` on separate lines.\n\nExpected output:\n```\nBuddy\nLabrador\n```',
      starterCode: `// Define Animal interface, then Dog extending Animal\n`,
      expectedOutput: 'Buddy\nLabrador',
      correctAnswer: '__code__',
      explanation: 'interface Animal { name: string } interface Dog extends Animal { breed: string } const d: Dog = { name: "Buddy", breed: "Labrador" };',
      requiredPatterns: [
        { pattern: 'interface\\s+Animal', hint: 'Define the Animal interface first.' },
        { pattern: 'extends\\s+Animal', hint: 'Use extends Animal in the Dog interface definition.' },
      ],
    },
    {
      id: 'ts-q3-code-3',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Write a function `describe` that accepts a parameter `id` of type `string | number`. If it is a string print `"Text: "` followed by the value uppercased; if a number print `"Number: "` followed by the value.\n\nCall `describe("hello")` then `describe(42)`.\n\nExpected output:\n```\nText: HELLO\nNumber: 42\n```',
      starterCode: `// Write describe() with a string | number parameter\n`,
      expectedOutput: 'Text: HELLO\nNumber: 42',
      correctAnswer: '__code__',
      explanation: 'function describe(id: string | number) { if (typeof id === "string") { console.log("Text: " + id.toUpperCase()); } else { console.log("Number: " + id); } }',
      requiredPatterns: [
        { pattern: 'string\\s*\\|\\s*number', hint: 'Use a union type string | number for the parameter.' },
        { pattern: 'typeof', hint: 'Use typeof to narrow the type before calling string-specific methods.' },
      ],
    },
    {
      id: 'ts-q3-code-4',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Create a type alias `ID` for `string | number`. Declare two variables: `userId: ID = "u-123"` and `postId: ID = 99`. Print both.\n\nExpected output:\n```\nu-123\n99\n```',
      starterCode: `// Define type alias ID = string | number, use it for two variables\n`,
      expectedOutput: 'u-123\n99',
      correctAnswer: '__code__',
      explanation: 'type ID = string | number; const userId: ID = "u-123"; const postId: ID = 99; console.log(userId); console.log(postId);',
      requiredPatterns: [
        { pattern: 'type\\s+ID', hint: 'Define the ID type alias with the type keyword.' },
        { pattern: 'string\\s*\\|\\s*number', hint: 'The ID alias should be a union of string | number.' },
      ],
    },
  ],
};

export default module3;
