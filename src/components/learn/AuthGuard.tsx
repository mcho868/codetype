"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useLearnAuth } from "@/lib/learn/AuthContext";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useLearnAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/learn/auth");
  }, [user, loading, router]);

  // Show spinner while restoring session from localStorage
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[var(--page-bg)] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
