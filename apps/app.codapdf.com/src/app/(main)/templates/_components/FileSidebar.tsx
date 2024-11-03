"use client";

import { useState } from "react";

import { cn } from "@/client/lib/utils";
import { FilePlus, File, X, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileNameForm } from "@/app/(main)/templates/_components/FileNameForm";

export interface EditorFileData {
  filename: string;
  content: string;
}

export type EditorFiles = { [key: string]: EditorFileData };

interface FileSidebarProps {
  files: EditorFiles;
  activeFileId: string;
  onFileSelect: (fileId: string) => void;
  onFileCreate: (fileName: string) => void;
  onFileDelete: (fileId: string) => void;
  onFileRename: (fileId: string, newName: string) => void;
}

export function FileSidebar({
  files,
  activeFileId,
  onFileSelect,
  onFileCreate,
  onFileDelete,
  onFileRename,
}: Readonly<FileSidebarProps>) {
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [oldFilename, setOldFilename] = useState<string | null>(null);

  const handleCreateFile = ({ filename }: { filename: string }) => {
    onFileCreate(filename);
    setIsCreatingFile(false);
  };

  const handleRenameFile = ({ filename }: { filename: string }) => {
    if (oldFilename) {
      onFileRename(oldFilename, filename);
      setOldFilename(null);
    }
  };
  const values = Object.values(files);
  const fileNames = values.map((file) => file.filename);

  return (
    <div className="flex h-full w-full flex-col border-r">
      <div className="flex items-center justify-between px-4 h-10  border-b">
        <h2 className="text-sm font-semibold">Files</h2>
        <Button variant="ghost" size="icon" onClick={() => setIsCreatingFile(true)} className="size-4">
          <FilePlus className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div>
          {isCreatingFile && (
            <FileNameForm onSubmit={handleCreateFile} onBlur={() => setIsCreatingFile(false)} files={fileNames} />
          )}
          {values.map((file) => (
            <div
              key={file.filename}
              className={cn(
                "group grid grid-cols-[auto,max-content] items-center justify-between  text-sm hover:",
                activeFileId === file.filename && "",
              )}
            >
              {oldFilename === file.filename ? (
                <FileNameForm
                  filename={oldFilename}
                  onSubmit={handleRenameFile}
                  onBlur={() => setOldFilename(null)}
                  files={fileNames}
                />
              ) : (
                <Button onClick={() => onFileSelect(file.filename)} variant="link" className="gap-1 ou">
                  <File className="h-4 w-4" />
                  <span className="truncate">{file.filename}</span>
                </Button>
              )}

              {values.length > 1 && file.filename !== "index.html" && (
                <div>
                  {oldFilename !== file.filename && (
                    <Button variant="ghost" size="icon" onClick={() => setOldFilename(file.filename)} className="p-0">
                      <Pencil className="h-3 w-3" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => onFileDelete(file.filename)} className="p-0">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
