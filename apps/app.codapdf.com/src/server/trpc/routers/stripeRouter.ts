import { db } from "@/server/database";
import { customerListPaymentMethod } from "@/server/actions/stripe/customers/customerListPaymentMethod";
import { stripe } from "@/server/actions/stripe/stripe";
import { subscriptionCancel } from "@/server/actions/stripe/subscriptions/subscriptionCancel";
import { subscriptions } from "@/server/database/schemas/subscriptions";
import { plansSubscription } from "@/server/static/plansSubscription";
import { protectedProcedure } from "@/server/trpc/procedures/protectedProcedure";
import { publicProcedure } from "@/server/trpc/procedures/publicProcedure";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { customerGetSubscription } from "@/server/actions/stripe/customers/customerGetSubscription";
import { createSubscriptionPayloadZodSchema, customerCreateSubscription } from "@/server/actions/stripe/customers/customerCreateSubscription";

export const stripeRouter = {
  getPlans: publicProcedure.query(() => plansSubscription),
  createSubscription: protectedProcedure.input(createSubscriptionPayloadZodSchema).mutation(async ({ ctx, input: { priceId, productId, paymentMethodId, frequency } }) => {
    return await customerCreateSubscription({
      user: ctx.user,
      priceId,
      productId,
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
  createPaymentIntent: protectedProcedure.input(z.object({ amount: z.number(), customerId: z.string(), paymentMethodId: z.string() })).mutation(async ({ input }) => {
    const stripeApi = stripe();
    const { customerId, paymentMethodId } = input;
    const paymentIntent = await stripeApi.paymentIntents.create({
      amount: 1000, // Example amount in cents
      currency: "usd",
      customer: customerId, // Pre-fill customer details
      payment_method: paymentMethodId, // Existing payment method
      setup_future_usage: "off_session", // Save for future payments
      // Optionally expand the PaymentMethod
      expand: ["payment_method"],
    });
    return paymentIntent?.client_secret;
  }),
  cancelSubscription: protectedProcedure.input(z.object({ subscriptionId: z.string() })).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    const subscriptionId = input.subscriptionId;
    await db
      .delete(subscriptions)
      .where(and(eq(subscriptions.userId, user.id), eq(subscriptions.subscriptionId, subscriptionId)))
      .execute();
    return await subscriptionCancel({
      subscriptionId: input.subscriptionId,
    });
  }),
};
