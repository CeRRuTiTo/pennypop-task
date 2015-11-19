var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname,

  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "./src/js/main"
  ],

  output: {
    path: path.resolve("./lib"),
    filename: "assets/[name]-[hash].js",
    publicPath: "http://localhost:3000/",
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new HtmlWebpackPlugin({
      title: "PennyPop Task",
      template: "src/index.tmpl"
    }),

    new ExtractTextPlugin("assets/[name]-[hash].css", {
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      path: "assets/[name]-[hash].js",
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.join(__dirname, 'node_modules')) !== -1;
      }
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel"]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css"
        )
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.scss$/,
        include: path.resolve("./src/sass/"),
        loader: ExtractTextPlugin.extract(
          "style",
          "css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?" +
          "sourceMap&" +
          "includePaths[]=" +
          (path.resolve(__dirname, "./node_modules"))
        )
      },
      {
        test: /\.scss$/,
        exclude: path.resolve("./src/sass/"),
        loader: ExtractTextPlugin.extract(
          "style",
          "css!sass?sourceMap&" +
          "includePaths[]=" +
          (path.resolve(__dirname, "./node_modules"))
        )
      },
      {
        test: /\.sass$/,
        loader: "style!css!sass?indentedSyntax&sourceMap"
      },
      {
        test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: [
          "file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]"
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff&name=assets/[hash].[ext]"
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=assets/[hash].[ext]"
      },
      {
        test: /\.json$/,
        loaders: ["json-loader"]
      }
    ]
  },

  resolve: {
    root: path.resolve("./src/"),
    modulesDirectories: ["node_modules", "bower_components"],
    extensions: ["", ".json", ".js", ".jsx"]
  }
};
