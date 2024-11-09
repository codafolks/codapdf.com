"use client";

import { CheckTemplatePlanSupport } from "@/app/(main)/templates/_components/CheckTemplatePlanSupport";
import { CodeEditor } from "@/app/(main)/templates/_components/CodeEditor";
import { EditorTabs } from "@/app/(main)/templates/_components/EditorTabs";
import { type EditorFileData, type EditorFiles, FileSidebar } from "@/app/(main)/templates/_components/FileSidebar";
import { TemplateDialogForm } from "@/app/(main)/templates/_components/TemplateDialogForm";
import { TemplatePreview } from "@/app/(main)/templates/_components/TemplatePreview";
import { DATA_JSON_PLACEHOLDER } from "@/app/(main)/templates/_data/DATA_JSON_PLACEHOLDER";
import { HTML_PLACEHOLDER } from "@/app/(main)/templates/_data/HTML_PLACEHOLDER";
import { STYLES_PLACEHOLDER } from "@/app/(main)/templates/_data/STYLES_PLACEHOLDER";
import { useCheckPlanTemplateSupport } from "@/app/(main)/templates/_hooks/useCheckPlanTemplateSupport";
import { generateTemplateThumbnail } from "@/app/(main)/templates/_utils/generateTemplateThumbnail";
import type { TemplateSourceId } from "@/app/(main)/templates/_utils/getTemplateSourceId";
import { isJsonString } from "@/app/(main)/templates/_utils/isJsonString";
import { renderTemplateData } from "@/app/(main)/templates/_utils/renderTemplateData";
import { ROUTES } from "@/app/routes";
import { useHeaderActions } from "@/client/hooks/useHeaderActions";
import { useTemplateById, useTemplateConvertHtml2PDF, useTemplateSave } from "@/client/queries/templates";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { TemplateOnSavePayload } from "@/server/database/schemas/templates";
import { PanelLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

type TemplateBuilderProps = {
  sourceId?: TemplateSourceId;
};

const DEFAULT_FILES: EditorFiles = {
  "index.html": { filename: "index.html", content: HTML_PLACEHOLDER },
  "styles.css": { filename: "styles.css", content: STYLES_PLACEHOLDER },
  "data.json": { filename: "data.json", content: DATA_JSON_PLACEHOLDER },
};
export function TemplateBuilder({ sourceId }: Readonly<TemplateBuilderProps>) {
  const router = useRouter();
  const { toast } = useToast();
  const { data: template, isLoading, isSample } = useTemplateById(sourceId);
  const [files, setFiles] = useState<EditorFiles>({});
  const [openTabs, setOpenTabs] = useState<Array<string>>(["index.html"]);
  const [activeFileId, setActiveFileId] = useState<string>("index.html");
  const [showPreview, setShowPreview] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const convertHtml2PDF = useTemplateConvertHtml2PDF();
  const saveTemplate = useTemplateSave();
  const isPreviewLoaded = useRef(false);

  useEffect(() => {
    if (!sourceId) {
      setFiles(DEFAULT_FILES);
    }
    if (isPreviewLoaded.current || isLoading) return;
    if (template?.files) {
      isPreviewLoaded.current = true;
      const newFiles: EditorFiles = {};
      for (const file of template?.files ?? []) {
        newFiles[file.filename] = file;
      }
      setFiles(newFiles);
    }
  }, [template, isLoading, sourceId]);

  const handleFileCreate = (filename: string) => {
    const newFile: EditorFileData = {
      filename,
      content: "",
    };
    setFiles({ ...files, [filename]: newFile });
    setActiveFileId(newFile.filename);
    setOpenTabs([...openTabs, newFile.filename]);
  };

  const handleFileDelete = (fileId: string) => {
    if (Object.keys(files).length === 1) return;
    const newFiles = { ...files };
    delete newFiles[fileId];
    setFiles(newFiles);
    setOpenTabs(openTabs.filter((id) => id !== fileId));
    if (activeFileId === fileId) {
      const newActiveId = openTabs[openTabs.indexOf(fileId) - 1] || openTabs[openTabs.indexOf(fileId) + 1];
      setActiveFileId(newActiveId);
    }
  };

  const handleFileRename = (oldFilename: string, filename: string) => {
    setFiles((pre) => {
      const items = { ...pre };
      const file = items[oldFilename];
      items[filename] = { ...file, filename };
      delete items[oldFilename];
      return items;
    });
    setOpenTabs(openTabs.map((id) => (id === oldFilename ? filename : id)));
    if (activeFileId === oldFilename) setActiveFileId(filename);
  };

  const handleCodeChange = (newCode: string) => {
    const newFiles = { ...files };
    newFiles[activeFileId].content = newCode;
    setFiles(newFiles);
  };

  const handleFileSelect = (fileId: string) => {
    setActiveFileId(fileId);
    if (!openTabs.includes(fileId)) {
      setOpenTabs([...openTabs, fileId]);
    }
  };

  const handleTabClose = (fileId: string) => {
    if (openTabs.length === 1) return;
    const newOpenTabs = openTabs.filter((id) => id !== fileId);
    setOpenTabs(newOpenTabs);
    if (activeFileId === fileId) {
      setActiveFileId(newOpenTabs[newOpenTabs.length - 1]);
    }
  };

  const getTemplateData = async () => {
    if (isLoading) return null;
    if (Object.keys(files).length === 0) return null;
    const thumbnail = await generateTemplateThumbnail();
    const filesName = Object.keys(files);
    const data: TemplateOnSavePayload = {
      id: isSample || !template?.id ? undefined : (template.id as number),
      name: template?.name ?? "",
      description: template?.description ?? "",
      thumbnail,
      filesName,
      files: Object.values(files),
    };
    return data;
  };

  const handleSaveTemplate = async (data?: { name: string; description?: string | null }) => {
    try {
      const payload = await getTemplateData();
      if (!payload) return;
      const response = await saveTemplate.mutateAsync({ ...payload, ...data });
      router.replace(ROUTES.PRIVATE.TEMPLATES_EDIT.path(response.data.id));
      toast({
        title: "Template Saved",
        description: "Your template has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the template.",
        variant: "destructive",
      });
    }
  };

  const getProcessedCssFiles = (content: string) => {
    let htmlContent = content;
    const regexToGetTags = /<link\s+rel="stylesheet"\s+href="\.\/([^"]+)\.css"\s*\/?>/g;
    const regexToGetFileName = /<link\s+rel="stylesheet"\s+href="\.\/([^"]+\.css)"\s*\/?>/g;
    let cssFiles = htmlContent.match(regexToGetTags);

    if (cssFiles) {
      for (const cssFile of cssFiles) {
        const cssFileName = RegExp(regexToGetFileName).exec(cssFile)?.[1];
        if (cssFileName && files[cssFileName]) {
          const cssContent = files[cssFileName].content;
          htmlContent = htmlContent.replace(cssFile, `<style>${cssContent}</style>`);
        }
      }
    }
    return htmlContent;
  };

  const getProcessedJSFiles = (content: string) => {
    let htmlContent = content;
    const regexToGetTags = /<script\s+src="\.\/[^"]+\.js"\s*><\/script>/g;
    const regexToGetFileName = /<script\s+src="\.\/([^"]+\.js)"\s*><\/script>/g;
    const jsFiles = htmlContent.match(regexToGetTags);
    if (jsFiles) {
      for (const jsFile of jsFiles) {
        const jsFileName = RegExp(regexToGetFileName).exec(jsFile)?.[1];
        if (jsFileName && files[jsFileName]) {
          const jsContent = files[jsFileName].content;
          htmlContent = htmlContent.replace(jsFile, `<script>${jsContent}</script>`);
        }
      }
    }
    return htmlContent;
  };

  const getJsonFiles = () => {
    const jsonFiles = Object.entries(files).filter(([filename]) => filename.endsWith(".json") && isJsonString(files[filename].content));
    return jsonFiles.reduce((acc, [_, file]) => {
      try {
        return { ...acc, ...JSON.parse(file.content) };
      } catch (error) {
        return acc;
      }
    }, {});
  };

  const getProcessedHtml = () => {
    if (isLoading) return "";
    if (!files["index.html"]) return null;
    let htmlContent = files["index.html"].content;
    htmlContent = getProcessedCssFiles(htmlContent);
    htmlContent = getProcessedJSFiles(htmlContent);
    const dataTestValue = getJsonFiles();
    htmlContent = renderTemplateData(htmlContent, dataTestValue);
    return htmlContent;
  };

  const { isSupported } = useCheckPlanTemplateSupport(getProcessedHtml());

  const getProcessedHtmlAndData = () => {
    if (isLoading) return null;
    if (!files["index.html"]) return null;
    let htmlContent = files["index.html"].content;
    htmlContent = getProcessedCssFiles(htmlContent);
    htmlContent = getProcessedJSFiles(htmlContent);
    const dataValue = getJsonFiles();
    return { htmlContent, dataValue };
  };

  const handleOnConvertHtml2PDF = async () => {
    try {
      const files = getProcessedHtmlAndData();
      if (!files) return;
      const { htmlContent, dataValue } = files;
      if (!htmlContent) throw new Error("HTML content not found.");
      const res = await convertHtml2PDF.mutateAsync({ html: htmlContent, data: dataValue });
      window.open(res.file_url, "_blank");
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while converting the template to PDF.",
        variant: "destructive",
      });
    }
  };

  const hederActions = () => {
    if (isLoading) return [];
    if (template?.id && !isSample)
      return [
        {
          label: "Download",
          submitting: convertHtml2PDF.isPending,
          disabled: !isSupported,
          onClick: () => handleOnConvertHtml2PDF(),
        },
        {
          label: "Edit",
          submitting: convertHtml2PDF.isPending,
          onClick: () => setIsDialogOpen(true),
        },
        {
          label: "Save",
          submitting: saveTemplate.isPending,
          onClick: () => handleSaveTemplate(),
        },
      ];
    return [
      {
        label: "Download",
        submitting: convertHtml2PDF.isPending,
        disabled: !isSupported,
        onClick: () => handleOnConvertHtml2PDF(),
      },
      {
        label: "Save",
        onClick: () => setIsDialogOpen(true),
      },
    ];
  };
  useHeaderActions(hederActions());
  const parsedHtml = getProcessedHtml();

  return (
    <>
      <div className="relative flex h-[calc(100vh-100px)] flex-col overflow-hidden ">
        <CheckTemplatePlanSupport html={parsedHtml} />
        <div className="flex h-full w-full flex-1 overflow-hidden">
          <PanelGroup direction="horizontal" className="rounded-none">
            <Panel defaultSize={20} minSize={10} maxSize={20} className=" max-w-[250px]">
              <FileSidebar
                files={files}
                activeFileId={activeFileId}
                onFileSelect={handleFileSelect}
                onFileCreate={handleFileCreate}
                onFileDelete={handleFileDelete}
                onFileRename={handleFileRename}
              />
            </Panel>
            <PanelResizeHandle className="w-2 transition-colors hover:bg-primary/10" />
            <Panel defaultSize={40} minSize={30} maxSize={80} className="grid grid-rows-[max-content,auto]">
              <div className="flex border-b">
                <EditorTabs openTabs={openTabs} activeFileId={activeFileId} onClose={handleTabClose} setActiveFileId={setActiveFileId} files={files} />
                <Button variant="ghost" onClick={() => setShowPreview((prev) => !prev)}>
                  <PanelLeft size={16} className="text-foreground" />
                </Button>
              </div>
              {isLoading && <div className="flex h-full items-center justify-center">Loading...</div>}
              <CodeEditor files={files} activeFileId={activeFileId} onChange={handleCodeChange} />
            </Panel>
            {showPreview && (
              <>
                <PanelResizeHandle className="w-2 transition-colors hover:bg-primary/10" />
                <Panel defaultSize={40} className="grid grid-rows-[max-content,auto] overflow-hidden">
                  <div className="flex h-10 items-center justify-center border-br">
                    <span className="px-4 font-semibold text-sm">Preview</span>
                  </div>
                  {isLoading && <div className="flex h-full items-center justify-center">Loading...</div>}
                  {!isLoading && <TemplatePreview html={parsedHtml} />}
                </Panel>
              </>
            )}
          </PanelGroup>
        </div>
      </div>
      {!isLoading && (
        <TemplateDialogForm
          template={{ name: template?.name || "", description: template?.description || "" }}
          open={isDialogOpen}
          onCancel={() => setIsDialogOpen(false)}
          isSaving={saveTemplate.isPending}
          onSubmit={async (data) => {
            await handleSaveTemplate(data);
            setIsDialogOpen(false);
          }}
        />
      )}
    </>
  );
}
