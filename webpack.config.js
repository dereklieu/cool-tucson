const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    path: __dirname + '/dist',
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-sprite-loader',
          options: {
            symbolId: filePath => path.basename(filePath)
          }
        }
      }
    ]
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single'
  },
  devtool: 'source-map',
  devServer: {
    stats: 'minimal'
  }
};
