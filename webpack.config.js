const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.ts",
    aquecimento1: "./src/aquecimento1/index.ts",
    aquecimento2: "./src/aquecimento2/index.ts",
    aquecimento3: "./src/aquecimento3/index.ts"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: true,
    port: 8080,
  },
};