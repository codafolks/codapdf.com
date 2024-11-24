import { DocsSideBar } from "@/app/docs/_components/docs-side-bar";
import { SidebarInset, SidebarProvider } from "@/client/components/ui/sidebar";
import type { ReactNode } from "react";
const DocsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <DocsSideBar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};
export default DocsLayout;
