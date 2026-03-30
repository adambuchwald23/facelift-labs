import { FAQ_ITEMS, THE_FACELIFT_STEPS } from "@/lib/constants";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://faceliftlabs.com"
).replace(/\/$/, "");

export function StructuredData() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Facelift Labs",
      url: BASE_URL,
      logo: `${BASE_URL}/logo.svg`,
      description:
        "We design and build high-performance websites for brands that need a new site or a complete redesign.",
      telephone: "954-218-2066",
      email: "hello@faceliftlabs.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tampa",
        addressRegion: "FL",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "Country",
        name: "US",
      },
      sameAs: [
        "https://www.linkedin.com/company/faceliftlabs",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#service`,
      name: "Facelift Labs",
      url: BASE_URL,
      provider: { "@id": `${BASE_URL}/#organization` },
      serviceType: [
        "Web Design",
        "Web Development",
        "UX/UI Design",
        "SEO Optimization",
      ],
      priceRange: "$$",
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Facelift Labs",
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@type": "HowTo",
      "@id": `${BASE_URL}/#howto`,
      name: "How Facelift Labs Builds Your Website",
      description:
        "Our four-step process from strategy to launch, delivering a modern, high-performing web presence.",
      step: THE_FACELIFT_STEPS.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step.title,
        text: step.description,
      })),
    },
  ];

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
