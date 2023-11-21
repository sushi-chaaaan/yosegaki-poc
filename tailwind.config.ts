import type { Config } from "tailwindcss"

import daisyui, { type Config as DaisyConfig } from "daisyui"
import tailwindAnimate from "tailwindcss-animate"
import tailwindTypoGraphy from "@tailwindcss/typography"

export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindAnimate, tailwindTypoGraphy, daisyui],
  daisyui: { logs: false, themes: ["light"] } satisfies DaisyConfig,
} satisfies Config
