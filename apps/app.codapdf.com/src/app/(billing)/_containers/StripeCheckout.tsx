import { StripeCheckoutForm } from "@/app/(billing)/_containers/StripeCheckoutForm";
import { env } from "@/constants/env.client";
import { SubscriptionsFrequency } from "@/server/database/schemas/subscriptions";
import { PlanSubscription } from "@/server/static/plansSubscription";

import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

const elementOptions: StripeElementsOptions = {
  amount: 0,
  mode: "subscription",
  currency: "usd",
  loader: "auto",
  appearance: {
    theme: "night",
  },
};

type StripeCheckoutProps = {
  defaultPlan: PlanSubscription;
  frequency: SubscriptionsFrequency;
};
const stripePromise = loadStripe(env.STRIPE_PUBLISHABLE_KEY);
const StripeCheckoutElements = (props: StripeCheckoutProps) => {
  const amount =
    props.frequency === "YEARLY" ? props.defaultPlan.price?.yearly : (props.defaultPlan.price?.monthly ?? 0);
  return (
    <Elements
      stripe={stripePromise}
      options={{
        ...elementOptions,
        amount,
      }}
    >
      <StripeCheckoutForm {...props} />
    </Elements>
  );
};

export const StripeCheckout = (props: StripeCheckoutProps) => <StripeCheckoutElements {...props} />;
