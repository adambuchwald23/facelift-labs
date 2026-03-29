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
    <section
      id={id}
      className={cn("scroll-mt-24", className)}
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 800px" }}
    >
      {children}
    </section>
  );
}
