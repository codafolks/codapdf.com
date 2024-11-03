import { env } from "@/constants/env.server";
import { generateResetPasswordJwt } from "@/server/actions/auth/generateJwt";
import { sendResetPasswordLink } from "@/server/actions/emails/sendResetPassowordLink";
import { db } from "@/server/database";
import { users } from "@/server/database/schemas/users";
import type { AuthForgotPasswordInput } from "@/server/schemas/authZodSchema";
import { eq } from "drizzle-orm";

export const forgotPassword = async (payload: AuthForgotPasswordInput) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, payload.email),
  });
  if (!user) {
    throw new Error("User not found");
  }
  const token = await generateResetPasswordJwt(payload.email);
  await sendResetPasswordLink({
    name: user.name,
    email: user.email,
    resetPasswordLink: `${env.APP_DOMAIN}/auth/reset-password?token=${token}`,
  });
  return {
    message: "Reset password link sent successfully",
  };
};
