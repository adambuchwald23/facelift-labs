"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { CONTACT } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { CARD_SHADOW } from "@/lib/design-tokens";
import { useIsMobile } from "@/lib/use-mobile";
import { useInView } from "@/lib/use-in-view";
import { staggerContainer, fadeUp } from "@/lib/motion";

const INPUT_BASE =
  "w-full rounded-2xl bg-[#f7f7f7] px-4 py-3 text-[0.9375rem] text-foreground placeholder:text-foreground/30 outline-none ring-1 ring-black/[0.07] transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-accent/50";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const mobile = useIsMobile();
  const [observerRef, formInView] = useInView<HTMLDivElement>();
  const fieldVars = useMemo(() => fadeUp(mobile), [mobile]);
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
      className="px-4 pt-6 pb-8 sm:px-6 sm:py-16 md:pt-24 md:pb-28"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-col items-center gap-6 text-center sm:mb-8">
          <SectionHeader label={CONTACT.headline} />
          <p className="text-sm text-foreground-muted sm:text-base">
            Tell us about your project and we&apos;ll be in touch within 24 hours.
          </p>
        </div>

        <div ref={observerRef}>
        <motion.form
          ref={formRef}
          variants={staggerContainer(mobile)}
          initial="hidden"
          animate={formInView ? "visible" : "hidden"}
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-[28px] bg-white p-5 ring-1 ring-inset ring-black/[0.07] sm:rounded-[40px] sm:p-7"
          style={{ boxShadow: CARD_SHADOW }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[28px] bg-gradient-to-r from-accent/60 via-accent to-accent/60 sm:rounded-t-[40px]"
          />

          <motion.div variants={fieldVars} className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">First Name</span>
              <input type="text" name="firstName" autoComplete="given-name" className={INPUT_BASE} placeholder="John" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Last Name</span>
              <input type="text" name="lastName" autoComplete="family-name" className={INPUT_BASE} placeholder="Doe" />
            </label>
          </motion.div>

          <motion.label variants={fieldVars} className="mt-3.5 block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Email</span>
            <input type="email" name="email" autoComplete="email" className={INPUT_BASE} placeholder="you@example.com" aria-required="true" required />
          </motion.label>

          <motion.label variants={fieldVars} className="mt-3.5 block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Phone Number</span>
            <input type="tel" name="phone" autoComplete="tel" className={INPUT_BASE} placeholder="(555) 123-4567" />
          </motion.label>

          <motion.fieldset variants={fieldVars} className="mt-3.5">
            <legend className="mb-2 block text-sm font-medium text-foreground">Select Service(s)</legend>
            <div className="flex flex-wrap gap-2">
              {CONTACT.serviceOptions.map((opt) => {
                const selected = services.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleService(opt.value)}
                    className="min-h-[40px] rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-black/[0.08] outline-none transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] active:scale-[0.97]"
                    style={{
                      backgroundColor: selected ? "#00FF88" : "#f7f7f7",
                      color: selected ? "#0a0a0a" : "rgba(10,10,10,0.55)",
                      transform: selected ? "scale(1.04)" : undefined,
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </motion.fieldset>

          <motion.label variants={fieldVars} className="mt-3.5 block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Message</span>
            <textarea
              name="message"
              rows={3}
              className={INPUT_BASE}
              placeholder="Tell us about your project..."
              aria-required="true"
              required
            />
          </motion.label>

          <motion.div variants={fieldVars} className="mt-4">
            <Button
              type="submit"
              variant="primary"
              className="!text-foreground w-full justify-center"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : CONTACT.submitLabel}
            </Button>
          </motion.div>

          <div aria-live="polite" role="status">
            <AnimatePresence>
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 text-center text-sm font-medium text-foreground"
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
          </div>
        </motion.form>
        </div>
      </div>
    </SectionWrapper>
  );
}
