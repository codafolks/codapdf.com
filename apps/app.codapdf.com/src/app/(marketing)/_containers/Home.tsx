import { ROUTES } from "@/app/routes";
import { AppLogo } from "@/client/components/app/AppLogo";
import { ParticleBackground } from "@/components/app/ParticleBackground";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Home = () => (
  <section className="w-full py-6 md:py-8 lg:py-10 xl:py-48 bg-background text-foreground relative" id="home">
    <div className="max-w-6xl mx-auto px-4 md:px-6 z-10">
      <div className="flex flex-col items-center space-y-4 text-center ">
        <div className="space-y-2">
          <h1 className="text-2xl font-black  sm:text-3xl md:text-4xl lg:text-5xl/none flex items-center">
            Turn HTML into PDFs with <AppLogo className="h-9 ml-2" />
          </h1>
          <p className="mx-auto max-w-[800px] md:text-xl">
            A developer-friendly API to quickly convert HTML templates into PDFs. Plus, a slick dashboard to help you
            keep track and manage everything smoothly.
          </p>
        </div>
        <div className="w-full  space-y-2">
          <Button asChild>
            <Link href={ROUTES.AUTH.SIGNUP.path}>
              Sign Up for Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="font-bold underline text-xl">No credit card required. Start with our free tier today.</p>
        </div>
      </div>
    </div>
    <ParticleBackground />
  </section>
);
