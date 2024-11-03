import { logger } from "@/server/utils/logger";
import { stripe } from "../stripe";

type CustomerCreate = {
  email: string;
  name: string;
};

export const customerCreate = async ({ name, email }: CustomerCreate) => {
  try {
    const api = stripe();
    return await api.customers.create({
      email,
      name,
      metadata: {
        fullName: name,
        email,
      },
    });
  } catch (error) {
    logger.error("[customerCreate]", error);
    throw error;
  }
};
