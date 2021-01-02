require('colors')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  lintOnSave: true,
  // publicPath: process.env.VUE_APP_BASE_URL,
  outputDir: process.env.VUE_APP_OUTPUT_DIR,
  devServer: {
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_REQUEST_API]: {
        target: process.env.PROXY_TARGET,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_REQUEST_API]: process.env.VUE_APP_BASE_REQUEST_API
        },
        onProxyReq (proxyReq) {
          console.log(`${'Request path: '.red.underline}${proxyReq.path}`)
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/variables.scss";'
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: () => {
    return {
      devtool: 'source-map',
      plugins: [
        // new CompressionWebpackPlugin({
        //   filename: '[path].gz[query]',
        //   algorithm: 'brotliCompress',
        //   test: /\.(js|css)$/,
        //   compressionOptions: { level: 11 },
        //   threshold: 10240,
        //   minRatio: 0.8,
        //   deleteOriginalAssets: false
        // })
      ]
    }
  },
  chainWebpack: config => {
    config.output.filename('[name].[hash].js').end()
    config.module.rule('svg').uses.delete('file-loader')
    config.module
      .rule('svg')
      .use('svg-sprite')
      .loader('svg-sprite-loader')
      .options({
        extract: false,
        symbolId: 'icon-[name]'
      })
  }
}
