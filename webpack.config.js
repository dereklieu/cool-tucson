const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
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
      }
    ]
  },
  devtool: 'source-map'
};
