"use client";
import { useContactForm } from "@/client/queries/contact";
import { ComboBoxController, InputController, TextareaController } from "@/components/app/forms";
import { Button } from "@/components/ui/button";
import { type ContactForm, contactFormZodSchema } from "@/server/schemas/contactFormZodSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function Contact() {
  const form = useForm<ContactForm>({
    defaultValues: {
      department: "sales",
    },
    resolver: zodResolver(contactFormZodSchema),
  });

  const contactApi = useContactForm();
  const onSubmit = form.handleSubmit(async (data) => {
    await contactApi.mutateAsync(data);
    for (const key of Object.keys(data) as Array<keyof ContactForm>) {
      form.setValue(key, "");
    }
  });

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 text-foreground bg-secondary" id="contact">
      <div className="marketing-section px-4 md:px-6">
        <div className="p-4 md:p-8 border rounded-md bg-background">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 ">Contact Us</h2>
          <form className="space-y-4" onSubmit={onSubmit}>
            <InputController id="name" label="Name" name="name" control={form.control} placeholder="John Doe" />
            <InputController id="email" label="Email" name="email" control={form.control} placeholder="your.email@example.com" />
            <ComboBoxController
              id="type"
              label="Department"
              name="department"
              control={form.control}
              options={[
                { label: "Sales", value: "sales" },
                { label: "Support", value: "support" },
                { label: "Feedback", value: "feedback" },
                { label: "Other", value: "other" },
              ]}
            />

            <TextareaController id="message" label="Message" name="message" control={form.control} placeholder="Your message here..." />

            <Button type="submit" loading={contactApi.isPending}>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
