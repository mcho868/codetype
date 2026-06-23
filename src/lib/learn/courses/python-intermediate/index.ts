export type { QuestionType, Question, CodeExample, Lesson, Module } from '../python101/types';

import { getAllModules as getPython130Modules } from '../python130/index';
import type { Module } from '../python101/types';

const sourceModules = getPython130Modules().filter((module) => !module.isMidterm);

export const MODULES: Module[] = sourceModules.map((module, index) => ({
  ...module,
  id: `python-intermediate-week-${index + 1}`,
  slug: `week-${index + 1}`,
  title: `Week ${index + 1}: ${module.title}`,
  section: "Weeks",
  locked: true,
  isMidterm: false,
}));

export function getAllModules(): Module[] {
  return MODULES;
}

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}
