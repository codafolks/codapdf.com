import { AppLogo } from "@/client/components/app/AppLogo";
import { TRCProvider } from "@/client/providers/TRCProvider";
import { ParticleBackground } from "@/components/app/ParticleBackground";
import { getSessionToken } from "@/server/actions/auth/authSession";
import { Suspense, use } from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: AuthLayoutProps) => {
  const token = use(getSessionToken());
  return (
    <TRCProvider token={token}>
      <div className="grid min-h-screen w-full grid-cols-2 bg-secondary text-foreground dark:text-primary-foreground">
        <div className="relative flex items-center justify-center bg-brand-dark">
          <div className="grid p-4 text-center">
            <h1 className="font-black text-4xl ">
              Welcome to <AppLogo className="inline h-6" />
            </h1>
            <p className="te pt-1 pb-4 text-2xl">Easily turn HTML templates into PDFs with a simple API and an intuitive dashboard</p>
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
