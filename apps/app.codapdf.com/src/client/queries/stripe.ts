import { type RouterOutputs, trpcClient } from "@/server/trpc/trpcClient";

export type StripePlan = RouterOutputs["stripe"]["getPlans"][number];
export type StripePaymentMethod = RouterOutputs["stripe"]["getPaymentMethods"][number];

export const useStripeSubscriptionPlans = trpcClient.stripe.getPlans.useQuery;
export const useStripeSubscriptionCreate = trpcClient.stripe.createSubscription.useMutation;
export const useStripeSubscriptionCancel = trpcClient.stripe.cancelSubscription.useMutation;
export const useStripeSubscription = trpcClient.stripe.getSubscription.useQuery;
export const useStripePaymentMethods = trpcClient.stripe.getPaymentMethods.useQuery;
export const useStripePaymentIntentCreate = trpcClient.stripe.createPaymentIntent.useMutation;
