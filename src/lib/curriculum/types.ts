export type Language =
  | "typescript"
  | "javascript"
  | "java"
  | "csharp"
  | "python"
  | "c";

export type Difficulty = "easy" | "medium" | "hard" | "expert";

export type AlgorithmEntry = {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  description: string;
  runtime: string;
  variants: Record<Language, string>;
};
