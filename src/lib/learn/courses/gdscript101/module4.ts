import type { Module } from '../python101/types';

const module4: Module = {
  id: 'gd-module-4',
  slug: '4',
  title: 'Collections',
  description: 'Store and iterate over data with arrays, loops, dictionaries, and named constant groups with enums.',
  icon: '🗃️',
  color: 'from-orange-500 to-red-400',
  locked: false,
  lessons: [
    {
      id: 'gd-lesson-4-1',
      title: 'Arrays',
      content: `An **array** stores an ordered list of values. Arrays in GDScript are declared with square brackets:
\`var my_array = ["item1", "item2", "item3"]\`

**Key operations:**
- Access by index: \`my_array[0]\` (arrays are zero-indexed)
- Add to end: \`my_array.append("new_item")\`
- Remove by index: \`my_array.remove_at(0)\`
- Get length: \`my_array.size()\`

You can also create **typed arrays** using \`Array[type]\`:
\`var scores: Array[int] = [10, 20, 30]\`

Typed arrays prevent you from accidentally adding the wrong type of item.`,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

func _ready():
    var inventory = ["Sword", "Shield", "Potion"]

    print(inventory[0])  # Sword
    print(inventory[2])  # Potion
    print(inventory.size())  # 3

    inventory.append("Map")
    print(inventory.size())  # 4`,
          caption: 'Creating an array and using basic operations',
        },
        {
          language: 'python',
          code: `extends Node

func _ready():
    var scores: Array[int] = [50, 75, 90, 100]

    scores.append(60)
    scores.remove_at(0)  # removes 50

    print(scores)        # [75, 90, 100, 60]
    print(scores.size()) # 4`,
          caption: 'Typed array — only ints allowed',
        },
      ],
    },
    {
      id: 'gd-lesson-4-2',
      title: 'Loops',
      content: `GDScript has two main types of loops: **for** and **while**.

**For loop over an array:**
\`\`\`
for item in my_array:
    print(item)
\`\`\`

**For loop over a range of numbers:**
\`\`\`
for n in 5:     # n = 0, 1, 2, 3, 4
    print(n)
\`\`\`

**While loop** — runs as long as a condition is true:
\`\`\`
while condition:
    # code
\`\`\`

**Loop control:**
- \`break\` — exits the loop immediately
- \`continue\` — skips the rest of the current iteration and goes to the next`,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

func _ready():
    var enemies = ["Goblin", "Troll", "Dragon"]

    for enemy in enemies:
        print("Encountered: " + enemy)

    # Loop over a range
    for i in 3:
        print("Round " + str(i))  # 0, 1, 2`,
          caption: 'for loop over an array and a range',
        },
        {
          language: 'python',
          code: `extends Node

func _ready():
    var count = 0
    while count < 5:
        count += 1
        print(count)  # prints 1 through 5`,
          caption: 'while loop with a counter',
        },
        {
          language: 'python',
          code: `extends Node

func _ready():
    for n in 10:
        if n == 3:
            continue  # skip 3
        if n == 7:
            break     # stop at 7
        print(n)      # prints 0, 1, 2, 4, 5, 6`,
          caption: 'break and continue control loop flow',
        },
      ],
    },
    {
      id: 'gd-lesson-4-3',
      title: 'Dictionaries',
      content: `A **dictionary** stores **key-value pairs** — like a lookup table. Each key maps to a value.

\`\`\`
var my_dict = {
    "key1": value1,
    "key2": value2,
}
\`\`\`

Access a value by its key: \`my_dict["key1"]\`

Dictionaries can be **nested** — a value can itself be a dictionary, allowing you to model complex data structures.

You can **loop over the keys** of a dictionary with a for loop:
\`\`\`
for key in my_dict:
    print(key, my_dict[key])
\`\`\``,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

func _ready():
    var player = {
        "name": "Hero",
        "health": 100,
        "level": 5,
    }

    print(player["name"])    # Hero
    print(player["health"])  # 100

    player["level"] += 1
    print(player["level"])   # 6`,
          caption: 'Creating and accessing a dictionary',
        },
        {
          language: 'python',
          code: `extends Node

func _ready():
    # Nested dictionary
    var world = {
        "town": {"population": 200, "has_inn": true},
        "dungeon": {"floors": 5, "has_inn": false},
    }

    print(world["town"]["population"])   # 200
    print(world["dungeon"]["floors"])    # 5`,
          caption: 'Nested dictionaries for complex data',
        },
        {
          language: 'python',
          code: `extends Node

func _ready():
    var stats = {"str": 10, "dex": 14, "int": 8}

    for stat in stats:
        print(stat + ": " + str(stats[stat]))
    # str: 10
    # dex: 14
    # int: 8`,
          caption: 'Looping over dictionary keys',
        },
      ],
    },
    {
      id: 'gd-lesson-4-4',
      title: 'Enums',
      content: `**Enums** define a named set of constant integer values. They make code readable by replacing magic numbers with descriptive names.

\`\`\`
enum MyEnum { VALUE_A, VALUE_B, VALUE_C }
\`\`\`

By default the values are 0, 1, 2... but you can assign custom values:
\`var state = MyEnum.VALUE_A\`

**Named enums** (using a name after \`enum\`) create a dictionary-like object you reference with dot notation.

Enums work especially well with \`match\` statements and with \`@export\` — Godot shows enum members as a dropdown in the Inspector:
\`@export var alignment: Alignment\``,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

enum Alignment { ALLY, NEUTRAL, ENEMY }

func _ready():
    var my_alignment = Alignment.NEUTRAL

    print(my_alignment)           # 1 (NEUTRAL is the second value, index 1)
    print(Alignment.ALLY)         # 0
    print(Alignment.ENEMY)        # 2`,
          caption: 'Named enum — values default to 0, 1, 2...',
        },
        {
          language: 'python',
          code: `extends Node

enum State { IDLE, RUNNING, JUMPING, FALLING }

func _ready():
    var current_state = State.RUNNING

    match current_state:
        State.IDLE:
            print("Standing still")
        State.RUNNING:
            print("Running!")
        State.JUMPING:
            print("In the air")
        _:
            print("Falling")`,
          caption: 'Enum with match for clean state handling',
        },
        {
          language: 'python',
          code: `extends Node

enum Direction { NORTH = 1, EAST = 2, SOUTH = 3, WEST = 4 }

func _ready():
    print(Direction.NORTH)  # 1
    print(Direction.EAST)   # 2
    # Enums with custom values`,
          caption: 'Custom integer values in an enum',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'gd-q4-1',
      type: 'multiple-choice',
      prompt: 'What index does the first element of an array have?',
      choices: [
        { id: 'a', text: '1' },
        { id: 'b', text: '0' },
        { id: 'c', text: '-1' },
        { id: 'd', text: 'It depends on the array size' },
      ],
      correctAnswer: 'b',
      explanation: 'Arrays are zero-indexed. The first element is at index 0, the second at index 1, and so on.',
    },
    {
      id: 'gd-q4-2',
      type: 'fill-in-blank',
      prompt: 'Which method adds an item to the end of an array?\n    my_array.______("new_item")',
      correctAnswer: 'append',
      explanation: 'append() adds an item to the end of the array. Use remove_at(index) to remove items.',
    },
    {
      id: 'gd-q4-3',
      type: 'multiple-choice',
      prompt: 'What does `for n in 4:` iterate over?',
      choices: [
        { id: 'a', text: 'n = 1, 2, 3, 4' },
        { id: 'b', text: 'n = 0, 1, 2, 3' },
        { id: 'c', text: 'n = 0, 1, 2, 3, 4' },
        { id: 'd', text: 'n = 4 only' },
      ],
      correctAnswer: 'b',
      explanation: 'for n in 4 iterates with n = 0, 1, 2, 3 — four iterations starting from zero.',
    },
    {
      id: 'gd-q4-4',
      type: 'true-false',
      prompt: '`break` exits a loop immediately, while `continue` skips to the next iteration.',
      correctAnswer: 'true',
      explanation: 'break stops the entire loop. continue jumps to the next iteration without executing the remaining code in the current one.',
    },
    {
      id: 'gd-q4-5',
      type: 'multiple-choice',
      prompt: 'How do you access the value for key "health" in a dictionary `player`?',
      choices: [
        { id: 'a', text: 'player.health' },
        { id: 'b', text: 'player["health"]' },
        { id: 'c', text: 'player.get("health")' },
        { id: 'd', text: 'get player["health"]' },
      ],
      correctAnswer: 'b',
      explanation: 'Dictionaries are accessed with bracket notation: player["health"]. (GDScript also supports player.health for dict access, but bracket notation is standard.)',
    },
    {
      id: 'gd-q4-6',
      type: 'multiple-choice',
      prompt: 'What are the default values of `enum Color { RED, GREEN, BLUE }`?',
      choices: [
        { id: 'a', text: 'RED=1, GREEN=2, BLUE=3' },
        { id: 'b', text: 'RED=0, GREEN=1, BLUE=2' },
        { id: 'c', text: 'All equal to 0' },
        { id: 'd', text: 'Strings "RED", "GREEN", "BLUE"' },
      ],
      correctAnswer: 'b',
      explanation: 'Enum members auto-increment from 0. RED=0, GREEN=1, BLUE=2 unless you assign custom values.',
    },
    {
      id: 'gd-q4-7',
      type: 'true-false',
      prompt: 'A dictionary value can itself be another dictionary (nested dictionaries are allowed).',
      correctAnswer: 'true',
      explanation: 'Dictionaries can be nested: { "town": { "population": 200 } }. Access with multiple keys: world["town"]["population"].',
    },
    {
      id: 'gd-q4-8',
      type: 'multiple-choice',
      prompt: 'How do you declare a typed array that only holds integers?',
      choices: [
        { id: 'a', text: 'var nums: int[] = []' },
        { id: 'b', text: 'var nums: Array<int> = []' },
        { id: 'c', text: 'var nums: Array[int] = []' },
        { id: 'd', text: 'var nums = int Array()' },
      ],
      correctAnswer: 'c',
      explanation: 'GDScript typed arrays use Array[type] syntax: var nums: Array[int] = [1, 2, 3]',
    },
  ],
};

export default module4;
