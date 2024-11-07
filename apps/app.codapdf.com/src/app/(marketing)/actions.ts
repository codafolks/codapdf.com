"use server";
import type { ContactForm } from "@/server/schemas/contactFormZodSchema";
import { serverApi } from "@/server/trpc/trpcServer";
export async function submitContactForm(payload: ContactForm) {
  await serverApi.contact.submit(payload);
}
