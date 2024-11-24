import { sendContactForm } from "@/server/actions/emails/sendContactForm";
import { contactFormZodSchema } from "@/server/schemas/contactFormZodSchema";
import { publicProcedure } from "@/server/trpc/procedures/publicProcedure";

export const contactFormRouter = {
  submit: publicProcedure.input(contactFormZodSchema).mutation(async ({ input }) => {
    await sendContactForm(input);
    return { success: true, message: "Message sent" };
  }),
};
