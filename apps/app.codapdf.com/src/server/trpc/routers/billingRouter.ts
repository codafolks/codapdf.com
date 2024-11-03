import { customerRemovePaymentMethod } from "@/server/actions/stripe/customers/customerRemovePaymentMethod";
import { publicProcedure } from "@/server/trpc/procedures/publicProcedure";
import { z } from "zod";

export const billingRouter = {
  removePaymentMethod: publicProcedure
    .input(
      z.object({
        customerId: z.string(),
        paymentMethodId: z.string(),
      }),
    )
    .mutation(({ input }) => customerRemovePaymentMethod(input)),
};
