"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";
import { useIsMobile } from "@/lib/use-mobile";
import { useInView } from "@/lib/use-in-view";
import { staggerContainer, fadeUpScale } from "@/lib/motion";

const HOVER_SPRING = { type: "spring" as const, stiffness: 260, damping: 22 };

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
  const mobile = useIsMobile();
  const [gridRef, gridInView] = useInView<HTMLDivElement>();

  return (
    <>
      <SectionWrapper
        id="portfolio"
        className="section-viewport px-4 pt-6 pb-8 sm:px-6 sm:py-12 md:pt-6 md:pb-10"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex justify-center sm:mb-14">
            <SectionHeader label="Portfolio" />
          </div>

          <motion.div
            ref={gridRef}
            variants={staggerContainer(mobile)}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12"
          >
            {PORTFOLIO_PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                variants={fadeUpScale(mobile)}
                {...(!mobile && {
                  whileHover: { y: -10, scale: 1.02, transition: HOVER_SPRING },
                  whileTap: { scale: 0.97, transition: HOVER_SPRING },
                })}
                className="group relative cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(i);
                  }
                }}
              >
                <div
                  className="pointer-events-none absolute inset-x-[10%] bottom-[8%] h-[25%] rounded-full bg-accent/25 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 hidden md:block"
                  aria-hidden
                />

                <Image
                  src={project.imagePath}
                  alt={project.title}
                  width={988}
                  height={816}
                  className="relative w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  loading="lazy"
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
            role="dialog"
            aria-modal="true"
            aria-label={activeProject ? `${activeProject.title} project details` : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4"
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
                    className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 min-h-[44px] text-sm font-semibold text-foreground transition hover:brightness-110 sm:order-3"
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
