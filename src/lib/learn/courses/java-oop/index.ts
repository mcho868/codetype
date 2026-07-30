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
import module11 from './module11';
import module12 from './module12';
import module13 from './module13';
import module14 from './module14';
import module15 from './module15';
import module16 from './module16';
import module17 from './module17';
import module18 from './module18';
import module19 from './module19';
import module20 from './module20';
import module21 from './module21';
import module22 from './module22';
import module23 from './module23';
import module24 from './module24';
import module25 from './module25';
import { JAVA_OOP_WEEK_PLAN } from './schedule';
import { JAVA_OOP_EXTRA_RUNNER_QUESTIONS } from './extraRunnerQuestions';
import type { Module, Question } from './types';

const sourceModules: Module[] = [
  module0,
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
  module7,
  module8,
  module9,
  module10,
  module11,
  module12,
  module13,
  module14,
  module15,
  module16,
  module17,
  module18,
  module19,
  module20,
  module21,
  module22,
  module23,
  module24,
  module25,
];

const sourceModuleBySlug = new Map(sourceModules.map((module) => [module.slug, module]));
const scheduledSlugs = new Set(JAVA_OOP_WEEK_PLAN.flatMap((week) => week.moduleSlugs));

function upgradeLegacyJavaChallenge(question: Question): Question {
  if (
    question.type !== "code-challenge" ||
    question.language !== "java" ||
    question.expectedOutput === undefined
  ) {
    return question;
  }

  return {
    ...question,
    type: "code-runner",
    gradeMode: "stdout",
    testCases: [
      {
        id: `${question.id}-sample`,
        description: "Required output check",
        expectedStdout: question.expectedOutput,
      },
    ],
  };
}

function buildQuestions(module: Module): Question[] {
  const baseQuestions = module.questions.map(upgradeLegacyJavaChallenge);
  const extraQuestions = JAVA_OOP_EXTRA_RUNNER_QUESTIONS[module.slug] ?? [];
  return [...baseQuestions, ...extraQuestions];
}

function buildModules(): Module[] {
  return [
    ...JAVA_OOP_WEEK_PLAN.flatMap((week) =>
      week.moduleSlugs.flatMap((slug) => {
        const courseModule = sourceModuleBySlug.get(slug);
        if (!courseModule) return [];
        const section = `Week ${week.week} · ${week.lectureRange}`;
        const locked = courseModule.locked || week.week > 2;

        return [
          {
            ...courseModule,
            title: `Week ${week.week}: ${courseModule.title}`,
            section,
            locked,
            questions: buildQuestions(courseModule),
          },
        ];
      })
    ),
    ...sourceModules
      .filter((module) => !scheduledSlugs.has(module.slug))
      .map((module) => ({
        ...module,
        section: "Extension Topics",
        locked: true,
        questions: buildQuestions(module),
      })),
  ];
}

export const MODULES: Module[] = buildModules();

export function getAllModules(): Module[] {
  return buildModules();
}

export function getModule(slug: string): Module | undefined {
  return buildModules().find((m) => m.slug === slug);
}
