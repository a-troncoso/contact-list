const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  // target: 'node',
  // externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },
  entry: [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src', 'index.jsx')
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sass|scss)$/,
        include: path.join(__dirname, 'src/sass', 'bulma.sass'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.(sass|scss)$/,
        exclude: path.join(__dirname, 'src/sass', 'bulma.sass'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new ExtractTextPlugin('style.css', { allChunks: true }),
      new HtmlWebpackPlugin({
        title: 'Contact List',
        template: path.join(__dirname, 'src', 'index.html'),
        filename: 'index.html'
      })
    ],
    devServer: {
      host: '0.0.0.0',
      hot: true,
      port: 8080,
      inline: true,
      contentBase: path.join(__dirname, 'src'),
      historyApiFallback: true
    }
  }
