/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        thunder: ['ThunderExtBd', 'sans-serif'],
        thunderLight: ['ThunderLight', 'sans-serif'],
      },
    },
    screens: {
      sm: '500px',
      md: '768px',
      lg: '1060px',
      xl: '1440px',
    },
    boxShadow: {
      neon: '0 0 15px #077A7D',
    },
  },
  plugins: [],
};
