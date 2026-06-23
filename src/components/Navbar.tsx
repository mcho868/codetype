"use client";

import Link from "next/link";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useLearnAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    closeMenu();
    logout();
    router.push("/learn");
  }

  const learnHref = user ? "/learn/dashboard" : "/learn";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 text-slate-100 sm:px-6 sm:py-4">
        <Link
          href="/"
          onClick={closeMenu}
          className="text-sm font-semibold uppercase tracking-[0.24em] sm:tracking-[0.3em]"
        >
          CodeType
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-slate-300 transition hover:border-slate-600 hover:text-white md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <nav className="hidden items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 md:flex">
          <Link href="/type">TYPE</Link>
          <Link href={learnHref} className="text-cyan-300 hover:text-cyan-100 transition">
            Learn
          </Link>
          <a
            href="https://manseungchoi.com"
            target="_blank"
            rel="noreferrer"
            className="group text-xs font-semibold uppercase tracking-[0.3em]"
          >
            <span className="text-slate-300 transition group-hover:text-slate-100">
              MANSEUNG
            </span>{" "}
            <span className="text-cyan-300">CHOI</span>
          </a>
          {user ? (
            <span className="flex items-center gap-3">
              <span className="text-slate-300">{user.displayName}</span>
              <button
                onClick={handleLogout}
                className="text-slate-500 hover:text-slate-200 transition"
              >
                Sign out
              </button>
            </span>
          ) : (
            <Link href="/learn/auth" className="text-slate-300 hover:text-slate-100 transition">
              Sign in
            </Link>
          )}
        </nav>
      </div>

      {menuOpen && (
        <nav className="border-t border-slate-800/70 bg-slate-950/95 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1">
            <Link
              href="/type"
              onClick={closeMenu}
              className="rounded-xl px-3 py-3 transition hover:bg-slate-900 hover:text-white"
            >
              Type
            </Link>
            <Link
              href={learnHref}
              onClick={closeMenu}
              className="rounded-xl px-3 py-3 text-cyan-300 transition hover:bg-slate-900 hover:text-cyan-100"
            >
              Learn
            </Link>
            <a
              href="https://manseungchoi.com"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="rounded-xl px-3 py-3 transition hover:bg-slate-900 hover:text-white"
            >
              Manseung Choi
            </a>
            <div className="my-1 h-px bg-slate-800/70" />
            {user ? (
              <>
                <div className="px-3 py-2 text-xs tracking-[0.16em] text-slate-500">
                  {user.displayName}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl px-3 py-3 text-left transition hover:bg-slate-900 hover:text-white"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/learn/auth"
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 transition hover:bg-slate-900 hover:text-white"
              >
                Sign in
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
