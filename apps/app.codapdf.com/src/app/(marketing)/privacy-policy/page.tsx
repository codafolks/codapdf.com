import { Mail } from "lucide-react";
export const fetchCache = "force-cache";
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-12">Privacy Policy</h1>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Welcome to CodaPDF ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we
            collect, use, and safeguard your information when you visit our website https://dev.codapdf.com and use our services.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Personal Information:</h3>
              <p className="text-muted-foreground">Name, email address, and any other information you provide when registering for an account or subscribing to a plan.</p>
              <p className="text-muted-foreground mt-2 italic">Note: We do not collect your address information.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Billing Information:</h3>
              <p className="text-muted-foreground">
                All billing information is collected and processed by our third-party payment processor, Stripe. CodaPDF does not store or have access to your billing information.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Usage Data:</h3>
              <p className="text-muted-foreground">IP address, browser type, pages visited, time and date of visit, and other diagnostic data.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Cookies and Tracking Technologies:</h3>
              <p className="text-muted-foreground">We use cookies and similar tracking technologies to track activity on our service and hold certain information.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>To provide and maintain our service.</li>
            <li>To manage your account and subscriptions.</li>
            <li>To communicate with you about updates, offers, and promotions.</li>
            <li>To monitor and analyze usage and trends to improve user experience.</li>
            <li>To detect, prevent, and address technical issues.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">4. Disclosure of Your Information</h2>
          <p className="text-muted-foreground mb-4">We may share your information with third parties only in the following situations:</p>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Service Providers:</h3>
              <p className="text-muted-foreground">To assist us in providing and improving our service, such as Stripe for payment processing.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Legal Requirements:</h3>
              <p className="text-muted-foreground">If required to do so by law or in response to valid requests by public authorities.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Business Transfers:</h3>
              <p className="text-muted-foreground">In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">5. Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Billing information is
            securely processed by Stripe, and we rely on their security protocols to protect your billing data. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">6. Your Rights</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Access and Update:</h3>
              <p className="text-muted-foreground">You have the right to access and update your personal information.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Opt-Out:</h3>
              <p className="text-muted-foreground">You can opt-out of receiving marketing communications from us.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Data Deletion:</h3>
              <p className="text-muted-foreground">You can request the deletion of your personal data, subject to certain exceptions.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">7. Third-Party Links</h2>
          <p className="text-muted-foreground">
            Our service may contain links to other websites that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or
            practices of any third-party sites.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">8. Children's Privacy</h2>
          <p className="text-muted-foreground">Our service does not address anyone under the age of 13. We do not knowingly collect personal information from children under 13.</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">9. Changes to This Privacy Policy</h2>
          <p className="text-muted-foreground">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">10. Contact Us</h2>
          <p className="text-muted-foreground">If you have any questions about this Privacy Policy, please contact us at:</p>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Mail className="h-5 w-5" />
            <span>support@codapdf.com</span>
          </div>
        </section>
      </div>
    </div>
  );
}
