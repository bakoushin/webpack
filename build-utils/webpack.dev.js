const path = require('path');
const projectPath = require('./paths');

module.exports = {
  devtool: 'eval-source-map',
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
  }
};  