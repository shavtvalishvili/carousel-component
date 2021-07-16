const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
      path: __dirname + "/public",
      publicPath: "/",
      filename: "main.js"
    },
    devtool: "source-map",
    devServer: {
      contentBase: "./public",
      hot: true,
      open: true
    },
    resolve: {
      extensions: [".js", ".jsx", ".json"]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader"
          ],
        },
      ]
    },
}