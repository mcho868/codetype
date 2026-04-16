import type { Module } from '../python101/types';

const module0: Module = {
  id: 'gd-module-0',
  slug: '0',
  title: 'Getting Started',
  description: 'What GDScript is, how to print your first line, and the basic syntax rules of the language.',
  icon: '🐸',
  color: 'from-green-500 to-emerald-400',
  locked: false,
  lessons: [
    {
      id: 'gd-lesson-0-1',
      title: 'What Is GDScript?',
      content: `**GDScript** is a high-level, dynamically typed scripting language built specifically for the **Godot game engine**.

Key facts:
- Syntax is heavily inspired by **Python** — indentation-based, readable, concise
- It is designed for Godot's node system and is tightly integrated with the engine
- GDScript files use the **.gd** extension
- Every script is attached to a **node** in a Godot scene
- You don't need to compile or run a separate process — Godot runs scripts directly

Every GDScript file typically begins by stating which node type the script **extends**:
\`extends Node\`

This means your script inherits all variables and functions from the \`Node\` class.`,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

# This script is attached to a Node.
# It inherits all built-in Node functions like _ready() and _process().`,
          caption: 'A minimal GDScript file',
        },
      ],
    },
    {
      id: 'gd-lesson-0-2',
      title: 'Hello World & _ready()',
      content: `The **\`_ready()\`** function is called once when the node and all its children have entered the scene tree. It's the ideal place for initialization code.

To print to the Godot output panel, use the built-in **\`print()\`** function:
\`print("Hello, World!")\`

GDScript uses **indentation** (a tab or 4 spaces) to define code blocks — just like Python. The body of \`_ready()\` must be indented inside the function.`,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

func _ready():
    print("Hello, World!")`,
          caption: '_ready() runs once when the scene starts',
        },
        {
          language: 'python',
          code: `extends Node

func _ready():
    print("Line 1")
    print("Line 2")
    print("Line 3")`,
          caption: 'Multiple print calls in _ready()',
        },
      ],
    },
    {
      id: 'gd-lesson-0-3',
      title: 'Syntax Rules',
      content: `GDScript has a few key syntax rules to know:

**Indentation** — code blocks are defined by indentation, not curly braces. Use a tab or consistent spaces.

**Case-sensitivity** — \`myVar\` and \`myvar\` are different. Variable and function names are case-sensitive.

**No semicolons** — statements end at the newline. You do not add \`;\` at the end of lines.

**Comments** — use \`#\` to write a comment. Everything after \`#\` on a line is ignored by Godot.

**\`pass\`** — a placeholder keyword used when a block must have at least one statement but you have nothing to put there yet.`,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

# This is a comment — Godot ignores this line
func _ready():
    # Indentation defines the function body
    print("GDScript syntax!")  # Inline comment — also fine
    # No semicolons needed`,
          caption: 'Comments, indentation, and no semicolons',
        },
        {
          language: 'python',
          code: `extends Node

func _ready():
    pass  # Nothing here yet, but 'pass' keeps it valid`,
          caption: 'pass is a valid empty placeholder',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'gd-q0-1',
      type: 'multiple-choice',
      prompt: 'What is GDScript primarily designed for?',
      choices: [
        { id: 'a', text: 'Web development with HTML and CSS' },
        { id: 'b', text: 'The Godot game engine' },
        { id: 'c', text: 'Machine learning and data science' },
        { id: 'd', text: 'Systems programming like C++' },
      ],
      correctAnswer: 'b',
      explanation: 'GDScript is built specifically for Godot. It integrates tightly with Godot\'s node system and scene tree.',
    },
    {
      id: 'gd-q0-2',
      type: 'multiple-choice',
      prompt: 'Which programming language is GDScript syntax most similar to?',
      choices: [
        { id: 'a', text: 'JavaScript' },
        { id: 'b', text: 'Java' },
        { id: 'c', text: 'Python' },
        { id: 'd', text: 'Rust' },
      ],
      correctAnswer: 'c',
      explanation: 'GDScript is heavily inspired by Python — it uses indentation for blocks, has similar data types, and reads very similarly.',
    },
    {
      id: 'gd-q0-3',
      type: 'fill-in-blank',
      prompt: 'Complete the function that runs once when a node enters the scene:\n    func _______():',
      correctAnswer: '_ready',
      explanation: '_ready() is called once when the node and all its children have entered the scene tree.',
    },
    {
      id: 'gd-q0-4',
      type: 'multiple-choice',
      prompt: 'What does `extends Node` at the top of a GDScript file mean?',
      choices: [
        { id: 'a', text: 'The script is locked and cannot be modified' },
        { id: 'b', text: 'The script imports the Node library' },
        { id: 'c', text: 'The script inherits all variables and functions from the Node class' },
        { id: 'd', text: 'The script adds a new Node to the scene' },
      ],
      correctAnswer: 'c',
      explanation: 'extends Node means this script inherits from Node, giving access to all of Node\'s built-in functions like _ready() and _process().',
    },
    {
      id: 'gd-q0-5',
      type: 'true-false',
      prompt: 'In GDScript, you must end every statement with a semicolon (;).',
      correctAnswer: 'false',
      explanation: 'GDScript does not use semicolons. Statements end at the newline, just like Python.',
    },
    {
      id: 'gd-q0-6',
      type: 'multiple-choice',
      prompt: 'How do you write a comment in GDScript?',
      choices: [
        { id: 'a', text: '// This is a comment' },
        { id: 'b', text: '/* comment */' },
        { id: 'c', text: '# This is a comment' },
        { id: 'd', text: '-- This is a comment' },
      ],
      correctAnswer: 'c',
      explanation: 'GDScript uses the # symbol for comments — everything after # on a line is ignored by the engine.',
    },
    {
      id: 'gd-q0-7',
      type: 'true-false',
      prompt: 'GDScript uses curly braces {} to define code blocks, like JavaScript and Java.',
      correctAnswer: 'false',
      explanation: 'GDScript uses indentation to define code blocks, not curly braces. This is the same approach Python uses.',
    },
    {
      id: 'gd-q0-8',
      type: 'multiple-choice',
      prompt: 'What is the purpose of the `pass` keyword in GDScript?',
      choices: [
        { id: 'a', text: 'It skips the current loop iteration' },
        { id: 'b', text: 'It returns a value from a function' },
        { id: 'c', text: 'It is a placeholder so an empty block stays valid' },
        { id: 'd', text: 'It passes a variable to another function' },
      ],
      correctAnswer: 'c',
      explanation: 'pass is used when you need a code block (like a function body) but have nothing to put there yet. It keeps the script valid.',
    },
  ],
};

export default module0;
