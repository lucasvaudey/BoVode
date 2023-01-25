const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xl: "24px",
        "6xl": "64px",
      },
      fontFamily: {
        sans: ["var(--font-sofia)", "var(--font-grotesk)", ...fontFamily.sans],
      },
      colors: {
        background: "#17204E",
        secondary: "#E65A6F",
      },
      dropShadow: {
        xl: "-4px 10px 0px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};
