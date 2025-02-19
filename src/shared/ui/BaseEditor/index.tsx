"use client";

import { ComponentProps, useMemo } from "react";

import { Editor } from "@monaco-editor/react";

import { EDITOR_THEMES } from "@/shared/constants/editor";
import { getLanguageFromFileName } from "@/shared/lib";

type EditorProps = ComponentProps<typeof Editor>;

const options: EditorProps["options"] = {
  acceptSuggestionOnCommitCharacter: true,
  acceptSuggestionOnEnter: "on",
  accessibilitySupport: "auto",
  autoIndent: "none",
  automaticLayout: true,
  codeLens: true,
  colorDecorators: true,
  contextmenu: true,
  cursorBlinking: "blink",
  cursorSmoothCaretAnimation: "off",
  cursorStyle: "line",
  disableLayerHinting: false,
  disableMonospaceOptimizations: false,
  dragAndDrop: false,
  fixedOverflowWidgets: false,
  folding: true,
  foldingStrategy: "auto",
  fontLigatures: false,
  formatOnPaste: false,
  formatOnType: false,
  hideCursorInOverviewRuler: false,
  links: true,
  mouseWheelZoom: false,
  multiCursorMergeOverlapping: true,
  multiCursorModifier: "alt",
  overviewRulerBorder: true,
  overviewRulerLanes: 2,
  quickSuggestions: true,
  quickSuggestionsDelay: 100,
  readOnly: false,
  renderControlCharacters: false,
  renderFinalNewline: "on",
  renderLineHighlight: "all",
  renderWhitespace: "none",
  revealHorizontalRightPadding: 30,
  roundedSelection: true,
  rulers: [],
  scrollBeyondLastColumn: 5,
  scrollBeyondLastLine: true,
  selectOnLineNumbers: true,
  selectionClipboard: true,
  selectionHighlight: true,
  showFoldingControls: "mouseover",
  smoothScrolling: false,
  suggestOnTriggerCharacters: true,
  wordBasedSuggestions: "allDocuments",
  wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
  wordWrap: "off",
  wordWrapBreakAfterCharacters: "\t})]?|&,;",
  wordWrapBreakBeforeCharacters: "{([+",
  wordWrapColumn: 80,
  wrappingIndent: "none",
};

export type Theme = (typeof EDITOR_THEMES)[number];

interface Props extends Omit<EditorProps, "language" | "theme"> {
  theme?: Theme;
  fileName?: string;
}

const BaseEditor: React.FC<Props> = ({ fileName, ...props }) => {
  const detectedLanguage = useMemo(() => {
    if (fileName) return getLanguageFromFileName(fileName);
    return "plaintext";
  }, [fileName]);

  return <Editor options={options} height={400} width="100%" path="" language={detectedLanguage} {...props} />;
};

export default BaseEditor;
