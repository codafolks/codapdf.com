"use client";
import { useRouteInfo } from "@/client/hooks/useRouteInfo";
import { cn } from "@/client/lib/utils";
import type { SideBarRoute } from "@/client/utils/SideBarLinks";
import { env } from "@/constants/env.client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const SideBarLink = ({ route }: { route: SideBarRoute }) => {
  const info = useRouteInfo();
  const isActive = (href: string, pathname: string) => {
    const url = new URL(pathname, env.APP_DOMAIN);
    return url.href === href;
  };

  return (
    <fieldset className="flex text-foreground">
      <Link
        href={route.pathname}
        className={cn(
          "flex flex-1 items-center gap-2 border-l-[5px] border-l-transparent p-4 text-md hover:border-l-brand-violet hover:bg-secondary hover:text-foreground",
          {
            "border-l-[5px] border-l-brand-violet bg-app-border bg-secondary hover:border-l-brand-violet":
              isActive(info.href, route.pathname) ||
              (route?.createRoutePath && route?.createRoutePath.pathname
                ? isActive(info.href, route.createRoutePath.pathname)
                : false),
          },
        )}
      >
        {route?.icon}
        {route.title}
      </Link>
      {route?.createRoutePath && (
        <Link
          href={route.createRoutePath.pathname}
          className={cn(
            "flex size-14 items-center justify-center rounded-none border-none text-foreground text-md hover:bg-secondary",
            {
              "border-l-[5px] border-l-brand-violet bg-app-border bg-secondary": isActive(
                info.href,
                route.createRoutePath.pathname,
              ),
            },
          )}
        >
          <PlusIcon className="size-6" />
        </Link>
      )}
    </fieldset>
  );
};
