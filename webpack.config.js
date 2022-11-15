const path = require('path')
const MiniCssExstractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/'
}

module.exports = {
  mode: 'development',
  entry: {
    app: PATHS.src
  },
  output: {
    filename: 'bundle.js',
    path: PATHS.dist,
    assetModuleFilename: pathData => {
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      return `${filepath}/[name][ext]`}
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExstractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExstractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      { test: /\.(woff|woff2|eot|ttf)(\?|$)/, 
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {from: `${PATHS.src}/mail.php`, to: `${PATHS.dist}/[name].php`},
      ]
    }),
    new MiniCssExstractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin(
      {
        template: `${PATHS.src}/index.html`
      }
    ),
    
  ],
  devServer:{
    port: 8081,
    hot: true,
    compress: true,
  },
  performance:{
    hints: false,
    maxAssetSize: 5120,
    maxEntrypointSize: 5120,
  }
}