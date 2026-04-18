"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CoursePageLayout from "@/components/learn/CoursePageLayout";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { getAllModules } from "@/lib/learn/courseData";
import { loadAllProgress } from "@/lib/learn/db";

const modules = getAllModules();
const totalQ = modules.reduce((s, m) => s + m.questions.length, 0);

interface ModuleProgress {
  score: number;
  answeredCount: number;
}

export default function Python101Page() {
  const { user, studentId, logout } = useLearnAuth();
  const router = useRouter();
  const [tab, setTab] = useState("learn");
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({});
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoadingProgress(true);
      if (studentId) {
        const data = await loadAllProgress(studentId);
        if (!active) return;
        setProgress(data);
      }
      if (active) setLoadingProgress(false);
    }
    load();
    return () => { active = false; };
  }, [studentId]);

  function handleLogout() {
    logout();
    router.push("/learn/auth");
  }

  const totalCorrect = Object.values(progress).reduce((s, m) => s + m.score, 0);

  const tabs = [
    { id: "learn", label: "Learn" },
    { id: "challenge", label: "Challenge" },
    { id: "tests", label: "Tests" },
  ];

  return (
    <CoursePageLayout
      courseSlug=""
      courseTitle="Python 101"
      courseIcon="🐍"
      courseLevel="Beginner"
      moduleCount={modules.length}
      totalCorrect={totalCorrect}
      totalQ={totalQ}
      loadingProgress={loadingProgress}
      modules={modules}
      progress={progress}
      tabs={tabs}
      activeTab={tab}
      onTabChange={setTab}
      tabContent={{
        challenge: <ChallengeTab />,
        tests: <TestsTab router={router} />,
      }}
      isAdmin={user?.role === "admin"}
      onLogout={handleLogout}
    />
  );
}

interface ChallengeDetail {
  title: string;
  tag: "Homework" | "Optional";
  tagColor: string;
  icon: string;
  summary: string;
  description: string;
  requirements: { text: React.ReactNode }[];
  stretchGoals: string[];
  concepts: string[];
  exampleOutput: string;
}

