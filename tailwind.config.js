/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sofia)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
