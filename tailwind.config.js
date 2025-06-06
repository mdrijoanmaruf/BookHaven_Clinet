/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#1E3A5F',
        'primary': '#2E5EAA',
        'accent': '#5DA9E9',
        'secondary': '#A1C6EA',
        'light': '#F0F8FF',
      },
    },
  },
  plugins: [],
} 