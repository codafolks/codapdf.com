import { db } from "@/server/database";
import type Stripe from "stripe";

import { customerCreate } from "@/server/actions/stripe/customers/customerCreate";
import { customerListPaymentMethod } from "@/server/actions/stripe/customers/customerListPaymentMethod";
import { planIsSubscribed } from "@/server/actions/stripe/plans/planIsSubscribed";
import { stripe } from "@/server/actions/stripe/stripe";
import { subscriptionCancel } from "@/server/actions/stripe/subscriptions/subscriptionCancel";
import { subscriptionCreate } from "@/server/actions/stripe/subscriptions/subscriptionCreate";
import { subscriptionRetrieve } from "@/server/actions/stripe/subscriptions/subscriptionRetrieve";
import { subscriptions, subscriptionsFrequencyZodSchema } from "@/server/database/schemas/subscriptions";
import { users } from "@/server/database/schemas/users";
import { PlanSubscription, plansSubscription } from "@/server/static/plansSubscription";
import { protectedProcedure } from "@/server/trpc/procedures/protectedProcedure";
import { publicProcedure } from "@/server/trpc/procedures/publicProcedure";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";

const createSubscriptionPayloadZodSchema = z.object({
  priceId: z.string(),
  productId: z.string(),
  frequency: subscriptionsFrequencyZodSchema,
  paymentMethodId: z.string().optional(),
});

export const stripeRouter = {
  getPlans: publicProcedure.query(() => plansSubscription),
  createSubscription: protectedProcedure
    .input(createSubscriptionPayloadZodSchema)
    .mutation(async ({ ctx, input: { priceId, productId, paymentMethodId, frequency } }) => {
      const stripeApi = stripe();
      const user = ctx.user;
      const userId = user.id;
      let customerId = user.customerId;
      const email = user.email;
      const name = user.name;
      const isSamePlan = await planIsSubscribed({
        userId,
        productId,
        priceId,
      });

      if (isSamePlan) {
        throw new Error("You already have a subscription to this plan");
      }

      // Create customer if not exists
      if (!customerId) {
        const customer = await customerCreate({
          email,
          name,
        });
        customerId = customer.id;
        await db.update(users).set({ customerId }).where(eq(users.id, userId)).execute();
      }

      const lastSubscription = await db.query.subscriptions.findFirst({
        where: and(eq(subscriptions.userId, userId), eq(subscriptions.status, "ACTIVE")),
        orderBy: desc(subscriptions.createdAt),
      });

      const lastSubscriptionId = lastSubscription?.subscriptionId;

      // Cancel the last subscription if exists and update the status
      if (lastSubscriptionId) {
        //cancel on stripe
        await subscriptionCancel({
          subscriptionId: lastSubscription.subscriptionId,
        });

        //update status
        await db
          .update(subscriptions)
          .set({ status: "CANCELED" })
          .where(eq(subscriptions.subscriptionId, lastSubscriptionId))
          .execute();
      }
      // Attach the payment method to the customer
      if (paymentMethodId) {
        await stripeApi.paymentMethods.attach(paymentMethodId, {
          customer: customerId,
        });
        // Update the customer's default invoice settings
        await stripeApi.customers.update(customerId, {
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });
      }
      // Create a new subscription on stripe
      const subscription = await subscriptionCreate({
        customerId,
        priceId,
        paymentMethodId,
      });

      const newSubscriptionId = subscription.id;
      const paymentStripeIntent = (subscription.latest_invoice as Stripe.Invoice)
        .payment_intent as Stripe.PaymentIntent;

      if (!paymentStripeIntent) {
        throw new Error("Payment intent not found");
      }
      const clientSecret = String(paymentStripeIntent.client_secret);
      console.info("Creating subscription for user", userId, customerId, clientSecret, newSubscriptionId);
      // save the new subscription on the database
      await db
        .insert(subscriptions)
        .values({
          priceId,
          productId,
          subscriptionId: newSubscriptionId,
          userId,
          status: "ACTIVE",
          frequency,
          clientSecret,
        })
        .execute();

      return {
        customerId,
        subscriptionId: newSubscriptionId,
        clientSecret,
      };
    }),
  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    const customerId = user.customerId;
    if (!customerId) {
      return undefined;
    }
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

    return {
      subscriptionId: subscription.id,
      productId: lastActiveSubscription.productId,
      priceId: lastActiveSubscription.priceId,
      customerId,
      nickname,
      status: lastActiveSubscription.status,
    };
  }),
  getPaymentMethods: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    const customerId = user.customerId;
    if (!customerId) return [];
    return await customerListPaymentMethod({
      customerId,
    });
  }),
  createPaymentIntent: protectedProcedure
    .input(z.object({ amount: z.number(), customerId: z.string(), paymentMethodId: z.string() }))
    .mutation(async ({ input }) => {
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
  cancelSubscription: protectedProcedure
    .input(z.object({ subscriptionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
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
