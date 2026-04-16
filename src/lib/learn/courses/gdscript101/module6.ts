import type { Module } from '../python101/types';

const module6: Module = {
  id: 'gd-module-6',
  slug: '6',
  title: 'Classes & Inheritance',
  description: 'Structure your code with classes, class_name, inner classes, inheritance with extends, and the "call down, signal up" principle.',
  icon: '🏛️',
  color: 'from-rose-500 to-pink-400',
  locked: false,
  lessons: [
    {
      id: 'gd-lesson-6-1',
      title: 'Classes & class_name',
      content: `In GDScript, **every script is effectively a class**. You can make it a named, reusable class by declaring \`class_name\` at the top of the file.

\`class_name Character\`

Once you give a script a class name, Godot registers it globally. You can:
- Use it as a type for \`@export\` variables: \`@export var target: Character\`
- Find it in the "Add Node" list in the Godot editor

**Classes have:**
- **Variables** — the data (properties) of each instance
- **Functions** — the behavior (methods) of each instance

**Instances** are created with \`.new()\`:
\`var my_object = MyClass.new()\`

But for node-based classes (scripts attached to nodes), you instance them by adding nodes to the scene — Godot handles instantiation for you.`,
      codeExamples: [
        {
          language: 'python',
          code: `# File: character.gd
extends Node
class_name Character

@export var profession: String
@export var health: int

func die():
    health = 0
    print(profession + " died.")`,
          caption: 'A class defined with class_name — Godot registers it globally',
        },
        {
          language: 'python',
          code: `# File: main.gd
extends Node

# We can use Character as a type because of class_name
@export var character_to_kill: Character

func _ready():
    character_to_kill.die()  # calls the die() method on the assigned character`,
          caption: 'Using a named class as an @export type in another script',
        },
      ],
    },
    {
      id: 'gd-lesson-6-2',
      title: 'Inner Classes',
      content: `**Inner classes** are classes defined inside another class. They're useful for grouping related variables together — a cleaner and type-safer alternative to a dictionary.

Declare an inner class with the \`class\` keyword inside a script:
\`\`\`
class Equipment:
    var armor = 10
    var weight = 5
\`\`\`

Create instances with \`.new()\`:
\`var chest = Equipment.new()\`

Then access and modify properties:
\`chest.armor = 20\`

The advantage over a dictionary is **type safety** — the GDScript editor knows which properties exist on the inner class and will show an error if you try to access a property that doesn't exist.`,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node
class_name Character

# Inner class — acts like a typed record/struct
class Equipment:
    var armor = 10
    var weight = 5

var chest = Equipment.new()
var legs = Equipment.new()

func _ready():
    chest.armor = 20  # override default
    print(chest.armor)   # 20
    print(legs.weight)   # 5 (default)`,
          caption: 'Inner class used to group related data with type safety',
        },
      ],
    },
    {
      id: 'gd-lesson-6-3',
      title: 'Inheritance',
      content: `**Inheritance** lets one class derive from another, gaining all its variables and functions.

In GDScript, this is done with \`extends\`:
\`extends Node\` means your script inherits from Godot's built-in \`Node\` class.

You've been using this from the very start — every script \`extends\` something.

**Godot's node tree is built on inheritance.** For example:
- \`Sprite2D\` and \`Camera2D\` both extend \`Node2D\`
- \`Node2D\` extends \`CanvasItem\`
- \`CanvasItem\` extends \`Node\`

When making a player controller, you extend \`CharacterBody2D\` to get access to \`velocity\` and \`move_and_slide()\`.

**Key point:** When you write \`class_name Character\` and it extends \`Node\`, Godot shows \`Character\` as a new node type in the editor — because it IS a new node type, one that extends Node.`,
      codeExamples: [
        {
          language: 'python',
          code: `# A player script that extends CharacterBody2D
extends CharacterBody2D
class_name Player

const SPEED = 200.0
const JUMP_VELOCITY = -400.0

func _physics_process(delta: float) -> void:
    # move_and_slide() is inherited from CharacterBody2D
    move_and_slide()`,
          caption: 'extends CharacterBody2D gives access to velocity and move_and_slide()',
        },
        {
          language: 'python',
          code: `# Node2D inheritance chain:
# Node <- CanvasItem <- Node2D <- Sprite2D
#                              <- Camera2D
# Both Camera2D and Sprite2D inherit position/rotation from Node2D`,
          caption: 'Godot\'s node types are organized through inheritance',
        },
      ],
    },
    {
      id: 'gd-lesson-6-4',
      title: 'Call Down, Signal Up',
      content: `**"Call down, signal up"** is the most important architectural principle in Godot scripting.

In a scene, nodes are organized in a **tree hierarchy** — parent nodes above, child nodes below.

The rule:
- **Nodes CAN call functions on their children** (calling down the tree is fine)
- **Nodes should NOT call functions on their parents** — instead, emit a signal upward

Why? If a child calls directly into its parent, the child becomes dependent on that specific parent. The signal approach keeps children generic and reusable.

**Sibling communication** — if two nodes at the same level need to communicate, their common **parent** connects one sibling's signal to the other sibling's function (typically in \`_ready()\`).

Think of it like a workplace: managers can give directions to employees (call down), but employees shouldn't issue orders to managers — they report (signal up) and the manager decides what to do.`,
      codeExamples: [
        {
          language: 'python',
          code: `# Player.gd (child node)
extends Node
class_name Player

signal health_depleted  # signals go UP to parent

var health = 100

func take_damage(amount: int):
    health -= amount
    if health <= 0:
        health_depleted.emit()  # parent decides what happens next`,
          caption: 'Child emits a signal — parent connects to it and decides the response',
        },
        {
          language: 'python',
          code: `# Main.gd (parent node)
extends Node

@onready var player = $Player
@onready var ui = $UI

func _ready():
    # Parent connects siblings together
    # Player's signal -> UI's function
    player.health_depleted.connect(ui.show_game_over)`,
          caption: 'Parent connects sibling signals in _ready() — the "call down, signal up" pattern',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'gd-q6-1',
      type: 'multiple-choice',
      prompt: 'What does `class_name Character` at the top of a script do?',
      choices: [
        { id: 'a', text: 'Creates an instance of a Character immediately' },
        { id: 'b', text: 'Registers the script as a globally named class in Godot' },
        { id: 'c', text: 'Makes all variables in the script public' },
        { id: 'd', text: 'Imports the Character class from another file' },
      ],
      correctAnswer: 'b',
      explanation: 'class_name registers the script as a globally accessible class, making it available as a type and visible in the Add Node dialog.',
    },
    {
      id: 'gd-q6-2',
      type: 'true-false',
      prompt: 'Every GDScript file is effectively a class, even without an explicit `class_name` declaration.',
      correctAnswer: 'true',
      explanation: 'GDScript scripts behave like classes — they have variables and functions, can be instanced, and use inheritance via extends. class_name just gives it a globally accessible name.',
    },
    {
      id: 'gd-q6-3',
      type: 'multiple-choice',
      prompt: 'How do you create an instance of an inner class `Equipment` from inside the same script?',
      choices: [
        { id: 'a', text: 'Equipment()' },
        { id: 'b', text: 'new Equipment()' },
        { id: 'c', text: 'Equipment.new()' },
        { id: 'd', text: 'create(Equipment)' },
      ],
      correctAnswer: 'c',
      explanation: 'Call .new() on the class to create an instance: var chest = Equipment.new()',
    },
    {
      id: 'gd-q6-4',
      type: 'multiple-choice',
      prompt: 'What is the main advantage of an inner class over a dictionary for grouping data?',
      choices: [
        { id: 'a', text: 'Inner classes use less memory' },
        { id: 'b', text: 'Inner classes provide type safety — accessing a non-existent property causes an error before running' },
        { id: 'c', text: 'Inner classes can store more items' },
        { id: 'd', text: 'Dictionaries cannot have nested data' },
      ],
      correctAnswer: 'b',
      explanation: 'Inner classes are type-safe. If you try to access equipment.nonexistent, GDScript flags it as an error immediately. A dictionary silently returns null.',
    },
    {
      id: 'gd-q6-5',
      type: 'fill-in-blank',
      prompt: 'A CharacterBody2D script inherits `move_and_slide()` because it uses which keyword?\n    _______ CharacterBody2D',
      correctAnswer: 'extends',
      explanation: 'extends CharacterBody2D makes all of CharacterBody2D\'s methods and properties available in the script, including velocity and move_and_slide().',
    },
    {
      id: 'gd-q6-6',
      type: 'multiple-choice',
      prompt: 'According to "call down, signal up" — how should a child node notify its parent that something happened?',
      choices: [
        { id: 'a', text: 'Call a function directly on the parent using get_parent()' },
        { id: 'b', text: 'Emit a signal and let the parent connect to it' },
        { id: 'c', text: 'Use a global variable that both nodes can read' },
        { id: 'd', text: 'Access the parent through a path like $../' },
      ],
      correctAnswer: 'b',
      explanation: 'Children signal up — they emit a signal without knowing who is listening. The parent connects to that signal and decides the response. This keeps the child reusable.',
    },
    {
      id: 'gd-q6-7',
      type: 'true-false',
      prompt: 'In Godot, `Sprite2D` and `Camera2D` both inherit from `Node2D`.',
      correctAnswer: 'true',
      explanation: 'Node2D is a base class for all 2D nodes. Both Sprite2D and Camera2D extend Node2D, which is why they both have position and rotation properties.',
    },
    {
      id: 'gd-q6-8',
      type: 'multiple-choice',
      prompt: 'Where should sibling-to-sibling signal connections be set up?',
      choices: [
        { id: 'a', text: 'In each sibling\'s own _ready() function' },
        { id: 'b', text: 'In the common parent\'s _ready() function' },
        { id: 'c', text: 'In a global autoload script' },
        { id: 'd', text: 'Sibling nodes cannot communicate' },
      ],
      correctAnswer: 'b',
      explanation: 'The common parent is responsible for connecting siblings. It connects sibling A\'s signal to sibling B\'s function in its _ready() method.',
    },
  ],
};

export default module6;
