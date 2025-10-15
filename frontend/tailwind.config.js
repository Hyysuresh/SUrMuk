/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC2626',
        secondary: '#FBBF24',
        accent: '#10B981',
        dark: '#121212',
        'dark-light': '#1E1E1E',
        'dark-lighter': '#2A2A2A'
      }
    },
  },
  plugins: [],
}