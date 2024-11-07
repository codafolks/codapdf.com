"use client";
import { ROUTES } from "@/app/routes";
import { PricingTableCard } from "@/client/components/app/PricingTableCard";
import { Switch } from "@/client/components/ui/switch";
import { cn } from "@/client/lib/utils";
import type { SubscriptionsFrequency } from "@/server/database/schemas/subscriptions";
import type { PlanSubscription } from "@/server/static/plansSubscription";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PricingTableProps {
  currentPlan?: PlanSubscription["nickname"];
  onSelectPlan?: (plan: PlanSubscription, frequency: SubscriptionsFrequency) => void;
  onCancelPlan?: (plan: PlanSubscription) => void;
  isBillingPage?: boolean;
  plans: Array<PlanSubscription>;
}

export function PricingTable({ plans, isBillingPage, currentPlan, onSelectPlan, onCancelPlan }: Readonly<PricingTableProps>) {
  const router = useRouter();
  const [frequency, setFrequency] = useState<SubscriptionsFrequency>("YEARLY");
  const isYearly = frequency === "YEARLY";

  const handleOnSelectPlan = (plan: PlanSubscription) => {
    if (typeof onSelectPlan === "function") {
      onSelectPlan(plan, frequency);
    } else {
      router.push(ROUTES.AUTH.SIGNUP.path);
    }
  };
  return (
    <div className="w-full">
      <div className="mb-10 flex items-center justify-center gap-4">
        <span className={cn("font-medium text-sm", !isYearly ? "text-primary" : "text-muted-foreground")}>Monthly</span>
        <Switch
          checked={isYearly}
          name="plan-frequency"
          onCheckedChange={() => {
            setFrequency((prev) => (prev === "YEARLY" ? "MONTHLY" : "YEARLY"));
          }}
        />
        <span className={cn("font-medium text-sm", isYearly ? "text-primary" : "text-muted-foreground")}>Yearly</span>
      </div>
      <div className="mx-auto grid gap-8 lg:grid-cols-4">
        {plans.map((plan) => (
          <PricingTableCard
            key={plan.nickname}
            plan={plan}
            currentPlan={currentPlan}
            isBillingPage={isBillingPage}
            frequency={frequency}
            onSelectPlan={handleOnSelectPlan}
            onCancelPlan={onCancelPlan}
          />
        ))}
      </div>
    </div>
  );
}
