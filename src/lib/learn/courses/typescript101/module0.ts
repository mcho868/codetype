import type { Module } from '../python101/types';

const module0: Module = {
  id: 'ts-module-0',
  slug: '0',
  title: 'What Is TypeScript?',
  description: 'Understand what TypeScript is, why it exists, and how it adds static typing on top of JavaScript.',
  icon: '🟦',
  color: 'from-blue-500 to-cyan-400',
  locked: false,
  lessons: [
    {
      id: 'ts-lesson-0-1',
      title: 'TypeScript Introduction',
      content: `**TypeScript** is a syntactic superset of JavaScript that adds **static typing**.

That means every valid JavaScript program is also valid TypeScript — but TypeScript lets you add type annotations so the compiler can catch mistakes *before* you run your code.

Key points:
- TypeScript is developed and maintained by **Microsoft**
- It compiles down to plain JavaScript — browsers and Node.js never see TypeScript directly
- Types are checked at compile time, not at runtime
- TypeScript files use the **.ts** extension (or **.tsx** for JSX)

**Why use TypeScript?**
JavaScript is dynamically typed — a variable can hold a string, then a number, then an object. This flexibility causes bugs that only appear at runtime. TypeScript catches these errors early, during development.`,
      codeExamples: [
        {
          language: 'typescript', // using java as a stand-in for TypeScript display
          code: `// JavaScript — no type safety
let name = "Dylan";
name = 33; // no error, but probably a bug!

// TypeScript — type checked
let firstName: string = "Dylan";
firstName = 33; // Error: Type 'number' is not assignable to type 'string'`,
          caption: 'TypeScript catches type errors before your code runs',
        },
      ],
    },
    {
      id: 'ts-lesson-0-2',
      title: 'Type Inference',
      content: `TypeScript doesn't always require you to write types explicitly. When you assign a value to a variable, TypeScript **infers** the type automatically.

This means you can write clean code without annotations, and TypeScript still protects you.

If TypeScript can determine the type from the initial value, you don't need to write it. But if you're declaring a variable without an initial value, you should annotate it.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `// Explicit type annotation
let firstName: string = "Dylan";

// Inferred — TypeScript knows this is a string
let lastName = "Smith"; // type: string

// Explicit is needed when no initial value
let score: number;
score = 100;`,
          caption: 'TypeScript infers types from assigned values',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Inference prevents reassignment to wrong type
let count = 0;       // inferred: number
count = count + 1;   // fine
count = "one";       // Error: Type 'string' is not assignable to type 'number'`,
          caption: 'Inferred types are just as strict as explicit ones',
        },
      ],
    },
    {
      id: 'ts-lesson-0-3',
      title: 'Simple Types',
      content: `TypeScript has three primary **primitive types** that map directly to JavaScript primitives:

- **string** — text values: \`"hello"\`, \`'world'\`
- **number** — integers and decimals: \`42\`, \`3.14\`
- **boolean** — \`true\` or \`false\`

You annotate a variable by writing a colon after its name, followed by the type.

TypeScript also supports **bigint** and **symbol**, but string, number, and boolean cover almost everything you'll need as a beginner.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `let name: string = "Alice";
let age: number = 30;
let isAdmin: boolean = false;

// All three primitives
console.log(name);    // Alice
console.log(age);     // 30
console.log(isAdmin); // false`,
          caption: 'The three core primitive types',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// TypeScript prevents wrong-type assignments
let score: number = 100;
score = "perfect"; // Error: Type 'string' is not assignable to type 'number'

let greeting: string = "Hello";
greeting = true;   // Error: Type 'boolean' is not assignable to type 'string'`,
          caption: 'Types are enforced — wrong assignments are compile errors',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'ts-q0-1',
      type: 'multiple-choice',
      prompt: 'What is TypeScript?',
      choices: [
        { id: 'a', text: 'A completely new programming language unrelated to JavaScript' },
        { id: 'b', text: 'A syntactic superset of JavaScript that adds static typing' },
        { id: 'c', text: 'A JavaScript runtime like Node.js' },
        { id: 'd', text: 'A CSS preprocessor' },
      ],
      correctAnswer: 'b',
      explanation: 'TypeScript is a superset of JavaScript — all valid JS is valid TS, but TypeScript adds optional static type annotations.',
    },
    {
      id: 'ts-q0-2',
      type: 'true-false',
      prompt: 'Browsers can run TypeScript files directly without any compilation step.',
      correctAnswer: 'false',
      explanation: 'TypeScript must be compiled to JavaScript first. Browsers only understand JavaScript.',
    },
    {
      id: 'ts-q0-3',
      type: 'multiple-choice',
      prompt: 'What does TypeScript use to annotate a variable\'s type?',
      choices: [
        { id: 'a', text: ':: (double colon)' },
        { id: 'b', text: '-> (arrow)' },
        { id: 'c', text: ': (colon)' },
        { id: 'd', text: '<> (angle brackets)' },
      ],
      correctAnswer: 'c',
      explanation: 'TypeScript uses a colon after the variable name: let name: string = "Alice";',
    },
    {
      id: 'ts-q0-4',
      type: 'multiple-choice',
      prompt: 'What does this code contain?\n    let count = 5;',
      choices: [
        { id: 'a', text: 'An explicit type annotation of number' },
        { id: 'b', text: 'A type inference — TypeScript infers count is a number' },
        { id: 'c', text: 'An error — all TypeScript variables need explicit types' },
        { id: 'd', text: 'A variable with no type at all' },
      ],
      correctAnswer: 'b',
      explanation: 'TypeScript infers the type from the initial value. count = 5, so TypeScript knows it\'s a number — no explicit annotation needed.',
    },
    {
      id: 'ts-q0-5',
      type: 'fill-in-blank',
      prompt: 'Complete the TypeScript declaration for a string variable:\n    let city: _____ = "Seoul";',
      correctAnswer: 'string',
      explanation: 'The string type annotation tells TypeScript this variable should only ever hold text.',
    },
    {
      id: 'ts-q0-6',
      type: 'true-false',
      prompt: 'In TypeScript, after declaring let score: number = 100, you can reassign score = "perfect" without an error.',
      correctAnswer: 'false',
      explanation: 'TypeScript will throw a compile error: Type \'string\' is not assignable to type \'number\'.',
    },
    {
      id: 'ts-q0-7',
      type: 'multiple-choice',
      prompt: 'Which of these is NOT one of TypeScript\'s three primary primitive types?',
      choices: [
        { id: 'a', text: 'string' },
        { id: 'b', text: 'number' },
        { id: 'c', text: 'boolean' },
        { id: 'd', text: 'character' },
      ],
      correctAnswer: 'd',
      explanation: 'TypeScript\'s three primary primitives are string, number, and boolean. There is no "character" type — single characters are just strings.',
    },
    {
      id: 'ts-q0-8',
      type: 'multiple-choice',
      prompt: 'What file extension do TypeScript files use?',
      choices: [
        { id: 'a', text: '.js' },
        { id: 'b', text: '.tsx' },
        { id: 'c', text: '.ts' },
        { id: 'd', text: '.tscript' },
      ],
      correctAnswer: 'c',
      explanation: 'TypeScript files use .ts. The .tsx extension is used when the file also contains JSX (React components).',
    },
    {
      id: 'ts-q0-code-1',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Declare a variable `name` with type `string` and assign it `"TypeScript"`. Then print it with `console.log`.\n\nExpected output:\n```\nTypeScript\n```',
      starterCode: `// Declare a typed string variable and print it\n`,
      expectedOutput: 'TypeScript',
      correctAnswer: '__code__',
      explanation: 'let name: string = "TypeScript"; console.log(name); — the : string annotation tells TypeScript the variable can only hold strings.',
      requiredPatterns: [
        { pattern: 'string', hint: 'Add a : string type annotation to your variable.' },
        { pattern: 'console\\.log', hint: 'Use console.log() to print the value.' },
      ],
    },
    {
      id: 'ts-q0-code-2',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Declare two variables: `age` as a `number` with value `25`, and `isStudent` as a `boolean` with value `true`. Print both on separate lines.\n\nExpected output:\n```\n25\ntrue\n```',
      starterCode: `// Declare age (number) and isStudent (boolean) with type annotations\n`,
      expectedOutput: '25\ntrue',
      correctAnswer: '__code__',
      explanation: 'let age: number = 25; let isStudent: boolean = true; then console.log each.',
      requiredPatterns: [
        { pattern: 'number', hint: 'Annotate age with the number type.' },
        { pattern: 'boolean', hint: 'Annotate isStudent with the boolean type.' },
      ],
    },
    {
      id: 'ts-q0-code-3',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Use type inference — declare a variable `score` and assign it `100` (no type annotation). Then print it.\n\nExpected output:\n```\n100\n```',
      starterCode: `// Let TypeScript infer the type — no annotation needed\n`,
      expectedOutput: '100',
      correctAnswer: '__code__',
      explanation: 'let score = 100; console.log(score); TypeScript infers score is a number from the initial value.',
      requiredPatterns: [
        { pattern: 'console\\.log', hint: 'Use console.log() to print score.' },
      ],
    },
    {
      id: 'ts-q0-code-4',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Declare a `const` called `greeting` with type `string` and value `"Hello, World!"`. Print it.\n\nExpected output:\n```\nHello, World!\n```',
      starterCode: `// Use const with a string type annotation\n`,
      expectedOutput: 'Hello, World!',
      correctAnswer: '__code__',
      explanation: 'const greeting: string = "Hello, World!"; console.log(greeting);',
      requiredPatterns: [
        { pattern: 'const', hint: 'Use const instead of let for a value that never changes.' },
        { pattern: 'string', hint: 'Add a : string type annotation.' },
      ],
    },
  ],
};

export default module0;
