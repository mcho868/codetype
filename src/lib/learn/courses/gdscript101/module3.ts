import type { Module } from '../python101/types';

const module3: Module = {
  id: 'gd-module-3',
  slug: '3',
  title: 'Functions & Randomness',
  description: 'Write reusable functions with parameters and return values, add static types, and generate random numbers.',
  icon: '⚙️',
  color: 'from-cyan-500 to-sky-400',
  locked: false,
  lessons: [
    {
      id: 'gd-lesson-3-1',
      title: 'Functions',
      content: `**Functions** let you write reusable blocks of code. In GDScript, functions are declared with the **\`func\`** keyword:

\`\`\`
func function_name():
    # code here
\`\`\`

Functions can accept **parameters** (inputs) and **return** a value with \`return\`.

You can add **static type annotations** to parameters and return types for safety and editor autocomplete:
\`\`\`
func add(a: int, b: int) -> int:
    return a + b
\`\`\`

The \`->\` arrow specifies the return type. If a function returns nothing, use \`-> void\` or omit the return type entirely.

Functions should be named in **snake_case** and given names that describe what they do.`,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

func greet(name: String) -> void:
    print("Hello, " + name + "!")

func _ready():
    greet("Alice")  # Hello, Alice!
    greet("Bob")    # Hello, Bob!`,
          caption: 'A function with a typed parameter and no return value',
        },
        {
          language: 'python',
          code: `extends Node

func add(a: int, b: int) -> int:
    return a + b

func _ready():
    var result = add(10, 5)
    print(result)  # 15`,
          caption: 'A function with parameters and a typed return value',
        },
        {
          language: 'python',
          code: `extends Node

func calculate_damage(base: float, multiplier: float) -> float:
    return base * multiplier

func is_alive(health: int) -> bool:
    return health > 0

func _ready():
    print(calculate_damage(50.0, 1.5))  # 75.0
    print(is_alive(100))                # true
    print(is_alive(0))                  # false`,
          caption: 'Functions returning float and bool',
        },
      ],
    },
    {
      id: 'gd-lesson-3-2',
      title: 'Random Numbers',
      content: `GDScript has built-in functions for generating random numbers, which are useful for gameplay variety, procedural generation, and probability.

**Key random functions:**
- \`randf()\` — returns a random float between \`0.0\` and \`1.0\`
- \`randf_range(min, max)\` — returns a random float between min and max
- \`randi_range(min, max)\` — returns a random integer between min and max (inclusive)

These are global functions available anywhere in GDScript — no import needed.

**Use cases:**
- Random movement direction: \`randf_range(-1.0, 1.0)\`
- Random loot drop: \`randi_range(1, 100)\`
- Probability check: \`if randf() < 0.2: # 20% chance\``,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

func _ready():
    var chance = randf()          # float between 0.0 and 1.0
    var speed = randf_range(50.0, 200.0)  # float between 50 and 200
    var damage = randi_range(10, 30)      # int between 10 and 30

    print(chance)   # e.g. 0.742
    print(speed)    # e.g. 137.5
    print(damage)   # e.g. 23`,
          caption: 'randf(), randf_range(), randi_range()',
        },
        {
          language: 'python',
          code: `extends Node

func _ready():
    # 20% chance of a critical hit
    if randf() < 0.2:
        print("Critical hit!")
    else:
        print("Normal hit")

    # Random starting position X between -500 and 500
    var start_x = randf_range(-500.0, 500.0)
    print("Starting at: " + str(start_x))`,
          caption: 'Practical uses of randomness in game logic',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'gd-q3-1',
      type: 'multiple-choice',
      prompt: 'What keyword declares a function in GDScript?',
      choices: [
        { id: 'a', text: 'function' },
        { id: 'b', text: 'def' },
        { id: 'c', text: 'fn' },
        { id: 'd', text: 'func' },
      ],
      correctAnswer: 'd',
      explanation: 'GDScript uses func to declare functions: func my_function():',
    },
    {
      id: 'gd-q3-2',
      type: 'fill-in-blank',
      prompt: 'Complete the typed function signature that returns an int:\n    func add(a: int, b: int) __ int:',
      correctAnswer: '->',
      explanation: 'The -> arrow specifies the return type: func add(a: int, b: int) -> int: means the function returns an integer.',
    },
    {
      id: 'gd-q3-3',
      type: 'multiple-choice',
      prompt: 'What does `randf_range(1.0, 10.0)` return?',
      choices: [
        { id: 'a', text: 'A random integer between 1 and 10' },
        { id: 'b', text: 'Always 5.0 (the midpoint)' },
        { id: 'c', text: 'A random float between 1.0 and 10.0' },
        { id: 'd', text: 'A random float between 0.0 and 1.0' },
      ],
      correctAnswer: 'c',
      explanation: 'randf_range(min, max) returns a random floating-point number between min and max.',
    },
    {
      id: 'gd-q3-4',
      type: 'true-false',
      prompt: '`randf()` returns a random float between 0.0 and 1.0.',
      correctAnswer: 'true',
      explanation: 'randf() always produces a value in [0.0, 1.0]. It\'s useful for probability checks like "if randf() < 0.3: # 30% chance".',
    },
    {
      id: 'gd-q3-5',
      type: 'multiple-choice',
      prompt: 'What does `-> void` mean in a function signature?',
      choices: [
        { id: 'a', text: 'The function returns an empty string' },
        { id: 'b', text: 'The function takes no parameters' },
        { id: 'c', text: 'The function returns nothing' },
        { id: 'd', text: 'The function is private' },
      ],
      correctAnswer: 'c',
      explanation: '-> void means the function does not return a value. You can also omit the return type entirely for the same effect.',
    },
    {
      id: 'gd-q3-6',
      type: 'multiple-choice',
      prompt: 'Which function returns a random whole number in a range?',
      choices: [
        { id: 'a', text: 'randf()' },
        { id: 'b', text: 'randf_range()' },
        { id: 'c', text: 'randi_range()' },
        { id: 'd', text: 'rand_int()' },
      ],
      correctAnswer: 'c',
      explanation: 'randi_range(min, max) returns a random integer (whole number) between min and max inclusive.',
    },
    {
      id: 'gd-q3-7',
      type: 'true-false',
      prompt: 'In GDScript, a function can only have one parameter.',
      correctAnswer: 'false',
      explanation: 'Functions can have any number of parameters separated by commas: func f(a: int, b: float, c: String):',
    },
    {
      id: 'gd-q3-8',
      type: 'multiple-choice',
      prompt: 'What is printed?\n    func double(n: int) -> int:\n        return n * 2\n    print(double(7))',
      choices: [
        { id: 'a', text: '7' },
        { id: 'b', text: '14' },
        { id: 'c', text: '2' },
        { id: 'd', text: 'double(7)' },
      ],
      correctAnswer: 'b',
      explanation: 'double(7) returns 7 * 2 = 14. The return value is passed to print(), so 14 is printed.',
    },
  ],
};

export default module3;
