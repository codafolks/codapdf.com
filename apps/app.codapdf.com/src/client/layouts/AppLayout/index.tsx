import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/client/layouts/AppLayout/AppSidebar";
import { Header } from "@/client/layouts/AppLayout/Header";
import type { ReactNode } from "react";
import { LicenseWarning } from "@/client/components/app/LicenseWarning";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="border-app-medium overflow-y-auto h-[calc(100vh-80px)]">
          <LicenseWarning />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export { AppLayout };
