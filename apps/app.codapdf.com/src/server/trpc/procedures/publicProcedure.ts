import type { TRPCPublicContext } from "@/server/trpc/contextTrpc";
import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

const t = initTRPC.context<TRPCPublicContext>().create({
  transformer: SuperJSON,
});

export const publicProcedure = t.procedure.use(async (opts) => {
  return await opts.next(opts);
});
