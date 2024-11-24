import { env } from "@/constants/env.server";
import type { ContactForm } from "@/server/schemas/contactFormZodSchema";

import { logger } from "@/server/utils/logger";
import { Resend } from "resend";

const departmentMap = {
  sales: "Sales",
  support: "Support",
  feedback: "Feedback",
  other: "Other",
};

export const sendContactForm = async (payload: ContactForm) => {
  try {
    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({
      from: `Client Contact <${env.CONTACT_EMAIL}>`,
      replyTo: payload.email,
      to: env.CONTACT_EMAIL,
      subject: `New Contact Form Submission - ${departmentMap[payload.department]}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\nDepartment: ${payload.department}\nMessage: ${payload.message}`,
    });
  } catch (error) {
    logger.child({ module: "sendContactForm" }).error(error);
  }
};
