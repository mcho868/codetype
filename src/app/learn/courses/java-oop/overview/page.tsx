import Link from "next/link";
import type { Metadata } from "next";
import { getAllModules } from "@/lib/learn/courses/java-oop";
import { JAVA_OOP_WEEK_PLAN } from "@/lib/learn/courses/java-oop/schedule";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "OOP in Java — Course Overview",
  description:
    "Curriculum outline for the Java OOP course, structured as a 12-week COMPSCI 230-aligned sequence.",
};

const COURSE_SLUG = "java-oop";

export default function JavaOopOverviewPage() {
  const modules = getAllModules();
  const weeks = JAVA_OOP_WEEK_PLAN.map((week) => {
    const weekModules = week.moduleSlugs
      .map((slug) => modules.find((module) => module.slug === slug))
      .filter((module): module is NonNullable<typeof module> => Boolean(module));

    return {
      ...week,
      modules: weekModules,
      lessonCount: weekModules.reduce((sum, module) => sum + module.lessons.length, 0),
      practiceCount: weekModules.reduce((sum, module) => sum + module.questions.length, 0),
    };
  });

  const totals = weeks.reduce(
    (acc, week) => {
      acc.modules += week.modules.length;
      acc.lessons += week.lessonCount;
      acc.practice += week.practiceCount;
      return acc;
    },
    { modules: 0, lessons: 0, practice: 0 }
  );

  const stats = [
    { label: "Weeks", value: weeks.length },
    { label: "Modules", value: totals.modules },
    { label: "Lessons", value: totals.lessons },
    { label: "Practice questions", value: totals.practice },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl" aria-hidden>
              ☕
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-400">
              Intermediate · 12 Core Weeks · Java
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            OOP in Java — COMPSCI 230 Structure
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
            This overview restructures the Java material into a 12-week COMPSCI 230-style core
            sequence, with any extra design topics kept as extension modules rather than mixed
            into the official week flow.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/learn/courses/${COURSE_SLUG}`}
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Open the course →
            </Link>
          </div>
        </header>

        <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-4 text-center"
            >
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-white">How to read this outline</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-400">
            <li>
              <strong className="text-slate-200">Lecture ranges</strong> follow the week layout you
              requested: <code className="rounded bg-slate-900 px-1.5 py-0.5 text-cyan-300">L1-L17</code>{" "}
              span Weeks 1-6, with <code className="rounded bg-slate-900 px-1.5 py-0.5 text-cyan-300">L16-L17</code>{" "}
              in Week 6.
            </li>
            <li>
              <strong className="text-slate-200">Weeks 7-12</strong> cover{" "}
              <code className="rounded bg-slate-900 px-1.5 py-0.5 text-cyan-300">L18-L32</code>.
            </li>
            <li>
              <strong className="text-slate-200">Modules</strong> are the live learning units in the
              app; this page simply groups them into a semester-shaped delivery plan.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-white">Curriculum overview</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-900 text-left text-slate-400">
                  <th className="px-4 py-3 font-medium">Week</th>
                  <th className="px-4 py-3 font-medium">Lectures</th>
                  <th className="px-4 py-3 font-medium">Theme</th>
                  <th className="px-4 py-3 text-right font-medium">Modules</th>
                  <th className="px-4 py-3 text-right font-medium">Lessons</th>
                  <th className="px-4 py-3 text-right font-medium">Practice</th>
                </tr>
              </thead>
              <tbody>
                {weeks.map((week) => (
                  <tr key={week.week} className="border-t border-slate-800">
                    <td className="px-4 py-3 font-mono text-slate-400">{week.week}</td>
                    <td className="px-4 py-3 font-mono text-cyan-300">{week.lectureRange}</td>
                    <td className="px-4 py-3 font-medium text-white">{week.title}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{week.modules.length}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{week.lessonCount}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{week.practiceCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-5 text-xl font-semibold text-white">Detailed outline</h2>
          <div className="space-y-6">
            {weeks.map((week) => (
              <div
                key={week.week}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-5"
              >
                <h3 className="text-base font-semibold text-white">
                  <span className="text-cyan-400">Week {week.week}</span> · {week.lectureRange} —{" "}
                  {week.title}
                </h3>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {week.modules.map((module) => (
                    <li
                      key={module.slug}
                      className="rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3"
                    >
                      <div className="text-sm font-semibold text-white">{module.title}</div>
                      <div className="mt-1 text-xs leading-relaxed text-slate-400">
                        {module.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-white">Current strengths</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
            {[
              "Core object-oriented concepts: classes, objects, visibility, inheritance, polymorphism, interfaces, abstraction, and nested classes.",
              "Design thinking: UML-style modelling, composition vs aggregation, maintainability, clean code, SOLID, and reusable design patterns.",
              "Architecture coverage: event-driven GUI structure, MVC, Observer-driven updates, and framework-style inversion of control.",
              "Systems coverage: threads, Runnable tasks, join(), race conditions, and synchronized shared-state protection.",
              "Practice-oriented delivery: each module already includes interactive examples and assessment questions.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-cyan-500" aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="border-t border-slate-800 pt-6">
          <Link
            href={`/learn/courses/${COURSE_SLUG}`}
            className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
          >
            ← Back to OOP in Java
          </Link>
        </footer>
      </div>
    </main>
  );
}
