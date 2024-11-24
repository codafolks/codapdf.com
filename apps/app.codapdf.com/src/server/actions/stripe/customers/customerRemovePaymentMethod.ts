import { stripe } from "@/server/actions/stripe/stripe";
import { logger } from "@/server/utils/logger";

type CustomerRemovePaymentMethod = {
  paymentMethodId: string;
};

export const customerRemovePaymentMethod = async ({ paymentMethodId }: CustomerRemovePaymentMethod) => {
  try {
    const api = stripe();
    const detachedPaymentMethod = await api.paymentMethods.detach(paymentMethodId);
    return detachedPaymentMethod;
  } catch (error) {
    logger.error("[customerRemovePaymentMethod]", error);
    throw error;
  }
};
