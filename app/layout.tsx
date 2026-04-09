/* Global styles first — ensures Tailwind/preflight are tied to the root layout chunk. */
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { StructuredData } from "./structured-data";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

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
  applicationName: "Facelift Labs",
  title: {
    default: "Facelift Labs | Modern Websites Engineered to Convert",
    template: "%s | Facelift Labs",
  },
  description:
    "Facelift Labs designs and builds high-performance websites for brands that need a new site or a complete redesign. Custom UX/UI design, Next.js development, and strategic SEO — based in Tampa, FL.",
  keywords: [
    "Facelift Labs",
    "facelift labs",
    "faceliftlabs",
    "web design agency",
    "web development",
    "UX/UI design",
    "SEO",
    "Next.js",
    "Tampa web agency",
    "digital facelift",
    "website redesign",
    "performance optimization",
    "high-performance websites",
    "custom website design",
  ],
  authors: [{ name: "Facelift Labs", url: "https://faceliftlabs.com" }],
  creator: "Facelift Labs",
  publisher: "Facelift Labs",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Facelift Labs",
    title: "Facelift Labs | Modern Websites Engineered to Convert",
    description:
      "Facelift Labs designs and builds high-performance websites for brands that need a new site or a complete redesign. Custom UX/UI design, Next.js development, and strategic SEO.",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Facelift Labs — Modern Websites Engineered to Convert" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facelift Labs | Modern Websites Engineered to Convert",
    description:
      "Facelift Labs designs and builds high-performance websites for brands that need a new site or a complete redesign.",
    images: ["/opengraph-image"],
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
      <body className="min-h-screen antialiased overflow-x-clip overscroll-x-none">
        <div>
          <a href="#main" className="skip-to-content">
            Skip to content
          </a>
          <StructuredData />
          <SmoothScrollProvider />
          {children}
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
