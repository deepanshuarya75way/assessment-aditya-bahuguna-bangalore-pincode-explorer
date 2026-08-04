/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef9f8',
          100: '#d5f1ee',
          200: '#abe3de',
          300: '#79cec8',
          400: '#4ab3ad',
          500: '#309893',
          600: '#247a77',
          700: '#206261',
          800: '#1d4f4e',
          900: '#1b4241',
          950: '#0a2626',
        },
        ink: {
          50: '#f5f7fa',
          100: '#ebeff4',
          200: '#d3dce6',
          300: '#adbdce',
          400: '#8199b1',
          500: '#617c97',
          600: '#4c647d',
          700: '#3e5166',
          800: '#364556',
          900: '#303b49',
          950: '#202730',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(32, 39, 48, 0.04), 0 8px 24px rgba(32, 39, 48, 0.06)',
        card: '0 1px 3px rgba(32, 39, 48, 0.06), 0 12px 32px rgba(32, 39, 48, 0.08)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
};
