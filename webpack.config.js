const commonConfig = require('./build-utils/webpack.common');
const webpackMerge = require('webpack-merge');

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports =  (env) => {
  console.log(env);

  const envConfig = require(`./build-utils/webpack.${env.env}.js`);

  return webpackMerge(commonConfig, envConfig);
};