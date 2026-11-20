/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#007545', dark: '#005A35', tint: '#EAF5EF' },
        sun: '#FFCC00',
        flame: '#FF8D28',
        soft: '#F5F6F2',
        line: '#E4E6E0',
        muted: '#6B6B66',
      },
      fontFamily: { sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'] },
      borderRadius: { '4xl': '2rem' },
      boxShadow: { card: '0 10px 30px rgba(0,0,0,0.06)', pop: '0 20px 40px rgba(0,0,0,0.14)' },
    },
  },
  plugins: [],
};
