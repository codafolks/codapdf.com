import { trpcClient } from "@/server/trpc/trpcClient";

export const useBillingPaymentMethodRemove = trpcClient.billings.removePaymentMethod.useMutation;
