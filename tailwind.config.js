/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nexa: ["var(--font-nexa)", "sans-serif"],
      },
    },
  },
  plugins: [],
};