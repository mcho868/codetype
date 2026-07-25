export type { QuestionType, Question, CodeExample, Lesson, Module, TestCase } from '../python101/types';

import week1 from './week1';
import test1 from './test1';
import week2 from './week2';
import test2 from './test2';
import week3 from './week3';
import test3 from './test3';
import week4 from './week4';
import test4 from './test4';
import midtermExam from './midtermExam';
import week5 from './week5';
import test5 from './test5';
import week6 from './week6';
import test6 from './test6';
import week7 from './week7';
import test7 from './test7';
import week8 from './week8';
import test8 from './test8';
import week9 from './week9';
import test9 from './test9';
import week10 from './week10';
import test10 from './test10';
import finalExam from './finalExam';
import type { Module } from '../python101/types';

/**
 * Every coding question across this course presents a blank editor — no
 * starter scaffolding — so students write the full solution themselves.
 * Stripping it here keeps the per-question source files readable (they may
 * still carry illustrative starters) and guarantees nothing ships with a
 * leftover default answer in the editor.
 */
function stripStarterCode(mod: Module): Module {
  return {
    ...mod,
    questions: mod.questions.map((q) => (q.starterCode ? { ...q, starterCode: '' } : q)),
  };
}

export const MODULES: Module[] = [
  week1,
  test1,
  week2,
  test2,
  week3,
  test3,
  week4,
  test4,
  midtermExam,
  week5,
  test5,
  week6,
  test6,
  week7,
  test7,
  week8,
  test8,
  week9,
  test9,
  week10,
  test10,
  finalExam,
].map(stripStarterCode);

export function getAllModules(): Module[] {
  return MODULES;
}

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}
