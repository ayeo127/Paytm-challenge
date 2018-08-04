const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_DIRECTORY = path.join(__dirname, '..');
const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, 'src');
const DIST_DIRECTORY = path.join(ROOT_DIRECTORY, 'dist');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'redux', 'react-router-dom'],
    client: SRC_DIRECTORY,
  },
  devServer: {
    port: 7070,
    historyApiFallback: true,
    contentBase: DIST_DIRECTORY,
  },
  output: {
    path: DIST_DIRECTORY,
    filename: '[name].chunkhash.bundle.js',
    publicPath: '/',
    chunkFilename: '[name].chunkhash.bundle.js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        { loader: 'style-loader', options: { sourceMap: true, singleton: true } },
        'css-loader',
      ],
    }, {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader', options: { sourceMap: true, singleton: true } },
        'css-loader',
        'sass-loader',
      ],
    }, {
      test: /\.(svg|jpg)$/,
      use: [
        { loader: 'file-loader', options: { name: '[name].[ext]' } },
      ],
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        plugins: ['lodash'],
        presets: [['env', { modules: false, targets: { node: 4 } }]],
      },
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(SRC_DIRECTORY, 'index.html') }),
  ],
};
