"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLearnAuth } from "@/lib/learn/AuthContext";
import { Button } from "@/components/ui/Button";

export default function LearnLoginPage() {
  const { user, login } = useLearnAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.push("/learn/dashboard");
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(username.trim(), password);
    if (!ok) setError("Incorrect username or password. If credentials are correct, check Supabase schema.");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[var(--page-bg)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 mb-4">
            CodeType
          </p>
          <h1 className="text-3xl font-semibold text-white mb-2">Learn Programming</h1>
          <p className="text-sm text-slate-400">
            Interactive lessons and quizzes for beginners
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-8 shadow-sm backdrop-blur">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400 mb-6">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-cyan-400/40 transition"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-cyan-400/40 transition"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 font-semibold uppercase tracking-[0.2em] text-center">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl py-3 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In →"
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
