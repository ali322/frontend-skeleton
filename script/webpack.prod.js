const merge = require('webpack-merge')
const webpack = require('webpack')
const { join } = require('path')
const baseConf = require('./webpack.base')
const { resolve } = require('./util')
const { cesiumBase, entryOfHTML, outputOfHtml } = require('./constant')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const InjectHTMLPlugin = require('inject-html-webpack-plugin')

module.exports = merge(baseConf, {
  performance: {
    hints: false
  },
  stats: {
    chunks: false,
    version: false,
    colors: true
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new MiniCSSExtractPlugin({ filename: '[name].css' }),
    new CopywebpackPlugin([{ from: 'static', to: 'static' }]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new InjectHTMLPlugin({
      transducer: './',
      chunks: ['main', 'vendors', 'async-vendors', 'runtime'],
      filename: entryOfHTML,
      output: outputOfHtml
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
})