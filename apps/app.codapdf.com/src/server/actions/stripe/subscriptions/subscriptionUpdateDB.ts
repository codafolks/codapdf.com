import { eq } from "drizzle-orm";

import { db } from "@/server/database";
import { type SubscriptionPayload, subscriptions } from "@/server/database/schemas/subscriptions";
import { logger } from "@/server/utils/logger";

type SubscriptionUpdatePaymentIntent = SubscriptionPayload;

export const subscriptionUpdateDB = async (payload: SubscriptionUpdatePaymentIntent) => {
  try {
    const userId = payload.userId as number;
    const lastPaymentMethod = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, userId),
    });

    let lastPaymentMethodId: number | undefined;
    if (!lastPaymentMethod) {
      const [lastPayment] = await db.insert(subscriptions).values(payload).returning({
        id: subscriptions.id,
      });
      lastPaymentMethodId = lastPayment.id;
    } else {
      const lastPayment = await db
        .update(subscriptions)
        .set(payload)
        .where(eq(subscriptions.id, lastPaymentMethod.id))
        .returning({
          id: subscriptions.id,
        });
      lastPaymentMethodId = lastPayment[0].id;
    }
    return lastPaymentMethodId;
  } catch (error) {
    logger.error("[subscriptionUpdatePaymentIntent]", error);
    throw error;
  }
};
