/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0B0D10',
          secondary: '#13161C',
          tertiary: '#1C2028',
          elevated: '#222731',
          border: '#2A2F3A',
        },
        accent: {
          DEFAULT: '#FF6B47',
          hover: '#FF7D5C',
          muted: 'rgba(255,107,71,0.15)',
        },
        text: {
          primary: '#E8E6E3',
          secondary: '#9B9892',
          muted: '#5C5A57',
        },
        success: '#4ADE80',
        warning: '#FACC15',
        error: '#F87171',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
      },
    },
  },
  plugins: [],
};
