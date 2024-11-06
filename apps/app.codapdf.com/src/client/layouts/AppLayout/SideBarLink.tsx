"use client";
import { useRouteInfo } from "@/client/hooks/useRouteInfo";
import { cn } from "@/client/lib/utils";
import { SideBarRoute } from "@/client/utils/SideBarLinks";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const SideBarLink = ({ route }: { route: SideBarRoute }) => {
  const info = useRouteInfo();
  return (
    <fieldset className="flex text-foreground">
      <Link
        href={route.path}
        className={cn("flex flex-1 gap-2 p-4 border-l-[5px] border-l-transparent hover:border-l-brand-violet hover:bg-secondary text-md items-center hover:text-foreground", {
          "bg-app-border border-l-[5px] border-l-brand-violet hover:border-l-brand-violet bg-secondary": info?.path === route.path || info?.path === route.createRoutePath?.path,
        })}
      >
        {route?.icon}
        {route.title}
      </Link>
      {route?.createRoutePath && (
        <Link
          href={route.createRoutePath.path}
          className={cn("hover:bg-secondary  rounded-none size-14 border-none text-md items-center justify-center text-foreground flex", {
            "bg-app-border border-l-[5px] border-l-brand-violet bg-secondary": info?.path === route.createRoutePath.path,
          })}
        >
          <PlusIcon className="size-6" />
        </Link>
      )}
    </fieldset>
  );
};
