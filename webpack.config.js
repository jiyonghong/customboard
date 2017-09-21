import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body',
});

const rootPath = __dirname;
const srcPath = path.resolve(rootPath, 'src');


export default {
  context: srcPath,
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [srcPath, 'node_modules'],
    alias: {
      app: path.resolve(srcPath, 'app'),
    },
  },
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './app.jsx',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    HtmlWebpackPluginConfig,
  ],
  devServer: {
    hot: true,
    contentBase: './src',
  },
};