const CHALLENGES: ChallengeDetail[] = [
  {
    title: "Number Guessing Game",
    tag: "Homework",
    tagColor: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
    icon: "🎯",
    summary: "The computer picks a secret number. The player guesses until they find it.",
    description:
      "The computer secretly picks a number between 1 and 100. The player keeps guessing until they find it. After each guess, the game tells them whether to guess higher or lower. When they guess correctly, the game congratulates them and shows how many attempts it took.",
    requirements: [
      { text: <>Pick a secret number using <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">random.randint(1, 100)</code>.</> },
      { text: <>Use a <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">while</code> loop to keep asking for guesses until the player is correct.</> },
      { text: <>After each wrong guess, print <em>"Too high!"</em> or <em>"Too low!"</em>.</> },
      { text: <>When correct, print a congratulation message that includes the number of attempts.</> },
      { text: <>Wrap the game logic inside a function called <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">play_game()</code> and call it.</> },
    ],
    stretchGoals: [
      "After the game ends, ask the player if they want to play again.",
      "Add a maximum of 10 attempts — if they run out, reveal the number and end the game.",
      "Keep track of the player's best score (fewest attempts) across multiple rounds.",
    ],
    concepts: ["import", "variables", "int(input())", "while loop", "if / elif / else", "functions", "f-strings"],
    exampleOutput: `Guess a number between 1 and 100: 50\nToo high!\nGuess a number between 1 and 100: 25\nToo low!\nGuess a number between 1 and 100: 37\nToo high!\nGuess a number between 1 and 100: 31\nCorrect! You got it in 4 attempts.`,
  },
  {
    title: "Simple Quiz Game",
    tag: "Homework",
    tagColor: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
    icon: "🧠",
    summary: "Ask the player 5 trivia questions and print a final score.",
    description:
      "Create a quiz that asks the player 5 questions one at a time. After each answer, tell them if they were right or wrong. At the end, print their total score out of 5.",
    requirements: [
      { text: <>Store at least 5 questions and their correct answers (use variables or a list).</> },
      { text: <>Use a <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">for</code> loop to go through each question.</> },
      { text: <>Use <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">input()</code> to get the player's answer.</> },
      { text: <>After each question, print whether the answer was correct or incorrect.</> },
      { text: <>At the end, print the final score using an f-string.</> },
    ],
    stretchGoals: [
      "Make the answer check case-insensitive using .lower().",
      "Add a difficulty level — easy questions are worth 1 point, hard ones worth 2.",
      "Shuffle the question order using random.shuffle().",
    ],
    concepts: ["variables", "lists", "for loop", "if / else", "input()", "f-strings", ".lower()"],
    exampleOutput: `Question 1: What is the capital of France?\nYour answer: paris\nCorrect!\n\nQuestion 2: What is 7 * 8?\nYour answer: 54\nWrong! The answer was 56.\n\nYour final score: 1 / 2`,
  },
  {
    title: "Rock Paper Scissors",
    tag: "Homework",
    tagColor: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
    icon: "✊",
    summary: "Player vs computer — determine the winner using if/elif logic.",
    description:
      "The player types their choice (rock, paper, or scissors). The computer picks randomly. The game works out who wins using comparison logic and prints the result.",
    requirements: [
      { text: <>Use <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">random.choice()</code> for the computer's pick.</> },
      { text: <>Accept the player's input and make it lowercase with <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">.lower()</code>.</> },
      { text: <>Use <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">if / elif / else</code> to determine win, loss, or draw.</> },
      { text: <>Print both choices and the result clearly.</> },
      { text: <>Wrap everything in a function called <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">play_round()</code>.</> },
    ],
    stretchGoals: [
      "Use a while loop to let the player keep playing until they type 'quit'.",
      "Track wins, losses, and draws across multiple rounds.",
      "Validate the input — if the player types something invalid, ask again.",
    ],
    concepts: ["import", "random.choice()", "input()", "if / elif / else", "functions", ".lower()", "while loop"],
    exampleOutput: `Your choice: rock\nComputer chose: scissors\nYou win!\n\nYour choice: paper\nComputer chose: paper\nIt's a draw!`,
  },
  {
    title: "FizzBuzz Checker",
    tag: "Homework",
    tagColor: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
    icon: "🔢",
    summary: "Ask the player to predict FizzBuzz output — test their modulo knowledge.",
    description:
      "The classic FizzBuzz rule: for multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', for multiples of both print 'FizzBuzz', otherwise print the number. Your program should print the full FizzBuzz sequence for 1 to 100.",
    requirements: [
      { text: <>Use a <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">for</code> loop over <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">range(1, 101)</code>.</> },
      { text: <>Use <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">%</code> (modulo) to check divisibility.</> },
      { text: <>Check for multiples of both 3 and 5 <em>first</em>, before checking each separately.</> },
      { text: <>Print <em>"FizzBuzz"</em>, <em>"Fizz"</em>, <em>"Buzz"</em>, or the number on each line.</> },
      { text: <>Wrap the logic in a function called <code className="text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded">fizzbuzz(n)</code> that takes a number and returns the correct string.</> },
    ],
    stretchGoals: [
      "Ask the user for a custom upper limit instead of hardcoding 100.",
      "Count how many times 'Fizz', 'Buzz', and 'FizzBuzz' appeared and print a summary.",
      "Make it interactive — ask the player what each number should print and score their answers.",
    ],
    concepts: ["for loop", "range()", "% operator", "if / elif / else", "functions", "return"],
    exampleOutput: `1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n...`,
  },
];

function ChallengeCard({ challenge }: { challenge: ChallengeDetail }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 backdrop-blur shadow-sm overflow-hidden">
      {/* Card header — always visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-8 py-6 flex items-center gap-5 hover:bg-slate-800/30 transition"
      >
        <span className="text-3xl shrink-0">{challenge.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.2em] ${challenge.tagColor}`}>
              {challenge.tag}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
          <p className="text-sm text-slate-400 mt-0.5">{challenge.summary}</p>
        </div>
        <span className={`text-slate-500 text-lg shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`}>
          →
        </span>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="border-t border-slate-800 px-8 py-7 space-y-6 text-sm text-slate-300">
          <p>{challenge.description}</p>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">Requirements</p>
            <ul className="space-y-2">
              {challenge.requirements.map((r, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-cyan-400 shrink-0">{i + 1}.</span>
                  <span>{r.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">Stretch Goals</p>
            <ul className="space-y-2 text-slate-400">
              {challenge.stretchGoals.map((g, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-slate-600 shrink-0">+</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">Concepts Used</p>
            <div className="flex flex-wrap gap-2">
              {challenge.concepts.map((c) => (
                <span key={c} className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">Example Output</p>
            <pre className="text-sm text-slate-300 leading-7 font-mono whitespace-pre-wrap bg-slate-950/60 rounded-2xl border border-slate-800 px-5 py-4">
              {challenge.exampleOutput}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

function TestsTab({ router }: { router: ReturnType<typeof useRouter> }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-white mb-1">Tests</h2>
        <p className="text-sm text-slate-400">
          Formal assessments for this course. Each test is timed and graded — you need 60% or above to pass.
        </p>
      </div>
      <div
        onClick={() => router.push("/learn/courses/python101/tests/resit-1")}
        className="rounded-3xl border border-slate-800/70 bg-slate-900/70 shadow-sm backdrop-blur overflow-hidden cursor-pointer hover:-translate-y-1 hover:border-slate-600/60 hover:shadow-lg transition"
      >
        <div className="bg-gradient-to-r from-red-500 to-rose-400 h-1.5" />
        <div className="p-7 flex items-center gap-6">
          <span className="text-4xl">📝</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-1">
              8 Questions
            </p>
            <h3 className="text-xl font-semibold text-white mb-1">Python 101 — Test</h3>
            <p className="text-sm text-slate-400">
              3 multiple-choice + 5 coding questions covering the full Python 101 curriculum. Difficulty scales from easy to hard.
            </p>
          </div>
          <span className="text-slate-600 text-xl shrink-0">→</span>
        </div>
      </div>
    </div>
  );
}

function ChallengeTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-white mb-1">Challenges</h2>
        <p className="text-sm text-slate-400">
          Complete all four homework challenges below.
        </p>
      </div>
      {CHALLENGES.map((c) => (
        <ChallengeCard key={c.title} challenge={c} />
      ))}
    </div>
  );
}
