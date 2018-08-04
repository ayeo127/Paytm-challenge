const merge = require('webpack-merge');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
/* eslint-disable prefer-destructuring */
const OccurrenceOrderPlugin = require('webpack').optimize.OccurrenceOrderPlugin;
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  performance: {
    hints: false,
  },
  devServer: {
    inline: false,
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'async',
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            inline: true,
          },
        },
      }),
      new OccurrenceOrderPlugin(),
    ],
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
  ],
});
