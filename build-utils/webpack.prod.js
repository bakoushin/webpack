const path = require('path');
const projectPath = require('./paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: [path.resolve(projectPath, 'src/scss')],
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { 
                sourceMap: true,
                minimize: true 
              }
            },
            {
              loader: 'sass-loader',
              options: { 
                sourceMap: true 
              }
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.[contenthash].css'),
    new UglifyJsPlugin({
      sourceMap: true
    }),
    //new CompressionWebpackPlugin()
  ]  
};  