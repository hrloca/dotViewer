const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const path = require('path')

const config = {
  entry: './src/index.tsx',
  mode: process.env.NODE_ENV || 'production',
  performance: {
    hints: false,
  },
  target: ['web', 'es5'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'docs'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new WebpackManifestPlugin({
      fileName: path.join(__dirname, 'docs', 'build_manifest.json'),
      publicPath: '',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs'),
    },
    compress: true,
    port: 9000,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts|tsx$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.ts|tsx$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /manifest.json/,
        loader: 'file-loader',
        options: {
          name: 'manifest.json',
        },
        type: 'javascript/auto',
      },
    ],
  },
}

module.exports = config
