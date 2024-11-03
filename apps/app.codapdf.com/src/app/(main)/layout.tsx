import { AppLayout } from "@/client/layouts/AppLayout";

import { TRCProvider } from "@/client/providers/TRCProvider";
import { getSessionToken } from "@/server/actions/auth/authSession";
import { use } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const token = use(getSessionToken());
  const handleSIGINT = () => {
    console.info("[Received SIGINT]: cleaning up");
    // Perform any cleanup actions here
    process.setMaxListeners(0);
    process.exit(0);
  };

  const handleSIGTERM = () => {
    console.info("[Received SIGTERM]: cleaning up");
    // Perform any cleanup actions here
    process.setMaxListeners(0);
    process.exit(0);
  };

  if (process.env.NEXT_MANUAL_SIG_HANDLE) {
    process.on("SIGINT", handleSIGINT);
    process.on("SIGTERM", handleSIGTERM);
  }
  return (
    <TRCProvider token={token}>
      <AppLayout>{children}</AppLayout>
    </TRCProvider>
  );
};
export default Layout;
