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
        primary: '#2d4a3e',
        navy: '#1e3a2f',
        gold: '#c9b382',
        accent: '#f5f0e8',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        elegant: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config