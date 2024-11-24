import "server-only";
import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());
import { z } from "zod";

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
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GITHUB_REDIRECT_URI: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URI: z.string().url(),
  ANALYTICS_ID: z.string().optional(),
  GOOGLE_ANALYTICS_ID: z.string().optional(),
  SITE_DOMAIN: z.string().url(),
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
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI: process.env.GITHUB_REDIRECT_URI,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  ANALYTICS_ID: process.env.ANALYTICS_ID,
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  SITE_DOMAIN: process.env.SITE_DOMAIN,
} as const;

const env = envSchema.parse(variables);
export { env };
