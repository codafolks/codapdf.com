import { env } from "@/constants/env.server";
import ResetPassword from "@/emails/auth/ResetPassword";
import { logger } from "@/server/utils/logger";
import { Resend } from "resend";

type SendResetPasswordLink = {
  email: string;
  name: string;
  resetPasswordLink: string;
};
export const sendResetPasswordLink = async ({ email, name, resetPasswordLink }: SendResetPasswordLink) => {
  try {
    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({
      from: `CodaPDF <${env.CONTACT_EMAIL}>`,
      to: [email],
      subject: "Reset Password <CodaPDF  />",
      react: ResetPassword({ name, resetPasswordLink }),
    });
  } catch (error) {
    logger.child({ module: "sendResetPasswordLink" }).error(error);
  }
};
