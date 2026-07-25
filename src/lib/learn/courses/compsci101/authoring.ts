import type { Question, TestCase } from '../python101/types';

function formatPythonValue(value: unknown): string {
  if (value === null) return 'None';
  if (value === true) return 'True';
  if (value === false) return 'False';
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'number') return String(value);
  if (Array.isArray(value)) {
    return `[${value.map(formatPythonValue).join(', ')}]`;
  }
  if (typeof value === 'object') {
    return `{${Object.entries(value)
      .map(([key, item]) => `${JSON.stringify(key)}: ${formatPythonValue(item)}`)
      .join(', ')}}`;
  }
  return String(value);
}

function formatExample(testCase: TestCase, gradeMode: 'stdout' | 'function', index: number): string {
  const heading = `**Example ${index + 1}**`;

  if (gradeMode === 'function') {
    const call = `${testCase.funcName ?? 'function'}(${(testCase.args ?? [])
      .map(formatPythonValue)
      .join(', ')})`;
    const fileInput = testCase.fileContent === undefined
      ? ''
      : `${testCase.fileName ?? 'input.txt'}:\n${testCase.fileContent.replace(/\n$/, '')}`;
    const input = fileInput ? `${fileInput}\n\nCall: ${call}` : call;
    return `${heading}

Input:
\`\`\`text
${input}
\`\`\`

Output:
\`\`\`text
${formatPythonValue(testCase.expectedReturn)}
\`\`\``;
  }

  return `${heading}

Input:
\`\`\`text
${testCase.stdin?.replace(/\n$/, '') || '(no input)'}
\`\`\`

Output:
\`\`\`text
${testCase.expectedStdout ?? ''}
\`\`\``;
}

function addExamples(
  prompt: string,
  gradeMode: 'stdout' | 'function',
  testCases: TestCase[]
): { prompt: string; testCases: TestCase[] } {
  if (testCases.length < 2) {
    throw new Error(`Question "${prompt.slice(0, 60)}" needs at least two test cases for examples.`);
  }

  const exampleCases = testCases.slice(0, 2);
  const examples = exampleCases
    .map((testCase, index) => formatExample(testCase, gradeMode, index))
    .join('\n\n');

  return {
    prompt: `${prompt}\n\n### Examples\n\n${examples}`,
    testCases: testCases.map((testCase, index) =>
      index < 2
        ? {
            ...testCase,
            hidden: false,
            description: testCase.description ?? `Example ${index + 1}`,
          }
        : testCase
    ),
  };
}

/** Shorthand for a code-runner question */
export function cr(
  id: string,
  prompt: string,
  starterCode: string,
  gradeMode: 'stdout' | 'function',
  testCases: TestCase[],
  explanation: string
): Question {
  const withExamples = addExamples(prompt, gradeMode, testCases);
  return {
    id,
    type: 'code-runner',
    prompt: withExamples.prompt,
    starterCode,
    gradeMode,
    testCases: withExamples.testCases,
    explanation,
    correctAnswer: '__code__',
  };
}

export function mc(
  id: string,
  prompt: string,
  choices: { id: string; text: string }[],
  correctAnswer: string,
  explanation: string
): Question {
  return { id, type: 'multiple-choice', prompt, choices, correctAnswer, explanation };
}

export function tf(id: string, prompt: string, correctAnswer: 'true' | 'false', explanation: string): Question {
  return { id, type: 'true-false', prompt, correctAnswer, explanation };
}

export function fib(id: string, prompt: string, correctAnswer: string, explanation: string): Question {
  return { id, type: 'fill-in-blank', prompt, correctAnswer, explanation };
}

/** Visible sample + hidden edge cases for stdout grading */
export function stdoutCases(
  samples: { id: string; description: string; stdin?: string; expectedStdout: string }[],
  hidden: { id: string; stdin?: string; expectedStdout: string }[]
): TestCase[] {
  return [
    ...samples.map((s) => ({
      id: s.id,
      description: s.description,
      stdin: s.stdin,
      expectedStdout: s.expectedStdout,
    })),
    ...hidden.map((h) => ({
      id: h.id,
      hidden: true,
      stdin: h.stdin,
      expectedStdout: h.expectedStdout,
    })),
  ];
}

/**
 * Visible sample + hidden edge cases for a function that READS A FILE.
 * Each case writes `fileContent` to a file (default "input.txt") before the
 * function is called with no arguments; the function opens and reads it.
 */
export function fileCases(
  funcName: string,
  samples: { id: string; description: string; fileContent: string; expectedReturn: unknown }[],
  hidden: { id: string; fileContent: string; expectedReturn: unknown }[],
  fileName = 'input.txt'
): TestCase[] {
  return [
    ...samples.map((s) => ({
      id: s.id,
      description: s.description,
      funcName,
      args: [],
      fileName,
      fileContent: s.fileContent,
      expectedReturn: s.expectedReturn,
    })),
    ...hidden.map((h) => ({
      id: h.id,
      hidden: true,
      funcName,
      args: [],
      fileName,
      fileContent: h.fileContent,
      expectedReturn: h.expectedReturn,
    })),
  ];
}

/** Visible sample + hidden edge cases for function grading */
export function funcCases(
  funcName: string,
  samples: { id: string; description: string; args: unknown[]; expectedReturn: unknown }[],
  hidden: { id: string; args: unknown[]; expectedReturn: unknown }[]
): TestCase[] {
  return [
    ...samples.map((s) => ({
      id: s.id,
      description: s.description,
      funcName,
      args: s.args,
      expectedReturn: s.expectedReturn,
    })),
    ...hidden.map((h) => ({
      id: h.id,
      hidden: true,
      funcName,
      args: h.args,
      expectedReturn: h.expectedReturn,
    })),
  ];
}
