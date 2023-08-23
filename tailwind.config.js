const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require("autoprefixer"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          // "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    }),
  ],
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        carousel_item_size: "var(--_carousel-item-size)",
        "carousel-gutter": "var(--_carousel-gutters)",
        "carousel-scrollbar-gutter": "1.5rem",
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        primary_background:
          "rgb(var(--color-primary-background) / <alpha-value>)",

        secondary_background:
          "rgb(var(--color-secondary-background) / <alpha-value>)",

        carousel_item_size: "var(--_carousel-item-size)",
      },
    },
  },
};
