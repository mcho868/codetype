"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  { ssr: false }
);

interface CodeBlockProps {
  code: string;
  language?: string;
  caption?: string;
}

export default function CodeBlock({
  code,
  language = "python",
  caption,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 overflow-hidden my-4 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-slate-800/70 bg-slate-900/60">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-300 transition px-2 py-1"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <div className="text-sm">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus as Record<string, React.CSSProperties>}
          customStyle={{
            margin: 0,
            background: "transparent",
            padding: "1.25rem 1.5rem",
            fontSize: "0.875rem",
            fontFamily: "var(--font-mono), monospace",
          }}
          showLineNumbers={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      {caption && (
        <div className="px-5 py-2.5 border-t border-slate-800/70 bg-slate-900/60">
          <p className="text-xs text-slate-500 italic">{caption}</p>
        </div>
      )}
    </div>
  );
}
