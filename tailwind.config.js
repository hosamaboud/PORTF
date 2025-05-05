/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        thunder: ['ThunderExtBd', 'sans-serif'],
      },
    },
    screens: {
      sm: '500px',
      md: '768px',
      lg: '1060px',
      xl: '1440px',
    },
    boxShadow: {
      soft: '0 4px 20px rgba(0, 0, 0, 0.1)',
      glow: '0 0 10px rgba(255, 255, 255, 0.3)',
      neon: '0 0 15px #077A7D',
    },
  },
  plugins: [],
};
