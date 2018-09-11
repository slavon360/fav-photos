const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`${next}`] = JSON.stringify(env[next]);
  return prev;
}, { });

const conf = {
  devtool: 'eval-sourcemap',
  entry: path.join(__dirname, '../src') + '/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'scripts/main.js',
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
         'style-loader',
         'css-loader',
         {
           loader: 'postcss-loader',
           options: {
              plugins: () => [require('autoprefixer')]
            }
         },
         'sass-loader',
       ],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin(
      {'process.env': Object.assign({
        'NODE_ENV': JSON.stringify('development')
      }, envKeys)}
    )
  ],
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    hot: true,
    inline: true,
  }
}


module.exports = conf;
