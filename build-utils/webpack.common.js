const path = require('path');
const projectPath = require('./paths');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(projectPath, 'src'),
    entry: {
    app: './app.js',
    vendor: './vendor.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(projectPath, 'dist')
  },
  module: {
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.jsx?$/,
        include: /src/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(['dist'], { root: projectPath }),
    new HtmlWebpackPlugin({ template: 'index.html' }),
  ]
};  