import { SIDEBAR_ROUTES } from "@/client/utils/SideBarLinks";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarLink } from "@/client/layouts/AppLayout/SideBarLink";
import { LogoutButton } from "@/client/layouts/AppLayout/LogoutButton";
import { AppLogo } from "@/client/components/app/AppLogo";

const AppSidebar = () => {
  return (
    <Sidebar className="bg-background p-0">
      <div className="border-b px-6 flex h-16 overflow-hidden">
        <AppLogo />
      </div>
      <SidebarContent className="bg-background">
        <SidebarGroupContent>
          <SidebarMenu className="gap-0">
            {SIDEBAR_ROUTES.map((route) => (
              <SidebarMenuItem key={route.title} className="p-0">
                <SideBarLink route={route} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export { AppSidebar };
