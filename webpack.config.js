module.exports = {
  entry: { reverjs: './src/index.tsx' },
  mode: 'production',
  resolve: {
    extensions: [".ts", ".js", ".jsx", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/i,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
};
