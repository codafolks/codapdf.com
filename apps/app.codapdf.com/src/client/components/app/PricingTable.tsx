import { useState } from "react";
import { PlanSubscription } from "@/server/static/plansSubscription";
import { cn } from "@/client/lib/utils";
import { Switch } from "@/client/components/ui/switch";
import { PricingTableCard } from "@/client/components/app/PricingTableCard";
import { SubscriptionsFrequency } from "@/server/database/schemas/subscriptions";

interface PricingTableProps {
  currentPlan?: PlanSubscription["nickname"];
  onSelectPlan: (plan: PlanSubscription, frequency: SubscriptionsFrequency) => void;
  onCancelPlan?: (plan: PlanSubscription) => void;
  isBillingPage?: boolean;
  plans: Array<PlanSubscription>;
}

export function PricingTable({
  plans,
  isBillingPage,
  currentPlan,
  onSelectPlan,
  onCancelPlan,
}: Readonly<PricingTableProps>) {
  const [frequency, setFrequency] = useState<SubscriptionsFrequency>("YEARLY");
  const isYearly = frequency === "YEARLY";
  return (
    <div className="w-full">
      <div className="mb-10 flex justify-center items-center gap-4">
        <span className={cn("text-sm font-medium", !isYearly ? "text-primary" : "text-muted-foreground")}>Monthly</span>
        <Switch
          checked={isYearly}
          onCheckedChange={() => {
            setFrequency((prev) => (prev === "YEARLY" ? "MONTHLY" : "YEARLY"));
          }}
        />
        <span className={cn("text-sm font-medium", isYearly ? "text-primary" : "text-muted-foreground")}>Yearly</span>
      </div>
      <div className="mx-auto grid gap-8 lg:grid-cols-4">
        {plans.map((plan) => (
          <PricingTableCard
            key={plan.nickname}
            plan={plan}
            currentPlan={currentPlan}
            isBillingPage={isBillingPage}
            frequency={frequency}
            onSelectPlan={() => onSelectPlan(plan, frequency)}
            onCancelPlan={onCancelPlan}
          />
        ))}
      </div>
    </div>
  );
}
