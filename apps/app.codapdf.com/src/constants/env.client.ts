import { z } from "zod";
const envSchema = z.object({
  API_URL: z.string(),
  APP_DOMAIN: z.string(),
  SITE_DOMAIN: z.string(),
  DOCS_DOMAIN: z.string(),
  STRIPE_PUBLISHABLE_KEY: z.string(),
  SUPPORT_EMAIL: z.string().email(),
});

const variables = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN,
  SITE_DOMAIN: process.env.NEXT_PUBLIC_SITE_DOMAIN,
  DOCS_DOMAIN: process.env.NEXT_PUBLIC_DOCS_DOMAIN,
  STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
} as const;

const env = envSchema.parse(variables);
export { env };
