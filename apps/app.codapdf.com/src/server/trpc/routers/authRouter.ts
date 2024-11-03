import { ROUTES } from "@/app/routes";
import { destroySession, saveSession } from "@/server/actions/auth/authSession";

import { forgotPassword } from "@/server/actions/auth/forgotPassword";
import { resetPassword } from "@/server/actions/auth/resetPassword";
import { signIn } from "@/server/actions/auth/signIn";
import { signUp } from "@/server/actions/auth/signUp";
import { sendWelcomeEmail } from "@/server/actions/emails/sendWelcomeEmail";
import {
  authForgotPasswordZodSchema,
  authLoginZodSchema,
  authResetPasswordZodSchema,
  authSignupZodSchema,
} from "@/server/schemas/authZodSchema";
import { protectedProcedure } from "@/server/trpc/procedures/protectedProcedure";
import { publicProcedure } from "@/server/trpc/procedures/publicProcedure";

export const authRouter = {
  signup: publicProcedure.input(authSignupZodSchema).mutation(async ({ input }) => {
    const user = await signUp(input);
    await saveSession(user);
    await sendWelcomeEmail({
      email: user.email,
      name: user.name,
    });
    return {
      message: "User created successfully",
    };
  }),

  login: publicProcedure.input(authLoginZodSchema).mutation(async ({ input, ctx }) => {
    const user = await signIn(input);
    await saveSession(user);
    return {
      message: "User logged in successfully",
    };
  }),
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    await destroySession();
    const req = ctx.req;
    return Response.redirect(new URL(ROUTES.AUTH.LOGIN.path, req.url));
  }),
  forgotPassword: publicProcedure.input(authForgotPasswordZodSchema).mutation(async ({ input }) => {
    return await forgotPassword(input);
  }),
  resetPassword: publicProcedure.input(authResetPasswordZodSchema).mutation(async ({ input }) => {
    return await resetPassword(input);
  }),
};
