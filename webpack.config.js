const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
      path: __dirname + "/public",
      publicPath: "/",
      filename: "main.js"
    },
    devtool: "source-map",
    devServer: {
      // host: "192.168.100.8",
      // port: 3000,
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