const { defineConfig } = require('@vue/cli-service')
module.exports = {
  publicPath: '/',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
    menu: {
      entry: 'src/pages/menu/main.js',
      template: 'public/index.html',
      filename: 'menu.html'
    },
  },
};