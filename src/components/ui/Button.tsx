import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition",
        variant === "primary"
          ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
          : "border border-slate-700 text-slate-200 hover:border-slate-500",
        className
      )}
      type={type}
      {...props}
    />
  );
}
