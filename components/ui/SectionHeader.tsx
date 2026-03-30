import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  className?: string;
}

export default function SectionHeader({ label, className = "" }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-[100px] border-2 border-accent px-4 py-2 sm:px-8 sm:py-3",
        className,
      )}
    >
      <span className="text-base font-bold text-foreground sm:text-2xl">{label}</span>
    </div>
  );
}
