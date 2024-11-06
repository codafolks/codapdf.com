import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SubscriptionsFrequency } from "@/server/database/schemas/subscriptions";
import { PlanSubscription } from "@/server/static/plansSubscription";

interface BillingToggleProps {
  frequency: SubscriptionsFrequency;
  onToggle: (frequency: SubscriptionsFrequency) => void;
  economize: PlanSubscription["economize"];
}

export function BillingToggle({ frequency, onToggle, economize }: Readonly<BillingToggleProps>) {
  const isYearly = frequency === "YEARLY";
  return (
    <div className="flex items-center justify-center gap-4 py-4 min-h-[56px]">
      <Label htmlFor="billing-toggle" className="text-sm font-medium">
        Monthly
      </Label>
      <Switch
        id="billing-toggle"
        checked={isYearly}
        onCheckedChange={() => {
          onToggle(isYearly ? "MONTHLY" : "YEARLY");
        }}
      />
      <div className="flex items-center gap-2 flex-1 ">
        <Label htmlFor="billing-toggle" className="text-sm font-medium">
          Yearly
        </Label>
        {economize && isYearly && <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">{economize}</span>}
      </div>
    </div>
  );
}
