import Link from "next/link";
import type { Metadata } from "next";
import { getAllModules } from "@/lib/learn/courses/python-intermediate/index";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Python Intermediate - Course Overview",
  description:
    "Curriculum outline for Python Intermediate: testing, complexity, algorithms, data structures, recursion, trees, and hash tables.",
};

const COURSE_SLUG = "python-intermediate";

interface WeekRow {
  week: number;
  title: string;
  description: string;
  lessonTitles: string[];
  practiceQs: number;
}

function buildWeeks(): WeekRow[] {
  return getAllModules()
    .map((module) => {
      const match = /^week-(\d+)$/.exec(module.slug);
      const week = match ? Number(match[1]) : 0;
      return {
        week,
        title: module.title.replace(/^Week \d+:\s*/, ""),
        description: module.description,
        lessonTitles: module.lessons.map((lesson) => lesson.title),
        practiceQs: module.questions.length,
      };
    })
    .filter((week) => week.week > 0)
    .sort((a, b) => a.week - b.week);
}

export default function PythonIntermediateOverviewPage() {
  const weeks = buildWeeks();

  const totals = weeks.reduce(
    (acc, week) => {
      acc.lessons += week.lessonTitles.length;
      acc.practice += week.practiceQs;
      return acc;
    },
    { lessons: 0, practice: 0 }
  );

  const stats = [
    { label: "Weeks", value: weeks.length },
    { label: "Lessons", value: totals.lessons },
    { label: "Practice questions", value: totals.practice },
    { label: "Weekly tests", value: "Paused" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl" aria-hidden>
              🐍
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-400">
              Intermediate · 11 Weeks · Python 3
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Python Intermediate
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
            A hands-on continuation after Python basics. The course keeps the weekly structure used
            by Python Essentials, but moves into testing, complexity, sorting, object-oriented
            design, recursion, linked lists, trees, and hash tables. Weekly tests are planned but
            paused for this version.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/learn/courses/${COURSE_SLUG}`}
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Start the course →
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
          <h2 className="mb-3 text-xl font-semibold text-white">How the course works</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-400">
            <li>
              <strong className="text-slate-200">Learn</strong> - each week has focused lessons
              with explanations and runnable Python examples.
            </li>
            <li>
              <strong className="text-slate-200">Practice</strong> - module quizzes use the same
              in-browser workflow as the rest of CodeType Learn.
            </li>
            <li>
              <strong className="text-slate-200">Tests</strong> - weekly tests are intentionally
              paused for now, so the course currently shows lessons and practice only.
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
                  <th className="px-4 py-3 font-medium">Module</th>
                  <th className="px-4 py-3 text-right font-medium">Lessons</th>
                  <th className="px-4 py-3 text-right font-medium">Practice</th>
                </tr>
              </thead>
              <tbody>
                {weeks.map((week) => (
                  <tr key={week.week} className="border-t border-slate-800">
                    <td className="px-4 py-3 font-mono text-slate-400">{week.week}</td>
                    <td className="px-4 py-3 font-medium text-white">{week.title}</td>
                    <td className="px-4 py-3 text-right text-slate-300">
                      {week.lessonTitles.length}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-300">{week.practiceQs}</td>
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
                  <span className="text-cyan-400">Week {week.week}</span> - {week.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {week.description}
                </p>
                <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                  {week.lessonTitles.map((title) => (
                    <li key={title} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="mt-0.5 text-cyan-500" aria-hidden>
                        ▸
                      </span>
                      <span>{title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-white">Learning outcomes</h2>
          <p className="mb-3 text-sm text-slate-400">
            By the end of the course you will be able to:
          </p>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
            {[
              "Write tests and use exceptions to make Python programs more robust.",
              "Analyze algorithm cost with Big O and compare implementation tradeoffs.",
              "Implement and reason about common sorting algorithms.",
              "Design classes and model data with object-oriented Python.",
              "Use stacks, queues, linked lists, trees, and hash tables for structured problems.",
              "Apply recursion to solve divide-and-conquer and tree-processing tasks.",
              "Connect data structure choices to performance and correctness.",
            ].map((outcome) => (
              <li key={outcome} className="flex items-start gap-2">
                <span className="mt-0.5 text-cyan-500" aria-hidden>
                  ✓
                </span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="border-t border-slate-800 pt-6">
          <Link
            href={`/learn/courses/${COURSE_SLUG}`}
            className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
          >
            ← Back to Python Intermediate
          </Link>
        </footer>
      </div>
    </main>
  );
}
