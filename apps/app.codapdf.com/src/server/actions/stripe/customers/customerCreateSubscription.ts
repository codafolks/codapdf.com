import { getCacheClient } from "@/server/actions/cache/getCacheClient";
import { customerCreate } from "@/server/actions/stripe/customers/customerCreate";
import { getCustomerGetSubscriptionCacheKey } from "@/server/actions/stripe/customers/customerGetSubscription";
import { stripe } from "@/server/actions/stripe/stripe";
import { subscriptionCancel } from "@/server/actions/stripe/subscriptions/subscriptionCancel";
import { subscriptionCreate } from "@/server/actions/stripe/subscriptions/subscriptionCreate";
import type { UserDTO } from "@/server/actions/users/getUserById";
import { db } from "@/server/database";
import { productNicknameZodSchema, subscriptions, subscriptionsFrequencyZodSchema } from "@/server/database/schemas/subscriptions";
import { users } from "@/server/database/schemas/users";
import { and, desc, eq } from "drizzle-orm";
import type Stripe from "stripe";
import { z } from "zod";

export const createSubscriptionPayloadZodSchema = z.object({
  priceAmount: z.number(),
  nickname: productNicknameZodSchema,
  frequency: subscriptionsFrequencyZodSchema,
  paymentMethodId: z.string().optional(),
});

type CreateSubscriptionPayload = z.infer<typeof createSubscriptionPayloadZodSchema> & {
  user: UserDTO;
};

export const customerCreateSubscription = async ({ user, frequency, nickname, priceAmount, paymentMethodId }: CreateSubscriptionPayload) => {
  const stripeApi = stripe();
  const userId = user.id;
  let customerId = user.customerId;
  const email = user.email;
  const name = user.name;

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
    await db.update(subscriptions).set({ status: "CANCELED" }).where(eq(subscriptions.subscriptionId, lastSubscriptionId)).execute();
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
    nickname,
    priceAmount,
    frequency,
    paymentMethodId,
  });

  const productId = subscription.productId;
  const priceId = subscription.priceId;
  const newSubscriptionId = subscription.id;
  const paymentStripeIntent = (subscription.latest_invoice as Stripe.Invoice).payment_intent as Stripe.PaymentIntent;

  if (!paymentStripeIntent) {
    throw new Error("Payment intent not found");
  }
  const clientSecret = String(paymentStripeIntent.client_secret);

  // save the new subscription on the database
  await db
    .insert(subscriptions)
    .values({
      priceId,
      productId,
      priceAmount,
      productNickname: nickname,
      subscriptionId: newSubscriptionId,
      userId,
      status: "ACTIVE",
      frequency,
      clientSecret,
    })
    .execute();
  const cache = await getCacheClient();
  const key = getCustomerGetSubscriptionCacheKey({ user });
  cache.del(key);
  return {
    customerId,
    subscriptionId: newSubscriptionId,
    clientSecret,
  };
};
