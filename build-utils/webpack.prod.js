const path = require('path');
const projectPath = require('./paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: [path.resolve(projectPath, 'src/scss')],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { 
                sourceMap: true,
                minimize: true,
                importLoaders: 1
              }
            },
            {
              loader: 'sass-loader',
              options: { 
                sourceMap: true 
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.[contenthash].css'),
    new UglifyJsPlugin({
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        processScripts: ['text/template']        
      }
    }),
    //new CompressionWebpackPlugin()
  ]  
};  