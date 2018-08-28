/**
 * Created by unsad on 2017/9/21.
 */
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = merge(base, {
  entry: {
    app: './src/client-entry.ts'
  },
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new webpack.NamedModulesPlugin(),
    new VueSSRClientPlugin()
  ]
});

if (process.env.NODE_ENV === 'production') {
  config.plugins = config.plugins.concat([
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'blog',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: false,
      staticFileGlobsIgnorePatterns: [
        /\.json$/,
        /index\.html$/,
        /\.map$/,
        /\.css$/,
        /\.eot$/],
      mergeStaticsConfig: true,
      staticFileGlobs: [
        path.join(__dirname, '../dist/static/*.*')
      ],
      stripPrefixMulti: {
        [path.join(__dirname, '../dist/static')]: '/static'
      },
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst'
        },
        {
          urlPattern: /service-worker.js/,
          handler: 'networkOnly'
        },
        {
          // note that this pattern will cache ajax request
          urlPattern: /(.+\/[^\.]*$)/,
          handler: 'networkFirst',
          options: {
            cache: {
              maxEntries: 30,
              name: 'blog-runtime-cache'
            }
          }
        },
        { 
          urlPattern: /\.(png|jpg|webp|gif)/,
          handler: 'cacheFirst',
          options: {
            cache: {
              maxEntries: 20,
              name: 'blog-picture-cache'
            }
          }
        }
      ]
    })
  ],
  new MiniCssExtractPlugin({
    filename: 'common.[name].[hash].css',
    chunkFilename: '[id].[hash].css'
  }));
}

module.exports = config;

