export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Facelift Labs",
    description:
      "We design and build high-performance websites for brands that need a new site or a complete redesign.",
    url: "https://faceliftlabs.com",
    telephone: "954-218-2066",
    email: "hello@faceliftlabs.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tampa",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: "US",
    serviceType: [
      "Web Design",
      "Web Development",
      "UX/UI Design",
      "SEO Optimization",
    ],
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
