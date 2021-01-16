const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ['./src/index.js'],
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx"]
        },
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader',
            options: {
              localsConvention: "dashesOnly", 
              modules: {
                localIdentName: "[local][hash:3]",
              },
            }
          },
          'less-loader',
        ],
      },
      {
        test: /\.(png|gif|ttf)$/,
        options: {
          name: '[name].[ext]',
        },
        loader: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false,
            },
          },
        ]
      },
      {
        test: /\.(pdf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'docs',
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: '{,!(draft)/**/}*',
          context: path.resolve(__dirname, 'src', 'assets'),
        },
      ],
    }),
  ],
  output: {
    publicPath: "/",
    chunkFilename: '[name].bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3000
  }
}