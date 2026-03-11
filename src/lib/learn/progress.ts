export interface QuestionAnswer {
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface ModuleQuizState {
  answers: Record<string, QuestionAnswer>;
  score: number;
  completed: boolean;
}

export function calculateScore(
  answers: Record<string, QuestionAnswer>
): number {
  const values = Object.values(answers);
  if (values.length === 0) return 0;
  return values.filter((a) => a.isCorrect).length;
}

export function isModuleComplete(
  answers: Record<string, QuestionAnswer>,
  totalQuestions: number
): boolean {
  return Object.keys(answers).length === totalQuestions;
}
