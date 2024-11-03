import { stripe } from "@/server/actions/stripe/stripe";
import { logger } from "@/server/utils/logger";

type SubscriptionCreate = {
  priceId: string;
  customerId: string;
  paymentMethodId?: string;
};
export const subscriptionCreate = async ({ priceId, customerId, paymentMethodId }: SubscriptionCreate) => {
  try {
    const api = stripe();
    if (paymentMethodId) {
      return await api.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"],
        off_session: true,
        default_payment_method: paymentMethodId,
      });
    }
    return await api.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });
  } catch (error) {
    logger.error("[subscriptionCreate]", error);
    throw error;
  }
};
