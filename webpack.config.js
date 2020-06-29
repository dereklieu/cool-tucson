const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Cool Tucson Bad Demo'
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
