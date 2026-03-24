"use client";

import Link from "next/link";
import { useLearnAuth } from "@/lib/learn/AuthContext";

// ─── tiny inline helpers ────────────────────────────────────────────────────

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-[0.4em] text-cyan-400">
      {children}
    </span>
  );
}

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 active:scale-95"
    >
      {children}
    </Link>
  );
}

function GhostLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white active:scale-95"
    >
      {children}
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
      {children}
    </p>
  );
}

// ─── benefit card ────────────────────────────────────────────────────────────

interface BenefitCardProps {
  icon: string;
  title: string;
  body: string;
}

function BenefitCard({ icon, title, body }: BenefitCardProps) {
  return (
    <div className="group rounded-3xl border border-slate-800/70 bg-slate-900/60 p-6 backdrop-blur transition hover:border-cyan-400/30 hover:bg-slate-900/80">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/80 text-lg">
        {icon}
      </div>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-white">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-400">{body}</p>
    </div>
  );
}

// ─── audience card ───────────────────────────────────────────────────────────

interface AudienceCardProps {
  label: string;
  description: string;
}

function AudienceCard({ label, description }: AudienceCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-800/50 bg-slate-900/40 px-5 py-4">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
      </span>
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

// ─── step card ───────────────────────────────────────────────────────────────

interface StepCardProps {
  number: string;
  title: string;
  body: string;
  isLast?: boolean;
}

function StepCard({ number, title, body, isLast }: StepCardProps) {
  return (
    <div className="relative flex gap-5">
      <div className="flex flex-col items-center">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-xs font-semibold text-cyan-400">
          {number}
        </div>
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-cyan-400/20 to-transparent" />
        )}
      </div>
      <div className="pb-10">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">{body}</p>
      </div>
    </div>
  );
}

// ─── outcome pill ────────────────────────────────────────────────────────────

function OutcomePill({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/50 px-5 py-3">
      <span className="text-cyan-400">✓</span>
      <span className="text-sm text-slate-300">{children}</span>
    </div>
  );
}

// ─── code snippet decoration ─────────────────────────────────────────────────

function CodeSnippet() {
  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-950/90 p-5 font-mono text-xs shadow-2xl backdrop-blur">
      <div className="mb-3 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
      </div>
      <div className="space-y-1 leading-5">
        <p><span className="text-slate-600"># Your first Python function</span></p>
        <p><span className="text-cyan-400">def</span> <span className="text-white">greet</span><span className="text-slate-400">(name):</span></p>
        <p className="pl-4"><span className="text-cyan-400">return</span> <span className="text-green-400">&quot;Hello, &quot;</span> <span className="text-slate-400">+</span> <span className="text-white">name</span></p>
        <p className="mt-2 text-slate-500">───────────────────</p>
        <p><span className="text-white">greet</span><span className="text-slate-400">(</span><span className="text-green-400">&quot;Manseung&quot;</span><span className="text-slate-400">)</span></p>
        <p className="mt-1 text-cyan-300">&gt; Hello, Manseung</p>
      </div>
    </div>
  );
}

// ─── main page ───────────────────────────────────────────────────────────────

