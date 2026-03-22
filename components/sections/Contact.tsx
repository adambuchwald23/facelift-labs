"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { CONTACT } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { CARD_SHADOW } from "@/lib/design-tokens";

const formContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
};

const INPUT_BASE =
  "w-full rounded-2xl bg-[#f7f7f7] px-4 py-3 text-[0.9375rem] text-foreground placeholder:text-foreground/30 outline-none ring-1 ring-black/[0.07] transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-accent/50";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [services, setServices] = useState<string[]>([]);
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const toggleService = (value: string) =>
    setServices((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const payload = {
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      services,
      message: data.get("message") as string,
    };

    if (!payload.email || !payload.message) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setServices([]);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <SectionWrapper
      id="contact"
      className="px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-14"
        >
          <SectionHeader label={CONTACT.headline} />
          <p className="text-base text-foreground-muted">
            Tell us about your project and we&apos;ll be in touch within 24 hours.
          </p>
        </motion.div>

        <motion.form
          ref={formRef}
          variants={formContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-[40px] bg-white p-8 ring-1 ring-inset ring-black/[0.07] sm:p-10"
          style={{ boxShadow: CARD_SHADOW }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[40px] bg-gradient-to-r from-accent/60 via-accent to-accent/60"
          />

          <motion.div variants={fieldVariants} className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">First Name</span>
              <input type="text" name="firstName" className={INPUT_BASE} placeholder="John" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">Last Name</span>
              <input type="text" name="lastName" className={INPUT_BASE} placeholder="Doe" />
            </label>
          </motion.div>

          <motion.label variants={fieldVariants} className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-foreground">Email</span>
            <input type="email" name="email" className={INPUT_BASE} placeholder="you@example.com" aria-required="true" required />
          </motion.label>

          <motion.label variants={fieldVariants} className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-foreground">Phone Number</span>
            <input type="tel" name="phone" className={INPUT_BASE} placeholder="(555) 123-4567" />
          </motion.label>

          <motion.fieldset variants={fieldVariants} className="mt-5">
            <legend className="mb-3 block text-sm font-medium text-foreground">Select Service(s)</legend>
            <div className="flex flex-wrap gap-2.5">
              {CONTACT.serviceOptions.map((opt) => {
                const selected = services.includes(opt.value);
                return (
                  <motion.button
                    key={opt.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleService(opt.value)}
                    animate={{
                      backgroundColor: selected ? "#00FF88" : "#f7f7f7",
                      color: selected ? "#0a0a0a" : "rgba(10,10,10,0.55)",
                      scale: selected ? 1.04 : 1,
                    }}
                    whileHover={{ scale: selected ? 1.04 : 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="min-h-[44px] rounded-full px-4 py-2 text-sm font-medium ring-1 ring-black/[0.08] outline-none"
                  >
                    {opt.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.fieldset>

          <motion.label variants={fieldVariants} className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-foreground">Message</span>
            <textarea
              name="message"
              rows={4}
              className={INPUT_BASE}
              placeholder="Tell us about your project..."
              aria-required="true"
              required
            />
          </motion.label>

          <motion.div variants={fieldVariants} className="mt-8">
            <Button
              type="submit"
              variant="primary"
              className="!text-foreground w-full justify-center"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : CONTACT.submitLabel}
            </Button>
          </motion.div>

          <AnimatePresence>
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5 text-center text-sm font-medium text-accent"
              >
                Message sent! We&apos;ll be in touch soon.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5 text-center text-sm font-medium text-red-500"
              >
                Something went wrong. Please try again or email us directly.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
