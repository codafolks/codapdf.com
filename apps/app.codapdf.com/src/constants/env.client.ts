import { z } from "zod";
const envSchema = z.object({
  API_URL: z.string(),
  APP_DOMAIN: z.string(),
  STRIPE_PUBLISHABLE_KEY: z.string(),
});

const variables = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN,
  STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
} as const;

const env = envSchema.parse(variables);
export { env };
