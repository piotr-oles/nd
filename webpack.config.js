const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    demo: './app/demo.tsx'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlPlugin({
      template: 'app/template/demo.ejs',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      chunks: ['demo']
    })
  ]
};
