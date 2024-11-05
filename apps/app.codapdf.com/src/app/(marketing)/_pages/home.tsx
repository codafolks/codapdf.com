"use client";
import { AnimatedIntro } from "@/app/(marketing)/_components/AnimatedIntro";
import { Contact } from "@/app/(marketing)/_containers/Contact";
import { Features } from "@/app/(marketing)/_containers/Features";
import { Home } from "@/app/(marketing)/_containers/Home";
import { Pricing } from "@/app/(marketing)/_containers/Pricing";

import { TRCProvider } from "@/client/providers/TRCProvider";
import type { PlanSubscription } from "@/server/static/plansSubscription";

export const HomePage = ({ plans }: { plans: Array<PlanSubscription> }) => (
  <>
    <Home />
    <Features />
    <Pricing plans={plans} />
    <TRCProvider token={null}>
      <Contact />
    </TRCProvider>
    <AnimatedIntro />
  </>
);
