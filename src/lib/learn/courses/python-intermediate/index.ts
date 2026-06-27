export type { QuestionType, Question, CodeExample, Lesson, Module } from '../python101/types';

import { getAllModules as getPython130Modules } from '../python130/index';
import type { Module } from '../python101/types';

const sourceModules = getPython130Modules();

let weekNum = 0;

export const MODULES: Module[] = sourceModules.map((module) => {
  if (!module.isMidterm) {
    weekNum += 1;
  }
  const w = weekNum;

  if (module.isMidterm) {
    return {
      ...module,
      id: `python-intermediate-week-${w}-test`,
      slug: `week-${w}-test`,
      title: `Week ${w} Test`,
      section: `Week ${w}`,
      locked: false,
      // Render tests like Python Essentials — a normal untimed quiz, not a timed
      // exam. isMidterm:false disables QuizView's countdown/exam mode.
      isMidterm: false,
    };
  }

  return {
    ...module,
    id: `python-intermediate-week-${w}`,
    slug: `week-${w}`,
    title: `Week ${w}: ${module.title}`,
    section: `Week ${w}`,
    locked: false,
    isMidterm: false,
  };
});

export function getAllModules(): Module[] {
  return MODULES;
}

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}
