const autoprefixer = require('autoprefixer');

module.exports = {
    content: ['"./views/**/*.ejs"'],
    plugins: [
      require('tw-elements/dist/plugin'),
    ]
  }