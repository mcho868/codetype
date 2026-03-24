"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CURRICULUM, type Difficulty, type Language } from "@/lib/curriculum";
import { LANGUAGE_KEYS, LANGUAGE_LABELS } from "@/lib/curriculum/languages";
import { cn } from "@/lib/utils";

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard", "expert"];
const LANGUAGES: (Language | "all")[] = ["all", ...LANGUAGE_KEYS];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState<Language | "all">(
    "all"
  );
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Difficulty[]
  >([]);

  const categories = useMemo(() => {
    const unique = new Set(CURRICULUM.map((item) => item.category));
    return ["all", ...Array.from(unique).sort()];
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return CURRICULUM.filter((item) => {
      const matchesQuery =
        query.length === 0 ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const matchesDifficulty =
        selectedDifficulties.length === 0 ||
        selectedDifficulties.includes(item.difficulty);

      const matchesLanguage =
        selectedLanguage === "all" ||
        Object.prototype.hasOwnProperty.call(item.variants, selectedLanguage);

      return (
        matchesQuery && matchesCategory && matchesDifficulty && matchesLanguage
      );
    });
  }, [search, selectedCategory, selectedDifficulties, selectedLanguage]);

  const grouped = useMemo(() => {
    return DIFFICULTIES.map((difficulty) => ({
      difficulty,
      items: filtered.filter((item) => item.difficulty === difficulty),
    }));
  }, [filtered]);

  const toggleDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((value) => value !== difficulty)
        : [...prev, difficulty]
    );
  };

  return (
    <main className="min-h-screen bg-[var(--page-bg)] px-6 py-16 text-[var(--page-text)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
              CodeType Curriculum
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Practice the full algorithm curriculum.
            </h1>
            <p className="max-w-xl text-lg text-slate-300">
              Browse by difficulty, search by name, and jump into code in any of
              the six supported languages.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Pick a topic</Button>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {CURRICULUM.length} algorithms
              </span>
            </div>
          </div>
          <div className="rounded-[32px] border border-slate-800/80 bg-slate-950/70 p-6 shadow-2xl">
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Curriculum Coverage
              </div>
              <div className="rounded-2xl bg-slate-900 p-6 text-slate-50">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Coverage
                </p>
                <p className="mt-3 text-3xl font-semibold">
                  {CURRICULUM.length} topics
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Easy to expert, all searchable.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Filters
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-200">
                    Difficulty + category
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Languages
                  </p>
                <p className="mt-2 text-sm font-semibold text-slate-200">
                    TS, JS, Java, C#, Python, C
                </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                Search the curriculum
              </h2>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search algorithms, topics, or categories"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedLanguage}
                onChange={(event) =>
                  setSelectedLanguage(event.target.value as Language | "all")
                }
                className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === "all" ? "all" : LANGUAGE_LABELS[lang]}
                  </option>
                ))}
              </select>
              <Button
                variant="ghost"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                  setSelectedLanguage("all");
                  setSelectedDifficulties([]);
                }}
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map((difficulty) => (
              <button
                key={difficulty}
                type="button"
                onClick={() => toggleDifficulty(difficulty)}
                className={cn(
                  "rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition",
                  selectedDifficulties.includes(difficulty)
                    ? "border-cyan-300 bg-cyan-400/20 text-cyan-100"
                    : "border-slate-800 bg-slate-900/70 text-slate-300"
                )}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          {grouped.every((group) => group.items.length === 0) && (
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8 text-center text-slate-400">
              No algorithms match your filters.
            </div>
          )}

          {grouped.map((group) => (
            <div key={group.difficulty} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  {group.difficulty}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {group.items.length} topics
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item) => (
                  <Link key={item.id} href={`/practice/${item.id}`}>
                    <Card className="group h-full transition hover:-translate-y-1 hover:border-slate-600/60 hover:shadow-lg">
                      <div className="flex h-full flex-col justify-between gap-6">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                            {item.category}
                          </p>
                          <h3 className="mt-3 text-xl font-semibold text-white">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-sm text-slate-300">
                            {item.description}
                          </p>
                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Runtime: {item.runtime}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300">
                          Start typing
                          <span className="transition group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
