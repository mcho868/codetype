import type { Question, TestCase } from '../python101/types';

/** Format explanation for admin "Model solution" button in CodeRunnerCard */
export function ms(code: string, why: string): string {
  return `Model solution:\n${code.trim()}\n\nWhy: ${why}`;
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
  return {
    id,
    type: 'code-runner',
    prompt,
    starterCode,
    gradeMode,
    testCases,
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
