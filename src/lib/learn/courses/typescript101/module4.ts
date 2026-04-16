import type { Module } from '../python101/types';

const module4: Module = {
  id: 'ts-module-4',
  slug: '4',
  title: 'Functions & Type Casting',
  description: 'Type function parameters and return values, then learn how to cast types with as and angle brackets.',
  icon: '⚙️',
  color: 'from-rose-500 to-pink-400',
  locked: false,
  lessons: [
    {
      id: 'ts-lesson-4-1',
      title: 'Typed Function Parameters',
      content: `In TypeScript, you annotate function **parameters** with types just like variables. This ensures callers pass the right types.

If a function doesn't return a value, annotate its return type as **void**.

TypeScript also infers the return type automatically from the return statement — you don't always need to write it explicitly, but it's good practice for public functions.

**Optional parameters** use \`?\` just like object properties. **Default parameters** use \`=\` and are implicitly optional.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `// Typed parameters and explicit return type
function add(a: number, b: number): number {
  return a + b;
}

// void return type — function returns nothing
function greet(name: string): void {
  console.log(\`Hello, \${name}!\`);
}

greet("Alice"); // fine
// greet(42);   // Error: Argument of type 'number' is not assignable to parameter of type 'string'`,
          caption: 'Typed parameters and return types',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Optional parameter with ?
function buildName(first: string, last?: string): string {
  return last ? \`\${first} \${last}\` : first;
}

buildName("Alice");          // "Alice"
buildName("Alice", "Smith"); // "Alice Smith"

// Default parameter
function repeat(text: string, times: number = 1): string {
  return text.repeat(times);
}

repeat("ha");    // "ha"
repeat("ha", 3); // "hahaha"`,
          caption: 'Optional and default parameters',
        },
      ],
    },
    {
      id: 'ts-lesson-4-2',
      title: 'Rest Parameters & Function Types',
      content: `**Rest parameters** let a function accept any number of arguments of a given type. They're collected into a typed array.

You can also type **function values** — variables that hold a function. The syntax is \`(param: type) => returnType\`.

This is useful when passing callbacks or storing functions in objects.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `// Rest parameters — all args are number
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(10, 20, 30, 40)); // 100`,
          caption: 'Rest parameters accept any number of typed arguments',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Function type annotation
type MathOperation = (a: number, b: number) => number;

const multiply: MathOperation = (a, b) => a * b;
const divide: MathOperation = (a, b) => a / b;

console.log(multiply(3, 4)); // 12
console.log(divide(10, 2));  // 5`,
          caption: 'Typing function variables with a type alias',
        },
      ],
    },
    {
      id: 'ts-lesson-4-3',
      title: 'Type Casting',
      content: `**Type casting** (also called type assertion) tells TypeScript to treat a value as a specific type — overriding what TypeScript infers.

This is useful when you know more about a value's type than TypeScript does. For example, when working with DOM elements or values typed as \`unknown\` or \`any\`.

Two syntaxes:
- **as** keyword: \`value as Type\` (preferred — works in TSX files)
- **<Type>** syntax: \`<Type>value\` (older style — doesn't work in JSX)

**Warning:** Type casting doesn't actually convert the value at runtime — it just changes how TypeScript sees it. If you cast incorrectly, you'll still get runtime errors.`,
      codeExamples: [
        {
          language: 'typescript',
          editable: true,
          code: `// Casting unknown to string to use string methods
let x: unknown = "hello";
console.log((x as string).length); // 5

// Casting an object to a more specific shape
const input = { value: "" } as HTMLInputElement;
input.value = "typed!";
console.log(input.value); // typed!`,
          caption: 'as casting for unknown values and object-like elements',
        },
        {
          language: 'typescript',
          editable: true,
          code: `// Force casting through unknown for genuinely incompatible types
let x = "hello";
// let n = x as number;           // Error — string and number don't overlap
let n = x as unknown as number;  // forced cast — risky but compiles

// The <Type> syntax (avoid in TSX files)
let length = (<string>x).length;`,
          caption: 'Force casting and the angle-bracket syntax',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'ts-q4-1',
      type: 'multiple-choice',
      prompt: 'What return type should you use for a function that prints to the console but returns nothing?',
      choices: [
        { id: 'a', text: 'null' },
        { id: 'b', text: 'undefined' },
        { id: 'c', text: 'void' },
        { id: 'd', text: 'never' },
      ],
      correctAnswer: 'c',
      explanation: 'void is the return type for functions that don\'t return a value. undefined is a value itself; void signals intentional absence of a return.',
    },
    {
      id: 'ts-q4-2',
      type: 'fill-in-blank',
      prompt: 'Complete the function signature for one that takes two numbers and returns a number:\n    function add(a: number, b: number): _____',
      correctAnswer: 'number',
      explanation: 'The return type annotation goes after the closing parenthesis with a colon: ): number.',
    },
    {
      id: 'ts-q4-3',
      type: 'true-false',
      prompt: 'Optional function parameters must come before required parameters.',
      correctAnswer: 'false',
      explanation: 'Optional parameters must come AFTER required ones. function f(a?: string, b: number) is an error — b is required but comes after optional a.',
    },
    {
      id: 'ts-q4-4',
      type: 'multiple-choice',
      prompt: 'What is a rest parameter in TypeScript?',
      choices: [
        { id: 'a', text: 'A parameter that is optional' },
        { id: 'b', text: 'A parameter that collects all remaining arguments into a typed array' },
        { id: 'c', text: 'The last required parameter of a function' },
        { id: 'd', text: 'A parameter with a default value' },
      ],
      correctAnswer: 'b',
      explanation: 'A rest parameter uses ... syntax and collects any number of arguments into an array: function sum(...nums: number[]).',
    },
    {
      id: 'ts-q4-5',
      type: 'multiple-choice',
      prompt: 'What does type casting with as do in TypeScript?',
      choices: [
        { id: 'a', text: 'Converts the value to a new type at runtime' },
        { id: 'b', text: 'Tells TypeScript to treat a value as a specific type at compile time' },
        { id: 'c', text: 'Throws an error if the cast is incorrect' },
        { id: 'd', text: 'Creates a copy of the value in the new type' },
      ],
      correctAnswer: 'b',
      explanation: 'Type casting (assertion) only affects the TypeScript type checker — it doesn\'t change the actual value at runtime. An incorrect cast can still cause runtime errors.',
    },
    {
      id: 'ts-q4-6',
      type: 'multiple-choice',
      prompt: 'Which syntax is preferred for type casting in TSX files?',
      choices: [
        { id: 'a', text: '<string>value' },
        { id: 'b', text: 'value as string' },
        { id: 'c', text: 'cast<string>(value)' },
        { id: 'd', text: 'String(value)' },
      ],
      correctAnswer: 'b',
      explanation: 'value as string is the preferred syntax. The <string>value syntax conflicts with JSX angle brackets and doesn\'t work in .tsx files.',
    },
    {
      id: 'ts-q4-7',
      type: 'true-false',
      prompt: 'TypeScript can infer the return type of a function from its return statement — you don\'t always need to write it explicitly.',
      correctAnswer: 'true',
      explanation: 'TypeScript infers return types automatically. Writing them explicitly is good practice for documentation and catching bugs early, but it\'s not always required.',
    },
    {
      id: 'ts-q4-8',
      type: 'multiple-choice',
      prompt: 'What type would you write for a variable that holds a function taking a string and returning void?\n    type Logger = _____',
      choices: [
        { id: 'a', text: 'function(string) => void' },
        { id: 'b', text: '(msg: string) -> void' },
        { id: 'c', text: '(msg: string) => void' },
        { id: 'd', text: 'string => void' },
      ],
      correctAnswer: 'c',
      explanation: 'Function types use arrow notation: (paramName: type) => returnType. So (msg: string) => void.',
    },
    {
      id: 'ts-q4-code-1',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Write a function `multiply` that takes two `number` parameters and returns their product as a `number`. Call `multiply(6, 7)` and print the result.\n\nExpected output:\n```\n42\n```',
      starterCode: `// Write multiply(a: number, b: number): number\n`,
      expectedOutput: '42',
      correctAnswer: '__code__',
      explanation: 'function multiply(a: number, b: number): number { return a * b; } console.log(multiply(6, 7));',
      requiredPatterns: [
        { pattern: 'function\\s+multiply', hint: 'Define a function named multiply.' },
        { pattern: ':\\s*number', hint: 'Add number type annotations to the parameters and return type.' },
      ],
    },
    {
      id: 'ts-q4-code-2',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Write a function `greet` with a required `name: string` parameter and an optional `title?: string` parameter. If `title` is provided, print `"Hello, <title> <name>"`, otherwise `"Hello, <name>"`.\n\nCall `greet("Alice")` and `greet("Smith", "Dr")`.\n\nExpected output:\n```\nHello, Alice\nHello, Dr Smith\n```',
      starterCode: `// Write greet with an optional title parameter\n`,
      expectedOutput: 'Hello, Alice\nHello, Dr Smith',
      correctAnswer: '__code__',
      explanation: 'function greet(name: string, title?: string): void { console.log(title ? `Hello, ${title} ${name}` : `Hello, ${name}`); }',
      requiredPatterns: [
        { pattern: 'title\\?', hint: 'Make title optional by adding ? after the parameter name.' },
      ],
    },
    {
      id: 'ts-q4-code-3',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Write a function `sum` using a rest parameter `...nums: number[]` that returns the total of all arguments. Call `sum(1, 2, 3, 4, 5)` and print the result.\n\nExpected output:\n```\n15\n```',
      starterCode: `// Write sum using a rest parameter\n`,
      expectedOutput: '15',
      correctAnswer: '__code__',
      explanation: 'function sum(...nums: number[]): number { return nums.reduce((t, n) => t + n, 0); } console.log(sum(1, 2, 3, 4, 5));',
      requiredPatterns: [
        { pattern: '\\.\\.\\.\\w+:\\s*number\\[\\]', hint: 'Use ...nums: number[] as a rest parameter.' },
      ],
    },
    {
      id: 'ts-q4-code-4',
      type: 'code-challenge',
      language: 'typescript',
      prompt: 'Declare a variable `x` of type `unknown` and assign it the string `"TypeScript"`. Cast it to `string` using `as` and print its `.length`.\n\nExpected output:\n```\n10\n```',
      starterCode: `// Declare unknown, cast with as, print length\n`,
      expectedOutput: '10',
      correctAnswer: '__code__',
      explanation: 'let x: unknown = "TypeScript"; console.log((x as string).length);',
      requiredPatterns: [
        { pattern: 'unknown', hint: 'Declare x with the unknown type.' },
        { pattern: 'as\\s+string', hint: 'Cast x to string using the as keyword.' },
      ],
    },
  ],
};

export default module4;
