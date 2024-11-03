"use client";
import { ROUTES } from "@/app/routes";
import { Menu } from "@/components/app/Menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/client/lib/utils";
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
      "opacity-50 animate-pulse pointer-events-none": isDeleting,
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
      <Card className="hover:bg-secondary h-full text-foreground bg-background">
        <CardHeader>
          <CardTitle>{template.name}</CardTitle>
        </CardHeader>
        {template?.thumbnail && (
          <div className="bg-gray-300 overflow-hidden relative bg-cover bg-no-repeat bg-center aspect-video my-2">
            <Image
              src={template.thumbnail}
              alt={template.name}
              fetchPriority="auto"
              width={300}
              height={300}
              quality={100}
            />
          </div>
        )}
        <CardContent>
          <p>{template.description}</p>
        </CardContent>
      </Card>
    </Link>
  </div>
);
