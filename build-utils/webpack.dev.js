const path = require('path');
const projectPath = require('./paths');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    stats: 'errors-only',
    compress: true,
    watchContentBase: true,
    contentBase: path.resolve(projectPath, "dist/img")
  },
  output: {
    pathinfo: true,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: [path.resolve(projectPath, 'src/scss')],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: { 
              sourceMap: true,
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
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/'
      },
      {
        reload: false
      }
    )    
  ]
};  