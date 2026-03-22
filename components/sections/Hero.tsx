"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { HERO, HERO_TRUST_LOGOS } from "@/lib/constants";
import Button from "@/components/ui/Button";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, delay: 0.3 + i * 0.2, ease: [0.16, 1, 0.3, 1] },
  }),
};


export default function Hero() {
  return (
    <section
      id="about"
      className="relative w-full flex flex-col items-center overflow-hidden scroll-mt-20 min-h-[calc(100svh-4rem)]"
    >
      {/* Top-left radial glow — contained to corner, never reaches marquee */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 top-0 left-0 h-[80%] w-[60%]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 0% 0%, rgba(0,255,136,0.22) 0%, transparent 70%)",
        }}
      />

      {/* Top-right radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 top-0 right-0 h-[80%] w-[60%]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 100% 0%, rgba(0,255,136,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Bottom fade — hard white wall so gradient never bleeds into marquee or next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 bottom-0 left-0 right-0 h-[40%]"
        style={{
          background: "linear-gradient(to top, #ffffff 40%, transparent 100%)",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 container mx-auto flex flex-1 flex-col justify-center px-4 pb-16 sm:pb-20 md:px-6 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">

          {/* Headline */}
          <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[3.25rem] lg:text-[4rem] mb-6 md:mb-8">
              {/* Explicit space between spans: without Tailwind, both are inline and would read "…engineeredfor" */}
              <span className="block pb-2">{HERO.headline}</span>{" "}
              <span className="mt-3 block min-h-[1.2em]">
                to{" "}
                <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-[length:200%_auto] bg-clip-text font-bold text-transparent animate-gradient-x">
                  {HERO.headlineAccent}
                </span>
                .
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="mt-4 text-base text-foreground-muted sm:mt-6 sm:text-lg md:text-xl mb-8 max-w-xl mx-auto">
              {HERO.subtitle}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Button href="#contact" variant="primary" className="cta-arrow-btn w-full min-w-0 max-w-[18rem] sm:w-[18rem] !text-foreground">
              <span>{HERO.ctaPrimary}</span>
              {/* Clip area = circle bounds; arrow shoots through without overflow */}
              <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full" aria-hidden>
                {/* Black disc — static */}
                <svg className="absolute inset-0 h-7 w-7" width={28} height={28} viewBox="0 0 29 29" fill="none">
                  <circle cx="14.5" cy="14.5" r="13.5" fill="#020202" />
                </svg>
                {/* Arrow — animates right, centered via CSS */}
                <span className="cta-arrow-shoot">
                  <svg width={11} height={10} viewBox="0 0 12 10" fill="none">
                    <path d="M7 1L11 5M11 5L7 9M11 5H1" stroke="#00FF88" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </Button>
            <Button href="#facelift" variant="outline" className="w-full min-w-0 max-w-[18rem] sm:w-[18rem] !border-foreground hover:!bg-foreground/5">
              <span>{HERO.ctaSecondary}</span>
              <svg
                className="h-7 w-7 shrink-0"
                width={28}
                height={28}
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path d="M14.5 1C21.9558 1 28 7.04416 28 14.5C28 21.9558 21.9558 28 14.5 28C7.04416 28 1 21.9558 1 14.5C1 7.04416 7.04416 1 14.5 1Z" fill="#FFFFFF" stroke="#020202" strokeWidth={2} />
                <path d="M16 19L20.5 14.5M20.5 14.5L16 10M20.5 14.5H8.5M28 14.5C28 7.04416 21.9558 1 14.5 1C7.04416 1 1 7.04416 1 14.5C1 21.9558 7.04416 28 14.5 28C21.9558 28 28 21.9558 28 14.5Z" stroke="#020202" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </motion.div>

          {/* Trust */}
          <motion.p
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 text-sm font-medium uppercase tracking-wider text-foreground-subtle sm:mt-14"
          >
            {HERO.trustedBy}
          </motion.p>

          {/* Stars */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 flex items-center justify-center gap-1"
            aria-hidden
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className="h-5 w-5 shrink-0 text-accent sm:h-6 sm:w-6"
                width={20}
                height={20}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </motion.div>

          {/* Marquee */}
          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 sm:mt-10"
            aria-hidden
          >
            <div className="marquee-wrap mx-auto max-w-2xl overflow-hidden">
              <div className="flex w-max animate-marquee">
                {[0, 1].map((setIdx) => (
                  <div key={setIdx} className="flex shrink-0" style={{ gap: "2rem" , paddingRight: "2rem" }}>
                    {HERO_TRUST_LOGOS.map((logo, i) => (
                      <div
                        key={`trust-${setIdx}-${i}`}
                        data-marquee-cell
                        className="flex h-14 w-[12rem] shrink-0 items-center justify-center sm:h-16"
                      >
                        <div className="relative h-10 w-[10rem] shrink-0 sm:h-11 sm:w-[11rem]">
                          <Image
                            src={logo.full}
                            alt=""
                            fill
                            className="object-contain"
                            sizes="176px"
                            loading="eager"
                            fetchPriority="high"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
