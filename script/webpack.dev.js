const webpack = require('webpack')
const merge = require('webpack-merge')
const InjectHTMLPlugin = require('inject-html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const chalk = require('chalk')
const baseConf = require('./webpack.base')
const { resolve } = require('./util')
const { entryOfSource, distPath, publicPath, distFileName, entryOfHTML } = require('./constant')

module.exports = merge(baseConf, {
  output: {
    path: distPath,
    filename: distFileName,
    publicPath
  },
  devtool: '#source-map',
  devServer: {
    contentBase: [resolve('src'), resolve('dist')],
    compress: true,
    historyApiFallback: true,
    noInfo: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendors'
        },
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
          minChunks: 2,
          name: 'async-vendors'
        }
      }
    },
    runtimeChunk: { name: 'runtime' }
  },
  plugins: [
    new InjectHTMLPlugin({
      transducer: publicPath,
      chunks: ['main', 'vendors', 'async-vendors', 'runtime'],
      filename: entryOfHTML
    }),
    new ProgressBarPlugin({
      format: 'Building bundle [:bar] ' + chalk.green.bold(':percent'),
      clear: false,
      summary: false
    }),
    new FriendlyErrorsPlugin({ clearConsole: true })
  ]
})