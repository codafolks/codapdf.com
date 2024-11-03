import { trpcClient } from "@/server/trpc/trpcClient";

export const useContactForm = trpcClient.contact.submit.useMutation;
