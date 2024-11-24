import type { PlanSubscription } from "@/server/static/plansSubscription";
import { Zap } from "lucide-react";

interface PlanFeaturesProps {
  features: PlanSubscription["features"];
}
export function PlanFeatures({ features }: Readonly<PlanFeaturesProps>) {
  return (
    <ul className="grid gap-4">
      {features.map((feature) => (
        <li
          key={feature.title}
          className=" grid grid-cols-[max-content,auto] items-start gap-2 text-muted-foreground text-sm"
        >
          <Zap className="mt-1 size-4 text-primary" />
          <span>{feature.description}</span>
        </li>
      ))}
    </ul>
  );
}
