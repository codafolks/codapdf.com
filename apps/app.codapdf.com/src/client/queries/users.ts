import { trpcClient } from "@/server/trpc/trpcClient";

export const useUser = trpcClient.users.me.useQuery;
export const useUserUpdate = trpcClient.users.update.useMutation;
export const useUserLicenseUpdate = trpcClient.users.updateUserLicense.useMutation;
export const useUserLicense = trpcClient.users.getUserLicense.useQuery;
