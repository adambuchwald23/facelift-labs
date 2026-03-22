"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FOOTER } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.35, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.6, ease: EASE } },
};

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.07] bg-[#f7f8f6]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16"
      >

        {/* Main row: logo + location left — nav columns right */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">

          {/* Left: logo + tagline + location pill */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <Link href="/" className="inline-block shrink-0">
              <Image
                src="/logos/facelift-labs-horizontal.svg"
                alt="Facelift Labs"
                width={200}
                height={36}
                className="h-8 w-auto"
                loading="lazy"
              />
            </Link>

            <p className="max-w-[220px] text-sm leading-relaxed text-foreground-muted">
              Modern websites engineered to convert.
            </p>

            {/* Tampa, FL pill */}
            <div
              className="inline-flex w-fit items-center gap-2 rounded-full border border-black/[0.1] px-4 py-2"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,255,136,0.14) 0%, rgba(0,255,136,0.04) 60%, transparent 100%)",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
                aria-hidden
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none" />
              </svg>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {FOOTER.location}
              </span>
            </div>
          </motion.div>

          {/* Right: nav columns */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 sm:gap-x-16">

            {/* Navigation */}
            <motion.div variants={fadeUp}>
              <h3 className="mb-5 text-sm font-semibold tracking-tight text-foreground">
                Navigation
              </h3>
              <ul className="space-y-3">
                {FOOTER.navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground-muted transition-colors duration-200 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div variants={fadeUp}>
              <h3 className="mb-5 text-sm font-semibold tracking-tight text-foreground">
                Legal
              </h3>
              <ul className="space-y-3">
                {FOOTER.legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground-muted transition-colors duration-200 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={fadeUp}>
              <h3 className="mb-5 text-sm font-semibold tracking-tight text-foreground">
                Contact
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`tel:${FOOTER.contact.phone.replace(/\D/g, "")}`}
                    className="text-sm text-foreground-muted transition-colors duration-200 hover:text-foreground"
                  >
                    {FOOTER.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${FOOTER.contact.email}`}
                    className="text-sm text-foreground-muted transition-colors duration-200 hover:text-foreground"
                  >
                    {FOOTER.contact.email}
                  </a>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>

        {/* Divider + bottom bar */}
        <motion.div
          variants={fadeUp}
          className="mt-12 border-t border-black/[0.07] pt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
        >
          <p className="text-sm text-foreground-muted">
            {FOOTER.copyright}
          </p>
          <div className="flex items-center gap-6">
            {FOOTER.bottomLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-foreground-muted transition-colors duration-200 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </footer>
  );
}
