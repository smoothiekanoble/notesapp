/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: colors.indigo,
        secondary: colors.slate,
        accent: colors.amber,
      }
    },
  },
  plugins: [],
}
