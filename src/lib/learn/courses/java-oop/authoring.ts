import type { Question, TestCase } from "./types";

export function ms(code: string, why: string): string {
  return `Model solution:\n${code.trim()}\n\nWhy: ${why}`;
}

export function cr(
  id: string,
  prompt: string,
  starterCode: string,
  testCases: TestCase[],
  explanation: string,
  timeoutMs = 8000
): Question {
  return {
    id,
    type: "code-runner",
    language: "java",
    prompt,
    starterCode,
    gradeMode: "stdout",
    testCases,
    timeoutMs,
    explanation,
    correctAnswer: "__code__",
  };
}

export function stdoutCases(
  samples: { id: string; description: string; stdin?: string; expectedStdout: string }[],
  hidden: { id: string; stdin?: string; expectedStdout: string }[]
): TestCase[] {
  return [
    ...samples.map((sample) => ({
      id: sample.id,
      description: sample.description,
      stdin: sample.stdin,
      expectedStdout: sample.expectedStdout,
    })),
    ...hidden.map((sample) => ({
      id: sample.id,
      hidden: true,
      stdin: sample.stdin,
      expectedStdout: sample.expectedStdout,
    })),
  ];
}
