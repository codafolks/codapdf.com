"use client";
import { AuthForgotPasswordForm } from "@/app/auth/_components/AuthForgotPasswordForm";
import { AuthLoginForm } from "@/app/auth/_components/AuthLoginForm";
import { AuthSignUpForm } from "@/app/auth/_components/AuthSignUpForm";
import { ROUTES } from "@/app/routes";
import { useForgotPassword, useLogin, useResetPassword, useSignup } from "@/client/queries/authentication";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  type AuthForgotPasswordInput,
  type AuthInput,
  type AuthLoginInput,
  type AuthResetPasswordInput,
  type AuthSignupInput,
  authForgotPasswordZodSchema,
  authLoginZodSchema,
  authResetPasswordZodSchema,
  authSignupZodSchema,
} from "@/server/schemas/authZodSchema";

import { AuthResetPasswordForm } from "@/app/auth/_components/AuthResetPasswordForm";
import { GoogleIcon } from "@/client/assets/icons/GoogleIcon";
import { useZodForm } from "@/client/utils/useZodForm";
import { useToast } from "@/components/ui/use-toast";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AuthFormFooter } from "../_components/AuthFormFooter";

type AuthFormProps = {
  type: "login" | "signup" | "forgot-password" | "reset-password";
};

const authSchemas = {
  login: authLoginZodSchema,
  signup: authSignupZodSchema,
  "forgot-password": authForgotPasswordZodSchema,
  "reset-password": authResetPasswordZodSchema,
} as Record<
  string,
  | typeof authLoginZodSchema
  | typeof authSignupZodSchema
  | typeof authForgotPasswordZodSchema
  | typeof authResetPasswordZodSchema
>;

const titleMap = {
  login: "Login",
  signup: "Sign Up",
  "forgot-password": "Forgot Password",
  "reset-password": "Reset Password",
};

const formMap = {
  login: AuthLoginForm,
  signup: AuthSignUpForm,
  "forgot-password": AuthForgotPasswordForm,
  "reset-password": AuthResetPasswordForm,
};
const AuthForm = ({ type }: AuthFormProps) => {
  const { toast } = useToast();
  const login = useLogin();
  const signup = useSignup();
  const forgotPassword = useForgotPassword();
  const resetPassword = useResetPassword();
  const router = useRouter();
  const pathname = useSearchParams();
  const token = pathname?.get("token");

  const form = useZodForm({
    schema: authSchemas[type],
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const isSubmitting = login.isPending || signup.isPending || forgotPassword.isPending || resetPassword.isPending;

  if (type === "reset-password") {
    form.setValue("token", token as string);
  }

  const submitForm = useMemo(
    () => ({
      login: async (data: AuthInput) => {
        await login.mutateAsync(data as AuthLoginInput);
        router.push(ROUTES.PRIVATE.DASHBOARD.pathname());
      },
      signup: async (data: AuthInput) => {
        await signup.mutateAsync(data as AuthSignupInput);
        router.push(ROUTES.PRIVATE.DASHBOARD.pathname());
      },
      "forgot-password": async (data: AuthInput) => {
        await forgotPassword.mutateAsync(data as AuthForgotPasswordInput);
        toast({
          title: "Email sent",
          description: "An email has been sent with instructions to reset your password",
        });
      },
      "reset-password": async (data: AuthInput) => {
        await resetPassword.mutateAsync({
          ...data,
          token,
        } as AuthResetPasswordInput);
        toast({
          title: "Password reset",
          description: "Your password has been successfully reset",
        });
        router.push(ROUTES.AUTH.LOGIN.pathname());
      },
    }),
    [forgotPassword, login, resetPassword, router, signup, toast, token],
  );

  const onSubmit = form.handleSubmit(async (data: AuthInput) => {
    try {
      setApiError(null);
      await submitForm[type](data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      setApiError(message);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="grid w-full gap-4 rounded-md border bg-background p-8 text-foreground shadow-sm"
    >
      <h2 className="font-bold text-2xl">{titleMap[type]}</h2>
      {apiError && <div className="rounded-md bg-red-100 p-2 text-center text-red-500">{apiError}</div>}
      <div className="grid gap-4">{formMap[type](form)}</div>
      {(type === "login" || type === "signup") && (
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <a href={ROUTES.AUTH.FORGOT_PASSWORD.pathname()} className="text-blue-500">
            Forgot password?
          </a>
        </div>
      )}
      {/* social button github and google */}
      {type === "login" || type === "signup" ? (
        <div className="flex justify-center gap-4">
          <Button type="button" className="w-full" variant="secondary" asChild>
            <Link href={ROUTES.PUBLIC.GITHUB.pathname()}>
              <GitHubLogoIcon className="h-6 w-6" />
              Continue with GitHub
            </Link>
          </Button>
          <Button type="button" className="w-full" variant="secondary" asChild>
            <Link href={ROUTES.PUBLIC.GOOGLE.pathname()}>
              <GoogleIcon className="h-6 w-6" />
              Continue with Google
            </Link>
          </Button>
        </div>
      ) : null}
      <Button type="submit" className="w-full" submitting={isSubmitting}>
        {type === "login" && "Login"}
        {type === "signup" && "Sign Up"}
        {type === "forgot-password" && "Forgot Password"}
        {type === "reset-password" && "Reset Password"}
      </Button>
      <AuthFormFooter type={type} />
    </form>
  );
};

export { AuthForm };
export type { AuthFormProps };
