"use client";
import { AppLogo } from "@/client/components/app/AppLogo";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/client/components/ui/collapsible";
import { scrollSmoothTo } from "@/client/utils/scrollSmoothTo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { FileText, Home } from "lucide-react";
import Link from "next/link";
type DocsSideBarItem ={
  title: string;
  id: string;
  icon: React.FC;
  subItems?: {
    title: string;
    id: string;
  }[];
}
const items = [
  {
    title: "Introduction",
    id: "introduction",
    icon: Home,
  },
  {
    title: "HTML code editor",
    id: "using-code-editor",
    icon: FileText,
    subItems: [
      // {
      //   title: "Using the Editor",
      //   id: "using-code-editor",
      // },
      // {
      //   title: "Saving the template",
      //   id: "#",
      // },
      // {
      //   title: "Adding variables",
      //   id: "#",
      // },
      // {
      //   title: "Creating styles",
      //   id: "#",
      // },
    ],
  },
  {
    title: "Using API",
    id: "using-api",
    icon: Home,
  },
  // {
  //   title: "Using the API",
  //   id: "#",
  //   icon: CodeXml,
  //   subItems: [
  //     {
  //       title: "Creating an API key",
  //       id: "#",
  //     },
  //     {
  //       title: "API request examples",
  //       id: "#",
  //     },
  //     {
  //       title: "API reference",
  //       id: "#",
  //     },
  //   ],
  // },
  {
    title: "Coming soon",
    id: "coming-soon",
    icon: Home,
  },
]  as DocsSideBarItem[]

const getContainer = () => document.getElementById("docs-container");
const onClick = (e: React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLButtonElement>) => {
  const id = e.currentTarget.getAttribute("data-id");
  if (id) {
    scrollSmoothTo({
      id,
      container: getContainer(),
      threadHold: +120,
    });
  }
};
export function DocsSideBar() {
  return (
    <Sidebar className="bg-background text-foreground">
      <SidebarHeader className="border-b px-6 py-[24px]">
        <Link href="/" className="flex items-center">
          <AppLogo className="h-4 md:h-6" />
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu className="text-foreground">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item?.subItems?.length ? (
                <>
                  <Collapsible defaultOpen className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton onClick={onClick} data-id={item.id}>
                        <item.icon />
                        {item.title}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSub key={subItem.title} className="text-muted-foreground">
                          <SidebarMenuSubItem onClick={onClick} data-id={subItem.id} className="cursor-pointer">
                            {subItem.title}
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </>
              ) : (
                <SidebarMenuButton onClick={onClick} data-id={item.id}>
                  <item.icon />
                  {item.title}
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
