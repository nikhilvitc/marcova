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
        chocolate: {
          50: '#f5e6d3',
          100: '#e8d4b8',
          200: '#d4b896',
          300: '#c09c74',
          400: '#a67c5c',
          500: '#8b6647',
          600: '#6f5038',
          700: '#5a3d2c',
          800: '#442d20',
          900: '#2f1e16',
          950: '#1a0f0a',
        },
        cream: {
          50: '#f5f0ea',
          100: '#ede4d9',
          200: '#dbc9b3',
          300: '#c9ae8d',
          400: '#b79367',
          500: '#a57841',
          600: '#8a6336',
          700: '#6f4e2b',
          800: '#543a20',
          900: '#392615',
          950: '#1e130a',
        },
        gold: {
          50: '#fff9e6',
          100: '#fff3cc',
          200: '#ffe799',
          300: '#ffdb66',
          400: '#ffcf33',
          500: '#ffc300',
          600: '#cc9c00',
          700: '#997500',
          800: '#664e00',
          900: '#332700',
          950: '#1a1400',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 195, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 195, 0, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
