const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const conf = {
  devtool: 'eval-sourcemap',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'main.js',
    publicPath: '/dist',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: '/node_modules',
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
       use: [
         MiniCssExtractPlugin.loader,
         'css-loader',
         'postcss-loader',
         'sass-loader',
       ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
}


module.exports = conf;
