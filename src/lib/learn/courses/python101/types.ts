export type QuestionType =
  | 'multiple-choice'
  | 'fill-in-blank'
  | 'true-false'
  | 'code-challenge'
  | 'code-runner';

export interface TestCase {
  id: string;
  description?: string;
  /** Hidden cases report pass/fail only — args/expected never revealed */
  hidden?: boolean;
  /** function mode */
  funcName?: string;
  args?: unknown[];
  expectedReturn?: unknown;
  /** stdout mode */
  stdin?: string;
  expectedStdout?: string;
  /** File-reading questions: write this content to `fileName` (default "input.txt")
   *  in the run directory before executing, so student code can open() a real file.
   *  Works in both function and stdout modes. */
  fileName?: string;
  fileContent?: string;
}

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
  /** For code-runner questions: how the backend grades submissions */
  gradeMode?: 'stdout' | 'function' | 'patterns';
  /** For code-runner questions: visible + hidden test cases */
  testCases?: TestCase[];
  /** For code-runner questions: execution timeout in ms (default 8000) */
  timeoutMs?: number;
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

/** A downloadable file shown alongside a lesson (e.g. sample data for file I/O). */
export interface LessonAttachment {
  /** File name, e.g. "data.txt" — also the download filename */
  name: string;
  /** File contents */
  content: string;
  /** Optional short description shown next to the download link */
  description?: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExamples: CodeExample[];
  /** Optional algorithm visualizer(s) to render below the lesson content */
  visualizer?: VisualizerKind | VisualizerKind[];
  /** Optional downloadable files (the same samples available in the code runner) */
  attachments?: LessonAttachment[];
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
  /** Opens the module directly in the standard quiz view when it has no lessons. */
  quizOnly?: boolean;
  /** Optional section label rendered as a divider above this module */
  section?: string;
}
