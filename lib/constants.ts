/**
 * Site copy and config — single source for nav, sections, FAQ, comparison, form options.
 */

/** Nav pill: Services, Portfolio, Workflow, Why Us, FAQ. Contact Us is the CTA button. */
export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Workflow", href: "#facelift" },
  { label: "Why Us", href: "#why-us" },
  { label: "FAQ", href: "#faq" },
] as const;

export const HERO = {
  headline: "Modern websites engineered",
  headlineAccent: "convert",
  subtitle:
    "We design and build high-performance websites for brands that need a new site or a complete redesign.",
  ctaPrimary: "Get Your Digital Facelift",
  ctaSecondary: "See How It Works",
  trustedBy: "Trusted by 1K+ companies",
} as const;

/** Trusted-by marquee: logomark + logotext per company, or single full logo (mark + text in one asset). */
export const HERO_TRUST_LOGOS = [
  { full: "/logos/Lightbox-logo.svg" },
  { full: "/logos/45 Degrees-logo.svg" },
  { full: "/logos/Lightspeed-logo.svg" },
  { full: "/logos/watchtower-logo.svg" },
] as const;

/** Portfolio section: four project cards from Figma (image paths in public/portfolio). */
export const PORTFOLIO_PROJECTS = [
  { title: "Own The Crowd", url: "https://www.ownthecrowd.com", imagePath: "/portfolio/own-the-crowd-transparent.png", screenshotPath: "/portfolio/screens/own-the-crowd-screenshot.png", screenshotFit: "cover" as const },
  { title: "Mailkit Website", url: "https://www.mailkit.com", imagePath: "/portfolio/mailkit-transparent.png", screenshotPath: "/portfolio/screens/mailkit-screenshot.png", screenshotFit: "cover" as const },
  { title: "Assemble Website", url: "https://www.onassemble.com", imagePath: "/portfolio/assemble-transparent.png", screenshotPath: "/portfolio/screens/assemble-screenshot.png", screenshotFit: "contain" as const },
  { title: "Fixa", url: "https://fixaplan.com", imagePath: "/portfolio/fixa-transparent.png", screenshotPath: "/portfolio/screens/fixa-screenshot.png", screenshotFit: "contain" as const },
] as const;

export const THE_FACELIFT_STEPS = [
  {
    number: "01",
    title: "Strategy & Audit",
    description:
      "We analyze your market, audience, and competitors to build a strategy rooted in data, not guesswork.",
  },
  {
    number: "02",
    title: "Design and UI/UX",
    description:
      "We translate insights into thoughtful design concepts that align with your vision and position you competitively.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "We develop and refine your site with performance, responsiveness, and seamless user experience in mind.",
  },
  {
    number: "04",
    title: "Launch and Scale",
    description:
      "We launch your site strategically, ensuring it's built to engage users and convert traffic into measurable results.",
  },
] as const;

export const TECH_STACK_ITEMS = [
  { name: "OpenAI",  logo: "/images/tech-stack/openai.svg"  },
  { name: "Lovable", logo: "/images/tech-stack/lovable.svg" },
  { name: "Claude",  logo: "/images/tech-stack/claude.svg"  },
  { name: "Grok",    logo: "/images/tech-stack/grok.svg"    },
  { name: "Figma",   logo: "/images/tech-stack/figma.svg"   },
  { name: "GitHub",  logo: "/images/tech-stack/github.svg"  },
  { name: "Gemini",  logo: "/images/tech-stack/gemini.svg"  },
] as const;

export const COMPARISON = {
  faceliftLabs: [
    "Dedicated experts crafting solutions around your goals",
    "Custom designed websites built specifically for your brand",
    "Long term support, improvements, and updates",
    "High performance builds optimized for speed",
    "Strategic SEO implementation to increase visibility and traffic",
    "AI-powered tooling to accelerate delivery and innovation",
    "Transparent process with real-time visibility into progress",
  ],
  otherAgencies: [
    "Rely on generalist teams and repeatable solutions",
    "Use pre built templates with limited flexibility",
    "Support often ends shortly after launch",
    "Standard performance with slower load speeds",
    "Basic SEO setup with limited optimization",
    "Manual workflows that slow timelines and limit output",
    "Opaque development with limited client involvement",
  ],
} as const;

export const FAQ_CTA_LABEL = "Book a call";

export const FAQ_ITEMS = [
  {
    question: 'What is a "Digital Facelift?"',
    answer:
      "A Digital Facelift is our end-to-end process: strategy, design, build, and launch, giving your brand a modern, high-performing web presence.",
  },
  {
    question: "What services does Facelift Labs offer?",
    answer:
      "We offer UI/UX design, web development (Next.js and modern stacks), SEO and marketing, strategy and audits, and ongoing support.",
  },
  {
    question: "Why partner with Facelift Labs?",
    answer:
      "We combine strategy, design, and engineering to deliver websites that drive growth. Every project gets a dedicated team and a custom approach.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timeline depends on scope. A typical website project runs 4 to 8 weeks from kickoff to launch, with clear milestones along the way.",
  },
  {
    question: "Do you include SEO in your builds?",
    answer:
      "Yes. SEO is baked into our process from day one. Technical foundation, content structure, and performance all aligned for visibility.",
  },
  {
    question: "Why invest in a fully custom website?",
    answer:
      "Custom sites perform better, scale with your brand, and avoid the limitations of templates. You get a unique asset that supports your goals.",
  },
] as const;

export const CONTACT = {
  headline: "Let's Build The Future",
  subtext: "Send us a message.",
  submitLabel: "Send Message",
  /** Figma: Select Service(s) checkboxes */
  serviceOptions: [
    { value: "full-overhaul", label: "Full Website Overhaul" },
    { value: "ux-ui", label: "UX/UI Design" },
    { value: "performance-audit", label: "Performance Audit" },
    { value: "other", label: "Other" },
  ],
} as const;

/** Figma footer: Navigation, Legal, Contact columns + location + copyright + Privacy/Terms/Cookies */
export const FOOTER = {
  navigation: [
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Workflow", href: "#facelift" },
    { label: "Why Us", href: "#why-us" },
    { label: "FAQ", href: "#faq" },
  ],
  contact: {
    phone: "954-218-2066",
    email: "hello@faceliftlabs.com",
  },
  location: "Tampa, FL",
  copyright: "© 2026 Facelift Labs. All rights reserved.",
  bottomLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ],
} as const;
