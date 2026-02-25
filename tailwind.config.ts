import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-dark': '#0B132B',
        'navy-light': '#1C2541',
        'butterfly-blue': '#3A86FF',
        'butterfly-blue-glow': '#48CAE4',
        'acoustic-brown': '#D4A373',
        'acoustic-brown-dark': '#BC6C25',
        'off-white': '#f8f9fa',
      },
      fontFamily: {
        heading: ['var(--font-nunito)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px #3A86FF)' },
          '100%': { filter: 'drop-shadow(0 0 15px #48CAE4)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
