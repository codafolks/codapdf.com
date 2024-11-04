"use client";
import { ButtonUpdateTheme } from "@/client/components/app/ButtonUpdateTheme";
import { useRouteInfo } from "@/client/hooks/useRouteInfo";
import { HeaderActions } from "@/client/layouts/AppLayout/HeaderActions";
import { useHeaderActionsStore } from "@/client/stores/useHeaderActionsStore";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  const actions = useHeaderActionsStore((state) => state.actions);
  const route = useRouteInfo();
  const hasParent = route && "parent" in route;
  const hasTitle = route && "header" in route;

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background text-foreground">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {hasParent && (
            <BreadcrumbItem>
              <BreadcrumbLink href={route?.parent().path}>{route?.parent().header}</BreadcrumbLink>
            </BreadcrumbItem>
          )}
          {hasParent && <BreadcrumbSeparator />}
          {hasTitle && (
            <BreadcrumbItem>
              <BreadcrumbPage>{route?.header}</BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-2 items-center ml-auto mr-0">
        {actions.length > 0 && <HeaderActions actions={actions} />}
        <ButtonUpdateTheme />
      </div>
    </header>
  );
};

export { Header };
