"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  CoreServiceCard,
  CoreServicesGrid,
  type CoreServiceItem,
} from "@/components/ui/core-service-card";

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
  return (
    <SectionWrapper
      id="services"
      direction="left"
      className="px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.1 }}
          className="mb-8 flex justify-center sm:mb-12"
        >
          <SectionHeader label="Services" />
        </motion.div>
        <CoreServicesGrid>
          {services.map((item, i) => (
            <CoreServiceCard key={item.name} {...item} index={i} />
          ))}
        </CoreServicesGrid>
      </div>
    </SectionWrapper>
  );
}
