const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConf = require('./webpack.base')
const { resolve } = require('./util')

module.exports = merge(baseConf, {
  devtool: '#inline-cheap-module-source-map',
  // devtool: '#source-map',
  externals: [nodeExternals()],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
})