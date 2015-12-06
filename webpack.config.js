'use strict';

var path = require('path'),
  webpack = require('webpack'),
  nodeModulesPath = path.join(__dirname, 'node_modules');

// 0 stands for development, 1 stands for production
// for development mode: NODE_ENV=0 webpack
// for production mode: NODE_ENV=1 webpack
var ENV = !!(+process.env.NODE_ENV || 0);


module.exports = [{
  name: 'react-d3-map',
  devtool: ENV ? "source-map": '',
  entry: {
    container: './example/src/container.jsx',
    multipolygon: './example/src/multipolygon.jsx',
    mapresponsive: './example/src/mapresponsive.jsx',
    point: './example/src/point.jsx',
    line: './example/src/line.jsx',
    test: './example/src/test.jsx'
  },

  output: {
    path: ENV ? path.join(__dirname, './example/min'): path.join(__dirname, './example/dist'),
    filename: ENV ? '[name].min.js': '[name].js'
  },

  module: {
    loaders: [
      {
        test: [/\.jsx$/, /\.js$/],
        exclude: /node_modules/,
        loaders: ["jsx-loader"],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ],
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  }

}];
