import type { Module } from '../python101/types';

const module1: Module = {
  id: 'gd-module-1',
  slug: '1',
  title: 'Variables & Data Types',
  description: 'Declare variables, use arithmetic operators, understand GDScript\'s data types, static typing, @export, and constants.',
  icon: '📦',
  color: 'from-lime-500 to-green-400',
  locked: false,
  lessons: [
    {
      id: 'gd-lesson-1-1',
      title: 'Variables & Operators',
      content: `In GDScript, variables are declared with the **\`var\`** keyword:
\`var my_variable = 10\`

GDScript supports the standard **arithmetic operators**: \`+\`, \`-\`, \`*\`, \`/\`

And **compound assignment operators** that modify a variable in place:
- \`x += 5\` — add 5 to x
- \`x -= 5\` — subtract 5 from x
- \`x *= 2\` — multiply x by 2
- \`x /= 2\` — divide x by 2

Variable names should be in **snake_case** (e.g. \`my_speed\`, \`player_health\`) by GDScript convention.`,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

func _ready():
    var score = 0
    score += 10  # score is now 10
    score += 5   # score is now 15
    score -= 3   # score is now 12
    print(score) # prints 12`,
          caption: 'Declaring a variable and using compound operators',
        },
        {
          language: 'python',
          code: `extends Node

func _ready():
    var speed = 100.0
    speed *= 1.5   # speed is now 150.0
    speed /= 2.0   # speed is now 75.0
    print(speed)`,
          caption: 'Multiply and divide compound operators',
        },
      ],
    },
    {
      id: 'gd-lesson-1-2',
      title: 'Data Types',
      content: `GDScript is **dynamically typed** by default — the engine figures out the type from the assigned value.

The core data types:
- **bool** — \`true\` or \`false\`
- **int** — whole numbers: \`42\`, \`-7\`
- **float** — decimal numbers: \`3.14\`, \`-0.5\`
- **String** — text in double quotes: \`"Hello"\`

**Casting** converts between types:
- \`str(42)\` → \`"42"\` (int to String)
- \`int("7")\` → \`7\` (String to int)
- \`float(3)\` → \`3.0\` (int to float)

GDScript also has **Vector2** and **Vector3** for 2D and 3D coordinates:
- \`Vector2(x, y)\` — e.g. \`Vector2(100.0, 200.0)\`
- \`Vector3(x, y, z)\` — e.g. \`Vector3(1.0, 0.0, 0.0)\``,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

func _ready():
    var is_alive: bool = true
    var health: int = 100
    var speed: float = 5.75
    var name: String = "Hero"

    print(is_alive)  # true
    print(health)    # 100
    print(speed)     # 5.75
    print(name)      # Hero`,
          caption: 'The four core data types',
        },
        {
          language: 'python',
          code: `extends Node

func _ready():
    var level = 5
    var message = "You are level: " + str(level)
    print(message)  # You are level: 5

    var input = "42"
    var number = int(input) + 8
    print(number)   # 50`,
          caption: 'Casting between types with str() and int()',
        },
        {
          language: 'python',
          code: `extends Node

func _ready():
    var pos = Vector2(100.0, 200.0)
    var direction = Vector3(1.0, 0.0, 0.0)
    print(pos)        # (100, 200)
    print(direction)  # (1, 0, 0)`,
          caption: 'Vector2 and Vector3 for positions and directions',
        },
      ],
    },
    {
      id: 'gd-lesson-1-3',
      title: 'Static Typing, @export & const',
      content: `**Static typing** lets you explicitly declare a variable's type for better safety and editor autocompletion.

You can use \`:=\` (walrus/infer operator) to let GDScript infer the type from the value while still locking it in:
\`var speed := 5.0  # inferred as float\`

Or annotate the type explicitly:
\`var health: int = 100\`

**\`@export\`** exposes a variable to the **Godot Inspector**, so you can set its value per-node without touching code:
\`@export var speed: float = 5.0\`

**\`const\`** declares a value that **cannot change** after it's set:
\`const MAX_HEALTH = 100\`

Constants are written in SCREAMING_SNAKE_CASE by convention.`,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

# Explicit type annotation
var health: int = 100

# Inferred static type — Godot locks it as float
var speed := 5.0

func _ready():
    health -= 20
    print(health)  # 80`,
          caption: 'Static typing with : type and := inference',
        },
        {
          language: 'python',
          code: `extends CharacterBody2D

# Visible and editable in the Godot Inspector
@export var move_speed: float = 200.0
@export var jump_height: float = 400.0

func _ready():
    print(move_speed)`,
          caption: '@export makes variables editable in the Inspector',
        },
        {
          language: 'python',
          code: `extends Node

const MAX_HEALTH = 100
const GRAVITY = 9.8
const GAME_NAME = "My Game"

func _ready():
    print(MAX_HEALTH)   # 100
    print(GRAVITY)      # 9.8
    # MAX_HEALTH = 200  # Error: constants cannot be changed`,
          caption: 'Constants with const — use SCREAMING_SNAKE_CASE',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'gd-q1-1',
      type: 'multiple-choice',
      prompt: 'Which keyword is used to declare a variable in GDScript?',
      choices: [
        { id: 'a', text: 'let' },
        { id: 'b', text: 'variable' },
        { id: 'c', text: 'var' },
        { id: 'd', text: 'def' },
      ],
      correctAnswer: 'c',
      explanation: 'Variables in GDScript are declared with the var keyword: var my_score = 0',
    },
    {
      id: 'gd-q1-2',
      type: 'multiple-choice',
      prompt: 'What does `score += 10` do?',
      choices: [
        { id: 'a', text: 'Creates a new variable score with value 10' },
        { id: 'b', text: 'Adds 10 to the current value of score' },
        { id: 'c', text: 'Sets score to exactly 10' },
        { id: 'd', text: 'Multiplies score by 10' },
      ],
      correctAnswer: 'b',
      explanation: '+= is the compound addition operator. score += 10 is shorthand for score = score + 10.',
    },
    {
      id: 'gd-q1-3',
      type: 'fill-in-blank',
      prompt: 'What function converts an integer to a String in GDScript?\n    var text = _____(42)  # "42"',
      correctAnswer: 'str',
      explanation: 'str() converts a value to its String representation. str(42) returns "42".',
    },
    {
      id: 'gd-q1-4',
      type: 'multiple-choice',
      prompt: 'What data type is used for true/false values in GDScript?',
      choices: [
        { id: 'a', text: 'bit' },
        { id: 'b', text: 'boolean' },
        { id: 'c', text: 'bool' },
        { id: 'd', text: 'flag' },
      ],
      correctAnswer: 'c',
      explanation: 'GDScript uses bool for true/false values: var is_alive: bool = true',
    },
    {
      id: 'gd-q1-5',
      type: 'true-false',
      prompt: '`@export` makes a variable visible and editable in the Godot Inspector.',
      correctAnswer: 'true',
      explanation: '@export exposes the variable as an Inspector property, so you can set different values per node instance without editing code.',
    },
    {
      id: 'gd-q1-6',
      type: 'multiple-choice',
      prompt: 'What does `var speed := 5.0` do differently than `var speed = 5.0`?',
      choices: [
        { id: 'a', text: 'Nothing — they are identical' },
        { id: 'b', text: ':= locks the variable type as float based on the value' },
        { id: 'c', text: ':= makes the variable a constant' },
        { id: 'd', text: ':= exports the variable to the Inspector' },
      ],
      correctAnswer: 'b',
      explanation: ':= uses type inference — GDScript infers the type from the value and statically types the variable. speed becomes a float and can never hold a non-float.',
    },
    {
      id: 'gd-q1-7',
      type: 'multiple-choice',
      prompt: 'What naming convention does GDScript use for variables and functions?',
      choices: [
        { id: 'a', text: 'camelCase' },
        { id: 'b', text: 'PascalCase' },
        { id: 'c', text: 'snake_case' },
        { id: 'd', text: 'SCREAMING_SNAKE_CASE' },
      ],
      correctAnswer: 'c',
      explanation: 'GDScript convention uses snake_case for variables and functions (e.g. player_health, move_speed). Constants use SCREAMING_SNAKE_CASE.',
    },
    {
      id: 'gd-q1-8',
      type: 'true-false',
      prompt: 'A variable declared with `const` can be reassigned to a new value during gameplay.',
      correctAnswer: 'false',
      explanation: 'const declares a value that cannot change. Trying to reassign a const will cause an error.',
    },
  ],
};

export default module1;
