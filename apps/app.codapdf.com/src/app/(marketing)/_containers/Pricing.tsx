import { serverApi } from "@/server/trpc/trpcServer";

import dynamic from "next/dynamic";
import { use } from "react";

const PricingTable = dynamic(() => import("@/client/components/app/PricingTable").then((m) => m.PricingTable), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});

export const Pricing = () => {
  const plans = use(serverApi.stripe.getPlans());
  return (
    <section className="bg-background text-foreground" id="pricing">
      <div className="marketing-section px-4 py-12 md:px-6 md:py-24 lg:py-16">
        <div className="text-center">
          <h1 className="font-bold text-4xl tracking-tight sm:text-5xl">Simple, transparent pricing</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Choose a plan that works best for you. You can change your plan at any time.
          </p>
        </div>
        <PricingTable plans={plans} currentPlan="pro" />
      </div>
    </section>
  );
};
