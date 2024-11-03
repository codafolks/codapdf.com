import { stripe } from "@/server/actions/stripe/stripe";
import { logger } from "@/server/utils/logger";

type CustomerListPaymentMethod = {
  customerId: string;
};
export const customerListPaymentMethod = async ({ customerId }: CustomerListPaymentMethod) => {
  try {
    const api = stripe();
    const paymentMethods = await api.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    if (paymentMethods.data.length === 0) {
      throw new Error("No payment methods found for this customer");
    }
    return paymentMethods.data;
  } catch (error) {
    logger.error("[customerListPaymentMethod]", error);
    throw error;
  }
};
