import { useStripePaymentMethods, useStripeSubscriptionCreate, useStripeSubscriptionPlans } from "@/client/queries/stripe";
import type { StripePaymentMethod } from "@/client/queries/stripe";
import { env } from "@/constants/env.client";

import { PlanTabs } from "@/app/(billing)/_components/PlanTabs";
import { SavedCards } from "@/app/(billing)/_components/SavedCards";
import { Button } from "@/client/components/ui/button";
import { useUser, useUserLicenseUpdate, useUserUpdate } from "@/client/queries/users";
import type { SubscriptionsFrequency } from "@/server/database/schemas/subscriptions";
import type { PlanSubscription } from "@/server/static/plansSubscription";
import { logger } from "@/server/utils/logger";
import { PaymentElement, type PaymentElementProps, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

type StripeCheckoutFormProps = {
  defaultPlan: PlanSubscription;
  frequency: SubscriptionsFrequency;
};
export const StripeCheckoutForm = ({ defaultPlan, frequency: defaultFrequency }: StripeCheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const { data: user } = useUser();
  const { data: plans } = useStripeSubscriptionPlans();
  const { data: savedCards } = useStripePaymentMethods();
  const updateLicense = useUserLicenseUpdate();

  const [selectedPlan, setSelectedPlan] = useState<PlanSubscription>(defaultPlan);
  const [frequency, setFrequency] = useState<SubscriptionsFrequency>(defaultFrequency);
  const isYearly = frequency === "YEARLY";

  const [paymentMethod, setPaymentMethod] = useState<StripePaymentMethod | null>(null);
  const updateUser = useUserUpdate();

  const subscriptionCreate = useStripeSubscriptionCreate();
  const [message, setMessage] = useState<string>();
  const [isLoadingElements, setIsLoadingElements] = useState(true);

  const license = selectedPlan.license;
  const isSubmitting = subscriptionCreate.isPending || updateUser.isPending || updateLicense.isPending;

  const handlePaymentForPaymentMethodSelected = async () => {
    try {
      setMessage(undefined);
      if (!paymentMethod || !selectedPlan?.price || !frequency) {
        throw new Error("Missing prices or paymentMethod");
      }
      if (!stripe) {
        throw new Error("Stripe not loaded");
      }
      const { clientSecret } = await subscriptionCreate.mutateAsync({
        nickname: selectedPlan.nickname,
        priceAmount: isYearly ? selectedPlan.price?.yearly : selectedPlan.price?.monthly,
        paymentMethodId: paymentMethod?.id,
        frequency,
      });

      if (!clientSecret) {
        throw new Error("Client secret not found");
      }
      // Update the user license to the new license
      await updateLicense.mutateAsync({ license });

      // Confirm the payment with PaymentElement and clientSecret
      const { error } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          receipt_email: user?.email,
          return_url: `${env.APP_DOMAIN}/settings/billing?stripe_success=true`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      setMessage(message);
      logger.child({ module: "[handlePaymentForPaymentMethodSelected]" }).error(error);
    }
  };

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: For now, we need to keep this function as is to handle the payment process
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (paymentMethod) {
        await handlePaymentForPaymentMethodSelected();
        return;
      }

      setMessage(undefined);
      if (!selectedPlan || !selectedPlan.price || !stripe || !elements?.submit) {
        throw new Error("Missing prices or stripe or elements");
      }

      if (!stripe || !elements?.submit) {
        throw new Error("Stripe not loaded");
      }
      // First call elements.submit() to ensure all asynchronous submission/validation is handled
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }
      const { clientSecret } = await subscriptionCreate.mutateAsync({
        nickname: selectedPlan.nickname,
        priceAmount: isYearly ? selectedPlan.price?.yearly : selectedPlan.price?.monthly,
        frequency,
      });

      if (!clientSecret) {
        throw new Error("Client secret not found");
      }
      // Update the user license to the new license
      await updateLicense.mutateAsync({ license });

      // Confirm the payment with PaymentElement and clientSecret
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          save_payment_method: true,
          receipt_email: user?.email,
          return_url: `${env.APP_DOMAIN}/settings/billing?stripe_success=true`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      setMessage(message);
      logger.child({ module: "StripeCheckoutForm" }).error(error);
    }
  };

  const paymentElementOptions: PaymentElementProps["options"] = {
    layout: "tabs",
  };

  const handleCardSelection = (selectedPaymentMethod: StripePaymentMethod | null) => {
    setPaymentMethod(selectedPaymentMethod);
  };

  const handlePlanSelection = (plan: PlanSubscription, newFrequency: SubscriptionsFrequency) => {
    setSelectedPlan(plan);
    setFrequency(newFrequency);
  };
  return (
    <div className="bg-background">
      <h1 className="font-bold text-3xl">Choose your plan</h1>
      <p className="pb-4 text-gray-600">Select the plan that works best for you. You can change your plan at any time.</p>
      {plans && defaultPlan && <PlanTabs plans={plans} value={selectedPlan} frequency={frequency} onChange={handlePlanSelection} />}
      <div className="grid pt-4">
        <h1 className="font-bold text-3xl">Payment Details</h1>
        <p className="pb-4 text-gray-600">Enter your card information to complete your subscription.</p>
        {savedCards && savedCards.length > 0 && <SavedCards methods={savedCards} paymentMethod={paymentMethod} onSelectPaymentMethod={handleCardSelection} />}
        <form id="payment-form" onSubmit={handleSubmit} className="flex flex-col gap-6 py-4 text-foreground">
          <input type="hidden" name="email" value={user?.email} />
          {!paymentMethod && <PaymentElement id="payment-element" options={paymentElementOptions} className="grid gap-6" onReady={() => setIsLoadingElements(false)} />}
          <Button type="submit" disabled={isLoadingElements} submitting={isSubmitting}>
            Pay Now
          </Button>
          {message && <span className="text-red-500">{message}</span>}
          {isLoadingElements && <span>Loading...</span>}
        </form>
      </div>
    </div>
  );
};
