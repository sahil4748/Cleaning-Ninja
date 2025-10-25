import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a5f',
          dark: '#0f1f3d',
          light: '#2d5f8d',
        },
        accent: {
          DEFAULT: '#F7F5DC',
          dark: '#e8e5c8',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F4D03F',
          dark: '#B8941F',
          shine: '#F4E5A0',
        },
        navy: {
          DEFAULT: '#0f1f3d',
          light: '#1a2942',
          900: '#0f1f3d',
          800: '#1a2942',
        },
        coral: '#FF6B6B',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        elegant: ['Cinzel', 'serif'],
      },
      backgroundImage: {
        'gradient-royal': 'linear-gradient(135deg, #4E5B3F 0%, #D4AF37 50%, #4E5B3F 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F4E5A0 50%, #D4AF37 100%)',
        'gradient-offer': 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)',
        'gradient-dark': 'linear-gradient(180deg, rgba(26,35,50,0.75) 0%, rgba(26,35,50,0.9) 100%)',
        'gradient-shine': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
      },
      boxShadow: {
        'gold': '0 10px 40px rgba(212, 175, 55, 0.4)',
        'gold-lg': '0 20px 60px rgba(212, 175, 55, 0.5)',
        'elegant': '0 10px 40px rgba(0, 0, 0, 0.15)',
        'royal': '0 25px 80px rgba(212, 175, 55, 0.3)',
        'inner-gold': 'inset 0 2px 4px rgba(212, 175, 55, 0.3)',
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'shine': 'shine 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '200%' },
        },
      },
    },
  },
  plugins: [],
}
export default config
