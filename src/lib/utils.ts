import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateWpm(totalChars: number, elapsedMs: number) {
  if (elapsedMs <= 0 || totalChars <= 0) return 0;
  const minutes = elapsedMs / 60000;
  return Math.round((totalChars / 5) / minutes);
}

export function calculateAccuracy(correct: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}
