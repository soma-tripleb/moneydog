const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'moneydog-client',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  entry: {
    app: ['./app'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                browsers: ['> 5% in KR', 'last 2 chrome versions'], // 원하는 브라우저만 선정하겠다. https://github.com/browserslist/browserslist
              },
              debug: true,
            }],
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            'react-hot-loader/babel',
            ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": true}] // `style: true` for less
          ],
        }
      },
      {
        test: /\.less?$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            },
          },
        ],
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.jsx'
  }
};
