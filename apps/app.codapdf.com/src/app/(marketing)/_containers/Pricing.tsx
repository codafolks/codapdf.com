import { ROUTES } from "@/app/routes";
import { PricingTable } from "@/client/components/app/PricingTable";
import type { PlanSubscription } from "@/server/static/plansSubscription";
import { useRouter } from "next/navigation";
export const fetchCache = "force-cache";
export const dynamic = "force-static";

type PricingProps = {
  plans: Array<PlanSubscription>;
};
export const Pricing = ({ plans }: PricingProps) => {
  const router = useRouter();
  const onSelectPlan = (plan: PlanSubscription) => {
    router.push(ROUTES.AUTH.SIGNUP.path);
  };

  return (
    <section className="bg-background text-foreground" id="pricing">
      <div className="marketing-section px-4 md:px-6 py-12 lg:py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Choose a plan that works best for you. You can change your plan at
            any time.
          </p>
        </div>
        <PricingTable
          onSelectPlan={onSelectPlan}
          plans={plans}
          currentPlan="pro"
        />
      </div>
    </section>
  );
};
