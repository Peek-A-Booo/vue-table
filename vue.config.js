const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
  },
  productionSourceMap: false,
  css: {
    extract: false
  },
  chainWebpack: config => {
    config.module
      .rule('js').use('babel-loader')
    // config.resolve.alias
    //   .set('vue-json-editors', resolve('./'))
    // config.entry.app = ["babel-polyfill", "./examples/main.js"]
  },
  configureWebpack: {
    // plugins:[
    //   new BundleAnalyzerPlugin(),
    // ],
  },
  devServer: {
    open: true,
  },
}
