export type { QuestionType, Question, CodeExample, Lesson, Module } from './types';

import module0 from './module0';
import test0 from './test0';
import module1 from './module1';
import test1 from './test1';
import module2 from './module2';
import test2 from './test2';
import module3 from './module3';
import test3 from './test3';
import module4 from './module4';
import test4 from './test4';
import module5 from './module5';
import test5 from './test5';
import module6 from './module6';
import test6 from './test6';
import module7 from './module7';
import test7 from './test7';
import module8 from './module8';
import test8 from './test8';
import module9 from './module9';
import test9 from './test9';
import module10 from './module10';
import test10 from './test10';
import type { Module } from './types';

export const MODULES: Module[] = [
  module0,
  test0,
  module1,
  test1,
  module2,
  test2,
  module3,
  test3,
  module4,
  test4,
  module5,
  test5,
  module6,
  test6,
  module7,
  test7,
  module8,
  test8,
  module9,
  test9,
  module10,
  test10,
];

export function getAllModules(): Module[] {
  return MODULES;
}

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}
