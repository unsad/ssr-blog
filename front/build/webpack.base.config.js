/**
 * Created by unsad on 2017/9/21.
 */
const path = require('path');
const webpack = require('webpack');
const vueConfig = require('./vue-loader.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isProd = process.env.NODE_ENV === 'production';

const cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: isProd,
    modules: true,
    localIdentName: '[local]_[hash:base64:8]'
  }
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [
      require('postcss-cssnext')(),
      require('autoprefixer')(),
      require('cssnano')()
    ]
  }
};

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'public': path.resolve(__dirname, '../public'),
      '@': resolve('src')
    }
  },
  module: {
    noParse: /es-promise\.js$/,
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|ttf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(styl(us)?|css)$/,
        use: [isProd ? MiniCssExtractPlugin : 'style-loader', 'vue-style-loader',
          cssLoader,
          postcssLoader,
          'stylus-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: (isProd ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: 'common.[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  ] : [
    new FriendlyErrorsPlugin()
  ]).concat([
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          import: [path.resolve(__dirname, '../src/assets/css/variable.styl')]
        }
      }
    }),
    new VueLoaderPlugin()
  ])
};
