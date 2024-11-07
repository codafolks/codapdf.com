"use client";
import { ROUTES } from "@/app/routes";
import { cn } from "@/client/lib/utils";
import { Menu } from "@/components/app/Menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Template } from "@/server/database/schemas/templates";
import Image from "next/image";
import Link from "next/link";

type TemplateItemCardProps = {
  template: Template;
  onDelete: () => void;
  isDeleting?: boolean;
};
export const TemplateItemCard = ({ template, isDeleting, onDelete }: TemplateItemCardProps) => (
  <div
    className={cn("relative", {
      "pointer-events-none animate-pulse opacity-50": isDeleting,
    })}
  >
    <Menu
      className="absolute top-4 right-2 z-10"
      actions={[
        { label: "Edit", href: ROUTES.PRIVATE.TEMPLATES_EDIT.path(template.id) },
        {
          label: "Delete",
          onClick: onDelete,
          className: "text-red-500",
        },
      ]}
      isDropDown
    />
    <Link key={template.id} href={ROUTES.PRIVATE.TEMPLATES_EDIT.path(template.id)}>
      <Card className="h-full bg-background text-foreground hover:bg-secondary">
        <CardHeader>
          <CardTitle>{template.name}</CardTitle>
        </CardHeader>
        {template?.thumbnail && (
          <div className="relative my-2 aspect-video overflow-hidden bg-center bg-cover bg-gray-300 bg-no-repeat">
            <Image src={template.thumbnail} alt={template.name} fetchPriority="auto" width={300} height={300} quality={100} />
          </div>
        )}
        <CardContent>
          <p>{template.description}</p>
        </CardContent>
      </Card>
    </Link>
  </div>
);
