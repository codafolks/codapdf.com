import { env } from "@/constants/env.server";
import WelcomeEmail from "@/emails/auth/Welcome";
import { logger } from "@/server/utils/logger";
import { Resend } from "resend";

type SendWelcomeEmail = {
  email: string;
  name: string;
};
export const sendWelcomeEmail = async ({ email, name }: SendWelcomeEmail) => {
  try {
    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({
      from: `CodaPDF <${env.CONTACT_EMAIL}>`,
      to: [email],
      subject: "Welcome to <CodaPDF  />",
      react: WelcomeEmail({ name }),
    });
  } catch (error) {
    logger.child({ module: "sendWelcomeEmail" }).error(error);
  }
};
