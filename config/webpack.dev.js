const merge = require('webpack-merge');
/* eslint-disable prefer-destructuring */
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
});
