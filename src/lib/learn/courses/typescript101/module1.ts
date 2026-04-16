import type { Module } from '../python101/types';

const module1: Module = {
  id: 'ts-module-1',
  slug: '1',
  title: 'Special Types & Arrays',
  description: 'Learn any, unknown, never, and undefined — then type-safe arrays and tuples.',
  icon: '📦',
  color: 'from-violet-500 to-purple-400',
  locked: false,
  lessons: [
    {
      id: 'ts-lesson-1-1',
      title: 'The any Type',
      content: `The **any** type is an escape hatch — it tells TypeScript to stop type-checking a value entirely.

A variable typed as \`any\` can hold anything: a string, a number, an object, a function. TypeScript won't complain.

**When is any useful?**
- Working with third-party libraries that don't have types
- Migrating existing JavaScript code incrementally

**Why is any dangerous?**
It defeats the whole purpose of TypeScript. If you use \`any\` everywhere, you lose all the safety guarantees. Use it sparingly and prefer \`unknown\` when possible.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `let v: any = true;
v = "string";  // no error
v = 42;        // no error
Math.round(v); // no error — TypeScript trusts you completely`,
          caption: 'any disables all type checking for that variable',
        },
      ],
    },
    {
      id: 'ts-lesson-1-2',
      title: 'unknown and never',
      content: `**unknown** is the type-safe alternative to \`any\`. Like \`any\`, it can hold any value — but unlike \`any\`, you must check the type before doing anything with it.

**never** represents values that should never exist. It's most commonly the return type of functions that always throw or loop forever.

Use \`unknown\` over \`any\` whenever you're working with data whose type you genuinely don't know (like parsed JSON or API responses). It forces you to validate before using.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `let w: unknown = "hello";
// Cannot use directly — must narrow the type first
// console.log(w.length); // Error!

if (typeof w === "string") {
  console.log(w.length); // OK — we've confirmed it's a string
}`,
          caption: 'unknown forces type checking before use',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// never: a function that never returns
function throwError(message: string): never {
  throw new Error(message);
}

// never: an infinite loop
function runForever(): never {
  while (true) {}
}`,
          caption: 'never is the return type when a function never completes',
        },
      ],
    },
    {
      id: 'ts-lesson-1-3',
      title: 'Typed Arrays',
      content: `TypeScript arrays work exactly like JavaScript arrays, but with a type annotation that restricts what can be stored inside them.

The syntax is the **element type followed by []** — for example: \`string[]\`, \`number[]\`, \`boolean[]\`.

You can also use the generic form **Array<T>**, e.g. \`Array<string>\`.

TypeScript will error if you try to push the wrong type into a typed array. You can also mark arrays as **readonly** to prevent mutation.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `const names: string[] = [];
names.push("Dylan"); // fine
names.push("Alice"); // fine
// names.push(3);    // Error: Argument of type 'number' is not assignable to parameter of type 'string'`,
          caption: 'A typed array only accepts the declared element type',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// readonly arrays cannot be mutated
const scores: readonly number[] = [90, 85, 92];
// scores.push(88); // Error: Property 'push' does not exist on type 'readonly number[]'

// Type inference works on arrays too
const ids = [1, 2, 3]; // inferred: number[]
// ids.push("four");   // Error: Argument of type 'string' is not assignable to parameter of type 'number'`,
          caption: 'readonly arrays and type inference',
        },
      ],
    },
    {
      id: 'ts-lesson-1-4',
      title: 'Tuples',
      content: `A **tuple** is a typed array with a fixed length where each position has a specific type.

Unlike regular arrays (where every element is the same type), a tuple lets you mix types — but it locks down how many elements there are and what type each one must be.

Tuples are perfect for representing a fixed structure like a coordinate pair \`[number, number]\` or a name + age pair \`[string, number]\`.

Once defined, you must initialize them with exactly the right types in the right order.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `// Define a tuple: [number, boolean, string]
let ourTuple: [number, boolean, string];

// Correct initialization
ourTuple = [5, false, "Coding God was here"];

// Wrong order — TypeScript errors
// ourTuple = [false, "wrong", 5]; // Error!`,
          caption: 'Tuples enforce both type and order',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Accessing tuple elements by index
let user: [string, number] = ["Alice", 30];
console.log(user[0]); // "Alice" — TypeScript knows this is a string
console.log(user[1]); // 30 — TypeScript knows this is a number

// Readonly tuple
const point: readonly [number, number] = [10, 20];`,
          caption: 'Tuple elements are typed per-position',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'ts-q1-1',
      type: 'multiple-choice',
      prompt: 'What does the any type do in TypeScript?',
      choices: [
        { id: 'a', text: 'Allows a variable to hold any type but still checks usage' },
        { id: 'b', text: 'Disables all type checking for that variable' },
        { id: 'c', text: 'Makes the variable readonly' },
        { id: 'd', text: 'Converts the variable to a string at runtime' },
      ],
      correctAnswer: 'b',
      explanation: 'any completely disables type checking for that variable — TypeScript won\'t catch any type errors on it.',
    },
    {
      id: 'ts-q1-2',
      type: 'multiple-choice',
      prompt: 'What is the difference between any and unknown?',
      choices: [
        { id: 'a', text: 'They are identical — both disable type checking' },
        { id: 'b', text: 'unknown requires you to check the type before using it; any does not' },
        { id: 'c', text: 'any is more restrictive than unknown' },
        { id: 'd', text: 'unknown is only for arrays' },
      ],
      correctAnswer: 'b',
      explanation: 'unknown is the safe alternative to any. You can assign anything to it, but you must narrow its type (e.g. with typeof) before calling methods on it.',
    },
    {
      id: 'ts-q1-3',
      type: 'fill-in-blank',
      prompt: 'Complete the typed array declaration for an array of strings:\n    const names: _____[] = [];',
      correctAnswer: 'string',
      explanation: 'string[] declares an array where every element must be a string.',
    },
    {
      id: 'ts-q1-4',
      type: 'true-false',
      prompt: 'A readonly number[] array can have elements added with .push().',
      correctAnswer: 'false',
      explanation: 'readonly arrays cannot be mutated. Calling .push() on a readonly number[] is a TypeScript compile error.',
    },
    {
      id: 'ts-q1-5',
      type: 'multiple-choice',
      prompt: 'What is a tuple in TypeScript?',
      choices: [
        { id: 'a', text: 'An array where every element is the same type' },
        { id: 'b', text: 'A fixed-length array where each position has a specific type' },
        { id: 'c', text: 'An object with named properties' },
        { id: 'd', text: 'A type alias for a pair of values' },
      ],
      correctAnswer: 'b',
      explanation: 'A tuple is a fixed-length array where each index has a declared type, e.g. [string, number] must have exactly a string at index 0 and a number at index 1.',
    },
    {
      id: 'ts-q1-6',
      type: 'multiple-choice',
      prompt: 'Which correctly declares a tuple of [number, boolean, string]?\n    let t: [number, boolean, string] = ___',
      choices: [
        { id: 'a', text: '[5, false, "hello"]' },
        { id: 'b', text: '["hello", 5, false]' },
        { id: 'c', text: '[false, "hello", 5]' },
        { id: 'd', text: '[5, "hello", false]' },
      ],
      correctAnswer: 'a',
      explanation: 'The tuple [number, boolean, string] requires: a number first, then a boolean, then a string. Only [5, false, "hello"] matches.',
    },
    {
      id: 'ts-q1-7',
      type: 'true-false',
      prompt: 'TypeScript can infer the type of an array from its initial values.',
      correctAnswer: 'true',
      explanation: 'If you write const ids = [1, 2, 3], TypeScript infers the type as number[] automatically.',
    },
    {
      id: 'ts-q1-8',
      type: 'multiple-choice',
      prompt: 'What is the return type of a function that always throws an error?',
      choices: [
        { id: 'a', text: 'void' },
        { id: 'b', text: 'undefined' },
        { id: 'c', text: 'null' },
        { id: 'd', text: 'never' },
      ],
      correctAnswer: 'd',
      explanation: 'never is the return type for functions that never complete normally — they always throw an error or run forever.',
    },
    {
      id: 'ts-q1-code-1',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Declare a typed array `colors` of type `string[]` containing `"red"`, `"green"`, and `"blue"`. Print its length.\n\nExpected output:\n```\n3\n```',
      starterCode: `// Declare a string array and print its length\n`,
      expectedOutput: '3',
      correctAnswer: '__code__',
      explanation: 'const colors: string[] = ["red", "green", "blue"]; console.log(colors.length);',
      requiredPatterns: [
        { pattern: 'string\\[\\]', hint: 'Use string[] to declare a typed string array.' },
        { pattern: '\\.length', hint: 'Access .length to get the number of elements.' },
      ],
    },
    {
      id: 'ts-q1-code-2',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Declare a tuple `person` of type `[string, number]` with value `["Alice", 30]`. Print the first element, then the second.\n\nExpected output:\n```\nAlice\n30\n```',
      starterCode: `// Declare a [string, number] tuple and print each element\n`,
      expectedOutput: 'Alice\n30',
      correctAnswer: '__code__',
      explanation: 'let person: [string, number] = ["Alice", 30]; console.log(person[0]); console.log(person[1]);',
      requiredPatterns: [
        { pattern: '\\[string,\\s*number\\]', hint: 'Annotate the tuple type as [string, number].' },
      ],
    },
    {
      id: 'ts-q1-code-3',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Declare a variable `value` of type `unknown` and assign it the string `"hello"`. Use a `typeof` check to print its length safely.\n\nExpected output:\n```\n5\n```',
      starterCode: `// Declare unknown, narrow with typeof, then print .length\n`,
      expectedOutput: '5',
      correctAnswer: '__code__',
      explanation: 'let value: unknown = "hello"; if (typeof value === "string") { console.log(value.length); }',
      requiredPatterns: [
        { pattern: 'unknown', hint: 'Declare the variable with the unknown type.' },
        { pattern: 'typeof', hint: 'Use typeof to narrow the type before accessing .length.' },
      ],
    },
    {
      id: 'ts-q1-code-4',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Declare a `number[]` array called `scores` with values `[90, 85, 92]`. Push `88` to it, then print the array length.\n\nExpected output:\n```\n4\n```',
      starterCode: `// Declare a number array, push a value, print the length\n`,
      expectedOutput: '4',
      correctAnswer: '__code__',
      explanation: 'const scores: number[] = [90, 85, 92]; scores.push(88); console.log(scores.length);',
      requiredPatterns: [
        { pattern: 'number\\[\\]', hint: 'Use number[] to declare a typed number array.' },
        { pattern: '\\.push\\(', hint: 'Use .push() to add an element to the array.' },
      ],
    },
  ],
};

export default module1;
