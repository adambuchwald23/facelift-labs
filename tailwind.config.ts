import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#00FF88",
        background: "#FFFFFF",
        "background-card": "#FFFFFF",
        foreground: "#020202",
        "foreground-muted": "#4B4B4B",
        "foreground-subtle": "#8D8D8D",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "100px",
        card: "50px",
        button: "25px",
      },
    },
  },
  plugins: [],
};

export default config;
