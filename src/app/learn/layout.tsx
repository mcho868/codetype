import { LearnAuthProvider } from "@/lib/learn/AuthContext";
import { ReactNode } from "react";

export default function LearnLayout({ children }: { children: ReactNode }) {
  return <LearnAuthProvider>{children}</LearnAuthProvider>;
}
