import { getCacheClient } from "@/server/actions/cache/getCacheClient";
import { subscriptionRetrieve } from "@/server/actions/stripe/subscriptions/subscriptionRetrieve";
import type { UserDTO } from "@/server/actions/users/getUserById";
import { db } from "@/server/database";
import { subscriptions } from "@/server/database/schemas/subscriptions";
import { plansSubscription, type PlanSubscription } from "@/server/static/plansSubscription";
import { and, desc, eq } from "drizzle-orm";

type CustomerGetSubscription = {
  user: UserDTO;
};

export const customerGetSubscription = async ({ user }: CustomerGetSubscription) => {
  const client = await getCacheClient();
  const cacheKey = `get_subscription:${user.id}`;
  const cachedData = await client.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const customerId = user.customerId;

  const lastActiveSubscription = await db.query.subscriptions.findFirst({
    where: and(eq(subscriptions.userId, user.id), eq(subscriptions.status, "ACTIVE")),
    orderBy: desc(subscriptions.createdAt),
  });

  if (!lastActiveSubscription) return undefined;
  const subscriptionId = lastActiveSubscription.subscriptionId;
  const subscription = await subscriptionRetrieve({ subscriptionId });
  if (subscription.status !== "active") {
    return undefined;
  }

  const filterPlan = (p: PlanSubscription) => {
    const priceId = p.priceId;
    return priceId?.monthly === lastActiveSubscription.priceId || priceId?.yearly === lastActiveSubscription.priceId;
  };

  const plan = plansSubscription.find(filterPlan);
  const nickname = plan?.nickname;
  const response = {
    subscriptionId: subscription.id,
    productId: lastActiveSubscription.productId,
    priceId: lastActiveSubscription.priceId,
    customerId,
    nickname,
    status: lastActiveSubscription.status,
  };
  client.set(cacheKey, JSON.stringify(response));
  return response;
};
