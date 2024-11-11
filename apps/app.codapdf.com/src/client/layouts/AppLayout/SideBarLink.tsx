"use client";
import { useRouteInfo } from "@/client/hooks/useRouteInfo";
import { cn } from "@/client/lib/utils";
import type { SideBarRoute } from "@/client/utils/SideBarLinks";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const SideBarLink = ({ route }: { route: SideBarRoute }) => {
  const info = useRouteInfo();
  const isActive = (currentPath: string, path?: string) => {
    if (!path) return false;
    const url = new URL(currentPath, "http://localhost");
    return url.href === path;
  };

  return (
    <fieldset className="flex text-foreground">
      <Link
        href={route.path}
        className={cn("flex flex-1 items-center gap-2 border-l-[5px] border-l-transparent p-4 text-md hover:border-l-brand-violet hover:bg-secondary hover:text-foreground", {
          "border-l-[5px] border-l-brand-violet bg-app-border bg-secondary hover:border-l-brand-violet":
            isActive(info.href, route.path) || isActive(info.href, route.createRoutePath?.path),
        })}
      >
        {route?.icon}
        {route.title}
      </Link>
      {route?.createRoutePath && (
        <Link
          href={route.createRoutePath.path}
          className={cn("flex size-14 items-center justify-center rounded-none border-none text-foreground text-md hover:bg-secondary", {
            "border-l-[5px] border-l-brand-violet bg-app-border bg-secondary": isActive(info.href, route.createRoutePath.path),
          })}
        >
          <PlusIcon className="size-6" />
        </Link>
      )}
    </fieldset>
  );
};
