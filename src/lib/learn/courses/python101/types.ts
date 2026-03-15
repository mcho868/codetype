export type QuestionType = 'multiple-choice' | 'fill-in-blank' | 'true-false' | 'code-challenge';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  choices?: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  /** For code-challenge questions: starter code shown in the editor */
  starterCode?: string;
  /** For code-challenge questions: expected stdout output (trimmed) */
  expectedOutput?: string;
  /** For code-challenge questions: regex patterns the submitted code must contain */
  requiredPatterns?: { pattern: string; hint: string }[];
}

export interface CodeExample {
  language: 'python';
  code: string;
  caption?: string;
  /** If true, the code block will be an editable runner */
  editable?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExamples: CodeExample[];
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  locked: boolean;
  lessons: Lesson[];
  questions: Question[];
}
