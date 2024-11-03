import { trpcClient } from "@/server/trpc/trpcClient";

export const useLogin = trpcClient.auth.login.useMutation;
export const useSignup = trpcClient.auth.signup.useMutation;
export const useSignOut = trpcClient.auth.logout.useMutation;
export const useForgotPassword = trpcClient.auth.forgotPassword.useMutation;
export const useResetPassword = trpcClient.auth.resetPassword.useMutation;
