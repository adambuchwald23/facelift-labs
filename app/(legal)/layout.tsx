import Link from "next/link";
import Image from "next/image";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="block shrink-0">
            <Image
              src="/logo.svg"
              alt="Facelift Labs"
              width={613}
              height={100}
              className="h-auto"
              style={{ width: "clamp(120px, 30vw, 150px)" }}
              loading="eager"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.1] px-4 py-2 min-h-[44px] text-sm font-medium text-foreground transition-colors hover:bg-black/[0.04]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>
      <main id="main">{children}</main>
    </>
  );
}
