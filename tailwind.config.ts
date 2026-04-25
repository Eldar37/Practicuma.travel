import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0086B3',
        accent: '#F6861F',
        mint: '#6AC3C1',
        success: '#27C34B',
        background: '#FCFAF5',
        dark: '#163142',
        slate: {
          25: '#FCFDFF'
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      boxShadow: {
        card: '0 18px 40px -24px rgba(15, 23, 42, 0.22)',
        cardHover: '0 24px 50px -20px rgba(0, 134, 179, 0.28)',
        soft: '0 10px 25px -14px rgba(15, 23, 42, 0.2)'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        counter: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        counter: 'counter 0.7s ease-out forwards',
        float: 'float 4s ease-in-out infinite'
      },
      backgroundImage: {
        'hero-overlay':
          'linear-gradient(180deg, rgba(22,49,66,0.16) 0%, rgba(22,49,66,0.74) 100%)',
        'section-glow':
          'radial-gradient(circle at top, rgba(0,134,179,0.18), transparent 55%)'
      }
    }
  },
  plugins: []
};

export default config;
