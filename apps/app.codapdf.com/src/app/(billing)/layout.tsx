import { AppLayout } from "@/client/layouts/AppLayout";

import { TRCProvider } from "@/client/providers/TRCProvider";
import { getSessionToken } from "@/server/actions/auth/authSession";
import { use } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const token = use(getSessionToken());
  return (
    <TRCProvider token={token}>
      <AppLayout>{children}</AppLayout>
    </TRCProvider>
  );
};
export default Layout;
