import { LicenseWarning } from "@/client/components/app/LicenseWarning";
import { AppSidebar } from "@/client/layouts/AppLayout/AppSidebar";
import { Header } from "@/client/layouts/AppLayout/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="h-[calc(100vh-80px)] overflow-y-auto border-app-medium">
          <LicenseWarning />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export { AppLayout };
