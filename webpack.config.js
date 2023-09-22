// webpack.config.js
const path = require("path");

module.exports = {
  mode: "development", // Defina o modo como "development" ou "production"
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
    extensions: [".ts", ".js"], // Permitir a importação de arquivos .ts e .js
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader", // Use ts-loader para arquivos .ts
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: true, // Abre automaticamente o navegador
    port: 8080, // Porta para o servidor de desenvolvimento
  },
};