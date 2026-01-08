import type { Language } from "./types";

export const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "c", label: "C" },
];

export const LANGUAGE_KEYS = LANGUAGE_OPTIONS.map((option) => option.value);

export const LANGUAGE_LABELS: Record<Language, string> = LANGUAGE_OPTIONS.reduce(
  (acc, option) => {
    acc[option.value] = option.label;
    return acc;
  },
  {} as Record<Language, string>
);
