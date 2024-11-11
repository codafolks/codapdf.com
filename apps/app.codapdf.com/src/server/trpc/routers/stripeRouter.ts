import { db } from "@/server/database";
import { customerListPaymentMethod } from "@/server/actions/stripe/customers/customerListPaymentMethod";
import { subscriptionCancel } from "@/server/actions/stripe/subscriptions/subscriptionCancel";
import { subscriptions } from "@/server/database/schemas/subscriptions";
import { plansSubscription } from "@/server/static/plansSubscription";
import { protectedProcedure } from "@/server/trpc/procedures/protectedProcedure";
import { publicProcedure } from "@/server/trpc/procedures/publicProcedure";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { customerGetSubscription, getCustomerGetSubscriptionCacheKey } from "@/server/actions/stripe/customers/customerGetSubscription";
import { createSubscriptionPayloadZodSchema, customerCreateSubscription } from "@/server/actions/stripe/customers/customerCreateSubscription";
import { getCacheClient } from "@/server/actions/cache/getCacheClient";
import { profiles } from "@/server/database/schemas/users";

export const stripeRouter = {
  getPlans: publicProcedure.query(() => plansSubscription),
  createSubscription: protectedProcedure.input(createSubscriptionPayloadZodSchema).mutation(async ({ ctx, input }) => {
    const { priceAmount, frequency, paymentMethodId, nickname } = input;
    return await customerCreateSubscription({
      user: ctx.user,
      priceAmount,
      nickname,
      frequency,
      paymentMethodId,
    });
  }),
  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    return await customerGetSubscription({
      user: ctx.user,
    });
  }),
  getPaymentMethods: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    const customerId = user.customerId;
    if (!customerId) return [];
    return await customerListPaymentMethod({
      customerId,
    });
  }),
  cancelSubscription: protectedProcedure.input(z.object({ subscriptionId: z.string() })).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    const subscriptionId = input.subscriptionId;
    await db.transaction(async (trx) => {
      await trx
        .delete(subscriptions)
        .where(and(eq(subscriptions.userId, user.id), eq(subscriptions.subscriptionId, subscriptionId)))
        .execute();

      // TODO: set date to end the canceled subscription
      await trx.update(profiles).set({ license: null }).where(eq(profiles.userId, user.id)).execute();
    });
    const cacheKey = getCustomerGetSubscriptionCacheKey({ user });
    const client = await getCacheClient();
    await client.del(cacheKey);
    return await subscriptionCancel({
      subscriptionId: input.subscriptionId,
    });
  }),
};
