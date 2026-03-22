import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for Facelift Labs — how we use cookies and similar technologies.",
};

export default function CookiePolicy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Cookie Policy
      </h1>
      <p className="mt-4 text-sm text-foreground-muted">Last updated: March 2026</p>

      <div className="mt-10 space-y-8 text-[0.9375rem] leading-relaxed text-foreground-muted">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device when you visit a website. They help
            websites remember your preferences, understand how you use the site, and improve your
            experience.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. How We Use Cookies</h2>
          <p>Facelift Labs uses cookies for the following purposes:</p>
          <ul className="ml-5 mt-2 list-disc space-y-1">
            <li><strong>Essential cookies:</strong> Required for the website to function properly (e.g., security, navigation)</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website (e.g., pages visited, time spent)</li>
            <li><strong>Performance cookies:</strong> Help us improve site speed and user experience</li>
            <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements and measure campaign effectiveness</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Third-Party Cookies</h2>
          <p>
            We may use third-party services that set their own cookies, including:
          </p>
          <ul className="ml-5 mt-2 list-disc space-y-1">
            <li>Google Analytics — for website traffic analysis</li>
            <li>Vercel Analytics — for performance monitoring</li>
          </ul>
          <p className="mt-2">
            These services have their own privacy policies governing the use of cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Managing Cookies</h2>
          <p>
            You can control and manage cookies through your browser settings. Most browsers allow
            you to:
          </p>
          <ul className="ml-5 mt-2 list-disc space-y-1">
            <li>View what cookies are stored and delete them individually</li>
            <li>Block third-party cookies</li>
            <li>Block cookies from specific sites</li>
            <li>Block all cookies</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>
          <p className="mt-2">
            Please note that blocking cookies may affect your experience on our website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this
            page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Contact Us</h2>
          <p>
            If you have questions about our use of cookies, contact us at{" "}
            <a href="mailto:hello@faceliftlabs.com" className="text-accent underline underline-offset-2 hover:text-foreground">
              hello@faceliftlabs.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
