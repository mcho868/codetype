import Link from "next/link";
import type { Metadata } from "next";
import { getAllModules } from "@/lib/learn/courses/python-essentials";

// Public, statically-renderable page — no auth required. Anyone can view the
// course outline whether or not they are logged in.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Python Essentials — Course Overview",
  description:
    "Curriculum outline for Python Essentials: Principles of Programming in Python. 10 weeks of interactive lessons, coding practice, and weekly tests.",
};

const COURSE_SLUG = "python-essentials";

interface WeekRow {
  week: number;
  title: string;
  description: string;
  lessonTitles: string[];
  practiceQs: number;
  testQs: number;
}

/** Build the curriculum table straight from the live course data so this page
 *  never drifts from the modules. Weeks are `week-N`; tests are `test-N`. */
function buildWeeks(): WeekRow[] {
  const modules = getAllModules();
  const weeks: WeekRow[] = [];

  for (const mod of modules) {
    const match = /^week-(\d+)$/.exec(mod.slug);
    if (!match) continue;
    const week = Number(match[1]);
    const test = modules.find((m) => m.slug === `test-${week}`);
    weeks.push({
      week,
      title: mod.title,
      description: mod.description,
      lessonTitles: mod.lessons.map((l) => l.title),
      practiceQs: mod.questions.length,
      testQs: test?.questions.length ?? 0,
    });
  }

  weeks.sort((a, b) => a.week - b.week);
  return weeks;
}

export default function PythonEssentialsOverviewPage() {
  const weeks = buildWeeks();

  const totals = weeks.reduce(
    (acc, w) => {
      acc.lessons += w.lessonTitles.length;
      acc.practice += w.practiceQs;
      acc.test += w.testQs;
      return acc;
    },
    { lessons: 0, practice: 0, test: 0 }
  );

  const stats = [
    { label: "Weeks", value: weeks.length },
    { label: "Lessons", value: totals.lessons },
    { label: "Practice questions", value: totals.practice },
    { label: "Test questions", value: totals.test },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        {/* Header */}
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl" aria-hidden>
              📘
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-400">
              Beginner · 10 Weeks · Python 3
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Python Essentials — Principles of Programming
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
            A hands-on introduction to programming. Every week pairs short, focused lessons with an
            interactive in-browser code editor. You write real Python; a backend test runner grades
            your solutions against hidden test cases. Each week ends with a short timed{" "}
            <strong className="text-slate-200">Test</strong> to consolidate and stretch your
            understanding.
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

        {/* At a glance */}
        <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-4 text-center"
            >
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="mt-1 text-xs text-slate-400">{s.label}</div>
            </div>
          ))}
        </section>

        {/* How it works */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-white">How the course works</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-400">
            <li>
              <strong className="text-slate-200">Learn</strong> — each week has 4–6 lessons with
              explanations and runnable, editable code examples.
            </li>
            <li>
              <strong className="text-slate-200">Practice</strong> — most questions are coding
              challenges, graded by visible sample cases plus hidden edge cases on the backend.
            </li>
            <li>
              <strong className="text-slate-200">Test</strong> — a short timed test after each week
              with harder, synthesis-style problems. Optional, with detailed explanations.
            </li>
          </ul>
        </section>

        {/* Curriculum overview table */}
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
                  <th className="px-4 py-3 text-right font-medium">Test</th>
                </tr>
              </thead>
              <tbody>
                {weeks.map((w) => (
                  <tr key={w.week} className="border-t border-slate-800">
                    <td className="px-4 py-3 font-mono text-slate-400">{w.week}</td>
                    <td className="px-4 py-3 font-medium text-white">{w.title}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{w.lessonTitles.length}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{w.practiceQs}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{w.testQs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed outline */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-semibold text-white">Detailed outline</h2>
          <div className="space-y-6">
            {weeks.map((w) => (
              <div
                key={w.week}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-5"
              >
                <h3 className="text-base font-semibold text-white">
                  <span className="text-cyan-400">Week {w.week}</span> — {w.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{w.description}</p>
                <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                  {w.lessonTitles.map((title) => (
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

        {/* Learning outcomes */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-white">Learning outcomes</h2>
          <p className="mb-3 text-sm text-slate-400">By the end of the course you will be able to:</p>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
            {[
              "Read and trace Python programs, and distinguish syntax errors from runtime errors.",
              "Use variables, expressions, and the core data types (int, float, str, bool).",
              "Read input and format output clearly, including with f-strings.",
              "Control program flow with conditions and both while and for loops.",
              "Work confidently with strings, lists, tuples, and dictionaries, and their built-in methods.",
              "Decompose a problem into functions with parameters and return values.",
              "Process structured and 2D data with nested loops.",
              "Write, run, and debug your own Python programs.",
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
            ← Back to Python Essentials
          </Link>
        </footer>
      </div>
    </main>
  );
}
