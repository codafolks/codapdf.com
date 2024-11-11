import { getCacheClient } from "@/server/actions/cache/getCacheClient";
import type { UserDTO } from "@/server/actions/users/getUserById";
import { db } from "@/server/database";
import { type ProductNickname, subscriptions, type SubscriptionsFrequency } from "@/server/database/schemas/subscriptions";
import { plansSubscription, type PlanSubscription } from "@/server/static/plansSubscription";
import { and, desc, eq } from "drizzle-orm";

type CustomerGetSubscription = {
  user: UserDTO;
};

type CustomerGetSubscriptionResponse = {
  id: number;
  subscriptionId: string;
  productId: string;
  priceId: string;
  customerId: string;
  nickname: ProductNickname;
  activePlan: PlanSubscription;
  status: "ACTIVE" | "PENDING" | "CANCELED";
  frequency: SubscriptionsFrequency;
};
export const getCustomerGetSubscriptionCacheKey = ({ user }: CustomerGetSubscription) => `get:subscription:${user.id}`;
export const customerGetSubscription = async ({ user }: CustomerGetSubscription): Promise<CustomerGetSubscriptionResponse | undefined> => {
  const client = await getCacheClient();
  const cacheKey = getCustomerGetSubscriptionCacheKey({ user });
  const cachedData = await client.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData) as CustomerGetSubscriptionResponse;
  }

  const customerId = user.customerId;
  if (!customerId) return undefined;
  const lastActiveSubscription = await db.query.subscriptions.findFirst({
    where: and(eq(subscriptions.userId, user.id), eq(subscriptions.status, "ACTIVE")),
    orderBy: desc(subscriptions.createdAt),
  });

  if (!lastActiveSubscription) return undefined;
  const plan = plansSubscription.find((p) => lastActiveSubscription.productNickname === p.nickname);
  if (!plan) return undefined;

  const response = {
    id: lastActiveSubscription.id,
    subscriptionId: lastActiveSubscription.subscriptionId,
    productId: lastActiveSubscription.productId,
    priceId: lastActiveSubscription.priceId,
    customerId,
    nickname: lastActiveSubscription.productNickname,
    activePlan: plan,
    frequency: lastActiveSubscription.frequency,
    status: lastActiveSubscription.status,
  };
  client.set(cacheKey, JSON.stringify(response));
  return response;
};
