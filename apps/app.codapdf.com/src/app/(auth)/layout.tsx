import { ParticleBackground } from "@/components/app/ParticleBackground";
import { TRCProvider } from "@/client/providers/TRCProvider";
import { getSessionToken } from "@/server/actions/auth/authSession";
import { Suspense, use } from "react";
import { AppLogo } from "@/client/components/app/AppLogo";

type AuthLayoutProps = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: AuthLayoutProps) => {
  const token = use(getSessionToken());
  return (
    <TRCProvider token={token}>
      <div className="grid min-h-screen w-full grid-cols-2 bg-secondary text-foreground dark:text-primary-foreground">
        <div className="flex items-center justify-center bg-brand-dark relative">
          <div className="text-center p-4 grid">
            <h1 className="text-4xl font-black  ">
              Welcome to <AppLogo className="h-6 inline" />
            </h1>
            <p className="text-2xl  pt-1 pb-4 te">
              Easily turn HTML templates into PDFs with a simple API and an intuitive dashboard
            </p>
          </div>
          <ParticleBackground />
        </div>
        <div className="grid p-8">
          <Suspense fallback={<div>Loading...</div>}>
            <div className="m-auto grid w-full sm:max-w-[500px]">{children}</div>
          </Suspense>
        </div>
      </div>
    </TRCProvider>
  );
};
export default AuthLayout;
