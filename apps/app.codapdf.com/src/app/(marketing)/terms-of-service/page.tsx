import { Mail } from "lucide-react";
export const fetchCache = "force-cache";
export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-12">Terms of Service</h1>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using CodaPDF ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the
            service.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">2. Description of Service</h2>
          <p className="text-muted-foreground leading-relaxed">
            CodaPDF provides a platform to convert HTML templates into PDFs using REST API. We offer various subscription plans: Hobby, Basic, Pro, and Enterprise.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">3. User Accounts</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Registration:</h3>
              <p className="text-muted-foreground">You must provide accurate and complete information when creating an account.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Account Security:</h3>
              <p className="text-muted-foreground">You are responsible for safeguarding your account and any activities under your account.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">4. Subscription Plans and Payment</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Plans:</h3>
              <p className="text-muted-foreground">Details of each plan, including features and limitations, are available on our website.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Billing:</h3>
              <p className="text-muted-foreground">Subscriptions are billed on a recurring basis as per the selected plan.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Cancellation:</h3>
              <p className="text-muted-foreground">You may cancel your subscription at any time. Refund policies are outlined in our Refund Policy.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">5. Acceptable Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Compliance:</h3>
              <p className="text-muted-foreground">You agree to use the service in compliance with all applicable laws and regulations.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Prohibited Activities:</h3>
              <p className="text-muted-foreground">You may not misuse the service by transmitting viruses, spam, or engaging in any harmful activities.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">6. Intellectual Property</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Ownership:</h3>
              <p className="text-muted-foreground">All content, features, and functionality are and will remain the exclusive property of CodaPDF.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">License:</h3>
              <p className="text-muted-foreground">We grant you a limited, non-exclusive license to access and use the service.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">7. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may terminate or suspend your account immediately, without prior notice, for any reason, including violation of these Terms.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">8. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            In no event shall CodaPDF be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access or use of the service.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">9. Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">The service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">10. Indemnification</h2>
          <p className="text-muted-foreground leading-relaxed">
            You agree to defend, indemnify, and hold harmless CodaPDF from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use
            of the service.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">11. Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed">
            These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">12. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">13. Contact Us</h2>
          <p className="text-muted-foreground">If you have any questions about these Terms, please contact us at:</p>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Mail className="h-5 w-5" />
            <span>support@codapdf.com</span>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </footer>
      </div>
    </div>
  );
}
