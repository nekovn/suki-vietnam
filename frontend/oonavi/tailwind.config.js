module.exports = {
  purge: ['./index.html','./src/**/*.{vue,js}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      tableLayout: ['hover', 'focus'],
      translate: ['motion-safe'],
      display: ["group-hover"],
    },
  },
  plugins: [],
}
