export type { QuestionType, Question, CodeExample, Lesson, Module } from './types';

import module0 from './module0';
import module1 from './module1';
import module2 from './module2';
import module3 from './module3';
import module4 from './module4';
import module5 from './module5';
import module6 from './module6';
import module7 from './module7';
import module8 from './module8';
import module9 from './module9';
import module10 from './module10';
import midterm1 from './midterm1';
import midterm2 from './midterm2';
import type { Module } from './types';

export const MODULES: Module[] = [module0, module1, module2, module3, module4, module5, module6, module7, module8, module9, module10, midterm1, midterm2];

export function getAllModules(): Module[] {
  return MODULES;
}

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}
