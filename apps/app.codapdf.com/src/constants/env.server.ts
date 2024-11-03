import "server-only";
import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());
import { z } from "zod";

const productSchema = z.object({
  price: z.coerce.number(),
  priceYearly: z.coerce.number(),
  productId: z.string(),
  priceIdMonthly: z.string(),
  priceIdYearly: z.string(),
});

const envSchema = z.object({
  JWT_SECRET: z.string(),
  APP_DOMAIN: z.string().url(),
  DATABASE_URL: z.string().url(),
  STORAGE_REGION: z.string(),
  STORAGE_ENDPOINT: z.string().url(),
  STORAGE_ACCESS_KEY_ID: z.string(),
  STORAGE_SECRET_ACCESS_KEY: z.string(),
  STORAGE_BUCKET_NAME: z.string(),
  STORAGE_URL_DOMAIN: z.string().url(),
  STRIPE_SECRET_KEY: z.string(),
  RESEND_API_KEY: z.string(),
  CONTACT_EMAIL: z.string(),
  SERVICES_DOMAIN: z.string().url(),
  REDIS_URL: z.string(),
  STRIPE_PRODUCT_IDS: z.object({
    hobby: productSchema,
    basic: productSchema,
    pro: productSchema,
  }),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GITHUB_REDIRECT_URI: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URI: z.string().url(),
});

const variables = {
  DATABASE_URL: process.env.DATABASE_URL,
  APP_DOMAIN: process.env.APP_DOMAIN,
  JWT_SECRET: process.env.JWT_SECRET,
  STORAGE_REGION: process.env.STORAGE_REGION,
  STORAGE_ENDPOINT: process.env.STORAGE_ENDPOINT,
  STORAGE_ACCESS_KEY_ID: process.env.STORAGE_ACCESS_KEY_ID,
  STORAGE_SECRET_ACCESS_KEY: process.env.STORAGE_SECRET_ACCESS_KEY,
  STORAGE_BUCKET_NAME: process.env.STORAGE_BUCKET_NAME,
  STORAGE_URL_DOMAIN: process.env.STORAGE_URL_DOMAIN,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  SERVICES_DOMAIN: process.env.SERVICES_DOMAIN,
  REDIS_URL: process.env.REDIS_URL,
  STRIPE_PRODUCT_IDS: {
    hobby: {
      price: process.env.STRIPE_HOBBY_PRICE,
      priceYearly: process.env.STRIPE_HOBBY_PRICE_YEARLY,
      productId: process.env.STRIPE_HOBBY_PRODUCT_ID,
      priceIdMonthly: process.env.STRIPE_HOBBY_PRICE_ID_MONTHLY,
      priceIdYearly: process.env.STRIPE_HOBBY_PRICE_ID_YEARLY,
    },
    basic: {
      price: process.env.STRIPE_BASIC_PRICE,
      priceYearly: process.env.STRIPE_BASIC_PRICE_YEARLY,
      productId: process.env.STRIPE_BASIC_PRODUCT_ID,
      priceIdMonthly: process.env.STRIPE_BASIC_PRICE_ID_MONTHLY,
      priceIdYearly: process.env.STRIPE_BASIC_PRICE_ID_YEARLY,
    },
    pro: {
      price: process.env.STRIPE_PRO_PRICE,
      priceYearly: process.env.STRIPE_PRO_PRICE_YEARLY,
      productId: process.env.STRIPE_PRO_PRODUCT_ID,
      priceIdMonthly: process.env.STRIPE_PRO_PRICE_ID_MONTHLY,
      priceIdYearly: process.env.STRIPE_PRO_PRICE_ID_YEARLY,
    },
  },
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI: process.env.GITHUB_REDIRECT_URI,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
} as const;

const env = envSchema.parse(variables);
export { env };
