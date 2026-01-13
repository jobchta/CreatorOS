/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        surface: 'rgba(255, 255, 255, 0.02)',
        border: 'rgba(255, 255, 255, 0.08)',
        coral: {
          DEFAULT: '#ff6b6b',
          glow: 'rgba(255, 107, 107, 0.4)',
        },
        teal: {
          DEFAULT: '#00d9c0',
          glow: 'rgba(0, 217, 192, 0.4)',
        },
        amber: {
          DEFAULT: '#ffc857',
          glow: 'rgba(255, 200, 87, 0.4)',
        },
        emerald: {
          DEFAULT: '#10b981', // Tailwind default but re-defining for consistency with design system
          glow: 'rgba(16, 185, 129, 0.4)',
        },
        rose: {
          DEFAULT: '#f43f5e',
          glow: 'rgba(244, 63, 94, 0.4)',
        },
        cyan: {
          DEFAULT: '#22d3ee',
          glow: 'rgba(34, 211, 238, 0.4)',
        },
        orange: {
          DEFAULT: '#fb923c',
          glow: 'rgba(251, 146, 60, 0.4)',
        },
        lime: {
          DEFAULT: '#a3e635',
          glow: 'rgba(163, 230, 53, 0.4)',
        },
        sky: {
          DEFAULT: '#38bdf8',
          glow: 'rgba(56, 189, 248, 0.4)',
        },
        pink: {
          DEFAULT: '#f472b6',
          glow: 'rgba(244, 114, 182, 0.4)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      boxShadow: {
        'glow-coral': '0 0 30px rgba(255, 107, 107, 0.4), 0 0 60px rgba(255, 107, 107, 0.2)',
        'glow-teal': '0 0 30px rgba(0, 217, 192, 0.4), 0 0 60px rgba(0, 217, 192, 0.2)',
        'glow-amber': '0 0 30px rgba(255, 200, 87, 0.4), 0 0 60px rgba(255, 200, 87, 0.2)',
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.2)',
        'glow-cyan': '0 0 30px rgba(34, 211, 238, 0.4), 0 0 60px rgba(34, 211, 238, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
