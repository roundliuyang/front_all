const { defineConfig } = require('@vue/cli-service')
module.exports = {
  publicPath: '/',
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      //  在 dist/index.html 的输出
      filename: 'index.html'
    },
    menu: {
      entry: 'src/pages/menu/main.js',
      template: 'public/index.html',
      filename: 'menu.html'
    },
    yemian: {
      entry: 'src/pages/yemian/main.js',
      template: 'public/index.html',
      filename: 'yemian.html'
    },
  },
  devServer: {
    port: 58091,
  },
};