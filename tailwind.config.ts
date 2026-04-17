import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#EDF7F5',
          100: '#D4EDE8',
          200: '#A8D9CF',
          500: '#2D9C85',
          700: '#1A6B5A',
          900: '#0D3D33',
        },
        amber: {
          50:  '#FFFBF0',
          100: '#FEF3D7',
          500: '#F5A623',
          700: '#D4850A',
        },
        neutral: {
          50:  '#F9F7F4',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          500: '#6B7280',
          700: '#374151',
          800: '#2D2D2D',
          950: '#1C1C1C',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
      borderRadius: {
        sm:  '4px',
        md:  '8px',
        lg:  '12px',
        xl:  '16px',
        '2xl': '24px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        md: '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        lg: '0 10px 30px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.04)',
      },
      maxWidth: {
        container: '1120px',
      },
    },
  },
  plugins: [],
}

export default config
