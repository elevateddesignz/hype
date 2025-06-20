/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0C2340', // Navy Blue
          light: '#183A66',
          dark: '#061528',
        },
        secondary: {
          DEFAULT: '#FA4616', // Orange
          light: '#FB6D45',
          dark: '#D93A10',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [],
};