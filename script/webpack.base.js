const webpack = require('webpack')
const { resolve, urlLoaderOptions, cssLoaders } = require('./util')
const { entryOfSource } = require('./constant')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: entryOfSource,
  mode: isProd ? 'production' : 'development',
  module: {
    unknownContextCritical: false,
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: resolve('node_modules')
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: resolve('node_modules'),
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        loader: cssLoaders(isProd)
      },
      {
        test: /\.less$/,
        loader: cssLoaders(isProd, 'less'),
        exclude: resolve('node_modules')
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        // exclude: resolve('node_modules'),
        loader: 'url-loader',
        options: urlLoaderOptions(isProd)
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: urlLoaderOptions(isProd)
      }
    ]
  },
  resolve: {
    mainFields: ['module', 'main'],
    extensions: ['.js', '.jsx', 'ts', '.json'],
    alias: {
      '@': resolve('src')
    }
  }
}