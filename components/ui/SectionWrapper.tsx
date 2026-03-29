interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Section anchor wrapper. Child components handle their own scroll-triggered
 * animations — keeping a single animation layer avoids compound-motion glitches
 * on mobile (double slide-up from wrapper + children).
 */
export default function SectionWrapper({
  id,
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
}
