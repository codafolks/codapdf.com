import { z } from "zod";

export const contactFormZodSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  department: z.enum(["sales", "support", "feedback", "other"]),
});

export type ContactForm = z.infer<typeof contactFormZodSchema>;
