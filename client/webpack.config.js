const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'moneydog-client',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    historyApiFallback: true
  },

  entry: {
    app: ['./src/index'],
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
                browsers: ['> 5% in KR', 'last 2 chrome versions'],
              },
              debug: true,
            }],
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            'react-hot-loader/babel',
            ["import", {"libraryName": "antd", "style": true}],
          ],
        }
      },
      {
        test: [/\.css?$/],
        use: [
          'style-loader', 'css-loader',
        ],
      },
      {
        test: [ /\.less?$/],
        use: [
          'style-loader', 'css-loader',
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
