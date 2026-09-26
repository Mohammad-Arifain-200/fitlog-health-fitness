/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fit: {
          bg: '#0c0d10',
          panel: '#15171d',
          panel2: '#101217',
          border: '#262a33',
          muted: '#8a909c',
          accent: '#c2f800',
        },
      },
      fontFamily: {
        display: ['Oswald', 'Arial Narrow', 'sans-serif'],
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 14px 35px rgba(0,0,0,.18)',
      },
    },
  },
  plugins: [],
}
