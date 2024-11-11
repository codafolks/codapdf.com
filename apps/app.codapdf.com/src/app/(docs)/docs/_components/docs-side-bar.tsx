import { AppLogo } from "@/client/components/app/AppLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar, Home, Inbox } from "lucide-react";
// Menu items.
const items = [
  {
    title: "Introduction",
    url: "#",
    icon: Home,
  },
  {
    title: "HTML code editor",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Using the API",
    url: "#",
    icon: Calendar,
  },
];
export function DocsSideBar() {
  return (
    <Sidebar className="bg-background text-foreground">
      <SidebarHeader className="border-b py-[20px]">
        <AppLogo className="h-4 md:h-6" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
