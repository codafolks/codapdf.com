import { PaymentStatus } from "@/app/(billing)/_components/PaymentStatus";
import { BillingPlans } from "@/app/(billing)/settings/_containers/BillingPlans";
import { serverApi } from "@/server/trpc/trpcServer";
import { cache, use } from "react";

const all = cache(() => {
  return Promise.all([serverApi.stripe.getPlans(), serverApi.stripe.getSubscription()]);
});
export default function BillingPage() {
  const [plans, subscription] = use(all());
  const activePlan = subscription?.subscriptionId
    ? plans?.find((plan) => plan.nickname === subscription?.nickname)
    : undefined;

  return (
    <>
      <PaymentStatus />
      <div className="grid gap-4 p-4">
        <BillingPlans plans={plans} activePlan={activePlan} subscriptionId={subscription?.subscriptionId} />
      </div>
    </>
  );
}
