/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0f0a1e',
        'bg-medium': '#1a1331',
        'accent-purple': '#6e3ce7',
        'light-purple': '#9a6eff',
        'text-light': '#f8f8ff',
        'text-dim': '#b8b8d0',
        'highlight': '#ff7b7b',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
}