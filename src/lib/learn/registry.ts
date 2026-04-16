import type { Module } from './courses/python101/types';
import { getAllModules as getPython101Modules } from './courses/python101/index';
import { getAllModules as getJavaOopModules } from './courses/java-oop/index';
import { getAllModules as getPython130Modules } from './courses/python130/index';
import { getAllModules as getSql101Modules } from './courses/sql101/index';
import { getAllModules as getTypescript101Modules } from './courses/typescript101/index';
import { getAllModules as getGdscript101Modules } from './courses/gdscript101/index';

export interface CourseInfo {
  slug: string;
  title: string;
  modules: Module[];
  adminOnly?: boolean;
}

export const COURSES: CourseInfo[] = [
  { slug: 'python101', title: 'Python 101', modules: getPython101Modules() },
  { slug: 'java-oop', title: 'OOP in Java', modules: getJavaOopModules() },
  { slug: 'python130', title: 'Python 130', modules: getPython130Modules() },
  { slug: 'sql101', title: 'SQL 101', modules: getSql101Modules(), adminOnly: true },
  { slug: 'typescript101', title: 'TypeScript 101', modules: getTypescript101Modules(), adminOnly: true },
  { slug: 'gdscript101', title: 'GDScript 101', modules: getGdscript101Modules(), adminOnly: true },
];

export const STUDENT_VISIBLE_COURSES = COURSES.filter((course) => !course.adminOnly);
export const ADMIN_ONLY_COURSES = COURSES.filter((course) => course.adminOnly);

export function getCourse(courseSlug: string): CourseInfo | undefined {
  return COURSES.find((c) => c.slug === courseSlug);
}

export function getModuleFromCourse(courseSlug: string, moduleSlug: string): Module | undefined {
  return getCourse(courseSlug)?.modules.find((m) => m.slug === moduleSlug);
}
