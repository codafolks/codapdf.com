import type { AppRouter } from "@/server/trpc/trpcServer";

import { createTRPCReact, type inferReactQueryProcedureOptions } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const trpcClient = createTRPCReact<AppRouter>({
  abortOnUnmount: true,
});
export const useTRPCClientApi = trpcClient.useUtils;
