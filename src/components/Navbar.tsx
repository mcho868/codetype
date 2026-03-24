"use client";

import Link from "next/link";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useLearnAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/learn");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-slate-100">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.3em]"
        >
          CodeType
        </Link>
        <nav className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          <Link href="/type">TYPE</Link>
          <Link href={user ? "/learn/dashboard" : "/learn"} className="text-cyan-300 hover:text-cyan-100 transition">
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
    </header>
  );
}
