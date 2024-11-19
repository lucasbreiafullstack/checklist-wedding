module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#F3F3F3',
        olive: {
          DEFAULT: '#3A5A40',
          light: '#A3B18A',
        },
        black: '#1A1A1A',
      },
    },
  },
  plugins: [],
};
