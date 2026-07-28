export type { QuestionType, Question, CodeExample, Lesson, Module } from '../python101/types';

import module0 from './questions/module0';
import module1 from './questions/module1';
import module2 from './questions/module2';
import module3 from './questions/module3';
import module4 from './questions/module4';
import module5 from './questions/module5';
import module6 from './questions/module6';
import module7 from './questions/module7';
import module8 from './questions/module8';
import module9 from './questions/module9';
import module10 from './questions/module10';
import module11 from './questions/module11';
import module12 from './questions/module12';
import module13 from './questions/module13';
import module14 from './questions/module14';
import module15 from './questions/module15';
import module16 from './questions/module16';
import module17 from './questions/module17';
import module18 from './questions/module18';
import module19 from './questions/module19';
import module20 from './questions/module20';
import module21 from './questions/module21';
import module22 from './questions/module22';
import module23 from './questions/module23';
import module24 from './questions/module24';
import module25 from './questions/module25';
import module26 from './questions/module26';
import type { Module } from '../python101/types';

export const MODULES: Module[] = [
  module0, module1, module2, module3, module4,
  module5, module6, module7,
  module8, module9, module10, module11, module12,
  module13, module14, module15, module16, module17, module18,
  module19, module20, module21, module22, module23, module24,
  module25, module26,
];

export function getAllModules(): Module[] {
  return MODULES;
}

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}
