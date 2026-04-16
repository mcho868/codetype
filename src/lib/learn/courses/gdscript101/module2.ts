import type { Module } from '../python101/types';

const module2: Module = {
  id: 'gd-module-2',
  slug: '2',
  title: 'Control Flow',
  description: 'Branch your logic with if/elif/else conditions and match statements for clean multi-case handling.',
  icon: '🔀',
  color: 'from-yellow-500 to-amber-400',
  locked: false,
  lessons: [
    {
      id: 'gd-lesson-2-1',
      title: 'If / elif / else',
      content: `**If statements** let your code make decisions based on conditions.

Syntax:
\`\`\`
if condition:
    # runs if condition is true
elif other_condition:
    # runs if the first was false but this is true
else:
    # runs if none of the above were true
\`\`\`

**Comparison operators**:
- \`<\` less than, \`>\` greater than
- \`<=\` less than or equal, \`>=\` greater than or equal
- \`==\` equal to, \`!=\` not equal to

**Logical operators** combine conditions:
- \`and\` — both must be true
- \`or\` — at least one must be true
- \`not\` — inverts the condition`,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

func _ready():
    var health = 75

    if health <= 0:
        print("Dead")
    elif health <= 30:
        print("Critical!")
    elif health <= 60:
        print("Hurt")
    else:
        print("Healthy")  # prints this`,
          caption: 'if / elif / else chain',
        },
        {
          language: 'python',
          code: `extends Node

func _ready():
    var is_grounded = true
    var has_jumps = true

    if is_grounded and has_jumps:
        print("Can jump!")

    var speed = 0
    if speed == 0 or not is_grounded:
        print("Standing still or in air")`,
          caption: 'Logical operators: and, or, not',
        },
        {
          language: 'python',
          code: `extends Node

func _ready():
    var score = 87

    # Nested if — checks conditions within conditions
    if score >= 50:
        if score >= 90:
            print("A grade")
        else:
            print("Passing")
    else:
        print("Failing")`,
          caption: 'Nested if statements',
        },
      ],
    },
    {
      id: 'gd-lesson-2-2',
      title: 'Match Statements',
      content: `**Match** is GDScript's equivalent of the \`switch\` statement found in other languages.

It compares a variable against a list of possible values and runs the matching block. It's especially useful when combined with enums.

Syntax:
\`\`\`
match variable:
    value1:
        # runs if variable == value1
    value2:
        # runs if variable == value2
    _:
        # default case — runs if nothing else matched
\`\`\`

The **\`_:\`** (underscore) is the default/catch-all case — like \`else\` in an if statement.

Match is often cleaner than a long if/elif chain when you have many discrete values to check.`,
      codeExamples: [
        {
          language: 'python',
          code: `extends Node

enum Alignment { ALLY, NEUTRAL, ENEMY }

func _ready():
    var my_alignment = Alignment.ENEMY

    match my_alignment:
        Alignment.ALLY:
            print("Hello, friend!")
        Alignment.NEUTRAL:
            print("I come in peace!")
        Alignment.ENEMY:
            print("TASTE MY WRATH!")
        _:
            print("Who art thou?")`,
          caption: 'match with an enum and a default case (_:)',
        },
        {
          language: 'python',
          code: `extends Node

func _ready():
    var day = "Monday"

    match day:
        "Saturday", "Sunday":
            print("Weekend!")
        "Monday":
            print("Start of the week")
        _:
            print("A weekday")`,
          caption: 'Matching strings — multiple values on one line with a comma',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'gd-q2-1',
      type: 'multiple-choice',
      prompt: 'What keyword handles additional conditions after an `if` in GDScript?',
      choices: [
        { id: 'a', text: 'else if' },
        { id: 'b', text: 'elsif' },
        { id: 'c', text: 'elif' },
        { id: 'd', text: 'elseif' },
      ],
      correctAnswer: 'c',
      explanation: 'GDScript uses elif (short for "else if") to check additional conditions after the initial if.',
    },
    {
      id: 'gd-q2-2',
      type: 'fill-in-blank',
      prompt: 'Which operator checks if two values are equal in GDScript?\n    if score _____ 100:',
      correctAnswer: '==',
      explanation: '== is the equality operator. A single = is assignment; == is comparison.',
    },
    {
      id: 'gd-q2-3',
      type: 'multiple-choice',
      prompt: 'What does `and` do in an if condition?',
      choices: [
        { id: 'a', text: 'At least one condition must be true' },
        { id: 'b', text: 'Both conditions must be true' },
        { id: 'c', text: 'Inverts the condition' },
        { id: 'd', text: 'Runs the next condition if the first fails' },
      ],
      correctAnswer: 'b',
      explanation: 'and requires both conditions to be true. If either is false, the whole expression is false.',
    },
    {
      id: 'gd-q2-4',
      type: 'multiple-choice',
      prompt: 'What is the `match` statement equivalent to in other languages?',
      choices: [
        { id: 'a', text: 'foreach loop' },
        { id: 'b', text: 'while loop' },
        { id: 'c', text: 'switch statement' },
        { id: 'd', text: 'try/catch' },
      ],
      correctAnswer: 'c',
      explanation: 'match is GDScript\'s equivalent of the switch statement found in C, JavaScript, Java, and similar languages.',
    },
    {
      id: 'gd-q2-5',
      type: 'true-false',
      prompt: 'In a match statement, `_:` is the default case that runs if no other case matched.',
      correctAnswer: 'true',
      explanation: 'The underscore _ is the wildcard/default in a match statement. It runs if none of the specific cases matched — equivalent to else.',
    },
    {
      id: 'gd-q2-6',
      type: 'multiple-choice',
      prompt: 'What is printed?\n    var x = 15\n    if x > 20:\n        print("A")\n    elif x > 10:\n        print("B")\n    else:\n        print("C")',
      choices: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
        { id: 'c', text: 'C' },
        { id: 'd', text: 'Nothing' },
      ],
      correctAnswer: 'b',
      explanation: 'x = 15, so x > 20 is false. Then x > 10 is true (15 > 10), so "B" is printed.',
    },
    {
      id: 'gd-q2-7',
      type: 'true-false',
      prompt: 'The `or` operator requires both conditions to be true.',
      correctAnswer: 'false',
      explanation: 'or only requires at least one condition to be true. If either side is true, the whole expression is true.',
    },
    {
      id: 'gd-q2-8',
      type: 'multiple-choice',
      prompt: 'Which comparison operator means "not equal to"?',
      choices: [
        { id: 'a', text: '<>' },
        { id: 'b', text: '!=' },
        { id: 'c', text: '=/=' },
        { id: 'd', text: 'not ==' },
      ],
      correctAnswer: 'b',
      explanation: '!= is the not-equal-to operator in GDScript. a != b is true if a and b have different values.',
    },
  ],
};

export default module2;
