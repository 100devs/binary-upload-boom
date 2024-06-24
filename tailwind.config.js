const autoprefixer = require('autoprefixer');
const withMT = require("@material-tailwind/html/utils/withMT")

module.exports = {
    content: ['"./views/**/*.ejs"'],
    plugins: [
      require[("daisyui")],
    ]
    daisyui: {
      styled: true,
      themes: true,
      base: true,
      utils: true,
      logs: true,
      rtl: false,
      prefix: "",
      darkTheme: "dark",
    },
  }