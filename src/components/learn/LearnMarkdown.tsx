"use client";

import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";

const FONT = "var(--font-mono), monospace";

const components = {
  p: ({ children }: { children?: ReactNode }) => (
    <p className="text-slate-300 text-sm leading-relaxed mb-2 last:mb-0">{children}</p>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-300 mb-2">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-300 mb-2">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  code: ({
    children,
    className,
  }: {
    children?: ReactNode;
    className?: string;
  }) => {
    const isBlock = !!className;
    return isBlock ? (
      <code className="block text-cyan-300 text-sm" style={{ fontFamily: FONT }}>
        {children}
      </code>
    ) : (
      <code
        className="text-cyan-300 bg-slate-900/80 px-1.5 py-0.5 rounded text-sm"
        style={{ fontFamily: FONT }}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }: { children?: ReactNode }) => (
    <pre
      className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-cyan-300 overflow-x-auto my-2"
      style={{ fontFamily: FONT }}
    >
      {children}
    </pre>
  ),
};

interface LearnMarkdownProps {
  children: string;
  className?: string;
}

/** Renders course question explanations and other learn copy as markdown. */
export default function LearnMarkdown({ children, className }: LearnMarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </div>
  );
}
