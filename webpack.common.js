var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var BuildConstants = require("./build-constants");

module.exports = {
  entry: [ BuildConstants.ENTRY ],
  resolve: {
    extensions: [ "", ".js", ".jsx" ]
  },
  output: {
    path: BuildConstants.OUTPUT,
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/, loader: "eslint-loader", include: BuildConstants.ENTRY_FOLDER }
    ],
    loaders: [
      { test: /\.jsx?$/, loaders: ["babel?stage=1", "virtual-dom"], include: BuildConstants.ENTRY_FOLDER },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("css?sourceMap!sass?sourceMap") },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      title: "[App]",
      template: BuildConstants.HTML_TEMPLATE
    })
  ]
};
