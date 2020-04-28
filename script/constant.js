const { resolve } = require('./util')
const { join } = require('path')

exports.distPath = resolve('dist')
exports.distFileName = '[name].js'
exports.publicPath = '/hmr/'
exports.entryOfSource = [resolve('src', 'index.js'), resolve('src', 'index.less')]
exports.entryOfHTML = join('src', 'index.html')
exports.outputOfHtml = join('dist', 'index.html')