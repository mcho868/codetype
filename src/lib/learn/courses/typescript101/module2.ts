import type { Module } from '../python101/types';

const module2: Module = {
  id: 'ts-module-2',
  slug: '2',
  title: 'Object Types & Enums',
  description: 'Type your objects with inline annotations, optional properties, and named constant sets with enums.',
  icon: '🗂️',
  color: 'from-amber-500 to-orange-400',
  locked: false,
  lessons: [
    {
      id: 'ts-lesson-2-1',
      title: 'Object Types',
      content: `In TypeScript, you can annotate the shape of an object directly inline — specifying the type of each property.

The syntax is: \`{ property: type, property: type }\`

TypeScript will error if:
- You assign an object missing a required property
- You try to assign the wrong type to a property
- You access a property that doesn't exist on the type

You can make a property **optional** by adding \`?\` after its name. Optional properties may be present or absent — TypeScript will type them as \`type | undefined\`.

When reading an optional property, use the **nullish coalescing operator (??)** to supply a fallback value when the property is \`undefined\`:
\`obj.nickname ?? "default"\` — returns \`"default"\` only if \`nickname\` is \`null\` or \`undefined\`, but not if it is \`0\` or \`""\`.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `const car: { type: string; model: string; year: number } = {
  type: "Toyota",
  model: "Corolla",
  year: 2009,
};

// Accessing properties is type-safe
console.log(car.type);   // string
console.log(car.year);   // number`,
          caption: 'Inline object type annotation',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Optional property with ?
const product: { name: string; price: number; discount?: number } = {
  name: "Keyboard",
  price: 79.99,
  // discount is optional — fine to omit
};

// TypeScript infers type from the object too
const user = { name: "Alice", age: 30 };
user.age = "thirty"; // Error: Type 'string' is not assignable to type 'number'`,
          caption: 'Optional properties and inferred object types',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// ?? gives a fallback when an optional property is undefined
const user1: { name: string; nickname?: string } = { name: "Alice", nickname: "Ace" };
const user2: { name: string; nickname?: string } = { name: "Bob" };

console.log(user1.nickname ?? "no nickname"); // "Ace"
console.log(user2.nickname ?? "no nickname"); // "no nickname"

// Also useful for optional numbers — ?? won't swallow 0
const item: { name: string; discount?: number } = { name: "Widget", discount: 0 };
console.log(item.discount ?? 10); // 0  (not 10 — zero is a valid value)`,
          caption: '?? provides a fallback when an optional property is absent',
        },
      ],
    },
    {
      id: 'ts-lesson-2-2',
      title: 'Enums',
      content: `**Enums** (enumerations) are a way to define a set of named constants.

Instead of using magic strings like \`"North"\`, \`"South"\`, \`"East"\`, \`"West"\` throughout your code, you define them once in an enum and reference the enum members.

There are two kinds of enums:
- **Numeric enums** — members are automatically assigned numbers starting at 0 (or a custom start value)
- **String enums** — each member has an explicit string value

Enums make your code more readable and prevent typos in constant values.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `// Numeric enum — North = 0, East = 1, South = 2, West = 3
enum CardinalDirections {
  North,
  East,
  South,
  West,
}

let direction = CardinalDirections.North;
console.log(direction);              // 0
console.log(CardinalDirections[0]);  // "North"`,
          caption: 'Numeric enums auto-number from 0',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Custom starting value
enum CardinalDirections {
  North = 1,
  East,   // 2
  South,  // 3
  West,   // 4
}

// String enum — values must be explicitly assigned
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

console.log(Direction.Up); // "UP"`,
          caption: 'Custom numeric start and string enums',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Enums prevent typos — only valid members compile
enum StatusCodes {
  NotFound = 404,
  Success = 200,
  BadRequest = 400,
}

function handle(code: StatusCodes) {
  if (code === StatusCodes.Success) {
    console.log("OK!");
  }
}

handle(StatusCodes.NotFound); // fine
// handle(999);               // not an enum member — safer to use the enum`,
          caption: 'Enums used as function parameter types',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'ts-q2-1',
      type: 'multiple-choice',
      prompt: 'How do you mark a property as optional in a TypeScript object type?',
      choices: [
        { id: 'a', text: 'Prefix it with optional keyword' },
        { id: 'b', text: 'Add ? after the property name' },
        { id: 'c', text: 'Give it a default value of undefined' },
        { id: 'd', text: 'Use the | undefined union type in the annotation' },
      ],
      correctAnswer: 'b',
      explanation: 'The ? suffix makes a property optional: { name: string; age?: number } means age can be a number or absent.',
    },
    {
      id: 'ts-q2-2',
      type: 'true-false',
      prompt: 'TypeScript can infer the shape of an object from its initial value, so you don\'t always need an explicit type annotation.',
      correctAnswer: 'true',
      explanation: 'When you write const user = { name: "Alice", age: 30 }, TypeScript infers the type as { name: string; age: number } automatically.',
    },
    {
      id: 'ts-q2-3',
      type: 'multiple-choice',
      prompt: 'What does an enum provide in TypeScript?',
      choices: [
        { id: 'a', text: 'A way to define a set of named constants' },
        { id: 'b', text: 'A way to create classes with private fields' },
        { id: 'c', text: 'A runtime type check for function arguments' },
        { id: 'd', text: 'A collection type like an array' },
      ],
      correctAnswer: 'a',
      explanation: 'Enums define a set of named constants, making code more readable and preventing typos with magic strings or numbers.',
    },
    {
      id: 'ts-q2-4',
      type: 'multiple-choice',
      prompt: 'What value does North have in this enum?\n    enum Dir { North, East, South, West }',
      choices: [
        { id: 'a', text: '1' },
        { id: 'b', text: '"North"' },
        { id: 'c', text: '0' },
        { id: 'd', text: 'undefined' },
      ],
      correctAnswer: 'c',
      explanation: 'By default, numeric enums start at 0. So North = 0, East = 1, South = 2, West = 3.',
    },
    {
      id: 'ts-q2-5',
      type: 'fill-in-blank',
      prompt: 'In a string enum, how do you assign "UP" to the Up member?\n    enum Dir { Up = _____ }',
      correctAnswer: '"UP"',
      explanation: 'String enum members require explicit string values in quotes: Up = "UP".',
    },
    {
      id: 'ts-q2-6',
      type: 'multiple-choice',
      prompt: 'What happens if you try to assign a value to an object property with the wrong type?',
      choices: [
        { id: 'a', text: 'TypeScript silently converts it to the correct type' },
        { id: 'b', text: 'A runtime error is thrown' },
        { id: 'c', text: 'A compile-time error is thrown' },
        { id: 'd', text: 'Nothing — TypeScript ignores the type mismatch' },
      ],
      correctAnswer: 'c',
      explanation: 'TypeScript reports a compile-time error when you assign the wrong type. This means you catch the bug before running the code.',
    },
    {
      id: 'ts-q2-7',
      type: 'true-false',
      prompt: 'In a numeric enum, you can set a custom starting value (e.g. North = 1) and the rest will auto-increment.',
      correctAnswer: 'true',
      explanation: 'Setting North = 1 makes East = 2, South = 3, West = 4 automatically.',
    },
    {
      id: 'ts-q2-8',
      type: 'multiple-choice',
      prompt: 'Given: enum Status { NotFound = 404, Success = 200 }\nWhat does console.log(Status.Success) print?',
      choices: [
        { id: 'a', text: '"Success"' },
        { id: 'b', text: '200' },
        { id: 'c', text: '1' },
        { id: 'd', text: 'undefined' },
      ],
      correctAnswer: 'b',
      explanation: 'Status.Success evaluates to 200, which is the value assigned to it in the enum.',
    },
    {
      id: 'ts-q2-code-1',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Declare an object `car` with type `{ make: string; year: number }`, assign it `{ make: "Toyota", year: 2022 }`, then print `make` and `year` on separate lines.\n\nExpected output:\n```\nToyota\n2022\n```',
      starterCode: `// Declare a typed object and print its properties\n`,
      expectedOutput: 'Toyota\n2022',
      correctAnswer: '__code__',
      explanation: 'const car: { make: string; year: number } = { make: "Toyota", year: 2022 }; console.log(car.make); console.log(car.year);',
      requiredPatterns: [
        { pattern: 'string', hint: 'Annotate make with the string type in the object type.' },
        { pattern: 'number', hint: 'Annotate year with the number type in the object type.' },
      ],
    },
    {
      id: 'ts-q2-code-2',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Declare an object `user` with an optional property `nickname?: string`. Create one user with a nickname and one without. Print the nickname of the first, then `undefined` check for the second.\n\nExpected output:\n```\nAce\nno nickname\n```',
      starterCode: `// Use an optional property with ?
const user1: { name: string; nickname?: string } = { name: "Alice", nickname: "Ace" };
const user2: { name: string; nickname?: string } = { name: "Bob" };
// Print user1's nickname, then print "no nickname" if user2 has none\n`,
      expectedOutput: 'Ace\nno nickname',
      correctAnswer: '__code__',
      explanation: 'console.log(user1.nickname); console.log(user2.nickname ?? "no nickname");',
      requiredPatterns: [
        { pattern: 'nickname\\?', hint: 'Mark the nickname property as optional with ?.' },
      ],
    },
    {
      id: 'ts-q2-code-3',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Declare an object `dimensions` with type `{ width: number; height: number; depth?: number }`. Assign `width: 10`, `height: 5` (no depth). Then print the width and height, and print `0` for depth using `??`.\n\nExpected output:\n```\n10\n5\n0\n```',
      starterCode: `// Declare dimensions with an optional depth property\n`,
      expectedOutput: '10\n5\n0',
      correctAnswer: '__code__',
      explanation: 'const dimensions: { width: number; height: number; depth?: number } = { width: 10, height: 5 }; console.log(dimensions.width); console.log(dimensions.height); console.log(dimensions.depth ?? 0);',
      requiredPatterns: [
        { pattern: 'depth\\?', hint: 'Mark depth as optional with ?.' },
        { pattern: '\\?\\?', hint: 'Use ?? to fall back to 0 when depth is undefined.' },
      ],
    },
    {
      id: 'ts-q2-code-4',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Declare a typed object `statusCodes` using `const` with type `{ notFound: number; success: number; badRequest: number }`. Assign `notFound: 404`, `success: 200`, `badRequest: 400`. Print the `success` value.\n\nExpected output:\n```\n200\n```',
      starterCode: `// Declare a typed statusCodes object\n`,
      expectedOutput: '200',
      correctAnswer: '__code__',
      explanation: 'const statusCodes: { notFound: number; success: number; badRequest: number } = { notFound: 404, success: 200, badRequest: 400 }; console.log(statusCodes.success);',
      requiredPatterns: [
        { pattern: 'number', hint: 'Annotate each property as a number in the type.' },
        { pattern: 'success', hint: 'Access the success property and print it.' },
      ],
    },
  ],
};

export default module2;
