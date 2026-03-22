/* Global styles first — ensures Tailwind/preflight are tied to the root layout chunk. */
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StructuredData } from "./structured-data";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

function metadataBaseUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
  try {
    return new URL(raw);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl(),
  title: {
    default: "Facelift Labs | Modern Websites Engineered for Growth",
    template: "%s | Facelift Labs",
  },
  description:
    "We design and build high-performance websites that help brands grow faster online. Custom UX/UI design, Next.js development, and strategic SEO.",
  keywords: [
    "web design",
    "web development",
    "UX/UI design",
    "SEO",
    "Next.js",
    "Tampa web agency",
    "Facelift Labs",
    "digital facelift",
    "website redesign",
    "performance optimization",
  ],
  authors: [{ name: "Facelift Labs", url: "https://faceliftlabs.com" }],
  creator: "Facelift Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Facelift Labs",
    title: "Facelift Labs | Modern Websites Engineered for Growth",
    description:
      "We design and build high-performance websites that help brands grow faster online. Custom UX/UI design, Next.js development, and strategic SEO.",
    url: "https://faceliftlabs.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Facelift Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facelift Labs | Modern Websites Engineered for Growth",
    description:
      "We design and build high-performance websites that help brands grow faster online.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased">
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <StructuredData />
        <SmoothScrollProvider />
        {children}
      </body>
    </html>
  );
}
