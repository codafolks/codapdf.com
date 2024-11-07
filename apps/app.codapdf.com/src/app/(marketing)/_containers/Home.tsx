import { ROUTES } from "@/app/routes";
import { AppLogo } from "@/client/components/app/AppLogo";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const ParticleBackground = dynamic(() => import("@/components/app/ParticleBackground").then((m) => m.ParticleBackground), {
  loading: () => <div>Loading...</div>,
});

export const Home = () => (
  <section className="relative w-full bg-background py-6 text-foreground md:py-8 lg:py-10 xl:py-48" id="home">
    <div className="z-10 mx-auto max-w-6xl px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center ">
        <div className="space-y-4 ">
          <h1 className="flex flex-col gap-2 font-black text-2xl sm:text-3xl md:flex-row md:items-center md:text-4xl lg:text-5xl/none">
            Turn HTML into PDFs with <AppLogo className="h-5 md:mt-1 md:h-9" />
          </h1>
          <p className="mx-auto max-w-[800px] md:text-xl">
            A developer-friendly API to quickly convert HTML templates into PDFs. Plus, a slick dashboard to help you keep track and manage everything smoothly.
          </p>
        </div>
        <div className="w-full space-y-4">
          <Button asChild>
            <Link href={ROUTES.AUTH.SIGNUP.path}>
              Sign Up for Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="font-bold text-lg underline md:text-xl">No credit card required</p>
        </div>
      </div>
    </div>
    <ParticleBackground />
  </section>
);
