const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  name: 'moneydog-root',
  mode: 'development',
  node: {fs: 'empty'},
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    historyApiFallback: true,
    inline: true,
    port: 8080,
  },

  entry: {
    app: ['./client/src/index'],
  },

  plugins: [
    new Dotenv(),
  ],

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
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            'react-hot-loader/babel',
            ['import', { 'libraryName': 'antd', 'style': true }],
          ],
        },
      },
      {
        test: [/\.css?$/],
        use: [
          'style-loader', 'css-loader',
        ],
      },
      {
        test: [/\.less?$/],
        use: [
          'style-loader', 'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: [/\.(png|jpg|jpeg)?$/],
        use: [
          'file-loader',
        ],
      },
      {
        test: [/\.(ico|gif|svg|woff|woff2|ttf|eot)?$/],
        loader: 'url-loader',
        options: {
          name: '[hash].[ext]',
          limit: 10000,
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.jsx'
  },
};