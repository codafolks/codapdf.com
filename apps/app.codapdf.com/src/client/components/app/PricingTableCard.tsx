import { Button } from "@/client/components/ui/button";
import { cn } from "@/client/lib/utils";
import { toMoney } from "@/client/utils/toMoney";
import { SubscriptionsFrequency } from "@/server/database/schemas/subscriptions";
import { PlanSubscription } from "@/server/static/plansSubscription";
import { Check } from "lucide-react";

interface PricingTableCardProps {
  plan: PlanSubscription;
  currentPlan?: PlanSubscription["nickname"];
  isBillingPage?: boolean;
  frequency?: SubscriptionsFrequency;
  onSelectPlan: (plan: PlanSubscription) => void;
  onCancelPlan?: (plan: PlanSubscription) => void;
}

export function PricingTableCard({ plan, currentPlan, isBillingPage, frequency = "YEARLY", onSelectPlan, onCancelPlan }: Readonly<PricingTableCardProps>) {
  const isCancelPlan = typeof currentPlan === "string" && plan.nickname === currentPlan && isBillingPage;
  const isYearly = frequency === "YEARLY";
  return (
    <div
      className={cn(
        "relative rounded-xl border p-8 shadow-sm transition-all hover:shadow-lg",
        plan.nickname === currentPlan ? "border-primary/20 bg-primary/5" : "border-border bg-card",
      )}
    >
      {typeof currentPlan === "string" && plan.nickname === currentPlan && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-primary to-primary/80 px-3 py-1 text-center text-sm font-medium text-primary-foreground">
          {isBillingPage ? "Current Plan" : "Popular"}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground">{plan.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
      </div>

      {typeof plan.price !== "undefined" ? (
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              {isYearly ? toMoney((plan.price?.yearly ?? 0) / 100) : toMoney((plan.price?.monthly ?? 0) / 100)}
            </span>
            <span className="ml-1 text-sm font-semibold text-muted-foreground">/{isYearly ? "year" : "month"}</span>
          </div>
          {isYearly && plan.economize && <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">{plan.economize}</p>}
        </div>
      ) : (
        <div className="mb-6">
          <p className="text-4xl font-bold tracking-tight text-foreground">Custom Pricing</p>
          <span className="text-sm font-bold tracking-tight text-foreground">STARTING AT $500 PER MONTH</span>
        </div>
      )}

      <Button
        className={cn(
          "w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
          plan.nickname === currentPlan ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        )}
        onClick={() => {
          if (isCancelPlan) {
            onCancelPlan?.(plan);
          } else {
            onSelectPlan(plan);
          }
        }}
      >
        {isCancelPlan ? "Cancel Plan" : plan.cta}
      </Button>

      <ul className="mt-8 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature.title} className="flex items-start gap-3">
            <Check className="h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <p className="font-medium text-foreground">{feature.title}</p>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
