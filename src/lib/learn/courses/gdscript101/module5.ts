import type { Module } from '../python101/types';

const module5: Module = {
  id: 'gd-module-5',
  slug: '5',
  title: 'Nodes & Signals',
  description: 'Reference nodes with $ and @onready, respond to events with signals, and control variables with get/set.',
  icon: '📡',
  color: 'from-violet-500 to-purple-400',
  locked: false,
  lessons: [
    {
      id: 'gd-lesson-5-1',
      title: 'Referencing Nodes',
      content: `In Godot, your game is made of **nodes** arranged in a tree. Scripts need to reference these nodes to interact with them.

**Dollar sign shorthand** — drag a node into a script to auto-generate a reference:
\`$Player\`  or  \`$Player/Weapon\`

\`$\` is shorthand for \`get_node()\`. These two are identical:
\`\`\`
$Weapon
get_node("Weapon")
\`\`\`

**@onready** — when you store a node reference in a variable at the top of a script, use \`@onready\` to ensure the node exists before the variable is assigned. Without it, the node might not be in the tree yet when the script loads:
\`\`\`
@onready var weapon = $Player/Weapon
\`\`\`

**Using @export for node references** — a more flexible approach that doesn't break when you rename nodes:
\`\`\`
@export var my_node: Node
\`\`\`
Then assign the node in the Inspector by dragging or clicking Assign.

You can check if a node is a certain type with \`is\`:
\`\`\`
if my_node is Node2D:
    print("It's a 2D node!")
\`\`\``,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

# @onready ensures the node exists before this variable is set
@onready var weapon = $Player/Weapon

func _ready():
    print(weapon.get_path())  # prints the absolute path to Weapon`,
          caption: '@onready stores a node reference safely',
        },
        {
          language: 'python',
          code: `extends Node

# @export lets you assign the node in the Inspector
@export var my_node: Node

func _ready():
    if my_node is Node2D:
        print("Is 2D!")

    # Only accept Sprite2D nodes
    # @export var graphic: Sprite2D`,
          caption: '@export var for flexible node references, with type checking',
        },
      ],
    },
    {
      id: 'gd-lesson-5-2',
      title: 'Signals',
      content: `**Signals** are messages that nodes send to notify that something happened. They are how nodes communicate without depending on each other directly — this is called **decoupling**.

**Using built-in signals** — many Godot nodes emit signals automatically. For example, a \`Button\` emits \`pressed()\` when clicked, and a \`Timer\` emits \`timeout()\` when it reaches zero.

**Creating your own signal:**
\`signal my_signal\`

**Emitting a signal:**
\`my_signal.emit()\`

**Connecting signals in code:**
\`my_signal.connect(_on_my_signal)\`

Signals can carry **parameters** to pass data to connected functions:
\`\`\`
signal leveled_up(message: String)
leveled_up.emit("GZ!")
\`\`\``,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

signal leveled_up

var xp = 0

func _on_timer_timeout():
    xp += 1
    print(xp)
    if xp >= 20:
        xp = 0
        leveled_up.emit()

func _on_leveled_up():
    print("DING!")`,
          caption: 'Custom signal created with signal, emitted with .emit()',
        },
        {
          language: 'python',
          code: `extends Node

signal leveled_up(message: String)

func _ready():
    # Connect signal through code instead of the editor
    leveled_up.connect(_on_leveled_up)

func _on_leveled_up(message: String):
    print(message)  # prints "GZ!"

func level_up():
    leveled_up.emit("GZ!")`,
          caption: 'Signals with parameters and code-based connection',
        },
      ],
    },
    {
      id: 'gd-lesson-5-3',
      title: 'Getters & Setters',
      content: `**Getters and setters** let you run custom code whenever a variable is read or written. They're declared with a colon after the variable definition.

**Setter** — runs when a value is assigned to the variable. Useful for clamping, validation, or emitting a signal on change:
\`\`\`
var health = 100:
    set(value):
        health = clamp(value, 0, 100)
\`\`\`

**Getter** — runs when the variable is read. Useful for computed/derived values:
\`\`\`
var chance_pct: int:
    get:
        return int(chance * 100)
\`\`\`

\`clamp(value, min, max)\` returns the value clamped between min and max.`,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

signal health_changed(new_health: int)

var health = 100:
    set(value):
        health = clamp(value, 0, 100)
        health_changed.emit(health)

func _ready():
    health = -150  # clamped to 0, emits signal`,
          caption: 'Setter with clamping and signal emission',
        },
        {
          language: 'python',
          code: `extends Node

var chance = 0.2

var chance_pct: int:
    get:
        return int(chance * 100)
    set(value):
        chance = float(value) / 100.0

func _ready():
    print(chance_pct)  # 20

    chance = 0.6
    print(chance_pct)  # 60

    chance_pct = 40    # sets chance to 0.4
    print(chance)      # 0.4`,
          caption: 'Getter converts chance to percentage; setter works backwards',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'gd-q5-1',
      type: 'multiple-choice',
      prompt: 'What is `$Weapon` shorthand for in GDScript?',
      choices: [
        { id: 'a', text: 'export var Weapon' },
        { id: 'b', text: 'get_node("Weapon")' },
        { id: 'c', text: 'find_node("Weapon")' },
        { id: 'd', text: 'load("Weapon")' },
      ],
      correctAnswer: 'b',
      explanation: '$ is shorthand for get_node(). $Weapon and get_node("Weapon") are identical.',
    },
    {
      id: 'gd-q5-2',
      type: 'true-false',
      prompt: '`@onready` ensures a variable is assigned after all child nodes have entered the scene tree.',
      correctAnswer: 'true',
      explanation: '@onready delays the variable assignment until _ready() time, when all child nodes exist. Without it, you might reference a node that doesn\'t exist yet.',
    },
    {
      id: 'gd-q5-3',
      type: 'multiple-choice',
      prompt: 'What is the main benefit of using signals for node communication?',
      choices: [
        { id: 'a', text: 'Signals run faster than function calls' },
        { id: 'b', text: 'Signals allow nodes to communicate without being directly aware of each other (decoupling)' },
        { id: 'c', text: 'Signals prevent all runtime errors' },
        { id: 'd', text: 'Signals automatically save game state' },
      ],
      correctAnswer: 'b',
      explanation: 'Signals decouple nodes — a node emitting a signal has no knowledge of what (if anything) is listening. This makes code modular and easier to maintain.',
    },
    {
      id: 'gd-q5-4',
      type: 'fill-in-blank',
      prompt: 'How do you emit a custom signal called `leveled_up`?\n    leveled_up.________()',
      correctAnswer: 'emit',
      explanation: 'Use .emit() to fire a signal: leveled_up.emit(). Pass arguments inside the parentheses if the signal has parameters.',
    },
    {
      id: 'gd-q5-5',
      type: 'multiple-choice',
      prompt: 'What keyword declares a new signal in GDScript?',
      choices: [
        { id: 'a', text: 'emit' },
        { id: 'b', text: 'event' },
        { id: 'c', text: 'signal' },
        { id: 'd', text: 'connect' },
      ],
      correctAnswer: 'c',
      explanation: 'Custom signals are declared with the signal keyword: signal leveled_up',
    },
    {
      id: 'gd-q5-6',
      type: 'true-false',
      prompt: 'A setter in GDScript runs automatically whenever the variable is assigned a new value.',
      correctAnswer: 'true',
      explanation: 'The set(value) block runs every time you write variable = something. You can use this to validate or clamp the value before it\'s actually stored.',
    },
    {
      id: 'gd-q5-7',
      type: 'multiple-choice',
      prompt: 'What does `clamp(value, 0, 100)` return if value is -50?',
      choices: [
        { id: 'a', text: '-50' },
        { id: 'b', text: '0' },
        { id: 'c', text: '100' },
        { id: 'd', text: '50' },
      ],
      correctAnswer: 'b',
      explanation: 'clamp() clamps a value between a minimum and maximum. -50 is below 0, so it returns 0.',
    },
    {
      id: 'gd-q5-8',
      type: 'multiple-choice',
      prompt: 'Why is `@export var my_node: Node` preferable to using a path like `$Player/Weapon`?',
      choices: [
        { id: 'a', text: '@export is faster at runtime' },
        { id: 'b', text: '@export doesn\'t break if you rename nodes in the scene tree' },
        { id: 'c', text: '@export only works with Node2D nodes' },
        { id: 'd', text: 'Paths can only go one level deep' },
      ],
      correctAnswer: 'b',
      explanation: 'Paths break if you rename any node along the path. @export lets you set the reference in the Inspector and is unaffected by node renames.',
    },
  ],
};

export default module5;
