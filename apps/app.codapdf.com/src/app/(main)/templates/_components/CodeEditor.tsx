"use client";

import { history } from "@codemirror/commands";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import CodeMirror from "@uiw/react-codemirror";
import { barf, tomorrow } from "thememirror";

import type { EditorFileData, EditorFiles } from "@/app/(main)/templates/_components/FileSidebar";
import { cn } from "@/client/lib/utils";
import { useTheme } from "next-themes";
import { useMemo } from "react";

interface CodeEditorProps {
  onChange: (value: string) => void;
  activeFileId: EditorFileData["filename"];
  files: EditorFiles;
}

const extensionsByExtension = {
  ".html": [html()],
  ".css": [css()],
  ".js": [javascript()],
  ".json": [json()],
} as const;

export function CodeEditor({ onChange, files, activeFileId }: Readonly<CodeEditorProps>) {
  const { theme } = useTheme();
  const editorByFileId = useMemo(() => {
    return Object.keys(files).map((key) => {
      const file = files[key];
      const extension = RegExp(/\.[0-9a-z]+$/i).exec(file.filename)?.[0] as keyof typeof extensionsByExtension;
      const extensions = extensionsByExtension[extension] ?? [];
      const value = file.content;
      return (
        <CodeMirror
          key={key}
          value={value}
          onChange={onChange}
          extensions={[history(), ...extensions]}
          theme={theme === "dark" ? barf : tomorrow}
          height="100%"
          width="100%"
          data-filename={file.filename}
          className={cn("hidden h-full overflow-hidden", {
            flex: activeFileId === file.filename,
          })}
        />
      );
    });
  }, [files, onChange, activeFileId, theme]);

  return editorByFileId;
}
