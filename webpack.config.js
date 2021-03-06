/* eslint-disable */
var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');
var env = process.env.NODE_ENV;

var libraryName = '[name]';

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env)
  })
];
var outputFile;

if (env === 'production') {
  plugins.push(new UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: true
    },
  }));
  plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true
  }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  entry: {
    'thin-react-router': [
      path.join(__dirname, '/src/index.js')
    ]
  },

  devtool: 'source-map',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules"
    ],
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
    },
    {
      'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types'
      }
    }
  ],

  plugins: plugins
};

module.exports = function (env) {
  if (env) {
    if (env.analyze) {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
  }
  return config;
};
