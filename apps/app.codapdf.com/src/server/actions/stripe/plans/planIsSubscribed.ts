import { and, eq } from "drizzle-orm";
import { db } from "../../../database";

import { subscriptionRetrieve } from "@/server/actions/stripe/subscriptions/subscriptionRetrieve";
import { subscriptions } from "@/server/database/schemas/subscriptions";
import { logger } from "@/server/utils/logger";

type PlanIsSubscribed = {
  userId: number;
  productId: string;
  priceId: string;
};
export const planIsSubscribed = async ({ userId, productId, priceId }: PlanIsSubscribed) => {
  try {
    const subscriptionData = await db.query.subscriptions.findFirst({
      where: and(eq(subscriptions.userId, userId), eq(subscriptions.productId, productId), eq(subscriptions.priceId, priceId), eq(subscriptions.status, "ACTIVE")),
    });
    if (!subscriptionData) return false;
    const subscriptionId = subscriptionData?.subscriptionId;
    const subscription = await subscriptionRetrieve({ subscriptionId });
    if (subscription.status !== "active") {
      return false;
    }
    return !!subscription;
  } catch (error) {
    logger.error("[planIsSubscribed]", error);
    throw error;
  }
};
