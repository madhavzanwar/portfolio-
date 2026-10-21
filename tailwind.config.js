/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#070707',
        surface: {
          DEFAULT: '#101010',
          elevated: '#171717',
          hover: '#1e1e1e',
          subtle: '#141414'
        },
        ivory: {
          DEFAULT: '#E1E0CC',
          pure: '#F5F5EE',
          muted: 'rgba(225, 224, 204, 0.72)',
          faint: 'rgba(225, 224, 204, 0.45)',
          stroke: 'rgba(225, 224, 204, 0.12)'
        },
        primary: {
          DEFAULT: '#E1E0CC',
          dark: '#101010'
        },
        accent: {
          emerald: '#10B981',
          azure: '#38BDF8',
          amber: '#F59E0B',
          violet: '#8B5CF6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Almarai', 'sans-serif'],
        editorial: ['"Instrument Serif"', 'serif'],
        script: ['"Alex Brush"', 'cursive'],
        luxury: ['"Bodoni Moda"', '"Instrument Serif"', 'serif'],
        aesthetic: ['"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
