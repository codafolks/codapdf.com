import { stripe } from "@/server/actions/stripe/stripe";
import { logger } from "@/server/utils/logger";

type SubscriptionRetrieve = {
  subscriptionId: string;
};
export const subscriptionRetrieve = async ({ subscriptionId }: SubscriptionRetrieve) => {
  try {
    const api = stripe();
    return await api.subscriptions.retrieve(subscriptionId);
  } catch (error) {
    logger.error("[subscriptionRetrieve]", error);
    throw error;
  }
};
