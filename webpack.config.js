const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports =  {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './app.js',
    vendor: './vendor.js'
  },
  output: {
    filename: '[name].js',
    //filename: 'script-[chunkhash].js',
    //hashDigestLength: 6,
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist/img"),
    stats: 'errors-only',
    port: 3000,
    compress: true,
    watchContentBase: true
  },
  devtool: 'inline-source-map',
  module: {
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.jsx?$/,
        include: /src/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'src/scss')],
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/media/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },      
      // {
      //   test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000
      //   }
      // },      
      { 
        test: /\.html$/, 
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
              // processScripts: ['text/template']              
            }
          }
        ] 
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new ExtractTextPlugin('style.css')
    //new ExtractTextPlugin('style-[contenthash].css')
  ]  
};