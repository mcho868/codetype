"use client";

import type { ReactNode } from "react";
import { Highlight } from "prism-react-renderer";

import type { Language } from "@/lib/curriculum";
import { cn } from "@/lib/utils";

const theme = {
  plain: {
    color: "#e8ecff",
    backgroundColor: "transparent",
  },
  styles: [
    { types: ["comment"], style: { color: "#a5b4d8" } },
    { types: ["string"], style: { color: "#f6c4ff" } },
    { types: ["keyword"], style: { color: "#b5e8ff" } },
    { types: ["function"], style: { color: "#ffd6a5" } },
    { types: ["number"], style: { color: "#ffadad" } },
    { types: ["class-name"], style: { color: "#cdb4db" } },
    { types: ["punctuation"], style: { color: "#b8c0ff" } },
  ],
};

type CodeDisplayProps = {
  targetCode: string;
  userInput: string;
  language: Language;
  pulseRange?: { start: number; end: number; id: number } | null;
};

export function CodeDisplay({
  targetCode,
  userInput,
  language,
  pulseRange,
}: CodeDisplayProps) {
  const code = targetCode ?? "";

  return (
    <Highlight
      theme={theme}
      code={code}
      language={language as Parameters<typeof Highlight>[0]["language"]}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const codeLines = code.split("\n");
        const normalizedTokens = tokens.slice(0, codeLines.length);
        while (normalizedTokens.length < codeLines.length) {
          normalizedTokens.push([{ types: [], content: "" }]);
        }
        let charIndex = 0;

        return (
            <pre
              className={cn(
                className,
                "rounded-3xl bg-[#12182b]/80 p-6 text-sm leading-6 text-[#eef1ff] shadow-inner"
              )}
              style={style}
            >
            {codeLines.map((lineText, lineIndex) => {
              const lineTokens = normalizedTokens[lineIndex] ?? [];
              const { key: lineKey, ...lineProps } = getLineProps({
                line: lineTokens,
                key: lineIndex,
              });
              const lineChars = lineText.length;
              let currentIndex = charIndex;
              const lineContent: ReactNode[] = [];

              lineTokens.forEach((token, tokenIndex) => {
                const tokenProps = getTokenProps({
                  token,
                  key: tokenIndex,
                });
                const tokenClassName = tokenProps.className;
                const tokenStyle = tokenProps.style;

                token.content.split("").forEach((char, charIndexInToken) => {
                  const absoluteIndex = currentIndex;
                  currentIndex += 1;
                  const typedChar = userInput[absoluteIndex];
                  const expectedChar = targetCode[absoluteIndex];
                  const isCursor = absoluteIndex === userInput.length;
                  const isTyped = typedChar !== undefined;
                  const isCorrect = isTyped && typedChar === expectedChar;
                  const isInPulse =
                    pulseRange &&
                    absoluteIndex >= pulseRange.start &&
                    absoluteIndex <= pulseRange.end;

                  lineContent.push(
                    <span
                      key={`${lineIndex}-${tokenIndex}-${charIndexInToken}-${absoluteIndex}`}
                      data-cursor={isCursor ? "true" : undefined}
                      className={cn(
                        tokenClassName,
                        isTyped &&
                          (isCorrect
                            ? "text-teal-100 bg-teal-400/20 shadow-[0_0_12px_rgba(45,212,191,0.35)]"
                            : "text-rose-100 bg-rose-400/20 shadow-[0_0_12px_rgba(251,113,133,0.35)]"),
                        isCursor &&
                          "relative before:absolute before:-left-0.5 before:top-0 before:h-full before:w-0.5 before:bg-amber-400 before:animate-pulse",
                        isInPulse && "word-pop"
                      )}
                      style={tokenStyle}
                    >
                      {char}
                    </span>
                  );
                });
              });

              const isLastLine = lineIndex === tokens.length - 1;
              const lineEndIndex = charIndex + lineChars;
              const showCursorAtLineEnd = userInput.length === lineEndIndex;

              if (showCursorAtLineEnd) {
                lineContent.push(
                  <span
                    key={`cursor-${lineIndex}`}
                    data-cursor="true"
                    className="relative before:absolute before:-left-0.5 before:top-0 before:h-full before:w-0.5 before:bg-amber-400 before:animate-pulse"
                  >
                    {" "}
                  </span>
                );
              }

              charIndex = lineEndIndex + (isLastLine ? 0 : 1);

              return (
                <div
                  key={lineKey ?? lineIndex}
                  {...lineProps}
                  className={cn(lineProps.className, "whitespace-pre")}
                >
                  {lineContent}
                </div>
              );
            })}
          </pre>
        );
      }}
    </Highlight>
  );
}
