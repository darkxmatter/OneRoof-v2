const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    publicPath: '/build/',
    contentBase: '/',
    port: 8080,
    proxy: {
      '/': {
        target: 'http://localhost:3000',
      }
    }
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
            test: /\.css$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
            ]
      }
    ]
  },
}