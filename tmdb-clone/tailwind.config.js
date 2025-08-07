/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'tmdb-blue': '#01b4e4',
        'tmdb-dark-blue': '#0d253f',
        'tmdb-light-blue': '#90cea1',
        'tmdb-green': '#90cea1',
        'tmdb-orange': '#fbb041',
        'tmdb-red': '#d63384',
        'tmdb-dark': '#0d253f',
        'tmdb-light': '#f8f9fa'
      },
      fontFamily: {
        'sans': ['Source Sans Pro', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}

