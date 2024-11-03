"use client";

import { env } from "@/constants/env.client";
import { trpcClient } from "@/server/trpc/trpcClient";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import SuperJSON from "superjson";

type TRCProviderProps = {
  children: React.ReactNode;
  token: string | null | undefined;
};

export const TRCProvider = ({ children, token }: TRCProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const [client] = useState(() =>
    trpcClient.createClient({
      links: [
        httpBatchLink({
          transformer: SuperJSON,
          url: `${env.API_URL}/trpc`,
          headers() {
            if (!token) return {};
            return {
              authorization: token ? `Bearer ${token}` : "",
            };
          },
        }),
      ],
    }),
  );

  return (
    <trpcClient.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcClient.Provider>
  );
};
