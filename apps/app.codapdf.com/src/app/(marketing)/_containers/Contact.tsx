"use client";
import { submitContactForm } from "@/app/(marketing)/actions";
import { ComboBoxController, InputController, TextareaController } from "@/client/components/app/forms";
import { useToast } from "@/client/components/ui/use-toast";
import { useZodForm } from "@/client/utils/useZodForm";
import { Button } from "@/components/ui/button";
import { contactFormZodSchema } from "@/server/schemas/contactFormZodSchema";

export function Contact() {
  const { toast } = useToast();
  const form = useZodForm({
    schema: contactFormZodSchema,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await submitContactForm(data);
      form.reset();
      toast({
        title: "Message sent",
        description: "We will get back to you soon",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while sending the message",
        variant: "destructive",
      });
    }
  });

  return (
    <section className="w-full bg-secondary py-12 text-foreground md:py-24 lg:py-32" id="contact">
      <div className="marketing-section px-4 md:px-6">
        <div className="rounded-md border bg-background p-4 md:p-8">
          <h2 className="mb-12 text-center font-bold text-3xl tracking-tighter sm:text-5xl ">Contact Us</h2>
          <form className="space-y-4" id="contact-form" onSubmit={onSubmit}>
            <InputController control={form.control} id="name" label="Name" name="name" placeholder="John Doe" />
            <InputController
              control={form.control}
              id="email"
              label="Email"
              name="email"
              placeholder="your.email@example.com"
            />
            <ComboBoxController
              control={form.control}
              label="Department"
              id="department"
              name="department"
              options={[
                { label: "Sales", value: "sales" },
                { label: "Support", value: "support" },
                { label: "Feedback", value: "feedback" },
                { label: "Other", value: "other" },
              ]}
            />
            <TextareaController
              control={form.control}
              id="message"
              label="Message"
              name="message"
              placeholder="Your message here..."
            />
            <Button type="submit" id="submit-content" submitting={form.formState.isSubmitting}>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
