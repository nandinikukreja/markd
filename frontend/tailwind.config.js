/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'code': {
              backgroundColor: '#f4f4f4',
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontFamily: '"Monaco", "Courier New", monospace'
            },
            'pre': {
              backgroundColor: '#f4f4f4',
              padding: '1rem',
              borderRadius: '0.5rem',
              fontFamily: '"Monaco", "Courier New", monospace'
            },
            '.ql-font-monospace': {
              fontFamily: '"Monaco", "Courier New", monospace !important'
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],

}