"use client";

import {
  forwardRef,
  type ChangeEvent,
  type KeyboardEvent,
  type Ref,
} from "react";

import { cn } from "@/lib/utils";

type HiddenInputProps = {
  targetCode: string;
  userInput: string;
  disabled?: boolean;
  onInput: (value: string) => void;
  onFocusChange: (isFocused: boolean) => void;
  onKeyPress?: (key: string) => void;
  isLinear?: boolean;
};

function HiddenInputBase(
  {
    targetCode,
    userInput,
    onInput,
    onFocusChange,
    onKeyPress,
    isLinear = false,
    disabled,
  }: HiddenInputProps,
  ref: Ref<HTMLTextAreaElement>
) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = isLinear
      ? event.target.value.replace(/\\s+/g, " ")
      : event.target.value;
    onInput(nextValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyPress?.(event.key);
    if (event.key !== "Enter") return;

    event.preventDefault();
    const cursorIndex = userInput.length;
    if (isLinear) {
      if (targetCode[cursorIndex] === " ") {
        onInput(`${userInput} `);
      }
      return;
    }

    // Find the next newline in target code
    let nextNewline = targetCode.indexOf("\n", cursorIndex);
    if (nextNewline === -1) {
      return;
    }

    // Check if there's content between cursor and newline
    let leadingWhitespace = "";
    if (targetCode[cursorIndex] !== "\n") {
      const remainder = targetCode.slice(cursorIndex, nextNewline);
      // If there's actual content (not just whitespace), don't allow Enter
      if (remainder.trim() !== "") {
        return;
      }
      // Otherwise, this is trailing whitespace we need to include
      leadingWhitespace = remainder;
    }

    // Find the indentation of the next line
    const nextLineStart = nextNewline + 1;
    if (nextLineStart >= targetCode.length) {
      // No next line, just add newline and any leading whitespace
      onInput(`${userInput}${leadingWhitespace}\n`);
      return;
    }

    const nextLineEnd = targetCode.indexOf("\n", nextLineStart);
    const nextLine =
      nextLineEnd === -1
        ? targetCode.slice(nextLineStart)
        : targetCode.slice(nextLineStart, nextLineEnd);

    // Match all leading whitespace (spaces and tabs)
    const indentMatch = nextLine.match(/^[ \t]*/);
    const indent = indentMatch ? indentMatch[0] : "";

    onInput(`${userInput}${leadingWhitespace}\n${indent}`);
  };

  return (
    <textarea
      ref={ref}
      value={userInput}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={() => onFocusChange(true)}
      onBlur={() => onFocusChange(false)}
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      disabled={disabled}
      aria-label="Typing input"
      className={cn(
        "absolute inset-0 h-full w-full resize-none bg-transparent text-transparent caret-transparent outline-none",
        "selection:bg-transparent",
        disabled && "pointer-events-none"
      )}
    />
  );
}

export const HiddenInput = forwardRef(HiddenInputBase);
