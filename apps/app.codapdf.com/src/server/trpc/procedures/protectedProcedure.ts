import type { TRPCContext } from "@/server/trpc/contextTrpc";
import { initTRPC } from "@trpc/server";
const t = initTRPC.context<TRPCContext>().create();
export const protectedProcedure = t.procedure.use(async (opts) => {
  const { ctx } = opts;
  return await opts.next({
    ctx: {
      user: ctx.user,
      req: ctx.req,
    },
  });
});
