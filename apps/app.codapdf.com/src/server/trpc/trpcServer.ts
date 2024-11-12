import {
  type TRPCContext,
  type TRPCEmptyContext,
  type TRPCPublicContext,
  createTRPCEmptyContext,
} from "@/server/trpc/contextTrpc";
import { authRouter } from "@/server/trpc/routers/authRouter";
import { templateRouter } from "@/server/trpc/routers/templateRouter";
import { userRouter } from "@/server/trpc/routers/userRouter";
import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

import { apiKeyRouter } from "@/server/trpc/routers/apiKeyRouter";
import { billingRouter } from "@/server/trpc/routers/billingRouter";
import { contactFormRouter } from "@/server/trpc/routers/contactFormRouter";
import { stripeRouter } from "@/server/trpc/routers/stripeRouter";

export const trpcServer = initTRPC.context<TRPCContext | TRPCPublicContext | TRPCEmptyContext>().create({
  transformer: SuperJSON,
});

const { router } = trpcServer;
export const appRouter = router({
  users: router(userRouter),
  templates: router(templateRouter),
  auth: router(authRouter),
  billings: router(billingRouter),
  stripe: router(stripeRouter),
  contact: router(contactFormRouter),
  apiKeys: router(apiKeyRouter),
});

export type AppRouter = typeof appRouter;
export const callerFactory = trpcServer.createCallerFactory(appRouter);
export type CallerFactory = typeof callerFactory;
export const serverApi = callerFactory(createTRPCEmptyContext);
