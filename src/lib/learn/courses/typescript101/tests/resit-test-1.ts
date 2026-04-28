import type { Question } from '../../python101/types';
import type { CourseTest } from '../../python101/tests/resit-test-1';

const resitTest1: CourseTest = {
  id: 'typescript101-resit-1',
  slug: 'resit-1',
  title: 'TypeScript 101 — Test',
  description: 'A formal assessment covering the full TypeScript 101 course: types, arrays, tuples, objects, enums, aliases, interfaces, unions, functions, casting, classes, generics, keyof, and utility types.',
  questions: [
    // ── Multiple Choice (5) ──────────────────────────────────────────────
    {
      id: 'ts-rt1-mc-1',
      type: 'multiple-choice',
      prompt: `Which TypeScript type should you use for a variable whose value you genuinely don't know yet, but you want to force the code to narrow it before using it?`,
      choices: [
        { id: 'a', text: 'any' },
        { id: 'b', text: 'unknown' },
        { id: 'c', text: 'never' },
        { id: 'd', text: 'void' },
      ],
      correctAnswer: 'b',
      explanation: '`unknown` is the type-safe counterpart of `any`. You cannot use an `unknown` value until you narrow it (e.g. with `typeof` checks). `any` silently disables type checking.',
    },
    {
      id: 'ts-rt1-mc-2',
      type: 'multiple-choice',
      prompt: `What is the output of the following code?

\`\`\`typescript
const tuple: [string, number] = ["hi", 42];
console.log(tuple.length);
\`\`\``,
      choices: [
        { id: 'a', text: '2' },
        { id: 'b', text: '"hi"' },
        { id: 'c', text: '42' },
        { id: 'd', text: 'undefined' },
      ],
      correctAnswer: 'a',
      explanation: 'A tuple is an array with a fixed length and known element types. `[string, number]` has exactly 2 elements, so `.length` is 2.',
    },
    {
      id: 'ts-rt1-mc-3',
      type: 'multiple-choice',
      prompt: `Which statement about \`interface\` vs \`type\` is correct?`,
      choices: [
        { id: 'a', text: 'interfaces can be used for union types; type aliases cannot.' },
        { id: 'b', text: 'type aliases can declare method signatures; interfaces cannot.' },
        { id: 'c', text: 'interfaces can be merged across multiple declarations; type aliases cannot.' },
        { id: 'd', text: 'Only interfaces can be implemented by classes.' },
      ],
      correctAnswer: 'c',
      explanation: 'Interfaces support declaration merging — you can declare the same interface twice and TypeScript merges them. Type aliases cannot be merged. Both can describe object shapes and both can be implemented by classes.',
    },
    {
      id: 'ts-rt1-mc-4',
      type: 'multiple-choice',
      prompt: `What does the access modifier \`protected\` mean inside a TypeScript class?`,
      choices: [
        { id: 'a', text: 'Accessible from anywhere, like public.' },
        { id: 'b', text: 'Accessible only inside the declaring class.' },
        { id: 'c', text: 'Accessible inside the class and its subclasses, but not from outside instances.' },
        { id: 'd', text: 'Accessible only in the file where the class is declared.' },
      ],
      correctAnswer: 'c',
      explanation: '`protected` members are visible inside the declaring class and any subclass. Unlike `public`, they are not accessible on instances from outside. Unlike `private`, they are visible to subclasses.',
    },
    {
      id: 'ts-rt1-mc-5',
      type: 'multiple-choice',
      prompt: `Given \`type User = { id: number; name: string; email: string };\`, which utility type produces \`{ id?: number; name?: string; email?: string }\`?`,
      choices: [
        { id: 'a', text: 'Readonly<User>' },
        { id: 'b', text: 'Required<User>' },
        { id: 'c', text: 'Partial<User>' },
        { id: 'd', text: 'Pick<User, "id">' },
      ],
      correctAnswer: 'c',
      explanation: '`Partial<T>` makes every property of T optional. `Readonly` marks them readonly, `Required` makes optional ones required, and `Pick` selects a subset.',
    },

    // ── Coding Questions (10, easy → hard) ───────────────────────────────
    {
      id: 'ts-rt1-code-1',
      type: 'code-challenge',
      language: 'typescript',
      prompt: `Declare a variable \`greeting\` typed as \`string\` with the value \`"Hello, TypeScript!"\`. Print it.

**Sample Output**
\`\`\`
Hello, TypeScript!
\`\`\``,
      starterCode: '',
      expectedOutput: 'Hello, TypeScript!',
      correctAnswer: '__code__',
      explanation: 'const greeting: string = "Hello, TypeScript!"; console.log(greeting);',
    },
    {
      id: 'ts-rt1-code-2',
      type: 'code-challenge',
      language: 'typescript',
      prompt: `Declare a typed number array \`scores: number[]\` containing \`85\`, \`92\`, \`78\`. Print the sum of its elements.

**Sample Output**
\`\`\`
255
\`\`\``,
      starterCode: '',
      expectedOutput: '255',
      correctAnswer: '__code__',
      explanation: 'const scores: number[] = [85, 92, 78]; console.log(scores.reduce((a, b) => a + b, 0));',
    },
    {
      id: 'ts-rt1-code-3',
      type: 'code-challenge',
      language: 'typescript',
      prompt: `Declare a tuple \`person: [string, number]\` holding a name and age (\`"Alice"\`, \`30\`). Print the name and age on separate lines.

**Sample Output**
\`\`\`
Alice
30
\`\`\``,
      starterCode: '',
      expectedOutput: 'Alice\n30',
      correctAnswer: '__code__',
      explanation: 'const person: [string, number] = ["Alice", 30]; console.log(person[0]); console.log(person[1]);',
    },
    {
      id: 'ts-rt1-code-4',
      type: 'code-challenge',
      language: 'typescript',
      prompt: `Define an inline object type for \`book\` with properties \`title: string\` and \`pages: number\`. Assign \`{ title: "TS Guide", pages: 250 }\` and print the title.

**Sample Output**
\`\`\`
TS Guide
\`\`\``,
      starterCode: '',
      expectedOutput: 'TS Guide',
      correctAnswer: '__code__',
      explanation: 'const book: { title: string; pages: number } = { title: "TS Guide", pages: 250 }; console.log(book.title);',
    },
    {
      id: 'ts-rt1-code-5',
      type: 'code-challenge',
      language: 'typescript',
      prompt: `Define an \`enum Status\` with values \`Active\`, \`Inactive\`, \`Pending\`. Print the numeric value of \`Status.Pending\`.

**Sample Output**
\`\`\`
2
\`\`\``,
      starterCode: '',
      expectedOutput: '2',
      correctAnswer: '__code__',
      explanation: 'enum Status { Active, Inactive, Pending } console.log(Status.Pending); // Active=0, Inactive=1, Pending=2',
    },
    {
      id: 'ts-rt1-code-6',
      type: 'code-challenge',
      language: 'typescript',
      prompt: `Define a type alias \`ID = string | number\`. Write a function \`printId(id: ID): void\` that prints the id. Call it with \`101\` and \`"abc"\`.

**Sample Output**
\`\`\`
101
abc
\`\`\``,
      starterCode: '',
      expectedOutput: '101\nabc',
      correctAnswer: '__code__',
      explanation: 'type ID = string | number; function printId(id: ID): void { console.log(id); } printId(101); printId("abc");',
    },
    {
      id: 'ts-rt1-code-7',
      type: 'code-challenge',
      language: 'typescript',
      prompt: `Write a typed function \`add(a: number, b: number): number\` that returns the sum. Print \`add(7, 5)\`.

**Sample Output**
\`\`\`
12
\`\`\``,
      starterCode: '',
      expectedOutput: '12',
      correctAnswer: '__code__',
      explanation: 'function add(a: number, b: number): number { return a + b; } console.log(add(7, 5));',
    },
    {
      id: 'ts-rt1-code-8',
      type: 'code-challenge',
      language: 'typescript',
      prompt: `Define an \`interface Animal\` with a method \`speak(): string\`. Create a class \`Dog\` that implements \`Animal\` and whose \`speak()\` returns \`"Woof!"\`. Create a \`new Dog()\` and print the result of \`speak()\`.

**Sample Output**
\`\`\`
Woof!
\`\`\``,
      starterCode: '',
      expectedOutput: 'Woof!',
      correctAnswer: '__code__',
      explanation: 'interface Animal { speak(): string } class Dog implements Animal { speak(): string { return "Woof!"; } } console.log(new Dog().speak());',
    },
    {
      id: 'ts-rt1-code-9',
      type: 'code-challenge',
      language: 'typescript',
      prompt: `Write a generic function \`identity<T>(value: T): T\` that returns its argument. Print \`identity<number>(42)\` and \`identity<string>("hi")\`.

**Sample Output**
\`\`\`
42
hi
\`\`\``,
      starterCode: '',
      expectedOutput: '42\nhi',
      correctAnswer: '__code__',
      explanation: 'function identity<T>(value: T): T { return value; } console.log(identity<number>(42)); console.log(identity<string>("hi"));',
    },
    {
      id: 'ts-rt1-code-10',
      type: 'code-challenge',
      language: 'typescript',
      prompt: `Given \`interface User { id: number; name: string; email: string }\`, write a function \`summarise(user: Partial<User>): string\` that returns \`"name: <name or anonymous>"\` — if \`user.name\` is undefined, fall back to \`"anonymous"\`. Print the result for \`{ id: 1 }\` and for \`{ name: "Alice" }\`.

**Sample Output**
\`\`\`
name: anonymous
name: Alice
\`\`\``,
      starterCode: '',
      expectedOutput: 'name: anonymous\nname: Alice',
      correctAnswer: '__code__',
      explanation: 'interface User { id: number; name: string; email: string } function summarise(user: Partial<User>): string { return `name: ${user.name ?? "anonymous"}`; } console.log(summarise({ id: 1 })); console.log(summarise({ name: "Alice" }));',
    },
  ] as Question[],
};

export default resitTest1;
