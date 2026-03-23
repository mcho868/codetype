"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { EditorView, keymap, lineNumbers, highlightActiveLine } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, indentWithTab, history, historyKeymap } from "@codemirror/commands";
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

interface CodeMirrorEditorProps {
  initialCode: string;
  language: "java" | "python";
  onChange: (code: string) => void;
  readOnly?: boolean;
}

const MIN_HEIGHT = 120;
const DEFAULT_HEIGHT = 200;

export default function CodeMirrorEditor({
  initialCode,
  language,
  onChange,
  readOnly = false,
}: CodeMirrorEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const dragStartY = useRef<number>(0);
  const dragStartH = useRef<number>(DEFAULT_HEIGHT);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragStartY.current = e.clientY;
    dragStartH.current = height;

    function onMove(ev: MouseEvent) {
      const delta = ev.clientY - dragStartY.current;
      setHeight(Math.max(MIN_HEIGHT, dragStartH.current + delta));
    }
    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [height]);

  useEffect(() => {
    if (!containerRef.current) return;

    const langExtension = language === "java" ? java() : python();

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChange(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: initialCode,
      extensions: [
        oneDark,
        langExtension,
        lineNumbers(),
        highlightActiveLine(),
        history(),
        closeBrackets(),
        autocompletion(),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...historyKeymap,
          ...completionKeymap,
          indentWithTab,
        ]),
        EditorState.readOnly.of(readOnly),
        updateListener,
        EditorView.theme({
          "&": {
            fontSize: "0.875rem",
            fontFamily: "var(--font-mono), monospace",
            background: "transparent",
            height: "100%",
          },
          ".cm-editor": { background: "transparent", height: "100%" },
          ".cm-scroller": {
            fontFamily: "var(--font-mono), monospace",
            lineHeight: "1.6",
            overflow: "auto",
            height: "100%",
          },
          ".cm-content": { padding: "1rem 0" },
          ".cm-gutters": {
            background: "transparent",
            borderRight: "1px solid rgb(30 41 59 / 0.7)",
            color: "rgb(71 85 105)",
          },
          ".cm-lineNumbers .cm-gutterElement": { padding: "0 12px" },
          ".cm-activeLine": { background: "rgb(255 255 255 / 0.03)" },
          ".cm-activeLineGutter": { background: "rgb(255 255 255 / 0.03)" },
          // Tooltip / autocomplete dropdown
          ".cm-tooltip": {
            border: "1px solid rgb(51 65 85)",
            borderRadius: "0.75rem",
            background: "rgb(15 23 42)",
            boxShadow: "0 8px 24px rgb(0 0 0 / 0.5)",
            overflow: "hidden",
          },
          ".cm-tooltip.cm-tooltip-autocomplete > ul": {
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.8rem",
            maxHeight: "16rem",
          },
          ".cm-tooltip.cm-tooltip-autocomplete > ul > li": {
            padding: "4px 12px",
            color: "rgb(203 213 225)",
          },
          ".cm-tooltip.cm-tooltip-autocomplete > ul > li[aria-selected]": {
            background: "rgb(6 182 212 / 0.15)",
            color: "rgb(103 232 249)",
          },
          ".cm-completionLabel": { flex: 1 },
          ".cm-completionDetail": {
            color: "rgb(100 116 139)",
            fontStyle: "italic",
            marginLeft: "8px",
            fontSize: "0.75rem",
          },
          ".cm-completionIcon": { paddingRight: "6px", opacity: "0.7" },
        }),
      ],
    });

    const view = new EditorView({ state, parent: containerRef.current });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, readOnly]);

  // Sync external code resets (e.g. Reset button) without re-mounting
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== initialCode) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: initialCode },
      });
    }
    // Only run when initialCode changes due to an explicit reset
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  return (
    <div ref={wrapperRef} className="relative w-full select-none">
      <div
        ref={containerRef}
        className="w-full bg-slate-950/70 text-sm"
        style={{ height }}
      />
      {/* Drag handle */}
      <div
        onMouseDown={onMouseDown}
        className="flex items-center justify-center w-full h-3 bg-slate-900/80 border-t border-slate-800/70 cursor-ns-resize group"
      >
        <div className="w-8 h-0.5 rounded-full bg-slate-700 group-hover:bg-slate-500 transition" />
      </div>
    </div>
  );
}
