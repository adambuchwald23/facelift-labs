import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Facelift Labs",
    short_name: "Facelift Labs",
    description:
      "Modern websites engineered to convert. Custom UX/UI design, Next.js development, and strategic SEO.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00FF88",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
