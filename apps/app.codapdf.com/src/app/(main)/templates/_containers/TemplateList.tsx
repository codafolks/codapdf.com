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

export const TemplateList = () => {
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
    <div className="grid gap-4 p-4">
      <Tabs defaultValue="templates">
        <TabsList className="mb-4">
          <TabsTrigger value="templates">Your Templates</TabsTrigger>
          <TabsTrigger value="sample">Examples</TabsTrigger>
        </TabsList>
        <TabsContent
          value="templates"
          className={cn("grid gap-4", {
            "grid-cols-[repeat(auto-fill,minmax(250px,1fr))]": templates.length > 0,
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
          {isLoading && <div className="col-span-full text-center text-gray-400">Loading templates...</div>}
          {!templates?.length && !isLoading && <div className="text-center text-gray-400">No templates found</div>}
        </TabsContent>
        <TabsContent value="sample" className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 transition-all">
          {templateExamples.map((template) => (
            <Link key={template.id} href={ROUTES.PRIVATE.TEMPLATES_SAMPLE.path(template.id)}>
              <Card className="h-full bg-background text-foreground hover:bg-secondary">
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                </CardHeader>
                <div className="relative my-2 aspect-video overflow-hidden bg-center bg-cover bg-gray-300 bg-no-repeat" />
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
