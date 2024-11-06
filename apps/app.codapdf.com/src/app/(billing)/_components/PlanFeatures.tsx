import { PlanSubscription } from "@/server/static/plansSubscription";
import { Zap } from "lucide-react";

interface PlanFeaturesProps {
  features: PlanSubscription["features"];
}
export function PlanFeatures({ features }: Readonly<PlanFeaturesProps>) {
  return (
    <ul className="grid gap-4">
      {features.map((feature) => (
        <li key={feature.title} className=" grid grid-cols-[max-content,auto] items-start text-sm text-muted-foreground gap-2">
          <Zap className="size-4 text-primary mt-1" />
          <span>{feature.description}</span>
        </li>
      ))}
    </ul>
  );
}
