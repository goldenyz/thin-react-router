/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: {
    'basic': [
      path.join(__dirname, './basic/index.js')
    ]
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name]_[hash:10].js',
  },

  resolve: {
    alias: {
      'thin-react-router': path.join(__dirname, '..', 'src'),
    },
  },

  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2', 'react'],
        },
      },
      {
        test: /\.(jpg|png|svg|ttf|eot)$/,
        loader: 'file-loader',
        query: {
          name: 'img/[hash].[ext]',
        },
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize=true', 'postcss-loader', 'less-loader']
        })
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'basic.html',
      template: path.join(__dirname, 'index.html'),
      inject: 'body',
    }),
  ],

  devtool: 'source-map',

  devServer: {
    open: true,
    openPage: 'basic.html'
  }
};
