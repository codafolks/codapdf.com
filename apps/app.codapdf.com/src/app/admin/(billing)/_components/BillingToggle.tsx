import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { SubscriptionsFrequency } from "@/server/database/schemas/subscriptions";
import type { PlanSubscription } from "@/server/static/plansSubscription";

interface BillingToggleProps {
  frequency: SubscriptionsFrequency;
  onToggle: (frequency: SubscriptionsFrequency) => void;
  economize: PlanSubscription["economize"];
}

export function BillingToggle({ frequency, onToggle, economize }: Readonly<BillingToggleProps>) {
  const isYearly = frequency === "YEARLY";
  return (
    <div className="flex min-h-[56px] items-center justify-center gap-4 py-4">
      <Label htmlFor="billing-toggle" className="font-medium text-sm">
        Monthly
      </Label>
      <Switch
        id="billing-toggle"
        checked={isYearly}
        onCheckedChange={() => {
          onToggle(isYearly ? "MONTHLY" : "YEARLY");
        }}
      />
      <div className="flex flex-1 items-center gap-2 ">
        <Label htmlFor="billing-toggle" className="font-medium text-sm">
          Yearly
        </Label>
        {economize && isYearly && (
          <span className="rounded-full bg-green-100 px-2 py-1 font-medium text-green-700 text-xs">{economize}</span>
        )}
      </div>
    </div>
  );
}
