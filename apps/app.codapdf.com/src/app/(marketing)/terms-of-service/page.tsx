import { Mail } from "lucide-react";
export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12">
        <h1 className="mb-12 text-center font-bold text-4xl">Terms of Service</h1>

        <section className="space-y-6">
          <h2 className="font-semibold text-2xl">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using CodaPDF ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the
            service.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="font-semibold text-2xl">2. Description of Service</h2>
          <p className="text-muted-foreground leading-relaxed">
            CodaPDF provides a platform to convert HTML templates into PDFs using REST API. We offer various subscription plans: Hobby, Basic, Pro, and Enterprise.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-2xl">3. User Accounts</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium">Registration:</h3>
              <p className="text-muted-foreground">You must provide accurate and complete information when creating an account.</p>
            </div>
            <div>
              <h3 className="mb-2 font-medium">Account Security:</h3>
              <p className="text-muted-foreground">You are responsible for safeguarding your account and any activities under your account.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-2xl">4. Subscription Plans and Payment</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium">Plans:</h3>
              <p className="text-muted-foreground">Details of each plan, including features and limitations, are available on our website.</p>
            </div>
            <div>
              <h3 className="mb-2 font-medium">Billing:</h3>
              <p className="text-muted-foreground">Subscriptions are billed on a recurring basis as per the selected plan.</p>
            </div>
            <div>
              <h3 className="mb-2 font-medium">Cancellation:</h3>
              <p className="text-muted-foreground">You may cancel your subscription at any time. Refund policies are outlined in our Refund Policy.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-2xl">5. Acceptable Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium">Compliance:</h3>
              <p className="text-muted-foreground">You agree to use the service in compliance with all applicable laws and regulations.</p>
            </div>
            <div>
              <h3 className="mb-2 font-medium">Prohibited Activities:</h3>
              <p className="text-muted-foreground">You may not misuse the service by transmitting viruses, spam, or engaging in any harmful activities.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-2xl">6. Intellectual Property</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium">Ownership:</h3>
              <p className="text-muted-foreground">All content, features, and functionality are and will remain the exclusive property of CodaPDF.</p>
            </div>
            <div>
              <h3 className="mb-2 font-medium">License:</h3>
              <p className="text-muted-foreground">We grant you a limited, non-exclusive license to access and use the service.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-2xl">7. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may terminate or suspend your account immediately, without prior notice, for any reason, including violation of these Terms.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-2xl">8. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            In no event shall CodaPDF be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access or use of the service.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-2xl">9. Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">The service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.</p>
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-2xl">10. Indemnification</h2>
          <p className="text-muted-foreground leading-relaxed">
            You agree to defend, indemnify, and hold harmless CodaPDF from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use
            of the service.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-2xl">11. Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed">
            These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-2xl">12. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-2xl">13. Contact Us</h2>
          <p className="text-muted-foreground">If you have any questions about these Terms, please contact us at:</p>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Mail className="h-5 w-5" />
            <span>support@codapdf.com</span>
          </div>
        </section>

        <footer className="mt-16 border-border border-t pt-8">
          <p className="text-center text-muted-foreground text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        </footer>
      </div>
    </div>
  );
}
