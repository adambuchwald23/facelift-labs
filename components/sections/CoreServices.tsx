"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  CoreServiceCard,
  CoreServicesGrid,
  type CoreServiceItem,
} from "@/components/ui/core-service-card";
import { useIsMobile } from "@/lib/use-mobile";

const CORE_SERVICE_ICONS = {
  ux: "/images/core-services/ux-ui.svg",
  web: "/images/core-services/web-dev.svg",
  seo: "/images/core-services/seo-mastery.svg",
} as const;

const services: CoreServiceItem[] = [
  {
    name: "UX/UI Design",
    description:
      "We build immersive digital journeys that eliminate cognitive load. Our designs are engineered to guide visitors instinctively toward your goal.",
    iconSrc: CORE_SERVICE_ICONS.ux,
  },
  {
    name: "Web Development",
    description:
      "Lightning-fast Next.js deployments that dominate Google Core Web Vitals and provide an app-like experience on the web.",
    iconSrc: CORE_SERVICE_ICONS.web,
  },
  {
    name: "SEO Mastery",
    description:
      "Technical SEO baked into the foundation. We ensure your site doesn't just look good—it gets found by the right people.",
    iconSrc: CORE_SERVICE_ICONS.seo,
  },
];

export default function CoreServices() {
  const mobile = useIsMobile();
  return (
    <SectionWrapper
      id="services"
      className="min-h-[calc(100svh-5rem)] flex flex-col justify-center px-4 py-8 sm:px-6 sm:py-10 md:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex justify-center sm:mb-12">
          <SectionHeader label="Services" />
        </div>
        <CoreServicesGrid mobile={mobile}>
          {services.map((item) => (
            <CoreServiceCard key={item.name} {...item} mobile={mobile} />
          ))}
        </CoreServicesGrid>
      </div>
    </SectionWrapper>
  );
}
