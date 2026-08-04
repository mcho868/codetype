import type { Module } from './types';

const module25: Module = {
  id: 'module-25',
  slug: '25',
  title: 'Arrays & ArrayLists',
  description: 'Store related values with arrays and ArrayLists, traverse them safely, and understand generics, wrappers, and multidimensional structure.',
  icon: '🗃️',
  color: 'from-cyan-500 to-sky-400',
  locked: false,
  lessons: [
    {
      id: 'lesson-25-1',
      title: 'Declaring, Creating, and Initializing Arrays',
      content: `Arrays are fixed-length collections of values that all have the **same element type**.

Three creation steps matter:
1. **declare** the array variable
2. **create** the array with \`new\`
3. optionally **initialize** elements

Examples:
\`\`\`java
int[] courseMarks;
courseMarks = new int[10];
\`\`\`

or, with an initializer:
\`\`\`java
int[] courseMarks = new int[]{26, 73, 55, 97};
\`\`\`

Key points:
- arrays are **objects** in Java
- indexing starts at **0**
- valid indexes run from \`0\` to \`length - 1\`
- array length is fixed once created
- default values depend on element type:
  - \`int\` -> \`0\`
  - \`boolean\` -> \`false\`
  - reference types like \`String\` -> \`null\``,
      codeExamples: [
        {
          language: 'java',
          code: `public class Main {
    public static void main(String[] args) {
        int[] courseMarks = new int[]{26, 73, 55, 97};
        String[] names = new String[3];

        System.out.println(courseMarks.length);
        System.out.println(courseMarks[2]);
        System.out.println(names[1]);
    }
}`,
          caption: 'Array length is fixed, indexes start at 0, and uninitialized reference elements default to null.',
          expectedOutput: '4\n55\nnull',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-25-2',
      title: 'Traversing Arrays, Enhanced for, and Varargs',
      content: `Use ordinary \`for\` loops to walk over indexes and the **enhanced for loop** to walk directly over elements.

Index-based traversal:
\`\`\`java
for (int i = 0; i < reading.length; i++) {
    ...
}
\`\`\`

Enhanced for:
\`\`\`java
for (int value : reading) {
    ...
}
\`\`\`

Each style has a purpose:
- use an **index loop** when you need the position
- use an **enhanced for** when you only need the values

Remember that:
- \`String[] args\` in \`main\` is itself an array
- Java treats **varargs** as an array inside the method body`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Main {
    public static void main(String[] args) {
        int[] reading = {4, 8, 15, 16, 23};
        int total = 0;

        for (int i = 0; i < reading.length; i++) {
            total += reading[i];
        }

        StringBuilder values = new StringBuilder();
        for (int value : reading) {
            if (values.length() > 0) {
                values.append(", ");
            }
            values.append(value);
        }

        System.out.println(total);
        System.out.println(values);
    }
}`,
          caption: 'Use the ordinary for loop when indexes matter; use enhanced for when you just need each element.',
          expectedOutput: '66\n4, 8, 15, 16, 23',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-25-3',
      title: 'Multidimensional and Ragged Arrays',
      content: `Java supports arrays whose elements are themselves arrays.

That means:
- \`x.length\` gives the number of rows
- \`x[row].length\` gives the number of columns in a specific row

This matters because Java allows **ragged arrays**:
- different rows can have different lengths

So when traversing a 2D array, the safe pattern is:
\`\`\`java
for (int row = 0; row < y.length; row++) {
    for (int col = 0; col < y[row].length; col++) {
        ...
    }
}
\`\`\`

Do **not** assume every row has the same number of columns unless the array is known to be rectangular.`,
      codeExamples: [
        {
          language: 'java',
          code: `public class Main {
    public static void main(String[] args) {
        int[][] y = {
            {1, 2},
            {3, 4, 5},
            {6}
        };

        System.out.println(y.length);
        System.out.println(y[0].length);
        System.out.println(y[1].length);
        System.out.println(y[2].length);
    }
}`,
          caption: 'A ragged array can have different column counts in different rows.',
          expectedOutput: '3\n2\n3\n1',
          editable: true,
        },
      ],
    },
    {
      id: 'lesson-25-4',
      title: 'ArrayList, Generics, Wrapper Classes, and Arrays vs ArrayList',
      content: `**ArrayList** is a resizable collection class.

Important differences from arrays:
- arrays have fixed length
- ArrayLists grow and shrink automatically
- arrays use \`[]\` and \`.length\`
- ArrayLists use methods like \`add\`, \`get\`, \`set\`, \`remove\`, and \`size()\`

Because ArrayList stores **objects**, not primitive values directly, wrappers matter:
- use \`ArrayList<Integer>\`, not \`ArrayList<int>\`
- use \`ArrayList<Double>\`, not \`ArrayList<double>\`

Related concepts include:
- **generics**: \`ArrayList<String>\`, \`ArrayList<Integer>\`
- **wrapper classes**: \`Integer\`, \`Double\`, \`Boolean\`, etc.
- **autoboxing / unboxing**: Java often converts between \`int\` and \`Integer\` for you automatically`,
      codeExamples: [
        {
          language: 'java',
          code: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(12);
        numbers.add(5);
        numbers.add(8);

        System.out.println(numbers.size());
        System.out.println(numbers.get(1));

        numbers.remove(0);
        numbers.set(0, 99);

        System.out.println(numbers);
    }
}`,
          caption: 'ArrayList grows automatically and uses method calls instead of array index syntax for many operations.',
          expectedOutput: '3\n5\n[99, 8]',
          editable: true,
        },
      ],
    },
  ],
  questions: [
    {
      id: 'java-q-25-1',
      type: 'multiple-choice',
      prompt: 'What is the first valid index of an array in Java?',
      choices: [
        { id: 'a', text: '1' },
        { id: 'b', text: '-1' },
        { id: 'c', text: '0' },
        { id: 'd', text: 'depends on the element type' },
      ],
      correctAnswer: 'c',
      explanation: 'Java arrays are zero-indexed, so the first element is at index 0.',
    },
    {
      id: 'java-q-25-2',
      type: 'multiple-choice',
      prompt: 'Which expression gives the number of elements in an array called `marks`?',
      choices: [
        { id: 'a', text: 'marks.size()' },
        { id: 'b', text: 'marks.length' },
        { id: 'c', text: 'marks.length()' },
        { id: 'd', text: 'length(marks)' },
      ],
      correctAnswer: 'b',
      explanation: 'Arrays use the `length` field. ArrayLists use the `size()` method.',
    },
    {
      id: 'java-q-25-3',
      type: 'true-false',
      prompt: 'Once an array is created, its length cannot be changed.',
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: 'true',
      explanation: 'An array has fixed length. If you need resizable storage, use an ArrayList.',
    },
    {
      id: 'java-q-25-4',
      type: 'multiple-choice',
      prompt: 'What is the default value of an uninitialized `String` element inside a newly created array?',
      choices: [
        { id: 'a', text: '""' },
        { id: 'b', text: '0' },
        { id: 'c', text: 'false' },
        { id: 'd', text: 'null' },
      ],
      correctAnswer: 'd',
      explanation: 'String is a reference type, so its default array element value is null.',
    },
    {
      id: 'java-q-25-5',
      type: 'multiple-choice',
      prompt: 'Which declaration is correct for a type-safe ArrayList of integers?',
      choices: [
        { id: 'a', text: 'ArrayList<int> numbers = new ArrayList<int>();' },
        { id: 'b', text: 'ArrayList<Integer> numbers = new ArrayList<Integer>();' },
        { id: 'c', text: 'ArrayList<number> numbers = new ArrayList<number>();' },
        { id: 'd', text: 'ArrayList<Int> numbers = new ArrayList<Int>();' },
      ],
      correctAnswer: 'b',
      explanation: 'ArrayList stores objects, so primitive `int` must use its wrapper class `Integer`.',
    },
    {
      id: 'java-q-25-6',
      type: 'multiple-choice',
      prompt: 'Which ArrayList method replaces the element at an existing index?',
      choices: [
        { id: 'a', text: 'add' },
        { id: 'b', text: 'set' },
        { id: 'c', text: 'contains' },
        { id: 'd', text: 'clear' },
      ],
      correctAnswer: 'b',
      explanation: '`set(index, value)` replaces an existing element. `add(index, value)` inserts and shifts later elements.',
    },
    {
      id: 'java-q-25-7',
      type: 'fill-in-blank',
      prompt: 'In a ragged 2D array `y`, the number of columns in row `row` is `y[row]._____`.',
      correctAnswer: 'length',
      explanation: 'Use `y.length` for the number of rows, and `y[row].length` for the number of columns in a specific row.',
    },
    {
      id: 'java-q-25-8',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create an array `int[] marks = {26, 73, 55, 97};`. Use a loop to compute the total, then print the total and the average to 2 decimal places.\n\nExpected output:\n```text\n251\n62.75\n```',
      starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] marks = {26, 73, 55, 97};\n        // Compute and print the total, then the average to 2 decimal places\n    }\n}`,
      expectedOutput: '251\n62.75',
      correctAnswer: '__code__',
      explanation: 'The total is `26 + 73 + 55 + 97 = 251`, and the average is `251 / 4.0 = 62.75`.',
    },
    {
      id: 'java-q-25-9',
      type: 'code-challenge',
      language: 'java',
      prompt: 'Create an `ArrayList<String>` called `words`. Add `"One"`, `"Two"`, and `"Three"`, then insert `"Fred"` at index `1`. Print the whole list, then print whether it contains `"Three"`, then print the index of `"Fred"`.\n\nExpected output:\n```text\n[One, Fred, Two, Three]\ntrue\n1\n```',
      starterCode: `import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> words = new ArrayList<>();\n        // Add, insert, then print list, contains result, and indexOf result\n    }\n}`,
      expectedOutput: '[One, Fred, Two, Three]\ntrue\n1',
      correctAnswer: '__code__',
      explanation: 'Use `add`, `add(index, value)`, `contains`, and `indexOf`. The inserted `"Fred"` ends up at index 1.',
    },
  ],
};

export default module25;
