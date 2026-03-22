interface SectionHeaderProps {
  label: string;
  className?: string;
}

export default function SectionHeader({ label, className = "" }: SectionHeaderProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-[100px] border-2 border-accent px-8 py-3 ${className}`}
    >
      <span className="text-2xl font-bold text-foreground">{label}</span>
    </div>
  );
}
