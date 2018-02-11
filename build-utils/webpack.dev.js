const path = require('path');
const projectPath = require('./paths');

module.exports = {
  devtool: 'inline-source-map', // Sean Larkin: use 'eval-source-map' //???
  devServer: {
    //stats: 'errors-only',
    compress: true,
    watchContentBase: true,
    contentBase: path.resolve(projectPath, "dist/img")
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: [path.resolve(projectPath, 'src/scss')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            //options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            //options: { sourceMap: true }
          }
        ]
      }
    ]
  }
};  