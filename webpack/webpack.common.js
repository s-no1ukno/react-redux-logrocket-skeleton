const webpack = require('webpack')
const convert = require('koa-connect')
const history = require('connect-history-api-fallback')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonPaths = require('./paths')

const isDevelopment = process.env.NODE_ENV === 'development'
const mode =
  process.env.TARGET_ENV === 'development' ? 'development' : 'production'

module.exports = {
  mode,
  entry: commonPaths.entryPath,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          presets: ['@babel/react'],
          plugins: [['import', { libraryName: 'antd', style: true }]],
        },
      },
      {
        test: /\.(js|jsx)$/,
        use: 'react-hot-loader/webpack',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(png|jpg|gif|svg|pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: commonPaths.imagesFolder,
            },
          },
        ],
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: commonPaths.fontsFolder,
            },
          },
        ],
      },
    ],
  },
  serve: {
    add: app => {
      app.use(convert(history()))
    },
    content: commonPaths.entryPath,
    dev: {
      publicPath: commonPaths.outputPath,
    },
    open: true,
  },
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        TARGET_ENV: JSON.stringify(process.env.TARGET_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      fix: true,
      emitWarning: process.env.NODE_ENV !== 'production',
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
  ],
}
