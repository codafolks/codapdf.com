import { type ReactQueryOptions, type RouterInputs, trpcClient } from "@/server/trpc/trpcClient";

export const useApiKeysCreate = trpcClient.apiKeys.create.useMutation;

type UseApiKeysOptions = ReactQueryOptions["apiKeys"]["list"];
type UseApiKeysInput = RouterInputs["apiKeys"]["list"];
export const useApiKeys = (input?: UseApiKeysInput, options?: UseApiKeysOptions) => {
  const { data, ...rest } = trpcClient.apiKeys.list.useQuery(input, options);
  return {
    data: data?.data,
    ...rest,
  };
};
