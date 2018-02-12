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
              loader: 'postcss-loader',
              options: { 
                sourceMap: true 
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
      },
      { 
        test: /\.html$/, 
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              // processScripts: ['text/template']              
            }
          }
        ] 
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          },
          {
            loader: 'img-loader'
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
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