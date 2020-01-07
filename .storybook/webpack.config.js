module.exports = {
  resolve: {
    extensions: [".js", "jsx"],
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat"
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        loader: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      },
      {
        test: /story\.jsx?$/,
        loaders: [
          {
            loader: require.resolve("@storybook/addon-storysource/loader"),
            options: {}
          }
        ],
        enforce: "pre"
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};
