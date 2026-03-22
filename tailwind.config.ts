import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;

function addVariablesForColors({ addBase, theme }: { addBase: (base: Record<string, Record<string, string>>) => void; theme: (path: string) => Record<string, string> }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  ) as Record<string, string>;
  addBase({ ":root": newVars });
}

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
  plugins: [addVariablesForColors],
};

export default config;