export default function LearnLandingPage() {
  const { user } = useLearnAuth();

  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--page-text)]">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
        {/* subtle glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-80 w-[600px] rounded-full bg-cyan-400/5 blur-3xl" />

        <div className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div className="space-y-7">
            <Tag>Programming Tutoring</Tag>
            <h1 className="text-4xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-[3.25rem]">
              Coding feels hard<br />
              until someone<br />
              <span className="text-cyan-400">explains it clearly.</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
              I&apos;m Manseung — a programming tutor who helps students actually
              understand code. Not just copy it. Whether you&apos;re a complete
              beginner or struggling to keep up, I&apos;ll meet you exactly where
              you are.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:0220368384"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 active:scale-95"
              >
                Call 022 036 8384 →
              </a>
              <GhostLink href="#how-it-works">
                See how it works
              </GhostLink>
            </div>
            <p className="text-xs text-slate-600">
              Login details provided after signing up through me directly.
            </p>
          </div>

          <div className="relative">
            <CodeSnippet />
            {/* floating badge */}
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-slate-800/80 bg-slate-900/90 px-4 py-3 shadow-xl backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Progress this week</p>
              <p className="mt-1 text-sm font-semibold text-white">3 modules completed</p>
              <div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-3/5 rounded-full bg-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WHY DIFFERENT ────────────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-12 text-center space-y-3">
            <SectionLabel>Why this works</SectionLabel>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Tutoring built around how you actually learn
            </h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">
              Most people don&apos;t struggle with coding because they&apos;re bad at it.
              They struggle because no one explained the fundamentals properly.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <BenefitCard
              icon="◎"
              title="Personalised"
              body="Every session is tailored to your level, pace, and goals — not a generic curriculum."
            />
            <BenefitCard
              icon="◈"
              title="Beginner-Friendly"
              body="No jargon. No assumptions. Concepts are broken down until they genuinely make sense."
            />
            <BenefitCard
              icon="◧"
              title="Structured Path"
              body="A clear progression from basics to confidence — you always know where you&apos;re going."
            />
            <BenefitCard
              icon="◉"
              title="Real Practice"
              body="You write real code, solve real problems, and build skills you can actually apply."
            />
          </div>
        </div>
      </section>

      {/* ── 3. WHO THIS IS FOR ──────────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="rounded-3xl border border-slate-800/70 bg-slate-900/40 p-8 backdrop-blur sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              <div className="space-y-4">
                <SectionLabel>Is this for you?</SectionLabel>
                <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                  You&apos;re in the right place if…
                </h2>
                <p className="text-sm leading-relaxed text-slate-500">
                  I work with students at all levels — from those who&apos;ve never
                  written a line of code to those who need help catching up in
                  class or preparing for assignments.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-1">
                <AudienceCard
                  label="You're new to programming"
                  description="You want to start coding but don't know where to begin."
                />
                <AudienceCard
                  label="You're struggling in class"
                  description="Concepts aren't clicking and you need someone to explain them properly."
                />
                <AudienceCard
                  label="You want more confidence"
                  description="You can write some code but still feel unsure — you want that to change."
                />
                <AudienceCard
                  label="You're a parent seeking structured help"
                  description="You want reliable, one-on-one support for your child's coding education."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="px-6 py-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4">
              <SectionLabel>The process</SectionLabel>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Simple, low-friction,<br />built around you
              </h2>
              <p className="text-sm leading-relaxed text-slate-500">
                Getting started shouldn&apos;t feel like homework. Here&apos;s what
                learning together actually looks like.
              </p>
            </div>

            <div className="space-y-0">
              <StepCard
                number="01"
                title="Tell me your level and goals"
                body="We start with a quick conversation — no test, no pressure. I want to understand where you are and where you want to get to."
              />
              <StepCard
                number="02"
                title="Get a personalised approach"
                body="Based on your needs, I put together a clear learning path. No guesswork, no generic textbook content."
              />
              <StepCard
                number="03"
                title="Learn through guided lessons and practice"
                body="Each session builds your understanding step by step. You ask questions, write code, and I explain until it makes sense."
              />
              <StepCard
                number="04"
                title="Build confidence over time"
                body="Progress compounds. Concepts that felt impossible become second nature — and you start solving problems on your own."
                isLast
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. OUTCOMES ─────────────────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-12 text-center space-y-3">
            <SectionLabel>What you gain</SectionLabel>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Not just better code.<br />A better understanding.
            </h2>
            <p className="mx-auto max-w-lg text-sm text-slate-500">
              The goal isn&apos;t to get through a lesson — it&apos;s to actually change
              how you think about programming.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <OutcomePill>You understand why code works, not just how to copy it</OutcomePill>
            <OutcomePill>You feel less overwhelmed when facing new problems</OutcomePill>
            <OutcomePill>You can debug your own code with more confidence</OutcomePill>
            <OutcomePill>Your assignments and class performance improve</OutcomePill>
            <OutcomePill>You develop real problem-solving instincts</OutcomePill>
            <OutcomePill>You stop dreading coding — and start finding it interesting</OutcomePill>
          </div>
        </div>
      </section>

      {/* ── 6. CREDIBILITY / APPROACH ───────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="rounded-3xl border border-cyan-400/15 bg-slate-900/50 p-8 backdrop-blur sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div className="space-y-5">
                <SectionLabel>My approach</SectionLabel>
                <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                  I teach to build understanding, not dependency
                </h2>
                <p className="text-sm leading-relaxed text-slate-400">
                  My goal isn&apos;t for you to always need me. It&apos;s for you to reach
                  a point where you feel capable on your own. I focus on
                  explanations that stick — the kind that make you think
                  &ldquo;oh, now I actually get it.&rdquo;
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  Every student gets my full attention during our sessions.
                  No copy-pasted lesson plans. No rushing through material.
                  Just clear, patient, focused teaching.
                </p>
                <div className="pt-2">
                  <PrimaryLink href="/learn/auth">
                    Try your first lesson →
                  </PrimaryLink>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-2">Teaching style</p>
                  <p className="text-sm text-slate-300">Patient, direct, and concept-first. I&apos;ll explain the same thing five different ways until it clicks.</p>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-2">Languages covered</p>
                  <p className="text-sm text-slate-300">Python, Java, JavaScript — and the fundamentals that transfer across all of them.</p>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-2">Who I work with</p>
                  <p className="text-sm text-slate-300">Secondary students, university beginners, and adult learners starting from scratch.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="px-6 pb-28 pt-10">
        <div className="mx-auto w-full max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-slate-900/60 p-10 text-center backdrop-blur sm:p-14">
            {/* glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full bg-cyan-400/8 blur-3xl" />
            </div>

            <div className="relative space-y-5">
              <SectionLabel>Ready to start?</SectionLabel>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                The hardest part is starting.<br />
                <span className="text-cyan-400">Let&apos;s make it easy.</span>
              </h2>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-400">
                Get in touch to book a trial lesson or ask any questions.
                Login details are provided once you sign up through me directly.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {user ? (
                  <PrimaryLink href="/learn/dashboard">
                    Go to my dashboard →
                  </PrimaryLink>
                ) : (
                  <>
                    <a
                      href="tel:0220368384"
                      className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 active:scale-95"
                    >
                      Call 022 036 8384 →
                    </a>
                    <PrimaryLink href="/learn/auth">
                      Student login
                    </PrimaryLink>
                  </>
                )}
              </div>
              <p className="pt-2 text-xs text-slate-600">
                First lesson is a trial &mdash; no commitment needed.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
