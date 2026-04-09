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
      alternateName: ["faceliftlabs", "Facelift Labs LLC"],
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
        width: 613,
        height: 100,
      },
      image: `${BASE_URL}/opengraph-image`,
      description:
        "Facelift Labs designs and builds high-performance websites for brands that need a new site or a complete redesign.",
      telephone: "+1-954-218-2066",
      email: "hello@faceliftlabs.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tampa",
        addressRegion: "FL",
        postalCode: "33601",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "Country",
        name: "US",
      },
      sameAs: [
        "https://www.linkedin.com/company/faceliftlabs",
        "https://faceliftlabs.com",
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
      alternateName: ["faceliftlabs", "Facelift Labs LLC"],
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `https://www.google.com/search?q=site:faceliftlabs.com+{search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
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
