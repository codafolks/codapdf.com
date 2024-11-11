"use client";
import { TemplateItemCard } from "@/app/(main)/templates/_components/TemplateItemCard";
import { cn } from "@/client/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { templateExamples } from "@/app/(main)/templates/_data/templates";
import { ROUTES } from "@/app/routes";
import { useTemplateDelete, useTemplateList } from "@/client/queries/templates";
import { DeleteDialog } from "@/components/app/DeleteDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { trpcClient } from "@/server/trpc/trpcClient";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import Link from "next/link";
import { useRef, useState } from "react";
import { TemplateItemCardSkeleton } from "@/app/(main)/templates/_components/TemplateItemCardSkeleton";
import { Button } from "@/client/components/ui/button";

export const TemplateList = () => {
  const [tabValue, setTabValue] = useState<"templates" | "sample">("templates");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const templateId = useRef<number | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { data, isLoading } = useTemplateList();
  const templates = data?.data ?? [];

  const [isTemplateIdDeleting, setIsTemplateIdDeleting] = useState<number | null>(null);
  const { mutateAsync: onDelete } = useTemplateDelete({
    onSuccess: () => {
      const templateListKey = getQueryKey(trpcClient.templates.list, undefined, "query");
      queryClient.invalidateQueries({
        queryKey: templateListKey,
      });
      toast({
        title: "Template deleted",
        description: "The template was successfully deleted",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting template",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  return (
    <div className="grid gap-4 p-4 text-foreground">
      <Tabs value={tabValue} onValueChange={(value) => setTabValue(value as "templates" | "sample")}>
        <TabsList className="mb-4">
          <TabsTrigger value="templates">Your Templates</TabsTrigger>
          <TabsTrigger value="sample">Examples</TabsTrigger>
        </TabsList>
        <TabsContent
          value="templates"
          className={cn("grid gap-4", {
            "grid-cols-[repeat(auto-fill,minmax(250px,1fr))]": isLoading || templates.length > 0,
          })}
        >
          {templates.map((template) => (
            <TemplateItemCard
              key={template.id}
              template={template}
              onDelete={() => {
                templateId.current = template.id;
                setOpenDeleteDialog(true);
              }}
              isDeleting={isTemplateIdDeleting === template.id}
            />
          ))}

          {isLoading && (
            <>
              <TemplateItemCardSkeleton />
              <TemplateItemCardSkeleton />
              <TemplateItemCardSkeleton />
              <TemplateItemCardSkeleton />
            </>
          )}

          {!isLoading && !templates?.length && (
            <div className="flex flex-col items-center gap-2">
              <h3 className="m-auto font-semibold">You don't have any templates yet. Get started by:</h3>
              <div className="flex items-center gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={ROUTES.PRIVATE.TEMPLATES_CREATE.pathname()}>Creating a new template</Link>
                </Button>
                or
                <Button size="sm" variant="outline" onClick={() => setTabValue("sample")}>
                  Check out some examples
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent
          value="sample"
          className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 transition-all"
        >
          {templateExamples.map((template, idx) => (
            <Link key={template.id} href={ROUTES.PRIVATE.TEMPLATES_SAMPLE.pathname(template.id)}>
              <Card className="h-full bg-background text-foreground hover:bg-secondary">
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                </CardHeader>
                <div className="relative my-2 flex aspect-video items-center justify-center overflow-hidden border bg-center bg-cover bg-no-repeat text-foreground">
                  <strong className="font-semibold text-3xl">{idx + 1}</strong>
                </div>
                <CardContent>
                  <p>{template.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </TabsContent>
      </Tabs>
      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onDelete={() => {
          if (templateId.current) {
            setIsTemplateIdDeleting(templateId.current);
            onDelete({ id: templateId.current });
          }
          setOpenDeleteDialog(false);
        }}
      />
    </div>
  );
};
