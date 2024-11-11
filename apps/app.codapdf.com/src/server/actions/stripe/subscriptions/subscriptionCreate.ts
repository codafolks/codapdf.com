import { getCacheClient } from "@/server/actions/cache/getCacheClient";
import { stripe } from "@/server/actions/stripe/stripe";
import type { SubscriptionsFrequency } from "@/server/database/schemas/subscriptions";
import { logger } from "@/server/utils/logger";
import type Stripe from "stripe";

type SubscriptionCreate = {
  customerId: string;
  nickname: string;
  frequency: SubscriptionsFrequency;
  priceAmount: number;
  paymentMethodId?: string;
};

type GetProduct = {
  nickname: string;
  frequency: SubscriptionsFrequency;
};

type GetPrice = {
  productId: string;
  frequency: SubscriptionsFrequency;
  amount: number;
};
export const getProductCacheKey = ({ nickname, frequency }: GetProduct) => `stripe:product:${nickname}:${frequency.toLocaleLowerCase()}`;
const getProduct = async ({ nickname, frequency }: GetProduct): Promise<Stripe.Product> => {
  const cacheKey = getProductCacheKey({ nickname, frequency });
  const cache = await getCacheClient();
  const cachedProduct = await cache.get(cacheKey);
  if (cachedProduct) {
    return JSON.parse(cachedProduct);
  }

  const api = stripe();
  const { data: result } = await api.products.search({
    query: "active:'true' AND name:'" + nickname + "'",
    limit: 1,
  });
  if (result.length === 0) {
    const newProduct = await api.products.create({
      name: nickname,
    });
    await cache.set(cacheKey, JSON.stringify(newProduct));
    return newProduct;
  }
  const product = result[0];
  await cache.set(cacheKey, JSON.stringify(product));
  return product;
};

export const getPriceCacheKey = ({ productId, frequency, amount }: GetPrice) => `stripe:price:${productId}:${amount}:${frequency.toLocaleLowerCase()}`;
const getPrice = async ({ productId, frequency, amount }: GetPrice): Promise<Stripe.Price> => {
  const cacheKey = `stripe:price:${productId}:${amount}:${frequency.toLocaleLowerCase()}`;
  const cache = await getCacheClient();
  const cachedPrice = await cache.get(cacheKey);
  if (cachedPrice) {
    return JSON.parse(cachedPrice);
  }

  const api = stripe();
  const { data: result } = await api.prices.list({
    product: productId,
    active: true,
    limit: 1,
  });
  if (result.length === 0) {
    const interval = frequency === "YEARLY" ? "year" : "month";
    const newPrice = await api.prices.create({
      product: productId,
      currency: "usd",
      recurring: { interval },
      unit_amount: amount,
    });
    await cache.set(cacheKey, JSON.stringify(newPrice));
    return newPrice;
  }
  const price = result[0];
  await cache.set(cacheKey, JSON.stringify(price));
  return price;
};

type SubscriptionCreateResponse = Stripe.Subscription & {
  productId: string;
  priceId: string;
};

export const subscriptionCreate = async ({ customerId, nickname, frequency, priceAmount, paymentMethodId }: SubscriptionCreate): Promise<SubscriptionCreateResponse> => {
  try {
    const api = stripe();
    const product = await getProduct({ nickname, frequency });
    const productId = product.id;
    const price = await getPrice({ productId, frequency, amount: priceAmount });
    const priceId = price.id;

    if (paymentMethodId) {
      const subscription = await api.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"],
        off_session: true,
        default_payment_method: paymentMethodId,
      });
      return { ...subscription, productId, priceId };
    }
    const subscription = await api.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });
    return { ...subscription, productId, priceId };
  } catch (error) {
    logger.error("[subscriptionCreate]", error);
    throw error;
  }
};
