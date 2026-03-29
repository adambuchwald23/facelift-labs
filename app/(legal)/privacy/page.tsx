import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Facelift Labs — how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-foreground-muted">Last updated: March 2026</p>

      <div className="mt-10 space-y-8 text-[0.9375rem] leading-relaxed text-foreground-muted">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Introduction</h2>
          <p>
            Facelift Labs (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to
            protecting your personal data. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website or use our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Information We Collect</h2>
          <p>We may collect information that you provide directly to us, including:</p>
          <ul className="ml-5 mt-2 list-disc space-y-1">
            <li>Name, email address, and phone number when you submit a contact form</li>
            <li>Information about your project or business needs</li>
            <li>Any other information you choose to provide</li>
          </ul>
          <p className="mt-3">We may also automatically collect:</p>
          <ul className="ml-5 mt-2 list-disc space-y-1">
            <li>Device and browser information</li>
            <li>IP address and approximate location</li>
            <li>Pages visited, time spent, and navigation patterns</li>
            <li>Referring website or source</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="ml-5 mt-2 list-disc space-y-1">
            <li>Respond to your inquiries and provide our services</li>
            <li>Improve our website and user experience</li>
            <li>Send you updates or marketing communications (with your consent)</li>
            <li>Analyze website usage and performance</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Sharing Your Information</h2>
          <p>
            We do not sell your personal information. We may share your data with trusted
            third-party service providers who assist us in operating our website, conducting our
            business, or serving you — provided they agree to keep this information confidential.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience. See our{" "}
            <a href="/cookies" className="text-accent underline underline-offset-2 hover:text-foreground">
              Cookie Policy
            </a>{" "}
            for more details.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no
            method of transmission over the internet is 100% secure, and we cannot guarantee
            absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul className="ml-5 mt-2 list-disc space-y-1">
            <li>Access, correct, or delete your personal data</li>
            <li>Opt out of marketing communications</li>
            <li>Request a copy of data we hold about you</li>
            <li>Withdraw consent where applicable</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at{" "}
            <a href="mailto:hello@faceliftlabs.com" className="text-accent underline underline-offset-2 hover:text-foreground">
              hello@faceliftlabs.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
