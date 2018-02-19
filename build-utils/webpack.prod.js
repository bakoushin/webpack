const path = require('path');
const projectPath = require('./paths');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

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
                importLoaders: 2
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
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[hash].[ext]'
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
          limit: 10000,
          name: '[name].[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: projectPath }),
    new ExtractTextPlugin('style.[contenthash].css'),
    // TODO:
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common'
    // }),
    new UglifyJsPlugin({
      sourceMap: true,
      cache: true,
      parallel: true,
      uglifyOptions: {
        mangle: {
          // fix for Safari 10 `let` bug:
          // https://bugs.webkit.org/show_bug.cgi?id=171041
          safari10: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      minify: {
        useShortDoctype: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        processScripts: ['text/template']        
      }
    })
    //TODO:
    //new ManifestPlugin()
    //new SWPrecacheWebpackPlugin()
    //new CompressionWebpackPlugin()
  ]
};  