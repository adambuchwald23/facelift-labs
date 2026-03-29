"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";

const hoverSpring = { type: "spring" as const, stiffness: 260, damping: 22 };

const laptopContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.22, delayChildren: 0.1 },
  },
};

const laptopVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length)),
    []
  );
  const next = useCallback(() =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % PORTFOLIO_PROJECTS.length)),
    []
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, prev, next]);

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeIndex]);

  const activeProject = activeIndex !== null ? PORTFOLIO_PROJECTS[activeIndex] : null;

  return (
    <>
      <SectionWrapper
        id="portfolio"
        className="px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex justify-center sm:mb-14">
            <SectionHeader label="Portfolio" />
          </div>

          <motion.div
            variants={laptopContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12"
          >
            {PORTFOLIO_PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                variants={laptopVariants}
                whileHover={{ y: -10, scale: 1.02, transition: hoverSpring }}
                whileTap={{ scale: 0.97, transition: hoverSpring }}
                className="group relative cursor-pointer"
                onClick={() => setActiveIndex(i)}
              >
                <div
                  className="pointer-events-none absolute inset-x-[10%] bottom-[8%] h-[25%] rounded-full bg-accent/25 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />

                <Image
                  src={project.imagePath}
                  alt={project.title}
                  width={988}
                  height={816}
                  className="relative w-full h-auto"
                  style={{
                    filter:
                      "drop-shadow(0 24px 48px rgba(0,0,0,0.20)) drop-shadow(0 6px 14px rgba(0,0,0,0.10))",
                  }}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority={i < 2}
                />

                <div className="mt-3 flex justify-center">
                  <span className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm ring-1 ring-black/[0.07]">
                    {project.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Lightbox — rendered outside SectionWrapper so fixed positioning works correctly */}
      <AnimatePresence>
        {activeProject && activeIndex !== null && (
          <motion.div
            key="lb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={close}
          >
            <motion.div
              key={`lb-panel-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[20px] bg-[#0a0a0a] shadow-2xl sm:rounded-[28px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-[16/10] w-full" style={{ minHeight: 200 }}>
                <Image
                  src={activeProject.screenshotPath}
                  alt={`Screenshot of ${activeProject.title}`}
                  fill
                  className={activeProject.screenshotFit === "cover" ? "object-cover" : "object-contain"}
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-4">
                <div className="flex flex-col items-center gap-0.5 text-center sm:order-2">
                  <p className="text-sm font-semibold text-white/90">{activeProject.title}</p>
                  <p className="text-xs text-white/35">{activeIndex + 1} / {PORTFOLIO_PROJECTS.length}</p>
                </div>

                <div className="flex items-center justify-between sm:contents">
                  <div className="flex items-center gap-2 sm:order-1">
                    <button
                      onClick={prev}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                      aria-label="Previous project"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={next}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                      aria-label="Next project"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-foreground transition hover:brightness-110 sm:order-3"
                  >
                    Visit Site
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20 lg:flex"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20 lg:flex"
              aria-label="Next project"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
