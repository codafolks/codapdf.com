import { stripe } from "@/server/actions/stripe/stripe";
import { logger } from "@/server/utils/logger";

type SubscriptionCancel = {
  subscriptionId: string;
};

export const subscriptionCancel = async ({ subscriptionId }: SubscriptionCancel) => {
  try {
    const api = stripe();
    return await api.subscriptions.cancel(subscriptionId);
  } catch (error) {
    logger.error("[subscriptionCancel] Subscription not found");
    throw error;
  }
};
