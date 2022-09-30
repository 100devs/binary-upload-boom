const autoprefixer = require('autoprefixer');
const withMT = require("@material-tailwind/html/utils/withMT")

module.exports = {
    content: ['"./views/**/*.ejs"'],
    plugins: [
      require[("daisyui")],
    ]
  }