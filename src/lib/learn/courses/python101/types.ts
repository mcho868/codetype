export type QuestionType = 'multiple-choice' | 'fill-in-blank' | 'true-false' | 'code-challenge';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  choices?: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  /** Language for code-challenge questions (defaults to 'python') */
  language?: 'python' | 'java' | 'sql' | 'typescript';
  /** For code-challenge questions: starter code shown in the editor */
  starterCode?: string;
  /** For code-challenge questions: expected stdout output (trimmed) */
  expectedOutput?: string;
  /** For code-challenge questions: regex patterns the submitted code must contain */
  requiredPatterns?: { pattern: string; hint: string }[];
  /** For SQL code-challenge questions: which seeded database context to use */
  sqlContextId?: string;
}

export interface CodeExample {
  language: 'python' | 'java' | 'sql' | 'typescript';
  code: string;
  caption?: string;
  /** If true, the code block will be an editable runner */
  editable?: boolean;
}

export type VisualizerKind =
  | 'linear-search'
  | 'binary-search'
  | 'selection-sort'
  | 'bubble-sort'
  | 'insertion-sort'
  | 'merge-sort';

export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExamples: CodeExample[];
  /** Optional algorithm visualizer(s) to render below the lesson content */
  visualizer?: VisualizerKind | VisualizerKind[];
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
  /** If true, this module is a midterm/exam rather than a regular lesson module */
  isMidterm?: boolean;
}
