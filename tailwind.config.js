/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        indigo: {
          DEFAULT: '#4F00FF',
          dark: '#2D00A8',
          light: '#7B3FFF',
        },
        cyan: {
          DEFAULT: '#00FFFF',
          dark: '#00B8B8',
          glow: '#00FFFFAA',
        },
        orange: {
          DEFAULT: '#FF6B00',
          glow: '#FF6B0088',
        },
        glass: 'rgba(255,255,255,0.05)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0,255,255,0.5), 0 0 60px rgba(0,255,255,0.2)',
        'glow-indigo': '0 0 20px rgba(79,0,255,0.5), 0 0 60px rgba(79,0,255,0.2)',
        'glow-orange': '0 0 20px rgba(255,107,0,0.5), 0 0 60px rgba(255,107,0,0.2)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
