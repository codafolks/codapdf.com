import type { EditorFiles } from "@/app/(main)/templates/_components/FileSidebar";
import { cn } from "@/client/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";

type EditorTabsProps = {
  activeFileId: string;
  setActiveFileId: (id: string) => void;
  openTabs: Array<string>;
  files: EditorFiles;
  onClose: (id: string) => void;
};

const TabButton = ({
  name,
  canClose,
  onClose,
  onSetActiveFileId,
  active,
}: {
  name: string;
  canClose: boolean;
  active: boolean;
  onClose: () => void;
  onSetActiveFileId: () => void;
}) => {
  return (
    <div
      className={cn("relative flex h-10 items-center rounded-none border-r px-4", {
        " data-[state=active]:border-b-app-medium": active,
      })}
      data-state-active={active}
    >
      <Button
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          onSetActiveFileId();
        }}
      >
        {name}
      </Button>
      {canClose && (
        <Button
          variant="ghost"
          size="icon"
          className="h-4 w-4 p-0 "
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};
export const EditorTabs = ({ activeFileId, setActiveFileId, openTabs, files, onClose }: EditorTabsProps) => {
  return (
    <ScrollArea className="flex-1" orientation="horizontal">
      <Tabs value={activeFileId} className="w-full" onValueChange={setActiveFileId}>
        <TabsList className="h-10 w-full justify-start rounded-none border-none bg-transparent p-0">
          {openTabs.map((tabId) => {
            const file = files[tabId];
            if (!file) return null;
            return (
              <TabsTrigger key={file.filename} value={file.filename} asChild>
                <TabButton
                  name={file.filename}
                  canClose={openTabs.length > 1 && file.filename !== "index.html"}
                  onClose={() => onClose(file.filename)}
                  active={tabId === activeFileId}
                  onSetActiveFileId={() => setActiveFileId(file.filename)}
                />
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </ScrollArea>
  );
};
