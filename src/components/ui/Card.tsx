import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6 shadow-sm backdrop-blur",
        className
      )}
      {...props}
    />
  );
}
