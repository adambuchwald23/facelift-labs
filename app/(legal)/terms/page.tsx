import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Facelift Labs — the rules and conditions for using our services.",
};

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-foreground-muted">Last updated: March 2026</p>

      <div className="mt-10 space-y-8 text-[0.9375rem] leading-relaxed text-foreground-muted">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Facelift Labs website and services, you agree to be bound by
            these Terms of Service. If you do not agree, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Services</h2>
          <p>
            Facelift Labs provides web design, web development, UX/UI design, SEO optimization,
            and related digital services. The specific scope, deliverables, and timeline for each
            project will be outlined in a separate agreement or proposal.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Intellectual Property</h2>
          <p>
            All content on this website — including text, graphics, logos, and code — is the
            property of Facelift Labs unless otherwise stated. Upon full payment, clients receive
            ownership of custom deliverables as outlined in their project agreement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Client Responsibilities</h2>
          <p>Clients agree to:</p>
          <ul className="ml-5 mt-2 list-disc space-y-1">
            <li>Provide accurate information and timely feedback</li>
            <li>Ensure they have rights to any content they provide</li>
            <li>Make payments according to the agreed-upon schedule</li>
            <li>Review and approve deliverables within reasonable timeframes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Payment Terms</h2>
          <p>
            Payment terms, including deposits, milestones, and final payments, will be outlined in
            each project proposal. Late payments may result in project delays or suspension of
            services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Limitation of Liability</h2>
          <p>
            Facelift Labs shall not be liable for any indirect, incidental, special, or
            consequential damages arising from the use of our services. Our total liability shall
            not exceed the amount paid for the specific service in question.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Termination</h2>
          <p>
            Either party may terminate a project agreement with written notice. In the event of
            termination, the client is responsible for payment of all work completed up to that
            point.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the State
            of Florida, United States.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. Changes to Terms</h2>
          <p>
            We reserve the right to update these terms at any time. Continued use of our services
            after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">10. Contact</h2>
          <p>
            For questions about these Terms of Service, contact us at{" "}
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
