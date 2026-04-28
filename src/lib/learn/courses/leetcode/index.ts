export type { QuestionType, Question, CodeExample, Lesson, Module } from '../python101/types';

import module0 from './module0';
import type { Module } from '../python101/types';

export const MODULES: Module[] = [module0];

export function getAllModules(): Module[] {
  return MODULES;
}

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}
