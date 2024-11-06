import { BillingToggle } from "@/app/(billing)/_components/BillingToggle";
import { PlanFeatures } from "@/app/(billing)/_components/PlanFeatures";
import { toMoney } from "@/client/utils/toMoney";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionsFrequency } from "@/server/database/schemas/subscriptions";
import { PlanSubscription } from "@/server/static/plansSubscription";

interface PlanPrice {
  monthly: string;
  yearly: string;
}

interface Plan {
  id: string;
  name: string;
  price: PlanPrice;
  features: Array<string>;
}

interface PlanTabsProps {
  plans: Array<PlanSubscription>;
  value: PlanSubscription;
  frequency: SubscriptionsFrequency;
  onChange: (plan: PlanSubscription, frequency: SubscriptionsFrequency) => void;
}

export function PlanTabs({ plans: _plans, onChange, frequency, value }: Readonly<PlanTabsProps>) {
  const isYearly = frequency === "YEARLY";
  const plans = _plans.filter((plan) => plan.nickname !== "enterprise");
  const handleBillingToggle = (newFrequency: SubscriptionsFrequency) => {
    onChange(value, newFrequency);
  };

  const handleSelectPlan = (nickname: PlanSubscription["nickname"]) => {
    const filteredPlan = plans.find((p) => p.nickname === nickname);
    if (!filteredPlan) return;
    onChange(filteredPlan, frequency);
  };

  return (
    <div className="grid gap-1">
      <BillingToggle frequency={frequency} onToggle={handleBillingToggle} economize={value.economize} />
      <Tabs defaultValue={value.nickname} onValueChange={(v) => handleSelectPlan(v as PlanSubscription["nickname"])} className="w-full grid gap-4">
        <TabsList className="grid grid-cols-3 w-full">
          {plans.map((plan) => (
            <TabsTrigger key={plan.nickname} value={plan.nickname} className="text-sm uppercase font-bold">
              {plan.nickname}
            </TabsTrigger>
          ))}
        </TabsList>
        {plans.map((plan) => (
          <TabsContent key={plan.nickname} value={plan.nickname}>
            <div className="rounded-lg border-2 border-muted bg-popover p-6 grid gap-4">
              <div className="flex  justify-between">
                <h3 className="text-lg font-bold capitalize">{plan.title}</h3>
                <div>
                  <span className="text-2xl font-bold">{isYearly ? toMoney((plan.price?.yearly ?? 0) / 100) : toMoney((plan.price?.monthly ?? 0) / 100)}</span>
                  <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                </div>
              </div>
              <PlanFeatures features={plan.features} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
