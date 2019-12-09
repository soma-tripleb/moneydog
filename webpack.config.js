const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDir = 'dist';

module.exports = {
  mode: 'development',
  node: {fs: 'empty'},
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      root: path.resolve(__dirname, 'client/src/root/'),
      image: path.resolve(__dirname, 'public/static/image'),
    },
    modules: [
      path.join(__dirname, 'client'),
      'node_modules'
    ]
  },

  devServer: {
    historyApiFallback: true,
    inline: true,
    port: 8080,
  },

  entry: './client/src/index.jsx',
  output: {
    path: path.join(__dirname, outputDir),
    filename: 'app.jsx',
    publicPath: '/'
  },

  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
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
};
