"use client";

import { StripeCheckoutDialog } from "@/app/(billing)/_components/StripeCheckoutDialog";

import { useState } from "react";
import { PricingTable } from "@/client/components/app/PricingTable";
import { PlanSubscription } from "@/server/static/plansSubscription";
import { StripePlan, useStripeSubscriptionCancel } from "@/client/queries/stripe";
import { CancelSubscriptionDialog } from "@/app/(billing)/_components/CancelSubscriptionDialog";
import { useToast } from "@/client/components/ui/use-toast";
import { SubscriptionsFrequency } from "@/server/database/schemas/subscriptions";
import { useRouter } from "next/navigation";

type BillingPlansProps = {
  activePlan?: StripePlan;
  plans: Array<StripePlan>;
  subscriptionId?: string;
};
export const BillingPlans = ({ plans, activePlan, subscriptionId }: BillingPlansProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [frequency, setFrequency] = useState<SubscriptionsFrequency>("YEARLY");
  const [isDialog, setIsDialog] = useState(false);
  const [isCancelDialog, setIsCancelDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StripePlan | null>(null);
  const cancelSubscription = useStripeSubscriptionCancel({
    onError: () => {
      toast({
        title: "Error :D",
        description: "An error occurred while cancelling your subscription.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success :/",
        description: "Your subscription has been cancelled.",
        variant: "info",
      });
      router.refresh();
    },
  });
  const currentPlan = activePlan?.nickname;
  const onSelectPlan = (plan: PlanSubscription, newFrequency: SubscriptionsFrequency) => {
    if (plan.nickname === "enterprise") {
      window.location.href = "mailto:hello@codapdf.com?subject=Purchase Enterprise Plan";
      return;
    }
    setFrequency(newFrequency);
    setSelectedPlan(plan);
    setIsDialog(true);
  };

  const onCancelPlan = (plan: PlanSubscription) => {
    setSelectedPlan(plan);
    setIsCancelDialog(true);
  };

  return (
    <>
      <div className="flex flex-col items-center py-4 gap-8">
        <h1 className="text-3xl font-bold  text-foreground">
          Choose a plan that works best for you.
          <br />
          You can change your plan at any time.
        </h1>
        <PricingTable
          currentPlan={currentPlan}
          isBillingPage
          plans={plans}
          onSelectPlan={onSelectPlan}
          onCancelPlan={onCancelPlan}
        />
        {selectedPlan && isDialog && (
          <StripeCheckoutDialog
            open={isDialog}
            onClose={() => setIsDialog(false)}
            defaultPlan={selectedPlan}
            frequency={frequency}
          />
        )}
        {subscriptionId && (
          <CancelSubscriptionDialog
            open={isCancelDialog}
            onClose={() => setIsCancelDialog(false)}
            isSubmitting={cancelSubscription.isPending}
            onConfirm={() => {
              cancelSubscription.mutateAsync({ subscriptionId });
              setIsCancelDialog(false);
            }}
          />
        )}
      </div>
    </>
  );
};
