import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("scroll-mt-[44px] md:scroll-mt-[40px] [contain:paint] [transform:translateZ(0)]", className)}>
      {children}
    </section>
  );
}
