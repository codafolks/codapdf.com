import { stripe } from "@/server/actions/stripe/stripe";
import { subscriptionCancel } from "@/server/actions/stripe/subscriptions/subscriptionCancel";
import { logger } from "@/server/utils/logger";

type SubscriptionUpdate = {
  customerId: string;
  priceId: string;
  paymentMethodId: string;
  lasSubscriptionId: string;
};

export const subscriptionUpdate = async ({ customerId, priceId, paymentMethodId, lasSubscriptionId }: SubscriptionUpdate) => {
  try {
    await subscriptionCancel({ subscriptionId: lasSubscriptionId });
    const api = stripe();

    // Create the new subscription using the retrieved payment method
    const subscription = await api.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }], // Replace with your new plan price ID
      default_payment_method: paymentMethodId,
      expand: ["latest_invoice.payment_intent"], // Expand the latest invoice to get payment details
    });

    return subscription;
  } catch (error) {
    logger.error("[subscriptionUpdate]", error);
    throw error;
  }
};
