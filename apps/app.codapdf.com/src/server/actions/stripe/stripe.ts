import { env } from "@/constants/env.server";
import Stripe from "stripe";

export const stripe = () => {
  return new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-09-30.acacia",
  });
};
