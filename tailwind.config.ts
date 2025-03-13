import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',  // This is more inclusive
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0070f3',
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c1ff',
          300: '#66a3ff',
          400: '#3384ff',
          500: '#0070f3',
          600: '#005ac2',
          700: '#004392',
          800: '#002d61',
          900: '#001631',
        },
        secondary: {
          DEFAULT: '#1f2937',
          50: '#f3f4f6',
          100: '#e7e9ec',
          200: '#d0d3d9',
          300: '#b8bec6',
          400: '#a0a8b3',
          500: '#8892a0',
          600: '#6b778c',
          700: '#556177',
          800: '#3f4a63',
          900: '#1f2937',
        },
        danger: {
          DEFAULT: '#ef4444',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        warning: {
          DEFAULT: '#f59e0b',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        success: {
          DEFAULT: '#10b981',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;